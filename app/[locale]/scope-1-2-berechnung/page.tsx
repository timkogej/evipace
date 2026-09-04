import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BoundarySetup } from "@/components/evipace/scope-1-2-berechnung/BoundarySetup";
import { CalculationMethod } from "@/components/evipace/scope-1-2-berechnung/CalculationMethod";
import { DataRequirements } from "@/components/evipace/scope-1-2-berechnung/DataRequirements";
import { Deliverables } from "@/components/evipace/scope-1-2-berechnung/Deliverables";
import { Faq } from "@/components/evipace/scope-1-2-berechnung/Faq";
import { LandingFinalCTA } from "@/components/evipace/scope-1-2-berechnung/LandingFinalCTA";
import { LandingHero } from "@/components/evipace/scope-1-2-berechnung/LandingHero";
import { MethodologyStandards } from "@/components/evipace/scope-1-2-berechnung/MethodologyStandards";
import { ProcessSteps } from "@/components/evipace/scope-1-2-berechnung/ProcessSteps";
import { RelatedRequirements } from "@/components/evipace/scope-1-2-berechnung/RelatedRequirements";
import { ScopeOne } from "@/components/evipace/scope-1-2-berechnung/ScopeOne";
import { ScopeThreeClarification } from "@/components/evipace/scope-1-2-berechnung/ScopeThreeClarification";
import { ScopeTwo } from "@/components/evipace/scope-1-2-berechnung/ScopeTwo";
import { ScopeTwoMethods } from "@/components/evipace/scope-1-2-berechnung/ScopeTwoMethods";
import { SourceDataIntro } from "@/components/evipace/scope-1-2-berechnung/SourceDataIntro";
import { TargetCompanies } from "@/components/evipace/scope-1-2-berechnung/TargetCompanies";
import { TrustStatement } from "@/components/evipace/scope-1-2-berechnung/TrustStatement";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import { isPageReachable } from "@/lib/seo/page-registry";
import { buildBreadcrumbListSchema } from "@/lib/seo/schema/breadcrumb-list";
import { JsonLd } from "@/lib/seo/schema/json-ld";
import { buildOrganizationSchema } from "@/lib/seo/schema/organization";
import { buildServiceSchema } from "@/lib/seo/schema/service";
import { buildWebPageSchema } from "@/lib/seo/schema/webpage";
import { buildWebsiteSchema } from "@/lib/seo/schema/website";

const PAGE_KEY = "scope12Berechnung";

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

export default async function Scope12BerechnungPage({ params }: PageProps) {
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
      "Berechnung von Scope-1- und Scope-2-Emissionen",
      "Berechnung von Scope-1- und Scope-2-Emissionen",
      "Unterstützung für Unternehmen bei der strukturierten Erfassung von Aktivitätsdaten, Zuordnung geeigneter Emissionsfaktoren und nachvollziehbaren Berechnung von Scope-1- und Scope-2-Treibhausgasemissionen."
    ),
    buildBreadcrumbListSchema([
      { name: "Startseite", path: "/de" },
      { name: "Scope 1 & 2", path: "/de/scope-1-2-berechnung" }
    ])
  ].filter((node): node is NonNullable<typeof node> => node !== null);

  return (
    <>
      <JsonLd graph={schemaGraph} />
      <main>
        <LandingHero />
        <SourceDataIntro />
        <ScopeOne />
        <ScopeTwo />
        <ScopeTwoMethods />
        <BoundarySetup />
        <CalculationMethod />
        <DataRequirements />
        <ProcessSteps />
        <Deliverables />
        <RelatedRequirements />
        <ScopeThreeClarification />
        <MethodologyStandards />
        <TargetCompanies />
        <Faq />
        <TrustStatement />
        <LandingFinalCTA />
      </main>
    </>
  );
}
