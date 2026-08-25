import { Link2 } from "lucide-react";
import { Reveal } from "../Reveal";

const otherRequirements = [
  "anderen rechtlichen Pflichten",
  "Due-Diligence-Prozessen",
  "Risikomanagement",
  "freiwilliger Zusammenarbeit",
  "sektorspezifischen Praktiken",
  "anderen Geschäftszwecken"
];

export function ValueChainCap() {
  return (
    <section className="section-padding bg-white">
      <div className="site-shell">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Value Chain Cap</p>
          <h2 className="heading-md font-display mt-6 max-w-[20ch]">
            Der Value Chain Cap macht den Standard auch für Lieferanten
            relevant.
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-8 text-muted">
            <p>
              Der neue europäische Rahmen soll nicht nur freiwillige
              Berichterstattung vereinfachen.
            </p>
            <p>
              Er soll auch begrenzen, welche Nachhaltigkeitsinformationen
              größere berichtspflichtige Unternehmen für ihre eigene
              CSRD-Berichterstattung von bestimmten kleineren Unternehmen in
              ihrer Wertschöpfungskette verlangen können.
            </p>
            <p>
              Dabei spielt der sogenannte Value Chain Cap eine zentrale Rolle.
            </p>
            <p>
              Für geschützte Unternehmen mit bis zu 1.000 Beschäftigten bildet
              der Voluntary Standard grundsätzlich den Referenzrahmen für solche
              Informationsanforderungen im Zusammenhang mit der verpflichtenden
              Nachhaltigkeitsberichterstattung größerer Unternehmen.
            </p>
            <p>
              Das bedeutet jedoch nicht, dass jede darüber hinausgehende
              ESG-Anfrage eines Kunden automatisch unzulässig ist.
            </p>
            <p>Andere Informationsanforderungen können beispielsweise aus:</p>
          </div>
        </Reveal>

        <Reveal className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" delay={0.08}>
          {otherRequirements.map((item) => (
            <div
              className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-[var(--paper)] p-6 shadow-[0_14px_45px_rgba(21,21,21,0.045)]"
              key={item}
            >
              <Link2 aria-hidden="true" className="h-5 w-5 text-orange" />
              <p className="mt-4 text-sm font-semibold leading-6 text-muted">
                {item}
              </p>
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-10 max-w-3xl space-y-5 text-lg leading-8 text-muted" delay={0.14}>
          <p>entstehen.</p>
          <p>Der praktische Vorteil bleibt:</p>
          <p>
            Ein standardisierter ESG-Datensatz schafft eine wesentlich bessere
            Grundlage, um wiederkehrende Anforderungen aus der Lieferkette
            effizient zu bearbeiten.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
