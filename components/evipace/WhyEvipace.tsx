import { Reveal } from "./Reveal";

const values = [
  {
    title: "Faster execution",
    body: "Structured workflows reduce repetitive ESG administration."
  },
  {
    title: "Done for you",
    body: "We help complete the actual work - not just provide another software platform."
  },
  {
    title: "Reviewed before delivery",
    body: "Client deliverables are checked before they are returned to you."
  },
  {
    title: "Built for suppliers",
    body: "Designed around the ESG requests manufacturing companies receive from their customers."
  }
];

export function WhyEvipace() {
  return (
    <section className="section-padding bg-[var(--paper)]" id="why-evipace">
      <div className="site-shell">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.58fr] lg:items-end">
          <Reveal className="max-w-4xl">
            <p className="eyebrow">Why Evipace</p>
            <h2 className="heading-md font-display mt-6">
              ESG without building an ESG department.
            </h2>
          </Reveal>
          <Reveal
            className="border-l border-[rgba(21,21,21,0.12)] pl-6 text-lg leading-8 text-muted lg:pb-2"
            delay={0.08}
          >
            We combine structured ESG workflows with human review, so your team
            can answer customer requests without hiring, training or managing a
            new internal function.
          </Reveal>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden border border-[rgba(21,21,21,0.11)] bg-[rgba(21,21,21,0.11)] lg:grid-cols-4">
          {values.map((value, index) => (
            <Reveal
              className="group min-h-[22rem] bg-[var(--paper)] p-6 transition hover:bg-white sm:p-8"
              delay={index * 0.05}
              key={value.title}
            >
              <span className="font-display text-6xl leading-none text-[rgba(21,21,21,0.16)] transition group-hover:text-orange">
                0{index + 1}
              </span>
              <h3 className="mt-16 text-2xl font-bold text-ink">
                {value.title}
              </h3>
              <p className="mt-4 leading-7 text-muted">{value.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
