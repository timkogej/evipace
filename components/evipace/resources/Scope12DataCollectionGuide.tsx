import type { ReactNode } from "react";
import {
  ArrowRight,
  FileCheck2,
  Gauge,
  Link2,
  ShieldCheck,
  Zap
} from "lucide-react";
import Link from "next/link";
import { ClosingCta } from "../home/ClosingCta";
import {
  Head
} from "../service-landing/Blocks";
import { Scope12DataCollectionTool } from "./Scope12DataCollectionTool";
import {
  GuideBody,
  GuideQuickAnswer,
  GuideSection as ArticleSection,
  JumpNav,
  PillLink,
  QualifierBox,
  ResourceHero,
  ResourceMain,
  TextLink,
  ToolSection
} from "./ResourceParts";

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
      <ResourceMain locale="de">
        <article>
          <ResourceHero
            actions={<>
              <PillLink href="#datensammlung">Datensammlung starten ↓</PillLink>
              <TextLink href={links.resources}>Alle Ressourcen</TextLink>
            </>}
            current="Scope 1 &amp; 2 Datenerfassungs-Vorlage"
            eyebrow="SCOPE 1 &amp; 2 DATA COLLECTION"
            locale="de"
            title="Sammeln Sie alle Daten für Scope 1 &amp; 2 an einem Ort."
            titleId="guide-title"
          >
            <p>
              Erfassen Sie Strom-, Brennstoff-, Fahrzeug-, Kältemittel- und
              Wärmedaten strukturiert je Standort, Quelle und Zeitraum. Diese
              Vorlage berechnet keine CO₂e-Werte, sondern bereitet die
              Aktivitätsdaten für eine spätere Scope-1-&amp;-2-Berechnung vor.
            </p>
            <p className="scope12-screen-only">
              Keine Registrierung. Keine Daten werden hochgeladen. Der
              Arbeitsstand bleibt ausschließlich in Ihrem Browser.
            </p>
            <div className="scope12-screen-only">
              <QualifierBox label="Vorlage statt Rechner" title="Standorte → Aktivitätsdaten → Quellen → Datenlücken → Review-Status" />
            </div>
            <JumpNav items={[
                    ["Scope 1", "#scope-1-daten"],
                    ["Scope 2", "#scope-2-daten"],
                    ["Stromdetails", "#strom-details"],
                    ["Nachweise", "#nachweise"],
                    ["Fehler", "#fehler"],
                    ["Nächste Schritte", "#naechste-schritte"]
                  ].map(([label, href]) => ({ label: label, href: href }))} label="Inhalt des Leitfadens" />
          </ResourceHero>

          <GuideQuickAnswer eyebrow="Einordnung" title={<>Erst Datenbasis, dann CO₂e.</>}>
<div className="site-shell grid gap-8 lg:gap-16">
              
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
                      <h3 className="type-subheading mt-3 font-display text-white">
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
          </GuideQuickAnswer>

          <ToolSection id="datensammlung">
            <Head
              eyebrow="Interaktive Vorlage"
              id="datensammlung-title"
              lead="Legen Sie Standorte an, markieren Sie relevante Datenquellen, erfassen Sie Aktivitätsdaten und exportieren Sie Ihre Sammlung als CSV für die interne Prüfung."
              title={<>Scope-1-&amp;-2-Daten strukturiert erfassen.</>}
            />
            <Scope12DataCollectionTool />
          </ToolSection>

          <div className="scope12-editorial-content">
          <GuideBody>
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
                      <h3 className="type-subheading mt-4 font-display text-ink">
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
          </GuideBody>
          </div>
        </article>
        <div className="scope12-screen-only">
          <ClosingCta
            body={<p>Evipace strukturiert Ihre Scope-1-&amp;-2-Aktivitätsdaten, dokumentiert Quellen und Annahmen und bereitet eine nachvollziehbare Berechnung vor.</p>}
            formHref={links.request}
            formLabel="Scope-1-&-2-Berechnung anfragen"
            forwardLabel="Anfrage weiterleiten"
            slogan="Nächster Schritt"
            title="Daten gesammelt, aber die Berechnung fehlt?"
          />
        </div>
      </ResourceMain>
    </div>
  );
}
