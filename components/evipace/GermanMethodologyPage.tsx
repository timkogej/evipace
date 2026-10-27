import { FileText, Scale, ShieldCheck } from "lucide-react";
import Link from "next/link";
import h from "./HomeLandingPage.module.css";
import { ClosingCta } from "./home/ClosingCta";
import { TrustIllustration } from "./home/TrustIllustration";
import {
  CheckList,
  LimitList,
  MethodHero,
  MethodOverview,
  ProcessSteps,
  Rise,
  Section
} from "./methodology/MethodologyParts";
import m from "./methodology/Methodology.module.css";
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

function GermanReviewedLine({ date }: { date?: string }) {
  if (!date) {
    return null;
  }

  return (
    <section className={m.reviewed}>
      <div className={h.shell}>
        <Rise className={m.reviewedInner}>
          <LastReviewed date={date} locale="de" />
          <p>
            Dieser Zeitpunkt bezeichnet die letzte inhaltliche Prüfung dieser Methodik – nicht das Datum eines Website-Deployments.
          </p>
        </Rise>
      </div>
    </section>
  );
}

export function GermanMethodologyPage({
  lastReviewed
}: GermanMethodologyPageProps) {
  return (
    <>
      <main className={`${h.page} ${m.page}`} data-locale="de">
        <MethodHero
          eyebrow="Methodik"
          jumpLabel="Auf dieser Seite"
          jumps={[
            { id: "grundprinzip", label: "Grundprinzip" },
            { id: "ablauf", label: "Ablauf" },
            { id: "nachvollziehbarkeit", label: "Nachvollziehbarkeit" },
            { id: "emissionen", label: "Emissionen" },
            { id: "verantwortung", label: "Verantwortung" },
            { id: "grenzen", label: "Grenzen" }
          ]}
          lead="Wir machen aus vorhandenen Unternehmensdaten prüfbare ESG-Antworten und Berechnungen – mit nachvollziehbaren Quellen, klaren Annahmen und menschlicher Prüfung."
          title="So wird aus Unternehmensdaten belastbare ESG-Arbeit."
        />

        <MethodOverview
          eyebrow="Auf einen Blick"
          steps={[
            { label: "Sie liefern", body: "Die Anfrage und die bereits vorhandenen Unternehmensunterlagen." },
            { label: "Wir bereiten vor", body: "Antworten, Berechnungen und Nachweise mit nachvollziehbaren Quellen." },
            { label: "Sie bestätigen", body: "Ihr Unternehmen prüft die Fakten und gibt die endgültige Antwort frei." }
          ]}
          title="Von Ihren Unterlagen zu einer Antwort, die Sie prüfen können."
        />

        <Section
          eyebrow="Grundprinzip"
          heading="Unser Grundprinzip: Quelle vor Aussage."
          id="grundprinzip"
          tone="orange"
        >
          <div className={m.split}>
            <Rise className={m.body}>
              <p>
                Eine ESG-Antwort ist nur so belastbar wie die Information
                dahinter.
              </p>
              <p>Deshalb beginnen wir nicht mit der Frage:</p>
              <p className={m.statement}>
                „Was sollte hier stehen?“
              </p>
              <p>Sondern mit:</p>
              <p className={`${m.statement} ${m.accent}`}>
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
              <p className={m.callout}>
                Wenn eine Information fehlt, behandeln wir sie als Lücke – nicht
                als Einladung, eine plausible Antwort zu erfinden.
              </p>
            </Rise>
            <Rise
              className={m.card}
              delay={0.08}
            >
              <div className={m.cardHead}>
                <div className={m.iconBox}>
                  <FileText aria-hidden="true" className={m.iconSmall} />
                </div>
                <p className={m.label}>
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
          image="process"
          intro={
            <Rise className={m.body}>
              <p>Nicht jeder Auftrag sieht gleich aus.</p>
              <p>
                Ein EcoVadis-Assessment benötigt andere Arbeitsschritte als eine
                Scope-1-Berechnung. Ein VSME-Bericht ist anders aufgebaut als ein
                kundenspezifischer ESG-Fragebogen.
              </p>
              <p className={m.strong}>
                Das Grundprinzip bleibt jedoch gleich.
              </p>
            </Rise>
          }
        >
          <ProcessSteps
            intro="Sechs Schritte von der Anfrage bis zu Ergebnissen, die Ihr Unternehmen prüfen und freigeben kann. Öffnen Sie einen Schritt für die Details."
            steps={projectSteps}
          />
        </Section>

        <Section
          eyebrow="Nachvollziehbarkeit"
          heading="Nachvollziehbarkeit ist Teil des Ergebnisses."
          id="nachvollziehbarkeit"
          tone="paper"
        >
          <div className={m.split}>
            <Rise className={m.body}>
              <p>
                Wir möchten nicht nur wissen, welche Zahl am Ende in einer
                Tabelle steht.
              </p>
              <p>
                Wir möchten auch nachvollziehen können, wie sie entstanden ist.
              </p>
              <p>Für wesentliche Antworten sollte der Arbeitsnachweis Frage oder Kennzahl, Unternehmens- und Standortgrenze, Berichtszeitraum, Quelldatei und Seite oder Tabellenblatt, Berechnungs- oder Faktorversion, Annahmen, Datenverantwortliche und Freigabestatus festhalten. Das Ergebnis soll sich ohne Vermutungen auf seine Grundlage zurückführen lassen.
              </p>
              <p>
                Nicht jeder einzelne Satz benötigt dieselbe Dokumentationstiefe.
                Bei wesentlichen Kennzahlen, Berechnungen und Aussagen sollte
                jedoch klar sein, worauf sie beruhen.
              </p>
              <p className={`${m.statement} ${m.accent}`}>
                Das Ergebnis soll nicht nur fertig aussehen. Es soll nachvollziehbar sein.
              </p>
            </Rise>
            <Rise
              className={m.card}
              delay={0.08}
            >
              <p className={m.label}>
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
          image="emissions"
          detailsLabel="Berechnungen für Scope 1, Scope 2 und Scope 3 ansehen"
          intro={
            <Rise className={m.body}>
              <p>
                Treibhausgasberechnungen beginnen mit einer klaren Abgrenzung und
                belastbaren Aktivitätsdaten.
              </p>
              <p className={m.strong}>
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
                <Link className={m.link} href="/de/scope-1-2-berechnung">
                  Scope-1- und Scope-2-Berechnung
                </Link>
                ; die Begriffe selbst erklären wir in{" "}
                <Link
                  className={m.link}
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
          }
        >
          <div className={m.stack}>
            <Rise className={m.card}>
              <p className={h.eyebrow}>Scope 1</p>
              <h3 className={m.h3}>
                Direkte Emissionen aus eigenen oder kontrollierten Quellen.
              </h3>
              <p className={m.text}>
                Scope 1 umfasst direkte Treibhausgasemissionen aus relevanten
                Quellen, die dem Unternehmen gehören oder von ihm kontrolliert
                werden.
              </p>
              <div className={m.pair}>
                <div>
                  <p className={m.label}>
                    Beispiele
                  </p>
                  <CheckList items={scopeOneExamples} />
                </div>
                <div>
                  <p className={m.label}>
                    Typischer Berechnungsweg
                  </p>
                  <p className={m.formula}>
                    Aktivitätsdaten → geeigneter Emissionsfaktor → CO₂e
                  </p>
                  <div className={m.spacedSmall}>
                    <CheckList items={scopeOneChecks} variant="checks" />
                  </div>
                </div>
              </div>
            </Rise>

            <Rise
              className={m.card}
              delay={0.05}
            >
              <p className={h.eyebrow}>Scope 2</p>
              <h3 className={m.h3}>
                Eingekaufte oder bezogene Energie.
              </h3>
              <p className={m.text}>
                Scope 2 betrifft Treibhausgasemissionen im Zusammenhang mit
                eingekaufter oder bezogener Energie.
              </p>
              <div className={m.pair}>
                <CheckList items={scopeTwoExamples} />
                <p className={m.note}>
                  Je nach Verwendungszweck kann eine location-based und
                  gegebenenfalls zusätzlich eine market-based Betrachtung
                  relevant sein. Welche Methode verwendet wird, richtet sich
                  nach dem konkreten Berichts- oder Kundenanforderungsfall.
                </p>
              </div>
            </Rise>

            <Rise
              className={m.card}
              delay={0.1}
            >
              <p className={h.eyebrow}>Scope 3</p>
              <h3 className={m.h3}>
                Weitere indirekte Emissionen, wenn sie Teil des Auftrags sind.
              </h3>
              <p className={m.text}>
                Wenn Scope 3 Teil des vereinbarten Auftrags ist, betrachten wir
                relevante weitere indirekte Emissionen entlang der vor- und
                nachgelagerten Wertschöpfungskette.
              </p>
              <div className={m.pair}>
                <div>
                  <p className={m.label}>
                    Mögliche Kategorien
                  </p>
                  <CheckList items={scopeThreeExamples} />
                </div>
                <div>
                  <p className={m.label}>
                    Datenqualität
                  </p>
                  <p className={m.text}>
                    Bei Scope 3 ist die Datenlage häufig heterogener als bei
                    Scope 1 und Scope 2. Deshalb ist besonders wichtig, zwischen
                    diesen Datentypen zu unterscheiden.
                  </p>
                  <CheckList items={scopeThreeDataTypes} />
                  <p className={m.strong}>
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
          collapsible
          tone="warm"
        >
          <div className={m.split}>
            <Rise className={m.body}>
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
              className={m.card}
              delay={0.08}
            >
              <p className={m.label}>
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
          collapsible
        >
          <Rise className={m.body}>
            <p>Perfekte Daten stehen nicht immer zur Verfügung.</p>
            <p>Das ist in realen Unternehmen normal.</p>
            <p className={m.strong}>
              Wichtig ist, wie damit umgegangen wird.
            </p>
          </Rise>
          <div className={m.grid2}>
            {estimateRules.map((rule, index) => (
              <Rise
                className={m.card}
                delay={index * 0.04}
                key={rule.title}
              >
                <h3 className={m.cardHeading}>{rule.title}</h3>
                <p className={m.text}>{rule.body}</p>
              </Rise>
            ))}
          </div>
          <Rise className={m.quote}>
            Scheinbare Präzision ist nicht besser als transparent dokumentierte
            Unsicherheit. Wir erzeugen keine exakten wirkenden ESG-Zahlen auf
            Basis unbelegter Annahmen.
          </Rise>
        </Section>

        <Section
          eyebrow="Fragebögen und Plattformen"
          heading="Fragebögen, EcoVadis und IntegrityNext: Antwort und Nachweis gehören zusammen."
          id="plattformen"
          collapsible
          tone="paper"
        >
          <div className={m.split}>
            <Rise className={m.body}>
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
                  className={m.link}
                  href="/de/ecovadis-unterstuetzung"
                >
                  EcoVadis
                </Link>{" "}
                und{" "}
                <Link
                  className={m.link}
                  href="/de/integritynext-unterstuetzung"
                >
                  IntegrityNext
                </Link>{" "}
                bereiten wir die inhaltliche Grundlage für Ihr Unternehmen vor.
              </p>
              <p className={m.strong}>
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
                  className={m.link}
                  href="/de/ressourcen/ecovadis-dokumente-nachweise"
                >
                  EcoVadis-Dokumenten und Nachweisen
                </Link>{" "}
                und zur{" "}
                <Link
                  className={m.link}
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
              className={m.card}
              delay={0.08}
            >
              <p className={m.label}>
                Evipace unterstützt bei
              </p>
              <CheckList items={platformSupportItems} variant="checks" />
            </Rise>
          </div>
        </Section>

        <Section
          eyebrow="Nachweise"
          heading="Wie wir mit Nachweisen umgehen."
          id="nachweise"
          collapsible
        >
          <div className={m.split}>
            <Rise className={m.body}>
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
              <p className={`${m.statement} ${m.accent}`}>
                Beleg vor Behauptung.
              </p>
              <p>
                Wenn ein Nachweis fehlt, wird dieser Punkt als Gap behandelt.
              </p>
              <p className={m.strong}>
                Wir erstellen keine fingierten, rückdatierten oder irreführend dargestellten Nachweise.
              </p>
              <p>
                Welche Prüfkriterien wir an ein einzelnes Dokument anlegen –
                Geltungsbereich, Zeitraum, Gültigkeit, Quelle und
                Nachvollziehbarkeit – beschreibt unser Leitfaden zu{" "}
                <Link
                  className={m.link}
                  href="/de/ressourcen/esg-nachweise-lieferanten"
                >
                  ESG-Nachweisen für Lieferanten
                </Link>
                .
              </p>
            </Rise>
            <div className={m.art}>
              <TrustIllustration label="Illustration: eine Mappe, ein Dokument und ein Freigabezeichen" />
            </div>
          </div>
          <Rise className={`${m.card} ${m.spaced}`}>
            <p className={m.label}>
              Wir betrachten unter anderem
            </p>
            <CheckList items={evidenceChecks} />
          </Rise>
        </Section>

        <Section
          eyebrow="Richtlinien"
          heading="Wie Richtlinien und Unternehmensdokumente entstehen."
          id="richtlinien"
          collapsible
          tone="warm"
        >
          <div className={m.split}>
            <Rise className={m.body}>
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
              <p className={m.strong}>
                Ein neu erstelltes Dokument wird außerdem nicht so dargestellt,
                als hätte es bereits in der Vergangenheit bestanden.
              </p>
            </Rise>
            <Rise
              className={`${m.card} ${m.cardWarm}`}
              delay={0.08}
            >
              <p className={m.label}>
                Der Prozess ist
              </p>
              <p className={m.statement}>
                reale Unternehmenspraxis → strukturierter Entwurf → interne
                Prüfung → notwendige Korrekturen → ausdrückliche Freigabe
              </p>
              <p className={m.cardHeading}>
                Ein Entwurf ist noch keine Unternehmensrichtlinie.
              </p>
              <p className={m.text}>
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
          <div className={m.split}>
            <Rise className={m.body}>
              <p>
                Evipace kann digitale und AI-gestützte Werkzeuge intern
                einsetzen, um umfangreiche Informationen effizienter zu
                verarbeiten.
              </p>
              <p>
                Sie bestimmen jedoch nicht eigenständig, was im Unternehmen
                tatsächlich wahr ist.
              </p>
              <p className={m.callout}>
                Jeder Deliverable wird vor der Rückgabe an den Kunden menschlich geprüft.
              </p>
              <p>
                AI ist ein internes Werkzeug im Arbeitsprozess – nicht die
                Quelle der Unternehmenswahrheit und nicht das Produkt, das wir
                verkaufen.
              </p>
            </Rise>
            <div className={m.stack}>
              <Rise className={m.card}>
                <p className={m.label}>
                  Kann unterstützen bei
                </p>
                <CheckList items={technologySupportItems} dark />
              </Rise>
              <Rise
                className={m.card}
                delay={0.08}
              >
                <p className={m.label}>
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
          <Rise className={m.body}>
            <p>
              Eine belastbare Zusammenarbeit benötigt eine klare
              Rollenverteilung.
            </p>
          </Rise>
          <div className={m.grid2}>
            <Rise className={m.card}>
              <div className={m.cardHead}>
                <ShieldCheck className={m.icon} />
                <h3 className={m.cardHeading}>
                  Evipace übernimmt
                </h3>
              </div>
              <CheckList items={evipaceResponsibilities} variant="checks" />
            </Rise>
            <Rise
              className={m.card}
              delay={0.08}
            >
              <div className={m.cardHead}>
                <Scale className={m.icon} />
                <h3 className={m.cardHeading}>
                  Ihr Unternehmen übernimmt
                </h3>
              </div>
              <CheckList items={clientResponsibilities} variant="checks" />
            </Rise>
          </div>
          <Rise className={m.quote}>
            Wenn eine Quelle widersprüchlich, unvollständig oder unklar
            erscheint, weisen wir darauf hin. Wir ersetzen fehlende
            Unternehmensinformationen nicht durch erfundene Tatsachen.
          </Rise>
        </Section>

        <Section
          eyebrow="Methodischer Stand"
          heading="Wir arbeiten mit dem jeweils relevanten methodischen Stand."
          id="standards"
          collapsible
          tone="paper"
        >
          <div className={m.split}>
            <Rise className={m.body}>
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
              <p className={m.strong}>
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
            <div className={m.stack}>
              <Rise className={m.card}>
                <p className={m.label}>
                  Je nach Auftrag relevant
                </p>
                <CheckList items={methodologyReferences} />
              </Rise>
              <Rise
                className={m.card}
                delay={0.08}
              >
                <p className={m.label}>
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
          collapsible
        >
          <div className={m.split}>
            <Rise className={m.body}>
              <p>
                Bei freiwilligen Nachhaltigkeitsberichten orientieren wir die
                Arbeit am für das konkrete Projekt relevanten europäischen
                Berichtsrahmen.
              </p>
              <p>
                Dabei geht es nicht darum, möglichst viele ESG-Texte zu
                produzieren.
              </p>
              <p className={m.strong}>
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
                  className={m.link}
                  href="/de/vsme-nachhaltigkeitsbericht"
                >
                  VSME-Nachhaltigkeitsbericht
                </Link>
                ; welche Angaben ein Unternehmen vorbereiten sollte, zeigt der{" "}
                <Link
                  className={m.link}
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
              className={m.card}
              delay={0.08}
            >
              <p className={m.label}>
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
          collapsible
          tone="warm"
        >
          <Rise className={m.body}>
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
          <div className={m.split}>
            <Rise className={m.body}>
              <p>Der genaue Output hängt vom Auftrag ab.</p>
              <p>
                Das Ziel ist nicht nur ein Dokument, das fertig aussieht. Sie
                sollen verstehen können, auf welcher Grundlage das Ergebnis
                entstanden ist.
              </p>
            </Rise>
            <Rise
              className={m.card}
              delay={0.08}
            >
              <p className={m.label}>
                Er kann beispielsweise enthalten
              </p>
              <CheckList items={deliverables} variant="checks" />
            </Rise>
          </div>
        </Section>

        <Section
          eyebrow="Grenzen"
          heading="Was Evipace nicht behauptet."
          id="grenzen"
          tone="dark"
        >
          <div className={m.split}>
            <Rise className={m.body}>
              <p>Klare Methodik bedeutet auch klare Grenzen.</p>
              <p>
                Unsere Aufgabe ist die strukturierte, nachvollziehbare
                Vorbereitung Ihrer ESG-Arbeit auf Basis der verfügbaren und
                bestätigten Unternehmensinformationen.
              </p>
            </Rise>
            <Rise
              className={m.card}
              delay={0.08}
            >
              <p className={m.label}>
                Evipace
              </p>
              <LimitList items={limitations} />
            </Rise>
          </div>
        </Section>

        <GermanReviewedLine date={lastReviewed} />

        <ClosingCta
          body={
            <>
              <p>Zeigen Sie uns die Ausgangslage.</p>
              <p>Wir prüfen, welche Daten, Dokumente, Berechnungen und Arbeitsschritte benötigt werden und wie wir die Aufgabe strukturiert vorbereiten können.</p>
            </>
          }
          formHref={SEND_REQUEST_HREF}
          formLabel="ESG-Anfrage senden"
          forwardLabel="Anfrage weiterleiten"
          id="kontakt"
          note="Fragebogen · Emissionen · Bericht · Nachweise · Richtlinien"
          slogan="Nächster Schritt"
          title="Sie haben eine konkrete ESG-Anforderung?"
        />
      </main>
    </>
  );
}
