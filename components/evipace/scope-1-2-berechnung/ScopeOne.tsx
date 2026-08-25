import { Factory, Flame, Fuel, Snowflake } from "lucide-react";
import { Reveal } from "../Reveal";

const groups = [
  {
    icon: Flame,
    title: "Stationäre Verbrennung",
    items: [
      "Erdgas",
      "Heizöl",
      "Flüssiggas",
      "andere Brennstoffe für Heizung",
      "Brennstoffe für industrielle Anlagen oder Prozesse"
    ]
  },
  {
    icon: Fuel,
    title: "Fuhrpark und mobile Quellen",
    items: [
      "Diesel",
      "Benzin",
      "andere Kraftstoffe",
      "eigene oder kontrollierte Fahrzeuge",
      "bestimmte betriebliche Maschinen"
    ]
  },
  {
    icon: Factory,
    title: "Prozessemissionen",
    body: "Bei manchen Produktionsprozessen entstehen Treibhausgasemissionen direkt durch die jeweilige Tätigkeit. Ob solche Emissionen für Ihr Unternehmen relevant sind, muss separat geprüft werden."
  },
  {
    icon: Snowflake,
    title: "Kältemittel",
    items: [
      "Wartungsprotokolle",
      "Nachfüllmengen",
      "Anlagenübersichten",
      "Dokumentationen zu eingesetzten Kältemitteln"
    ]
  }
];

export function ScopeOne() {
  return (
    <section className="section-padding bg-[var(--warm)]">
      <div className="site-shell">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Scope 1</p>
          <h2 className="heading-md font-display mt-6 max-w-[20ch]">
            Direkte Emissionen aus Quellen Ihres Unternehmens
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-8 text-muted">
            <p>
              Scope 1 umfasst direkte Treibhausgasemissionen aus Quellen, die
              Ihrem Unternehmen gehören oder von ihm kontrolliert werden.
            </p>
            <p>
              Welche Quellen relevant sind, hängt vom jeweiligen Unternehmen ab.
            </p>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-4">
          {groups.map((group, index) => (
            <Reveal
              className="rounded-[1.25rem] border border-[rgba(21,21,21,0.11)] bg-white p-7 shadow-lift"
              delay={index * 0.05}
              key={group.title}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--soft-orange)] text-orange">
                <group.icon aria-hidden="true" className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-ink">
                {group.title}
              </h3>
              {group.body ? (
                <p className="mt-4 leading-7 text-muted">{group.body}</p>
              ) : null}
              {group.items ? (
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
              ) : null}
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 max-w-3xl text-lg leading-8 text-muted" delay={0.12}>
          Scope 1 besteht deshalb nicht einfach aus „Gas plus Firmenwagen“.
          Die tatsächlichen Emissionsquellen müssen für das konkrete
          Unternehmen identifiziert werden.
        </Reveal>
      </div>
    </section>
  );
}
