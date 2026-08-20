/**
 * Locale configuration for the evipace site.
 *
 * `locales` is the full set of locales the routing architecture recognises.
 * `activeLocales` is the subset that currently has real, reviewed content and
 * should be reachable/indexable. Do not add a locale to `activeLocales`
 * until it has genuine localized pages — this flag is what keeps /de and
 * /sl from serving thin or placeholder content while the routing skeleton
 * is being built out.
 */
export const locales = ["en", "de", "sl"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const activeLocales: Locale[] = ["en"];

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function isActiveLocale(value: string): value is Locale {
  return activeLocales.includes(value as Locale);
}
