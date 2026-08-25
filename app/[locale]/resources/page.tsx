import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EnglishResourceHub } from "@/components/evipace/resources/EnglishResourceHub";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import { isPageReachable } from "@/lib/seo/page-registry";
import { buildBreadcrumbListSchema } from "@/lib/seo/schema/breadcrumb-list";
import { JsonLd } from "@/lib/seo/schema/json-ld";
import { buildOrganizationSchema } from "@/lib/seo/schema/organization";
import { buildWebPageSchema } from "@/lib/seo/schema/webpage";
import { buildWebsiteSchema } from "@/lib/seo/schema/website";

const PAGE_KEY = "resourcesHub";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, PAGE_KEY);
}

export default async function EnglishResourcesPage({ params }: PageProps) {
  const { locale } = await params;

  if (!isPageReachable(locale, PAGE_KEY) || locale !== "en") {
    notFound();
  }

  const schemaGraph = [
    buildOrganizationSchema(),
    buildWebsiteSchema(),
    buildWebPageSchema(locale, PAGE_KEY, "CollectionPage"),
    buildBreadcrumbListSchema([
      { name: "Home", path: "/en" },
      { name: "Resources", path: "/en/resources" }
    ])
  ].filter((node): node is NonNullable<typeof node> => node !== null);

  return (
    <>
      <JsonLd graph={schemaGraph} />
      <EnglishResourceHub />
    </>
  );
}
