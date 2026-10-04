import Link from "next/link";
import { Reveal } from "../Reveal";

export function DataFoundation() {
  return (
    <section className="border-y border-[rgba(21,21,21,0.09)] bg-[#f8f8f6] py-12 sm:py-16">
      <div className="site-shell grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow">Datengrundlage</p>
          <h2 className="type-heading font-display mt-5 max-w-[18ch]">
            Ein guter Bericht beginnt mit belastbaren Daten.
          </h2>
        </Reveal>
        <Reveal className="max-w-2xl lg:pt-7" delay={0.08}>
          <p className="text-lg leading-8 text-muted">
            Energie, Emissionen, Mitarbeitende, Richtlinien und Nachweise liegen
            häufig schon vor – nur nicht an einem Ort. Wir strukturieren diese
            Informationen, klären den Berichtsrahmen und machen fehlende
            Angaben sichtbar, bevor daraus ein VSME-Berichtsentwurf wird.
          </p>
          <p className="mt-5 text-sm leading-7 text-muted">
            Welche Angaben werden gebraucht? Der{" "}
            <Link className="orange-link" href="/de/ressourcen/vsme-daten-nachhaltigkeitsbericht">
              Leitfaden zu VSME-Daten
            </Link>{" "}
            zeigt die wichtigsten Themen.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
