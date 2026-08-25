import {
  AlertCircle,
  ClipboardCheck,
  Database,
  FileSearch,
  FolderCheck
} from "lucide-react";
import { Reveal } from "../Reveal";

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
    <section className="section-padding bg-[var(--warm)]" id="unterstuetzung">
      <div className="site-shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Operative Vorbereitung</p>
          <h2 className="heading-md font-display mt-6 max-w-[20ch]">
            Wir strukturieren Ihre vorhandenen Unterlagen entlang des
            EcoVadis-Fragebogens.
          </h2>
          <p className="body-lg mt-7">
            Sie müssen nicht jede Frage selbst interpretieren und anschließend
            versuchen, im gesamten Unternehmen passende Dokumente zu finden.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {steps.map((step, index) => (
            <Reveal
              className={`rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-6 shadow-[0_14px_45px_rgba(21,21,21,0.045)] ${
                index === steps.length - 1 ? "md:col-span-2" : ""
              }`}
              delay={index * 0.06}
              key={step.title}
            >
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--soft-orange)] text-orange">
                  <step.icon aria-hidden="true" className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-ink">{step.title}</h3>
                  <p className="mt-2 leading-7 text-muted">{step.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
