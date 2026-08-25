import type { ReactNode } from "react";
import { InView } from "../home-sections/InView";

/**
 * Layout primitives shared by the English and German About pages.
 *
 * Everything here is a server component. The only client boundary is the
 * shared `InView` wrapper, which the approved homepage already uses: the
 * markup ships in its final, visible state and `InView` merely adds a
 * `data-evi-reveal` attribute once it is on screen. A reader without
 * JavaScript — or one who asked for reduced motion — sees the finished
 * page, because the CSS only hides anything while that attribute says
 * "pending".
 *
 * Sections are separated by their tonal band alone: no rule under a
 * heading and no section numbering.
 */

export type AboutTone = "paper" | "surface" | "soft" | "dark";

export const aboutToneClass: Record<AboutTone, string> = {
  paper: "bg-[var(--paper)] text-ink",
  surface: "bg-[var(--surface)] text-ink",
  soft: "bg-[var(--soft-orange)] text-ink",
  dark: "about-tone-dark bg-ink text-white"
};

export const aboutToneBorder: Record<AboutTone, string> = {
  paper: "border-[rgba(21,21,21,0.08)]",
  surface: "border-[rgba(21,21,21,0.08)]",
  soft: "border-[rgba(21,21,21,0.08)]",
  dark: "border-[rgba(21,21,21,0.14)]"
};

/**
 * One-time settle. `step` staggers related blocks by a fixed CSS delay
 * rather than a per-element inline style, so the wrapper stays a plain
 * shared component and nothing about `InView` itself has to change.
 */
export function Rise({
  children,
  className = "",
  step = 0
}: {
  children: ReactNode;
  className?: string;
  step?: 0 | 1 | 2 | 3;
}) {
  const stepClass = step > 0 ? ` about-rise--s${step}` : "";
  return (
    <InView className={`about-rise${stepClass} ${className}`.trim()}>
      {children}
    </InView>
  );
}

type SectionProps = {
  id?: string;
  headingId?: string;
  eyebrow: string;
  heading: string;
  tone?: AboutTone;
  wide?: boolean;
  children: ReactNode;
};

export function AboutSection({
  id,
  headingId,
  eyebrow,
  heading,
  tone = "surface",
  wide = false,
  children
}: SectionProps) {
  const dark = tone === "dark";

  return (
    <section
      className={`${wide ? "about-section--wide" : "about-section"} border-t ${aboutToneBorder[tone]} ${aboutToneClass[tone]}`}
      id={id}
    >
      <div className="site-shell">
        <Rise>
          <p className="eyebrow">{eyebrow}</p>
          <h2
            className={`about-h2 font-display mt-5 ${dark ? "text-white" : "text-ink"}`}
            id={headingId}
          >
            {heading}
          </h2>
        </Rise>
        <div className="mt-9 sm:mt-11">{children}</div>
      </div>
    </section>
  );
}

/**
 * Hairline list. The marker is a rule, not an icon — it belongs to the
 * same fine-line vocabulary as the column dividers.
 */
export function HairlineList({
  items,
  split = false,
  muted = false,
  dark = false
}: {
  items: string[];
  split?: boolean;
  muted?: boolean;
  dark?: boolean;
}) {
  return (
    <ul className={`about-list${split ? " about-list--split" : ""}`}>
      {items.map((item) => (
        <li className="about-item" key={item}>
          <span
            aria-hidden="true"
            className={`about-item__mark${muted ? " about-item__mark--muted" : ""}`}
          />
          <span className={dark ? "text-white/74" : "text-muted"}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Numbered rows used for the working principles. */
export function NumberedRows({
  items,
  dark = false
}: {
  items: string[];
  dark?: boolean;
}) {
  return (
    <ul className="about-list about-list--split">
      {items.map((item, index) => (
        <li className="about-item" key={item}>
          <span className="font-mono text-[0.68rem] font-bold leading-6 text-orange">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span
            className={`font-semibold leading-6 ${dark ? "text-white/82" : "text-ink"}`}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}
