import Link from "next/link";
import h from "../HomeLandingPage.module.css";
import { Band, Head, Steps } from "../service-landing/Blocks";

const SEND_REQUEST_HREF = "/de/send-request";

const steps = [
  {
    number: "01",
    title: "Sie senden die Anfrage",
    body: "Die E-Mail, Datei, Liste oder Plattform-Einladung Ihres Kunden, so wie sie bei Ihnen eingegangen ist. Sie müssen nichts vorher ausfüllen.",
    cta: true
  },
  {
    number: "02",
    title: "Wir bereiten die Antworten vor",
    body: "Fragen werden Ihren Daten und Nachweisen zugeordnet, Kennzahlen werden berechnet und Lücken aufgelistet statt erfunden."
  },
  {
    number: "03",
    title: "Eine Person prüft",
    body: "Eine Person bei Evipace prüft die Antwort und fragt Sie nur nach dem, was fehlt."
  },
  {
    number: "04",
    title: "Sie prüfen und senden",
    body: "Sie bestätigen die Unternehmensangaben in Ihrem Evipace-Portal und senden die Antwort selbst an Ihren Kunden."
  }
];

export function ProcessSteps() {
  return (
    <Band id="ablauf">
      <Head eyebrow="Ablauf" title="So wird aus der Kundenanfrage eine fertige Antwort" />
      <Steps
        items={steps.map((step) => ({
          ...step,
          extra: step.cta ? (
            <Link className={h.textLink} href={SEND_REQUEST_HREF}>
              ESG-Anfrage senden<span aria-hidden="true">→</span>
            </Link>
          ) : undefined
        }))}
      />
    </Band>
  );
}
