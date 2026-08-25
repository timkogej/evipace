import { ShieldAlert } from "lucide-react";
import { Reveal } from "../Reveal";

const limitations = [
  "vergeben keine EcoVadis-Bewertungen",
  "beeinflussen die Bewertung nicht",
  "garantieren keine Punktzahl",
  "garantieren keine Medaille",
  "garantieren keine Annahme bestimmter Dokumente",
  "erstellen keine fingierten Nachweise",
  "führen keine Audit- oder Assurance-Leistung durch",
  "bieten keine Rechtsberatung"
];

export function Limitations() {
  return (
    <section className="section-padding bg-white">
      <div className="site-shell">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Transparenz</p>
          <h2 className="heading-md font-display mt-6 max-w-[16ch]">
            Was evipace nicht macht
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-8 text-muted">
            <p>
              Transparenz ist bei EcoVadis-Unterstützung besonders wichtig.
            </p>
            <p>evipace ist ein unabhängiger Dienstleister.</p>
          </div>
        </Reveal>

        <Reveal
          className="mt-10 rounded-[1.25rem] border border-[rgba(21,21,21,0.11)] bg-[var(--paper)] p-7 shadow-lift sm:p-9"
          delay={0.08}
        >
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-orange shadow-[0_6px_18px_rgba(21,21,21,0.08)]">
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

        <Reveal className="mt-10 max-w-3xl space-y-5 text-lg leading-8 text-muted" delay={0.14}>
          <p>
            evipace ist nicht mit EcoVadis verbunden und ist kein von EcoVadis
            akkreditierter Beratungspartner.
          </p>
          <p>
            Unsere Aufgabe besteht darin, Ihre vorhandenen ESG-Informationen,
            Daten und Nachweise strukturiert für Ihre Vorbereitung
            aufzubereiten.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
