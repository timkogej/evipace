import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EnglishCommercialServicePage } from "@/components/evipace/english-commercial/EnglishCommercialServicePage";
import { integrityNextSupportContent } from "@/components/evipace/english-commercial/content";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import { isPageReachable } from "@/lib/seo/page-registry";
import { buildBreadcrumbListSchema } from "@/lib/seo/schema/breadcrumb-list";
import { JsonLd } from "@/lib/seo/schema/json-ld";
import { buildOrganizationSchema } from "@/lib/seo/schema/organization";
import { buildServiceSchema } from "@/lib/seo/schema/service";
import { buildWebPageSchema } from "@/lib/seo/schema/webpage";
import { buildWebsiteSchema } from "@/lib/seo/schema/website";

const PAGE_KEY = "integrityNextUnterstuetzung";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "en") {
    return { robots: { index: false, follow: false } };
  }
  return buildPageMetadata(locale, PAGE_KEY);
}

export default async function IntegrityNextSupportPage({ params }: PageProps) {
  const { locale } = await params;

  if (locale !== "en" || !isPageReachable(locale, PAGE_KEY)) {
    notFound();
  }

  const schemaGraph = [
    buildOrganizationSchema(),
    buildWebsiteSchema(),
    buildWebPageSchema(locale, PAGE_KEY),
    buildServiceSchema(
      locale,
      PAGE_KEY,
      "IntegrityNext support for suppliers",
      "IntegrityNext request preparation for suppliers",
      "Independent support for suppliers preparing company data, supporting evidence, questionnaire inputs and review-ready response material for IntegrityNext requests."
    ),
    buildBreadcrumbListSchema([
      { name: "Home", path: "/en" },
      {
        name: "IntegrityNext Support",
        path: "/en/integritynext-support"
      }
    ])
  ].filter((node): node is NonNullable<typeof node> => node !== null);

  return (
    <>
      <JsonLd graph={schemaGraph} />
      <EnglishCommercialServicePage content={integrityNextSupportContent} />
    </>
  );
}
