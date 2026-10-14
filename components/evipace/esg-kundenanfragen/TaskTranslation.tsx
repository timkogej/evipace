import {
  AlertCircle,
  ClipboardCheck,
  FileSearch,
  FolderCheck,
  ListChecks
} from "lucide-react";
import { Band, Card, CardGrid, Head, Items } from "../service-landing/Blocks";

const tasks = [
  {
    icon: FileSearch,
    title: "Anforderung verstehen",
    body: "Wir prüfen die Anfrage und zerlegen sie in konkrete Informations-, Daten- und Nachweisanforderungen.",
    items: [
      "bestehende Dokumente",
      "Kennzahlen",
      "berechenbare Angaben",
      "Richtlinien",
      "Zertifikate",
      "Punkte, die intern bestätigt werden müssen"
    ]
  },
  {
    icon: ListChecks,
    title: "Benötigte Daten identifizieren",
    body: "Wir bestimmen, welche Informationen für die Antwort tatsächlich relevant sind. Nicht jede mögliche ESG-Kennzahl muss erhoben werden. Entscheidend ist zunächst, was Ihr Kunde konkret verlangt."
  },
  {
    icon: FolderCheck,
    title: "Vorhandenes nutzen",
    body: "Viele Informationen existieren bereits im Unternehmen. Wir helfen dabei, vorhandene Rechnungen, Tabellen, Zertifikate, Richtlinien und andere Dokumente den richtigen Anforderungen zuzuordnen."
  },
  {
    icon: AlertCircle,
    title: "Lücken erkennen",
    body: "Wenn Daten oder Nachweise fehlen, wird dies klar sichtbar gemacht. Sie sehen, was bereits beantwortet werden kann und welche Punkte noch ergänzt, berechnet oder intern bestätigt werden müssen."
  },
  {
    icon: ClipboardCheck,
    title: "Antwort vorbereiten",
    body: "Auf Basis der vorhandenen Informationen bereiten wir eine strukturierte Antwort vor, die sich an der konkreten Kundenanforderung orientiert."
  }
];

export function TaskTranslation() {
  return (
    <Band>
      <Head
        eyebrow="Arbeitsprozess"
        lead="Sie müssen nicht selbst jede einzelne ESG-Anforderung interpretieren und anschließend im gesamten Unternehmen nach den passenden Informationen suchen."
        title="Wir übersetzen die Kundenanforderung in konkrete Aufgaben."
      />
      <CardGrid columns={2}>
        {tasks.map((task, index) => (
          <Card icon={task.icon} key={task.title} title={task.title} wide={index === 0}>
            <p>{task.body}</p>
            {task.items ? <Items items={task.items} /> : null}
          </Card>
        ))}
      </CardGrid>
    </Band>
  );
}
