import { ClipboardCheck } from "lucide-react";
import { Reveal } from "../Reveal";

const checks = [
  "den vorgesehenen Anwendungsfall",
  "die benötigte Berechnungsmethode",
  "aktuelle geeignete Emissionsfaktoren",
  "relevante Datenquellen",
  "verwendete methodische Grundlagen"
];

export function MethodologyStandards() {
  return (
    <section className="section-padding bg-[var(--warm)]">
      <div className="site-shell">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Methodischer Stand</p>
          <h2 className="heading-md font-display mt-6 max-w-[18ch]">
            Wir arbeiten mit dem aktuellen methodischen Stand.
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-8 text-muted">
            <p>
              Standards, Leitlinien und Emissionsfaktoren entwickeln sich
              weiter.
            </p>
            <p>
              Deshalb sollte eine Berechnung nicht auf einer dauerhaft
              festgeschriebenen internen Tabelle beruhen, die über Jahre
              unverändert weiterverwendet wird.
            </p>
          </div>
        </Reveal>

        <Reveal
          className="mt-10 rounded-[1.25rem] border border-[rgba(21,21,21,0.11)] bg-white p-7 shadow-lift sm:p-9"
          delay={0.08}
        >
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--soft-orange)] text-orange">
              <ClipboardCheck aria-hidden="true" className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-ink">
                Bei neuen Berechnungen prüfen wir:
              </h3>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {checks.map((check) => (
                  <li
                    className="border-t border-[rgba(21,21,21,0.1)] pt-2 text-sm text-muted"
                    key={check}
                  >
                    {check}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal className="mt-10 max-w-3xl space-y-5 text-lg leading-8 text-muted" delay={0.12}>
          <p>
            Laufende oder angekündigte Änderungen an Standards behandeln wir
            nicht als bereits geltende Anforderungen.
          </p>
          <p>
            So bleibt nachvollziehbar, auf welchem methodischen Stand eine
            Berechnung erstellt wurde.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
