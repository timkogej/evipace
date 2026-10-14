import {
  BadgeCheck,
  BriefcaseBusiness,
  Calculator,
  Factory,
  Users
} from "lucide-react";
import { Band, Card, CardGrid, Head, Items, Prose } from "../service-landing/Blocks";

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
    <Band tone="tinted">
      <Head
        eyebrow="Datenquellen"
        lead="Nachhaltigkeitsdaten liegen in Unternehmen selten an einem einzigen Ort. Das bedeutet aber nicht, dass sie nicht vorhanden sind."
        title="Viele der benötigten Daten haben Sie bereits."
      />
      <CardGrid>
        {sources.map((source) => (
          <Card icon={source.icon} key={source.title} title={source.title}>
            <p>{source.intro}</p>
            <Items items={source.items} />
          </Card>
        ))}
      </CardGrid>
      <Prose>
        <p>
          Die eigentliche Arbeit besteht häufig darin, diese verteilten
          Informationen in einer einheitlichen Berichtsstruktur
          zusammenzuführen.
        </p>
        <p>Genau dafür schaffen wir einen klaren Prozess.</p>
      </Prose>
    </Band>
  );
}
