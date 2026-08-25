import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "../Reveal";

const relatedLinks = [
  {
    title: "ESG-Anforderungen von Kunden",
    body: "Ihr Kunde verlangt konkrete Nachhaltigkeitsdaten, Dokumente oder Nachweise? Wir strukturieren die Anfrage und bereiten die erforderlichen Informationen vor.",
    href: "/de/esg-kundenanfragen"
  },
  {
    title: "ESG-Fragebogen für Lieferanten",
    body: "Sie haben einen kundenspezifischen ESG- oder Nachhaltigkeitsfragebogen erhalten? Wir ordnen Daten und Nachweise entlang der konkreten Fragen.",
    href: "/de/esg-fragebogen-lieferanten"
  },
  {
    title: "EcoVadis-Unterstützung",
    body: "Sie bereiten eine EcoVadis-Bewertung vor? Wir helfen bei der strukturierten Vorbereitung von Antworten, Daten und Nachweisen.",
    href: "/de/ecovadis-unterstuetzung"
  },
  {
    title: "IntegrityNext-Unterstützung",
    body: "Ihr Kunde hat Sie zu IntegrityNext eingeladen? Wir unterstützen bei der Vorbereitung der angeforderten Assessments, Zertifikate und Informationen.",
    href: "/de/integritynext-unterstuetzung"
  }
];

export function RelatedRequirements() {
  return (
    <section className="section-padding bg-[var(--warm)]">
      <div className="site-shell">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Konkrete Anforderungen</p>
          <h2 className="heading-md font-display mt-6 max-w-[20ch]">
            Vom Nachhaltigkeitsbericht zur konkreten Kundenanforderung
          </h2>
          <p className="body-lg mt-7">
            Eine strukturierte ESG-Datengrundlage kann auch bei anderen
            Anforderungen helfen.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {relatedLinks.map((link, index) => (
            <Reveal
              className="rounded-[1.25rem] border border-[rgba(21,21,21,0.11)] bg-white p-7 shadow-lift"
              delay={index * 0.06}
              key={link.href}
            >
              <h3 className="text-xl font-bold text-ink">{link.title}</h3>
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
