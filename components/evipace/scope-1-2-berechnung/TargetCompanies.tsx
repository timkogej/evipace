import { Cog, Factory, Wrench } from "lucide-react";
import { Reveal } from "../Reveal";

const companies = [
  "industrielle Zulieferer",
  "Maschinenbauunternehmen",
  "Metallverarbeiter",
  "Automotive-Zulieferer",
  "Kunststoffverarbeiter",
  "Elektronikhersteller",
  "Komponentenhersteller",
  "andere B2B-Produktionsunternehmen"
];

export function TargetCompanies() {
  return (
    <section className="section-padding bg-white">
      <div className="site-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Für wen</p>
          <h2 className="heading-md font-display mt-6 max-w-[20ch]">
            Für produzierende KMU, die belastbare Emissionszahlen brauchen.
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-8 text-muted">
            <p>
              evipace richtet sich besonders an kleine und mittlere
              Produktionsunternehmen, die Scope 1 und Scope 2 erstmals
              strukturiert berechnen oder eine bestehende Berechnung
              nachvollziehbarer aufbauen möchten.
            </p>
            <p>
              Besonders relevant ist die Unterstützung für Unternehmen, die von
              Kunden erstmals nach CO₂- oder Scope-Daten gefragt werden und
              dafür keine eigene Carbon-Accounting-Abteilung aufbauen möchten.
            </p>
          </div>
        </Reveal>

        <Reveal
          className="rounded-[1.25rem] border border-[rgba(21,21,21,0.11)] bg-[var(--paper)] p-7 shadow-lift sm:p-9"
          delay={0.08}
        >
          <div className="flex gap-3 text-orange">
            <Factory aria-hidden="true" className="h-5 w-5" />
            <Cog aria-hidden="true" className="h-5 w-5" />
            <Wrench aria-hidden="true" className="h-5 w-5" />
          </div>
          <h3 className="mt-5 text-xl font-bold text-ink">
            Typische Unternehmen sind beispielsweise:
          </h3>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {companies.map((company) => (
              <li
                className="border-t border-[rgba(21,21,21,0.1)] pt-2 text-sm text-muted"
                key={company}
              >
                {company}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
