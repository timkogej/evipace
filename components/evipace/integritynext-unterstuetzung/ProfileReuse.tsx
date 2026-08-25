import { History } from "lucide-react";
import { Reveal } from "../Reveal";

const reusableItems = [
  "Zertifikate",
  "Richtlinien",
  "Unternehmensdaten",
  "Verantwortlichkeiten",
  "Nachhaltigkeitsinformationen",
  "bestehende Antworten"
];

export function ProfileReuse() {
  return (
    <section className="section-padding bg-[var(--warm)]">
      <div className="site-shell">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Wiederverwendung</p>
          <h2 className="heading-md font-display mt-6 max-w-[20ch]">
            Einmal sauber aufgebaut, bei weiteren Kunden leichter nutzbar.
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-8 text-muted">
            <p>
              Ein gut gepflegtes Supplier-Profil kann auch bei weiteren
              Kundenanforderungen hilfreich sein.
            </p>
            <p>
              IntegrityNext ermöglicht Lieferanten, ein bestehendes Profil mit
              weiteren anfragenden Unternehmen zu teilen, statt für jeden
              Kunden grundsätzlich von vorne zu beginnen. Kundenspezifische
              Anforderungen können dennoch variieren.
            </p>
            <p>Für Ihr Unternehmen bedeutet das:</p>
            <p>Bereits strukturierte Informationen wie</p>
          </div>
        </Reveal>

        <Reveal
          className="mt-10 rounded-[1.25rem] border border-[rgba(21,21,21,0.11)] bg-white p-7 shadow-lift sm:p-9"
          delay={0.08}
        >
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--soft-orange)] text-orange">
              <History aria-hidden="true" className="h-5 w-5" />
            </div>
            <ul className="grid flex-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {reusableItems.map((item) => (
                <li
                  className="border-t border-[rgba(21,21,21,0.1)] pt-2 text-sm text-muted"
                  key={item}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal className="mt-10 max-w-3xl text-lg leading-8 text-muted" delay={0.14}>
          Die Arbeit an einer Kundenanfrage kann damit gleichzeitig helfen,
          Ihre ESG-Dokumentation langfristig besser zu organisieren.
        </Reveal>
      </div>
    </section>
  );
}
