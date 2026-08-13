import { Reveal } from "./Reveal";

const metricLabels = [
  "Questionnaires completed",
  "Hours of ESG administration saved",
  "Manufacturing clients"
];

export function SocialProof() {
  return (
    <section className="section-padding bg-[var(--warm)]">
      <div className="site-shell">
        <Reveal className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <div>
            <p className="eyebrow">Built for suppliers</p>
            <h2 className="heading-md font-display mt-6">
              Built for European industrial suppliers.
            </h2>
          </div>
          <p className="body-lg">
            The proof area is ready for real customer logos, case studies and
            operating metrics once they are approved.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {metricLabels.map((label, index) => (
            <Reveal
              className="rounded-2xl border border-[rgba(21,21,21,0.11)] bg-white p-6"
              delay={index * 0.05}
              key={label}
            >
              <p className="font-display text-7xl leading-none text-orange">-</p>
              <p className="mt-5 text-sm font-bold uppercase tracking-[0.14em] text-muted">
                {label}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 grid grid-cols-2 gap-px overflow-hidden border border-[rgba(21,21,21,0.1)] bg-[rgba(21,21,21,0.1)] sm:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              className="flex min-h-28 items-center justify-center bg-[var(--paper)] px-5"
              key={index}
            >
              <span className="rounded-full border border-dashed border-[rgba(21,21,21,0.18)] px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[rgba(21,21,21,0.45)]">
                Customer logo
              </span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
