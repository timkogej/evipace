import { FileEdit, Link2, CircleAlert, Calculator, History } from "lucide-react";
import { Band, Card, CardGrid, Head } from "../service-landing/Blocks";

const deliverables = [
  {
    icon: FileEdit,
    title: "Vorbereitete Antworten",
    body: "Antwortentwürfe, die sich direkt an den Fragen und Anforderungen des Kunden orientieren."
  },
  {
    icon: Link2,
    title: "Zugeordnete Nachweise",
    body: "Eine nachvollziehbare Zuordnung zwischen Aussagen und vorhandenen Dokumenten."
  },
  {
    icon: CircleAlert,
    title: "Klare offene Punkte",
    body: "Fehlende Angaben werden nicht versteckt oder erfunden, sondern deutlich gekennzeichnet."
  },
  {
    icon: Calculator,
    title: "Berechnete Kennzahlen",
    body: "Wenn es zum vereinbarten Umfang gehört und die notwendigen Ausgangsdaten verfügbar sind, können beispielsweise Scope-1- und Scope-2-Kennzahlen vorbereitet werden."
  },
  {
    icon: History,
    title: "Nachvollziehbare Dokumentation",
    body: "Sie behalten den Überblick darüber, woher Daten stammen und auf welcher Grundlage Antworten vorbereitet wurden."
  }
];

export function Deliverables() {
  return (
    <Band tone="orange">
      <Head
        eyebrow="Ergebnis"
        lead="Das Ziel ist nicht noch ein zusätzliches ESG-Dokument, das intern niemand verwendet. Sie erhalten eine strukturierte Grundlage für die konkrete Anfrage Ihres Kunden."
        title="Was Sie am Ende erhalten"
      />
      <CardGrid>
        {deliverables.map((item) => (
          <Card icon={item.icon} key={item.title} title={item.title}>
            <p>{item.body}</p>
          </Card>
        ))}
      </CardGrid>
      <CardGrid columns={1}>
        <Card title="Klarheit darüber, was Evipace leistet">
          <p>
            Evipace unterstützt Unternehmen bei der operativen Vorbereitung
            von ESG-Daten, Fragebögen, Nachweisen und Dokumentation.
          </p>
          <p>
            Evipace ist keine Zertifizierungs- oder Prüfgesellschaft, führt
            keine gesetzliche Abschluss- oder Nachhaltigkeitsprüfung durch
            und bietet keine Rechtsberatung.
          </p>
          <p>
            Eine bestimmte ESG-Bewertung, Zertifizierung oder Akzeptanz
            durch einen Kunden oder eine externe Plattform kann nicht
            garantiert werden.
          </p>
        </Card>
      </CardGrid>
    </Band>
  );
}
