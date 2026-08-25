import type { Metadata } from "next";
import { evipaceImages } from "@/lib/evipace-images";
import { defaultLocale } from "@/lib/evipace-locales";
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
 * Only locales with a real registry entry for this exact pageKey are
 * included. The moment a second locale gets a matching registry entry for
 * the same pageKey, it appears here automatically — no changes needed in
 * this function.
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
 * If no entry exists for this locale/page (e.g. a request for /de/about, or
 * a reachable-but-unlisted page like /de/send-request — see
 * lib/seo/page-registry.ts's isPageReachable/unlistedReachablePages), this
 * returns a safe, non-indexable fallback rather than throwing —
 * generateMetadata can be invoked before the page component's own
 * reachability check (notFound()) resolves, so this must never crash and
 * must never leak another locale's title/description onto an unregistered
 * page.
 */
export function buildPageMetadata(locale: string, pageKey: PageKey): Metadata {
  const entry = getPageMetadataEntry(locale, pageKey);

  if (!entry) {
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
      type: entry.openGraphType ?? "website",
      images: [ogImage]
    }
  };
}
