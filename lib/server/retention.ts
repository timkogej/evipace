import "server-only";
import { getSupabaseAdminClient } from "./supabase-admin";

export const RETENTION_REPORT_LIMIT = 100;

type CountResult = {
  count: number | null;
  error: { message?: string } | null;
};

type QueryResult<T> = {
  data: T[] | null;
  error: { message?: string } | null;
};

type QueryBuilder<T = unknown> = {
  select: (
    columns: string,
    options?: { count?: "exact"; head?: boolean }
  ) => QueryBuilder<T>;
  lte: (column: string, value: string) => QueryBuilder<T>;
  eq: (column: string, value: string | boolean) => QueryBuilder<T>;
  neq: (column: string, value: string | boolean) => QueryBuilder<T>;
  in: (column: string, values: string[]) => QueryBuilder<T>;
  order: (column: string, options?: { ascending?: boolean }) => QueryBuilder<T>;
  limit: (count: number) => QueryBuilder<T>;
  then: <TResult1 = QueryResult<T> | CountResult, TResult2 = never>(
    onfulfilled?:
      | ((value: QueryResult<T> | CountResult) => TResult1 | PromiseLike<TResult1>)
      | null,
    onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null
  ) => PromiseLike<TResult1 | TResult2>;
};

export type RetentionSupabaseClient = {
  from: <T = unknown>(table: string) => QueryBuilder<T>;
};

type CandidateRequestRow = {
  id: string;
  retention_expires_at: string | null;
};

type FileRow = {
  id: string;
  declared_size: number | string | null;
};

export type RetentionReport = {
  mode: "report-only";
  generatedAt: string;
  cutoff: string;
  batchLimit: number;
  candidateRequests: number;
  associatedFiles: number;
  declaredStorageBytes: number;
  oldestExpiry: string | null;
  newestExpiry: string | null;
  skippedDueToHolds: number;
  skippedIncompleteUploads: number;
  inconsistentRecords: number;
};

export function addCalendarMonths(date: Date, months: number): Date {
  const next = new Date(date.getTime());
  const originalDay = next.getUTCDate();
  next.setUTCDate(1);
  next.setUTCMonth(next.getUTCMonth() + months);
  const lastDay = new Date(
    Date.UTC(next.getUTCFullYear(), next.getUTCMonth() + 1, 0)
  ).getUTCDate();
  next.setUTCDate(Math.min(originalDay, lastDay));
  return next;
}

export function retentionExpiryForSubmission(now = new Date()): string {
  return addCalendarMonths(now, 6).toISOString();
}

async function countExpired(
  supabase: RetentionSupabaseClient,
  cutoff: string,
  filter: (query: QueryBuilder) => QueryBuilder
): Promise<number> {
  const result = (await filter(
    supabase
      .from("inbound_requests")
      .select("id", { count: "exact", head: true })
      .lte("retention_expires_at", cutoff)
  )) as CountResult;

  return result.error ? 0 : result.count ?? 0;
}

export async function buildRetentionReport({
  now = new Date(),
  limit = RETENTION_REPORT_LIMIT,
  supabase
}: {
  now?: Date;
  limit?: number;
  supabase?: RetentionSupabaseClient;
} = {}): Promise<RetentionReport> {
  const client =
    supabase ?? (getSupabaseAdminClient() as unknown as RetentionSupabaseClient);
  const cutoff = now.toISOString();
  const batchLimit = Math.max(1, Math.min(limit, RETENTION_REPORT_LIMIT));

  const skippedDueToHolds = await countExpired(client, cutoff, (query) =>
    query.eq("retention_legal_hold", true)
  );
  const skippedIncompleteUploads = await countExpired(client, cutoff, (query) =>
    query.eq("retention_legal_hold", false).neq("status", "submitted")
  );

  const candidateResult = (await client
    .from<CandidateRequestRow>("inbound_requests")
    .select("id, retention_expires_at")
    .lte("retention_expires_at", cutoff)
    .eq("retention_legal_hold", false)
    .in("status", ["submitted"])
    .order("retention_expires_at", { ascending: true })
    .limit(batchLimit)) as QueryResult<CandidateRequestRow>;

  const candidates = candidateResult.error ? [] : candidateResult.data ?? [];
  let inconsistentRecords = candidateResult.error ? 1 : 0;
  let associatedFiles = 0;
  let declaredStorageBytes = 0;

  for (const candidate of candidates) {
    if (!candidate.retention_expires_at) {
      inconsistentRecords += 1;
      continue;
    }

    const fileResult = (await client
      .from<FileRow>("inbound_request_files")
      .select("id, declared_size")
      .eq("request_id", candidate.id)) as QueryResult<FileRow>;

    if (fileResult.error || !fileResult.data) {
      inconsistentRecords += 1;
      continue;
    }

    associatedFiles += fileResult.data.length;
    for (const file of fileResult.data) {
      const size = Number(file.declared_size);
      if (Number.isFinite(size) && size >= 0) {
        declaredStorageBytes += size;
      } else {
        inconsistentRecords += 1;
      }
    }
  }

  const expiries = candidates
    .map((candidate) => candidate.retention_expires_at)
    .filter((expiry): expiry is string => Boolean(expiry))
    .sort();

  return {
    mode: "report-only",
    generatedAt: cutoff,
    cutoff,
    batchLimit,
    candidateRequests: candidates.length,
    associatedFiles,
    declaredStorageBytes,
    oldestExpiry: expiries[0] ?? null,
    newestExpiry: expiries[expiries.length - 1] ?? null,
    skippedDueToHolds,
    skippedIncompleteUploads,
    inconsistentRecords
  };
}
