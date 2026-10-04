import { Reveal } from "../Reveal";

export function EvidenceIntro() {
  return (
    <section className="border-y border-[rgba(21,21,21,0.09)] bg-[#f8f8f6] py-12 sm:py-16">
      <div className="site-shell grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow">Nachweise</p>
          <h2 className="type-heading font-display mt-5 max-w-[18ch]">
            Die Antwort ist nur so gut wie ihr Nachweis.
          </h2>
        </Reveal>
        <Reveal className="max-w-2xl lg:pt-7" delay={0.08}>
          <p className="text-lg leading-8 text-muted">
            Für eine EcoVadis-Antwort reicht es nicht, möglichst viele Dateien
            hochzuladen. Ein Dokument muss zur konkreten Aussage, zum
            Unternehmen und zum Zeitraum passen. Wir ordnen vorhandene
            Richtlinien, Zertifikate und Daten den passenden Fragen zu und
            machen echte Lücken sichtbar.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
