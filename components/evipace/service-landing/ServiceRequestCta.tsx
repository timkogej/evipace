import { ClosingCta } from "../home/ClosingCta";

type ServiceRequestCtaProps = {
  eyebrow: string;
  title: string;
  body: string;
  button: string;
  href: string;
};

/** Service-page closing CTA: the homepage's closing band with the form link. */
export function ServiceRequestCta({ eyebrow, title, body, button, href }: ServiceRequestCtaProps) {
  const german = href.startsWith("/de");
  return (
    <ClosingCta
      body={body}
      formHref={href}
      formLabel={button}
      forwardLabel={german ? "Anfrage weiterleiten" : "Forward your request"}
      slogan={eyebrow}
      title={title}
    />
  );
}
