import { Factory, HeartHandshake, Scale, ShoppingCart } from "lucide-react";
import { Band, Card, CardGrid, Head, Items, Prose } from "../service-landing/Blocks";

const themes = [
  {
    icon: Factory,
    title: "Umwelt",
    intro: "Dazu können unter anderem gehören:",
    items: [
      "Energieverbrauch",
      "CO₂-Emissionen",
      "Abfall",
      "Wasser",
      "Umweltmanagement",
      "Klimaschutz",
      "Umweltziele",
      "Ressourceneffizienz"
    ]
  },
  {
    icon: HeartHandshake,
    title: "Arbeits- und Menschenrechte",
    intro: "Typische Themen sind beispielsweise:",
    items: [
      "Arbeitssicherheit",
      "Arbeitsbedingungen",
      "Schulungen und Weiterbildung",
      "Menschenrechte",
      "Diversität und Gleichbehandlung",
      "soziale Standards"
    ]
  },
  {
    icon: Scale,
    title: "Ethik",
    intro: "Hier können unter anderem relevant sein:",
    items: [
      "Anti-Korruption",
      "Compliance",
      "Geschäftsethik",
      "Datenschutz",
      "Informationssicherheit",
      "Verantwortlichkeiten"
    ]
  },
  {
    icon: ShoppingCart,
    title: "Nachhaltige Beschaffung",
    intro: "Mögliche Themen sind beispielsweise:",
    items: [
      "Nachhaltigkeitsanforderungen an Lieferanten",
      "Einkaufsrichtlinien",
      "Lieferantenbewertung",
      "Verhaltenskodizes für Lieferanten",
      "Nachhaltigkeitskriterien in der Beschaffung"
    ]
  }
];

export function AssessmentThemes() {
  return (
    <Band>
      <Head
        eyebrow="Themenbereiche"
        lead="Welche Fragen konkret gestellt werden, hängt unter anderem von Ihrem Unternehmensprofil ab. Die Bewertung orientiert sich jedoch an vier zentralen Themenbereichen."
        title="Die vier Themen der EcoVadis-Bewertung"
      />
      <CardGrid columns={2}>
        {themes.map((theme) => (
          <Card icon={theme.icon} key={theme.title} title={theme.title}>
            <p>{theme.intro}</p>
            <Items items={theme.items} />
          </Card>
        ))}
      </CardGrid>
      <Prose>
        <p>
          Der konkrete Umfang ist nicht für jedes Unternehmen identisch.
          Deshalb arbeiten wir mit Ihrem tatsächlichen Fragebogen und Ihren
          vorhandenen Unterlagen - nicht mit einer pauschalen Checkliste.
        </p>
      </Prose>
    </Band>
  );
}
