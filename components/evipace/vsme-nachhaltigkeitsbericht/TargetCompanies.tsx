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
            Für produzierende kleine und mittlere Unternehmen
          </h2>
          <p className="body-lg mt-7">
            Evipace richtet sich besonders an produzierende Unternehmen, die
            Nachhaltigkeitsinformationen strukturiert aufbauen möchten, ohne
            dafür eine eigene große ESG-Abteilung aufzubauen.
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
          Besonders sinnvoll ist ein strukturierter Bericht, wenn Ihr
          Unternehmen regelmäßig Nachhaltigkeitsinformationen an größere Kunden,
          Banken oder andere Geschäftspartner liefern muss.
        </Reveal>
      </div>
    </section>
  );
}
