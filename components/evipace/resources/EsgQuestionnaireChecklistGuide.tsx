import type { ReactNode } from "react";
import {
  AlertTriangle,
  ClipboardCheck,
  ExternalLink,
  ShieldAlert
} from "lucide-react";
import Link from "next/link";
import {
  Faq
} from "../service-landing/Blocks";
import { EsgQuestionnaireChecklist } from "./EsgQuestionnaireChecklist";
import {
  GuideBody,
  GuideCta,
  GuideQuickAnswer,
  GuideSources,
  PillLink,
  ResourceHero,
  ResourceMain,
  TextLink,
  ToolSection
} from "./ResourceParts";
import r from "./Resource.module.css";

const SEND_REQUEST_HREF = "/de/send-request";

const ECOVADIS_DOCUMENTS_URL =
  "https://support.ecovadis.com/hc/en-us/articles/210460307-Understanding-supporting-documents";
const ECOVADIS_LIMIT_URL =
  "https://support.ecovadis.com/hc/en-us/articles/115002646148-Why-is-there-a-limit-to-the-number-of-documents-that-can-be-provided";
const INTEGRITYNEXT_HELP_URL = "https://helpdesk.integritynext.com/hc/de";
const INTEGRITYNEXT_ASSESSMENT_URL =
  "https://helpdesk.integritynext.com/hc/de/articles/360018443680-Wie-beantworte-ich-das-Assessment";
const EFRAG_STANDARD_URL =
  "https://knowledgehub.efrag.org/eng/interactive/voluntary-standard";
const GHG_PROTOCOL_URL = "https://ghgprotocol.org/corporate-standard";

const redFlags = [
  "Ja-Antwort ohne bekannte Grundlage",
  "Policy wurde erst jetzt erstellt, aber als historischer Nachweis verwendet",
  "Zertifikat gehört zu einer anderen Gesellschaft oder einem anderen Standort",
  "Scope-1- oder Scope-2-Zahl ohne Faktorquelle",
  "Mitarbeiterzahl ohne Headcount- oder FTE-Definition",
  "Null Compliance-Vorfälle ohne interne Bestätigung",
  "Unterschiedliche Stromzahlen ohne Reconciliation",
  "Group Data und Entity Data vermischt",
  "Nicht anwendbar nur verwendet, weil Information fehlt",
  "Fremde Vorlage als bestehende Unternehmenspraxis dargestellt",
  "Altes Dokument hochgeladen, ohne Gültigkeit zu prüfen",
  "Plattformregeln aus dem Vorjahr ungeprüft übernommen",
  "Finale Antwort noch nicht von der Unternehmensseite bestätigt"
];

const faqItems = [
  {
    question:
      "Was sollte ich als Erstes tun, wenn ein Kunde einen ESG-Fragebogen schickt?",
    answer:
      "Nicht sofort Feld für Feld antworten. Zuerst sollten Kunde, Deadline, Gesellschaft, Standorte, Berichtszeitraum und Format geklärt und anschließend die Fragen nach Themen und internen Verantwortlichen sortiert werden."
  },
  {
    question: "Wer sollte den Fragebogen ausfüllen?",
    answer:
      "Eine Person kann den Prozess koordinieren. Die zugrunde liegenden Informationen sollten jedoch von den jeweiligen internen Fachbereichen kommen – beispielsweise Finance, HR, Qualität, Facility, Einkauf, Operations oder Compliance."
  },
  {
    question: "Brauche ich für jede Antwort einen Nachweis?",
    answer:
      "Nicht jede Kundenfrage funktioniert gleich. Bei wesentlichen Aussagen sollte aber geprüft werden, welche interne Quelle die Antwort trägt und ob ein Dokument oder anderer Nachweis verlangt beziehungsweise sinnvoll ist. Bei EcoVadis können Antworten nur dann entsprechend berücksichtigt werden, wenn geeignete Supporting Documents sie stützen."
  },
  {
    question: "Was mache ich, wenn eine Policy fehlt?",
    answer:
      "Zuerst prüfen, ob die zugrunde liegende Unternehmenspraxis tatsächlich existiert. Existiert sie, kann eine Policy vorbereitet, intern geprüft und autorisiert verabschiedet werden. Ein neuer Entwurf sollte aber nicht als bereits historisch bestehende Unternehmensrichtlinie dargestellt werden."
  },
  {
    question: "Was mache ich, wenn Daten fehlen?",
    answer:
      "Unterscheiden Sie zwischen noch nicht beschafft, zu berechnen, zu bestätigen, Dokumentations-Gap, realem Gap und nicht anwendbar. Diese Situationen brauchen unterschiedliche Lösungen."
  },
  {
    question: "Kann ich alte Antworten aus einem früheren Fragebogen wiederverwenden?",
    answer:
      "Ja, aber nicht ungeprüft. Gesellschaft, Standort, Berichtszeitraum, Definition, Quelle, Dokumentversion und aktuelle Kundenfrage müssen weiterhin passen. Der Leitfaden zur wiederverwendbaren ESG-Datengrundlage zeigt, wie Daten und Nachweise für spätere Anfragen strukturiert werden können."
  },
  {
    question: "Kann ich dieselben Nachweise für mehrere Kunden verwenden?",
    answer:
      "Die zugrunde liegende Unternehmensquelle häufig ja. Ob das konkrete Dokument in einer bestimmten Plattform oder Anfrage akzeptiert wird, hängt aber vom jeweiligen Assessment und dessen Regeln ab."
  },
  {
    question: "Was soll ich nach der Einreichung speichern?",
    answer:
      "Die finale Antwort, verwendete Daten, Quellen, Evidence Map, Data Owner, Berechnungen, Faktorversionen, Policy-Versionen und offene Gaps. Dadurch kann die nächste Kundenanfrage deutlich schneller bearbeitet werden."
  },
  {
    question: "Garantiert die Checkliste, dass mein Kunde die Antworten akzeptiert?",
    answer:
      "Nein. Sie dient als interne Vorbereitungs- und Quality-Control-Struktur. Die konkrete Akzeptanz hängt vom Kunden, der Plattform und den jeweiligen Anforderungen ab."
  }
];

function ExternalSourceLink({
  children,
  href
}: {
  children: ReactNode;
  href: string;
}) {
  return (
    <a
      className="inline-flex items-center gap-1.5 font-semibold text-ink underline decoration-[rgba(254,112,1,0.45)] underline-offset-4 transition hover:text-orange"
      href={href}
      rel="noreferrer"
      target="_blank"
    >
      {children}
      <ExternalLink aria-hidden="true" className="h-3.5 w-3.5 shrink-0" />
    </a>
  );
}

export function EsgQuestionnaireChecklistGuide() {
  return (
    <div className="esg-checklist-page">

      <ResourceMain locale="de">
        <article>
          <ResourceHero current="ESG-Fragebogen Checkliste" eyebrow="ESG-Fragebogen · Checkliste für Lieferanten" locale="de" title={<>ESG-Fragebogen Checkliste für Lieferanten</>} titleId="guide-title">
            <div className={`${r.heroRest} ${r.skin}`}><div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(19rem,0.58fr)] lg:items-start lg:gap-16">
                <div className="type-lead">
                  <p>
                    Ihr Kunde hat einen ESG- oder Nachhaltigkeitsfragebogen
                    geschickt. Bevor Sie Antworten Feld für Feld eintragen,
                    sollten Scope, Daten, Belegbarkeit und der finale Review
                    geklärt sein.
                  </p>
                  <p className="mt-6">
                    Diese Checkliste können Sie direkt beim Bearbeiten der
                    Kundenanfrage verwenden – über eine halbe Stunde, mehrere
                    Stunden oder mehrere Arbeitssitzungen hinweg.
                  </p>
                </div>
                <aside className="rounded-[1.2rem] border border-[rgba(254,112,1,0.24)] bg-[rgba(255,255,255,0.78)] p-6 shadow-[0_24px_70px_rgba(21,21,21,0.07)] backdrop-blur-sm sm:p-7">
                  <ClipboardCheck aria-hidden="true" className="h-8 w-8 text-orange" />
                  <p className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-orange">
                    Arbeitsablauf
                  </p>
                  <p className="font-display mt-4 text-[1.72rem] leading-tight text-ink">
                    Anfrage → Scope → Verantwortliche → Daten → Nachweise →
                    Berechnungen → Review → Einreichung → Wiederverwendung
                  </p>
                </aside>
              </div>

              <div className="mt-12 grid gap-3 border-t border-[rgba(21,21,21,0.12)] pt-7 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  "Sie wissen, für wen Sie antworten.",
                  "Sie haben die richtigen Daten.",
                  "Ihre Aussagen sind belegbar.",
                  "Jemand prüft die finale Antwort als Ganzes."
                ].map((item, index) => (
                  <div className="flex gap-3" key={item}>
                    <span className="font-mono text-xs font-bold text-orange">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="text-sm font-semibold leading-6 text-ink">
                      {item}
                    </p>
                  </div>
                ))}
              </div></div>
          </ResourceHero>

          <GuideQuickAnswer eyebrow="Direkt loslegen" title={<>Kein ESG-Grundkurs. Ein konkreter Arbeitsprozess.</>}>
<div className="site-shell grid gap-8 lg:gap-16">
              
              <div className="max-w-3xl text-lg leading-8 text-white/68">
                <p>
                  Arbeiten Sie nicht linear, wenn Ihre internen Quellen in
                  anderer Reihenfolge eintreffen. Die Checkliste sperrt keine
                  Abschnitte. Jeder Punkt lässt sich unabhängig bearbeiten.
                </p>
                <p className="mt-5">
                  Wenn die Anfrage gerade erst eingegangen ist, hilft zunächst
                  der Überblick{" "}
                  <Link
                    className="font-bold text-white underline decoration-orange/60 underline-offset-4 hover:text-orange"
                    href="/de/ressourcen/welche-esg-daten-kunden-lieferanten"
                  >
                    welche ESG-Daten Kunden von Lieferanten verlangen
                  </Link>
                  . Danach ordnet der Leitfaden{" "}
                  <Link
                    className="font-bold text-white underline decoration-orange/60 underline-offset-4 hover:text-orange"
                    href="/de/ressourcen/esg-fragebogen-vom-kunden-erhalten"
                  >
                    ESG-Fragebogen vom Kunden erhalten
                  </Link>
                  . Danach können Sie hier praktisch weiterarbeiten.
                </p>
                <p className="mt-5">
                  Wenn eine Umweltrichtlinie fehlt oder nur als Entwurf
                  vorliegt, hilft der Leitfaden{" "}
                  <Link
                    className="font-bold text-white underline decoration-orange/60 underline-offset-4 hover:text-orange"
                    href="/de/ressourcen/environmental-policy-erstellen"
                  >
                    Environmental Policy erstellen
                  </Link>
                  , damit Praxis, Scope, Freigabe und Nachweise nicht
                  verwechselt werden.
                </p>
                <p className="mt-5">
                  Geht es um Lieferantenanforderungen, hilft der Leitfaden{" "}
                  <Link
                    className="font-bold text-white underline decoration-orange/60 underline-offset-4 hover:text-orange"
                    href="/de/ressourcen/supplier-code-of-conduct-erstellen"
                  >
                    Supplier Code of Conduct erstellen
                  </Link>
                  , damit Code, Kommunikation, Bestätigung und vertraglicher
                  Status getrennt bleiben.
                </p>
                <p className="mt-5">
                  Nach der Bearbeitung hilft der Leitfaden zur{" "}
                  <Link
                    className="font-bold text-white underline decoration-orange/60 underline-offset-4 hover:text-orange"
                    href="/de/ressourcen/esg-daten-einmal-sammeln-mehrfach-nutzen"
                  >
                    wiederverwendbaren ESG-Datengrundlage
                  </Link>
                  , damit Daten, Quellen und Nachweise nicht bei jeder Anfrage
                  neu zusammengesucht werden.
                </p>
              </div>
            </div>
          </GuideQuickAnswer>

          <ToolSection>
            <EsgQuestionnaireChecklist />
          </ToolSection>

          <GuideBody>
          <div className={r.skin}>

            <section
              aria-labelledby="red-flags-title"
              className="checklist-red-flags mt-10 scroll-mt-28 overflow-hidden rounded-[1.3rem] border border-[rgba(254,112,1,0.35)] bg-[#fff4ea] p-6 sm:mt-12 sm:p-9 lg:p-11"
              id="red-flags"
            >
              <div className="flex items-start gap-4">
                <ShieldAlert
                  aria-hidden="true"
                  className="mt-1 h-8 w-8 shrink-0 text-orange"
                />
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#a84800]">
                    Red Flags
                  </p>
                  <h2
                    className="type-heading font-display mt-4 max-w-[24ch] text-ink"
                    id="red-flags-title"
                  >
                    Stop – vor der Einreichung noch einmal prüfen
                  </h2>
                  <p className="mt-5 max-w-2xl leading-7 text-muted">
                    Diese Warnungen zählen bewusst nicht zum Erfolgsfortschritt.
                    Wenn einer dieser Fälle vorliegt, sollte er vor der
                    Einreichung geklärt werden.
                  </p>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
                    Wenn Sie nicht den ganzen Fragebogen, sondern einen einzelnen
                    Nachweis prüfen möchten, nutzen Sie den{" "}
                    <Link
                      className="font-bold text-ink underline decoration-orange/60 underline-offset-4 hover:text-orange"
                      href="/de/ressourcen/esg-nachweise-checkliste"
                    >
                      ESG Evidence Readiness Check
                    </Link>
                    .
                  </p>
                </div>
              </div>
              <ul className="mt-8 grid gap-x-8 gap-y-0 sm:grid-cols-2">
                {redFlags.map((flag) => (
                  <li
                    className="flex gap-3 border-t border-[rgba(168,72,0,0.18)] py-4 text-sm font-semibold leading-6 text-ink"
                    key={flag}
                  >
                    <AlertTriangle
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 shrink-0 text-[#a84800]"
                    />
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            </section>

          </div>
            <GuideCta
              actions={<><PillLink href={SEND_REQUEST_HREF}>ESG-Fragebogen senden</PillLink><TextLink href="/de/esg-fragebogen-lieferanten">ESG-Fragebogen für Lieferanten</TextLink><TextLink href="/de/ressourcen/esg-fragebogen-vom-kunden-erhalten">ESG-Fragebogen erhalten – was jetzt?</TextLink></>}
              eyebrow="Ihr nächster Schritt"
              note={<><p>Fragebogen · Daten · Nachweise · Berechnungen · Review</p></>}
              title={<>Der Fragebogen ist länger als die Checkliste?</>}
            >
              <p>Senden Sie uns die ursprüngliche Kundenanfrage.</p>
                <p>
                  Wir zerlegen den Fragebogen in konkrete Datenpunkte, ordnen
                  interne Quellen und Verantwortliche zu, bereiten notwendige
                  Berechnungen vor, strukturieren Nachweise und machen Gaps
                  sichtbar.
                </p>
            </GuideCta>

            </GuideBody>

          <Faq eyebrow="FAQ" items={faqItems} title="Häufige Fragen zur ESG-Fragebogen-Checkliste" />

          <GuideBody>

            <GuideSources note={<>
                Evipace ist unabhängig von EcoVadis und IntegrityNext und weder
                offizieller Partner noch Validierungsstelle dieser Plattformen.
              </>} title="Quellen &amp; weiterführende Informationen">
              <ul>
                <li>
                  <ExternalSourceLink href={ECOVADIS_DOCUMENTS_URL}>
                    EcoVadis — Understanding supporting documents
                  </ExternalSourceLink>
                  <p className="mt-1">
                    Offizielle Anforderungen an Relevanz, Aktualität, Scope und
                    Belegfunktion von Supporting Documents.
                  </p>
                </li>
                <li>
                  <ExternalSourceLink href={ECOVADIS_LIMIT_URL}>
                    EcoVadis — Dokumentenlimit
                  </ExternalSourceLink>
                  <p className="mt-1">
                    Aktuelles Limit von 55 Dokumenten pro Assessment und Regeln
                    zu absichtlich kombinierten Dokumenten.
                  </p>
                </li>
                <li>
                  <ExternalSourceLink href={INTEGRITYNEXT_HELP_URL}>
                    IntegrityNext — Supplier Help Center
                  </ExternalSourceLink>
                  <p className="mt-1">
                    Aktuelle Informationen zu Supplier Profile, Assessments und
                    Aktualisierungen.
                  </p>
                </li>
                <li>
                  <ExternalSourceLink href={INTEGRITYNEXT_ASSESSMENT_URL}>
                    IntegrityNext — Assessment beantworten
                  </ExternalSourceLink>
                  <p className="mt-1">
                    Offizielle Beschreibung der Zertifikats- oder
                    Fragebogenlogik.
                  </p>
                </li>
                <li>
                  <ExternalSourceLink href={EFRAG_STANDARD_URL}>
                    EFRAG — 2026 Voluntary Standard
                  </ExternalSourceLink>
                  <p className="mt-1">
                    Offizielle Struktur relevanter Umwelt-, Social- und
                    Governance-Datenpunkte.
                  </p>
                </li>
                <li>
                  <ExternalSourceLink href={GHG_PROTOCOL_URL}>
                    GHG Protocol — Corporate Standard
                  </ExternalSourceLink>
                  <p className="mt-1">
                    Grundlage für Corporate-GHG-Inventare und die Einordnung
                    von Scope 1 und Scope 2.
                  </p>
                </li>
              </ul>
            </GuideSources>
          </GuideBody>
        </article>
      </ResourceMain>
    </div>
  );
}
