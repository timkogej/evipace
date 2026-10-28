import Link from "next/link";
import { deskForwardEmail, phoneHref, publicPhone } from "@/lib/company-info";
import { getOffersPath } from "@/lib/site-navigation";
import { ClosingCta } from "./home/ClosingCta";
import { DeskVisual } from "./home/DeskVisual";
import { BrandIcon } from "./home/BrandIcon";
import { ReuseVisual } from "./home/ReuseVisual";
import { RevealOnView } from "./home/RevealOnView";
import { ScrollProgress } from "./home/ScrollProgress";
import { StepsScene } from "./home/StepsScene";
import { TrustIllustration } from "./home/TrustIllustration";
import { TypedText } from "./home/TypedText";
import { homeContent, type HomeLocale } from "./home/content";
import styles from "./HomeLandingPage.module.css";

export function HomeLandingPage({ locale }: { locale: HomeLocale }) {
  const copy = homeContent[locale];
  const requestHref = `/${locale}/send-request`;
  const forwardHref = `mailto:${deskForwardEmail}`;
  const offersHref = getOffersPath(locale);
  const statementWords = copy.statement.split(" ");
  const titleBreak = copy.hero.title.indexOf(". ") + 1;
  const titleFirst = copy.hero.title.slice(0, titleBreak);
  const titleSecond = copy.hero.title.slice(titleBreak + 1);

  return (
    <main className={styles.page} data-locale={locale}>
      <section aria-labelledby="hero-title" className={styles.hero} id="top">
        <div className={`${styles.shell} ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>{copy.hero.eyebrow}</p>
            <h1 className={`${styles.display} ${styles.heroTitle}`} id="hero-title">
              {/* Each sentence starts its own line; the second never breaks. */}
              <span className={styles.titleLine}>{titleFirst}</span>{" "}
              <span className={`${styles.titleLine} ${styles.titleKeep}`}>{titleSecond}</span>
            </h1>
            <p className={styles.heroBody}>{copy.hero.body}</p>
            <div className={styles.actions}>
              <a className={styles.pillButton} href={forwardHref}>
                {copy.hero.forward}
                <span aria-hidden="true" className={styles.pillArrow}><span className={styles.arrowGlyph}>→</span></span>
              </a>
              <Link className={styles.textLink} href={requestHref}>
                {copy.hero.formLink}<span aria-hidden="true">→</span>
              </Link>
            </div>
            <p className={styles.heroNote}>{copy.hero.note}</p>
            {publicPhone ? (
              <p className={styles.heroCall}>
                {copy.hero.callPrompt}{" "}
                <a className={styles.textLink} href={phoneHref(publicPhone)}>
                  {copy.hero.callLabel}: {publicPhone}
                </a>
              </p>
            ) : null}
          </div>
          <DeskVisual copy={copy.visual} />
        </div>
      </section>

      <section aria-label={copy.assurances.label} className={styles.assurances}>
        <ul className={`${styles.shell} ${styles.assuranceList}`}>
          {copy.assurances.items.map((item) => (
            <li key={item}>
              <span aria-hidden="true" className={styles.check} />
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Pinned on large screens: the section holds still while the three
          steps light up in turn and the orange track fills between them. */}
      <section aria-labelledby="home-steps-title" className={`${styles.section} ${styles.stepsSection}`}>
        <ScrollProgress className={styles.stepsPin} pin>
          <div className={styles.stepsSticky}>
            <div className={styles.shell}>
              <RevealOnView>
                <header className={styles.splitHead}>
                  <div>
                    <p className={styles.eyebrow}>{copy.steps.label}</p>
                    <h2 className={styles.heading} id="home-steps-title">{copy.steps.title}</h2>
                  </div>
                  <StepsScene scene={copy.steps.scene} />
                </header>
              </RevealOnView>
              <ol className={styles.steps}>
                {copy.steps.items.map((step, index) => (
                  <li className={styles.step} key={step.title} style={{ "--i": index } as React.CSSProperties}>
                    <span aria-hidden="true" className={styles.stepNumber}>{index + 1}</span>
                    <h3 className={styles.cardTitle}>{step.title}</h3>
                    <p>{step.body}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </ScrollProgress>
      </section>

      <section aria-label={copy.statement} className={styles.statementSection}>
        <ScrollProgress className={styles.shell}>
          <p
            aria-hidden="true"
            className={styles.statement}
            style={{ "--n": statementWords.length } as React.CSSProperties}
          >
            {statementWords.map((word, index) => (
              <span className={styles.word} key={`${index}-${word}`} style={{ "--i": index } as React.CSSProperties}>
                {word}{" "}
              </span>
            ))}
          </p>
        </ScrollProgress>
      </section>

      <section
        aria-labelledby="home-forwardable-title"
        className={`${styles.section} ${styles.orangeBand}`}
        id={locale === "de" ? "leistungen" : "services"}
      >
        <RevealOnView className={styles.shell}>
          {/* Title on the left, intro and link on the right, cards below. */}
          <header className={styles.splitHead}>
            <div>
              <p className={styles.eyebrow}>{copy.forwardable.label}</p>
              <h2 className={styles.heading} id="home-forwardable-title">{copy.forwardable.title}</h2>
            </div>
            <div className={styles.splitAside}>
              <p className={styles.lead}>{copy.forwardable.intro}</p>
              <Link className={styles.textLink} href={offersHref}>
                {copy.forwardable.link}<span aria-hidden="true">→</span>
              </Link>
            </div>
          </header>
          <ul className={styles.cards}>
            {copy.forwardable.items.map((item, index) => (
              <li className={styles.card} key={item.title} style={{ "--i": index } as React.CSSProperties}>
                <span aria-hidden="true" className={styles.cardIconTile}>
                  <BrandIcon className={styles.cardIcon} name={item.icon} />
                </span>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p>{item.body}</p>
              </li>
            ))}
          </ul>
        </RevealOnView>
      </section>

      {/* Copy on the left, the evidence folder on the right. */}
      <section aria-labelledby="home-reuse-title" className={styles.section}>
        <RevealOnView className={`${styles.shell} ${styles.splitSection}`}>
          <header className={styles.splitCopy}>
            <p className={styles.eyebrow}>{copy.reuse.label}</p>
            <h2 className={styles.heading} id="home-reuse-title">{copy.reuse.title}</h2>
            <p className={styles.lead}>{copy.reuse.body}</p>
          </header>
          <ReuseVisual copy={copy.reuse} />
        </RevealOnView>
      </section>

      {/* Mirrored: the prepared response on the left, copy on the right. */}
      <section aria-labelledby="home-example-title" className={styles.section}>
        <RevealOnView className={`${styles.shell} ${styles.exampleGrid}`}>
          <div>
            <p className={styles.eyebrow}>{copy.example.label}</p>
            <h2 className={styles.heading} id="home-example-title">{copy.example.title}</h2>
            <p className={styles.lead}>{copy.example.body}</p>
            <div className={styles.lanes}>
              {copy.example.lanes.map((lane) => (
                <div className={styles.lane} key={lane.title}>
                  <h3 className={styles.laneTitle}>{lane.title}</h3>
                  <ul className={styles.offerList}>
                    {lane.points.map((point) => <li key={point}>{point}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          {/* The draft is typed in row by row as it scrolls into view. */}
          <ScrollProgress className={styles.exampleStage}>
            <figure className={styles.exampleCard}>
              <figcaption className={styles.exampleHead}>
                <span className={styles.panelTitle}>{copy.example.cardTitle}</span>
                <span className={styles.badge}>{copy.example.badge}</span>
              </figcaption>
              <dl className={styles.exampleRows}>
                {copy.example.rows.map(([term, description], index) => (
                  <div className={styles.exampleRow} key={term} style={{ "--i": index } as React.CSSProperties}>
                    <dt>{term}</dt>
                    <dd><TypedText text={description} /></dd>
                  </div>
                ))}
              </dl>
              <p className={styles.exampleStatus}>
                <span aria-hidden="true" className={styles.dot} data-tone="wait" />
                {copy.example.status}
              </p>
            </figure>
          </ScrollProgress>
        </RevealOnView>
      </section>

      <section aria-labelledby="home-trust-title" className={`${styles.section} ${styles.tinted}`}>
        {/* Title and illustration on the left, the three answers as rows on the right. */}
        <RevealOnView className={`${styles.shell} ${styles.trustGrid}`}>
          <header className={styles.splitCopy}>
            <p className={styles.eyebrow}>{copy.trust.label}</p>
            <h2 className={styles.heading} id="home-trust-title">{copy.trust.title}</h2>
            <TrustIllustration label={copy.trust.illustrationLabel} />
          </header>
          <ul className={styles.trust}>
            {copy.trust.items.map((item) => (
              <li key={item.title}>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p>{item.body}</p>
                {item.link ? (
                  <Link className={styles.textLink} href={item.link.href}>
                    {item.link.label}<span aria-hidden="true">→</span>
                  </Link>
                ) : null}
              </li>
            ))}
          </ul>
        </RevealOnView>
      </section>

      <section aria-labelledby="home-faq-title" className={styles.section}>
        <RevealOnView className={`${styles.shell} ${styles.faqGrid}`}>
          <header>
            <p className={styles.eyebrow}>{copy.faq.label}</p>
            <h2 className={styles.heading} id="home-faq-title">{copy.faq.title}</h2>
          </header>
          <div className={styles.faq}>
            {copy.faq.items.map((item) => (
              <details className={styles.faqItem} key={item.q}>
                <summary>
                  <h3>{item.q}</h3>
                  <span aria-hidden="true" className={styles.faqIcon} />
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </RevealOnView>
      </section>

      <ClosingCta
        body={copy.cta.body}
        formHref={requestHref}
        formLabel={copy.cta.formLink}
        forwardLabel={copy.hero.forward}
        offers={{ label: copy.cta.offersLink, href: offersHref }}
        slogan={copy.cta.slogan}
        title={copy.cta.title}
      />
    </main>
  );
}
