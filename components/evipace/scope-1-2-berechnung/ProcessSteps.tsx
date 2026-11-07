import Link from "next/link";
import h from "../HomeLandingPage.module.css";
import { Band, Head, Steps } from "../service-landing/Blocks";

const SEND_REQUEST_HREF = "/de/send-request";

const steps = [
  {
    number: "01",
    title: "Sie senden Ihre Unterlagen",
    body: "Strom- und Brennstoffrechnungen, Fuhrparkdaten, Kältemittelnachweise: was immer Sie bereits haben.",
    cta: true
  },
  {
    number: "02",
    title: "Wir strukturieren und berechnen",
    body: "Bilanzrahmen, Einheiten und Emissionsfaktoren werden angewendet, jede Quelle, Faktorversion und Annahme wird dokumentiert."
  },
  {
    number: "03",
    title: "Eine Person prüft",
    body: "Eine Person bei Evipace prüft die Berechnung, zeigt Lücken auf und fragt Sie nur nach dem, was fehlt."
  },
  {
    number: "04",
    title: "Sie geben frei, wir wiederholen im nächsten Jahr",
    body: "Sie geben im Evipace-Portal frei. Im nächsten Jahr werden dieselben Unterlagen und Einstellungen wiederverwendet."
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
