import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "../Reveal";

export function RelatedQuestionnaire() {
  return (
    <section className="section-padding bg-white">
      <div className="site-shell">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Konkretere Anfrage</p>
          <h2 className="heading-md font-display mt-6 max-w-[18ch]">
            Wenn die Kundenanfrage konkreter wird
          </h2>
          <p className="body-lg mt-7">
            Nicht jede ESG-Anforderung sieht gleich aus.
          </p>
        </Reveal>

        <Reveal
          className="mt-10 rounded-[1.25rem] border border-[rgba(21,21,21,0.11)] bg-[var(--paper)] p-7 shadow-lift sm:p-9"
          delay={0.08}
        >
          <h3 className="text-2xl font-bold text-ink">
            ESG-Fragebogen für Lieferanten
          </h3>
          <div className="mt-5 space-y-4 text-lg leading-8 text-muted">
            <p>
              Hat Ihr Kunde einen strukturierten ESG- oder
              Nachhaltigkeitsfragebogen geschickt?
            </p>
            <p>
              Dann unterstützen wir bei der Vorbereitung der Antworten, Daten
              und Nachweise entlang der einzelnen Fragen.
            </p>
          </div>
          <Link
            className="orange-link mt-6 inline-flex items-center gap-2 text-sm"
            href="/de/esg-fragebogen-lieferanten"
          >
            ESG-Fragebogen für Lieferanten
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </Reveal>

        <Reveal className="mt-9 max-w-3xl text-lg leading-8 text-muted" delay={0.14}>
          Andere Anforderungen können beispielsweise aus standardisierten
          ESG-Plattformen, Emissionsabfragen oder Reporting-Anforderungen
          entstehen. Dafür entstehen separate, spezialisierte Leistungsseiten.
        </Reveal>
      </div>
    </section>
  );
}
