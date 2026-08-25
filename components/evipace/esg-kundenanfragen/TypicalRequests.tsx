import {
  BadgeCheck,
  Factory,
  FileStack,
  Scale,
  Users,
  Zap
} from "lucide-react";
import { Reveal } from "../Reveal";

const categories = [
  {
    icon: Zap,
    title: "Emissionen und Energie",
    intro: "Typische Anforderungen sind:",
    items: [
      "Scope-1-Emissionen",
      "Scope-2-Emissionen",
      "Stromverbrauch",
      "Brennstoffverbrauch",
      "Kraftstoffverbrauch",
      "erneuerbare Energie",
      "teilweise weitere CO₂- oder Scope-3-Angaben"
    ]
  },
  {
    icon: Factory,
    title: "Umweltinformationen",
    intro: "Kunden fragen häufig nach:",
    items: [
      "Umweltpolitik",
      "Energieeffizienz",
      "Abfallmanagement",
      "Wasserverbrauch",
      "Umweltzielen",
      "Klimazielen",
      "Maßnahmen zur Emissionsreduktion"
    ]
  },
  {
    icon: Scale,
    title: "Richtlinien und Governance",
    intro: "Dazu können gehören:",
    items: [
      "Code of Conduct",
      "Supplier Code of Conduct",
      "Anti-Korruptionsrichtlinien",
      "Compliance-Regelungen",
      "Verantwortlichkeiten",
      "Menschenrechtsrichtlinien",
      "interne Nachhaltigkeitsrichtlinien"
    ]
  },
  {
    icon: BadgeCheck,
    title: "Zertifikate",
    intro:
      "Je nach Kunde und Branche können bestehende Zertifizierungen oder Managementsysteme relevant sein, beispielsweise:",
    items: [
      "ISO 14001",
      "ISO 9001",
      "ISO 45001",
      "weitere branchen- oder kundenspezifische Zertifikate"
    ],
    note: "Ob eine bestimmte Zertifizierung tatsächlich benötigt wird, hängt immer von der konkreten Anfrage ab."
  },
  {
    icon: Users,
    title: "Soziale und unternehmensbezogene Daten",
    intro: "Auch Informationen wie diese können Teil einer ESG-Kundenanfrage sein:",
    items: [
      "Beschäftigtenzahlen",
      "Arbeitsschutz",
      "Weiterbildungen",
      "Diversität",
      "soziale Standards",
      "Compliance-Strukturen"
    ]
  },
  {
    icon: FileStack,
    title: "Nachweise und Dokumentation",
    intro:
      "Oft reicht eine reine Aussage nicht aus. Kunden verlangen zusätzlich unterstützende Dokumente wie:",
    items: [
      "Rechnungen",
      "interne Tabellen",
      "Zertifikate",
      "Richtlinien",
      "Berechnungen",
      "Berichte",
      "Unternehmensdokumente"
    ]
  }
];

export function TypicalRequests() {
  return (
    <section className="section-padding bg-white">
      <div className="site-shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Typische Inhalte</p>
          <h2 className="heading-md font-display mt-6 max-w-[18ch]">
            Was Kunden typischerweise anfordern
          </h2>
          <p className="body-lg mt-7">
            Welche Informationen benötigt werden, hängt vom jeweiligen Kunden,
            der Branche und der Position in der Lieferkette ab. Bestimmte
            Themen treten jedoch besonders häufig auf.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <Reveal
              className="rounded-[1.25rem] border border-[rgba(21,21,21,0.11)] bg-[var(--paper)] p-7 shadow-lift"
              delay={index * 0.05}
              key={category.title}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-orange shadow-[0_6px_18px_rgba(21,21,21,0.08)]">
                <category.icon aria-hidden="true" className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-ink">
                {category.title}
              </h3>
              <p className="mt-3 leading-7 text-muted">{category.intro}</p>
              <ul className="mt-4 space-y-2">
                {category.items.map((item) => (
                  <li
                    className="border-t border-[rgba(21,21,21,0.1)] pt-2 text-sm text-muted"
                    key={item}
                  >
                    {item}
                  </li>
                ))}
              </ul>
              {category.note ? (
                <p className="mt-4 text-sm leading-6 text-[rgba(21,21,21,0.58)]">
                  {category.note}
                </p>
              ) : null}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
