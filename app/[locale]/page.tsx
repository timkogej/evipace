import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EnglishHomePage } from "@/components/evipace/EnglishHomePage";
import { GermanHomePage } from "@/components/evipace/GermanHomePage";
import { getEvipaceImageAvailability } from "@/lib/evipace-image-availability";
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

  const imageAvailability = getEvipaceImageAvailability();

  const schemaGraph = [
    buildOrganizationSchema(),
    buildWebsiteSchema(),
    buildWebPageSchema(locale, "home")
  ].filter((node): node is NonNullable<typeof node> => node !== null);

  if (locale === "de") {
    return (
      <>
        <JsonLd graph={schemaGraph} />
        <GermanHomePage imageAvailability={imageAvailability} />
      </>
    );
  }

  return (
    <>
      <JsonLd graph={schemaGraph} />
      <EnglishHomePage imageAvailability={imageAvailability} />
    </>
  );
}
