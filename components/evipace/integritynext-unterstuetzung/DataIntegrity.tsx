import { Band, Checklist, Head, Prose } from "../service-landing/Blocks";

const questions = [
  "Was ist vorhanden?",
  "Was ist dokumentiert?",
  "Was kann belegt werden?",
  "Wo fehlen Informationen?",
  "Was sollte intern tatsächlich verbessert werden?"
];

export function DataIntegrity() {
  return (
    <Band>
      <Head eyebrow="Integrität" title="Ihre Antworten sollten die tatsächliche Unternehmenspraxis abbilden.">
        <p>
          Eine Sustainability- oder Compliance-Selbstauskunft ist kein
          Marketingtext.
        </p>
        <p>
          Wenn eine Maßnahme im Unternehmen nicht existiert, sollte sie
          nicht einfach als vorhanden dargestellt werden.
        </p>
        <p>
          Wenn kein passendes Zertifikat vorhanden ist, sollte kein anderes
          Dokument so behandelt werden, als würde es das gefragte Thema
          abdecken.
        </p>
        <p>
          Wenn eine Richtlinie erst aufgebaut werden muss, sollte daraus
          eine reale Unternehmensregelung entstehen - nicht nur ein Dokument
          für eine Checkbox.
        </p>
        <p>
          Evipace unterstützt deshalb bei der Abbildung des tatsächlichen
          Unternehmensstands:
        </p>
      </Head>
      <Checklist items={questions} />
      <Prose>
        <p>
          Unser Ziel ist eine vollständige und nachvollziehbare Selbstauskunft -
          nicht ein künstlich &quot;grünes&quot; Profil.
        </p>
      </Prose>
    </Band>
  );
}
