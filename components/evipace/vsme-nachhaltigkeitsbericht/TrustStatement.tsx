import { ShieldAlert } from "lucide-react";
import { Band, Card, CardGrid, Head, Items, Prose } from "../service-landing/Blocks";

const limitations = [
  "führen keine gesetzliche Abschlussprüfung oder Assurance durch",
  "vergeben keine VSME-Zertifizierung",
  "garantieren keine rechtliche Compliance",
  "garantieren keine Akzeptanz durch Kunden oder Banken",
  "ersetzen keine Rechtsberatung",
  "stellen fehlende Unternehmenspraktiken nicht als bestehend dar"
];

export function TrustStatement() {
  return (
    <Band tone="dark">
      <Head
        dark
        eyebrow="Transparenz"
        lead="Evipace unterstützt bei der praktischen Vorbereitung und Erstellung freiwilliger Nachhaltigkeitsberichte."
        title="Strukturierte Unterstützung - ohne falsche Versprechen"
      />
      <CardGrid columns={1}>
        <Card icon={ShieldAlert} title="Wir:">
          <Items items={limitations} />
        </Card>
      </CardGrid>
      <Prose dark>
        <p>
          Kennzahlen, Texte und Dokumentation werden auf Basis der verfügbaren
          Unternehmensinformationen vorbereitet und durch das Unternehmen
          geprüft.
        </p>
      </Prose>
    </Band>
  );
}
