import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DataSources } from "@/components/evipace/esg-kundenanfragen/DataSources";
import { Deliverables } from "@/components/evipace/esg-kundenanfragen/Deliverables";
import { Faq } from "@/components/evipace/esg-kundenanfragen/Faq";
import { FocusedScope } from "@/components/evipace/esg-kundenanfragen/FocusedScope";
import { LandingFinalCTA } from "@/components/evipace/esg-kundenanfragen/LandingFinalCTA";
import { LandingHero } from "@/components/evipace/esg-kundenanfragen/LandingHero";
import { ProcessSteps } from "@/components/evipace/esg-kundenanfragen/ProcessSteps";
import { RelatedQuestionnaire } from "@/components/evipace/esg-kundenanfragen/RelatedQuestionnaire";
import { RequestIntro } from "@/components/evipace/esg-kundenanfragen/RequestIntro";
import { TargetCompanies } from "@/components/evipace/esg-kundenanfragen/TargetCompanies";
import { TaskTranslation } from "@/components/evipace/esg-kundenanfragen/TaskTranslation";
import { TypicalRequests } from "@/components/evipace/esg-kundenanfragen/TypicalRequests";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import { isPageReachable } from "@/lib/seo/page-registry";
import { buildBreadcrumbListSchema } from "@/lib/seo/schema/breadcrumb-list";
import { JsonLd } from "@/lib/seo/schema/json-ld";
import { buildOrganizationSchema } from "@/lib/seo/schema/organization";
import { buildServiceSchema } from "@/lib/seo/schema/service";
import { buildWebPageSchema } from "@/lib/seo/schema/webpage";
import { buildWebsiteSchema } from "@/lib/seo/schema/website";

const PAGE_KEY = "esgKundenanfragen";

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

export default async function EsgKundenanfragenPage({ params }: PageProps) {
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
      "Unterstützung bei ESG-Kundenanfragen",
      "Unterstützung bei ESG-Kundenanfragen"
    ),
    buildBreadcrumbListSchema([
      { name: "Startseite", path: "/de" },
      { name: "ESG-Kundenanfragen", path: "/de/esg-kundenanfragen" }
    ])
  ].filter((node): node is NonNullable<typeof node> => node !== null);

  return (
    <>
      <JsonLd graph={schemaGraph} />
      <main>
        <LandingHero />
        <RequestIntro />
        <TaskTranslation />
        <TypicalRequests />
        <DataSources />
        <ProcessSteps />
        <Deliverables />
        <FocusedScope />
        <TargetCompanies />
        <RelatedQuestionnaire />
        <Faq />
        <LandingFinalCTA />
      </main>
    </>
  );
}
