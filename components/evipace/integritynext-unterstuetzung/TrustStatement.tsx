import { ShieldAlert } from "lucide-react";
import { Reveal } from "../Reveal";

const limitations = [
  "vergeben keine IntegrityNext-Bewertungen",
  "kontrollieren oder beeinflussen die Validierung nicht",
  "garantieren keinen bestimmten Status",
  "garantieren keine Annahme bestimmter Antworten oder Dokumente",
  "erstellen keine fingierten Nachweise",
  "führen keine gesetzliche Audit- oder Assurance-Leistung durch",
  "bieten keine Rechtsberatung"
];

export function TrustStatement() {
  return (
    <section className="section-padding bg-[var(--warm)]">
      <div className="site-shell">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Unabhängigkeit</p>
          <h2 className="heading-md font-display mt-6 max-w-[20ch]">
            Unabhängige Unterstützung bei Ihrer Vorbereitung
          </h2>
          <p className="body-lg mt-7">
            Evipace ist ein unabhängiger Dienstleister und nicht mit
            IntegrityNext verbunden.
          </p>
        </Reveal>

        <Reveal
          className="mt-10 rounded-[1.25rem] border border-[rgba(21,21,21,0.11)] bg-white p-7 shadow-lift sm:p-9"
          delay={0.08}
        >
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--soft-orange)] text-orange">
              <ShieldAlert aria-hidden="true" className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-bold text-ink">Wir:</p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {limitations.map((item) => (
                  <li
                    className="border-t border-[rgba(21,21,21,0.1)] pt-2 text-sm text-muted"
                    key={item}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-10 max-w-3xl text-lg leading-8 text-muted" delay={0.14}>
          Unsere Aufgabe ist die strukturierte Vorbereitung Ihrer eigenen
          Unternehmensinformationen für die konkrete Kundenanforderung.
        </Reveal>
      </div>
    </section>
  );
}
