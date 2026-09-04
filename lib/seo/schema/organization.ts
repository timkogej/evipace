import { publicContactEmail } from "@/lib/company-info";
import { evipaceImages } from "@/lib/evipace-images";
import { SITE_NAME, SITE_URL } from "../site-config";
import { FOUNDER_ID, ORGANIZATION_ID } from "./ids";

/**
 * Organization entity for Evipace. Deliberately minimal: only properties
 * that are verifiably true today and visibly stated somewhere on the site.
 *
 *  - `description` restates the positioning the homepage and About page
 *    already make in prose (practical ESG work for manufacturing companies
 *    and suppliers in European supply chains).
 *  - `email` is the same public address already published in the footer of
 *    every page and in the About page's contact section.
 *  - `areaServed` is Europe, matching the About page's explicit statement
 *    that Evipace "is being built from the beginning for companies
 *    operating within European supply chains". It is deliberately not a
 *    list of individual countries: the About page frames those as an
 *    initial focus, not as the served area.
 *  - `founder` is the real, named founder already published on the About
 *    page, with the job title shown there and nothing more.
 *
 * Do not add address, telephone, founding date, certifications,
 * memberships, employee count, social profiles, or awards here unless they
 * exist, are verified, and are visible on the site — an unsupported claim
 * in structured data is worse than no claim at all.
 */
export function buildOrganizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    description:
      "Evipace prepares practical ESG documentation and support for manufacturing companies and suppliers in European supply chains, including customer ESG requests, questionnaires, Scope 1 and Scope 2 calculations, voluntary sustainability reporting, policies and supporting evidence.",
    email: publicContactEmail,
    areaServed: {
      "@type": "Place",
      name: "Europe"
    },
    founder: {
      "@type": "Person",
      "@id": FOUNDER_ID,
      name: "Tim Kogej",
      jobTitle: "Founder & Managing Director"
    },
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}${evipaceImages.brand.mark}`,
      width: 1254,
      height: 1254
    }
  };
}
