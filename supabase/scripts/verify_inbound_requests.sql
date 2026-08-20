-- Run this entire file immediately after applying
-- 20260820000000_inbound_requests.sql. Every query has a stated expected
-- result — check each one rather than assuming the migration behaved as
-- intended.

-- 1. anon has NO privileges on either table.
-- Expected: every column false.
select
  has_table_privilege('anon', 'public.inbound_requests', 'SELECT') as anon_requests_select,
  has_table_privilege('anon', 'public.inbound_requests', 'INSERT') as anon_requests_insert,
  has_table_privilege('anon', 'public.inbound_requests', 'UPDATE') as anon_requests_update,
  has_table_privilege('anon', 'public.inbound_requests', 'DELETE') as anon_requests_delete,
  has_table_privilege('anon', 'public.inbound_request_files', 'SELECT') as anon_files_select,
  has_table_privilege('anon', 'public.inbound_request_files', 'INSERT') as anon_files_insert,
  has_table_privilege('anon', 'public.inbound_request_files', 'DELETE') as anon_files_delete;

-- 2. authenticated has NO privileges on either table.
-- Expected: every column false.
select
  has_table_privilege('authenticated', 'public.inbound_requests', 'SELECT') as auth_requests_select,
  has_table_privilege('authenticated', 'public.inbound_requests', 'INSERT') as auth_requests_insert,
  has_table_privilege('authenticated', 'public.inbound_requests', 'UPDATE') as auth_requests_update,
  has_table_privilege('authenticated', 'public.inbound_requests', 'DELETE') as auth_requests_delete,
  has_table_privilege('authenticated', 'public.inbound_request_files', 'SELECT') as auth_files_select,
  has_table_privilege('authenticated', 'public.inbound_request_files', 'INSERT') as auth_files_insert,
  has_table_privilege('authenticated', 'public.inbound_request_files', 'DELETE') as auth_files_delete;

-- 3. service_role has EXACTLY the intended privileges — no more, no less.
-- Expected: inbound_requests all four true; inbound_request_files select/
-- insert/delete true, update FALSE (never granted — the app doesn't
-- update file rows after creation).
select
  has_table_privilege('service_role', 'public.inbound_requests', 'SELECT') as svc_requests_select,
  has_table_privilege('service_role', 'public.inbound_requests', 'INSERT') as svc_requests_insert,
  has_table_privilege('service_role', 'public.inbound_requests', 'UPDATE') as svc_requests_update,
  has_table_privilege('service_role', 'public.inbound_requests', 'DELETE') as svc_requests_delete,
  has_table_privilege('service_role', 'public.inbound_request_files', 'SELECT') as svc_files_select,
  has_table_privilege('service_role', 'public.inbound_request_files', 'INSERT') as svc_files_insert,
  has_table_privilege('service_role', 'public.inbound_request_files', 'UPDATE') as svc_files_update,
  has_table_privilege('service_role', 'public.inbound_request_files', 'DELETE') as svc_files_delete;

-- 4. PUBLIC, anon, and authenticated CANNOT execute finalize_inbound_request.
-- Expected: all three false.
select
  has_function_privilege('public', 'public.finalize_inbound_request(uuid)', 'EXECUTE') as public_can_execute,
  has_function_privilege('anon', 'public.finalize_inbound_request(uuid)', 'EXECUTE') as anon_can_execute,
  has_function_privilege('authenticated', 'public.finalize_inbound_request(uuid)', 'EXECUTE') as authenticated_can_execute;

-- 5. service_role CAN execute finalize_inbound_request.
-- Expected: true.
select
  has_function_privilege('service_role', 'public.finalize_inbound_request(uuid)', 'EXECUTE') as service_role_can_execute;

-- 6. RLS is enabled on both tables.
-- Expected: relrowsecurity = true for both rows.
select relname, relrowsecurity
from pg_class
where relname in ('inbound_requests', 'inbound_request_files');

-- 7. Zero RLS policies exist on either table (confirms the "RLS enabled,
-- zero policies, default-deny" design — a policy accidentally added
-- later would show up here).
-- Expected: zero rows.
select schemaname, tablename, policyname
from pg_policies
where tablename in ('inbound_requests', 'inbound_request_files');

-- 8. finalize_inbound_request is SECURITY INVOKER (not DEFINER).
-- Expected: prosecdef = false.
select proname, prosecdef
from pg_proc
where proname = 'finalize_inbound_request';

-- 9. Storage bucket exists, is private, and has the intended restrictions
-- (only meaningful after supabase/scripts/configure_inbound_requests_bucket.sql
-- has been run, which itself requires the bucket to already exist via the
-- dashboard).
-- Expected: public = false, file_size_limit = 26214400, allowed_mime_types
-- lists exactly the 6 canonical MIME types.
select id, public, file_size_limit, allowed_mime_types
from storage.buckets
where id = 'inbound-requests';
