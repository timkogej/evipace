import { pageRoutes, isSiteLocale, type SiteLocale } from "@/lib/site-navigation";

/**
 * The privacy policy's path for one locale, resolved through the same
 * `pageRoutes` inventory the navbar and footer already use
 * (lib/site-navigation.ts) — so a German page never links a German reader
 * to the English privacy notice, and this cannot drift from the real
 * routes if a path ever changes.
 *
 * Unknown locales fall back to the English route rather than throwing:
 * this is rendered inside a form, and a missing link is worse than a
 * cross-locale one.
 */
export function getPrivacyPolicyPath(locale: string): string {
  const target: SiteLocale = isSiteLocale(locale) ? locale : "en";
  const entry = pageRoutes[target].find(
    (candidate) => candidate.pageKey === "privacy"
  );

  return entry?.href ?? "/en/privacy";
}
