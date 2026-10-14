import Link from "next/link";
import h from "../HomeLandingPage.module.css";
import { Band, Head, Steps } from "../service-landing/Blocks";

const SEND_REQUEST_HREF = "/de/send-request";

const steps = [
  {
    number: "01",
    title: "Anfrage senden",
    body: "Sie senden uns die E-Mail, Datei, Liste oder andere Anforderung Ihres Kunden. Sie müssen die Anfrage vorher nicht selbst strukturieren.",
    cta: true
  },
  {
    number: "02",
    title: "Anforderungen strukturieren",
    body: "Wir prüfen, welche Informationen, Kennzahlen, Dokumente und Nachweise tatsächlich verlangt werden. Aus einer unübersichtlichen Kundenanforderung entsteht eine klare Liste konkreter Aufgaben."
  },
  {
    number: "03",
    title: "Daten und Dokumente zuordnen",
    body: "Vorhandene Informationen werden den jeweiligen Anforderungen zugeordnet. Dabei wird sichtbar, welche Antworten bereits auf Basis vorhandener Unterlagen vorbereitet werden können."
  },
  {
    number: "04",
    title: "Berechnungen und offene Punkte klären",
    body: "Wenn Kennzahlen berechnet werden müssen, prüfen wir, welche Ausgangsdaten vorhanden sind. Fehlende Informationen oder notwendige interne Bestätigungen werden klar gekennzeichnet."
  },
  {
    number: "05",
    title: "Antwort vorbereiten",
    body: "Sie erhalten einen strukturierten Output für Ihre Prüfung und weitere Verwendung gegenüber dem Kunden."
  }
];

export function ProcessSteps() {
  return (
    <Band id="ablauf">
      <Head eyebrow="Ablauf" title="So bearbeiten wir eine ESG-Kundenanfrage" />
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
