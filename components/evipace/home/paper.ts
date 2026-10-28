/**
 * Shared geometry and colours for every document and folder drawn on the
 * homepage, so the hero, the evidence library, the card icons and the trust
 * illustration all use the same sheet: one outline, one folded orange corner.
 */

/* Brand-book colours. */
export const INK = "#171717";
export const ORANGE = "#fe7001";
export const TAUPE = "#d8d0c7";
export const TAUPE_DARK = "#c9bfb4";

export type FileType = "pdf" | "xlsx" | "docx";

/** File-type badge on a document: a short label in a muted, familiar colour. */
export const FILE_TYPES: Record<FileType, { label: string; color: string }> = {
  pdf: { label: "PDF", color: "#b3362b" },
  xlsx: { label: "XLS", color: "#2f7d4f" },
  docx: { label: "DOC", color: "#2f5ea8" }
};

/** Reads the file type from a file name such as "Questionnaire.xlsx". */
export function fileTypeOf(name: string): FileType | undefined {
  const extension = name.split(".").pop()?.toLowerCase();
  if (extension === "pdf") return "pdf";
  if (extension === "xlsx" || extension === "xls" || extension === "csv") return "xlsx";
  if (extension === "docx" || extension === "doc") return "docx";
  return undefined;
}

/** Page outline with the top-right corner cut away for the fold. */
export function pagePath(x: number, y: number, w: number, h: number, fold: number, r: number) {
  return [
    `M${x + r} ${y}`,
    `H${x + w - fold}`,
    `L${x + w} ${y + fold}`,
    `V${y + h - r}`,
    `A${r} ${r} 0 0 1 ${x + w - r} ${y + h}`,
    `H${x + r}`,
    `A${r} ${r} 0 0 1 ${x} ${y + h - r}`,
    `V${y + r}`,
    `A${r} ${r} 0 0 1 ${x + r} ${y}`,
    "Z"
  ].join("");
}

/** The orange folded corner that fills the cut of `pagePath`. */
export function foldPath(x: number, y: number, w: number, fold: number, r: number) {
  const left = x + w - fold;
  return `M${left} ${y}V${y + fold - r}A${r} ${r} 0 0 0 ${left + r} ${y + fold}H${x + w}Z`;
}
