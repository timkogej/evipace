import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "../Reveal";

const relatedLinks = [
  {
    title: "ESG-Anforderungen von Kunden",
    body: "Wenn Ihr Kunde einzelne ESG-Daten, Dokumente oder Nachweise verlangt, unterstützen wir bei der strukturierten Vorbereitung der Antwort.",
    href: "/de/esg-kundenanfragen"
  },
  {
    title: "ESG-Fragebogen für Lieferanten",
    body: "Wenn Ihr Kunde einen eigenen strukturierten Nachhaltigkeits- oder ESG-Fragebogen geschickt hat, unterstützen wir bei der Vorbereitung der Antworten und Nachweise entlang der konkreten Fragen.",
    href: "/de/esg-fragebogen-lieferanten"
  }
];

export function RelatedRequirements() {
  return (
    <section className="section-padding bg-[var(--warm)]">
      <div className="site-shell">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Weitere Formate</p>
          <h2 className="heading-md font-display mt-6 max-w-[20ch]">
            EcoVadis ist nur eine Form von ESG-Kundenanforderungen.
          </h2>
          <p className="body-lg mt-7">
            Manche Kunden verlangen eine EcoVadis-Bewertung. Andere verwenden
            eigene Fragebögen, Excel-Dateien, Lieferantenportale oder
            individuelle ESG-Anfragen. Evipace unterstützt auch bei diesen
            Formaten.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {relatedLinks.map((link, index) => (
            <Reveal
              className="rounded-[1.25rem] border border-[rgba(21,21,21,0.11)] bg-white p-7 shadow-lift sm:p-9"
              delay={index * 0.08}
              key={link.href}
            >
              <h3 className="text-2xl font-bold text-ink">{link.title}</h3>
              <p className="mt-4 leading-7 text-muted">{link.body}</p>
              <Link
                className="orange-link mt-6 inline-flex items-center gap-2 text-sm"
                href={link.href}
              >
                {link.title}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
