import { ClosingCta } from "../home/ClosingCta";
import { Head, Prose } from "../service-landing/Blocks";
import {
  CenterAction,
  Motto,
  PillLink,
  ResourceBand,
  ResourceCard,
  ResourceCards,
  ResourceHero,
  ResourceMain,
  Terms,
  TextLink
} from "./ResourceParts";
import r from "./Resource.module.css";

const links = {
  request: "/en/resources/customer-esg-questionnaire-received",
  customerData: "/en/resources/esg-data-customers-request-from-suppliers",
  owners: "/en/resources/esg-data-owners",
  evidence: "/en/resources/esg-evidence-for-suppliers",
  ecovadis: "/en/resources/ecovadis-documents-evidence",
  integrityNext: "/en/resources/integritynext-invitation-for-suppliers",
  scopeData: "/en/resources/scope-1-2-data-calculation",
  scopeExplained: "/en/resources/scope-1-2-3-explained",
  vsmeData: "/en/resources/vsme-data-sustainability-report",
  checklist: "/en/resources/esg-questionnaire-checklist",
  evidenceCheck: "/en/resources/esg-evidence-readiness-check",
  scopeDataTemplate: "/en/resources/scope-1-2-data-collection-template",
  environmentalPolicy: "/en/resources/environmental-policy",
  supplierCode: "/en/resources/supplier-code-of-conduct",
  reusableData: "/en/resources/reusable-esg-data"
} as const;

/**
 * The commercial counterpart to each cluster above. The hub is editorial
 * first, so these sit as one quiet band near the foot of the page rather
 * than competing with the guide cards — but every service does get a real,
 * descriptive link from here, because a reader who has worked through a
 * guide and decided not to do it in-house should not have to go hunting.
 */
const services = [
  {
    title: "Customer ESG requests",
    href: "/en/esg-customer-requests",
    body: "Any format of customer sustainability request, from spreadsheets to portal forms."
  },
  {
    title: "ESG questionnaire support",
    href: "/en/esg-questionnaire-support",
    body: "A defined questionnaire or supplier assessment that has to be answered field by field."
  },
  {
    title: "EcoVadis support",
    href: "/en/ecovadis-support",
    body: "Assessment answers, supporting evidence and gaps prepared before submission."
  },
  {
    title: "IntegrityNext support",
    href: "/en/integritynext-support",
    body: "Profile scope, assessments, certificates and the company data behind each answer."
  },
  {
    title: "Scope 1 & 2 calculation",
    href: "/en/scope-1-2-calculation",
    body: "A documented calculation with activity data, factors, sources and assumptions."
  },
  {
    title: "VSME sustainability reporting",
    href: "/en/vsme-sustainability-report",
    body: "Voluntary SME reporting built on a reviewed company data foundation."
  }
];

const startSteps = [
  {
    number: "01",
    label: "START WITH THE REQUEST",
    title: "Received an ESG questionnaire from a customer?",
    description:
      "Check scope, deadline, reporting period, internal owners, evidence requirements and real gaps before answering field by field.",
    cta: "Start with the questionnaire",
    href: links.request
  },
  {
    number: "02",
    label: "UNDERSTAND THE DATA",
    title: "What ESG data do customers ask suppliers for?",
    description:
      "A practical overview of the categories that often appear in supplier requests, from company data and energy to policies, supply chain and evidence.",
    cta: "See common data categories",
    href: links.customerData
  },
  {
    number: "03",
    label: "FIND THE OWNERS",
    title: "Who owns ESG data inside the company?",
    description:
      "Map each requested data point to the right internal source owner, calculation owner, statement owner and approver.",
    cta: "Find data owners",
    href: links.owners
  },
  {
    number: "04",
    label: "CHECK THE EVIDENCE",
    title: "ESG Questionnaire Checklist",
    description:
      "Work through the actual questionnaire: scope, owners, data, evidence, gaps, consistency and final submission checks.",
    cta: "Start the checklist",
    href: links.checklist
  }
] as const;


const methodTerms = [
  ["Company data", "Information that actually comes from the business."],
  ["Calculations", "How source data becomes a KPI or CO2e figure."],
  ["Evidence", "Which source supports a statement."],
  ["Assumptions", "Where a method needs judgement or estimation."],
  ["Gaps", "What is genuinely missing or not yet approved."]
] as const;

export function EnglishResourceHub() {
  return (
    <ResourceMain locale="en">
      <ResourceHero
        actions={<PillLink href="/en/send-request">Send your ESG request</PillLink>}
        eyebrow="RESOURCES · GUIDES · EVIDENCE"
        locale="en"
        statement="Start with the customer request."
        title="Practical ESG resources for suppliers."
      >
        <p>
          Guides for manufacturing suppliers that need to respond to customer
          ESG questionnaires, data requests, evidence requests and supplier
          platform invitations.
        </p>
        <p>
          The focus is operational: scope, data owners, source documents,
          supporting evidence, internal review and a response your company can
          stand behind.
        </p>
        <p className={r.topics}>
          <span>Resource topics</span>
          Customer questionnaires · supplier ESG data · evidence · data owners ·
          policies · supplier codes · Scope 1 & 2 · VSME
        </p>
      </ResourceHero>

      <ResourceBand labelledBy="start-title" tone="dark">
        <Head
          dark
          eyebrow="START HERE"
          id="start-title"
          title="A customer has asked for ESG information?"
        >
          <p>Do not collect everything first.</p>
          <p>
            Start with the specific request, then work back to scope, owners,
            sources and evidence.
          </p>
        </Head>
        <ResourceCards columns={4}>
          {startSteps.map((step, index) => (
            <ResourceCard
              cta={step.cta}
              description={step.description}
              href={step.href}
              key={step.number}
              number={index + 1}
              title={step.title}
              type={step.label}
            />
          ))}
        </ResourceCards>
      </ResourceBand>

      <ResourceBand labelledBy="customer-title">
        <Head
          eyebrow="CUSTOMER REQUESTS"
          id="customer-title"
          title="When a customer asks for supplier ESG information."
        >
          <p>The hard question is often not: what is ESG?</p>
        </Head>
        <Motto>
          It is: what exactly is the customer asking us to provide?
        </Motto>
        <ResourceCards columns={2}>
          <ResourceCard
            cta="Open the workflow"
            description="What to do first after receiving an ESG questionnaire: scope, deadline, data owners, evidence and internal confirmation."
            featured
            href={links.request}
            title="Received an ESG questionnaire from a customer?"
            type="GUIDE"
          />
          <ResourceCard
            cta="Open the data guide"
            description="Common ESG data categories customers ask suppliers for, with careful scope and evidence distinctions."
            href={links.customerData}
            title="What ESG data do customers ask suppliers for?"
            type="GUIDE"
          />
          <ResourceCard
            cta="Find internal owners"
            description="A practical map for where ESG information often sits inside the company, from Finance and HR to Facility, EHS, Procurement and Management."
            href={links.owners}
            title="Who owns ESG data inside the company?"
            type="DATA OWNER GUIDE"
          />
          <ResourceCard
            cta="Start the checklist"
            description="Interactive submission-readiness checklist for scope, data, evidence, gaps, approvals and final review."
            href={links.checklist}
            title="ESG Questionnaire Checklist"
            type="INTERACTIVE TOOL"
          />
        </ResourceCards>
      </ResourceBand>

      <ResourceBand labelledBy="evidence-title" tone="orange">
        <Head
          eyebrow="EVIDENCE"
          id="evidence-title"
          title="An answer is only as strong as its source."
        >
          <p>
            Customers and supplier platforms often ask not only what the answer
            is, but what it is based on.
          </p>
        </Head>
        <Motto label="From the beginning">Statement - source - evidence</Motto>
        <ResourceCards columns={2}>
          <ResourceCard
            cta="Understand evidence"
            description="Which documents support which ESG answers, and where scope, period, validity or approval can make evidence weak."
            featured
            href={links.evidence}
            title="ESG evidence for suppliers"
            type="GUIDE"
          />
          <ResourceCard
            cta="Prepare EcoVadis evidence"
            description="How to prioritise EcoVadis documents, avoid weak uploads and keep platform-specific limits and independence clear."
            href={links.ecovadis}
            title="EcoVadis documents and evidence"
            type="PLATFORM GUIDE"
          />
          <ResourceCard
            cta="Open IntegrityNext guide"
            description="What to do after an IntegrityNext invitation, from profile scope and assessments to certificates, questionnaires and validation."
            href={links.integrityNext}
            title="IntegrityNext invitation for suppliers"
            type="PLATFORM GUIDE"
          />
          <ResourceCard
            cta="Check one document"
            description="Interactive readiness check for whether a document supports a specific ESG answer by scope, period, source and traceability."
            href={links.evidenceCheck}
            title="ESG Evidence Readiness Check"
            type="INTERACTIVE TOOL"
          />
        </ResourceCards>
      </ResourceBand>

      <ResourceBand labelledBy="policy-title">
        <Head
          eyebrow="POLICIES & SUPPLIER EXPECTATIONS"
          id="policy-title"
          title="Documents need scope, owner, status and evidence."
        >
          <p>
            Customer requests often ask whether a policy or supplier code
            exists. The answer has to distinguish the document from
            implementation, approval and supporting evidence.
          </p>
        </Head>
        <Motto label="Document discipline">
          Draft - approved - implemented - evidenced
        </Motto>
        <ResourceCards>
          <ResourceCard
            cta="Create a credible policy"
            description="How to create an Environmental Policy that reflects actual operations, scope, responsibilities and supportable environmental commitments."
            featured
            href={links.environmentalPolicy}
            title="Environmental Policy"
            type="POLICY GUIDE"
          />
          <ResourceCard
            cta="Structure supplier expectations"
            description="How to build a Supplier Code of Conduct with realistic ESG and compliance expectations, internal approval and practical rollout."
            href={links.supplierCode}
            title="Supplier Code of Conduct"
            type="SUPPLIER MANAGEMENT GUIDE"
          />
          <ResourceCard
            cta="Reuse documents correctly"
            description="Store approved versions, scope, owner, status and evidence so documents do not need to be rediscovered for each customer request."
            href={links.reusableData}
            title="Reusable ESG Data Foundation"
            type="SYSTEM GUIDE"
          />
        </ResourceCards>
      </ResourceBand>

      <ResourceBand labelledBy="carbon-title" tone="tinted">
        <Head
          eyebrow="CARBON & REPORTING"
          id="carbon-title"
          title="From emissions concepts to usable report data."
        >
          <p>
            Keep concepts, activity data, emission factors and report
            requirements separate enough to review.
          </p>
        </Head>
        <Motto label="Calculation logic">
          Boundary - activity data - emission factor - CO2e
        </Motto>
        <ResourceCards columns={2}>
          <ResourceCard
            cta="Prepare Scope 1 & 2 data"
            description="What to collect before calculating Scope 1 and Scope 2: boundary, period, activity data, emission factors, CO2e and source documentation."
            featured
            href={links.scopeData}
            title="What data do you need to calculate Scope 1 and Scope 2?"
            type="CARBON DATA GUIDE"
          />
          <ResourceCard
            cta="Understand the scopes"
            description="A clear explanation of Scope 1, Scope 2 and Scope 3 from the reporting company perspective, with manufacturing supplier examples."
            href={links.scopeExplained}
            title="Scope 1, 2 and 3 explained for companies and suppliers"
            type="EXPLAINER"
          />
          <ResourceCard
            cta="Prepare VSME data"
            description="Which company, energy, emissions, environmental, workforce, policy and governance information an SME should prepare for a VSME report."
            href={links.vsmeData}
            title="What data do you need for a VSME sustainability report?"
            type="REPORTING GUIDE"
          />
          <ResourceCard
            cta="Open the workspace"
            description="Collect electricity, fuel, vehicle, refrigerant and purchased-energy activity data by site, period, unit and source."
            href={links.scopeDataTemplate}
            title="Scope 1 & 2 Data Collection Template"
            type="INTERACTIVE TOOL"
          />
        </ResourceCards>
      </ResourceBand>

      <ResourceBand labelledBy="method-title">
        <Head
          eyebrow="HOW THESE RESOURCES ARE WRITTEN"
          id="method-title"
          title="Practical, traceable and evidence-first."
        >
          <p>
            Evipace resources are designed for real supplier work under time
            pressure.
          </p>
          <p>We keep clear distinctions between:</p>
        </Head>
        <Terms items={methodTerms} />
        <Prose>
          <p>These guides are prepared by Evipace. Preparation workflows and examples are our practical guidance; official requirements are linked to the standard setter or platform. Check the cited version against your reporting period or assigned assessment.</p>
          <p>New documents are not presented as historical evidence.</p>
          <p>Uncertain information is not written as confirmed fact.</p>
          <p>Platform outcomes, customer acceptance and scores are not guaranteed.</p>
        </Prose>
        <CenterAction>
          <TextLink href="/en/methodology">See Evipace methodology</TextLink>
        </CenterAction>
      </ResourceBand>

      <ResourceBand labelledBy="bridge-title" tone="tinted">
        <Head
          eyebrow="FROM RESOURCE TO RESPONSE"
          id="bridge-title"
          title="You do not have to assemble everything alone."
        >
          <p>
            The resources show how individual ESG tasks can be structured.
          </p>
          <p>
            If a concrete customer request already exists, send the original
            questionnaire, email, spreadsheet or platform export.
          </p>
          <p>
            We can identify the required data, available sources, real gaps
            and evidence needed for a response your company can review.
          </p>
        </Head>
        <CenterAction>
          <PillLink href="/en/send-request">Send your ESG request</PillLink>
          <TextLink href="/en/methodology">See methodology</TextLink>
        </CenterAction>
      </ResourceBand>

      <ResourceBand labelledBy="services-title">
        <Head
          eyebrow="WHEN YOU WOULD RATHER NOT DO IT IN-HOUSE"
          id="services-title"
          title="The same work, prepared for you."
          lead="Each guide above has a service behind it. Same method, same evidence discipline — carried out by Evipace instead of by your team."
        />
        <ResourceCards>
          {services.map((service) => (
            <ResourceCard
              description={service.body}
              href={service.href}
              key={service.href}
              title={service.title}
            />
          ))}
        </ResourceCards>
      </ResourceBand>

      <ClosingCta
        body={
          <p>
            Send us what the customer sent you. We begin with the actual
            request, not a generic ESG checklist.
          </p>
        }
        formHref="/en/send-request"
        formLabel="Send the request"
        forwardLabel="Forward your request"
        note="Questionnaire - Excel - PDF - portal - customer email"
        offers={{ label: "See the ways to work with us", href: "/en/offers" }}
        slogan="START WITH THE REQUEST"
        title="The customer has already asked?"
      />
    </ResourceMain>
  );
}
