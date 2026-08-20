import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { evipaceImages } from "@/lib/evipace-images";
import {
  activeLocales,
  isActiveLocale,
  type Locale
} from "@/lib/evipace-locales";
import { SITE_URL } from "@/lib/seo/site-config";
import { gfsDidot, inter } from "../fonts";
import "../globals.css";

// Only pre-render locales that currently have real, reviewed content.
// A locale not listed here still exists in the routing architecture (see
// lib/evipace-locales.ts) but resolves as a 404 rather than thin/placeholder
// content until real pages are built for it.
export function generateStaticParams() {
  return activeLocales.map((locale) => ({ locale }));
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

  if (!isActiveLocale(locale)) {
    notFound();
  }

  const activeLocale: Locale = locale;

  return (
    <html
      className={`${inter.variable} ${gfsDidot.variable}`}
      lang={activeLocale}
    >
      <body>{children}</body>
    </html>
  );
}
