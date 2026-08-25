import {
  AlertCircle,
  ClipboardCheck,
  FileSearch,
  FolderCheck,
  ListChecks
} from "lucide-react";
import { Reveal } from "../Reveal";

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
    <section className="section-padding bg-[var(--warm)]">
      <div className="site-shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Arbeitsprozess</p>
          <h2 className="heading-md font-display mt-6 max-w-[18ch]">
            Wir übersetzen die Kundenanforderung in konkrete Aufgaben.
          </h2>
          <p className="body-lg mt-7">
            Sie müssen nicht selbst jede einzelne ESG-Anforderung
            interpretieren und anschließend im gesamten Unternehmen nach den
            passenden Informationen suchen.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {tasks.map((task, index) => (
            <Reveal
              className={`rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-6 shadow-[0_14px_45px_rgba(21,21,21,0.045)] ${
                index === 0 ? "md:col-span-2" : ""
              }`}
              delay={index * 0.06}
              key={task.title}
            >
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--soft-orange)] text-orange">
                  <task.icon aria-hidden="true" className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-ink">{task.title}</h3>
                  <p className="mt-2 leading-7 text-muted">{task.body}</p>
                  {task.items ? (
                    <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                      {task.items.map((item) => (
                        <li
                          className="border-t border-[rgba(21,21,21,0.1)] pt-2 text-sm font-semibold text-[rgba(21,21,21,0.66)]"
                          key={item}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
