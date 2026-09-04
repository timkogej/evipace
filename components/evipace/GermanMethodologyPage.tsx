import type { ReactNode } from "react";
import {
  CheckCircle2,
  FileText,
  MinusCircle,
  Scale,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "./ButtonLink";
import { InView } from "./home-sections/InView";
import { LastReviewed } from "./trust/LastReviewed";
import { primarySources } from "@/lib/seo/primary-sources";
import { SourceNote } from "./trust/SourceNote";

const SEND_REQUEST_HREF = "/de/send-request";

const sourceExamples = [
  "eine Stromrechnung",
  "eine Verbrauchsübersicht",
  "ein ISO-Zertifikat",
  "eine bestehende Richtlinie",
  "ein HR-Datensatz",
  "ein Wartungsprotokoll",
  "eine frühere Berechnung",
  "oder eine Information, die von einer verantwortlichen Person im Unternehmen bestätigt wird"
];

const projectSteps = [
  {
    number: "01",
    title: "Aufgabe verstehen",
    body: "Zuerst klären wir, welches Ergebnis tatsächlich benötigt wird.",
    items: [
      "eine Kundenanfrage beantworten",
      "einen ESG-Fragebogen vorbereiten",
      "ein EcoVadis-Assessment strukturieren",
      "IntegrityNext-Angaben vorbereiten",
      "Scope 1 und Scope 2 berechnen",
      "relevante Scope-3-Emissionen untersuchen",
      "einen freiwilligen Nachhaltigkeitsbericht erstellen",
      "Richtlinien oder unterstützende Dokumentation vorbereiten"
    ],
    closing:
      "Wir orientieren die Arbeit an der konkreten Aufgabe – nicht an einem pauschalen ESG-Paket."
  },
  {
    number: "02",
    title: "Quellen und Unternehmensinformationen zusammentragen",
    body: "Sie stellen die vorhandenen Informationen bereit.",
    items: [
      "Rechnungen",
      "Verbrauchsdaten",
      "Excel-Dateien",
      "Zertifikate",
      "Richtlinien",
      "Personalinformationen",
      "Produktionsdaten",
      "Wartungsunterlagen",
      "frühere Berichte",
      "bestehende Berechnungen",
      "Kundenanforderungen",
      "Screenshots oder Plattforminformationen"
    ]
  },
  {
    number: "03",
    title: "Informationen strukturieren",
    body: "Wir ordnen die vorhandenen Informationen den relevanten Anforderungen zu.",
    items: [
      "was bereits vorhanden ist",
      "welche Quelle welche Aussage unterstützt",
      "welche Daten berechnet werden müssen",
      "welche Informationen noch bestätigt werden müssen",
      "und wo echte Lücken bestehen"
    ]
  },
  {
    number: "04",
    title: "Inhalt vorbereiten",
    body: "Je nach Auftrag entstehen daraus beispielsweise:",
    items: [
      "Antwortentwürfe",
      "Kennzahlen",
      "Emissionsberechnungen",
      "Evidence Mapping",
      "Berichtsinhalte",
      "Richtlinienentwürfe",
      "Datenübersichten",
      "Gap-Listen"
    ]
  },
  {
    number: "05",
    title: "Menschlich prüfen",
    body: "Vor der Rückgabe wird der vorbereitete Output geprüft.",
    closing:
      "Dabei betrachten wir insbesondere Plausibilität, Konsistenz, Nachvollziehbarkeit sowie auffällige oder unklare Angaben. Digitale Werkzeuge können die Vorbereitung unterstützen. Sie ersetzen diesen Prüfschritt nicht."
  },
  {
    number: "06",
    title: "Unternehmensangaben bestätigen",
    body: "Bestimmte Aussagen können nur das Unternehmen selbst verbindlich bestätigen.",
    closing:
      "Das betrifft insbesondere tatsächliche Unternehmenspraktiken, interne Verantwortlichkeiten, formale Richtlinien, strategische Aussagen oder Informationen, für die eine Freigabe erforderlich ist. Evipace bereitet vor. Das Unternehmen bestätigt, was nur das Unternehmen selbst bestätigen kann."
  }
];

const traceabilityItems = [
  "zugrunde liegende Datenquelle",
  "Berichts- oder Verbrauchszeitraum",
  "verwendete Einheit",
  "Berechnungsweg",
  "Emissionsfaktor und dessen Quelle",
  "relevante Faktorversion oder Referenz",
  "Annahmen",
  "Abgrenzungen",
  "verwendete Nachweise",
  "offene Datenlücken"
];

const scopeOneExamples = [
  "Erdgas",
  "Heizöl",
  "andere Brennstoffe",
  "eigener Fuhrpark",
  "bestimmte betriebliche Maschinen",
  "Prozessemissionen",
  "Kältemittelverluste"
];

const scopeOneChecks = [
  "Zeitraum",
  "Einheit",
  "Quelle",
  "organisatorische Abgrenzung",
  "verwendeten Faktor",
  "relevante Umrechnungen"
];

const scopeTwoExamples = [
  "Strom",
  "Fernwärme",
  "Fernkälte",
  "extern erzeugter Dampf",
  "weitere relevante eingekaufte Energieformen"
];

const scopeThreeExamples = [
  "eingekaufte Waren und Dienstleistungen",
  "Kapitalgüter",
  "vorgelagerte Energieemissionen",
  "Transport und Distribution",
  "Abfall",
  "Geschäftsreisen",
  "Pendelverkehr",
  "gemietete Vermögenswerte",
  "Nutzung oder Entsorgung verkaufter Produkte",
  "weitere relevante Wertschöpfungskettenkategorien"
];

const scopeThreeDataTypes = [
  "Primärdaten",
  "lieferantenspezifischen Daten",
  "Aktivitätsdaten",
  "Sekundärdaten",
  "Ausgaben-basierten Ansätzen",
  "Proxies",
  "und Schätzungen"
];

const factorSelectionItems = [
  "Art der Emissionsquelle",
  "geografischen Bezug",
  "Berichtsjahr",
  "verwendete Aktivitätseinheit",
  "methodischen Zweck",
  "Verfügbarkeit spezifischerer Daten",
  "Aktualität der Quelle"
];

const estimateRules = [
  {
    title: "Wenn belastbare Primärdaten vorhanden sind",
    body: "verwenden wir diese soweit sinnvoll und passend."
  },
  {
    title: "Wenn eine nachvollziehbare Schätzung erforderlich ist",
    body: "wird sie als solche behandelt und die verwendete Grundlage dokumentiert."
  },
  {
    title: "Wenn ein Proxy verwendet wird",
    body: "soll sichtbar bleiben, warum er verwendet wurde und welche Einschränkungen damit verbunden sind."
  },
  {
    title: "Wenn eine Information nicht belastbar bestimmt werden kann",
    body: "bleibt sie als offene Lücke bestehen."
  }
];

const platformSupportItems = [
  "Interpretation der konkreten Anforderung",
  "Strukturierung der benötigten Daten",
  "Zuordnung vorhandener Dokumente",
  "Vorbereitung von Antwortentwürfen",
  "Identifikation fehlender Informationen",
  "Kennzeichnung offener interner Bestätigungen"
];

const evidenceChecks = [
  "worauf es sich bezieht",
  "welche Aussage es tatsächlich stützen kann",
  "für welches Unternehmen beziehungsweise welchen Standort es gilt",
  "welchen Zeitraum es abdeckt",
  "ob es aktuell ist",
  "und ob zusätzliche Informationen notwendig sind"
];

const technologySupportItems = [
  "Dokumentenstrukturierung",
  "Extraktion relevanter Informationen",
  "Klassifizierung",
  "Vergleich von Anforderungen",
  "Vorbereitung von Berechnungen",
  "Erstellung erster Text- oder Strukturentwürfe"
];

const technologyDoesNotDecide = [
  "ob ein Nachweis ausreichend ist",
  "ob eine Unternehmenspraxis existiert",
  "ob eine Richtlinie gültig ist",
  "ob eine Annahme sachlich angemessen ist",
  "oder ob eine finale Unternehmensangabe freigegeben werden kann"
];

const evipaceResponsibilities = [
  "die strukturierte Vorbereitung des vereinbarten ESG-Auftrags",
  "die Organisation der bereitgestellten Informationen",
  "die Aufbereitung von Berechnungen und Antwortentwürfen",
  "die Dokumentation relevanter Methoden und Quellen",
  "die Identifikation von Daten- und Nachweislücken",
  "die menschliche Prüfung der vorbereiteten Deliverables"
];

const clientResponsibilities = [
  "die Richtigkeit der bereitgestellten Ausgangsdaten",
  "die Vollständigkeit der Informationen, die dem Unternehmen bekannt sind",
  "die Bestätigung unternehmensspezifischer Tatsachen",
  "interne Entscheidungen",
  "die formale Annahme von Richtlinien",
  "erforderliche Freigaben",
  "und die finale Bestätigung von Angaben, die nur das Unternehmen selbst verbindlich machen kann"
];

const methodologyReferences = [
  "GHG Protocol",
  "geeignete öffentliche oder fachlich belastbare Emissionsfaktorquellen",
  "VSME beziehungsweise der aktuelle europäische Voluntary Standard",
  "konkrete Kundenanforderungen",
  "EcoVadis-Anforderungen",
  "IntegrityNext-Anforderungen",
  "weitere projektspezifische Berichts- oder Datenanforderungen"
];

const standardsStates = [
  "aktuell anwendbaren Anforderungen",
  "veröffentlichten methodischen Leitlinien",
  "verabschiedeten, aber noch nicht wirksamen Änderungen",
  "und Entwicklungen, die sich noch im Entwurfs- oder Überarbeitungsprozess befinden"
];

const vsmeQuestions = [
  "welcher Berichtsumfang sinnvoll ist",
  "welche Angaben benötigt werden",
  "welche Unternehmensdaten bereits vorhanden sind",
  "welche Kennzahlen berechnet werden müssen",
  "und welche Informationen noch bestätigt oder aufgebaut werden müssen"
];

const deliverables = [
  "vorbereitete Antwort oder Bericht",
  "strukturierte ESG-Daten",
  "Evidence Mapping",
  "Berechnungsgrundlage",
  "Scope-1-, Scope-2- oder vereinbarte Scope-3-Auswertungen",
  "verwendete Emissionsfaktor-Referenzen",
  "dokumentierte Annahmen",
  "offene Punkte und Datenlücken",
  "Richtlinien- oder Dokumententwürfe",
  "review-ready Unterlagen für die interne Freigabe"
];

const limitations = [
  "vergibt keine ESG-Zertifizierungen",
  "führt keine gesetzliche Abschlussprüfung durch",
  "bietet keine unabhängige Assurance oder Verifizierung, sofern dies nicht ausdrücklich separat durch eine entsprechend qualifizierte externe Stelle erfolgt",
  "bietet keine Rechtsberatung",
  "garantiert keine bestimmte regulatorische Bewertung",
  "garantiert keine bestimmte EcoVadis-Punktzahl oder Medaille",
  "garantiert keinen bestimmten IntegrityNext-Status",
  "garantiert nicht, dass ein Kunde, eine Bank, eine Plattform oder eine andere externe Stelle einen bestimmten Output akzeptiert",
  "und stellt fehlende Unternehmenspraktiken oder Nachweise nicht als bestehend dar"
];

type GermanMethodologyPageProps = {
  lastReviewed?: string;
};

/**
 * One-time settle, built on the shared InView wrapper.
 *
 * The markup ships in its final, visible state; InView only adds
 * `data-evi-reveal` once the block is on screen, and the CSS hides anything
 * only while that attribute says "pending". A reader without JavaScript — or
 * one who asked for reduced motion — gets the finished page. Stagger is a
 * fixed CSS delay class rather than an inline style, so the shared wrapper
 * needs no new prop and stays a plain server-rendered boundary.
 */
function Rise({
  children,
  className = "",
  delay = 0
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const step = Math.min(5, Math.round((delay * 1000) / 40));
  const stepClass = step > 0 ? ` methodology-rise--d${step}` : "";
  return (
    <InView className={`methodology-rise${stepClass} ${className}`.trim()}>
      {children}
    </InView>
  );
}

function GermanReviewedLine({ date }: { date?: string }) {
  if (!date) {
    return null;
  }

  return (
    <section className="section-padding py-8 sm:py-10">
      <div className="site-shell">
        <Rise className="max-w-3xl border-t border-[rgba(21,21,21,0.12)] pt-6">
          <LastReviewed date={date} locale="de" />
          <p className="methodology-prose mt-3 text-sm leading-7 text-muted">
            Dieser Zeitpunkt bezeichnet die letzte inhaltliche Prüfung dieser
            Methodik – nicht das Datum eines Website-Deployments.
          </p>
        </Rise>
      </div>
    </section>
  );
}

function Section({
  eyebrow,
  heading,
  children,
  id,
  tone = "light"
}: {
  eyebrow?: string;
  heading: string;
  children: ReactNode;
  id?: string;
  tone?: "light" | "warm" | "paper" | "dark";
}) {
  const classes = {
    light: "bg-white text-ink",
    warm: "bg-[var(--warm)] text-ink",
    paper: "bg-[var(--paper)] text-ink",
    dark: "bg-dark text-white"
  };

  return (
    <section className={`methodology-section ${classes[tone]}`} id={id}>
      <div className="site-shell">
        <Rise className="max-w-4xl">
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h2
            className={`methodology-h2 font-display mt-5 ${
              tone === "dark" ? "text-white" : "text-ink"
            }`}
          >
            {heading}
          </h2>
        </Rise>
        <div className="mt-9 sm:mt-11">{children}</div>
      </div>
    </section>
  );
}

function CheckList({
  items,
  dark = false
}: {
  items: string[];
  dark?: boolean;
}) {
  return (
    <ul className="grid gap-3">
      {items.map((item) => (
        <li
          className={`flex gap-3 leading-7 ${dark ? "text-white/72" : "text-muted"}`}
          key={item}
        >
          <CheckCircle2
            aria-hidden="true"
            className="mt-0.5 h-5 w-5 shrink-0 text-orange"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function GermanMethodologyPage({
  lastReviewed
}: GermanMethodologyPageProps) {
  return (
    <>
      <main className="methodology-page methodology--de">
        <section
          className="methodology-hero relative isolate overflow-hidden"
          id="top"
          aria-labelledby="methodology-title"
        >
          <div aria-hidden="true"
            className="methodology-ghost pointer-events-none absolute right-[5vw] top-24 hidden font-display text-[12rem] leading-none text-[rgba(21,21,21,0.035)] xl:block">
            METHODIK
          </div>
          <div className="site-shell">
            <Rise className="max-w-4xl">
              <p className="eyebrow">Methodik</p>
              <h1
                className="methodology-h1 font-display mt-5"
                id="methodology-title"
              >
                So wird aus Unternehmensdaten belastbare ESG-Arbeit.
              </h1>
              <div className="methodology-lead mt-6 space-y-4">
                <p>
                  Evipace beginnt nicht mit generischen Antworten oder fertigen
                  Textbausteinen. Wir beginnen mit den tatsächlichen Daten,
                  Dokumenten und Unternehmensinformationen, die für Ihre
                  konkrete ESG-Aufgabe relevant sind.
                </p>
                <p>
                  Daraus bereiten wir Fragebogenantworten,
                  Emissionsberechnungen, Nachhaltigkeitsberichte, Nachweise und
                  Dokumententwürfe strukturiert auf – mit nachvollziehbaren
                  Quellen, klar gekennzeichneten Annahmen und menschlicher
                  Prüfung.
                </p>
              </div>
              <p className="mt-7 text-sm font-semibold leading-7 text-[rgba(21,21,21,0.62)]">
                Quellen · Berechnungen · Nachweise · Prüfung · Transparenz
              </p>
            </Rise>
          </div>
        </section>

        <Section
          eyebrow="Grundprinzip"
          heading="Unser Grundprinzip: Quelle vor Aussage."
          id="grundprinzip"
          tone="warm"
        >
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <Rise className="methodology-body space-y-4 text-muted">
              <p>
                Eine ESG-Antwort ist nur so belastbar wie die Information
                dahinter.
              </p>
              <p>Deshalb beginnen wir nicht mit der Frage:</p>
              <p className="methodology-statement font-display text-ink">
                „Was sollte hier stehen?“
              </p>
              <p>Sondern mit:</p>
              <p className="methodology-statement font-display text-orange">
                „Was können wir auf Basis der tatsächlichen
                Unternehmensinformationen nachvollziehbar sagen?“
              </p>
              <p>
                Aus diesen Quellen entsteht die Arbeitsgrundlage. Materiale
                Zahlen und Aussagen sollen, soweit dies für den jeweiligen
                Auftrag relevant ist, auf eine nachvollziehbare Quelle,
                Berechnung oder bestätigte Unternehmensinformation zurückgeführt
                werden können.
              </p>
              <p className="border-l-2 border-orange pl-5 font-semibold text-ink">
                Wenn eine Information fehlt, behandeln wir sie als Lücke – nicht
                als Einladung, eine plausible Antwort zu erfinden.
              </p>
            </Rise>
            <Rise
              className="rounded-lg border border-[rgba(21,21,21,0.11)] bg-white p-6 shadow-lift sm:p-8"
              delay={0.08}
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--soft-orange)] text-orange">
                  <FileText aria-hidden="true" className="h-5 w-5" />
                </div>
                <p className="text-sm font-bold uppercase text-orange">
                  Quellenbeispiele
                </p>
              </div>
              <CheckList items={sourceExamples} />
            </Rise>
          </div>
        </Section>

        <Section
          eyebrow="Projektablauf"
          heading="So läuft ein Projekt bei Evipace ab."
          id="ablauf"
        >
          <Rise className="methodology-body space-y-4 text-muted">
            <p>Nicht jeder Auftrag sieht gleich aus.</p>
            <p>
              Ein EcoVadis-Assessment benötigt andere Arbeitsschritte als eine
              Scope-1-Berechnung. Ein VSME-Bericht ist anders aufgebaut als ein
              kundenspezifischer ESG-Fragebogen.
            </p>
            <p className="font-semibold text-ink">
              Das Grundprinzip bleibt jedoch gleich.
            </p>
          </Rise>
          <div className="mt-12 grid gap-5">
            {projectSteps.map((step, index) => (
              <Rise
                className="grid gap-6 rounded-lg border border-[rgba(21,21,21,0.11)] bg-[var(--paper)] p-6 sm:p-7 lg:grid-cols-[8rem_1fr]"
                delay={index * 0.04}
                key={step.title}
              >
                <p className="methodology-step-number font-display text-orange">
                  {step.number}
                </p>
                <div>
                  <h3 className="methodology-step-title font-bold text-ink">{step.title}</h3>
                  <p className="methodology-prose mt-3 leading-7 text-muted">{step.body}</p>
                  {step.items ? (
                    <div className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                      {step.items.map((item) => (
                        <p
                          className="border-t border-[rgba(21,21,21,0.1)] pt-3 text-sm font-semibold text-[rgba(21,21,21,0.66)]"
                          key={item}
                        >
                          {item}
                        </p>
                      ))}
                    </div>
                  ) : null}
                  {step.closing ? (
                    <p className="methodology-prose mt-5 leading-7 text-muted">{step.closing}</p>
                  ) : null}
                </div>
              </Rise>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="Nachvollziehbarkeit"
          heading="Nachvollziehbarkeit ist Teil des Ergebnisses."
          id="nachvollziehbarkeit"
          tone="paper"
        >
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <Rise className="methodology-body space-y-4 text-muted">
              <p>
                Wir möchten nicht nur wissen, welche Zahl am Ende in einer
                Tabelle steht.
              </p>
              <p>
                Wir möchten auch nachvollziehen können, wie sie entstanden ist.
              </p>
              <p>
                Nicht jeder einzelne Satz benötigt dieselbe Dokumentationstiefe.
                Bei wesentlichen Kennzahlen, Berechnungen und Aussagen sollte
                jedoch klar sein, worauf sie beruhen.
              </p>
              <p className="methodology-statement font-display text-orange">
                Das Ergebnis soll nicht nur fertig aussehen. Es soll nachvollziehbar sein.
              </p>
            </Rise>
            <Rise
              className="rounded-lg border border-[rgba(21,21,21,0.11)] bg-white p-6 sm:p-8"
              delay={0.08}
            >
              <p className="mb-6 text-sm font-bold uppercase text-orange">
                Je nach Auftrag dokumentieren wir
              </p>
              <CheckList items={traceabilityItems} />
            </Rise>
          </div>
        </Section>

        <Section
          eyebrow="Treibhausgasemissionen"
          heading="Wie wir Treibhausgasemissionen berechnen."
          id="emissionen"
        >
          <Rise className="methodology-body space-y-4 text-muted">
            <p>
              Treibhausgasberechnungen beginnen mit einer klaren Abgrenzung und
              belastbaren Aktivitätsdaten.
            </p>
            <p className="font-semibold text-ink">
              Nicht mit einer gewünschten Endzahl.
            </p>
            <p>
              Die zugrunde liegenden Bilanzierungskonzepte – organisatorische
              und operative Abgrenzung, die Trennung von Scope 1 und Scope 2
              sowie die location-based und market-based Betrachtung von
              eingekauftem Strom – folgen den Corporate-Standards des GHG
              Protocol.
            </p>
            <p>
              Das konkrete Angebot beschreiben wir auf der Seite zur{" "}
              <Link className="orange-link" href="/de/scope-1-2-berechnung">
                Scope-1- und Scope-2-Berechnung
              </Link>
              ; die Begriffe selbst erklären wir in{" "}
              <Link
                className="orange-link"
                href="/de/ressourcen/scope-1-2-3-einfach-erklaert"
              >
                Scope 1, 2 und 3 einfach erklärt
              </Link>
              .
            </p>
            <SourceNote
              locale="de"
              sources={[
                primarySources.ghgCorporateStandard,
                primarySources.ghgScope2Guidance
              ]}
            />
          </Rise>

          <div className="mt-12 grid gap-6">
            <Rise className="rounded-lg border border-[rgba(21,21,21,0.11)] bg-[var(--paper)] p-7 sm:p-9">
              <p className="eyebrow">Scope 1</p>
              <h3 className="methodology-h3 mt-5 font-bold text-ink">
                Direkte Emissionen aus eigenen oder kontrollierten Quellen.
              </h3>
              <p className="methodology-body mt-5 text-muted">
                Scope 1 umfasst direkte Treibhausgasemissionen aus relevanten
                Quellen, die dem Unternehmen gehören oder von ihm kontrolliert
                werden.
              </p>
              <div className="mt-7 grid gap-8 lg:grid-cols-2">
                <div>
                  <p className="mb-4 text-sm font-bold uppercase text-orange">
                    Beispiele
                  </p>
                  <CheckList items={scopeOneExamples} />
                </div>
                <div>
                  <p className="mb-4 text-sm font-bold uppercase text-orange">
                    Typischer Berechnungsweg
                  </p>
                  <p className="rounded-lg border border-[rgba(254,112,1,0.26)] bg-[var(--soft-orange)] px-5 py-4 font-semibold text-ink">
                    Aktivitätsdaten → geeigneter Emissionsfaktor → CO₂e
                  </p>
                  <div className="mt-5">
                    <CheckList items={scopeOneChecks} />
                  </div>
                </div>
              </div>
            </Rise>

            <Rise
              className="rounded-lg border border-[rgba(21,21,21,0.11)] bg-white p-7 sm:p-9"
              delay={0.05}
            >
              <p className="eyebrow">Scope 2</p>
              <h3 className="methodology-h3 mt-5 font-bold text-ink">
                Eingekaufte oder bezogene Energie.
              </h3>
              <p className="methodology-body mt-5 text-muted">
                Scope 2 betrifft Treibhausgasemissionen im Zusammenhang mit
                eingekaufter oder bezogener Energie.
              </p>
              <div className="mt-7 grid gap-8 lg:grid-cols-2">
                <CheckList items={scopeTwoExamples} />
                <p className="methodology-prose rounded-lg border border-[rgba(21,21,21,0.11)] bg-[var(--paper)] p-5 leading-8 text-muted">
                  Je nach Verwendungszweck kann eine location-based und
                  gegebenenfalls zusätzlich eine market-based Betrachtung
                  relevant sein. Welche Methode verwendet wird, richtet sich
                  nach dem konkreten Berichts- oder Kundenanforderungsfall.
                </p>
              </div>
            </Rise>

            <Rise
              className="rounded-lg border border-[rgba(21,21,21,0.11)] bg-[var(--paper)] p-7 sm:p-9"
              delay={0.1}
            >
              <p className="eyebrow">Scope 3</p>
              <h3 className="methodology-h3 mt-5 font-bold text-ink">
                Weitere indirekte Emissionen, wenn sie Teil des Auftrags sind.
              </h3>
              <p className="methodology-body mt-5 text-muted">
                Wenn Scope 3 Teil des vereinbarten Auftrags ist, betrachten wir
                relevante weitere indirekte Emissionen entlang der vor- und
                nachgelagerten Wertschöpfungskette.
              </p>
              <div className="mt-7 grid gap-8 lg:grid-cols-2">
                <div>
                  <p className="mb-4 text-sm font-bold uppercase text-orange">
                    Mögliche Kategorien
                  </p>
                  <CheckList items={scopeThreeExamples} />
                </div>
                <div>
                  <p className="mb-4 text-sm font-bold uppercase text-orange">
                    Datenqualität
                  </p>
                  <p className="methodology-prose mb-5 leading-8 text-muted">
                    Bei Scope 3 ist die Datenlage häufig heterogener als bei
                    Scope 1 und Scope 2. Deshalb ist besonders wichtig, zwischen
                    diesen Datentypen zu unterscheiden.
                  </p>
                  <CheckList items={scopeThreeDataTypes} />
                  <p className="methodology-prose mt-6 font-semibold leading-8 text-ink">
                    Je unsicherer eine Datengrundlage ist, desto wichtiger ist
                    es, diese Unsicherheit sichtbar zu machen.
                  </p>
                </div>
              </div>
            </Rise>
          </div>
        </Section>

        <Section
          eyebrow="Emissionsfaktoren"
          heading="Emissionsfaktoren werden nicht blind aus einer Tabelle übernommen."
          id="emissionsfaktoren"
          tone="warm"
        >
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <Rise className="methodology-body space-y-4 text-muted">
              <p>
                Ein Emissionsfaktor ist kein universeller Wert, der unabhängig
                von Zeitraum, Region oder Datenquelle immer gleich verwendet
                werden kann.
              </p>
              <p>
                Je nach Auftrag können geeignete Quellen beispielsweise aus
                anerkannten methodischen oder öffentlichen Datensätzen stammen.
              </p>
              <p>
                Wichtig ist für uns nicht nur der Faktor selbst, sondern auch
                seine Nachvollziehbarkeit. Deshalb soll bei wesentlichen
                Berechnungen erkennbar bleiben, welche Quelle beziehungsweise
                Referenz verwendet wurde.
              </p>
            </Rise>
            <Rise
              className="rounded-lg border border-[rgba(21,21,21,0.11)] bg-white p-6 sm:p-8"
              delay={0.08}
            >
              <p className="mb-6 text-sm font-bold uppercase text-orange">
                Auswahl berücksichtigt
              </p>
              <CheckList items={factorSelectionItems} />
            </Rise>
          </div>
        </Section>

        <Section
          eyebrow="Schätzungen und Lücken"
          heading="Wie wir mit Schätzungen und Datenlücken umgehen."
          id="datenluecken"
        >
          <Rise className="methodology-body space-y-4 text-muted">
            <p>Perfekte Daten stehen nicht immer zur Verfügung.</p>
            <p>Das ist in realen Unternehmen normal.</p>
            <p className="font-semibold text-ink">
              Wichtig ist, wie damit umgegangen wird.
            </p>
          </Rise>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {estimateRules.map((rule, index) => (
              <Rise
                className="rounded-lg border border-[rgba(21,21,21,0.11)] bg-[var(--paper)] p-6"
                delay={index * 0.04}
                key={rule.title}
              >
                <h3 className="methodology-card-title font-bold text-ink">{rule.title}</h3>
                <p className="methodology-prose mt-3 leading-7 text-muted">{rule.body}</p>
              </Rise>
            ))}
          </div>
          <Rise className="methodology-quote mt-9 border-l-2 border-orange pl-5 text-ink">
            Scheinbare Präzision ist nicht besser als transparent dokumentierte
            Unsicherheit. Wir erzeugen keine exakten wirkenden ESG-Zahlen auf
            Basis unbelegter Annahmen.
          </Rise>
        </Section>

        <Section
          eyebrow="Fragebögen und Plattformen"
          heading="Fragebögen, EcoVadis und IntegrityNext: Antwort und Nachweis gehören zusammen."
          id="plattformen"
          tone="paper"
        >
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <Rise className="methodology-body space-y-4 text-muted">
              <p>
                Bei Kundenfragebögen und ESG-Plattformen besteht die Arbeit
                nicht nur darin, Felder auszufüllen.
              </p>
              <p>
                Entscheidend ist häufig auch, welche Unternehmensinformationen
                hinter einer Antwort stehen.
              </p>
              <p>
                Bei{" "}
                <Link
                  className="orange-link"
                  href="/de/ecovadis-unterstuetzung"
                >
                  EcoVadis
                </Link>{" "}
                und{" "}
                <Link
                  className="orange-link"
                  href="/de/integritynext-unterstuetzung"
                >
                  IntegrityNext
                </Link>{" "}
                bereiten wir die inhaltliche Grundlage für Ihr Unternehmen vor.
              </p>
              <p className="font-semibold text-ink">
                Die endgültige Eingabe beziehungsweise Einreichung auf der
                Plattform erfolgt durch das Unternehmen selbst.
              </p>
              <p>
                Dadurch bleibt klar, wer die Unternehmensangaben gegenüber der
                externen Plattform bestätigt.
              </p>
              <p>
                Evipace ist ein unabhängiger Dienstleister und weder mit
                EcoVadis noch mit IntegrityNext verbunden. Was die Plattformen
                von Lieferanten erwarten, dokumentieren die Betreiber selbst;
                darauf stützen sich unsere Leitfäden zu{" "}
                <Link
                  className="orange-link"
                  href="/de/ressourcen/ecovadis-dokumente-nachweise"
                >
                  EcoVadis-Dokumenten und Nachweisen
                </Link>{" "}
                und zur{" "}
                <Link
                  className="orange-link"
                  href="/de/ressourcen/integritynext-einladung-lieferanten"
                >
                  IntegrityNext-Einladung
                </Link>
                .
              </p>
              <SourceNote
                locale="de"
                sources={[
                  primarySources.ecovadisSupportingDocuments,
                  primarySources.integrityNextCompletingAssessment
                ]}
              />
            </Rise>
            <Rise
              className="rounded-lg border border-[rgba(21,21,21,0.11)] bg-white p-6 sm:p-8"
              delay={0.08}
            >
              <p className="mb-6 text-sm font-bold uppercase text-orange">
                Evipace unterstützt bei
              </p>
              <CheckList items={platformSupportItems} />
            </Rise>
          </div>
        </Section>

        <Section
          eyebrow="Nachweise"
          heading="Wie wir mit Nachweisen umgehen."
          id="nachweise"
        >
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <Rise className="methodology-body space-y-4 text-muted">
              <p>
                Ein Nachweis soll eine Aussage tatsächlich unterstützen. Nicht
                nur optisch dazu passen.
              </p>
              <p>
                Ein vorhandenes ISO-Zertifikat beantwortet nicht automatisch
                jede Umweltfrage. Eine Richtlinie beweist nicht automatisch
                deren vollständige Umsetzung. Eine Rechnung beantwortet nicht
                automatisch eine komplette Emissionsfrage.
              </p>
              <p className="methodology-step-number font-display text-orange">
                Beleg vor Behauptung.
              </p>
              <p>
                Wenn ein Nachweis fehlt, wird dieser Punkt als Gap behandelt.
              </p>
              <p className="font-semibold text-ink">
                Wir erstellen keine fingierten, rückdatierten oder irreführend dargestellten Nachweise.
              </p>
              <p>
                Welche Prüfkriterien wir an ein einzelnes Dokument anlegen –
                Geltungsbereich, Zeitraum, Gültigkeit, Quelle und
                Nachvollziehbarkeit – beschreibt unser Leitfaden zu{" "}
                <Link
                  className="orange-link"
                  href="/de/ressourcen/esg-nachweise-lieferanten"
                >
                  ESG-Nachweisen für Lieferanten
                </Link>
                .
              </p>
            </Rise>
            <Rise
              className="rounded-lg border border-[rgba(21,21,21,0.11)] bg-[var(--paper)] p-6 sm:p-8"
              delay={0.08}
            >
              <p className="mb-6 text-sm font-bold uppercase text-orange">
                Wir betrachten unter anderem
              </p>
              <CheckList items={evidenceChecks} />
            </Rise>
          </div>
        </Section>

        <Section
          eyebrow="Richtlinien"
          heading="Wie Richtlinien und Unternehmensdokumente entstehen."
          id="richtlinien"
          tone="warm"
        >
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <Rise className="methodology-body space-y-4 text-muted">
              <p>
                Manchmal zeigt eine ESG-Anfrage, dass eine relevante Richtlinie
                oder interne Dokumentation noch nicht formalisiert wurde.
              </p>
              <p>Evipace kann in solchen Fällen einen Entwurf vorbereiten.</p>
              <p>
                Dabei gilt ein klares Prinzip: Der Inhalt muss auf der
                tatsächlichen Praxis und den tatsächlichen Entscheidungen des
                Unternehmens beruhen.
              </p>
              <p>
                Wir erstellen deshalb keine Richtlinie aus allgemeinen
                Behauptungen darüber, was ein „gutes Unternehmen“ angeblich tut.
              </p>
              <p className="font-semibold text-ink">
                Ein neu erstelltes Dokument wird außerdem nicht so dargestellt,
                als hätte es bereits in der Vergangenheit bestanden.
              </p>
            </Rise>
            <Rise
              className="rounded-lg border border-[rgba(254,112,1,0.28)] bg-[var(--soft-orange)] p-6 sm:p-8"
              delay={0.08}
            >
              <p className="text-sm font-bold uppercase text-orange">
                Der Prozess ist
              </p>
              <p className="methodology-statement font-display mt-6 text-ink">
                reale Unternehmenspraxis → strukturierter Entwurf → interne
                Prüfung → notwendige Korrekturen → ausdrückliche Freigabe
              </p>
              <p className="methodology-step-title mt-7 font-bold text-ink">
                Ein Entwurf ist noch keine Unternehmensrichtlinie.
              </p>
              <p className="methodology-prose mt-4 leading-8 text-muted">
                Er wird erst dann zu einem gültigen internen Dokument des
                Unternehmens, wenn eine dazu befugte Person ihn geprüft,
                gegebenenfalls angepasst und ausdrücklich angenommen hat.
              </p>
            </Rise>
          </div>
        </Section>

        <Section
          eyebrow="Technologie"
          heading="Technologie beschleunigt die Vorbereitung. Verantwortung wird nicht automatisiert."
          id="technologie"
          tone="dark"
        >
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <Rise className="methodology-body space-y-4 text-white/72">
              <p>
                Evipace kann digitale und AI-gestützte Werkzeuge intern
                einsetzen, um umfangreiche Informationen effizienter zu
                verarbeiten.
              </p>
              <p>
                Sie bestimmen jedoch nicht eigenständig, was im Unternehmen
                tatsächlich wahr ist.
              </p>
              <p className="border-l-2 border-orange pl-5 font-semibold text-white">
                Jeder Deliverable wird vor der Rückgabe an den Kunden menschlich geprüft.
              </p>
              <p>
                AI ist ein internes Werkzeug im Arbeitsprozess – nicht die
                Quelle der Unternehmenswahrheit und nicht das Produkt, das wir
                verkaufen.
              </p>
            </Rise>
            <div className="grid gap-5">
              <Rise className="rounded-lg border border-white/12 bg-white/[0.04] p-6 sm:p-7">
                <p className="mb-5 text-sm font-bold uppercase text-orange">
                  Kann unterstützen bei
                </p>
                <CheckList items={technologySupportItems} dark />
              </Rise>
              <Rise
                className="rounded-lg border border-white/12 bg-white/[0.04] p-6 sm:p-7"
                delay={0.08}
              >
                <p className="mb-5 text-sm font-bold uppercase text-orange">
                  Entscheidet nicht allein
                </p>
                <CheckList items={technologyDoesNotDecide} dark />
              </Rise>
            </div>
          </div>
        </Section>

        <Section
          eyebrow="Rollenverteilung"
          heading="Ihre Verantwortung. Unsere Verantwortung."
          id="verantwortung"
        >
          <Rise className="methodology-body space-y-4 text-muted">
            <p>
              Eine belastbare Zusammenarbeit benötigt eine klare
              Rollenverteilung.
            </p>
          </Rise>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Rise className="rounded-lg border border-[rgba(21,21,21,0.11)] bg-[var(--paper)] p-7 sm:p-9">
              <div className="mb-6 flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-orange" />
                <h3 className="methodology-step-title font-bold text-ink">
                  Evipace übernimmt
                </h3>
              </div>
              <CheckList items={evipaceResponsibilities} />
            </Rise>
            <Rise
              className="rounded-lg border border-[rgba(21,21,21,0.11)] bg-white p-7 shadow-lift sm:p-9"
              delay={0.08}
            >
              <div className="mb-6 flex items-center gap-3">
                <Scale className="h-5 w-5 text-orange" />
                <h3 className="methodology-step-title font-bold text-ink">
                  Ihr Unternehmen übernimmt
                </h3>
              </div>
              <CheckList items={clientResponsibilities} />
            </Rise>
          </div>
          <Rise className="methodology-quote methodology-quote--box mt-8 border-l-2 border-orange bg-[var(--soft-orange)] px-6 py-5 text-ink">
            Wenn eine Quelle widersprüchlich, unvollständig oder unklar
            erscheint, weisen wir darauf hin. Wir ersetzen fehlende
            Unternehmensinformationen nicht durch erfundene Tatsachen.
          </Rise>
        </Section>

        <Section
          eyebrow="Methodischer Stand"
          heading="Wir arbeiten mit dem jeweils relevanten methodischen Stand."
          id="standards"
          tone="paper"
        >
          <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr]">
            <Rise className="methodology-body space-y-4 text-muted">
              <p>
                ESG-Standards, Reporting-Anforderungen und Emissionsfaktoren
                entwickeln sich weiter.
              </p>
              <p>
                Deshalb behandeln wir Methodik nicht als statische Checkliste.
              </p>
              <p>
                Welche Grundlage verwendet wird, hängt vom jeweiligen Auftrag
                ab.
              </p>
              <p className="font-semibold text-ink">
                Angekündigte Änderungen behandeln wir nicht als bereits geltende
                Regeln.
              </p>
              <p>
                Wo Versionen oder methodische Referenzen für das Ergebnis
                relevant sind, sollen sie nachvollziehbar bleiben.
              </p>
              <p>
                Die Referenzen, mit denen wir am häufigsten arbeiten, werden
                von den Standardsetzern und den europäischen Institutionen
                selbst veröffentlicht.
              </p>
              <SourceNote
                locale="de"
                sources={[
                  primarySources.ghgCorporateStandard,
                  primarySources.efragVoluntaryStandard,
                  primarySources.ecCsrd
                ]}
              />
            </Rise>
            <div className="grid gap-5">
              <Rise className="rounded-lg border border-[rgba(21,21,21,0.11)] bg-white p-6 sm:p-7">
                <p className="mb-5 text-sm font-bold uppercase text-orange">
                  Je nach Auftrag relevant
                </p>
                <CheckList items={methodologyReferences} />
              </Rise>
              <Rise
                className="rounded-lg border border-[rgba(21,21,21,0.11)] bg-white p-6 sm:p-7"
                delay={0.08}
              >
                <p className="mb-5 text-sm font-bold uppercase text-orange">
                  Wir unterscheiden zwischen
                </p>
                <CheckList items={standardsStates} />
              </Rise>
            </div>
          </div>
        </Section>

        <Section
          eyebrow="VSME"
          heading="VSME und freiwillige Nachhaltigkeitsberichterstattung"
          id="vsme"
        >
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <Rise className="methodology-body space-y-4 text-muted">
              <p>
                Bei freiwilligen Nachhaltigkeitsberichten orientieren wir die
                Arbeit am für das konkrete Projekt relevanten europäischen
                Berichtsrahmen.
              </p>
              <p>
                Dabei geht es nicht darum, möglichst viele ESG-Texte zu
                produzieren.
              </p>
              <p className="font-semibold text-ink">
                Die Datengrundlage steht vor dem Berichtstext.
              </p>
              <p>
                Dadurch entsteht nicht nur ein Bericht, sondern eine
                strukturierte Basis, die auch für spätere Kundenanfragen oder
                andere ESG-Prozesse wiederverwendet werden kann.
              </p>
              <p>
                Mehr zum konkreten Angebot finden Sie auf der Seite zum{" "}
                <Link
                  className="orange-link"
                  href="/de/vsme-nachhaltigkeitsbericht"
                >
                  VSME-Nachhaltigkeitsbericht
                </Link>
                ; welche Angaben ein Unternehmen vorbereiten sollte, zeigt der{" "}
                <Link
                  className="orange-link"
                  href="/de/ressourcen/vsme-daten-nachhaltigkeitsbericht"
                >
                  VSME-Datenleitfaden
                </Link>
                .
              </p>
              <SourceNote
                locale="de"
                sources={[primarySources.efragVoluntaryStandard]}
              />
            </Rise>
            <Rise
              className="rounded-lg border border-[rgba(21,21,21,0.11)] bg-[var(--paper)] p-6 sm:p-8"
              delay={0.08}
            >
              <p className="mb-6 text-sm font-bold uppercase text-orange">
                Zuerst wird geklärt
              </p>
              <CheckList items={vsmeQuestions} />
            </Rise>
          </div>
        </Section>

        <Section
          eyebrow="Unterlagen"
          heading="Wie wir Ihre Unterlagen verwenden."
          id="unterlagen"
          tone="warm"
        >
          <Rise className="methodology-body space-y-4 text-muted">
            <p>
              Die Dokumente und Informationen, die Sie für einen Auftrag
              bereitstellen, dienen als Arbeitsgrundlage für die vereinbarte
              Leistung.
            </p>
            <p>
              Dazu können sensible interne Unternehmensinformationen gehören.
            </p>
            <p>
              Deshalb behandeln wir bereitgestellte Unterlagen als
              Arbeitsmaterial für den jeweiligen ESG-Prozess und stellen über
              das Evipace-Anfrageformular hochgeladene Dokumente nicht
              öffentlich bereit.
            </p>
            <p>
              Wir beschränken Aussagen zu Speicherung, Aufbewahrungsfristen und
              weiteren datenschutzrechtlichen Details auf die dafür vorgesehenen
              Datenschutzinformationen, damit die Methodology-Seite keine
              technischen oder rechtlichen Versprechen macht, die nicht hierher
              gehören.
            </p>
          </Rise>
        </Section>

        <Section
          eyebrow="Output"
          heading="Was Sie am Ende erhalten."
          id="output"
        >
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <Rise className="methodology-body space-y-4 text-muted">
              <p>Der genaue Output hängt vom Auftrag ab.</p>
              <p>
                Das Ziel ist nicht nur ein Dokument, das fertig aussieht. Sie
                sollen verstehen können, auf welcher Grundlage das Ergebnis
                entstanden ist.
              </p>
            </Rise>
            <Rise
              className="rounded-lg border border-[rgba(21,21,21,0.11)] bg-[var(--paper)] p-6 sm:p-8"
              delay={0.08}
            >
              <p className="mb-6 text-sm font-bold uppercase text-orange">
                Er kann beispielsweise enthalten
              </p>
              <CheckList items={deliverables} />
            </Rise>
          </div>
        </Section>

        <Section
          eyebrow="Grenzen"
          heading="Was Evipace nicht behauptet."
          id="grenzen"
          tone="dark"
        >
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
            <Rise className="methodology-body space-y-4 text-white/72">
              <p>Klare Methodik bedeutet auch klare Grenzen.</p>
              <p>
                Unsere Aufgabe ist die strukturierte, nachvollziehbare
                Vorbereitung Ihrer ESG-Arbeit auf Basis der verfügbaren und
                bestätigten Unternehmensinformationen.
              </p>
            </Rise>
            <Rise
              className="rounded-lg border border-white/12 bg-white/[0.04] p-6 sm:p-8"
              delay={0.08}
            >
              <p className="mb-6 text-sm font-bold uppercase text-orange">
                Evipace
              </p>
              <ul className="grid gap-4">
                {limitations.map((item) => (
                  <li className="flex gap-3 leading-7 text-white/72" key={item}>
                    <MinusCircle
                      aria-hidden="true"
                      className="mt-0.5 h-5 w-5 shrink-0 text-white/42"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Rise>
          </div>
        </Section>

        <GermanReviewedLine date={lastReviewed} />

        <section
          className="relative isolate overflow-hidden bg-[var(--soft-orange)] py-20 sm:py-28"
          id="kontakt"
        >
          <div className="site-shell relative z-10 max-w-5xl">
            <Rise>
              <p className="eyebrow">Nächster Schritt</p>
              <h2 className="methodology-h2 methodology-h2--cta font-display mt-5">
                Sie haben eine konkrete ESG-Anforderung?
              </h2>
              <div className="methodology-lead mt-6 space-y-4 text-[rgba(21,21,21,0.68)]">
                <p>Zeigen Sie uns die Ausgangslage.</p>
                <p>
                  Wir prüfen, welche Daten, Dokumente, Berechnungen und
                  Arbeitsschritte benötigt werden und wie wir die Aufgabe
                  strukturiert vorbereiten können.
                </p>
              </div>
              <div className="mt-9">
                <ButtonLink href={SEND_REQUEST_HREF}>
                  ESG-Anfrage senden
                </ButtonLink>
              </div>
              <p className="mt-7 text-sm font-semibold leading-7 text-[rgba(21,21,21,0.62)]">
                Fragebogen · Emissionen · Bericht · Nachweise · Richtlinien
              </p>
            </Rise>
          </div>
        </section>
      </main>
    </>
  );
}
