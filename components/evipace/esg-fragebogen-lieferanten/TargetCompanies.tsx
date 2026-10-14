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
        lead="Evipace richtet sich vor allem an produzierende kleine und mittlere Unternehmen, die ESG-Anforderungen ihrer Kunden erfüllen müssen, ohne dafür ein großes internes Nachhaltigkeitsteam aufzubauen."
        title="Für welche Unternehmen Evipace gedacht ist"
      />
      <Chips items={companyTypes} />
      <Prose>
        <p>
          Besonders relevant ist die Unterstützung für Unternehmen, die
          größere Kunden in Deutschland, Österreich oder anderen europäischen
          Märkten beliefern und zunehmend Nachhaltigkeitsdaten entlang ihrer
          Lieferkette bereitstellen müssen.
        </p>
      </Prose>
    </Band>
  );
}
