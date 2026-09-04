import { primarySources, type PrimarySource } from "@/lib/seo/primary-sources";
import {
  AlertCircle,
  Building2,
  Calculator,
  ClipboardCheck,
  ClipboardList,
  Database,
  Factory,
  FileCheck2,
  FileText,
  HelpCircle,
  LucideIcon,
  MapPinned,
  Search,
  ShieldCheck,
  Users
} from "lucide-react";

export type CommercialServicePageContent = {
  eyebrow: string;
  title: string;
  intro: string[];
  /**
   * Optional plain-language answers to the definitional questions a
   * first-time reader arrives with ("What is EcoVadis?", "Is VSME
   * mandatory?"). Rendered directly under the hero so the answer is the
   * first substantive thing on the page.
   *
   * Each answer states the fact in its first sentence and expands after.
   * Where the claim is regulatory or platform-specific, `sources` carries
   * the official documentation it rests on — never a secondary summary.
   * Pages whose topic has no such definitional entry point simply omit
   * this.
   */
  directAnswers?: {
    eyebrow: string;
    items: Array<{
      question: string;
      answer: string[];
    }>;
    sources?: readonly PrimarySource[];
  };
  primaryCta: string;
  secondaryCta: {
    label: string;
    href: string;
  };
  qualifier: string;
  heroVisual: {
    label: string;
    items: string[];
  };
  fit: {
    eyebrow: string;
    title: string;
    intro?: string;
    items: Array<{
      title: string;
      quote?: string;
      body: string;
      icon: LucideIcon;
    }>;
  };
  service: {
    eyebrow: string;
    title: string;
    intro: string;
    items: Array<{
      title: string;
      body: string;
      icon: LucideIcon;
    }>;
  };
  inputs: {
    title: string;
    body: string;
    items: string[];
  };
  process: {
    title: string;
    intro?: string;
    steps: Array<{
      title: string;
      body: string;
    }>;
  };
  model?: {
    title: string;
    body: string;
    items: Array<{
      title: string;
      body: string;
    }>;
  };
  deliverables: {
    title: string;
    qualifier: string;
    items: string[];
  };
  trust: {
    eyebrow: string;
    title: string;
    body: string[];
    items: Array<{
      label: string;
      body: string;
    }>;
  };
  resources: {
    title: string;
    body: string;
    links: Array<{
      title: string;
      body: string;
      href: string;
    }>;
  };
  finalCta: {
    title: string;
    body: string;
    primaryLabel: string;
    secondaryLabel: string;
    secondaryHref: string;
  };
  /**
   * Optional links to other Evipace services whose scope genuinely adjoins
   * this one — VSME reporting needs a Scope 1 and 2 basis, a platform
   * assessment overlaps with questionnaire work. Deliberately separate from
   * `resources`, which points at educational material, and deliberately not
   * a link to every other service.
   */
  relatedServices?: {
    title: string;
    body: string;
    links: Array<{
      title: string;
      body: string;
      href: string;
    }>;
  };
  /**
   * Optional FAQ, rendered between the resources block and the final CTA
   * using the same <details> pattern the German service pages and the
   * resource articles already use. Plain crawlable HTML — no FAQPage
   * structured data is emitted for it anywhere.
   */
  faq?: Array<{
    question: string;
    answer: string;
  }>;
};

export const customerRequestsContent: CommercialServicePageContent = {
  eyebrow: "Customer ESG requests",
  title:
    "Your customer asked for ESG information. We help you prepare the response.",
  intro: [
    "A customer request may start with a spreadsheet, supplier questionnaire, platform invitation or a short email asking for emissions, policies, targets or supporting evidence. This page covers all of those formats.",
    "The difficult part is rarely the form itself. The information is usually spread across Finance, HR, Quality, EHS, Procurement, Operations and existing company documents.",
    "Evipace helps turn that request into a structured, reviewable response."
  ],
  primaryCta: "Send us the request",
  secondaryCta: {
    label: "See how the process works",
    href: "#process"
  },
  qualifier:
    "Start with the actual customer request. You do not need to organise everything before contacting us.",
  heroVisual: {
    label: "Request intake",
    items: ["Customer request", "Data owners", "Evidence", "Response"]
  },
  fit: {
    eyebrow: "Triggering situations",
    title: "What has your customer actually asked for?",
    intro:
      "The service fits when the work is already real: a customer, OEM, platform or business partner is asking for ESG information and your team needs to respond.",
    items: [
      {
        title: "ESG questionnaire",
        quote: "They sent us a supplier questionnaire with ESG questions.",
        body:
          "We identify the requested topics, fields, scope, owner and evidence need before answers are prepared.",
        icon: ClipboardList
      },
      {
        title: "Supporting evidence",
        quote: "They want documents supporting our answers.",
        body:
          "We map documents to the specific claims they can support and flag weak or missing evidence.",
        icon: FileCheck2
      },
      {
        title: "Carbon data",
        quote: "They are asking for Scope 1, Scope 2 or energy information.",
        body:
          "We separate activity data, calculation needs, source records and assumptions before numbers are returned.",
        icon: Calculator
      },
      {
        title: "Environmental or social policies",
        quote: "They want policies we do not currently have documented clearly.",
        body:
          "We can prepare drafts from actual company practices for internal review and approval.",
        icon: FileText
      },
      {
        title: "Supplier information",
        quote: "They are asking how we manage ESG expectations in our own supply chain.",
        body:
          "We structure supplier-practice information without overstating processes that are not in place.",
        icon: Users
      },
      {
        title: "Sustainability information",
        quote:
          "They need ESG information for their own supplier reporting or assessment.",
        body:
          "We turn the request into a practical worklist and response package your company can review.",
        icon: Building2
      }
    ]
  },
  service: {
    eyebrow: "Service scope",
    title: "What we can take off your desk",
    intro:
      "Evipace does the execution work behind the response: reading the requirement, finding the right data and preparing a clear output for company confirmation.",
    items: [
      {
        title: "Understanding the request",
        body:
          "We identify what the customer is actually asking for, which entity or site it concerns, the reporting period and the evidence requirements.",
        icon: Search
      },
      {
        title: "Data mapping",
        body:
          "We map the requested information to the teams, systems and documents likely to contain it.",
        icon: Database
      },
      {
        title: "Evidence review",
        body:
          "We organise supporting documents and flag where the evidence does not clearly support the answer.",
        icon: FileCheck2
      },
      {
        title: "Calculations",
        body:
          "Where required and in scope, we prepare structured calculations such as Scope 1 and Scope 2.",
        icon: Calculator
      },
      {
        title: "Policy drafts",
        body:
          "Where a requested policy does not yet exist, we can prepare a draft based on actual company practices for internal review and approval.",
        icon: FileText
      },
      {
        title: "Answer preparation",
        body:
          "We prepare clear responses using the information available and keep unresolved gaps visible.",
        icon: ClipboardCheck
      },
      {
        title: "Final review",
        body:
          "Prepared deliverables are human-reviewed before they are returned for client confirmation.",
        icon: ShieldCheck
      }
    ]
  },
  inputs: {
    title: "Start with what you already have.",
    body:
      "Send the request first. We can determine what is actually needed from there; you do not need a clean ESG data room before contacting Evipace.",
    items: [
      "Customer questionnaire",
      "Customer email or request",
      "Spreadsheet",
      "Platform invitation",
      "Existing policies",
      "Certificates",
      "Electricity or fuel records",
      "Prior ESG responses",
      "Available reports",
      "Relevant internal documents"
    ]
  },
  process: {
    title: "A practical route from request to response",
    steps: [
      {
        title: "Send the request",
        body:
          "You send the customer questionnaire, spreadsheet, platform request or brief."
      },
      {
        title: "Define the scope",
        body:
          "We identify the entity, sites, reporting period, deadline and required outputs."
      },
      {
        title: "Map the information",
        body:
          "We determine which data, documents and internal owners are needed."
      },
      {
        title: "Prepare the response",
        body: "We structure answers, calculations, evidence and drafts."
      },
      {
        title: "Review gaps",
        body:
          "Missing or unsupported information stays visible rather than being invented."
      },
      {
        title: "Internal confirmation",
        body:
          "You confirm company facts and statements before final use."
      }
    ]
  },
  deliverables: {
    title: "A response you can actually review.",
    qualifier:
      "The exact output depends on the customer request. Not every engagement produces every deliverable.",
    items: [
      "Completed or prepared questionnaire responses",
      "Structured supporting evidence",
      "Data and evidence gap list",
      "Scope 1 & 2 calculations where required",
      "Policy drafts where appropriate",
      "Clear assumptions and source references",
      "Organised response package for internal confirmation"
    ]
  },
  trust: {
    eyebrow: "Gap discipline",
    title: "What if some information is missing?",
    body: [
      "Missing data is normal. The correct response is not to hide the gap or invent evidence.",
      "A gap can be closed. It should not be rewritten as though it never existed."
    ],
    items: [
      { label: "Available", body: "The source exists and can be used." },
      {
        label: "Needs confirmation",
        body: "The information exists but a company owner must confirm it."
      },
      { label: "Missing", body: "The source or data point is not currently available." },
      {
        label: "Needs calculation",
        body: "Raw activity data must be converted before it becomes an answer."
      },
      {
        label: "Needs a new draft or process",
        body: "A current document may be prepared, but it is not evidence of past implementation."
      }
    ]
  },
  resources: {
    title: "Useful resources if you want to go deeper",
    body:
      "These guides explain the topics behind the service. The commercial work starts with the actual customer request.",
    links: [
      {
        title: "Customer ESG questionnaire received",
        body: "A first-response guide for suppliers that need to understand the request.",
        href: "/en/resources/customer-esg-questionnaire-received"
      },
      {
        title: "ESG data customers request",
        body: "See the data categories customers often ask suppliers to provide.",
        href: "/en/resources/esg-data-customers-request-from-suppliers"
      },
      {
        title: "ESG data owners",
        body: "Map requested information to Finance, HR, EHS, Quality and other owners.",
        href: "/en/resources/esg-data-owners"
      },
      {
        title: "ESG evidence for suppliers",
        body: "Understand what makes a document usable as evidence.",
        href: "/en/resources/esg-evidence-for-suppliers"
      },
      {
        title: "Reusable ESG data",
        body: "Structure answers and documents so the next request does not restart from zero.",
        href: "/en/resources/reusable-esg-data"
      },
      {
        title: "Environmental Policy",
        body: "Prepare a policy when the customer asks for documented environmental commitments.",
        href: "/en/resources/environmental-policy"
      },
      {
        title: "Supplier Code of Conduct",
        body: "Structure supplier expectations when procurement or supply-chain topics are part of the request.",
        href: "/en/resources/supplier-code-of-conduct"
      }
    ]
  },
  finalCta: {
    title: "Have the customer request in front of you?",
    body:
      "Send us the questionnaire, spreadsheet, email or request you received. We will start by identifying what the customer is actually asking for and what information is already available.",
    primaryLabel: "Send us the request",
    secondaryLabel: "See our methodology",
    secondaryHref: "/en/methodology"
  },
  relatedServices: {
    title: "When the request arrives as a structured questionnaire",
    body:
      "Customer ESG requests reach suppliers in many formats. Where the request is a defined questionnaire, assessment or platform profile, the work has its own page.",
    links: [
      {
        title: "ESG questionnaire support",
        body: "For a specific questionnaire, supplier assessment or scored document that has to be completed field by field.",
        href: "/en/esg-questionnaire-support"
      },
      {
        title: "Scope 1 & 2 calculation",
        body: "When the request asks for emissions figures the company does not yet calculate.",
        href: "/en/scope-1-2-calculation"
      }
    ]
  },
  faq: [
    {
      question: "What counts as a customer ESG request?",
      answer:
        "Any request from a customer for sustainability information about your company. In practice that includes spreadsheets, supplier questionnaires, platform invitations such as EcoVadis or IntegrityNext, procurement portal forms, and plain emails asking for a policy, a certificate or an emissions figure."
    },
    {
      question: "How is this different from your ESG questionnaire support?",
      answer:
        "This page covers the whole range of request formats, including short ad-hoc asks that are not questionnaires at all. ESG questionnaire support is the narrower case where a defined questionnaire or assessment document has to be completed field by field. Many engagements start here and move into questionnaire work once the format is clear."
    },
    {
      question: "Do we need to organise the information before contacting you?",
      answer:
        "No. Send the request as you received it, together with whatever documents you already have. Identifying which data is needed, where it sits internally and what is genuinely missing is part of the work."
    },
    {
      question: "What if we cannot answer some of the questions?",
      answer:
        "Unanswerable points are documented as gaps rather than filled with plausible-sounding text. You receive a list of what is missing, what would be needed to close it and which internal function is most likely to hold it."
    },
    {
      question: "Who confirms the answers before they go back to the customer?",
      answer:
        "Your company does. Evipace prepares response material from the information available; statements about your company's actual practices are confirmed internally before the response is used."
    },
    {
      question: "Can the work be reused for the next customer request?",
      answer:
        "That is the intent. The data, evidence and calculations are structured so the same underlying information can support later requests, after checking the reporting period, scope and continued validity."
    }
  ]
};

export const questionnaireSupportContent: CommercialServicePageContent = {
  eyebrow: "ESG questionnaire support",
  title: "Received an ESG questionnaire? We help you prepare the response.",
  intro: [
    "Customer ESG questionnaires often combine company data, emissions, environmental information, workforce topics, policies, supplier practices and supporting evidence in one file. This page is for that case: a defined questionnaire or assessment document that has to be answered field by field.",
    "We help break the questionnaire into manageable parts, find the right internal sources, prepare the answers and keep unresolved gaps visible."
  ],
  primaryCta: "Send your questionnaire",
  secondaryCta: {
    label: "See the questionnaire checklist",
    href: "/en/resources/esg-questionnaire-checklist"
  },
  qualifier:
    "You do not need to complete the questionnaire before sending it to us.",
  heroVisual: {
    label: "Questionnaire workflow",
    items: ["Question", "Requirement", "Evidence", "Confirmation"]
  },
  fit: {
    eyebrow: "Common problems",
    title: "Why ESG questionnaires take longer than they look",
    items: [
      {
        title: "The question is ambiguous",
        body: "The requested entity, site, reporting period, unit or answer format is unclear.",
        icon: HelpCircle
      },
      {
        title: "The answer exists, but not in one place",
        body:
          "Finance may have energy records, HR may have workforce data and EHS or Quality may own certificates or procedures.",
        icon: Database
      },
      {
        title: "A number needs calculation",
        body: "Raw electricity or fuel data is not the same as CO2e.",
        icon: Calculator
      },
      {
        title: "A policy is requested",
        body:
          "A new draft cannot be treated as historical evidence. It needs internal review and approval before use.",
        icon: FileText
      },
      {
        title: "Evidence is requested",
        body:
          "The document needs to support the specific answer, company scope and period.",
        icon: FileCheck2
      },
      {
        title: "The questionnaire asks more than the company currently tracks",
        body:
          "The gap needs to be identified and handled honestly rather than turned into a certainty.",
        icon: AlertCircle
      }
    ]
  },
  service: {
    eyebrow: "Questionnaire execution",
    title: "From a long questionnaire to a structured worklist.",
    intro:
      "We work through the questionnaire as a set of requirements, not as a generic ESG template.",
    items: [
      {
        title: "Question-by-question review",
        body: "We identify what each question actually requires.",
        icon: Search
      },
      {
        title: "Scope control",
        body:
          "We keep legal entity, site and reporting period aligned with the request.",
        icon: MapPinned
      },
      {
        title: "Internal owner mapping",
        body:
          "We identify which company function is most likely to own the information.",
        icon: Users
      },
      {
        title: "Data preparation",
        body:
          "We structure quantitative inputs and flag where calculations are needed.",
        icon: Database
      },
      {
        title: "Evidence mapping",
        body:
          "We link answers to supporting source documents where available.",
        icon: FileCheck2
      },
      {
        title: "Drafting qualitative answers",
        body:
          "We prepare concise responses based on actual company practices.",
        icon: ClipboardCheck
      },
      {
        title: "Gap management",
        body: "Missing information remains explicitly visible.",
        icon: AlertCircle
      },
      {
        title: "Human review",
        body:
          "Prepared output is reviewed before client confirmation.",
        icon: ShieldCheck
      }
    ]
  },
  inputs: {
    title: "Send the questionnaire before you untangle it.",
    body:
      "The original customer file, portal export, email instructions and attachments are more useful than a partly completed version with unclear assumptions.",
    items: [
      "Customer questionnaire",
      "Submission instructions",
      "Deadline and reporting period",
      "Customer portal export",
      "Existing policies and certificates",
      "Energy, fuel or emissions data",
      "Prior answers to similar requests",
      "Documents already considered as evidence"
    ]
  },
  process: {
    title: "Questionnaire workflow",
    intro:
      "Each field moves through the same discipline before it becomes a response.",
    steps: [
      { title: "Question", body: "Read the actual wording and field format." },
      {
        title: "Requirement",
        body: "Identify scope, unit, period, evidence and answer type."
      },
      {
        title: "Internal owner",
        body: "Route the information to the likely company owner."
      },
      {
        title: "Source data",
        body: "Collect the underlying document, system export or raw input."
      },
      {
        title: "Evidence",
        body: "Check whether the document supports the exact answer."
      },
      {
        title: "Draft answer",
        body: "Prepare the response without hiding uncertainty."
      },
      {
        title: "Internal confirmation",
        body: "Company owners confirm facts before final use."
      }
    ]
  },
  deliverables: {
    title: "What you receive",
    qualifier:
      "Deliverables depend on the questionnaire and the information available.",
    items: [
      "Structured response draft",
      "Question-by-question worklist",
      "Mapped evidence",
      "Missing-data list",
      "Calculation inputs and results where relevant",
      "Policy or document gaps",
      "Assumptions requiring confirmation",
      "Final internal review version"
    ]
  },
  trust: {
    eyebrow: "Company control",
    title: "What we need you to confirm",
    body: [
      "Evipace can organise and prepare the response, but company-specific facts must remain under company control.",
      "That is not a defensive limitation. It is good evidence discipline."
    ],
    items: [
      { label: "Company statements", body: "Claims about actual practice need company confirmation." },
      { label: "Entity and site scope", body: "The final response must match the customer request." },
      { label: "Employee information", body: "HR-related figures and statements need internal ownership." },
      { label: "Supplier practices", body: "Supplier management claims should reflect actual procurement practice." },
      { label: "Targets and historical claims", body: "Targets and past statements need a traceable basis." },
      { label: "Final submission", body: "Customer or platform submission remains under your company's control unless separately agreed and supported." }
    ]
  },
  resources: {
    title: "Useful questionnaire resources",
    body:
      "Use these if you want to understand the mechanics. Use the service page when the questionnaire needs to get done.",
    links: [
      {
        title: "Customer ESG questionnaire received",
        body: "Start with scope, deadline, owners, evidence and internal review.",
        href: "/en/resources/customer-esg-questionnaire-received"
      },
      {
        title: "ESG Questionnaire Checklist",
        body: "Review the questionnaire before returning it.",
        href: "/en/resources/esg-questionnaire-checklist"
      },
      {
        title: "ESG data customers request",
        body: "Understand common data categories in supplier questionnaires.",
        href: "/en/resources/esg-data-customers-request-from-suppliers"
      },
      {
        title: "ESG evidence for suppliers",
        body: "Learn which documents can support which answers.",
        href: "/en/resources/esg-evidence-for-suppliers"
      },
      {
        title: "Broader ESG customer requests",
        body: "For requests that go beyond a questionnaire file.",
        href: "/en/esg-customer-requests"
      }
    ]
  },
  finalCta: {
    title: "Send us the questionnaire before you spend hours untangling it.",
    body:
      "Upload the questionnaire or customer request you received. We can first determine what is being asked, which information already exists and where the real gaps are.",
    primaryLabel: "Send your questionnaire",
    secondaryLabel: "See how Evipace works",
    secondaryHref: "/en/methodology"
  },
  relatedServices: {
    title: "Where the questionnaire comes from",
    body:
      "A questionnaire is one format a customer ESG request can take. Depending on who is asking, the work may sit closer to one of these.",
    links: [
      {
        title: "Customer ESG requests",
        body: "For the broader case: emails, spreadsheets, portal forms and ad-hoc data requests that are not a single questionnaire document.",
        href: "/en/esg-customer-requests"
      },
      {
        title: "EcoVadis support",
        body: "When the questionnaire is an EcoVadis assessment with its own evidence and document rules.",
        href: "/en/ecovadis-support"
      },
      {
        title: "IntegrityNext support",
        body: "When the request arrives as an IntegrityNext invitation with platform assessments and certificate checks.",
        href: "/en/integritynext-support"
      }
    ]
  },
  faq: [
    {
      question: "What is an ESG questionnaire?",
      answer:
        "A structured set of questions a customer sends a supplier to collect sustainability information in a comparable format. It typically mixes company data, energy and emissions figures, environmental and workforce topics, policies, supply-chain practices and requests for supporting documents."
    },
    {
      question: "How is this different from your customer ESG requests page?",
      answer:
        "This page is for a defined questionnaire, assessment or scored document that has to be completed field by field. Customer ESG requests covers the wider set of formats, including short emails and informal data requests that never take questionnaire form."
    },
    {
      question: "Do we have to fill anything in before sending it to you?",
      answer:
        "No. Send the questionnaire as your customer sent it, along with the documents you already have. Scoping the questions and identifying which internal sources answer them is part of the work."
    },
    {
      question: "What information do you usually need from us?",
      answer:
        "Typically energy and fuel data, company and site information, workforce figures, existing policies and certificates, and any prior responses. The exact set depends on the questionnaire; the first step is establishing which questions actually apply to your company."
    },
    {
      question: "What happens to questions we cannot answer?",
      answer:
        "They are recorded as gaps with a note on what would be needed to close them. A missing data point stays visible rather than being replaced by an estimate presented as fact."
    },
    {
      question: "Do you submit the questionnaire for us?",
      answer:
        "No. Evipace prepares the response material for internal review. Your company confirms the company-specific statements and remains responsible for the submission and for any platform account involved."
    },
    {
      question: "Can the same answers be used for the next questionnaire?",
      answer:
        "Often, yes. Different customers ask for the same underlying facts in different wording, so the work is structured around the data and evidence rather than around one customer's form."
    }
  ]
};

export const scope12CalculationContent: CommercialServicePageContent = {
  eyebrow: "Scope 1 & 2 calculation",
  title:
    "Calculate and document your company’s Scope 1 and Scope 2 emissions.",
  intro: [
    "If a customer asks for your company's Scope 1 and Scope 2 emissions or corporate carbon footprint, the starting point is not a CO2 number.",
    "It is the underlying activity data: electricity, fuels, vehicles, refrigerants, purchased heat and other relevant sources.",
    "Evipace structures the data, applies appropriate emission factors and prepares a documented calculation you can review."
  ],
  directAnswers: {
    eyebrow: "The short version",
    items: [
      {
        question: "What are Scope 1 and Scope 2 emissions?",
        answer: [
          "Scope 1 covers direct greenhouse-gas emissions from sources a company owns or controls; Scope 2 covers indirect emissions from the electricity, heat, steam or cooling it purchases and consumes.",
          "For a manufacturing company, Scope 1 usually means natural gas and other fuels burned on site, fuel used in owned vehicles, and refrigerant losses. Scope 2 usually means purchased electricity and district heating.",
          "The split, the organisational and operational boundary, and the location-based and market-based treatment of purchased electricity follow the GHG Protocol corporate standards."
        ]
      },
      {
        question: "What data is needed to calculate them?",
        answer: [
          "Consumption data for a defined reporting period, plus emission factors appropriate to that data.",
          "In practice that means meter readings or invoices for electricity and heat, fuel and vehicle records, refrigerant top-up records, and the site and entity boundary the figures apply to.",
          "Where an input has to be estimated, the assumption is recorded alongside the figure rather than absorbed into it."
        ]
      }
    ],
    sources: [
      primarySources.ghgCorporateStandard,
      primarySources.ghgScope2Guidance
    ]
  },
  primaryCta: "Send your Scope 1 & 2 data",
  secondaryCta: {
    label: "See the data collection template",
    href: "/en/resources/scope-1-2-data-collection-template"
  },
  qualifier:
    "Already have invoices or spreadsheets but no organised dataset? Send what you have.",
  heroVisual: {
    label: "Calculation logic",
    items: ["Boundary", "Activity data", "Emission factor", "CO2e"]
  },
  fit: {
    eyebrow: "Source data",
    title: "What data do we usually start with?",
    intro:
      "Not every company has every source. The relevant dataset depends on the reporting boundary, facilities and operations.",
    items: [
      {
        title: "Purchased electricity",
        body: "kWh from invoices, meters or energy records.",
        icon: Factory
      },
      {
        title: "Stationary fuels",
        body:
          "Natural gas, heating oil, LPG or other fuels used on site where relevant.",
        icon: Factory
      },
      {
        title: "Company vehicles",
        body:
          "Fuel consumption or other relevant fleet activity data for mobile combustion.",
        icon: Database
      },
      {
        title: "Refrigerants",
        body: "Refrigerant losses or top-ups where relevant.",
        icon: FileCheck2
      },
      {
        title: "Process emissions",
        body: "Only where relevant to the company's operations.",
        icon: AlertCircle
      },
      {
        title: "Purchased heat, steam or cooling",
        body: "Where applicable and inside the reporting boundary.",
        icon: Building2
      }
    ]
  },
  service: {
    eyebrow: "Calculation service",
    title: "From source data to a calculation you can trace.",
    intro:
      "We keep the calculation layers visible so another reviewer can understand how the number was produced.",
    items: [
      {
        title: "Boundary review",
        body:
          "We clarify which entity, sites and reporting period belong in the calculation.",
        icon: MapPinned
      },
      {
        title: "Data structuring",
        body:
          "We normalise activity data by source, site, unit and period.",
        icon: Database
      },
      {
        title: "Data-gap review",
        body:
          "We identify missing periods, unclear units and incomplete sources.",
        icon: AlertCircle
      },
      {
        title: "Factor selection",
        body:
          "We use appropriate factor sources and document the factor and version used.",
        icon: Search
      },
      {
        title: "Calculation",
        body:
          "We convert activity data into CO2e using a documented methodology.",
        icon: Calculator
      },
      {
        title: "Scope classification",
        body:
          "Relevant emissions are structured into Scope 1 and Scope 2 according to the applicable calculation framework.",
        icon: ClipboardCheck
      },
      {
        title: "Review package",
        body:
          "We keep source references, assumptions and calculation logic visible for internal review.",
        icon: ShieldCheck
      }
    ]
  },
  inputs: {
    title: "Send the source data you already have.",
    body:
      "Do not clean everything first. Invoices, exports and prior calculations are useful even when they are not yet organised into a complete dataset.",
    items: [
      "Electricity invoices",
      "Electricity consumption exports",
      "Gas or fuel invoices",
      "Fleet fuel data",
      "Refrigerant service records",
      "District heating invoices",
      "Site list",
      "Reporting-period information",
      "Existing calculations",
      "Prior carbon reports"
    ]
  },
  process: {
    title: "How the calculation work moves",
    steps: [
      {
        title: "Confirm boundary",
        body: "Which legal entity, sites and period are included?"
      },
      {
        title: "Collect source data",
        body:
          "Which quantities were consumed, purchased, burned, lost or used?"
      },
      {
        title: "Normalise units",
        body: "Values are structured by source, site, unit and period."
      },
      {
        title: "Apply factors",
        body: "Appropriate factor sources and versions are documented."
      },
      {
        title: "Calculate CO2e",
        body: "Activity data is converted into a traceable emissions result."
      },
      {
        title: "Review assumptions",
        body:
          "Gaps, estimates, exclusions and source references remain visible."
      }
    ]
  },
  model: {
    title: "The calculation model we preserve",
    body:
      "Scope 1 and Scope 2 work is easier to review when each layer remains separate.",
    items: [
      {
        title: "Reporting boundary",
        body: "Which legal entity, sites and period are included?"
      },
      {
        title: "Activity data",
        body:
          "What quantity was actually consumed, purchased, burned, lost or used?"
      },
      {
        title: "Emission factor",
        body:
          "Which factor converts that activity into greenhouse gas emissions?"
      },
      {
        title: "CO2e",
        body: "What emissions result from the calculation?"
      },
      {
        title: "Source / version / assumptions",
        body:
          "Can another reviewer understand how the number was produced?"
      }
    ]
  },
  deliverables: {
    title: "What you receive",
    qualifier:
      "The output depends on the agreed calculation scope and the source data available.",
    items: [
      "Structured Scope 1 activity data",
      "Structured Scope 2 activity data",
      "CO2e calculation",
      "Emission-factor references",
      "Factor versions where relevant",
      "Assumptions",
      "Data-gap notes",
      "Reporting boundary",
      "Calculation summary",
      "Supporting source mapping"
    ]
  },
  trust: {
    eyebrow: "Scope boundaries",
    title: "What this service is not",
    body: [
      "This is calculation preparation, not assurance or certification.",
      "Where the underlying methodology requires a distinction between location-based and market-based Scope 2, we explain and document it conservatively. Renewable electricity claims do not automatically make Scope 2 zero."
    ],
    items: [
      { label: "Scope 3", body: "Not automatically included." },
      { label: "Product carbon footprint", body: "Not included unless separately scoped." },
      { label: "Third-party assurance", body: "Not provided by this service." },
      { label: "Certification", body: "No certification claim is made." },
      { label: "Legal compliance opinion", body: "Not part of the calculation service." }
    ]
  },
  resources: {
    title: "Useful Scope 1 & 2 resources",
    body:
      "Use these resources to understand the calculation. Send source files when you want the work prepared.",
    links: [
      {
        title: "Scope 1 & 2 data calculation",
        body: "Understand the source data, factors and calculation structure.",
        href: "/en/resources/scope-1-2-data-calculation"
      },
      {
        title: "Scope 1, 2 & 3 explained",
        body: "Clarify what belongs in each emissions scope.",
        href: "/en/resources/scope-1-2-3-explained"
      },
      {
        title: "Scope 1 & 2 data collection template",
        body: "Collect electricity, fuel, refrigerant and purchased-energy data.",
        href: "/en/resources/scope-1-2-data-collection-template"
      },
      {
        title: "ESG evidence for suppliers",
        body: "Keep source records and evidence aligned with the final answer.",
        href: "/en/resources/esg-evidence-for-suppliers"
      },
      {
        title: "ESG data owners",
        body: "Find which team is likely to own energy, fleet or site data.",
        href: "/en/resources/esg-data-owners"
      }
    ]
  },
  finalCta: {
    title: "Already have the electricity, fuel or site data?",
    body:
      "Send us the source files you already have. We can identify what belongs in the Scope 1 & 2 calculation, what is missing and what needs clarification before the calculation is prepared.",
    primaryLabel: "Send your Scope 1 & 2 data",
    secondaryLabel: "Use the data collection template",
    secondaryHref: "/en/resources/scope-1-2-data-collection-template"
  },
  relatedServices: {
    title: "Where the emissions figures usually go next",
    body:
      "A documented Scope 1 and Scope 2 calculation is rarely the end point. The same figures are normally requested again elsewhere.",
    links: [
      {
        title: "VSME sustainability reporting",
        body: "Voluntary sustainability reporting draws on the same energy and emissions data, so the calculation basis feeds directly into it.",
        href: "/en/vsme-sustainability-report"
      },
      {
        title: "Customer ESG requests",
        body: "Customers frequently ask for emissions figures as part of a broader supplier information request.",
        href: "/en/esg-customer-requests"
      }
    ]
  },
  faq: [
    {
      question: "What is the difference between Scope 1, Scope 2 and Scope 3?",
      answer:
        "Scope 1 is direct emissions from sources the company owns or controls. Scope 2 is indirect emissions from purchased electricity, heat, steam and cooling. Scope 3 covers other indirect emissions across the value chain, such as purchased goods, transport and business travel. This service covers Scope 1 and Scope 2; our Scope 1, 2 and 3 explainer sets out the wider picture."
    },
    {
      question: "What is the difference between location-based and market-based Scope 2?",
      answer:
        "Location-based Scope 2 uses the average emissions intensity of the grid the company draws from. Market-based Scope 2 reflects contractual instruments such as a supplier-specific factor or an energy attribute certificate. The GHG Protocol Scope 2 Guidance sets out both methods; which are reported depends on the data and contracts available."
    },
    {
      question: "What data do we need to provide?",
      answer:
        "Electricity and heat consumption for the reporting period, fuel and vehicle records, refrigerant records where relevant, and enough company information to define the boundary. Invoices and meter readings are usually the practical starting point."
    },
    {
      question: "What if some consumption data is missing?",
      answer:
        "The gap is documented, and where an estimate is used the method and assumption are recorded with it. A calculated figure should always be traceable back to the input it came from."
    },
    {
      question: "Do we receive only the final number?",
      answer:
        "No. You receive the calculation basis: activity data, units, emission factors, factor sources, assumptions and the boundary the result applies to, so the figure can be reviewed and defended."
    },
    {
      question: "Is the calculation audited or verified?",
      answer:
        "No. Evipace prepares and documents the calculation; it is not an assurance or verification service. If third-party verification is required, the documented basis is what a verifier would work from."
    },
    {
      question: "Does this cover Scope 3?",
      answer:
        "Not as standard. Scope 3 is a separate exercise with different data requirements and a much wider boundary. Where a customer request touches Scope 3, we say so rather than silently extending the calculation."
    }
  ]
};

export const ecovadisSupportContent: CommercialServicePageContent = {
  eyebrow: "ECOVADIS SUPPORT",
  title:
    "Need help preparing for EcoVadis? We organise the answers and evidence with you.",
  intro: [
    "EcoVadis can require information across multiple parts of the company: policies, environmental data, workforce topics, business practices and supporting documents.",
    "The difficult part is often not finding one answer. It is understanding what the question requires, locating the right supporting material and keeping answers consistent with what the company can actually evidence.",
    "Evipace helps structure that work before your company submits the assessment."
  ],
  directAnswers: {
    eyebrow: "The short version",
    items: [
      {
        question: "What is EcoVadis?",
        answer: [
          "EcoVadis is an independent business sustainability rating provider that assesses companies through an online questionnaire and the supporting documents they upload.",
          "Large buyers commonly ask suppliers to complete an EcoVadis assessment, which covers environmental topics, labour and human rights, ethics and sustainable procurement. Answers are expected to be backed by documents that genuinely support them.",
          "Evipace is an independent service provider and is not affiliated with EcoVadis. The assessment is run by EcoVadis; what its methodology expects of supporting documents is set out in its own documentation."
        ]
      },
      {
        question: "What documents does an EcoVadis assessment usually need?",
        answer: [
          "Documents that evidence the specific answers being given, rather than a general library of company paperwork.",
          "That typically means approved policies, management-system certificates, environmental and workforce records, procurement documents and any relevant reports — each matching the entity, site and reporting period the assessment covers.",
          "The number of documents that can be submitted is limited, so relevance matters more than volume."
        ]
      }
    ],
    sources: [
      primarySources.ecovadisSupportingDocuments,
      primarySources.ecovadisDocumentLimit
    ]
  },
  primaryCta: "Send us your EcoVadis request",
  secondaryCta: {
    label: "See the EcoVadis evidence guide",
    href: "/en/resources/ecovadis-documents-evidence"
  },
  qualifier:
    "Evipace is an independent service provider and is not affiliated with EcoVadis. We do not guarantee a score or assessment outcome.",
  heroVisual: {
    label: "Assessment preparation",
    items: ["Questionnaire", "Data owners", "Evidence", "Client submission"]
  },
  fit: {
    eyebrow: "Real blocks",
    title: "Where EcoVadis preparation usually gets stuck",
    items: [
      {
        title: "Questions span multiple departments",
        body:
          "The information may sit across HR, EHS, Quality, Procurement, Finance and Management.",
        icon: Users
      },
      {
        title: "A document exists, but does not clearly support the answer",
        body:
          "Evidence needs to match the actual statement being made.",
        icon: FileCheck2
      },
      {
        title: "A requested policy is missing",
        body:
          "A new draft can be prepared from real company practices, but it cannot be treated as historical evidence.",
        icon: FileText
      },
      {
        title: "The data is incomplete",
        body:
          "Missing information should remain visible until it can be confirmed or calculated.",
        icon: AlertCircle
      },
      {
        title: "Evidence exists in different versions",
        body:
          "The current scope, date and company or entity need to be clear.",
        icon: ClipboardList
      },
      {
        title: "The company does not know what to upload",
        body:
          "The relevant supporting material must be selected based on what the response actually says.",
        icon: Search
      }
    ]
  },
  service: {
    eyebrow: "Service scope",
    title: "What we help prepare",
    intro:
      "We work from the actual assessment request, available company information and the evidence your team can support.",
    items: [
      {
        title: "Assessment review",
        body:
          "We break the request into clear information and evidence requirements.",
        icon: Search
      },
      {
        title: "Internal owner mapping",
        body:
          "We identify which function is most likely to hold each answer or document.",
        icon: Users
      },
      {
        title: "Evidence organisation",
        body:
          "We organise available supporting documents and flag weak or missing evidence.",
        icon: FileCheck2
      },
      {
        title: "Policy and document preparation",
        body:
          "Where a required company document does not exist, we can prepare a draft based on actual practices for internal review and approval.",
        icon: FileText
      },
      {
        title: "Quantitative data preparation",
        body:
          "We structure relevant company data and calculations where they fall within scope.",
        icon: Calculator
      },
      {
        title: "Answer preparation",
        body:
          "We prepare concise response material based on the information the company can support.",
        icon: ClipboardCheck
      },
      {
        title: "Gap review",
        body:
          "Missing data, evidence and approvals remain visible.",
        icon: AlertCircle
      },
      {
        title: "Human review",
        body:
          "Prepared deliverables are reviewed before they are returned for client confirmation.",
        icon: ShieldCheck
      }
    ]
  },
  inputs: {
    title: "Start with what you already have.",
    body:
      "Do not build a perfect evidence library before contacting us. Start with the actual assessment and the documents you already have.",
    items: [
      "EcoVadis questionnaire or request",
      "Existing policies",
      "Certificates",
      "Environmental data",
      "Employee and workforce information",
      "Supplier or procurement documents",
      "Prior assessment materials",
      "Reports",
      "Supporting evidence",
      "Internal spreadsheets or documents"
    ]
  },
  process: {
    title: "A practical six-step preparation flow",
    steps: [
      {
        title: "Share the assessment or request",
        body:
          "You send the current EcoVadis request, questionnaire context and the documents already available."
      },
      {
        title: "Map the requirements",
        body:
          "We identify the information, evidence, scope and internal confirmations needed."
      },
      {
        title: "Collect the available data and evidence",
        body:
          "Existing policies, certificates, metrics, records and prior materials are organised against the request."
      },
      {
        title: "Prepare answers and document gaps",
        body:
          "Response material is prepared from supportable company information, with missing or weak evidence kept visible."
      },
      {
        title: "Review the response package",
        body:
          "Prepared answers, sources, assumptions and gaps are reviewed before return."
      },
      {
        title: "Client confirms and submits",
        body:
          "Your company confirms the company facts and remains responsible for final use and platform submission."
      }
    ]
  },
  deliverables: {
    title: "What you receive",
    qualifier:
      "The exact output depends on the assessment scope and available information. No score, medal level, acceptance, certification or improvement is promised.",
    items: [
      "Prepared questionnaire responses",
      "Organised supporting evidence",
      "Evidence-gap list",
      "Policy or document drafts where appropriate",
      "Quantitative inputs or calculations where in scope",
      "Source references",
      "Assumptions requiring confirmation",
      "Internal review version"
    ]
  },
  trust: {
    eyebrow: "Company control",
    title: "What stays under your company's control",
    body: [
      "Evipace prepares information, evidence and response material. Your company remains the source of company facts.",
      "A newly prepared policy or document can support future practice after internal approval. It should not be presented as proof of past implementation."
    ],
    items: [
      { label: "Company statements", body: "Statements about actual practices need internal confirmation." },
      { label: "Entity and site scope", body: "The response should match the assessment scope." },
      { label: "Evidence selection", body: "Documents should support the specific answer being made." },
      { label: "Platform submission", body: "Final submission remains with your company." },
      { label: "Outcome", body: "Evipace does not control scoring, document acceptance or assessment results." }
    ]
  },
  resources: {
    title: "Useful EcoVadis resources",
    body:
      "Use these guides for evidence detail. Use the service when the assessment needs to be prepared.",
    links: [
      {
        title: "EcoVadis documents and evidence",
        body: "Understand evidence relevance, scope, document limits and common mistakes.",
        href: "/en/resources/ecovadis-documents-evidence"
      },
      {
        title: "ESG evidence for suppliers",
        body: "Check what makes a document usable as evidence.",
        href: "/en/resources/esg-evidence-for-suppliers"
      },
      {
        title: "ESG evidence readiness check",
        body: "Review one document before relying on it.",
        href: "/en/resources/esg-evidence-readiness-check"
      },
      {
        title: "ESG data owners",
        body: "Find which internal function is likely to hold the data.",
        href: "/en/resources/esg-data-owners"
      },
      {
        title: "Environmental Policy",
        body: "Prepare a policy from actual company practice without treating a new draft as old evidence.",
        href: "/en/resources/environmental-policy"
      },
      {
        title: "Supplier Code of Conduct",
        body: "Keep supplier expectations clear when procurement evidence is part of the assessment.",
        href: "/en/resources/supplier-code-of-conduct"
      }
    ]
  },
  finalCta: {
    title: "Already have the EcoVadis request?",
    body:
      "Send us the assessment request and the documents you already have. We can start by identifying what is needed, what already supports the response and where the real gaps are.",
    primaryLabel: "Send us your EcoVadis request",
    secondaryLabel: "See our methodology",
    secondaryHref: "/en/methodology"
  },
  relatedServices: {
    title: "Related Evipace services",
    body:
      "An EcoVadis assessment usually overlaps with work a company is already doing for other customers.",
    links: [
      {
        title: "ESG questionnaire support",
        body: "For customer questionnaires outside the platform that ask for much of the same information.",
        href: "/en/esg-questionnaire-support"
      },
      {
        title: "Scope 1 & 2 calculation",
        body: "When the assessment asks for emissions figures the company does not yet calculate.",
        href: "/en/scope-1-2-calculation"
      }
    ]
  },
  faq: [
    {
      question: "What is EcoVadis?",
      answer:
        "EcoVadis is an independent business sustainability rating provider. Companies complete an online questionnaire covering environment, labour and human rights, ethics and sustainable procurement, and upload documents supporting their answers. Buyers commonly ask suppliers to go through the assessment as part of supplier management."
    },
    {
      question: "What documents are typically needed?",
      answer:
        "Documents that support the specific answers given: approved policies, management-system certificates, environmental and workforce records, and procurement documents. Each should match the entity, site and reporting period covered by the assessment. Because the number of documents that can be submitted is limited, choosing relevant evidence matters more than uploading everything available."
    },
    {
      question: "What can be used as evidence?",
      answer:
        "A document that demonstrates what the answer claims. A certificate does not automatically answer every environmental question, and an existing policy does not by itself prove implementation. Where a document only partly supports an answer, that limitation is better recorded than overstated."
    },
    {
      question: "Can Evipace guarantee a score or medal?",
      answer:
        "No. Evipace does not control scoring, document acceptance or assessment outcomes, and does not promise a score, medal level or improvement. The work is preparing accurate, well-evidenced response material."
    },
    {
      question: "How does Evipace support the preparation?",
      answer:
        "We break the assessment into concrete information and evidence requirements, identify which internal function is likely to hold each answer, organise the available documents against the questions, prepare response material from what the company can support, and keep gaps visible for internal decision."
    },
    {
      question: "What happens if a required document does not exist?",
      answer:
        "It is recorded as a gap. Where a real company practice exists but is undocumented, a draft can be prepared for internal review and approval — but a newly written document is not presented as evidence of past implementation."
    },
    {
      question: "Who submits the assessment?",
      answer:
        "Your company. It keeps control of its EcoVadis account, confirms the company-specific statements and makes the final submission."
    }
  ]
};

export const integrityNextSupportContent: CommercialServicePageContent = {
  eyebrow: "INTEGRITYNEXT SUPPORT",
  title:
    "Received an IntegrityNext request? We help prepare the information and evidence.",
  intro: [
    "An IntegrityNext request can require company information, questionnaire responses, certifications or supporting documents across different ESG topics.",
    "If the information is scattered across the business, the difficult part is determining what already exists, who owns it and what still needs to be prepared.",
    "Evipace helps organise the required information and evidence so your company can complete the request with a clear internal review trail."
  ],
  directAnswers: {
    eyebrow: "The short version",
    items: [
      {
        question: "What is IntegrityNext?",
        answer: [
          "IntegrityNext is a supply-chain sustainability and compliance platform that buyers use to collect and monitor information about their suppliers.",
          "Suppliers are invited by a customer to create or update a company profile and complete assessments covering topics such as environment, health and safety, labour and human rights, and business ethics. Certificates and supporting documents can be attached to the profile.",
          "Evipace is an independent service provider and is not affiliated with IntegrityNext. How the assessments work is documented by IntegrityNext itself."
        ]
      },
      {
        question: "What happens after a customer sends an invitation?",
        answer: [
          "The invited company sets up or updates its supplier profile and works through the assessments its customer has requested.",
          "That normally means confirming company and site details, answering the assessment questions, and uploading valid certificates or other supporting documents where they exist.",
          "Assessments can be reissued or flagged for follow-up later, so the underlying company information is worth keeping in a form that can be reused rather than reassembled each time."
        ]
      }
    ],
    sources: [
      primarySources.integrityNextCompletingAssessment,
      primarySources.integrityNextUpdatedAssessments
    ]
  },
  primaryCta: "Send us the IntegrityNext request",
  secondaryCta: {
    label: "See the supplier invitation guide",
    href: "/en/resources/integritynext-invitation-for-suppliers"
  },
  qualifier:
    "Evipace is an independent service provider and is not affiliated with IntegrityNext. We do not guarantee platform outcomes or customer acceptance.",
  heroVisual: {
    label: "Request preparation",
    items: ["Invitation", "Assessments", "Evidence", "Client submission"]
  },
  fit: {
    eyebrow: "Request scope",
    title: "What the request may involve",
    intro:
      "The relevant work depends on the actual invitation, profile and requested topics.",
    items: [
      {
        title: "Company information",
        body:
          "Basic company details, scope and profile information need to reflect the entity being presented.",
        icon: Building2
      },
      {
        title: "Certifications",
        body:
          "Existing certificates need to be current and relevant to the requested topic.",
        icon: FileCheck2
      },
      {
        title: "Questionnaire responses",
        body:
          "Where questions need answering, the response should be based on confirmed company facts.",
        icon: ClipboardCheck
      },
      {
        title: "Policies",
        body:
          "Existing policies should be mapped carefully. Missing policies can be drafted from actual practices for review.",
        icon: FileText
      },
      {
        title: "Environmental, social and company information",
        body:
          "Different internal teams may own the relevant source information.",
        icon: Database
      },
      {
        title: "Evidence gaps",
        body:
          "Missing documents, unclear scope and statements needing confirmation should stay visible.",
        icon: AlertCircle
      }
    ]
  },
  service: {
    eyebrow: "Service scope",
    title: "We turn the request into a clear internal worklist.",
    intro:
      "The work starts with the request itself, not with a generic sustainability checklist.",
    items: [
      {
        title: "Request review",
        body:
          "We identify what information or documentation the request actually requires.",
        icon: Search
      },
      {
        title: "Owner mapping",
        body:
          "We identify the internal teams likely to hold the source information.",
        icon: Users
      },
      {
        title: "Document review",
        body:
          "We organise available certificates, policies and supporting documents.",
        icon: FileCheck2
      },
      {
        title: "Questionnaire preparation",
        body:
          "Where questionnaires are required, we prepare response material based on confirmed company facts.",
        icon: ClipboardList
      },
      {
        title: "Gap identification",
        body:
          "We identify missing documents, unclear information and statements that require internal confirmation.",
        icon: AlertCircle
      },
      {
        title: "Draft preparation",
        body:
          "Where appropriate, we can prepare policy or document drafts based on actual company practices.",
        icon: FileText
      },
      {
        title: "Final review",
        body:
          "Prepared material is human-reviewed before your company confirms and submits it.",
        icon: ShieldCheck
      }
    ]
  },
  inputs: {
    title: "Start with the request itself.",
    body:
      "You do not need to organise a complete package before contacting Evipace. The invitation, requested topics and available documents are enough to begin scoping the work.",
    items: [
      "IntegrityNext invitation or request",
      "Screenshots or exported questions where applicable",
      "Existing certifications",
      "Policies",
      "Previous ESG documentation",
      "Company data",
      "Supplier-related documentation",
      "Evidence already available"
    ]
  },
  process: {
    title: "From invitation to review-ready material",
    steps: [
      {
        title: "Send the invitation or request",
        body:
          "You share the request, requested topics and the information already available."
      },
      {
        title: "Identify what is required",
        body:
          "We clarify which information, certificates, documents or questionnaire inputs are needed."
      },
      {
        title: "Map data, documents and owners",
        body:
          "Each topic is mapped to likely source documents and internal owners."
      },
      {
        title: "Prepare responses and evidence",
        body:
          "We prepare response material, organise supporting documents and identify source references."
      },
      {
        title: "Review open gaps",
        body:
          "Missing certificates, unclear information and statements needing confirmation remain visible."
      },
      {
        title: "Client confirms and submits",
        body:
          "Your company confirms the facts and remains responsible for entering or submitting information through IntegrityNext where applicable."
      }
    ]
  },
  model: {
    title: "Your company stays in control of the platform submission.",
    body:
      "Evipace can prepare the work behind the response, but the supplier remains responsible for final platform use where applicable.",
    items: [
      { title: "Data", body: "Company information structured for review." },
      { title: "Evidence", body: "Certificates, policies and supporting documents organised by topic." },
      { title: "Response material", body: "Draft answers and notes prepared from supportable information." },
      { title: "Internal confirmation", body: "Company owners confirm facts before use." },
      { title: "Submission", body: "The client controls final entry, approval and submission." }
    ]
  },
  deliverables: {
    title: "What you receive",
    qualifier:
      "Deliverables depend on the actual request. No platform result, status or customer acceptance is guaranteed.",
    items: [
      "Structured response material",
      "Organised supporting documents",
      "Gap list",
      "Policy or document drafts where appropriate",
      "Questions requiring internal confirmation",
      "Source references",
      "Review-ready package"
    ]
  },
  trust: {
    eyebrow: "Certificates and gaps",
    title: "A missing certificate should stay a fact.",
    body: [
      "Where a suitable certificate exists, it can be organised and checked against the requested topic.",
      "Where no suitable certificate exists, the right response is not to represent that certification as existing. If the validated workflow provides a questionnaire or alternative information path for the relevant topic, the company information can be prepared for that route."
    ],
    items: [
      { label: "Certificate exists", body: "Check scope, topic and validity before relying on it." },
      { label: "Certificate missing", body: "Do not imply certification that the company does not have." },
      { label: "Questionnaire needed", body: "Prepare answers from actual company practice and evidence." },
      { label: "Clarification needed", body: "Keep uncertain or unconfirmed points visible for review." },
      { label: "Final responsibility", body: "Company facts and platform actions remain under client control." }
    ]
  },
  resources: {
    title: "Useful IntegrityNext resources",
    body:
      "Use these guides to understand the request mechanics. Use the service when the response needs to be prepared.",
    links: [
      {
        title: "IntegrityNext invitation for suppliers",
        body: "Understand what to do after receiving an invitation.",
        href: "/en/resources/integritynext-invitation-for-suppliers"
      },
      {
        title: "ESG evidence for suppliers",
        body: "Check whether a document supports the answer.",
        href: "/en/resources/esg-evidence-for-suppliers"
      },
      {
        title: "ESG evidence readiness check",
        body: "Review scope, period, validity and source quality.",
        href: "/en/resources/esg-evidence-readiness-check"
      },
      {
        title: "ESG data owners",
        body: "Map requested information to internal teams.",
        href: "/en/resources/esg-data-owners"
      },
      {
        title: "Supplier Code of Conduct",
        body: "Prepare supplier expectations from actual company practice.",
        href: "/en/resources/supplier-code-of-conduct"
      }
    ]
  },
  finalCta: {
    title: "Received the IntegrityNext invitation already?",
    body:
      "Send us the request you received and the documents you already have. We can map what is required, organise the available evidence and identify what still needs internal confirmation.",
    primaryLabel: "Send us the IntegrityNext request",
    secondaryLabel: "See our methodology",
    secondaryHref: "/en/methodology"
  },
  relatedServices: {
    title: "Related Evipace services",
    body:
      "The information an IntegrityNext profile asks for usually overlaps with other supplier requests already in progress.",
    links: [
      {
        title: "ESG questionnaire support",
        body: "For customer questionnaires outside the platform that ask for much of the same company information.",
        href: "/en/esg-questionnaire-support"
      },
      {
        title: "Customer ESG requests",
        body: "For the wider set of ESG requests arriving from customers in other formats.",
        href: "/en/esg-customer-requests"
      }
    ]
  },
  faq: [
    {
      question: "What is IntegrityNext?",
      answer:
        "IntegrityNext is a supply-chain sustainability and compliance platform used by buyers to collect and monitor supplier information. Suppliers are invited to maintain a company profile and complete assessments covering areas such as environment, health and safety, labour and human rights, and business ethics."
    },
    {
      question: "We received an invitation from a customer. What happens next?",
      answer:
        "The company sets up or updates its supplier profile and works through the assessments the customer has requested. That usually means confirming company and site information, answering the assessment questions and attaching valid certificates or other supporting documents where they exist."
    },
    {
      question: "Do we need certificates to complete the assessments?",
      answer:
        "Not necessarily. Where a valid certificate exists it can support the relevant answers. Where it does not, the questions are answered on the basis of what the company can actually evidence, and missing items are recorded rather than implied."
    },
    {
      question: "Which departments are usually involved?",
      answer:
        "Typically Quality and EHS, HR, Procurement, Operations and Management, depending on the assessments requested. Part of the work is identifying which function holds each answer so the request does not stall on one person."
    },
    {
      question: "Can Evipace guarantee a particular status or result?",
      answer:
        "No. Evipace does not control assessment outcomes, document acceptance or any status shown to your customer, and makes no promise about them."
    },
    {
      question: "Does Evipace access our platform account?",
      answer:
        "Your company keeps control of its own account and makes the final submission. Evipace prepares the underlying company data, evidence and answer material for internal confirmation."
    },
    {
      question: "What if the assessments are reissued later?",
      answer:
        "Assessments can be updated or flagged for review over time. Because the work is structured around the company information rather than around one submission, most of it can be reviewed and reused rather than rebuilt."
    }
  ]
};

export const vsmeSustainabilityReportContent: CommercialServicePageContent = {
  eyebrow: "VSME SUSTAINABILITY REPORTING",
  title:
    "Need to prepare VSME sustainability information? We help structure the report from your company data.",
  intro: [
    "Preparing a VSME sustainability report starts with company data, not with writing a polished sustainability narrative.",
    "Energy, emissions, workforce data, policies, environmental information and governance-related information may sit across several internal functions.",
    "Evipace helps structure the relevant information, identify missing inputs and prepare a reviewable VSME reporting draft based on the company data available."
  ],
  directAnswers: {
    eyebrow: "The short version",
    items: [
      {
        question: "What is VSME?",
        answer: [
          "VSME is the voluntary sustainability reporting standard for non-listed small and medium-sized enterprises developed by EFRAG.",
          "It is structured so a smaller company can report sustainability information in a recognised format without applying the full set of standards written for large, mandatory reporters. It is organised into a Basic Module and a more detailed Comprehensive Module.",
          "It is commonly used to answer customer, bank and supply-chain information requests with one consistent set of company data."
        ]
      },
      {
        question: "Is VSME mandatory?",
        answer: [
          "No. VSME is a voluntary standard; it does not by itself place a reporting obligation on an SME.",
          "Companies generally prepare it because a customer, bank or other counterparty asks for structured sustainability information, not because a law requires the report.",
          "European sustainability reporting rules continue to change, and whether any mandatory obligation applies to a specific company depends on that company's own circumstances. This is general information, not legal advice — the current status of the standard and the underlying legislation is published by EFRAG and in the Official Journal."
        ]
      }
    ],
    sources: [
      primarySources.efragVoluntaryStandard,
      primarySources.eurLexReportingDirective
    ]
  },
  primaryCta: "Send us your VSME reporting request",
  secondaryCta: {
    label: "See what VSME data to prepare",
    href: "/en/resources/vsme-data-sustainability-report"
  },
  qualifier:
    "The exact information required depends on the reporting scope and the disclosures being prepared.",
  heroVisual: {
    label: "Reporting build",
    items: ["Scope", "Company data", "Sources", "Reporting draft"]
  },
  fit: {
    eyebrow: "Report inputs",
    title: "What goes into the report?",
    intro:
      "The report scope determines the final data set. These are common areas to map before drafting.",
    items: [
      {
        title: "Company and reporting information",
        body:
          "Legal entity, reporting period, sites, activities and reporting basis need to be clear first.",
        icon: Building2
      },
      {
        title: "Energy and emissions",
        body:
          "Electricity, fuels, purchased energy and Scope 1 and Scope 2 calculations may be relevant.",
        icon: Calculator
      },
      {
        title: "Environmental topics",
        body:
          "Water, waste, resource use and other environmental information are mapped where applicable.",
        icon: Factory
      },
      {
        title: "Workforce",
        body:
          "HR data needs clear definitions for headcount, workforce categories, training and health and safety information.",
        icon: Users
      },
      {
        title: "Policies and practices",
        body:
          "Approved policies, actual practices, initiatives and gaps should be separated.",
        icon: FileText
      },
      {
        title: "Governance-related information",
        body:
          "Company statements, incidents, confirmations and approvals need internal ownership.",
        icon: ShieldCheck
      }
    ]
  },
  service: {
    eyebrow: "Reporting service",
    title: "From scattered company data to a structured reporting draft.",
    intro:
      "We handle the practical reporting work while keeping source information and company confirmation visible.",
    items: [
      {
        title: "Scope definition",
        body:
          "We establish which company or entity, sites and reporting period are being covered.",
        icon: MapPinned
      },
      {
        title: "Data mapping",
        body:
          "We map required information to the internal teams and documents likely to contain it.",
        icon: Database
      },
      {
        title: "Quantitative data preparation",
        body:
          "We organise energy, emissions and other quantitative information relevant to the reporting scope.",
        icon: Calculator
      },
      {
        title: "Qualitative information",
        body:
          "We structure policies, practices and company statements based on actual internal information.",
        icon: FileText
      },
      {
        title: "Evidence and source mapping",
        body:
          "We keep the source of important data and statements visible.",
        icon: FileCheck2
      },
      {
        title: "Gap review",
        body:
          "Missing or unconfirmed information remains visible.",
        icon: AlertCircle
      },
      {
        title: "Draft preparation",
        body:
          "We prepare a structured reporting draft for internal review.",
        icon: ClipboardCheck
      },
      {
        title: "Human review",
        body:
          "The output is reviewed before the client confirms company facts.",
        icon: ShieldCheck
      }
    ]
  },
  inputs: {
    title: "You do not need a finished ESG data system before starting.",
    body:
      "Send the information already available and the reporting purpose you are working from. We can identify what is usable, what needs calculation and what still needs confirmation.",
    items: [
      "Company information",
      "Electricity and fuel data",
      "Emissions calculations if already available",
      "Workforce information",
      "Environmental records",
      "Policies",
      "Certificates",
      "Prior ESG or customer responses",
      "Existing reports",
      "Internal spreadsheets",
      "Relevant supporting documents"
    ]
  },
  process: {
    title: "How the reporting work moves",
    steps: [
      {
        title: "Define reporting scope",
        body:
          "We clarify why the report is being prepared, which entity and period are covered and what the output should support."
      },
      {
        title: "Map required disclosures",
        body:
          "We identify which Basic or Comprehensive information is relevant to the agreed reporting purpose."
      },
      {
        title: "Collect available company data",
        body:
          "Existing records, spreadsheets, policies, certificates and source documents are mapped to the reporting structure."
      },
      {
        title: "Prepare calculations and narrative inputs",
        body:
          "Relevant quantitative data and qualitative company information are structured for review."
      },
      {
        title: "Review gaps and assumptions",
        body:
          "Missing, not applicable, to calculate and to confirm remain separate statuses."
      },
      {
        title: "Prepare reporting draft",
        body:
          "The structured information is assembled into a reviewable VSME reporting draft."
      },
      {
        title: "Client confirms company facts",
        body:
          "Your company confirms scope, data, statements and final external use before the report is used."
      }
    ]
  },
  model: {
    title: "A VSME report and a customer ESG questionnaire are not the same thing.",
    body:
      "A VSME or Voluntary Standard report can create a strong reusable data foundation. It does not automatically replace a customer-specific request.",
    items: [
      { title: "Framework", body: "VSME provides a structured sustainability-reporting framework." },
      { title: "Customer request", body: "A customer may ask different questions, periods, scopes, units or platform fields." },
      { title: "Evidence", body: "Specific evidence may still be required for a particular answer." },
      { title: "Reuse", body: "The data foundation can make recurring requests easier to answer." },
      { title: "Review", body: "Each reuse still needs scope, period and wording checks." }
    ]
  },
  deliverables: {
    title: "What you receive",
    qualifier:
      "The output depends on the agreed reporting scope. This service does not provide assurance, audit, certification or universal customer acceptance.",
    items: [
      "Structured VSME reporting draft",
      "Organised company data",
      "Scope 1 & 2 calculations where separately in scope",
      "Source and evidence mapping",
      "Gap list",
      "Assumptions requiring confirmation",
      "Supporting policy or document drafts where appropriate",
      "Review-ready reporting package"
    ]
  },
  trust: {
    eyebrow: "Reporting discipline",
    title: "The company confirms the company facts.",
    body: [
      "Evipace can structure and draft the reporting content. The company remains responsible for confirming the facts and deciding how the report is used externally.",
      "This keeps reporting grounded in company reality instead of turning gaps into polished but unsupported claims."
    ],
    items: [
      { label: "Entity and site scope", body: "The reporting boundary needs company confirmation." },
      { label: "Company descriptions", body: "Activities, sites and context should reflect the actual business." },
      { label: "Workforce information", body: "Employee figures and definitions need internal ownership." },
      { label: "Policy status", body: "Approved, draft and missing policies should stay distinct." },
      { label: "Environmental data", body: "Operational values and calculation inputs need source traceability." },
      { label: "Targets and historical statements", body: "Targets, incidents and past claims need a real basis." },
      { label: "Final external use", body: "The company decides and confirms final use of the report." }
    ]
  },
  resources: {
    title: "Useful VSME resources",
    body:
      "Use these resources for the data detail. Use the service when the reporting draft needs to be prepared.",
    links: [
      {
        title: "VSME data guide",
        body: "See the company data, disclosures and evidence areas to prepare.",
        href: "/en/resources/vsme-data-sustainability-report"
      },
      {
        title: "ESG data owners",
        body: "Map reporting data to Finance, HR, EHS, Quality and Management.",
        href: "/en/resources/esg-data-owners"
      },
      {
        title: "ESG evidence for suppliers",
        body: "Connect report statements to documents and source records.",
        href: "/en/resources/esg-evidence-for-suppliers"
      },
      {
        title: "Scope 1 & 2 data calculation",
        body: "Understand energy and emissions source data.",
        href: "/en/resources/scope-1-2-data-calculation"
      },
      {
        title: "Reusable ESG data",
        body: "Keep the reporting basis useful for future requests.",
        href: "/en/resources/reusable-esg-data"
      }
    ]
  },
  finalCta: {
    title: "Ready to turn the company data into a VSME reporting draft?",
    body:
      "Send us the information you already have or the reporting request you are working from. We can identify what is available, what still needs to be prepared and how the information fits into the reporting structure.",
    primaryLabel: "Send us your VSME reporting request",
    secondaryLabel: "See the VSME data guide",
    secondaryHref: "/en/resources/vsme-data-sustainability-report"
  },
  relatedServices: {
    title: "What the report is usually built on",
    body:
      "A VSME report is only as good as the company data underneath it. Two adjoining pieces of work come up in almost every reporting engagement.",
    links: [
      {
        title: "Scope 1 & 2 calculation",
        body: "Energy and emissions figures reported under VSME have to be calculated and documented before they can be reported.",
        href: "/en/scope-1-2-calculation"
      },
      {
        title: "Customer ESG requests",
        body: "The same structured data usually answers the customer requests that prompted the report in the first place.",
        href: "/en/esg-customer-requests"
      }
    ]
  },
  faq: [
    {
      question: "What is VSME?",
      answer:
        "VSME is the voluntary sustainability reporting standard for non-listed small and medium-sized enterprises developed by EFRAG. It lets a smaller company report sustainability information in a recognised structure, organised into a Basic Module and a more detailed Comprehensive Module, without applying the full set of standards written for large mandatory reporters."
    },
    {
      question: "Is VSME mandatory?",
      answer:
        "No. VSME is a voluntary standard and does not by itself create a reporting obligation. Companies usually prepare it because a customer, bank or other counterparty has asked for structured sustainability information. Whether any mandatory reporting requirement applies to a particular company depends on that company's own circumstances; this is general information rather than legal advice."
    },
    {
      question: "Who is VSME intended for?",
      answer:
        "Non-listed small and medium-sized enterprises, including manufacturing suppliers that receive sustainability information requests from larger customers but are not themselves subject to mandatory reporting."
    },
    {
      question: "How is VSME different from mandatory ESRS reporting?",
      answer:
        "The ESRS are the reporting standards used for mandatory corporate sustainability reporting under EU law. VSME is a separate, voluntary standard with a much smaller and simpler set of disclosures, designed for SMEs that are not in scope of that mandatory regime but still need to provide structured information."
    },
    {
      question: "What information does a VSME report need?",
      answer:
        "Company and site information, energy consumption, Scope 1 and Scope 2 emissions, other environmental data such as water and waste where relevant, workforce and health-and-safety figures, and information about policies and governance. The Comprehensive Module adds further detail. Our VSME data guide sets out the practical list."
    },
    {
      question: "Can a VSME report help answer customer ESG requests?",
      answer:
        "Usually, yes. The data collected for the report is the same data customers, banks and supplier platforms ask for. Prepared once and kept structured, it can be reused for later requests after checking the reporting period and continued validity."
    },
    {
      question: "Do you audit or assure the report?",
      answer:
        "No. Evipace prepares the reporting content and its data foundation, with sources, assumptions and gaps documented. It is not an audit or assurance service."
    }
  ]
};
