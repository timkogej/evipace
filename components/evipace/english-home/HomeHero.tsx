import { evipaceImages } from "@/lib/evipace-images";
import { ButtonLink } from "../ButtonLink";
import { EvidenceDeskHero } from "../hero-evidence-desk/EvidenceDeskHero";

export function HomeHero({ imageAvailable }: { imageAvailable: boolean }) {
  return (
    <EvidenceDeskHero
      asset={evipaceImages.hero}
      headingId="hero-title"
      imageAvailable={imageAvailable}
      locale="en"
    >
      {/*
        One semantic h1, set as a deliberate two-line composition: one
        sentence per line. The spans are purely visual; the accessible name
        is still the whole sentence.
      */}
      <h1
        className="hero-desk__title hero-desk__title--sentence font-display"
        id="hero-title"
      >
        <span className="hero-desk__title-line">
          Your customer asked for ESG data.
        </span>
        <span className="hero-desk__title-line">
          We help you get it done.
        </span>
      </h1>

      <div className="hero-desk__body mt-6 space-y-4">
        <p>
          Customer questionnaires, emissions data, evidence, policies and
          sustainability reporting — prepared from the information your company
          already has.
        </p>
        <p className="hero-desk__body-secondary">
          Evipace takes care of the practical ESG work so your team can respond
          clearly, consistently and without turning every request into a new
          internal project.
        </p>
      </div>

      <div className="hero-desk__actions mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <ButtonLink
          className="w-full max-w-full text-center sm:w-auto"
          href="/en/send-request"
        >
          Send your ESG request
        </ButtonLink>
        <ButtonLink
          className="w-full max-w-full text-center sm:w-auto"
          href="#services"
          variant="secondary"
        >
          See what we handle
        </ButtonLink>
      </div>

      <p className="hero-desk__trust mt-7">
        Customer requests · ESG questionnaires · Scope 1 &amp; 2 · Reporting ·
        Evidence
      </p>
    </EvidenceDeskHero>
  );
}
