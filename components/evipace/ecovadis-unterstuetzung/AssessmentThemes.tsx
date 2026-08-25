import { Factory, HeartHandshake, Scale, ShoppingCart } from "lucide-react";
import { Reveal } from "../Reveal";

const themes = [
  {
    icon: Factory,
    title: "Umwelt",
    intro: "Dazu können unter anderem gehören:",
    items: [
      "Energieverbrauch",
      "CO₂-Emissionen",
      "Abfall",
      "Wasser",
      "Umweltmanagement",
      "Klimaschutz",
      "Umweltziele",
      "Ressourceneffizienz"
    ]
  },
  {
    icon: HeartHandshake,
    title: "Arbeits- und Menschenrechte",
    intro: "Typische Themen sind beispielsweise:",
    items: [
      "Arbeitssicherheit",
      "Arbeitsbedingungen",
      "Schulungen und Weiterbildung",
      "Menschenrechte",
      "Diversität und Gleichbehandlung",
      "soziale Standards"
    ]
  },
  {
    icon: Scale,
    title: "Ethik",
    intro: "Hier können unter anderem relevant sein:",
    items: [
      "Anti-Korruption",
      "Compliance",
      "Geschäftsethik",
      "Datenschutz",
      "Informationssicherheit",
      "Verantwortlichkeiten"
    ]
  },
  {
    icon: ShoppingCart,
    title: "Nachhaltige Beschaffung",
    intro: "Mögliche Themen sind beispielsweise:",
    items: [
      "Nachhaltigkeitsanforderungen an Lieferanten",
      "Einkaufsrichtlinien",
      "Lieferantenbewertung",
      "Verhaltenskodizes für Lieferanten",
      "Nachhaltigkeitskriterien in der Beschaffung"
    ]
  }
];

export function AssessmentThemes() {
  return (
    <section className="section-padding bg-white">
      <div className="site-shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Themenbereiche</p>
          <h2 className="heading-md font-display mt-6 max-w-[18ch]">
            Die vier Themen der EcoVadis-Bewertung
          </h2>
          <p className="body-lg mt-7">
            Welche Fragen konkret gestellt werden, hängt unter anderem von
            Ihrem Unternehmensprofil ab. Die Bewertung orientiert sich jedoch
            an vier zentralen Themenbereichen.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {themes.map((theme, index) => (
            <Reveal
              className="rounded-[1.25rem] border border-[rgba(21,21,21,0.11)] bg-[var(--paper)] p-7 shadow-lift"
              delay={index * 0.05}
              key={theme.title}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-orange shadow-[0_6px_18px_rgba(21,21,21,0.08)]">
                <theme.icon aria-hidden="true" className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-ink">
                {theme.title}
              </h3>
              <p className="mt-3 leading-7 text-muted">{theme.intro}</p>
              <ul className="mt-4 space-y-2">
                {theme.items.map((item) => (
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

        <Reveal className="mt-10 max-w-3xl text-lg leading-8 text-muted" delay={0.12}>
          Der konkrete Umfang ist nicht für jedes Unternehmen identisch.
          Deshalb arbeiten wir mit Ihrem tatsächlichen Fragebogen und Ihren
          vorhandenen Unterlagen - nicht mit einer pauschalen Checkliste.
        </Reveal>
      </div>
    </section>
  );
}
