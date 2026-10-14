import { Calculator, FileText, Scale, Timer, Waves } from "lucide-react";
import sp from "../service-landing/ServicePage.module.css";
import { Band, Card, CardGrid, Formula, Head, Prose } from "../service-landing/Blocks";

const details = [
  {
    icon: Scale,
    title: "Einheiten müssen stimmen",
    body: "kWh, MWh, Liter, Kilogramm oder Kubikmeter müssen korrekt interpretiert und bei Bedarf umgerechnet werden."
  },
  {
    icon: Timer,
    title: "Der richtige Zeitraum muss verwendet werden",
    body: "Verbrauchsdaten müssen zum gewählten Berichtsjahr passen."
  },
  {
    icon: Calculator,
    title: "Der Emissionsfaktor muss zur Quelle passen",
    body: "Nicht jeder Faktor ist für jeden Brennstoff, jede Region oder jeden Zweck geeignet."
  },
  {
    icon: FileText,
    title: "Die Version muss dokumentiert werden",
    body: "Emissionsfaktoren und methodische Grundlagen können sich über die Zeit ändern. Deshalb sollte nachvollziehbar bleiben, welche Quelle und welche Version für die Berechnung verwendet wurde."
  },
  {
    icon: Waves,
    title: "Auch andere Treibhausgase zählen",
    body: "Eine Unternehmensbilanz betrachtet nicht ausschließlich Kohlenstoffdioxid. Relevante Treibhausgase werden über ihr jeweiliges Treibhauspotenzial in CO₂-Äquivalente - CO₂e - umgerechnet."
  }
];

export function CalculationMethod() {
  return (
    <Band id="berechnung">
      <Head
        eyebrow="Berechnungslogik"
        lead="Die grundlegende Logik einer emissionsbasierten Berechnung ist einfach:"
        title="Verbrauch × Emissionsfaktor = CO₂e - aber die Details entscheiden über die Qualität."
      />
      <Formula
        parts={[
          { title: "Aktivitätsdaten", value: "Erdgasverbrauch" },
          { op: "×" },
          { title: "Emissionsfaktor", value: "geeigneter Emissionsfaktor" },
          { op: "=" },
          { title: "Treibhausgasemissionen", value: "tCO₂e" }
        ]}
      />
      <Prose>
        <p>In der Praxis entstehen die Unterschiede jedoch in den Details.</p>
      </Prose>
      <div className={sp.sectionGap}>
        <CardGrid>
          {details.map((detail) => (
            <Card icon={detail.icon} key={detail.title} title={detail.title}>
              <p>{detail.body}</p>
            </Card>
          ))}
        </CardGrid>
      </div>
      <Prose>
        <p>
          Wir dokumentieren deshalb nicht nur das Ergebnis, sondern auch die
          Berechnungsgrundlage dahinter.
        </p>
      </Prose>
    </Band>
  );
}
