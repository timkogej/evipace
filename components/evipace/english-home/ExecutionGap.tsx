import { SectionHeading } from "./SectionHeading";

const verbs = ["Collect", "Structure", "Calculate", "Document", "Prepare"];

export function ExecutionGap() {
  return (
    <section
      className="section-padding relative isolate overflow-hidden bg-dark text-white"
      id="execution-gap"
    >
      <div className="pointer-events-none absolute -right-8 top-2 font-display text-[clamp(9rem,25vw,24rem)] leading-none text-[rgba(255,255,255,0.025)]">
        GAP
      </div>
      <div className="site-shell relative z-10 grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
        <div>
          <SectionHeading
            dark
            eyebrow="Not another ESG dashboard"
            heading="We do the work behind the reporting."
          />
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/68">
            There are tools that store ESG data once the data have already been
            collected. For smaller manufacturing companies, the hardest part is
            often earlier.
          </p>
        </div>

        <div className="lg:pt-4">
          <div className="border-l border-white/16 pl-6 sm:pl-9">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-white/44">
              From
            </p>
            <p className="font-display mt-4 max-w-2xl text-4xl leading-[1.04] text-white sm:text-5xl">
              “Our customer wants ESG information.”
            </p>
            <div className="my-8 flex items-center gap-4 text-orange">
              <span className="h-px w-16 bg-orange/60" />
              <span className="text-xs font-bold uppercase tracking-[0.15em]">
                Practical execution
              </span>
            </div>
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-white/44">
              To
            </p>
            <p className="font-display mt-4 max-w-2xl text-4xl leading-[1.04] text-white sm:text-5xl">
              “Here are the numbers, documents and answers we can actually stand
              behind.”
            </p>
          </div>

          <p className="mt-10 text-xl font-semibold text-white">
            evipace works in that gap.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {verbs.map((verb) => (
              <span
                className="rounded-full border border-white/16 bg-white/[0.04] px-4 py-2 text-sm font-semibold text-white/76"
                key={verb}
              >
                {verb}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
