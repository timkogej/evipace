import Link from "next/link";
import h from "../HomeLandingPage.module.css";
import { Band, Head, Steps } from "../service-landing/Blocks";

const SEND_REQUEST_HREF = "/de/send-request";

const steps = [
  {
    number: "01",
    title: "Fragebogen senden",
    body: "Sie senden uns die ESG-Anfrage oder den Fragebogen Ihres Kunden.",
    cta: true
  },
  {
    number: "02",
    title: "Vorhandene Unterlagen bereitstellen",
    body: "Sie stellen die Dokumente und Daten bereit, die bereits im Unternehmen vorhanden sind. Sie müssen diese nicht vorher perfekt sortieren — Ihre ESG-Unterlagen müssen nicht erst intern aufbereitet werden, bevor Sie mit uns starten können."
  },
  {
    number: "03",
    title: "Wir strukturieren und prüfen",
    body: "Wir ordnen Informationen und Nachweise den Anforderungen des Fragebogens zu, identifizieren fehlende Punkte und bereiten die möglichen Antworten vor."
  },
  {
    number: "04",
    title: "Sie erhalten den vorbereiteten Output",
    body: "Sie sehen klar, welche Fragen beantwortet werden können, welche Daten und Nachweise verwendet wurden, welche Punkte noch offen sind und wo Ihre Freigabe oder zusätzliche Information erforderlich ist."
  }
];

export function HowItWorks() {
  return (
    <Band id="ablauf">
      <Head eyebrow="Ablauf" title="So funktioniert die Bearbeitung" />
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
