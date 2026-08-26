import "server-only";
import { getSupabaseAdminClient } from "./supabase-admin";
import { requestUploadsConfig } from "./config";
import { sanitizeFilename } from "./sanitize-filename";
import { getCanonicalMimeType } from "@/lib/request-upload-constants";
import type { NotificationFile } from "./request-notification-email";

/**
 * Turns the storage objects of one already-validated submission into
 * either real email attachments or time-limited signed download links.
 *
 * Nothing here ever accepts a URL or a path from a visitor: the only
 * inputs are rows this server wrote itself into inbound_request_files
 * during POST /api/requests, and every one of those paths is re-checked
 * against the owning request id before a single byte is read.
 */

/**
 * Resend's documented ceiling for one message, taken from the installed
 * client's own typings ("max 40mb per email", resend@6.20.0,
 * CreateEmailBaseOptions.attachments).
 */
export const RESEND_MAX_MESSAGE_BYTES = 40 * 1024 * 1024;

/**
 * Attachment bytes travel base64-encoded, which inflates them by 4/3 plus
 * line breaks. Budgeting on the *encoded* size — and spending only 60% of
 * the provider ceiling — leaves ample headroom for the HTML body, the
 * plain-text part, headers and MIME boundaries, so a submission that
 * passes this check cannot push the real message over 40 MB.
 *
 * The form permits 5 x 25 MB, so not every valid submission fits. That is
 * exactly why the link fallback below exists.
 */
export const ATTACHMENT_ENCODED_BUDGET_BYTES = Math.floor(
  RESEND_MAX_MESSAGE_BYTES * 0.6
);

/** Reserved for the HTML part, the text part, headers and boundaries. */
export const EMAIL_BODY_RESERVE_BYTES = 256 * 1024;

/** Seven days, per the brief; the shortest useful window for a human inbox. */
export const SIGNED_LINK_EXPIRY_SECONDS = 7 * 24 * 60 * 60;
export const SIGNED_LINK_EXPIRY_DAYS = SIGNED_LINK_EXPIRY_SECONDS / 86_400;

/** Exact size of `n` raw bytes once base64-encoded. */
export function base64Size(rawBytes: number): number {
  return Math.ceil(rawBytes / 3) * 4;
}

export type StoredFileRow = {
  storage_path: string;
  original_filename: string;
  declared_size: number;
  declared_mime: string;
};

export type PreparedAttachment = {
  filename: string;
  content: Buffer;
  contentType: string;
};

export type AttachmentPlan = {
  attachments: PreparedAttachment[];
  files: NotificationFile[];
  warnings: string[];
};

/**
 * Defence in depth against a tampered or corrupted row: a storage path
 * belonging to this request is always exactly "<requestId>/<name>", as
 * produced by buildStoragePath(). Anything else — a traversal segment, a
 * backslash, an extra directory level, another request's id — is refused
 * before it is handed to Storage.
 */
export function isPathOwnedByRequest(path: string, requestId: string): boolean {
  if (path.includes("..") || path.includes("\\")) return false;
  const segments = path.split("/");
  if (segments.length !== 2) return false;
  const [owner, name] = segments;
  return owner === requestId && name.length > 0;
}

/**
 * The display name shown in the email and used as the attachment
 * filename. Re-sanitized here rather than trusted from the database, so
 * a filename can never carry a path separator into a mail client.
 */
export function displayFilename(originalFilename: string): string {
  return sanitizeFilename(originalFilename);
}

/**
 * Canonical, server-chosen MIME type — the same fixed value Storage was
 * told to record at upload time, never the browser-reported
 * `declared_mime`, which can be empty or inconsistent.
 */
function attachmentMimeType(originalFilename: string, declaredMime: string): string {
  return (
    getCanonicalMimeType(originalFilename) ??
    getCanonicalMimeType(displayFilename(originalFilename)) ??
    (declaredMime.trim() || "application/octet-stream")
  );
}

/**
 * Deterministic hybrid policy. Files are considered in submission order
 * (storage paths are index-prefixed, so the caller's ordering is stable),
 * and each is attached when its encoded size still fits the remaining
 * budget; otherwise it falls through to a signed link. The greedy pass is
 * order-dependent by design — the same submission always produces the
 * same split.
 *
 * Every file ends up in exactly one of three states — attached, link, or
 * unavailable-with-a-warning. None is ever dropped silently, and no raw
 * bucket path is ever placed in the returned display data.
 */
export async function prepareRequestAttachments(
  requestId: string,
  rows: StoredFileRow[]
): Promise<AttachmentPlan> {
  const supabase = getSupabaseAdminClient();
  const bucket = requestUploadsConfig.storageBucket();

  const attachments: PreparedAttachment[] = [];
  const files: NotificationFile[] = [];
  const warnings: string[] = [];

  let encodedUsed = EMAIL_BODY_RESERVE_BYTES;

  for (const row of rows) {
    const filename = displayFilename(row.original_filename);
    const mimeType = attachmentMimeType(row.original_filename, row.declared_mime);
    const declaredSize = Number(row.declared_size) || 0;

    if (!isPathOwnedByRequest(row.storage_path, requestId)) {
      files.push({
        filename,
        sizeBytes: declaredSize,
        mimeType,
        delivery: "unavailable",
        note: "This document could not be verified as belonging to this request. Retrieve it from secure storage."
      });
      warnings.push(
        `"${filename}" was skipped because its stored location did not match this request.`
      );
      continue;
    }

    const fitsBudget =
      encodedUsed + base64Size(declaredSize) <= ATTACHMENT_ENCODED_BUDGET_BYTES;

    if (fitsBudget) {
      const { data, error } = await supabase.storage.from(bucket).download(row.storage_path);

      if (!error && data) {
        const content = Buffer.from(await data.arrayBuffer());
        // Budget against the bytes actually read, not the declared size.
        const encoded = base64Size(content.byteLength);

        if (encodedUsed + encoded <= ATTACHMENT_ENCODED_BUDGET_BYTES) {
          attachments.push({ filename, content, contentType: mimeType });
          encodedUsed += encoded;
          files.push({
            filename,
            sizeBytes: content.byteLength,
            mimeType,
            delivery: "attached"
          });
          continue;
        }
      }
      // Download failed, or the real bytes overran the declared size —
      // fall through to a signed link rather than dropping the file.
    }

    const link = await createSignedDownloadLink(row.storage_path);

    if (link) {
      files.push({
        filename,
        sizeBytes: declaredSize,
        mimeType,
        delivery: "link",
        downloadUrl: link
      });
    } else {
      files.push({
        filename,
        sizeBytes: declaredSize,
        mimeType,
        delivery: "unavailable",
        note: "No secure download link could be generated. Retrieve this document from secure storage using the reference above."
      });
      warnings.push(
        `A secure download link could not be created for "${filename}". Retrieve it from secure storage using the reference above.`
      );
    }
  }

  return { attachments, files, warnings };
}

/**
 * A private-bucket, time-limited signed URL. Never a public URL, never a
 * permanent one — Supabase signs a token valid for exactly
 * SIGNED_LINK_EXPIRY_SECONDS and the bucket itself stays private.
 * The storage copy is untouched: signing reads nothing and deletes
 * nothing.
 */
async function createSignedDownloadLink(path: string): Promise<string | null> {
  const supabase = getSupabaseAdminClient();
  const bucket = requestUploadsConfig.storageBucket();

  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrl(path, SIGNED_LINK_EXPIRY_SECONDS, { download: true });

    if (error || !data?.signedUrl) return null;
    return data.signedUrl;
  } catch {
    return null;
  }
}
