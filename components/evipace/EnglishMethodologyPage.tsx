import type { ReactNode } from "react";
import {
  CheckCircle2,
  FileText,
  MinusCircle,
  Scale,
  ShieldCheck
} from "lucide-react";
import { ButtonLink } from "./ButtonLink";
import { InView } from "./home-sections/InView";

const SEND_REQUEST_HREF = "/en/send-request";

const sourceExamples = [
  "an electricity invoice",
  "a fuel-consumption report",
  "an ISO certificate",
  "an existing company policy",
  "an HR dataset",
  "a maintenance record",
  "a previous calculation",
  "or information confirmed by an authorised person within the company"
];

const projectSteps = [
  {
    number: "01",
    title: "Understand the requirement",
    body: "We first establish what the customer, platform, reporting framework or internal project actually requires.",
    items: [
      "responding to a customer ESG request",
      "preparing a supplier questionnaire",
      "structuring an EcoVadis assessment",
      "preparing IntegrityNext information",
      "calculating Scope 1 and Scope 2 emissions",
      "assessing relevant Scope 3 emissions where agreed",
      "preparing a voluntary sustainability report",
      "drafting supporting policies and documentation"
    ],
    closing:
      "We structure the work around the actual requirement rather than forcing every project into the same ESG package."
  },
  {
    number: "02",
    title: "Gather source information",
    body: "You provide the information already available within the company.",
    items: [
      "invoices",
      "consumption records",
      "spreadsheets",
      "certificates",
      "policies",
      "employee information",
      "production data",
      "maintenance records",
      "previous reports",
      "existing calculations",
      "customer requirements",
      "screenshots or platform information"
    ]
  },
  {
    number: "03",
    title: "Structure the information",
    body: "We map the available information to the relevant requirements.",
    items: [
      "what already exists",
      "which source supports which answer",
      "what needs to be calculated",
      "what still requires internal confirmation",
      "and where genuine information gaps remain"
    ]
  },
  {
    number: "04",
    title: "Prepare the work",
    body: "Depending on the assignment, the output may include:",
    items: [
      "draft responses",
      "ESG metrics",
      "emissions calculations",
      "evidence mapping",
      "report content",
      "policy drafts",
      "structured data",
      "or gap lists"
    ]
  },
  {
    number: "05",
    title: "Human review",
    body: "Prepared deliverables are reviewed before they are returned to the client.",
    closing:
      "The review considers, among other things, consistency, plausibility, traceability and information that appears incomplete or unclear. Digital tools may support the preparation process. They do not replace this review step."
  },
  {
    number: "06",
    title: "Company confirmation",
    body: "Certain statements can only be confirmed authoritatively by the company itself.",
    closing:
      "This is particularly relevant to actual business practices, internal responsibilities, formal company policies, strategic statements and information requiring internal approval. Evipace prepares the work. The company confirms what only the company can authoritatively confirm."
  }
];

const traceabilityItems = [
  "underlying source data",
  "reporting or consumption period",
  "units",
  "calculation method",
  "emissions-factor source",
  "relevant factor version or reference year",
  "assumptions",
  "organisational or methodological boundaries",
  "supporting evidence",
  "and unresolved data gaps"
];

const scopeOneExamples = [
  "natural gas",
  "heating oil",
  "other fuels",
  "company vehicles",
  "certain machinery",
  "process emissions",
  "refrigerant losses"
];

const scopeOneChecks = [
  "reporting period",
  "unit",
  "data source",
  "organisational boundary",
  "selected factor",
  "and required conversions"
];

const scopeTwoExamples = [
  "electricity",
  "district heating",
  "district cooling",
  "purchased steam",
  "and other relevant forms of acquired energy"
];

const scopeThreeExamples = [
  "purchased goods and services",
  "capital goods",
  "fuel- and energy-related activities",
  "transport and distribution",
  "waste",
  "business travel",
  "employee commuting",
  "leased assets",
  "use or end-of-life treatment of sold products",
  "and other relevant value-chain categories"
];

const scopeThreeDataTypes = [
  "primary data",
  "supplier-specific data",
  "activity data",
  "secondary data",
  "spend-based approaches",
  "proxies",
  "and estimates"
];

const factorSelectionItems = [
  "the type of emissions source",
  "geography",
  "reporting year",
  "activity unit",
  "methodological purpose",
  "availability of more specific data",
  "and the relevance and currency of the source"
];

const estimateRules = [
  {
    title: "When reliable primary data is available",
    body: "we use it where appropriate."
  },
  {
    title: "When an estimate is necessary",
    body: "we treat it as an estimate and document the basis used."
  },
  {
    title: "When a proxy is used",
    body: "the reason for using it and the limitations attached to it should remain visible."
  },
  {
    title: "When information cannot be determined reliably",
    body: "it remains an open gap."
  }
];

const platformSupportItems = [
  "interpreting the requirement",
  "structuring the required information",
  "matching available documentation to relevant questions",
  "preparing response drafts",
  "identifying missing information",
  "and highlighting points that still require internal confirmation"
];

const evidenceChecks = [
  "What does the document actually relate to?",
  "Which statement can it genuinely support?",
  "Which legal entity, site or operation does it cover?",
  "Which period does it apply to?",
  "Is it still current?",
  "Does it require additional context?"
];

const technologySupportItems = [
  "document structuring",
  "information extraction",
  "classification",
  "comparison of requirements",
  "preparation of calculations",
  "initial text or structure drafts"
];

const technologyDoesNotDecide = [
  "whether evidence is sufficient",
  "whether a business practice genuinely exists",
  "whether a policy has been adopted",
  "whether an assumption is appropriate",
  "or whether a final company statement has been approved"
];

const evipaceResponsibilities = [
  "structuring the agreed ESG assignment",
  "organising the information provided",
  "preparing calculations and draft responses",
  "documenting relevant methods and sources",
  "identifying data and evidence gaps",
  "and reviewing prepared deliverables before return"
];

const clientResponsibilities = [
  "the accuracy of the source data it provides",
  "the completeness of company information known to it",
  "confirming company-specific facts",
  "internal decisions",
  "formal adoption of company policies",
  "required internal approvals",
  "and final confirmation of statements that only the company itself can authoritatively make"
];

const methodologyReferences = [
  "the GHG Protocol",
  "appropriate governmental or technically credible emissions-factor sources",
  "VSME or the relevant European voluntary sustainability reporting framework",
  "customer-specific requirements",
  "EcoVadis requirements",
  "IntegrityNext requirements",
  "and other project-specific reporting or data requirements"
];

const standardsStates = [
  "currently applicable requirements",
  "published methodological guidance",
  "adopted changes that are not yet effective",
  "and developments that remain under revision or in draft form"
];

const vsmeQuestions = [
  "What reporting scope is appropriate?",
  "Which disclosures are required?",
  "Which company data already exists?",
  "Which metrics need to be calculated?",
  "Which information still requires confirmation or development?"
];

const deliverables = [
  "a prepared response or report",
  "structured ESG data",
  "evidence mapping",
  "calculation workbooks or calculation basis",
  "Scope 1 and Scope 2 results",
  "agreed Scope 3 analysis",
  "emissions-factor references",
  "documented assumptions",
  "outstanding questions and gap lists",
  "policy or document drafts",
  "review-ready materials for internal approval"
];

const limitations = [
  "does not issue ESG certifications",
  "does not perform statutory audits",
  "does not provide independent assurance or verification unless separately performed by an appropriately qualified external provider",
  "does not provide legal advice",
  "does not guarantee a particular regulatory assessment",
  "does not guarantee a particular EcoVadis score or medal",
  "does not guarantee a particular IntegrityNext status",
  "does not guarantee acceptance by a customer, bank, platform or other third party",
  "and does not present missing company practices or evidence as though they exist"
];

type EnglishMethodologyPageProps = {
  lastReviewed?: string;
};

/**
 * One-time settle, built on the shared InView wrapper.
 *
 * The markup ships in its final, visible state; InView only adds
 * `data-evi-reveal` once the block is on screen, and the CSS hides anything
 * only while that attribute says "pending". A reader without JavaScript — or
 * one who asked for reduced motion — gets the finished page. Stagger is a
 * fixed CSS delay class rather than an inline style, so the shared wrapper
 * needs no new prop and stays a plain server-rendered boundary.
 */
function Rise({
  children,
  className = "",
  delay = 0
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const step = Math.min(5, Math.round((delay * 1000) / 40));
  const stepClass = step > 0 ? ` methodology-rise--d${step}` : "";
  return (
    <InView className={`methodology-rise${stepClass} ${className}`.trim()}>
      {children}
    </InView>
  );
}

function EnglishReviewedLine({ date }: { date?: string }) {
  return (
    <section className="section-padding py-8 sm:py-10">
      <div className="site-shell">
        <Rise className="max-w-3xl border-t border-[rgba(21,21,21,0.12)] pt-6">
          <p className="text-sm font-bold text-[rgba(21,21,21,0.55)]">
            Last methodologically reviewed: 21 August 2026
          </p>
          <p className="methodology-prose mt-3 text-sm leading-7 text-muted">
            This date reflects the latest substantive review of this
            methodology, not the date of a website deployment.
          </p>
          {date ? (
            <p className="sr-only">Registry lastReviewed: {date}</p>
          ) : null}
        </Rise>
      </div>
    </section>
  );
}

function Section({
  eyebrow,
  heading,
  children,
  id,
  tone = "light"
}: {
  eyebrow?: string;
  heading: string;
  children: ReactNode;
  id?: string;
  tone?: "light" | "warm" | "paper" | "dark";
}) {
  const classes = {
    light: "bg-white text-ink",
    warm: "bg-[var(--warm)] text-ink",
    paper: "bg-[var(--paper)] text-ink",
    dark: "bg-dark text-white"
  };

  return (
    <section className={`methodology-section ${classes[tone]}`} id={id}>
      <div className="site-shell">
        <Rise className="max-w-4xl">
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <h2
            className={`methodology-h2 font-display mt-5 ${
              tone === "dark" ? "text-white" : "text-ink"
            }`}
          >
            {heading}
          </h2>
        </Rise>
        <div className="mt-9 sm:mt-11">{children}</div>
      </div>
    </section>
  );
}

function CheckList({
  items,
  dark = false
}: {
  items: string[];
  dark?: boolean;
}) {
  return (
    <ul className="grid gap-3">
      {items.map((item) => (
        <li
          className={`flex gap-3 leading-7 ${dark ? "text-white/72" : "text-muted"}`}
          key={item}
        >
          <CheckCircle2
            aria-hidden="true"
            className="mt-0.5 h-5 w-5 shrink-0 text-orange"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function EnglishMethodologyPage({
  lastReviewed
}: EnglishMethodologyPageProps) {
  return (
    <>
      <main className="methodology-page">
        <section
          className="methodology-hero relative isolate overflow-hidden"
          id="top"
          aria-labelledby="methodology-title"
        >
          <div aria-hidden="true"
            className="methodology-ghost pointer-events-none absolute right-[5vw] top-24 hidden font-display text-[12rem] leading-none text-[rgba(21,21,21,0.035)] xl:block">
            METHOD
          </div>
          <div className="site-shell">
            <div className="max-w-4xl">
              <p className="eyebrow">Methodology</p>
              <h1
                className="methodology-h1 font-display mt-5"
                id="methodology-title"
              >
                How company data becomes reliable ESG work.
              </h1>
              <div className="methodology-lead mt-6 space-y-4">
                <p>
                  Evipace does not start with generic answers or pre-written
                  ESG language.
                </p>
                <p>
                  We start with the actual data, documents and company
                  information relevant to the task in front of you.
                </p>
                <p>
                  From that foundation, we prepare questionnaire responses,
                  emissions calculations, sustainability reports, evidence
                  packages and document drafts — with traceable sources,
                  visible assumptions and human review.
                </p>
              </div>
              <p className="mt-7 text-sm font-semibold leading-7 text-[rgba(21,21,21,0.62)]">
                Sources · Calculations · Evidence · Review · Transparency
              </p>
            </div>
          </div>
        </section>

        <Section
          eyebrow="First principle"
          heading="Our first principle: source before statement."
          id="principle"
          tone="warm"
        >
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <Rise className="methodology-body space-y-4 text-muted">
              <p>
                An ESG answer is only as reliable as the information behind
                it.
              </p>
              <p>That is why we do not begin by asking:</p>
              <p className="methodology-statement font-display text-ink">
                &ldquo;What should we write here?&rdquo;
              </p>
              <p>We begin with:</p>
              <p className="methodology-statement font-display text-orange">
                &ldquo;What can we support based on the company&apos;s actual
                information?&rdquo;
              </p>
              <p>
                Those sources form the working basis for the engagement. Where
                relevant to the assignment, material figures and statements
                should be capable of being traced back to a source, calculation
                or confirmed piece of company information.
              </p>
              <p className="border-l-2 border-orange pl-5 font-semibold text-ink">
                If information is missing, we treat it as a gap — not as an
                invitation to invent a plausible answer.
              </p>
            </Rise>
            <Rise
              className="rounded-lg border border-[rgba(21,21,21,0.11)] bg-white p-6 shadow-lift sm:p-8"
              delay={0.08}
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[var(--soft-orange)] text-orange">
                  <FileText aria-hidden="true" className="h-5 w-5" />
                </div>
                <p className="text-sm font-bold uppercase text-orange">
                  Source examples
                </p>
              </div>
              <CheckList items={sourceExamples} />
            </Rise>
          </div>
        </Section>

        <Section
          eyebrow="Engagement process"
          heading="How an evipace engagement works."
          id="process"
        >
          <Rise className="methodology-body space-y-4 text-muted">
            <p>No two ESG assignments are exactly the same.</p>
            <p>
              Preparing an EcoVadis assessment is different from calculating
              Scope 1 emissions. A VSME report has a different structure from
              a customer-specific supplier questionnaire.
            </p>
            <p className="font-semibold text-ink">
              But the underlying process remains consistent.
            </p>
          </Rise>
          <div className="mt-12 grid gap-5">
            {projectSteps.map((step, index) => (
              <Rise
                className="grid gap-6 rounded-lg border border-[rgba(21,21,21,0.11)] bg-[var(--paper)] p-6 sm:p-7 lg:grid-cols-[8rem_1fr]"
                delay={index * 0.04}
                key={step.title}
              >
                <p className="methodology-step-number font-display text-orange">
                  {step.number}
                </p>
                <div>
                  <h3 className="methodology-step-title font-bold text-ink">{step.title}</h3>
                  <p className="methodology-prose mt-3 leading-7 text-muted">{step.body}</p>
                  {step.items ? (
                    <div className="mt-5 grid gap-x-6 gap-y-3 sm:grid-cols-2">
                      {step.items.map((item) => (
                        <p
                          className="border-t border-[rgba(21,21,21,0.1)] pt-3 text-sm font-semibold text-[rgba(21,21,21,0.66)]"
                          key={item}
                        >
                          {item}
                        </p>
                      ))}
                    </div>
                  ) : null}
                  {step.closing ? (
                    <p className="methodology-prose mt-5 leading-7 text-muted">{step.closing}</p>
                  ) : null}
                </div>
              </Rise>
            ))}
          </div>
        </Section>

        <Section
          eyebrow="Traceability"
          heading="Traceability is part of the deliverable."
          id="traceability"
          tone="paper"
        >
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <Rise className="methodology-body space-y-4 text-muted">
              <p>
                We do not only want to know what number eventually appears in
                a spreadsheet or report.
              </p>
              <p>We also want to understand how that number was produced.</p>
              <p>
                Not every sentence requires the same level of documentation.
                But for material metrics, calculations and claims, the basis
                should be understandable.
              </p>
              <p className="methodology-statement font-display text-orange">
                The result should not only look complete. It should be
                traceable.
              </p>
            </Rise>
            <Rise
              className="rounded-lg border border-[rgba(21,21,21,0.11)] bg-white p-6 sm:p-8"
              delay={0.08}
            >
              <p className="mb-6 text-sm font-bold uppercase text-orange">
                Relevant working documentation may include
              </p>
              <CheckList items={traceabilityItems} />
            </Rise>
          </div>
        </Section>

        <Section
          eyebrow="Greenhouse-gas emissions"
          heading="How we calculate greenhouse-gas emissions."
          id="emissions"
        >
          <Rise className="methodology-body space-y-4 text-muted">
            <p>
              Greenhouse-gas calculations begin with a defined boundary and
              appropriate activity data.
            </p>
            <p className="font-semibold text-ink">
              Not with a desired final number.
            </p>
          </Rise>

          <div className="mt-12 grid gap-6">
            <Rise className="rounded-lg border border-[rgba(21,21,21,0.11)] bg-[var(--paper)] p-7 sm:p-9">
              <p className="eyebrow">Scope 1</p>
              <h3 className="methodology-h3 mt-5 font-bold text-ink">
                Direct emissions from owned or controlled sources.
              </h3>
              <p className="methodology-body mt-5 text-muted">
                Scope 1 covers relevant direct greenhouse-gas emissions from
                sources owned or controlled by the company.
              </p>
              <div className="mt-7 grid gap-8 lg:grid-cols-2">
                <div>
                  <p className="mb-4 text-sm font-bold uppercase text-orange">
                    Depending on the organisation
                  </p>
                  <CheckList items={scopeOneExamples} />
                </div>
                <div>
                  <p className="mb-4 text-sm font-bold uppercase text-orange">
                    Typical calculation logic
                  </p>
                  <p className="rounded-lg border border-[rgba(254,112,1,0.26)] bg-[var(--soft-orange)] px-5 py-4 font-semibold text-ink">
                    Activity data → appropriate emissions factor → CO₂e
                  </p>
                  <div className="mt-5">
                    <CheckList items={scopeOneChecks} />
                  </div>
                </div>
              </div>
            </Rise>

            <Rise
              className="rounded-lg border border-[rgba(21,21,21,0.11)] bg-white p-7 sm:p-9"
              delay={0.05}
            >
              <p className="eyebrow">Scope 2</p>
              <h3 className="methodology-h3 mt-5 font-bold text-ink">
                Purchased or acquired energy.
              </h3>
              <p className="methodology-body mt-5 text-muted">
                Scope 2 relates to greenhouse-gas emissions associated with
                purchased or acquired energy.
              </p>
              <div className="mt-7 grid gap-8 lg:grid-cols-2">
                <CheckList items={scopeTwoExamples} />
                <p className="methodology-prose rounded-lg border border-[rgba(21,21,21,0.11)] bg-[var(--paper)] p-5 leading-8 text-muted">
                  Depending on the reporting purpose and available information,
                  a location-based calculation and, where applicable, a
                  market-based calculation may be relevant. The appropriate
                  treatment depends on the specific reporting or customer
                  requirement.
                </p>
              </div>
            </Rise>

            <Rise
              className="rounded-lg border border-[rgba(21,21,21,0.11)] bg-[var(--paper)] p-7 sm:p-9"
              delay={0.1}
            >
              <p className="eyebrow">Scope 3</p>
              <h3 className="methodology-h3 mt-5 font-bold text-ink">
                Other indirect emissions, where they are part of the
                engagement.
              </h3>
              <p className="methodology-body mt-5 text-muted">
                Where Scope 3 is part of the agreed engagement, we assess
                relevant indirect emissions across the upstream and downstream
                value chain.
              </p>
              <div className="mt-7 grid gap-8 lg:grid-cols-2">
                <div>
                  <p className="mb-4 text-sm font-bold uppercase text-orange">
                    Potentially relevant areas
                  </p>
                  <CheckList items={scopeThreeExamples} />
                </div>
                <div>
                  <p className="mb-4 text-sm font-bold uppercase text-orange">
                    Data quality
                  </p>
                  <p className="methodology-prose mb-5 leading-8 text-muted">
                    Scope 3 data is often more heterogeneous than Scope 1 and
                    Scope 2 data. It is therefore important to distinguish
                    between these data types.
                  </p>
                  <CheckList items={scopeThreeDataTypes} />
                  <p className="methodology-prose mt-6 font-semibold leading-8 text-ink">
                    The weaker the underlying data, the more important it
                    becomes to make that uncertainty visible.
                  </p>
                </div>
              </div>
            </Rise>
          </div>
        </Section>

        <Section
          eyebrow="Emissions factors"
          heading="We do not treat emissions factors as universal constants."
          id="emissions-factors"
          tone="warm"
        >
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <Rise className="methodology-body space-y-4 text-muted">
              <p>
                An emissions factor is not a number that can be copied blindly
                from a table and applied to every company, year and geography.
              </p>
              <p>
                Depending on the assignment, suitable factors may come from
                recognised methodological, governmental or technically
                credible datasets.
              </p>
              <p>
                For material calculations, the factor itself is only part of
                the story. Its source and methodological context should remain
                identifiable as well.
              </p>
            </Rise>
            <Rise
              className="rounded-lg border border-[rgba(21,21,21,0.11)] bg-white p-6 sm:p-8"
              delay={0.08}
            >
              <p className="mb-6 text-sm font-bold uppercase text-orange">
                Selection may take into account
              </p>
              <CheckList items={factorSelectionItems} />
            </Rise>
          </div>
        </Section>

        <Section
          eyebrow="Estimates and gaps"
          heading="How we handle estimates and missing data."
          id="data-gaps"
        >
          <Rise className="methodology-body space-y-4 text-muted">
            <p>Perfect data is not always available.</p>
            <p>That is normal in real companies.</p>
            <p className="font-semibold text-ink">
              What matters is how the limitation is handled.
            </p>
          </Rise>
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {estimateRules.map((rule, index) => (
              <Rise
                className="rounded-lg border border-[rgba(21,21,21,0.11)] bg-[var(--paper)] p-6"
                delay={index * 0.04}
                key={rule.title}
              >
                <h3 className="methodology-card-title font-bold text-ink">{rule.title}</h3>
                <p className="methodology-prose mt-3 leading-7 text-muted">{rule.body}</p>
              </Rise>
            ))}
          </div>
          <Rise className="methodology-quote mt-9 border-l-2 border-orange pl-5 text-ink">
            False precision is not better than transparently documented
            uncertainty. We do not create exact-looking ESG figures from
            unsupported assumptions.
          </Rise>
        </Section>

        <Section
          eyebrow="Questionnaires and platforms"
          heading="Questionnaires, EcoVadis and IntegrityNext: the answer and the evidence belong together."
          id="platforms"
          tone="paper"
        >
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <Rise className="methodology-body space-y-4 text-muted">
              <p>
                For customer questionnaires and ESG platforms, completing
                fields is often only part of the work.
              </p>
              <p>
                What matters just as much is the company information behind
                those responses.
              </p>
              <p>
                For EcoVadis and IntegrityNext, we prepare the working basis
                for the company.
              </p>
              <p className="font-semibold text-ink">
                The final entry or submission on the external platform is made
                by the company itself.
              </p>
              <p>
                This keeps responsibility clear for the company statements
                being submitted to the third party.
              </p>
              <p>
                Evipace is an independent service provider and is not
                affiliated with EcoVadis or IntegrityNext.
              </p>
            </Rise>
            <Rise
              className="rounded-lg border border-[rgba(21,21,21,0.11)] bg-white p-6 sm:p-8"
              delay={0.08}
            >
              <p className="mb-6 text-sm font-bold uppercase text-orange">
                Evipace may support the process by
              </p>
              <CheckList items={platformSupportItems} />
            </Rise>
          </div>
        </Section>

        <Section
          eyebrow="Supporting evidence"
          heading="How we treat supporting evidence."
          id="evidence"
        >
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <Rise className="methodology-body space-y-4 text-muted">
              <p>
                A document should support the statement it is being used to
                evidence. It should not merely look relevant.
              </p>
              <p>
                An ISO certificate does not automatically answer every
                environmental question. A policy does not automatically prove
                implementation. An invoice does not automatically answer a
                complete emissions question.
              </p>
              <p className="methodology-step-number font-display text-orange">
                Evidence before claim.
              </p>
              <p>
                If suitable evidence is missing, the point is treated as a gap.
              </p>
              <p className="font-semibold text-ink">
                We do not create fictitious, backdated or misleading evidence.
              </p>
            </Rise>
            <Rise
              className="rounded-lg border border-[rgba(21,21,21,0.11)] bg-[var(--paper)] p-6 sm:p-8"
              delay={0.08}
            >
              <p className="mb-6 text-sm font-bold uppercase text-orange">
                We may consider questions such as
              </p>
              <CheckList items={evidenceChecks} />
            </Rise>
          </div>
        </Section>

        <Section
          eyebrow="Policies"
          heading="How policies and company documents are drafted."
          id="policies"
          tone="warm"
        >
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <Rise className="methodology-body space-y-4 text-muted">
              <p>
                Sometimes an ESG request reveals that a relevant company
                practice exists but has not yet been formally documented.
              </p>
              <p>In those situations, evipace may prepare a draft.</p>
              <p>
                The governing principle is simple: the content must reflect
                the company&apos;s actual practices and actual decisions.
              </p>
              <p>
                We do not create policies by inserting generic claims about
                what a &ldquo;good company&rdquo; supposedly does.
              </p>
              <p className="font-semibold text-ink">
                A newly created document is also never presented as though it
                had existed historically.
              </p>
            </Rise>
            <Rise
              className="rounded-lg border border-[rgba(254,112,1,0.28)] bg-[var(--soft-orange)] p-6 sm:p-8"
              delay={0.08}
            >
              <p className="text-sm font-bold uppercase text-orange">
                The process is
              </p>
              <p className="methodology-statement font-display mt-6 text-ink">
                actual company practice → structured draft → internal review →
                necessary corrections → explicit approval
              </p>
              <p className="methodology-step-title mt-7 font-bold text-ink">
                A draft is not yet a company policy.
              </p>
              <p className="methodology-prose mt-4 leading-8 text-muted">
                It only becomes a valid company document once an authorised
                person within the company has reviewed it, amended it where
                necessary and explicitly approved or adopted it.
              </p>
            </Rise>
          </div>
        </Section>

        <Section
          eyebrow="Technology"
          heading="Technology can accelerate preparation. Responsibility is not automated."
          id="technology"
          tone="dark"
        >
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <Rise className="methodology-body space-y-4 text-white/72">
              <p>
                Evipace may use digital and AI-assisted tools internally to
                process larger volumes of information more efficiently.
              </p>
              <p>
                They do not determine independently what is actually true
                within the company.
              </p>
              <p className="border-l-2 border-orange pl-5 font-semibold text-white">
                Every deliverable is reviewed by a person before it is returned
                to the client.
              </p>
              <p>
                AI is an internal tool within the working process — not the
                source of company truth and not the product we sell.
              </p>
            </Rise>
            <div className="grid gap-5">
              <Rise className="rounded-lg border border-white/12 bg-white/[0.04] p-6 sm:p-7">
                <p className="mb-5 text-sm font-bold uppercase text-orange">
                  May support
                </p>
                <CheckList items={technologySupportItems} dark />
              </Rise>
              <Rise
                className="rounded-lg border border-white/12 bg-white/[0.04] p-6 sm:p-7"
                delay={0.08}
              >
                <p className="mb-5 text-sm font-bold uppercase text-orange">
                  Does not decide independently
                </p>
                <CheckList items={technologyDoesNotDecide} dark />
              </Rise>
            </div>
          </div>
        </Section>

        <Section
          eyebrow="Division of responsibility"
          heading="Your responsibility. Our responsibility."
          id="responsibility"
        >
          <Rise className="methodology-body space-y-4 text-muted">
            <p>
              Reliable ESG work requires a clear division of responsibilities.
            </p>
          </Rise>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <Rise className="rounded-lg border border-[rgba(21,21,21,0.11)] bg-[var(--paper)] p-7 sm:p-9">
              <div className="mb-6 flex items-center gap-3">
                <ShieldCheck aria-hidden="true" className="h-5 w-5 text-orange" />
                <h3 className="methodology-step-title font-bold text-ink">
                  Evipace is responsible for
                </h3>
              </div>
              <CheckList items={evipaceResponsibilities} />
            </Rise>
            <Rise
              className="rounded-lg border border-[rgba(21,21,21,0.11)] bg-white p-7 shadow-lift sm:p-9"
              delay={0.08}
            >
              <div className="mb-6 flex items-center gap-3">
                <Scale aria-hidden="true" className="h-5 w-5 text-orange" />
                <h3 className="methodology-step-title font-bold text-ink">
                  Your company is responsible for
                </h3>
              </div>
              <CheckList items={clientResponsibilities} />
            </Rise>
          </div>
          <Rise className="methodology-quote methodology-quote--box mt-8 border-l-2 border-orange bg-[var(--soft-orange)] px-6 py-5 text-ink">
            If source information appears inconsistent, incomplete or unclear,
            we flag it. We do not replace missing company information with
            invented facts.
          </Rise>
        </Section>

        <Section
          eyebrow="Methodological basis"
          heading="We work with the methodology relevant to the engagement."
          id="standards"
          tone="paper"
        >
          <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr]">
            <Rise className="methodology-body space-y-4 text-muted">
              <p>
                ESG standards, reporting requirements and emissions-factor
                datasets continue to evolve.
              </p>
              <p>
                Methodology therefore cannot be treated as a static checklist.
              </p>
              <p>
                The applicable methodological basis depends on the assignment.
              </p>
              <p className="font-semibold text-ink">
                Announced changes are not treated as rules that are already in
                force.
              </p>
              <p>
                Where a version or methodological reference materially affects
                the result, it should remain identifiable.
              </p>
            </Rise>
            <div className="grid gap-5">
              <Rise className="rounded-lg border border-[rgba(21,21,21,0.11)] bg-white p-6 sm:p-7">
                <p className="mb-5 text-sm font-bold uppercase text-orange">
                  Depending on the assignment
                </p>
                <CheckList items={methodologyReferences} />
              </Rise>
              <Rise
                className="rounded-lg border border-[rgba(21,21,21,0.11)] bg-white p-6 sm:p-7"
                delay={0.08}
              >
                <p className="mb-5 text-sm font-bold uppercase text-orange">
                  We distinguish between
                </p>
                <CheckList items={standardsStates} />
              </Rise>
            </div>
          </div>
        </Section>

        <Section
          eyebrow="VSME"
          heading="VSME and voluntary sustainability reporting."
          id="vsme"
        >
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <Rise className="methodology-body space-y-4 text-muted">
              <p>
                For voluntary sustainability reporting, we structure the work
                around the European reporting framework relevant to the
                engagement.
              </p>
              <p>
                The objective is not to produce the largest possible amount of
                ESG text.
              </p>
              <p className="font-semibold text-ink">
                The data foundation comes before the narrative.
              </p>
              <p>
                That means the project can produce more than a report. It can
                also create a structured ESG information base that can be
                reused for customer requests and other ESG processes later.
              </p>
            </Rise>
            <Rise
              className="rounded-lg border border-[rgba(21,21,21,0.11)] bg-[var(--paper)] p-6 sm:p-8"
              delay={0.08}
            >
              <p className="mb-6 text-sm font-bold uppercase text-orange">
                The first questions are practical
              </p>
              <CheckList items={vsmeQuestions} />
            </Rise>
          </div>
        </Section>

        <Section
          eyebrow="Working material"
          heading="How we use the documents you provide."
          id="documents"
          tone="warm"
        >
          <Rise className="methodology-body space-y-4 text-muted">
            <p>
              The documents and information you provide for an engagement are
              used as working material for the agreed service.
            </p>
            <p>
              Those materials may contain sensitive internal company
              information.
            </p>
            <p>
              Documents uploaded through the evipace request process are
              therefore not made publicly available.
            </p>
            <p>
              Detailed rules relating to privacy, retention periods and data
              handling belong in the dedicated privacy documentation rather
              than on this methodology page.
            </p>
            <p>
              This page intentionally does not make broader storage or
              retention promises beyond the working process described here.
            </p>
          </Rise>
        </Section>

        <Section
          eyebrow="Deliverables"
          heading="What you may receive at the end of an engagement."
          id="deliverables"
        >
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <Rise className="methodology-body space-y-4 text-muted">
              <p>The exact deliverables depend on the assignment.</p>
              <p>Not every project includes every item.</p>
              <p className="font-semibold text-ink">
                The objective is consistent: you should be able to understand
                the basis on which the result was prepared.
              </p>
            </Rise>
            <Rise
              className="rounded-lg border border-[rgba(21,21,21,0.11)] bg-[var(--paper)] p-6 sm:p-8"
              delay={0.08}
            >
              <p className="mb-6 text-sm font-bold uppercase text-orange">
                Deliverables may include
              </p>
              <CheckList items={deliverables} />
            </Rise>
          </div>
        </Section>

        <Section
          eyebrow="Boundaries"
          heading="What evipace does not claim to provide."
          id="boundaries"
          tone="dark"
        >
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
            <Rise className="methodology-body space-y-4 text-white/72">
              <p>Clear methodology also means clear boundaries.</p>
              <p>
                Our role is the structured and traceable preparation of ESG
                work based on the company information available and confirmed
                for the engagement.
              </p>
            </Rise>
            <Rise
              className="rounded-lg border border-white/12 bg-white/[0.04] p-6 sm:p-8"
              delay={0.08}
            >
              <p className="mb-6 text-sm font-bold uppercase text-orange">
                evipace
              </p>
              <ul className="grid gap-4">
                {limitations.map((item) => (
                  <li className="flex gap-3 leading-7 text-white/72" key={item}>
                    <MinusCircle
                      aria-hidden="true"
                      className="mt-0.5 h-5 w-5 shrink-0 text-white/42"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Rise>
          </div>
        </Section>

        <EnglishReviewedLine date={lastReviewed} />

        <section
          className="relative isolate overflow-hidden bg-[var(--soft-orange)] py-20 sm:py-28"
          id="contact"
        >
          <div className="site-shell relative z-10 max-w-5xl">
            <Rise>
              <p className="eyebrow">Next step</p>
              <h2 className="methodology-h2 methodology-h2--cta font-display mt-5">
                Have a concrete ESG requirement?
              </h2>
              <div className="methodology-lead mt-6 space-y-4 text-[rgba(21,21,21,0.68)]">
                <p>Show us what you are working with.</p>
                <p>
                  We will review which data, documents, calculations and
                  working steps are likely to be required and how the
                  assignment can be structured.
                </p>
              </div>
              <div className="mt-9">
                <ButtonLink href={SEND_REQUEST_HREF}>
                  Send your ESG request
                </ButtonLink>
              </div>
              <p className="mt-7 text-sm font-semibold leading-7 text-[rgba(21,21,21,0.62)]">
                Questionnaires · Emissions · Reporting · Evidence · Policies
              </p>
            </Rise>
          </div>
        </section>
      </main>
    </>
  );
}
