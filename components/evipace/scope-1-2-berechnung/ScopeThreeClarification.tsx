import { Network } from "lucide-react";
import { Reveal } from "../Reveal";

const examples = [
  "eingekauften Materialien",
  "Transport",
  "Geschäftsreisen",
  "Pendelverkehr",
  "Entsorgung",
  "Kapitalgütern",
  "Nutzung verkaufter Produkte",
  "anderen Wertschöpfungskettenaktivitäten"
];

export function ScopeThreeClarification() {
  return (
    <section className="section-padding bg-white">
      <div className="site-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <Reveal>
          <p className="eyebrow">Abgrenzung</p>
          <h2 className="heading-md font-display mt-6 max-w-[12ch]">
            Und Scope 3?
          </h2>
        </Reveal>

        <Reveal
          className="rounded-[1.25rem] border border-[rgba(21,21,21,0.11)] bg-[var(--paper)] p-7 shadow-lift sm:p-9"
          delay={0.08}
        >
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--soft-orange)] text-orange">
              <Network aria-hidden="true" className="h-5 w-5" />
            </div>
            <div className="space-y-5 text-lg leading-8 text-muted">
              <p>
                Scope 3 umfasst weitere indirekte Treibhausgasemissionen
                entlang der vor- und nachgelagerten Wertschöpfungskette.
              </p>
              <p>Dazu können beispielsweise Emissionen aus:</p>
            </div>
          </div>
          <ul className="mt-6 grid gap-2 sm:grid-cols-2">
            {examples.map((example) => (
              <li
                className="border-t border-[rgba(21,21,21,0.1)] pt-2 text-sm text-muted"
                key={example}
              >
                {example}
              </li>
            ))}
          </ul>
          <div className="mt-7 space-y-5 text-lg leading-8 text-muted">
            <p>
              Die Datenerhebung und Berechnung ist häufig deutlich komplexer
              als bei Scope 1 und Scope 2.
            </p>
            <p>
              Das auf dieser Seite beschriebene Angebot konzentriert sich
              zunächst auf Scope 1 und Scope 2. Ob Scope 3 für Ihren konkreten
              Kunden, Berichtsstandard oder anderen Anwendungsfall benötigt
              wird, sollte separat geprüft werden.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
