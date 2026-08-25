import { Calculator, Database, FileText } from "lucide-react";
import { Reveal } from "../Reveal";

const groups = [
  {
    icon: Database,
    title: "Aktivitätsdaten",
    items: [
      "Erdgas",
      "Heizöl",
      "Diesel",
      "Benzin",
      "andere relevante Brennstoffe",
      "eingekaufter Strom"
    ]
  },
  {
    icon: Calculator,
    title: "Berechnungsgrundlage",
    items: [
      "Verbrauchseinheiten",
      "passende Emissionsfaktoren",
      "klare Abgrenzung",
      "dokumentierte Berechnungsmethode"
    ]
  },
  {
    icon: FileText,
    title: "Ergebnis",
    items: [
      "Scope-1-Emissionen",
      "Scope-2-Emissionen",
      "nachvollziehbare Berechnungsunterlagen"
    ]
  }
];

export function ScopeData() {
  return (
    <section className="section-padding bg-[var(--warm)]">
      <div className="site-shell">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Emissionen</p>
          <h2 className="heading-md font-display mt-6 max-w-[20ch]">
            Scope 1 und Scope 2 sind Teil der Datengrundlage - nicht nur ein
            separates Excel-Thema.
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-8 text-muted">
            <p>
              Treibhausgasemissionen gehören zu den zentralen Umweltkennzahlen
              des freiwilligen Berichtsrahmens.
            </p>
            <p>
              Dafür reicht es nicht, lediglich eine Zahl in den Bericht
              einzutragen.
            </p>
            <p>
              Eine nachvollziehbare Berechnung benötigt eine belastbare
              Grundlage.
            </p>
            <p>Zum Beispiel:</p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {groups.map((group, index) => (
            <Reveal
              className="rounded-[1.25rem] border border-[rgba(21,21,21,0.11)] bg-white p-7 shadow-lift"
              delay={index * 0.06}
              key={group.title}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--soft-orange)] text-orange">
                <group.icon aria-hidden="true" className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-ink">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-2">
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

        <Reveal className="mt-10 max-w-3xl space-y-5 text-lg leading-8 text-muted" delay={0.12}>
          <p>
            Evipace kann diese Daten im Rahmen des Berichtsprojekts
            mitstrukturieren und - sofern die erforderlichen Ausgangsdaten
            vorhanden sind - die entsprechenden Kennzahlen vorbereiten.
          </p>
          <p>
            So bleibt nachvollziehbar, wie eine Zahl im Bericht entstanden ist.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
