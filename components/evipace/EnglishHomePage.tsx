import type { EvipaceImageAvailability } from "@/lib/evipace-image-availability";
import { AboutEvipace } from "./english-home/AboutEvipace";
import { CustomerRequest } from "./english-home/CustomerRequest";
import { DataReuse } from "./english-home/DataReuse";
import { Deliverables } from "./english-home/Deliverables";
import { ExecutionGap } from "./english-home/ExecutionGap";
import { HomeFaq } from "./english-home/HomeFaq";
import { HomeFinalCta } from "./english-home/HomeFinalCta";
import { HomeHero } from "./english-home/HomeHero";
import { HowItWorks } from "./english-home/HowItWorks";
import { Manufacturing } from "./english-home/Manufacturing";
import { QualityPrinciples } from "./english-home/QualityPrinciples";
import { ScatteredData } from "./english-home/ScatteredData";
import { ServicesSection } from "./english-home/ServicesSection";
import { WhyEvipaceSection } from "./english-home/WhyEvipaceSection";

export function EnglishHomePage({
  imageAvailability
}: {
  imageAvailability: EvipaceImageAvailability;
}) {
  return (
    <>
      <main>
        <HomeHero />
        <ScatteredData />
        <CustomerRequest
          imageAvailable={imageAvailability.questionnaireForward}
        />
        <ServicesSection />
        <ExecutionGap />
        <HowItWorks imageAvailable={imageAvailability.howItWorks} />
        <Manufacturing imageAvailable={imageAvailability.industrialBreak} />
        <DataReuse />
        <QualityPrinciples />
        <WhyEvipaceSection />
        <Deliverables />
        <AboutEvipace />
        <HomeFaq />
        <HomeFinalCta />
      </main>
    </>
  );
}
