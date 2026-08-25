import { Layers, ListChecks } from "lucide-react";
import { Reveal } from "../Reveal";

const basicUseCases = [
  "erstmals freiwillig berichten",
  "Nachhaltigkeitsdaten zentral strukturieren",
  "häufiger ESG-Anfragen von Kunden erhalten",
  "Informationen für Banken oder andere Geschäftspartner benötigen",
  "intern einen belastbaren Ausgangspunkt schaffen möchten"
];

const comprehensiveItems = [
  "Geschäftsmodell und Nachhaltigkeitsstrategie",
  "zusätzliche Richtlinien und Maßnahmen",
  "Ziele zur Reduktion von Treibhausgasemissionen",
  "Klimarisiken",
  "zusätzliche Angaben zu Mitarbeitenden",
  "Menschenrechtsrichtlinien und -prozesse",
  "Menschenrechtsvorfälle",
  "bestimmte Geschäftstätigkeiten",
  "Diversität im Leitungsorgan"
];

export function BasicComprehensive() {
  return (
    <section className="section-padding bg-white">
      <div className="site-shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Umfang</p>
          <h2 className="heading-md font-display mt-6 max-w-[20ch]">
            Basic oder Comprehensive? Wir wählen den Umfang anhand Ihres Ziels.
          </h2>
          <p className="body-lg mt-7">
            Nicht jedes Unternehmen benötigt von Beginn an denselben
            Detailgrad. Der freiwillige Standard arbeitet mit zwei Ebenen.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <Reveal className="rounded-[1.25rem] border border-[rgba(21,21,21,0.11)] bg-[var(--paper)] p-7 shadow-lift sm:p-9">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-orange shadow-[0_6px_18px_rgba(21,21,21,0.08)]">
              <ListChecks aria-hidden="true" className="h-5 w-5" />
            </div>
            <h3 className="mt-5 text-2xl font-bold text-ink">Basic Module</h3>
            <p className="mt-4 leading-7 text-muted">
              Das Basic Module bildet die grundlegende Struktur. Es eignet sich
              insbesondere für Unternehmen, die erstmals eine systematische
              Nachhaltigkeitsdatengrundlage aufbauen und die wichtigsten
              Umwelt-, Sozial- und Governance-Informationen nachvollziehbar
              zusammenführen möchten.
            </p>
            <p className="mt-5 leading-7 text-muted">
              Das kann sinnvoll sein, wenn Sie:
            </p>
            <ul className="mt-4 space-y-2">
              {basicUseCases.map((item) => (
                <li
                  className="border-t border-[rgba(21,21,21,0.1)] pt-2 text-sm text-muted"
                  key={item}
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal
            className="rounded-[1.25rem] border border-[rgba(21,21,21,0.11)] bg-[var(--paper)] p-7 shadow-lift sm:p-9"
            delay={0.08}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-orange shadow-[0_6px_18px_rgba(21,21,21,0.08)]">
              <Layers aria-hidden="true" className="h-5 w-5" />
            </div>
            <h3 className="mt-5 text-2xl font-bold text-ink">
              Basic + Comprehensive Module
            </h3>
            <p className="mt-4 leading-7 text-muted">
              Das Comprehensive Module ergänzt den grundlegenden Bericht um
              weiterführende Informationen.
            </p>
            <p className="mt-5 leading-7 text-muted">
              Dazu können beispielsweise gehören:
            </p>
            <ul className="mt-4 space-y-2">
              {comprehensiveItems.map((item) => (
                <li
                  className="border-t border-[rgba(21,21,21,0.1)] pt-2 text-sm text-muted"
                  key={item}
                >
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-5 leading-7 text-muted">
              Das Comprehensive Module baut auf dem Basic Module auf.
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-10 max-w-3xl text-lg leading-8 text-muted" delay={0.14}>
          Wir empfehlen nicht automatisch den größtmöglichen Berichtsumfang.
          Entscheidend ist, welche Informationen für Ihr Unternehmen
          tatsächlich sinnvoll und nutzbar sind.
        </Reveal>
      </div>
    </section>
  );
}
