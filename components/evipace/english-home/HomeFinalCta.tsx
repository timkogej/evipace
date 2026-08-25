import { ButtonLink } from "../ButtonLink";

export function HomeFinalCta() {
  return (
    <section
      className="relative isolate overflow-hidden bg-[var(--soft-orange)] py-20 sm:py-28"
      id="final-cta"
    >
      <div className="pointer-events-none absolute -right-8 top-0 font-display text-[clamp(9rem,25vw,24rem)] leading-none text-[rgba(254,112,1,0.08)]">
        SEND
      </div>
      <div className="site-shell relative z-10 max-w-5xl">
        <p className="eyebrow">Start with the request</p>
        <h2 className="font-display mt-6 max-w-[14ch] text-5xl leading-[0.96] text-ink sm:text-6xl lg:text-7xl">
          Already have an ESG request in your inbox?
        </h2>
        <div className="mt-8 max-w-2xl space-y-2 text-lg leading-8 text-muted">
          <p>Do not rewrite it for us.</p>
          <p>Do not prepare a brief.</p>
          <p>Do not first figure out which service you need.</p>
        </div>
        <p className="font-display mt-8 max-w-3xl text-3xl leading-tight text-ink sm:text-4xl">
          Just send us what your customer sent you.
        </p>
        <p className="mt-4 text-lg font-semibold text-ink">
          We will start from there.
        </p>
        <div className="mt-9">
          <ButtonLink href="/en/send-request">Send your ESG request</ButtonLink>
        </div>
        <p className="mt-7 text-sm font-semibold leading-7 text-[rgba(21,21,21,0.62)]">
          Questionnaire · Email · Excel · PDF · Customer request
        </p>
      </div>
    </section>
  );
}
