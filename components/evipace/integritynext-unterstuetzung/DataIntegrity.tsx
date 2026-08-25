import { FileCheck2 } from "lucide-react";
import { Reveal } from "../Reveal";

const questions = [
  "Was ist vorhanden?",
  "Was ist dokumentiert?",
  "Was kann belegt werden?",
  "Wo fehlen Informationen?",
  "Was sollte intern tatsächlich verbessert werden?"
];

export function DataIntegrity() {
  return (
    <section className="section-padding bg-white">
      <div className="site-shell">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Integrität</p>
          <h2 className="heading-md font-display mt-6 max-w-[20ch]">
            Ihre Antworten sollten die tatsächliche Unternehmenspraxis
            abbilden.
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-8 text-muted">
            <p>
              Eine Sustainability- oder Compliance-Selbstauskunft ist kein
              Marketingtext.
            </p>
            <p>
              Wenn eine Maßnahme im Unternehmen nicht existiert, sollte sie
              nicht einfach als vorhanden dargestellt werden.
            </p>
            <p>
              Wenn kein passendes Zertifikat vorhanden ist, sollte kein anderes
              Dokument so behandelt werden, als würde es das gefragte Thema
              abdecken.
            </p>
            <p>
              Wenn eine Richtlinie erst aufgebaut werden muss, sollte daraus
              eine reale Unternehmensregelung entstehen - nicht nur ein Dokument
              für eine Checkbox.
            </p>
            <p>
              Evipace unterstützt deshalb bei der Abbildung des tatsächlichen
              Unternehmensstands:
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5" delay={0.08}>
          {questions.map((question) => (
            <div
              className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-[var(--paper)] p-6 shadow-[0_14px_45px_rgba(21,21,21,0.045)]"
              key={question}
            >
              <FileCheck2 aria-hidden="true" className="h-5 w-5 text-orange" />
              <p className="mt-4 text-sm font-semibold leading-6 text-muted">
                {question}
              </p>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-10 max-w-3xl text-2xl leading-9 text-ink" delay={0.14}>
          Unser Ziel ist eine vollständige und nachvollziehbare Selbstauskunft -
          nicht ein künstlich &quot;grünes&quot; Profil.
        </Reveal>
      </div>
    </section>
  );
}
