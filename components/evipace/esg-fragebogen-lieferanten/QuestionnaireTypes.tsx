import {
  FileSpreadsheet,
  ClipboardList,
  LayoutGrid,
  MessageSquare
} from "lucide-react";
import { Band, Card, CardGrid, Head } from "../service-landing/Blocks";

const types = [
  {
    icon: FileSpreadsheet,
    title: "Kundenspezifische ESG-Fragebögen",
    body: "Excel-Dateien, PDFs, Word-Dokumente oder individuell aufgebaute Lieferantenfragebögen Ihrer Kunden."
  },
  {
    icon: ClipboardList,
    title: "Nachhaltigkeitsfragebögen für Lieferanten",
    body: "Fragen zu Umwelt, Emissionen, Mitarbeitenden, Governance, Richtlinien, Zertifizierungen oder Nachhaltigkeitsmanagement."
  },
  {
    icon: LayoutGrid,
    title: "ESG-Plattformen und Portale",
    body: "Wir unterstützen bei der Vorbereitung der benötigten Angaben und Nachweise für Plattformen und standardisierte ESG-Abfragen, einschließlich Anforderungen im Umfeld von EcoVadis und IntegrityNext. Evipace ist weder mit diesen Plattformen verbunden noch kann eine bestimmte Bewertung oder Akzeptanz garantiert werden."
  },
  {
    icon: MessageSquare,
    title: "Ad-hoc ESG-Anfragen von Kunden",
    body: "Manchmal gibt es keinen formalen Fragebogen — ein Kunde verlangt per E-Mail etwa Scope-1- und Scope-2-Emissionen, Stromverbrauch, eine Umweltpolitik, einen Code of Conduct oder bestimmte Zertifikate. Auch solche Anfragen können strukturiert vorbereitet werden."
  }
];

export function QuestionnaireTypes() {
  return (
    <Band>
      <Head
        eyebrow="Formate"
        lead="Nicht jeder Kunde verwendet denselben Prozess. Deshalb arbeiten wir nicht nur mit einem bestimmten Fragebogenformat."
        title="Welche ESG-Fragebögen wir unterstützen"
      />
      <CardGrid columns={2}>
        {types.map((type) => (
          <Card icon={type.icon} key={type.title} title={type.title}>
            <p>{type.body}</p>
          </Card>
        ))}
      </CardGrid>
    </Band>
  );
}
