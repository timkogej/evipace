import type { Metadata } from "next";
import { evipaceImages } from "@/lib/evipace-images";
import { defaultLocale, isActiveLocale } from "@/lib/evipace-locales";
import { SITE_NAME } from "./site-config";
import {
  getPageMetadataEntry,
  getActivePageGroup,
  type PageKey
} from "./page-registry";

/**
 * Derives hreflang alternates for a page group from the shared
 * getActivePageGroup query (lib/seo/page-registry.ts) — the same function
 * app/sitemap.ts uses — so the two can never drift apart.
 *
 * Only locales that are both (a) globally active and (b) have a real entry
 * for this exact pageKey are included:
 * - Today, with only "en" active, a page's alternates contain just "en"
 *   (+ x-default pointing at it, since "en" genuinely is the entry).
 * - The moment a locale is added to `activeLocales` in evipace-locales.ts
 *   *and* has a matching registry entry, it appears here automatically —
 *   no changes needed in this function.
 */
function buildLanguageAlternates(
  pageKey: PageKey
): Record<string, string> | undefined {
  const activeEntries = getActivePageGroup(pageKey);

  if (activeEntries.length === 0) {
    return undefined;
  }

  const languages: Record<string, string> = {};
  for (const { locale, entry } of activeEntries) {
    languages[locale] = entry.path;
  }

  // x-default only exists when there's a genuine English equivalent in this
  // page group. A locale-only page (no "en" entry at all) does not get a
  // manufactured x-default pointing at itself — that would assert a
  // "default for all languages" relationship that isn't true.
  const englishEntry = activeEntries.find(
    (candidate) => candidate.locale === defaultLocale
  );
  if (englishEntry) {
    languages["x-default"] = englishEntry.entry.path;
  }

  return languages;
}

/**
 * Builds a page's Metadata object from the central registry.
 *
 * If no entry exists for this locale/page (e.g. a request for /de or /sl
 * before real content is registered), this returns a safe, non-indexable
 * fallback rather than throwing — generateMetadata can be invoked before a
 * layout's notFound() check resolves, so this must never crash and must
 * never leak the English title/description onto an unregistered locale.
 *
 * If the locale IS active but still has no entry for this pageKey, that's
 * a real gap (a live route with no SEO metadata registered) — logged as a
 * dev-only warning so it can't silently ship unnoticed.
 */
export function buildPageMetadata(locale: string, pageKey: PageKey): Metadata {
  const entry = getPageMetadataEntry(locale, pageKey);

  if (!entry) {
    if (isActiveLocale(locale) && process.env.NODE_ENV === "development") {
      console.warn(
        `[seo] Active locale "${locale}" has no metadata registry entry for page "${pageKey}". ` +
          `Add one to lib/seo/page-registry.ts before this route ships.`
      );
    }

    return {
      robots: {
        index: false,
        follow: false
      }
    };
  }

  const ogImage = entry.ogImage ?? {
    url: evipaceImages.brand.logo,
    width: 1536,
    height: 1024,
    alt: SITE_NAME
  };

  return {
    title: entry.title,
    description: entry.description,
    alternates: {
      canonical: entry.path,
      languages: buildLanguageAlternates(pageKey)
    },
    openGraph: {
      title: entry.title,
      description: entry.description,
      url: entry.path,
      siteName: SITE_NAME,
      type: "website",
      images: [ogImage]
    }
  };
}
