/**
 * Official primary sources referenced across the site.
 *
 * Every URL here is one that already appears in Evipace resource content
 * (components/evipace/resources/**) — this file exists so the service,
 * methodology and resource pages cite the same canonical address rather
 * than each keeping its own copy that can silently drift.
 *
 * Only official, first-party documentation belongs here: the standard
 * setter, the regulator, or the platform operator itself. No SEO blogs, no
 * aggregators, no secondary summaries.
 */
export const primarySources = {
  ghgCorporateStandard: {
    label: "GHG Protocol — Corporate Accounting and Reporting Standard",
    href: "https://ghgprotocol.org/corporate-standard"
  },
  ghgScope2Guidance: {
    label: "GHG Protocol — Scope 2 Guidance",
    href: "https://ghgprotocol.org/scope-2-guidance"
  },
  ghgScope3Standard: {
    label: "GHG Protocol — Corporate Value Chain (Scope 3) Standard",
    href: "https://ghgprotocol.org/corporate-value-chain-scope-3-standard"
  },
  efragVoluntaryStandard: {
    label: "EFRAG Knowledge Hub — Voluntary standard for non-listed SMEs",
    href: "https://knowledgehub.efrag.org/eng/interactive/voluntary-standard"
  },
  eurLexReportingDirective: {
    label: "EUR-Lex — Directive (EU) 2026/470",
    href: "https://eur-lex.europa.eu/eli/dir/2026/470/oj"
  },
  ecCsrd: {
    label:
      "European Commission — Corporate Sustainability Reporting Directive",
    href: "https://finance.ec.europa.eu/regulation-and-supervision/financial-services-legislation/implementing-and-delegated-acts/corporate-sustainability-reporting-directive_en"
  },
  ecovadisSupportingDocuments: {
    label: "EcoVadis Help Center — Understanding supporting documents",
    href: "https://support.ecovadis.com/hc/en-us/articles/210460307-Understanding-supporting-documents"
  },
  ecovadisDocumentLimit: {
    label: "EcoVadis Help Center — Why is the number of documents limited?",
    href: "https://support.ecovadis.com/hc/en-us/articles/115002646148-Why-is-the-number-of-documents-that-can-be-provided"
  },
  integrityNextCompletingAssessment: {
    label: "IntegrityNext Help Center — How do I complete the assessment?",
    href: "https://helpdesk.integritynext.com/hc/en-us/articles/360018443680-How-do-I-answer-complete-the-assessment"
  },
  integrityNextUpdatedAssessments: {
    label: "IntegrityNext Help Center — Updated assessments, please review",
    href: "https://helpdesk.integritynext.com/hc/en-us/articles/15190118617756-I-received-an-email-with-the-subject-Updated-Assessments-Please-Review-How-should-I-proceed"
  }
} as const;

export type PrimarySource = (typeof primarySources)[keyof typeof primarySources];
