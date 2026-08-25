import { Reveal } from "../Reveal";

const companyTypes = [
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
    <section className="section-padding bg-[var(--warm)]">
      <div className="site-shell">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Für wen</p>
          <h2 className="heading-md font-display mt-6 max-w-[20ch]">
            Für produzierende Unternehmen in der Lieferkette
          </h2>
          <p className="body-lg mt-7">
            Evipace richtet sich vor allem an kleine und mittlere
            Produktionsunternehmen, die Nachhaltigkeitsanforderungen größerer
            Kunden erfüllen müssen, ohne jede neue ESG-Anfrage intern von
            Grund auf aufzubauen.
          </p>
        </Reveal>

        <Reveal
          className="mt-9 grid grid-cols-2 gap-x-5 gap-y-3 sm:grid-cols-4"
          delay={0.08}
        >
          {companyTypes.map((type) => (
            <div
              className="border-t border-[rgba(21,21,21,0.13)] pt-3 text-sm font-semibold text-[rgba(21,21,21,0.66)]"
              key={type}
            >
              {type}
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-9 max-w-3xl text-lg leading-8 text-muted" delay={0.14}>
          Besonders relevant ist die Unterstützung für Unternehmen, die größere
          Kunden in Deutschland, Österreich oder anderen europäischen Märkten
          beliefern und zunehmend ESG-Informationen entlang der Lieferkette
          bereitstellen müssen.
        </Reveal>
      </div>
    </section>
  );
}
