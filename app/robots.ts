import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/site-config";

/**
 * Minimal and safe: allow everything, disallow nothing. There is no
 * admin/private path in this repository (the customer portal and admin
 * panel are separate applications on separate subdomains), so there is
 * nothing to block yet — /_next/, images, CSS, JS, and fonts are all
 * implicitly reachable.
 *
 * No named AI-crawler rules (GPTBot, ClaudeBot, PerplexityBot, etc.) are
 * added here. The default "User-agent: * / Allow: /" already permits all
 * of them — none are blocked by default — so an explicit allow adds no
 * access today. Adding named blocks now would also be a latent risk: per
 * RFC 9309, a named User-agent group does not inherit the wildcard group's
 * rules. If a Disallow is ever added under "*" later (e.g. for a future
 * admin path), any AI-crawler block added now with a bare "Allow: /" would
 * silently bypass it. Revisit this deliberately once there's an actual
 * path-based restriction to reason about.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: `${SITE_URL}/sitemap.xml`
  };
}
