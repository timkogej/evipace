import { CalendarDays, Database, Factory, GitBranch, MapPin } from "lucide-react";
import { Reveal } from "../Reveal";

const boundaries = [
  {
    icon: CalendarDays,
    title: "Berichtszeitraum",
    body: "Für welches Jahr oder welchen Zeitraum soll gerechnet werden?"
  },
  {
    icon: MapPin,
    title: "Standorte",
    body: "Welche Produktionsstätten, Büros, Lager oder anderen Standorte gehören zur Berechnung?"
  },
  {
    icon: GitBranch,
    title: "Gesellschaften und Einheiten",
    body: "Welche Unternehmen oder organisatorischen Einheiten sollen berücksichtigt werden?"
  },
  {
    icon: Factory,
    title: "Emissionsquellen",
    body: "Welche Energie- und Brennstoffquellen gehören innerhalb dieser Abgrenzung zu Scope 1 und Scope 2?"
  },
  {
    icon: Database,
    title: "Datenverfügbarkeit",
    body: "Sind alle Verbrauchsdaten für denselben Zeitraum vollständig vorhanden?"
  }
];

export function BoundarySetup() {
  return (
    <section className="section-padding bg-white">
      <div className="site-shell">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Bilanzgrenze</p>
          <h2 className="heading-md font-display mt-6 max-w-[20ch]">
            Bevor gerechnet wird, muss klar sein, was zum Unternehmen gehört.
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-8 text-muted">
            <p>
              Eine gute Treibhausgasbilanz beginnt nicht mit einem
              Emissionsfaktor. Sie beginnt mit der Bilanzgrenze.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {boundaries.map((item, index) => (
            <Reveal
              className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-[var(--paper)] p-6 shadow-[0_12px_35px_rgba(21,21,21,0.04)]"
              delay={index * 0.05}
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

        <Reveal className="mt-10 max-w-3xl space-y-5 text-lg leading-8 text-muted" delay={0.12}>
          <p>
            Eine präzise Rechnung beginnt mit einer klaren Grenze - nicht mit
            einem Emissionsfaktor.
          </p>
          <p>
            Deshalb klären wir die Bilanzstruktur, bevor einzelne
            Verbrauchswerte miteinander verrechnet werden.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
