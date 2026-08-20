import type { Metadata } from "next";
import { EsgTicker } from "@/components/evipace/EsgTicker";
import { FinalCTA } from "@/components/evipace/FinalCTA";
import { Footer } from "@/components/evipace/Footer";
import { Hero } from "@/components/evipace/Hero";
import { IndustrialBreak } from "@/components/evipace/IndustrialBreak";
import { Navbar } from "@/components/evipace/Navbar";
import { ProblemSection } from "@/components/evipace/ProblemSection";
import { QuestionnaireSection } from "@/components/evipace/QuestionnaireSection";
import { Services } from "@/components/evipace/Services";
import { SocialProof } from "@/components/evipace/SocialProof";
import { SpeedSection } from "@/components/evipace/SpeedSection";
import { TransparencySection } from "@/components/evipace/TransparencySection";
import { ValueStatement } from "@/components/evipace/ValueStatement";
import { WhyEvipace } from "@/components/evipace/WhyEvipace";
import { Workflow } from "@/components/evipace/Workflow";
import { getEvipaceImageAvailability } from "@/lib/evipace-image-availability";
import { buildPageMetadata } from "@/lib/seo/build-metadata";
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
  const imageAvailability = getEvipaceImageAvailability();

  const schemaGraph = [
    buildOrganizationSchema(),
    buildWebsiteSchema(),
    buildWebPageSchema(locale, "home")
  ].filter((node): node is NonNullable<typeof node> => node !== null);

  return (
    <>
      <JsonLd graph={schemaGraph} />
      <Navbar />
      <main>
        <Hero imageAvailable={imageAvailability.hero} />
        <ValueStatement imageAvailable={imageAvailability.customerData} />
        <EsgTicker />
        <ProblemSection />
        <Services imageAvailability={imageAvailability.services} />
        <Workflow imageAvailable={imageAvailability.howItWorks} />
        <SpeedSection />
        <QuestionnaireSection
          imageAvailable={imageAvailability.questionnaireForward}
        />
        <WhyEvipace />
        <IndustrialBreak imageAvailable={imageAvailability.industrialBreak} />
        <TransparencySection />
        <SocialProof />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
