import { ServiceRequestCta } from "../service-landing/ServiceRequestCta";

const SEND_REQUEST_HREF = "/de/send-request";

export function LandingFinalCTA() {
  return (
    <ServiceRequestCta
      eyebrow="Nächster Schritt"
      title="Eine ESG-Anfrage vom Kunden im Posteingang? Senden Sie sie uns."
      body="Schicken Sie uns die Anfrage Ihres Kunden. Wir strukturieren die Anforderungen und zeigen Ihnen, welche Angaben als Nächstes benötigt werden."
      button="ESG-Anfrage senden"
      href={SEND_REQUEST_HREF}
    />
  );
}
