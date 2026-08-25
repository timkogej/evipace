import { FileSpreadsheet, Fuel, Gauge, Snowflake, Zap } from "lucide-react";
import Link from "next/link";
import { Reveal } from "../Reveal";

const sources = [
  {
    icon: Zap,
    title: "Stromverbrauch",
    body: "steht auf Rechnungen oder in Verbrauchsübersichten."
  },
  {
    icon: Fuel,
    title: "Brennstoffe",
    body: "Erdgas, Heizöl oder andere Brennstoffe werden bereits erfasst."
  },
  {
    icon: Gauge,
    title: "Fuhrpark",
    body: "Tankkartenabrechnungen, Kraftstoffrechnungen oder Verbrauchsdaten liefern die Ausgangswerte."
  },
  {
    icon: Snowflake,
    title: "Kältemittel",
    body: "können in Wartungsprotokollen und Nachfüllmengen dokumentiert sein."
  },
  {
    icon: FileSpreadsheet,
    title: "Eingekaufte Energie",
    body: "Fernwärme oder andere eingekaufte Energie ist ebenfalls abrechenbar."
  }
];

export function SourceDataIntro() {
  return (
    <section className="section-padding bg-white">
      <div className="site-shell">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Ausgangsdaten</p>
          <h2 className="heading-md font-display mt-6 max-w-[20ch]">
            Ihre Emissionswerte entstehen nicht aus Schätzungen - sondern aus
            konkreten Unternehmensdaten.
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-8 text-muted">
            <p>
              Viele Unternehmen haben die wichtigsten Ausgangsdaten bereits.
              Sie liegen nur nicht unter der Überschrift „CO₂-Bilanz“.
            </p>
            <p>
              Viele der benötigten Daten sind also bereits vorhanden. Sie
              müssen sauber abgegrenzt, vereinheitlicht und mit geeigneten
              Emissionsfaktoren verknüpft werden.
            </p>
            <p>
              Noch nicht sicher, welche Verbrauchsdaten Sie zuerst
              zusammentragen müssen?{" "}
              <Link
                className="orange-link"
                href="/de/ressourcen/scope-1-2-daten-berechnung"
              >
                Unser Leitfaden zeigt die benötigten Daten für Scope 1 und Scope
                2 – von Brennstoffen und Kältemitteln bis zu Strom und Fernwärme
              </Link>
              .
            </p>
            <p>
              Wenn Sie zunächst eine strukturierte Arbeitsdatei brauchen,
              können Sie mit der{" "}
              <Link
                className="orange-link"
                href="/de/ressourcen/scope-1-2-datenerfassungs-vorlage"
              >
                Scope 1 &amp; 2 Datenerfassungs-Vorlage
              </Link>{" "}
              Standorte, Aktivitätsdaten, Quellen und Datenlücken vorbereiten.
            </p>
            <p>
              Genau daraus entsteht eine nachvollziehbare
              Treibhausgasbilanz. Evipace übernimmt diese operative
              Strukturierung und Berechnung für Sie.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {sources.map((source, index) => (
            <Reveal
              className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-[var(--paper)] p-6 shadow-[0_12px_35px_rgba(21,21,21,0.04)]"
              delay={index * 0.05}
              key={source.title}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--soft-orange)] text-orange">
                <source.icon aria-hidden="true" className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-ink">
                {source.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                {source.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
