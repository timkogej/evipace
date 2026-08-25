import { Reveal } from "../Reveal";

const faqs = [
  {
    question: "Was ist EcoVadis?",
    answer:
      "EcoVadis ist eine Plattform für Nachhaltigkeitsbewertungen von Unternehmen. Im Rahmen der Bewertung werden Informationen und Nachweise zu verschiedenen Nachhaltigkeitsthemen abgefragt und anschließend in einer Scorecard bewertet."
  },
  {
    question: "Ist der EcoVadis-Fragebogen für jedes Unternehmen gleich?",
    answer:
      "Nein. Der konkrete Fragebogen hängt vom Unternehmensprofil ab. Deshalb sollte die Vorbereitung immer auf Basis des tatsächlich zugewiesenen Assessments erfolgen."
  },
  {
    question: "Welche Dokumente brauche ich für EcoVadis?",
    answer:
      "Das hängt von den konkreten Fragen ab. Relevant können beispielsweise Richtlinien, Zertifikate, Kennzahlen, Berichte, Verfahrensbeschreibungen oder andere formalisierte Unternehmensdokumente sein. Entscheidend ist, dass der jeweilige Nachweis zur entsprechenden Aussage passt."
  },
  {
    question: "Können Sie den EcoVadis-Fragebogen für uns ausfüllen?",
    answer:
      "Wir können einen großen Teil der operativen Vorbereitung von Antworten, Daten und Nachweisen übernehmen. Aussagen, die eine interne Bestätigung, Freigabe oder Entscheidung Ihres Unternehmens erfordern, müssen von Ihnen geprüft und bestätigt werden."
  },
  {
    question: "Können Sie fehlende Richtlinien erstellen?",
    answer:
      "Wenn tatsächlich eine relevante Unternehmensrichtlinie fehlt, kann dies als Verbesserungspunkt identifiziert werden. Auf Wunsch können wir bei der strukturierten Ausarbeitung realer Unternehmensdokumente unterstützen. Wir erstellen jedoch keine fingierten oder rückdatierten Dokumente ausschließlich mit dem Ziel, sie als Nachweis in einer Bewertung zu verwenden."
  },
  {
    question: "Können Sie unseren EcoVadis-Score verbessern?",
    answer:
      "Wir können dazu beitragen, dass vorhandene Informationen und Nachweise strukturierter und nachvollziehbarer vorbereitet werden. Eine bestimmte Punktzahl, Medaille oder Verbesserung des EcoVadis-Scores können wir jedoch nicht garantieren."
  },
  {
    question: "Sind Sie offizieller EcoVadis-Partner?",
    answer:
      "Nein. evipace ist ein unabhängiger Dienstleister und nicht mit EcoVadis verbunden oder von EcoVadis akkreditiert."
  },
  {
    question: "Können Sie auch bei einer erneuten Bewertung helfen?",
    answer:
      "Ja. Wenn bereits eine Scorecard vorhanden ist, kann diese als Ausgangspunkt genutzt werden, um bestehende Dokumentation, offene Punkte und reale Verbesserungen seit der letzten Bewertung strukturiert zu prüfen."
  },
  {
    question: "Muss unser Unternehmen bereits ein vollständiges ESG-System haben?",
    answer:
      "Nein. Viele relevante Informationen, Richtlinien und Nachweise existieren bereits in verschiedenen Bereichen des Unternehmens. Wir starten mit dem tatsächlichen Assessment und prüfen, was bereits vorhanden ist und was noch fehlt."
  },
  {
    question: "Wie lange dauert die Vorbereitung?",
    answer:
      "Das hängt vom Umfang des Fragebogens, der vorhandenen Dokumentation und der Anzahl offener Punkte ab. Nach Sichtung des Assessments und der vorhandenen Unterlagen kann der Aufwand und ein realistischer Zeitrahmen eingeschätzt werden."
  }
];

export function Faq() {
  return (
    <section className="section-padding bg-white">
      <div className="site-shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Häufige Fragen</p>
          <h2 className="heading-md font-display mt-6 max-w-[20ch]">
            Häufige Fragen zur EcoVadis-Unterstützung
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-3">
          {faqs.map((faq, index) => (
            <Reveal delay={index * 0.03} key={faq.question}>
              <details className="group rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-[var(--paper)] px-6 py-5 shadow-[0_10px_30px_rgba(21,21,21,0.04)]">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold text-ink marker:content-none">
                  {faq.question}
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-2xl leading-none text-orange transition-transform duration-200 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-4 leading-7 text-muted">{faq.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
