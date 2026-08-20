import type { Metadata } from "next";
import { Footer } from "@/components/evipace/Footer";
import { Navbar } from "@/components/evipace/Navbar";
import { PageHero } from "@/components/evipace/trust/PageHero";
import { ContentSection } from "@/components/evipace/trust/ContentSection";
import { LimitationsList } from "@/components/evipace/trust/LimitationsList";
import { LastReviewed } from "@/components/evipace/trust/LastReviewed";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import { getPageMetadataEntry } from "@/lib/seo/page-registry";
import { JsonLd } from "@/lib/seo/schema/json-ld";
import { buildOrganizationSchema } from "@/lib/seo/schema/organization";
import { buildWebsiteSchema } from "@/lib/seo/schema/website";
import { buildWebPageSchema } from "@/lib/seo/schema/webpage";

type MethodologyPageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params
}: MethodologyPageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, "methodology");
}

export default async function Methodology({ params }: MethodologyPageProps) {
  const { locale } = await params;

  const schemaGraph = [
    buildOrganizationSchema(),
    buildWebsiteSchema(),
    buildWebPageSchema(locale, "methodology")
  ].filter((node): node is NonNullable<typeof node> => node !== null);

  const entry = getPageMetadataEntry(locale, "methodology");

  return (
    <>
      <JsonLd graph={schemaGraph} />
      <Navbar />
      <main>
        <PageHero
          eyebrow="Methodology"
          heading="How we prepare your ESG work."
          intro="This page explains, in plain terms, how Evipace turns the documents and information you provide into prepared ESG questionnaire responses, reports and supporting documentation — what we do, what we don't, and where responsibility sits."
        />

        <ContentSection heading="What we do">
          <p>
            Evipace prepares the ESG work your customers ask for. That
            includes completing supplier ESG questionnaires, preparing VSME
            sustainability reports, calculating Scope 1 &amp; 2 emissions
            from the data you provide, drafting supporting policies, and
            organising the evidence behind all of it. We do the work — not
            just provide a platform for you to do it yourself.
          </p>
        </ContentSection>

        <ContentSection heading="How your information is handled">
          <p>
            You send us what you already have — invoices, spreadsheets,
            certificates, policies, previous reports, and the questionnaire
            itself. We review what&apos;s there, identify what&apos;s
            missing, and organise everything into a structured basis for the
            work ahead. We use the documents and information you provide to
            prepare and review your deliverables.
          </p>
        </ContentSection>

        <ContentSection heading="How the work is prepared">
          <p>
            Questionnaire responses are prepared to match the structure of
            the request you received. VSME reports are prepared using your
            operational and sustainability data. Scope 1 &amp; 2
            calculations are prepared from the energy and fuel data you
            provide. Supporting policies and evidence documents are
            organised and drafted around what your customer has asked for.
          </p>
        </ContentSection>

        <ContentSection heading="Traceability">
          <p>
            Material figures and statements are prepared from the source
            documents and information you provide. Where a figure or
            statement needs to be checked, we keep the underlying source
            identifiable so it can be reviewed.
          </p>
        </ContentSection>

        <ContentSection heading="Review before delivery">
          <p>
            Deliverables are reviewed before they are returned to you — this
            applies whether the underlying work was prepared manually or
            with the help of digital tools.
          </p>
        </ContentSection>

        <ContentSection heading="How we use technology">
          <p>
            Evipace may use digital and AI-assisted tools as part of
            internal processing. These tools support our team; they do not
            replace the review step, and they do not make Evipace an AI
            product. Every deliverable is reviewed by a person before it is
            returned to you.
          </p>
        </ContentSection>

        <ContentSection heading="Your responsibility for source data">
          <p>
            Evipace prepares your ESG work using the information and
            documents you supply. You remain responsible for the accuracy
            and completeness of that source data. If information is missing
            or unclear, we will flag it — but we do not invent or assume
            data on your behalf.
          </p>
        </ContentSection>

        <LimitationsList />

        {entry?.lastReviewed ? (
          <section className="section-padding pb-16 pt-4 sm:pb-20">
            <div className="site-shell">
              <div className="max-w-3xl border-t border-[rgba(21,21,21,0.12)] pt-6">
                <LastReviewed date={entry.lastReviewed} />
              </div>
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </>
  );
}
