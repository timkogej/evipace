import type { Metadata } from "next";
import { Footer } from "@/components/evipace/Footer";
import { Navbar } from "@/components/evipace/Navbar";
import { PageHero } from "@/components/evipace/trust/PageHero";
import { ContentSection } from "@/components/evipace/trust/ContentSection";
import {
  companyLocationStatement,
  founderInfo,
  publicContactEmail
} from "@/lib/company-info";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import { JsonLd } from "@/lib/seo/schema/json-ld";
import { buildOrganizationSchema } from "@/lib/seo/schema/organization";
import { buildWebsiteSchema } from "@/lib/seo/schema/website";
import { buildWebPageSchema } from "@/lib/seo/schema/webpage";

type AboutPageProps = {
  params: Promise<{ locale: string }>;
};

// No "about" entry exists in lib/seo/page-registry.ts yet — that's
// intentional. buildPageMetadata() already returns a noindex fallback when
// an active locale has no registry entry for a page, which is exactly the
// "keep this unlisted until real content is approved" behavior this page
// needs. Once founder/company info is approved, add the registry entry and
// this page becomes indexable, canonical-tagged, and sitemap-included
// automatically — no code change required here.
export async function generateMetadata({
  params
}: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, "about");
}

export default async function About({ params }: AboutPageProps) {
  const { locale } = await params;

  // buildWebPageSchema returns null when there's no registry entry (same
  // reasoning as above) — the graph below correctly omits the WebPage node
  // until one exists, rather than asserting page-level schema for a page
  // that isn't published yet.
  const schemaGraph = [
    buildOrganizationSchema(),
    buildWebsiteSchema(),
    buildWebPageSchema(locale, "about")
  ].filter((node): node is NonNullable<typeof node> => node !== null);

  return (
    <>
      <JsonLd graph={schemaGraph} />
      <Navbar />
      <main>
        <PageHero
          eyebrow="About"
          heading="About Evipace."
          intro="Evipace helps manufacturing suppliers respond to the ESG requests their customers send them — questionnaires, VSME reports, Scope 1 & 2 calculations and the evidence behind all of it."
        />

        <ContentSection heading="Where we're based">
          <p>{companyLocationStatement}.</p>
        </ContentSection>

        {/*
          Founder section renders only once lib/company-info.ts's
          founderInfo is populated with real, approved data. Per explicit
          instruction: no photo placeholder, no invented bio — the page is
          designed to work elegantly without this section until then.
        */}
        {founderInfo ? (
          <ContentSection heading={founderInfo.title}>
            <p className="text-xl font-bold text-ink">{founderInfo.name}</p>
            {founderInfo.bio ? <p>{founderInfo.bio}</p> : null}
          </ContentSection>
        ) : null}

        <ContentSection heading="Get in touch">
          <p>
            <a className="orange-link" href={`mailto:${publicContactEmail}`}>
              {publicContactEmail}
            </a>
          </p>
        </ContentSection>
      </main>
      <Footer />
    </>
  );
}
