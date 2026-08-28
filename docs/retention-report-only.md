# Inbound Request Retention: Report-Only Procedure

This project currently supports retention reporting only. Do not delete
production request rows, file rows or Supabase Storage objects from this
workflow until a separate deletion pass has been approved, implemented and
tested.

## Place A Request On Hold

An authorized operator may place a request on hold when it becomes an
engagement, when a dispute or legal obligation applies, or when the
information is still needed for the establishment, exercise or defence of
legal claims.

Use only a non-sensitive operational reason. Do not put personal data,
customer names, email addresses, document contents, filenames or confidential
facts in `retention_hold_reason`.

```sql
update public.inbound_requests
set retention_legal_hold = true,
    retention_hold_reason = 'engagement'
where id = '<request-id>';
```

## Extend Retention After Continued Communication

If relevant communication continues, extend the expiry from a verified
operator-side date rather than from browser-supplied input.

```sql
update public.inbound_requests
set retention_expires_at = timestamptz '<new-expiry>'
where id = '<request-id>'
  and retention_legal_hold = false;
```

## Remove A Hold

Remove a hold only after confirming the reason no longer applies.

```sql
update public.inbound_requests
set retention_legal_hold = false,
    retention_hold_reason = null
where id = '<request-id>';
```

## Run The Report-Only Check

Production requires `CRON_SECRET`. Call the internal endpoint with an
Authorization header, never with the secret in the query string.

```bash
curl -H "Authorization: Bearer $CRON_SECRET" \
  https://<production-host>/api/internal/retention
```

The report contains aggregate counts only. It must not expose names, emails,
company names, messages, filenames, storage paths, signed URLs, document
contents or raw submission tokens.

## Candidate Review Before Any Future Deletion

Before any later deletion system is enabled, an authorized operator should:

1. Confirm the migration has been applied.
2. Run the report-only endpoint.
3. Review candidate counts and inconsistent-record counts.
4. Confirm no candidate is subject to an engagement or legal hold.
5. Confirm file metadata resolves cleanly.
6. Approve a separate deletion run only after Storage deletion and database
   cascade behavior have been tested in a non-production environment.
