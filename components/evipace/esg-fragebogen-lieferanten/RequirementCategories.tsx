import {
  Zap,
  Factory,
  Users,
  Scale,
  BadgeCheck
} from "lucide-react";
import { Band, Card, CardGrid, Head, InlineLink, Items, Prose } from "../service-landing/Blocks";

const categories = [
  {
    icon: Zap,
    title: "Energie und Emissionen",
    items: [
      "Stromverbrauch",
      "Erdgas und andere Brennstoffe",
      "Kraftstoffverbrauch",
      "Scope-1-Emissionen",
      "Scope-2-Emissionen",
      "teilweise Scope-3-Angaben",
      "erneuerbare Energie"
    ]
  },
  {
    icon: Factory,
    title: "Umwelt",
    items: [
      "Umweltpolitik",
      "Energieeffizienz",
      "Abfall",
      "Wasserverbrauch",
      "Umweltziele",
      "Maßnahmen zur Emissionsreduktion"
    ]
  },
  {
    icon: Users,
    title: "Mitarbeitende und Soziales",
    items: [
      "Beschäftigtenzahlen",
      "Arbeitsschutz",
      "Schulungen",
      "Diversität",
      "soziale Standards",
      "Menschenrechte"
    ]
  },
  {
    icon: Scale,
    title: "Governance und Richtlinien",
    items: [
      "Code of Conduct",
      "Supplier Code of Conduct",
      "Anti-Korruptionsrichtlinien",
      "Compliance",
      "Verantwortlichkeiten",
      "interne Nachhaltigkeitsrichtlinien"
    ]
  },
  {
    icon: BadgeCheck,
    title: "Zertifikate und Nachweise",
    items: [
      "ISO-Zertifikate",
      "Rechnungen und Verbrauchsdaten",
      "interne Richtlinien",
      "Berichte",
      "Unternehmensdokumente",
      "bestehende ESG-Nachweise"
    ]
  }
];

export function RequirementCategories() {
  return (
    <Band tone="tinted">
      <Head
        eyebrow="Typische Anforderungen"
        lead="Die Anforderungen unterscheiden sich je nach Kunde, Branche und Lieferkette. Bestimmte Themen tauchen jedoch besonders häufig auf."
        title="Welche Informationen Kunden typischerweise verlangen"
      />
      <CardGrid>
        {categories.map((category) => (
          <Card icon={category.icon} key={category.title} title={category.title}>
            <Items items={category.items} />
          </Card>
        ))}
      </CardGrid>
      <Prose>
        <p>
          Wir unterscheiden dabei zwischen vorhandenen Nachweisen,
          berechenbaren Angaben und Informationen, die noch von Ihrem
          Unternehmen bestätigt werden müssen.
        </p>
        <p>
          <InlineLink href="/de/ressourcen/esg-nachweise-lieferanten">
            Welche ESG-Nachweise konkrete Aussagen wirklich belegen
          </InlineLink>
        </p>
        <p>
          <InlineLink href="/de/ressourcen/esg-nachweise-checkliste">
            Einzelnen Nachweis vor der Verwendung prüfen
          </InlineLink>
        </p>
      </Prose>
    </Band>
  );
}
