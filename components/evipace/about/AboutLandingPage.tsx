import Link from "next/link";
import { publicContactEmail } from "@/lib/company-info";
import h from "../HomeLandingPage.module.css";
import { ClosingCta } from "../home/ClosingCta";
import { RevealOnView } from "../home/RevealOnView";
import { ScrollProgress } from "../home/ScrollProgress";
import { TrustIllustration } from "../home/TrustIllustration";
import a from "./AboutLandingPage.module.css";

type Locale = "en" | "de";

const copy = {
  en: {
    heroLabel: "About Evipace",
    heroTitle: "ESG should not become more complicated than the task itself.",
    heroBody: "Evipace is an ESG service provider based in Ljubljana, Slovenia, helping manufacturers and suppliers prepare the answers, calculations and evidence their customers ask for.",
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
    founderRole: "Founder & Managing Director · Ljubljana, Slovenia",
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
    heroBody: "Evipace ist ein ESG-Dienstleister mit Sitz in Ljubljana, Slowenien. Wir helfen Herstellern und Zulieferern, Antworten, Berechnungen und Nachweise für die Anforderungen ihrer Kunden vorzubereiten.",
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
    founderRole: "Founder & Managing Director · Ljubljana, Slowenien",
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

const forwardLabel: Record<Locale, string> = {
  en: "Forward your request",
  de: "Anfrage weiterleiten"
};

const artLabel: Record<Locale, string> = {
  en: "Illustration: a folder, a document and an approval mark",
  de: "Illustration: eine Mappe, ein Dokument und ein Freigabezeichen"
};

/**
 * About, in the homepage's centred layout. The copy above is unchanged; the
 * page reuses the homepage styles (tokens, type, sections, closing CTA) and
 * only adds the founder card, the service links and the handover card.
 */
export function AboutLandingPage({ locale }: { locale: Locale }) {
  const c = copy[locale];
  const prefix = `/${locale}`;
  const resourcesHref = locale === "de" ? "/de/ressourcen" : "/en/resources";
  const quoteWords = c.whyQuote.split(" ");

  return (
    <main className={`${h.page} ${a.page}`} data-locale={locale}>
      <section aria-labelledby="about-title" className={`${h.hero} ${h.pageHero}`}>
        <div className={`${h.shell} ${h.heroGrid}`}>
          <div className={h.heroCopy}>
            <p className={h.eyebrow}>{c.heroLabel}</p>
            <h1 className={`${h.display} ${a.title}`} id="about-title">{c.heroTitle}</h1>
            <p className={h.heroBody}>{c.heroBody}</p>
            <div className={h.actions}>
              <a className={h.jumpLink} href="#why">{c.heroAction}</a>
              <Link className={h.textLink} href={`${prefix}/methodology`}>
                {c.methodology}<span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="why-title" className={`${h.section} ${a.anchored}`} id="why">
        <RevealOnView className={h.shell}>
          <header className={h.sectionHead}>
            <p className={h.eyebrow}>{c.whyLabel}</p>
            <h2 className={h.heading} id="why-title">{c.whyTitle}</h2>
            <p className={h.lead}>{c.whyBody}</p>
          </header>
        </RevealOnView>
        <ScrollProgress className={h.shell}>
          <p className={`${h.statement} ${a.quote}`} style={{ "--n": quoteWords.length } as React.CSSProperties}>
            {quoteWords.map((word, index) => (
              <span className={h.word} key={`${index}-${word}`} style={{ "--i": index } as React.CSSProperties}>
                {word}{" "}
              </span>
            ))}
          </p>
        </ScrollProgress>
      </section>

      <section aria-labelledby="approach-title" className={`${h.section} ${h.orangeBand}`}>
        <RevealOnView className={h.shell}>
          <header className={h.sectionHead}>
            <p className={h.eyebrow}>{c.approachLabel}</p>
            <h2 className={h.heading} id="approach-title">{c.approachTitle}</h2>
            <p className={h.lead}>{c.approachIntro}</p>
          </header>
          <ol className={h.steps}>
            {c.approachItems.map(([title, body], index) => (
              <li className={h.step} key={title} style={{ "--i": index } as React.CSSProperties}>
                <span aria-hidden="true" className={h.stepNumber}>{index + 1}</span>
                <h3 className={h.cardTitle}>{title}</h3>
                <p>{body}</p>
              </li>
            ))}
          </ol>
        </RevealOnView>
      </section>

      <section aria-labelledby="founder-title" className={h.section}>
        <RevealOnView className={h.shell}>
          <header className={h.sectionHead}>
            <p className={h.eyebrow}>{c.founderLabel}</p>
            <h2 className={h.heading} id="founder-title">{c.founderTitle}</h2>
          </header>
          <div className={a.founder}>
            <div className={a.founderCopy}>
              <p>{c.founderBody}</p>
              <p className={a.founderNote}>{c.founderNote}</p>
            </div>
            <aside aria-label={c.founderContact} className={a.contact}>
              <p className={a.contactLabel}>{c.founderContact}</p>
              <p className={a.contactName}>Tim Kogej</p>
              <p className={a.contactRole}>{c.founderRole}</p>
              <a className={h.pillButton} href="tel:+38668663410">
                {c.founderCall}
                <span aria-hidden="true" className={h.pillArrow}><span className={h.arrowGlyph}>→</span></span>
              </a>
              <a className={a.phone} href="tel:+38668663410">+386 68 663 410</a>
            </aside>
          </div>
        </RevealOnView>
      </section>

      <section aria-labelledby="services-title" className={`${h.section} ${h.tinted}`}>
        <RevealOnView className={h.shell}>
          <header className={h.sectionHead}>
            <p className={h.eyebrow}>{c.servicesLabel}</p>
            <h2 className={h.heading} id="services-title">{c.servicesTitle}</h2>
            <p className={h.lead}>{c.servicesIntro}</p>
          </header>
          <ul className={h.cards}>
            {c.serviceLinks.map(([title, href], index) => (
              <li key={href} style={{ "--i": index } as React.CSSProperties}>
                <Link className={a.serviceLink} href={href}>
                  <span>{title}</span>
                  <span aria-hidden="true" className={a.serviceArrow}>→</span>
                </Link>
              </li>
            ))}
          </ul>
          <aside aria-label={c.handoverLabel} className={a.handover}>
            <span className={h.badge}>{c.handoverLabel}</span>
            <h3 className={a.handoverTitle}>{c.handoverTitle}</h3>
            <p>{c.handoverBody}</p>
          </aside>
        </RevealOnView>
      </section>

      <section aria-labelledby="manufacturing-title" className={`${h.section} ${a.dark}`}>
        <RevealOnView className={h.shell}>
          <header className={h.sectionHead}>
            <p className={h.eyebrow}>{c.manufacturingLabel}</p>
            <h2 className={h.heading} id="manufacturing-title">{c.manufacturingTitle}</h2>
            <p className={h.lead}>{c.manufacturingBody}</p>
          </header>
        </RevealOnView>
      </section>

      <section aria-labelledby="trust-title" className={h.section}>
        <RevealOnView className={h.shell}>
          <header className={h.sectionHead}>
            <p className={h.eyebrow}>{c.trustLabel}</p>
            <h2 className={h.heading} id="trust-title">{c.trustTitle}</h2>
            <TrustIllustration label={artLabel[locale]} />
          </header>
          <div className={a.trust}>
            <p>{c.trustBody}</p>
            <p className={a.boundary}>{c.trustBoundary}</p>
            <div className={a.links}>
              <Link className={h.textLink} href={`${prefix}/methodology`}>
                {c.methodology}<span aria-hidden="true">→</span>
              </Link>
              <Link className={h.textLink} href={resourcesHref}>
                {c.resources}<span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </RevealOnView>
      </section>

      <ClosingCta
        body={
          <>
            <p>{c.ctaBody}</p>
            <p>
              <a className={a.email} href={`mailto:${publicContactEmail}`}>
                {c.contact}: {publicContactEmail}
              </a>
            </p>
          </>
        }
        formHref={`${prefix}/send-request`}
        formLabel={c.ctaButton}
        forwardLabel={forwardLabel[locale]}
        slogan={c.ctaLabel}
        title={c.ctaTitle}
      />
    </main>
  );
}
