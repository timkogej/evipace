import type { Locale } from "@/lib/evipace-locales";
import { locales, isLocale } from "@/lib/evipace-locales";

/**
 * A single page's SEO metadata, keyed by locale + page key in `pageRegistry`
 * below. This is the only place title/description/canonical-path/OG-image
 * should be authored — page components read from here rather than defining
 * their own copies.
 */
export type PageMetadataEntry = {
  /** <title> and og:title source. */
  title: string;
  /** <meta description> and og:description source. */
  description: string;
  /**
   * Locale-prefixed path, e.g. "/en". Resolved against SITE_URL to produce
   * the self-referencing canonical and the Open Graph url.
   */
  path: string;
  /** Optional page-specific OG image; falls back to the brand default. */
  ogImage?: {
    url: string;
    width: number;
    height: number;
    alt: string;
  };
  /** Open Graph object type; ordinary pages default to "website". */
  openGraphType?: "website" | "article";
  /**
   * ISO date string (e.g. "2026-08-19"). Only set for pages that carry a
   * "Last reviewed" line (regulatory/trust pages) — read by
   * components/evipace/trust/LastReviewed.tsx so the date lives in exactly
   * one place rather than being hand-typed into a component.
   *
   * "Reviewed" means a real, deliberate content review actually happened on
   * that date. Never derive it from a build, deploy, or git timestamp.
   */
  lastReviewed?: string;
  /**
   * ISO date string. The date the page's content was genuinely first
   * published. Feeds Article.datePublished (lib/seo/schema/article.ts) and
   * the visible published line on editorial pages.
   *
   * Deliberately optional and deliberately empty for the resource pages
   * today: this repository's history squashes every resource into one bulk
   * import commit, so no commit date represents an actual publication
   * event. Populate these by hand from real publication records — a git
   * "file added" date is not a publication date, and stamping one here
   * would assert a freshness signal that never happened.
   */
  datePublished?: string;
  /**
   * ISO date string. The date the page's content was last substantively
   * changed. Feeds Article.dateModified. Same discipline as
   * `datePublished`: only set this when a real content change is known,
   * never from a deploy timestamp.
   */
  dateModified?: string;
};

/** Identifies a page independent of locale, e.g. "home". Grows over time. */
export type PageKey =
  | "home"
  | "about"
  | "privacy"
  | "methodology"
  | "sendRequest"
  | "offers"
  | "esgKundenanfragen"
  | "ecovadisUnterstuetzung"
  | "integrityNextUnterstuetzung"
  | "vsmeNachhaltigkeitsbericht"
  | "scope12Berechnung"
  | "recordsDeadlines"
  | "resourcesHub"
  | "welcheEsgDatenKundenLieferanten"
  | "environmentalPolicyErstellen"
  | "supplierCodeOfConductErstellen"
  | "esgDatenEinmalSammelnMehrfachNutzen"
  | "esgFragebogenVomKundenErhalten"
  | "esgNachweiseLieferanten"
  | "ecovadisDokumenteNachweise"
  | "integrityNextEinladungLieferanten"
  | "scope12DatenBerechnung"
  | "vsmeDatenNachhaltigkeitsbericht"
  | "esgDatenVerantwortlicheAbteilungen"
  | "scope123EinfachErklaert"
  | "esgFragebogenChecklisteLieferanten"
  | "esgNachweiseCheckliste"
  | "scope12DatenerfassungsVorlage"
  | "ecovadisVsIntegritynext";

type LocaleRegistry = Partial<Record<PageKey, PageMetadataEntry>>;

/**
 * Per-locale, per-page registry. Only locales/pages with real, reviewed,
 * indexable content get an entry — presence here drives title/description/
 * canonical, hreflang alternates (getActivePageGroup), sitemap inclusion,
 * and (via isPageReachable below) route reachability. The empty "sl" object
 * is a structural placeholder for the type shape, not placeholder content,
 * and must stay empty until genuine localized pages exist.
 */
export const pageRegistry: Record<Locale, LocaleRegistry> = {
  en: {
    home: {
      title: "ESG Documentation for Manufacturers & Suppliers | Evipace",
      description:
        "Evipace (Ljubljana) prepares ESG questionnaire answers, EcoVadis and IntegrityNext material, Scope 1 and 2 calculations and VSME reports for manufacturers.",
      path: "/en"
    },
    offers: {
      title: "Ways to work with Evipace | Request, Desk, Report",
      description:
        "Forward one customer request, set up a standing desk for recurring ones, or prepare a VSME report. We confirm scope and price before we start.",
      path: "/en/offers"
    },
    about: {
      title: "About Evipace | ESG for manufacturing companies",
      description:
        "Evipace helps manufacturing companies handle practical ESG requirements — from customer requests and questionnaires to emissions data, reports and evidence.",
      path: "/en/about"
    },
    privacy: {
      title: "Privacy policy | Evipace",
      description:
        "How Evipace handles privacy-related information on this website, including optional Google Analytics and cookie choices.",
      path: "/en/privacy"
    },
    methodology: {
      title: "ESG Methodology & Quality Assurance | Evipace",
      description:
        "How Evipace prepares ESG questionnaires, emissions calculations, sustainability reports and supporting evidence — with traceable sources and human review.",
      path: "/en/methodology",
      // Hand-set when the content is actually reviewed — never derived from
      // a build/deploy timestamp. Update this only when the methodology
      // copy itself has been re-reviewed.
      lastReviewed: "2026-08-21"
    },
    esgKundenanfragen: {
      title: "ESG Questionnaire Support for Suppliers | Evipace",
      description:
        "Evipace prepares answers to customer ESG questionnaires and requests for manufacturers and suppliers: data, evidence and open gaps. Based in Ljubljana.",
      path: "/en/esg-customer-requests"
    },
    recordsDeadlines: {
      title: "Records and Deadlines for Manufacturers | Evipace",
      description:
        "Evipace keeps a register of your certificates and documents, watches expiry and renewal dates and prepares what is due. A person at Evipace reviews it.",
      path: "/en/records-and-deadlines"
    },
    scope12Berechnung: {
      title: "Carbon Footprint & Scope 1–2 Calculation | Evipace",
      description:
        "Evipace calculates your corporate carbon footprint (Scope 1 and 2) from activity data, emission factors, sources and assumptions, all documented.",
      path: "/en/scope-1-2-calculation"
    },
    ecovadisUnterstuetzung: {
      title: "EcoVadis Support for Suppliers: Answers & Evidence | Evipace",
      description:
        "Evipace prepares EcoVadis answers and supporting evidence and flags gaps. Your company keeps its account and submits the assessment. No score is promised.",
      path: "/en/ecovadis-support"
    },
    integrityNextUnterstuetzung: {
      title: "IntegrityNext Support for Suppliers | Evipace",
      description:
        "Invited to IntegrityNext by a customer? Evipace organises your certificates and evidence, prepares the answers and flags gaps. Your company keeps its account.",
      path: "/en/integritynext-support"
    },
    vsmeNachhaltigkeitsbericht: {
      title: "VSME Sustainability Reporting for SMEs | Evipace",
      description:
        "Evipace helps SMEs prepare VSME sustainability reporting from company data, existing documents and supporting evidence, with gaps and assumptions kept visible.",
      path: "/en/vsme-sustainability-report"
    },
    resourcesHub: {
      title: "ESG Resources for Suppliers and Manufacturers | Evipace",
      description:
        "Practical ESG guides for suppliers: customer questionnaires, data and evidence requests, EcoVadis, IntegrityNext, Scope 1 and 2 and VSME.",
      path: "/en/resources"
    },
    esgFragebogenVomKundenErhalten: {
      title: "Received a Customer ESG Questionnaire? Start Here | Evipace",
      description:
        "First-response guide for suppliers that received a customer ESG questionnaire: scope, deadline, data owners, evidence, gaps and review.",
      path: "/en/resources/customer-esg-questionnaire-received",
      openGraphType: "article"
    },
    welcheEsgDatenKundenLieferanten: {
      title: "What ESG Data Do Customers Ask Suppliers For? | Evipace",
      description:
        "Which ESG data do customers ask suppliers for? An overview of company scope, energy, emissions, workforce, policies, supply chain and evidence.",
      path: "/en/resources/esg-data-customers-request-from-suppliers",
      openGraphType: "article"
    },
    esgNachweiseLieferanten: {
      title: "ESG Evidence for Suppliers: Which Documents Count? | Evipace",
      description:
        "What counts as evidence for supplier ESG answers? How to match statements to documents, scope, reporting period, validity and review.",
      path: "/en/resources/esg-evidence-for-suppliers",
      openGraphType: "article"
    },
    ecovadisDokumenteNachweise: {
      title: "EcoVadis Documents & Evidence for Suppliers | Evipace",
      description:
        "How suppliers prepare EcoVadis documents and evidence: assessment scope, relevance, the 55-document limit, policies and evidence gaps.",
      path: "/en/resources/ecovadis-documents-evidence",
      openGraphType: "article"
    },
    integrityNextEinladungLieferanten: {
      title: "IntegrityNext Invitation for Suppliers: Next Steps | Evipace",
      description:
        "Invited to IntegrityNext by a customer? A supplier guide to profile scope, assessments, certificates, questionnaires, evidence and validation.",
      path: "/en/resources/integritynext-invitation-for-suppliers",
      openGraphType: "article"
    },
    scope12DatenBerechnung: {
      title: "Scope 1 & 2 Calculation: Data You Need | Evipace",
      description:
        "What data do you need to calculate Scope 1 and Scope 2 emissions? Practical guide to boundaries, activity data, emission factors, CO2e and source evidence.",
      path: "/en/resources/scope-1-2-data-calculation",
      openGraphType: "article"
    },
    scope123EinfachErklaert: {
      title: "Scope 1, 2 & 3 Explained for Companies | Evipace",
      description:
        "Clear explanation of Scope 1, Scope 2 and Scope 3 emissions, with manufacturing examples, supplier perspective, Scope 3 categories and common mistakes.",
      path: "/en/resources/scope-1-2-3-explained",
      openGraphType: "article"
    },
    vsmeDatenNachhaltigkeitsbericht: {
      title: "VSME Data for Sustainability Reporting | Evipace",
      description:
        "What information should an SME prepare for a VSME sustainability report? Practical guide to company, energy, emissions, workforce, policy and evidence data.",
      path: "/en/resources/vsme-data-sustainability-report",
      dateModified: "2026-10-04",
      openGraphType: "article"
    },
    esgDatenVerantwortlicheAbteilungen: {
      title: "ESG Data Owners: Who Owns Which Data? | Evipace",
      description:
        "Who inside the company owns ESG data? Practical owner map for Finance, HR, EHS, Quality, Facility, Operations, Procurement, Compliance and Management.",
      path: "/en/resources/esg-data-owners",
      openGraphType: "article"
    },
    esgFragebogenChecklisteLieferanten: {
      title: "ESG Questionnaire Checklist for Suppliers | Evipace",
      description:
        "Use a practical checklist to review scope, ESG data, evidence, internal ownership and final checks before returning a customer ESG questionnaire.",
      path: "/en/resources/esg-questionnaire-checklist",
      openGraphType: "article"
    },
    esgNachweiseCheckliste: {
      title: "ESG Evidence Readiness Check for Suppliers | Evipace",
      description:
        "Check whether an ESG document actually supports your answer by reviewing scope, period, validity, source and traceability.",
      path: "/en/resources/esg-evidence-readiness-check",
      openGraphType: "article"
    },
    scope12DatenerfassungsVorlage: {
      title: "Scope 1 & 2 Data Collection Template | Evipace",
      description:
        "Collect electricity, fuel, vehicle, refrigerant and purchased-energy data in a structured workspace before calculating Scope 1 and Scope 2 emissions.",
      path: "/en/resources/scope-1-2-data-collection-template",
      openGraphType: "article"
    },
    environmentalPolicyErstellen: {
      title: "Environmental Policy: How to Create One | Evipace",
      description:
        "Create an Environmental Policy that reflects your real operations, scope, responsibilities and commitments, without treating it as proof of past action.",
      path: "/en/resources/environmental-policy",
      openGraphType: "article"
    },
    supplierCodeOfConductErstellen: {
      title: "Supplier Code of Conduct: How to Create One | Evipace",
      description:
        "Build a Supplier Code of Conduct with clear scope, realistic ESG and compliance expectations, internal approval and a practical supplier rollout process.",
      path: "/en/resources/supplier-code-of-conduct",
      openGraphType: "article"
    },
    esgDatenEinmalSammelnMehrfachNutzen: {
      title: "Collect ESG Data Once and Reuse It | Evipace",
      description:
        "Build a reusable ESG data foundation for customer questionnaires, evidence, VSME reporting and recurring ESG requests — without copying answers blindly.",
      path: "/en/resources/reusable-esg-data",
      openGraphType: "article"
    },
    ecovadisVsIntegritynext: {
      title: "EcoVadis vs IntegrityNext for Suppliers | Evipace",
      description:
        "How EcoVadis and IntegrityNext differ for suppliers: what each asks you to do, which documents overlap and how to prepare once for both.",
      path: "/en/resources/ecovadis-vs-integritynext",
      openGraphType: "article",
      datePublished: "2026-11-06",
      dateModified: "2026-11-06"
    }
  },
  de: {
    home: {
      title: "ESG-Dokumentation für Hersteller und Lieferanten | Evipace",
      description:
        "Evipace aus Ljubljana bereitet ESG-Fragebögen, EcoVadis- und IntegrityNext-Unterlagen, Scope-1-und-2-Berechnungen und VSME-Berichte für Hersteller vor.",
      path: "/de"
    },
    offers: {
      title: "Zusammenarbeit mit Evipace | Einzelanfrage, Service, Bericht",
      description:
        "Eine Kundenanfrage weiterleiten, einen laufenden Service einrichten oder einen freiwilligen VSME-Bericht vorbereiten. Umfang und Preis klären wir vorab.",
      path: "/de/angebot"
    },
    about: {
      title: "Über Evipace | ESG für produzierende Unternehmen",
      description:
        "Evipace unterstützt produzierende Unternehmen bei ESG-Anforderungen ihrer Kunden. Erfahren Sie, warum wir gegründet wurden und wie wir arbeiten.",
      path: "/de/about"
    },
    privacy: {
      title: "Datenschutzerklärung | Evipace",
      description:
        "Wie Evipace datenschutzbezogene Informationen auf dieser Website behandelt, einschließlich optionalem Google Analytics und Cookie-Auswahl.",
      path: "/de/privacy"
    },
    methodology: {
      title: "ESG-Methodik & Qualitätssicherung | Evipace",
      description:
        "So bereitet Evipace ESG-Fragebögen, Emissionsberechnungen, Nachhaltigkeitsberichte und Nachweise vor – mit nachvollziehbaren Quellen und menschlicher Prüfung.",
      path: "/de/methodology",
      // Hand-set when the content is actually reviewed — never derived from
      // a build/deploy timestamp. Update this only when the methodology
      // copy itself has been re-reviewed.
      lastReviewed: "2026-08-21"
    },
    // German route availability remains per-page. Do not add de.sendRequest
    // or other unfinished German pages here until genuine, indexable German
    // content exists for those pages too.
    esgKundenanfragen: {
      title: "ESG-Fragebogen für Lieferanten beantworten | Evipace",
      description:
        "Ihr Kunde schickt einen ESG-Fragebogen? Evipace ordnet Daten und Nachweise zu, schreibt den Antwortentwurf und listet offene Punkte auf.",
      path: "/de/esg-kundenanfragen"
    },
    ecovadisUnterstuetzung: {
      title: "EcoVadis Unterstützung für Lieferanten | Evipace",
      description:
        "Evipace bereitet EcoVadis-Antworten und Nachweise vor und macht Lücken sichtbar. Ihr Unternehmen reicht selbst ein. Keine Score-Garantie.",
      path: "/de/ecovadis-unterstuetzung"
    },
    integrityNextUnterstuetzung: {
      title: "IntegrityNext Unterstützung für Lieferanten | Evipace",
      description:
        "Zu IntegrityNext eingeladen? Evipace ordnet Zertifikate und Nachweise zu, bereitet Antworten vor und macht offene Punkte sichtbar. Sie behalten Ihr Konto.",
      path: "/de/integritynext-unterstuetzung"
    },
    vsmeNachhaltigkeitsbericht: {
      title: "VSME-Nachhaltigkeitsbericht erstellen | Evipace",
      description:
        "VSME-Nachhaltigkeitsbericht erstellen: Wir strukturieren Ihre ESG-Daten und bereiten Kennzahlen nachvollziehbar auf, für Kunden, Banken und intern.",
      path: "/de/vsme-nachhaltigkeitsbericht"
    },
    recordsDeadlines: {
      title: "Nachweise und Fristen für Hersteller | Evipace",
      description:
        "Evipace führt ein Register Ihrer Zertifikate und Nachweise, überwacht Ablauf- und Verlängerungstermine und bereitet Fälliges vor. Eine Person prüft es.",
      path: "/de/nachweise-und-fristen"
    },
    scope12Berechnung: {
      title: "CO₂-Bilanz für Unternehmen: Scope 1 & 2 berechnen | Evipace",
      description:
        "CO₂-Bilanz für Unternehmen: Wir strukturieren Verbrauchsdaten, Emissionsquellen und Faktoren, um Scope 1 und Scope 2 nachvollziehbar zu berechnen.",
      path: "/de/scope-1-2-berechnung"
    },
    resourcesHub: {
      title: "ESG-Ressourcen für Lieferanten & Unternehmen | Evipace",
      description:
        "Praktische ESG-Leitfäden, Checklisten und Tools für Lieferanten und produzierende Unternehmen – von Kundenfragebögen und Nachweisen bis Scope 1 & 2 und VSME.",
      path: "/de/ressourcen"
    },
    welcheEsgDatenKundenLieferanten: {
      title: "Welche ESG-Daten verlangen Kunden von Lieferanten? | Evipace",
      description:
        "Welche ESG-Daten verlangen Kunden von Lieferanten? Überblick zu Emissionen, Energie, Umwelt, Personal, Policies, Lieferkette und Nachweisen.",
      path: "/de/ressourcen/welche-esg-daten-kunden-lieferanten",
      openGraphType: "article"
    },
    environmentalPolicyErstellen: {
      title:
        "Environmental Policy erstellen: Leitfaden | Evipace",
      description:
        "Environmental Policy erstellen: Geltungsbereich, Umweltgrundsätze, Verantwortlichkeiten, Ziele und interne Freigabe nachvollziehbar strukturieren.",
      path: "/de/ressourcen/environmental-policy-erstellen",
      openGraphType: "article"
    },
    supplierCodeOfConductErstellen: {
      title: "Supplier Code of Conduct erstellen: Leitfaden | Evipace",
      description:
        "Supplier Code of Conduct erstellen: Erwartungen an Umwelt, Menschenrechte, Arbeitsbedingungen, Ethik und Lieferanten nachvollziehbar strukturieren.",
      path: "/de/ressourcen/supplier-code-of-conduct-erstellen",
      openGraphType: "article"
    },
    esgDatenEinmalSammelnMehrfachNutzen: {
      title: "ESG-Daten einmal sammeln und mehrfach nutzen | Evipace",
      description:
        "ESG-Daten nicht für jeden Kunden neu suchen: So bauen Sie eine wiederverwendbare Datengrundlage für Fragebögen, Nachweise und VSME auf.",
      path: "/de/ressourcen/esg-daten-einmal-sammeln-mehrfach-nutzen",
      openGraphType: "article"
    },
    esgFragebogenVomKundenErhalten: {
      title:
        "ESG-Fragebogen erhalten? So gehen Sie vor | Evipace",
      description:
        "ESG-Fragebogen vom Kunden erhalten? Welche Daten Sie zuerst brauchen, wer intern hilft und wie Sie Antworten und Nachweise vorbereiten.",
      path: "/de/ressourcen/esg-fragebogen-vom-kunden-erhalten",
      openGraphType: "article"
    },
    esgNachweiseLieferanten: {
      title:
        "ESG-Nachweise für Lieferanten: Welche zählen? | Evipace",
      description:
        "Welche ESG-Nachweise brauchen Lieferanten? Welche Dokumente Aussagen belegen, worauf Kunden und Plattformen achten und wie Sie vorbereiten.",
      path: "/de/ressourcen/esg-nachweise-lieferanten",
      openGraphType: "article"
    },
    ecovadisDokumenteNachweise: {
      title:
        "EcoVadis-Dokumente und Nachweise: Was zählt? | Evipace",
      description:
        "Welche Dokumente zählen bei EcoVadis als Nachweis? Relevante Belege, das 55-Dokumente-Limit und typische Fehler, die Sie vermeiden sollten.",
      path: "/de/ressourcen/ecovadis-dokumente-nachweise",
      openGraphType: "article"
    },
    integrityNextEinladungLieferanten: {
      title:
        "IntegrityNext-Einladung erhalten: Was jetzt? | Evipace",
      description:
        "Von einem Kunden zu IntegrityNext eingeladen? Wie das Assessment abläuft, welche Daten und Zertifikate Sie brauchen und was Nachbesserung bedeutet.",
      path: "/de/ressourcen/integritynext-einladung-lieferanten",
      openGraphType: "article"
    },
    scope12DatenBerechnung: {
      title: "Scope 1 und Scope 2: Welche Daten braucht man? | Evipace",
      description:
        "Welche Daten brauchen Sie für Scope 1 und 2? Von Gas, Kraftstoffen und Kältemitteln bis Strom und Fernwärme: Checkliste für die CO₂-Berechnung.",
      path: "/de/ressourcen/scope-1-2-daten-berechnung",
      openGraphType: "article"
    },
    vsmeDatenNachhaltigkeitsbericht: {
      title:
        "VSME-Bericht: Welche Daten braucht man? | Evipace",
      description:
        "Welche Daten brauchen Sie für einen VSME-Bericht? Überblick zu Energie, Emissionen, Wasser, Abfall, Mitarbeitenden, Policies und weiteren Angaben.",
      path: "/de/ressourcen/vsme-daten-nachhaltigkeitsbericht",
      dateModified: "2026-10-04",
      openGraphType: "article"
    },
    esgDatenVerantwortlicheAbteilungen: {
      title:
        "ESG-Daten angefragt: Wer liefert welche Daten? | Evipace",
      description:
        "Ihr Kunde verlangt ESG-Daten? Erfahren Sie, welche Informationen typischerweise bei Finance, HR, Einkauf, Qualität, Produktion und Geschäftsführung liegen.",
      path: "/de/ressourcen/esg-daten-verantwortliche-abteilungen",
      openGraphType: "article"
    },
    scope123EinfachErklaert: {
      title:
        "Scope 1, 2 und 3 einfach erklärt | Evipace",
      description:
        "Unterschied zwischen Scope 1, 2 und 3 einfach erklärt, mit Beispielen für produzierende Unternehmen und Überblick über die 15 Scope-3-Kategorien.",
      path: "/de/ressourcen/scope-1-2-3-einfach-erklaert",
      openGraphType: "article"
    },
    esgFragebogenChecklisteLieferanten: {
      title: "ESG-Fragebogen Checkliste für Lieferanten | Evipace",
      description:
        "ESG-Fragebogen vom Kunden erhalten? Diese praktische Checkliste führt Sie von Scope und Datensammlung über Nachweise und Berechnungen bis zur finalen Prüfung.",
      path: "/de/ressourcen/esg-fragebogen-checkliste-lieferanten",
      openGraphType: "article"
    },
    esgNachweiseCheckliste: {
      title: "ESG-Nachweise prüfen: Checkliste für Lieferanten | Evipace",
      description:
        "Prüfen Sie ESG-Nachweise systematisch auf Aussage, Gültigkeit, Zeitraum, Scope und Nachvollziehbarkeit – mit einer praktischen Checkliste für Lieferanten.",
      path: "/de/ressourcen/esg-nachweise-checkliste",
      openGraphType: "article"
    },
    scope12DatenerfassungsVorlage: {
      title: "Scope 1 & 2 Datenerfassungs-Vorlage | Evipace",
      description:
        "Sammeln Sie Strom-, Brennstoff-, Fahrzeug-, Kältemittel- und Wärmedaten strukturiert für Ihre Scope-1-&-2-Berechnung – mit einer praktischen Vorlage.",
      path: "/de/ressourcen/scope-1-2-datenerfassungs-vorlage",
      openGraphType: "article"
    },
    ecovadisVsIntegritynext: {
      title: "EcoVadis und IntegrityNext im Vergleich | Evipace",
      description:
        "EcoVadis oder IntegrityNext? Was jede Plattform von Lieferanten verlangt, welche Dokumente sich überschneiden und wie Sie sich einmal für beide vorbereiten.",
      path: "/de/ressourcen/ecovadis-und-integritynext-vergleich",
      openGraphType: "article",
      datePublished: "2026-11-06",
      dateModified: "2026-11-06"
    }
  },
  sl: {}
};

export function getPageMetadataEntry(
  locale: string,
  pageKey: PageKey
): PageMetadataEntry | undefined {
  if (!(locales as readonly string[]).includes(locale)) {
    return undefined;
  }

  return pageRegistry[locale as Locale]?.[pageKey];
}

/**
 * Every page key that appears anywhere in the registry, derived by scanning
 * the registry itself rather than maintained as a separate list. Used by
 * app/sitemap.ts to discover what pages exist — a page key only needs to be
 * added once, here in pageRegistry, for the sitemap to find it.
 */
export function getAllPageKeys(): PageKey[] {
  const keys = new Set<PageKey>();
  for (const locale of locales) {
    for (const key of Object.keys(pageRegistry[locale]) as PageKey[]) {
      keys.add(key);
    }
  }
  return Array.from(keys);
}

/**
 * The active, real equivalents of one page across locales — i.e. every
 * locale that has a real registry entry for this exact page key. Presence
 * in `pageRegistry` already means "genuine, reviewed content" by
 * convention (see the doc comment above), so no separate "active locale"
 * check is needed here. This is the single shared definition of "genuine
 * page equivalence": both the hreflang alternates (lib/seo/build-metadata.ts)
 * and the sitemap (app/sitemap.ts) read from this function so they can
 * never drift apart from each other or from the registry.
 */
export function getActivePageGroup(
  pageKey: PageKey
): Array<{ locale: Locale; entry: PageMetadataEntry }> {
  return locales
    .map((locale) => ({ locale, entry: pageRegistry[locale]?.[pageKey] }))
    .filter(
      (candidate): candidate is { locale: Locale; entry: PageMetadataEntry } =>
        Boolean(candidate.entry)
    );
}

/**
 * Pages that are deliberately reachable by direct URL without being
 * indexed or listed anywhere — e.g. a conversion page still pending launch
 * dependencies, or awaiting a native translation. This is the ONLY other
 * source of route reachability besides having a real `pageRegistry` entry:
 * unlike `pageRegistry`, an entry here never affects metadata, canonical,
 * hreflang, or sitemap inclusion — it only keeps the route from 404ing.
 *
 * Keep this list minimal. Remove an entry the moment the page either gets
 * a real `pageRegistry` entry (becomes indexable) or is retired.
 */
const unlistedReachablePages: Record<Locale, PageKey[]> = {
  en: ["sendRequest"],
  de: ["sendRequest"],
  sl: []
};

/**
 * Single source of truth for whether a (locale, pageKey) route should
 * render (200) rather than 404. True if either:
 *  - the page has a real `pageRegistry` entry (genuine, indexable content), or
 *  - it's explicitly declared reachable-but-unlisted above.
 *
 * Every page component under app/[locale]/** must call this — and
 * `notFound()` when it returns false — so route availability is decided
 * per (locale, pageKey), never by a locale-wide flag. This is what lets
 * genuine English and German pages be live while unfinished locale/page
 * combinations stay unavailable.
 */
export function isPageReachable(locale: string, pageKey: PageKey): boolean {
  if (!isLocale(locale)) {
    return false;
  }

  if (pageRegistry[locale][pageKey]) {
    return true;
  }

  return unlistedReachablePages[locale].includes(pageKey);
}
