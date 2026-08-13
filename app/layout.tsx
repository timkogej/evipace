import type { Metadata, Viewport } from "next";
import { evipaceImages } from "@/lib/evipace-images";
import "./globals.css";

export const metadata: Metadata = {
  title: "Evipace — ESG, done faster.",
  description:
    "Done-for-you ESG support for European manufacturers. Supplier questionnaires, VSME reporting, Scope 1 & 2 calculations and supporting ESG documentation.",
  metadataBase: new URL("https://evipace.com"),
  openGraph: {
    title: "Evipace — ESG, done faster.",
    description:
      "Done-for-you ESG support for European manufacturers. Supplier questionnaires, VSME reporting, Scope 1 & 2 calculations and supporting ESG documentation.",
    images: [
      {
        url: evipaceImages.brand.logo,
        width: 1536,
        height: 1024,
        alt: "Evipace"
      }
    ],
    type: "website"
  },
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

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
