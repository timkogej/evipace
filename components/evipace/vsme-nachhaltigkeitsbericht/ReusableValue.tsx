import { BadgeCheck, Building2, FileQuestion, Landmark, LineChart } from "lucide-react";
import { Reveal } from "../Reveal";

const uses = [
  {
    icon: Building2,
    title: "Kundenanfragen",
    body: "Wenn ein Kunde später Energie-, Emissions- oder Mitarbeiterdaten verlangt, müssen viele Informationen nicht erneut von Grund auf gesucht werden."
  },
  {
    icon: FileQuestion,
    title: "Lieferantenfragebögen",
    body: "Bestehende Kennzahlen und Dokumente können als Grundlage für weitere ESG-Abfragen dienen."
  },
  {
    icon: BadgeCheck,
    title: "EcoVadis",
    body: "Vorhandene Richtlinien, Kennzahlen und Nachweise können eine bessere Ausgangsbasis für die Vorbereitung einer Bewertung bilden."
  },
  {
    icon: FileQuestion,
    title: "IntegrityNext",
    body: "Auch für angeforderte Supplier Assessments können bereits strukturierte Unternehmensinformationen relevant sein."
  },
  {
    icon: Landmark,
    title: "Banken und Finanzierung",
    body: "Der freiwillige Berichtsstandard ist unter anderem darauf ausgerichtet, Nachhaltigkeitsinformationen bereitzustellen, die auch für Finanzierungs- und Informationsbedürfnisse relevant sein können."
  },
  {
    icon: LineChart,
    title: "Interne Steuerung",
    body: "Ein konsistenter Datensatz macht Entwicklungen über die Zeit besser sichtbar."
  }
];

export function ReusableValue() {
  return (
    <section className="section-padding bg-white">
      <div className="site-shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Wiederverwendung</p>
          <h2 className="heading-md font-display mt-6 max-w-[20ch]">
            Ein Bericht, der auch nach der Veröffentlichung noch nützlich ist.
          </h2>
          <p className="body-lg mt-7">
            Ein Nachhaltigkeitsbericht sollte nicht das Ende des Prozesses
            sein. Die strukturierte Datengrundlage dahinter kann für Ihr
            Unternehmen langfristig wertvoller sein als das fertige PDF allein.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {uses.map((item, index) => (
            <Reveal
              className="rounded-[1.25rem] border border-[rgba(21,21,21,0.11)] bg-[var(--paper)] p-7 shadow-lift"
              delay={index * 0.05}
              key={item.title}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-orange shadow-[0_6px_18px_rgba(21,21,21,0.08)]">
                <item.icon aria-hidden="true" className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-ink">
                {item.title}
              </h3>
              <p className="mt-3 leading-7 text-muted">{item.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 max-w-3xl text-lg leading-8 text-muted" delay={0.12}>
          Die Datenbasis hinter dem Bericht ist oft wertvoller als der Bericht
          allein.
        </Reveal>
      </div>
    </section>
  );
}
