import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SendRequestPage as SendRequestLayout } from "@/components/evipace/send-request/SendRequestPage";
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

export default async function SendRequestPage({
  params
}: SendRequestPageProps) {
  const { locale } = await params;

  if (!isPageReachable(locale, "sendRequest")) {
    notFound();
  }

  const isGerman = locale === "de";

  // The page around the form branches on locale; the form component,
  // upload/finalize calls, validation and API routes are shared — see
  // RequestForm.tsx.
  return (
    <SendRequestLayout locale={isGerman ? "de" : "en"}>
      <RequestForm
        copy={isGerman ? deSendRequestCopy : undefined}
        locale={isGerman ? "de" : "en"}
      />
    </SendRequestLayout>
  );
}
