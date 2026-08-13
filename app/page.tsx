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

export default function Home() {
  const imageAvailability = getEvipaceImageAvailability();

  return (
    <>
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
        <WhyEvipace imageAvailable={imageAvailability.founder} />
        <IndustrialBreak imageAvailable={imageAvailability.industrialBreak} />
        <TransparencySection />
        <SocialProof />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
