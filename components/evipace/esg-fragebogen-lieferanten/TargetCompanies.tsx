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
    <section className="section-padding bg-white">
      <div className="site-shell">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Für wen</p>
          <h2 className="heading-md font-display mt-6 max-w-[20ch]">
            Für welche Unternehmen evipace gedacht ist
          </h2>
          <p className="body-lg mt-7">
            Evipace richtet sich vor allem an produzierende kleine und
            mittlere Unternehmen, die ESG-Anforderungen ihrer Kunden erfüllen
            müssen, ohne dafür ein großes internes Nachhaltigkeitsteam
            aufzubauen.
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
          Besonders relevant ist die Unterstützung für Unternehmen, die
          größere Kunden in Deutschland, Österreich oder anderen europäischen
          Märkten beliefern und zunehmend Nachhaltigkeitsdaten entlang ihrer
          Lieferkette bereitstellen müssen.
        </Reveal>
      </div>
    </section>
  );
}
