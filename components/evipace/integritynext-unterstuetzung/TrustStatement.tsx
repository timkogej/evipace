import { ShieldAlert } from "lucide-react";
import { Band, Card, CardGrid, Head, Items, Prose } from "../service-landing/Blocks";

const limitations = [
  "vergeben keine IntegrityNext-Bewertungen",
  "kontrollieren oder beeinflussen die Validierung nicht",
  "garantieren keinen bestimmten Status",
  "garantieren keine Annahme bestimmter Antworten oder Dokumente",
  "erstellen keine fingierten Nachweise",
  "führen keine gesetzliche Audit- oder Assurance-Leistung durch",
  "bieten keine Rechtsberatung"
];

export function TrustStatement() {
  return (
    <Band tone="dark">
      <Head
        dark
        eyebrow="Unabhängigkeit"
        lead="Evipace ist ein unabhängiger Dienstleister und nicht mit IntegrityNext verbunden."
        title="Unabhängige Unterstützung bei Ihrer Vorbereitung"
      />
      <CardGrid columns={1}>
        <Card icon={ShieldAlert} title="Wir:">
          <Items items={limitations} />
        </Card>
      </CardGrid>
      <Prose dark>
        <p>
          Unsere Aufgabe ist die strukturierte Vorbereitung Ihrer eigenen
          Unternehmensinformationen für die konkrete Kundenanforderung.
        </p>
      </Prose>
    </Band>
  );
}
