import { NextResponse, type NextRequest } from "next/server";
import { requestUploadsConfig } from "@/lib/server/config";
import { getSupabaseAdminClient } from "@/lib/server/supabase-admin";
import { createSignedUploads } from "@/lib/server/request-storage";
import { buildStoragePath } from "@/lib/server/sanitize-filename";
import { generateSubmissionToken, hashSubmissionToken } from "@/lib/server/submission-token";
import { getClientIp, hmacIp } from "@/lib/server/rate-limit";
import { requestSubmissionSchema } from "@/lib/validation/request-form";
import {
  RATE_LIMIT_MAX_PER_HOUR,
  RATE_LIMIT_WINDOW_MS,
  getCanonicalMimeType
} from "@/lib/request-upload-constants";

export async function POST(request: NextRequest) {
  if (!requestUploadsConfig.uploadsEnabled()) {
    return NextResponse.json({ error: "not_available" }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = requestSubmissionSchema.safeParse(body);
  if (!parsed.success) {
    // Honeypot hits land here too (website field fails max(0)) — same
    // generic response as any other validation failure, no signal to a
    // bot that it was specifically caught.
    return NextResponse.json(
      { error: "validation_failed", issues: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const { name, email, company, message, deadline, locale, files } = parsed.data;

  const supabase = getSupabaseAdminClient();
  const ip = getClientIp(request.headers);
  const ipHmac = hmacIp(ip);

  const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();
  const { count } = await supabase
    .from("inbound_requests")
    .select("id", { count: "exact", head: true })
    .eq("ip_hmac", ipHmac)
    .gte("created_at", windowStart);

  if ((count ?? 0) >= RATE_LIMIT_MAX_PER_HOUR) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  const plaintextToken = generateSubmissionToken();
  const tokenHash = hashSubmissionToken(plaintextToken);

  const baseRow = {
    name,
    email,
    company,
    message: message ?? null,
    deadline: deadline ?? null,
    submission_token_hash: tokenHash,
    ip_hmac: ipHmac
  };

  // `locale` arrived with supabase/migrations/20260826000000_inbound_requests_locale.sql.
  // If that migration has not been applied to the target database yet, the
  // insert would otherwise fail on an unknown column and take every
  // submission down with it. A failed insert writes no row, so retrying
  // once without the field cannot duplicate anything — the submission
  // succeeds and the notification simply reports the locale as not
  // recorded. Remove this fallback once the migration is deployed
  // everywhere.
  let requestRow: { id: string } | null = null;

  const firstAttempt = await supabase
    .from("inbound_requests")
    .insert({ ...baseRow, locale: locale ?? null })
    .select("id")
    .single<{ id: string }>();

  if (firstAttempt.data) {
    requestRow = firstAttempt.data;
  } else {
    const retry = await supabase
      .from("inbound_requests")
      .insert(baseRow)
      .select("id")
      .single<{ id: string }>();
    requestRow = retry.data ?? null;
  }

  if (!requestRow) {
    return NextResponse.json({ error: "could_not_create_request" }, { status: 500 });
  }

  const requestId = requestRow.id;

  const fileRows = files.map((file, index) => ({
    request_id: requestId,
    storage_path: buildStoragePath(requestId, index, file.filename),
    original_filename: file.filename,
    declared_size: file.size,
    declared_mime: file.mimeType
  }));

  const { error: filesError } = await supabase
    .from("inbound_request_files")
    .insert(fileRows);

  if (filesError) {
    return NextResponse.json({ error: "could_not_register_files" }, { status: 500 });
  }

  let signedUploads;
  try {
    signedUploads = await createSignedUploads(fileRows.map((f) => f.storage_path));
  } catch {
    return NextResponse.json({ error: "could_not_issue_upload_urls" }, { status: 500 });
  }

  return NextResponse.json({
    requestId,
    submissionToken: plaintextToken,
    uploads: fileRows.map((f, index) => ({
      filename: f.original_filename,
      path: f.storage_path,
      token: signedUploads[index].token,
      endpoint: `${requestUploadsConfig.supabaseStorageUrl()}/storage/v1/upload/resumable/sign`,
      bucketName: requestUploadsConfig.storageBucket(),
      // Canonical, server-chosen MIME for Storage metadata — never the
      // browser-reported File.type, which can be empty or inconsistent.
      // Safe by construction: getCanonicalMimeType only returns a value
      // for extensions that already passed isAllowedFile() validation
      // above (requestSubmissionSchema.safeParse), so this is never
      // undefined here in practice.
      contentType: getCanonicalMimeType(f.original_filename) ?? "application/octet-stream"
    }))
  });
}
