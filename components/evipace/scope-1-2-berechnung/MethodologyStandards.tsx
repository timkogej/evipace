import { ClipboardCheck } from "lucide-react";
import { Band, Card, CardGrid, Head, Items, Prose } from "../service-landing/Blocks";

const checks = [
  "den vorgesehenen Anwendungsfall",
  "die benötigte Berechnungsmethode",
  "aktuelle geeignete Emissionsfaktoren",
  "relevante Datenquellen",
  "verwendete methodische Grundlagen"
];

export function MethodologyStandards() {
  return (
    <Band>
      <Head eyebrow="Methodischer Stand" title="Wir arbeiten mit dem aktuellen methodischen Stand.">
        <p>
          Standards, Leitlinien und Emissionsfaktoren entwickeln sich
          weiter.
        </p>
        <p>
          Deshalb sollte eine Berechnung nicht auf einer dauerhaft
          festgeschriebenen internen Tabelle beruhen, die über Jahre
          unverändert weiterverwendet wird.
        </p>
      </Head>
      <CardGrid columns={1}>
        <Card icon={ClipboardCheck} title="Bei neuen Berechnungen prüfen wir:">
          <Items items={checks} />
        </Card>
      </CardGrid>
      <Prose>
        <p>
          Laufende oder angekündigte Änderungen an Standards behandeln wir
          nicht als bereits geltende Anforderungen.
        </p>
        <p>
          So bleibt nachvollziehbar, auf welchem methodischen Stand eine
          Berechnung erstellt wurde.
        </p>
      </Prose>
    </Band>
  );
}
