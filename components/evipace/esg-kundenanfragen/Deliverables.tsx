import {
  Calculator,
  CircleAlert,
  FileEdit,
  History,
  Link2,
  Rows3
} from "lucide-react";
import { Reveal } from "../Reveal";

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
    <section className="section-padding bg-[var(--warm)]">
      <div className="site-shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Ergebnis</p>
          <h2 className="heading-md font-display mt-6 max-w-[18ch]">
            Was Sie von uns zurückbekommen
          </h2>
          <p className="body-lg mt-7">
            Evipace liefert nicht nur eine Liste von ESG-Themen. Das Ergebnis
            orientiert sich an der konkreten Anfrage Ihres Kunden.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {deliverables.map((item, index) => (
            <Reveal
              className="rounded-[1.25rem] border border-[rgba(21,21,21,0.11)] bg-white p-7 shadow-lift"
              delay={index * 0.05}
              key={item.title}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--soft-orange)] text-orange">
                <item.icon aria-hidden="true" className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-ink">
                {item.title}
              </h3>
              <p className="mt-3 leading-7 text-muted">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
