import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ButtonLink } from "../ButtonLink";
import { SourceNote } from "../trust/SourceNote";
import type { CommercialServicePageContent } from "./content";

const SEND_REQUEST_HREF = "/en/send-request";

function Breadcrumb({ current }: { current: string }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[rgba(21,21,21,0.52)]"
    >
      <Link className="transition hover:text-orange" href="/en">
        Home
      </Link>
      <span aria-hidden="true">/</span>
      <span aria-current="page" className="text-ink">
        {current}
      </span>
    </nav>
  );
}

function InlineLink({
  children,
  href
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <Link
      className="group inline-flex min-h-11 items-center gap-2 text-sm font-bold text-ink underline decoration-orange/35 underline-offset-4 transition hover:text-orange"
      href={href}
    >
      <span>{children}</span>
      <ArrowRight
        aria-hidden="true"
        className="h-4 w-4 shrink-0 text-orange transition-transform group-hover:translate-x-1"
      />
    </Link>
  );
}

function SectionHeading({
  eyebrow,
  id,
  intro,
  title
}: {
  eyebrow?: string;
  id: string;
  intro?: string;
  title: string;
}) {
  return (
    <div className="max-w-4xl">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2
        className="font-display mt-5 scroll-mt-28 max-w-[18ch] text-[clamp(2.35rem,4.8vw,4.75rem)] leading-[1]"
        id={id}
      >
        {title}
      </h2>
      {intro ? (
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">{intro}</p>
      ) : null}
    </div>
  );
}

function Hero({ content }: { content: CommercialServicePageContent }) {
  return (
    <header
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pb-18 pt-28 sm:pb-22 sm:pt-32 lg:pb-24"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 overflow-hidden bg-[var(--paper)]"
      >
        <div className="absolute bottom-0 left-[58%] top-0 hidden w-px bg-gradient-to-b from-transparent via-orange/20 to-transparent lg:block" />
        <div className="absolute -right-48 top-16 h-[36rem] w-[36rem] rounded-full border border-orange/15" />
      </div>

      <div className="site-shell">
        <Breadcrumb current={content.eyebrow} />
        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.58fr)] lg:items-end lg:gap-16">
          <div className="min-w-0">
            <p className="eyebrow">{content.eyebrow}</p>
            <h1
              className="font-display mt-7 max-w-[13.5ch] break-words text-[clamp(3rem,6.4vw,6.4rem)] leading-[0.92]"
              id="hero-title"
            >
              {content.title}
            </h1>
            <div className="mt-8 max-w-3xl space-y-4 text-[clamp(1.06rem,1.45vw,1.28rem)] leading-[1.7] text-muted">
              {content.intro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink
                className="w-full max-w-full text-center sm:w-auto"
                href={SEND_REQUEST_HREF}
              >
                {content.primaryCta}
              </ButtonLink>
              <ButtonLink
                className="w-full max-w-full text-center sm:w-auto"
                href={content.secondaryCta.href}
                variant="secondary"
              >
                {content.secondaryCta.label}
              </ButtonLink>
            </div>
            <p className="mt-7 max-w-2xl border-l-2 border-orange pl-5 text-sm font-semibold leading-7 text-ink">
              {content.qualifier}
            </p>
          </div>

          <aside className="rounded-[1.15rem] border border-[rgba(21,21,21,0.12)] bg-white p-6 shadow-lift sm:p-7">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-orange">
              {content.heroVisual.label}
            </p>
            <ol className="mt-6 grid gap-3">
              {content.heroVisual.items.map((item, index) => (
                <li
                  className="flex items-center gap-3 border-t border-[rgba(21,21,21,0.11)] pt-3"
                  key={item}
                >
                  <span className="font-mono text-xs font-bold text-orange">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-bold text-ink">{item}</span>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </div>
    </header>
  );
}

/**
 * Direct answers to the definitional questions a first-time reader arrives
 * with, placed immediately under the hero. Kept visually quiet on purpose:
 * this is reference material, not a second pitch, and the commercial
 * argument continues in the sections below it.
 */
function DirectAnswers({
  content
}: {
  content: CommercialServicePageContent;
}) {
  if (!content.directAnswers) return null;

  const { eyebrow, items, sources } = content.directAnswers;

  return (
    <section
      aria-labelledby="direct-answers-title"
      className="border-y border-[rgba(21,21,21,0.09)] bg-white py-14 sm:py-16"
      id="what-it-is"
    >
      <div className="site-shell">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="sr-only" id="direct-answers-title">
          {eyebrow}
        </h2>
        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-14">
          {items.map((item) => (
            <div className="max-w-2xl" key={item.question}>
              <h3 className="font-display text-[clamp(1.65rem,2.6vw,2.3rem)] leading-tight text-ink">
                {item.question}
              </h3>
              <div className="mt-5 space-y-4 text-base leading-8 text-muted">
                {item.answer.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
        {sources ? <SourceNote sources={sources} /> : null}
      </div>
    </section>
  );
}

function FaqSection({ content }: { content: CommercialServicePageContent }) {
  if (!content.faq?.length) return null;

  return (
    <section
      aria-labelledby="faq-title"
      className="section-padding bg-white"
      id="faq"
    >
      <div className="site-shell max-w-5xl">
        <p className="eyebrow">FAQ</p>
        <h2
          className="font-display mt-5 text-[clamp(2.35rem,4.8vw,4.5rem)] leading-none"
          id="faq-title"
        >
          Frequently asked questions
        </h2>
        <div className="mt-10 grid gap-3">
          {content.faq.map((item) => (
            <details
              className="group rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-[var(--paper)] px-5 py-5 sm:px-6"
              key={item.question}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold leading-6 text-ink marker:content-none">
                {item.question}
                <span
                  aria-hidden="true"
                  className="text-2xl font-light text-orange transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-muted">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function FitSection({ content }: { content: CommercialServicePageContent }) {
  return (
    <section className="section-padding bg-white" aria-labelledby="fit-title">
      <div className="site-shell">
        <SectionHeading
          eyebrow={content.fit.eyebrow}
          id="fit-title"
          intro={content.fit.intro}
          title={content.fit.title}
        />
        <div className="mt-12 grid gap-px overflow-hidden border border-[rgba(21,21,21,0.11)] bg-[rgba(21,21,21,0.11)] md:grid-cols-2 xl:grid-cols-3">
          {content.fit.items.map((item) => {
            const Icon = item.icon;
            return (
              <article className="bg-[var(--paper)] p-6 sm:p-7" key={item.title}>
                <Icon aria-hidden="true" className="h-7 w-7 text-orange" />
                <h3 className="font-display mt-7 text-2xl leading-tight text-ink">
                  {item.title}
                </h3>
                {item.quote ? (
                  <p className="mt-4 border-l-2 border-orange pl-4 text-sm font-bold leading-6 text-ink">
                    {item.quote}
                  </p>
                ) : null}
                <p className="mt-4 text-sm leading-7 text-muted">{item.body}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ServiceSection({
  content
}: {
  content: CommercialServicePageContent;
}) {
  return (
    <section
      className="section-padding bg-ink text-white"
      aria-labelledby="service-title"
      id="service"
    >
      <div className="site-shell">
        <div className="grid gap-10 lg:grid-cols-[0.62fr_1.38fr] lg:gap-16">
          <SectionHeading
            eyebrow={content.service.eyebrow}
            id="service-title"
            intro={content.service.intro}
            title={content.service.title}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {content.service.items.map((item) => {
              const Icon = item.icon;
              return (
                <article
                  className="rounded-lg border border-white/12 bg-white/[0.04] p-5"
                  key={item.title}
                >
                  <Icon aria-hidden="true" className="h-6 w-6 text-orange" />
                  <h3 className="mt-5 text-lg font-bold leading-tight text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/66">
                    {item.body}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function InputsSection({ content }: { content: CommercialServicePageContent }) {
  return (
    <section className="section-padding bg-[var(--paper)]" aria-labelledby="inputs-title">
      <div className="site-shell grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
        <div>
          <h2
            className="font-display max-w-[14ch] text-[clamp(2.4rem,4.8vw,4.5rem)] leading-none"
            id="inputs-title"
          >
            {content.inputs.title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted">{content.inputs.body}</p>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {content.inputs.items.map((item) => (
            <li
              className="flex min-w-0 items-start gap-3 rounded-lg border border-[rgba(21,21,21,0.1)] bg-white p-4 text-sm font-semibold leading-6 text-ink"
              key={item}
            >
              <CheckCircle2
                aria-hidden="true"
                className="mt-0.5 h-4 w-4 shrink-0 text-orange"
              />
              <span className="min-w-0 break-words">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ProcessSection({
  content
}: {
  content: CommercialServicePageContent;
}) {
  return (
    <section
      className="section-padding bg-white"
      aria-labelledby="process-title"
      id="process"
    >
      <div className="site-shell">
        <SectionHeading
          id="process-title"
          intro={content.process.intro}
          title={content.process.title}
        />
        <ol className="mt-12 grid gap-px overflow-hidden border border-[rgba(21,21,21,0.11)] bg-[rgba(21,21,21,0.11)] md:grid-cols-2 lg:grid-cols-3">
          {content.process.steps.map((step, index) => (
            <li className="bg-white p-6 sm:p-7" key={step.title}>
              <span className="font-mono text-xs font-bold tracking-[0.14em] text-orange">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display mt-5 text-2xl leading-tight text-ink">
                {step.title}
              </h3>
              <p className="mt-4 text-sm leading-7 text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function ModelSection({ content }: { content: CommercialServicePageContent }) {
  if (!content.model) return null;

  return (
    <section className="section-padding bg-[var(--paper)]" aria-labelledby="model-title">
      <div className="site-shell">
        <SectionHeading
          id="model-title"
          intro={content.model.body}
          title={content.model.title}
        />
        <ol className="mt-12 grid gap-4 lg:grid-cols-5">
          {content.model.items.map((item, index) => (
            <li
              className="relative rounded-lg border border-[rgba(21,21,21,0.1)] bg-white p-5"
              key={item.title}
            >
              {index < content.model!.items.length - 1 ? (
                <ArrowRight
                  aria-hidden="true"
                  className="absolute -right-3 top-7 hidden h-5 w-5 text-orange lg:block"
                />
              ) : null}
              <span className="font-mono text-xs font-bold text-orange">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-base font-bold leading-tight text-ink">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted">{item.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function DeliverablesSection({
  content
}: {
  content: CommercialServicePageContent;
}) {
  return (
    <section className="section-padding bg-white" aria-labelledby="deliverables-title">
      <div className="site-shell grid gap-10 lg:grid-cols-[0.64fr_1.36fr] lg:gap-16">
        <div>
          <h2
            className="font-display max-w-[14ch] text-[clamp(2.4rem,4.8vw,4.5rem)] leading-none"
            id="deliverables-title"
          >
            {content.deliverables.title}
          </h2>
          <p className="mt-6 text-base font-semibold leading-7 text-muted">
            {content.deliverables.qualifier}
          </p>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {content.deliverables.items.map((item) => (
            <li
              className="rounded-lg border border-[rgba(21,21,21,0.1)] bg-[var(--paper)] px-4 py-3 text-sm font-semibold leading-6 text-ink"
              key={item}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function TrustSection({ content }: { content: CommercialServicePageContent }) {
  return (
    <section className="section-padding bg-ink text-white" aria-labelledby="trust-title">
      <div className="site-shell">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <div>
            <p className="eyebrow">{content.trust.eyebrow}</p>
            <h2
              className="font-display mt-5 max-w-[15ch] text-[clamp(2.4rem,5vw,5rem)] leading-none text-white"
              id="trust-title"
            >
              {content.trust.title}
            </h2>
            <div className="mt-7 space-y-4 text-base leading-8 text-white/68">
              {content.trust.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {content.trust.items.map((item) => (
              <article
                className="rounded-lg border border-white/12 bg-white/[0.04] p-5"
                key={item.label}
              >
                <h3 className="text-base font-bold text-white">{item.label}</h3>
                <p className="mt-3 text-sm leading-7 text-white/66">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ResourcesSection({
  content
}: {
  content: CommercialServicePageContent;
}) {
  return (
    <section className="section-padding bg-[var(--paper)]" aria-labelledby="resources-title">
      <div className="site-shell">
        <SectionHeading
          id="resources-title"
          intro={content.resources.body}
          title={content.resources.title}
        />
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {content.resources.links.map((link) => (
            <Link
              className="group rounded-lg border border-[rgba(21,21,21,0.11)] bg-white p-5 transition hover:-translate-y-0.5 hover:border-orange/60"
              href={link.href}
              key={link.href}
            >
              <h3 className="text-base font-bold leading-tight text-ink group-hover:text-orange">
                {link.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted">{link.body}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-orange">
                Open resource
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function RelatedServicesSection({
  content
}: {
  content: CommercialServicePageContent;
}) {
  if (!content.relatedServices) return null;

  const { title, body, links } = content.relatedServices;

  return (
    <section
      aria-labelledby="related-services-title"
      className="section-padding border-t border-[rgba(21,21,21,0.09)] bg-[var(--warm)]"
    >
      <div className="site-shell">
        <div className="max-w-3xl">
          <h2
            className="font-display text-[clamp(2rem,3.8vw,3.2rem)] leading-tight"
            id="related-services-title"
          >
            {title}
          </h2>
          <p className="mt-5 text-lg leading-8 text-muted">{body}</p>
        </div>
        <div className="mt-9 grid gap-4 md:grid-cols-2">
          {links.map((link) => (
            <Link
              className="group rounded-lg border border-[rgba(21,21,21,0.12)] bg-white p-5 transition hover:-translate-y-0.5 hover:border-orange/60"
              href={link.href}
              key={link.href}
            >
              <h3 className="text-base font-bold leading-tight text-ink group-hover:text-orange">
                {link.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-muted">{link.body}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCta({ content }: { content: CommercialServicePageContent }) {
  return (
    <section className="bg-orange py-16 text-white sm:py-20">
      <div className="site-shell grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end lg:gap-16">
        <h2 className="font-display max-w-[13ch] text-[clamp(2.7rem,5.6vw,5.4rem)] leading-none">
          {content.finalCta.title}
        </h2>
        <div>
          <p className="max-w-3xl text-lg leading-8 text-white/86">
            {content.finalCta.body}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink
              className="w-full sm:w-auto"
              href={SEND_REQUEST_HREF}
              variant="light"
            >
              {content.finalCta.primaryLabel}
            </ButtonLink>
            <InlineLink href={content.finalCta.secondaryHref}>
              {content.finalCta.secondaryLabel}
            </InlineLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export function EnglishCommercialServicePage({
  content
}: {
  content: CommercialServicePageContent;
}) {
  return (
    <main id="top">
      <Hero content={content} />
      <DirectAnswers content={content} />
      <FitSection content={content} />
      <ServiceSection content={content} />
      <InputsSection content={content} />
      <ProcessSection content={content} />
      <ModelSection content={content} />
      <DeliverablesSection content={content} />
      <TrustSection content={content} />
      <ResourcesSection content={content} />
      <RelatedServicesSection content={content} />
      <FaqSection content={content} />
      <FinalCta content={content} />
    </main>
  );
}
