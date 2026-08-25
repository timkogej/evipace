import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EnglishAboutPage } from "@/components/evipace/EnglishAboutPage";
import { GermanAboutPage } from "@/components/evipace/GermanAboutPage";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import { isPageReachable } from "@/lib/seo/page-registry";
import { JsonLd } from "@/lib/seo/schema/json-ld";
import { buildOrganizationSchema } from "@/lib/seo/schema/organization";
import { buildWebsiteSchema } from "@/lib/seo/schema/website";
import { buildWebPageSchema } from "@/lib/seo/schema/webpage";

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params
}: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, "about");
}

export default async function About({ params }: AboutPageProps) {
  const { locale } = await params;

  if (!isPageReachable(locale, "about")) {
    notFound();
  }

  const schemaGraph = [
    buildOrganizationSchema(),
    buildWebsiteSchema(),
    buildWebPageSchema(locale, "about")
  ].filter((node): node is NonNullable<typeof node> => node !== null);

  if (locale === "de") {
    return (
      <>
        <JsonLd graph={schemaGraph} />
        <GermanAboutPage />
      </>
    );
  }

  if (locale === "en") {
    return (
      <>
        <JsonLd graph={schemaGraph} />
        <EnglishAboutPage />
      </>
    );
  }

  notFound();
}
