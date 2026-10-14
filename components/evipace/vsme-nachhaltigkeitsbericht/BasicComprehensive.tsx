import { Layers, ListChecks } from "lucide-react";
import { Band, Card, CardGrid, Head, Items, Prose } from "../service-landing/Blocks";

const basicUseCases = [
  "erstmals freiwillig berichten",
  "Nachhaltigkeitsdaten zentral strukturieren",
  "häufiger ESG-Anfragen von Kunden erhalten",
  "Informationen für Banken oder andere Geschäftspartner benötigen",
  "intern einen belastbaren Ausgangspunkt schaffen möchten"
];

const comprehensiveItems = [
  "Geschäftsmodell und Nachhaltigkeitsstrategie",
  "zusätzliche Richtlinien und Maßnahmen",
  "Ziele zur Reduktion von Treibhausgasemissionen",
  "Klimarisiken",
  "zusätzliche Angaben zu Mitarbeitenden",
  "Menschenrechtsrichtlinien und -prozesse",
  "Menschenrechtsvorfälle",
  "bestimmte Geschäftstätigkeiten",
  "Diversität im Leitungsorgan"
];

export function BasicComprehensive() {
  return (
    <Band>
      <Head
        eyebrow="Umfang"
        lead="Nicht jedes Unternehmen benötigt von Beginn an denselben Detailgrad. Der freiwillige Standard arbeitet mit zwei Ebenen."
        title="Basic oder Comprehensive? Wir wählen den Umfang anhand Ihres Ziels."
      />
      <CardGrid columns={2}>
        <Card icon={ListChecks} title="Basic Module">
          <p>
            Das Basic Module bildet die grundlegende Struktur. Es eignet sich
            insbesondere für Unternehmen, die erstmals eine systematische
            Nachhaltigkeitsdatengrundlage aufbauen und die wichtigsten
            Umwelt-, Sozial- und Governance-Informationen nachvollziehbar
            zusammenführen möchten.
          </p>
          <p>
            Das kann sinnvoll sein, wenn Sie:
          </p>
          <Items items={basicUseCases} />
        </Card>
        <Card icon={Layers} title="Basic + Comprehensive Module">
          <p>
            Das Comprehensive Module ergänzt den grundlegenden Bericht um
            weiterführende Informationen.
          </p>
          <p>
            Dazu können beispielsweise gehören:
          </p>
          <Items items={comprehensiveItems} />
          <p>
            Das Comprehensive Module baut auf dem Basic Module auf.
          </p>
        </Card>
      </CardGrid>
      <Prose>
        <p>
          Wir empfehlen nicht automatisch den größtmöglichen Berichtsumfang.
          Entscheidend ist, welche Informationen für Ihr Unternehmen
          tatsächlich sinnvoll und nutzbar sind.
        </p>
      </Prose>
    </Band>
  );
}
