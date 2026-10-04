import type { PageKey } from "./page-registry";

type Question = { question: string; answer: string };
export type ServiceKey = Extract<PageKey,
  "esgKundenanfragen" | "esgFragebogenLieferanten" | "ecovadisUnterstuetzung" |
  "integrityNextUnterstuetzung" | "scope12Berechnung" | "vsmeNachhaltigkeitsbericht">;

// Engagement descriptions, not external standards or promises about outcomes.
// One bilingual record keeps the buyer-facing scope aligned across all 12 routes.
const questions: Record<ServiceKey, Record<"en" | "de", Question[]>> = {
  esgKundenanfragen: {
    en: [
      { question: "What should we send first, and what will we get back?", answer: "Send the original customer email or portal request, the deadline, the company or sites covered and any existing records. Evipace maps the request to the available evidence and prepares response material, with sources and open points for your approval. A short request for one policy does not automatically require a full questionnaire or sustainability report." },
      { question: "What determines the cost of responding to a customer ESG request?", answer: "The scope depends on the number and type of questions, entities and sites, the reporting period, evidence quality and any calculations or new documents needed. Share the request and deadline so the work and a realistic timetable can be assessed. No fixed price or delivery time is stated before the request is reviewed." }
    ],
    de: [
      { question: "Was senden wir zuerst, und welches Ergebnis erhalten wir?", answer: "Senden Sie die ursprüngliche Kunden-E-Mail oder Portalanfrage, die Frist, die betroffenen Gesellschaften oder Standorte und vorhandene Unterlagen. Evipace ordnet die Anforderungen den verfügbaren Nachweisen zu und bereitet Antwortmaterial mit Quellen und offenen Punkten zur Freigabe vor. Eine einzelne Richtlinienanfrage erfordert nicht automatisch einen vollständigen Fragebogen oder Nachhaltigkeitsbericht." },
      { question: "Wovon hängen die Kosten einer ESG-Kundenanfrage ab?", answer: "Maßgeblich sind Anzahl und Art der Fragen, Gesellschaften und Standorte, Berichtszeitraum, Qualität der Nachweise sowie erforderliche Berechnungen oder neue Dokumente. Anhand der Anfrage und Frist lassen sich Umfang und ein realistischer Zeitplan einschätzen. Ein Festpreis oder Liefertermin wird hier nicht vor Sichtung der Anfrage zugesagt." }
    ]
  },
  esgFragebogenLieferanten: {
    en: [
      { question: "What is included in the questionnaire handover?", answer: "The working output is a field-by-field response draft based on your company's records, an evidence mapping and a list of missing data or decisions. Your team checks company facts and approves the response. A questionnaire response is not a certification, independent audit or guarantee that a customer accepts every answer." },
      { question: "What determines the cost and timing of questionnaire support?", answer: "Send the actual questionnaire, submission deadline, reporting period and entities or sites covered. Effort depends on question count and complexity, available evidence, missing calculations and how quickly internal owners can confirm the facts. The questionnaire is scoped before a delivery commitment is made." }
    ],
    de: [
      { question: "Was gehört zur Übergabe des Fragebogens?", answer: "Sie erhalten einen Antwortentwurf entlang der einzelnen Fragen auf Basis Ihrer Unternehmensunterlagen, eine Zuordnung der Nachweise und eine Liste fehlender Daten oder Entscheidungen. Ihr Team prüft die Unternehmensangaben und gibt die Antwort frei. Der ausgefüllte Fragebogen ist keine Zertifizierung, unabhängige Prüfung oder Garantie für die Akzeptanz durch den Kunden." },
      { question: "Wovon hängen Kosten und Zeitbedarf der Fragebogen-Unterstützung ab?", answer: "Senden Sie den konkreten Fragebogen, die Abgabefrist, den Berichtszeitraum und die betroffenen Gesellschaften oder Standorte. Der Aufwand hängt von Anzahl und Komplexität der Fragen, vorhandenen Nachweisen, fehlenden Berechnungen und internen Rückmeldungen ab. Eine Terminvereinbarung setzt die Sichtung des Fragebogens voraus." }
    ]
  },
  ecovadisUnterstuetzung: {
    en: [
      { question: "What should we send to scope EcoVadis preparation?", answer: "Send the assigned assessment or an export, the assessed entity and sites, the deadline, existing documents and any previous scorecard. Evipace prepares answers, maps relevant evidence and identifies gaps for internal review. Work is based on the assigned assessment, not a universal document checklist; EcoVadis alone determines the rating." },
      { question: "What determines the cost of EcoVadis support?", answer: "The work depends on assessment scope, the number and quality of existing documents, previous assessment feedback and missing data or policies. Share the actual assessment to establish the preparation scope and timetable. Evipace's independent preparation work is separate from the platform's own assessment and subscription arrangements." }
    ],
    de: [
      { question: "Was benötigen Sie zur Eingrenzung der EcoVadis-Vorbereitung?", answer: "Senden Sie das zugewiesene Assessment oder einen Export, die bewertete Gesellschaft und Standorte, die Frist, bestehende Dokumente und eine gegebenenfalls vorhandene Scorecard. Evipace bereitet Antworten vor, ordnet geeignete Nachweise zu und dokumentiert Lücken zur internen Prüfung. Grundlage ist das konkrete Assessment, keine universelle Dokumentenliste; die Bewertung erfolgt allein durch EcoVadis." },
      { question: "Wovon hängen die Kosten der EcoVadis-Unterstützung ab?", answer: "Entscheidend sind Bewertungsumfang, Anzahl und Qualität vorhandener Dokumente, Rückmeldungen aus früheren Bewertungen sowie fehlende Daten oder Richtlinien. Anhand des konkreten Assessments lassen sich Umfang und Zeitplan bestimmen. Die unabhängige Vorbereitung durch Evipace ist von Bewertung und Abonnement der Plattform getrennt." }
    ]
  },
  integrityNextUnterstuetzung: {
    en: [
      { question: "What is the starting point and handover for IntegrityNext support?", answer: "Start with the invitation, company profile scope, assigned topics, deadline and existing certificates or records. Evipace prepares topic-specific responses and evidence with a list of points needing confirmation. Your authorised team retains control of its account and submission; preparation does not guarantee a particular platform status." },
      { question: "What determines the cost of IntegrityNext support?", answer: "Effort depends on the assigned topics, profile scope, existing answers, valid certificates, evidence gaps and follow-up questions. The platform's own access terms are separate from Evipace's preparation service. Share the actual invitation and requirements so the work can be scoped." }
    ],
    de: [
      { question: "Was sind Ausgangspunkt und Ergebnis der IntegrityNext-Unterstützung?", answer: "Ausgangspunkt sind Einladung, Geltungsbereich des Unternehmensprofils, zugewiesene Themen, Frist und vorhandene Zertifikate oder Unterlagen. Evipace bereitet themenspezifische Antworten und Nachweise mit offenen Bestätigungspunkten vor. Ihr autorisiertes Team behält die Kontrolle über Konto und Einreichung; ein bestimmter Plattformstatus wird nicht garantiert." },
      { question: "Wovon hängen die Kosten der IntegrityNext-Unterstützung ab?", answer: "Der Aufwand richtet sich nach zugewiesenen Themen, Profilumfang, vorhandenen Antworten, gültigen Zertifikaten, Nachweislücken und Rückfragen. Die Zugangsbedingungen der Plattform sind von der Evipace-Vorbereitungsleistung getrennt. Senden Sie die konkrete Einladung und Anforderungen zur Eingrenzung der Aufgabe." }
    ]
  },
  scope12Berechnung: {
    en: [
      { question: "Is this a company footprint or a product carbon footprint?", answer: "This service calculates organisational Scope 1 and Scope 2 emissions for an agreed boundary and reporting period. It is not a product carbon footprint or full life-cycle assessment. Scope 3 and product-level work require their own scope, data and method; a company total cannot simply be presented as the footprint of one product." },
      { question: "What determines the cost and timing of a Scope 1 and 2 calculation?", answer: "Key factors are the number of sites and emission sources, reporting period, data completeness, units, available electricity contracts and the required Scope 2 methods. Send energy and fuel records with the company boundary and intended use. The handover includes calculation inputs, factors and their sources, assumptions and gaps, rather than only a total." }
    ],
    de: [
      { question: "Ist das eine Unternehmensbilanz oder ein Product Carbon Footprint?", answer: "Diese Leistung berechnet organisatorische Scope-1- und Scope-2-Emissionen für eine vereinbarte Bilanzgrenze und einen Berichtszeitraum. Sie ist kein Product Carbon Footprint und keine vollständige Lebenszyklusanalyse. Scope 3 und Produktberechnungen benötigen einen eigenen Umfang, eigene Daten und eine passende Methode; eine Unternehmenssumme ist nicht automatisch der Fußabdruck eines Produkts." },
      { question: "Wovon hängen Kosten und Zeitbedarf einer Scope-1-und-2-Berechnung ab?", answer: "Maßgeblich sind Standorte und Emissionsquellen, Berichtszeitraum, Datenvollständigkeit, Einheiten, Stromverträge und erforderliche Scope-2-Methoden. Senden Sie Energie- und Kraftstoffdaten mit Bilanzgrenze und Verwendungszweck. Die Übergabe umfasst Eingaben, Faktoren mit Quellen, Annahmen und Datenlücken – nicht nur eine Gesamtsumme." }
    ]
  },
  vsmeNachhaltigkeitsbericht: {
    en: [
      { question: "Do we need a whole report to answer one customer question?", answer: "Not necessarily. If a customer requests one policy or emissions figure, a targeted response may be sufficient. A voluntary report is useful when several recipients need a consistent company data set. Evipace scopes the reporting basis, module and period before preparing a draft; the recipient's actual request remains the starting point." },
      { question: "What determines the cost and timing of VSME reporting support?", answer: "The work depends on the selected standard version and modules, entities and sites, reporting period, available metrics and evidence, missing calculations and internal approvals. Send the reporting request and existing records. The output is a reporting draft with its data basis and open points for review, not a certification or independent assurance opinion." }
    ],
    de: [
      { question: "Brauchen wir für eine einzelne Kundenfrage einen vollständigen Bericht?", answer: "Nicht unbedingt. Fragt ein Kunde nur eine Richtlinie oder Emissionskennzahl ab, kann eine gezielte Antwort ausreichen. Ein freiwilliger Bericht ist sinnvoll, wenn mehrere Empfänger einen konsistenten Unternehmensdatensatz benötigen. Evipace klärt Berichtsgrundlage, Modul und Zeitraum vor dem Entwurf; Ausgangspunkt bleibt die konkrete Anfrage." },
      { question: "Wovon hängen Kosten und Zeitbedarf der VSME-Unterstützung ab?", answer: "Entscheidend sind Standardversion und Module, Gesellschaften und Standorte, Berichtszeitraum, vorhandene Kennzahlen und Nachweise, fehlende Berechnungen sowie interne Freigaben. Senden Sie die Berichtsanforderung und vorhandene Unterlagen. Das Ergebnis ist ein Berichtsentwurf mit Datengrundlage und offenen Punkten zur Prüfung, keine Zertifizierung oder unabhängige Bestätigung." }
    ]
  }
};

export function getServiceBuyerQuestions(locale: "en" | "de", key: ServiceKey): Question[] {
  return questions[key][locale];
}
