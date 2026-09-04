import { BarChart3, Database, FileText, ScrollText } from "lucide-react";
import { evipaceImages } from "@/lib/evipace-images";
import { ButtonLink } from "../ButtonLink";
import { ImageSlot } from "../ImageSlot";
import { Reveal } from "../Reveal";
import { ServiceBreadcrumb } from "../trust/ServiceBreadcrumb";

const SEND_REQUEST_HREF = "/de/send-request";

const flow = [
  { icon: Database, label: "Daten" },
  { icon: BarChart3, label: "Kennzahlen" },
  { icon: FileText, label: "Dokumentation" },
  { icon: ScrollText, label: "Bericht" }
];

export function LandingHero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pt-32"
      id="top"
    >
      <ServiceBreadcrumb current="VSME-Nachhaltigkeitsbericht" />
      <div className="site-shell grid gap-12 pb-16 pt-4 sm:pb-20 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">VSME-Nachhaltigkeitsbericht</p>
          <h1 className="heading-lg font-display mt-6" id="hero-title">
            VSME-Nachhaltigkeitsbericht erstellen - ohne daraus ein
            monatelanges Projekt zu machen.
          </h1>
          <p className="body-lg mt-7 max-w-xl">
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

        <Reveal className="space-y-5" delay={0.12}>
          <ImageSlot
            alt="VSME Sustainability Report 2026 als strukturierte ESG-Dokumentation"
            className="aspect-[4/3] rounded-[1.25rem] shadow-lift"
            imageClassName={evipaceImages.services.vsme.imageClassName}
            priority
            quality={evipaceImages.services.vsme.quality}
            sizes="(min-width: 1024px) 44vw, 100vw"
            src={evipaceImages.services.vsme.src}
          />
          <div className="grid gap-3 sm:grid-cols-4">
            {flow.map((item) => (
              <div
                className="border-t border-[rgba(21,21,21,0.13)] pt-3"
                key={item.label}
              >
                <item.icon aria-hidden="true" className="h-4 w-4 text-orange" />
                <p className="mt-2 text-sm font-bold text-ink">{item.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
