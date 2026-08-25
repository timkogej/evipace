import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { qualityPrinciples } from "./content";
import { SectionHeading } from "./SectionHeading";

export function QualityPrinciples() {
  return (
    <section className="section-padding bg-[var(--warm)]" id="quality">
      <div className="site-shell">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <SectionHeading
              eyebrow="Evidence before claims"
              heading="If we cannot trace it, we should not overstate it."
            />
          </div>
          <div className="max-w-2xl lg:justify-self-end">
            <p className="text-lg leading-8 text-muted">
              Our working principles keep the source, the calculation and the
              company’s own responsibility visible throughout the work.
            </p>
            <Link
              className="orange-link mt-6 inline-flex items-center gap-2 text-sm"
              href="/en/methodology"
            >
              <span>Read our methodology</span>
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-12 grid gap-px overflow-hidden border border-[rgba(21,21,21,0.11)] bg-[rgba(21,21,21,0.11)] md:grid-cols-2">
          {qualityPrinciples.map((principle, index) => (
            <article
              className={`grid gap-5 bg-white p-6 sm:grid-cols-[4rem_1fr] sm:p-8 ${index === 0 || index === 5 ? "md:bg-[var(--soft-orange)]" : ""}`}
              key={principle.title}
            >
              <span className="font-mono text-sm font-bold text-orange">
                {principle.number}
              </span>
              <div>
                <h3 className="text-xl font-bold text-ink">
                  {principle.title}
                </h3>
                <p className="mt-3 leading-7 text-muted">{principle.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
