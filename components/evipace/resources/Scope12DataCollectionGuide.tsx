import type { ReactNode } from "react";
import {
  ArrowDown,
  ArrowRight,
  ClipboardList,
  FileCheck2,
  Gauge,
  Link2,
  ShieldCheck,
  Zap
} from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "../ButtonLink";
import { Scope12DataCollectionTool } from "./Scope12DataCollectionTool";

const links = {
  resources: "/de/ressourcen",
  calculationGuide: "/de/ressourcen/scope-1-2-daten-berechnung",
  explainer: "/de/ressourcen/scope-1-2-3-einfach-erklaert",
  evidence: "/de/ressourcen/esg-nachweise-checkliste",
  owners: "/de/ressourcen/esg-daten-verantwortliche-abteilungen",
  service: "/de/scope-1-2-berechnung",
  request: "/de/send-request",
  methodology: "/de/methodology"
} as const;

function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      className="group inline-flex min-h-11 items-center gap-2 text-sm font-bold text-ink transition hover:text-orange"
      href={href}
    >
      <span>{children}</span>
      <ArrowRight
        aria-hidden="true"
        className="h-4 w-4 text-orange transition-transform group-hover:translate-x-1"
      />
    </Link>
  );
}

function ArticleSection({
  children,
  id,
  title
}: {
  children: ReactNode;
  id: string;
  title: string;
}) {
  return (
    <section
      aria-labelledby={`${id}-title`}
      className="scroll-mt-28 border-t border-[rgba(21,21,21,0.12)] py-14 sm:py-16"
      id={id}
    >
      <h2
        className="font-display max-w-[18ch] text-[clamp(2.3rem,5vw,4.6rem)] leading-none text-ink"
        id={`${id}-title`}
      >
        {title}
      </h2>
      <div className="resource-prose mt-7 max-w-3xl">{children}</div>
    </section>
  );
}

function DataCollectionArtwork() {
  return (
    <div aria-hidden="true" className="resource-hero-art scope12-screen-only hidden md:block">
      <svg
        className="resource-hero-art__sheet"
        fill="none"
        viewBox="0 0 520 650"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          height="520"
          rx="18"
          stroke="currentColor"
          strokeOpacity="0.42"
          strokeWidth="2"
          width="390"
          x="65"
          y="58"
        />
        {[128, 196, 264, 332, 400, 468].map((y, index) => (
          <g key={y}>
            <path
              d={`M118 ${y}H388M118 ${y + 26}H306`}
              stroke="currentColor"
              strokeOpacity="0.32"
              strokeWidth="2"
            />
            <rect
              fill={index < 4 ? "#FE7001" : "none"}
              fillOpacity={index < 4 ? 0.16 : 0}
              height="26"
              rx="6"
              stroke="currentColor"
              strokeWidth="2"
              width="26"
              x="82"
              y={y - 4}
            />
          </g>
        ))}
      </svg>
      <span className="resource-hero-art__code">
        LOCATION · PERIOD · SOURCE · UNIT · OWNER · STATUS
      </span>
    </div>
  );
}

const scopeOneItems = [
  "stationäre Verbrennung: Erdgas, Heizöl, LPG, Generator-Diesel oder andere Brennstoffe",
  "mobile Verbrennung: Diesel, Benzin, LPG oder andere Kraftstoffe eigener oder kontrollierter Fahrzeuge",
  "Kältemittel: Typ, nachgefüllte oder verlorene Menge, Wartungs- beziehungsweise Servicequelle",
  "direkte Prozessemissionen, falls sie im Produktionsprozess tatsächlich entstehen"
];

const scopeTwoItems = [
  "eingekaufter Strom je Standort und Zeitraum",
  "Lieferant, Tarif oder Stromprodukt, wenn diese Information verfügbar ist",
  "Zählernummer, Rechnungsnummer oder andere Quellenreferenz",
  "eingekaufte Wärme, Kälte oder Dampf, falls vorhanden"
];

const evidenceCards = [
  "Energie- und Lieferantenrechnungen",
  "Tankkarten- oder Kraftstoffauswertungen",
  "Wartungsprotokolle und Kältemittelberichte",
  "Zählerstände, Messstellenlisten und interne Auswertungen",
  "Verträge, Tarifinformationen und Herkunftsnachweise",
  "Freigaben, Annahmen und dokumentierte Datenlücken"
];

const errorCards = [
  "Standorte werden zusammengeführt, bevor klar ist, welche Gesellschaft und welcher Zeitraum gemeint sind.",
  "Eurobeträge werden gesammelt, obwohl physische Aktivitätsdaten wie kWh, Liter oder kg benötigt werden.",
  "Kältemittel, Generatoren, Stapler, Poolfahrzeuge oder Fernwärme werden übersehen.",
  "Stromdaten enthalten keine Quellenreferenz, keinen Lieferanten oder keine Vertragsinformation.",
  "Fehlende Werte werden still geschätzt, ohne Annahme, Quelle und Review sichtbar zu machen."
];

export function Scope12DataCollectionGuide() {
  return (
    <div className="scope12-data-page">
      <main id="top">
        <article>
          <header
            aria-labelledby="article-title"
            className="resource-article-hero relative isolate overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-24"
          >
            <DataCollectionArtwork />
            <div className="site-shell relative z-10">
              <nav
                aria-label="Brotkrümelnavigation"
                className="scope12-screen-only flex flex-wrap items-center gap-2 text-xs font-semibold text-[rgba(21,21,21,0.52)]"
              >
                <Link className="transition hover:text-orange" href="/de">
                  Startseite
                </Link>
                <span aria-hidden="true">/</span>
                <Link className="transition hover:text-orange" href="/de/ressourcen">
                  Ressourcen
                </Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page" className="text-ink">
                  Scope 1 &amp; 2 Datenerfassungs-Vorlage
                </span>
              </nav>

              <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.55fr)] lg:items-end lg:gap-16">
                <div className="min-w-0">
                  <p className="eyebrow">SCOPE 1 &amp; 2 DATA COLLECTION</p>
                  <h1
                    className="font-display mt-7 max-w-[14ch] break-words hyphens-auto text-[clamp(3.05rem,6.4vw,6.2rem)] leading-[0.92]"
                    id="article-title"
                  >
                    Sammeln Sie alle Daten für Scope 1 &amp; 2 an einem Ort.
                  </h1>
                  <p className="mt-8 max-w-3xl text-[clamp(1.08rem,1.55vw,1.35rem)] leading-[1.65] text-muted">
                    Erfassen Sie Strom-, Brennstoff-, Fahrzeug-, Kältemittel-
                    und Wärmedaten strukturiert je Standort, Quelle und
                    Zeitraum. Diese Vorlage berechnet keine CO₂e-Werte,
                    sondern bereitet die Aktivitätsdaten für eine spätere
                    Scope-1-&amp;-2-Berechnung vor.
                  </p>
                  <div className="scope12-screen-only mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <ButtonLink href="#datensammlung">
                      Datensammlung starten <ArrowDown aria-hidden="true" className="h-4 w-4" />
                    </ButtonLink>
                    <Link
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[rgba(21,21,21,0.18)] px-6 py-3 text-center text-sm font-bold text-ink transition hover:border-orange hover:text-orange"
                      href={links.resources}
                    >
                      Alle Ressourcen
                    </Link>
                  </div>
                  <p className="scope12-screen-only mt-5 text-sm font-semibold leading-6 text-muted">
                    Keine Registrierung. Keine Daten werden hochgeladen. Der
                    Arbeitsstand bleibt ausschließlich in Ihrem Browser.
                  </p>
                </div>

                <aside className="scope12-screen-only rounded-[1.15rem] border border-orange/25 bg-[rgba(255,255,255,0.78)] p-6 shadow-[0_24px_70px_rgba(21,21,21,0.07)] backdrop-blur-sm sm:p-7">
                  <ClipboardList aria-hidden="true" className="h-8 w-8 text-orange" />
                  <p className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-orange">
                    Vorlage statt Rechner
                  </p>
                  <p className="font-display mt-4 text-[1.72rem] leading-tight text-ink">
                    Standorte → Aktivitätsdaten → Quellen → Datenlücken →
                    Review-Status
                  </p>
                </aside>
              </div>
            </div>
          </header>

          <section className="bg-ink py-14 text-white sm:py-16">
            <div className="site-shell grid gap-8 lg:grid-cols-[0.58fr_1.42fr] lg:gap-16">
              <div>
                <p className="eyebrow">Einordnung</p>
                <h2 className="font-display mt-5 max-w-[14ch] text-[clamp(2.4rem,4.8vw,4.5rem)] leading-none">
                  Erst Datenbasis, dann CO₂e.
                </h2>
              </div>
              <div>
                <p className="max-w-3xl text-lg leading-8 text-white/70">
                  Eine belastbare Scope-1-&amp;-2-Berechnung beginnt nicht mit
                  einem Emissionsfaktor. Zuerst muss klar sein, welche
                  Aktivitätsdaten für welche Gesellschaft, welchen Standort,
                  welchen Zeitraum und welche Quelle vorliegen.
                </p>
                <div className="mt-9 grid gap-3 md:grid-cols-3">
                  {[
                    ["1", "Verbrauchsdaten", "Diese Vorlage deckt Schritt 1 ab."],
                    ["2", "Emissionsfaktoren", "Faktoren werden später methodisch ausgewählt."],
                    ["3", "CO₂e-Berechnung", "Die Berechnung folgt erst nach dem Review."]
                  ].map(([number, title, copy]) => (
                    <article className="border-t border-white/18 pt-5" key={number}>
                      <span className="font-mono text-xs font-bold text-orange">
                        {number}
                      </span>
                      <h3 className="mt-3 font-display text-3xl leading-tight text-white">
                        {title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-white/60">
                        {copy}
                      </p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section
            aria-labelledby="datensammlung-title"
            className="site-shell py-14 sm:py-16 lg:py-20"
            id="datensammlung"
          >
            <div className="mb-10 max-w-3xl">
              <p className="eyebrow">Interaktive Vorlage</p>
              <h2
                className="font-display mt-5 max-w-[15ch] text-[clamp(2.5rem,5.4vw,5.2rem)] leading-none text-ink"
                id="datensammlung-title"
              >
                Scope-1-&amp;-2-Daten strukturiert erfassen.
              </h2>
              <p className="mt-6 text-lg leading-8 text-muted">
                Legen Sie Standorte an, markieren Sie relevante Datenquellen,
                erfassen Sie Aktivitätsdaten und exportieren Sie Ihre Sammlung
                als CSV für die interne Prüfung.
              </p>
            </div>
            <Scope12DataCollectionTool />
          </section>

          <div className="scope12-editorial-content site-shell grid items-start gap-12 pb-20 lg:grid-cols-[15rem_minmax(0,55rem)] lg:justify-center lg:gap-16">
            <aside className="hidden lg:block">
              <nav
                aria-label="Inhalt des Leitfadens"
                className="sticky top-28 rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-[rgba(255,255,255,0.72)] p-5 backdrop-blur"
              >
                <p className="text-xs font-bold uppercase tracking-[0.13em] text-orange">
                  Im Leitfaden
                </p>
                <ol className="mt-5 grid gap-3 text-sm font-semibold leading-5 text-[rgba(21,21,21,0.62)]">
                  {[
                    ["Scope 1", "#scope-1-daten"],
                    ["Scope 2", "#scope-2-daten"],
                    ["Stromdetails", "#strom-details"],
                    ["Nachweise", "#nachweise"],
                    ["Fehler", "#fehler"],
                    ["Nächste Schritte", "#naechste-schritte"]
                  ].map(([label, href]) => (
                    <li key={href}>
                      <a className="transition hover:text-ink" href={href}>
                        {label}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>

            <div className="min-w-0">
              <ArticleSection id="scope-1-daten" title="Welche Daten gehören zu Scope 1?">
                <p>
                  Scope 1 umfasst direkte Emissionen aus Quellen, die innerhalb
                  Ihrer organisatorischen Bilanzgrenze liegen. Für die
                  Datensammlung heißt das: Nicht nur Gasrechnungen prüfen,
                  sondern alle direkten Quellen systematisch abfragen.
                </p>
                <ul className="mt-6 grid gap-3">
                  {scopeOneItems.map((item) => (
                    <li className="flex gap-3" key={item}>
                      <ShieldCheck aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-orange" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </ArticleSection>

              <ArticleSection id="scope-2-daten" title="Welche Daten gehören zu Scope 2?">
                <p>
                  Scope 2 betrifft eingekaufte Energie, die im Unternehmen
                  verbraucht wird. Für viele Unternehmen ist Strom die größte
                  Scope-2-Quelle, aber Wärme, Dampf oder Kälte sollten bewusst
                  geprüft werden.
                </p>
                <ul className="mt-6 grid gap-3">
                  {scopeTwoItems.map((item) => (
                    <li className="flex gap-3" key={item}>
                      <Zap aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-orange" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </ArticleSection>

              <ArticleSection id="strom-details" title="Warum bei Strom mehr als nur kWh relevant sein können">
                <p>
                  Für eine spätere Scope-2-Berechnung kann entscheidend sein,
                  ob nur der Stromverbrauch vorliegt oder auch Lieferant,
                  Tarif, Vertragsinformation, Beschaffungsnachweis und
                  Standortbezug dokumentiert sind.
                </p>
                <div className="my-8 rounded-[1rem] bg-[var(--soft-orange)] p-6">
                  <Gauge aria-hidden="true" className="h-7 w-7 text-orange" />
                  <p className="mt-4 font-display text-3xl leading-tight text-ink">
                    kWh sind der Startpunkt. Quelle, Zeitraum, Standort und
                    Vertragskontext machen den Datenpunkt prüfbar.
                  </p>
                </div>
                <p>
                  Die spätere methodische Einordnung erläutert unser Leitfaden{" "}
                  <Link href={links.calculationGuide}>
                    Scope 1 und Scope 2: Welche Daten braucht man?
                  </Link>
                  .
                </p>
              </ArticleSection>

              <ArticleSection id="nachweise" title="Welche Belege sollten Sie aufbewahren?">
                <p>
                  Jede Aktivitätszahl sollte auf eine nachvollziehbare Quelle
                  zurückgeführt werden können. Das ist besonders wichtig, wenn
                  Kunden, Plattformen oder interne Prüfer Rückfragen stellen.
                </p>
                <div className="not-prose my-8 grid gap-4 sm:grid-cols-2">
                  {evidenceCards.map((item) => (
                    <article
                      className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-5"
                      key={item}
                    >
                      <FileCheck2 aria-hidden="true" className="h-6 w-6 text-orange" />
                      <h3 className="mt-4 font-bold text-ink">{item}</h3>
                    </article>
                  ))}
                </div>
                <p>
                  Wenn Sie einzelne Belege prüfen möchten, nutzen Sie ergänzend
                  die{" "}
                  <Link href={links.evidence}>
                    ESG-Nachweise-Checkliste
                  </Link>
                  .
                </p>
              </ArticleSection>

              <ArticleSection id="fehler" title="Fünf typische Fehler bei der Datensammlung">
                <ol className="mt-6 grid gap-4">
                  {errorCards.map((item, index) => (
                    <li
                      className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-5"
                      key={item}
                    >
                      <span className="font-mono text-xs font-bold text-orange">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="mt-3 text-base leading-7 text-muted">{item}</p>
                    </li>
                  ))}
                </ol>
              </ArticleSection>

              <ArticleSection id="naechste-schritte" title="Von der Vorlage zur Berechnung">
                <p>
                  Diese Vorlage ist die Datensammlung. Für die fachliche
                  Berechnung brauchen Sie anschließend passende Methodik,
                  Emissionsfaktoren, Annahmen, Review und eine dokumentierte
                  Ergebnisaufbereitung.
                </p>
                <div className="not-prose my-8 grid gap-4 sm:grid-cols-2">
                  {[
                    [
                      "Berechnung vorbereiten",
                      "Wie Aktivitätsdaten in eine Scope-1-&-2-Berechnung überführt werden.",
                      links.calculationGuide
                    ],
                    [
                      "Scopes verstehen",
                      "Abgrenzung von Scope 1, 2 und 3 ohne Fachjargon.",
                      links.explainer
                    ],
                    [
                      "Data Owner finden",
                      "Welche Abteilung typischerweise welche ESG-Daten liefert.",
                      links.owners
                    ],
                    [
                      "Methodik ansehen",
                      "Wie Evipace Quellen, Annahmen und Review dokumentiert.",
                      links.methodology
                    ]
                  ].map(([title, copy, href]) => (
                    <article
                      className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-5"
                      key={href}
                    >
                      <Link2 aria-hidden="true" className="h-6 w-6 text-orange" />
                      <h3 className="mt-4 font-display text-3xl leading-tight text-ink">
                        {title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-muted">{copy}</p>
                      <div className="mt-4">
                        <InlineLink href={href}>Öffnen</InlineLink>
                      </div>
                    </article>
                  ))}
                </div>
                <p>
                  Wenn Sie die Berechnung nicht intern aufbauen möchten, kann
                  Evipace die{" "}
                  <Link href={links.service}>Scope-1-&amp;-2-Berechnung</Link>{" "}
                  für Sie strukturieren. Senden Sie uns dafür die vorhandenen
                  Daten über{" "}
                  <Link href={links.request}>Scope-1-&amp;-2-Berechnung anfragen</Link>
                  .
                </p>
                <p>
                  Wenn die Aktivitätsdaten, Quellen und Zeiträume einmal sauber
                  strukturiert sind, können sie auch Teil einer{" "}
                  <Link href="/de/ressourcen/esg-daten-einmal-sammeln-mehrfach-nutzen">
                    wiederverwendbaren ESG-Datengrundlage
                  </Link>{" "}
                  für spätere Kundenanfragen werden.
                </p>
              </ArticleSection>
            </div>
          </div>

          <section
            aria-labelledby="scope12-final-cta-title"
            className="scope12-screen-only bg-ink py-16 text-white sm:py-20"
          >
            <div className="site-shell grid gap-8 lg:grid-cols-[0.62fr_1fr] lg:items-end lg:gap-16">
              <div>
                <p className="eyebrow">Nächster Schritt</p>
                <h2
                  className="font-display mt-5 max-w-[15ch] text-[clamp(2.45rem,5vw,4.6rem)] leading-none"
                  id="scope12-final-cta-title"
                >
                  Daten gesammelt, aber die Berechnung fehlt?
                </h2>
              </div>
              <div>
                <p className="max-w-2xl text-lg leading-8 text-white/68">
                  Evipace strukturiert Ihre Scope-1-&amp;-2-Aktivitätsdaten,
                  dokumentiert Quellen und Annahmen und bereitet eine
                  nachvollziehbare Berechnung vor.
                </p>
                <div className="mt-7">
                  <ButtonLink href={links.request}>
                    Scope-1-&amp;-2-Berechnung anfragen
                  </ButtonLink>
                </div>
              </div>
            </div>
          </section>
        </article>
      </main>
    </div>
  );
}
