import Image from "next/image";
import Link from "next/link";
import { AnimatedMarkHero } from "./hero-mark/AnimatedMarkHero";
import { HomeHeroScene } from "./hero-mark/HomeHeroScene";
import { RequestButtonPapers } from "./RequestButtonPapers";
import styles from "./HomeLandingPage.module.css";

type Locale = "en" | "de";

const content = {
  en: {
    hero: {
      eyebrow: "ESG support for manufacturers and suppliers",
      title: "Your customer needs ESG answers. We help you deliver them.",
      body: "Evipace is a Slovenia-based ESG service provider for manufacturers and suppliers in European supply chains. We turn your company records into prepared questionnaire answers, Scope 1 and 2 calculations, VSME reporting content and supporting evidence — ready for your review.",
      primary: "Send your request",
      secondary: "Explore our services"
    },
    problem: {
      label: "The challenge",
      title: "One request. Information across your business.",
      body: "The figures, policies and evidence a customer asks for often sit with different teams. We find what is available, work through what needs calculating and show which answers still need your input."
    },
    services: {
      label: "What we do",
      title: "The ESG work we can take off your desk.",
      intro: "Start with the request in front of you. We prepare the answers, calculations or documents your team needs to review.",
      items: [
        {
          title: "Customer requests and questionnaires",
          body: "We work through customer questions and supplier assessments, prepare answers and connect each claim to the company information behind it.",
          links: [
            ["Customer requests", "/en/esg-customer-requests"],
            ["ESG questionnaires", "/en/esg-questionnaire-support"],
            ["EcoVadis", "/en/ecovadis-support"],
            ["IntegrityNext", "/en/integritynext-support"]
          ]
        },
        {
          title: "Emissions and reporting",
          body: "We calculate Scope 1 and 2 emissions from your activity data and prepare a documented basis for voluntary reporting, including VSME.",
          links: [
            ["Scope 1 and 2", "/en/scope-1-2-calculation"],
            ["VSME reporting", "/en/vsme-sustainability-report"]
          ]
        },
        {
          title: "Evidence and policies",
          body: "We organise the documents behind ESG claims and draft policies for practices your company can confirm and approve.",
          links: [
            ["Evidence guide", "/en/resources/esg-evidence-for-suppliers"],
            ["Policy guide", "/en/resources/environmental-policy"]
          ]
        }
      ]
    },
    process: {
      label: "How we work",
      title: "Start with what you already have.",
      steps: [
        ["Upload the request", "Add the questionnaire, spreadsheet, PDF or screenshot you received. No new brief is needed."],
        ["We do the groundwork", "We map the questions to your records, calculate the figures and assemble the supporting material."],
        ["You confirm and use it", "Your company checks its facts, approves what needs sign-off and sends the final response."]
      ]
    },
    example: {
      label: "Illustrative example · not a client case",
      title: "From a question to a response you can check.",
      intro: "A simplified example of what we might prepare for your review.",
      rows: [
        ["Question", "What were your Scope 2 emissions in the reporting year?"],
        ["Draft response", "Wording based on your electricity data and a documented calculation."],
        ["Evidence", "Electricity invoices and the calculation sheet."],
        ["To confirm", "Reporting period and organisational boundary."]
      ]
    },
    result: {
      label: "Built to be useful again",
      first: "The questionnaire may change.",
      second: "The source records give you a starting point.",
      body: "Depending on the task, you receive a prepared response, documented calculation or reporting draft. Its sources, assumptions and open points stay visible, so the work can support your next request after checking its scope, period and continued validity.",
      link: "See our methodology"
    },
    about: {
      label: "Why Evipace",
      title: "Clear answers. Visible sources. Your approval.",
      body: "Practical ESG support for manufacturers and suppliers handling these requests alongside their day jobs.",
      points: [
        ["Start with existing records", "We use the files your teams already have and identify what is missing."],
        ["Show the basis", "Answers and calculations stay connected to sources and assumptions."],
        ["Keep control", "Your team confirms company facts before the final response is sent."]
      ],
      link: "About Evipace"
    },
    cta: {
      label: "Let's start",
      title: "Have an ESG request in your inbox?",
      body: "Upload the questionnaire, spreadsheet, PDF or screenshot you received. We’ll review the request and tell you what information is needed next.",
      button: "Send your request"
    }
  },
  de: {
    hero: {
      eyebrow: "ESG-Unterstützung für Hersteller und Zulieferer",
      title: "Ihr Kunde fragt nach ESG-Daten. Wir bereiten Ihre Antwort vor.",
      body: "Evipace ist ein ESG-Dienstleister aus Slowenien für Hersteller und Zulieferer in europäischen Lieferketten. Wir machen aus Ihren Unternehmensdaten vorbereitete Antworten auf ESG-Fragebögen, Scope-1- und Scope-2-Berechnungen, Inhalte für VSME-Berichte und passende Nachweise – zur Prüfung durch Ihr Team.",
      primary: "Anfrage senden",
      secondary: "Leistungen ansehen"
    },
    problem: {
      label: "Die Ausgangslage",
      title: "Eine Anfrage. Informationen aus mehreren Abteilungen.",
      body: "Kennzahlen, Richtlinien und Nachweise liegen oft bei verschiedenen Teams. Wir sichten, was vorhanden ist, berechnen die benötigten Werte und zeigen, wo Ihre Angaben noch fehlen."
    },
    services: {
      label: "Unsere Leistungen",
      title: "ESG-Aufgaben, die wir Ihnen abnehmen können.",
      intro: "Beginnen Sie mit der Anfrage, die jetzt vor Ihnen liegt. Wir bereiten Antworten, Berechnungen oder Unterlagen zur Prüfung durch Ihr Team vor.",
      items: [
        {
          title: "Kundenanfragen und Fragebögen",
          body: "Wir bearbeiten Kundenfragen und Lieferantenbewertungen, bereiten Antworten vor und verknüpfen jede Aussage mit den passenden Unternehmensinformationen.",
          links: [
            ["Kundenanfragen", "/de/esg-kundenanfragen"],
            ["ESG-Fragebögen", "/de/esg-fragebogen-lieferanten"],
            ["EcoVadis", "/de/ecovadis-unterstuetzung"],
            ["IntegrityNext", "/de/integritynext-unterstuetzung"]
          ]
        },
        {
          title: "Emissionen und Berichterstattung",
          body: "Wir berechnen Scope-1- und Scope-2-Emissionen anhand Ihrer Verbrauchsdaten und bereiten eine dokumentierte Grundlage für freiwillige Berichte, einschließlich VSME, vor.",
          links: [
            ["Scope 1 und 2", "/de/scope-1-2-berechnung"],
            ["VSME-Bericht", "/de/vsme-nachhaltigkeitsbericht"]
          ]
        },
        {
          title: "Nachweise und Richtlinien",
          body: "Wir ordnen die Belege hinter ESG-Angaben und entwerfen Richtlinien für Praktiken, die Ihr Unternehmen bestätigen und freigeben kann.",
          links: [
            ["Leitfaden zu Nachweisen", "/de/ressourcen/esg-nachweise-lieferanten"],
            ["Leitfaden zu Richtlinien", "/de/ressourcen/environmental-policy-erstellen"]
          ]
        }
      ]
    },
    process: {
      label: "Zusammenarbeit",
      title: "Beginnen Sie mit dem, was bereits vorliegt.",
      steps: [
        ["Anfrage hochladen", "Laden Sie den Fragebogen, eine Excel-Datei, ein PDF oder einen Screenshot hoch. Ein neues Briefing ist nicht nötig."],
        ["Wir leisten die Vorarbeit", "Wir ordnen die Fragen Ihren Unterlagen zu, berechnen Kennzahlen und stellen die Nachweise zusammen."],
        ["Sie prüfen und verwenden das Ergebnis", "Ihr Unternehmen bestätigt die Angaben, erteilt nötige Freigaben und versendet die endgültige Antwort."]
      ]
    },
    example: {
      label: "Beispiel · kein Kundenprojekt",
      title: "Von der Frage zur prüfbaren Antwort.",
      intro: "Ein vereinfachtes Beispiel dafür, was wir zur internen Prüfung vorbereiten könnten.",
      rows: [
        ["Frage", "Wie hoch waren Ihre Scope-2-Emissionen im Berichtsjahr?"],
        ["Antwortentwurf", "Formulierung auf Grundlage Ihrer Stromdaten und einer dokumentierten Berechnung."],
        ["Nachweise", "Stromrechnungen und Berechnungsdatei."],
        ["Zu bestätigen", "Berichtszeitraum und Unternehmensgrenze."]
      ]
    },
    result: {
      label: "Auch für die nächste Anfrage nützlich",
      first: "Der Fragebogen kann sich ändern.",
      second: "Ihre Quelldaten bilden den Ausgangspunkt.",
      body: "Je nach Aufgabe erhalten Sie einen Antwortentwurf, eine dokumentierte Berechnung oder einen Berichtsentwurf. Quellen, Annahmen und offene Punkte bleiben sichtbar – auch für die nächste Anfrage, nach Prüfung von Geltungsbereich, Zeitraum und Aktualität.",
      link: "Unsere Methodik ansehen"
    },
    about: {
      label: "Warum Evipace",
      title: "Klare Antworten. Sichtbare Quellen. Ihre Freigabe.",
      body: "Praktische ESG-Unterstützung für Hersteller und Zulieferer, die solche Anfragen neben dem Tagesgeschäft bearbeiten.",
      points: [
        ["Vorhandene Daten nutzen", "Wir beginnen mit Ihren bestehenden Unterlagen und zeigen, was noch fehlt."],
        ["Grundlage offenlegen", "Antworten und Berechnungen bleiben mit Quellen und Annahmen verknüpft."],
        ["Kontrolle behalten", "Ihr Team bestätigt die Unternehmensangaben vor dem Versand der endgültigen Antwort."]
      ],
      link: "Über Evipace"
    },
    cta: {
      label: "Jetzt beginnen",
      title: "Liegt bereits eine ESG-Anfrage in Ihrem Posteingang?",
      body: "Laden Sie den Fragebogen, die Excel-Datei, ein PDF oder einen Screenshot hoch. Wir prüfen die Anfrage und sagen Ihnen, welche Angaben als Nächstes benötigt werden.",
      button: "Anfrage senden"
    }
  }
} as const;

export function HomeLandingPage({ locale }: { locale: Locale }) {
  const copy = content[locale];
  const requestHref = `/${locale}/send-request`;
  const servicesId = locale === "de" ? "leistungen" : "services";

  return (
    <main className={styles.page} data-locale={locale}>
      <AnimatedMarkHero headingId="hero-title" locale={locale} showMark={false} visual={<HomeHeroScene locale={locale} />}>
        <p className={styles.heroEyebrow}>{copy.hero.eyebrow}</p>
        <h1 className="mark-hero__title font-display" id="hero-title">
          {copy.hero.title}
        </h1>
        <p className="mark-hero__body">{copy.hero.body}</p>
        <div className={styles.heroActions}>
          <Link className={`${styles.primaryButton} request-paper-hover`} href={requestHref}>
            <span>{copy.hero.primary}</span><span aria-hidden="true">↗</span>
            <RequestButtonPapers />
          </Link>
          <a className={styles.textLink} href={`#${servicesId}`}>
            {copy.hero.secondary}<span aria-hidden="true">↗</span>
          </a>
        </div>
      </AnimatedMarkHero>

      <section aria-labelledby="home-problem-title" className={`${styles.section} ${styles.problem}`}>
        <div className={`${styles.problemGrid} site-shell`}>
          <div className={styles.copyColumn}>
            <p className={styles.eyebrow}>{copy.problem.label}</p>
            <h2 className={styles.heading} id="home-problem-title">{copy.problem.title}</h2>
            <p className={styles.lead}>{copy.problem.body}</p>
          </div>
          <figure className={styles.problemImage}>
            <Image
              alt={locale === "de" ? "Unternehmensdaten und Nachweise werden gemeinsam geprüft" : "Colleagues reviewing company data and supporting evidence"}
              fill
              quality={88}
              sizes="(min-width: 900px) 46vw, 100vw"
              src="/images/evipace/methodology/evidence.webp"
            />
          </figure>
        </div>
      </section>

      <section aria-labelledby="home-services-title" className={`${styles.section} ${styles.services}`} id={servicesId}>
        <div className="site-shell">
          <div className={styles.sectionIntro}>
            <div>
              <p className={styles.eyebrow}>{copy.services.label}</p>
              <h2 className={styles.heading} id="home-services-title">{copy.services.title}</h2>
            </div>
            <p className={styles.introText}>{copy.services.intro}</p>
          </div>
          <div className={styles.serviceList}>
            {copy.services.items.map((item, index) => (
              <article className={styles.serviceRow} key={item.title}>
                <span aria-hidden="true" className={styles.serviceNumber}>0{index + 1}</span>
                <h3 className={styles.serviceTitle}>{item.title}</h3>
                <div className={styles.serviceDetail}>
                  <p>{item.body}</p>
                  <div className={styles.serviceLinks}>
                    {item.links.map(([label, href]) => (
                      <Link className={styles.smallLink} href={href} key={href}>
                        {label}<span aria-hidden="true">↗</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="home-process-title" className={`${styles.section} ${styles.process}`}>
        <div className={`${styles.processGrid} site-shell`}>
          <div>
            <p className={styles.eyebrow}>{copy.process.label}</p>
            <h2 className={styles.heading} id="home-process-title">{copy.process.title}</h2>
            <ol className={styles.steps}>
              {copy.process.steps.map(([title, body], index) => (
                <li className={styles.step} key={title}>
                  <span className={styles.stepNumber}>0{index + 1}</span>
                  <div><h3>{title}</h3><p>{body}</p></div>
                </li>
              ))}
            </ol>
          </div>
          <figure className={styles.processImage}>
            <Image
              alt={locale === "de" ? "Zwei Personen prüfen gemeinsam ESG-Unterlagen" : "Two people reviewing company ESG documents together"}
              fill
              quality={88}
              sizes="(min-width: 900px) 40vw, 100vw"
              src="/images/evipace/methodology/process.webp"
            />
          </figure>
        </div>
        <div className={`${styles.example} site-shell`}>
          <div className={styles.exampleCopy}>
            <p className={styles.eyebrow}>{copy.example.label}</p>
            <h3 className={styles.exampleTitle}>{copy.example.title}</h3>
            <p>{copy.example.intro}</p>
          </div>
          <dl className={styles.exampleCard}>
            {copy.example.rows.map(([term, description]) => (
              <div className={styles.exampleRow} key={term}>
                <dt>{term}</dt>
                <dd>{description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="home-result-title" className={styles.result}>
        <Image
          alt=""
          className={styles.resultImage}
          fill
          sizes="100vw"
          src="/images/evipace/methodology/emissions.webp?v=2"
          unoptimized
        />
        <div className={styles.resultScrim} />
        <div className={`${styles.resultContent} site-shell`}>
          <p className={styles.eyebrow}>{copy.result.label}</p>
          <h2 className={styles.statement} id="home-result-title">
            {copy.result.first}<br /><span>{copy.result.second}</span>
          </h2>
          <p>{copy.result.body}</p>
          <Link className={styles.resultLink} href={`/${locale}/methodology`}>
            {copy.result.link}<span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>

      <section aria-labelledby="home-about-title" className={`${styles.section} ${styles.about}`}>
        <div className="site-shell">
          <div className={styles.aboutIntro}>
            <div>
              <p className={styles.eyebrow}>{copy.about.label}</p>
              <h2 className={styles.heading} id="home-about-title">{copy.about.title}</h2>
            </div>
            <p className={styles.aboutLead}>{copy.about.body}</p>
          </div>
          <ul className={styles.aboutPoints}>
            {copy.about.points.map(([title, detail]) => (
              <li key={title}>
                <strong>{title}</strong>
                <span>{detail}</span>
              </li>
            ))}
          </ul>
          <div className={styles.aboutLink}>
            <Link className={styles.textLink} href={`/${locale}/about`}>
              {copy.about.link}<span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="home-cta-title" className={`${styles.section} ${styles.cta}`}>
        <div className={`${styles.ctaInner} site-shell`}>
          <div className={styles.ctaContent}>
            <p className={styles.eyebrow}>{copy.cta.label}</p>
            <h2 className={styles.heading} id="home-cta-title">{copy.cta.title}</h2>
            <p>{copy.cta.body}</p>
            <Link className={styles.primaryButton} href={requestHref}>
              {copy.cta.button}<span aria-hidden="true">↗</span>
            </Link>
          </div>
          <div aria-hidden="true" className={styles.ctaArtwork}>
            <div className={`${styles.ctaSheet} ${styles.ctaSheetBack}`}>
              <span className={styles.sheetLabel} />
              <span className={styles.sheetLines} />
              <span className={styles.sheetBlock} />
            </div>
            <div className={`${styles.ctaSheet} ${styles.ctaSheetMiddle}`}>
              <span className={styles.sheetLabel} />
              <span className={styles.sheetLines} />
              <span className={styles.sheetBlock} />
            </div>
            <div className={`${styles.ctaSheet} ${styles.ctaSheetFront}`}>
              <span className={styles.sheetLabel} />
              <span className={styles.sheetLines} />
              <span className={styles.sheetBlock} />
              <span className={styles.sheetStamp} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
