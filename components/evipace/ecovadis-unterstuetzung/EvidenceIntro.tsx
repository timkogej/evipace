import { Band, Head, Prose } from "../service-landing/Blocks";

export function EvidenceIntro() {
  return (
    <Band>
      <Head eyebrow="Nachweise" title="Die Antwort ist nur so gut wie ihr Nachweis." />
      <Prose>
        <p>
          Für eine EcoVadis-Antwort reicht es nicht, möglichst viele Dateien
          hochzuladen. Ein Dokument muss zur konkreten Aussage, zum
          Unternehmen und zum Zeitraum passen. Wir ordnen vorhandene
          Richtlinien, Zertifikate und Daten den passenden Fragen zu und
          machen echte Lücken sichtbar.
        </p>
      </Prose>
    </Band>
  );
}
