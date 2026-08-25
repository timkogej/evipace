import {
  FileSpreadsheet,
  ClipboardList,
  LayoutGrid,
  MessageSquare
} from "lucide-react";
import { Reveal } from "../Reveal";

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
    <section className="section-padding bg-white">
      <div className="site-shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Formate</p>
          <h2 className="heading-md font-display mt-6 max-w-[18ch]">
            Welche ESG-Fragebögen wir unterstützen
          </h2>
          <p className="body-lg mt-7">
            Nicht jeder Kunde verwendet denselben Prozess. Deshalb arbeiten
            wir nicht nur mit einem bestimmten Fragebogenformat.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {types.map((type, index) => (
            <Reveal
              className="rounded-[1.25rem] border border-[rgba(21,21,21,0.11)] bg-[var(--paper)] p-7 shadow-lift"
              delay={index * 0.06}
              key={type.title}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-orange shadow-[0_6px_18px_rgba(21,21,21,0.08)]">
                <type.icon aria-hidden="true" className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl font-bold text-ink">
                {type.title}
              </h3>
              <p className="mt-3 leading-7 text-muted">{type.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
