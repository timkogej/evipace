import { SITE_NAME, SITE_URL } from "../site-config";
import { ORGANIZATION_ID, WEBSITE_ID } from "./ids";

/**
 * WebSite entity, linked to Organization via `publisher` (referencing the
 * stable @id, not a duplicated inline copy). No SearchAction — the site
 * has no real site search today, so no sitelinks search-box markup.
 *
 * `name` and `alternateName` are both the brand, "Evipace". They are the
 * signal Google reads for the site name shown in search results, which is
 * why they must resolve to SITE_NAME rather than being spelled out here,
 * and why `url` is the bare canonical origin (https://evipace.com/) — the
 * domain Google is being asked to name — not the /en homepage path.
 */
export function buildWebsiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    alternateName: SITE_NAME,
    url: `${SITE_URL}/`,
    publisher: { "@id": ORGANIZATION_ID }
  };
}
