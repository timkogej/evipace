import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EnglishCommercialServicePage } from "@/components/evipace/english-commercial/EnglishCommercialServicePage";
import { recordsDeadlinesContentDe } from "@/components/evipace/english-commercial/records-deadlines-content";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import { isPageReachable } from "@/lib/seo/page-registry";
import { buildBreadcrumbListSchema } from "@/lib/seo/schema/breadcrumb-list";
import { JsonLd } from "@/lib/seo/schema/json-ld";
import { buildOrganizationSchema } from "@/lib/seo/schema/organization";
import { buildServiceSchema } from "@/lib/seo/schema/service";
import { buildWebPageSchema } from "@/lib/seo/schema/webpage";
import { buildWebsiteSchema } from "@/lib/seo/schema/website";

const PAGE_KEY = "recordsDeadlines";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== "de") {
    return { robots: { index: false, follow: false } };
  }
  return buildPageMetadata(locale, PAGE_KEY);
}

export default async function NachweiseUndFristenPage({ params }: PageProps) {
  const { locale } = await params;

  if (locale !== "de" || !isPageReachable(locale, PAGE_KEY)) {
    notFound();
  }

  const schemaGraph = [
    buildOrganizationSchema(),
    buildWebsiteSchema(),
    buildWebPageSchema(locale, PAGE_KEY),
    buildServiceSchema(
      locale,
      PAGE_KEY,
      "Nachweise und Fristen",
      "Umwelt- und Sicherheitsnachweise und Fristen",
      "Ein Register von Umwelt- und Sicherheitsnachweisen mit Fristenüberwachung und Vorbereitung dessen, was ansteht, von einer Person geprüft und vom Kunden freigegeben."
    ),
    buildBreadcrumbListSchema([
      { name: "Startseite", path: "/de" },
      { name: "Nachweise und Fristen", path: "/de/nachweise-und-fristen" }
    ])
  ].filter((node): node is NonNullable<typeof node> => node !== null);

  return (
    <>
      <JsonLd graph={schemaGraph} />
      <EnglishCommercialServicePage content={recordsDeadlinesContentDe} locale="de" />
    </>
  );
}
