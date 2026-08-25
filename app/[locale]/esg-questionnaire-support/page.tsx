import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EnglishCommercialServicePage } from "@/components/evipace/english-commercial/EnglishCommercialServicePage";
import { questionnaireSupportContent } from "@/components/evipace/english-commercial/content";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import { isPageReachable } from "@/lib/seo/page-registry";
import { buildBreadcrumbListSchema } from "@/lib/seo/schema/breadcrumb-list";
import { JsonLd } from "@/lib/seo/schema/json-ld";
import { buildOrganizationSchema } from "@/lib/seo/schema/organization";
import { buildServiceSchema } from "@/lib/seo/schema/service";
import { buildWebPageSchema } from "@/lib/seo/schema/webpage";
import { buildWebsiteSchema } from "@/lib/seo/schema/website";

const PAGE_KEY = "esgFragebogenLieferanten";

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

export default async function EsgQuestionnaireSupportPage({
  params
}: PageProps) {
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
      "ESG questionnaire support for suppliers"
    ),
    buildBreadcrumbListSchema([
      { name: "Home", path: "/en" },
      {
        name: "ESG Questionnaire Support",
        path: "/en/esg-questionnaire-support"
      }
    ])
  ].filter((node): node is NonNullable<typeof node> => node !== null);

  return (
    <>
      <JsonLd graph={schemaGraph} />
      <EnglishCommercialServicePage content={questionnaireSupportContent} />
    </>
  );
}
