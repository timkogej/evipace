import { CheckCircle2, MinusCircle } from "lucide-react";
import { Reveal } from "./Reveal";

const does = [
  "prepares ESG reports",
  "structures ESG data",
  "calculates Scope 1 & 2 based on client information",
  "prepares questionnaire responses",
  "prepares draft policies",
  "organises supporting evidence",
  "reviews deliverables"
];

const doesnt = [
  "issue ESG certifications",
  "guarantee legal compliance",
  "invent missing company data",
  "submit unsupported claims on behalf of clients"
];

export function TransparencySection() {
  return (
    <section className="section-padding bg-white" id="about">
      <div className="site-shell">
        <Reveal className="max-w-4xl">
          <p className="eyebrow">Trust and transparency</p>
          <h2 className="heading-md font-display mt-6">
            Clear about what we do.
            <br />
            Clear about what we do not.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Reveal className="rounded-[1.25rem] border border-[rgba(21,21,21,0.11)] bg-[var(--paper)] p-7 sm:p-9">
            <h3 className="text-2xl font-bold text-ink">What Evipace does</h3>
            <ul className="mt-7 grid gap-4">
              {does.map((item) => (
                <li className="flex gap-3 text-muted" key={item}>
                  <CheckCircle2
                    aria-hidden="true"
                    className="mt-0.5 h-5 w-5 shrink-0 text-orange"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal
            className="rounded-[1.25rem] border border-[rgba(21,21,21,0.11)] bg-white p-7 shadow-lift sm:p-9"
            delay={0.08}
          >
            <h3 className="text-2xl font-bold text-ink">
              What Evipace does not do
            </h3>
            <ul className="mt-7 grid gap-4">
              {doesnt.map((item) => (
                <li className="flex gap-3 text-muted" key={item}>
                  <MinusCircle
                    aria-hidden="true"
                    className="mt-0.5 h-5 w-5 shrink-0 text-[rgba(21,21,21,0.42)]"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="mt-8 border-l-2 border-orange bg-[var(--soft-orange)] px-6 py-5 text-sm font-semibold leading-7 text-[rgba(21,21,21,0.72)]">
          All work is prepared using information and documentation supplied by
          the client and reviewed before delivery.
        </Reveal>

        <Reveal className="mt-5 max-w-4xl text-sm leading-7 text-muted">
          Evipace may use digital and AI-assisted tools as part of internal
          processing, but client deliverables are prepared and reviewed before
          delivery.
        </Reveal>
      </div>
    </section>
  );
}
