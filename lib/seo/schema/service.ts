import { getPageMetadataEntry, type PageKey } from "../page-registry";
import { SITE_URL } from "../site-config";
import { ORGANIZATION_ID } from "./ids";

/**
 * Service entity for one page, linked to Organization via `provider`. Only
 * built from the same page-registry entry generateMetadata already uses —
 * never a separately maintained name/description — and only where the page
 * genuinely describes a specific service (not every page needs this).
 *
 * Returns null if no registry entry exists for this locale/page (mirrors
 * buildWebPageSchema's fail-safe behavior).
 */
export function buildServiceSchema(
  locale: string,
  pageKey: PageKey,
  serviceType: string,
  serviceName?: string,
  serviceDescription?: string
) {
  const entry = getPageMetadataEntry(locale, pageKey);

  if (!entry) {
    return null;
  }

  const absoluteUrl = `${SITE_URL}${entry.path}`;

  return {
    "@type": "Service",
    "@id": `${absoluteUrl}#service`,
    name: serviceName ?? entry.title,
    description: serviceDescription ?? entry.description,
    serviceType,
    url: absoluteUrl,
    provider: { "@id": ORGANIZATION_ID }
  };
}
