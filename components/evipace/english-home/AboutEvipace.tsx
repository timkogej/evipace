import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";
import { SectionHeading } from "./SectionHeading";

export function AboutEvipace() {
  return (
    <section
      className="section-padding relative isolate overflow-hidden bg-[var(--warm)] scroll-mt-20"
      id="about-evipace"
    >
      <div className="pointer-events-none absolute bottom-[-2rem] right-[3vw] font-display text-[clamp(8rem,22vw,20rem)] leading-none text-[rgba(254,112,1,0.055)]">
        EU
      </div>
      <div className="site-shell relative z-10 grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-start">
        <div>
          <SectionHeading
            eyebrow="About evipace"
            heading="ESG should not be more complicated than the task itself."
          />
          <div className="mt-8 flex flex-wrap gap-5">
            <Link
              className="orange-link inline-flex items-center gap-2 text-sm"
              href="/en/about"
            >
              <span>About evipace</span>
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <Link
              className="orange-link inline-flex items-center gap-2 text-sm"
              href="/en/methodology"
            >
              <span>Our methodology</span>
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="grid gap-7">
          <div className="space-y-5 text-lg leading-8 text-muted">
            <p>
              Large companies increasingly request sustainability information
              from their suppliers. The resources available to smaller
              suppliers have not increased at the same rate.
            </p>
            <p>evipace was built around that gap.</p>
            <p>
              The information often exists — but someone still has to find it,
              structure it, calculate what is missing and turn it into something
              usable.
            </p>
          </div>

          <div className="flex items-start gap-4 border-t border-[rgba(21,21,21,0.13)] pt-7">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--soft-orange)] text-orange">
              <MapPin aria-hidden="true" className="h-5 w-5" />
            </div>
            <p className="font-display text-3xl leading-tight text-ink sm:text-4xl">
              Founded in Slovenia.
              <br />
              Built for European supply chains.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
