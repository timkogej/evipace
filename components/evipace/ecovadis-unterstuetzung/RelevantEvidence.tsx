import {
  BadgeCheck,
  BarChart3,
  FileStack,
  ListChecks,
  ShieldCheck
} from "lucide-react";
import { Band, Card, CardGrid, Head, InlineLink, Items, Prose } from "../service-landing/Blocks";

const evidenceGroups = [
  {
    icon: ShieldCheck,
    title: "Richtlinien und Policies",
    intro: "Beispiele sind:",
    items: [
      "Umweltpolitik",
      "Nachhaltigkeitsrichtlinien",
      "Code of Conduct",
      "Anti-Korruptionsrichtlinie",
      "Menschenrechtsrichtlinie",
      "Einkaufsrichtlinien",
      "Arbeitsschutzrichtlinien"
    ]
  },
  {
    icon: BadgeCheck,
    title: "Zertifikate",
    intro: "Zum Beispiel:",
    items: [
      "ISO 14001",
      "ISO 9001",
      "ISO 45001",
      "andere relevante Managementsysteme oder Zertifizierungen"
    ]
  },
  {
    icon: BarChart3,
    title: "Kennzahlen und Daten",
    intro: "Zum Beispiel:",
    items: [
      "Energieverbrauch",
      "Scope-1-Emissionen",
      "Scope-2-Emissionen",
      "Beschäftigtendaten",
      "Schulungskennzahlen",
      "Arbeitsschutzkennzahlen"
    ]
  },
  {
    icon: FileStack,
    title: "Berichte und Dokumentation",
    intro: "Zum Beispiel:",
    items: [
      "Nachhaltigkeitsberichte",
      "interne Berichte",
      "Verfahrensbeschreibungen",
      "Mitarbeiterhandbücher",
      "Managementdokumente",
      "bestehende ESG-Dokumentation"
    ]
  },
  {
    icon: ListChecks,
    title: "Maßnahmen und Umsetzung",
    intro:
      "Wo relevant, kann nicht nur eine Richtlinie wichtig sein, sondern auch der Nachweis, dass ein Thema tatsächlich umgesetzt oder verfolgt wird.",
    items: [
      "verantwortliche Rollen",
      "umgesetzte Maßnahmen",
      "interne Prozesse",
      "praktische Nachverfolgung"
    ]
  }
];

export function RelevantEvidence() {
  return (
    <Band tone="tinted">
      <Head
        eyebrow="Dokumente"
        lead="Je nach Fragebogen und Unternehmenssituation können unterschiedliche Dokumente als Nachweis relevant sein."
        title="Welche Nachweise können relevant sein?"
      />
      <CardGrid>
        {evidenceGroups.map((group) => (
          <Card icon={group.icon} key={group.title} title={group.title}>
            <p>{group.intro}</p>
            <Items items={group.items} />
          </Card>
        ))}
      </CardGrid>
      <Prose>
        <p>
          Entscheidend ist nicht die Menge der Dokumente, sondern ihre Relevanz
          für die jeweilige Aussage. Evipace hilft dabei, vorhandene Unterlagen
          gezielt zuzuordnen, statt Dokumente ohne klare Funktion hochzuladen.
        </p>
        <p>
          Welche Dokumente EcoVadis als Supporting Evidence berücksichtigt und
          wie Sie das 55-Dokumente-Limit sinnvoll nutzen, erklären wir in
          unserem{" "}
          <InlineLink href="/de/ressourcen/ecovadis-dokumente-nachweise#evidence-register">
            Leitfaden zu EcoVadis-Dokumenten und Nachweisen mit illustrativem Register und leerer Vorlage
          </InlineLink>
          .
        </p>
        <p>
          <InlineLink href="/de/ressourcen/esg-nachweise-lieferanten">
            ESG-Nachweise nach Aussage, Scope und Zeitraum prüfen
          </InlineLink>
        </p>
      </Prose>
    </Band>
  );
}
