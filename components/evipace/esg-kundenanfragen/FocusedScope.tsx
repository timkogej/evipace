import { Reveal } from "../Reveal";

export function FocusedScope() {
  return (
    <section className="section-padding bg-white">
      <div className="site-shell">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Fokussierter Umfang</p>
          <h2 className="heading-md font-display mt-6 max-w-[20ch]">
            Nicht jede ESG-Anfrage braucht ein großes Nachhaltigkeitsprojekt.
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-8 text-muted">
            <p>
              Wenn ein Kunde einzelne ESG-Daten oder Nachweise verlangt,
              braucht Ihr Unternehmen nicht automatisch eine umfassende
              Nachhaltigkeitsstrategie, ein neues Softwaresystem oder ein
              monatelanges Beratungsprojekt.
            </p>
            <p>Manchmal ist die Aufgabe wesentlich konkreter:</p>
            <p className="border-l-2 border-orange pl-5 text-2xl leading-9 text-ink">
              Ihr Kunde benötigt bestimmte Informationen - und Sie brauchen
              eine belastbare Antwort.
            </p>
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
          </div>
        </Reveal>
      </div>
    </section>
  );
}
