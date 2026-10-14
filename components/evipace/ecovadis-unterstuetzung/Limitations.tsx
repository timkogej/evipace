import { ShieldAlert } from "lucide-react";
import { Band, Card, CardGrid, Head, Items, Prose } from "../service-landing/Blocks";

const limitations = [
  "vergeben keine EcoVadis-Bewertungen",
  "beeinflussen die Bewertung nicht",
  "garantieren keine Punktzahl",
  "garantieren keine Medaille",
  "garantieren keine Annahme bestimmter Dokumente",
  "erstellen keine fingierten Nachweise",
  "führen keine Audit- oder Assurance-Leistung durch",
  "bieten keine Rechtsberatung"
];

export function Limitations() {
  return (
    <Band tone="dark">
      <Head dark eyebrow="Transparenz" title="Was Evipace nicht macht">
        <p>
          Transparenz ist bei EcoVadis-Unterstützung besonders wichtig.
        </p>
        <p>Evipace ist ein unabhängiger Dienstleister.</p>
      </Head>
      <CardGrid columns={1}>
        <Card icon={ShieldAlert} title="Wir:">
          <Items items={limitations} />
        </Card>
      </CardGrid>
      <Prose dark>
        <p>
          Evipace ist nicht mit EcoVadis verbunden und ist kein von EcoVadis
          akkreditierter Beratungspartner.
        </p>
        <p>
          Unsere Aufgabe besteht darin, Ihre vorhandenen ESG-Informationen,
          Daten und Nachweise strukturiert für Ihre Vorbereitung
          aufzubereiten.
        </p>
      </Prose>
    </Band>
  );
}
