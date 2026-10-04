import { evipaceImages } from "@/lib/evipace-images";
import { ButtonLink } from "../ButtonLink";
import { ImageSlot } from "../ImageSlot";
import { Reveal } from "../Reveal";
import { ServiceBreadcrumb } from "../trust/ServiceBreadcrumb";

const SEND_REQUEST_HREF = "/de/send-request";

export function LandingHero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pt-32"
      id="top"
    >
      <ServiceBreadcrumb current="Scope 1 & 2" />
      <div className="site-shell grid grid-cols-[minmax(0,1fr)] gap-10 pb-14 pt-4 sm:pb-18 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Scope 1 & 2</p>
          <h1
            className="type-title scope12-hero__title font-display mt-6"
            id="hero-title"
          >
            CO₂-Bilanz für Ihr Unternehmen: Scope 1 und Scope 2 nachvollziehbar
            berechnen.
          </h1>
          <p className="type-lead mt-7 max-w-xl text-muted">
            Sie senden uns Stromrechnungen, Brennstoffverbräuche,
            Fuhrparkdaten und weitere relevante Unterlagen für die CO₂-Bilanz
            für Unternehmen. Wir strukturieren die Emissionsquellen, bereiten
            die Berechnung auf und dokumentieren nachvollziehbar, wie Ihre
            Scope-1- und Scope-2-Werte entstanden sind.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink
              className="w-full max-w-full text-center sm:w-auto"
              href={SEND_REQUEST_HREF}
            >
              Scope-1-&-2-Berechnung anfragen
            </ButtonLink>
            <a
              className="orange-link inline-flex min-h-12 items-center gap-2 px-1 text-sm"
              href="#ablauf"
            >
              So funktioniert die Berechnung
            </a>
          </div>
          <p className="mt-7 text-sm font-semibold text-[rgba(21,21,21,0.62)]">
            Energie · Brennstoffe · Fuhrpark · Kältemittel · CO₂e
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <ImageSlot
            alt={evipaceImages.services.scope.alt}
            className="aspect-[4/3] overflow-hidden bg-[#f8f8f6]"
            imageClassName={evipaceImages.services.scope.imageClassName}
            priority
            quality={evipaceImages.services.scope.quality}
            sizes="(min-width: 1024px) 44vw, 100vw"
            src={evipaceImages.services.scope.src}
          />
        </Reveal>
      </div>
    </section>
  );
}
