import type { ReactNode } from "react";
import type { SiteLocale } from "@/lib/site-navigation";
import { AnimatedEvipaceMark } from "./AnimatedEvipaceMark";
import { HeroWorkflow } from "./HeroWorkflow";

/** Shared hero layout. Pages can supply a custom visual or use the brand mark. */

type AnimatedMarkHeroProps = {
  /** id of the <h1> the locale renders inside `children`. */
  headingId: string;
  /** Chooses the localized workflow-step copy. */
  locale: SiteLocale;
  children: ReactNode;
  showMark?: boolean;
  visual?: ReactNode;
};

export function AnimatedMarkHero({
  headingId,
  locale,
  children,
  showMark = true,
  visual
}: AnimatedMarkHeroProps) {
  return (
    <section aria-labelledby={headingId} className="mark-hero" id="top">
      {/*
        Photographic backdrop, art-directed in two plates: landscape above
        1024px, portrait beneath it. Both are painted by CSS inside their own
        media query rather than fetched as an <img>, so each viewport
        downloads exactly one of them and never the other.
      */}
      <div
        aria-hidden="true"
        className="mark-hero__backdrop"
        style={visual ? { display: "none" } : undefined}
      />

      <div className="mark-hero__inner site-shell">
        <div className="mark-hero__content">{children}</div>

        <div
          className="mark-hero__visual"
          style={visual ? { position: "relative", overflow: "hidden", background: "#f8f8f6" } : undefined}
        >
          <div
            className="mark-hero__stage"
            style={visual ? { position: "absolute", inset: 0, width: "100%", height: "100%" } : undefined}
          >
            {visual ?? (showMark ? (
              <>
                <AnimatedEvipaceMark className="mark-hero__mark" />
                <HeroWorkflow locale={locale} />
              </>
            ) : null)}
          </div>
        </div>
      </div>
    </section>
  );
}
