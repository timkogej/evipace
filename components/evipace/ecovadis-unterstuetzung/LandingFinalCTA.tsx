import { ServiceRequestCta } from "../service-landing/ServiceRequestCta";

export function LandingFinalCTA() {
  return (
    <ServiceRequestCta
      eyebrow="Nächster Schritt"
      title="EcoVadis-Anfrage erhalten? Zeigen Sie uns Ihre Ausgangslage."
      body="Senden Sie uns Ihren Fragebogen, vorhandene Nachweise oder Ihre bisherige Scorecard. Wir zeigen Ihnen, was bereits nutzbar ist und welche Punkte vor der Einreichung offen bleiben."
      button="EcoVadis-Anfrage senden"
      href="/de/send-request"
    />
  );
}
