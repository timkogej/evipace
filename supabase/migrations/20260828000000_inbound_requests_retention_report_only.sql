-- Report-only retention metadata for inbound ESG request submissions.
--
-- This migration is intentionally non-destructive:
--   - it deletes no request rows;
--   - it deletes no inbound_request_files rows;
--   - it does not touch Storage objects;
--   - it does not reset any table.
--
-- The application and /api/internal/retention endpoint use these columns
-- only to identify records that would qualify for later review under the
-- retention policy. Production deletion is not enabled by this migration.

alter table public.inbound_requests
  add column if not exists retention_expires_at timestamptz;

alter table public.inbound_requests
  add column if not exists retention_legal_hold boolean not null default false;

alter table public.inbound_requests
  add column if not exists retention_hold_reason text
    check (
      retention_hold_reason is null
      or char_length(retention_hold_reason) <= 200
    );

comment on column public.inbound_requests.retention_expires_at is
  'Report-only retention review timestamp. For ordinary inquiries this is initially six calendar months after submission/creation and may be extended when relevant communication continues.';

comment on column public.inbound_requests.retention_legal_hold is
  'When true, report-only retention candidate selection must skip this request, for example because an engagement, dispute, legal obligation or other authorized hold applies.';

comment on column public.inbound_requests.retention_hold_reason is
  'Optional short operational hold reason. Do not store personal data, document contents, customer names, email addresses or sensitive facts in this field.';

update public.inbound_requests
set retention_expires_at = coalesce(submitted_at, created_at) + interval '6 months'
where retention_expires_at is null;

create index if not exists inbound_requests_retention_report_idx
  on public.inbound_requests (retention_expires_at, status)
  where retention_legal_hold = false;
