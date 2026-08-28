import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PrivacyPage } from "@/components/evipace/privacy/PrivacyPage";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import { isPageReachable } from "@/lib/seo/page-registry";

type PrivacyRouteProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params
}: PrivacyRouteProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, "privacy");
}

export default async function Privacy({ params }: PrivacyRouteProps) {
  const { locale } = await params;

  if (!isPageReachable(locale, "privacy")) {
    notFound();
  }

  if (locale !== "en" && locale !== "de") {
    notFound();
  }

  return <PrivacyPage locale={locale} />;
}
