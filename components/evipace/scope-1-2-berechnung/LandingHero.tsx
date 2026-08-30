import { BarChart3, Database, Flame, Zap } from "lucide-react";
import { evipaceImages } from "@/lib/evipace-images";
import { ButtonLink } from "../ButtonLink";
import { ImageSlot } from "../ImageSlot";
import { Reveal } from "../Reveal";

const SEND_REQUEST_HREF = "/de/send-request";

const flow = [
  { icon: Database, label: "Verbrauch" },
  { icon: Flame, label: "Emissionsquelle" },
  { icon: Zap, label: "Faktor" },
  { icon: BarChart3, label: "tCO₂e" }
];

export function LandingHero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden pt-32"
      id="top"
    >
      <div className="site-shell grid gap-12 pb-16 pt-4 sm:pb-20 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Scope 1 & 2</p>
          <h1
            className="scope12-hero__title heading-lg font-display mt-6"
            id="hero-title"
          >
            CO₂-Bilanz für Ihr Unternehmen: Scope 1 und Scope 2 nachvollziehbar
            berechnen.
          </h1>
          <p className="body-lg mt-7 max-w-xl">
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

        <Reveal className="space-y-5" delay={0.12}>
          <ImageSlot
            alt={evipaceImages.services.scope.alt}
            className="aspect-[4/3] rounded-[1.25rem] shadow-lift"
            imageClassName={evipaceImages.services.scope.imageClassName}
            priority
            quality={evipaceImages.services.scope.quality}
            sizes="(min-width: 1024px) 44vw, 100vw"
            src={evipaceImages.services.scope.src}
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
