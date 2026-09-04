import { EvidenceAssemblyBoard } from "../home-sections/EvidenceAssemblyBoard";
import { scatteredSources } from "./content";
import { SectionHeading } from "./SectionHeading";

const outputs = [
  "ESG answers",
  "Calculations",
  "Evidence",
  "Reporting outputs"
];

export function ScatteredData() {
  return (
    <section className="section-padding bg-[var(--warm)]" id="scattered-data">
      <div className="site-shell grid gap-12 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
        <div>
          <SectionHeading
            eyebrow="The data is usually already there"
            heading={
              <>
                Your ESG data is probably not missing.{" "}
                <span className="block">It is scattered.</span>
              </>
            }
          />
          <div className="mt-7 max-w-2xl space-y-5 text-lg leading-8 text-muted">
            <p>
              Much of the underlying source information often already exists
              inside the business — just not in the form a customer request
              expects.
            </p>
            <p>
              Policies may be distributed across departments, or represented by
              real operational practices that have not yet been formally
              documented.
            </p>
            <p>
              Then a customer sends one questionnaire and expects all of it in
              one place.
            </p>
          </div>
          <p className="mt-8 border-l-2 border-orange pl-5 text-xl font-semibold leading-8 text-ink">
            That is the problem Evipace solves.
          </p>
        </div>

        <EvidenceAssemblyBoard
          output={{ label: "Structured output", items: outputs }}
          sources={scatteredSources.map((item) => ({
            label: item.department,
            description: item.source
          }))}
        />
      </div>
    </section>
  );
}
