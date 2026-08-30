import Link from "next/link";
import { AnimatedMarkHero } from "../hero-mark/AnimatedMarkHero";

export function HomeHero() {
  return (
    <AnimatedMarkHero headingId="hero-title" locale="en">
      <h1
        className="mark-hero__title font-display"
        id="hero-title"
      >
        Practical ESG consulting for manufacturing companies — done faster.
      </h1>

      <div className="mark-hero__body mt-6 space-y-4">
        <p>
          Customer questionnaires, emissions data, evidence, policies and
          sustainability reporting — prepared from the information your company
          already has.
        </p>
        <p className="mark-hero__body-secondary">
          Evipace takes care of the practical ESG work so your team can respond
          clearly, consistently and without turning every request into a new
          internal project.
        </p>
      </div>

      <div className="mark-hero__actions mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Link
          className="inline-flex min-h-12 w-full max-w-full items-center justify-center rounded-lg border border-orange bg-orange px-5 py-3 text-center text-sm font-bold text-white sm:w-auto"
          href="/en/send-request"
        >
          Send your ESG request
        </Link>
        <a
          className="inline-flex min-h-12 w-full max-w-full items-center justify-center rounded-lg border border-[rgba(21,21,21,0.2)] bg-transparent px-5 py-3 text-center text-sm font-bold text-ink sm:w-auto"
          href="#services"
        >
          See what we handle
        </a>
      </div>

      <p className="mark-hero__trust mt-7">
        Customer requests · ESG questionnaires · Scope 1 &amp; 2 · Reporting ·
        Evidence
      </p>
    </AnimatedMarkHero>
  );
}
