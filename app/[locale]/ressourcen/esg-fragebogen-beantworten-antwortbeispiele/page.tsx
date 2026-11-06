import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EnglishResourceArticle } from "@/components/evipace/resources/EnglishResourceArticle";
import { howToAnswerEsgQuestionnaireContentDe } from "@/components/evipace/resources/de-guides-content";
import { PreparedBy } from "@/components/evipace/trust/PreparedBy";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import { getPageMetadataEntry, isPageReachable } from "@/lib/seo/page-registry";
import { buildArticleSchema } from "@/lib/seo/schema/article";
import { buildBreadcrumbListSchema } from "@/lib/seo/schema/breadcrumb-list";
import { JsonLd } from "@/lib/seo/schema/json-ld";
import { buildOrganizationSchema } from "@/lib/seo/schema/organization";
import { buildWebPageSchema } from "@/lib/seo/schema/webpage";
import { buildWebsiteSchema } from "@/lib/seo/schema/website";

const PAGE_KEY = "esgFragebogenBeantworten";
const LOCALE = "de";
const ARTICLE_HEADLINE = 'ESG-Fragebogen beantworten: Ja, teilweise, Nein oder nicht zutreffend';
const ARTICLE_PATH = "/de/ressourcen/esg-fragebogen-beantworten-antwortbeispiele";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== LOCALE) return { robots: { index: false, follow: false } };
  return buildPageMetadata(locale, PAGE_KEY);
}

export default async function EcovadisVsIntegritynextPage({ params }: PageProps) {
  const { locale } = await params;

  if (locale !== LOCALE || !isPageReachable(locale, PAGE_KEY)) {
    notFound();
  }

  const schemaGraph = [
    buildOrganizationSchema(),
    buildWebsiteSchema(),
    buildWebPageSchema(locale, PAGE_KEY),
    buildArticleSchema(locale, PAGE_KEY, ARTICLE_HEADLINE),
    buildBreadcrumbListSchema([
      { name: "Startseite", path: "/de" },
      { name: "Ressourcen", path: "/de/ressourcen" },
      { name: ARTICLE_HEADLINE, path: ARTICLE_PATH }
    ])
  ].filter((node): node is NonNullable<typeof node> => node !== null);

  const entry = getPageMetadataEntry(locale, PAGE_KEY);

  return (
    <>
      <JsonLd graph={schemaGraph} />
      <EnglishResourceArticle content={howToAnswerEsgQuestionnaireContentDe} locale="de" />
      <PreparedBy
        dateModified={entry?.dateModified}
        datePublished={entry?.datePublished}
        locale="de"
      />
    </>
  );
}
