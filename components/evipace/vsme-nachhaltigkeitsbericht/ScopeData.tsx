import { Calculator, Database, FileText } from "lucide-react";
import { Band, Card, CardGrid, Head, Items, Prose } from "../service-landing/Blocks";

const groups = [
  {
    icon: Database,
    title: "Aktivitätsdaten",
    items: [
      "Erdgas",
      "Heizöl",
      "Diesel",
      "Benzin",
      "andere relevante Brennstoffe",
      "eingekaufter Strom"
    ]
  },
  {
    icon: Calculator,
    title: "Berechnungsgrundlage",
    items: [
      "Verbrauchseinheiten",
      "passende Emissionsfaktoren",
      "klare Abgrenzung",
      "dokumentierte Berechnungsmethode"
    ]
  },
  {
    icon: FileText,
    title: "Ergebnis",
    items: [
      "Scope-1-Emissionen",
      "Scope-2-Emissionen",
      "nachvollziehbare Berechnungsunterlagen"
    ]
  }
];

export function ScopeData() {
  return (
    <Band>
      <Head eyebrow="Emissionen" title="Scope 1 und Scope 2 sind Teil der Datengrundlage - nicht nur ein separates Excel-Thema.">
        <p>
          Treibhausgasemissionen gehören zu den zentralen Umweltkennzahlen
          des freiwilligen Berichtsrahmens.
        </p>
        <p>
          Dafür reicht es nicht, lediglich eine Zahl in den Bericht
          einzutragen.
        </p>
        <p>
          Eine nachvollziehbare Berechnung benötigt eine belastbare
          Grundlage.
        </p>
        <p>Zum Beispiel:</p>
      </Head>
      <CardGrid>
        {groups.map((group) => (
          <Card icon={group.icon} key={group.title} title={group.title}>
            <Items items={group.items} />
          </Card>
        ))}
      </CardGrid>
      <Prose>
        <p>
          Evipace kann diese Daten im Rahmen des Berichtsprojekts
          mitstrukturieren und - sofern die erforderlichen Ausgangsdaten
          vorhanden sind - die entsprechenden Kennzahlen vorbereiten.
        </p>
        <p>
          So bleibt nachvollziehbar, wie eine Zahl im Bericht entstanden ist.
        </p>
      </Prose>
    </Band>
  );
}
