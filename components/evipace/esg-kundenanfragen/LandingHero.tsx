import { ServiceHero } from "../service-landing/Blocks";

const SEND_REQUEST_HREF = "/de/send-request";

export function LandingHero() {
  return (
    <ServiceHero
      actions={{
        primary: { label: "ESG-Anfrage senden", href: SEND_REQUEST_HREF },
        secondary: { label: "So funktioniert es", href: "#ablauf" }
      }}
      breadcrumb="ESG-Kundenanfragen"
      eyebrow="ESG-Kundenanfragen"
      lead="Senden Sie uns die Anfrage Ihres Kunden – als E-Mail, Fragebogen, Excel-Datei oder Portal-Einladung. Wir klären die Anforderungen, ordnen vorhandene Daten und Nachweise zu und bereiten eine nachvollziehbare Antwort für Ihre Prüfung vor."
      note="Starten Sie mit der Anfrage. Sie müssen die ESG-Daten noch nicht selbst zusammenstellen."
      title="Ihr Kunde verlangt ESG-Daten? Wir bringen die Antwort zusammen."
    />
  );
}
