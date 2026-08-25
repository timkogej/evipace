import { ArrowRight } from "lucide-react";
import { ButtonLink } from "../ButtonLink";
import { Reveal } from "../Reveal";

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
    <section className="section-padding bg-white" id="unterstuetzung">
      <div className="site-shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Ablauf</p>
          <h2 className="heading-md font-display mt-6 max-w-[20ch]">
            So unterstützen wir bei Ihrer IntegrityNext-Selbstauskunft
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
                        IntegrityNext-Anfrage senden
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
