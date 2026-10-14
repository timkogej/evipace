import { CalendarDays, Database, Factory, GitBranch, MapPin } from "lucide-react";
import { Band, Card, CardGrid, Head, Prose } from "../service-landing/Blocks";

const boundaries = [
  {
    icon: CalendarDays,
    title: "Berichtszeitraum",
    body: "Für welches Jahr oder welchen Zeitraum soll gerechnet werden?"
  },
  {
    icon: MapPin,
    title: "Standorte",
    body: "Welche Produktionsstätten, Büros, Lager oder anderen Standorte gehören zur Berechnung?"
  },
  {
    icon: GitBranch,
    title: "Gesellschaften und Einheiten",
    body: "Welche Unternehmen oder organisatorischen Einheiten sollen berücksichtigt werden?"
  },
  {
    icon: Factory,
    title: "Emissionsquellen",
    body: "Welche Energie- und Brennstoffquellen gehören innerhalb dieser Abgrenzung zu Scope 1 und Scope 2?"
  },
  {
    icon: Database,
    title: "Datenverfügbarkeit",
    body: "Sind alle Verbrauchsdaten für denselben Zeitraum vollständig vorhanden?"
  }
];

export function BoundarySetup() {
  return (
    <Band tone="tinted">
      <Head
        eyebrow="Bilanzgrenze"
        lead="Eine gute Treibhausgasbilanz beginnt nicht mit einem Emissionsfaktor. Sie beginnt mit der Bilanzgrenze."
        title="Bevor gerechnet wird, muss klar sein, was zum Unternehmen gehört."
      />
      <CardGrid>
        {boundaries.map((item) => (
          <Card icon={item.icon} key={item.title} title={item.title}>
            <p>{item.body}</p>
          </Card>
        ))}
      </CardGrid>
      <Prose>
        <p>
          Eine präzise Rechnung beginnt mit einer klaren Grenze - nicht mit
          einem Emissionsfaktor.
        </p>
        <p>
          Deshalb klären wir die Bilanzstruktur, bevor einzelne
          Verbrauchswerte miteinander verrechnet werden.
        </p>
      </Prose>
    </Band>
  );
}
