import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { requestUploadsConfig } from "@/lib/server/config";
import { getSupabaseAdminClient } from "@/lib/server/supabase-admin";
import { verifySubmissionToken } from "@/lib/server/submission-token";
import { verifyUploadedFiles } from "@/lib/server/request-storage";
import { deliverInternalNotification, deliverVisitorConfirmation } from "@/lib/server/notify";

const finalizeBodySchema = z.object({
  submissionToken: z.string().min(1)
});

type Params = { params: Promise<{ id: string }> };

export async function POST(request: NextRequest, { params }: Params) {
  if (!requestUploadsConfig.uploadsEnabled()) {
    return NextResponse.json({ error: "not_available" }, { status: 503 });
  }

  const { id: requestId } = await params;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsedBody = finalizeBodySchema.safeParse(body);
  if (!parsedBody.success) {
    return NextResponse.json({ error: "missing_submission_token" }, { status: 400 });
  }

  const supabase = getSupabaseAdminClient();

  // --- Authorization: requestId alone is never sufficient. ---
  const { data: requestRow, error: fetchError } = await supabase
    .from("inbound_requests")
    .select("id, status, submission_token_hash")
    .eq("id", requestId)
    .single<{ id: string; status: string; submission_token_hash: string }>();

  if (fetchError || !requestRow) {
    // Same response whether the id doesn't exist or the token is wrong —
    // don't leak which one failed.
    return NextResponse.json({ error: "not_found_or_unauthorized" }, { status: 404 });
  }

  const authorized = verifySubmissionToken(
    parsedBody.data.submissionToken,
    requestRow.submission_token_hash
  );
  if (!authorized) {
    return NextResponse.json({ error: "not_found_or_unauthorized" }, { status: 404 });
  }

  // --- Idempotent short-circuit: already finalized, nothing to re-verify
  // or re-transition. But notification delivery is a SEPARATE concern from
  // the DB transition — if the process crashed after the transition
  // committed but before the email sent, the request is correctly
  // 'submitted' with a notification status still 'pending'/'failed'. This
  // path must still attempt delivery (each delivery function checks its
  // own status and no-ops if already 'sent', so this is safe to call on
  // every finalize, not just the first). Skipping this here was the bug:
  // returning immediately meant a crashed notification could never be
  // retried by a client-triggered finalize call again.
  if (requestRow.status === "submitted") {
    await deliverInternalNotification(requestId);
    await deliverVisitorConfirmation(requestId);
    return NextResponse.json({ success: true, requestId, alreadyFinalized: true });
  }

  // --- Exact-match verification, BEFORE any state transition. ---
  const { data: fileRows, error: filesFetchError } = await supabase
    .from("inbound_request_files")
    .select("storage_path, declared_size")
    .eq("request_id", requestId);

  if (filesFetchError || !fileRows || fileRows.length === 0) {
    return NextResponse.json({ error: "no_files_registered" }, { status: 409 });
  }

  const verification = await verifyUploadedFiles(
    fileRows.map((f: { storage_path: string; declared_size: number }) => ({
      path: f.storage_path,
      declaredSize: f.declared_size
    }))
  );

  if (!verification.allPresent) {
    return NextResponse.json(
      {
        error: "upload_incomplete",
        missing: verification.missing,
        sizeMismatches: verification.sizeMismatches
      },
      { status: 409 }
    );
  }

  // --- Atomic, idempotent DB transition (see the RPC's own doc comment). ---
  const { data: rpcResult, error: rpcError } = await supabase.rpc(
    "finalize_inbound_request",
    { p_request_id: requestId }
  );

  if (rpcError || !rpcResult || rpcResult.length === 0) {
    return NextResponse.json({ error: "finalize_failed" }, { status: 500 });
  }

  // rpcResult[0].already_submitted distinguishes "we just performed the
  // flip" from "a concurrent call already did" — not used for branching
  // here since both paths need the same notification-delivery attempt
  // below, but kept available in rpcResult for logging/debugging.

  // Submission success is reported based on the transition above — never
  // on notification delivery, which happens next as a best-effort
  // side-effect. A visitor's request is "received" the moment their files
  // are verified and the record is submitted, regardless of Resend's
  // availability right now. Both delivery functions are self-idempotent
  // (they check current status and no-op if already 'sent'), so it's safe
  // to call them unconditionally here even if a concurrent finalize call
  // already performed the transition.
  await deliverInternalNotification(requestId);
  await deliverVisitorConfirmation(requestId);

  return NextResponse.json({ success: true, requestId });
}
