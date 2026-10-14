import { Database, FileText, Fuel, Zap } from "lucide-react";
import { Band, Card, CardGrid, Head, Items } from "../service-landing/Blocks";

const groups = [
  {
    icon: Fuel,
    title: "Für Scope 1",
    items: [
      "Erdgasverbrauch",
      "Heizöl",
      "Flüssiggas",
      "Diesel",
      "Benzin",
      "andere relevante Brennstoffe",
      "Fuhrparkdaten",
      "Tankkartenabrechnungen",
      "Prozessdaten",
      "Informationen zu Kältemitteln",
      "Wartungs- oder Nachfüllprotokolle"
    ]
  },
  {
    icon: Zap,
    title: "Für Scope 2",
    items: [
      "Stromrechnungen",
      "Jahresverbrauchsübersichten",
      "Zählerdaten",
      "Fernwärmerechnungen",
      "Fernkälte",
      "Informationen zu weiteren eingekauften Energieformen",
      "gegebenenfalls Unterlagen zur Strombeschaffung"
    ]
  },
  {
    icon: FileText,
    title: "Zusätzlich hilfreich",
    items: [
      "Übersicht der Unternehmensstandorte",
      "Bilanzzeitraum",
      "Informationen zu Gesellschaften oder Organisationseinheiten",
      "frühere Berechnungen",
      "bestehende ESG-Berichte",
      "Kundenanforderungen oder Fragebögen, für die die Zahlen benötigt werden"
    ]
  }
];

export function DataRequirements() {
  return (
    <Band tone="tinted">
      <Head
        eyebrow="Benötigte Daten"
        lead="Sie müssen uns keine fertige CO₂-Tabelle liefern. Wir helfen zunächst dabei, die relevanten Ausgangsdaten zu identifizieren."
        title="Welche Daten benötigen wir?"
      />
      <CardGrid>
        {groups.map((group) => (
          <Card icon={group.icon} key={group.title} title={group.title}>
            <Items items={group.items} />
          </Card>
        ))}
      </CardGrid>
      <CardGrid columns={1}>
        <Card icon={Database}>
          <p>
            Sie müssen daraus noch keine perfekte CO₂-Tabelle bauen. Genau
            diese Strukturierung übernehmen wir.
          </p>
        </Card>
      </CardGrid>
    </Band>
  );
}
