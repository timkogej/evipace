import {
  BriefcaseBusiness,
  Calculator,
  Factory,
  FileBadge2,
  Scale,
  Users
} from "lucide-react";
import { Reveal } from "../Reveal";

const departments = [
  {
    icon: FileBadge2,
    title: "Qualitätsmanagement",
    intro: "Hier finden sich häufig:",
    items: [
      "ISO-Zertifikate",
      "Managementsysteme",
      "Prozessbeschreibungen",
      "Qualitäts- und Umweltdokumentation"
    ]
  },
  {
    icon: Users,
    title: "Personal und Arbeitsschutz",
    intro: "Relevant können unter anderem sein:",
    items: [
      "Beschäftigtendaten",
      "Arbeitsschutz",
      "Schulungen",
      "Diversität",
      "soziale Standards",
      "interne Personalrichtlinien"
    ]
  },
  {
    icon: Scale,
    title: "Geschäftsführung und Compliance",
    intro: "Hier liegen häufig Informationen zu:",
    items: [
      "Verantwortlichkeiten",
      "Geschäftsethik",
      "Anti-Korruption",
      "Compliance",
      "internen Richtlinien",
      "Governance"
    ]
  },
  {
    icon: BriefcaseBusiness,
    title: "Einkauf",
    intro: "Je nach angefordertem Assessment können relevant sein:",
    items: [
      "Lieferantenanforderungen",
      "Einkaufsrichtlinien",
      "Supplier Codes",
      "Lieferantenmanagement",
      "Informationen zur Lieferkette"
    ]
  },
  {
    icon: Factory,
    title: "Produktion und Umwelt",
    intro: "Zum Beispiel:",
    items: [
      "Energieverbrauch",
      "Emissionen",
      "Umweltmaßnahmen",
      "Ressourcenverbrauch",
      "betriebliche Prozesse"
    ]
  },
  {
    icon: Calculator,
    title: "Buchhaltung und Controlling",
    intro: "Hier können Ausgangsdaten liegen für:",
    items: [
      "Strom",
      "Brennstoffe",
      "Kraftstoffe",
      "Verbrauchswerte",
      "weitere Kennzahlen"
    ]
  }
];

export function DepartmentInputs() {
  return (
    <section className="section-padding bg-white">
      <div className="site-shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Interne Koordination</p>
          <h2 className="heading-md font-display mt-6 max-w-[20ch]">
            Wir bringen die richtigen Informationen aus Ihrem Unternehmen
            zusammen.
          </h2>
          <p className="body-lg mt-7">
            IntegrityNext-Themen liegen selten vollständig bei einer einzigen
            Person.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {departments.map((department, index) => (
            <Reveal
              className="rounded-[1.25rem] border border-[rgba(21,21,21,0.11)] bg-[var(--paper)] p-7 shadow-lift"
              delay={index * 0.05}
              key={department.title}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-orange shadow-[0_6px_18px_rgba(21,21,21,0.08)]">
                <department.icon aria-hidden="true" className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-ink">
                {department.title}
              </h3>
              <p className="mt-3 leading-7 text-muted">{department.intro}</p>
              <ul className="mt-4 space-y-2">
                {department.items.map((item) => (
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
          Sie müssen nicht zuerst selbst koordinieren, welche Abteilung welche
          Information liefern soll. Wir strukturieren den Bedarf entlang der
          angeforderten Assessments.
        </Reveal>
      </div>
    </section>
  );
}
