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
          Sie möchten zuerst den Fragebogen selbst einordnen? Unsere{" "}
          <InlineLink href="/de/ressourcen/esg-fragebogen-checkliste-lieferanten">
            ESG-Fragebogen-Checkliste
          </InlineLink>{" "}
          hilft beim ersten Überblick.
        </p>
        <p>
          Zur Vorbereitung: <InlineLink href="/de/ressourcen/welche-esg-daten-kunden-lieferanten">Welche ESG-Daten Kunden verlangen</InlineLink>{" "}
          und <InlineLink href="/de/ressourcen/esg-daten-einmal-sammeln-mehrfach-nutzen">wie Sie geprüfte ESG-Daten wiederverwenden</InlineLink>.
        </p>
        <p>
          ESG-Fragebogen erhalten? <InlineLink href="/de/ressourcen/esg-fragebogen-vom-kunden-erhalten">Lesen Sie unseren praktischen Leitfaden für die ersten Schritte.</InlineLink>
        </p>
        <p>
          Welche Dokumente als Nachweis taugen, erklären wir im{" "}
          <InlineLink href="/de/ressourcen/esg-nachweise-lieferanten">Leitfaden zu ESG-Nachweisen für Lieferanten</InlineLink>{" "}
          und in der <InlineLink href="/de/ressourcen/esg-nachweise-checkliste">Checkliste für ESG-Nachweise</InlineLink>.
        </p>
      </Prose>
    </Band>
  );
}
