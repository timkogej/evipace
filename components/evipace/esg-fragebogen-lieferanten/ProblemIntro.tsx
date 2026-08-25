import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Reveal } from "../Reveal";

const sources = [
  "Rechnungen",
  "Excel-Dateien",
  "Buchhaltung",
  "Qualitätsmanagement",
  "Interne Richtlinien",
  "HR-Daten"
];

export function ProblemIntro() {
  return (
    <section className="section-padding bg-white">
      <div className="site-shell">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Der Ausgangspunkt</p>
          <h2 className="heading-md font-display mt-6 max-w-[16ch]">
            Ihr Kunde fragt ESG-Daten ab. Die Informationen sind meist schon
            im Unternehmen.
          </h2>

          <div className="mt-8 space-y-5 text-lg leading-8 text-muted">
            <p>
              Ein neuer Lieferantenfragebogen landet im Posteingang. Gefragt
              wird nach Energieverbrauch, CO₂-Emissionen, Umweltzielen,
              Richtlinien, Zertifikaten oder sozialen Kennzahlen.
            </p>
            <p>
              Das Problem ist häufig nicht, dass diese Informationen
              vollständig fehlen. Sie liegen nur an verschiedenen Stellen.
            </p>
            <p>
              Die eigentliche Arbeit beginnt dort, wo diese Informationen mit
              den konkreten Fragen Ihres Kunden zusammengebracht werden
              müssen. evipace übernimmt diese operative Arbeit für Sie — wir
              prüfen die Anfrage, strukturieren die benötigten Informationen
              und zeigen klar, welche Antworten bereits vorbereitet werden
              können und wo noch eine Angabe von Ihnen erforderlich ist.
            </p>
          </div>
        </Reveal>

        <Reveal
          className="mt-10 grid grid-cols-2 gap-x-5 gap-y-3 sm:grid-cols-3 lg:grid-cols-6"
          delay={0.08}
        >
          {sources.map((source) => (
            <div
              className="border-t border-[rgba(21,21,21,0.13)] pt-3 text-sm font-semibold text-[rgba(21,21,21,0.66)]"
              key={source}
            >
              {source}
            </div>
          ))}
        </Reveal>

        <Reveal className="mt-9" delay={0.12}>
          <div className="grid max-w-3xl gap-4">
            <Link
              className="orange-link inline-flex items-center gap-2 text-sm"
              href="/de/ressourcen/welche-esg-daten-kunden-lieferanten"
            >
              Sie möchten zuerst verstehen, welche Informationen Lieferanten
              häufig benötigen? Lesen Sie den Überblick über typische
              ESG-Datenanforderungen.
              <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
            </Link>
            <Link
              className="orange-link inline-flex items-center gap-2 text-sm"
              href="/de/ressourcen/esg-fragebogen-vom-kunden-erhalten"
            >
              ESG-Fragebogen erhalten? Lesen Sie unseren praktischen Leitfaden
              für die ersten Schritte.
              <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
            </Link>
            <Link
              className="orange-link inline-flex items-center gap-2 text-sm"
              href="/de/ressourcen/esg-fragebogen-checkliste-lieferanten"
            >
              Sie möchten Ihre Kundenanfrage zunächst selbst strukturieren?
              Unsere ESG-Fragebogen-Checkliste führt Sie von Scope und
              Datensammlung bis zum finalen Submission Review.
              <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
            </Link>
            <Link
              className="orange-link inline-flex items-center gap-2 text-sm"
              href="/de/ressourcen/esg-daten-einmal-sammeln-mehrfach-nutzen"
            >
              Sie möchten Daten und Nachweise nicht bei jeder Anfrage neu
              zusammensuchen? Bauen Sie daraus eine wiederverwendbare
              ESG-Datengrundlage.
              <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
