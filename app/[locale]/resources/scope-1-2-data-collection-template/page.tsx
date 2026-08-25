import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EnglishScope12DataCollectionGuide } from "@/components/evipace/resources/EnglishInteractiveResourceGuides";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import { isPageReachable } from "@/lib/seo/page-registry";
import { buildArticleSchema } from "@/lib/seo/schema/article";
import { buildBreadcrumbListSchema } from "@/lib/seo/schema/breadcrumb-list";
import { JsonLd } from "@/lib/seo/schema/json-ld";
import { buildOrganizationSchema } from "@/lib/seo/schema/organization";
import { buildWebPageSchema } from "@/lib/seo/schema/webpage";
import { buildWebsiteSchema } from "@/lib/seo/schema/website";

const PAGE_KEY = "scope12DatenerfassungsVorlage";
const ARTICLE_HEADLINE = "Scope 1 & 2 Data Collection Template";
const ARTICLE_PATH = "/en/resources/scope-1-2-data-collection-template";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, PAGE_KEY);
}

export default async function EnglishScope12DataCollectionPage({
  params
}: PageProps) {
  const { locale } = await params;

  if (!isPageReachable(locale, PAGE_KEY) || locale !== "en") {
    notFound();
  }

  const schemaGraph = [
    buildOrganizationSchema(),
    buildWebsiteSchema(),
    buildWebPageSchema(locale, PAGE_KEY),
    buildArticleSchema(locale, PAGE_KEY, ARTICLE_HEADLINE),
    buildBreadcrumbListSchema([
      { name: "Home", path: "/en" },
      { name: "Resources", path: "/en/resources" },
      { name: ARTICLE_HEADLINE, path: ARTICLE_PATH }
    ])
  ].filter((node): node is NonNullable<typeof node> => node !== null);

  return (
    <>
      <JsonLd graph={schemaGraph} />
      <EnglishScope12DataCollectionGuide />
    </>
  );
}
