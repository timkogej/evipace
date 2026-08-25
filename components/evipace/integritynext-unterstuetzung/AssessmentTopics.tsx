import {
  Factory,
  HeartHandshake,
  PackageCheck,
  Scale,
  ShoppingCart
} from "lucide-react";
import { Reveal } from "../Reveal";

const topics = [
  {
    icon: Factory,
    title: "Umwelt und Klima",
    intro: "Je nach Anfrage können relevant sein:",
    items: [
      "Umweltschutz",
      "Energieverbrauch",
      "CO₂-Emissionen",
      "Klimaschutz",
      "Umweltmanagement",
      "Carbon-Daten"
    ]
  },
  {
    icon: HeartHandshake,
    title: "Arbeitsbedingungen und Menschenrechte",
    intro: "Zum Beispiel:",
    items: [
      "Arbeitsschutz",
      "Arbeitsbedingungen",
      "Menschenrechte",
      "Vielfalt und Inklusion",
      "soziale Standards"
    ]
  },
  {
    icon: Scale,
    title: "Ethik und Compliance",
    intro: "Mögliche Themen:",
    items: [
      "Anti-Korruption",
      "Geschäftsethik",
      "Compliance-Strukturen",
      "interne Verantwortlichkeiten"
    ]
  },
  {
    icon: ShoppingCart,
    title: "Lieferkette",
    intro: "Je nach Kundenanforderung können Fragen entstehen zu:",
    items: [
      "Lieferantenmanagement",
      "Nachhaltigkeitsanforderungen an Lieferanten",
      "Due-Diligence-Prozessen",
      "Transparenz in der Lieferkette"
    ]
  },
  {
    icon: PackageCheck,
    title: "Produkt- und materialspezifische Anforderungen",
    intro:
      "Bei bestimmten Unternehmen oder Lieferketten können auch spezifischere Themen relevant werden, beispielsweise:",
    items: [
      "Konfliktmineralien",
      "EUDR",
      "produkt- oder materialbezogene Compliance",
      "weitere regulatorische Kundenanforderungen"
    ]
  }
];

export function AssessmentTopics() {
  return (
    <section className="section-padding bg-[var(--warm)]">
      <div className="site-shell">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Assessment-Themen</p>
          <h2 className="heading-md font-display mt-6 max-w-[20ch]">
            Welche Themen können in IntegrityNext relevant sein?
          </h2>
          <p className="body-lg mt-7">
            IntegrityNext deckt unterschiedliche Nachhaltigkeits- und
            Compliance-Themen ab. Welche Assessments Ihr Unternehmen
            tatsächlich bearbeiten soll, hängt von der jeweiligen
            Kundenanforderung ab. Die Plattform nennt unter anderem
            Supply-Chain-Due-Diligence, Produkt- und Material-Compliance,
            Carbon-Themen, Lieferkettentransparenz und
            Nachhaltigkeitsberichterstattung; im Supplier Helpdesk gibt es
            zudem spezifische Assessment-Leitfäden, etwa zu Konfliktmineralien
            und EUDR.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic, index) => (
            <Reveal
              className={`rounded-[1.25rem] border border-[rgba(21,21,21,0.11)] bg-white p-7 shadow-lift ${
                index === topics.length - 1 ? "lg:col-span-2" : ""
              }`}
              delay={index * 0.05}
              key={topic.title}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--soft-orange)] text-orange">
                <topic.icon aria-hidden="true" className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-ink">
                {topic.title}
              </h3>
              <p className="mt-3 leading-7 text-muted">{topic.intro}</p>
              <ul className="mt-4 space-y-2">
                {topic.items.map((item) => (
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
          Nicht jedes Unternehmen muss jedes dieser Themen bearbeiten.
          Entscheidend sind die Assessments, die für Ihr Profil tatsächlich
          angefordert wurden.
        </Reveal>
      </div>
    </section>
  );
}
