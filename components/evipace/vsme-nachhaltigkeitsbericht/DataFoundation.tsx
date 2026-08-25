import Link from "next/link";
import { Reveal } from "../Reveal";

const questions = [
  "Wie viel Energie wird verbraucht?",
  "Welche direkten und indirekten Emissionen entstehen?",
  "Welche Informationen gibt es zu Mitarbeitenden, Arbeitsschutz und Weiterbildung?",
  "Welche Umweltmaßnahmen, Richtlinien oder Managementsysteme bestehen bereits?",
  "Welche Angaben können belegt werden - und wo fehlen noch Daten?"
];

export function DataFoundation() {
  return (
    <section className="section-padding bg-white">
      <div className="site-shell">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Datengrundlage</p>
          <h2 className="heading-md font-display mt-6 max-w-[20ch]">
            Ein Nachhaltigkeitsbericht beginnt nicht mit Text - sondern mit
            Daten.
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-8 text-muted">
            <p>
              Ein guter Nachhaltigkeitsbericht entsteht nicht dadurch, dass
              zuerst Seiten über Nachhaltigkeit geschrieben werden.
            </p>
            <p>
              Zuerst muss klar sein, was im Unternehmen tatsächlich vorhanden
              ist.
            </p>
          </div>
        </Reveal>

        <Reveal className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5" delay={0.08}>
          {questions.map((question) => (
            <div
              className="border-t border-[rgba(21,21,21,0.13)] pt-4 text-sm font-semibold leading-6 text-[rgba(21,21,21,0.66)]"
              key={question}
            >
              {question}
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-10 max-w-3xl space-y-5 text-lg leading-8 text-muted" delay={0.14}>
          <p>Genau dort beginnt evipace.</p>
          <p>
            Wir starten bei den Informationen, die bereits in Ihrem Unternehmen
            existieren - nicht bei einer leeren Berichtsvorlage.
          </p>
          <p>
            Aus Rechnungen, Tabellen, Kennzahlen, Richtlinien, Zertifikaten und
            internen Informationen entsteht Schritt für Schritt eine
            strukturierte ESG-Datengrundlage.
          </p>
          <p>
            Noch unsicher, welche Unternehmensdaten Sie vor dem eigentlichen
            Bericht zusammentragen müssen?{" "}
            <Link
              className="orange-link"
              href="/de/ressourcen/vsme-daten-nachhaltigkeitsbericht"
            >
              Unser Leitfaden zeigt die wichtigsten VSME-Daten von Energie und
              Emissionen bis zu Abfall, Mitarbeitenden und Policies
            </Link>
            .
          </p>
          <p>Erst daraus wird der Bericht.</p>
        </Reveal>
      </div>
    </section>
  );
}
