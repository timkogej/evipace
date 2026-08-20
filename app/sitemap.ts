import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/site-config";
import { getAllPageKeys, getActivePageGroup } from "@/lib/seo/page-registry";

/**
 * Generates sitemap.xml entirely from lib/seo/page-registry.ts — there is
 * no separate hardcoded page list here. getAllPageKeys() discovers every
 * page key that exists anywhere in the registry; getActivePageGroup() is
 * the same shared query used for hreflang alternates in
 * lib/seo/build-metadata.ts, so a page only ever needs to be registered
 * once for both the <head> alternates and the sitemap to agree.
 *
 * Only real, active, indexable pages appear here. Today that's exactly
 * "/en" — "/de" and "/sl" have no active entries yet and are correctly
 * absent, not because of sitemap-specific logic, but because they fail the
 * same active-locale check every other part of this system uses.
 *
 * lastModified is intentionally omitted. There's no real content-update
 * timestamp source yet (no CMS, no tracked content-change dates) — stamping
 * every entry with the build time would misrepresent "just updated" on
 * every deploy regardless of whether anything actually changed, which is
 * worse than omitting the field. Wire this to a real source (CMS
 * updatedAt, or git commit date per content file) once one exists.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const pageKey of getAllPageKeys()) {
    const group = getActivePageGroup(pageKey);

    if (group.length === 0) {
      continue;
    }

    // Only a genuine multilingual group (2+ active locales sharing this
    // page key) gets a language-alternates block. A single-locale page has
    // nothing to alternate to, so the field is omitted rather than emitted
    // with just itself in it.
    const languages =
      group.length > 1
        ? Object.fromEntries(
            group.map(({ locale, entry }) => [locale, `${SITE_URL}${entry.path}`])
          )
        : undefined;

    for (const { entry } of group) {
      entries.push({
        url: `${SITE_URL}${entry.path}`,
        ...(languages ? { alternates: { languages } } : {})
      });
    }
  }

  return entries;
}
