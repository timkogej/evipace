import {
  Factory,
  HeartHandshake,
  PackageCheck,
  Scale,
  ShoppingCart
} from "lucide-react";
import { Band, Card, CardGrid, Head, Items, Prose } from "../service-landing/Blocks";

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
    <Band>
      <Head
        eyebrow="Assessment-Themen"
        lead="IntegrityNext deckt unterschiedliche Nachhaltigkeits- und Compliance-Themen ab. Welche Assessments Ihr Unternehmen tatsächlich bearbeiten soll, hängt von der jeweiligen Kundenanforderung ab. Die Plattform nennt unter anderem Supply-Chain-Due-Diligence, Produkt- und Material-Compliance, Carbon-Themen, Lieferkettentransparenz und Nachhaltigkeitsberichterstattung; im Supplier Helpdesk gibt es zudem spezifische Assessment-Leitfäden, etwa zu Konfliktmineralien und EUDR."
        title="Welche Themen können in IntegrityNext relevant sein?"
      />
      <CardGrid>
        {topics.map((topic) => (
          <Card icon={topic.icon} key={topic.title} title={topic.title}>
            <p>{topic.intro}</p>
            <Items items={topic.items} />
          </Card>
        ))}
      </CardGrid>
      <Prose>
        <p>
          Nicht jedes Unternehmen muss jedes dieser Themen bearbeiten.
          Entscheidend sind die Assessments, die für Ihr Profil tatsächlich
          angefordert wurden.
        </p>
      </Prose>
    </Band>
  );
}
