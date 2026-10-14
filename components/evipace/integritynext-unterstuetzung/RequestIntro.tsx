import { Band, Head, InlineLink, Prose } from "../service-landing/Blocks";

export function RequestIntro() {
  return (
    <Band>
      <Head eyebrow="Einladung" title="Die Einladung ist da. Die Informationen liegen an vielen Orten." />
      <Prose>
        <p>
          Eine IntegrityNext-Anfrage betrifft oft mehrere Teams, Zertifikate
          und Unternehmensbereiche. Wir prüfen die angeforderten Assessments,
          ordnen vorhandene Unterlagen zu und halten fest, was noch beantwortet
          oder intern bestätigt werden muss.
        </p>
        <p>
          Neu auf der Plattform? Unser{" "}
          <InlineLink href="/de/ressourcen/integritynext-einladung-lieferanten">
            Leitfaden zur IntegrityNext-Einladung
          </InlineLink>{" "}
          erklärt die ersten Schritte.
        </p>
      </Prose>
    </Band>
  );
}
