import { Reveal } from "../Reveal";

const faqs = [
  {
    question: "Was ist Scope 1?",
    answer:
      "Scope 1 umfasst direkte Treibhausgasemissionen aus Quellen, die dem Unternehmen gehören oder von ihm kontrolliert werden. Dazu können beispielsweise Emissionen aus Erdgas, Heizöl, dem eigenen Fuhrpark, bestimmten Produktionsprozessen oder Kältemittelverlusten gehören."
  },
  {
    question: "Was ist Scope 2?",
    answer:
      "Scope 2 umfasst indirekte Treibhausgasemissionen aus eingekaufter oder bezogener Energie. Für viele Unternehmen betrifft das vor allem eingekauften Strom. Je nach Betrieb können auch Fernwärme, Fernkälte oder andere eingekaufte Energieformen relevant sein."
  },
  {
    question: "Was ist der Unterschied zwischen Scope 1, Scope 2 und Scope 3?",
    answer:
      "Scope 1 umfasst direkte Emissionen aus eigenen oder kontrollierten Quellen. Scope 2 umfasst indirekte Emissionen aus eingekaufter Energie. Scope 3 umfasst weitere indirekte Emissionen entlang der vor- und nachgelagerten Wertschöpfungskette. Diese Seite konzentriert sich auf Scope 1 und Scope 2."
  },
  {
    question: "Welche Daten benötigen Sie für die Berechnung?",
    answer:
      "Das hängt von Ihren Emissionsquellen ab. Typischerweise benötigen wir unter anderem Stromverbrauch, Brennstoffverbräuche, Fuhrparkdaten, Informationen zu Kältemitteln und gegebenenfalls Daten zu Fernwärme oder anderen Energieformen. Zu Beginn prüfen wir gemeinsam, welche Daten für Ihr Unternehmen tatsächlich relevant sind."
  },
  {
    question: "Können Sie Scope 1 und Scope 2 aus unseren Rechnungen berechnen?",
    answer:
      "In vielen Fällen bilden Rechnungen und Verbrauchsübersichten einen wichtigen Teil der Datengrundlage. Entscheidend ist, dass die notwendigen Aktivitätsdaten wie Verbrauchsmenge, Einheit und Zeitraum daraus zuverlässig hervorgehen. Wenn Informationen fehlen, wird dies transparent gekennzeichnet."
  },
  {
    question: "Welche Emissionsfaktoren verwenden Sie?",
    answer:
      "Wir verwenden für den jeweiligen Anwendungsfall geeignete und nachvollziehbare Emissionsfaktoren aus dokumentierten Quellen. Welche Quelle verwendet wird, hängt unter anderem von Emissionsquelle, Region, Berichtsjahr und Zweck der Berechnung ab. Die verwendete Quelle und Berechnungsgrundlage werden dokumentiert."
  },
  {
    question: "Was ist der Unterschied zwischen location-based und market-based Scope 2?",
    answer:
      "Die location-based Methode orientiert sich an der durchschnittlichen Emissionsintensität des jeweiligen Stromnetzes beziehungsweise geografischen Energiesystems. Die market-based Methode kann dagegen geeignete Informationen über die konkrete Energiebeschaffung und vertragliche Instrumente berücksichtigen. Welche Darstellung benötigt wird, hängt vom jeweiligen Berichts- oder Anwendungsfall ab."
  },
  {
    question: "Benötigen wir Scope 1 und Scope 2 für einen VSME-Bericht?",
    answer:
      "Treibhausgasemissionen gehören zu den relevanten Umweltinformationen des freiwilligen europäischen Berichtsrahmens. Welche konkrete Darstellung für Ihr Unternehmen erforderlich oder sinnvoll ist, hängt vom angewendeten Modul, der Unternehmenssituation und dem aktuellen Stand des Standards ab. Wenn die Berechnung für einen VSME- beziehungsweise Voluntary-Standard-Bericht erstellt wird, berücksichtigen wir diesen Verwendungszweck bereits bei der Aufbereitung."
  },
  {
    question: "Was passiert, wenn Verbrauchsdaten fehlen?",
    answer:
      "Fehlende Daten werden zunächst identifiziert. Wir prüfen, ob zusätzliche interne Quellen verfügbar sind und welche Informationen noch beschafft werden können. Wo Unsicherheit bestehen bleibt, wird diese dokumentiert. Wir erzeugen keine scheinbar präzisen Werte auf Basis unbelegter Annahmen."
  },
  {
    question: "Ist die Berechnung zertifiziert oder verifiziert?",
    answer:
      "Nein. Evipace bereitet die Treibhausgasberechnung und ihre Dokumentation auf Basis Ihrer Unternehmensdaten vor. Dies ist keine externe Verifizierung, Assurance oder Zertifizierung durch eine unabhängige Prüfstelle."
  },
  {
    question: "Können Sie auch Scope 3 berechnen?",
    answer:
      "Das hier beschriebene Angebot konzentriert sich auf Scope 1 und Scope 2. Ob und in welchem Umfang Scope 3 für Ihr Unternehmen relevant ist, sollte separat geprüft werden, da Datenquellen und Berechnung deutlich komplexer sein können."
  },
  {
    question: "Wie lange dauert eine Scope-1-&-2-Berechnung?",
    answer:
      "Das hängt vor allem davon ab: wie viele Standorte berücksichtigt werden, welche Emissionsquellen vorhanden sind, wie vollständig die Verbrauchsdaten sind und für welchen Zweck die Berechnung benötigt wird. Nach einer ersten Sichtung der Ausgangsdaten können wir den Aufwand und einen realistischen Zeitrahmen einschätzen."
  }
];

export function Faq() {
  return (
    <section className="section-padding bg-[var(--warm)]">
      <div className="site-shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Häufige Fragen</p>
          <h2 className="heading-md font-display mt-6 max-w-[20ch]">
            Häufige Fragen zu Scope 1 und Scope 2
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
