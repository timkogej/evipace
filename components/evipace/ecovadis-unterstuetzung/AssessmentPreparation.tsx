import {
  AlertCircle,
  ClipboardCheck,
  Database,
  FileSearch,
  FolderCheck
} from "lucide-react";
import { Band, Card, CardGrid, Head } from "../service-landing/Blocks";

const steps = [
  {
    icon: FileSearch,
    title: "Fragen und Antwortoptionen prüfen",
    body: "Wir prüfen, welche Informationen im aktuellen Fragebogen abgefragt werden und welche Art von Nachweis oder Datengrundlage dafür relevant sein kann. Dabei orientieren wir uns an Ihrem konkreten Assessment - nicht an einem pauschalen Standardfragebogen."
  },
  {
    icon: FolderCheck,
    title: "Nachweise zuordnen",
    body: "Vorhandene Dokumente werden den jeweiligen Themen und Aussagen zugeordnet. Das können beispielsweise Richtlinien, Zertifikate, Kennzahlen, Berichte, Verfahren oder andere Unternehmensdokumente sein."
  },
  {
    icon: Database,
    title: "Daten aufbereiten",
    body: "Wenn Zahlenwerte benötigt werden, strukturieren wir die vorhandenen Ausgangsdaten. Dazu können beispielsweise Energieverbrauch, Brennstoffe, Beschäftigtendaten oder Emissionskennzahlen gehören."
  },
  {
    icon: AlertCircle,
    title: "Dokumentationslücken erkennen",
    body: "Nicht jede Anforderung wird bereits ausreichend dokumentiert sein. Wir zeigen klar, wo ein bestehender Nachweis fehlt, eine Aussage nicht belastbar genug dokumentiert ist oder zusätzliche interne Informationen benötigt werden."
  },
  {
    icon: ClipboardCheck,
    title: "Antworten zur Prüfung vorbereiten",
    body: "Auf Basis der vorhandenen Daten und Unterlagen bereiten wir die relevanten Inhalte so vor, dass Sie sie intern prüfen und für die weitere Einreichung verwenden können."
  }
];

export function AssessmentPreparation() {
  return (
    <Band id="unterstuetzung" tone="tinted">
      <Head
        eyebrow="Operative Vorbereitung"
        lead="Sie müssen nicht jede Frage selbst interpretieren und anschließend versuchen, im gesamten Unternehmen passende Dokumente zu finden."
        title="Wir strukturieren Ihre vorhandenen Unterlagen entlang des EcoVadis-Fragebogens."
      />
      <CardGrid columns={2}>
        {steps.map((step, index) => (
          <Card icon={step.icon} key={step.title} title={step.title} wide={index === steps.length - 1}>
            <p>{step.body}</p>
          </Card>
        ))}
      </CardGrid>
    </Band>
  );
}
