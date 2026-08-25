import { ArrowRight, Building2, Factory, Thermometer, Zap } from "lucide-react";
import { Reveal } from "../Reveal";

const sources = [
  { icon: Zap, label: "Strom" },
  { icon: Thermometer, label: "Fernwärme" },
  { icon: Building2, label: "Fernkälte" },
  { icon: Factory, label: "extern erzeugter Dampf" }
];

export function ScopeTwo() {
  return (
    <section className="section-padding bg-white">
      <div className="site-shell grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Scope 2</p>
          <h2 className="heading-md font-display mt-6 max-w-[18ch]">
            Emissionen aus eingekaufter Energie
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-8 text-muted">
            <p>
              Scope 2 umfasst indirekte Treibhausgasemissionen, die mit
              eingekaufter oder bezogener Energie zusammenhängen.
            </p>
            <p>
              Für viele Produktionsunternehmen ist eingekaufter Strom die
              wichtigste Scope-2-Quelle.
            </p>
            <p>Je nach Betrieb können zusätzlich weitere Quellen relevant sein.</p>
          </div>
        </Reveal>

        <Reveal
          className="rounded-[1.25rem] border border-[rgba(21,21,21,0.11)] bg-[var(--paper)] p-7 shadow-lift sm:p-9"
          delay={0.08}
        >
          <div className="grid gap-3 sm:grid-cols-4">
            {sources.map((source) => (
              <div
                className="rounded-[0.75rem] border border-[rgba(21,21,21,0.1)] bg-white p-4"
                key={source.label}
              >
                <source.icon aria-hidden="true" className="h-5 w-5 text-orange" />
                <p className="mt-3 text-sm font-bold text-ink">
                  {source.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-[1rem] border border-[rgba(21,21,21,0.12)] bg-white p-6">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-muted">
              Beispielhafte Logik
            </p>
            <div className="mt-5 grid gap-4 text-ink sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">
              <div>
                <p className="text-sm text-muted">Stromverbrauch</p>
                <p className="mt-1 text-2xl font-bold">245.000 kWh</p>
              </div>
              <ArrowRight aria-hidden="true" className="hidden h-5 w-5 text-orange sm:block" />
              <div>
                <p className="text-sm text-muted">Emissionsgrundlage</p>
                <p className="mt-1 text-xl font-bold">geeigneter Faktor</p>
              </div>
              <ArrowRight aria-hidden="true" className="hidden h-5 w-5 text-orange sm:block" />
              <div>
                <p className="text-sm text-muted">Ergebnis</p>
                <p className="mt-1 text-2xl font-bold">tCO₂e</p>
              </div>
            </div>
          </div>

          <p className="mt-6 leading-7 text-muted">
            Aus einer Stromrechnung wird erst dann eine belastbare
            Scope-2-Zahl, wenn Verbrauch, Zeitraum, Bilanzgrenze und
            Emissionsfaktor sauber zusammengeführt werden.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
