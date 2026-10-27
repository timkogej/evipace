import Link from "next/link";
import h from "../HomeLandingPage.module.css";
import { Band, Head, Steps } from "../service-landing/Blocks";

const SEND_REQUEST_HREF = "/de/send-request";

const steps = [
  {
    number: "01",
    title: "Angeforderte Themen zeigen",
    body: "Sie zeigen uns, welche Assessments in Ihrem IntegrityNext-Profil angefordert wurden, und stellen die vorhandenen Unterlagen bereit. Da die IntegrityNext-Fragebögen online innerhalb des Profils bereitgestellt werden, können dafür beispielsweise Screenshots, eine Übersicht der angeforderten Themen und relevante Dokumente verwendet werden.",
    cta: true
  },
  {
    number: "02",
    title: "Anforderungen strukturieren",
    body: "Wir ordnen die einzelnen Themen und bestimmen, welche Informationen, Zertifikate oder internen Ansprechpartner dafür relevant sind."
  },
  {
    number: "03",
    title: "Zertifikate und Nachweise zuordnen",
    body: "Bestehende Dokumente werden geprüft und den passenden Themen zugeordnet."
  },
  {
    number: "04",
    title: "Antworten vorbereiten",
    body: "Wo Fragebögen beantwortet werden müssen, bereiten wir die erforderlichen Informationen für Ihre Prüfung auf."
  },
  {
    number: "05",
    title: "Offene Punkte abstimmen",
    body: "Fehlende Daten, interne Entscheidungen oder notwendige Bestätigungen werden klar markiert. Sie behalten damit den Überblick darüber, was bereits vorbereitet ist und wo noch Input benötigt wird."
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
