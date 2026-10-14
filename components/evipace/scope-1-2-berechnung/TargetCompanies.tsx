import { Band, Chips, Head } from "../service-landing/Blocks";

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
    <Band tone="tinted">
      <Head eyebrow="Für wen" title="Für produzierende KMU, die belastbare Emissionszahlen brauchen.">
        <p>
          Evipace richtet sich besonders an kleine und mittlere
          Produktionsunternehmen, die Scope 1 und Scope 2 erstmals
          strukturiert berechnen oder eine bestehende Berechnung
          nachvollziehbarer aufbauen möchten.
        </p>
        <p>
          Besonders relevant ist die Unterstützung für Unternehmen, die von
          Kunden erstmals nach CO₂- oder Scope-Daten gefragt werden und
          dafür keine eigene Carbon-Accounting-Abteilung aufbauen möchten.
        </p>
        <p>Typische Unternehmen sind beispielsweise:</p>
      </Head>
      <Chips items={companies} />
    </Band>
  );
}
