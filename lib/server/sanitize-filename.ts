import "server-only";

/**
 * Produces a safe storage-path segment from a client-supplied filename.
 * Strips path separators/traversal, control characters, and anything
 * outside a conservative safe set — never trusts the client-supplied path
 * verbatim.
 */
export function sanitizeFilename(original: string): string {
  const base = original.split(/[/\\]/).pop() ?? "file";
  const ext = base.includes(".") ? base.slice(base.lastIndexOf(".")) : "";
  const stem = ext ? base.slice(0, -ext.length) : base;

  const safeStem = stem
    .normalize("NFKD")
    .replace(/[^\w.-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

  const safeExt = ext.toLowerCase().replace(/[^a-z0-9.]/g, "");

  return `${safeStem || "file"}${safeExt}`;
}

export function buildStoragePath(
  requestId: string,
  index: number,
  originalFilename: string
): string {
  return `${requestId}/${index}-${sanitizeFilename(originalFilename)}`;
}
