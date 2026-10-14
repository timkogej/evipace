import { FileSearch, FolderCheck, AlertCircle, FileEdit, UserCheck } from "lucide-react";
import { Band, Card, CardGrid, Head } from "../service-landing/Blocks";

const steps = [
  {
    icon: FileSearch,
    title: "Fragen verstehen",
    body: "Wir prüfen den ESG- oder Nachhaltigkeitsfragebogen und identifizieren, welche Angaben Ihr Kunde tatsächlich benötigt — Daten, Dokumente, Berechnungen, Richtlinien oder interne Bestätigungen."
  },
  {
    icon: FolderCheck,
    title: "Vorhandene Daten zuordnen",
    body: "Ihre vorhandenen Unterlagen werden den relevanten Anforderungen zugeordnet — zum Beispiel Rechnungen, Energieübersichten, Zertifikate, Richtlinien oder interne Tabellen."
  },
  {
    icon: AlertCircle,
    title: "Lücken sichtbar machen",
    body: "Nicht jede Frage lässt sich sofort beantworten. Fehlende Informationen werden klar markiert, damit Sie wissen, wo noch ein Wert, Dokument oder eine Entscheidung benötigt wird."
  },
  {
    icon: FileEdit,
    title: "Antworten vorbereiten",
    body: "Auf Basis der verfügbaren Informationen bereiten wir strukturierte Antwortentwürfe und die dazugehörigen Nachweise vor."
  },
  {
    icon: UserCheck,
    title: "Menschlich prüfen",
    body: "Die vorbereiteten Ergebnisse werden vor der Übergabe menschlich geprüft. Digitale Werkzeuge können intern beim Strukturieren helfen — die Verantwortung für die finale Aufbereitung bleibt bei unserem Team."
  }
];

export function ProcessBreakdown() {
  return (
    <Band>
      <Head
        eyebrow="Wie wir arbeiten"
        lead="Sie müssen nicht zuerst selbst herausfinden, welches Dokument zu welcher Frage gehört."
        title="Wir bringen Fragebogen, Daten und Nachweise zusammen."
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
