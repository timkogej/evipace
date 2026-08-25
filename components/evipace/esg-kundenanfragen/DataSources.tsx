import Link from "next/link";
import { Reveal } from "../Reveal";

const sources = [
  {
    title: "Buchhaltung",
    body: "Hier finden sich beispielsweise Stromrechnungen, Brennstoffkosten, Kraftstoffdaten oder andere Verbrauchsinformationen."
  },
  {
    title: "Qualitätsmanagement",
    body: "Zertifikate, Managementsysteme und bestehende Dokumentationen sind häufig bereits vorhanden."
  },
  {
    title: "Personalabteilung",
    body: "Informationen zu Beschäftigten, Arbeitsschutz, Weiterbildung oder sozialen Kennzahlen kommen oft aus HR."
  },
  {
    title: "Geschäftsführung",
    body: "Richtlinien, Verantwortlichkeiten und Governance-Themen benötigen häufig Informationen oder Freigaben aus der Unternehmensleitung."
  },
  {
    title: "Produktion",
    body: "Verbrauchs-, Energie- oder Aktivitätsdaten können direkt aus Produktion oder Betriebsführung stammen."
  },
  {
    title: "Bestehende Excel-Dateien und Kundenanfragen",
    body: "Auch frühere ESG-Abfragen enthalten oft bereits Informationen, die wiederverwendet werden können."
  }
];

export function DataSources() {
  return (
    <section className="section-padding bg-[var(--warm)]">
      <div className="site-shell">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Vorhandene Grundlage</p>
          <h2 className="heading-md font-display mt-6 max-w-[20ch]">
            Ihre ESG-Daten sind oft bereits vorhanden - nur nicht als fertige
            Kundenantwort.
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-8 text-muted">
            <p>
              Viele Unternehmen beginnen bei jeder neuen ESG-Anfrage wieder bei
              null.
            </p>
            <p>
              Dabei liegen große Teile der benötigten Informationen häufig
              bereits im Unternehmen.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sources.map((source, index) => (
            <Reveal
              className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-6 shadow-[0_14px_45px_rgba(21,21,21,0.045)]"
              delay={index * 0.05}
              key={source.title}
            >
              <h3 className="text-lg font-bold text-ink">{source.title}</h3>
              <p className="mt-3 leading-7 text-muted">{source.body}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 max-w-3xl text-lg leading-8 text-muted" delay={0.1}>
          <p>
            evipace macht aus verteilten Unternehmensinformationen eine
            strukturierte Antwort auf die konkrete Kundenanforderung.
          </p>
          <p className="mt-5">
            Unklar, welche Abteilung welche Informationen liefern soll? Unser
            Überblick zeigt zuerst,{" "}
            <Link
              className="font-semibold text-ink underline decoration-[rgba(254,112,1,0.45)] underline-offset-4 transition hover:text-orange"
              href="/de/ressourcen/welche-esg-daten-kunden-lieferanten"
            >
              welche ESG-Daten Kunden typischerweise anfragen
            </Link>
            . Unser Leitfaden zeigt eine praktische{" "}
            <Link
              className="font-semibold text-ink underline decoration-[rgba(254,112,1,0.45)] underline-offset-4 transition hover:text-orange"
              href="/de/ressourcen/esg-daten-verantwortliche-abteilungen"
            >
              Data-Owner-Struktur für ESG-Kundenanfragen
            </Link>{" "}
            – von Finance und HR bis Einkauf, Qualität und Operations.
          </p>
          <p className="mt-5">
            Wenn der Kunde eine Environmental Policy verlangt, sollte eine{" "}
            <Link
              className="font-semibold text-ink underline decoration-[rgba(254,112,1,0.45)] underline-offset-4 transition hover:text-orange"
              href="/de/ressourcen/environmental-policy-erstellen"
            >
              belastbare Umweltrichtlinie aus tatsächlicher Praxis
            </Link>{" "}
            entstehen – nicht aus rückwirkenden oder generischen Aussagen.
          </p>
          <p className="mt-5">
            Bei Lieferantenanforderungen hilft ein{" "}
            <Link
              className="font-semibold text-ink underline decoration-[rgba(254,112,1,0.45)] underline-offset-4 transition hover:text-orange"
              href="/de/ressourcen/supplier-code-of-conduct-erstellen"
            >
              sauber abgegrenzter Supplier Code of Conduct
            </Link>
            , damit veröffentlichte Erwartungen, Lieferantenbestätigung und
            tatsächliche Umsetzung nicht vermischt werden.
          </p>
          <p className="mt-5">
            Wenn mehrere Kunden ähnliche Informationen verlangen, lohnt sich
            außerdem eine{" "}
            <Link
              className="font-semibold text-ink underline decoration-[rgba(254,112,1,0.45)] underline-offset-4 transition hover:text-orange"
              href="/de/ressourcen/esg-daten-einmal-sammeln-mehrfach-nutzen"
            >
              wiederverwendbare ESG-Datengrundlage
            </Link>
            , damit Daten und Nachweise nicht bei jeder Anfrage neu
            zusammengesucht werden.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
