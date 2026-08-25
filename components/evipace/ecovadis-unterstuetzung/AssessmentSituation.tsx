import { RefreshCw, Sparkles } from "lucide-react";
import { Reveal } from "../Reveal";

const firstAssessmentItems = [
  "welche Informationen benötigt werden",
  "welche Dokumente bereits verwendet werden können",
  "welche Daten noch fehlen",
  "wie das vorhandene Material sinnvoll strukturiert wird"
];

const reassessmentItems = [
  "welche Unterlagen bereits verwendet wurden",
  "welche Themen noch schwach dokumentiert sind",
  "welche realen Änderungen seit der letzten Bewertung vorgenommen wurden",
  "welche neuen Nachweise verfügbar sind",
  "wo weiterhin offene Punkte bestehen"
];

export function AssessmentSituation() {
  return (
    <section className="section-padding bg-[var(--warm)]">
      <div className="site-shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Ausgangslage</p>
          <h2 className="heading-md font-display mt-6 max-w-[18ch]">
            Erstbewertung oder erneute Bewertung?
          </h2>
          <p className="body-lg mt-7">
            Die Ausgangssituation ist nicht immer dieselbe.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <Reveal className="rounded-[1.25rem] border border-[rgba(21,21,21,0.11)] bg-white p-7 shadow-lift">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--soft-orange)] text-orange">
              <Sparkles aria-hidden="true" className="h-5 w-5" />
            </div>
            <h3 className="mt-5 text-2xl font-bold text-ink">
              Erste EcoVadis-Bewertung
            </h3>
            <p className="mt-4 leading-7 text-muted">
              Bei einer ersten Bewertung besteht die größte Herausforderung oft
              darin, überhaupt zu verstehen:
            </p>
            <ul className="mt-4 space-y-2">
              {firstAssessmentItems.map((item) => (
                <li
                  className="border-t border-[rgba(21,21,21,0.1)] pt-2 text-sm text-muted"
                  key={item}
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 leading-7 text-muted">
              evipace hilft dabei, aus den vorhandenen
              Unternehmensinformationen eine klare Arbeitsgrundlage für das
              Assessment zu machen.
            </p>
          </Reveal>

          <Reveal
            className="rounded-[1.25rem] border border-[rgba(21,21,21,0.11)] bg-white p-7 shadow-lift"
            delay={0.08}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--soft-orange)] text-orange">
              <RefreshCw aria-hidden="true" className="h-5 w-5" />
            </div>
            <h3 className="mt-5 text-2xl font-bold text-ink">
              Erneute Bewertung
            </h3>
            <p className="mt-4 leading-7 text-muted">
              Wenn bereits eine frühere Scorecard vorhanden ist, kann die
              Vorbereitung gezielter erfolgen. Wir können beispielsweise
              prüfen:
            </p>
            <ul className="mt-4 space-y-2">
              {reassessmentItems.map((item) => (
                <li
                  className="border-t border-[rgba(21,21,21,0.1)] pt-2 text-sm text-muted"
                  key={item}
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 leading-7 text-muted">
              Ziel ist eine besser vorbereitete und nachvollziehbar
              dokumentierte Einreichung - nicht die Garantie einer bestimmten
              Punktzahl.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
