import { Reveal } from "../Reveal";

const evidencePoints = [
  "welche Aussage durch welchen Nachweis gestützt wird",
  "welche Kennzahl auf welchen Daten basiert",
  "welche Informationen bereits ausreichend dokumentiert sind",
  "wo noch echte Lücken bestehen"
];

export function EvidenceIntro() {
  return (
    <section className="section-padding bg-white">
      <div className="site-shell">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Nachweise</p>
          <h2 className="heading-md font-display mt-6 max-w-[19ch]">
            Bei EcoVadis zählt nicht nur die Antwort - sondern auch der
            Nachweis dahinter.
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-8 text-muted">
            <p>
              Viele Unternehmen haben bereits einen großen Teil der benötigten
              Informationen im Haus.
            </p>
            <p>
              Eine Umweltpolitik existiert. ISO-Zertifikate liegen vor.
              Energie- und Emissionsdaten wurden schon einmal berechnet. Ein
              Code of Conduct ist vorhanden. Schulungen, Arbeitsschutzmaßnahmen
              oder Einkaufsrichtlinien sind dokumentiert.
            </p>
            <p>
              Die eigentliche Herausforderung besteht häufig darin, diese
              Informationen den richtigen Fragen und Antwortoptionen
              zuzuordnen.
            </p>
            <p>
              Nicht jedes vorhandene Dokument ist automatisch ein passender
              Nachweis für jede Aussage.
            </p>
            <p>
              Deshalb geht es bei einer guten Vorbereitung nicht darum,
              möglichst viele Dateien zusammenzutragen.
            </p>
            <p>Es geht darum, nachvollziehbar zu zeigen:</p>
          </div>
        </Reveal>

        <Reveal
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          delay={0.08}
        >
          {evidencePoints.map((point) => (
            <div
              className="border-t border-[rgba(21,21,21,0.13)] pt-4 text-sm font-semibold leading-6 text-[rgba(21,21,21,0.66)]"
              key={point}
            >
              {point}
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-10 max-w-3xl text-lg leading-8 text-muted" delay={0.14}>
          evipace unterstützt Sie genau bei dieser operativen Vorbereitung.
        </Reveal>
      </div>
    </section>
  );
}
