import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EnglishMethodologyPage } from "@/components/evipace/EnglishMethodologyPage";
import { GermanMethodologyPage } from "@/components/evipace/GermanMethodologyPage";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import { getPageMetadataEntry, isPageReachable } from "@/lib/seo/page-registry";
import { JsonLd } from "@/lib/seo/schema/json-ld";
import { buildOrganizationSchema } from "@/lib/seo/schema/organization";
import { buildWebsiteSchema } from "@/lib/seo/schema/website";
import { buildWebPageSchema } from "@/lib/seo/schema/webpage";

type MethodologyPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params
}: MethodologyPageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, "methodology");
}

export default async function Methodology({ params }: MethodologyPageProps) {
  const { locale } = await params;

  if (!isPageReachable(locale, "methodology")) {
    notFound();
  }

  const schemaGraph = [
    buildOrganizationSchema(),
    buildWebsiteSchema(),
    buildWebPageSchema(locale, "methodology")
  ].filter((node): node is NonNullable<typeof node> => node !== null);

  const entry = getPageMetadataEntry(locale, "methodology");

  if (locale === "de") {
    return (
      <>
        <JsonLd graph={schemaGraph} />
        <GermanMethodologyPage lastReviewed={entry?.lastReviewed} />
      </>
    );
  }

  if (locale === "en") {
    return (
      <>
        <JsonLd graph={schemaGraph} />
        <EnglishMethodologyPage lastReviewed={entry?.lastReviewed} />
      </>
    );
  }

  notFound();
}
