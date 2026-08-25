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
