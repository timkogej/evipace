import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AssessmentTopics } from "@/components/evipace/integritynext-unterstuetzung/AssessmentTopics";
import { CertificateOrQuestionnaire } from "@/components/evipace/integritynext-unterstuetzung/CertificateOrQuestionnaire";
import { DataIntegrity } from "@/components/evipace/integritynext-unterstuetzung/DataIntegrity";
import { DepartmentInputs } from "@/components/evipace/integritynext-unterstuetzung/DepartmentInputs";
import { Faq } from "@/components/evipace/integritynext-unterstuetzung/Faq";
import { FollowUpSupport } from "@/components/evipace/integritynext-unterstuetzung/FollowUpSupport";
import { LandingFinalCTA } from "@/components/evipace/integritynext-unterstuetzung/LandingFinalCTA";
import { LandingHero } from "@/components/evipace/integritynext-unterstuetzung/LandingHero";
import { ProfileReuse } from "@/components/evipace/integritynext-unterstuetzung/ProfileReuse";
import { ProcessSteps } from "@/components/evipace/integritynext-unterstuetzung/ProcessSteps";
import { RelatedRequirements } from "@/components/evipace/integritynext-unterstuetzung/RelatedRequirements";
import { RequestIntro } from "@/components/evipace/integritynext-unterstuetzung/RequestIntro";
import { TargetCompanies } from "@/components/evipace/integritynext-unterstuetzung/TargetCompanies";
import { TrustStatement } from "@/components/evipace/integritynext-unterstuetzung/TrustStatement";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import { isPageReachable } from "@/lib/seo/page-registry";
import { buildBreadcrumbListSchema } from "@/lib/seo/schema/breadcrumb-list";
import { JsonLd } from "@/lib/seo/schema/json-ld";
import { buildOrganizationSchema } from "@/lib/seo/schema/organization";
import { buildServiceSchema } from "@/lib/seo/schema/service";
import { buildWebPageSchema } from "@/lib/seo/schema/webpage";
import { buildWebsiteSchema } from "@/lib/seo/schema/website";

const PAGE_KEY = "integrityNextUnterstuetzung";

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

export default async function IntegrityNextUnterstuetzungPage({
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
      "Unterstützung bei IntegrityNext-Assessments",
      "Unterstützung bei IntegrityNext-Assessments",
      "Unabhängige Unterstützung für Lieferanten bei der Vorbereitung von Angaben, Zertifikaten und Nachweisen für IntegrityNext-Assessments."
    ),
    buildBreadcrumbListSchema([
      { name: "Startseite", path: "/de" },
      { name: "IntegrityNext-Unterstützung", path: "/de/integritynext-unterstuetzung" }
    ])
  ].filter((node): node is NonNullable<typeof node> => node !== null);

  return (
    <>
      <JsonLd graph={schemaGraph} />
      <main>
        <LandingHero />
        <RequestIntro />
        <CertificateOrQuestionnaire />
        <DepartmentInputs />
        <AssessmentTopics />
        <ProcessSteps />
        <FollowUpSupport />
        <DataIntegrity />
        <ProfileReuse />
        <TargetCompanies />
        <RelatedRequirements />
        <Faq />
        <TrustStatement />
        <LandingFinalCTA />
      </main>
    </>
  );
}
