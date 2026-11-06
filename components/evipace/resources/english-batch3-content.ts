import { primarySources } from "@/lib/seo/primary-sources";
import type { EnglishResourceArticleContent } from "./EnglishResourceArticle";

/**
 * EcoVadis vs IntegrityNext, for suppliers. Deliberately limited to what both
 * platforms' own help centres and the existing Evipace service pages state:
 * no scoring thresholds, medal levels, prices or turnaround times, because
 * those change and are set by the platforms. Evipace is not affiliated with
 * either platform.
 */
export const ecovadisVsIntegritynextContent: EnglishResourceArticleContent = {
  eyebrow: "EcoVadis and IntegrityNext",
  title: "EcoVadis or IntegrityNext: what is the difference for a supplier?",
  deck:
    "Both start with a customer request, but they ask for different things. A plain comparison, and how to prepare once for both.",
  methodNote:
    "Customer request - platform - questions - evidence - gaps - your submission.",
  quickAnswerTitle: "Same customer, different platform, mostly the same documents.",
  summary: [
    "EcoVadis is a sustainability rating provider: your company completes an online questionnaire and uploads documents that support its answers. IntegrityNext is a supply-chain sustainability and compliance platform that buyers use to collect and monitor supplier information through a company profile and assessments.",
    "Which one you need is decided by your customer, not by you. What you prepare is largely the same: company facts, policies, certificates and records, each tied to the answer it supports."
  ],
  quickChecks: [
    {
      title: "Read the invitation.",
      body: "Note which platform, which customer and any deadline it names."
    },
    {
      title: "List what is asked.",
      body: "Questions, certificates and documents the platform requests."
    },
    {
      title: "Match your documents.",
      body: "Tie each answer to a current document and name what is missing."
    },
    {
      title: "Submit it yourself.",
      body: "The account and the submission stay with your company on both platforms."
    }
  ],
  nav: [
    { number: "01", label: "At a glance", href: "#at-a-glance" },
    { number: "02", label: "Side by side", href: "#side-by-side" },
    { number: "03", label: "What overlaps", href: "#overlap" },
    { number: "04", label: "Preparing once", href: "#prepare-once" },
    { number: "05", label: "What Evipace does", href: "#evipace" }
  ],
  sections: [
    {
      id: "at-a-glance",
      number: "01",
      title: "What each platform is",
      paragraphs: [
        "EcoVadis describes itself as a provider of business sustainability ratings. A company completes a questionnaire online, covering environment, labour and human rights, ethics and sustainable procurement, and uploads documents that support its answers.",
        "IntegrityNext is a platform that buyers use to manage supplier sustainability and compliance. A supplier is invited, maintains a company profile and completes assessments, and may be asked for certificates and other evidence."
      ],
      sources: [
        primarySources.ecovadisSupportingDocuments,
        primarySources.integrityNextCompletingAssessment
      ]
    },
    {
      id: "side-by-side",
      number: "02",
      title: "Side by side",
      paragraphs: [
        "The table compares what a supplier typically does on each platform. Scoring methods, rating levels and processing times are set by the platforms and change, so check their help centres for current figures."
      ],
      matrix: {
        caption: "EcoVadis and IntegrityNext compared for suppliers",
        columns: ["", "EcoVadis", "IntegrityNext"],
        rows: [
          [
            "Who starts it",
            "Usually a customer who asks you to take part.",
            "A customer who invites you to its supplier programme."
          ],
          [
            "What you complete",
            "An online sustainability questionnaire tailored to the company.",
            "A company profile and assessments."
          ],
          [
            "Evidence",
            "Documents uploaded to support answers; the number of documents is limited.",
            "Certificates and other evidence, which the platform may review."
          ],
          [
            "Updates",
            "A later assessment may be requested.",
            "An assessment may be updated and sent back for review."
          ],
          [
            "Who owns the account",
            "Your company.",
            "Your company."
          ]
        ]
      },
      sources: [
        primarySources.ecovadisDocumentLimit,
        primarySources.integrityNextUpdatedAssessments
      ]
    },
    {
      id: "overlap",
      number: "03",
      title: "What overlaps",
      paragraphs: [
        "Both platforms draw on the same underlying facts about the company."
      ],
      bullets: [
        "Company profile: legal entity, sites, activities and headcount.",
        "Policies and codes your company has actually adopted.",
        "Certificates and their validity dates.",
        "Records behind environmental and social answers, such as energy use or training."
      ],
      principle: {
        label: "Rule of thumb",
        text: "Keep one set of current documents and answer each platform from it, rather than starting again for every customer."
      }
    },
    {
      id: "prepare-once",
      number: "04",
      title: "Preparing once for both",
      paragraphs: [
        "Start from the documents, not from the platform. Collect what exists, check that it is current, and write down which answer each document supports. A missing policy or certificate stays a gap in the answer; it is never described as existing.",
        "Then answer the platform's questions from that single set, and note where one platform asks for more than the other."
      ],
      links: [
        {
          label: "EcoVadis documents and evidence",
          href: "/en/resources/ecovadis-documents-evidence"
        },
        {
          label: "IntegrityNext invitation for suppliers",
          href: "/en/resources/integritynext-invitation-for-suppliers"
        },
        {
          label: "Collect ESG data once, reuse it",
          href: "/en/resources/reusable-esg-data"
        }
      ]
    },
    {
      id: "evipace",
      number: "05",
      title: "What Evipace does, and does not do",
      paragraphs: [
        "Evipace prepares the answers and the supporting evidence for either platform and flags the gaps. A person at Evipace reviews the result. Your company keeps its account and submits the assessment itself.",
        "Evipace is an independent service provider and is not affiliated with EcoVadis or IntegrityNext. We do not promise a score, a status or acceptance by your customer."
      ],
      links: [
        { label: "EcoVadis support", href: "/en/ecovadis-support" },
        { label: "IntegrityNext support", href: "/en/integritynext-support" }
      ]
    }
  ],
  cta: {
    eyebrow: "EcoVadis and IntegrityNext support",
    title: "Invited to one of the two platforms?",
    body:
      "Forward the invitation. We map what is asked, match it to the documents you already have and tell you what is missing.",
    primaryLabel: "Send your ESG request",
    primaryHref: "/en/send-request",
    secondaryLabel: "EcoVadis support",
    secondaryHref: "/en/ecovadis-support"
  },
  faq: [
    {
      question: "Is EcoVadis the same as IntegrityNext?",
      answer:
        "No. EcoVadis is a sustainability rating provider with its own questionnaire. IntegrityNext is a platform buyers use to collect and monitor supplier information through profiles and assessments. A customer may use either, or both."
    },
    {
      question: "Can I reuse my EcoVadis documents for IntegrityNext?",
      answer:
        "Often the same underlying documents apply, such as policies, certificates and records. Each platform asks its own questions, so check that each document is current and answers the question being asked."
    },
    {
      question: "Which one do I have to choose?",
      answer:
        "You usually do not choose. Your customer decides which platform it uses and sends the invitation or request."
    },
    {
      question: "Can Evipace guarantee a score or status?",
      answer:
        "No. Evipace prepares answers and evidence and shows the gaps. The result depends on the platform's assessment and your company's actual practice."
    }
  ],
  sources: [
    primarySources.ecovadisSupportingDocuments,
    primarySources.ecovadisDocumentLimit,
    primarySources.integrityNextCompletingAssessment,
    primarySources.integrityNextUpdatedAssessments
  ]
};

/**
 * How to answer ESG questionnaire questions. Answer patterns only: no
 * example company data, no benchmarks, nothing a supplier could copy as a
 * claim. A missing document stays a gap in the answer.
 */
export const howToAnswerEsgQuestionnaireContent: EnglishResourceArticleContent = {
  eyebrow: "ESG questionnaire answers",
  title: "How to answer ESG questionnaire questions: yes, partly, no or not applicable",
  deck:
    "A practical pattern for answering customer ESG questions truthfully: what each answer type means, what a complete answer contains and what to attach.",
  methodNote:
    "Question - answer type - scope and period - evidence - owner - gap.",
  quickAnswerTitle: "An answer is a statement plus the document that supports it.",
  summary: [
    "Most customer ESG questions can be answered with one of a few answer types: yes, partly, no or not applicable. The type matters less than what stands behind it: the scope it covers, the period it refers to and the document that supports it.",
    "If the document does not exist yet, the honest answer is no, or partly, with a note on what is planned. A draft or an intention is not a yes."
  ],
  quickChecks: [
    {
      title: "Choose the answer type.",
      body: "Yes, partly, no or not applicable, based on what the company actually has today."
    },
    {
      title: "State scope and period.",
      body: "Which sites or entities, and which reporting period, the answer covers."
    },
    {
      title: "Attach the evidence.",
      body: "A current document that supports exactly this answer, or a note that none exists."
    },
    {
      title: "Name the owner.",
      body: "The person or function who can confirm the answer if the customer asks."
    }
  ],
  nav: [
    { number: "01", label: "Answer types", href: "#answer-types" },
    { number: "02", label: "A complete answer", href: "#complete-answer" },
    { number: "03", label: "Typical questions", href: "#typical-questions" },
    { number: "04", label: "What to avoid", href: "#avoid" },
    { number: "05", label: "What Evipace does", href: "#evipace" }
  ],
  sections: [
    {
      id: "answer-types",
      number: "01",
      title: "The four answer types",
      cards: [
        {
          title: "Yes",
          body: "The company has it in place today, and a current document or record shows it. A policy that is adopted counts; one that is still a draft does not."
        },
        {
          title: "Partly",
          body: "Some of it is in place, for example at one site or for part of the topic. Say which part, and what is missing."
        },
        {
          title: "No",
          body: "It is not in place. If a step is planned, name it and, only where the company has decided it, the intended date."
        },
        {
          title: "Not applicable",
          body: "The question does not apply to the company's activities. Give the reason in a sentence; do not use it to avoid a hard question."
        }
      ]
    },
    {
      id: "complete-answer",
      number: "02",
      title: "What a complete answer contains",
      bullets: [
        "The answer type, stated plainly.",
        "The scope: which entity, site or product range it covers.",
        "The reporting period or the date the document was last valid.",
        "The supporting document, named, with its date or version.",
        "The owner inside the company who can explain it."
      ],
      principle: {
        label: "Rule of thumb",
        text: "If you cannot point to a document or a record, say so. A gap that is stated is easier to defend than one the customer finds."
      }
    },
    {
      id: "typical-questions",
      number: "03",
      title: "Typical question types and how to answer them",
      paragraphs: [
        "The table shows common question types, not a list of what every customer asks. The wording and the required evidence come from your customer's questionnaire."
      ],
      matrix: {
        caption: "Typical ESG questionnaire question types and how to answer them",
        columns: ["Question type", "How to answer", "Evidence to attach"],
        rows: [
          [
            "Do you have a policy on a topic?",
            "Yes only if adopted and in force. Otherwise no or partly.",
            "The adopted policy, with date and owner."
          ],
          [
            "Do you hold a certificate?",
            "Yes if it is valid today. Say if it is expired or in renewal.",
            "The certificate with scope and expiry date."
          ],
          [
            "Provide a figure, such as energy use or headcount",
            "Give the figure for the stated period and unit; state estimates as estimates.",
            "The invoice, meter record or register it comes from."
          ],
          [
            "Do you train staff on a topic?",
            "Describe what happens and for whom, not what is intended.",
            "Training records or a schedule."
          ],
          [
            "Do you monitor your own suppliers?",
            "Describe the actual process. If there is none, answer no.",
            "The supplier code, questionnaire or review record."
          ],
          [
            "Have there been incidents or complaints?",
            "Answer for the stated period; where there were none, say none for that period.",
            "The incident or complaint log."
          ]
        ]
      }
    },
    {
      id: "avoid",
      number: "04",
      title: "What to avoid",
      bullets: [
        "Answering yes for something that is only planned or drafted.",
        "Rounding a figure up, or presenting an estimate as a measurement.",
        "Pasting a statement with no document behind it.",
        "Using not applicable to skip a question that does apply.",
        "Leaving a question blank without saying why."
      ]
    },
    {
      id: "evipace",
      number: "05",
      title: "What Evipace does, and does not do",
      paragraphs: [
        "Evipace reads the questionnaire, matches each question to the data and documents you already have, prepares the answers in the structure above and lists what is missing. A person at Evipace reviews the result and you send it to your customer yourself.",
        "Evipace does not create evidence that does not exist, and it cannot guarantee that a customer accepts an answer."
      ],
      links: [
        { label: "ESG questionnaire support", href: "/en/esg-customer-requests" },
        {
          label: "Questionnaire checklist for suppliers",
          href: "/en/resources/esg-questionnaire-checklist"
        },
        {
          label: "ESG evidence for suppliers",
          href: "/en/resources/esg-evidence-for-suppliers"
        }
      ]
    }
  ],
  cta: {
    eyebrow: "ESG questionnaire support",
    title: "Have the questionnaire open?",
    body:
      "Forward it. We match each question to the documents you already have, prepare the answers and list the gaps.",
    primaryLabel: "Send your ESG request",
    primaryHref: "/en/send-request",
    secondaryLabel: "ESG questionnaire support",
    secondaryHref: "/en/esg-customer-requests"
  },
  faq: [
    {
      question: "Should I answer yes if a policy is almost finished?",
      answer:
        "No. A policy counts once it is adopted and in force. Until then answer no or partly and, if the company has decided on a date, say what is planned."
    },
    {
      question: "When is not applicable the right answer?",
      answer:
        "When the question concerns an activity the company does not carry out. Give a one-sentence reason. If the topic applies but the company has nothing in place, the answer is no."
    },
    {
      question: "Do I have to attach a document to every answer?",
      answer:
        "Attach one wherever the questionnaire allows it and a document exists. Where none exists, say so rather than attaching something that does not support the answer."
    },
    {
      question: "Can Evipace guarantee that the customer accepts my answers?",
      answer:
        "No. Evipace prepares truthful, structured answers and shows the gaps. Acceptance is your customer's decision."
    }
  ],
  sources: []
};

/**
 * Scope 2: location-based and market-based. Limited to the GHG Protocol
 * Scope 2 Guidance's published approach; no factors, figures or the status
 * of the ongoing revision are asserted here.
 */
export const scope2LocationMarketContent: EnglishResourceArticleContent = {
  eyebrow: "Scope 2 electricity",
  title: "Scope 2: location-based vs market-based, explained for manufacturers",
  deck:
    "Why the same electricity use can produce two Scope 2 figures, what data each needs and what to write down.",
  methodNote:
    "Electricity use - method - emission factor - contract information - source.",
  quickAnswerTitle: "Same kWh, two methods, two answers.",
  summary: [
    "The location-based method applies the average emission factor of the electricity grid where the power is consumed. The market-based method reflects the electricity a company has chosen to buy, using contract information such as supplier-specific factors or energy attribute certificates.",
    "The GHG Protocol Scope 2 Guidance asks companies with operations in markets that offer such contract information to report both. The kilowatt-hours are the same; the emission factors and the evidence differ."
  ],
  quickChecks: [
    {
      title: "Collect the kWh.",
      body: "Electricity consumption per site and period, from invoices or meters."
    },
    {
      title: "Apply the grid factor.",
      body: "For location-based: the factor for the grid where each site consumes."
    },
    {
      title: "Collect contract information.",
      body: "For market-based: supplier factors, certificates or contracts for the same period."
    },
    {
      title: "Record the sources.",
      body: "Name the factor, its source and its version next to each figure."
    }
  ],
  nav: [
    { number: "01", label: "The two methods", href: "#two-methods" },
    { number: "02", label: "Data each needs", href: "#data" },
    { number: "03", label: "Green electricity", href: "#green-electricity" },
    { number: "04", label: "What to document", href: "#document" },
    { number: "05", label: "What Evipace does", href: "#evipace" }
  ],
  sections: [
    {
      id: "two-methods",
      number: "01",
      title: "The two methods",
      paragraphs: [
        "Scope 2 covers indirect emissions from purchased electricity, heat, steam and cooling. For electricity the GHG Protocol describes two ways of calculating them, and they answer different questions."
      ],
      matrix: {
        caption: "Location-based and market-based Scope 2 compared",
        columns: ["", "Location-based", "Market-based"],
        rows: [
          [
            "Question it answers",
            "What emissions come from the grid where we consume power?",
            "What emissions come from the electricity we chose to buy?"
          ],
          [
            "Emission factor",
            "Average factor for the grid in that location.",
            "Factor tied to contract information, such as a supplier-specific factor or certificates."
          ],
          [
            "Evidence",
            "Consumption data and a published grid factor.",
            "Consumption data plus the contract information for the same period."
          ],
          [
            "Changes when you switch supplier",
            "No.",
            "Yes, if the contract information changes."
          ]
        ]
      },
      sources: [primarySources.ghgScope2Guidance]
    },
    {
      id: "data",
      number: "02",
      title: "The data each method needs",
      bullets: [
        "Both: electricity consumed per site and reporting period, in kWh or MWh.",
        "Location-based: a grid emission factor for each location, with source and year.",
        "Market-based: the supplier contract, a supplier-specific factor or energy attribute certificates covering the same period and quantity."
      ],
      principle: {
        label: "Keep the layers apart",
        text: "Record consumption, the factor and the result separately, so each can be checked and updated on its own."
      }
    },
    {
      id: "green-electricity",
      number: "03",
      title: "What about green electricity?",
      paragraphs: [
        "Electricity use stays part of Scope 2 whether or not it is described as renewable. What changes is how the emissions are calculated: the market-based figure can reflect the contract, provided the supporting certificates or contract information are documented and match the period and quantity.",
        "A green tariff without documentation does not change the figure. If the document is missing, the gap is stated."
      ]
    },
    {
      id: "document",
      number: "04",
      title: "What to write down",
      bullets: [
        "Which method each reported figure uses.",
        "The emission factor, its source and its version or year.",
        "For market-based figures: which contract information was used and for which period.",
        "Assumptions and estimates, marked as such.",
        "The reporting boundary: entities and sites included."
      ],
      paragraphs: [
        "The Scope 2 guidance is being revised. Work with the standard that applies when you calculate, and document your sources so a later update can be applied."
      ]
    },
    {
      id: "evipace",
      number: "05",
      title: "What Evipace does, and does not do",
      paragraphs: [
        "In a Scope 1 and 2 calculation Evipace records which method, factors and contract information are used, keeps the sources and assumptions visible and flags what is missing. A person at Evipace reviews it.",
        "Evipace does not cover Scope 3 and does not provide assurance or certification. A customer's reporting rules may ask for a particular method; the request decides, not this guide."
      ],
      links: [
        { label: "Scope 1 and 2 calculation", href: "/en/scope-1-2-calculation" },
        {
          label: "Data for Scope 1 and 2",
          href: "/en/resources/scope-1-2-data-calculation"
        },
        {
          label: "Data collection template",
          href: "/en/resources/scope-1-2-data-collection-template"
        }
      ]
    }
  ],
  cta: {
    eyebrow: "Scope 1 and 2 calculation",
    title: "Have the invoices, but not the calculation?",
    body:
      "Send the electricity, fuel and refrigerant records. We prepare the Scope 1 and 2 calculation and document the sources and assumptions.",
    primaryLabel: "Send your ESG request",
    primaryHref: "/en/send-request",
    secondaryLabel: "Scope 1 and 2 calculation",
    secondaryHref: "/en/scope-1-2-calculation"
  },
  faq: [
    {
      question: "Do I have to report both methods?",
      answer:
        "The GHG Protocol Scope 2 Guidance asks companies with operations in markets that offer contract information to report both. What your customer or reporting framework requires is set by their request."
    },
    {
      question: "Why do the two figures differ?",
      answer:
        "They use the same electricity consumption but different emission factors. Location-based uses the grid average; market-based reflects contract information such as a supplier factor or certificates."
    },
    {
      question: "Does buying green electricity make the market-based figure zero?",
      answer:
        "Not automatically. The figure depends on documented contract information that matches the period and quantity. Without it the gap should be stated."
    },
    {
      question: "Does Evipace calculate Scope 3?",
      answer:
        "No. Evipace's calculation covers Scope 1 and Scope 2 only."
    }
  ],
  sources: [primarySources.ghgScope2Guidance]
};
