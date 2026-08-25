import { ArrowRight } from "lucide-react";
import { ButtonLink } from "../ButtonLink";
import { Reveal } from "../Reveal";

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
    <section className="section-padding bg-white" id="ablauf">
      <div className="site-shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Ablauf</p>
          <h2 className="heading-md font-display mt-6 max-w-[18ch]">
            So funktioniert die Bearbeitung
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
                        ESG-Anfrage senden
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
