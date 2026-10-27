import {
  Calculator,
  CircleAlert,
  FileEdit,
  History,
  Link2,
  Rows3
} from "lucide-react";
import { Band, Card, CardGrid, Head } from "../service-landing/Blocks";

const deliverables = [
  {
    icon: FileEdit,
    title: "Strukturierte Antwort",
    body: "Sie erhalten vorbereitete Inhalte, die direkt den jeweiligen Anforderungen zugeordnet sind."
  },
  {
    icon: Link2,
    title: "Verwendete Datenquellen",
    body: "Es bleibt nachvollziehbar, auf welcher Grundlage eine Information oder Kennzahl vorbereitet wurde."
  },
  {
    icon: Rows3,
    title: "Zugeordnete Nachweise",
    body: "Bestehende Dokumente werden den relevanten Anforderungen zugeordnet."
  },
  {
    icon: CircleAlert,
    title: "Klare offene Punkte",
    body: "Was noch fehlt, wird sichtbar gemacht - statt durch Annahmen oder unbelegte Aussagen ersetzt zu werden."
  },
  {
    icon: Calculator,
    title: "Berechnete Kennzahlen",
    body: "Wenn dies Teil des vereinbarten Umfangs ist und die benötigten Ausgangsdaten vorhanden sind, können auch relevante ESG-Kennzahlen vorbereitet werden, beispielsweise Scope 1 und Scope 2."
  },
  {
    icon: History,
    title: "Wiederverwendbare Grundlage",
    body: "Eine sauber strukturierte Kundenanfrage schafft gleichzeitig eine bessere Grundlage für die nächste. Was einmal nachvollziehbar aufbereitet wurde, muss bei der nächsten ESG-Anfrage nicht wieder vollständig bei null beginnen."
  }
];

export function Deliverables() {
  return (
    <Band tone="orange">
      <Head
        eyebrow="Ergebnis"
        lead="Evipace liefert nicht nur eine Liste von ESG-Themen. Das Ergebnis orientiert sich an der konkreten Anfrage Ihres Kunden."
        title="Was Sie von uns zurückbekommen"
      />
      <CardGrid>
        {deliverables.map((item) => (
          <Card icon={item.icon} key={item.title} title={item.title}>
            <p>{item.body}</p>
          </Card>
        ))}
      </CardGrid>
    </Band>
  );
}
