import { RotateCcw } from "lucide-react";
import { Reveal } from "../Reveal";

const checks = [
  "welches Thema betroffen ist",
  "welche Angabe unklar ist",
  "ob ein Zertifikat zum abgefragten Thema passt",
  "ob Informationen fehlen",
  "ob ein bestehender Nachweis ergänzt werden sollte",
  "welcher interne Input noch erforderlich ist"
];

export function FollowUpSupport() {
  return (
    <section className="section-padding bg-[var(--warm)]">
      <div className="site-shell">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Validierung</p>
          <h2 className="heading-md font-display mt-6 max-w-[20ch]">
            &quot;Nachbesserungsbedarf&quot; erhalten? Wir helfen beim zweiten
            Durchgang.
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-8 text-muted">
            <p>
              IntegrityNext beschreibt einen Validierungsprozess, bei dem
              eingehende Antworten und Dokumente geprüft werden. Werden dabei
              Unklarheiten oder Widersprüche festgestellt, kann der Lieferant
              eine Nachricht mit &quot;Nachbesserungsbedarf&quot; und konkreten
              Hinweisen zur erforderlichen Korrektur erhalten.
            </p>
            <p>
              Wenn Sie eine solche Rückmeldung erhalten haben, müssen Sie nicht
              wieder bei null beginnen.
            </p>
            <p>Wir können gemeinsam prüfen:</p>
          </div>
        </Reveal>

        <Reveal
          className="mt-10 rounded-[1.25rem] border border-[rgba(21,21,21,0.11)] bg-white p-7 shadow-lift sm:p-9"
          delay={0.08}
        >
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--soft-orange)] text-orange">
              <RotateCcw aria-hidden="true" className="h-5 w-5" />
            </div>
            <ul className="grid flex-1 gap-2 sm:grid-cols-2">
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
        </Reveal>

        <Reveal className="mt-10 max-w-3xl space-y-5 text-lg leading-8 text-muted" delay={0.14}>
          <p>
            Anschließend bereiten wir die relevanten Punkte für die erneute
            Prüfung durch Ihr Unternehmen vor.
          </p>
          <p>
            Wir garantieren dabei keinen bestimmten Status oder die Annahme
            einer Antwort. Ziel ist eine sachlich klare, vollständige und
            nachvollziehbare Überarbeitung.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
