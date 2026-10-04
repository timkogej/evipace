import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ButtonLink } from "../ButtonLink";
import { SourceNote } from "../trust/SourceNote";
import { ServiceRequestCta } from "../service-landing/ServiceRequestCta";
import { ServiceDetailAccordion } from "../service-landing/ServiceDetailAccordion";
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
  title,
  dark = false
}: {
  eyebrow?: string;
  id: string;
  intro?: string;
  title: string;
  dark?: boolean;
}) {
  return (
    <div className="max-w-4xl">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2
        className="type-heading font-display mt-5 scroll-mt-28 max-w-[24ch]"
        id={id}
      >
        {title}
      </h2>
      {intro ? (
        <p className={`mt-6 max-w-3xl text-lg leading-8 ${dark ? "text-white/75" : "text-muted"}`}>
          {intro}
        </p>
      ) : null}
    </div>
  );
}

function Hero({ content }: { content: CommercialServicePageContent }) {
  const featured = content.streamlinedService;
  return (
    <header
      aria-labelledby="hero-title"
      className={`relative isolate overflow-hidden pt-28 sm:pt-32 ${featured ? "pb-14 sm:pb-18" : "pb-18 sm:pb-22 lg:pb-24"}`}
    >
      <div
        aria-hidden="true"
        className={`absolute inset-0 -z-10 overflow-hidden ${featured ? "bg-white" : "bg-[var(--paper)]"}`}
      >
        {!featured ? <div className="absolute bottom-0 left-[58%] top-0 hidden w-px bg-gradient-to-b from-transparent via-orange/20 to-transparent lg:block" /> : null}
        {!featured ? <div className="absolute -right-48 top-16 h-[36rem] w-[36rem] rounded-full border border-orange/15" /> : null}
      </div>

      <div className="site-shell">
        <Breadcrumb current={content.eyebrow} />
        <div className={`grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.58fr)] lg:gap-16 ${featured ? "mt-9 lg:items-center" : "mt-12 lg:items-end"}`}>
          <div className="min-w-0">
            <p className="eyebrow">{content.eyebrow}</p>
            <h1
              className="type-title font-display mt-7 max-w-[20ch] break-words"
              id="hero-title"
            >
              {content.title}
            </h1>
            <div className={`type-lead max-w-3xl space-y-4 text-muted ${featured ? "mt-6" : "mt-8"}`}>
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

          <aside className={`p-6 sm:p-7 ${featured ? "border border-[rgba(21,21,21,0.1)] bg-[#f8f8f6]" : "rounded-[1.15rem] border border-[rgba(21,21,21,0.12)] bg-white shadow-lift"}`}>
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
              <h3 className="type-subheading font-display text-ink">
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
          className="type-heading font-display mt-5"
          id="faq-title"
        >
          Frequently asked questions
        </h2>
        <div className="faq-list">
          {content.faq.map((item) => (
            <details
              className="faq-item group"
              key={item.question}
            >
              <summary className="faq-question">
                {item.question}
                <span aria-hidden="true" className="faq-toggle" />
              </summary>
              <p className="faq-answer">
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
        <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {content.fit.items.map((item) => {
            const Icon = item.icon;
            return (
              <article className="border border-[rgba(21,21,21,0.11)] bg-[var(--paper)] p-6 sm:p-7" key={item.title}>
                <Icon aria-hidden="true" className="h-7 w-7 text-orange" />
                <h3 className="type-subheading font-display mt-7 text-ink">
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
        <SectionHeading
          eyebrow={content.service.eyebrow}
          id="service-title"
          intro={content.service.intro}
          title={content.service.title}
          dark
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
    </section>
  );
}

function InputsSection({ content }: { content: CommercialServicePageContent }) {
  return (
    <section className="section-padding bg-[var(--paper)]" aria-labelledby="inputs-title">
      <div className="site-shell grid gap-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
        <div>
          <h2
            className="type-heading font-display max-w-[24ch]"
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
        <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {content.process.steps.map((step, index) => (
            <li className="border border-[rgba(21,21,21,0.11)] bg-white p-6 sm:p-7" key={step.title}>
              <span className="font-mono text-xs font-bold tracking-[0.14em] text-orange">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="type-subheading font-display mt-5 text-ink">
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
            className="type-heading font-display max-w-[24ch]"
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
              className="type-heading font-display mt-5 max-w-[24ch] text-white"
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
            className="type-heading font-display"
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
  if (content.streamlinedService) {
    return (
      <ServiceRequestCta
        eyebrow="Next step"
        title={content.finalCta.title}
        body={content.finalCta.body}
        button={content.finalCta.primaryLabel}
        href={SEND_REQUEST_HREF}
      />
    );
  }

  return (
    <section className="bg-orange py-16 text-white sm:py-20">
      <div className="site-shell grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-end lg:gap-16">
        <h2 className="type-heading font-display max-w-[24ch]">
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
      {content.streamlinedService ? <DeliverablesSection content={content} /> : <FitSection content={content} />}
      {content.streamlinedService ? <ProcessSection content={content} /> : null}
      <ServiceSection content={content} />
      {content.streamlinedService ? (
        <ServiceDetailAccordion label={content.detailsLabel ?? "When this service fits and what you can send"}>
          <FitSection content={content} />
          <InputsSection content={content} />
        </ServiceDetailAccordion>
      ) : (
        <><InputsSection content={content} /><ProcessSection content={content} /></>
      )}
      <ModelSection content={content} />
      {!content.streamlinedService ? <DeliverablesSection content={content} /> : null}
      <TrustSection content={content} />
      <ResourcesSection content={content} />
      <RelatedServicesSection content={content} />
      <FaqSection content={content} />
      <FinalCta content={content} />
    </main>
  );
}
