import { voluntaryStandardStatus } from "@/lib/seo/voluntary-standard-status";
import { primarySources } from "@/lib/seo/primary-sources";
import { SourceNote } from "../trust/SourceNote";
import { FileText } from "lucide-react";
import { Band, Card, CardGrid, Head, Prose } from "../service-landing/Blocks";

const statusCards = [
  {
    title: "Vom VSME zum Voluntary Standard",
    body: "Der Begriff VSME hat sich im Markt als Bezeichnung für den freiwilligen Nachhaltigkeitsstandard für kleinere Unternehmen etabliert. Der 2025 von der Europäischen Kommission empfohlene VSME bildet die wesentliche Grundlage des neuen europäischen Voluntary Standard."
  },
  {
    title: "Was hat sich 2026 geändert?",
    body: "Die Europäische Kommission hat am 3. Juli 2026 einen neuen Voluntary Standard als delegierten Rechtsakt angenommen. Er richtet sich an Unternehmen außerhalb der verpflichtenden Nachhaltigkeitsberichterstattung, die im vorausgegangenen Geschäftsjahr durchschnittlich nicht mehr als 1.000 Beschäftigte hatten. Die Grundstruktur mit Basic und Comprehensive Module wurde beibehalten."
  },
  {
    title: "Ist der neue Standard bereits in Kraft?",
    body: voluntaryStandardStatus.de
  }
];

export function RegulatoryStatus() {
  return (
    <Band>
      <Head
        eyebrow="Regulatorischer Stand"
        lead="Der europäische Rahmen für freiwillige Nachhaltigkeitsberichterstattung wurde 2026 weiterentwickelt."
        title="VSME, Voluntary Standard und 2026: Was gilt aktuell?"
      />
      <CardGrid>
        {statusCards.map((card) => (
          <Card icon={FileText} key={card.title} title={card.title}>
            <p>{card.body}</p>
          </Card>
        ))}
      </CardGrid>
      <Prose>
        <SourceNote locale="de" sources={[primarySources.voluntaryStandardRegulation]} />
        <p>
          Evipace richtet neue Projekte am jeweils aktuellen europäischen Rahmen
          aus und berücksichtigt den Übergang vom bisherigen VSME zum neuen
          Voluntary Standard.
        </p>
      </Prose>
    </Band>
  );
}
