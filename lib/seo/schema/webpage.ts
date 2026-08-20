import { getPageMetadataEntry, type PageKey } from "../page-registry";
import { SITE_URL } from "../site-config";
import { WEBSITE_ID } from "./ids";

/**
 * WebPage entity for one page, linked to WebSite via `isPartOf`. name,
 * description, and url are pulled from the same page-registry entry that
 * generateMetadata already uses (lib/seo/build-metadata.ts) — never a
 * separately maintained copy, so this can't drift from the page's actual
 * title/description.
 *
 * Returns null if no registry entry exists for this locale/page (mirrors
 * buildPageMetadata's fail-safe behavior) — callers should omit the node
 * from the graph rather than render something untruthful.
 */
export function buildWebPageSchema(locale: string, pageKey: PageKey) {
  const entry = getPageMetadataEntry(locale, pageKey);

  if (!entry) {
    return null;
  }

  const absoluteUrl = `${SITE_URL}${entry.path}`;

  return {
    "@type": "WebPage",
    "@id": `${absoluteUrl}#webpage`,
    url: absoluteUrl,
    name: entry.title,
    description: entry.description,
    inLanguage: locale,
    isPartOf: { "@id": WEBSITE_ID }
  };
}
