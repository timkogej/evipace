import Link from "next/link";
import { deskForwardEmail } from "@/lib/company-info";
import { DeskVisual } from "./home/DeskVisual";
import { RevealOnView } from "./home/RevealOnView";
import { homeContent, type HomeLocale } from "./home/content";
import styles from "./HomeLandingPage.module.css";

export function HomeLandingPage({ locale }: { locale: HomeLocale }) {
  const copy = homeContent[locale];
  const requestHref = `/${locale}/send-request`;
  const forwardHref = `mailto:${deskForwardEmail}`;

  return (
    <main className={styles.page} data-locale={locale}>
      <section aria-labelledby="hero-title" className={styles.hero} id="top">
        <div className={`${styles.shell} ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>{copy.hero.eyebrow}</p>
            <h1 className={styles.display} id="hero-title">{copy.hero.title}</h1>
            <p className={styles.heroBody}>{copy.hero.body}</p>
            <div className={styles.actions}>
              <a className={styles.pillButton} href={forwardHref}>
                {copy.hero.forward}
                <span aria-hidden="true" className={styles.pillArrow}>→</span>
              </a>
              <Link className={styles.textLink} href={requestHref}>
                {copy.hero.formLink}<span aria-hidden="true">→</span>
              </Link>
            </div>
            <p className={styles.heroNote}>{copy.hero.note}</p>
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

      <section aria-labelledby="home-steps-title" className={styles.section}>
        <RevealOnView className={styles.shell}>
          <header className={styles.sectionHead}>
            <p className={styles.eyebrow}>{copy.steps.label}</p>
            <h2 className={styles.heading} id="home-steps-title">{copy.steps.title}</h2>
          </header>
          <ol className={styles.steps}>
            {copy.steps.items.map((step, index) => (
              <li className={styles.step} key={step.title}>
                <span aria-hidden="true" className={styles.stepNumber}>{index + 1}</span>
                <h3 className={styles.cardTitle}>{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
        </RevealOnView>
      </section>

      <section
        aria-labelledby="home-offers-title"
        className={`${styles.section} ${styles.tinted}`}
        id={locale === "de" ? "leistungen" : "services"}
      >
        <RevealOnView className={styles.shell}>
          <header className={styles.sectionHead}>
            <p className={styles.eyebrow}>{copy.offers.label}</p>
            <h2 className={styles.heading} id="home-offers-title">{copy.offers.title}</h2>
            <p className={styles.lead}>{copy.offers.intro}</p>
          </header>
          <div className={styles.offers}>
            {copy.offers.items.map((offer) => (
              <article className={styles.offer} key={offer.name}>
                <p className={styles.offerKind}>{offer.kind}</p>
                <h3 className={styles.offerName}>{offer.name}</h3>
                <h4 className={styles.offerLabel}>{copy.offers.forWhomLabel}</h4>
                <p className={styles.offerText}>{offer.forWhom}</p>
                <h4 className={styles.offerLabel}>{copy.offers.includedLabel}</h4>
                <ul className={styles.offerList}>
                  {offer.included.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <h4 className={styles.offerLabel}>{copy.offers.youDoLabel}</h4>
                <ul className={styles.offerList}>
                  {offer.youDo.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
            ))}
          </div>
          <div className={styles.offersFoot}>
            <p>{copy.offers.closing}</p>
            <Link className={styles.primaryButton} href={requestHref}>
              {copy.offers.cta}<span aria-hidden="true">→</span>
            </Link>
          </div>
        </RevealOnView>
      </section>

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
          <figure className={styles.exampleCard}>
            <figcaption className={styles.exampleHead}>
              <span className={styles.panelTitle}>{copy.example.cardTitle}</span>
              <span className={styles.badge}>{copy.example.badge}</span>
            </figcaption>
            <dl className={styles.exampleRows}>
              {copy.example.rows.map(([term, description]) => (
                <div className={styles.exampleRow} key={term}>
                  <dt>{term}</dt>
                  <dd>{description}</dd>
                </div>
              ))}
            </dl>
            <p className={styles.exampleStatus}>
              <span aria-hidden="true" className={styles.dot} data-tone="wait" />
              {copy.example.status}
            </p>
          </figure>
        </RevealOnView>
      </section>

      <section aria-labelledby="home-trust-title" className={`${styles.section} ${styles.tinted}`}>
        <RevealOnView className={styles.shell}>
          <header className={styles.sectionHead}>
            <p className={styles.eyebrow}>{copy.trust.label}</p>
            <h2 className={styles.heading} id="home-trust-title">{copy.trust.title}</h2>
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

      <section aria-labelledby="home-cta-title" className={styles.cta}>
        <div className={`${styles.shell} ${styles.ctaInner}`}>
          <div>
            <p className={styles.ctaSlogan}>{copy.cta.slogan}</p>
            <h2 className={styles.heading} id="home-cta-title">{copy.cta.title}</h2>
            <p className={styles.ctaBody}>{copy.cta.body}</p>
          </div>
          <div className={styles.actions}>
            <a className={styles.pillButton} href={forwardHref}>
              {copy.hero.forward}
              <span aria-hidden="true" className={styles.pillArrow}>→</span>
            </a>
            <Link className={`${styles.textLink} ${styles.textLinkOnDark}`} href={requestHref}>
              {copy.cta.formLink}<span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
