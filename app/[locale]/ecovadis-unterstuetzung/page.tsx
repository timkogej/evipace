import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AssessmentPreparation } from "@/components/evipace/ecovadis-unterstuetzung/AssessmentPreparation";
import { AssessmentSituation } from "@/components/evipace/ecovadis-unterstuetzung/AssessmentSituation";
import { AssessmentThemes } from "@/components/evipace/ecovadis-unterstuetzung/AssessmentThemes";
import { DocumentationIntegrity } from "@/components/evipace/ecovadis-unterstuetzung/DocumentationIntegrity";
import { EvidenceIntro } from "@/components/evipace/ecovadis-unterstuetzung/EvidenceIntro";
import { Faq } from "@/components/evipace/ecovadis-unterstuetzung/Faq";
import { LandingFinalCTA } from "@/components/evipace/ecovadis-unterstuetzung/LandingFinalCTA";
import { LandingHero } from "@/components/evipace/ecovadis-unterstuetzung/LandingHero";
import { Limitations } from "@/components/evipace/ecovadis-unterstuetzung/Limitations";
import { ProcessSteps } from "@/components/evipace/ecovadis-unterstuetzung/ProcessSteps";
import { RelatedRequirements } from "@/components/evipace/ecovadis-unterstuetzung/RelatedRequirements";
import { RelevantEvidence } from "@/components/evipace/ecovadis-unterstuetzung/RelevantEvidence";
import { TargetCompanies } from "@/components/evipace/ecovadis-unterstuetzung/TargetCompanies";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import { isPageReachable } from "@/lib/seo/page-registry";
import { JsonLd } from "@/lib/seo/schema/json-ld";
import { buildOrganizationSchema } from "@/lib/seo/schema/organization";
import { buildServiceSchema } from "@/lib/seo/schema/service";
import { buildWebPageSchema } from "@/lib/seo/schema/webpage";
import { buildWebsiteSchema } from "@/lib/seo/schema/website";

const PAGE_KEY = "ecovadisUnterstuetzung";

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

export default async function EcoVadisUnterstuetzungPage({
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
      "Unterstützung bei der EcoVadis-Vorbereitung",
      "Unterstützung bei der EcoVadis-Vorbereitung",
      "Unabhängige Unterstützung bei der strukturierten Vorbereitung von Antworten, Daten und Nachweisen für EcoVadis-Bewertungen."
    )
  ].filter((node): node is NonNullable<typeof node> => node !== null);

  return (
    <>
      <JsonLd graph={schemaGraph} />
      <main>
        <LandingHero />
        <EvidenceIntro />
        <AssessmentPreparation />
        <AssessmentThemes />
        <RelevantEvidence />
        <ProcessSteps />
        <AssessmentSituation />
        <Limitations />
        <DocumentationIntegrity />
        <TargetCompanies />
        <RelatedRequirements />
        <Faq />
        <LandingFinalCTA />
      </main>
    </>
  );
}
