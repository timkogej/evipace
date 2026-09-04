import { CheckCircle2 } from "lucide-react";
import { executionTasks } from "./content";
import { SectionHeading } from "./SectionHeading";

const valueStack = [
  "Practical execution.",
  "Clear scope.",
  "Traceable outputs.",
  "Human review."
];

export function WhyEvipaceSection() {
  return (
    <section
      className="section-padding bg-white scroll-mt-20"
      id="why-evipace"
    >
      <div className="site-shell">
        <div className="max-w-5xl">
          <SectionHeading
            eyebrow="Why Evipace"
            heading="Between a large consultancy and doing everything yourself."
          />
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="grid gap-px overflow-hidden border border-[rgba(21,21,21,0.11)] bg-[rgba(21,21,21,0.11)]">
            <div className="bg-[var(--paper)] p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.13em] text-orange">
                Traditional consulting
              </p>
              <p className="mt-4 text-lg leading-8 text-muted">
                For many manufacturing SMEs, a large traditional ESG consulting
                engagement may be larger than the operational problem requires.
              </p>
            </div>
            <div className="bg-[var(--paper)] p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.13em] text-orange">
                Self-service software
              </p>
              <p className="mt-4 text-lg leading-8 text-muted">
                Software can help organise ESG information, but your team still
                has to carry out significant execution work.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-between bg-dark p-6 text-white sm:p-9">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.13em] text-orange">
                The work that remains
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {executionTasks.map((task) => (
                  <li className="flex gap-3 text-white/72" key={task}>
                    <CheckCircle2
                      aria-hidden="true"
                      className="mt-0.5 h-5 w-5 shrink-0 text-orange"
                    />
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-10 border-t border-white/14 pt-7">
              <p className="text-lg font-semibold text-white">
                Evipace is designed for the space in between.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-3">
                {valueStack.map((item) => (
                  <p
                    className="border-t border-white/14 pt-3 text-sm font-bold text-white"
                    key={item}
                  >
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
