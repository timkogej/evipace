import { ArrowRight } from "lucide-react";
import { ButtonLink } from "../ButtonLink";
import { Reveal } from "../Reveal";

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
    <section className="section-padding bg-white" id="ablauf">
      <div className="site-shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Ablauf</p>
          <h2 className="heading-md font-display mt-6 max-w-[20ch]">
            So unterstützen wir bei Ihrer EcoVadis-Vorbereitung
          </h2>
        </Reveal>

        <div className="relative mt-12">
          <div className="absolute left-6 top-0 hidden h-full w-px bg-[rgba(21,21,21,0.13)] md:block" />
          <div className="grid gap-5">
            {steps.map((step, index) => (
              <Reveal
                className="relative grid gap-5 rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-[var(--paper)] p-6 shadow-[0_14px_45px_rgba(21,21,21,0.045)] md:ml-16 md:grid-cols-[11rem_1fr]"
                delay={index * 0.06}
                key={step.title}
              >
                <div className="flex items-center gap-3">
                  <span className="font-display text-5xl leading-none text-orange">
                    {step.number}
                  </span>
                  {index < steps.length - 1 ? (
                    <ArrowRight
                      aria-hidden="true"
                      className="hidden h-4 w-4 text-muted md:block"
                    />
                  ) : null}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-ink">{step.title}</h3>
                  <p className="mt-2 leading-7 text-muted">{step.body}</p>
                  {step.cta ? (
                    <div className="mt-5">
                      <ButtonLink href={SEND_REQUEST_HREF}>
                        EcoVadis-Anfrage senden
                      </ButtonLink>
                    </div>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
