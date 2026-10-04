import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  /** Rich so a heading can put its second sentence on a line of its own. */
  heading: ReactNode;
  className?: string;
  dark?: boolean;
};

export function SectionHeading({
  eyebrow,
  heading,
  className = "",
  dark = false
}: SectionHeadingProps) {
  return (
    <div className={className}>
      <p className="eyebrow">{eyebrow}</p>
      <h2
        className={`type-heading font-display mt-6 ${dark ? "text-white" : "text-ink"}`}
      >
        {heading}
      </h2>
    </div>
  );
}
