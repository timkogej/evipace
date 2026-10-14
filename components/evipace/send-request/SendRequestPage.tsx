import type { ReactNode } from "react";
import { CheckCircle2 } from "lucide-react";
import { deskForwardEmail } from "@/lib/company-info";
import h from "../HomeLandingPage.module.css";
import { homeContent } from "../home/content";
import { LineIcon } from "../home/LineIcon";
import styles from "./SendRequest.module.css";

type Locale = "en" | "de";

/**
 * Send-request page around the shared RequestForm. The hero copy is the
 * page's existing copy; the side panel reuses the homepage's approved
 * steps, assurances and request types. German is marked for review where
 * it is new (DE-REVIEW).
 */
const pageCopy = {
  en: {
    eyebrow: "Send your ESG request",
    heading: "Received an ESG questionnaire? Send it to us.",
    intro:
      "Attach the questionnaire, certificates, or documents your customer sent you. We'll review what's there and get back to you.",
    emailPrefix: "Prefer email?",
    emailLink: "Forward your request",
    kindsLabel: "What you can send",
    priceLabel: "Scope and price",
    price: "After reviewing your request, we confirm scope and price before we start.",
    priceNote: "You review and approve everything before anything is sent.",
    emailLabel: "Prefer email?",
    emailBody: "Forward your customer's email with the attachments."
  },
  de: {
    eyebrow: "ESG-Anfrage senden",
    heading: "ESG-Fragebogen erhalten? Senden Sie ihn uns.",
    intro:
      "Hängen Sie den Fragebogen, Zertifikate oder Unterlagen an, die Ihr Kunde Ihnen geschickt hat. Wir prüfen, was vorhanden ist, und melden uns bei Ihnen.",
    // DE-REVIEW: the strings below are drafts for the owner's review.
    emailPrefix: "Lieber per E-Mail?",
    emailLink: "Anfrage weiterleiten",
    kindsLabel: "Was Sie senden können",
    priceLabel: "Umfang und Preis",
    price: "Nach der Prüfung bestätigen wir Umfang und Preis, bevor wir beginnen.",
    priceNote: "Sie prüfen und geben alles frei, bevor etwas versendet wird.",
    emailLabel: "Lieber per E-Mail?",
    emailBody: "Leiten Sie die E-Mail Ihres Kunden mit den Anhängen weiter."
  }
} as const;

export function SendRequestPage({ children, locale }: { children: ReactNode; locale: Locale }) {
  const copy = pageCopy[locale];
  const home = homeContent[locale];
  const mailto = `mailto:${deskForwardEmail}`;

  return (
    <main className={h.page} data-locale={locale} id="top">
      <section aria-labelledby="send-request-title" className={`${h.hero} ${h.pageHero}`}>
        <div className={`${h.shell} ${h.heroGrid}`}>
          <div className={h.heroCopy}>
            <p className={h.eyebrow}>{copy.eyebrow}</p>
            <h1 className={h.display} id="send-request-title">{copy.heading}</h1>
            <p className={h.heroBody}>{copy.intro}</p>
            <ul aria-label={home.assurances.label} className={styles.assurances}>
              {home.assurances.items.map((item) => (
                <li key={item}>
                  <CheckCircle2 aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <p className={styles.heroAlt}>
              {copy.emailPrefix} <a href={mailto}>{copy.emailLink}</a>
            </p>
          </div>
        </div>
      </section>

      <section aria-label={copy.eyebrow} className={styles.workspace} id="request-form">
        <div className={`${h.shell} ${styles.layout}`}>
          <div>{children}</div>

          <aside className={styles.aside}>
            <div className={styles.panel}>
              <p className={styles.panelLabel}>{home.steps.label}</p>
              <ol className={styles.next}>
                {home.steps.items.map((step) => (
                  <li key={step.title}>
                    <h3>{step.title}</h3>
                    <p>{step.body}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className={styles.panel}>
              <p className={styles.panelLabel}>{copy.kindsLabel}</p>
              <ul className={styles.kinds}>
                {home.forwardable.items.map((item) => (
                  <li key={item.title}>
                    <LineIcon name={item.icon} />
                    {item.title}
                  </li>
                ))}
              </ul>
              <p className={styles.kindsNote}>{home.forwardable.intro}</p>
            </div>

            <div className={`${styles.panel} ${styles.panelDark}`}>
              <p className={styles.panelLabel}>{copy.priceLabel}</p>
              <p className={styles.price}>{copy.price}</p>
              <p>{copy.priceNote}</p>
            </div>

            <div className={styles.panel}>
              <p className={styles.panelLabel}>{copy.emailLabel}</p>
              <p className={styles.emailBody}>{copy.emailBody}</p>
              <div className={styles.emailAction}>
                <a className={h.pillButton} href={mailto}>
                  {copy.emailLink}
                  <span aria-hidden="true" className={h.pillArrow}>→</span>
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
