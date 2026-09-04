import type { ReactNode } from "react";
import {
  ArrowDown,
  ArrowRight,
  BadgeCheck,
  ClipboardCheck,
  FileCheck2,
  FolderTree,
  Link2,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "../ButtonLink";
import { EsgEvidenceReadinessTool } from "./EsgEvidenceReadinessTool";

const SEND_REQUEST_HREF = "/de/send-request";

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

function EvidenceArtwork() {
  return (
    <div aria-hidden="true" className="resource-hero-art evidence-screen-only">
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
            <circle
              cx="128"
              cy={y + 14}
              fill={index < 3 ? "#FE7001" : "none"}
              fillOpacity={index < 3 ? 0.18 : 0}
              r="15"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d={`M170 ${y + 6}H388M170 ${y + 22}H328`}
              stroke="currentColor"
              strokeOpacity="0.34"
              strokeWidth="2"
            />
          </g>
        ))}
      </svg>
      <span className="resource-hero-art__code">
        CLAIM · ENTITY · SCOPE · PERIOD · SOURCE · APPROVAL
      </span>
    </div>
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
      className="scroll-mt-28 border-t border-[rgba(21,21,21,0.12)] py-14 first:border-t-0 first:pt-0"
      id={id}
    >
      <h2
        className="font-display max-w-[18ch] text-[clamp(2.35rem,5vw,4.5rem)] leading-none text-ink"
        id={`${id}-title`}
      >
        {title}
      </h2>
      <div className="resource-prose mt-7 max-w-3xl">{children}</div>
    </section>
  );
}

const typicalEvidenceCards = [
  {
    title: "Energie & Emissionen",
    copy:
      "Strom- und Gasrechnungen, Brennstoffbelege, Zählerdaten, Kältemittelnachweise, Emissionsberechnungen."
  },
  {
    title: "Mitarbeitende",
    copy:
      "HR-Auswertungen, Schulungsnachweise, Arbeitsschutzunterlagen, dokumentierte Kennzahlen."
  },
  {
    title: "Umwelt",
    copy:
      "Entsorgungsnachweise, Umweltkennzahlen, Genehmigungs- oder Zertifikatsunterlagen, interne Aufzeichnungen."
  },
  {
    title: "Policies",
    copy:
      "Verabschiedete Unternehmensrichtlinien, Codes, Verfahren und dokumentierte Verantwortlichkeiten."
  },
  {
    title: "Lieferkette",
    copy:
      "Supplier Codes, Lieferantenbewertungen, Beschaffungsunterlagen und dokumentierte Prozesse."
  },
  {
    title: "Management & Governance",
    copy:
      "Freigaben, Zuständigkeiten, Protokolle und dokumentierte interne Kontrollen."
  }
];

export function EsgEvidenceReadinessGuide() {
  return (
    <div className="evidence-readiness-page">
      <main id="top">
        <article>
          <header
            aria-labelledby="article-title"
            className="resource-article-hero relative isolate overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-24"
          >
            <EvidenceArtwork />
            <div className="site-shell relative z-10">
              <nav
                aria-label="Brotkrümelnavigation"
                className="evidence-screen-only flex flex-wrap items-center gap-2 text-xs font-semibold text-[rgba(21,21,21,0.52)]"
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
                  ESG-Nachweise-Checkliste
                </span>
              </nav>

              <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.55fr)] lg:items-end lg:gap-16">
                <div className="min-w-0">
                  <p className="eyebrow">ESG EVIDENCE READINESS CHECK</p>
                  <h1
                    className="font-display mt-7 max-w-[14ch] break-words hyphens-auto text-[clamp(3.05rem,6.4vw,6.2rem)] leading-[0.92]"
                    id="article-title"
                  >
                    Ist dieser ESG-Nachweis wirklich verwendbar?
                  </h1>
                  <p className="mt-8 max-w-3xl text-[clamp(1.08rem,1.55vw,1.35rem)] leading-[1.65] text-muted">
                    Ein Dokument zu haben, bedeutet noch nicht automatisch,
                    dass es eine ESG-Aussage belastbar unterstützt. Prüfen Sie
                    einen Nachweis in wenigen Minuten auf Aussagebezug,
                    Gesellschaft, Scope, Zeitraum, Quelle, Freigabe und
                    Nachvollziehbarkeit.
                  </p>
                  <div className="evidence-screen-only mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <ButtonLink href="#nachweis-pruefen">
                      Nachweis jetzt prüfen <ArrowDown aria-hidden="true" className="h-4 w-4" />
                    </ButtonLink>
                    <Link
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[rgba(21,21,21,0.18)] px-6 py-3 text-center text-sm font-bold text-ink transition hover:border-orange hover:text-orange"
                      href="/de/ressourcen"
                    >
                      Alle Ressourcen
                    </Link>
                  </div>
                  <p className="evidence-screen-only mt-5 text-sm font-semibold leading-6 text-muted">
                    Keine Registrierung. Keine Dokumente werden hochgeladen.
                    Die Prüfung erfolgt ausschließlich in Ihrem Browser.
                  </p>
                </div>

                <aside className="evidence-screen-only rounded-[1.15rem] border border-orange/25 bg-[rgba(255,255,255,0.78)] p-6 shadow-[0_24px_70px_rgba(21,21,21,0.07)] backdrop-blur-sm sm:p-7">
                  <ClipboardCheck aria-hidden="true" className="h-8 w-8 text-orange" />
                  <p className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-orange">
                    Evidence Chain
                  </p>
                  <p className="font-display mt-4 text-[1.72rem] leading-tight text-ink">
                    Aussage → Gesellschaft → Scope → Zeitraum → Quelle →
                    Gültigkeit → Freigabe
                  </p>
                </aside>
              </div>
            </div>
          </header>

          <section className="bg-ink py-14 text-white sm:py-16">
            <div className="site-shell grid gap-8 lg:grid-cols-[0.58fr_1.42fr] lg:gap-16">
              <div>
                <p className="eyebrow">Abgrenzung</p>
                <h2 className="font-display mt-5 max-w-[14ch] text-[clamp(2.4rem,4.8vw,4.5rem)] leading-none">
                  Ein Nachweis. Nicht der ganze Fragebogen.
                </h2>
              </div>
              <div className="max-w-3xl text-lg leading-8 text-white/68">
                <p>
                  Die vollständige {" "}
                  <Link
                    className="font-bold text-white underline decoration-orange/60 underline-offset-4 hover:text-orange"
                    href="/de/ressourcen/esg-fragebogen-checkliste-lieferanten"
                  >
                    ESG-Fragebogen-Checkliste
                  </Link>{" "}
                  strukturiert eine komplette Kundenanfrage. Dieser Check
                  beantwortet eine engere Frage: Kann ein bestimmter Nachweis
                  eine konkrete ESG-Antwort tragen?
                </p>
                <p className="mt-5">
                  Wenn Sie zunächst klären möchten, welche Dokumenttypen
                  grundsätzlich relevant sein können, lesen Sie den Leitfaden zu{" "}
                  <Link
                    className="font-bold text-white underline decoration-orange/60 underline-offset-4 hover:text-orange"
                    href="/de/ressourcen/esg-nachweise-lieferanten"
                  >
                    ESG-Nachweisen für Lieferanten
                  </Link>
                  .
                </p>
              </div>
            </div>
          </section>

          <div className="site-shell py-12 sm:py-16">
            <EsgEvidenceReadinessTool />
          </div>

          <div className="evidence-editorial-content site-shell max-w-[72rem] pb-8 sm:pb-12">
            <ArticleSection id="was-ist-ein-esg-nachweis" title="Was ist ein ESG-Nachweis?">
              <p>
                Ein ESG-Nachweis ist eine Quelle, mit der eine Aussage,
                Kennzahl, Richtlinie oder tatsächliche Unternehmenspraxis
                nachvollziehbar unterstützt werden kann. Je nach Thema kann das
                beispielsweise eine Rechnung, ein Zertifikat, eine freigegebene
                Richtlinie, eine Berechnung, ein HR-Auszug, ein Protokoll oder
                ein anderer dokumentierter Datensatz sein.
              </p>
              <p>
                Entscheidend ist nicht nur, dass ein Dokument vorhanden ist. Es
                muss zur konkreten Aussage, zur richtigen Gesellschaft, zum
                relevanten Zeitraum und zum angefragten Scope passen.
              </p>
            </ArticleSection>

            <ArticleSection
              id="passendes-dokument"
              title="Ein passendes Dokument ist nicht automatisch ein guter Nachweis"
            >
              <p>
                Viele ESG-Anfragen scheitern nicht daran, dass überhaupt keine
                Informationen vorhanden sind. Häufig existieren bereits
                Dokumente, aber ihre Verbindung zur konkreten Kundenfrage ist
                unklar.
              </p>
              <p>
                Ein Zertifikat kann beispielsweise nur einen bestimmten Standort
                abdecken. Eine Konzernrichtlinie kann für eine
                Tochtergesellschaft gelten – muss es aber nicht automatisch.
                Eine interne Tabelle kann eine korrekte Kennzahl enthalten, ohne
                dass die ursprüngliche Datenquelle noch erkennbar ist.
              </p>
              <p>
                Deshalb sollte Evidence nicht nur gesammelt, sondern
                systematisch eingeordnet werden.
              </p>
            </ArticleSection>

            <ArticleSection id="kundenfrage-bis-quelle" title="Von der Kundenfrage bis zur Quelle">
              <div className="my-8 overflow-hidden rounded-[1.15rem] border border-orange/25 bg-[var(--soft-orange)] p-5 sm:p-7">
                <ol className="grid gap-3 sm:grid-cols-4">
                  {["Kundenfrage", "Antwort", "Nachweis", "Quelle"].map((item, index) => (
                    <li className="relative min-w-0 rounded-[0.85rem] bg-white p-4 text-center font-bold text-ink" key={item}>
                      <span>{item}</span>
                      {index < 3 ? (
                        <ArrowRight
                          aria-hidden="true"
                          className="absolute -right-5 top-1/2 z-10 hidden h-5 w-5 -translate-y-1/2 text-orange sm:block"
                        />
                      ) : null}
                    </li>
                  ))}
                </ol>
              </div>
              <p>
                Eine belastbare ESG-Antwort sollte sich möglichst durchgehend
                zurückverfolgen lassen.
              </p>
              <p>
                Wenn ein Kunde beispielsweise den Stromverbrauch eines Standorts
                für ein bestimmtes Geschäftsjahr verlangt, sollte erkennbar
                sein, welche Kennzahl angegeben wurde, wie sie berechnet oder
                aggregiert wurde und auf welchen Rechnungen, Messwerten oder
                anderen Quelldaten sie basiert.
              </p>
              <p>
                Diese Nachvollziehbarkeit erleichtert nicht nur die aktuelle
                Anfrage. Sie schafft auch eine wiederverwendbare Grundlage für
                spätere Fragebögen und ESG-Datenerhebungen.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:items-start">
                <InlineLink href="/de/ressourcen/esg-nachweise-lieferanten">
                  Mehr über ESG-Nachweise für Lieferanten
                </InlineLink>
                <InlineLink href="/de/ressourcen/esg-daten-einmal-sammeln-mehrfach-nutzen">
                  Daten und Nachweise nicht bei jeder Anfrage neu zusammensuchen
                </InlineLink>
              </div>
            </ArticleSection>

            <ArticleSection
              id="richtlinie-umsetzung"
              title="Eine Richtlinie ist nicht dasselbe wie ein Nachweis der Umsetzung"
            >
              <p>
                Eine Environmental Policy, ein Supplier Code of Conduct oder
                eine andere Unternehmensrichtlinie kann dokumentieren, welche
                Grundsätze und Erwartungen ein Unternehmen formell festgelegt
                hat.
              </p>
              <p>
                Sie sollte jedoch nicht automatisch als Nachweis dafür verwendet
                werden, dass jede darin genannte Maßnahme bereits vollständig
                umgesetzt wird.
              </p>
              <p>
                Umgekehrt sollte ein Entwurf nicht als bereits geltende
                Richtlinie dargestellt werden. Maßgeblich ist der tatsächliche
                Status des Dokuments im Unternehmen.
              </p>
              <p>
                Für Umweltpolitik erklärt der Leitfaden{" "}
                <Link href="/de/ressourcen/environmental-policy-erstellen">
                  eine belastbare Umweltrichtlinie erstellen
                </Link>
                , wie tatsächliche Praxis, Scope, Freigabe und Nachweise
                getrennt werden.
              </p>
              <p>
                Für Lieferantenanforderungen ordnet der Leitfaden{" "}
                <Link href="/de/ressourcen/supplier-code-of-conduct-erstellen">
                  Supplier Code of Conduct erstellen
                </Link>
                , wie Kodex, Kommunikation, Bestätigung und Anwendung
                nachvollziehbar voneinander getrennt werden.
              </p>
            </ArticleSection>

            <ArticleSection id="kennzahlen-datenkette" title="Bei Kennzahlen zählt die Datenkette">
              <p>
                Bei Energie-, Emissions-, Personal- oder anderen quantitativen
                ESG-Angaben reicht ein Endwert allein häufig nicht aus.
              </p>
              <p>Dokumentieren Sie möglichst:</p>
              <div className="my-7 rounded-[1rem] bg-ink p-5 text-white sm:p-6">
                <p className="font-display text-[clamp(1.8rem,4vw,3rem)] leading-tight">
                  Quelldaten → Aggregation → Berechnung → Ergebnis → verwendete
                  Annahmen
                </p>
              </div>
              <p>
                So bleibt auch später nachvollziehbar, wie eine Kennzahl
                entstanden ist und welche Datenbasis verwendet wurde.
              </p>
              <InlineLink href="/de/ressourcen/ecovadis-dokumente-nachweise">
                EcoVadis-Dokumente und Nachweise einordnen
              </InlineLink>
            </ArticleSection>

            <section
              aria-labelledby="typische-nachweise-title"
              className="scroll-mt-28 border-t border-[rgba(21,21,21,0.12)] py-14"
              id="typische-esg-nachweise"
            >
              <h2
                className="font-display max-w-[18ch] text-[clamp(2.35rem,5vw,4.5rem)] leading-none text-ink"
                id="typische-nachweise-title"
              >
                Typische ESG-Nachweise in produzierenden Unternehmen
              </h2>
              <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {typicalEvidenceCards.map((card) => (
                  <article
                    className="rounded-[1rem] border border-[rgba(21,21,21,0.12)] bg-white p-5"
                    key={card.title}
                  >
                    <h3 className="font-display text-2xl leading-tight text-ink">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-muted">
                      {card.copy}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section className="grid gap-5 border-t border-[rgba(21,21,21,0.12)] py-14 md:grid-cols-2">
              <article className="rounded-[1.1rem] border border-[rgba(21,21,21,0.12)] bg-white p-6 sm:p-7">
                <FolderTree aria-hidden="true" className="h-8 w-8 text-orange" />
                <h2 className="font-display mt-5 text-3xl leading-tight text-ink">
                  Sie wissen nicht, wer den fehlenden Nachweis liefern kann?
                </h2>
                <p className="mt-4 text-sm leading-7 text-muted">
                  ESG-Daten liegen häufig nicht bei einer einzelnen Person.
                  Finance besitzt Rechnungen, HR Mitarbeitendendaten, Facility
                  Management Verbrauchsdaten und Quality oder EHS verwalten
                  weitere Nachweise.
                </p>
                <p className="mt-3 text-sm leading-7 text-muted">
                  Unsere Data Owner Map zeigt, welche internen Funktionen
                  typischerweise welche ESG-Informationen liefern.
                </p>
                <p className="mt-3 text-sm leading-7 text-muted">
                  Für Strom-, Brennstoff-, Fahrzeug- und Kältemitteldaten
                  hilft zusätzlich die{" "}
                  <Link href="/de/ressourcen/scope-1-2-datenerfassungs-vorlage">
                    Scope 1 &amp; 2 Datenerfassungs-Vorlage
                  </Link>
                  .
                </p>
                <div className="mt-5">
                  <InlineLink href="/de/ressourcen/esg-daten-verantwortliche-abteilungen">
                    Zur ESG Data Owner Map
                  </InlineLink>
                </div>
              </article>

              <article className="rounded-[1.1rem] border border-[rgba(21,21,21,0.12)] bg-white p-6 sm:p-7">
                <FileCheck2 aria-hidden="true" className="h-8 w-8 text-orange" />
                <h2 className="font-display mt-5 text-3xl leading-tight text-ink">
                  Sie prüfen nicht nur einen Nachweis, sondern einen ganzen
                  Kundenfragebogen?
                </h2>
                <p className="mt-4 text-sm leading-7 text-muted">
                  Nutzen Sie die vollständige ESG-Fragebogen-Checkliste, wenn
                  Sie eine konkrete Kundenanfrage von der ersten Sichtung bis
                  zur finalen internen Prüfung strukturieren möchten.
                </p>
                <div className="mt-5">
                  <InlineLink href="/de/ressourcen/esg-fragebogen-checkliste-lieferanten">
                    Zur ESG-Fragebogen-Checkliste
                  </InlineLink>
                </div>
              </article>
            </section>

            <section
              aria-labelledby="commercial-bridge-title"
              className="my-4 overflow-hidden rounded-[1.25rem] bg-ink p-7 text-white shadow-premium sm:p-10 lg:p-12"
            >
              <BadgeCheck aria-hidden="true" className="h-8 w-8 text-orange" />
              <h2
                className="font-display mt-6 max-w-[16ch] text-[clamp(2.45rem,5vw,4.5rem)] leading-none"
                id="commercial-bridge-title"
              >
                Sie haben die Unterlagen – aber noch keine klare
                Evidence-Struktur?
              </h2>
              <div className="mt-6 max-w-3xl space-y-4 text-lg leading-8 text-white/68">
                <p>
                  Senden Sie uns die ESG-Anfrage Ihres Kunden. Wir ordnen
                  Anforderungen, vorhandene Unternehmensdaten und Nachweise,
                  identifizieren offene Punkte und bereiten die Antworten für
                  Ihre interne Bestätigung vor.
                </p>
              </div>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <ButtonLink className="w-full sm:w-auto" href={SEND_REQUEST_HREF}>
                  ESG-Anfrage senden
                </ButtonLink>
                <ButtonLink
                  className="w-full sm:w-auto"
                  href="/de/esg-fragebogen-lieferanten"
                  variant="light"
                >
                  Mehr über ESG-Fragebögen für Lieferanten
                </ButtonLink>
              </div>
              <p className="mt-6 text-sm font-semibold text-white/50">
                Sie behalten die Kontrolle über Unternehmensangaben und die
                finale Einreichung.
              </p>
            </section>

            <section
              aria-labelledby="methodology-link-title"
              className="border-t border-[rgba(21,21,21,0.12)] py-14"
            >
              <div className="flex items-start gap-4">
                <ShieldCheck
                  aria-hidden="true"
                  className="mt-1 h-8 w-8 shrink-0 text-orange"
                />
                <div>
                  <h2
                    className="font-display text-3xl leading-tight text-ink"
                    id="methodology-link-title"
                  >
                    Praktische Prüfung statt pauschaler Bewertung.
                  </h2>
                  <p className="mt-4 max-w-3xl text-sm leading-7 text-muted">
                    Wie Evipace mit Quellen, Annahmen, Review und
                    Aussagegrenzen arbeitet, beschreibt unsere Methodik.
                  </p>
                  <div className="mt-5">
                    <InlineLink href="/de/methodology">
                      Zur Evipace Methodik
                    </InlineLink>
                  </div>
                </div>
              </div>
            </section>

            <section
              aria-labelledby="final-cta-title"
              className="border-t border-[rgba(21,21,21,0.12)] py-14"
            >
              <div className="rounded-[1.25rem] border border-orange/30 bg-[var(--soft-orange)] p-7 sm:p-10">
                <Link2 aria-hidden="true" className="h-8 w-8 text-orange" />
                <h2
                  className="font-display mt-6 max-w-[16ch] text-[clamp(2.45rem,5vw,4.5rem)] leading-none text-ink"
                  id="final-cta-title"
                >
                  Aus Dokumenten werden belastbare Antworten.
                </h2>
                <p className="mt-6 max-w-3xl text-lg leading-8 text-muted">
                  Wir helfen produzierenden Unternehmen dabei, vorhandene
                  ESG-Daten und Nachweise in eine klare, nachvollziehbare
                  Kundenantwort zu überführen.
                </p>
                <div className="mt-8">
                  <ButtonLink href={SEND_REQUEST_HREF}>
                    Anfrage an Evipace senden →
                  </ButtonLink>
                </div>
              </div>
            </section>
          </div>
        </article>
      </main>
    </div>
  );
}
