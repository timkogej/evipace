import type { ReactNode } from "react";
import type { SiteLocale } from "@/lib/site-navigation";
import { AnimatedEvipaceMark } from "./AnimatedEvipaceMark";
import { HeroWorkflow } from "./HeroWorkflow";

/**
 * Minimal white homepage hero: locale copy on the left, the approved Evipace
 * document mark with its three workflow steps on the right (stacked below the
 * copy under 1024px).
 *
 * There is no photograph, no scrim and no decorative furniture — the only
 * visuals are the brand mark and the workflow steps. The mark is inlined so it
 * costs no extra request and can play a one-time CSS entrance without a single
 * byte of client JavaScript. The component is a server component by
 * construction: no state, no effects, no observers, no motion library.
 *
 * `.mark-hero__mark` is the exact element the site intro measures with
 * getBoundingClientRect and hands its own mark over to. The hero renders
 * identically whether or not the intro ever runs.
 *
 * Like the heroes it replaces, this file is deliberately copy-free. Every word
 * belongs to the locale page that renders it, so English can never leak into
 * another locale through here.
 */

type AnimatedMarkHeroProps = {
  /** id of the <h1> the locale renders inside `children`. */
  headingId: string;
  /** Chooses the localized workflow-step copy. */
  locale: SiteLocale;
  children: ReactNode;
};

export function AnimatedMarkHero({
  headingId,
  locale,
  children
}: AnimatedMarkHeroProps) {
  return (
    <section aria-labelledby={headingId} className="mark-hero" id="top">
      {/*
        Photographic backdrop, art-directed in two plates: landscape above
        1024px, portrait beneath it. Both are painted by CSS inside their own
        media query rather than fetched as an <img>, so each viewport
        downloads exactly one of them and never the other.
      */}
      <div aria-hidden="true" className="mark-hero__backdrop" />

      <div className="mark-hero__inner site-shell">
        <div className="mark-hero__content">{children}</div>

        <div className="mark-hero__visual">
          <div className="mark-hero__stage">
            <AnimatedEvipaceMark className="mark-hero__mark" />
            <HeroWorkflow locale={locale} />
          </div>
        </div>
      </div>
    </section>
  );
}
