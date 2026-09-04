import { getPageMetadataEntry, type PageKey } from "../page-registry";
import { SITE_URL } from "../site-config";
import { ORGANIZATION_ID } from "./ids";

/**
 * Article entity for editorial resources.
 *
 * `author` and `publisher` both reference the Evipace Organization node.
 * That is the truthful representation today: these resources are prepared
 * by Evipace as an organization, and the pages say exactly that ("Prepared
 * by Evipace" — see components/evipace/trust/PreparedBy.tsx). No Person
 * author is emitted, because no individual is credited as the author of any
 * specific resource in visible content.
 *
 * Publication dates are emitted only when the registry actually carries
 * them (lib/seo/page-registry.ts). They are absent for every resource page
 * today and stay absent until real publication records exist — a fabricated
 * date is a worse signal than no date.
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
    author: { "@id": ORGANIZATION_ID },
    publisher: { "@id": ORGANIZATION_ID },
    ...(entry.datePublished ? { datePublished: entry.datePublished } : {}),
    ...(entry.dateModified ? { dateModified: entry.dateModified } : {})
  };
}
