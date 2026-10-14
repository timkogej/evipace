import Link from "next/link";
import h from "../HomeLandingPage.module.css";
import { Band, Head, Steps } from "../service-landing/Blocks";

const SEND_REQUEST_HREF = "/de/send-request";

const steps = [
  {
    number: "01",
    title: "Fragebogen und Ausgangslage senden",
    body: "Sie senden uns Ihren aktuellen Fragebogen und die Unterlagen, die bereits vorhanden sind. Wenn Sie bereits eine frühere Bewertung oder Scorecard haben, kann diese ebenfalls berücksichtigt werden.",
    cta: true
  },
  {
    number: "02",
    title: "Anforderungen strukturieren",
    body: "Wir prüfen die relevanten Themen und identifizieren, welche Daten, Aussagen und Nachweise benötigt werden."
  },
  {
    number: "03",
    title: "Vorhandene Nachweise prüfen",
    body: "Bestehende Richtlinien, Zertifikate, Kennzahlen und Dokumentationen werden den jeweiligen Anforderungen zugeordnet."
  },
  {
    number: "04",
    title: "Offene Punkte identifizieren",
    body: "Wir zeigen klar, wo Informationen fehlen, wo ein Nachweis nicht ausreichend passt oder wo eine interne Entscheidung beziehungsweise Bestätigung notwendig ist."
  },
  {
    number: "05",
    title: "Antworten und Dokumentation vorbereiten",
    body: "Sie erhalten eine strukturierte Grundlage für Ihre interne Prüfung und weitere Bearbeitung des Assessments."
  }
];

export function ProcessSteps() {
  return (
    <Band id="ablauf">
      <Head eyebrow="Ablauf" title="So unterstützen wir bei Ihrer EcoVadis-Vorbereitung" />
      <Steps
        items={steps.map((step) => ({
          ...step,
          extra: step.cta ? (
            <Link className={h.textLink} href={SEND_REQUEST_HREF}>
              EcoVadis-Anfrage senden<span aria-hidden="true">→</span>
            </Link>
          ) : undefined
        }))}
      />
    </Band>
  );
}
