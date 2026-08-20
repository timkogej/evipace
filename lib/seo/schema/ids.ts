import { SITE_URL } from "../site-config";

/**
 * Stable @id values for the site-wide entities. These are the only place
 * these identifiers are defined — every schema builder references them
 * rather than inlining a copy, so Organization/WebSite can be linked from
 * any future page (Service, Article, Person, BreadcrumbList, ...) without
 * risk of the identifier drifting between files.
 */
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
