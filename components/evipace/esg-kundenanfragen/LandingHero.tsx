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
      <ServiceBreadcrumb current="ESG-Kundenanfragen" />
      <div className="site-shell grid grid-cols-[minmax(0,1fr)] gap-10 pb-14 pt-4 sm:pb-18 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">ESG-Kundenanfragen</p>
          <h1 className="type-title font-display mt-6" id="hero-title">
            Ihr Kunde verlangt ESG-Daten? Wir bringen die Antwort zusammen.
          </h1>
          <p className="type-lead mt-7 max-w-xl text-muted">
            Senden Sie uns die Anfrage Ihres Kunden – als E-Mail, Fragebogen,
            Excel-Datei oder Portal-Einladung. Wir klären die Anforderungen,
            ordnen vorhandene Daten und Nachweise zu und bereiten eine
            nachvollziehbare Antwort für Ihre Prüfung vor.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <ButtonLink
              className="w-full max-w-full text-center sm:w-auto"
              href={SEND_REQUEST_HREF}
            >
              ESG-Anfrage senden
            </ButtonLink>
            <a
              className="orange-link inline-flex min-h-12 items-center gap-2 px-1 text-sm"
              href="#ablauf"
            >
              So funktioniert es
            </a>
          </div>
          <p className="mt-6 text-sm font-semibold text-[rgba(21,21,21,0.62)]">
            Starten Sie mit der Anfrage. Sie müssen die ESG-Daten noch nicht selbst zusammenstellen.
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <ImageSlot
            alt="ESG-Daten und Nachweise werden aus Rechnungen, Tabellen und Zertifikaten vorbereitet"
            className="aspect-[4/3] overflow-hidden bg-[#f8f8f6]"
            imageClassName={evipaceImages.customerData.imageClassName}
            priority
            quality={evipaceImages.customerData.quality}
            sizes="(min-width: 1024px) 44vw, 100vw"
            src={evipaceImages.customerData.src}
          />
        </Reveal>
      </div>
    </section>
  );
}
