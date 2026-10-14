import { Band, CardGrid, Head, LinkCard, Prose } from "../service-landing/Blocks";

export function RelatedQuestionnaire() {
  return (
    <Band>
      <Head
        eyebrow="Konkretere Anfrage"
        lead="Nicht jede ESG-Anforderung sieht gleich aus."
        title="Wenn die Kundenanfrage konkreter wird"
      />
      <CardGrid columns={1}>
        <LinkCard
          body={
            <>
              Hat Ihr Kunde einen strukturierten ESG- oder
              Nachhaltigkeitsfragebogen geschickt? Dann unterstützen wir bei der
              Vorbereitung der Antworten, Daten und Nachweise entlang der
              einzelnen Fragen.
            </>
          }
          href="/de/esg-fragebogen-lieferanten"
          more="ESG-Fragebogen für Lieferanten"
          title="ESG-Fragebogen für Lieferanten"
        />
      </CardGrid>
      <Prose>
        <p>
          Andere Anforderungen können beispielsweise aus standardisierten
          ESG-Plattformen, Emissionsabfragen oder Reporting-Anforderungen
          entstehen. Dafür entstehen separate, spezialisierte Leistungsseiten.
        </p>
      </Prose>
    </Band>
  );
}
