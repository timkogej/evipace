import { Network } from "lucide-react";
import { Band, Card, CardGrid, Head, Items } from "../service-landing/Blocks";

const examples = [
  "eingekauften Materialien",
  "Transport",
  "Geschäftsreisen",
  "Pendelverkehr",
  "Entsorgung",
  "Kapitalgütern",
  "Nutzung verkaufter Produkte",
  "anderen Wertschöpfungskettenaktivitäten"
];

export function ScopeThreeClarification() {
  return (
    <Band tone="tinted">
      <Head eyebrow="Abgrenzung" title="Und Scope 3?" />
      <CardGrid columns={1}>
        <Card icon={Network}>
          <p>
            Scope 3 umfasst weitere indirekte Treibhausgasemissionen
            entlang der vor- und nachgelagerten Wertschöpfungskette.
          </p>
          <p>Dazu können beispielsweise Emissionen aus:</p>
          <Items items={examples} />
          <p>
            Die Datenerhebung und Berechnung ist häufig deutlich komplexer
            als bei Scope 1 und Scope 2.
          </p>
          <p>
            Das auf dieser Seite beschriebene Angebot konzentriert sich
            zunächst auf Scope 1 und Scope 2. Ob Scope 3 für Ihren konkreten
            Kunden, Berichtsstandard oder anderen Anwendungsfall benötigt
            wird, sollte separat geprüft werden.
          </p>
        </Card>
      </CardGrid>
    </Band>
  );
}
