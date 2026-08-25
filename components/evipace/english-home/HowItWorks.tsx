import { ArrowRight } from "lucide-react";
import { evipaceImages } from "@/lib/evipace-images";
import { workflowSteps } from "./content";
import { HomeImage } from "./HomeImage";
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

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <HomeImage
              asset={evipaceImages.howItWorks}
              available={imageAvailable}
              className="aspect-[1.08/1] rounded-[1.25rem]"
            />
            <p className="mt-6 border-l-2 border-orange pl-5 text-lg font-semibold leading-8 text-ink">
              The useful part should not disappear after one questionnaire.
            </p>
          </div>

          <ol className="grid gap-px overflow-hidden border border-[rgba(21,21,21,0.11)] bg-[rgba(21,21,21,0.11)]">
            {workflowSteps.map((step, index) => (
              <li
                className="group grid gap-5 bg-white p-6 sm:grid-cols-[7rem_1fr] sm:p-8"
                key={step.number}
              >
                <div className="flex items-center gap-3 sm:items-start">
                  <span className="font-display text-5xl leading-none text-orange">
                    {step.number}
                  </span>
                  {index < workflowSteps.length - 1 ? (
                    <ArrowRight
                      aria-hidden="true"
                      className="mt-4 hidden h-4 w-4 text-[rgba(21,21,21,0.28)] sm:block"
                    />
                  ) : null}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-ink sm:text-2xl">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-2xl leading-7 text-muted">
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
