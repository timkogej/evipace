import { getPageMetadataEntry, type PageKey } from "../page-registry";
import { SITE_URL } from "../site-config";
import { ORGANIZATION_ID } from "./ids";

/**
 * Article entity for editorial resources. Publication dates and an author are
 * intentionally omitted until Evipace has a deliberate source for them.
 */
export function buildArticleSchema(
  locale: string,
  pageKey: PageKey,
  headline: string
) {
  const entry = getPageMetadataEntry(locale, pageKey);

  if (!entry) {
    return null;
  }

  const absoluteUrl = `${SITE_URL}${entry.path}`;

  return {
    "@type": "Article",
    "@id": `${absoluteUrl}#article`,
    headline,
    description: entry.description,
    url: absoluteUrl,
    inLanguage: locale,
    mainEntityOfPage: { "@id": `${absoluteUrl}#webpage` },
    publisher: { "@id": ORGANIZATION_ID }
  };
}
