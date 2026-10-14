import { Band, Head, InlineLink, Prose } from "../service-landing/Blocks";

export function ProblemIntro() {
  return (
    <Band>
      <Head eyebrow="Der Ausgangspunkt" title="Die Fragen stehen im Dokument. Die Antworten liegen im Unternehmen." />
      <Prose>
        <p>
          Energieverbrauch, Emissionen, Richtlinien und Zertifikate liegen oft
          bei verschiedenen Teams. Wir ordnen vorhandene Angaben den Fragen
          Ihres Kunden zu und zeigen, welche Antworten belegt sind und wo
          noch eine Bestätigung fehlt.
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
      </Prose>
    </Band>
  );
}
