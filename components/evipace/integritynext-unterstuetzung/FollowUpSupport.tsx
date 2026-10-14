import { RotateCcw } from "lucide-react";
import { Band, Card, CardGrid, Head, Items, Prose } from "../service-landing/Blocks";

const checks = [
  "welches Thema betroffen ist",
  "welche Angabe unklar ist",
  "ob ein Zertifikat zum abgefragten Thema passt",
  "ob Informationen fehlen",
  "ob ein bestehender Nachweis ergänzt werden sollte",
  "welcher interne Input noch erforderlich ist"
];

export function FollowUpSupport() {
  return (
    <Band>
      <Head eyebrow="Validierung" title={<>&quot;Nachbesserungsbedarf&quot; erhalten? Wir helfen beim zweiten Durchgang.</>}>
        <p>
          IntegrityNext beschreibt einen Validierungsprozess, bei dem
          eingehende Antworten und Dokumente geprüft werden. Werden dabei
          Unklarheiten oder Widersprüche festgestellt, kann der Lieferant
          eine Nachricht mit &quot;Nachbesserungsbedarf&quot; und konkreten
          Hinweisen zur erforderlichen Korrektur erhalten.
        </p>
        <p>
          Wenn Sie eine solche Rückmeldung erhalten haben, müssen Sie nicht
          wieder bei null beginnen.
        </p>
        <p>Wir können gemeinsam prüfen:</p>
      </Head>
      <CardGrid columns={1}>
        <Card icon={RotateCcw}>
          <Items items={checks} />
        </Card>
      </CardGrid>
      <Prose>
        <p>
          Anschließend bereiten wir die relevanten Punkte für die erneute
          Prüfung durch Ihr Unternehmen vor.
        </p>
        <p>
          Wir garantieren dabei keinen bestimmten Status oder die Annahme
          einer Antwort. Ziel ist eine sachlich klare, vollständige und
          nachvollziehbare Überarbeitung.
        </p>
      </Prose>
    </Band>
  );
}
