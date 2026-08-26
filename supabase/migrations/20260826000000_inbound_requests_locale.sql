-- Records which language version of the request form a submission came
-- from, so the internal notification can name it — including on a later
-- retry sweep, which has nothing but the stored row to work from.
--
-- Nullable with no default and no backfill: rows created before this
-- migration keep a NULL locale and the notification reports "Not
-- recorded" for them, rather than asserting a language nobody chose.
--
-- lib/server/notify.ts reads this column through its own tolerant query,
-- so a deployment that has not yet run this migration still delivers a
-- complete notification. Running it simply upgrades the Locale field from
-- "Not recorded" to the real value.

alter table inbound_requests
  add column if not exists locale text
    check (locale is null or locale in ('en', 'de'));

comment on column inbound_requests.locale is
  'Language version of the request form used for this submission (en|de). NULL for rows created before locale capture.';
