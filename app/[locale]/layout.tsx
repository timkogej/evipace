import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/evipace/Footer";
import { Navbar } from "@/components/evipace/Navbar";
import { evipaceImages } from "@/lib/evipace-images";
import { locales, isLocale, type Locale } from "@/lib/evipace-locales";
import { SITE_URL } from "@/lib/seo/site-config";
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
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  icons: {
    icon: [
      {
        url: evipaceImages.brand.mark,
        type: "image/png"
      }
    ],
    apple: [
      {
        url: evipaceImages.brand.mark,
        type: "image/png"
      }
    ]
  }
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

  return (
    <html
      className={`${inter.variable} ${gfsDidot.variable}`}
      lang={activeLocale}
    >
      <body>
        {showSiteChrome ? <Navbar locale={activeLocale} /> : null}
        {children}
        {showSiteChrome ? <Footer locale={activeLocale} /> : null}
      </body>
    </html>
  );
}
