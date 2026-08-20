import type { Locale } from "@/lib/evipace-locales";
import { locales, isActiveLocale } from "@/lib/evipace-locales";

/**
 * A single page's SEO metadata, keyed by locale + page key in `pageRegistry`
 * below. This is the only place title/description/canonical-path/OG-image
 * should be authored — page components read from here rather than defining
 * their own copies.
 */
export type PageMetadataEntry = {
  /** <title> and og:title source. */
  title: string;
  /** <meta description> and og:description source. */
  description: string;
  /**
   * Locale-prefixed path, e.g. "/en". Resolved against SITE_URL to produce
   * the self-referencing canonical and the Open Graph url.
   */
  path: string;
  /** Optional page-specific OG image; falls back to the brand default. */
  ogImage?: {
    url: string;
    width: number;
    height: number;
    alt: string;
  };
  /**
   * ISO date string (e.g. "2026-08-19"). Only set for pages that carry a
   * "Last reviewed" line (regulatory/trust pages) — read by
   * components/evipace/trust/LastReviewed.tsx so the date lives in exactly
   * one place rather than being hand-typed into a component.
   */
  lastReviewed?: string;
};

/** Identifies a page independent of locale, e.g. "home". Grows over time. */
export type PageKey = "home" | "about" | "methodology" | "sendRequest";

type LocaleRegistry = Partial<Record<PageKey, PageMetadataEntry>>;

/**
 * Per-locale, per-page registry. Only locales/pages with real, reviewed
 * content get an entry. Empty objects for "de" and "sl" are structural
 * placeholders for the type shape — not placeholder content — and must
 * stay empty until genuine localized pages exist.
 */
export const pageRegistry: Record<Locale, LocaleRegistry> = {
  en: {
    home: {
      title: "Evipace — ESG, done faster.",
      description:
        "Done-for-you ESG support for European manufacturers. Supplier questionnaires, VSME reporting, Scope 1 & 2 calculations and supporting ESG documentation.",
      path: "/en"
    },
    methodology: {
      title: "Methodology | Evipace",
      description:
        "How Evipace prepares ESG questionnaire responses, VSME reports and Scope 1 & 2 calculations — our process, review and limitations explained.",
      path: "/en/methodology",
      // Hand-set when the content is actually reviewed — never derived from
      // a build/deploy timestamp. Update this only when the methodology
      // copy itself has been re-reviewed.
      lastReviewed: "2026-08-19"
    }
  },
  de: {},
  sl: {}
};

export function getPageMetadataEntry(
  locale: string,
  pageKey: PageKey
): PageMetadataEntry | undefined {
  if (!(locales as readonly string[]).includes(locale)) {
    return undefined;
  }

  return pageRegistry[locale as Locale]?.[pageKey];
}

/**
 * Every page key that appears anywhere in the registry, derived by scanning
 * the registry itself rather than maintained as a separate list. Used by
 * app/sitemap.ts to discover what pages exist — a page key only needs to be
 * added once, here in pageRegistry, for the sitemap to find it.
 */
export function getAllPageKeys(): PageKey[] {
  const keys = new Set<PageKey>();
  for (const locale of locales) {
    for (const key of Object.keys(pageRegistry[locale]) as PageKey[]) {
      keys.add(key);
    }
  }
  return Array.from(keys);
}

/**
 * The active, real equivalents of one page across locales — i.e. locales
 * that are both globally active (evipace-locales.ts) and have a real
 * registry entry for this exact page key. This is the single shared
 * definition of "genuine page equivalence": both the hreflang alternates
 * (lib/seo/build-metadata.ts) and the sitemap (app/sitemap.ts) read from
 * this function so they can never drift apart from each other or from the
 * registry.
 */
export function getActivePageGroup(
  pageKey: PageKey
): Array<{ locale: Locale; entry: PageMetadataEntry }> {
  return locales
    .filter((locale) => isActiveLocale(locale))
    .map((locale) => ({ locale, entry: pageRegistry[locale]?.[pageKey] }))
    .filter(
      (candidate): candidate is { locale: Locale; entry: PageMetadataEntry } =>
        Boolean(candidate.entry)
    );
}
