import h from "../HomeLandingPage.module.css";
import { RevealOnView } from "../home/RevealOnView";
import sp from "./ServicePage.module.css";

type PreviewContent = {
  eyebrow: string;
  title: string;
  intro: string;
  roles: Array<{ label: string; text: string }>;
  sampleLabel: string;
  sampleTitle: string;
  requestLabel: string;
  request: string;
  answerLabel: string;
  answer: string;
  sourceLabel: string;
  source: string;
  reviewLabel: string;
  review: string;
  gap: string;
};

const previews: Record<"en" | "de", Record<"questionnaire" | "ecovadis", PreviewContent>> = {
  en: {
    questionnaire: {
      eyebrow: "A review-ready handover",
      title: "We prepare the response. You confirm the company facts.",
      intro: "A typical handover keeps each draft answer connected to its source and shows exactly what still needs your decision.",
      roles: [
        { label: "You send", text: "The customer questionnaire, deadline and records already available." },
        { label: "Evipace prepares", text: "Draft answers, source links and a short list of gaps or decisions." },
        { label: "You confirm", text: "Company-specific facts and the final response before it is sent." }
      ],
      sampleLabel: "Illustrative example · not a client case",
      sampleTitle: "One line of a prepared questionnaire",
      requestLabel: "Customer question",
      request: "How much electricity did the assessed site use in the reporting year?",
      answerLabel: "Draft response",
      answer: "[Verified total] kWh for [site] in [year]. The value remains a placeholder until the source records are checked.",
      sourceLabel: "Source to check",
      source: "Monthly electricity invoices or a meter export, if available.",
      reviewLabel: "Your confirmation",
      review: "Site, reporting period, units and any missing months.",
      gap: "If the records are incomplete, the item stays open rather than becoming a guessed number."
    },
    ecovadis: {
      eyebrow: "A review-ready handover",
      title: "We prepare answers and evidence. Your company approves the facts and submits.",
      intro: "The output connects a proposed answer to the document that may support it, with scope and missing evidence visible before submission.",
      roles: [
        { label: "You send", text: "The current assessment context and documents your teams already hold." },
        { label: "Evipace prepares", text: "Draft response material, evidence mapping and an explicit gap list." },
        { label: "You confirm", text: "Actual practices, document scope and final platform submission." }
      ],
      sampleLabel: "Illustrative example · not a client case or EcoVadis question",
      sampleTitle: "One item in an assessment preparation pack",
      requestLabel: "Topic to verify",
      request: "Energy consumption for the assessed site and period.",
      answerLabel: "Prepared response material",
      answer: "[Verified energy figure and explanation] — only after source data and assessment scope are confirmed.",
      sourceLabel: "Possible evidence",
      source: "An existing energy report and underlying invoices, if available and relevant.",
      reviewLabel: "Your confirmation",
      review: "Entity or site, reporting period and whether the selected answer reflects actual practice.",
      gap: "If a supporting document is missing, the gap is recorded; no acceptance or score is implied."
    }
  },
  de: {
    questionnaire: {
      eyebrow: "Übergabe zur internen Prüfung",
      title: "Wir bereiten die Antwort vor. Sie bestätigen die Unternehmensangaben.",
      intro: "In der Übergabe bleibt jede vorbereitete Antwort mit ihrer Quelle verbunden. Offene Angaben und Entscheidungen sind klar markiert.",
      roles: [
        { label: "Sie senden", text: "Den Kundenfragebogen, die Frist und bereits vorhandene Unterlagen." },
        { label: "Evipace bereitet vor", text: "Antwortentwürfe, Quellenzuordnung und eine gezielte Liste offener Punkte." },
        { label: "Sie bestätigen", text: "Unternehmensangaben und die finale Antwort vor der Weitergabe." }
      ],
      sampleLabel: "Illustratives Beispiel · kein Kundenfall",
      sampleTitle: "Eine Zeile aus einem vorbereiteten Fragebogen",
      requestLabel: "Kundenfrage",
      request: "Wie viel Strom hat der bewertete Standort im Berichtsjahr verbraucht?",
      answerLabel: "Antwortentwurf",
      answer: "[Geprüfter Gesamtwert] kWh für [Standort] im Jahr [Berichtsjahr]. Bis zur Prüfung der Quelldaten bleibt der Wert offen.",
      sourceLabel: "Zu prüfende Quelle",
      source: "Monatliche Stromrechnungen oder Zählerexport, falls vorhanden.",
      reviewLabel: "Ihre Bestätigung",
      review: "Standort, Berichtszeitraum, Einheit und eventuell fehlende Monate.",
      gap: "Bei unvollständigen Unterlagen bleibt die Angabe offen, statt durch einen Schätzwert ersetzt zu werden."
    },
    ecovadis: {
      eyebrow: "Übergabe zur internen Prüfung",
      title: "Wir bereiten Antworten und Nachweise vor. Ihr Unternehmen bestätigt und reicht ein.",
      intro: "Das Ergebnis verknüpft eine mögliche Antwort mit passenden vorhandenen Dokumenten. Bewertungsumfang und Nachweislücken bleiben vor der Einreichung sichtbar.",
      roles: [
        { label: "Sie senden", text: "Den aktuellen Assessment-Kontext und vorhandene Unterlagen." },
        { label: "Evipace bereitet vor", text: "Antwortmaterial, Nachweiszuordnung und eine klare Lückenliste." },
        { label: "Sie bestätigen", text: "Tatsächliche Praxis, Geltungsbereich und finale Einreichung." }
      ],
      sampleLabel: "Illustratives Beispiel · kein Kundenfall und keine EcoVadis-Frage",
      sampleTitle: "Ein Punkt aus der Assessment-Vorbereitung",
      requestLabel: "Zu prüfendes Thema",
      request: "Energieverbrauch für den bewerteten Standort und Zeitraum.",
      answerLabel: "Vorbereitetes Antwortmaterial",
      answer: "[Geprüfter Energiewert und Erläuterung] — erst nach Bestätigung der Quelldaten und des Assessment Scope.",
      sourceLabel: "Möglicher Nachweis",
      source: "Vorhandene Energieauswertung und zugrunde liegende Rechnungen, sofern relevant und verfügbar.",
      reviewLabel: "Ihre Bestätigung",
      review: "Gesellschaft oder Standort, Berichtszeitraum und Übereinstimmung mit der tatsächlichen Praxis.",
      gap: "Fehlt ein belastbarer Nachweis, bleibt die Lücke sichtbar. Eine Anerkennung oder Punktzahl wird nicht zugesagt."
    }
  }
};

export function IllustrativeHandover({
  locale,
  service
}: {
  locale: "en" | "de";
  service: "questionnaire" | "ecovadis";
}) {
  const content = previews[locale][service];
  const headingId = `${locale}-${service}-handover-title`;

  return (
    <section aria-labelledby={headingId} className={`${h.tokens} ${h.section} ${h.tinted}`}>
      <RevealOnView className={h.shell}>
        <header className={h.sectionHead}>
          <p className={h.eyebrow}>{content.eyebrow}</p>
          <h2 className={h.heading} id={headingId}>{content.title}</h2>
          <p className={h.lead}>{content.intro}</p>
        </header>
        <ol className={`${h.steps} ${sp.roles}`}>
          {content.roles.map((role, index) => (
            <li className={h.step} key={role.label} style={{ "--i": index } as React.CSSProperties}>
              <span aria-hidden="true" className={h.stepNumber}>{index + 1}</span>
              <h3 className={h.cardTitle}>{role.label}</h3>
              <p>{role.text}</p>
            </li>
          ))}
        </ol>
        <figure className={`${h.exampleCard} ${sp.handoverCard}`}>
          <figcaption className={h.exampleHead}>
            <span className={h.panelTitle}>{content.sampleTitle}</span>
            <span className={h.badge}>{content.sampleLabel}</span>
          </figcaption>
          <dl className={h.exampleRows}>
            {[
              [content.requestLabel, content.request],
              [content.answerLabel, content.answer],
              [content.sourceLabel, content.source],
              [content.reviewLabel, content.review]
            ].map(([label, value]) => (
              <div className={h.exampleRow} key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <p className={sp.gapNote}>{content.gap}</p>
        </figure>
      </RevealOnView>
    </section>
  );
}
