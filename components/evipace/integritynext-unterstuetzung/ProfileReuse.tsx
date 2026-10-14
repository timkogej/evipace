import { History } from "lucide-react";
import { Band, Card, CardGrid, Head, Items, Prose } from "../service-landing/Blocks";

const reusableItems = [
  "Zertifikate",
  "Richtlinien",
  "Unternehmensdaten",
  "Verantwortlichkeiten",
  "Nachhaltigkeitsinformationen",
  "bestehende Antworten"
];

export function ProfileReuse() {
  return (
    <Band tone="tinted">
      <Head eyebrow="Wiederverwendung" title="Einmal sauber aufgebaut, bei weiteren Kunden leichter nutzbar.">
        <p>
          Ein gut gepflegtes Supplier-Profil kann auch bei weiteren
          Kundenanforderungen hilfreich sein.
        </p>
        <p>
          IntegrityNext ermöglicht Lieferanten, ein bestehendes Profil mit
          weiteren anfragenden Unternehmen zu teilen, statt für jeden
          Kunden grundsätzlich von vorne zu beginnen. Kundenspezifische
          Anforderungen können dennoch variieren.
        </p>
        <p>Für Ihr Unternehmen bedeutet das:</p>
        <p>Bereits strukturierte Informationen wie</p>
      </Head>
      <CardGrid columns={1}>
        <Card icon={History}>
          <Items items={reusableItems} />
        </Card>
      </CardGrid>
      <Prose>
        <p>
          Die Arbeit an einer Kundenanfrage kann damit gleichzeitig helfen,
          Ihre ESG-Dokumentation langfristig besser zu organisieren.
        </p>
      </Prose>
    </Band>
  );
}
