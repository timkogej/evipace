-- Operator script — NOT a schema migration, does not live in
-- supabase/migrations/, never runs via `supabase db push`.
--
-- Run this manually, once, immediately after creating the "inbound-requests"
-- bucket via the Supabase dashboard (Storage -> New bucket -> name exactly
-- "inbound-requests" [or match SUPABASE_STORAGE_BUCKET if configured
-- differently] -> leave "Public bucket" OFF).
--
-- I did not find high-confidence evidence that creating a Storage bucket
-- via a raw `insert into storage.buckets` is officially equivalent to
-- dashboard/Management-API bucket creation without undocumented side
-- effects (default policy scaffolding, storage-engine bootstrapping,
-- etc.), so bucket *creation* is not offered here as a version-controlled
-- alternative — only the restriction step below, which is a plain UPDATE
-- to an already-existing bucket row.
--
-- This script fails loudly rather than silently no-op'ing:
--   - raises if the bucket doesn't exist yet (wrong order of operations)
--   - raises if the bucket is public (wrong bucket, or "Public bucket"
--     was left on by mistake when creating it)
--
-- allowed_mime_types lists ONLY the canonical MIME values the server
-- actually sends to Storage (lib/request-upload-constants.ts's
-- canonicalMimeType per extension) — not the wider set of MIME values
-- accepted from the browser during validation. The application always
-- uses the canonical value for the upload's Storage metadata (see
-- lib/client/upload-file.ts), regardless of what the browser's File.type
-- reported, so this list can be exactly the canonical 6 values without
-- risking a legitimate upload being rejected for an inconsistent
-- browser-reported MIME type.
--
-- The 5-file and 75MB-total submission limits stay application-level
-- only — there is no bucket-level setting for a constraint that spans
-- multiple objects.

do $$
declare
  v_is_public boolean;
begin
  if not exists (select 1 from storage.buckets where id = 'inbound-requests') then
    raise exception
      'Bucket "inbound-requests" does not exist yet. Create it via the Supabase dashboard (Storage -> New bucket, private) before running this script.';
  end if;

  select public into v_is_public from storage.buckets where id = 'inbound-requests';

  if v_is_public then
    raise exception
      'Bucket "inbound-requests" is PUBLIC. This must be a private bucket — check the dashboard (Storage -> inbound-requests -> Settings) and turn "Public bucket" off before running this script again.';
  end if;

  update storage.buckets
  set file_size_limit = 26214400, -- 25 MB, in bytes
      allowed_mime_types = array[
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', -- .xlsx
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document', -- .docx
        'application/pdf',
        'text/csv',
        'image/jpeg',
        'image/png'
      ]
  where id = 'inbound-requests';
end $$;

-- After running, verify with:
--   select id, public, file_size_limit, allowed_mime_types
--   from storage.buckets where id = 'inbound-requests';
-- Expected: public = false, file_size_limit = 26214400, allowed_mime_types
-- lists exactly the 6 values above.
