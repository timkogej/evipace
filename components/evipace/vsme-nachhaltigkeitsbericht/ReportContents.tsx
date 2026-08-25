import { Building2, Factory, Scale, Users, Zap } from "lucide-react";
import { Reveal } from "../Reveal";

const categories = [
  {
    icon: Building2,
    title: "Unternehmen und Berichtsgrundlage",
    intro: "Dazu gehören beispielsweise:",
    items: [
      "grundlegende Unternehmensinformationen",
      "Berichtszeitraum",
      "relevante Standorte",
      "Grundlage der Datenerhebung",
      "bestehende Nachhaltigkeitspraktiken",
      "Richtlinien und geplante Initiativen"
    ]
  },
  {
    icon: Zap,
    title: "Energie und Treibhausgasemissionen",
    intro: "Zum Beispiel:",
    items: [
      "Energieverbrauch",
      "Stromverbrauch",
      "Brennstoffe",
      "erneuerbare Energie",
      "Scope-1-Emissionen",
      "Scope-2-Emissionen"
    ]
  },
  {
    icon: Factory,
    title: "Umwelt",
    intro: "Je nach Unternehmenssituation können unter anderem relevant sein:",
    items: [
      "Luft-, Wasser- und Bodenverschmutzung",
      "Biodiversität",
      "Wasserverbrauch",
      "Ressourcennutzung",
      "Kreislaufwirtschaft",
      "Abfall"
    ]
  },
  {
    icon: Users,
    title: "Mitarbeitende",
    intro: "Zum Beispiel:",
    items: [
      "Beschäftigtenstruktur",
      "Arbeitssicherheit",
      "Arbeitsunfälle",
      "Vergütung",
      "Tarifbindung",
      "Weiterbildung"
    ]
  },
  {
    icon: Scale,
    title: "Governance",
    intro:
      "Dazu gehören auch Angaben zu Geschäftsethik sowie, wo relevant, zu Verstößen oder Sanktionen im Zusammenhang mit Korruption und Bestechung.",
    items: [
      "Geschäftsethik",
      "Governance-Informationen",
      "Korruption und Bestechung",
      "relevante Verstöße oder Sanktionen"
    ]
  }
];

export function ReportContents() {
  return (
    <section className="section-padding bg-[var(--warm)]">
      <div className="site-shell">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Berichtsstruktur</p>
          <h2 className="heading-md font-display mt-6 max-w-[18ch]">
            Was ein VSME-Bericht strukturiert abdeckt
          </h2>
          <p className="body-lg mt-7">
            Der freiwillige europäische Berichtsrahmen ordnet
            Nachhaltigkeitsinformationen in eine klare Struktur. Dabei geht es
            nicht nur um CO₂. Umwelt-, Sozial- und Governance-Themen werden in
            einem gemeinsamen Berichtsrahmen zusammengeführt.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <Reveal
              className={`rounded-[1.25rem] border border-[rgba(21,21,21,0.11)] bg-white p-7 shadow-lift ${
                index === categories.length - 1 ? "lg:col-span-2" : ""
              }`}
              delay={index * 0.05}
              key={category.title}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--soft-orange)] text-orange">
                <category.icon aria-hidden="true" className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-ink">
                {category.title}
              </h3>
              <p className="mt-3 leading-7 text-muted">{category.intro}</p>
              <ul className="mt-4 space-y-2">
                {category.items.map((item) => (
                  <li
                    className="border-t border-[rgba(21,21,21,0.1)] pt-2 text-sm text-muted"
                    key={item}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 max-w-3xl text-lg leading-8 text-muted" delay={0.12}>
          Welche Angaben für Ihr Unternehmen tatsächlich relevant sind, hängt
          von der gewählten Berichtsoption und Ihrer konkreten
          Unternehmenssituation ab.
        </Reveal>
      </div>
    </section>
  );
}
