type LastReviewedProps = {
  date: string;
};

/**
 * Reusable "Last reviewed" line for regulatory/trust pages. Takes the date
 * as a prop rather than hardcoding it here, so each page's registry entry
 * (lib/seo/page-registry.ts) remains the single source of truth — nothing
 * decorative or hand-typed scattered across page components.
 */
export function LastReviewed({ date }: LastReviewedProps) {
  const formatted = new Date(date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return (
    <p className="text-sm font-semibold text-[rgba(21,21,21,0.48)]">
      Last reviewed: {formatted}
    </p>
  );
}
