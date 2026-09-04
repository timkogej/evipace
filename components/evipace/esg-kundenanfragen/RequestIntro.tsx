import Link from "next/link";
import { Reveal } from "../Reveal";

const requestFormats = [
  "E-Mail",
  "Excel-Datei",
  "PDF",
  "Lieferantenportal",
  "Procurement-Liste",
  "Fragebogen"
];

export function RequestIntro() {
  return (
    <section className="section-padding bg-white">
      <div className="site-shell">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Der Ausgangspunkt</p>
          <h2 className="heading-md font-display mt-6 max-w-[18ch]">
            ESG-Anfragen kommen selten in einem einheitlichen Format.
          </h2>

          <div className="mt-8 space-y-5 text-lg leading-8 text-muted">
            <p>
              Manche Kunden schicken einen umfangreichen
              Nachhaltigkeitsfragebogen. Andere senden eine Excel-Datei, eine
              Liste per E-Mail oder fordern einzelne Angaben direkt über ein
              Lieferantenportal an.
            </p>
            <p>
              Gefragt werden beispielsweise CO₂-Emissionen, Stromverbrauch,
              Zertifikate, Umweltziele, Richtlinien oder Informationen zu
              Mitarbeitenden und Governance.
            </p>
            <p>Das Format ändert sich. Die operative Arbeit dahinter bleibt ähnlich.</p>
            <p>
              Zuerst muss geklärt werden, was der Kunde tatsächlich verlangt.
              Danach müssen passende Daten, Dokumente und Nachweise im
              Unternehmen gefunden, geprüft und der jeweiligen Anforderung
              zugeordnet werden.
            </p>
            <p>Genau hier setzt Evipace an.</p>
            <p>
              Wir machen aus einer unübersichtlichen Kundenanforderung einen
              klar strukturierten Arbeitsprozess.
            </p>
            <p>
              Hat Ihr Kunde einen formalen Fragebogen geschickt? Mehr dazu
              unter{" "}
              <Link
                className="orange-link"
                href="/de/esg-fragebogen-lieferanten"
              >
                ESG-Fragebogen für Lieferanten
              </Link>
              .
            </p>
          </div>
        </Reveal>

        <Reveal
          className="mt-10 grid grid-cols-2 gap-x-5 gap-y-3 sm:grid-cols-3 lg:grid-cols-6"
          delay={0.08}
        >
          {requestFormats.map((format) => (
            <div
              className="border-t border-[rgba(21,21,21,0.13)] pt-3 text-sm font-semibold text-[rgba(21,21,21,0.66)]"
              key={format}
            >
              {format}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
