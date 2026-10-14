import { BadgeCheck, Building2, FileQuestion, Landmark, LineChart } from "lucide-react";
import { Band, Card, CardGrid, Head, Prose } from "../service-landing/Blocks";

const uses = [
  {
    icon: Building2,
    title: "Kundenanfragen",
    body: "Wenn ein Kunde später Energie-, Emissions- oder Mitarbeiterdaten verlangt, müssen viele Informationen nicht erneut von Grund auf gesucht werden."
  },
  {
    icon: FileQuestion,
    title: "Lieferantenfragebögen",
    body: "Bestehende Kennzahlen und Dokumente können als Grundlage für weitere ESG-Abfragen dienen."
  },
  {
    icon: BadgeCheck,
    title: "EcoVadis",
    body: "Vorhandene Richtlinien, Kennzahlen und Nachweise können eine bessere Ausgangsbasis für die Vorbereitung einer Bewertung bilden."
  },
  {
    icon: FileQuestion,
    title: "IntegrityNext",
    body: "Auch für angeforderte Supplier Assessments können bereits strukturierte Unternehmensinformationen relevant sein."
  },
  {
    icon: Landmark,
    title: "Banken und Finanzierung",
    body: "Der freiwillige Berichtsstandard ist unter anderem darauf ausgerichtet, Nachhaltigkeitsinformationen bereitzustellen, die auch für Finanzierungs- und Informationsbedürfnisse relevant sein können."
  },
  {
    icon: LineChart,
    title: "Interne Steuerung",
    body: "Ein konsistenter Datensatz macht Entwicklungen über die Zeit besser sichtbar."
  }
];

export function ReusableValue() {
  return (
    <Band tone="tinted">
      <Head
        eyebrow="Wiederverwendung"
        lead="Ein Nachhaltigkeitsbericht sollte nicht das Ende des Prozesses sein. Die strukturierte Datengrundlage dahinter kann für Ihr Unternehmen langfristig wertvoller sein als das fertige PDF allein."
        title="Ein Bericht, der auch nach der Veröffentlichung noch nützlich ist."
      />
      <CardGrid>
        {uses.map((item) => (
          <Card icon={item.icon} key={item.title} title={item.title}>
            <p>{item.body}</p>
          </Card>
        ))}
      </CardGrid>
      <Prose>
        <p>
          Die Datenbasis hinter dem Bericht ist oft wertvoller als der Bericht
          allein.
        </p>
      </Prose>
    </Band>
  );
}
