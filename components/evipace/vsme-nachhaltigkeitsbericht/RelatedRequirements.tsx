import { Band, CardGrid, Head, LinkCard } from "../service-landing/Blocks";

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
    <Band>
      <Head
        eyebrow="Konkrete Anforderungen"
        lead="Eine strukturierte ESG-Datengrundlage kann auch bei anderen Anforderungen helfen."
        title="Vom Nachhaltigkeitsbericht zur konkreten Kundenanforderung"
      />
      <CardGrid columns={2}>
        {relatedLinks.map((link) => (
          <LinkCard body={link.body} href={link.href} key={link.href} more={link.title} title={link.title} />
        ))}
      </CardGrid>
    </Band>
  );
}
