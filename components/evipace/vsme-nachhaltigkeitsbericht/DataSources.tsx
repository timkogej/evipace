import {
  BadgeCheck,
  BriefcaseBusiness,
  Calculator,
  Factory,
  Users
} from "lucide-react";
import { Reveal } from "../Reveal";

const sources = [
  {
    icon: Calculator,
    title: "Buchhaltung und Controlling",
    intro: "Hier finden sich häufig:",
    items: [
      "Stromrechnungen",
      "Gasverbrauch",
      "Heizstoffe",
      "Kraftstoffdaten",
      "Kosten- und Verbrauchsübersichten"
    ]
  },
  {
    icon: Factory,
    title: "Produktion und Betrieb",
    intro: "Zum Beispiel:",
    items: [
      "Produktionsdaten",
      "Energieverbrauch",
      "Wasserverbrauch",
      "Materialeinsatz",
      "Abfallmengen",
      "betriebliche Umweltinformationen"
    ]
  },
  {
    icon: Users,
    title: "Personal",
    intro: "Hier liegen häufig:",
    items: [
      "Beschäftigtenzahlen",
      "Vertragsstrukturen",
      "Arbeitsschutzinformationen",
      "Unfallzahlen",
      "Schulungen",
      "Weiterbildungsdaten"
    ]
  },
  {
    icon: BadgeCheck,
    title: "Qualitäts- und Umweltmanagement",
    intro: "Zum Beispiel:",
    items: [
      "ISO-Zertifikate",
      "Managementsysteme",
      "Umweltverfahren",
      "Richtlinien",
      "bestehende Dokumentation"
    ]
  },
  {
    icon: BriefcaseBusiness,
    title: "Geschäftsführung",
    intro: "Hier entstehen oder liegen beispielsweise:",
    items: [
      "Unternehmensziele",
      "Verantwortlichkeiten",
      "Nachhaltigkeitsinitiativen",
      "Governance-Informationen",
      "strategische Entscheidungen"
    ]
  }
];

export function DataSources() {
  return (
    <section className="section-padding bg-[var(--warm)]">
      <div className="site-shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Datenquellen</p>
          <h2 className="heading-md font-display mt-6 max-w-[18ch]">
            Viele der benötigten Daten haben Sie bereits.
          </h2>
          <p className="body-lg mt-7">
            Nachhaltigkeitsdaten liegen in Unternehmen selten an einem einzigen
            Ort. Das bedeutet aber nicht, dass sie nicht vorhanden sind.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sources.map((source, index) => (
            <Reveal
              className={`rounded-[1.25rem] border border-[rgba(21,21,21,0.11)] bg-white p-7 shadow-lift ${
                index === sources.length - 1 ? "lg:col-span-2" : ""
              }`}
              delay={index * 0.05}
              key={source.title}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--soft-orange)] text-orange">
                <source.icon aria-hidden="true" className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-ink">
                {source.title}
              </h3>
              <p className="mt-3 leading-7 text-muted">{source.intro}</p>
              <ul className="mt-4 space-y-2">
                {source.items.map((item) => (
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
            Die eigentliche Arbeit besteht häufig darin, diese verteilten
            Informationen in einer einheitlichen Berichtsstruktur
            zusammenzuführen.
          </p>
          <p>Genau dafür schaffen wir einen klaren Prozess.</p>
        </Reveal>
      </div>
    </section>
  );
}
