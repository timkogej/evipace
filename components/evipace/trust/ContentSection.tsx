import type { ReactNode } from "react";
import { Reveal } from "../Reveal";

type ContentSectionProps = {
  heading: string;
  children: ReactNode;
  delay?: number;
};

/**
 * Reusable editorial prose section for trust-infrastructure pages. Short
 * heading + a small amount of body content, generous whitespace — designed
 * to read like part of the premium brand, not a dense legal document.
 */
export function ContentSection({
  heading,
  children,
  delay = 0
}: ContentSectionProps) {
  return (
    <section className="section-padding py-8 sm:py-10">
      <div className="site-shell">
        <Reveal className="max-w-3xl" delay={delay}>
          <h2 className="text-2xl font-bold text-ink sm:text-3xl">
            {heading}
          </h2>
          <div className="mt-5 space-y-4 text-lg leading-8 text-muted">
            {children}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
