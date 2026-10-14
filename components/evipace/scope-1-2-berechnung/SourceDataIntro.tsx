import { Band, Head, InlineLink, Prose } from "../service-landing/Blocks";

export function SourceDataIntro() {
  return (
    <Band>
      <Head eyebrow="Ausgangsdaten" title="Die Berechnung beginnt bei Ihren Verbrauchsdaten." />
      <Prose>
        <p>
          Stromrechnungen, Brennstoff- und Fuhrparkdaten, Kältemittel und
          eingekaufte Wärme bilden die Grundlage. Wir grenzen Standorte und
          Zeitraum ab, vereinheitlichen die Angaben und dokumentieren die
          verwendeten Emissionsfaktoren.
        </p>
        <p>
          Zum Einstieg:{" "}
          <InlineLink href="/de/ressourcen/scope-1-2-daten-berechnung">
            benötigte Scope-1- und Scope-2-Daten
          </InlineLink>{" "}
          und die{" "}
          <InlineLink href="/de/ressourcen/scope-1-2-datenerfassungs-vorlage">
            Datenerfassungs-Vorlage
          </InlineLink>.
        </p>
      </Prose>
    </Band>
  );
}
