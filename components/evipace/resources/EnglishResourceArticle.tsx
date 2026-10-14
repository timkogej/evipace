import { SourceNote } from "../trust/SourceNote";
import type { PrimarySource } from "@/lib/seo/primary-sources";
import Link from "next/link";
import h from "../HomeLandingPage.module.css";
import { ClosingCta } from "../home/ClosingCta";
import { RevealOnView } from "../home/RevealOnView";
import { Faq, Head } from "../service-landing/Blocks";
import r from "./Resource.module.css";
import {
  PillLink,
  ResourceBand,
  ResourceHero,
  ResourceMain,
  TextLink
} from "./ResourceParts";

export type EnglishArticleSection = {
  sources?: readonly PrimarySource[];
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
  matrix?: {
    caption: string;
    columns: string[];
    rows: string[][];
  };
  links?: Array<{
    label: string;
    href: string;
  }>;
  download?: {
    label: string;
    href: string;
  };
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

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className={r.bullets}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function ArticleSection({ section }: { section: EnglishArticleSection }) {
  return (
    <section
      aria-labelledby={`${section.id}-title`}
      className={r.articleSection}
      id={section.id}
    >
      <header className={r.articleHead}>
        <span aria-hidden="true" className={r.articleNumber}>{section.number}</span>
        <h2 id={`${section.id}-title`}>{section.title}</h2>
      </header>
      <div className={r.reading}>
        {section.paragraphs?.length ? (
          <div>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        ) : null}
        {section.matrix ? (
          <div className={r.wideBlock}>
            <div className={r.matrixCards}>
              {section.matrix.rows.map((row) => (
                <dl key={row.join("|")}>
                  {row.map((cell, index) => (
                    <div key={section.matrix?.columns[index]}>
                      <dt>{section.matrix?.columns[index]}</dt>
                      <dd>{cell}</dd>
                    </div>
                  ))}
                </dl>
              ))}
            </div>
            <div className={r.matrixTable}>
              <table>
                <caption className={h.srOnly}>{section.matrix.caption}</caption>
                <thead>
                  <tr>{section.matrix.columns.map((column) => <th key={column} scope="col">{column}</th>)}</tr>
                </thead>
                <tbody>
                  {section.matrix.rows.map((row) => (
                    <tr key={row.join("|")}>
                      {row.map((cell, index) => index === 0
                        ? <th key={index} scope="row">{cell}</th>
                        : <td key={index}>{cell}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
        {section.bullets ? <BulletList items={section.bullets} /> : null}
        {section.principle ? (
          <div className={r.principle}>
            {section.principle.label ? (
              <p className={r.principleLabel}>{section.principle.label}</p>
            ) : null}
            <p className={r.principleText}>{section.principle.text}</p>
          </div>
        ) : null}
        {section.cards ? (
          <ul className={`${r.articleCards} ${r.wideBlock}`}>
            {section.cards.map((card) => (
              <li key={card.title}>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </li>
            ))}
          </ul>
        ) : null}
        {section.sources ? <SourceNote sources={section.sources} /> : null}
        {section.download ? (
          <a className={r.download} download href={section.download.href}>
            {section.download.label}
            <span aria-hidden="true">→</span>
          </a>
        ) : null}
        {section.links ? (
          <div className={r.links}>
            {section.links.map((link) => (
              <Link href={link.href} key={link.href}>
                {link.label}
                <span aria-hidden="true">→</span>
              </Link>
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
    <ResourceMain locale="en">
      <article>
        <ResourceHero
          current={content.title}
          eyebrow={content.eyebrow}
          locale="en"
          statement={content.deck}
          title={content.title}
          titleId="guide-title"
        >
          <nav aria-label="On this page" className={h.jump}>
            {content.nav.map(({ label, href }) => (
              <a className={h.jumpLink} href={href} key={href}>
                {label}
              </a>
            ))}
          </nav>
          <div className={r.method}>
            <p>Evipace method</p>
            <p>
              {content.methodNote ??
                "Customer request - scope - data owner - source - evidence - internal review."}
            </p>
            <Link href="/en/methodology">See methodology</Link>
          </div>
        </ResourceHero>

        <ResourceBand id="quick-answer" labelledBy="quick-answer-heading" tone="dark">
          <Head
            dark
            eyebrow="Quick answer"
            id="quick-answer-heading"
            title={content.quickAnswerTitle ?? "Start with the request, not the spreadsheet."}
          >
            {content.summary.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Head>
          <ol className={`${h.steps} ${r.quickChecks}`}>
            {content.quickChecks.map((check, index) => (
              <li className={h.step} key={check.title}>
                <span aria-hidden="true" className={h.stepNumber}>{index + 1}</span>
                <h3 className={h.cardTitle}>{check.title}</h3>
                <p>{check.body}</p>
              </li>
            ))}
          </ol>
        </ResourceBand>

        <div className={h.shell}>
          {content.sections.map((section) => (
            <ArticleSection key={section.id} section={section} />
          ))}
        </div>

        <RevealOnView className={h.shell}>
          <section aria-labelledby="guide-cta-title" className={r.inlineCta}>
            <p className={h.eyebrow}>{content.cta.eyebrow}</p>
            <h2 id="guide-cta-title">{content.cta.title}</h2>
            <p>{content.cta.body}</p>
            <div className={h.actions}>
              <PillLink href={content.cta.primaryHref}>{content.cta.primaryLabel}</PillLink>
              {content.cta.secondaryHref && content.cta.secondaryLabel ? (
                <TextLink href={content.cta.secondaryHref}>{content.cta.secondaryLabel}</TextLink>
              ) : null}
            </div>
          </section>
        </RevealOnView>

        <Faq eyebrow="FAQ" items={content.faq} title="Frequently asked questions" />

        {content.sources ? (
          <div className={h.shell}>
            <section aria-labelledby="sources-title" className={r.sources}>
              <h2 id="sources-title">Sources and further reading</h2>
              <ul>
                {content.sources.map((source) => (
                  <li key={source.href}>
                    <a href={source.href} rel="noreferrer" target="_blank">
                      {source.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        ) : null}
      </article>

      <ClosingCta
        body={
          <p>
            Send the questionnaire, customer email, spreadsheet or portal
            export. We can map what is being asked, identify the internal
            sources and prepare a response for your review.
          </p>
        }
        formHref="/en/send-request"
        formLabel="Send the request"
        forwardLabel="Forward your request"
        note="Questionnaire - Excel - PDF - portal - customer email"
        slogan="ESG work. Done right. Done faster."
        title="Already have the customer request?"
      />
    </ResourceMain>
  );
}
