import { FileStack } from "lucide-react";
import { Band, Card, CardGrid, Head, Items, Prose } from "../service-landing/Blocks";

const foundationItems = [
  "belastbare Daten",
  "nachvollziehbare Kennzahlen",
  "dokumentierte Quellen",
  "klare Richtlinien",
  "wiederverwendbare Informationen",
  "ein strukturierter Bericht, der diese Grundlage zusammenführt"
];

export function PracticalFoundation() {
  return (
    <Band>
      <Head eyebrow="Nutzbare Grundlage" title="Kein Hochglanzbericht für die Schublade. Eine nutzbare ESG-Grundlage für Ihr Unternehmen.">
        <p>
          Nicht jedes Produktionsunternehmen braucht einen hundertseitigen
          Nachhaltigkeitsbericht mit umfangreichen Imagekapiteln.
        </p>
        <p>Für viele kleine und mittlere Unternehmen ist etwas anderes wertvoller:</p>
      </Head>
      <CardGrid columns={1}>
        <Card icon={FileStack}>
          <Items items={foundationItems} />
        </Card>
      </CardGrid>
      <Prose>
        <p>Evipace konzentriert sich auf genau diese operative Ebene.</p>
        <p>
          Wir helfen Ihnen dabei, Nachhaltigkeitsinformationen so aufzubauen,
          dass sie nicht nur gut aussehen, sondern im Unternehmensalltag
          tatsächlich nutzbar sind.
        </p>
      </Prose>
    </Band>
  );
}
