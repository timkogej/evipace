const copy = {
  en: {
    label: "Last methodologically reviewed",
    locale: "en-GB"
  },
  de: {
    label: "Zuletzt methodisch geprüft",
    locale: "de-DE"
  }
} as const;

type LastReviewedProps = {
  /** ISO date string in YYYY-MM-DD form, from the page registry. */
  date: string;
  locale: "en" | "de";
};

/**
 * Reusable "Last reviewed" line for regulatory/trust pages.
 *
 * The date arrives as a prop rather than being hardcoded here, so each
 * page's registry entry (lib/seo/page-registry.ts `lastReviewed`) stays the
 * single source of truth. It renders inside a semantic <time> element so
 * the value is machine-readable, and the displayed text is localized while
 * the dateTime attribute stays ISO.
 */
export function LastReviewed({ date, locale }: LastReviewedProps) {
  const labels = copy[locale];
  const formatted = new Date(date).toLocaleDateString(labels.locale, {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  return (
    <p className="text-sm font-bold text-[rgba(21,21,21,0.55)]">
      {labels.label}: <time dateTime={date}>{formatted}</time>
    </p>
  );
}
