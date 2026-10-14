import { Band, Chips, Head, Prose } from "../service-landing/Blocks";

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
    <Band tone="tinted">
      <Head
        eyebrow="Für wen"
        lead="Evipace richtet sich besonders an produzierende Unternehmen, die Nachhaltigkeitsinformationen strukturiert aufbauen möchten, ohne dafür eine eigene große ESG-Abteilung aufzubauen."
        title="Für produzierende kleine und mittlere Unternehmen"
      />
      <Chips items={companyTypes} />
      <Prose>
        <p>
          Besonders sinnvoll ist ein strukturierter Bericht, wenn Ihr
          Unternehmen regelmäßig Nachhaltigkeitsinformationen an größere Kunden,
          Banken oder andere Geschäftspartner liefern muss.
        </p>
      </Prose>
    </Band>
  );
}
