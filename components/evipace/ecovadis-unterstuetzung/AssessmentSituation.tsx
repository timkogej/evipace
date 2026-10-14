import { RefreshCw, Sparkles } from "lucide-react";
import { Band, Card, CardGrid, Head, Items } from "../service-landing/Blocks";

const firstAssessmentItems = [
  "welche Informationen benötigt werden",
  "welche Dokumente bereits verwendet werden können",
  "welche Daten noch fehlen",
  "wie das vorhandene Material sinnvoll strukturiert wird"
];

const reassessmentItems = [
  "welche Unterlagen bereits verwendet wurden",
  "welche Themen noch schwach dokumentiert sind",
  "welche realen Änderungen seit der letzten Bewertung vorgenommen wurden",
  "welche neuen Nachweise verfügbar sind",
  "wo weiterhin offene Punkte bestehen"
];

export function AssessmentSituation() {
  return (
    <Band>
      <Head
        eyebrow="Ausgangslage"
        lead="Die Ausgangssituation ist nicht immer dieselbe."
        title="Erstbewertung oder erneute Bewertung?"
      />
      <CardGrid columns={2}>
        <Card icon={Sparkles} title="Erste EcoVadis-Bewertung">
          <p>
            Bei einer ersten Bewertung besteht die größte Herausforderung oft
            darin, überhaupt zu verstehen:
          </p>
          <Items items={firstAssessmentItems} />
          <p>
            Evipace hilft dabei, aus den vorhandenen
            Unternehmensinformationen eine klare Arbeitsgrundlage für das
            Assessment zu machen.
          </p>
        </Card>
        <Card icon={RefreshCw} title="Erneute Bewertung">
          <p>
            Wenn bereits eine frühere Scorecard vorhanden ist, kann die
            Vorbereitung gezielter erfolgen. Wir können beispielsweise
            prüfen:
          </p>
          <Items items={reassessmentItems} />
          <p>
            Ziel ist eine besser vorbereitete und nachvollziehbar
            dokumentierte Einreichung - nicht die Garantie einer bestimmten
            Punktzahl.
          </p>
        </Card>
      </CardGrid>
    </Band>
  );
}
