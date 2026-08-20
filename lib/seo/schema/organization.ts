import { evipaceImages } from "@/lib/evipace-images";
import { SITE_NAME, SITE_URL } from "../site-config";
import { ORGANIZATION_ID } from "./ids";

/**
 * Organization entity for evipace. Deliberately minimal: only properties
 * that are verifiably true today. Do not add address, telephone, founding
 * date, certifications, memberships, employee count, social profiles, or
 * awards here unless they exist and are verified — an unsupported claim in
 * structured data is worse than no claim at all.
 */
export function buildOrganizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}${evipaceImages.brand.mark}`,
      width: 1254,
      height: 1254
    }
  };
}
