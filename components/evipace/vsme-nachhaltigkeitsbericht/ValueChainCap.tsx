import { voluntaryStandardStatus } from "@/lib/seo/voluntary-standard-status";
import { primarySources } from "@/lib/seo/primary-sources";
import { SourceNote } from "../trust/SourceNote";
import { Band, Checklist, Head, Prose } from "../service-landing/Blocks";

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
    <Band tone="tinted">
      <Head eyebrow="Value Chain Cap" title="Der Value Chain Cap macht den Standard auch für Lieferanten relevant.">
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
        <p>{voluntaryStandardStatus.de}</p>
        <SourceNote locale="de" sources={[primarySources.voluntaryStandardRegulation]} />
        <p>Andere Informationsanforderungen können beispielsweise aus:</p>
      </Head>
      <Checklist items={otherRequirements} />
      <Prose>
        <p>entstehen.</p>
        <p>Der praktische Vorteil bleibt:</p>
        <p>
          Ein standardisierter ESG-Datensatz schafft eine wesentlich bessere
          Grundlage, um wiederkehrende Anforderungen aus der Lieferkette
          effizient zu bearbeiten.
        </p>
      </Prose>
    </Band>
  );
}
