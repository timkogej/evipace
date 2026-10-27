import Link from "next/link";
import { getPrivacyPolicyPath } from "@/lib/legal-info";
import styles from "../HomeLandingPage.module.css";
import { ClosingCta } from "../home/ClosingCta";
import type { HomeLocale } from "../home/content";
import { RevealOnView } from "../home/RevealOnView";
import { ScrollProgress } from "../home/ScrollProgress";
import { offersContent } from "./content";

export function OffersPage({ locale }: { locale: HomeLocale }) {
  const copy = offersContent[locale];
  const requestHref = `/${locale}/send-request`;

  return (
    <main className={styles.page} data-locale={locale}>
      <section aria-labelledby="offers-title" className={`${styles.hero} ${styles.pageHero}`}>
        <div className={`${styles.shell} ${styles.heroGrid}`}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>{copy.hero.eyebrow}</p>
            <h1 className={styles.display} id="offers-title">{copy.hero.title}</h1>
            <p className={styles.heroBody}>{copy.hero.body}</p>
            <nav aria-label={copy.hero.jumpLabel} className={styles.jump}>
              {copy.offers.map((offer) => (
                <a className={styles.jumpLink} href={`#${offer.id}`} key={offer.id}>
                  {offer.name}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </section>

      {copy.offers.map((offer, index) => (
        <section
          aria-labelledby={`${offer.id}-title`}
          className={`${styles.section} ${styles.anchored} ${index % 2 === 1 ? styles.tinted : ""}`}
          id={offer.id}
          key={offer.id}
        >
          <RevealOnView className={styles.shell}>
            <header className={styles.sectionHead}>
              <p className={styles.eyebrow}>{offer.kind}</p>
              <h2 className={`${styles.heading} ${styles.offerHeading}`} id={`${offer.id}-title`}>
                {offer.name}
              </h2>
              <p className={styles.lead}>{offer.forWhom}</p>
              {offer.note ? <p className={styles.note}>{offer.note}</p> : null}
            </header>
            <div className={styles.detailGrid}>
              <div className={styles.detail}>
                <h3 className={styles.detailTitle}>{copy.labels.included}</h3>
                <ul className={styles.offerList}>
                  {offer.included.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
              <div className={styles.detail}>
                <h3 className={styles.detailTitle}>{copy.labels.youDo}</h3>
                <ul className={styles.offerList}>
                  {offer.youDo.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
              <div className={styles.detail}>
                <h3 className={styles.detailTitle}>{copy.labels.process}</h3>
                <ol className={styles.numbered}>
                  {offer.process.map((item) => <li key={item}>{item}</li>)}
                </ol>
              </div>
              <div className={styles.detail}>
                <h3 className={styles.detailTitle}>{copy.labels.weNeed}</h3>
                <ul className={styles.offerList}>
                  {offer.weNeed.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </div>
          </RevealOnView>
        </section>
      ))}

      <section aria-labelledby="offers-compare-title" className={`${styles.section} ${styles.orangeBand}`}>
        <RevealOnView className={styles.shell}>
          <header className={styles.sectionHead}>
            <p className={styles.eyebrow}>{copy.compare.label}</p>
            <h2 className={styles.heading} id="offers-compare-title">{copy.compare.title}</h2>
          </header>
          <div className={styles.tableWrap}>
            <table className={styles.compare}>
              <caption className={styles.srOnly}>{copy.compare.caption}</caption>
              <thead>
                <tr>
                  <th scope="col"><span className={styles.srOnly}>{copy.compare.rowHeader}</span></th>
                  {copy.offers.map((offer) => (
                    <th key={offer.id} scope="col">{offer.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {copy.compare.rows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    {row.values.map((value, column) => (
                      <td data-label={copy.offers[column].name} key={copy.offers[column].id}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </RevealOnView>
      </section>

      <section aria-labelledby="offers-steps-title" className={styles.section}>
        <RevealOnView className={styles.shell}>
          <header className={styles.sectionHead}>
            <p className={styles.eyebrow}>{copy.steps.label}</p>
            <h2 className={styles.heading} id="offers-steps-title">{copy.steps.title}</h2>
          </header>
          <ScrollProgress className={styles.stepsTrack} style={{ "--n": copy.steps.items.length } as React.CSSProperties}>
            <ol className={`${styles.steps} ${styles.stepsFour}`}>
              {copy.steps.items.map((step, index) => (
                <li className={styles.step} key={step.title} style={{ "--i": index } as React.CSSProperties}>
                  <span aria-hidden="true" className={styles.stepNumber}>{index + 1}</span>
                  <h3 className={styles.cardTitle}>{step.title}</h3>
                  <p>{step.body}</p>
                </li>
              ))}
            </ol>
          </ScrollProgress>
          <div className={styles.sectionFoot}>
            <Link className={styles.primaryButton} href={requestHref}>
              {copy.labels.send}<span aria-hidden="true">→</span>
            </Link>
          </div>
        </RevealOnView>
      </section>

      <section aria-labelledby="offers-faq-title" className={`${styles.section} ${styles.tinted}`}>
        <RevealOnView className={`${styles.shell} ${styles.faqGrid}`}>
          <header>
            <p className={styles.eyebrow}>{copy.faq.label}</p>
            <h2 className={styles.heading} id="offers-faq-title">{copy.faq.title}</h2>
          </header>
          <div className={styles.faq}>
            {copy.faq.items.map((item) => (
              <details className={styles.faqItem} key={item.q}>
                <summary>
                  <h3>{item.q}</h3>
                  <span aria-hidden="true" className={styles.faqIcon} />
                </summary>
                <p>
                  {item.a}
                  {item.link ? (
                    <>
                      {" "}
                      <Link className={styles.inlineLink} href={getPrivacyPolicyPath(locale)}>
                        {item.link.label}
                      </Link>
                    </>
                  ) : null}
                </p>
              </details>
            ))}
          </div>
        </RevealOnView>
      </section>

      <ClosingCta
        body={copy.cta.body}
        formHref={requestHref}
        formLabel={copy.cta.formLink}
        forwardLabel={copy.cta.forward}
        slogan={copy.cta.slogan}
        title={copy.cta.title}
      />
    </main>
  );
}
