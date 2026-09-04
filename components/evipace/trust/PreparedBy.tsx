const copy = {
  en: {
    preparedBy: "Prepared by Evipace",
    published: "Published",
    updated: "Last updated",
    locale: "en-GB"
  },
  de: {
    preparedBy: "Erstellt von Evipace",
    published: "Veröffentlicht",
    updated: "Zuletzt aktualisiert",
    locale: "de-DE"
  }
} as const;

type PreparedByProps = {
  locale: "en" | "de";
  /**
   * ISO date strings from the page registry (lib/seo/page-registry.ts).
   * Both are optional and both are currently unset for every resource
   * page — no real publication record exists yet, and a date derived from
   * a commit or a deploy would assert a freshness signal that never
   * happened. When a real date is added to the registry it appears here
   * automatically, in semantic <time> markup.
   */
  datePublished?: string;
  dateModified?: string;
};

function formatDate(value: string, locale: "en" | "de") {
  return new Date(value).toLocaleDateString(copy[locale].locale, {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

/**
 * The editorial colophon rendered at the foot of every resource page: organization-level authorship,
 * plus real dates when — and only when — the registry has them.
 *
 * Authorship is deliberately the Evipace organization rather than a named
 * person: no individual is credited as the author of any specific resource,
 * so an organization credit is the truthful one. It matches the `author`
 * and `publisher` references in lib/seo/schema/article.ts, which both point
 * at the Organization entity.
 */
export function PreparedBy({
  locale,
  datePublished,
  dateModified
}: PreparedByProps) {
  const labels = copy[locale];

  return (
    <section className="border-t border-[rgba(21,21,21,0.1)] bg-[var(--paper)] py-8 sm:py-10">
      <div className="site-shell">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-semibold text-[rgba(21,21,21,0.5)]">
          <p>{labels.preparedBy}</p>
          {datePublished ? (
            <p>
              {labels.published}:{" "}
              <time dateTime={datePublished}>
                {formatDate(datePublished, locale)}
              </time>
            </p>
          ) : null}
          {dateModified ? (
            <p>
              {labels.updated}:{" "}
              <time dateTime={dateModified}>
                {formatDate(dateModified, locale)}
              </time>
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
