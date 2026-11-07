import Link from "next/link";
import h from "../HomeLandingPage.module.css";
import { Band, Head, Steps } from "../service-landing/Blocks";

const SEND_REQUEST_HREF = "/de/send-request";

const steps = [
  {
    number: "01",
    title: "Sie senden Ihre Unterlagen",
    body: "Unternehmensdaten, Rechnungen, Tabellen und Dokumente, die Sie bereits haben. Wir klären kurz, wofür der Bericht genutzt wird.",
    cta: true
  },
  {
    number: "02",
    title: "Wir strukturieren und berechnen",
    body: "Daten werden den VSME-Anforderungen zugeordnet, Kennzahlen aufbereitet, Methodik und Quellen dokumentiert, Lücken sichtbar gemacht."
  },
  {
    number: "03",
    title: "Eine Person prüft",
    body: "Eine Person bei Evipace prüft den Berichtsentwurf und fragt Sie nur nach dem, was fehlt."
  },
  {
    number: "04",
    title: "Sie geben frei",
    body: "Angaben, die Ihre Bestätigung brauchen, werden nicht ohne Ihre Freigabe als Unternehmensangabe dargestellt."
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
