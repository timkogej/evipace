import assert from "node:assert/strict";
import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import test from "node:test";
import ts from "typescript";

const root = path.resolve(new URL("../", import.meta.url).pathname);
const read = (file) => readFile(path.join(root, file), "utf8");

const sources = Object.fromEntries(
  await Promise.all(
    Object.entries({
      privacy: "components/evipace/privacy/PrivacyPage.tsx",
      route: "app/[locale]/privacy/page.tsx",
      migration:
        "supabase/migrations/20260828000000_inbound_requests_retention_report_only.sql",
      retention: "lib/server/retention.ts",
      endpoint: "app/api/internal/retention/route.ts",
      requestRoute: "app/api/requests/route.ts",
      config: "lib/server/config.ts",
      companyInfo: "lib/company-info.ts",
      docs: "docs/retention-report-only.md",
      analyticsConsent: "tests/analytics-consent.test.mjs"
    }).map(async ([key, file]) => [key, await read(file)])
  )
);

const normalizedPrivacy = sources.privacy.replace(/\s+/g, " ");

async function loadRetentionModule() {
  const dir = await mkdtemp(path.join(tmpdir(), "evipace-retention-"));
  const { outputText } = ts.transpileModule(sources.retention, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
      isolatedModules: true
    }
  });
  const code = outputText
    .replace(/^import\s+"server-only";?\s*$/gm, "")
    .replace(/import\s+\{\s*getSupabaseAdminClient\s*\}\s+from\s+"\.\/supabase-admin";?\s*/g, "");
  const file = path.join(dir, "retention.mjs");
  await writeFile(file, code, "utf8");
  return import(pathToFileURL(file).href);
}

function createQueryResult(data, error = null, count = null) {
  return { data, error, count };
}

function installSupabaseReportMock({ requests, filesByRequestId }) {
  const calls = [];
  const forbidden = [];

  function buildQuery(table) {
    const filters = [];
    let selected = "";
    let head = false;
    let countRequested = false;
    let limitCount = Infinity;
    const query = {
      select(columns, options = {}) {
        selected = columns;
        head = Boolean(options.head);
        countRequested = options.count === "exact";
        return query;
      },
      lte(column, value) {
        filters.push((row) => row[column] <= value);
        return query;
      },
      eq(column, value) {
        filters.push((row) => row[column] === value);
        return query;
      },
      neq(column, value) {
        filters.push((row) => row[column] !== value);
        return query;
      },
      in(column, values) {
        filters.push((row) => values.includes(row[column]));
        return query;
      },
      order() {
        return query;
      },
      limit(count) {
        limitCount = count;
        return query;
      },
      delete() {
        forbidden.push({ table, method: "delete" });
        throw new Error("delete must not be called in report mode");
      },
      then(resolve) {
        calls.push({ table, selected, head, countRequested });
        let rows;
        if (table === "inbound_requests") {
          rows = requests.filter((row) => filters.every((filter) => filter(row)));
        } else if (table === "inbound_request_files") {
          const requestIdFilter = filters[0];
          rows = Object.values(filesByRequestId)
            .flat()
            .filter((row) => requestIdFilter(row));
        } else {
          return Promise.resolve(resolve(createQueryResult(null, { message: "bad table" })));
        }
        const limited = rows.slice(0, limitCount);
        const result = head
          ? createQueryResult(null, null, rows.length)
          : createQueryResult(limited, null, null);
        return Promise.resolve(resolve(result));
      }
    };
    return query;
  }

  return {
    calls,
    forbidden,
    client: {
      from(table) {
        return buildQuery(table);
      },
      storage: {
        from() {
          return {
            remove() {
              forbidden.push({ table: "storage", method: "remove" });
              throw new Error("storage remove must not be called in report mode");
            }
          };
        }
      }
    }
  };
}

test("privacy notice contains exact controller facts and no DPO claim", () => {
  for (const token of [
    "Sonja Žužek s.p.",
    "Prešernova cesta 21A, 1234 Mengeš, Slovenia",
    "evipace",
    "Tim Kogej",
    "authorized contact",
    "autorisierter Kontakt"
  ]) {
    assert.ok(sources.privacy.includes(token), token);
  }

  assert.ok(sources.companyInfo.includes('publicContactEmail = "hello@evipace.com"'));
  assert.ok(!sources.privacy.includes("formally appointed data protection officer"));
  assert.ok(!normalizedPrivacy.includes("formell benannter Datenschutzbeauftragter"));
  assert.ok(!sources.privacy.includes("DPO"));
  assert.ok(!sources.privacy.includes("Data Protection Officer: Tim"));
});

test("privacy notice describes actual form fields, uploads, security and email flow", () => {
  for (const token of [
    "name",
    "business email address",
    "company name",
    "message",
    "requested deadline",
    "submission reference",
    "timestamps",
    "language version",
    "filenames",
    "declared file size",
    "technical storage metadata",
    "special-category data",
    "identification documents",
    "keyed HMAC value derived",
    "raw IP address is not stored",
    "one-hour window",
    "private Supabase Storage bucket",
    "per-file signed upload tokens",
    "Resend",
    "time-limited signed links",
    "visitor confirmation email is sent only if"
  ]) {
    assert.ok(normalizedPrivacy.includes(token), token);
  }
});

test("privacy notice covers purposes, legal bases, providers, retention and rights", () => {
  for (const token of [
    "GDPR Article 6(1)(b)",
    "GDPR Article 6(1)(f)",
    "GDPR Article 6(1)(a)",
    "GDPR Article 6(1)(c)",
    "Supabase",
    "Resend",
    "Vercel",
    "Google",
    "EEA, the United States or other locations",
    "Standard Contractual Clauses",
    "six months after submission or the last relevant communication",
    "Vercel Web Analytics measures aggregated website traffic and performance",
    "without third-party analytics cookies",
    "anonymized analytics data",
    "understanding website use and maintaining website performance",
    "retention period is 14 months",
    "reset on new activity is disabled",
    "user-level and event-level data",
    "standard aggregated reports may not be governed",
    "180 days",
    "access",
    "rectification",
    "erasure",
    "restriction",
    "objection",
    "portability",
    "withdraw consent",
    "Information Commissioner of the Republic of Slovenia",
    "Informationsbeauftragten der Republik Slowenien",
    "https://www.ip-rs.si/",
    "does not use solely automated decision-making",
    "verkauft keine personenbezogenen Daten"
  ]) {
    assert.ok(normalizedPrivacy.includes(token), token);
  }

  assert.ok(!normalizedPrivacy.includes("requires manual confirmation"));
  assert.ok(!normalizedPrivacy.includes("report-only"));
  assert.ok(!normalizedPrivacy.includes("automatic production deletion"));
});

test("privacy pages are semantic, route-backed and available without client logic", () => {
  assert.ok(sources.route.includes('buildPageMetadata(locale, "privacy")'));
  assert.ok(sources.route.includes('isPageReachable(locale, "privacy")'));
  assert.equal((sources.privacy.match(/<h1/g) ?? []).length, 2);
  assert.ok(sources.privacy.includes("<h2"));
  assert.ok(sources.privacy.includes("space-y-4"));
  assert.ok(sources.privacy.includes("max-w-3xl"));
  assert.ok(!sources.privacy.includes('"use client"'));
  assert.ok(!sources.privacy.includes("Reveal"));
  assert.ok(!sources.privacy.includes("useEffect"));
  assert.ok(!sources.privacy.includes("overflow-hidden"));
});

test("retention migration is idempotent and non-destructive", () => {
  for (const token of [
    "add column if not exists retention_expires_at timestamptz",
    "add column if not exists retention_legal_hold boolean not null default false",
    "add column if not exists retention_hold_reason text",
    "char_length(retention_hold_reason) <= 200",
    "coalesce(submitted_at, created_at) + interval '6 months'",
    "create index if not exists inbound_requests_retention_report_idx",
    "where retention_legal_hold = false",
    "Do not store personal data"
  ]) {
    assert.ok(sources.migration.includes(token), token);
  }

  assert.ok(!/\bdrop\b/i.test(sources.migration));
  assert.ok(!/\btruncate\b/i.test(sources.migration));
  assert.ok(!/\bdelete\s+from\b/i.test(sources.migration));
  assert.ok(!/storage\.objects/i.test(sources.migration));
});

test("new request insert sets retention expiry but keeps staged migration fallback", () => {
  assert.ok(sources.requestRoute.includes("retentionExpiryForSubmission()"));
  assert.ok(sources.requestRoute.includes("retention_expires_at"));
  assert.ok(sources.requestRoute.includes("separate migrations"));
  assert.ok(sources.requestRoute.includes(".insert({ ...retentionRow, locale: locale ?? null })"));
  assert.ok(sources.requestRoute.includes(".insert({ ...baseRow, locale: locale ?? null })"));
  assert.ok(sources.requestRoute.includes(".insert(baseRow)"));
});

test("retention report selects only expired submitted non-held requests", async () => {
  const { buildRetentionReport } = await loadRetentionModule();
  const now = new Date("2026-08-28T10:00:00.000Z");
  const expired = "2026-08-01T00:00:00.000Z";
  const future = "2026-09-01T00:00:00.000Z";
  const mock = installSupabaseReportMock({
    requests: [
      { id: "candidate", status: "submitted", retention_legal_hold: false, retention_expires_at: expired },
      { id: "held", status: "submitted", retention_legal_hold: true, retention_expires_at: expired },
      { id: "pending", status: "pending", retention_legal_hold: false, retention_expires_at: expired },
      { id: "future", status: "submitted", retention_legal_hold: false, retention_expires_at: future }
    ],
    filesByRequestId: {
      candidate: [
        { id: "file-1", request_id: "candidate", declared_size: 1000 },
        { id: "file-2", request_id: "candidate", declared_size: 2000 }
      ]
    }
  });

  const report = await buildRetentionReport({ now, supabase: mock.client });

  assert.equal(report.mode, "report-only");
  assert.equal(report.candidateRequests, 1);
  assert.equal(report.associatedFiles, 2);
  assert.equal(report.declaredStorageBytes, 3000);
  assert.equal(report.oldestExpiry, expired);
  assert.equal(report.newestExpiry, expired);
  assert.equal(report.skippedDueToHolds, 1);
  assert.equal(report.skippedIncompleteUploads, 1);
  assert.equal(report.inconsistentRecords, 0);
  assert.deepEqual(mock.forbidden, []);
});

test("retention report output contains no PII, paths, tokens or filenames", async () => {
  const { buildRetentionReport } = await loadRetentionModule();
  const mock = installSupabaseReportMock({
    requests: [
      {
        id: "candidate",
        status: "submitted",
        retention_legal_hold: false,
        retention_expires_at: "2026-08-01T00:00:00.000Z",
        name: "Private Person",
        email: "person@example.com",
        company: "Secret Company",
        message: "Sensitive message",
        submission_token_hash: "secret-token"
      }
    ],
    filesByRequestId: {
      candidate: [
        {
          id: "file-1",
          request_id: "candidate",
          storage_path: "candidate/0-secret.pdf",
          original_filename: "secret.pdf",
          declared_size: 1000
        }
      ]
    }
  });

  const report = await buildRetentionReport({
    now: new Date("2026-08-28T10:00:00.000Z"),
    supabase: mock.client
  });
  const rendered = JSON.stringify(report);

  for (const forbidden of [
    "Private Person",
    "person@example.com",
    "Secret Company",
    "Sensitive message",
    "secret-token",
    "secret.pdf",
    "candidate/0-secret.pdf"
  ]) {
    assert.ok(!rendered.includes(forbidden), forbidden);
  }
});

test("retention endpoint is bearer-only, no-store and cannot enable deletion", () => {
  assert.ok(sources.config.includes('retentionCronSecret: () => required("CRON_SECRET")'));
  assert.ok(sources.endpoint.includes("timingSafeEqual"));
  assert.ok(sources.endpoint.includes("request.headers.get(\"authorization\")"));
  assert.ok(!sources.endpoint.includes("searchParams"));
  assert.ok(!sources.endpoint.includes("request.nextUrl"));
  assert.ok(sources.endpoint.includes("status: 503"));
  assert.ok(sources.endpoint.includes("status: 401"));
  assert.ok(sources.endpoint.includes('"Cache-Control": "no-store"'));
  assert.ok(sources.endpoint.includes("buildRetentionReport()"));
  assert.ok(!sources.endpoint.includes(".delete"));
  assert.ok(!sources.endpoint.includes(".remove"));
});

test("report-only boundary contains no database delete or Storage removal", () => {
  assert.ok(!sources.retention.includes(".delete("));
  assert.ok(!sources.retention.includes(".remove("));
  assert.ok(!sources.retention.includes("storage.from"));
  assert.ok(!sources.endpoint.includes(".delete("));
  assert.ok(!sources.endpoint.includes(".remove("));
});

test("operator document describes holds, extension, report-only checks and review", () => {
  for (const token of [
    "Report-Only Procedure",
    "retention_legal_hold = true",
    "retention_hold_reason",
    "Do not put personal data",
    "retention_expires_at",
    "CRON_SECRET",
    "/api/internal/retention",
    "must not expose names, emails",
    "Before any later deletion system is enabled"
  ]) {
    assert.ok(sources.docs.includes(token), token);
  }
});

test("existing GA consent assertions remain present", () => {
  for (const token of [
    "GA script is absent before a decision and after rejection",
    "Consent Mode v2 defaults deny all four signals",
    "GA script loads once after acceptance and page views are deduplicated",
    "decision persists and withdrawal deletes accessible GA cookies"
  ]) {
    assert.ok(sources.analyticsConsent.includes(token), token);
  }
});
