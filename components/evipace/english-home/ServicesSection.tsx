import { ServiceImageCard } from "../home-sections/ServiceImageCard";
import type { ServiceImageKey } from "../home-sections/service-images";
import { services } from "./content";
import { SectionHeading } from "./SectionHeading";

/** Column spans keep the existing editorial masonry rhythm. */
const layouts = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-7",
  "lg:col-span-7",
  "lg:col-span-5"
];

/** Which plate each service is shown on; see home-sections/service-images. */
const imageKeys: ServiceImageKey[] = [
  "customer-requests",
  "questionnaires",
  "scope-1-2",
  "sustainability-reporting",
  "policies-documentation",
  "evidence-preparation"
];

/** Wider cards ask for a wider source; keeps transferred bytes sensible. */
const cardSizes = [
  "(min-width: 1024px) 58vw, 100vw",
  "(min-width: 1024px) 42vw, 100vw",
  "(min-width: 1024px) 42vw, 100vw",
  "(min-width: 1024px) 58vw, 100vw",
  "(min-width: 1024px) 58vw, 100vw",
  "(min-width: 1024px) 42vw, 100vw"
];

export function ServicesSection() {
  return (
    <section
      className="section-padding border-t border-[rgba(21,21,21,0.08)] bg-[var(--paper)] scroll-mt-20"
      id="services"
    >
      <div className="site-shell">
        <div className="max-w-5xl">
          <SectionHeading
            eyebrow="What we handle"
            heading="Practical ESG work, from request to deliverable."
          />
        </div>

        <div className="mt-12 grid gap-px overflow-hidden border border-[rgba(21,21,21,0.11)] bg-[rgba(21,21,21,0.11)] lg:grid-cols-12">
          {services.map((service, index) => (
            <ServiceImageCard
              body={service.body}
              className={layouts[index]}
              detail={service.detail}
              href={"href" in service ? service.href : undefined}
              imageKey={imageKeys[index]}
              key={service.title}
              linkLabel="See this service"
              locale="en"
              note={
                index === 5
                  ? "So the next request does not have to start from zero."
                  : undefined
              }
              number={service.number}
              sizes={cardSizes[index]}
              title={service.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
