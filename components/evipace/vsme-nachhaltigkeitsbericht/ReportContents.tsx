import { Building2, Factory, Scale, Users, Zap } from "lucide-react";
import { Band, Card, CardGrid, Head, Items, Prose } from "../service-landing/Blocks";

const categories = [
  {
    icon: Building2,
    title: "Unternehmen und Berichtsgrundlage",
    intro: "Dazu gehören beispielsweise:",
    items: [
      "grundlegende Unternehmensinformationen",
      "Berichtszeitraum",
      "relevante Standorte",
      "Grundlage der Datenerhebung",
      "bestehende Nachhaltigkeitspraktiken",
      "Richtlinien und geplante Initiativen"
    ]
  },
  {
    icon: Zap,
    title: "Energie und Treibhausgasemissionen",
    intro: "Zum Beispiel:",
    items: [
      "Energieverbrauch",
      "Stromverbrauch",
      "Brennstoffe",
      "erneuerbare Energie",
      "Scope-1-Emissionen",
      "Scope-2-Emissionen"
    ]
  },
  {
    icon: Factory,
    title: "Umwelt",
    intro: "Je nach Unternehmenssituation können unter anderem relevant sein:",
    items: [
      "Luft-, Wasser- und Bodenverschmutzung",
      "Biodiversität",
      "Wasserverbrauch",
      "Ressourcennutzung",
      "Kreislaufwirtschaft",
      "Abfall"
    ]
  },
  {
    icon: Users,
    title: "Mitarbeitende",
    intro: "Zum Beispiel:",
    items: [
      "Beschäftigtenstruktur",
      "Arbeitssicherheit",
      "Arbeitsunfälle",
      "Vergütung",
      "Tarifbindung",
      "Weiterbildung"
    ]
  },
  {
    icon: Scale,
    title: "Governance",
    intro:
      "Dazu gehören auch Angaben zu Geschäftsethik sowie, wo relevant, zu Verstößen oder Sanktionen im Zusammenhang mit Korruption und Bestechung.",
    items: [
      "Geschäftsethik",
      "Governance-Informationen",
      "Korruption und Bestechung",
      "relevante Verstöße oder Sanktionen"
    ]
  }
];

export function ReportContents() {
  return (
    <Band tone="orange">
      <Head
        eyebrow="Berichtsstruktur"
        lead="Der freiwillige europäische Berichtsrahmen ordnet Nachhaltigkeitsinformationen in eine klare Struktur. Dabei geht es nicht nur um CO₂. Umwelt-, Sozial- und Governance-Themen werden in einem gemeinsamen Berichtsrahmen zusammengeführt."
        title="Was ein VSME-Bericht strukturiert abdeckt"
      />
      <CardGrid>
        {categories.map((category) => (
          <Card icon={category.icon} key={category.title} title={category.title}>
            <p>{category.intro}</p>
            <Items items={category.items} />
          </Card>
        ))}
      </CardGrid>
      <Prose>
        <p>
          Welche Angaben für Ihr Unternehmen tatsächlich relevant sind, hängt
          von der gewählten Berichtsoption und Ihrer konkreten
          Unternehmenssituation ab.
        </p>
      </Prose>
    </Band>
  );
}
