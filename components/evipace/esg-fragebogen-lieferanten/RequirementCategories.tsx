import { ArrowRight, Zap, Factory, Users, Scale, BadgeCheck } from "lucide-react";
import Link from "next/link";
import { Reveal } from "../Reveal";

const categories = [
  {
    icon: Zap,
    title: "Energie und Emissionen",
    items: [
      "Stromverbrauch",
      "Erdgas und andere Brennstoffe",
      "Kraftstoffverbrauch",
      "Scope-1-Emissionen",
      "Scope-2-Emissionen",
      "teilweise Scope-3-Angaben",
      "erneuerbare Energie"
    ]
  },
  {
    icon: Factory,
    title: "Umwelt",
    items: [
      "Umweltpolitik",
      "Energieeffizienz",
      "Abfall",
      "Wasserverbrauch",
      "Umweltziele",
      "Maßnahmen zur Emissionsreduktion"
    ]
  },
  {
    icon: Users,
    title: "Mitarbeitende und Soziales",
    items: [
      "Beschäftigtenzahlen",
      "Arbeitsschutz",
      "Schulungen",
      "Diversität",
      "soziale Standards",
      "Menschenrechte"
    ]
  },
  {
    icon: Scale,
    title: "Governance und Richtlinien",
    items: [
      "Code of Conduct",
      "Supplier Code of Conduct",
      "Anti-Korruptionsrichtlinien",
      "Compliance",
      "Verantwortlichkeiten",
      "interne Nachhaltigkeitsrichtlinien"
    ]
  },
  {
    icon: BadgeCheck,
    title: "Zertifikate und Nachweise",
    items: [
      "ISO-Zertifikate",
      "Rechnungen und Verbrauchsdaten",
      "interne Richtlinien",
      "Berichte",
      "Unternehmensdokumente",
      "bestehende ESG-Nachweise"
    ]
  }
];

export function RequirementCategories() {
  return (
    <section className="section-padding bg-[var(--warm)]">
      <div className="site-shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Typische Anforderungen</p>
          <h2 className="heading-md font-display mt-6 max-w-[20ch]">
            Welche Informationen Kunden typischerweise verlangen
          </h2>
          <p className="body-lg mt-7">
            Die Anforderungen unterscheiden sich je nach Kunde, Branche und
            Lieferkette. Bestimmte Themen tauchen jedoch besonders häufig
            auf.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <Reveal
              className="rounded-[1.25rem] border border-[rgba(21,21,21,0.11)] bg-white p-7 shadow-lift"
              delay={index * 0.05}
              key={category.title}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--soft-orange)] text-orange">
                <category.icon aria-hidden="true" className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-ink">
                {category.title}
              </h3>
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
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 max-w-2xl text-sm leading-7 text-muted" delay={0.1}>
          Wir unterscheiden dabei zwischen vorhandenen Nachweisen,
          berechenbaren Angaben und Informationen, die noch von Ihrem
          Unternehmen bestätigt werden müssen.
        </Reveal>
        <Reveal className="mt-5" delay={0.12}>
          <Link
            className="orange-link inline-flex items-center gap-2 text-sm"
            href="/de/ressourcen/esg-nachweise-lieferanten"
          >
            Welche ESG-Nachweise konkrete Aussagen wirklich belegen
            <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
          </Link>
        </Reveal>
        <Reveal className="mt-3" delay={0.14}>
          <Link
            className="orange-link inline-flex items-center gap-2 text-sm"
            href="/de/ressourcen/esg-nachweise-checkliste"
          >
            Einzelnen Nachweis vor der Verwendung prüfen
            <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
