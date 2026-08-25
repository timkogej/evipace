import type { EnglishResourceArticleContent } from "./EnglishResourceArticle";

const sendRequest = "/en/send-request";

export const scope12DataCalculationContent: EnglishResourceArticleContent = {
  eyebrow: "Scope 1 & 2 data",
  title: "What data do you need to calculate Scope 1 and Scope 2?",
  deck:
    "A practical guide to the company data, emission factors and documentation needed before raw energy and fuel records become CO2e.",
  methodNote:
    "Boundary - activity data - emission factor - CO2e - source / version / assumptions.",
  quickAnswerTitle: "Start with sources and units, not a CO2e total.",
  summary: [
    "A Scope 1 and Scope 2 calculation does not start with a carbon number. It starts with the reporting boundary, reporting period and a complete list of relevant emission sources.",
    "Keep the layers separate: raw company activity data, emission factor, calculated CO2e result, and supporting source, version and assumptions. That separation makes the calculation easier to check and reuse."
  ],
  quickChecks: [
    {
      title: "Define the boundary.",
      body:
        "Confirm the legal entity, sites, facilities, leased assets and operating logic included in the calculation."
    },
    {
      title: "Collect activity data.",
      body:
        "Use physical quantities where possible: kWh, litres, kg, MWh or other relevant units."
    },
    {
      title: "Use suitable factors.",
      body:
        "Document the emission factor source, version, unit and method for each calculation line."
    },
    {
      title: "Keep the audit trail.",
      body:
        "The result should trace back from CO2e to calculation, factor, activity data and original source document."
    }
  ],
  nav: [
    ["01", "Boundary", "#boundary"],
    ["02", "Activity data", "#activity-data"],
    ["03", "Scope 1", "#scope-1"],
    ["04", "Scope 2", "#scope-2"],
    ["05", "Calculation", "#calculation"],
    ["06", "Evidence", "#evidence"],
    ["07", "Gaps", "#gaps"],
    ["08", "First two hours", "#first-two-hours"]
  ].map(([number, label, href]) => ({ number, label, href })),
  sections: [
    {
      id: "boundary",
      number: "01",
      title: "Before collecting invoices, define what is in the inventory.",
      paragraphs: [
        "A common mistake is to add electricity and gas invoices before deciding which company is being calculated. Scope 1 and Scope 2 only make sense against a defined reporting boundary.",
        "The boundary may cover one legal entity, several entities, one production site, multiple facilities, rented premises, owned vehicles, leased vehicles or controlled equipment. The selected consolidation approach affects which activities belong in the calculation."
      ],
      bullets: [
        "Which legal entity or group is reporting?",
        "Which sites, facilities and business units are included?",
        "Which leased assets or rented premises are controlled or used?",
        "Which vehicles, equipment and energy sources fall inside the boundary?",
        "Which reporting period applies?"
      ],
      principle: {
        label: "Practical question",
        text:
          "Which sites, facilities and activities are actually inside this Scope 1 and Scope 2 inventory?"
      }
    },
    {
      id: "activity-data",
      number: "02",
      title: "Activity data is not the same as emissions.",
      paragraphs: [
        "Activity data is the raw company information used in the calculation. It is not yet a greenhouse gas result. A kWh electricity value, a litre diesel value or a kg refrigerant loss becomes CO2e only after the correct method and emission factor are applied.",
        "For emissions work, physical quantities are normally more useful than cost figures. A gas invoice amount in euros is much weaker than the actual billed energy quantity and period."
      ],
      cards: [
        {
          title: "Activity data",
          body:
            "kWh electricity, m3 natural gas, litres of diesel, kg refrigerant loss, MWh purchased heat or other measured quantities."
        },
        {
          title: "Emission factor",
          body:
            "A factor with source, version, unit and method context, such as kg CO2e per kWh or per litre."
        },
        {
          title: "Calculated emissions",
          body:
            "The CO2e result after quantity, unit conversion and emission factor have been applied."
        },
        {
          title: "Supporting source",
          body:
            "Invoice, meter record, fuel card report, service log, contract information, factor source and calculation workbook."
        }
      ],
      principle: {
        text:
          "Boundary -> activity data -> emission factor -> CO2e -> source, version and assumptions."
      }
    },
    {
      id: "scope-1",
      number: "03",
      title: "Scope 1 starts with direct sources you own or control.",
      paragraphs: [
        "Scope 1 covers direct greenhouse gas emissions from sources owned or controlled by the reporting company. For many manufacturing SMEs, the first sources to check are stationary combustion, mobile combustion, refrigerants and, where relevant, process emissions.",
        "Not every company has process emissions. That point should be checked, not assumed."
      ],
      bullets: [
        "Stationary combustion: natural gas, heating oil, LPG, generator diesel or other fuels used in boilers, furnaces, burners, dryers or controlled equipment.",
        "Mobile combustion: diesel, petrol, LPG, CNG or other fuels used by owned or controlled vehicles.",
        "Refrigerants: refrigerant type and kg topped up or lost, from service records, maintenance logs or contractor documentation.",
        "Process emissions: direct emissions from physical or chemical production processes, only if they actually occur."
      ]
    },
    {
      id: "scope-2",
      number: "04",
      title: "Scope 2 is purchased energy, not only electricity.",
      paragraphs: [
        "Scope 2 covers indirect emissions from the generation of purchased or acquired electricity, steam, heat and cooling consumed by the company.",
        "For electricity, keep site, period, consumption, supplier, tariff or product information and any relevant contractual instruments separate. Electricity consumption remains the starting point even where green electricity claims exist."
      ],
      bullets: [
        "Purchased electricity by site and reporting period",
        "Purchased heat, steam or cooling where relevant",
        "Supplier, contract, tariff or product information",
        "Location-based Scope 2 method information",
        "Market-based Scope 2 information where applicable and supported"
      ],
      principle: {
        text:
          "Do not write 'green electricity = zero' into the workbook without checking the Scope 2 method and supporting contractual information."
      },
      links: [
        {
          label: "Get Scope 1 & 2 calculation support",
          href: "/en/scope-1-2-calculation"
        },
        {
          label: "Understand Scope 1, Scope 2 and Scope 3",
          href: "/en/resources/scope-1-2-3-explained"
        },
        {
          label: "Open the Scope 1 & 2 data collection template",
          href: "/en/resources/scope-1-2-data-collection-template"
        }
      ]
    },
    {
      id: "calculation",
      number: "05",
      title: "The calculation is simple in principle and easy to weaken in practice.",
      paragraphs: [
        "The basic calculation multiplies activity data by an appropriate emission factor. The practical risk is not the formula itself. It is using the wrong unit, wrong factor, wrong year, wrong source category or unclear boundary.",
        "A calculation row should keep quantity, unit, factor, factor unit, result, source, assumption and reviewer visible."
      ],
      bullets: [
        "10,000 litres fuel x kg CO2e per litre = kg CO2e",
        "kg CO2e divided by 1,000 = t CO2e",
        "kWh and MWh should not be mixed without conversion",
        "CO2 and CO2e should not be treated as identical unless the factor says so",
        "The factor source and version should remain attached to the result"
      ],
      principle: {
        text:
          "Raw data and calculation outputs should stay separate. That is what makes review possible."
      }
    },
    {
      id: "evidence",
      number: "06",
      title: "Every material value needs a source trail.",
      paragraphs: [
        "The final workbook is not the only evidence. For every material data point, it should remain clear which source document, system extract or technical record supplied the value.",
        "A good trail works backwards from result to calculation, factor, activity data and original source document."
      ],
      bullets: [
        "Energy invoices and meter exports",
        "Fuel card reports, delivery invoices or fleet records",
        "Refrigerant service reports and equipment logs",
        "Energy contracts and supplier information for Scope 2",
        "Emission factor source, year, version and unit",
        "Documented assumptions, estimates and exclusions"
      ],
      links: [
        {
          label: "See ESG evidence for suppliers",
          href: "/en/resources/esg-evidence-for-suppliers"
        },
        {
          label: "Find internal ESG data owners",
          href: "/en/resources/esg-data-owners"
        },
        {
          label: "Check one evidence document",
          href: "/en/resources/esg-evidence-readiness-check"
        },
        {
          label: "See VSME reporting data",
          href: "/en/resources/vsme-data-sustainability-report"
        }
      ]
    },
    {
      id: "gaps",
      number: "07",
      title: "Missing data should be documented, not hidden.",
      paragraphs: [
        "Data gaps are normal, especially in a first calculation. The important distinction is whether the source has not yet been collected, whether a measured value does not exist, or whether an estimate or proxy method is methodologically needed.",
        "A documented estimate is better than a hidden assumption. It should be labelled as an estimate and not presented as measured data."
      ],
      cards: [
        {
          title: "Invoice missing, meter value available",
          body: "Use the stronger available source if it covers the correct scope and period."
        },
        {
          title: "Fuel litres missing, distance available",
          body:
            "Check whether a distance-based approach is appropriate for the reporting context."
        },
        {
          title: "Refrigerant kg missing",
          body:
            "Ask maintenance, Facility or the external service company for the service documentation."
        },
        {
          title: "Only total building use is known",
          body:
            "Clarify the boundary, allocation logic and whether the total value includes other users."
        }
      ]
    },
    {
      id: "first-two-hours",
      number: "08",
      title: "A practical order for the first two hours.",
      paragraphs: [
        "If you need to begin today, do not start by searching for emission factors. First build the source inventory."
      ],
      bullets: [
        "Define the reporting year.",
        "List legal entities, sites and facilities.",
        "Identify stationary fuel sources.",
        "Check fleet and fuel records.",
        "Check refrigeration and air-conditioning systems.",
        "Ask whether process emissions may be relevant.",
        "Collect purchased electricity by site.",
        "Check purchased heat, steam and cooling.",
        "Save Scope 2 contract and supplier information.",
        "Record source, unit and period for every data point."
      ],
      principle: {
        text:
          "Only after that should emission factors be applied."
      }
    }
  ],
  cta: {
    eyebrow: "Scope 1 & 2 support",
    title: "Have the source data, but not the calculation?",
    body:
      "Send the available energy, fuel, refrigerant and site information. We can structure the emission sources, prepare the Scope 1 and Scope 2 calculation and document sources, factors, assumptions and data gaps for internal review.",
    primaryLabel: "Send your ESG request",
    primaryHref: sendRequest,
    secondaryLabel: "Scope 1 & 2 calculation service",
    secondaryHref: "/en/scope-1-2-calculation"
  },
  faq: [
    {
      question: "What data do we need for Scope 1?",
      answer:
        "Typical Scope 1 inputs include fuels used in owned or controlled stationary equipment, fuel used by relevant vehicles, refrigerant type and kg lost or topped up, and process emissions where they actually occur."
    },
    {
      question: "What data do we need for Scope 2?",
      answer:
        "Usually purchased electricity consumption, and where relevant purchased heat, steam and cooling. For electricity, supplier, contract and market-based information may also be needed depending on the method and request."
    },
    {
      question: "Are electricity and gas invoices enough?",
      answer:
        "They may cover important activity data, but the company should also check fleet, refrigerants, purchased heat or cooling, process emissions, reporting boundary and factor documentation."
    },
    {
      question: "Is Scope 1 plus Scope 2 the full carbon footprint?",
      answer:
        "Not automatically. Scope 3 covers other indirect value-chain emissions, which may be relevant depending on the company, customer request or reporting framework."
    }
  ],
  sources: [
    {
      label: "GHG Protocol - Corporate Standard",
      href: "https://ghgprotocol.org/corporate-standard"
    },
    {
      label: "GHG Protocol - Scope 2 Guidance",
      href: "https://ghgprotocol.org/scope-2-guidance"
    },
    {
      label: "GHG Protocol - Corporate Standards Update FAQ",
      href:
        "https://ghgprotocol.org/blog/ghg-protocol-announces-key-standard-development-updates-faq-resource"
    }
  ]
};

export const scope123ExplainedContent: EnglishResourceArticleContent = {
  eyebrow: "Greenhouse gas emissions",
  title: "Scope 1, 2 and 3 explained for companies and suppliers.",
  deck:
    "A clear explanation of the three GHG scopes, with practical manufacturing examples and the company perspective kept explicit.",
  methodNote:
    "Reporting company - boundary - direct sources - purchased energy - value chain.",
  quickAnswerTitle: "The scope depends on the reporting company.",
  summary: [
    "Scope 1 covers direct emissions from sources owned or controlled by the reporting company. Scope 2 covers indirect emissions from purchased or acquired electricity, steam, heat and cooling consumed by the company. Scope 3 covers other indirect value-chain emissions.",
    "The same physical emission can sit in different inventories depending on whose perspective is being reported. A supplier's Scope 1 emissions can be part of a customer's Scope 3 inventory."
  ],
  quickChecks: [
    {
      title: "Scope 1 is direct.",
      body:
        "Natural gas in a company boiler, diesel in controlled vehicles or refrigerant loss from controlled equipment."
    },
    {
      title: "Scope 2 is purchased energy.",
      body:
        "Electricity, steam, heat or cooling generated outside the company but consumed by the reporting company."
    },
    {
      title: "Scope 3 is value chain.",
      body:
        "Other indirect upstream and downstream emissions, structured into 15 GHG Protocol categories."
    },
    {
      title: "Perspective matters.",
      body:
        "Scopes are assigned from the reporting company's boundary, not from a universal label attached to the activity."
    }
  ],
  nav: [
    ["01", "Meaning", "#meaning"],
    ["02", "Scope 1", "#scope-1"],
    ["03", "Scope 2", "#scope-2"],
    ["04", "Scope 3", "#scope-3"],
    ["05", "Categories", "#categories"],
    ["06", "Perspective", "#perspective"],
    ["07", "Questionnaires", "#questionnaires"],
    ["08", "Standards", "#standards"]
  ].map(([number, label, href]) => ({ number, label, href })),
  sections: [
    {
      id: "meaning",
      number: "01",
      title: "What does Scope mean in greenhouse gas accounting?",
      paragraphs: [
        "The Greenhouse Gas Protocol uses Scope 1, Scope 2 and Scope 3 to classify a company's greenhouse gas emissions. The structure helps show whether emissions come from direct sources, purchased energy or the wider value chain.",
        "A corporate greenhouse gas inventory is normally reported in CO2e, because several greenhouse gases can be converted into carbon dioxide equivalents."
      ],
      bullets: [
        "CO2",
        "CH4",
        "N2O",
        "HFCs",
        "PFCs",
        "SF6",
        "NF3"
      ],
      principle: {
        text:
          "The three scopes describe the relationship between the reporting company and the emission source."
      }
    },
    {
      id: "scope-1",
      number: "02",
      title: "Scope 1: direct emissions from owned or controlled sources.",
      paragraphs: [
        "Scope 1 includes direct greenhouse gas emissions from sources owned or controlled by the reporting company.",
        "For a manufacturer, Scope 1 often starts with combustion sources, company vehicles and refrigerants. Direct process emissions may also exist in some sectors, but they should not be assumed for every company."
      ],
      cards: [
        {
          title: "Stationary combustion",
          body:
            "Natural gas or other fuels in boilers, furnaces, burners, production equipment or generators."
        },
        {
          title: "Mobile combustion",
          body:
            "Fuel used in owned or controlled cars, vans, trucks or other operating vehicles."
        },
        {
          title: "Fugitive emissions",
          body:
            "Refrigerant losses from air-conditioning, cooling, heat pump or production refrigeration systems."
        },
        {
          title: "Process emissions",
          body:
            "Direct emissions from certain physical or chemical production processes, where they actually occur."
        }
      ]
    },
    {
      id: "scope-2",
      number: "03",
      title: "Scope 2: emissions from purchased energy.",
      paragraphs: [
        "Scope 2 covers indirect emissions from the generation of purchased or acquired electricity, steam, heat or cooling consumed by the company.",
        "The company does not emit directly at its own site when grid electricity is generated elsewhere. But the company consumes the energy, so the generation emissions are treated as Scope 2."
      ],
      bullets: [
        "Purchased electricity for production machines, lighting, compressors, IT and buildings",
        "Purchased heat for offices or production spaces",
        "Purchased steam or cooling where relevant",
        "Location-based Scope 2 using grid or regional emission intensity",
        "Market-based Scope 2 where suitable contractual instruments and supplier information apply"
      ],
      principle: {
        text:
          "Purchased electricity is not Scope 3 just because the power plant is outside your company."
      }
    },
    {
      id: "scope-3",
      number: "04",
      title: "Scope 3: other indirect value-chain emissions.",
      paragraphs: [
        "Scope 3 covers other indirect emissions in the reporting company's upstream and downstream value chain that are not Scope 2.",
        "For a manufacturing company this can include purchased materials, capital goods, external transport, waste treatment, business travel, employee commuting, processing of sold products, use of sold products and end-of-life treatment."
      ],
      principle: {
        text:
          "Scope 3 is not simply 'all supplier emissions'. It is the reporting company's value-chain inventory."
      }
    },
    {
      id: "categories",
      number: "05",
      title: "The 15 Scope 3 categories give the value chain structure.",
      paragraphs: [
        "The GHG Protocol Scope 3 Standard groups value-chain emissions into eight upstream and seven downstream categories. Not every category applies to every company."
      ],
      cards: [
        {
          title: "Upstream categories 1-4",
          body:
            "Purchased goods and services, capital goods, fuel- and energy-related activities not included in Scope 1 or 2, and upstream transportation and distribution."
        },
        {
          title: "Upstream categories 5-8",
          body:
            "Waste generated in operations, business travel, employee commuting and upstream leased assets."
        },
        {
          title: "Downstream categories 9-12",
          body:
            "Downstream transportation and distribution, processing of sold products, use of sold products and end-of-life treatment of sold products."
        },
        {
          title: "Downstream categories 13-15",
          body:
            "Downstream leased assets, franchises and investments."
        }
      ],
      principle: {
        text:
          "The categories are the full framework. Relevance depends on the business model."
      }
    },
    {
      id: "perspective",
      number: "06",
      title: "The same emission can be Scope 1 for one company and Scope 3 for another.",
      paragraphs: [
        "A steel producer burns natural gas. For the steel producer, those direct emissions are Scope 1. A machine builder that buys the steel may treat associated upstream material emissions as part of Scope 3 Category 1.",
        "This is not automatically a double-counting error inside one inventory. Scope classification is made from the perspective of each reporting company."
      ],
      principle: {
        label: "Supplier perspective",
        text:
          "Your Scope 1 and Scope 2 can become relevant input to your customer's Scope 3."
      }
    },
    {
      id: "questionnaires",
      number: "07",
      title: "In customer questionnaires, the field label is not enough.",
      paragraphs: [
        "If a customer asks for Scope 1, do not enter a full carbon footprint. If a customer asks for Scope 2, check whether location-based, market-based or both methods are requested.",
        "If a customer asks for Scope 3, clarify whether it wants a total, selected categories, a screening, a product-specific input or a supplier corporate inventory."
      ],
      bullets: [
        "Which legal entity or site is in scope?",
        "Which reporting period applies?",
        "Which scopes and categories are requested?",
        "Which method and emission factor source were used?",
        "Is supporting evidence or a calculation workbook required?"
      ],
      links: [
        {
          label: "See the Scope 1 and Scope 2 data guide",
          href: "/en/resources/scope-1-2-data-calculation"
        },
        {
          label: "Get Scope 1 & 2 calculated",
          href: "/en/scope-1-2-calculation"
        },
        {
          label: "Start with the customer ESG questionnaire",
          href: "/en/resources/customer-esg-questionnaire-received"
        }
      ]
    },
    {
      id: "standards",
      number: "08",
      title: "Current rules and future standard development should stay separate.",
      paragraphs: [
        "GHG Protocol and ISO are working toward a harmonised global Corporate Standard. Current rules should stay separate from proposed or future developments.",
        "The official July 2026 update describes a consolidated public consultation planned for Q2 2027 and a final harmonised Corporate Standard planned for Q4 2028. Drafts and proposals should not be presented as already applicable requirements."
      ],
      principle: {
        text:
          "For a calculation today, use the currently applicable methodology and document boundary, data, factors, methods and assumptions."
      }
    }
  ],
  cta: {
    eyebrow: "From concept to data",
    title: "Know the scopes, but still missing the numbers?",
    body:
      "Send the customer request or available energy and emissions data. We can identify which scope is being asked for, structure the source data and prepare a traceable response for internal review.",
    primaryLabel: "Send your ESG request",
    primaryHref: sendRequest,
    secondaryLabel: "Scope 1 & 2 calculation service",
    secondaryHref: "/en/scope-1-2-calculation"
  },
  faq: [
    {
      question: "What is the difference between Scope 1, Scope 2 and Scope 3?",
      answer:
        "Scope 1 is direct emissions from owned or controlled sources. Scope 2 is indirect emissions from purchased electricity, steam, heat or cooling. Scope 3 is other indirect value-chain emissions."
    },
    {
      question: "Is electricity Scope 2?",
      answer:
        "Purchased or acquired electricity consumed by the reporting company is generally part of Scope 2. Current guidance distinguishes location-based and, where applicable, market-based accounting."
    },
    {
      question: "Does every company need to calculate Scope 3?",
      answer:
        "Not for the same reason in every context. Scope 3 may be required by a customer, reporting framework, programme, bank or climate target, but the need and depth depend on the reporting context."
    },
    {
      question: "Can the same emission appear in two companies' inventories?",
      answer:
        "Yes. Scopes are assigned from the reporting company's perspective. A supplier's direct emissions can be relevant to a customer's value-chain inventory."
    }
  ],
  sources: [
    {
      label: "GHG Protocol - Corporate Standard",
      href: "https://ghgprotocol.org/corporate-standard"
    },
    {
      label: "GHG Protocol - Scope 2 Guidance",
      href: "https://ghgprotocol.org/scope-2-guidance"
    },
    {
      label: "GHG Protocol - Corporate Value Chain Scope 3 Standard",
      href: "https://ghgprotocol.org/corporate-value-chain-scope-3-standard"
    },
    {
      label: "GHG Protocol - Scope 3 Calculation Guidance",
      href: "https://ghgprotocol.org/scope-3-calculation-guidance-2"
    },
    {
      label: "GHG Protocol - Corporate Standards Update FAQ",
      href:
        "https://ghgprotocol.org/blog/ghg-protocol-announces-key-standard-development-updates-faq-resource"
    }
  ]
};

export const vsmeDataSustainabilityReportContent: EnglishResourceArticleContent = {
  eyebrow: "VSME reporting data",
  title: "What data do you need for a VSME sustainability report?",
  deck:
    "A practical data-preparation guide for SMEs that want to build a VSME or Voluntary Standard report without losing source traceability.",
  methodNote:
    "Requirement - internal source - calculation or statement - evidence - report.",
  quickAnswerTitle: "Build the data basis before writing the report.",
  summary: [
    "A VSME sustainability report usually starts as a data project. Company information, energy, emissions, water, waste, workforce data, health and safety, policies and governance confirmations often sit in different internal functions.",
    "The report should structure company reality. It should not invent policies, targets, climate-risk analysis or Scope 3 calculations that the company has not actually prepared."
  ],
  quickChecks: [
    {
      title: "Confirm the version and status.",
      body:
        "Use the 2026 Voluntary Standard context and keep adoption separate from legal entry into force."
    },
    {
      title: "Start with Basic.",
      body:
        "Prepare Basic Module data first, then decide whether Comprehensive information is useful for customers, banks or investors."
    },
    {
      title: "Assign owners.",
      body:
        "Finance, HR, EHS, Quality, Facility, Procurement, Compliance and Management may each own part of the report."
    },
    {
      title: "Keep gaps visible.",
      body:
        "Unavailable, not applicable, to calculate and to confirm are different statuses."
    }
  ],
  nav: [
    ["01", "Status", "#status"],
    ["02", "Basic", "#basic"],
    ["03", "Environment", "#environment"],
    ["04", "Workforce", "#workforce"],
    ["05", "Governance", "#governance"],
    ["06", "Data map", "#data-map"],
    ["07", "Comprehensive", "#comprehensive"],
    ["08", "Reuse", "#reuse"]
  ].map(([number, label, href]) => ({ number, label, href })),
  sections: [
    {
      id: "status",
      number: "01",
      title: "VSME remains the common term, but the 2026 status matters.",
      paragraphs: [
        "Many companies still use the term VSME. In 2026, the relevant framework shifted to the Sustainability Reporting Standard for Voluntary Use, also called the Voluntary Standard.",
        "The European Commission adopted the new Voluntary Standard on 3 July 2026; as of 22 August 2026, adoption did not yet mean entry into force because publication in the Official Journal was still outstanding."
      ],
      principle: {
        text:
          "Voluntary reporting framework does not mean mandatory reporting for every SME."
      }
    },
    {
      id: "basic",
      number: "02",
      title: "The Basic Module starts with company and reporting information.",
      paragraphs: [
        "Before sustainability narratives are written, the reporting basis must be clear: company, period, legal form, activity, size information, sites and any certifications or labels that actually exist.",
        "Scope mismatches weaken the report. Do not combine group revenue with energy data from only one plant unless that is the deliberately defined reporting boundary."
      ],
      bullets: [
        "Legal entity and reporting period",
        "Legal form, activity code, turnover and balance-sheet data where relevant",
        "Employees, sites and facilities",
        "Certifications or labels with scope and validity",
        "Existing practices, policies, initiatives and targets"
      ],
      principle: {
        text:
          "A policy in draft is not the same as an approved company policy."
      }
    },
    {
      id: "environment",
      number: "03",
      title: "Environmental data is mostly operational source data.",
      paragraphs: [
        "For a manufacturing company, energy, emissions, pollutants, water, waste and material flows are often the most concrete data areas. Some values can come from invoices or meters. Others require calculation or confirmation.",
        "The 2026 Voluntary Standard includes energy consumption and gross greenhouse gas emissions in tCO2e for Scope 1 and location-based Scope 2, with specific differentiation for companies with 10 employees or fewer."
      ],
      bullets: [
        "Electricity, fuels, purchased heat and other energy in original units",
        "Scope 1 and location-based Scope 2 calculation basis",
        "Pollutant information where already reported under legal or environmental-management requirements",
        "Biodiversity-sensitive site checks where applicable",
        "Water withdrawal and, where relevant, water consumption",
        "Waste quantities, hazardous status, treatment route and recycler or waste contractor data",
        "Relevant annual material flows for manufacturing where applicable"
      ],
      links: [
        {
          label: "See the Scope 1 & 2 data guide",
          href: "/en/resources/scope-1-2-data-calculation"
        },
        {
          label: "Collect Scope 1 & 2 source data",
          href: "/en/resources/scope-1-2-data-collection-template"
        }
      ]
    },
    {
      id: "workforce",
      number: "04",
      title: "Workforce data needs definitions before HR exports.",
      paragraphs: [
        "Employee data can look simple until definitions differ. HR may provide headcount while Finance uses FTE. Both may be correct, but they are not the same data point.",
        "Clarify scope, date or reporting-period logic, country structure, contract types and workforce categories before asking for the export."
      ],
      bullets: [
        "Headcount or FTE",
        "Permanent and temporary contract information",
        "Gender and country breakdowns where relevant",
        "Training hours and included training types",
        "Minimum wage or collective agreement information where relevant",
        "Recordable work-related accidents and accident-rate basis"
      ]
    },
    {
      id: "governance",
      number: "05",
      title: "Governance and policy statements should be confirmed, not guessed.",
      paragraphs: [
        "Governance disclosures can include anti-corruption, anti-bribery, Code of Conduct topics, confirmed incidents, fines or management confirmations. A zero value is still a data point and should not be assumed by the report writer.",
        "Where a statement concerns company responsibility, policy approval or sensitive incidents, the relevant internal function or authorised person should confirm it."
      ],
      cards: [
        {
          title: "Policy status",
          body:
            "Approved, draft, practice exists but not documented, not applicable, or real gap."
        },
        {
          title: "Statement owner",
          body:
            "The function able to confirm the qualitative company statement."
        },
        {
          title: "Approver",
          body:
            "The authorised person or function that approves formal external use where required."
        },
        {
          title: "Evidence",
          body:
            "Policy version, approval record, certificate, register, system export or internal confirmation."
        }
      ],
      links: [
        {
          label: "Find the internal data owner",
          href: "/en/resources/esg-data-owners"
        }
      ]
    },
    {
      id: "data-map",
      number: "06",
      title: "Build a VSME data map before drafting the report.",
      paragraphs: [
        "A practical VSME data map assigns every disclosure or data point to an internal source, owner, evidence item and status. That makes the report a controlled data project rather than a writing exercise.",
        "Useful statuses include ready, collect, calculate, confirm, gap and not applicable."
      ],
      bullets: [
        "Disclosure or report requirement",
        "Required data point or statement",
        "Internal source system or document",
        "Source owner",
        "Calculation owner where needed",
        "Supporting evidence",
        "Status and reviewer"
      ],
      principle: {
        text:
          "Report statement -> data point -> calculation or source -> evidence."
      }
    },
    {
      id: "comprehensive",
      number: "07",
      title: "Comprehensive Module data should serve a real information need.",
      paragraphs: [
        "The Comprehensive Module adds information that can be relevant for banks, investors and corporate customers. It is not automatically required for every company or every use case.",
        "For a manufacturing supplier, Comprehensive data may be useful when the report is intended as a reusable ESG information basis for customers or financing discussions."
      ],
      bullets: [
        "Business model, products, markets and business relationships",
        "Additional practices, policies, initiatives and targets",
        "GHG reduction targets where actually defined",
        "Climate risks where a real risk assessment exists",
        "Additional workforce and human-rights information",
        "Confirmed incidents or specific sector information where applicable"
      ],
      principle: {
        text:
          "Do not create a climate-risk matrix or reduction target just because a report field exists."
      }
    },
    {
      id: "reuse",
      number: "08",
      title: "The report is more valuable when the data stays reusable.",
      paragraphs: [
        "The same energy, emissions, workforce, waste, water, policy and certificate data can later support customer questionnaires, supplier platforms, bank requests and internal ESG management.",
        "That reuse only works if the company keeps the source, owner, period, unit, evidence and calculation logic, not only the final PDF."
      ],
      bullets: [
        "Store source documents and system extracts.",
        "Keep original units as well as converted units.",
        "Record factor source and version for calculated emissions.",
        "Keep report statements tied to evidence or internal confirmation.",
        "Carry gaps and assumptions forward for year-two improvement."
      ],
      links: [
        {
          label: "Get VSME sustainability reporting support",
          href: "/en/vsme-sustainability-report"
        },
        {
          label: "See what customers usually ask suppliers for",
          href: "/en/resources/esg-data-customers-request-from-suppliers"
        },
        {
          label: "See ESG evidence for suppliers",
          href: "/en/resources/esg-evidence-for-suppliers"
        }
      ]
    }
  ],
  cta: {
    eyebrow: "VSME data preparation",
    title: "Want to prepare a VSME report, but the data is scattered?",
    body:
      "Send the available company information and documents. We can map the required data, identify owners and gaps, prepare needed calculations and structure a report basis your company can review.",
    primaryLabel: "Send your ESG request",
    primaryHref: sendRequest,
    secondaryLabel: "VSME Sustainability Reporting",
    secondaryHref: "/en/vsme-sustainability-report"
  },
  faq: [
    {
      question: "What data is needed for a VSME report?",
      answer:
        "The Basic Module covers company information, practices and policies, energy and greenhouse gas emissions, environmental data, workforce, health and safety, remuneration and training, and certain governance topics. Applicability depends on the company and the specific disclosure."
    },
    {
      question: "Does every company need the Comprehensive Module?",
      answer:
        "No. The Comprehensive Module adds information that may be relevant for banks, investors and corporate customers. It should be used when it matches the purpose of the report."
    },
    {
      question: "Does VSME automatically satisfy customer ESG requests?",
      answer:
        "No. A VSME or Voluntary Standard report can provide useful structured information, but a specific customer questionnaire may ask for different scope, evidence, format or additional data."
    },
    {
      question: "Should missing data be filled with estimates?",
      answer:
        "Only where a methodologically appropriate estimate is needed and clearly documented. Missing, not applicable, to calculate and to confirm should stay distinct."
    }
  ],
  sources: [
    {
      label: "European Commission - Sustainability reporting delegated acts",
      href:
        "https://finance.ec.europa.eu/regulation-and-supervision/financial-services-legislation/implementing-and-delegated-acts/corporate-sustainability-reporting-directive_en"
    },
    {
      label: "European Commission - Revised sustainability reporting standards",
      href:
        "https://finance.ec.europa.eu/news/commission-adopts-revised-sustainability-reporting-standards-2026-07-03_en"
    },
    {
      label: "EFRAG Knowledge Hub - Voluntary Standard",
      href: "https://knowledgehub.efrag.org/eng/interactive/voluntary-standard"
    },
    {
      label: "EUR-Lex - Directive (EU) 2026/470",
      href: "https://eur-lex.europa.eu/eli/dir/2026/470/oj"
    }
  ]
};

export const esgDataOwnersContent: EnglishResourceArticleContent = {
  eyebrow: "ESG data owners",
  title: "Who owns ESG data inside the company?",
  deck:
    "A practical data-owner map for supplier ESG requests, VSME preparation and internal evidence collection.",
  methodNote:
    "Customer question - data point - source owner - calculation or statement - review.",
  quickAnswerTitle: "One person can coordinate. The data is usually distributed.",
  summary: [
    "An ESG questionnaire may arrive with Procurement, Quality, Management or whoever is named in a customer portal. That person can coordinate the response, but usually does not own every underlying fact.",
    "A useful process separates source owner, calculation owner, statement owner and approver. The exact owner depends on the company's organisation."
  ],
  quickChecks: [
    {
      title: "Map the question.",
      body:
        "Convert each customer field into a data point, statement, calculation or evidence request."
    },
    {
      title: "Find the source owner.",
      body:
        "The source owner can retrieve or confirm the underlying company information."
    },
    {
      title: "Separate calculation.",
      body:
        "The person who owns the invoice may not be the person who calculates the KPI."
    },
    {
      title: "Confirm final use.",
      body:
        "Policies, governance statements and external submissions may need authorised review."
    }
  ],
  nav: [
    ["01", "Distributed", "#distributed"],
    ["02", "Map", "#owner-map"],
    ["03", "Finance", "#finance"],
    ["04", "HR", "#hr"],
    ["05", "Operations", "#operations"],
    ["06", "Procurement", "#procurement"],
    ["07", "Roles", "#roles"],
    ["08", "Review", "#review"]
  ].map(([number, label, href]) => ({ number, label, href })),
  sections: [
    {
      id: "distributed",
      number: "01",
      title: "ESG data is cross-functional.",
      paragraphs: [
        "A customer ESG request can include environment, emissions, labour, health and safety, ethics, procurement, supplier management, product information and certificates. Not every request includes every topic, but the breadth is why one person rarely owns the full answer.",
        "Central coordination is useful. Central ownership of all ESG data is usually unrealistic."
      ],
      principle: {
        text:
          "ESG coordination can be central. ESG source data usually is not."
      }
    },
    {
      id: "owner-map",
      number: "02",
      title: "Use a practical owner map, not a universal rule.",
      paragraphs: [
        "The same data point can sit in different places in different companies. Electricity may be held by Finance, Facility or Procurement. Fuel data may sit with Fleet or Finance. Waste data may sit with EHS, Quality, Facility or Production.",
        "The useful question is not which department should own ESG in theory. It is who can provide the most reliable internal source for this specific data point."
      ],
      cards: [
        {
          title: "Company data",
          body:
            "Management and Finance often hold legal entity, turnover, balance-sheet and site information."
        },
        {
          title: "Energy",
          body:
            "Finance, Facility and Procurement often hold electricity, gas, heat, contracts, invoices and meter data."
        },
        {
          title: "Workforce",
          body:
            "HR usually owns headcount, FTE, contract types, training and many workforce definitions."
        },
        {
          title: "Environment and safety",
          body:
            "EHS, Quality, Facility and Production may own accidents, waste, water, certificates, operating controls and environmental records."
        }
      ],
      links: [
        {
          label: "See common ESG data categories",
          href: "/en/resources/esg-data-customers-request-from-suppliers"
        }
      ]
    },
    {
      id: "finance",
      number: "03",
      title: "Finance often holds the commercial source, not the final ESG number.",
      paragraphs: [
        "Many environmental inputs begin in accounting: electricity invoices, gas invoices, district heating, fuel purchases and sometimes waste or water cost records.",
        "Finance may own an electricity invoice, but a Scope 2 emissions value still needs reporting boundary, reporting period, method, emission factor, factor source and calculation review."
      ],
      principle: {
        text:
          "Source owner and calculation owner can be different people."
      }
    },
    {
      id: "hr",
      number: "04",
      title: "HR owns many workforce values, but definitions come first.",
      paragraphs: [
        "Customer requests and reporting standards may ask for headcount, FTE, gender, contract type, training hours, collective agreement coverage, turnover, accident data or other workforce indicators.",
        "Before asking HR for a number, specify scope, reporting period or date, unit and definition. A headcount figure and an FTE figure can both be correct and still answer different questions."
      ],
      bullets: [
        "Headcount or FTE",
        "Reporting year, year-end date or average",
        "Legal entity, site or group scope",
        "Employee categories and contract types",
        "Training definition and included courses"
      ]
    },
    {
      id: "operations",
      number: "05",
      title: "Facility, Operations and Production hold what invoices often miss.",
      paragraphs: [
        "An invoice may show a service cost. Facility or technical maintenance may know the refrigerant type and kg topped up. Finance may hold a utility invoice. Facility may know meter allocation, building users and technical boundaries.",
        "Production and Operations can also confirm which equipment runs, where fuels are used, what materials flow through the process and which waste streams actually arise."
      ],
      bullets: [
        "Meters, technical systems and building boundaries",
        "Heating, cooling, refrigeration and generator information",
        "Fuel use in equipment or processes",
        "Water meters and production water information",
        "Waste streams and operational process data",
        "Whether process emissions may be relevant"
      ],
      links: [
        {
          label: "See Scope 1 & 2 data requirements",
          href: "/en/resources/scope-1-2-data-calculation"
        }
      ]
    },
    {
      id: "procurement",
      number: "06",
      title: "Procurement is critical for supplier, material and contract questions.",
      paragraphs: [
        "Procurement often owns supplier structure, Supplier Code of Conduct rollout, supplier evaluations, material purchasing data, energy contracts and certain supplier certificates.",
        "That does not make Procurement the owner of every supply-chain emissions claim. Product, Engineering, Production, Quality and Finance may also be needed for material weights, bill of materials, spend, supplier documentation and product-level data."
      ],
      cards: [
        {
          title: "Supplier process",
          body:
            "Supplier Code, procurement procedures, supplier assessments and contractual requirements."
        },
        {
          title: "Material data",
          body:
            "Purchased material types, annual quantities, suppliers and source documents."
        },
        {
          title: "Product data",
          body:
            "Engineering, Product and Quality may be needed for BOMs, specifications, weights and certificates."
        },
        {
          title: "Energy procurement",
          body:
            "Electricity supplier, tariff, product and contractual information for Scope 2 where relevant."
        }
      ]
    },
    {
      id: "roles",
      number: "07",
      title: "Owner can mean four different roles.",
      paragraphs: [
        "A data point may have a source owner, calculation owner, statement owner and approver. One person can hold more than one role, but the roles should not be collapsed without thinking."
      ],
      cards: [
        {
          title: "Source owner",
          body:
            "Owns or can retrieve the underlying source data, such as an invoice, HR export, certificate or register."
        },
        {
          title: "Calculation owner",
          body:
            "Converts raw inputs into a KPI, emissions value, rate or other calculated result."
        },
        {
          title: "Statement owner",
          body:
            "Can confirm a qualitative company statement, practice, process or policy reality."
        },
        {
          title: "Approver",
          body:
            "Has authority to approve external use, formal policies or final submission where required."
        }
      ],
      principle: {
        text:
          "Do not reduce the process to 'ask Finance' or 'ask ESG'."
      }
    },
    {
      id: "review",
      number: "08",
      title: "The final response needs one coherent review.",
      paragraphs: [
        "After data owners provide their pieces, one coordinated review should check whether the response still makes sense as a company statement.",
        "The review should compare scope, period, units, definitions, evidence, approvals and consistency across answers."
      ],
      bullets: [
        "Are we answering for the correct legal entity and sites?",
        "Does the reporting period match the customer request?",
        "Are definitions such as FTE, headcount or Scope 2 method clear?",
        "Do source documents support the specific statements?",
        "Are calculated values traceable?",
        "Have policies and governance statements been confirmed by the right owner?"
      ],
      principle: {
        text:
          "A technically correct single answer can still be wrong inside an inconsistent questionnaire."
      },
      links: [
        {
          label: "Get help with a customer ESG request",
          href: "/en/esg-customer-requests"
        },
        {
          label: "Start with the ESG questionnaire workflow",
          href: "/en/resources/customer-esg-questionnaire-received"
        },
        {
          label: "See ESG evidence for suppliers",
          href: "/en/resources/esg-evidence-for-suppliers"
        }
      ]
    }
  ],
  cta: {
    eyebrow: "Data-owner mapping",
    title: "Customer asked for ESG data, but ownership is unclear?",
    body:
      "Send the questionnaire or customer request. We can map each requested data point to likely internal owners, sources, evidence and review steps so your company can prepare a controlled response.",
    primaryLabel: "Send your ESG request",
    primaryHref: sendRequest,
    secondaryLabel: "Customer ESG request support",
    secondaryHref: "/en/esg-customer-requests"
  },
  faq: [
    {
      question: "Who should fill out an ESG questionnaire?",
      answer:
        "Usually one person should coordinate the response while individual data points are supplied by the relevant internal functions, such as Finance, HR, EHS, Quality, Operations, Procurement, Compliance or Management."
    },
    {
      question: "Does a company need an ESG manager?",
      answer:
        "No. Smaller companies can handle ESG requests with a clear coordinator, data-owner structure and internal review. The key is knowing who owns each reliable source."
    },
    {
      question: "Who owns energy and emissions data?",
      answer:
        "Raw data often sits with Finance, Facility, Operations, Fleet or Procurement. The emissions calculation may be owned or reviewed separately."
    },
    {
      question: "Who confirms the final answer to the customer?",
      answer:
        "It depends on internal governance. Technical data should come from the source owner, and company statements or formal policies may need authorised approval."
    }
  ],
  sources: [
    {
      label: "EFRAG Knowledge Hub - Voluntary Standard",
      href: "https://knowledgehub.efrag.org/eng/interactive/voluntary-standard"
    },
    {
      label: "IntegrityNext Help Center - Add a colleague to my supplier profile",
      href:
        "https://helpdesk.integritynext.com/hc/en-us/articles/360018479559-How-can-I-invite-add-a-colleague-to-my-supplier-profile"
    },
    {
      label: "BMW Group - Sustainability Assessment Questionnaire",
      href:
        "https://www.bmwgroup.com/content/dam/grpw/websites/bmwgroup_com/responsibility/downloads/en/2022/Sustainability-Assessment-Questionnaire_SAQ_5.0_EN.pdf"
    }
  ]
};
