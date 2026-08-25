import { FileStack } from "lucide-react";
import { Reveal } from "../Reveal";

const foundationItems = [
  "belastbare Daten",
  "nachvollziehbare Kennzahlen",
  "dokumentierte Quellen",
  "klare Richtlinien",
  "wiederverwendbare Informationen",
  "ein strukturierter Bericht, der diese Grundlage zusammenführt"
];

export function PracticalFoundation() {
  return (
    <section className="section-padding bg-[var(--warm)]">
      <div className="site-shell">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Nutzbare Grundlage</p>
          <h2 className="heading-md font-display mt-6 max-w-[20ch]">
            Kein Hochglanzbericht für die Schublade. Eine nutzbare
            ESG-Grundlage für Ihr Unternehmen.
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-8 text-muted">
            <p>
              Nicht jedes Produktionsunternehmen braucht einen hundertseitigen
              Nachhaltigkeitsbericht mit umfangreichen Imagekapiteln.
            </p>
            <p>Für viele kleine und mittlere Unternehmen ist etwas anderes wertvoller:</p>
          </div>
        </Reveal>

        <Reveal
          className="mt-10 rounded-[1.25rem] border border-[rgba(21,21,21,0.11)] bg-white p-7 shadow-lift sm:p-9"
          delay={0.08}
        >
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--soft-orange)] text-orange">
              <FileStack aria-hidden="true" className="h-5 w-5" />
            </div>
            <ul className="grid flex-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {foundationItems.map((item) => (
                <li
                  className="border-t border-[rgba(21,21,21,0.1)] pt-2 text-sm text-muted"
                  key={item}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal className="mt-10 max-w-3xl space-y-5 text-lg leading-8 text-muted" delay={0.14}>
          <p>evipace konzentriert sich auf genau diese operative Ebene.</p>
          <p>
            Wir helfen Ihnen dabei, Nachhaltigkeitsinformationen so aufzubauen,
            dass sie nicht nur gut aussehen, sondern im Unternehmensalltag
            tatsächlich nutzbar sind.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
