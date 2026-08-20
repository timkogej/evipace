/**
 * Single source of truth for site-wide SEO constants.
 *
 * evipace.com is treated as the canonical production domain from the start.
 * Do not point this at the Vercel preview domain, and do not duplicate this
 * string anywhere else — everything (metadataBase, canonicals, OG urls)
 * should derive from here.
 */
export const SITE_URL = "https://evipace.com";

export const SITE_NAME = "Evipace";
