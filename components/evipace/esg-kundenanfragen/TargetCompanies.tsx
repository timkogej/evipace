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
        lead="Evipace richtet sich vor allem an kleine und mittlere Produktionsunternehmen, die Nachhaltigkeitsanforderungen größerer Kunden erfüllen müssen, ohne jede neue ESG-Anfrage intern von Grund auf aufzubauen."
        title="Für produzierende Unternehmen in der Lieferkette"
      />
      <Chips items={companyTypes} />
      <Prose>
        <p>
          Besonders relevant ist die Unterstützung für Unternehmen, die größere
          Kunden in Deutschland, Österreich oder anderen europäischen Märkten
          beliefern und zunehmend ESG-Informationen entlang der Lieferkette
          bereitstellen müssen.
        </p>
      </Prose>
    </Band>
  );
}
