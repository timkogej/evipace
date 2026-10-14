import {
  BadgeCheck,
  Factory,
  FileStack,
  Scale,
  Users,
  Zap
} from "lucide-react";
import { Band, Card, CardGrid, Head, Items } from "../service-landing/Blocks";

const categories = [
  {
    icon: Zap,
    title: "Emissionen und Energie",
    intro: "Typische Anforderungen sind:",
    items: [
      "Scope-1-Emissionen",
      "Scope-2-Emissionen",
      "Stromverbrauch",
      "Brennstoffverbrauch",
      "Kraftstoffverbrauch",
      "erneuerbare Energie",
      "teilweise weitere CO₂- oder Scope-3-Angaben"
    ]
  },
  {
    icon: Factory,
    title: "Umweltinformationen",
    intro: "Kunden fragen häufig nach:",
    items: [
      "Umweltpolitik",
      "Energieeffizienz",
      "Abfallmanagement",
      "Wasserverbrauch",
      "Umweltzielen",
      "Klimazielen",
      "Maßnahmen zur Emissionsreduktion"
    ]
  },
  {
    icon: Scale,
    title: "Richtlinien und Governance",
    intro: "Dazu können gehören:",
    items: [
      "Code of Conduct",
      "Supplier Code of Conduct",
      "Anti-Korruptionsrichtlinien",
      "Compliance-Regelungen",
      "Verantwortlichkeiten",
      "Menschenrechtsrichtlinien",
      "interne Nachhaltigkeitsrichtlinien"
    ]
  },
  {
    icon: BadgeCheck,
    title: "Zertifikate",
    intro:
      "Je nach Kunde und Branche können bestehende Zertifizierungen oder Managementsysteme relevant sein, beispielsweise:",
    items: [
      "ISO 14001",
      "ISO 9001",
      "ISO 45001",
      "weitere branchen- oder kundenspezifische Zertifikate"
    ],
    note: "Ob eine bestimmte Zertifizierung tatsächlich benötigt wird, hängt immer von der konkreten Anfrage ab."
  },
  {
    icon: Users,
    title: "Soziale und unternehmensbezogene Daten",
    intro: "Auch Informationen wie diese können Teil einer ESG-Kundenanfrage sein:",
    items: [
      "Beschäftigtenzahlen",
      "Arbeitsschutz",
      "Weiterbildungen",
      "Diversität",
      "soziale Standards",
      "Compliance-Strukturen"
    ]
  },
  {
    icon: FileStack,
    title: "Nachweise und Dokumentation",
    intro:
      "Oft reicht eine reine Aussage nicht aus. Kunden verlangen zusätzlich unterstützende Dokumente wie:",
    items: [
      "Rechnungen",
      "interne Tabellen",
      "Zertifikate",
      "Richtlinien",
      "Berechnungen",
      "Berichte",
      "Unternehmensdokumente"
    ]
  }
];

export function TypicalRequests() {
  return (
    <Band>
      <Head
        eyebrow="Typische Inhalte"
        lead="Welche Informationen benötigt werden, hängt vom jeweiligen Kunden, der Branche und der Position in der Lieferkette ab. Bestimmte Themen treten jedoch besonders häufig auf."
        title="Was Kunden typischerweise anfordern"
      />
      <CardGrid>
        {categories.map((category) => (
          <Card icon={category.icon} key={category.title} title={category.title}>
            <p>{category.intro}</p>
            <Items items={category.items} />
            {category.note ? <p>{category.note}</p> : null}
          </Card>
        ))}
      </CardGrid>
    </Band>
  );
}
