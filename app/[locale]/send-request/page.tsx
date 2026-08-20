import type { Metadata } from "next";
import { Footer } from "@/components/evipace/Footer";
import { Navbar } from "@/components/evipace/Navbar";
import { PageHero } from "@/components/evipace/trust/PageHero";
import { RequestForm } from "@/components/evipace/send-request/RequestForm";
import { buildPageMetadata } from "@/lib/seo/build-metadata";

type SendRequestPageProps = {
  params: Promise<{ locale: string }>;
};

// No "sendRequest" entry exists in lib/seo/page-registry.ts yet — same
// mechanism used for the About page: buildPageMetadata() returns a
// noindex fallback for an active locale with no registry entry, and the
// sitemap only ever includes pages that have one. This page is reachable
// by direct URL for review/testing, but not indexed, not in the sitemap,
// and not linked from the homepage CTAs — all three stay that way until
// the launch dependencies (Privacy Notice, Supabase secret confirmed,
// EVIPACE_REQUEST_UPLOADS_ENABLED=true, production verification) are
// resolved, at which point activation is a deliberate follow-up pass.
export async function generateMetadata({
  params
}: SendRequestPageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, "sendRequest");
}

export default function SendRequestPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Send your ESG request"
          heading="Received an ESG questionnaire? Send it to us."
          intro="Attach the questionnaire, certificates, or documents your customer sent you. We'll review what's there and get back to you."
        />
        <section className="section-padding py-8 sm:py-10">
          <div className="site-shell max-w-3xl">
            <RequestForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
