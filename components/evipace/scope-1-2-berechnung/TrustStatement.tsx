import { ShieldAlert } from "lucide-react";
import { Band, Card, CardGrid, Head, Items, Prose } from "../service-landing/Blocks";

const limitations = [
  "führen keine gesetzliche Prüfung oder Assurance durch",
  "stellen keine „CO₂-Zertifizierung“ aus",
  "garantieren keine externe Verifizierung",
  "garantieren keine rechtliche Compliance",
  "garantieren keine Akzeptanz durch Kunden, Plattformen oder Banken",
  "ersetzen keine Rechtsberatung",
  "erzeugen keine unbelegten Verbrauchs- oder Emissionsdaten"
];

export function TrustStatement() {
  return (
    <Band tone="dark">
      <Head
        dark
        eyebrow="Vertrauen"
        lead="Evipace unterstützt Unternehmen bei der strukturierten Erfassung und Berechnung von Scope-1- und Scope-2-Treibhausgasemissionen."
        title="Nachvollziehbare Berechnung - ohne falsche Sicherheit"
      />
      <CardGrid columns={1}>
        <Card icon={ShieldAlert} title="Wir:">
          <Items items={limitations} />
        </Card>
      </CardGrid>
      <Prose dark>
        <p>
          Berechnungen basieren auf den verfügbaren Unternehmensdaten,
          dokumentierten Annahmen und der für den jeweiligen Anwendungsfall
          verwendeten Methodik.
        </p>
      </Prose>
    </Band>
  );
}
