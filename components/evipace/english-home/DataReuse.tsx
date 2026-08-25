import { ArrowDown, ArrowRight } from "lucide-react";
import Link from "next/link";
import { reuseSteps } from "./content";
import { SectionHeading } from "./SectionHeading";

const scenarios = [
  ["Customer", "Electricity consumption"],
  ["Another customer", "Scope 2"],
  ["EcoVadis", "Environmental evidence"],
  ["IntegrityNext", "Assessment information"],
  ["Bank", "Sustainability information"],
  ["Voluntary report", "The underlying datapoint again"]
];

export function DataReuse() {
  return (
    <section className="section-padding bg-white" id="data-foundation">
      <div className="site-shell">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
          <div>
            <SectionHeading
              eyebrow="The next request should be easier"
              heading="Collect once. Use many times."
            />
            <p className="mt-7 max-w-xl text-lg leading-8 text-muted">
              These should not become independent data-collection projects.
              Structured source information can be reviewed and used again for
              the next relevant request.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden border border-[rgba(21,21,21,0.11)] bg-[rgba(21,21,21,0.11)] sm:grid-cols-2 lg:grid-cols-3">
            {scenarios.map(([source, need]) => (
              <div className="bg-[var(--warm)] p-5" key={`${source}-${need}`}>
                <p className="text-xs font-bold uppercase tracking-[0.13em] text-orange">
                  {source}
                </p>
                <p className="mt-3 font-semibold leading-6 text-ink">{need}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 border border-[rgba(21,21,21,0.11)] bg-[var(--paper)] p-5 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-orange">
            A better structure
          </p>
          <ol className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-8 lg:gap-0">
            {reuseSteps.map((step, index) => (
              <li
                className="relative flex min-h-24 flex-col justify-between border border-[rgba(21,21,21,0.11)] bg-white p-4 lg:border-r-0 lg:last:border-r"
                key={step}
              >
                <span className="font-mono text-[0.66rem] font-bold text-orange">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="mt-5 text-sm font-bold leading-5 text-ink">
                  {step}
                </span>
                {index < reuseSteps.length - 1 ? (
                  <>
                    <ArrowDown
                      aria-hidden="true"
                      className="absolute -bottom-3 left-1/2 z-10 h-5 w-5 -translate-x-1/2 rounded-full bg-orange p-1 text-white sm:hidden"
                    />
                    <ArrowRight
                      aria-hidden="true"
                      className="absolute -right-3 top-1/2 z-10 hidden h-5 w-5 -translate-y-1/2 rounded-full bg-orange p-1 text-white lg:block"
                    />
                  </>
                ) : null}
              </li>
            ))}
          </ol>
          <p className="mt-7 text-sm leading-6 text-muted">
            Reuse still includes checking the reporting period, scope and
            continued validity of the source information.
          </p>
          <Link
            className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-ink transition hover:text-orange"
            href="/en/resources/reusable-esg-data"
          >
            <span>See how reusable ESG data works</span>
            <ArrowRight aria-hidden="true" className="h-4 w-4 text-orange" />
          </Link>
        </div>

        <div className="mt-12 border-t border-[rgba(21,21,21,0.13)] pt-8">
          <p className="font-display text-[clamp(2.5rem,5.5vw,5.5rem)] leading-[0.96] text-ink">
            The questionnaire may change.
            <br />
            <span className="text-orange">
              The company reality underneath it does not.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
