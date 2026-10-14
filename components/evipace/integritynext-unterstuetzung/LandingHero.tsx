import { ServiceHero, StatusPanel } from "../service-landing/Blocks";

const SEND_REQUEST_HREF = "/de/send-request";

const rows = [
  {
    label: "Umwelt und Klima",
    status: "Zertifikat prüfen",
    tone: "work"
  },
  {
    label: "Menschenrechte",
    status: "Input erforderlich",
    tone: "open"
  },
  {
    label: "Compliance",
    status: "Antwort vorbereitet",
    tone: "ready"
  },
  {
    label: "Lieferkette",
    status: "Nachweis zuordnen",
    tone: "work"
  }
];

export function LandingHero() {
  return (
    <ServiceHero
      actions={{
        primary: { label: "IntegrityNext-Anfrage senden", href: SEND_REQUEST_HREF },
        secondary: { label: "So unterstützen wir", href: "#unterstuetzung" }
      }}
      breadcrumb="IntegrityNext-Unterstützung"
      eyebrow="IntegrityNext-Unterstützung"
      lead="Ihr Kunde oder Geschäftspartner fordert Nachhaltigkeits- und Compliance-Informationen über IntegrityNext an? Sie zeigen uns die angeforderten Themen und Ihre vorhandenen Unterlagen. Wir strukturieren die benötigten Angaben, ordnen relevante Zertifikate und Nachweise zu und machen offene Punkte sichtbar."
      note="Unabhängige Unterstützung · keine Verbindung zu IntegrityNext"
      title="Zu IntegrityNext eingeladen? Wir helfen Ihnen durch die Assessments."
    >
      <StatusPanel
        label="Supplier-Assessments"
        rows={rows.map((row) => ({ label: row.label, status: row.status, open: row.tone !== "ready" }))}
      />
    </ServiceHero>
  );
}
