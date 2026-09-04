/**
 * Locale configuration for the Evipace site.
 *
 * `locales` is the full set of locales the routing architecture recognises
 * at the URL-segment level — used only to reject nonsense locale segments
 * (e.g. "/xx") in app/[locale]/layout.tsx. It says nothing about whether
 * any given page is actually reachable for a given locale.
 *
 * There is deliberately no locale-wide "active" flag anymore. Route
 * availability is decided per (locale, pageKey) by
 * lib/seo/page-registry.ts's isPageReachable() — the single source of
 * truth every page component calls before rendering. This is what lets one
 * German page (e.g. esg-fragebogen-lieferanten) go live without silently
 * making every other /de/* route reachable too.
 */
export const locales = ["en", "de", "sl"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
