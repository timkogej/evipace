import { Band, Head, InlineLink, Prose } from "../service-landing/Blocks";

export function DataFoundation() {
  return (
    <Band>
      <Head eyebrow="Datengrundlage" title="Ein guter Bericht beginnt mit belastbaren Daten." />
      <Prose>
        <p>
          Energie, Emissionen, Mitarbeitende, Richtlinien und Nachweise liegen
          häufig schon vor – nur nicht an einem Ort. Wir strukturieren diese
          Informationen, klären den Berichtsrahmen und machen fehlende
          Angaben sichtbar, bevor daraus ein VSME-Berichtsentwurf wird.
        </p>
        <p>
          Welche Angaben werden gebraucht? Der{" "}
          <InlineLink href="/de/ressourcen/vsme-daten-nachhaltigkeitsbericht">
            Leitfaden zu VSME-Daten
          </InlineLink>{" "}
          zeigt die wichtigsten Themen.
        </p>
      </Prose>
    </Band>
  );
}
