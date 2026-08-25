import { FileSearch, FolderCheck, AlertCircle, FileEdit, UserCheck } from "lucide-react";
import { Reveal } from "../Reveal";

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
    <section className="section-padding bg-[var(--warm)]">
      <div className="site-shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Wie wir arbeiten</p>
          <h2 className="heading-md font-display mt-6 max-w-[18ch]">
            Wir bringen Fragebogen, Daten und Nachweise zusammen.
          </h2>
          <p className="body-lg mt-7">
            Sie müssen nicht zuerst selbst herausfinden, welches Dokument zu
            welcher Frage gehört.
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
                  <p className="text-xs font-bold uppercase tracking-[0.1em] text-[rgba(21,21,21,0.5)]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 text-xl font-bold text-ink">
                    {step.title}
                  </h3>
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
