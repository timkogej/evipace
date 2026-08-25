import { FileEdit, Link2, CircleAlert, Calculator, History } from "lucide-react";
import { Reveal } from "../Reveal";

const deliverables = [
  {
    icon: FileEdit,
    title: "Vorbereitete Antworten",
    body: "Antwortentwürfe, die sich direkt an den Fragen und Anforderungen des Kunden orientieren."
  },
  {
    icon: Link2,
    title: "Zugeordnete Nachweise",
    body: "Eine nachvollziehbare Zuordnung zwischen Aussagen und vorhandenen Dokumenten."
  },
  {
    icon: CircleAlert,
    title: "Klare offene Punkte",
    body: "Fehlende Angaben werden nicht versteckt oder erfunden, sondern deutlich gekennzeichnet."
  },
  {
    icon: Calculator,
    title: "Berechnete Kennzahlen",
    body: "Wenn es zum vereinbarten Umfang gehört und die notwendigen Ausgangsdaten verfügbar sind, können beispielsweise Scope-1- und Scope-2-Kennzahlen vorbereitet werden."
  },
  {
    icon: History,
    title: "Nachvollziehbare Dokumentation",
    body: "Sie behalten den Überblick darüber, woher Daten stammen und auf welcher Grundlage Antworten vorbereitet wurden."
  }
];

export function Deliverables() {
  return (
    <section className="section-padding bg-[var(--warm)]">
      <div className="site-shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Ergebnis</p>
          <h2 className="heading-md font-display mt-6 max-w-[18ch]">
            Was Sie am Ende erhalten
          </h2>
          <p className="body-lg mt-7">
            Das Ziel ist nicht noch ein zusätzliches ESG-Dokument, das intern
            niemand verwendet. Sie erhalten eine strukturierte Grundlage für
            die konkrete Anfrage Ihres Kunden.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {deliverables.map((item, index) => (
            <Reveal
              className="rounded-[1.25rem] border border-[rgba(21,21,21,0.11)] bg-white p-7 shadow-lift"
              delay={index * 0.05}
              key={item.title}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--soft-orange)] text-orange">
                <item.icon aria-hidden="true" className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-ink">
                {item.title}
              </h3>
              <p className="mt-3 leading-7 text-muted">{item.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal
          className="mt-10 max-w-3xl rounded-[1.25rem] border border-[rgba(21,21,21,0.11)] bg-white p-7 shadow-lift sm:p-9"
          delay={0.15}
        >
          <h3 className="text-2xl font-bold text-ink sm:text-3xl">
            Klarheit darüber, was evipace leistet
          </h3>
          <div className="mt-5 space-y-4 text-lg leading-8 text-muted">
            <p>
              evipace unterstützt Unternehmen bei der operativen Vorbereitung
              von ESG-Daten, Fragebögen, Nachweisen und Dokumentation.
            </p>
            <p>
              evipace ist keine Zertifizierungs- oder Prüfgesellschaft, führt
              keine gesetzliche Abschluss- oder Nachhaltigkeitsprüfung durch
              und bietet keine Rechtsberatung.
            </p>
            <p>
              Eine bestimmte ESG-Bewertung, Zertifizierung oder Akzeptanz
              durch einen Kunden oder eine externe Plattform kann nicht
              garantiert werden.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
