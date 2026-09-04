import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Analytics } from "@vercel/analytics/next";
import { ConsentManager } from "@/components/evipace/analytics/ConsentManager";
import { Footer } from "@/components/evipace/Footer";
import { Navbar } from "@/components/evipace/Navbar";
import { SiteIntro } from "@/components/evipace/site-intro/SiteIntro";
import { locales, isLocale, type Locale } from "@/lib/evipace-locales";
import { SITE_NAME, SITE_URL } from "@/lib/seo/site-config";
import { isSiteLocale } from "@/lib/site-navigation";
import { gfsDidot, inter } from "../fonts";
import "../globals.css";

// Pre-render every known locale segment — this layout no longer decides
// per-page reachability (see lib/seo/page-registry.ts's isPageReachable).
// A locale/page combination that isn't reachable yet still gets a static
// path here, but the individual page component calls notFound() itself,
// which Next renders as a real 404 for that specific path rather than
// skipping generation.
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Site-wide defaults only. Per-page title/description/canonical/OG now live
// in lib/seo/page-registry.ts and are set via generateMetadata on each page
// — keeping them here too would duplicate, and could conflict with, that.
//
// There is deliberately no `icons` entry here. The site's icons are the App
// Router file conventions in app/ (favicon.ico, icon.png, apple-icon.png),
// all derived from the approved square Evipace mark. Next emits the <link>
// tags for those automatically; declaring `icons` here as well would produce
// a second, competing set of rel="icon" tags in the same <head>.
//
// `applicationName` is the site-name signal that belongs in metadata rather
// than in the page registry: it is site-wide, not per page, and it must read
// "Evipace" everywhere. og:site_name comes from the same SITE_NAME constant
// via lib/seo/build-metadata.ts.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1
};

type LocaleLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

export default async function LocaleLayout({
  children,
  params
}: LocaleLayoutProps) {
  const { locale } = await params;

  // Rejects only genuinely unknown locale segments (e.g. "/xx"). Whether a
  // *known* locale has this particular page is decided further down the
  // tree, per page, via isPageReachable() — not here.
  if (!isLocale(locale)) {
    notFound();
  }

  const activeLocale: Locale = locale;
  const showSiteChrome = isSiteLocale(activeLocale);
  const gaMeasurementId = process.env.GA_MEASUREMENT_ID;

  return (
    <html
      className={`${inter.variable} ${gfsDidot.variable}`}
      lang={activeLocale}
      /*
       * The site intro's boot script stamps `data-site-intro` on <html> at
       * parse time — deliberately before hydration, so the branded opening is
       * governed even if React never arrives. That makes the attribute
       * script-owned rather than render-owned, which is exactly the case this
       * flag is for. It suppresses attribute diffs on this element only;
       * everything inside still gets full hydration checking.
       */
      suppressHydrationWarning
    >
      <body>
        {showSiteChrome ? <Navbar locale={activeLocale} /> : null}
        {/*
          A stable wrapper the site intro can reveal as one piece. It is the
          only element the intro ever transforms — never <html> or <body> —
          so the viewport itself cannot shift or overflow. Without the intro
          it is an inert div.
        */}
        <div data-site-intro-content="">{children}</div>
        {showSiteChrome ? <Footer locale={activeLocale} /> : null}
        {showSiteChrome ? <SiteIntro /> : null}
        {showSiteChrome && gaMeasurementId ? (
          <ConsentManager
            locale={activeLocale}
            measurementId={gaMeasurementId}
          />
        ) : null}
        <Analytics />
      </body>
    </html>
  );
}
