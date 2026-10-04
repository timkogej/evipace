import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "../ButtonLink";
import { evipaceImages } from "@/lib/evipace-images";
import { publicContactEmail } from "@/lib/company-info";
import styles from "./AboutLandingPage.module.css";

type Locale = "en" | "de";

const copy = {
  en: {
    heroLabel: "About Evipace",
    heroTitle: "ESG should not become more complicated than the task itself.",
    heroBody: "Evipace is a Slovenia-based ESG service provider helping manufacturers and suppliers prepare the answers, calculations and evidence their customers ask for.",
    heroAction: "Why we exist",
    methodology: "See our methodology",
    whyLabel: "Why Evipace exists",
    whyTitle: "The request arrives. The answers are spread across your business.",
    whyBody: "A customer asks for ESG information, but the figures, policies and supporting documents may sit with different teams. Evipace brings the available material together, identifies what is missing and prepares a response your company can check before sending.",
    whyQuote: "Start with the request. Build the answer from what your company can show.",
    approachLabel: "Our approach",
    approachTitle: "From the request to a response your team can approve.",
    approachIntro: "We start with the request in front of you and the records your team already has.",
    approachItems: [
      ["Define the task", "We identify what the customer is asking for and which information is needed."],
      ["Prepare the substance", "We organise existing records, work through calculations and draft the response."],
      ["Keep your team in control", "Sources, assumptions and open points stay visible for your review and approval."]
    ],
    founderLabel: "The founder",
    founderTitle: "Founded on practical work.",
    founderBody: "Tim Kogej founded Evipace in Slovenia to give manufacturers and suppliers practical help with customer ESG requests. The work starts with the requirement, moves through the company's existing records and ends with material your team can review and approve.",
    founderNote: "For work requiring additional specialist expertise, Evipace can involve appropriate external professionals.",
    founderRole: "Founder & Managing Director · Slovenia",
    founderContact: "Speak directly with Tim",
    founderCall: "Call Tim",
    manufacturingLabel: "Who we work with",
    manufacturingTitle: "Built for the reality of manufacturing and supply chains.",
    manufacturingBody: "We work with manufacturers and suppliers who need to respond to customer ESG requests while running their day-to-day business.",
    servicesLabel: "What we help prepare",
    servicesTitle: "Questionnaires, emissions and reporting — prepared for review.",
    servicesIntro: "We prepare the answers, calculations and documents required by the task, with sources and open questions kept visible.",
    handoverLabel: "Illustrative handover · not a client case",
    handoverTitle: "What could be on your desk at the end?",
    handoverBody: "For a customer questionnaire: draft answers, the records behind them and a short list of points your team still needs to confirm. The exact deliverable depends on the request.",
    serviceLinks: [
      ["Customer ESG requests", "/en/esg-customer-requests"],
      ["ESG questionnaires", "/en/esg-questionnaire-support"],
      ["EcoVadis", "/en/ecovadis-support"],
      ["IntegrityNext", "/en/integritynext-support"],
      ["Scope 1 and 2", "/en/scope-1-2-calculation"],
      ["VSME reporting", "/en/vsme-sustainability-report"]
    ],
    trustLabel: "How we stay useful",
    trustTitle: "Clear sources. Visible gaps. Your approval.",
    trustBody: "We connect prepared answers to the documents and data behind them. If information is missing, we say so. Digital and AI-assisted tools can support preparation, but your company confirms its facts and approves the final response.",
    trustBoundary: "Evipace does not issue ESG certifications or replace independent assurance.",
    resources: "Explore resources",
    ctaLabel: "Let’s start",
    ctaTitle: "An ESG request on your desk?",
    ctaBody: "Send the questionnaire, spreadsheet, PDF or screenshot you received. We’ll review the task and tell you what information is needed next.",
    ctaButton: "Send your request",
    contact: "Or email us"
  },
  de: {
    heroLabel: "Über Evipace",
    heroTitle: "ESG sollte nicht komplizierter sein als die Aufgabe selbst.",
    heroBody: "Evipace ist ein ESG-Dienstleister aus Slowenien. Wir helfen Herstellern und Zulieferern, Antworten, Berechnungen und Nachweise für die Anforderungen ihrer Kunden vorzubereiten.",
    heroAction: "Warum es uns gibt",
    methodology: "Unsere Methodik ansehen",
    whyLabel: "Warum es Evipace gibt",
    whyTitle: "Die Anfrage kommt. Die Antworten liegen in mehreren Abteilungen.",
    whyBody: "Ein Kunde fragt nach ESG-Daten, doch Kennzahlen, Richtlinien und Nachweise liegen möglicherweise bei verschiedenen Teams. Evipace führt die vorhandenen Unterlagen zusammen, zeigt Lücken auf und bereitet eine Antwort vor, die Ihr Unternehmen vor dem Versand prüfen kann.",
    whyQuote: "Mit der Anfrage beginnen. Die Antwort auf belegbare Unternehmensdaten stützen.",
    approachLabel: "Unsere Arbeitsweise",
    approachTitle: "Von der Anfrage zu einer Antwort, die Ihr Team freigeben kann.",
    approachIntro: "Wir beginnen mit der konkreten Anfrage und den vorhandenen Unterlagen Ihres Teams.",
    approachItems: [
      ["Aufgabe klären", "Wir erfassen, was der Kunde verlangt und welche Informationen dafür nötig sind."],
      ["Inhalte vorbereiten", "Wir ordnen vorhandene Unterlagen, erarbeiten Berechnungen und entwerfen Antworten."],
      ["Kontrolle behalten", "Quellen, Annahmen und offene Punkte bleiben für Ihre Prüfung und Freigabe sichtbar."]
    ],
    founderLabel: "Der Gründer",
    founderTitle: "Aus der Praxis entstanden.",
    founderBody: "Tim Kogej hat Evipace in Slowenien gegründet, um Hersteller und Zulieferer bei ESG-Anfragen ihrer Kunden praktisch zu unterstützen. Die Arbeit beginnt bei der konkreten Anforderung, nutzt vorhandene Unternehmensunterlagen und führt zu Ergebnissen, die Ihr Team prüfen und freigeben kann.",
    founderNote: "Bei Aufgaben, die zusätzliche Fachkenntnisse erfordern, kann Evipace geeignete externe Fachleute einbeziehen.",
    founderRole: "Founder & Managing Director · Slowenien",
    founderContact: "Sprechen Sie direkt mit Tim",
    founderCall: "Tim anrufen",
    manufacturingLabel: "Für wen wir arbeiten",
    manufacturingTitle: "Für die Realität von Produktion und Lieferketten entwickelt.",
    manufacturingBody: "Wir unterstützen Hersteller und Zulieferer, die ESG-Anfragen ihrer Kunden neben dem laufenden Tagesgeschäft bearbeiten müssen.",
    servicesLabel: "Wobei wir helfen",
    servicesTitle: "Fragebögen, Emissionen und Berichte — zur Prüfung vorbereitet.",
    servicesIntro: "Wir bereiten die für die Aufgabe nötigen Antworten, Berechnungen und Dokumente vor. Quellen und offene Fragen bleiben sichtbar.",
    handoverLabel: "Beispielhafte Übergabe · kein Kundenfall",
    handoverTitle: "Was könnte am Ende auf Ihrem Tisch liegen?",
    handoverBody: "Bei einem Kundenfragebogen: vorbereitete Antworten, die zugehörigen Nachweise und eine kurze Liste der Punkte, die Ihr Team noch bestätigen muss. Das genaue Ergebnis hängt von der Anfrage ab.",
    serviceLinks: [
      ["ESG-Kundenanfragen", "/de/esg-kundenanfragen"],
      ["ESG-Fragebögen", "/de/esg-fragebogen-lieferanten"],
      ["EcoVadis", "/de/ecovadis-unterstuetzung"],
      ["IntegrityNext", "/de/integritynext-unterstuetzung"],
      ["Scope 1 und 2", "/de/scope-1-2-berechnung"],
      ["VSME-Bericht", "/de/vsme-nachhaltigkeitsbericht"]
    ],
    trustLabel: "Nachvollziehbare Ergebnisse",
    trustTitle: "Klare Quellen. Sichtbare Lücken. Ihre Freigabe.",
    trustBody: "Wir verbinden vorbereitete Antworten mit den zugrunde liegenden Daten und Dokumenten. Wenn Informationen fehlen, benennen wir das. Digitale und KI-gestützte Werkzeuge können die Vorbereitung unterstützen; Ihr Unternehmen prüft die Fakten und gibt die endgültige Antwort frei.",
    trustBoundary: "Evipace vergibt keine ESG-Zertifizierungen und ersetzt keine unabhängige Prüfung.",
    resources: "Ressourcen ansehen",
    ctaLabel: "Legen wir los",
    ctaTitle: "Eine ESG-Anfrage liegt auf Ihrem Tisch?",
    ctaBody: "Senden Sie uns den Fragebogen, die Tabelle, das PDF oder den Screenshot. Wir prüfen die Aufgabe und sagen Ihnen, welche Informationen als Nächstes benötigt werden.",
    ctaButton: "Anfrage senden",
    contact: "Oder schreiben Sie uns"
  }
} as const;

export function AboutLandingPage({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const prefix = `/${locale}`;
  const resourcesHref = locale === "de" ? "/de/ressourcen" : "/en/resources";

  return (
    <main className={styles.page}>
      <section className={styles.hero} aria-labelledby="about-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>{c.heroLabel}</p>
          <h1 id="about-title" className={styles.heroTitle}>{c.heroTitle}</h1>
          <p className={styles.lead}>{c.heroBody}</p>
          <div className={styles.heroActions}>
            <a href="#why" className={styles.textLink}>{c.heroAction} <span aria-hidden="true">↗</span></a>
            <Link href={`${prefix}/methodology`} className={styles.textLink}>{c.methodology} <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
        <div className={styles.heroPhoto}>
          <Image
            src="/images/evipace/about/hero-team-review.png"
            alt=""
            fill
            priority
            quality={88}
            sizes="(min-width: 900px) 48vw, 100vw"
            className={styles.heroImage}
          />
        </div>
      </section>

      <section id="why" className={styles.why} aria-labelledby="why-title">
        <div className={styles.shell}>
          <div className={styles.whyGrid}>
            <div className={styles.whyCopy}>
              <p className={styles.eyebrow}>{c.whyLabel}</p>
              <h2 id="why-title" className={styles.sectionTitle}>{c.whyTitle}</h2>
              <p className={styles.body}>{c.whyBody}</p>
              <p className={styles.quote}>{c.whyQuote}</p>
            </div>
            <div className={styles.whyPhoto}>
              <Image
                src="/images/evipace/about/focused-work-sunlit-office.png"
                alt=""
                fill
                quality={88}
                sizes="(min-width: 700px) 46vw, 100vw"
                className={styles.whyImage}
              />
              <span className={styles.photoAccent} aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.approach} aria-labelledby="approach-title">
        <div className={styles.shell}>
          <div className={styles.approachHead}>
            <div><p className={styles.eyebrow}>{c.approachLabel}</p><h2 id="approach-title" className={styles.sectionTitle}>{c.approachTitle}</h2></div>
            <p className={styles.body}>{c.approachIntro}</p>
          </div>
          <div className={styles.approachRows}>
            {c.approachItems.map(([title, body], index) => (
              <div className={styles.approachRow} key={title}>
                <span className={styles.rowNumber} aria-hidden="true">0{index + 1}</span>
                <h3>{title}</h3><p>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.founder} aria-labelledby="founder-title">
        <div className={`${styles.shell} ${styles.founderInner}`}>
          <div className={styles.founderCopy}>
            <p className={styles.eyebrow}>{c.founderLabel}</p>
            <h2 id="founder-title" className={styles.sectionTitle}>{c.founderTitle}</h2>
            <p>{c.founderBody}</p>
            <p className={styles.founderNote}>{c.founderNote}</p>
          </div>
          <aside className={styles.founderContact} aria-label={c.founderContact}>
            <p className={styles.contactLabel}>{c.founderContact}</p>
            <p className={styles.contactName}>Tim Kogej</p>
            <p className={styles.contactRole}>{c.founderRole}</p>
            <a className={styles.callButton} href="tel:+38668663410">
              <span>{c.founderCall}</span><span aria-hidden="true">↗</span>
            </a>
            <a className={styles.phoneNumber} href="tel:+38668663410">+386 68 663 410</a>
          </aside>
        </div>
      </section>

      <section className={styles.services} aria-labelledby="services-title">
        <div className={styles.shell}>
          <div className={styles.servicesHead}>
            <div><p className={styles.eyebrow}>{c.servicesLabel}</p><h2 id="services-title" className={styles.sectionTitle}>{c.servicesTitle}</h2></div>
            <p className={styles.body}>{c.servicesIntro}</p>
          </div>
          <div className={styles.serviceGrid}>
            {c.serviceLinks.map(([title, href]) => <Link className={styles.serviceLink} href={href} key={href}><span>{title}</span><span aria-hidden="true">↗</span></Link>)}
          </div>
          <aside className={styles.handover} aria-label={c.handoverLabel}>
            <p className={styles.eyebrow}>{c.handoverLabel}</p>
            <div className={styles.handoverGrid}>
              <h3>{c.handoverTitle}</h3>
              <p>{c.handoverBody}</p>
            </div>
          </aside>
        </div>
      </section>

      <section className={styles.manufacturing} aria-labelledby="manufacturing-title">
        <Image src={evipaceImages.industrialBreak.src} alt="" fill sizes="100vw" className={styles.manufacturingImage} quality={88} />
        <div className={styles.manufacturingShade} aria-hidden="true" />
        <div className={`${styles.shell} ${styles.manufacturingInner}`}>
          <p className={styles.eyebrow}>{c.manufacturingLabel}</p>
          <h2 id="manufacturing-title" className={styles.sectionTitle}>{c.manufacturingTitle}</h2>
          <p>{c.manufacturingBody}</p>
        </div>
      </section>

      <section className={styles.trust} aria-labelledby="trust-title">
        <div className={styles.shell}>
          <div className={styles.trustGrid}>
            <div><p className={styles.eyebrow}>{c.trustLabel}</p><h2 id="trust-title" className={styles.sectionTitle}>{c.trustTitle}</h2></div>
            <div className={styles.trustCopy}>
              <p>{c.trustBody}</p><p className={styles.boundary}>{c.trustBoundary}</p>
              <div className={styles.trustLinks}><Link href={`${prefix}/methodology`} className={styles.textLink}>{c.methodology} <span aria-hidden="true">↗</span></Link><Link href={resourcesHref} className={styles.textLink}>{c.resources} <span aria-hidden="true">↗</span></Link></div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.cta} aria-labelledby="about-cta-title">
        <div className={`${styles.shell} ${styles.ctaInner}`}>
          <div className={styles.ctaContent}>
            <p className={styles.eyebrow}>{c.ctaLabel}</p>
            <h2 id="about-cta-title" className={styles.sectionTitle}>{c.ctaTitle}</h2>
            <p>{c.ctaBody}</p>
            <ButtonLink href={`${prefix}/send-request`} variant="primary" className={styles.ctaButton}>{c.ctaButton}</ButtonLink>
            <a className={styles.email} href={`mailto:${publicContactEmail}`}>{c.contact}: {publicContactEmail}</a>
          </div>
          <div className={styles.ctaArtwork} aria-hidden="true">
            <span className={`${styles.ctaSheet} ${styles.ctaSheetBack}`} />
            <span className={`${styles.ctaSheet} ${styles.ctaSheetMiddle}`} />
            <span className={`${styles.ctaSheet} ${styles.ctaSheetFront}`} />
          </div>
        </div>
      </section>
    </main>
  );
}
