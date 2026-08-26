import "server-only";
import { Resend } from "resend";
import { requestUploadsConfig } from "./config";
import { getSupabaseAdminClient } from "./supabase-admin";
import { buildRequestNotificationEmail } from "./request-notification-email";
import {
  prepareRequestAttachments,
  SIGNED_LINK_EXPIRY_DAYS,
  type StoredFileRow
} from "./request-attachments";

/**
 * Durable notification tracking: rather than a separate outbox table, the
 * two notification kinds (internal, visitor confirmation) are tracked
 * directly as columns on inbound_requests — internal_notification_status
 * and visitor_confirmation_status, each 'pending' | 'sent' | 'failed' |
 * 'skipped'. This is the simpler alternative to a generic outbox table:
 * there are only ever these two fixed notification kinds per request, so a
 * join to a separate table buys nothing. The crash-safety property is
 * identical either way — status='submitted' with notification
 * status='pending' is itself the durable "this is due" signal a retry
 * sweep can query for, exactly like an outbox row would be.
 *
 * A request's submission success is independent of notification delivery:
 * finalize() in the API route reports success to the browser once the DB
 * transaction (upload verification + pending->submitted) commits — the
 * calls in this file are best-effort delivery attempts made afterward,
 * and their failure never turns that HTTP response into an error.
 */

type RequestRow = {
  id: string;
  name: string;
  email: string;
  company: string;
  message: string | null;
  deadline: string | null;
  created_at: string;
  submitted_at: string | null;
  internal_notification_status: string;
  internal_notification_attempts: number;
  visitor_confirmation_status: string;
  visitor_confirmation_attempts: number;
};

function getResendClient() {
  return new Resend(requestUploadsConfig.resendApiKey());
}

/**
 * Reads the submitted locale without making the whole notification depend
 * on the column existing yet. A deployment whose database has not run the
 * locale migration still sends a complete email — the field simply reads
 * "Not recorded" — instead of failing every notification on an unknown
 * column. Kept as its own tolerant query for exactly that reason.
 */
async function readSubmittedLocale(requestId: string): Promise<string | null> {
  try {
    const supabase = getSupabaseAdminClient();
    const { data, error } = await supabase
      .from("inbound_requests")
      .select("locale")
      .eq("id", requestId)
      .single<{ locale: string | null }>();

    if (error || !data) return null;
    return data.locale ?? null;
  } catch {
    return null;
  }
}

/**
 * Attempts the internal notification for one submitted request. Safe to
 * call multiple times (idempotent): skips immediately if already 'sent'.
 *
 * Uploaded documents travel as real email attachments whenever the whole
 * message stays safely under the provider's size ceiling; anything that
 * does not fit gets a time-limited signed download link instead. Neither
 * path exposes a raw bucket path, and neither removes the storage copy —
 * see lib/server/request-attachments.ts for the policy itself.
 */
export async function deliverInternalNotification(
  requestId: string
): Promise<{ delivered: boolean; skipped: boolean; error?: string }> {
  const supabase = getSupabaseAdminClient();

  const { data: request, error: fetchError } = await supabase
    .from("inbound_requests")
    .select(
      "id, name, email, company, message, deadline, created_at, submitted_at, internal_notification_status, internal_notification_attempts"
    )
    .eq("id", requestId)
    .eq("status", "submitted")
    .single<RequestRow>();

  if (fetchError || !request) {
    return { delivered: false, skipped: true, error: "request not found or not submitted" };
  }

  if (request.internal_notification_status === "sent") {
    return { delivered: true, skipped: true };
  }

  // Ordered by storage_path: buildStoragePath() prefixes each object with
  // its submission index, so this reproduces the order the visitor chose
  // and makes the attach/link split below deterministic.
  const { data: fileRows, error: filesError } = await supabase
    .from("inbound_request_files")
    .select("storage_path, original_filename, declared_size, declared_mime")
    .eq("request_id", requestId)
    .order("storage_path", { ascending: true });

  const locale = await readSubmittedLocale(requestId);

  const rows: StoredFileRow[] = (fileRows ?? []) as StoredFileRow[];

  // A retrieval failure must not cost us the notification: fall back to
  // naming every file with an operational warning rather than sending
  // nothing at all. Storage copies are untouched either way.
  let plan;
  try {
    if (filesError) throw new Error("could not read the file list");
    plan = await prepareRequestAttachments(requestId, rows);
  } catch {
    plan = {
      attachments: [],
      files: rows.map((row) => ({
        filename: row.original_filename,
        sizeBytes: Number(row.declared_size) || 0,
        mimeType: row.declared_mime,
        delivery: "unavailable" as const,
        note: "Retrieve this document from secure storage using the reference above."
      })),
      warnings: [
        "Uploaded documents could not be prepared for this email. They remain safely in storage — retrieve them using the reference above."
      ]
    };
  }

  const email = buildRequestNotificationEmail({
    requestId: request.id,
    submittedAt: request.submitted_at ?? request.created_at,
    locale,
    name: request.name,
    email: request.email,
    company: request.company,
    deadline: request.deadline,
    message: request.message,
    files: plan.files,
    linkExpiryDays: SIGNED_LINK_EXPIRY_DAYS,
    warnings: plan.warnings
  });

  try {
    const resend = getResendClient();
    const { error: sendError } = await resend.emails.send(
      {
        from: requestUploadsConfig.notificationSender(),
        to: requestUploadsConfig.notificationRecipient(),
        // The visitor's address is never the authenticated sender — the
        // verified Evipace sender stays in `from`, and replying in a mail
        // client answers the visitor directly.
        replyTo: request.email,
        subject: email.subject,
        html: email.html,
        text: email.text,
        attachments: plan.attachments.map((attachment) => ({
          filename: attachment.filename,
          content: attachment.content,
          contentType: attachment.contentType
        }))
      },
      { idempotencyKey: `internal-notify-${requestId}` }
    );

    if (sendError) throw new Error(sendError.message);

    await supabase
      .from("inbound_requests")
      .update({ internal_notification_status: "sent" })
      .eq("id", requestId);

    return { delivered: true, skipped: false };
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown error";
    await supabase
      .from("inbound_requests")
      .update({
        internal_notification_status: "failed",
        internal_notification_attempts: request.internal_notification_attempts + 1,
        internal_notification_last_error: message.slice(0, 500)
      })
      .eq("id", requestId);

    return { delivered: false, skipped: false, error: message };
  }
}

/**
 * Visitor-facing confirmation — gated behind EVIPACE_VISITOR_CONFIRMATION_ENABLED
 * until an Evipace-branded sending domain is verified in Resend. No file
 * links or attachments.
 */
export async function deliverVisitorConfirmation(
  requestId: string
): Promise<{ delivered: boolean; skipped: boolean; error?: string }> {
  const supabase = getSupabaseAdminClient();

  if (!requestUploadsConfig.visitorConfirmationEnabled()) {
    await supabase
      .from("inbound_requests")
      .update({ visitor_confirmation_status: "skipped" })
      .eq("id", requestId)
      .eq("visitor_confirmation_status", "pending");
    return { delivered: false, skipped: true };
  }

  const senderAddress = requestUploadsConfig.confirmationSender();
  if (!senderAddress) {
    return { delivered: false, skipped: true, error: "no confirmation sender configured" };
  }

  const { data: request, error: fetchError } = await supabase
    .from("inbound_requests")
    .select("id, name, email, visitor_confirmation_status, visitor_confirmation_attempts")
    .eq("id", requestId)
    .eq("status", "submitted")
    .single<Pick<RequestRow, "id" | "name" | "email" | "visitor_confirmation_status" | "visitor_confirmation_attempts">>();

  if (fetchError || !request) {
    return { delivered: false, skipped: true, error: "request not found or not submitted" };
  }

  if (request.visitor_confirmation_status === "sent") {
    return { delivered: true, skipped: true };
  }

  try {
    const resend = getResendClient();
    const { error: sendError } = await resend.emails.send(
      {
        from: senderAddress,
        to: request.email,
        subject: "We've received your ESG request",
        text: `Hi ${request.name},\n\nWe've received your request and the files you sent. We'll be in touch shortly.\n\n— Evipace`
      },
      { idempotencyKey: `visitor-confirm-${requestId}` }
    );

    if (sendError) throw new Error(sendError.message);

    await supabase
      .from("inbound_requests")
      .update({ visitor_confirmation_status: "sent" })
      .eq("id", requestId);

    return { delivered: true, skipped: false };
  } catch (err) {
    const message = err instanceof Error ? err.message : "unknown error";
    await supabase
      .from("inbound_requests")
      .update({
        visitor_confirmation_status: "failed",
        visitor_confirmation_attempts: request.visitor_confirmation_attempts + 1
      })
      .eq("id", requestId);

    return { delivered: false, skipped: false, error: message };
  }
}

/**
 * Retry sweep for any submitted request whose notifications are still
 * due (status pending/failed). Safe to call repeatedly/on a schedule —
 * every underlying delivery call is itself idempotent.
 */
export async function retryUnsentNotifications(limit = 25): Promise<{
  processed: number;
}> {
  const supabase = getSupabaseAdminClient();

  const { data: due } = await supabase
    .from("inbound_requests")
    .select("id")
    .eq("status", "submitted")
    .in("internal_notification_status", ["pending", "failed"])
    .limit(limit);

  for (const row of due ?? []) {
    await deliverInternalNotification((row as { id: string }).id);
  }

  return { processed: due?.length ?? 0 };
}
