import type { ReactNode } from "react";
import {
  ArrowRight,
  FileCheck2,
  FolderTree
} from "lucide-react";
import Link from "next/link";
import { ClosingCta } from "../home/ClosingCta";
import { EsgEvidenceReadinessTool } from "./EsgEvidenceReadinessTool";
import {
  GuideBlock,
  GuideBody,
  GuideCta,
  GuideQuickAnswer,
  GuideSection as ArticleSection,
  PillLink,
  QualifierBox,
  ResourceHero,
  ResourceMain,
  TextLink,
  ToolSection
} from "./ResourceParts";

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
      <ResourceMain locale="de">
        <article>
          <ResourceHero
            actions={<>
              <PillLink href="#nachweis-pruefen">Nachweis jetzt prüfen ↓</PillLink>
              <TextLink href="/de/ressourcen">Alle Ressourcen</TextLink>
            </>}
            current="ESG-Nachweise-Checkliste"
            eyebrow="ESG EVIDENCE READINESS CHECK"
            locale="de"
            title="Ist dieser ESG-Nachweis wirklich verwendbar?"
            titleId="guide-title"
          >
            <p>
              Ein Dokument zu haben, bedeutet noch nicht automatisch,
              dass es eine ESG-Aussage belastbar unterstützt. Prüfen Sie
              einen Nachweis in wenigen Minuten auf Aussagebezug,
              Gesellschaft, Scope, Zeitraum, Quelle, Freigabe und
              Nachvollziehbarkeit.
            </p>
            <p className="evidence-screen-only">
              Keine Registrierung. Keine Dokumente werden hochgeladen.
              Die Prüfung erfolgt ausschließlich in Ihrem Browser.
            </p>
            <div className="evidence-screen-only">
              <QualifierBox label="Evidence Chain" title="Aussage → Gesellschaft → Scope → Zeitraum → Quelle → Gültigkeit → Freigabe" />
            </div>
          </ResourceHero>

          <GuideQuickAnswer eyebrow="Abgrenzung" title={<>Ein Nachweis. Nicht der ganze Fragebogen.</>}>
<div className="site-shell grid gap-8 lg:gap-16">
              
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
          </GuideQuickAnswer>

          <ToolSection>
            <EsgEvidenceReadinessTool />
          </ToolSection>

          <div className="evidence-editorial-content">
          <GuideBody>
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

            <ArticleSection id="typische-esg-nachweise" title="Typische ESG-Nachweise in produzierenden Unternehmen">
              <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {typicalEvidenceCards.map((card) => (
                  <article
                    className="rounded-[1rem] border border-[rgba(21,21,21,0.12)] bg-white p-5"
                    key={card.title}
                  >
                    <h3 className="type-subheading font-display text-ink">
                      {card.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-muted">
                      {card.copy}
                    </p>
                  </article>
                ))}
              </div>
            </ArticleSection>

            <GuideBlock>
            <div className="grid gap-5 md:grid-cols-2">
              <article className="rounded-[1.1rem] border border-[rgba(21,21,21,0.12)] bg-white p-6 sm:p-7">
                <FolderTree aria-hidden="true" className="h-8 w-8 text-orange" />
                <h2 className="type-heading font-display mt-5 text-ink">
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
                <h2 className="type-heading font-display mt-5 text-ink">
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
            </div>
            </GuideBlock>

            <GuideCta
              actions={<>
                <PillLink href={SEND_REQUEST_HREF}>ESG-Anfrage senden</PillLink>
                <TextLink href="/de/esg-fragebogen-lieferanten">Mehr über ESG-Fragebögen für Lieferanten</TextLink>
              </>}
              note={<p>Sie behalten die Kontrolle über Unternehmensangaben und die finale Einreichung.</p>}
              title={<>Sie haben die Unterlagen – aber noch keine klare Evidence-Struktur?</>}
            >
              <p>
                Senden Sie uns die ESG-Anfrage Ihres Kunden. Wir ordnen
                Anforderungen, vorhandene Unternehmensdaten und Nachweise,
                identifizieren offene Punkte und bereiten die Antworten für
                Ihre interne Bestätigung vor.
              </p>
            </GuideCta>

            <ArticleSection id="methodik" title="Praktische Prüfung statt pauschaler Bewertung.">
              <p>
                Wie Evipace mit Quellen, Annahmen, Review und
                Aussagegrenzen arbeitet, beschreibt unsere Methodik.
              </p>
              <p><TextLink href="/de/methodology">Zur Evipace Methodik</TextLink></p>
            </ArticleSection>
          </GuideBody>
          </div>
        </article>
        <ClosingCta
          body={<p>Wir helfen produzierenden Unternehmen dabei, vorhandene ESG-Daten und Nachweise in eine klare, nachvollziehbare Kundenantwort zu überführen.</p>}
          formHref={SEND_REQUEST_HREF}
          formLabel="Anfrage an Evipace senden"
          forwardLabel="Anfrage weiterleiten"
          slogan="ESG work. Done right. Done faster."
          title="Aus Dokumenten werden belastbare Antworten."
        />

      </ResourceMain>
    </div>
  );
}
