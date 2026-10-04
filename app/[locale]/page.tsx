import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HomeLandingPage } from "@/components/evipace/HomeLandingPage";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
import { isPageReachable } from "@/lib/seo/page-registry";
import { JsonLd } from "@/lib/seo/schema/json-ld";
import { buildOrganizationSchema } from "@/lib/seo/schema/organization";
import { buildWebsiteSchema } from "@/lib/seo/schema/website";
import { buildWebPageSchema } from "@/lib/seo/schema/webpage";

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params
}: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  return buildPageMetadata(locale, "home");
}

export default async function Home({ params }: HomePageProps) {
  const { locale } = await params;

  if (!isPageReachable(locale, "home")) {
    notFound();
  }

  const schemaGraph = [
    buildOrganizationSchema(),
    buildWebsiteSchema(),
    buildWebPageSchema(locale, "home")
  ].filter((node): node is NonNullable<typeof node> => node !== null);

  if (locale === "de") {
    return (
      <>
        <JsonLd graph={schemaGraph} />
        <HomeLandingPage locale="de" />
      </>
    );
  }

  return (
    <>
      <JsonLd graph={schemaGraph} />
      <HomeLandingPage locale="en" />
    </>
  );
}
