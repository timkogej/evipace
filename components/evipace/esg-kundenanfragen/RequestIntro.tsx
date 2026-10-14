import { Band, Head, InlineLink, Prose } from "../service-landing/Blocks";

export function RequestIntro() {
  return (
    <Band>
      <Head eyebrow="Der Ausgangspunkt" title="Eine Anfrage. Viele verstreute Informationen." />
      <Prose>
        <p>
          Kunden fragen nach Emissionen, Richtlinien, Zertifikaten oder
          sozialen Daten. Die Antwort liegt oft verteilt in Rechnungen,
          Tabellen und Dokumenten verschiedener Teams. Wir machen sichtbar,
          was bereits belegt ist, was fehlt und was vor der Antwort intern
          bestätigt werden muss.
        </p>
        <p>
          Geht es konkret um einen Lieferantenfragebogen? Lesen Sie mehr zur{" "}
          <InlineLink href="/de/esg-fragebogen-lieferanten">
            Unterstützung bei ESG-Fragebögen
          </InlineLink>.
        </p>
        <p>
          Zur Vorbereitung: <InlineLink href="/de/ressourcen/welche-esg-daten-kunden-lieferanten">Welche ESG-Daten Kunden verlangen</InlineLink>{" "}
          und <InlineLink href="/de/ressourcen/esg-daten-einmal-sammeln-mehrfach-nutzen">wie Sie geprüfte ESG-Daten wiederverwenden</InlineLink>.
        </p>
      </Prose>
    </Band>
  );
}
