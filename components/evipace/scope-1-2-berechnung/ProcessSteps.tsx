import { ArrowRight } from "lucide-react";
import { ButtonLink } from "../ButtonLink";
import { Reveal } from "../Reveal";

const SEND_REQUEST_HREF = "/de/send-request";

const steps = [
  {
    number: "01",
    title: "Bilanzrahmen klären",
    body: "Wir definieren zunächst Berichtszeitraum, relevante Standorte, organisatorische Abgrenzung und den Verwendungszweck der Berechnung.",
    cta: true
  },
  {
    number: "02",
    title: "Datenquellen identifizieren",
    body: "Wir bestimmen, welche Aktivitätsdaten benötigt werden und wo diese typischerweise im Unternehmen liegen."
  },
  {
    number: "03",
    title: "Verbrauchsdaten strukturieren",
    body: "Die vorhandenen Daten werden nach Quelle, Zeitraum, Einheit und Scope geordnet. Unvollständige oder unklare Angaben werden sichtbar gemacht."
  },
  {
    number: "04",
    title: "Emissionsfaktoren zuordnen",
    body: "Für die jeweiligen Aktivitätsdaten werden geeignete und nachvollziehbar dokumentierte Emissionsfaktoren verwendet."
  },
  {
    number: "05",
    title: "CO₂e berechnen",
    body: "Die relevanten Treibhausgasemissionen werden berechnet und Scope 1 beziehungsweise Scope 2 zugeordnet."
  },
  {
    number: "06",
    title: "Ergebnisse dokumentieren",
    body: "Wir dokumentieren Aktivitätsdaten, verwendete Faktoren, Quellen, Annahmen, Berechnungsmethode und offene Datenlücken."
  },
  {
    number: "07",
    title: "Unternehmensprüfung",
    body: "Sie prüfen die zugrunde liegenden Unternehmensdaten und bestätigen die vorbereitete Berechnungsgrundlage."
  }
];

export function ProcessSteps() {
  return (
    <section className="section-padding bg-[var(--warm)]" id="ablauf">
      <div className="site-shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Ablauf</p>
          <h2 className="heading-md font-display mt-6 max-w-[18ch]">
            So entsteht Ihre Scope-1-&-2-Berechnung
          </h2>
        </Reveal>

        <div className="relative mt-12">
          <div className="absolute left-6 top-0 hidden h-full w-px bg-[rgba(21,21,21,0.13)] md:block" />
          <div className="grid gap-5">
            {steps.map((step, index) => (
              <Reveal
                className="relative grid gap-5 rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-6 shadow-[0_14px_45px_rgba(21,21,21,0.045)] md:ml-16 md:grid-cols-[11rem_1fr]"
                delay={index * 0.04}
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
                        Scope-1-&-2-Berechnung anfragen
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
