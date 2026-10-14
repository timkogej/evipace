import { Band, Card, CardGrid, Head, InlineLink, Prose } from "../service-landing/Blocks";

const sources = [
  {
    title: "Buchhaltung",
    body: "Hier finden sich beispielsweise Stromrechnungen, Brennstoffkosten, Kraftstoffdaten oder andere Verbrauchsinformationen."
  },
  {
    title: "Qualitätsmanagement",
    body: "Zertifikate, Managementsysteme und bestehende Dokumentationen sind häufig bereits vorhanden."
  },
  {
    title: "Personalabteilung",
    body: "Informationen zu Beschäftigten, Arbeitsschutz, Weiterbildung oder sozialen Kennzahlen kommen oft aus HR."
  },
  {
    title: "Geschäftsführung",
    body: "Richtlinien, Verantwortlichkeiten und Governance-Themen benötigen häufig Informationen oder Freigaben aus der Unternehmensleitung."
  },
  {
    title: "Produktion",
    body: "Verbrauchs-, Energie- oder Aktivitätsdaten können direkt aus Produktion oder Betriebsführung stammen."
  },
  {
    title: "Bestehende Excel-Dateien und Kundenanfragen",
    body: "Auch frühere ESG-Abfragen enthalten oft bereits Informationen, die wiederverwendet werden können."
  }
];

export function DataSources() {
  return (
    <Band tone="tinted">
      <Head
        eyebrow="Vorhandene Grundlage"
        title="Ihre ESG-Daten sind oft bereits vorhanden - nur nicht als fertige Kundenantwort."
      >
        <p>
          Viele Unternehmen beginnen bei jeder neuen ESG-Anfrage wieder bei
          null.
        </p>
        <p>
          Dabei liegen große Teile der benötigten Informationen häufig
          bereits im Unternehmen.
        </p>
      </Head>
      <CardGrid>
        {sources.map((source) => (
          <Card key={source.title} title={source.title}>
            <p>{source.body}</p>
          </Card>
        ))}
      </CardGrid>
      <Prose>
        <p>
          Evipace macht aus verteilten Unternehmensinformationen eine
          strukturierte Antwort auf die konkrete Kundenanforderung.
        </p>
        <p>
          Unklar, welche Abteilung welche Informationen liefern soll? Unser
          Überblick zeigt zuerst,{" "}
          <InlineLink href="/de/ressourcen/welche-esg-daten-kunden-lieferanten">
            welche ESG-Daten Kunden typischerweise anfragen
          </InlineLink>
          . Unser Leitfaden zeigt eine praktische{" "}
          <InlineLink href="/de/ressourcen/esg-daten-verantwortliche-abteilungen">
            Data-Owner-Struktur für ESG-Kundenanfragen
          </InlineLink>{" "}
          – von Finance und HR bis Einkauf, Qualität und Operations.
        </p>
        <p>
          Wenn der Kunde eine Environmental Policy verlangt, sollte eine{" "}
          <InlineLink href="/de/ressourcen/environmental-policy-erstellen">
            belastbare Umweltrichtlinie aus tatsächlicher Praxis
          </InlineLink>{" "}
          entstehen – nicht aus rückwirkenden oder generischen Aussagen.
        </p>
        <p>
          Bei Lieferantenanforderungen hilft ein{" "}
          <InlineLink href="/de/ressourcen/supplier-code-of-conduct-erstellen">
            sauber abgegrenzter Supplier Code of Conduct
          </InlineLink>
          , damit veröffentlichte Erwartungen, Lieferantenbestätigung und
          tatsächliche Umsetzung nicht vermischt werden.
        </p>
        <p>
          Wenn mehrere Kunden ähnliche Informationen verlangen, lohnt sich
          außerdem eine{" "}
          <InlineLink href="/de/ressourcen/esg-daten-einmal-sammeln-mehrfach-nutzen">
            wiederverwendbare ESG-Datengrundlage
          </InlineLink>
          , damit Daten und Nachweise nicht bei jeder Anfrage neu
          zusammengesucht werden.
        </p>
      </Prose>
    </Band>
  );
}
