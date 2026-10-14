import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import h from "../HomeLandingPage.module.css";
import { ClosingCta } from "../home/ClosingCta";
import { RevealOnView } from "../home/RevealOnView";
import { SourceNote } from "../trust/SourceNote";
import { ServiceDetailAccordion } from "../service-landing/ServiceDetailAccordion";
import { IllustrativeHandover } from "../service-landing/IllustrativeHandover";
import sp from "../service-landing/ServicePage.module.css";
import type { CommercialServicePageContent } from "./content";

const SEND_REQUEST_HREF = "/en/send-request";

type Props = { content: CommercialServicePageContent };

function Breadcrumb({ current }: { current: string }) {
  return (
    <nav aria-label="Breadcrumb" className={sp.breadcrumb}>
      <Link href="/en">Home</Link>
      <span aria-hidden="true">/</span>
      <span aria-current="page">{current}</span>
    </nav>
  );
}

/** Centred eyebrow, heading and optional intro, as on the homepage. */
function Head({
  eyebrow,
  id,
  intro,
  title,
  dark = false
}: {
  eyebrow?: string;
  id: string;
  intro?: ReactNode;
  title: string;
  dark?: boolean;
}) {
  return (
    <header className={`${h.sectionHead}${dark ? ` ${sp.darkHead}` : ""}`}>
      {eyebrow ? <p className={h.eyebrow}>{eyebrow}</p> : null}
      <h2 className={h.heading} id={id}>{title}</h2>
      {intro ? <p className={h.lead}>{intro}</p> : null}
    </header>
  );
}

function Band({
  children,
  labelledBy,
  id,
  tone = "light"
}: {
  children: ReactNode;
  labelledBy: string;
  id?: string;
  tone?: "light" | "tinted" | "dark";
}) {
  const toneClass = tone === "tinted" ? ` ${h.tinted}` : tone === "dark" ? ` ${sp.dark}` : "";
  return (
    <section aria-labelledby={labelledBy} className={`${h.section}${toneClass}`} id={id}>
      <RevealOnView className={h.shell}>{children}</RevealOnView>
    </section>
  );
}

function Hero({ content }: Props) {
  return (
    <section aria-labelledby="hero-title" className={`${h.hero} ${h.pageHero}`}>
      <div className={`${h.shell} ${h.heroGrid}`}>
        <div className={h.heroCopy}>
          <Breadcrumb current={content.eyebrow} />
          <p className={h.eyebrow}>{content.eyebrow}</p>
          <h1 className={h.display} id="hero-title">{content.title}</h1>
          <div className={sp.intro}>
            {content.intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className={h.actions}>
            <Link className={h.pillButton} href={SEND_REQUEST_HREF}>
              {content.primaryCta}
              <span aria-hidden="true" className={h.pillArrow}>→</span>
            </Link>
            <Link className={h.textLink} href={content.secondaryCta.href}>
              {content.secondaryCta.label}<span aria-hidden="true">→</span>
            </Link>
          </div>
          <p className={sp.qualifier}>{content.qualifier}</p>
          <aside className={sp.heroPanel}>
            <p className={sp.panelLabel}>{content.heroVisual.label}</p>
            <ol>
              {content.heroVisual.items.map((item, index) => (
                <li key={item}>
                  <span aria-hidden="true">{index + 1}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </div>
    </section>
  );
}

/**
 * Direct answers to the definitional questions a first-time reader arrives
 * with, placed immediately under the hero.
 */
function DirectAnswers({ content }: Props) {
  if (!content.directAnswers) return null;
  const { eyebrow, items, sources } = content.directAnswers;

  return (
    <section aria-labelledby="direct-answers-title" className={h.section} id="what-it-is">
      <RevealOnView className={h.shell}>
        <header className={h.sectionHead}>
          <p className={h.eyebrow}>{eyebrow}</p>
          <h2 className={h.srOnly} id="direct-answers-title">{eyebrow}</h2>
        </header>
        <div className={sp.grid2}>
          {items.map((item) => (
            <article className={`${sp.card} ${sp.answerCard}`} key={item.question}>
              <h3>{item.question}</h3>
              {item.answer.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </article>
          ))}
        </div>
        {sources ? (
          <div className={sp.sources}>
            <SourceNote sources={sources} />
          </div>
        ) : null}
      </RevealOnView>
    </section>
  );
}

function FitSection({ content }: Props) {
  return (
    <Band labelledBy="fit-title">
      <Head eyebrow={content.fit.eyebrow} id="fit-title" intro={content.fit.intro} title={content.fit.title} />
      <ul className={sp.grid3}>
        {content.fit.items.map((item) => {
          const Icon = item.icon;
          return (
            <li className={sp.card} key={item.title}>
              <Icon aria-hidden="true" className={sp.cardIcon} />
              <h3>{item.title}</h3>
              {item.quote ? <p className={sp.quote}>{item.quote}</p> : null}
              <p>{item.body}</p>
            </li>
          );
        })}
      </ul>
    </Band>
  );
}

function ServiceSection({ content }: Props) {
  return (
    <Band id="service" labelledBy="service-title" tone="dark">
      <Head dark eyebrow={content.service.eyebrow} id="service-title" intro={content.service.intro} title={content.service.title} />
      <ul className={sp.grid3}>
        {content.service.items.map((item) => {
          const Icon = item.icon;
          return (
            <li className={sp.card} key={item.title}>
              <Icon aria-hidden="true" className={sp.cardIcon} />
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          );
        })}
      </ul>
    </Band>
  );
}

function InputsSection({ content }: Props) {
  return (
    <Band labelledBy="inputs-title" tone="tinted">
      <Head id="inputs-title" intro={content.inputs.body} title={content.inputs.title} />
      <ul className={sp.checks}>
        {content.inputs.items.map((item) => (
          <li key={item}>
            <CheckCircle2 aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Band>
  );
}

function ProcessSection({ content }: Props) {
  return (
    <Band id="process" labelledBy="process-title">
      <Head id="process-title" intro={content.process.intro} title={content.process.title} />
      <ol className={h.steps}>
        {content.process.steps.map((step, index) => (
          <li className={h.step} key={step.title} style={{ "--i": index } as React.CSSProperties}>
            <span aria-hidden="true" className={h.stepNumber}>{index + 1}</span>
            <h3 className={h.cardTitle}>{step.title}</h3>
            <p>{step.body}</p>
          </li>
        ))}
      </ol>
    </Band>
  );
}

function ModelSection({ content }: Props) {
  if (!content.model) return null;
  return (
    <Band labelledBy="model-title" tone="tinted">
      <Head id="model-title" intro={content.model.body} title={content.model.title} />
      <ol className={sp.model}>
        {content.model.items.map((item, index) => (
          <li className={sp.card} key={item.title}>
            <span aria-hidden="true" className={h.stepNumber}>{index + 1}</span>
            <h3>{item.title}</h3>
            <p>{item.body}</p>
          </li>
        ))}
      </ol>
    </Band>
  );
}

function DeliverablesSection({ content }: Props) {
  return (
    <Band labelledBy="deliverables-title">
      <Head id="deliverables-title" intro={content.deliverables.qualifier} title={content.deliverables.title} />
      <ul className={sp.checks}>
        {content.deliverables.items.map((item) => (
          <li key={item}>
            <CheckCircle2 aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Band>
  );
}

function TrustSection({ content }: Props) {
  return (
    <Band labelledBy="trust-title" tone="dark">
      <Head dark eyebrow={content.trust.eyebrow} id="trust-title" title={content.trust.title} />
      <div className={`${sp.body} ${sp.darkBody}`}>
        {content.trust.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <ul className={sp.grid2}>
        {content.trust.items.map((item) => (
          <li className={sp.card} key={item.label}>
            <h3>{item.label}</h3>
            <p>{item.body}</p>
          </li>
        ))}
      </ul>
    </Band>
  );
}

function ResourcesSection({ content }: Props) {
  return (
    <Band labelledBy="resources-title" tone="tinted">
      <Head id="resources-title" intro={content.resources.body} title={content.resources.title} />
      <ul className={sp.grid3}>
        {content.resources.links.map((link) => (
          <li key={link.href}>
            <Link className={sp.linkCard} href={link.href}>
              <h3>{link.title}</h3>
              <p>{link.body}</p>
              <span className={sp.linkMore}>
                Open resource
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Band>
  );
}

function RelatedServicesSection({ content }: Props) {
  if (!content.relatedServices) return null;
  const { title, body, links } = content.relatedServices;
  return (
    <Band labelledBy="related-services-title">
      <Head id="related-services-title" intro={body} title={title} />
      <ul className={sp.grid2}>
        {links.map((link) => (
          <li key={link.href}>
            <Link className={sp.linkCard} href={link.href}>
              <h3>{link.title}</h3>
              <p>{link.body}</p>
            </Link>
          </li>
        ))}
      </ul>
    </Band>
  );
}

function FaqSection({ content }: Props) {
  if (!content.faq?.length) return null;
  return (
    <section aria-labelledby="faq-title" className={`${h.section} ${h.tinted}`} id="faq">
      <RevealOnView className={`${h.shell} ${h.faqGrid}`}>
        <header>
          <p className={h.eyebrow}>FAQ</p>
          <h2 className={h.heading} id="faq-title">Frequently asked questions</h2>
        </header>
        <div className={h.faq}>
          {content.faq.map((item) => (
            <details className={h.faqItem} key={item.question}>
              <summary>
                <h3>{item.question}</h3>
                <span aria-hidden="true" className={h.faqIcon} />
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </RevealOnView>
    </section>
  );
}

function FinalCta({ content }: Props) {
  return (
    <ClosingCta
      body={content.finalCta.body}
      formHref={SEND_REQUEST_HREF}
      formLabel={content.finalCta.primaryLabel}
      forwardLabel="Forward your request"
      offers={
        content.streamlinedService
          ? undefined
          : { label: content.finalCta.secondaryLabel, href: content.finalCta.secondaryHref }
      }
      slogan="Next step"
      title={content.finalCta.title}
    />
  );
}

export function EnglishCommercialServicePage({ content }: Props) {
  return (
    <main className={h.page} data-locale="en" id="top">
      <Hero content={content} />
      <DirectAnswers content={content} />
      {content.streamlinedService ? <DeliverablesSection content={content} /> : <FitSection content={content} />}
      {content.illustrativeHandover ? (
        <IllustrativeHandover locale="en" service={content.illustrativeHandover} />
      ) : null}
      {content.streamlinedService ? <ProcessSection content={content} /> : null}
      <ServiceSection content={content} />
      {content.streamlinedService ? (
        <ServiceDetailAccordion label={content.detailsLabel ?? "When this service fits and what you can send"}>
          <FitSection content={content} />
          <InputsSection content={content} />
        </ServiceDetailAccordion>
      ) : (
        <>
          <InputsSection content={content} />
          <ProcessSection content={content} />
        </>
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
