import { Reveal } from "../Reveal";

const faqs = [
  {
    question: "Was ist ein VSME-Nachhaltigkeitsbericht?",
    answer:
      "VSME bezeichnet den freiwilligen europäischen Berichtsrahmen, der ursprünglich speziell für nicht börsennotierte kleine und mittlere Unternehmen entwickelt wurde. Auf dieser Grundlage hat die Europäische Kommission 2026 den neuen Voluntary Standard für freiwillige Nachhaltigkeitsberichterstattung angenommen. Er ermöglicht Unternehmen außerhalb der verpflichtenden Nachhaltigkeitsberichterstattung, Umwelt-, Sozial- und Governance-Informationen in einer standardisierten und verhältnismäßigen Form aufzubereiten."
  },
  {
    question: "Ist ein VSME-Bericht verpflichtend?",
    answer:
      "Nein. Der freiwillige Standard schafft keine allgemeine gesetzliche Pflicht für die Unternehmen, für die er vorgesehen ist, einen Nachhaltigkeitsbericht zu veröffentlichen. Unternehmen können ihn freiwillig verwenden, beispielsweise um eigene Nachhaltigkeitsinformationen zu strukturieren oder Anforderungen von Kunden, Banken und anderen Stakeholdern besser bedienen zu können."
  },
  {
    question: "Was hat sich 2026 beim VSME geändert?",
    answer:
      "Die Europäische Kommission hat auf Grundlage des bisherigen VSME einen neuen europäischen Voluntary Standard angenommen. Die modulare Grundstruktur bleibt bestehen, der regulatorische Rahmen und die Zielgruppe wurden jedoch im Zuge der Änderungen der europäischen Nachhaltigkeitsberichterstattung weiterentwickelt. Für neue Projekte berücksichtigen wir deshalb den jeweils aktuellen Stand und nicht ausschließlich den ursprünglichen VSME-Rahmen von 2025."
  },
  {
    question: "Für welche Unternehmen ist der neue Voluntary Standard gedacht?",
    answer:
      "Der 2026 angenommene Voluntary Standard ist für Unternehmen außerhalb der verpflichtenden Nachhaltigkeitsberichterstattung vorgesehen, die im vorausgegangenen Geschäftsjahr durchschnittlich nicht mehr als 1.000 Beschäftigte hatten. Ob und wie der Standard für Ihr Unternehmen sinnvoll eingesetzt werden kann, hängt dennoch von Ihrer konkreten Situation und Ihrem Berichtsziel ab."
  },
  {
    question: "Was ist der Unterschied zwischen Basic und Comprehensive Module?",
    answer:
      "Das Basic Module enthält die grundlegenden Angaben und Kennzahlen zu Umwelt-, Sozial- und Governance-Themen. Das Comprehensive Module ergänzt diese Basis um weiterführende Informationen, beispielsweise zu Strategie, Klimazielen, Klimarisiken, Menschenrechten und zusätzlichen Unternehmenskennzahlen. Das Comprehensive Module baut auf dem Basic Module auf."
  },
  {
    question: "Welche Daten benötigen wir für einen VSME-Bericht?",
    answer:
      "Das hängt vom gewählten Umfang ab. Typischerweise werden unter anderem Unternehmensdaten, Energieverbrauch, Emissionsinformationen, Umweltkennzahlen, Beschäftigtendaten, Arbeitsschutzinformationen sowie Angaben zu bestehenden Richtlinien und Maßnahmen benötigt. Wir strukturieren zu Beginn, welche Daten für Ihr konkretes Projekt tatsächlich erforderlich sind."
  },
  {
    question: "Müssen wir Scope 1 und Scope 2 bereits berechnet haben?",
    answer:
      "Nein. Wenn die notwendigen Ausgangsdaten vorhanden sind, können die relevanten Berechnungen im Rahmen des Projekts vorbereitet werden. Dafür werden beispielsweise Verbrauchsdaten zu Brennstoffen und eingekauftem Strom benötigt."
  },
  {
    question: "Brauchen wir bereits fertige ESG-Richtlinien?",
    answer:
      "Nicht zwingend. Der Bericht sollte die tatsächliche Situation des Unternehmens abbilden. Wenn bestimmte Richtlinien bereits bestehen, können sie berücksichtigt werden. Wenn relevante Strukturen fehlen, wird dies transparent sichtbar gemacht. Wir erstellen keine fingierten oder rückdatierten Dokumente, um einen vollständigeren Bericht vorzutäuschen."
  },
  {
    question: "Ist ein VSME-Bericht dasselbe wie ein CSRD-Bericht?",
    answer:
      "Nein. Der freiwillige Standard ist ein eigenständiger, vereinfachter Berichtsrahmen für Unternehmen außerhalb der verpflichtenden Nachhaltigkeitsberichterstattung. Er ist nicht dasselbe wie die ESRS-Berichterstattung eines CSRD-pflichtigen Unternehmens. Ein freiwilliger Bericht macht ein Unternehmen daher nicht automatisch CSRD-konform."
  },
  {
    question: "Kann ein VSME-Bericht für Kundenanfragen genutzt werden?",
    answer:
      "Ja, als strukturierte Datengrundlage kann er sehr hilfreich sein. Viele Informationen zu Energie, Emissionen, Mitarbeitenden, Richtlinien oder Governance können bei späteren Kundenanfragen erneut verwendet werden. Ein VSME-Bericht beantwortet jedoch nicht automatisch jede kundenspezifische Anfrage oder jeden Plattformfragebogen vollständig."
  },
  {
    question: "Können Sie den vollständigen Bericht für uns erstellen?",
    answer:
      "Ja. evipace kann den Prozess von der Strukturierung der benötigten Informationen über Datenaufbereitung und relevante Kennzahlen bis zur Zusammenführung des Berichts begleiten. Die Unternehmensangaben werden vor finaler Verwendung von Ihnen geprüft und bestätigt."
  },
  {
    question: "Wie lange dauert die Erstellung?",
    answer:
      "Das hängt vor allem vom gewählten Berichtsumfang, der Verfügbarkeit der Daten und der Anzahl offener Punkte ab. Nach einer ersten Sichtung Ihrer Ausgangslage können wir den notwendigen Aufwand und einen realistischen Zeitrahmen einschätzen."
  }
];

export function Faq() {
  return (
    <section className="section-padding bg-white">
      <div className="site-shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Häufige Fragen</p>
          <h2 className="heading-md font-display mt-6 max-w-[20ch]">
            Häufige Fragen zum VSME-Nachhaltigkeitsbericht
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
