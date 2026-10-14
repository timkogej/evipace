import { ServiceHero, StatusPanel } from "../service-landing/Blocks";

const SEND_REQUEST_HREF = "/de/send-request";

const evidenceRows = [
  {
    label: "Umweltpolitik",
    status: "Nachweis verfügbar",
    tone: "ready"
  },
  {
    label: "Scope 1 / Scope 2",
    status: "Berechnung prüfen",
    tone: "work"
  },
  {
    label: "Lieferantenkodex",
    status: "Abgleich nötig",
    tone: "work"
  },
  {
    label: "Arbeitsschutz",
    status: "Input erforderlich",
    tone: "open"
  }
];

export function LandingHero() {
  return (
    <ServiceHero
      actions={{
        primary: { label: "EcoVadis-Anfrage senden", href: SEND_REQUEST_HREF },
        secondary: { label: "So unterstützen wir", href: "#unterstuetzung" }
      }}
      breadcrumb="EcoVadis-Unterstützung"
      eyebrow="EcoVadis-Unterstützung"
      lead="Sie senden uns den aktuellen Assessment-Kontext und vorhandene Unterlagen. Wir übernehmen die Vorbereitung: Fragen und Daten strukturieren, belastbare Antworten entwerfen, Nachweise zuordnen und Lücken dokumentieren. Ihr Unternehmen bestätigt die Angaben und reicht das Assessment ein."
      note="Unabhängige Unterstützung · keine Verbindung zu EcoVadis · keine Score-Garantie"
      title="EcoVadis-Fragebogen vor Ihnen? Wir bereiten Antworten und Nachweise für Ihre Prüfung vor."
    >
      <StatusPanel
        label="Assessment-Vorbereitung"
        rows={evidenceRows.map((row) => ({ label: row.label, status: row.status, open: row.tone !== "ready" }))}
      />
    </ServiceHero>
  );
}
