export const MAX_FILES = 5;
export const MAX_FILE_SIZE_BYTES = 25 * 1024 * 1024; // 25 MB
export const MAX_TOTAL_SIZE_BYTES = 75 * 1024 * 1024; // 75 MB

export const RATE_LIMIT_MAX_PER_HOUR = 5;
export const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

/**
 * v1 allowlist, keyed by extension. Each entry has two roles, deliberately
 * separate:
 * - `acceptedMimeTypes`: what browser-reported File.type values we accept
 *   as plausible for this extension (a UX/allowlist control only, never
 *   proof of actual file contents — see lib/validation/request-form.ts).
 *   Browsers are inconsistent here (e.g. some report .csv as
 *   "application/vnd.ms-excel"), so this can list more than one value.
 * - `canonicalMimeType`: the single fixed MIME type the server tells
 *   Storage this object is, regardless of what the browser reported. This
 *   is what makes the bucket-level `allowed_mime_types` restriction safe
 *   to enable — Storage only ever sees this fixed, server-chosen value,
 *   never a possibly-empty or inconsistent client-supplied one.
 *
 * Deliberately excludes: executables/scripts, archives, macro-enabled
 * Office formats (.xlsm/.docm/.xlsb/.pptm/...), and legacy .xls/.doc.
 */
export const ALLOWED_FILE_TYPES = {
  ".xlsx": {
    acceptedMimeTypes: [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ],
    canonicalMimeType:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  },
  ".docx": {
    acceptedMimeTypes: [
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ],
    canonicalMimeType:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  },
  ".pdf": {
    acceptedMimeTypes: ["application/pdf"],
    canonicalMimeType: "application/pdf"
  },
  ".csv": {
    acceptedMimeTypes: ["text/csv", "application/vnd.ms-excel"],
    canonicalMimeType: "text/csv"
  },
  ".jpg": {
    acceptedMimeTypes: ["image/jpeg"],
    canonicalMimeType: "image/jpeg"
  },
  ".jpeg": {
    acceptedMimeTypes: ["image/jpeg"],
    canonicalMimeType: "image/jpeg"
  },
  ".png": {
    acceptedMimeTypes: ["image/png"],
    canonicalMimeType: "image/png"
  }
} satisfies Record<string, { acceptedMimeTypes: string[]; canonicalMimeType: string }>;

function getExtension(filename: string): string {
  return filename.slice(filename.lastIndexOf(".")).toLowerCase();
}

export function isAllowedFile(filename: string, mimeType: string): boolean {
  const entry = (
    ALLOWED_FILE_TYPES as Record<
      string,
      { acceptedMimeTypes: string[]; canonicalMimeType: string }
    >
  )[getExtension(filename)];
  if (!entry) return false;
  return entry.acceptedMimeTypes.includes(mimeType);
}

/**
 * The fixed MIME type to tell Storage this object is, given a filename
 * that has already passed isAllowedFile(). Never derived from the
 * browser-reported File.type.
 */
export function getCanonicalMimeType(filename: string): string | undefined {
  const entry = (
    ALLOWED_FILE_TYPES as Record<
      string,
      { acceptedMimeTypes: string[]; canonicalMimeType: string }
    >
  )[getExtension(filename)];
  return entry?.canonicalMimeType;
}
