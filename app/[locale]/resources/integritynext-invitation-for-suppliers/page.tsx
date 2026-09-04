import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EnglishResourceArticle } from "@/components/evipace/resources/EnglishResourceArticle";
import { integrityNextInvitationContent } from "@/components/evipace/resources/english-batch1-content";
import { PreparedBy } from "@/components/evipace/trust/PreparedBy";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import { getPageMetadataEntry, isPageReachable } from "@/lib/seo/page-registry";
import { buildArticleSchema } from "@/lib/seo/schema/article";
import { buildBreadcrumbListSchema } from "@/lib/seo/schema/breadcrumb-list";
import { JsonLd } from "@/lib/seo/schema/json-ld";
import { buildOrganizationSchema } from "@/lib/seo/schema/organization";
import { buildWebPageSchema } from "@/lib/seo/schema/webpage";
import { buildWebsiteSchema } from "@/lib/seo/schema/website";

const PAGE_KEY = "integrityNextEinladungLieferanten";
const ARTICLE_HEADLINE =
  "Received an IntegrityNext invitation? A practical guide for suppliers.";
const ARTICLE_PATH = "/en/resources/integritynext-invitation-for-suppliers";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, PAGE_KEY);
}

export default async function IntegrityNextInvitationForSuppliersPage({
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

  const entry = getPageMetadataEntry(locale, PAGE_KEY);

  return (
    <>
      <JsonLd graph={schemaGraph} />
      <EnglishResourceArticle content={integrityNextInvitationContent} />
      <PreparedBy
        dateModified={entry?.dateModified}
        datePublished={entry?.datePublished}
        locale="en"
      />
    </>
  );
}
