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
