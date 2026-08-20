import { SITE_NAME, SITE_URL } from "../site-config";
import { ORGANIZATION_ID, WEBSITE_ID } from "./ids";

/**
 * WebSite entity, linked to Organization via `publisher` (referencing the
 * stable @id, not a duplicated inline copy). No SearchAction — the site
 * has no real site search today, so no sitelinks search-box markup.
 */
export function buildWebsiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    url: SITE_URL,
    publisher: { "@id": ORGANIZATION_ID }
  };
}
