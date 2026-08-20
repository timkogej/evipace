-- Inbound ESG request submissions from the evipace.com marketing site.
-- Fully isolated from any client-portal schema — new tables only, no
-- shared references. Database schema and privilege hardening only:
-- tables, indexes, RLS enablement, table-privilege REVOKE/GRANT,
-- finalize_inbound_request(uuid), and RPC-privilege REVOKE/GRANT.
--
-- This migration has NO dependency on the "inbound-requests" Storage
-- bucket and can be run independently of whether that bucket exists yet
-- — bucket creation and bucket-level restrictions are handled entirely
-- by separate operator scripts:
--   supabase/scripts/configure_inbound_requests_bucket.sql (run after
--     creating the private bucket via the dashboard)
--   supabase/scripts/verify_inbound_requests.sql (run immediately after
--     this migration, to confirm the GRANT/REVOKE statements below
--     actually took effect)
--
-- This file is NOT executed automatically against your project — run it
-- manually (Supabase SQL editor or `supabase db push`) against the
-- project you confirm SUPABASE_URL/SUPABASE_SECRET_KEY point to.

create table if not exists inbound_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text not null,
  message text,
  deadline text,
  status text not null default 'pending'
    check (status in ('pending', 'submitted')),

  -- HMAC of the plaintext submission token — the plaintext itself is
  -- never stored. Required alongside the request id to finalize or
  -- inspect this request. See lib/server/submission-token.ts.
  submission_token_hash text not null,

  -- HMAC of the submitter's IP (lib/server/rate-limit.ts) — the raw IP is
  -- never persisted.
  ip_hmac text,

  created_at timestamptz not null default now(),
  submitted_at timestamptz,

  -- Durable notification state, tracked directly on the row rather than a
  -- separate outbox table (see lib/server/notify.ts for the rationale).
  -- status='submitted' + *_status='pending' is itself the durable
  -- "notification is due" signal a retry sweep queries for.
  internal_notification_status text not null default 'pending'
    check (internal_notification_status in ('pending', 'sent', 'failed')),
  internal_notification_attempts integer not null default 0,
  internal_notification_last_error text,

  visitor_confirmation_status text not null default 'pending'
    check (visitor_confirmation_status in ('pending', 'sent', 'failed', 'skipped')),
  visitor_confirmation_attempts integer not null default 0
);

create table if not exists inbound_request_files (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references inbound_requests(id) on delete cascade,
  storage_path text not null,
  original_filename text not null,
  declared_size bigint not null,
  declared_mime text not null,
  created_at timestamptz not null default now()
);

create index if not exists inbound_requests_status_idx
  on inbound_requests (status);
create index if not exists inbound_requests_created_at_idx
  on inbound_requests (created_at);
create index if not exists inbound_request_files_request_id_idx
  on inbound_request_files (request_id);

-- RLS enabled, zero policies: default-deny for the publishable/anon key
-- AT THE ROW level. Kept as defense in depth below the explicit privilege
-- hardening — RLS alone does not block table access if the underlying
-- SQL privileges (GRANT/REVOKE) still permit it, and Supabase projects
-- grant anon/authenticated/service_role SELECT/INSERT/UPDATE/DELETE on
-- new public-schema tables BY DEFAULT. The explicit REVOKE block below is
-- what actually closes that.
alter table inbound_requests enable row level security;
alter table inbound_request_files enable row level security;

-- --- Explicit Data API privilege hardening ---------------------------
--
-- Do not rely on Supabase's default grants. The browser never talks to
-- these tables directly in this architecture (all access goes through
-- the server-only Supabase client using SUPABASE_SECRET_KEY, which
-- authenticates as the `service_role` Postgres role), so anon and
-- authenticated should have no SQL-level privilege on these tables at
-- all — not even the ability to attempt a query that RLS would then deny.
-- This is a second, independent layer beneath RLS: even if RLS were ever
-- disabled or a policy accidentally added later, these REVOKEs still
-- apply.
revoke all on public.inbound_requests from public, anon, authenticated;
revoke all on public.inbound_request_files from public, anon, authenticated;

-- The server integration's actual role is `service_role` (both the
-- legacy service_role key and the current sb_secret_... key authenticate
-- PostgREST as this same Postgres role). service_role already bypasses
-- RLS via its BYPASSRLS attribute, but base table privileges are a
-- separate, independent check — grant explicitly rather than relying on
-- whatever default grant may or may not already exist.
--
-- inbound_requests: SELECT/INSERT/UPDATE all genuinely used today
-- (create, finalize, notification-status updates). DELETE included for
-- the future abandoned-upload cleanup path (Step 8B §E) — that cleanup
-- runs through this same privileged backend, and deleting a request row
-- here is what cascades to remove its inbound_request_files rows.
grant select, insert, update, delete on public.inbound_requests to service_role;

-- inbound_request_files: SELECT/INSERT used today (create, finalize
-- verification). No UPDATE — the application never modifies a file row
-- after creating it, so it isn't granted. DELETE included for the same
-- future cleanup path as above, in case cleanup ever needs to remove
-- individual file rows directly rather than relying solely on the
-- inbound_requests cascade.
grant select, insert, delete on public.inbound_request_files to service_role;

-- Atomic, idempotent status transition. Verification (Storage object
-- existence + exact size match) happens in the Route Handler BEFORE this
-- is called, since that requires an external HTTP call to Storage that
-- has no place inside a database transaction. This function's only job is
-- the fast, atomic DB-only transition once verification has already
-- passed — which is exactly why it's safe to treat as "the transaction".
--
-- Concurrency: two simultaneous finalize calls race on this UPDATE; only
-- one can match `status = 'pending'` and flip it. The loser's UPDATE
-- affects zero rows, `already_submitted` comes back true, and the caller
-- treats that as the already-done case rather than an error — no
-- duplicate notification gets triggered from two racing calls.
--
-- SECURITY INVOKER (the default — made explicit here for auditability):
-- this function runs with the privileges of whichever role calls it, not
-- the privileges of whoever created it. Since the only intended caller
-- (service_role) already has everything it needs via BYPASSRLS + the
-- explicit table grants above, there is no reason to escalate via
-- SECURITY DEFINER. Every reference to inbound_requests inside the body
-- is schema-qualified (public.inbound_requests) — the function does NOT
-- depend on search_path to locate this security-sensitive table.
-- `SET search_path` below is additional, non-load-bearing hardening
-- against search_path-based name shadowing for anything NOT already
-- schema-qualified.
create or replace function public.finalize_inbound_request(p_request_id uuid)
returns table (
  out_id uuid,
  out_status text,
  already_submitted boolean
)
language plpgsql
security invoker
set search_path = public, pg_temp
as $$
declare
  v_updated public.inbound_requests;
  v_existing public.inbound_requests;
begin
  update public.inbound_requests
  set status = 'submitted',
      submitted_at = now()
  where public.inbound_requests.id = p_request_id
    and public.inbound_requests.status = 'pending'
  returning * into v_updated;

  if found then
    return query select v_updated.id, v_updated.status, false;
    return;
  end if;

  select * into v_existing
  from public.inbound_requests
  where public.inbound_requests.id = p_request_id;

  if v_existing.id is null then
    return; -- empty result set = request not found; caller handles as 404
  end if;

  return query select v_existing.id, v_existing.status, true;
end;
$$;

-- RPC execution hardening: by default, Postgres grants EXECUTE on new
-- functions to PUBLIC, and Supabase additionally grants EXECUTE to
-- anon/authenticated on public-schema functions by default — meaning,
-- without this block, ANY holder of the publishable/anon key could call
-- POST /rest/v1/rpc/finalize_inbound_request directly, bypassing the
-- submission-token check entirely (that check lives in the Route
-- Handler, not in this function). Explicitly revoke, then grant only to
-- service_role.
--
-- Exact signature (from the CREATE FUNCTION above): finalize_inbound_request(uuid)
-- — one argument, p_request_id uuid. Using the exact signature rather
-- than the bare name so this can never ambiguously match a different
-- overload if one is ever added later.
revoke execute on function public.finalize_inbound_request(uuid) from public, anon, authenticated;
grant execute on function public.finalize_inbound_request(uuid) to service_role;
