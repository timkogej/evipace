import Link from "next/link";
import h from "../HomeLandingPage.module.css";
import { Band, Head, Steps } from "../service-landing/Blocks";

const SEND_REQUEST_HREF = "/de/send-request";

const steps = [
  {
    number: "01",
    title: "Sie senden die Anfrage",
    body: "Der aktuelle EcoVadis-Fragebogen und die Unterlagen, die bereits vorhanden sind, auch eine frühere Scorecard.",
    cta: true
  },
  {
    number: "02",
    title: "Wir ordnen zu und bereiten vor",
    body: "Fragen werden Datenverantwortlichen und vorhandenen Nachweisen zugeordnet, belastbare Antworten werden entworfen."
  },
  {
    number: "03",
    title: "Eine Person prüft",
    body: "Eine Person bei Evipace prüft das Paket und hält fehlende oder schwache Nachweise als offene Punkte sichtbar."
  },
  {
    number: "04",
    title: "Sie bestätigen und reichen ein",
    body: "Ihr Unternehmen bestätigt die Angaben und reicht das Assessment ein. Ein Score oder Ergebnis wird nicht zugesagt."
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
