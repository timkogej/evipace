import { Band, Checklist, Head, Prose } from "../service-landing/Blocks";

const questions = [
  "Gibt es die entsprechende Regelung oder Maßnahme im Unternehmen tatsächlich?",
  "Ist sie intern abgestimmt?",
  "Wird sie umgesetzt?",
  "Kann sie glaubwürdig dokumentiert werden?"
];

export function DocumentationIntegrity() {
  return (
    <Band>
      <Head eyebrow="Dokumentationslücken" title="Fehlende Dokumentation? Erst klären, dann sinnvoll aufbauen.">
        <p>
          Bei der Vorbereitung kann sichtbar werden, dass bestimmte Themen
          noch nicht ausreichend dokumentiert sind.
        </p>
        <p>
          Das bedeutet nicht automatisch, dass kurzfristig irgendein
          Dokument erstellt werden sollte.
        </p>
        <p>Zuerst muss geklärt werden:</p>
      </Head>
      <Checklist items={questions} />
      <Prose>
        <p>
          Wenn eine Richtlinie oder andere Dokumentation tatsächlich als
          Unternehmensinstrument benötigt wird, kann Evipace bei der
          strukturierten Ausarbeitung unterstützen.
        </p>
        <p>
          Wir erstellen jedoch keine rückdatierten, fingierten oder
          ausschließlich für eine Bewertung konstruierten Nachweise.
        </p>
        <p>
          Die Dokumentation soll reale Unternehmenspraxis abbilden - nicht
          nur eine Checkbox füllen.
        </p>
      </Prose>
    </Band>
  );
}
