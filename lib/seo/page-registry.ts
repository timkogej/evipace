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
   */
  lastReviewed?: string;
};

/** Identifies a page independent of locale, e.g. "home". Grows over time. */
export type PageKey =
  | "home"
  | "about"
  | "privacy"
  | "methodology"
  | "sendRequest"
  | "esgFragebogenLieferanten"
  | "esgKundenanfragen"
  | "ecovadisUnterstuetzung"
  | "integrityNextUnterstuetzung"
  | "vsmeNachhaltigkeitsbericht"
  | "scope12Berechnung"
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
  | "scope12DatenerfassungsVorlage";

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
      title: "ESG for Manufacturing Companies & Suppliers | evipace",
      description:
        "Evipace handles practical ESG work for manufacturing suppliers — from customer questionnaires and evidence to Scope 1 & 2 and sustainability reporting.",
      path: "/en"
    },
    about: {
      title: "About evipace | ESG for manufacturing companies",
      description:
        "Evipace helps manufacturing companies handle practical ESG requirements — from customer requests and questionnaires to emissions data, reports and evidence.",
      path: "/en/about"
    },
    privacy: {
      title: "Privacy policy | evipace",
      description:
        "How evipace handles privacy-related information on this website, including optional Google Analytics and cookie choices.",
      path: "/en/privacy"
    },
    methodology: {
      title: "ESG Methodology & Quality Assurance | evipace",
      description:
        "How evipace prepares ESG questionnaires, emissions calculations, sustainability reports and supporting evidence — with traceable sources and human review.",
      path: "/en/methodology",
      // Hand-set when the content is actually reviewed — never derived from
      // a build/deploy timestamp. Update this only when the methodology
      // copy itself has been re-reviewed.
      lastReviewed: "2026-08-21"
    },
    esgKundenanfragen: {
      title: "ESG Customer Requests for Suppliers | evipace",
      description:
        "Evipace helps manufacturing suppliers handle customer ESG requests — from data and evidence to policies, emissions and questionnaire responses.",
      path: "/en/esg-customer-requests"
    },
    esgFragebogenLieferanten: {
      title: "ESG Questionnaire Support for Suppliers | evipace",
      description:
        "Support for suppliers completing customer ESG questionnaires: scope the request, gather data and evidence, prepare answers and get the response ready for internal confirmation.",
      path: "/en/esg-questionnaire-support"
    },
    scope12Berechnung: {
      title: "Scope 1 & 2 Calculation for Manufacturing Companies | evipace",
      description:
        "Evipace prepares Scope 1 and Scope 2 calculations from company activity data, with emission factors, sources, assumptions and methodology documented clearly.",
      path: "/en/scope-1-2-calculation"
    },
    ecovadisUnterstuetzung: {
      title: "EcoVadis Support for Suppliers | evipace",
      description:
        "Evipace helps suppliers prepare EcoVadis questionnaire responses and supporting evidence, organise documentation and identify gaps before submission.",
      path: "/en/ecovadis-support"
    },
    integrityNextUnterstuetzung: {
      title: "IntegrityNext Support for Suppliers | evipace",
      description:
        "Evipace helps suppliers respond to IntegrityNext requests by organising company data, supporting evidence and questionnaire inputs for internal confirmation and submission.",
      path: "/en/integritynext-support"
    },
    vsmeNachhaltigkeitsbericht: {
      title: "VSME Sustainability Reporting for SMEs | evipace",
      description:
        "Evipace helps SMEs prepare VSME sustainability reporting from company data, existing documents and supporting evidence, with gaps and assumptions kept visible.",
      path: "/en/vsme-sustainability-report"
    },
    resourcesHub: {
      title: "ESG Resources for Suppliers & Manufacturing Companies | evipace",
      description:
        "Practical ESG resources for suppliers and manufacturing companies responding to customer questionnaires, data requests, evidence requests, EcoVadis and IntegrityNext.",
      path: "/en/resources"
    },
    esgFragebogenVomKundenErhalten: {
      title: "Received a Customer ESG Questionnaire? Start Here | evipace",
      description:
        "A practical first-response guide for suppliers that received an ESG questionnaire from a customer: scope, deadline, data owners, evidence, gaps and internal review.",
      path: "/en/resources/customer-esg-questionnaire-received",
      openGraphType: "article"
    },
    welcheEsgDatenKundenLieferanten: {
      title: "What ESG Data Do Customers Ask Suppliers For? | evipace",
      description:
        "Practical overview of ESG data customers often request from suppliers, including company scope, energy, emissions, workforce, policies, compliance, supply chain and evidence.",
      path: "/en/resources/esg-data-customers-request-from-suppliers",
      openGraphType: "article"
    },
    esgNachweiseLieferanten: {
      title: "ESG Evidence for Suppliers: What Documents Support Answers? | evipace",
      description:
        "What counts as supporting evidence for supplier ESG answers? Learn how to match statements with sources, documents, scope, reporting period, validity and review.",
      path: "/en/resources/esg-evidence-for-suppliers",
      openGraphType: "article"
    },
    ecovadisDokumenteNachweise: {
      title: "EcoVadis Documents & Evidence for Suppliers | evipace",
      description:
        "How suppliers should prepare EcoVadis documents and supporting evidence, including assessment scope, document relevance, the 55-document limit, policies and evidence gaps.",
      path: "/en/resources/ecovadis-documents-evidence",
      openGraphType: "article"
    },
    integrityNextEinladungLieferanten: {
      title: "IntegrityNext Invitation for Suppliers: What to Do Next | evipace",
      description:
        "Received an IntegrityNext invitation from a customer? A practical supplier guide to profile scope, assessments, certificates, questionnaires, evidence and validation.",
      path: "/en/resources/integritynext-invitation-for-suppliers",
      openGraphType: "article"
    },
    scope12DatenBerechnung: {
      title: "Scope 1 & 2 Calculation: Data You Need | evipace",
      description:
        "What data do you need to calculate Scope 1 and Scope 2 emissions? Practical guide to boundaries, activity data, emission factors, CO2e and source evidence.",
      path: "/en/resources/scope-1-2-data-calculation",
      openGraphType: "article"
    },
    scope123EinfachErklaert: {
      title: "Scope 1, 2 & 3 Explained for Companies | evipace",
      description:
        "Clear explanation of Scope 1, Scope 2 and Scope 3 emissions, with manufacturing examples, supplier perspective, Scope 3 categories and common mistakes.",
      path: "/en/resources/scope-1-2-3-explained",
      openGraphType: "article"
    },
    vsmeDatenNachhaltigkeitsbericht: {
      title: "VSME Data for Sustainability Reporting | evipace",
      description:
        "What information should an SME prepare for a VSME sustainability report? Practical guide to company, energy, emissions, workforce, policy and evidence data.",
      path: "/en/resources/vsme-data-sustainability-report",
      openGraphType: "article"
    },
    esgDatenVerantwortlicheAbteilungen: {
      title: "ESG Data Owners: Who Owns Which Data? | evipace",
      description:
        "Who inside the company owns ESG data? Practical owner map for Finance, HR, EHS, Quality, Facility, Operations, Procurement, Compliance and Management.",
      path: "/en/resources/esg-data-owners",
      openGraphType: "article"
    },
    esgFragebogenChecklisteLieferanten: {
      title: "ESG Questionnaire Checklist for Suppliers | evipace",
      description:
        "Use a practical checklist to review scope, ESG data, evidence, internal ownership and final checks before returning a customer ESG questionnaire.",
      path: "/en/resources/esg-questionnaire-checklist",
      openGraphType: "article"
    },
    esgNachweiseCheckliste: {
      title: "ESG Evidence Readiness Check for Suppliers | evipace",
      description:
        "Check whether an ESG document actually supports your answer by reviewing scope, period, validity, source and traceability.",
      path: "/en/resources/esg-evidence-readiness-check",
      openGraphType: "article"
    },
    scope12DatenerfassungsVorlage: {
      title: "Scope 1 & 2 Data Collection Template | evipace",
      description:
        "Collect electricity, fuel, vehicle, refrigerant and purchased-energy data in a structured workspace before calculating Scope 1 and Scope 2 emissions.",
      path: "/en/resources/scope-1-2-data-collection-template",
      openGraphType: "article"
    },
    environmentalPolicyErstellen: {
      title: "Environmental Policy: How to Create One | evipace",
      description:
        "Create an Environmental Policy that reflects your actual operations, scope, responsibilities and environmental commitments — without turning a new policy into evidence of past implementation.",
      path: "/en/resources/environmental-policy",
      openGraphType: "article"
    },
    supplierCodeOfConductErstellen: {
      title: "Supplier Code of Conduct: How to Create One | evipace",
      description:
        "Build a Supplier Code of Conduct with clear scope, realistic ESG and compliance expectations, internal approval and a practical supplier rollout process.",
      path: "/en/resources/supplier-code-of-conduct",
      openGraphType: "article"
    },
    esgDatenEinmalSammelnMehrfachNutzen: {
      title: "Collect ESG Data Once and Reuse It | evipace",
      description:
        "Build a reusable ESG data foundation for customer questionnaires, evidence, VSME reporting and recurring ESG requests — without copying answers blindly.",
      path: "/en/resources/reusable-esg-data",
      openGraphType: "article"
    }
  },
  de: {
    home: {
      title: "ESG für produzierende Unternehmen | evipace",
      description:
        "Evipace übernimmt die praktische ESG-Arbeit für produzierende Unternehmen – von Kundenanfragen und Fragebögen bis zu Scope 1 & 2 und Nachhaltigkeitsberichten.",
      path: "/de"
    },
    about: {
      title: "Über evipace | ESG für produzierende Unternehmen",
      description:
        "Evipace unterstützt produzierende Unternehmen bei der praktischen Umsetzung von ESG-Anforderungen. Erfahren Sie, warum evipace gegründet wurde und wie wir arbeiten.",
      path: "/de/about"
    },
    privacy: {
      title: "Datenschutzerklärung | evipace",
      description:
        "Wie evipace datenschutzbezogene Informationen auf dieser Website behandelt, einschließlich optionalem Google Analytics und Cookie-Auswahl.",
      path: "/de/privacy"
    },
    methodology: {
      title: "ESG-Methodik & Qualitätssicherung | evipace",
      description:
        "So bereitet evipace ESG-Fragebögen, Emissionsberechnungen, Nachhaltigkeitsberichte und Nachweise vor – mit nachvollziehbaren Quellen und menschlicher Prüfung.",
      path: "/de/methodology",
      // Hand-set when the content is actually reviewed — never derived from
      // a build/deploy timestamp. Update this only when the methodology
      // copy itself has been re-reviewed.
      lastReviewed: "2026-08-21"
    },
    // German route availability remains per-page. Do not add de.sendRequest
    // or other unfinished German pages here until genuine, indexable German
    // content exists for those pages too.
    esgFragebogenLieferanten: {
      title: "ESG-Fragebogen für Lieferanten ausfüllen | evipace",
      description:
        "Ihr Kunde verlangt ESG-Daten oder Nachweise? Wir bereiten Ihren ESG-Fragebogen strukturiert vor – inklusive Daten, Dokumenten und menschlicher Prüfung.",
      path: "/de/esg-fragebogen-lieferanten"
    },
    esgKundenanfragen: {
      title: "ESG-Anforderungen von Kunden erfüllen | evipace",
      description:
        "Ihr Kunde fordert ESG-Daten, Nachweise oder Richtlinien? Wir strukturieren die Anfrage, sammeln die benötigten Informationen und bereiten Ihre Antwort vor.",
      path: "/de/esg-kundenanfragen"
    },
    ecovadisUnterstuetzung: {
      title: "EcoVadis-Beratung & Unterstützung für Lieferanten | evipace",
      description:
        "Unterstützung bei EcoVadis-Fragebogen, Nachweisen und Dokumentation. Wir strukturieren vorhandene ESG-Informationen und bereiten Ihre Bewertung nachvollziehbar vor.",
      path: "/de/ecovadis-unterstuetzung"
    },
    integrityNextUnterstuetzung: {
      title:
        "IntegrityNext-Beratung & Unterstützung für Lieferanten | evipace",
      description:
        "Zu IntegrityNext eingeladen? Wir unterstützen Lieferanten bei Assessments, Fragebögen, Zertifikaten und Nachweisen – strukturiert und nachvollziehbar.",
      path: "/de/integritynext-unterstuetzung"
    },
    vsmeNachhaltigkeitsbericht: {
      title: "VSME-Nachhaltigkeitsbericht erstellen | evipace",
      description:
        "VSME-Nachhaltigkeitsbericht für Ihr Unternehmen: Wir strukturieren ESG-Daten, bereiten Kennzahlen auf und erstellen eine nachvollziehbare Grundlage für Kunden, Banken und interne Nutzung.",
      path: "/de/vsme-nachhaltigkeitsbericht"
    },
    scope12Berechnung: {
      title: "Scope 1 und Scope 2 berechnen | evipace",
      description:
        "Scope-1- und Scope-2-Emissionen für Ihr Unternehmen berechnen: Wir strukturieren Verbrauchsdaten, Emissionsquellen und Faktoren zu einer nachvollziehbaren CO₂-Bilanz.",
      path: "/de/scope-1-2-berechnung"
    },
    resourcesHub: {
      title: "ESG-Ressourcen für Lieferanten & Unternehmen | evipace",
      description:
        "Praktische ESG-Leitfäden, Checklisten und Tools für Lieferanten und produzierende Unternehmen – von Kundenfragebögen und Nachweisen bis Scope 1 & 2 und VSME.",
      path: "/de/ressourcen"
    },
    welcheEsgDatenKundenLieferanten: {
      title: "Welche ESG-Daten verlangen Kunden von Lieferanten? | evipace",
      description:
        "Welche ESG-Daten fragen Kunden bei Lieferanten ab? Überblick über Emissionen, Energie, Umwelt, Mitarbeitende, Policies, Lieferkette, Compliance und typische Nachweise.",
      path: "/de/ressourcen/welche-esg-daten-kunden-lieferanten",
      openGraphType: "article"
    },
    environmentalPolicyErstellen: {
      title:
        "Environmental Policy erstellen: Leitfaden für Unternehmen | evipace",
      description:
        "Environmental Policy erstellen: So strukturieren Lieferanten Geltungsbereich, Umweltgrundsätze, Verantwortlichkeiten, Ziele und interne Freigabe nachvollziehbar.",
      path: "/de/ressourcen/environmental-policy-erstellen",
      openGraphType: "article"
    },
    supplierCodeOfConductErstellen: {
      title: "Supplier Code of Conduct erstellen: Leitfaden | evipace",
      description:
        "Supplier Code of Conduct erstellen: So strukturieren Unternehmen Erwartungen an Umwelt, Menschenrechte, Arbeitsbedingungen, Ethik und Lieferanten nachvollziehbar.",
      path: "/de/ressourcen/supplier-code-of-conduct-erstellen",
      openGraphType: "article"
    },
    esgDatenEinmalSammelnMehrfachNutzen: {
      title: "ESG-Daten einmal sammeln und mehrfach nutzen | evipace",
      description:
        "ESG-Daten nicht für jeden Kunden neu zusammensuchen: So bauen Lieferanten eine wiederverwendbare Datengrundlage für Fragebögen, Nachweise, VSME und weitere ESG-Anfragen auf.",
      path: "/de/ressourcen/esg-daten-einmal-sammeln-mehrfach-nutzen",
      openGraphType: "article"
    },
    esgFragebogenVomKundenErhalten: {
      title:
        "ESG-Fragebogen vom Kunden erhalten? So gehen Sie vor | evipace",
      description:
        "Ihr Kunde hat einen ESG-Fragebogen geschickt? Erfahren Sie, welche Daten Sie zuerst brauchen, wer im Unternehmen helfen kann und wie Sie Antworten und Nachweise strukturiert vorbereiten.",
      path: "/de/ressourcen/esg-fragebogen-vom-kunden-erhalten",
      openGraphType: "article"
    },
    esgNachweiseLieferanten: {
      title:
        "ESG-Nachweise für Lieferanten: Welche Dokumente zählen? | evipace",
      description:
        "Welche ESG-Nachweise brauchen Lieferanten wirklich? Erfahren Sie, welche Dokumente Aussagen belegen, worauf Kunden und Plattformen achten und wie Sie Ihre Nachweise strukturiert vorbereiten.",
      path: "/de/ressourcen/esg-nachweise-lieferanten",
      openGraphType: "article"
    },
    ecovadisDokumenteNachweise: {
      title:
        "EcoVadis-Dokumente und Nachweise: Was zählt als Beleg? | evipace",
      description:
        "Welche Dokumente zählen bei EcoVadis als Nachweis? Erfahren Sie, welche Belege relevant sind, wie das 55-Dokumente-Limit funktioniert und welche Fehler Sie vermeiden sollten.",
      path: "/de/ressourcen/ecovadis-dokumente-nachweise",
      openGraphType: "article"
    },
    integrityNextEinladungLieferanten: {
      title:
        "IntegrityNext für Lieferanten: Einladung erhalten – was jetzt? | evipace",
      description:
        "Sie wurden von einem Kunden zu IntegrityNext eingeladen? Erfahren Sie, wie das Assessment abläuft, welche Daten und Zertifikate Sie brauchen und was Nachbesserungsbedarf bedeutet.",
      path: "/de/ressourcen/integritynext-einladung-lieferanten",
      openGraphType: "article"
    },
    scope12DatenBerechnung: {
      title: "Scope 1 und Scope 2: Welche Daten braucht man? | evipace",
      description:
        "Welche Daten brauchen Sie für Scope 1 und Scope 2? Von Gas, Kraftstoffen und Kältemitteln bis Strom und Fernwärme – praktische Checkliste für die CO₂-Berechnung.",
      path: "/de/ressourcen/scope-1-2-daten-berechnung",
      openGraphType: "article"
    },
    vsmeDatenNachhaltigkeitsbericht: {
      title:
        "VSME: Welche Daten braucht ein Nachhaltigkeitsbericht? | evipace",
      description:
        "Welche Daten brauchen Sie für einen VSME-Nachhaltigkeitsbericht? Praktischer Überblick zu Energie, Emissionen, Wasser, Abfall, Mitarbeitenden, Policies und weiteren VSME-Angaben.",
      path: "/de/ressourcen/vsme-daten-nachhaltigkeitsbericht",
      openGraphType: "article"
    },
    esgDatenVerantwortlicheAbteilungen: {
      title:
        "ESG-Daten vom Kunden angefragt: Wer liefert welche Daten? | evipace",
      description:
        "Ihr Kunde verlangt ESG-Daten? Erfahren Sie, welche Informationen typischerweise bei Finance, HR, Einkauf, Qualität, Produktion und Geschäftsführung liegen.",
      path: "/de/ressourcen/esg-daten-verantwortliche-abteilungen",
      openGraphType: "article"
    },
    scope123EinfachErklaert: {
      title:
        "Scope 1, 2 und 3 einfach erklärt: Unterschiede & Beispiele | evipace",
      description:
        "Was ist der Unterschied zwischen Scope 1, 2 und 3? Einfache Erklärung mit konkreten Beispielen für produzierende Unternehmen und Überblick über die 15 Scope-3-Kategorien.",
      path: "/de/ressourcen/scope-1-2-3-einfach-erklaert",
      openGraphType: "article"
    },
    esgFragebogenChecklisteLieferanten: {
      title: "ESG-Fragebogen Checkliste für Lieferanten | evipace",
      description:
        "ESG-Fragebogen vom Kunden erhalten? Diese praktische Checkliste führt Sie von Scope und Datensammlung über Nachweise und Berechnungen bis zur finalen Prüfung.",
      path: "/de/ressourcen/esg-fragebogen-checkliste-lieferanten",
      openGraphType: "article"
    },
    esgNachweiseCheckliste: {
      title: "ESG-Nachweise prüfen: Checkliste für Lieferanten | evipace",
      description:
        "Prüfen Sie ESG-Nachweise systematisch auf Aussage, Gültigkeit, Zeitraum, Scope und Nachvollziehbarkeit – mit einer praktischen Checkliste für Lieferanten.",
      path: "/de/ressourcen/esg-nachweise-checkliste",
      openGraphType: "article"
    },
    scope12DatenerfassungsVorlage: {
      title: "Scope 1 & 2 Datenerfassungs-Vorlage | evipace",
      description:
        "Sammeln Sie Strom-, Brennstoff-, Fahrzeug-, Kältemittel- und Wärmedaten strukturiert für Ihre Scope-1-&-2-Berechnung – mit einer praktischen Vorlage.",
      path: "/de/ressourcen/scope-1-2-datenerfassungs-vorlage",
      openGraphType: "article"
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
