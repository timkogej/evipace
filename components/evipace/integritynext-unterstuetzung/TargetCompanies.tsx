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
    <Band>
      <Head
        eyebrow="Für wen"
        lead="Evipace richtet sich vor allem an produzierende kleine und mittlere Unternehmen, die eine IntegrityNext-Anfrage eines Kunden bearbeiten müssen, aber keine große interne ESG-Abteilung für die Koordination der Selbstauskunft haben."
        title="Für kleine und mittlere Produktionsunternehmen"
      />
      <Chips items={companyTypes} />
      <Prose>
        <p>
          Besonders relevant ist die Unterstützung, wenn mehrere
          Unternehmensbereiche Informationen liefern müssen und trotzdem eine
          Person den gesamten Prozess gegenüber dem Kunden koordinieren soll.
        </p>
      </Prose>
    </Band>
  );
}
