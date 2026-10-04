import { FileCheck2 } from "lucide-react";
import { ButtonLink } from "../ButtonLink";
import { Reveal } from "../Reveal";
import { ServiceBreadcrumb } from "../trust/ServiceBreadcrumb";

const SEND_REQUEST_HREF = "/de/send-request";

const evidenceRows = [
  {
    label: "Umweltpolitik",
    status: "Nachweis verfügbar",
    tone: "ready"
  },
  {
    label: "Scope 1 / Scope 2",
    status: "Berechnung prüfen",
    tone: "work"
  },
  {
    label: "Lieferantenkodex",
    status: "Abgleich nötig",
    tone: "work"
  },
  {
    label: "Arbeitsschutz",
    status: "Input erforderlich",
    tone: "open"
  }
];

export function LandingHero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pt-32"
      id="top"
    >
      <ServiceBreadcrumb current="EcoVadis-Unterstützung" />
      <div className="site-shell grid grid-cols-[minmax(0,1fr)] gap-10 pb-14 pt-4 sm:pb-18 lg:grid-cols-[1.04fr_0.96fr] lg:items-center">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">EcoVadis-Unterstützung</p>
          <h1 className="type-title font-display mt-6" id="hero-title">
            EcoVadis-Fragebogen vor Ihnen? Wir helfen, Antworten und Nachweise
            zusammenzubringen.
          </h1>
          <p className="type-lead mt-7 max-w-xl text-muted">
            Sie senden uns Ihren aktuellen EcoVadis-Fragebogen und die
            vorhandenen Unterlagen. Wir helfen dabei, relevante
            ESG-Informationen zu strukturieren, passende Nachweise zu
            identifizieren und offene Punkte vor der Einreichung sichtbar zu
            machen.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink
              className="w-full max-w-full text-center sm:w-auto"
              href={SEND_REQUEST_HREF}
            >
              EcoVadis-Anfrage senden
            </ButtonLink>
            <a
              className="orange-link inline-flex min-h-12 items-center gap-2 px-1 text-sm"
              href="#unterstuetzung"
            >
              So unterstützen wir
            </a>
          </div>
          <p className="mt-7 text-sm font-semibold text-[rgba(21,21,21,0.62)]">
            Unabhängige Unterstützung · keine Verbindung zu EcoVadis · keine
            Score-Garantie
          </p>
        </Reveal>

        <Reveal
          className="border border-[rgba(21,21,21,0.1)] bg-[#f8f8f6] p-6 sm:p-8"
          delay={0.12}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--soft-orange)] text-orange">
              <FileCheck2 aria-hidden="true" className="h-5 w-5" />
            </div>
            <span className="font-mono text-[0.68rem] text-muted">
              ASSESSMENT-VORBEREITUNG
            </span>
          </div>

          <div className="mt-8 space-y-5">
            {evidenceRows.map((row) => (
              <div
                className="flex items-center justify-between gap-4 border-t border-[rgba(21,21,21,0.1)] pt-4"
                key={row.label}
              >
                <span className="text-sm font-bold text-ink">{row.label}</span>
                <span
                  className={`text-right text-xs font-bold uppercase tracking-[0.08em] ${
                    row.tone === "ready"
                      ? "text-orange"
                      : row.tone === "open"
                        ? "text-[rgba(21,21,21,0.5)]"
                        : "text-[rgba(21,21,21,0.66)]"
                  }`}
                >
                  {row.status}
                </span>
              </div>
            ))}
          </div>

        </Reveal>
      </div>
    </section>
  );
}
