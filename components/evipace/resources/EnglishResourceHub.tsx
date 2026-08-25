import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, FileCheck2, Send, ShieldCheck } from "lucide-react";
import { ButtonLink } from "../ButtonLink";

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

type ResourceCardProps = {
  title: string;
  type: string;
  description: string;
  cta: string;
  href: string;
  featured?: boolean;
};

function SectionHeading({
  id,
  eyebrow,
  title,
  children,
  light = false
}: {
  id?: string;
  eyebrow: string;
  title: string;
  children?: ReactNode;
  light?: boolean;
}) {
  return (
    <div className="min-w-0 max-w-3xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2
        className={`font-display mt-5 scroll-mt-28 break-words text-[clamp(2.6rem,5.2vw,5rem)] leading-[0.98] ${
          light ? "text-white" : "text-ink"
        }`}
        id={id}
      >
        {title}
      </h2>
      {children ? (
        <div
          className={`mt-6 max-w-2xl text-base leading-7 sm:text-lg sm:leading-8 ${
            light ? "text-white/64" : "text-muted"
          }`}
        >
          {children}
        </div>
      ) : null}
    </div>
  );
}

function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      className="group inline-flex min-h-11 items-center gap-2 text-sm font-bold text-ink transition hover:text-orange"
      href={href}
    >
      <span>{children}</span>
      <ArrowRight
        aria-hidden="true"
        className="h-4 w-4 text-orange transition-transform group-hover:translate-x-1"
      />
    </Link>
  );
}

function ResourceCard({
  title,
  type,
  description,
  cta,
  href,
  featured = false
}: ResourceCardProps) {
  return (
    <article
      className={`flex h-full min-w-0 flex-col border-t pt-6 ${
        featured
          ? "border-orange bg-[var(--soft-orange)] px-5 pb-5 sm:px-6"
          : "border-[rgba(21,21,21,0.16)]"
      }`}
    >
      <p className="text-[0.66rem] font-bold uppercase tracking-[0.16em] text-orange">
        {type}
      </p>
      <h3 className="font-display mt-4 break-words text-[2rem] leading-[1.06] text-ink">
        {title}
      </h3>
      <p className="mt-4 flex-1 text-sm leading-7 text-muted">{description}</p>
      <div className="mt-5">
        <InlineLink href={href}>{cta}</InlineLink>
      </div>
    </article>
  );
}

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

export function EnglishResourceHub() {
  return (
    <main id="top">
      <header className="relative isolate overflow-hidden pb-20 pt-28 sm:pb-24 sm:pt-32 lg:pb-28 lg:pt-36">
        <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -right-32 top-20 h-[32rem] w-[32rem] rounded-full border border-orange/15" />
          <div className="absolute -right-16 top-36 h-[22rem] w-[22rem] rounded-full border border-orange/20" />
          <div className="absolute bottom-0 left-[54%] top-0 w-px bg-gradient-to-b from-transparent via-orange/15 to-transparent" />
        </div>
        <div className="site-shell">
          <nav
            aria-label="Breadcrumb"
            className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[rgba(21,21,21,0.52)]"
          >
            <Link className="transition hover:text-orange" href="/en">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-ink">
              Resources
            </span>
          </nav>

          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1.18fr)_minmax(18rem,0.52fr)] lg:items-end lg:gap-20">
            <div>
              <p className="eyebrow">RESOURCES · GUIDES · EVIDENCE</p>
              <h1 className="font-display mt-7 max-w-[16ch] text-[clamp(3.5rem,7.4vw,7.2rem)] leading-[0.9]">
                Practical ESG resources for suppliers.
              </h1>
              <p className="font-display mt-8 text-[clamp(1.65rem,3vw,2.8rem)] leading-tight text-ink">
                Start with the customer request.
              </p>
              <div className="mt-7 max-w-3xl space-y-4 text-[clamp(1.05rem,1.55vw,1.3rem)] leading-[1.65] text-muted">
                <p>
                  Guides for manufacturing suppliers that need to respond to
                  customer ESG questionnaires, data requests, evidence requests
                  and supplier platform invitations.
                </p>
                <p>
                  The focus is operational: scope, data owners, source
                  documents, supporting evidence, internal review and a response
                  your company can stand behind.
                </p>
              </div>
            </div>

            <aside className="border-l-2 border-orange pl-6 lg:mb-2 lg:pl-8">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-orange">
                Resource topics
              </p>
              <p className="mt-4 text-sm font-semibold leading-7 text-muted">
                Customer questionnaires · supplier ESG data · evidence ·
                data owners · policies · supplier codes · Scope 1 & 2 · VSME
              </p>
              <div className="mt-5">
                <InlineLink href="/en/send-request">Send your ESG request</InlineLink>
              </div>
            </aside>
          </div>
        </div>
      </header>

      <section aria-labelledby="start-title" className="bg-ink py-20 text-white sm:py-24 lg:py-28">
        <div className="site-shell">
          <SectionHeading
            id="start-title"
            eyebrow="START HERE"
            light
            title="A customer has asked for ESG information?"
          >
            <p>Do not collect everything first.</p>
            <p className="mt-3">
              Start with the specific request, then work back to scope, owners,
              sources and evidence.
            </p>
          </SectionHeading>

          <ol className="mt-14 grid gap-5 lg:grid-cols-4">
            {startSteps.map((step, index) => (
              <li
                className="relative flex min-w-0 flex-col rounded-[1.25rem] border border-white/16 bg-white/[0.035] p-6 sm:p-7"
                key={step.number}
              >
                {index < startSteps.length - 1 ? (
                  <ArrowRight
                    aria-hidden="true"
                    className="absolute -right-[1.35rem] top-9 z-10 hidden h-5 w-5 text-orange lg:block"
                  />
                ) : null}
                <span className="font-mono text-sm font-bold text-orange">
                  {step.number}
                </span>
                <p className="mt-8 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-orange">
                  {step.label}
                </p>
                <h3 className="font-display mt-4 text-[2rem] leading-[1.06] text-white">
                  {step.title}
                </h3>
                <p className="mt-5 flex-1 text-sm leading-7 text-white/62">
                  {step.description}
                </p>
                <Link
                  className="group mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-white transition hover:text-orange"
                  href={step.href}
                >
                  {step.cta}
                  <ArrowRight
                    aria-hidden="true"
                    className="h-4 w-4 text-orange transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="customer-title" className="py-20 sm:py-24 lg:py-28">
        <div className="site-shell grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
          <SectionHeading
            id="customer-title"
            eyebrow="CUSTOMER REQUESTS"
            title="When a customer asks for supplier ESG information."
          >
            <p>The hard question is often not: what is ESG?</p>
            <p className="font-display mt-4 text-2xl leading-tight text-ink">
              It is: what exactly is the customer asking us to provide?
            </p>
          </SectionHeading>
          <div className="grid gap-10 sm:grid-cols-2">
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
          </div>
        </div>
      </section>

      <section aria-labelledby="evidence-title" className="border-y border-[rgba(21,21,21,0.09)] bg-white py-20 sm:py-24 lg:py-28">
        <div className="site-shell">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <SectionHeading
              id="evidence-title"
              eyebrow="EVIDENCE"
              title="An answer is only as strong as its source."
            >
              <p>
                Customers and supplier platforms often ask not only what the
                answer is, but what it is based on.
              </p>
            </SectionHeading>
            <div className="rounded-[1.1rem] border border-orange/25 bg-[var(--soft-orange)] p-6 sm:p-7">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-orange">
                From the beginning
              </p>
              <p className="font-display mt-4 text-[clamp(1.8rem,3vw,2.6rem)] leading-tight">
                Statement - source - evidence
              </p>
            </div>
          </div>
          <div className="mt-14 grid gap-10 md:grid-cols-2 xl:grid-cols-3">
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
          </div>
        </div>
      </section>

      <section aria-labelledby="policy-title" className="py-20 sm:py-24 lg:py-28">
        <div className="site-shell">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <SectionHeading
              id="policy-title"
              eyebrow="POLICIES & SUPPLIER EXPECTATIONS"
              title="Documents need scope, owner, status and evidence."
            >
              <p>
                Customer requests often ask whether a policy or supplier code
                exists. The answer has to distinguish the document from
                implementation, approval and supporting evidence.
              </p>
            </SectionHeading>
            <div className="border-l-2 border-orange pl-6">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-orange">
                Document discipline
              </p>
              <p className="font-display mt-4 text-[clamp(1.8rem,3vw,2.6rem)] leading-tight">
                Draft - approved - implemented - evidenced
              </p>
            </div>
          </div>
          <div className="mt-14 grid gap-10 md:grid-cols-2 xl:grid-cols-3">
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
          </div>
        </div>
      </section>

      <section aria-labelledby="carbon-title" className="py-20 sm:py-24 lg:py-28">
        <div className="site-shell">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.7fr] lg:items-end">
            <SectionHeading
              id="carbon-title"
              eyebrow="CARBON & REPORTING"
              title="From emissions concepts to usable report data."
            >
              <p>
                Keep concepts, activity data, emission factors and report
                requirements separate enough to review.
              </p>
            </SectionHeading>
            <div className="border-l-2 border-orange pl-6">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-orange">
                Calculation logic
              </p>
              <p className="font-display mt-4 text-[clamp(1.8rem,3vw,2.6rem)] leading-tight">
                Boundary - activity data - emission factor - CO2e
              </p>
            </div>
          </div>
          <div className="mt-14 grid gap-10 md:grid-cols-2 xl:grid-cols-3">
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
          </div>
        </div>
      </section>

      <section aria-labelledby="method-title" className="py-20 sm:py-24 lg:py-28">
        <div className="site-shell grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div>
            <ShieldCheck aria-hidden="true" className="h-10 w-10 text-orange" />
            <SectionHeading
              id="method-title"
              eyebrow="HOW THESE RESOURCES ARE WRITTEN"
              title="Practical, traceable and evidence-first."
            >
              <p>
                Evipace resources are designed for real supplier work under time
                pressure.
              </p>
            </SectionHeading>
          </div>
          <div>
            <p className="text-base leading-8 text-muted">
              We keep clear distinctions between:
            </p>
            <dl className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              {[
                ["Company data", "Information that actually comes from the business."],
                ["Calculations", "How source data becomes a KPI or CO2e figure."],
                ["Evidence", "Which source supports a statement."],
                ["Assumptions", "Where a method needs judgement or estimation."],
                ["Gaps", "What is genuinely missing or not yet approved."]
              ].map(([term, description]) => (
                <div className="border-t border-[rgba(21,21,21,0.14)] pt-4" key={term}>
                  <dt className="font-bold text-ink">{term}</dt>
                  <dd className="mt-2 text-sm leading-6 text-muted">{description}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 space-y-3 border-l-2 border-orange pl-5 text-sm leading-7 text-muted sm:pl-7">
              <p>New documents are not presented as historical evidence.</p>
              <p>Uncertain information is not written as confirmed fact.</p>
              <p>Platform outcomes, customer acceptance and scores are not guaranteed.</p>
            </div>
            <div className="mt-7">
              <InlineLink href="/en/methodology">See evipace methodology</InlineLink>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="bridge-title" className="border-y border-[rgba(21,21,21,0.09)] bg-white py-20 sm:py-24 lg:py-28">
        <div className="site-shell">
          <div className="overflow-hidden rounded-[1.5rem] border border-orange/25 bg-[var(--soft-orange)]">
            <div className="grid lg:grid-cols-[0.8fr_1.2fr]">
              <div className="p-7 sm:p-10 lg:p-12">
                <Send aria-hidden="true" className="h-10 w-10 text-orange" />
                <SectionHeading
                  id="bridge-title"
                  eyebrow="FROM RESOURCE TO RESPONSE"
                  title="You do not have to assemble everything alone."
                />
              </div>
              <div className="border-t border-orange/20 bg-white/55 p-7 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
                <div className="space-y-4 text-base leading-8 text-muted">
                  <p>
                    The resources show how individual ESG tasks can be
                    structured.
                  </p>
                  <p>
                    If a concrete customer request already exists, send the
                    original questionnaire, email, spreadsheet or platform
                    export.
                  </p>
                  <p>
                    We can identify the required data, available sources, real
                    gaps and evidence needed for a response your company can
                    review.
                  </p>
                </div>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <ButtonLink href="/en/send-request">Send your ESG request</ButtonLink>
                  <ButtonLink href="/en/methodology" variant="secondary">
                    See methodology
                  </ButtonLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="final-title" className="bg-orange py-20 text-white sm:py-24">
        <div className="site-shell grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-4xl">
            <FileCheck2 aria-hidden="true" className="h-10 w-10 text-ink" />
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.16em] text-ink">
              START WITH THE REQUEST
            </p>
            <h2
              className="font-display mt-6 text-[clamp(3rem,6vw,6rem)] leading-[0.92]"
              id="final-title"
            >
              The customer has already asked?
            </h2>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-white/85">
              Send us what the customer sent you. We begin with the actual
              request, not a generic ESG checklist.
            </p>
          </div>
          <div className="lg:text-right">
            <ButtonLink href="/en/send-request" variant="dark">
              Send the request
            </ButtonLink>
            <p className="mt-4 text-xs font-bold text-ink/68">
              Questionnaire - Excel - PDF - portal - customer email
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
