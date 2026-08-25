import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/evipace/trust/PageHero";
import { RequestForm } from "@/components/evipace/send-request/RequestForm";
import { deSendRequestCopy } from "@/components/evipace/send-request/copy";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import { isPageReachable } from "@/lib/seo/page-registry";

type SendRequestPageProps = {
  params: Promise<{ locale: string }>;
};

// No "sendRequest" entry exists in lib/seo/page-registry.ts for any locale
// yet — it's declared reachable-but-unlisted instead (see
// unlistedReachablePages in lib/seo/page-registry.ts). buildPageMetadata()
// returns a noindex fallback when there's no registry entry, and the
// sitemap only ever includes pages that have one, so this page stays
// reachable by direct URL and through the site's conversion CTAs, but it is
// still not indexed and not included in the sitemap. Those SEO constraints
// remain in place until the launch dependencies (Privacy Notice, Supabase
// secret confirmed, EVIPACE_REQUEST_UPLOADS_ENABLED=true, production
// verification) are resolved, at which point activation is a deliberate
// follow-up pass.
export async function generateMetadata({
  params
}: SendRequestPageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, "sendRequest");
}

// PageHero copy and the form's presentation copy (components/evipace/
// send-request/copy.ts) are the only things that branch on locale here.
// The form component, upload/finalize calls, validation and API routes are
// completely shared and untouched — see RequestForm.tsx.
const pageCopy = {
  en: {
    eyebrow: "Send your ESG request",
    heading: "Received an ESG questionnaire? Send it to us.",
    intro:
      "Attach the questionnaire, certificates, or documents your customer sent you. We'll review what's there and get back to you."
  },
  de: {
    eyebrow: "ESG-Anfrage senden",
    heading: "ESG-Fragebogen erhalten? Senden Sie ihn uns.",
    intro:
      "Hängen Sie den Fragebogen, Zertifikate oder Unterlagen an, die Ihr Kunde Ihnen geschickt hat. Wir prüfen, was vorhanden ist, und melden uns bei Ihnen."
  }
};

export default async function SendRequestPage({
  params
}: SendRequestPageProps) {
  const { locale } = await params;

  if (!isPageReachable(locale, "sendRequest")) {
    notFound();
  }

  const isGerman = locale === "de";
  const hero = isGerman ? pageCopy.de : pageCopy.en;

  return (
    <>
      <main>
        <PageHero
          eyebrow={hero.eyebrow}
          heading={hero.heading}
          intro={hero.intro}
        />
        <section className="section-padding py-8 sm:py-10">
          <div className="site-shell max-w-3xl">
            <RequestForm copy={isGerman ? deSendRequestCopy : undefined} />
          </div>
        </section>
      </main>
    </>
  );
}
