import { ArrowRight } from "lucide-react";
import { ButtonLink } from "../ButtonLink";
import { Reveal } from "../Reveal";

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
    <section className="section-padding bg-white" id="ablauf">
      <div className="site-shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Ablauf</p>
          <h2 className="heading-md font-display mt-6 max-w-[18ch]">
            So bearbeiten wir eine ESG-Kundenanfrage
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
