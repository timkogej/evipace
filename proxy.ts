import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale } from "@/lib/evipace-locales";

/**
 * Next.js 16 proxy (the renamed successor to middleware.ts).
 *
 * Its only job right now is a permanent redirect from "/" to the default
 * locale ("/en"). "/" never renders content itself, so there is exactly one
 * URL serving the homepage — this is what keeps "/" and "/en" from ever
 * being treated as duplicate content once the site is indexed.
 *
 * Everything else (unprefixed deep links, locale detection, etc.) is
 * intentionally out of scope for this step.
 */
export function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}`;
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"]
};
