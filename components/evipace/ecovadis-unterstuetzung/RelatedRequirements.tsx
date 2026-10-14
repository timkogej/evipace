import { Band, CardGrid, Head, LinkCard } from "../service-landing/Blocks";

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
    <Band>
      <Head
        eyebrow="Weitere Formate"
        lead="Manche Kunden verlangen eine EcoVadis-Bewertung. Andere verwenden eigene Fragebögen, Excel-Dateien, Lieferantenportale oder individuelle ESG-Anfragen. Evipace unterstützt auch bei diesen Formaten."
        title="EcoVadis ist nur eine Form von ESG-Kundenanforderungen."
      />
      <CardGrid columns={2}>
        {relatedLinks.map((link) => (
          <LinkCard body={link.body} href={link.href} key={link.href} more={link.title} title={link.title} />
        ))}
      </CardGrid>
    </Band>
  );
}
