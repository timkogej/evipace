import { Reveal } from "../Reveal";

type PageHeroProps = {
  eyebrow: string;
  heading: string;
  intro: string;
};

/**
 * Reusable editorial page header for trust-infrastructure pages
 * (methodology, about, and future resource/regulatory pages). Matches the
 * homepage's existing typographic system (font-display heading, eyebrow,
 * intro paragraph) rather than introducing a separate "legal page" look.
 */
export function PageHero({ eyebrow, heading, intro }: PageHeroProps) {
  return (
    <section className="section-padding pb-8 pt-32 sm:pb-10">
      <div className="site-shell">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="heading-lg font-display mt-6">{heading}</h1>
          <p className="body-lg mt-7 max-w-2xl text-muted">{intro}</p>
        </Reveal>
      </div>
    </section>
  );
}
