import Link from "next/link";
import h from "../HomeLandingPage.module.css";
import { Band, Head, Steps } from "../service-landing/Blocks";

const SEND_REQUEST_HREF = "/de/send-request";

const steps = [
  {
    number: "01",
    title: "Bilanzrahmen klären",
    body: "Wir definieren zunächst Berichtszeitraum, relevante Standorte, organisatorische Abgrenzung und den Verwendungszweck der Berechnung.",
    cta: true
  },
  {
    number: "02",
    title: "Datenquellen identifizieren",
    body: "Wir bestimmen, welche Aktivitätsdaten benötigt werden und wo diese typischerweise im Unternehmen liegen."
  },
  {
    number: "03",
    title: "Verbrauchsdaten strukturieren",
    body: "Die vorhandenen Daten werden nach Quelle, Zeitraum, Einheit und Scope geordnet. Unvollständige oder unklare Angaben werden sichtbar gemacht."
  },
  {
    number: "04",
    title: "Emissionsfaktoren zuordnen",
    body: "Für die jeweiligen Aktivitätsdaten werden geeignete und nachvollziehbar dokumentierte Emissionsfaktoren verwendet."
  },
  {
    number: "05",
    title: "CO₂e berechnen",
    body: "Die relevanten Treibhausgasemissionen werden berechnet und Scope 1 beziehungsweise Scope 2 zugeordnet."
  },
  {
    number: "06",
    title: "Ergebnisse dokumentieren",
    body: "Wir dokumentieren Aktivitätsdaten, verwendete Faktoren, Quellen, Annahmen, Berechnungsmethode und offene Datenlücken."
  },
  {
    number: "07",
    title: "Unternehmensprüfung",
    body: "Sie prüfen die zugrunde liegenden Unternehmensdaten und bestätigen die vorbereitete Berechnungsgrundlage."
  }
];

export function ProcessSteps() {
  return (
    <Band id="ablauf">
      <Head eyebrow="Ablauf" title="So entsteht Ihre Scope-1-&-2-Berechnung" />
      <Steps
        items={steps.map((step) => ({
          ...step,
          extra: step.cta ? (
            <Link className={h.textLink} href={SEND_REQUEST_HREF}>
              Scope-1-&-2-Berechnung anfragen<span aria-hidden="true">→</span>
            </Link>
          ) : undefined
        }))}
      />
    </Band>
  );
}
