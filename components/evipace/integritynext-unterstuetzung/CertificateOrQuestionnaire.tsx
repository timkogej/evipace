import { ClipboardCheck, FileBadge2, FileSearch, Flag } from "lucide-react";
import { Reveal } from "../Reveal";

const items = [
  {
    icon: FileSearch,
    title: "Vorhandene Zertifikate prüfen",
    body: "Wir schauen, welche Zertifikate bereits im Unternehmen vorhanden sind und zu welchen angeforderten Themen sie tatsächlich passen. Dabei geht es nicht darum, irgendein Zertifikat hochzuladen, sondern um eine sachlich passende Zuordnung."
  },
  {
    icon: ClipboardCheck,
    title: "Fragen vorbereiten",
    body: "Wenn für ein Thema kein passendes Zertifikat vorhanden ist, strukturieren wir die Informationen, die für die Beantwortung der Fragen benötigt werden."
  },
  {
    icon: FileBadge2,
    title: "Zusätzliche Nachweise zuordnen",
    body: "Wo zusätzliche Dokumentation sinnvoll oder erforderlich ist, ordnen wir bestehende Richtlinien, Verfahren, Kennzahlen oder andere Nachweise dem jeweiligen Thema zu."
  },
  {
    icon: Flag,
    title: "Offene Punkte sichtbar machen",
    body: "Wenn eine Antwort eine interne Bestätigung, fehlende Information oder zusätzliche Abstimmung benötigt, wird das klar gekennzeichnet."
  }
];

export function CertificateOrQuestionnaire() {
  return (
    <section className="section-padding bg-[var(--warm)]">
      <div className="site-shell">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Zertifikate und Fragen</p>
          <h2 className="heading-md font-display mt-6 max-w-[20ch]">
            Zertifikat oder Fragebogen? Wir prüfen, was bereits vorhanden ist.
          </h2>
          <p className="body-lg mt-7">
            Bei bestimmten IntegrityNext-Themen kann ein passendes
            zertifiziertes Managementsystem als Grundlage verwendet werden.
            Liegt kein entsprechendes Zertifikat vor, bedeutet das nicht
            automatisch, dass das Assessment nicht bearbeitet werden kann - je
            nach Thema können stattdessen die vorgesehenen Fragen beantwortet
            werden.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {items.map((item, index) => (
            <Reveal
              className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-6 shadow-[0_14px_45px_rgba(21,21,21,0.045)]"
              delay={index * 0.06}
              key={item.title}
            >
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--soft-orange)] text-orange">
                  <item.icon aria-hidden="true" className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-ink">{item.title}</h3>
                  <p className="mt-2 leading-7 text-muted">{item.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 max-w-3xl text-lg leading-8 text-muted" delay={0.12}>
          Nicht möglichst viel hochladen - sondern das Richtige für das
          jeweilige Thema vorbereiten.
        </Reveal>
      </div>
    </section>
  );
}
