import { ArrowRight } from "lucide-react";
import { ButtonLink } from "../ButtonLink";
import { Reveal } from "../Reveal";

const SEND_REQUEST_HREF = "/de/send-request";

const steps = [
  {
    number: "01",
    title: "Ausgangslage klären",
    body: "Zu Beginn klären wir, warum Sie berichten möchten und wofür die Ergebnisse genutzt werden sollen. Zum Beispiel: freiwillige Nachhaltigkeitsberichterstattung, Kundenanforderungen, Banken oder Finanzierung, interne ESG-Struktur oder Vorbereitung auf wiederkehrende Datenanfragen.",
    cta: true
  },
  {
    number: "02",
    title: "Berichtsumfang festlegen",
    body: "Wir bestimmen gemeinsam, welcher Umfang für Ihr Unternehmen sinnvoll ist. Dabei prüfen wir, ob zunächst das Basic Module ausreicht oder ob zusätzliche Informationen aus dem Comprehensive Module benötigt werden."
  },
  {
    number: "03",
    title: "Datenquellen identifizieren",
    body: "Wir strukturieren, welche Informationen benötigt werden und wo sie im Unternehmen zu finden sind. So entsteht eine klare Übersicht statt einer allgemeinen Bitte, alle ESG-Daten zusammenzutragen."
  },
  {
    number: "04",
    title: "Daten sammeln und aufbereiten",
    body: "Vorhandene Rechnungen, Tabellen, Unternehmensdaten, Dokumente und Nachweise werden den jeweiligen Berichtsanforderungen zugeordnet. Fehlende Informationen werden sichtbar gemacht."
  },
  {
    number: "05",
    title: "Kennzahlen berechnen",
    body: "Wo erforderlich und auf Basis ausreichender Ausgangsdaten bereiten wir relevante Kennzahlen auf. Dazu können beispielsweise Energieverbrauch, Scope 1, Scope 2, Beschäftigtenkennzahlen, Arbeitsschutzkennzahlen und weitere relevante Berichtsgrößen gehören."
  },
  {
    number: "06",
    title: "Inhalte und Methodik dokumentieren",
    body: "Kennzahlen allein reichen nicht immer aus. Wir strukturieren auch die erklärenden Inhalte, Datenquellen, Berechnungsmethoden, Richtlinien und weiteren Informationen, die für einen nachvollziehbaren Bericht erforderlich sind."
  },
  {
    number: "07",
    title: "Bericht zusammenführen",
    body: "Aus den einzelnen Datenpunkten und Inhalten entsteht ein konsistenter Nachhaltigkeitsbericht."
  },
  {
    number: "08",
    title: "Unternehmensprüfung",
    body: "Bevor der Bericht final verwendet wird, prüfen Sie die vorbereiteten Angaben. Informationen, die eine interne Bestätigung oder Entscheidung benötigen, werden nicht ohne Ihre Freigabe als Unternehmensangabe dargestellt."
  }
];

export function ProcessSteps() {
  return (
    <section className="section-padding bg-white" id="ablauf">
      <div className="site-shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Ablauf</p>
          <h2 className="heading-md font-display mt-6 max-w-[18ch]">
            So entsteht Ihr VSME-Nachhaltigkeitsbericht
          </h2>
        </Reveal>

        <div className="relative mt-12">
          <div className="absolute left-6 top-0 hidden h-full w-px bg-[rgba(21,21,21,0.13)] md:block" />
          <div className="grid gap-5">
            {steps.map((step, index) => (
              <Reveal
                className="relative grid gap-5 rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-[var(--paper)] p-6 shadow-[0_14px_45px_rgba(21,21,21,0.045)] md:ml-16 md:grid-cols-[11rem_1fr]"
                delay={index * 0.04}
                key={step.title}
              >
                <div className="flex items-center gap-3">
                  <span className="font-display text-5xl leading-none text-orange">
                    {step.number}
                  </span>
                  {index < steps.length - 1 ? (
                    <ArrowRight
                      aria-hidden="true"
                      className="hidden h-4 w-4 text-muted md:block"
                    />
                  ) : null}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-ink">{step.title}</h3>
                  <p className="mt-2 leading-7 text-muted">{step.body}</p>
                  {step.cta ? (
                    <div className="mt-5">
                      <ButtonLink href={SEND_REQUEST_HREF}>
                        VSME-Projekt anfragen
                      </ButtonLink>
                    </div>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
