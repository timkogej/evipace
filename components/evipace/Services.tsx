import {
  Calculator,
  ClipboardCheck,
  FileCheck2,
  FolderKanban
} from "lucide-react";
import { evipaceImages } from "@/lib/evipace-images";
import { ImageSlot } from "./ImageSlot";
import { Reveal } from "./Reveal";

type ServiceImageKey = "questionnaires" | "vsme" | "scope" | "evidence";

type ServicesProps = {
  imageAvailability: Record<ServiceImageKey, boolean>;
};

const services = [
  {
    number: "01",
    title: "Customer ESG questionnaires",
    description:
      "We prepare responses for EcoVadis, IntegrityNext and custom ESG questionnaires sent by your customers.",
    image: evipaceImages.services.questionnaires,
    icon: ClipboardCheck,
    imageKey: "questionnaires" as const
  },
  {
    number: "02",
    title: "VSME reporting",
    description:
      "Structured sustainability reporting based on your company data and available documentation.",
    image: evipaceImages.services.vsme,
    icon: FileCheck2,
    imageKey: "vsme" as const
  },
  {
    number: "03",
    title: "Scope 1 & 2",
    description:
      "We organise activity data and prepare Scope 1 and Scope 2 greenhouse-gas calculations.",
    image: evipaceImages.services.scope,
    icon: Calculator,
    imageKey: "scope" as const
  },
  {
    number: "04",
    title: "Policies & supporting evidence",
    description:
      "Missing policies, supporting documents and ESG evidence organised around the requirements you need to answer.",
    image: evipaceImages.services.evidence,
    icon: FolderKanban,
    imageKey: "evidence" as const
  }
];

export function Services({ imageAvailability }: ServicesProps) {
  return (
    <section
      className="section-padding border-t border-[rgba(21,21,21,0.08)] bg-white"
      id="services"
    >
      <div className="site-shell">
        <Reveal className="mb-14 max-w-4xl">
          <p className="eyebrow">Services</p>
          <h2 className="heading-md font-display mt-6">
            We handle the ESG work behind the request.
          </h2>
        </Reveal>

        <div className="grid gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            const reverse = index % 2 === 1;

            return (
              <Reveal
                className={`grid items-stretch overflow-hidden rounded-[1.25rem] border border-[rgba(21,21,21,0.11)] bg-[var(--paper)] lg:grid-cols-2 ${
                  reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
                delay={index * 0.05}
                key={service.title}
              >
                <div className="flex min-h-[25rem] flex-col justify-between p-7 sm:p-10">
                  <div className="flex items-start justify-between gap-5">
                    <span className="font-display text-6xl leading-none text-orange">
                      {service.number}
                    </span>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(21,21,21,0.11)] bg-white">
                      <Icon aria-hidden="true" className="h-5 w-5 text-orange" />
                    </div>
                  </div>

                  <div>
                    <h3 className="mt-12 max-w-xl text-3xl font-semibold tracking-[-0.01em] text-ink sm:text-5xl">
                      {service.title}
                    </h3>
                    <p className="mt-5 max-w-xl text-lg leading-8 text-muted">
                      {service.description}
                    </p>
                  </div>
                </div>

                <div className="min-h-[22rem] lg:min-h-[25rem]">
                  <ImageSlot
                    {...service.image}
                    className="h-full min-h-[22rem] rounded-none border-0 lg:min-h-[25rem]"
                    renderActualImage={imageAvailability[service.imageKey]}
                  />
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
