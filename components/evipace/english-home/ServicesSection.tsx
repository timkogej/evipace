import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ServiceImageCard } from "../home-sections/ServiceImageCard";
import type { ServiceImageKey } from "../home-sections/service-images";
import { platformServices, services } from "./content";
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

        {/*
          Platform-named work lives inside service 02, but customers ask for
          EcoVadis and IntegrityNext by name — so both pages get a real,
          descriptive link here rather than only a mention in the card text.
          A quiet strip keeps the masonry above untouched.
        */}
        <div className="mt-10 border-t border-[rgba(21,21,21,0.13)] pt-8">
          <p className="text-xs font-bold uppercase tracking-[0.13em] text-orange">
            Platform assessments
          </p>
          <div className="mt-6 grid gap-8 sm:grid-cols-2">
            {platformServices.map((platform) => (
              <div key={platform.href}>
                <h3 className="text-lg font-bold text-ink">
                  <Link
                    className="transition hover:text-orange"
                    href={platform.href}
                  >
                    {platform.title}
                  </Link>
                </h3>
                <p className="mt-3 leading-7 text-muted">{platform.body}</p>
                <Link
                  className="orange-link mt-4 inline-flex items-center gap-2 text-sm"
                  href={platform.href}
                >
                  <span>{platform.title}</span>
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
