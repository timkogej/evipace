import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OffersPage } from "@/components/evipace/offers/OffersPage";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import { isPageReachable } from "@/lib/seo/page-registry";
import { buildBreadcrumbListSchema } from "@/lib/seo/schema/breadcrumb-list";
import { JsonLd } from "@/lib/seo/schema/json-ld";
import { buildOrganizationSchema } from "@/lib/seo/schema/organization";
import { buildWebPageSchema } from "@/lib/seo/schema/webpage";
import { buildWebsiteSchema } from "@/lib/seo/schema/website";

const PAGE_KEY = "offers";

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

export default async function OffersGermanPage({ params }: PageProps) {
  const { locale } = await params;

  if (locale !== "de" || !isPageReachable(locale, PAGE_KEY)) {
    notFound();
  }

  const schemaGraph = [
    buildOrganizationSchema(),
    buildWebsiteSchema(),
    buildWebPageSchema(locale, PAGE_KEY),
    buildBreadcrumbListSchema([
      { name: "Startseite", path: "/de" },
      { name: "Angebot", path: "/de/angebot" }
    ])
  ].filter((node): node is NonNullable<typeof node> => node !== null);

  return (
    <>
      <JsonLd graph={schemaGraph} />
      <OffersPage locale="de" />
    </>
  );
}
