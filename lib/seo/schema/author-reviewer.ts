/**
 * Typed shape for future author/reviewer data, to be used by Article/Person
 * schema once real, verified information exists. This is a data structure
 * only — nothing in this file renders JSON-LD, and no Person schema should
 * be built from this until it's populated with real, approved data.
 */
export type ReviewerInfo = {
  name: string;
  role: string;
};

/**
 * Populate once real reviewer/author information is approved for
 * publication. Left undefined for now — do not fill this with inferred or
 * placeholder data.
 */
export const defaultReviewer: ReviewerInfo | undefined = undefined;
