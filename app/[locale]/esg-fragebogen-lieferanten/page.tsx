import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Deliverables } from "@/components/evipace/esg-fragebogen-lieferanten/Deliverables";
import { Faq } from "@/components/evipace/esg-fragebogen-lieferanten/Faq";
import { HowItWorks } from "@/components/evipace/esg-fragebogen-lieferanten/HowItWorks";
import { LandingFinalCTA } from "@/components/evipace/esg-fragebogen-lieferanten/LandingFinalCTA";
import { LandingHero } from "@/components/evipace/esg-fragebogen-lieferanten/LandingHero";
import { ProblemIntro } from "@/components/evipace/esg-fragebogen-lieferanten/ProblemIntro";
import { ProcessBreakdown } from "@/components/evipace/esg-fragebogen-lieferanten/ProcessBreakdown";
import { QuestionnaireTypes } from "@/components/evipace/esg-fragebogen-lieferanten/QuestionnaireTypes";
import { RequirementCategories } from "@/components/evipace/esg-fragebogen-lieferanten/RequirementCategories";
import { TargetCompanies } from "@/components/evipace/esg-fragebogen-lieferanten/TargetCompanies";
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
  if (locale !== "de") {
    return { robots: { index: false, follow: false } };
  }
  return buildPageMetadata(locale, PAGE_KEY);
}

export default async function EsgFragebogenLieferantenPage({
  params
}: PageProps) {
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
      "ESG-Fragebogen- und Nachweisvorbereitung für Lieferanten"
    ),
    buildBreadcrumbListSchema([
      { name: "Startseite", path: "/de" },
      { name: "ESG-Fragebögen für Lieferanten", path: "/de/esg-fragebogen-lieferanten" }
    ])
  ].filter((node): node is NonNullable<typeof node> => node !== null);

  return (
    <>
      <JsonLd graph={schemaGraph} />
      <main>
        <LandingHero />
        <ProblemIntro />
        <ProcessBreakdown />
        <QuestionnaireTypes />
        <RequirementCategories />
        <HowItWorks />
        <Deliverables />
        <TargetCompanies />
        <Faq />
        <LandingFinalCTA />
      </main>
    </>
  );
}
