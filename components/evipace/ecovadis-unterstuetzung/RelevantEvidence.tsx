import { ArrowRight, BadgeCheck, BarChart3, FileStack, ListChecks, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Reveal } from "../Reveal";

const evidenceGroups = [
  {
    icon: ShieldCheck,
    title: "Richtlinien und Policies",
    intro: "Beispiele sind:",
    items: [
      "Umweltpolitik",
      "Nachhaltigkeitsrichtlinien",
      "Code of Conduct",
      "Anti-Korruptionsrichtlinie",
      "Menschenrechtsrichtlinie",
      "Einkaufsrichtlinien",
      "Arbeitsschutzrichtlinien"
    ]
  },
  {
    icon: BadgeCheck,
    title: "Zertifikate",
    intro: "Zum Beispiel:",
    items: [
      "ISO 14001",
      "ISO 9001",
      "ISO 45001",
      "andere relevante Managementsysteme oder Zertifizierungen"
    ]
  },
  {
    icon: BarChart3,
    title: "Kennzahlen und Daten",
    intro: "Zum Beispiel:",
    items: [
      "Energieverbrauch",
      "Scope-1-Emissionen",
      "Scope-2-Emissionen",
      "Beschäftigtendaten",
      "Schulungskennzahlen",
      "Arbeitsschutzkennzahlen"
    ]
  },
  {
    icon: FileStack,
    title: "Berichte und Dokumentation",
    intro: "Zum Beispiel:",
    items: [
      "Nachhaltigkeitsberichte",
      "interne Berichte",
      "Verfahrensbeschreibungen",
      "Mitarbeiterhandbücher",
      "Managementdokumente",
      "bestehende ESG-Dokumentation"
    ]
  },
  {
    icon: ListChecks,
    title: "Maßnahmen und Umsetzung",
    intro:
      "Wo relevant, kann nicht nur eine Richtlinie wichtig sein, sondern auch der Nachweis, dass ein Thema tatsächlich umgesetzt oder verfolgt wird.",
    items: [
      "verantwortliche Rollen",
      "umgesetzte Maßnahmen",
      "interne Prozesse",
      "praktische Nachverfolgung"
    ]
  }
];

export function RelevantEvidence() {
  return (
    <section className="section-padding bg-[var(--warm)]">
      <div className="site-shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Dokumente</p>
          <h2 className="heading-md font-display mt-6 max-w-[18ch]">
            Welche Nachweise können relevant sein?
          </h2>
          <p className="body-lg mt-7">
            Je nach Fragebogen und Unternehmenssituation können
            unterschiedliche Dokumente als Nachweis relevant sein.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {evidenceGroups.map((group, index) => (
            <Reveal
              className={`rounded-[1.25rem] border border-[rgba(21,21,21,0.11)] bg-white p-7 shadow-lift ${
                index === evidenceGroups.length - 1 ? "lg:col-span-2" : ""
              }`}
              delay={index * 0.05}
              key={group.title}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--soft-orange)] text-orange">
                <group.icon aria-hidden="true" className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-ink">
                {group.title}
              </h3>
              <p className="mt-3 leading-7 text-muted">{group.intro}</p>
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

        <Reveal className="mt-10 max-w-3xl text-lg leading-8 text-muted" delay={0.12}>
          <p>
            Entscheidend ist nicht die Menge der Dokumente, sondern ihre Relevanz
            für die jeweilige Aussage. evipace hilft dabei, vorhandene Unterlagen
            gezielt zuzuordnen, statt Dokumente ohne klare Funktion hochzuladen.
          </p>
          <p className="mt-4">
            Welche Dokumente EcoVadis als Supporting Evidence berücksichtigt und
            wie Sie das 55-Dokumente-Limit sinnvoll nutzen, erklären wir in
            unserem {" "}
            <Link
              className="orange-link"
              href="/de/ressourcen/ecovadis-dokumente-nachweise"
            >
              Leitfaden zu EcoVadis-Dokumenten und Nachweisen
            </Link>
            .
          </p>
        </Reveal>
        <Reveal className="mt-5" delay={0.14}>
          <Link
            className="orange-link inline-flex items-center gap-2 text-sm"
            href="/de/ressourcen/esg-nachweise-lieferanten"
          >
            ESG-Nachweise nach Aussage, Scope und Zeitraum prüfen
            <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
