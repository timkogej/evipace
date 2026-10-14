import Link from "next/link";
import h from "../HomeLandingPage.module.css";
import { Band, Head, Steps } from "../service-landing/Blocks";

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
    <Band id="ablauf">
      <Head eyebrow="Ablauf" title="So entsteht Ihr VSME-Nachhaltigkeitsbericht" />
      <Steps
        items={steps.map((step) => ({
          ...step,
          extra: step.cta ? (
            <Link className={h.textLink} href={SEND_REQUEST_HREF}>
              VSME-Projekt anfragen<span aria-hidden="true">→</span>
            </Link>
          ) : undefined
        }))}
      />
    </Band>
  );
}
