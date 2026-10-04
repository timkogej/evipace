import { getServiceBuyerQuestions } from "@/lib/seo/service-buyer-questions";
import { Reveal } from "../Reveal";

const faqs = [
  ...getServiceBuyerQuestions("de", "esgFragebogenLieferanten"),
  {
    question: "Was ist ein ESG-Fragebogen für Lieferanten?",
    answer:
      "Mit einem ESG- oder Nachhaltigkeitsfragebogen fragen Kunden Informationen zur Umweltleistung, zu sozialen Themen und zur Unternehmensführung ihrer Lieferanten ab. Dazu können beispielsweise Energieverbrauch, CO₂-Emissionen, Richtlinien, Zertifikate, Arbeitsschutz oder Governance-Themen gehören."
  },
  {
    question: "Können Sie einen ESG-Fragebogen vollständig für uns ausfüllen?",
    answer:
      "Wir können einen großen Teil der operativen Vorbereitung übernehmen, sofern die benötigten Informationen und Nachweise verfügbar oder aus vorhandenen Daten ableitbar sind. Wenn eine Frage eine interne Entscheidung, Bestätigung oder noch fehlende Information erfordert, wird dies klar gekennzeichnet."
  },
  {
    question: "Welche Unterlagen müssen wir bereitstellen?",
    answer:
      "Sie müssen das nicht im Voraus vollständig wissen. Am einfachsten starten wir mit dem Fragebogen oder der Kundenanfrage. Danach lässt sich gezielt bestimmen, welche Daten und Dokumente benötigt werden."
  },
  {
    question: "Unterstützen Sie auch Excel-Fragebögen?",
    answer:
      "Ja. Wir können Anforderungen aus Excel-, PDF- und Word-Dateien sowie anderen kundenspezifischen Formaten strukturiert bearbeiten."
  },
  {
    question: "Können Sie bei EcoVadis oder IntegrityNext helfen?",
    answer:
      "Wir können bei der Vorbereitung der benötigten Daten, Dokumente und Nachweise unterstützen. Evipace ist nicht mit EcoVadis oder IntegrityNext verbunden und garantiert weder eine bestimmte Bewertung noch die Annahme durch eine Plattform."
  },
  {
    question: "Was passiert, wenn uns Daten fehlen?",
    answer:
      "Fehlende Informationen werden klar sichtbar gemacht. Anschließend unterscheiden wir, welche Angaben aus vorhandenen Daten berechnet werden können, welche Dokumente noch beschafft werden sollten und wo eine interne Bestätigung erforderlich ist."
  },
  {
    question: "Können Sie Scope 1 und Scope 2 für den Fragebogen vorbereiten?",
    answer:
      "Wenn die benötigten Aktivitätsdaten verfügbar sind, kann die Vorbereitung von Scope-1- und Scope-2-Berechnungen Teil der Unterstützung sein. Dazu können beispielsweise Strom-, Brennstoff- und Kraftstoffdaten gehören."
  },
  {
    question: "Wie schnell kann ein ESG-Fragebogen bearbeitet werden?",
    answer:
      "Das hängt vom Umfang der Anfrage, der Anzahl der Fragen und der Verfügbarkeit der benötigten Informationen ab. Nach Sichtung des Fragebogens kann der Aufwand und ein realistischer Zeitrahmen eingeschätzt werden."
  }
];

/**
 * Plain on-page <details>/<summary> — no FAQPage schema. The brief is
 * explicit that FAQ schema should not be added just to chase rich results;
 * the content itself lives on the page.
 */
export function Faq() {
  return (
    <section className="section-padding bg-[var(--warm)]">
      <div className="site-shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Häufige Fragen</p>
          <h2 className="type-heading font-display mt-6 max-w-[24ch]">
            Häufige Fragen zu ESG-Fragebögen für Lieferanten
          </h2>
        </Reveal>

        <div className="faq-list">
          {faqs.map((faq, index) => (
            <Reveal delay={index * 0.03} key={faq.question}>
              <details className="faq-item group">
                <summary className="faq-question">
                  {faq.question}
                  <span aria-hidden="true" className="faq-toggle" />
                </summary>
                <p className="faq-answer">{faq.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
