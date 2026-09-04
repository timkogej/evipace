import Link from "next/link";

/**
 * Visible breadcrumb for the German service landing pages, mirroring the
 * markup and styling the English commercial template already uses
 * (components/evipace/english-commercial/EnglishCommercialServicePage.tsx).
 *
 * It exists so the BreadcrumbList JSON-LD on those pages describes a
 * hierarchy a reader can actually see and follow — the two must always
 * agree, so the `current` label passed here is the same string used for the
 * final BreadcrumbList item in the page's schema graph.
 */
export function ServiceBreadcrumb({
  current,
  homeHref = "/de",
  homeLabel = "Startseite"
}: {
  current: string;
  homeHref?: string;
  homeLabel?: string;
}) {
  return (
    <div className="site-shell">
      <nav
        aria-label="Brotkrümelnavigation"
        className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[rgba(21,21,21,0.52)]"
      >
        <Link className="transition hover:text-orange" href={homeHref}>
          {homeLabel}
        </Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page" className="text-ink">
          {current}
        </span>
      </nav>
    </div>
  );
}
