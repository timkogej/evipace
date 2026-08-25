import { evipaceImages } from "@/lib/evipace-images";
import { EditorialPlate } from "../home-sections/EditorialPlate";
import { ProcessSpine } from "../home-sections/ProcessSpine";
import { workflowSteps } from "./content";
import { SectionHeading } from "./SectionHeading";

export function HowItWorks({ imageAvailable }: { imageAvailable: boolean }) {
  return (
    <section
      className="section-padding bg-[var(--warm)] scroll-mt-20"
      id="how-it-works"
    >
      <div className="site-shell">
        <div className="max-w-5xl">
          <SectionHeading
            eyebrow="How evipace works"
            heading="From customer request to a usable answer."
          />
        </div>

        {/*
          Image rail and process spine share one axis: the plate is sticky
          (native CSS only) while the spine scrolls past it.
        */}
        <div className="works mt-12">
          <div className="works__rail">
            <EditorialPlate
              asset={evipaceImages.howItWorks}
              available={imageAvailable}
              ratio="1.08 / 1"
              sizes="(min-width: 1024px) 34vw, 100vw"
            />
            <p className="works__aside">
              The useful part should not disappear after one questionnaire.
            </p>
          </div>

          <ProcessSpine className="works__spine" steps={workflowSteps} />
        </div>
      </div>
    </section>
  );
}
