import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ReuseDataPassport } from "../home-sections/ReuseDataPassport";
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
        <div className="max-w-3xl">
          <SectionHeading
            eyebrow="The next request should be easier"
            heading={
              <>
                Collect once.{" "}
                <span className="block">Use many times.</span>
              </>
            }
          />
          <p className="mt-7 max-w-xl text-lg leading-8 text-muted">
            These should not become independent data-collection projects.
            Structured source information can be reviewed and used again for
            the next relevant request.
          </p>
        </div>

        <ReuseDataPassport
          className="mt-14"
          destinations={scenarios.map(([source, need]) => ({ source, need }))}
          fields={reuseSteps}
          footer={
            <>
              <p className="reuse__note">
                Reuse still includes checking the reporting period, scope and
                continued validity of the source information.
              </p>
              <Link
                className="reuse__link"
                href="/en/resources/reusable-esg-data"
              >
                <span>See how reusable ESG data works</span>
                <ArrowRight aria-hidden="true" className="h-4 w-4 text-orange" />
              </Link>
            </>
          }
          recordLabel="A better structure"
        />

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
