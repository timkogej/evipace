import { FileCheck2 } from "lucide-react";
import { Reveal } from "../Reveal";

const questions = [
  "Gibt es die entsprechende Regelung oder Maßnahme im Unternehmen tatsächlich?",
  "Ist sie intern abgestimmt?",
  "Wird sie umgesetzt?",
  "Kann sie glaubwürdig dokumentiert werden?"
];

export function DocumentationIntegrity() {
  return (
    <section className="section-padding bg-[var(--warm)]">
      <div className="site-shell">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Dokumentationslücken</p>
          <h2 className="heading-md font-display mt-6 max-w-[20ch]">
            Fehlende Dokumentation? Erst klären, dann sinnvoll aufbauen.
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-8 text-muted">
            <p>
              Bei der Vorbereitung kann sichtbar werden, dass bestimmte Themen
              noch nicht ausreichend dokumentiert sind.
            </p>
            <p>
              Das bedeutet nicht automatisch, dass kurzfristig irgendein
              Dokument erstellt werden sollte.
            </p>
            <p>Zuerst muss geklärt werden:</p>
          </div>
        </Reveal>

        <Reveal className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" delay={0.08}>
          {questions.map((question) => (
            <div
              className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-6 shadow-[0_14px_45px_rgba(21,21,21,0.045)]"
              key={question}
            >
              <FileCheck2 aria-hidden="true" className="h-5 w-5 text-orange" />
              <p className="mt-4 text-sm font-semibold leading-6 text-muted">
                {question}
              </p>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-10 max-w-3xl space-y-5 text-lg leading-8 text-muted" delay={0.14}>
          <p>
            Wenn eine Richtlinie oder andere Dokumentation tatsächlich als
            Unternehmensinstrument benötigt wird, kann evipace bei der
            strukturierten Ausarbeitung unterstützen.
          </p>
          <p>
            Wir erstellen jedoch keine rückdatierten, fingierten oder
            ausschließlich für eine Bewertung konstruierten Nachweise.
          </p>
          <p>
            Die Dokumentation soll reale Unternehmenspraxis abbilden - nicht
            nur eine Checkbox füllen.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
