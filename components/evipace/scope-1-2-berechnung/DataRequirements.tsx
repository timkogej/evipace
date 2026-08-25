import { Database, FileText, Fuel, Zap } from "lucide-react";
import { Reveal } from "../Reveal";

const groups = [
  {
    icon: Fuel,
    title: "Für Scope 1",
    items: [
      "Erdgasverbrauch",
      "Heizöl",
      "Flüssiggas",
      "Diesel",
      "Benzin",
      "andere relevante Brennstoffe",
      "Fuhrparkdaten",
      "Tankkartenabrechnungen",
      "Prozessdaten",
      "Informationen zu Kältemitteln",
      "Wartungs- oder Nachfüllprotokolle"
    ]
  },
  {
    icon: Zap,
    title: "Für Scope 2",
    items: [
      "Stromrechnungen",
      "Jahresverbrauchsübersichten",
      "Zählerdaten",
      "Fernwärmerechnungen",
      "Fernkälte",
      "Informationen zu weiteren eingekauften Energieformen",
      "gegebenenfalls Unterlagen zur Strombeschaffung"
    ]
  },
  {
    icon: FileText,
    title: "Zusätzlich hilfreich",
    items: [
      "Übersicht der Unternehmensstandorte",
      "Bilanzzeitraum",
      "Informationen zu Gesellschaften oder Organisationseinheiten",
      "frühere Berechnungen",
      "bestehende ESG-Berichte",
      "Kundenanforderungen oder Fragebögen, für die die Zahlen benötigt werden"
    ]
  }
];

export function DataRequirements() {
  return (
    <section className="section-padding bg-white">
      <div className="site-shell">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Benötigte Daten</p>
          <h2 className="heading-md font-display mt-6 max-w-[18ch]">
            Welche Daten benötigen wir?
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-8 text-muted">
            <p>
              Sie müssen uns keine fertige CO₂-Tabelle liefern. Wir helfen
              zunächst dabei, die relevanten Ausgangsdaten zu identifizieren.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {groups.map((group, index) => (
            <Reveal
              className="rounded-[1.25rem] border border-[rgba(21,21,21,0.11)] bg-[var(--paper)] p-7 shadow-lift"
              delay={index * 0.06}
              key={group.title}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--soft-orange)] text-orange">
                <group.icon aria-hidden="true" className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-ink">
                {group.title}
              </h3>
              <ul className="mt-5 space-y-2">
                {group.items.map((item) => (
                  <li
                    className="border-t border-[rgba(21,21,21,0.1)] pt-2 text-sm text-muted"
                    key={item}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal
          className="mt-10 flex items-start gap-4 rounded-[1.25rem] border border-[rgba(21,21,21,0.11)] bg-[var(--paper)] p-7 shadow-lift"
          delay={0.12}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--soft-orange)] text-orange">
            <Database aria-hidden="true" className="h-5 w-5" />
          </div>
          <p className="text-lg leading-8 text-muted">
            Sie müssen daraus noch keine perfekte CO₂-Tabelle bauen. Genau
            diese Strukturierung übernehmen wir.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
