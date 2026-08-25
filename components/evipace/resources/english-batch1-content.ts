import type { EnglishResourceArticleContent } from "./EnglishResourceArticle";

const sendRequest = "/en/send-request";

export const customerQuestionnaireReceivedContent: EnglishResourceArticleContent = {
  eyebrow: "Customer ESG questionnaire",
  title: "Received an ESG questionnaire from a customer? Start here.",
  deck:
    "A practical first-response guide for suppliers that need to understand the request before answering it.",
  summary: [
    "Do not start by filling in every field. First confirm what the customer is asking for, which legal entity or site is in scope, which reporting period applies and whether supporting evidence is required.",
    "Most information is usually already somewhere inside the company. The work is to map each answer to the right owner, source and evidence, then leave real gaps visible for internal review."
  ],
  quickChecks: [
    {
      title: "Check scope first.",
      body:
        "Confirm the legal entity, sites or facilities, reporting period, deadline and required submission format."
    },
    {
      title: "Group the questions.",
      body:
        "Sort the request into energy, emissions, workforce, health and safety, policies, compliance, supply chain and evidence."
    },
    {
      title: "Find data owners.",
      body:
        "Finance, HR, Quality, EHS, Operations, Procurement and Management may each own part of the answer."
    },
    {
      title: "Do not hide gaps.",
      body:
        "Missing data, missing evidence and unclear questions should be marked as such. A gap can be closed; it should not be rewritten as history."
    }
  ],
  nav: [
    ["01", "First check", "#first-check"],
    ["02", "Data owners", "#data-owners"],
    ["03", "Answer map", "#answer-map"],
    ["04", "Evidence", "#evidence"],
    ["05", "Gaps", "#gaps"],
    ["06", "Internal review", "#internal-review"],
    ["07", "First 24 hours", "#first-24-hours"]
  ].map(([number, label, href]) => ({ number, label, href })),
  sections: [
    {
      id: "first-check",
      number: "01",
      title: "First: do not answer field by field.",
      paragraphs: [
        "A customer ESG questionnaire can look like a long administrative task. In practice, the first risk is answering too quickly. If the scope is unclear, even a technically correct data point can become the wrong answer.",
        "Before you open the spreadsheet or portal, capture the basic control information: who asked, why they asked, which company entity is expected to answer, which sites are included, which year is requested, what the deadline is and whether documents need to be uploaded."
      ],
      bullets: [
        "Customer name and contact person",
        "Legal entity or group scope",
        "Sites, facilities or business units included",
        "Reporting period",
        "Submission format: spreadsheet, PDF, portal or email",
        "Required supporting evidence",
        "Mandatory fields and customer-specific instructions"
      ],
      principle: {
        text:
          "The first deliverable is not an answer. It is a clear reading of the request."
      }
    },
    {
      id: "data-owners",
      number: "02",
      title: "The information is usually distributed across the business.",
      paragraphs: [
        "Supplier ESG requests rarely belong to one department. Finance may hold energy invoices, HR may hold workforce data, Quality may hold certificates, EHS may hold safety and environmental records, and Management may need to confirm policies or responsibilities.",
        "Treat each question as an internal routing task. The person who can provide a source is not always the same person who can approve the final company statement."
      ],
      cards: [
        {
          title: "Finance",
          body:
            "Energy invoices, fuel costs, financial company information and sometimes waste or water cost records."
        },
        {
          title: "HR",
          body:
            "Headcount, FTE, training, workforce structure, health and safety records and HR policies."
        },
        {
          title: "Quality / EHS",
          body:
            "Management system certificates, audits, environmental procedures, safety records and operating controls."
        },
        {
          title: "Management",
          body:
            "Formal policies, responsibilities, company commitments, targets and final confirmation of company statements."
        }
      ],
      links: [
        {
          label: "See what customers usually ask suppliers for",
          href: "/en/resources/esg-data-customers-request-from-suppliers"
        },
        {
          label: "Use the ESG Questionnaire Checklist",
          href: "/en/resources/esg-questionnaire-checklist"
        }
      ]
    },
    {
      id: "answer-map",
      number: "03",
      title: "Build a simple answer map.",
      paragraphs: [
        "An answer map prevents the questionnaire from becoming a collection of unsupported statements. For each question, record the requested information, internal owner, source document, evidence, status and reviewer.",
        "This does not need to be complicated. The important point is that the final response can be traced back to the underlying company information."
      ],
      bullets: [
        "Question or field",
        "Requested information or KPI",
        "Internal data owner",
        "Source document or system",
        "Supporting evidence",
        "Status: available, calculate, confirm, missing or unclear",
        "Internal reviewer or approver"
      ],
      principle: {
        label: "Evidence logic",
        text: "Statement - source - evidence."
      }
    },
    {
      id: "evidence",
      number: "04",
      title: "Prepare answers and supporting evidence together.",
      paragraphs: [
        "Many customer questionnaires ask for a yes/no answer, a number and a document. If the document is collected only at the end, inconsistencies are easy to miss.",
        "A policy, certificate, invoice, calculation or report should support the specific answer being given. It should also match the company scope and reporting period where those details matter."
      ],
      bullets: [
        "A certificate may support a certified management system, but not every activity under that topic.",
        "A group policy may not automatically cover every subsidiary or site.",
        "A current policy does not prove that the same policy existed in a previous year.",
        "A calculation should keep activity data, emission factor, CO2e result and assumptions traceable."
      ],
      links: [
        {
          label: "Understand ESG evidence for suppliers",
          href: "/en/resources/esg-evidence-for-suppliers"
        },
        {
          label: "Check whether one evidence document is usable",
          href: "/en/resources/esg-evidence-readiness-check"
        }
      ]
    },
    {
      id: "gaps",
      number: "05",
      title: "Treat missing information as a real status.",
      paragraphs: [
        "A missing policy, missing KPI or missing source document is not unusual. It should be shown clearly so the company can decide whether to close the gap, explain it, or mark the answer as not currently available.",
        "Do not turn a newly written document into historical evidence. If a policy is drafted today, it can become a current approved policy after proper internal review. It should not be presented as proof that the same policy existed in an earlier reporting period."
      ],
      principle: {
        text:
          "A gap can be closed. It should not be rewritten as though it never existed."
      }
    },
    {
      id: "internal-review",
      number: "06",
      title: "Use internal confirmation before submission.",
      paragraphs: [
        "The final response is a company statement. It should be checked by the people who own the facts and by the person responsible for releasing the answer to the customer.",
        "The review should look for scope mismatches, old documents, unsupported yes/no answers, inconsistent figures, missing assumptions and answers that overstate what the company can evidence."
      ],
      bullets: [
        "Does the answer match the requested legal entity or site?",
        "Does the period match the customer request?",
        "Is the supporting evidence current and relevant?",
        "Are calculated figures traceable?",
        "Are gaps and assumptions visible?",
        "Has the responsible person confirmed the final answer?"
      ]
    },
    {
      id: "first-24-hours",
      number: "07",
      title: "A practical order for the first 24 hours.",
      paragraphs: [
        "If the deadline is close, do not try to build a full ESG system before you know what the customer needs. Triage the request, assign owners and decide which answers can be prepared from existing sources.",
        "Then prepare the response package: answer map, documents, calculations, unresolved questions and items that need management confirmation."
      ],
      bullets: [
        "Save the original customer request and attachments.",
        "Confirm scope, period, deadline and format.",
        "Sort questions by topic and owner.",
        "Mark fields that require evidence or calculation.",
        "Request source documents from internal owners.",
        "Identify real data gaps and evidence gaps.",
        "Review the final response before it is submitted."
      ],
      links: [
        {
          label: "Get help preparing this questionnaire",
          href: "/en/esg-questionnaire-support"
        },
        { label: "Send the ESG questionnaire to evipace", href: sendRequest },
        { label: "See how evipace works", href: "/en/methodology" }
      ]
    }
  ],
  cta: {
    eyebrow: "From request to response",
    title: "Your customer has already sent the questionnaire?",
    body:
      "Send us the original request. We can map the questions, identify required data and evidence, prepare calculations where needed and structure the response for your internal confirmation.",
    primaryLabel: "Send the questionnaire",
    primaryHref: sendRequest,
    secondaryLabel: "ESG questionnaire support",
    secondaryHref: "/en/esg-questionnaire-support"
  },
  faq: [
    {
      question: "Should we answer the questionnaire immediately?",
      answer:
        "Not before checking the scope, deadline, reporting period, required evidence and internal owners. Quick answers are risky when the customer is asking about a specific legal entity, site or year."
    },
    {
      question: "What if we do not have all ESG data yet?",
      answer:
        "Mark the missing information as a data gap or evidence gap. The company can then decide whether to collect data, prepare a current document, explain the limitation or answer that the information is not currently available."
    },
    {
      question: "Can evipace submit the answer for us?",
      answer:
        "Evipace can prepare the information, evidence mapping and draft response. The final company facts and any platform submission remain under the company's control."
    }
  ],
  sources: [
    {
      label: "EcoVadis Help Center - Understanding supporting documents",
      href:
        "https://support.ecovadis.com/hc/en-us/articles/210460307-Understanding-supporting-documents"
    },
    {
      label: "EFRAG Knowledge Hub - Voluntary standard",
      href: "https://knowledgehub.efrag.org/eng/interactive/voluntary-standard"
    }
  ]
};

export const esgDataCustomersRequestContent: EnglishResourceArticleContent = {
  eyebrow: "Supplier ESG data",
  title: "What ESG data do customers ask suppliers for?",
  deck:
    "A practical overview of the ESG information customers often request from manufacturing suppliers.",
  summary: [
    "There is no universal ESG data list that applies to every supplier. The exact request depends on the customer, industry, product, geography, site scope and platform.",
    "Still, many requests cluster around the same categories: company and site data, energy, greenhouse gas emissions, environmental information, workforce topics, health and safety, human rights, policies, ethics, supply chain and supporting evidence."
  ],
  quickChecks: [
    {
      title: "Not every category applies.",
      body:
        "Use the categories as orientation, not as a universal checklist for every supplier."
    },
    {
      title: "Data and evidence differ.",
      body:
        "A number answers one question. A source document or calculation trail supports how that number was prepared."
    },
    {
      title: "Scope changes the answer.",
      body:
        "A site figure, entity figure and group figure are not interchangeable."
    },
    {
      title: "Policies are not implementation.",
      body:
        "A policy can document a formal commitment. It does not automatically prove that all measures are operating."
    }
  ],
  nav: [
    ["01", "Categories", "#categories"],
    ["02", "Energy and CO2e", "#energy-emissions"],
    ["03", "Workforce", "#workforce"],
    ["04", "Policies", "#policies"],
    ["05", "Evidence", "#evidence"],
    ["06", "Workflow", "#workflow"]
  ].map(([number, label, href]) => ({ number, label, href })),
  sections: [
    {
      id: "categories",
      number: "01",
      title: "The common categories in supplier ESG requests.",
      paragraphs: [
        "Customers usually ask for information that helps them understand the supplier's sustainability, compliance and operational risk profile. The request may be a short spreadsheet, a detailed ESG questionnaire, a procurement portal or a supplier assessment platform.",
        "The categories below are common, but they are not mandatory in every case. A small component supplier, a multi-site manufacturer and a service provider will not always receive the same request."
      ],
      cards: [
        {
          title: "Company and site information",
          body:
            "Legal entity, address, sites, countries of operation, headcount, activities, reporting period and scope of the data."
        },
        {
          title: "Environmental data",
          body:
            "Energy, emissions, water, waste, recycling, chemicals, incidents, permits and environmental management systems where relevant."
        },
        {
          title: "People and safety",
          body:
            "Headcount, FTE, training, working conditions, health and safety processes, incidents and relevant HR policies."
        },
        {
          title: "Governance and supply chain",
          body:
            "Ethics, anti-corruption, grievance channels, supplier requirements, procurement controls and compliance responsibilities."
        }
      ]
    },
    {
      id: "energy-emissions",
      number: "02",
      title: "Energy and greenhouse gas emissions.",
      paragraphs: [
        "Energy and emissions are among the most frequent quantitative requests. Customers may ask for electricity consumption, fuels, purchased heat, renewable energy share, Scope 1, Scope 2 and, where relevant, selected Scope 3 information.",
        "For emissions, the final CO2e number is not enough. The calculation should keep the boundary, activity data, emission factors, methodology, source documents and assumptions traceable."
      ],
      bullets: [
        "Electricity consumption in kWh",
        "Natural gas, heating oil, diesel or other fuels",
        "Company vehicles and fuel cards",
        "Purchased heat, steam or cooling",
        "Refrigerants where relevant",
        "Scope 1 and Scope 2 emissions",
        "Emission factors and calculation method",
        "Reporting year and site or entity scope"
      ],
      principle: {
        label: "Carbon logic",
        text: "Boundary - activity data - emission factor - CO2e - method."
      }
    },
    {
      id: "workforce",
      number: "03",
      title: "Workforce, health and safety, and human rights.",
      paragraphs: [
        "Customers often ask for social data because suppliers are part of their wider value chain. The request may be simple, such as headcount, or more detailed, such as accident indicators, training, complaints channels or human rights policies.",
        "Definitions matter. Headcount, average headcount and FTE are not the same thing. A safety incident rate may require a specific formula and reporting period."
      ],
      bullets: [
        "Number of employees, headcount or FTE",
        "Employment types and workforce composition",
        "Training records",
        "Occupational health and safety processes",
        "Accidents, lost days and safety indicators where requested",
        "Human rights, non-discrimination and grievance mechanisms",
        "Relevant policies and internal responsibilities"
      ]
    },
    {
      id: "policies",
      number: "04",
      title: "Policies, targets and measures are separate concepts.",
      paragraphs: [
        "Many ESG requests ask whether the company has a policy, a target or a measure. These should not be collapsed into one answer.",
        "An approved policy shows a formal company position. A target states an intended outcome. A procedure or measure describes how something is managed. Evidence should match the exact claim being made."
      ],
      bullets: [
        "Environmental Policy",
        "Health & Safety Policy",
        "Human Rights Policy",
        "Code of Conduct",
        "Anti-Corruption Policy",
        "Supplier Code of Conduct",
        "Sustainable Procurement Policy",
        "Targets, measures and management review records where applicable"
      ],
      principle: {
        text: "Policy is not the same as implementation, and implementation is not the same as evidence."
      }
    },
    {
      id: "evidence",
      number: "05",
      title: "Customers may also ask for supporting evidence.",
      paragraphs: [
        "A customer may ask for documents that support the answers. Typical examples include policies, certificates, invoices, calculation files, audit reports, training records, procedures and KPI reports.",
        "A document only helps if it supports the specific answer, belongs to the right company or site, covers the relevant period and is current enough for the request."
      ],
      links: [
        {
          label: "See ESG evidence for suppliers",
          href: "/en/resources/esg-evidence-for-suppliers"
        },
        {
          label: "Get help with a customer ESG request",
          href: "/en/esg-customer-requests"
        }
      ]
    },
    {
      id: "workflow",
      number: "06",
      title: "Use the customer request to decide what to collect.",
      paragraphs: [
        "Do not build a complete ESG data system before you know what the customer actually needs. Start with the request, map the required data, identify data owners, find the source documents, prepare the answer and then review it internally.",
        "The same underlying information can often be reused for later questionnaires, but it should be rechecked against the new context each time."
      ],
      bullets: [
        "Read the exact customer request.",
        "Confirm scope and reporting period.",
        "Map each field to a data owner.",
        "Collect source documents and supporting evidence.",
        "Prepare calculations where required.",
        "Record data gaps and evidence gaps.",
        "Get internal confirmation before submission."
      ],
      links: [
        {
          label: "Start with a received ESG questionnaire",
          href: "/en/resources/customer-esg-questionnaire-received"
        }
      ]
    }
  ],
  cta: {
    eyebrow: "Customer request received",
    title: "Need to turn the data request into answers?",
    body:
      "Send us the customer questionnaire or data list. We can structure the request, identify required data owners and prepare a response package for internal review.",
    primaryLabel: "Send the ESG request",
    primaryHref: sendRequest,
    secondaryLabel: "Customer ESG request support",
    secondaryHref: "/en/esg-customer-requests"
  },
  faq: [
    {
      question: "Do all customers ask for the same ESG data?",
      answer:
        "No. Many requests use similar categories, but the exact fields depend on the customer, platform, industry, company scope and supplier relationship."
    },
    {
      question: "Do suppliers always need Scope 3 data?",
      answer:
        "No. Scope 3 may be requested in some situations, but many supplier requests focus first on company information, energy, Scope 1, Scope 2, policies and evidence."
    },
    {
      question: "Is a sustainability report enough to answer customer requests?",
      answer:
        "It may help if it contains relevant and current information, but it does not automatically answer every customer field. Each request still needs to be checked against scope, period and evidence."
    }
  ],
  sources: [
    {
      label: "EFRAG Knowledge Hub - Voluntary standard",
      href: "https://knowledgehub.efrag.org/eng/interactive/voluntary-standard"
    }
  ]
};

export const esgEvidenceForSuppliersContent: EnglishResourceArticleContent = {
  eyebrow: "ESG evidence for suppliers",
  title: "ESG evidence for suppliers: what documents actually support your answers?",
  deck:
    "A practical guide to matching ESG statements with sources, documents, scope and reporting periods.",
  summary: [
    "Supporting evidence is not just any document that mentions sustainability. It needs to support the specific answer being made.",
    "The core check is simple: what is the statement, what is the source, what document or calculation supports it, and does that evidence match the company, site, period and claim?"
  ],
  quickChecks: [
    {
      title: "Match the claim.",
      body:
        "A certificate, policy or report must support the exact statement, not just the general topic."
    },
    {
      title: "Check scope.",
      body:
        "Evidence for one site, facility or legal entity may not support a group-wide answer."
    },
    {
      title: "Check period.",
      body:
        "Current documents and historical reporting periods should not be mixed without explanation."
    },
    {
      title: "Check approval.",
      body:
        "A draft policy, template or working file is not the same as an approved company document."
    }
  ],
  nav: [
    ["01", "Evidence logic", "#evidence-logic"],
    ["02", "Document types", "#document-types"],
    ["03", "Policy limits", "#policy-limits"],
    ["04", "Carbon trail", "#carbon-trail"],
    ["05", "Weak evidence", "#weak-evidence"],
    ["06", "Evidence register", "#evidence-register"]
  ].map(([number, label, href]) => ({ number, label, href })),
  sections: [
    {
      id: "evidence-logic",
      number: "01",
      title: "Start with the statement, not the document folder.",
      paragraphs: [
        "Evidence should be selected after you understand the answer it needs to support. A broad sustainability brochure may be useful background, but it is weak evidence for a specific KPI, policy status or site-level claim.",
        "For each answer, ask what exactly is being claimed, where the information came from and what document, calculation or record supports that claim."
      ],
      principle: {
        label: "Evidence logic",
        text: "Answer - source - supporting evidence - scope - period - review."
      }
    },
    {
      id: "document-types",
      number: "02",
      title: "Different document types support different claims.",
      paragraphs: [
        "Supplier ESG evidence can include policies, certificates, procedures, audit reports, invoices, KPI reports, calculations, training records and internal approvals. These documents are not interchangeable.",
        "A certificate may show that a management system is certified for a defined scope. An invoice may support activity data. A calculation file may support CO2e. A policy may show a formal commitment, not every operational action."
      ],
      cards: [
        {
          title: "Policies",
          body:
            "Can support formal commitments if approved, current and applicable to the right entity or scope."
        },
        {
          title: "Certificates",
          body:
            "Can support a certified management system within the certificate's stated scope and validity period."
        },
        {
          title: "Calculations",
          body:
            "Can support KPIs when activity data, method, factors, assumptions and result remain traceable."
        },
        {
          title: "Operational records",
          body:
            "Can support implementation where the record actually documents the process, training, audit or control."
        }
      ]
    },
    {
      id: "policy-limits",
      number: "03",
      title: "A policy is not evidence of everything under that topic.",
      paragraphs: [
        "Policies are often requested, and they can be important. But a policy does not automatically prove implementation, performance, training or historical practice.",
        "If a policy is missing, the company may create one to reflect its current decisions and responsibilities. That new document should be treated as current evidence after proper approval, not as proof that the policy existed earlier."
      ],
      principle: {
        text: "Policy is not implementation. Implementation is not evidence unless there is a source that shows it."
      }
    },
    {
      id: "carbon-trail",
      number: "04",
      title: "Emissions evidence needs a calculation trail.",
      paragraphs: [
        "For greenhouse gas answers, a final CO2e number is only part of the evidence. The supporting file should show the boundary, activity data, source documents, emission factors, method and assumptions.",
        "This is especially important when the questionnaire asks for Scope 1, Scope 2, renewable electricity, market-based or location-based calculations, or site-specific emissions."
      ],
      bullets: [
        "Boundary: entity, site, facility or group",
        "Activity data: kWh, litres, tonnes, kilometres or other inputs",
        "Source: invoice, meter, fuel card, supplier statement or system extract",
        "Emission factor: source and year",
        "Calculation: how the CO2e result was produced",
        "Review: who checked the figure and assumptions"
      ]
    },
    {
      id: "weak-evidence",
      number: "05",
      title: "Some documents look useful but do not support the answer.",
      paragraphs: [
        "Weak evidence is not always false. It is often just too broad, too old, not approved, not connected to the right scope or not specific enough for the answer.",
        "The safest approach is to state what the document actually supports and not stretch it beyond that."
      ],
      bullets: [
        "General marketing brochures",
        "Unapproved policy templates",
        "Old certificates outside their validity period",
        "Group documents used for a site without confirming coverage",
        "Screenshots with no source, date or scope",
        "Documents created after the period they are supposed to evidence"
      ],
      principle: {
        text: "Do not use a document to say more than the document can support."
      }
    },
    {
      id: "evidence-register",
      number: "06",
      title: "Keep an evidence register for reuse.",
      paragraphs: [
        "A simple evidence register makes future customer requests easier. It records which document supports which statement, the applicable scope, owner, validity and any limitation.",
        "Reuse the underlying information, not the answer blindly. A new customer may ask for a different period, site, platform format or evidence type."
      ],
      bullets: [
        "Evidence name",
        "Supported statement",
        "Legal entity, site or group scope",
        "Reporting period or validity",
        "Internal owner",
        "Approval status",
        "Known limitations"
      ],
      links: [
        {
          label: "Get questionnaire support",
          href: "/en/esg-questionnaire-support"
        },
        {
          label: "Use evidence when responding to a questionnaire",
          href: "/en/resources/customer-esg-questionnaire-received"
        }
      ]
    }
  ],
  cta: {
    eyebrow: "Evidence review",
    title: "Need to know which documents support your answers?",
    body:
      "Send the customer request and available documents. We can map each statement to its source, identify evidence gaps and prepare a response package for internal confirmation.",
    primaryLabel: "Send the evidence request",
    primaryHref: sendRequest,
    secondaryLabel: "ESG questionnaire support",
    secondaryHref: "/en/esg-questionnaire-support"
  },
  faq: [
    {
      question: "What counts as ESG evidence?",
      answer:
        "It depends on the answer. Evidence may include policies, certificates, invoices, calculations, procedures, training records, audit reports or other documents if they support the specific statement, scope and period."
    },
    {
      question: "Is a policy enough evidence?",
      answer:
        "A policy can support a formal commitment if it is approved and applicable. It does not automatically prove implementation, performance or historical practice."
    },
    {
      question: "Can a new document close a gap?",
      answer:
        "Yes, a company can close a current gap by creating and approving a real document or process. It should not be presented as historical evidence unless it actually existed in that period."
    }
  ],
  sources: [
    {
      label: "EcoVadis Help Center - Understanding supporting documents",
      href:
        "https://support.ecovadis.com/hc/en-us/articles/210460307-Understanding-supporting-documents"
    }
  ]
};

export const ecovadisDocumentsEvidenceContent: EnglishResourceArticleContent = {
  eyebrow: "EcoVadis evidence",
  title: "EcoVadis documents and evidence: what suppliers should prepare.",
  deck:
    "A supplier-side guide to preparing relevant documents without overstating what they prove.",
  summary: [
    "EcoVadis assessments connect answers with supporting documents. The useful question is not how many files you can upload, but which documents actually support the answers within the assessment scope.",
    "Evipace is independent from EcoVadis. We can help suppliers structure information and evidence, but EcoVadis controls its platform, methodology and assessment outcomes."
  ],
  quickChecks: [
    {
      title: "Check assessment scope.",
      body:
        "Company, group or site scope must match the assessment being answered."
    },
    {
      title: "Prioritise relevance.",
      body:
        "A smaller set of strong documents is usually better than a large set of weak or unrelated files."
    },
    {
      title: "Respect document rules.",
      body:
        "The current Sustainability Rating limit is 55 new documents per assessment."
    },
    {
      title: "Do not manufacture history.",
      body:
        "New policies can close current gaps, but they should not be presented as historical evidence."
    }
  ],
  nav: [
    ["01", "Why documents matter", "#why-documents"],
    ["02", "Document types", "#document-types"],
    ["03", "55-document limit", "#document-limit"],
    ["04", "Policies", "#policies"],
    ["05", "Currency", "#currency"],
    ["06", "Evidence register", "#evidence-register"]
  ].map(([number, label, href]) => ({ number, label, href })),
  sections: [
    {
      id: "why-documents",
      number: "01",
      title: "EcoVadis evidence starts with the answer.",
      paragraphs: [
        "A supporting document should help substantiate a selected answer. It should not merely mention the same ESG topic somewhere in the file.",
        "For suppliers, the practical workflow is to read the question, understand the assessment scope, choose the answer that reflects actual company practice and then attach documents that support that answer."
      ],
      principle: {
        text: "Answer option - required evidence - existing source - gap."
      }
    },
    {
      id: "document-types",
      number: "02",
      title: "What documents can be relevant for EcoVadis?",
      paragraphs: [
        "Relevant documents may include policies, certificates, procedures, action plans, audit reports, KPI reports, sustainability reports, training records and third-party documents.",
        "The document type should fit the claim. A certificate, a policy and a KPI report each support different kinds of answers."
      ],
      cards: [
        {
          title: "Policies",
          body:
            "Environmental, health and safety, ethics, human rights or sustainable procurement policies where approved and applicable."
        },
        {
          title: "Certificates",
          body:
            "For example ISO 14001, ISO 45001 or other relevant certificates within their stated scope and validity."
        },
        {
          title: "Actions and procedures",
          body:
            "Documented processes, controls, risk assessments, training programmes or other operational evidence."
        },
        {
          title: "Reporting and KPIs",
          body:
            "Energy, emissions, water, waste, safety and other ESG reporting where the source and period are clear."
        }
      ],
      links: [
        {
          label: "See the general evidence guide",
          href: "/en/resources/esg-evidence-for-suppliers"
        }
      ]
    },
    {
      id: "document-limit",
      number: "03",
      title: "The 55-document limit changes the evidence strategy.",
      paragraphs: [
        "For the EcoVadis Sustainability Rating, the current published rule sets a limit of 55 new documents per assessment. Documents from previous assessments do not count toward the new upload allowance, but may still be considered if valid.",
        "This makes selection important. Do not upload every available file. Prioritise documents that are relevant, current, formal, readable and connected to multiple answers where they genuinely support them."
      ],
      principle: {
        text: "The best evidence pack is not the biggest one."
      }
    },
    {
      id: "policies",
      number: "04",
      title: "Policies must be real company documents.",
      paragraphs: [
        "A useful policy normally has a clear scope, owner, date, internal approval and content that reflects actual company decisions.",
        "A newly created policy can be legitimate if the company has genuinely adopted it. It should not be backdated or treated as proof that the policy was in force before it was approved."
      ],
      principle: {
        label: "Correct chronology",
        text:
          "Actual company decision - draft - review - approval - current policy."
      }
    },
    {
      id: "currency",
      number: "05",
      title: "Check age, validity and machine readability.",
      paragraphs: [
        "EcoVadis applies different currency expectations to different document types. Policies and actions are generally treated as usable up to eight years, while KPI and results reporting is generally treated as usable up to two years.",
        "Documents should also be readable. Where possible, use digital, text-based files rather than scans or photos, because machine-readable documents are easier to process."
      ],
      bullets: [
        "Is the company name clear?",
        "Is the document date or validity period clear?",
        "Does the scope match the assessed entity or site?",
        "Can the relevant content be found quickly?",
        "Is the file a real existing document rather than an artificial bundle?"
      ]
    },
    {
      id: "evidence-register",
      number: "06",
      title: "Use an EcoVadis evidence register before uploading.",
      paragraphs: [
        "An internal register helps decide which documents to upload and how they connect to answers. It also prevents last-minute file dumping.",
        "After the assessment, do not discard the library. The same documents may be useful for future customer ESG requests, but each future use should still be checked against scope, period and question wording."
      ],
      bullets: [
        "Document name",
        "EcoVadis theme",
        "Supported answer or topic",
        "Assessment scope",
        "Period or validity",
        "Owner",
        "Status: ready, review, gap"
      ]
    }
  ],
  cta: {
    eyebrow: "EcoVadis preparation",
    title: "Preparing an EcoVadis assessment?",
    body:
      "Send us the questionnaire, document list or customer request. We can help map answer options to existing evidence and identify real gaps before submission.",
    primaryLabel: "Send the EcoVadis request",
    primaryHref: sendRequest,
    secondaryLabel: "EcoVadis Support",
    secondaryHref: "/en/ecovadis-support"
  },
  faq: [
    {
      question: "How many documents can be uploaded to EcoVadis?",
      answer:
        "The current Sustainability Rating limit is 55 new documents per assessment. Documents from earlier assessments do not count toward that new allowance, but should still be checked for validity and relevance."
    },
    {
      question: "Can one document support several answers?",
      answer:
        "Yes, if the document genuinely supports each answer. A consolidated sustainability report may contain several relevant disclosures, but unrelated documents should not be artificially combined to bypass the limit."
    },
    {
      question: "Can evipace guarantee EcoVadis acceptance or a score?",
      answer:
        "No. EcoVadis controls its assessment, methodology and recognition of documents. Evipace can support preparation, mapping and review, but does not guarantee acceptance, medals, scores or platform outcomes."
    }
  ],
  sources: [
    {
      label: "EcoVadis Help Center - Understanding supporting documents",
      href:
        "https://support.ecovadis.com/hc/en-us/articles/210460307-Understanding-supporting-documents"
    },
    {
      label: "EcoVadis Help Center - Why is there a document limit?",
      href:
        "https://support.ecovadis.com/hc/en-us/articles/115002646148-Why-is-the-number-of-documents-that-can-be-submitted-limited"
    },
    {
      label: "EcoVadis Help Center - Preparing machine-readable documents",
      href:
        "https://support.ecovadis.com/hc/en-us/articles/28380694175890-Preparing-machine-readable-documents-for-your-EcoVadis-assessment"
    }
  ]
};

export const integrityNextInvitationContent: EnglishResourceArticleContent = {
  eyebrow: "IntegrityNext supplier invitation",
  title: "Received an IntegrityNext invitation? A practical guide for suppliers.",
  deck:
    "How to understand the customer request, organise internal inputs and prepare evidence before the company submits through its own profile.",
  summary: [
    "An IntegrityNext invitation usually means a customer wants sustainability or compliance information from your company through the platform.",
    "Start by checking who invited you, which company profile is in scope, which assessments are requested and whether a certificate, questionnaire or supporting document is needed for each topic."
  ],
  quickChecks: [
    {
      title: "Identify the customer.",
      body:
        "The platform sends the invitation, but the underlying request comes from a business partner."
    },
    {
      title: "Check your profile.",
      body:
        "Company name, legal entity, site and basic information should match the entity expected to respond."
    },
    {
      title: "Review requested assessments.",
      body:
        "Only the assessments required for your profile or customer request need to be prepared."
    },
    {
      title: "Keep submission control internal.",
      body:
        "Evipace can prepare information and evidence; the company reviews and submits through its own IntegrityNext profile."
    }
  ],
  nav: [
    ["01", "What the invitation means", "#invitation"],
    ["02", "Profile scope", "#profile-scope"],
    ["03", "Certificate or questionnaire", "#certificate-questionnaire"],
    ["04", "Internal owners", "#internal-owners"],
    ["05", "Evidence", "#evidence"],
    ["06", "Validation", "#validation"]
  ].map(([number, label, href]) => ({ number, label, href })),
  sections: [
    {
      id: "invitation",
      number: "01",
      title: "The invitation is a customer request.",
      paragraphs: [
        "IntegrityNext is the platform used to collect the information, but the business reason is a customer asking for supplier sustainability and compliance information.",
        "Before answering, identify the requesting customer, the business relationship, the deadline and the topics that are actually requested."
      ],
      principle: {
        text:
          "Platform invitation - customer requirement - company scope - requested assessments."
      }
    },
    {
      id: "profile-scope",
      number: "02",
      title: "Check the company profile and scope first.",
      paragraphs: [
        "Basic company details matter because the answers belong to a specific supplier profile. If the profile represents one legal entity or site, do not answer as though it covers a different entity or the full group unless that is actually the intended scope.",
        "This is also where internal responsibilities become clear. A small company may have one coordinator; a manufacturing supplier often needs Quality, HR, EHS, Procurement, Finance and Management inputs."
      ],
      bullets: [
        "Company name and legal entity",
        "Site or facility where relevant",
        "Customer requesting access",
        "Requested topics or assessments",
        "Existing certificates",
        "Colleagues who need profile access or review"
      ]
    },
    {
      id: "certificate-questionnaire",
      number: "03",
      title: "For each topic, check whether a certificate or questionnaire is required.",
      paragraphs: [
        "For some assessment topics, a relevant management system certificate may be used. If no appropriate certificate exists, the supplier may need to answer the questionnaire for that topic.",
        "A missing certificate does not automatically mean poor business practice. It means the company needs to answer based on its actual processes and available evidence."
      ],
      cards: [
        {
          title: "Environment",
          body:
            "A relevant certificate may help if it covers the right entity and scope. Otherwise, prepare answers from actual environmental practice."
        },
        {
          title: "Health and safety",
          body:
            "Use certificates, policies, safety procedures, training and incident records where they match the requested topic."
        },
        {
          title: "Ethics and compliance",
          body:
            "Code of Conduct, anti-corruption rules, responsibilities and reporting channels may be relevant."
        },
        {
          title: "Carbon or environment data",
          body:
            "Energy data, emissions calculations and supporting sources may be needed depending on the assessment."
        }
      ]
    },
    {
      id: "internal-owners",
      number: "04",
      title: "Bring in the right internal owners.",
      paragraphs: [
        "IntegrityNext work often fails when one person tries to answer every topic from memory. Treat the assessment like a structured internal request.",
        "The coordinator can manage the workflow, but the answer should be checked by the people who own the underlying company facts."
      ],
      bullets: [
        "Quality or EHS for certificates and management systems",
        "HR or HSE for workforce and safety information",
        "Compliance or Management for ethics and responsibilities",
        "Procurement for supplier requirements",
        "Finance or Operations for energy and emissions inputs",
        "Management for final confirmation of company statements"
      ]
    },
    {
      id: "evidence",
      number: "05",
      title: "Prepare supporting evidence beside the answers.",
      paragraphs: [
        "Policies, certificates, procedures and data files should support the answer being given. A document should not be attached merely because it looks sustainability-related.",
        "If a document is missing, mark the gap. A new policy or process can be prepared if it reflects the actual company decision, but it should not be presented as historical evidence."
      ],
      principle: {
        text: "Answer from actual practice. Attach evidence that can support that answer."
      },
      links: [
        {
          label: "See ESG evidence for suppliers",
          href: "/en/resources/esg-evidence-for-suppliers"
        }
      ]
    },
    {
      id: "validation",
      number: "06",
      title: "After submission, keep the profile current.",
      paragraphs: [
        "Certificates can expire, assessments can be updated and the platform may request clarification if answers or documents need improvement.",
        "If there is a validation request or updated assessment, treat it as a new scoped request: understand what changed, identify the missing information and prepare a corrected answer for internal review."
      ],
      bullets: [
        "Track certificate validity dates.",
        "Keep core company information up to date.",
        "Review updated assessment requests before reusing old answers.",
        "Resolve validation questions with specific documents or corrected answers.",
        "Keep the final platform submission under company control."
      ],
      links: [
        {
          label: "Send the IntegrityNext request to evipace",
          href: sendRequest
        }
      ]
    }
  ],
  cta: {
    eyebrow: "IntegrityNext support",
    title: "Need help preparing the supplier response?",
    body:
      "Send the invitation, assessment topics or exported questions. We can prepare the information, evidence map and draft answers for your internal review. Your company remains responsible for final platform submission.",
    primaryLabel: "Send the IntegrityNext invitation",
    primaryHref: sendRequest,
    secondaryLabel: "IntegrityNext Support",
    secondaryHref: "/en/integritynext-support"
  },
  faq: [
    {
      question: "Why did we receive an IntegrityNext invitation?",
      answer:
        "A customer or business partner wants to collect sustainability or compliance information about your company through IntegrityNext."
    },
    {
      question: "Do we need certificates for IntegrityNext?",
      answer:
        "Not always. A suitable certificate may be used for certain topics if it fits the assessment. If no certificate exists, the relevant questionnaire can usually be answered based on actual company practice."
    },
    {
      question: "Who submits the information in IntegrityNext?",
      answer:
        "When evipace supports the work, we prepare information, evidence and draft answers. The company reviews the facts and handles submission or approval through its own IntegrityNext profile."
    },
    {
      question: "Can evipace guarantee an IntegrityNext result?",
      answer:
        "No. Evipace is independent from IntegrityNext and does not control platform validation, customer decisions or platform status."
    }
  ],
  sources: [
    {
      label: "IntegrityNext Help Center - How do I answer/complete the assessment?",
      href:
        "https://helpdesk.integritynext.com/hc/en-us/articles/360018443680-How-do-I-answer-complete-the-assessment"
    },
    {
      label: "IntegrityNext Help Center - Add a colleague to my supplier profile",
      href:
        "https://helpdesk.integritynext.com/hc/en-us/articles/360018479559-How-can-I-invite-add-a-colleague-to-my-supplier-profile"
    },
    {
      label: "IntegrityNext Help Center - Updated assessments",
      href:
        "https://helpdesk.integritynext.com/hc/en-us/articles/15190118617756-I-received-an-email-with-the-subject-Updated-Assessments-Please-Review-How-should-I-proceed"
    }
  ]
};
