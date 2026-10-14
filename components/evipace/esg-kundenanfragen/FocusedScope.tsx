import { Band, Callout, Head, Prose } from "../service-landing/Blocks";

export function FocusedScope() {
  return (
    <Band>
      <Head eyebrow="Fokussierter Umfang" title="Nicht jede ESG-Anfrage braucht ein großes Nachhaltigkeitsprojekt." />
      <Prose>
        <p>
          Wenn ein Kunde einzelne ESG-Daten oder Nachweise verlangt,
          braucht Ihr Unternehmen nicht automatisch eine umfassende
          Nachhaltigkeitsstrategie, ein neues Softwaresystem oder ein
          monatelanges Beratungsprojekt.
        </p>
        <p>Manchmal ist die Aufgabe wesentlich konkreter:</p>
        <Callout>
          Ihr Kunde benötigt bestimmte Informationen - und Sie brauchen
          eine belastbare Antwort.
        </Callout>
        <p>Evipace kann genau dort starten.</p>
        <p>
          Wir konzentrieren uns zunächst auf die tatsächliche
          Kundenanforderung, die vorhandenen Unternehmensdaten und das,
          was für eine strukturierte Antwort noch fehlt.
        </p>
        <p>
          So bleibt der Aufwand auf das Problem fokussiert, das gerade
          gelöst werden muss.
        </p>
      </Prose>
    </Band>
  );
}
