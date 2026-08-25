import { Calculator, FileText, Scale, Timer, Waves } from "lucide-react";
import { Reveal } from "../Reveal";

const details = [
  {
    icon: Scale,
    title: "Einheiten müssen stimmen",
    body: "kWh, MWh, Liter, Kilogramm oder Kubikmeter müssen korrekt interpretiert und bei Bedarf umgerechnet werden."
  },
  {
    icon: Timer,
    title: "Der richtige Zeitraum muss verwendet werden",
    body: "Verbrauchsdaten müssen zum gewählten Berichtsjahr passen."
  },
  {
    icon: Calculator,
    title: "Der Emissionsfaktor muss zur Quelle passen",
    body: "Nicht jeder Faktor ist für jeden Brennstoff, jede Region oder jeden Zweck geeignet."
  },
  {
    icon: FileText,
    title: "Die Version muss dokumentiert werden",
    body: "Emissionsfaktoren und methodische Grundlagen können sich über die Zeit ändern. Deshalb sollte nachvollziehbar bleiben, welche Quelle und welche Version für die Berechnung verwendet wurde."
  },
  {
    icon: Waves,
    title: "Auch andere Treibhausgase zählen",
    body: "Eine Unternehmensbilanz betrachtet nicht ausschließlich Kohlenstoffdioxid. Relevante Treibhausgase werden über ihr jeweiliges Treibhauspotenzial in CO₂-Äquivalente - CO₂e - umgerechnet."
  }
];

export function CalculationMethod() {
  return (
    <section className="section-padding bg-[var(--warm)]" id="berechnung">
      <div className="site-shell">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Berechnungslogik</p>
          <h2 className="heading-md font-display mt-6 max-w-[20ch]">
            Verbrauch × Emissionsfaktor = CO₂e - aber die Details entscheiden
            über die Qualität.
          </h2>
          <p className="body-lg mt-7">
            Die grundlegende Logik einer emissionsbasierten Berechnung ist
            einfach:
          </p>
        </Reveal>

        <Reveal
          className="mt-10 rounded-[1.25rem] border border-[rgba(21,21,21,0.11)] bg-white p-7 shadow-lift sm:p-9"
          delay={0.08}
        >
          <div className="grid gap-4 text-center text-ink sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">
            <div className="rounded-[0.85rem] bg-[var(--paper)] p-5">
              <p className="text-lg font-bold">Aktivitätsdaten</p>
            </div>
            <span className="text-2xl font-bold text-orange">×</span>
            <div className="rounded-[0.85rem] bg-[var(--paper)] p-5">
              <p className="text-lg font-bold">Emissionsfaktor</p>
            </div>
            <span className="text-2xl font-bold text-orange">=</span>
            <div className="rounded-[0.85rem] bg-[var(--paper)] p-5">
              <p className="text-lg font-bold">Treibhausgasemissionen</p>
            </div>
          </div>
          <div className="mt-6 grid gap-3 text-center text-sm font-bold text-muted sm:grid-cols-[1fr_auto_1fr_auto_1fr] sm:items-center">
            <span>Erdgasverbrauch</span>
            <span>×</span>
            <span>geeigneter Emissionsfaktor</span>
            <span>=</span>
            <span>tCO₂e</span>
          </div>
        </Reveal>

        <Reveal className="mt-10 max-w-3xl text-lg leading-8 text-muted" delay={0.12}>
          In der Praxis entstehen die Unterschiede jedoch in den Details.
        </Reveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-5">
          {details.map((detail, index) => (
            <Reveal
              className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-6 shadow-[0_12px_35px_rgba(21,21,21,0.04)]"
              delay={index * 0.05}
              key={detail.title}
            >
              <detail.icon aria-hidden="true" className="h-5 w-5 text-orange" />
              <h3 className="mt-5 text-lg font-bold text-ink">
                {detail.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                {detail.body}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 max-w-3xl text-lg leading-8 text-muted" delay={0.14}>
          Wir dokumentieren deshalb nicht nur das Ergebnis, sondern auch die
          Berechnungsgrundlage dahinter.
        </Reveal>
      </div>
    </section>
  );
}
