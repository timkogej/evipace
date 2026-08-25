import { Reveal } from "../Reveal";

const faqs = [
  {
    question: "Warum fragen unsere Kunden plötzlich ESG-Daten ab?",
    answer:
      "Größere Unternehmen benötigen zunehmend Nachhaltigkeitsinformationen aus ihrer Lieferkette. Die Gründe können von internen Beschaffungs- und Risikoprozessen über Kundenanforderungen bis hin zu eigenen Reporting- und Nachhaltigkeitszielen reichen. Für Lieferanten bedeutet das häufig, dass zusätzliche Daten, Richtlinien oder Nachweise bereitgestellt werden müssen."
  },
  {
    question: "Welche ESG-Daten müssen Lieferanten typischerweise bereitstellen?",
    answer:
      "Das hängt vom jeweiligen Kunden ab. Häufig gefragt werden Informationen zu Energieverbrauch, Emissionen, Umwelt, Mitarbeitenden, Governance, Zertifikaten und bestehenden Richtlinien. Entscheidend ist jedoch immer die konkrete Kundenanforderung."
  },
  {
    question: "Müssen wir bereits einen Nachhaltigkeitsbericht haben?",
    answer:
      "Nein. Viele ESG-Kundenanfragen können auf Basis vorhandener Unternehmensdaten, Dokumente und Nachweise bearbeitet werden, auch wenn noch kein formeller Nachhaltigkeitsbericht existiert."
  },
  {
    question: "Was passiert, wenn wir noch keine ESG-Struktur im Unternehmen haben?",
    answer:
      "Dann starten wir mit der konkreten Kundenanfrage. Wir prüfen, welche Informationen tatsächlich benötigt werden, welche davon bereits vorhanden sind und was noch ergänzt werden muss. Sie müssen nicht zuerst ein vollständiges internes ESG-System aufbauen."
  },
  {
    question: "Können Sie auch einzelne ESG-Anfragen bearbeiten?",
    answer:
      "Ja. Die Unterstützung kann sich auf eine konkrete Kundenanfrage beschränken. Ein umfangreiches langfristiges Projekt ist dafür nicht zwingend erforderlich."
  },
  {
    question: "Unterstützen Sie auch kundenspezifische Excel-Dateien?",
    answer:
      "Ja. Wir können Anforderungen aus Excel-Dateien, PDFs, Word-Dokumenten, E-Mails oder anderen kundenspezifischen Formaten strukturieren."
  },
  {
    question: "Können Sie fehlende CO₂-Daten berechnen?",
    answer:
      "Wenn die notwendigen Aktivitätsdaten und Informationen vorhanden sind, können beispielsweise Scope-1- und Scope-2-Berechnungen Teil der Unterstützung sein. Ob und welche Berechnungen sinnvoll sind, hängt von der konkreten Kundenanforderung ab."
  },
  {
    question: "Können Sie garantieren, dass unser Kunde die Antwort akzeptiert?",
    answer:
      "Nein. evipace unterstützt bei der strukturierten Vorbereitung von Daten, Nachweisen und Antworten. Eine bestimmte Bewertung oder die Akzeptanz durch einen Kunden, eine Plattform oder eine andere externe Stelle kann nicht garantiert werden."
  },
  {
    question: "Wie schnell können Sie eine ESG-Kundenanfrage bearbeiten?",
    answer:
      "Das hängt vom Umfang der Anfrage und der Verfügbarkeit der benötigten Informationen ab. Nach Sichtung der Kundenanforderung können wir den benötigten Aufwand und einen realistischen Zeitrahmen einschätzen."
  }
];

export function Faq() {
  return (
    <section className="section-padding bg-[var(--warm)]">
      <div className="site-shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Häufige Fragen</p>
          <h2 className="heading-md font-display mt-6 max-w-[20ch]">
            Häufige Fragen zu ESG-Anforderungen von Kunden
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-3">
          {faqs.map((faq, index) => (
            <Reveal delay={index * 0.03} key={faq.question}>
              <details className="group rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white px-6 py-5 shadow-[0_10px_30px_rgba(21,21,21,0.04)]">
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
