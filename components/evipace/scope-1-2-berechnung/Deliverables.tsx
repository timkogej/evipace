import { BarChart3, Database, FileText, ListChecks } from "lucide-react";
import { Band, Card, CardGrid, Head, Prose } from "../service-landing/Blocks";

const deliverables = [
  {
    icon: BarChart3,
    title: "Scope-1-Ergebnis",
    body: "Gesamtergebnis der relevanten direkten Treibhausgasemissionen."
  },
  {
    icon: BarChart3,
    title: "Scope-2-Ergebnis",
    body: "Gesamtergebnis der relevanten Emissionen aus eingekaufter Energie."
  },
  {
    icon: ListChecks,
    title: "Aufschlüsselung nach Emissionsquellen",
    body: "Je nach Datenlage beispielsweise Erdgas, Heizöl, Fuhrpark, Kältemittel, Strom oder Fernwärme."
  },
  {
    icon: Database,
    title: "Aktivitätsdaten",
    body: "Die verwendeten Verbrauchswerte bleiben nachvollziehbar dokumentiert."
  },
  {
    icon: FileText,
    title: "Emissionsfaktoren",
    body: "Verwendete Faktoren und ihre Quellen werden festgehalten."
  },
  {
    icon: FileText,
    title: "Methodik",
    body: "Die Berechnungslogik und relevante Annahmen werden dokumentiert."
  },
  {
    icon: ListChecks,
    title: "Offene Punkte",
    body: "Fehlende oder unsichere Ausgangsdaten werden transparent gekennzeichnet."
  },
  {
    icon: Database,
    title: "Wiederverwendbare Berechnungsgrundlage",
    body: "Die Struktur kann als Ausgangspunkt für spätere Aktualisierungen dienen."
  }
];

export function Deliverables() {
  return (
    <Band tone="orange">
      <Head
        eyebrow="Ergebnis"
        lead="Eine Scope-1-&-2-Berechnung sollte mehr liefern als nur eine einzelne Zahl."
        title="Was Sie von uns zurückbekommen"
      />
      <CardGrid>
        {deliverables.map((item) => (
          <Card icon={item.icon} key={item.title} title={item.title}>
            <p>{item.body}</p>
          </Card>
        ))}
      </CardGrid>
      <Prose>
        <p>
          Sie sehen nicht nur, wie viele Tonnen CO₂e entstanden sind - sondern
          auch, wie die Zahl berechnet wurde.
        </p>
      </Prose>
    </Band>
  );
}
