import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EsgEvidenceReadinessGuide } from "@/components/evipace/resources/EsgEvidenceReadinessGuide";
import { PreparedBy } from "@/components/evipace/trust/PreparedBy";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import { getPageMetadataEntry, isPageReachable } from "@/lib/seo/page-registry";
import { buildArticleSchema } from "@/lib/seo/schema/article";
import { buildBreadcrumbListSchema } from "@/lib/seo/schema/breadcrumb-list";
import { JsonLd } from "@/lib/seo/schema/json-ld";
import { buildOrganizationSchema } from "@/lib/seo/schema/organization";
import { buildWebPageSchema } from "@/lib/seo/schema/webpage";
import { buildWebsiteSchema } from "@/lib/seo/schema/website";

const PAGE_KEY = "esgNachweiseCheckliste";
const PAGE_TITLE = "ESG-Nachweise-Checkliste";
const PAGE_PATH = "/de/ressourcen/esg-nachweise-checkliste";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, PAGE_KEY);
}

export default async function EsgEvidenceReadinessResourcePage({
  params
}: PageProps) {
  const { locale } = await params;

  if (!isPageReachable(locale, PAGE_KEY) || locale !== "de") {
    notFound();
  }

  const schemaGraph = [
    buildOrganizationSchema(),
    buildWebsiteSchema(),
    buildWebPageSchema(locale, PAGE_KEY),
    buildArticleSchema(locale, PAGE_KEY, PAGE_TITLE),
    buildBreadcrumbListSchema([
      { name: "Startseite", path: "/de" },
      { name: "Ressourcen", path: "/de/ressourcen" },
      { name: PAGE_TITLE, path: PAGE_PATH }
    ])
  ].filter((node): node is NonNullable<typeof node> => node !== null);

  const entry = getPageMetadataEntry(locale, PAGE_KEY);

  return (
    <>
      <JsonLd graph={schemaGraph} />
      <EsgEvidenceReadinessGuide />
      <PreparedBy
        dateModified={entry?.dateModified}
        datePublished={entry?.datePublished}
        locale="de"
      />
    </>
  );
}
