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
      <ServiceBreadcrumb current="VSME-Nachhaltigkeitsbericht" />
      <div className="site-shell grid grid-cols-[minmax(0,1fr)] gap-10 pb-14 pt-4 sm:pb-18 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">VSME-Nachhaltigkeitsbericht</p>
          <h1 className="type-title service-vsme-hero-title font-display mt-6" id="hero-title">
            VSME-Nachhaltigkeitsbericht erstellen - ohne daraus ein
            monatelanges Projekt zu machen.
          </h1>
          <p className="type-lead mt-7 max-w-xl text-muted">
            Sie liefern die vorhandenen Unternehmensdaten und Unterlagen. Wir
            strukturieren die relevanten Nachhaltigkeitsinformationen, bereiten
            Kennzahlen und Inhalte auf und führen alles zu einem
            nachvollziehbaren Bericht nach dem aktuellen freiwilligen
            europäischen Berichtsrahmen zusammen.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink
              className="w-full max-w-full text-center sm:w-auto"
              href={SEND_REQUEST_HREF}
            >
              VSME-Projekt anfragen
            </ButtonLink>
            <a
              className="orange-link inline-flex min-h-12 items-center gap-2 px-1 text-sm"
              href="#ablauf"
            >
              So erstellen wir den Bericht
            </a>
          </div>
          <p className="mt-7 text-sm font-semibold text-[rgba(21,21,21,0.62)]">
            Daten · Kennzahlen · Dokumentation · Bericht
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <ImageSlot
            alt="VSME Sustainability Report 2026 als strukturierte ESG-Dokumentation"
            className="aspect-[4/3] overflow-hidden bg-[#f8f8f6]"
            imageClassName={evipaceImages.services.vsme.imageClassName}
            priority
            quality={evipaceImages.services.vsme.quality}
            sizes="(min-width: 1024px) 44vw, 100vw"
            src={evipaceImages.services.vsme.src}
          />
        </Reveal>
      </div>
    </section>
  );
}
