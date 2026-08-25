import { BarChart3, Database, FileText, ListChecks } from "lucide-react";
import { Reveal } from "../Reveal";

const deliverables = [
  {
    icon: BarChart3,
    title: "Scope-1-Ergebnis",
    body: "Gesamtergebnis der relevanten direkten Treibhausgasemissionen."
  },
  {
    icon: BarChart3,
    title: "Scope-2-Ergebnis",
    body: "Gesamtergebnis der relevanten Emissionen aus eingekaufter Energie."
  },
  {
    icon: ListChecks,
    title: "Aufschlüsselung nach Emissionsquellen",
    body: "Je nach Datenlage beispielsweise Erdgas, Heizöl, Fuhrpark, Kältemittel, Strom oder Fernwärme."
  },
  {
    icon: Database,
    title: "Aktivitätsdaten",
    body: "Die verwendeten Verbrauchswerte bleiben nachvollziehbar dokumentiert."
  },
  {
    icon: FileText,
    title: "Emissionsfaktoren",
    body: "Verwendete Faktoren und ihre Quellen werden festgehalten."
  },
  {
    icon: FileText,
    title: "Methodik",
    body: "Die Berechnungslogik und relevante Annahmen werden dokumentiert."
  },
  {
    icon: ListChecks,
    title: "Offene Punkte",
    body: "Fehlende oder unsichere Ausgangsdaten werden transparent gekennzeichnet."
  },
  {
    icon: Database,
    title: "Wiederverwendbare Berechnungsgrundlage",
    body: "Die Struktur kann als Ausgangspunkt für spätere Aktualisierungen dienen."
  }
];

export function Deliverables() {
  return (
    <section className="section-padding bg-white">
      <div className="site-shell">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Ergebnis</p>
          <h2 className="heading-md font-display mt-6 max-w-[20ch]">
            Was Sie von uns zurückbekommen
          </h2>
          <p className="body-lg mt-7">
            Eine Scope-1-&-2-Berechnung sollte mehr liefern als nur eine
            einzelne Zahl.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {deliverables.map((item, index) => (
            <Reveal
              className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-[var(--paper)] p-6 shadow-[0_12px_35px_rgba(21,21,21,0.04)]"
              delay={index * 0.04}
              key={item.title}
            >
              <item.icon aria-hidden="true" className="h-5 w-5 text-orange" />
              <h3 className="mt-5 text-lg font-bold text-ink">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted">{item.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 max-w-3xl text-lg leading-8 text-muted" delay={0.12}>
          Sie sehen nicht nur, wie viele Tonnen CO₂e entstanden sind - sondern
          auch, wie die Zahl berechnet wurde.
        </Reveal>
      </div>
    </section>
  );
}
