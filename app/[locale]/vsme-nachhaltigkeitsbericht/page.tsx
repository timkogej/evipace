import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BasicComprehensive } from "@/components/evipace/vsme-nachhaltigkeitsbericht/BasicComprehensive";
import { DataFoundation } from "@/components/evipace/vsme-nachhaltigkeitsbericht/DataFoundation";
import { DataSources } from "@/components/evipace/vsme-nachhaltigkeitsbericht/DataSources";
import { Faq } from "@/components/evipace/vsme-nachhaltigkeitsbericht/Faq";
import { LandingFinalCTA } from "@/components/evipace/vsme-nachhaltigkeitsbericht/LandingFinalCTA";
import { LandingHero } from "@/components/evipace/vsme-nachhaltigkeitsbericht/LandingHero";
import { PracticalFoundation } from "@/components/evipace/vsme-nachhaltigkeitsbericht/PracticalFoundation";
import { ProcessSteps } from "@/components/evipace/vsme-nachhaltigkeitsbericht/ProcessSteps";
import { RegulatoryStatus } from "@/components/evipace/vsme-nachhaltigkeitsbericht/RegulatoryStatus";
import { RelatedRequirements } from "@/components/evipace/vsme-nachhaltigkeitsbericht/RelatedRequirements";
import { ReportContents } from "@/components/evipace/vsme-nachhaltigkeitsbericht/ReportContents";
import { ReusableValue } from "@/components/evipace/vsme-nachhaltigkeitsbericht/ReusableValue";
import { ScopeData } from "@/components/evipace/vsme-nachhaltigkeitsbericht/ScopeData";
import { TargetCompanies } from "@/components/evipace/vsme-nachhaltigkeitsbericht/TargetCompanies";
import { TrustStatement } from "@/components/evipace/vsme-nachhaltigkeitsbericht/TrustStatement";
import { ValueChainCap } from "@/components/evipace/vsme-nachhaltigkeitsbericht/ValueChainCap";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import { isPageReachable } from "@/lib/seo/page-registry";
import { JsonLd } from "@/lib/seo/schema/json-ld";
import { buildOrganizationSchema } from "@/lib/seo/schema/organization";
import { buildServiceSchema } from "@/lib/seo/schema/service";
import { buildWebPageSchema } from "@/lib/seo/schema/webpage";
import { buildWebsiteSchema } from "@/lib/seo/schema/website";

const PAGE_KEY = "vsmeNachhaltigkeitsbericht";

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

export default async function VsmeNachhaltigkeitsberichtPage({
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
      "Erstellung von VSME-Nachhaltigkeitsberichten",
      "Erstellung von VSME-Nachhaltigkeitsberichten",
      "Unterstützung für kleine und mittlere Unternehmen bei Datenerhebung, Kennzahlen, Dokumentation und Erstellung eines strukturierten Nachhaltigkeitsberichts nach dem aktuellen freiwilligen europäischen Berichtsstandard."
    )
  ].filter((node): node is NonNullable<typeof node> => node !== null);

  return (
    <>
      <JsonLd graph={schemaGraph} />
      <main>
        <LandingHero />
        <DataFoundation />
        <ReportContents />
        <BasicComprehensive />
        <DataSources />
        <ProcessSteps />
        <ScopeData />
        <ReusableValue />
        <RegulatoryStatus />
        <ValueChainCap />
        <PracticalFoundation />
        <TargetCompanies />
        <RelatedRequirements />
        <Faq />
        <TrustStatement />
        <LandingFinalCTA />
      </main>
    </>
  );
}
