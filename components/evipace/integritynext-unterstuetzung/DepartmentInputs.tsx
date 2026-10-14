import {
  BriefcaseBusiness,
  Calculator,
  Factory,
  FileBadge2,
  Scale,
  Users
} from "lucide-react";
import { Band, Card, CardGrid, Head, Items, Prose } from "../service-landing/Blocks";

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
    <Band tone="tinted">
      <Head
        eyebrow="Interne Koordination"
        lead="IntegrityNext-Themen liegen selten vollständig bei einer einzigen Person."
        title="Wir bringen die richtigen Informationen aus Ihrem Unternehmen zusammen."
      />
      <CardGrid>
        {departments.map((department) => (
          <Card icon={department.icon} key={department.title} title={department.title}>
            <p>{department.intro}</p>
            <Items items={department.items} />
          </Card>
        ))}
      </CardGrid>
      <Prose>
        <p>
          Sie müssen nicht zuerst selbst koordinieren, welche Abteilung welche
          Information liefern soll. Wir strukturieren den Bedarf entlang der
          angeforderten Assessments.
        </p>
      </Prose>
    </Band>
  );
}
