import {
  CheckCircle2,
  Database,
  FileCheck2,
  FileText,
  Mail
} from "lucide-react";
import { evipaceImages } from "@/lib/evipace-images";
import { ButtonLink } from "../ButtonLink";
import { ImageSlot } from "../ImageSlot";
import { Reveal } from "../Reveal";

const SEND_REQUEST_HREF = "/de/send-request";

const flow = [
  { icon: Mail, label: "Kundenanfrage" },
  { icon: Database, label: "Unternehmensdaten" },
  { icon: FileCheck2, label: "Nachweise" },
  { icon: CheckCircle2, label: "Antwort" }
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
          <p className="eyebrow">ESG-Kundenanfragen</p>
          <h1 className="heading-lg font-display mt-6" id="hero-title">
            Ihr Kunde verlangt ESG-Daten? Wir bringen die Antwort zusammen.
          </h1>
          <p className="body-lg mt-7 max-w-xl">
            Ob Emissionsdaten, Richtlinien, Zertifikate oder eine individuelle
            Nachhaltigkeitsanforderung: Sie senden uns die Anfrage Ihres
            Kunden. Wir identifizieren, was tatsächlich benötigt wird, ordnen
            vorhandene Informationen zu und bereiten eine strukturierte,
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
          <p className="mt-7 text-sm font-semibold text-[rgba(21,21,21,0.62)]">
            E-Mail · Excel · PDF · Kundenportal · individuelle Anforderungen
          </p>
        </Reveal>

        <Reveal className="space-y-5" delay={0.12}>
          <ImageSlot
            alt="ESG-Daten und Nachweise werden aus Rechnungen, Tabellen und Zertifikaten vorbereitet"
            className="aspect-[4/3] rounded-[1.25rem] shadow-lift"
            imageClassName={evipaceImages.customerData.imageClassName}
            priority
            quality={evipaceImages.customerData.quality}
            sizes="(min-width: 1024px) 44vw, 100vw"
            src={evipaceImages.customerData.src}
          />

          <div className="grid gap-3 sm:grid-cols-4">
            {flow.map((item) => (
              <div
                className="border-t border-[rgba(21,21,21,0.13)] pt-3"
                key={item.label}
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--soft-orange)] text-orange">
                  <item.icon aria-hidden="true" className="h-4 w-4" />
                </div>
                <p className="mt-3 text-sm font-bold text-ink">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-5 shadow-[0_14px_45px_rgba(21,21,21,0.045)]">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--soft-orange)] text-orange">
                <FileText aria-hidden="true" className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.1em] text-[rgba(21,21,21,0.5)]">
                  Strukturierter Output
                </p>
                <p className="mt-2 leading-7 text-muted">
                  Anfrage, Datenquellen, Nachweise und offene Punkte werden so
                  vorbereitet, dass Sie die Antwort intern prüfen können.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
