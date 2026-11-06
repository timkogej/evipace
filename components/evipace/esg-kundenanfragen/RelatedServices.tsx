import { Band, CardGrid, Head, LinkCard } from "../service-landing/Blocks";

const relatedLinks = [
  {
    title: "EcoVadis-Unterstützung",
    body: "Wenn Ihr Kunde eine EcoVadis-Bewertung verlangt: Wir bereiten Antworten und Nachweise vor.",
    href: "/de/ecovadis-unterstuetzung"
  },
  {
    title: "IntegrityNext-Unterstützung",
    body: "Wenn Sie von einem Kunden zu IntegrityNext eingeladen wurden: Wir ordnen Zertifikate und Nachweise.",
    href: "/de/integritynext-unterstuetzung"
  },
  {
    title: "Scope 1 und 2 berechnen",
    body: "Wenn der Fragebogen Emissionswerte verlangt, die Ihr Unternehmen noch nicht berechnet.",
    href: "/de/scope-1-2-berechnung"
  },
  {
    title: "VSME-Nachhaltigkeitsbericht",
    body: "Wenn ein Kunde oder eine Bank einen freiwilligen Nachhaltigkeitsbericht erwartet.",
    href: "/de/vsme-nachhaltigkeitsbericht"
  }
];

export function RelatedServices() {
  return (
    <Band>
      <Head
        eyebrow="Weitere Leistungen"
        lead="Viele Kundenanfragen fragen nach denselben Unternehmensdaten. Was wir für einen Fragebogen ordnen, nutzen wir auch für diese Leistungen."
        title="Wenn Ihr Kunde etwas anderes verlangt."
      />
      <CardGrid columns={2}>
        {relatedLinks.map((link) => (
          <LinkCard body={link.body} href={link.href} key={link.href} more={link.title} title={link.title} />
        ))}
      </CardGrid>
    </Band>
  );
}
