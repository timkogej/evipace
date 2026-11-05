import Link from "next/link";
import h from "../HomeLandingPage.module.css";
import { Band, Head, Steps } from "../service-landing/Blocks";

const SEND_REQUEST_HREF = "/de/send-request";

const steps = [
  {
    number: "01",
    title: "Sie senden die Einladung",
    body: "Die angeforderten Assessments sowie die Zertifikate und Dokumente, die bereits vorhanden sind.",
    cta: true
  },
  {
    number: "02",
    title: "Wir ordnen zu und bereiten vor",
    body: "Jedes Thema wird Dokumenten und internen Ansprechpartnern zugeordnet, die Antworten werden vorbereitet."
  },
  {
    number: "03",
    title: "Eine Person prüft",
    body: "Eine Person bei Evipace prüft das Material und hält fehlende Zertifikate und offene Punkte sichtbar."
  },
  {
    number: "04",
    title: "Sie bestätigen und reichen ein",
    body: "Ihr Unternehmen bestätigt die Angaben und trägt sie in IntegrityNext ein beziehungsweise reicht sie dort ein."
  }
];

export function ProcessSteps() {
  return (
    <Band id="unterstuetzung" tone="orange">
      <Head eyebrow="Ablauf" title="So unterstützen wir bei Ihrer IntegrityNext-Selbstauskunft" />
      <Steps
        items={steps.map((step) => ({
          ...step,
          extra: step.cta ? (
            <Link className={h.textLink} href={SEND_REQUEST_HREF}>
              IntegrityNext-Anfrage senden<span aria-hidden="true">→</span>
            </Link>
          ) : undefined
        }))}
      />
    </Band>
  );
}
