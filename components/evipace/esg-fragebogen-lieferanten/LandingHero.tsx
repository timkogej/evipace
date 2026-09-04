import { FileText } from "lucide-react";
import { ButtonLink } from "../ButtonLink";
import { Reveal } from "../Reveal";
import { ServiceBreadcrumb } from "../trust/ServiceBreadcrumb";

const SEND_REQUEST_HREF = "/de/send-request";

/**
 * Bespoke hero for this landing page rather than the shared trust PageHero —
 * needs a primary + secondary CTA and microcopy, which PageHero doesn't
 * support. Kept to the same eyebrow/heading/intro typographic system as
 * every other page.
 */
export function LandingHero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pt-32"
      id="top"
    >
      <ServiceBreadcrumb current="ESG-Fragebögen für Lieferanten" />
      <div className="site-shell grid gap-12 pb-16 pt-4 sm:pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">ESG-Fragebögen für Lieferanten</p>
          <h1 className="heading-lg font-display mt-6">
            ESG-Fragebogen vom Kunden erhalten? Wir bereiten die Antworten für
            Sie vor.
          </h1>
          <p className="body-lg mt-7 max-w-xl">
            Ihr Kunde verlangt Nachhaltigkeitsdaten, Emissionswerte,
            Richtlinien oder Nachweise? Sie senden uns den Fragebogen und Ihre
            vorhandenen Unterlagen. Wir strukturieren die benötigten
            ESG-Daten, ordnen passende Nachweise zu und bereiten die
            Antworten für Ihre Prüfung und Einreichung vor.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink
              className="w-full max-w-full text-center sm:w-auto"
              href={SEND_REQUEST_HREF}
            >
              ESG-Anfrage senden
            </ButtonLink>
            <a
              className="orange-link inline-flex min-h-12 items-center gap-2 px-1 text-sm"
              href="#ablauf"
            >
              So funktioniert es
            </a>
          </div>
          <p className="mt-7 text-sm font-semibold text-[rgba(21,21,21,0.62)]">
            Excel · PDF · Word · kundenspezifische Anforderungen
          </p>
        </Reveal>

        <Reveal
          className="relative min-h-[20rem] rounded-[1.25rem] border border-[rgba(21,21,21,0.12)] bg-white p-6 shadow-lift sm:min-h-[24rem]"
          delay={0.12}
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--soft-orange)] text-orange">
              <FileText aria-hidden="true" className="h-5 w-5" />
            </div>
            <span className="font-mono text-[0.68rem] text-muted">
              ESG-FRAGEBOGEN
            </span>
          </div>

          <div className="mt-8 space-y-5">
            {[
              { label: "Scope 1 & Scope 2", status: "Vorbereitet" },
              { label: "Umweltpolitik", status: "Nachweis zugeordnet" },
              { label: "Code of Conduct", status: "Nachweis zugeordnet" },
              { label: "Zertifikate", status: "Offen — Angabe nötig" }
            ].map((row) => (
              <div
                className="flex items-center justify-between gap-4 border-t border-[rgba(21,21,21,0.1)] pt-4"
                key={row.label}
              >
                <span className="text-sm font-bold text-ink">
                  {row.label}
                </span>
                <span
                  className={`text-xs font-bold uppercase tracking-[0.08em] ${
                    row.status.startsWith("Offen")
                      ? "text-[rgba(21,21,21,0.5)]"
                      : "text-orange"
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
