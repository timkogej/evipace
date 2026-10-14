import { ClipboardCheck, FileBadge2, FileSearch, Flag } from "lucide-react";
import { Band, Card, CardGrid, Head, Prose } from "../service-landing/Blocks";

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
    <Band>
      <Head
        eyebrow="Zertifikate und Fragen"
        lead="Bei bestimmten IntegrityNext-Themen kann ein passendes zertifiziertes Managementsystem als Grundlage verwendet werden. Liegt kein entsprechendes Zertifikat vor, bedeutet das nicht automatisch, dass das Assessment nicht bearbeitet werden kann - je nach Thema können stattdessen die vorgesehenen Fragen beantwortet werden."
        title="Zertifikat oder Fragebogen? Wir prüfen, was bereits vorhanden ist."
      />
      <CardGrid columns={2}>
        {items.map((item) => (
          <Card icon={item.icon} key={item.title} title={item.title}>
            <p>{item.body}</p>
          </Card>
        ))}
      </CardGrid>
      <Prose>
        <p>
          Nicht möglichst viel hochladen - sondern das Richtige für das
          jeweilige Thema vorbereiten.
        </p>
      </Prose>
    </Band>
  );
}
