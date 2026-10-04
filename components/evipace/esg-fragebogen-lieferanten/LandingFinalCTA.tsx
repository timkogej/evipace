import { ServiceRequestCta } from "../service-landing/ServiceRequestCta";

export function LandingFinalCTA() {
  return (
    <ServiceRequestCta
      eyebrow="Nächster Schritt"
      title="ESG-Fragebogen erhalten? Senden Sie ihn uns."
      body="Schicken Sie uns den Fragebogen und vorhandene Unterlagen. Wir prüfen, welche Daten und Nachweise benötigt werden und wie wir die Antworten für Ihre Prüfung vorbereiten können."
      button="ESG-Anfrage senden"
      href="/de/send-request"
    />
  );
}
