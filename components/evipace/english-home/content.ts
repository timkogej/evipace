export const scatteredSources = [
  { department: "Finance", source: "electricity / financial source data" },
  { department: "HR", source: "workforce data" },
  { department: "Quality", source: "certificates" },
  { department: "Facility", source: "refrigerant / technical records" },
  { department: "Procurement", source: "supplier information" },
  {
    department: "Policies",
    source: "distributed across departments or reflected in real practices"
  }
];

export const requestTypes = [
  "Excel questionnaire",
  "EcoVadis assessment",
  "IntegrityNext invitation",
  "Supplier portal",
  "Scope 1 and Scope 2 request",
  "Sustainability report",
  "Email requesting ESG documents"
];

export const requestQuestions = [
  "What are they asking for?",
  "Where does the information exist?",
  "Who owns it internally?",
  "What needs to be calculated?",
  "What evidence supports the answer?",
  "What is genuinely missing?"
];

export const services = [
  {
    number: "01",
    title: "Customer ESG requests",
    href: "/en/esg-customer-requests",
    body: "You received a sustainability request from a customer. We break it into concrete datapoints, identify the information required and prepare the response.",
    detail:
      "Customer Excel files · supplier portals · custom questionnaires · ESG data requests"
  },
  {
    number: "02",
    title: "ESG questionnaires",
    href: "/en/esg-questionnaire-support",
    body: "We prepare answers, supporting evidence and gaps for supplier assessments and questionnaires.",
    detail:
      "Including work connected to platforms such as EcoVadis and IntegrityNext, while remaining fully independent from those platforms."
  },
  {
    number: "03",
    title: "Scope 1 & 2",
    href: "/en/scope-1-2-calculation",
    body: "We turn electricity, fuel, refrigerant, heat and other activity data into a documented Scope 1 and Scope 2 calculation.",
    detail: "You receive the calculation basis — not just a final number."
  },
  {
    number: "04",
    title: "Sustainability reporting",
    href: "/en/vsme-sustainability-report",
    body: "We structure the company data required for voluntary sustainability reporting, including VSME and the current EU voluntary reporting framework.",
    detail:
      "The work starts with the underlying data, not with writing a polished PDF."
  },
  {
    number: "05",
    title: "Policies & documentation",
    body: "Where a real company practice exists but documentation is missing, we can prepare policy drafts and supporting documentation for internal review and adoption.",
    detail: "We do not invent practices or backdate evidence."
  },
  {
    number: "06",
    title: "Evidence preparation",
    body: "We connect statements to their underlying sources and supporting documents.",
    detail: "Claim → source → evidence"
  }
];

export const workflowSteps = [
  {
    number: "01",
    title: "Send us the request",
    body: "Forward the questionnaire, customer email, reporting requirement or documents you already have."
  },
  {
    number: "02",
    title: "We map what is needed",
    body: "We identify required datapoints, internal sources, responsible departments, calculations, evidence and genuine gaps."
  },
  {
    number: "03",
    title: "We prepare the work",
    body: "Depending on the project, that can include questionnaire answers, calculations, evidence mapping, policy drafts, data tables, reporting content and gap lists."
  },
  {
    number: "04",
    title: "Your company confirms the facts",
    body: "You review company-specific statements and anything requiring internal approval. For third-party platforms, your company retains control of its account and final submission."
  },
  {
    number: "05",
    title: "The output becomes reusable",
    body: "We structure the work so the same source data can support future customer requests, reporting and assessments, with appropriate review."
  }
];

export const manufacturingFunctions = [
  {
    title: "Finance",
    body: "energy invoices, fuel, company data"
  },
  {
    title: "Quality & Environment",
    body: "certificates, management systems, audits"
  },
  {
    title: "Operations & Facility",
    body: "equipment, refrigerants, water, production data"
  },
  {
    title: "HR",
    body: "workforce, training, health & safety inputs"
  },
  {
    title: "Procurement",
    body: "materials, suppliers, sourcing processes"
  },
  {
    title: "Management",
    body: "policies, targets, governance and approvals"
  }
];

export const reuseSteps = [
  "ESG datapoint",
  "Owner",
  "Source",
  "Reporting period",
  "Evidence",
  "Calculation",
  "Last review",
  "Reusable outputs"
];

export const qualityPrinciples = [
  {
    number: "01",
    title: "Source before statement",
    body: "A company claim should have an identifiable basis."
  },
  {
    number: "02",
    title: "Gaps stay gaps",
    body: "Missing information is documented rather than invented."
  },
  {
    number: "03",
    title: "Calculations stay traceable",
    body: "Activity data, units, factors, factor sources and assumptions remain visible."
  },
  {
    number: "04",
    title: "A draft is not a policy",
    body: "A document only becomes an adopted company policy after the appropriate internal review and approval."
  },
  {
    number: "05",
    title: "Technology accelerates the work",
    body: "We may use technology internally to extract, structure and prepare information. It does not replace human review."
  },
  {
    number: "06",
    title: "Your company remains the source of company facts",
    body: "Company-specific statements are based on your information and confirmed where necessary before final use."
  }
];

export const executionTasks = [
  "finding the data",
  "understanding the question",
  "chasing colleagues",
  "calculating metrics",
  "mapping evidence",
  "writing responses",
  "checking consistency"
];

export const deliverables = [
  "Prepared questionnaire answers",
  "Evidence map",
  "Scope 1 & 2 calculation basis",
  "Structured ESG datasets",
  "Gaps and missing-information list",
  "Assumptions and methodology notes",
  "Draft policies for internal approval",
  "Sustainability reporting content",
  "Reusable documentation for future requests"
];

/**
 * Platform-specific work that sits inside service 02 (ESG questionnaires)
 * but has its own page, because customers ask for these platforms by name.
 * Kept as a quiet strip under the services grid rather than as two more
 * cards, so the editorial masonry above stays as designed.
 */
export const platformServices = [
  {
    title: "EcoVadis support for suppliers",
    href: "/en/ecovadis-support",
    body: "Prepare EcoVadis questionnaire responses and the supporting evidence behind them, before your company submits."
  },
  {
    title: "IntegrityNext support for suppliers",
    href: "/en/integritynext-support",
    body: "Work through an IntegrityNext invitation: profile scope, assessments, certificates and the company data behind each answer."
  }
];

export const homeFaq = [
  {
    question: "What does Evipace do?",
    answer:
      "Evipace prepares the practical ESG work a manufacturing company or supplier is asked to produce: customer ESG requests and questionnaires, Scope 1 and Scope 2 calculations, voluntary sustainability reporting, policy drafts and supporting evidence. The work starts from the information the company already has, and every figure keeps its source, method and assumptions visible."
  },
  {
    question: "Who is Evipace for?",
    answer:
      "Manufacturing companies and industrial suppliers, typically small and mid-sized, that receive sustainability requirements from larger customers in European supply chains. It is built for companies with real operational data spread across Finance, HR, Quality, EHS, Operations and Procurement — not for companies with a dedicated sustainability department."
  },
  {
    question: "What kinds of ESG requests can Evipace handle?",
    answer:
      "Customer questionnaires and spreadsheets, supplier portal forms, platform invitations such as EcoVadis and IntegrityNext, emissions data requests, requests for policies or certificates, and voluntary sustainability reporting. If it arrived from a customer and asks for sustainability information, it is in scope."
  },
  {
    question: "Does Evipace support EcoVadis and IntegrityNext?",
    answer:
      "Yes, as an independent service provider. We help prepare the answers, company data and supporting evidence for both. Evipace is not affiliated with either platform, does not control scoring or document acceptance, and does not promise a score, medal or status. Your company keeps its platform account and makes the final submission."
  },
  {
    question: "Do we need an ESG system in place before starting?",
    answer:
      "No. Most companies start with scattered information rather than a system: invoices, certificates, HR records and practices that are real but undocumented. Identifying what exists, what has to be calculated and what is genuinely missing is the first part of the work."
  },
  {
    question: "What should we send to get started?",
    answer:
      "Whatever your customer sent you — the questionnaire, email, spreadsheet, PDF or platform export — plus any documents you already have. There is no need to rewrite the request, prepare a brief or decide which service you need first."
  }
];
