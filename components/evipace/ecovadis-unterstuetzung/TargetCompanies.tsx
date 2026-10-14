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
        lead="Evipace richtet sich vor allem an produzierende kleine und mittlere Unternehmen, die eine EcoVadis-Anfrage pragmatisch und strukturiert bearbeiten möchten, ohne dafür ein großes internes Nachhaltigkeitsteam aufzubauen."
        title="Für kleine und mittlere Produktionsunternehmen"
      />
      <Chips items={companyTypes} />
      <Prose>
        <p>
          Besonders relevant ist die Unterstützung für Unternehmen, deren
          größere Kunden oder Geschäftspartner eine EcoVadis-Bewertung im
          Rahmen ihrer Lieferantenanforderungen erwarten.
        </p>
      </Prose>
    </Band>
  );
}
