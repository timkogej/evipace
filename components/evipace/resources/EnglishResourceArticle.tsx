import type { ReactNode } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  FileCheck2,
  Link2,
  ShieldCheck
} from "lucide-react";
import { ButtonLink } from "../ButtonLink";

export type EnglishArticleSection = {
  id: string;
  number: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  principle?: {
    label?: string;
    text: string;
  };
  cards?: Array<{
    title: string;
    body: string;
  }>;
  links?: Array<{
    label: string;
    href: string;
  }>;
};

export type EnglishResourceArticleContent = {
  eyebrow: string;
  title: string;
  deck: string;
  methodNote?: string;
  quickAnswerTitle?: string;
  summary: string[];
  quickChecks: Array<{
    title: string;
    body: string;
  }>;
  nav: Array<{
    number: string;
    label: string;
    href: string;
  }>;
  sections: EnglishArticleSection[];
  cta: {
    eyebrow: string;
    title: string;
    body: string;
    primaryLabel: string;
    primaryHref: string;
    secondaryLabel?: string;
    secondaryHref?: string;
  };
  faq: Array<{
    question: string;
    answer: string;
  }>;
  sources?: Array<{
    label: string;
    href: string;
  }>;
};

function ExternalSourceLink({
  href,
  children
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      className="inline-flex items-center gap-1.5 font-semibold text-ink underline decoration-[rgba(254,112,1,0.45)] underline-offset-4 transition hover:text-orange"
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      {children}
      <ExternalLink aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
    </a>
  );
}

function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link className="orange-link inline-flex items-center gap-2 text-sm" href={href}>
      {children}
      <ArrowRight aria-hidden="true" className="h-4 w-4" />
    </Link>
  );
}

function Principle({
  label,
  children
}: {
  label?: string;
  children: ReactNode;
}) {
  return (
    <div className="my-8 rounded-[1.1rem] bg-ink p-7 text-white sm:p-8">
      {label ? (
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-orange">
          {label}
        </p>
      ) : null}
      <p
        className={`font-display text-[clamp(1.8rem,4vw,3.1rem)] leading-[1.1] ${
          label ? "mt-4" : ""
        }`}
      >
        {children}
      </p>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-6 grid gap-3">
      {items.map((item) => (
        <li className="flex gap-3 leading-7 text-muted" key={item}>
          <span
            aria-hidden="true"
            className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-orange"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ArticleSection({ section }: { section: EnglishArticleSection }) {
  return (
    <section
      aria-labelledby={`${section.id}-title`}
      className="scroll-mt-28 border-t border-[rgba(21,21,21,0.12)] py-14 sm:py-16"
      id={section.id}
    >
      <div className="flex items-start gap-4 sm:gap-6">
        <span className="mt-1 font-mono text-xs font-bold tracking-[0.15em] text-orange">
          {section.number}
        </span>
        <h2
          className="font-display max-w-[20ch] text-[clamp(2.15rem,4.1vw,3.7rem)] leading-[1.02]"
          id={`${section.id}-title`}
        >
          {section.title}
        </h2>
      </div>
      <div className="resource-prose mt-8 sm:pl-[3.35rem]">
        {section.paragraphs?.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        {section.bullets ? <BulletList items={section.bullets} /> : null}
        {section.principle ? (
          <Principle label={section.principle.label}>
            {section.principle.text}
          </Principle>
        ) : null}
        {section.cards ? (
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {section.cards.map((card) => (
              <section
                className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-6"
                key={card.title}
              >
                <h3 className="font-display text-2xl leading-tight text-ink">
                  {card.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-muted">{card.body}</p>
              </section>
            ))}
          </div>
        ) : null}
        {section.links ? (
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            {section.links.map((link) => (
              <InlineLink href={link.href} key={link.href}>
                {link.label}
              </InlineLink>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function EnglishResourceArticle({
  content
}: {
  content: EnglishResourceArticleContent;
}) {
  return (
    <main id="top">
      <article>
        <header className="relative isolate overflow-hidden pb-18 pt-28 sm:pb-22 sm:pt-32 lg:pb-24 lg:pt-36">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 overflow-hidden"
          >
            <div className="absolute -right-36 top-16 h-[32rem] w-[32rem] rounded-full border border-orange/15" />
            <div className="absolute bottom-0 left-[56%] top-0 w-px bg-gradient-to-b from-transparent via-orange/15 to-transparent" />
          </div>
          <div className="site-shell">
            <nav
              aria-label="Breadcrumb"
              className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[rgba(21,21,21,0.52)]"
            >
              <Link className="transition hover:text-orange" href="/en">
                Home
              </Link>
              <span aria-hidden="true">/</span>
              <Link className="transition hover:text-orange" href="/en/resources">
                Resources
              </Link>
              <span aria-hidden="true">/</span>
              <span aria-current="page" className="text-ink">
                {content.title}
              </span>
            </nav>

            <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.52fr)] lg:items-end lg:gap-20">
              <div>
                <p className="eyebrow">{content.eyebrow}</p>
                <h1
                  className="font-display mt-7 max-w-[16ch] text-[clamp(3.15rem,7vw,6.55rem)] leading-[0.91]"
                  id="article-title"
                >
                  {content.title}
                </h1>
                <p className="font-display mt-8 max-w-3xl text-[clamp(1.55rem,2.8vw,2.65rem)] leading-tight text-ink">
                  {content.deck}
                </p>
              </div>

              <aside className="border-l-2 border-orange pl-6 lg:mb-2 lg:pl-8">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-orange">
                  evipace method
                </p>
                <p className="mt-4 text-sm font-semibold leading-7 text-muted">
                  {content.methodNote ??
                    "Customer request - scope - data owner - source - evidence - internal review."}
                </p>
                <div className="mt-5">
                  <InlineLink href="/en/methodology">See methodology</InlineLink>
                </div>
              </aside>
            </div>
          </div>
        </header>

        <section
          aria-labelledby="quick-answer-title"
          className="scroll-mt-24 bg-ink py-20 text-white sm:py-24"
          id="quick-answer"
        >
          <div className="site-shell grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <div>
              <p className="eyebrow text-orange">Quick answer</p>
              <h2
                className="font-display mt-6 max-w-[13ch] text-[clamp(2.65rem,5vw,4.8rem)] leading-[0.98]"
                id="quick-answer-title"
              >
                {content.quickAnswerTitle ??
                  "Start with the request, not the spreadsheet."}
              </h2>
              <div className="mt-7 space-y-4 text-base leading-8 text-white/68">
                {content.summary.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {content.quickChecks.map((check, index) => (
                <section
                  className="rounded-[1rem] border border-white/14 bg-white/[0.045] p-5 sm:p-6"
                  key={check.title}
                >
                  <span className="font-mono text-xs font-bold text-orange">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 font-display text-2xl leading-tight">
                    {check.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/62">
                    {check.body}
                  </p>
                </section>
              ))}
            </div>
          </div>
        </section>

        <div className="site-shell">
          <div className="grid gap-14 lg:grid-cols-[minmax(12rem,0.28fr)_minmax(0,0.72fr)]">
            <aside className="hidden py-16 lg:block">
              <div className="sticky top-28">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-orange">
                  On this page
                </p>
                <ol className="mt-5 grid gap-3 text-sm font-semibold text-muted">
                  {content.nav.map(({ number, label, href }) => (
                    <li key={href}>
                      <a
                        className="group flex gap-3 transition hover:text-ink"
                        href={href}
                      >
                        <span className="font-mono text-[0.65rem] text-orange">
                          {number}
                        </span>
                        <span>{label}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>

            <div>
              {content.sections.map((section) => (
                <ArticleSection key={section.id} section={section} />
              ))}

              <section
                aria-labelledby="article-cta-title"
                className="my-12 overflow-hidden rounded-[1.3rem] bg-ink p-7 text-white shadow-premium sm:p-10 lg:p-12"
              >
                <Link2 aria-hidden="true" className="h-10 w-10 text-orange" />
                <p className="eyebrow mt-7 text-orange">{content.cta.eyebrow}</p>
                <h2
                  className="font-display mt-5 max-w-[15ch] text-[clamp(2.45rem,5vw,4.4rem)] leading-[0.98]"
                  id="article-cta-title"
                >
                  {content.cta.title}
                </h2>
                <p className="mt-6 max-w-3xl text-base leading-8 text-white/68">
                  {content.cta.body}
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <ButtonLink
                    className="w-full sm:w-auto"
                    href={content.cta.primaryHref}
                  >
                    {content.cta.primaryLabel}
                  </ButtonLink>
                  {content.cta.secondaryHref && content.cta.secondaryLabel ? (
                    <ButtonLink
                      className="w-full sm:w-auto"
                      href={content.cta.secondaryHref}
                      variant="light"
                    >
                      {content.cta.secondaryLabel}
                    </ButtonLink>
                  ) : null}
                </div>
              </section>

              <section
                aria-labelledby="faq-title"
                className="scroll-mt-24 border-t border-[rgba(21,21,21,0.12)] py-16"
                id="faq"
              >
                <p className="eyebrow">FAQ</p>
                <h2
                  className="font-display mt-6 text-[clamp(2.5rem,5vw,4.5rem)] leading-none"
                  id="faq-title"
                >
                  Frequently asked questions
                </h2>
                <div className="mt-8 grid gap-4">
                  {content.faq.map((faq) => (
                    <details
                      className="group rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white px-5 py-5 sm:px-6"
                      key={faq.question}
                    >
                      <summary className="cursor-pointer text-base font-bold text-ink">
                        {faq.question}
                      </summary>
                      <p className="mt-4 max-w-3xl text-sm leading-7 text-muted">
                        {faq.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </section>

              {content.sources ? (
                <section
                  aria-labelledby="sources-title"
                  className="border-t border-[rgba(21,21,21,0.12)] pb-16 pt-12"
                >
                  <div className="rounded-[1rem] bg-[var(--paper)] p-6 sm:p-7">
                    <FileCheck2
                      aria-hidden="true"
                      className="h-7 w-7 text-orange"
                    />
                    <h2
                      className="mt-5 text-sm font-bold uppercase tracking-[0.12em] text-ink"
                      id="sources-title"
                    >
                      Sources and further reading
                    </h2>
                    <ul className="mt-4 grid gap-3 text-sm leading-7 text-muted">
                      {content.sources.map((source) => (
                        <li key={source.href}>
                          <ExternalSourceLink href={source.href}>
                            {source.label}
                          </ExternalSourceLink>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              ) : null}
            </div>
          </div>
        </div>
      </article>

      <section className="bg-orange py-16 text-white sm:py-20 lg:py-24">
        <div className="site-shell grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-4xl">
            <ShieldCheck aria-hidden="true" className="h-10 w-10 text-ink" />
            <h2 className="font-display mt-6 text-[clamp(3rem,6vw,6rem)] leading-[0.92]">
              Already have the customer request?
            </h2>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-white/85">
              Send the questionnaire, customer email, spreadsheet or portal
              export. We can map what is being asked, identify the internal
              sources and prepare a response for your review.
            </p>
          </div>
          <div className="lg:text-right">
            <ButtonLink href="/en/send-request" variant="dark">
              Send the request
            </ButtonLink>
            <p className="mt-4 text-xs font-bold text-ink/68">
              Questionnaire - Excel - PDF - portal - customer email
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
