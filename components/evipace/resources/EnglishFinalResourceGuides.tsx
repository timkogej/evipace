import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, FileCheck2, RefreshCw, Send, ShieldCheck } from "lucide-react";
import { ButtonLink } from "../ButtonLink";

const SEND_REQUEST_HREF = "/en/send-request";

function InlineLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      className="group inline-flex min-h-11 items-center gap-2 text-sm font-bold text-ink underline decoration-orange/35 underline-offset-4 transition hover:text-orange"
      href={href}
    >
      <span>{children}</span>
      <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 text-orange transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

function SectionHeading({
  id,
  eyebrow,
  title,
  children,
  light = false
}: {
  id: string;
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  light?: boolean;
}) {
  return (
    <div className="max-w-3xl">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2
        className={`font-display mt-5 scroll-mt-28 break-words hyphens-auto text-[clamp(2.35rem,4.8vw,4.8rem)] leading-[1] ${
          light ? "text-white" : "text-ink"
        }`}
        id={id}
      >
        {title}
      </h2>
      {children ? (
        <div className={`mt-6 space-y-4 text-base leading-8 sm:text-lg ${light ? "text-white/66" : "text-muted"}`}>
          {children}
        </div>
      ) : null}
    </div>
  );
}

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-4 grid gap-2.5">
      {items.map((item) => (
        <li className="flex gap-3 text-sm leading-6 text-muted" key={item}>
          <span aria-hidden="true" className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
          <span className="min-w-0 break-words">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function FlowLine({
  items,
  dark = false,
  columns = "lg:grid-cols-4"
}: {
  items: readonly string[];
  dark?: boolean;
  columns?: string;
}) {
  return (
    <ol className={`grid gap-3 sm:grid-cols-2 ${columns}`}>
      {items.map((item, index) => (
        <li className={`relative min-w-0 border-t pt-4 ${dark ? "border-white/20" : "border-[rgba(21,21,21,0.16)]"}`} key={item}>
          {index < items.length - 1 ? (
            <ArrowRight aria-hidden="true" className="absolute -right-3 top-4 hidden h-4 w-4 text-orange lg:block" />
          ) : null}
          <span className="font-mono text-[0.62rem] font-bold text-orange">{String(index + 1).padStart(2, "0")}</span>
          <p className={`mt-2 break-words text-sm font-bold leading-5 ${dark ? "text-white" : "text-ink"}`}>{item}</p>
        </li>
      ))}
    </ol>
  );
}

function ResourceHero({
  eyebrow,
  title,
  intro,
  qualifierTitle,
  qualifier,
  primaryHref,
  primaryLabel,
  artworkLabel
}: {
  eyebrow: string;
  title: string;
  intro: ReactNode;
  qualifierTitle: string;
  qualifier: string;
  primaryHref: string;
  primaryLabel: string;
  artworkLabel: string;
}) {
  return (
    <header aria-labelledby="article-title" className="resource-article-hero relative isolate overflow-hidden pb-20 pt-28 sm:pb-24 sm:pt-32 lg:pb-28">
      <div aria-hidden="true" className="resource-hero-art">
        <svg className="resource-hero-art__sheet" fill="none" viewBox="0 0 520 650" xmlns="http://www.w3.org/2000/svg">
          <path d="M112 122H408M112 176H340M112 306H408M112 356H408M112 406H320" stroke="currentColor" strokeOpacity="0.44" strokeWidth="4" />
          <rect height="64" rx="12" stroke="currentColor" strokeOpacity="0.7" strokeWidth="3" width="296" x="112" y="214" />
          <path d="M138 246H236M270 246H382" stroke="currentColor" strokeOpacity="0.64" strokeWidth="8" />
          <rect height="42" rx="10" stroke="currentColor" strokeOpacity="0.34" strokeWidth="3" width="100" x="112" y="500" />
          <rect height="42" rx="10" stroke="currentColor" strokeOpacity="0.34" strokeWidth="3" width="100" x="240" y="500" />
        </svg>
        <span className="resource-hero-art__code">{artworkLabel}</span>
      </div>
      <div className="site-shell relative z-10">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[rgba(21,21,21,0.52)]">
          <Link className="transition hover:text-orange" href="/en">Home</Link>
          <span aria-hidden="true">/</span>
          <Link className="transition hover:text-orange" href="/en/resources">Resources</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="text-ink">{eyebrow}</span>
        </nav>

        <div className="mt-12 max-w-6xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="font-display mt-7 max-w-[17ch] break-words hyphens-auto text-[clamp(3rem,6.7vw,6.25rem)] leading-[0.92]" id="article-title">
            {title}
          </h1>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(19rem,0.58fr)] lg:items-start lg:gap-16">
          <div className="max-w-3xl text-[clamp(1.08rem,1.55vw,1.35rem)] leading-[1.65] text-muted">
            {intro}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink className="w-full sm:w-auto" href={primaryHref}>{primaryLabel}</ButtonLink>
              <ButtonLink className="w-full sm:w-auto" href={SEND_REQUEST_HREF} variant="secondary">Already received a customer request?</ButtonLink>
            </div>
          </div>
          <aside className="rounded-[1.2rem] border border-[rgba(254,112,1,0.24)] bg-[rgba(255,255,255,0.78)] p-6 shadow-[0_24px_70px_rgba(21,21,21,0.07)] backdrop-blur-sm sm:p-7">
            <FileCheck2 aria-hidden="true" className="h-8 w-8 text-orange" />
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-orange">Qualifier</p>
            <p className="font-display mt-4 text-[1.72rem] leading-tight text-ink">{qualifierTitle}</p>
            <p className="mt-5 text-sm leading-7 text-muted">{qualifier}</p>
          </aside>
        </div>
      </div>
    </header>
  );
}

const policyAssessmentItems = [
  "Relevant sites",
  "Production activities",
  "Energy use",
  "Fuels",
  "Waste",
  "Water",
  "Hazardous substances or chemicals, where relevant",
  "Emissions",
  "Environmental permits, where relevant",
  "Existing environmental objectives",
  "Existing work instructions",
  "Management systems",
  "Existing certificates",
  "Internal owners for environmental topics",
  "Already documented measures"
] as const;

const policyPurposeBlocks = [
  ["Orientation", "It defines the company’s fundamental environmental principles."],
  ["Responsibility", "It creates a formal frame for internal responsibilities."],
  ["Customer communication", "It can document the environmental principles the company officially stands behind."],
  ["Foundation for measures", "It can place objectives and operational processes in context, but it does not replace them."]
] as const;

const policyBuildingBlocks = [
  ["1 · Company and scope", "State which legal entity, sites and activities the policy covers. A group policy does not automatically cover every legal entity.", ["Which legal entity?", "Which sites?", "Which activities?", "Single company or group?", "Production, administration or both?"]],
  ["2 · Environmentally relevant activities", "The policy should fit what the company actually does. Manufacturing has different environmental aspects from a purely office-based business.", ["Energy", "Emissions", "Waste", "Materials", "Water", "Chemicals", "Avoiding environmental harm", "Resource efficiency"]],
  ["3 · Environmental principles", "Principles should be supportable and tied to environmental areas that are genuinely relevant for the company.", ["Responsible resource use", "Avoiding or reducing unnecessary environmental impacts", "Energy efficiency", "Waste prevention and recovery", "Responsible water use", "Safe handling of relevant substances", "Continuous improvement", "Compliance with actually applicable requirements"]],
  ["4 · Responsibilities", "Do not write as if the company were an abstract responsible person. Relevant environmental areas need real internal owners.", ["Management", "EHS or environmental management", "Facility", "Production", "Quality"]],
  ["5 · Objectives and measures", "Quantified targets belong in the policy only if they have actually been decided internally and the baseline, period and owner can be understood.", ["Principle: improve energy use systematically", "Target, if real: 15% reduction by 2028", "Defined baseline where relevant", "Internal owner", "Approval where appropriate"]],
  ["6 · Monitoring and improvement", "Describe how relevant information, objectives and measures are reviewed and how content is updated when activity or process changes make that necessary.", ["Monitoring relevant information", "Reviewing objectives and measures", "Updates after material changes", "Management review, where this is the company’s actual process"]],
  ["7 · Internal approval", "Only actual internal review and approval turn a draft into an official company policy.", ["Company", "Version", "Actual approval date", "Approving function", "Document owner", "Status", "Review information where used"]]
] as const;

const notInPolicyItems = [
  ["Invented measures", "Do not describe processes that do not exist in the company."],
  ["Backdated statements", "A policy approved today should not be presented as if it had applied years ago."],
  ["Unsupported targets", "Do not invent quantitative reduction targets to make the policy look more ambitious."],
  ["Unclear scope", "Do not leave open whether the policy applies to one site, one legal entity or the whole group."],
  ["Absolute environmental promises", "Claims such as no environmental impact are usually neither supportable nor useful."],
  ["Copy-paste wording with no company fit", "A generic template should not be adopted unchanged as the company’s policy."]
] as const;

const policyEvidenceItems = [
  "Energy invoices",
  "Waste documentation",
  "Environmental KPI reports",
  "Training records",
  "Internal procedures",
  "Certificates",
  "Permits",
  "Measurement records",
  "Management-review records",
  "Action plans",
  "Approved objectives"
] as const;

const policyStatusModel = [
  ["Draft", "The content is still being prepared or discussed internally."],
  ["Pending approval", "The content is prepared but has not yet been officially adopted."],
  ["Approved", "The responsible internal function has formally confirmed the policy."],
  ["Needs review", "Company structure, processes or content may have changed."],
  ["Superseded", "A newer version is now authoritative."]
] as const;

const policyVersionMetadata = [
  ["Document", "Environmental Policy"],
  ["Version", "1.0"],
  ["Issuing company", "Legal entity / sites"],
  ["Approval date", "Actual approval date"],
  ["Approved by", "Responsible function"],
  ["Document owner", "EHS / Management"],
  ["Status", "Approved"],
  ["Review", "According to internal process or after material changes"]
] as const;

const policyOutlineSections = [
  ["1. Purpose", "Why the policy exists."],
  ["2. Scope", "Which legal entities, sites or activities it applies to."],
  ["3. Environmental principles", "The relevant environmental principles the company formally sets."],
  ["4. Material environmental areas", "For example energy, emissions, waste, water or relevant substances, where genuinely relevant."],
  ["5. Responsibilities", "Which functions are responsible."],
  ["6. Objectives and measures", "Only real measures and objectives that have actually been decided internally."],
  ["7. Monitoring and improvement", "How relevant developments are reviewed and updated where needed."],
  ["8. Approval and document status", "Version, internal approval and current status."]
] as const;

const policyWorkflowSteps = [
  ["Read the exact question", "Check whether the customer asks for a policy document, a yes/no answer or a short description."],
  ["Check existing documents", "An environmental policy, HSE policy, integrated management policy or related approved document may already exist."],
  ["Check scope", "Confirm that the document covers the answering legal entity and relevant activity."],
  ["Check status", "Distinguish draft, approved, needs review and superseded versions."],
  ["Check evidence requirement", "Clarify whether a document must be uploaded or only information must be confirmed."],
  ["Prepare the answer", "Answer only from the company’s actual current status."]
] as const;

const policyReadinessSteps = [
  "Understand existing practice",
  "Identify relevant environmental areas",
  "Define scope",
  "Write principles",
  "Assign responsibilities",
  "Internal review",
  "Approval",
  "Document implementation separately"
] as const;

const policyMistakes = [
  ["Adopting a generic template unchanged", "The policy has no clear connection to the actual company."],
  ["Leaving scope open", "It is unclear which legal entity or sites the document covers."],
  ["Describing measures that do not exist", "The policy promises operational processes that have not been implemented."],
  ["Inventing targets", "Quantified targets are named even though they are not approved or measurably defined."],
  ["Treating a draft as approved", "Prepared wording is not yet an officially adopted policy."],
  ["Confusing policy with evidence", "The document alone does not prove that every statement has been implemented."],
  ["Ignoring version status", "An outdated or superseded version is reused in customer requests."]
] as const;

const policyPreApprovalItems = [
  "Is the legal entity clear?",
  "Is the site or organisational scope clear?",
  "Does the policy fit the actual business activity?",
  "Are only genuinely relevant environmental areas included?",
  "Are responsibilities realistic?",
  "Are any stated targets actually approved?",
  "Does the policy avoid claiming measures that do not exist?",
  "Is it clear that implementation is evidenced separately?",
  "Are version and approval status documented?",
  "Has the policy been reviewed internally by the responsible function?"
] as const;

const supplierAssessmentItems = [
  "Which supplier types exist?",
  "Which countries are relevant?",
  "Which materials or services are purchased?",
  "Are there critical or strategic suppliers?",
  "Is there an existing procurement manual?",
  "Are there existing contract terms?",
  "Are suppliers already evaluated?",
  "Are ESG criteria already used?",
  "Are quality or audit processes in place?",
  "Who owns supplier relationships?",
  "How are new suppliers approved?",
  "How are deviations handled today?"
] as const;

const supplierPurposeBlocks = [
  ["Expectations", "It makes basic supplier expectations visible."],
  ["Consistency", "It creates a common starting point for relevant supplier relationships."],
  ["Communication", "It helps procurement and other functions communicate ESG and compliance expectations in a structured way."],
  ["Foundation for processes", "It can support supplier assessments, contract processes or further review, but it does not replace them."]
] as const;

const supplierBuildingBlocks = [
  ["1 · Scope", "Make clear which suppliers, entities or business relationships the code is intended to cover.", ["All suppliers?", "Direct suppliers only?", "Selected supplier categories?", "Group companies?", "Service providers?", "Subcontractors?"]],
  ["2 · Human rights and working conditions", "Content should fit the intended scope and risk profile.", ["Child labour", "Forced labour", "Decent working conditions", "Discrimination", "Harassment", "Freedom of association where relevant", "Working hours", "Remuneration under applicable requirements", "Health and safety"]],
  ["3 · Environment", "Environmental expectations should be framed by supplier activity, category and actual relevance.", ["Resource use", "Energy", "Emissions", "Waste", "Water", "Relevant chemicals or substances", "Avoiding unnecessary environmental impacts", "Applicable environmental requirements", "Improving relevant environmental performance"]],
  ["4 · Business ethics and compliance", "The code can describe expectations on integrity and lawful conduct, without replacing legal compliance review.", ["Corruption", "Bribery", "Conflicts of interest", "Fair competition", "Confidential information", "Data or information security where relevant", "Reporting serious misconduct", "Actually applicable legal requirements"]],
  ["5 · Suppliers’ own supply chains", "Depending on procurement context, a code may set expectations for how relevant principles are considered upstream.", ["Pass on relevant expectations", "Consider material risks", "Provide information for legitimate follow-up questions", "Support evidence where needed"]],
  ["6 · Communication, evidence and cooperation", "Describe how suppliers provide information, support follow-up questions and engage when issues are identified.", ["Relevant information where required", "Support for legitimate follow-up questions", "Relevant evidence", "Communication of material changes", "Dialogue on identified issues", "Corrective actions where appropriate"]],
  ["7 · Approval, version and ownership", "Show who issues the code, which version applies and which internal function owns the content.", ["Issuing entity", "Version", "Actual approval date", "Scope", "Document owner", "Approving function", "Status", "Review information where used"]]
] as const;

const notInSupplierCodeItems = [
  ["Unrealistic guarantees", "Do not require broad guarantees that cannot be sensibly bounded or practically checked."],
  ["Rights that do not exist", "Do not claim audit, access or termination rights unless they have actually been agreed or internally confirmed."],
  ["Copy-paste obligations", "Requirements from external templates should not be copied without review."],
  ["Unclear scope", "The code should show which supplier relationships it applies to."],
  ["Requirements the company cannot operationalise", "Expectations should fit the actual supplier structure and procurement process."],
  ["Invented history", "A newly introduced code should not be presented as a long-standing supplier-management process."]
] as const;

const supplierAcknowledgmentStates = ["Received", "Acknowledged / read", "Accepted / confirmed", "Contractually incorporated", "Verified"] as const;

const supplierEvidenceItems = [
  "Supplier communications",
  "Acknowledgment records",
  "Onboarding documentation",
  "Supplier questionnaires",
  "Procurement procedures",
  "Supplier evaluations",
  "Corrective-action records",
  "Procurement training",
  "Risk assessments",
  "Contract references where they genuinely exist",
  "Audit records where audits were actually performed"
] as const;

const supplierStatusModel = [
  ["Draft", "Content is being prepared."],
  ["Pending approval", "Content is internally aligned but not officially adopted."],
  ["Approved", "The responsible function has formally confirmed the code."],
  ["In rollout", "The code is being integrated into relevant supplier processes or communications."],
  ["Needs review / superseded", "Content or version must be checked or replaced by a current version."]
] as const;

const supplierVersionMetadata = [
  ["Document", "Supplier Code of Conduct"],
  ["Version", "1.0"],
  ["Issuing entity", "Legal entity / group"],
  ["Scope", "Relevant suppliers"],
  ["Approval date", "Actual approval date"],
  ["Approved by", "Responsible function"],
  ["Document owner", "Procurement / Compliance / Management"],
  ["Status", "Approved"],
  ["Review", "According to internal process or after material changes"]
] as const;

const supplierOutlineSections = [
  ["1. Purpose", "Why the code exists."],
  ["2. Scope", "Which supplier relationships it is intended to cover."],
  ["3. Human rights & working conditions", "Relevant social expectations."],
  ["4. Health & safety", "Expectations for safe working conditions."],
  ["5. Environment", "Relevant environmental principles."],
  ["6. Business ethics", "Corruption, conflicts of interest and integrity."],
  ["7. Supplier-management expectations", "Information, cooperation and relevant evidence."],
  ["8. Handling deviations", "Dialogue, clarification and measures where appropriate."],
  ["9. Document status", "Version, approval and document owner."]
] as const;

const supplierDeviationSteps = ["Issue / deviation", "Clarify facts", "Assess risk", "Agree action", "Review progress", "Further decision"] as const;

const supplierWorkflowSteps = [
  ["Read the exact question", "Check whether the customer asks whether a code exists, is approved, has been communicated, has been acknowledged, is contractual or is actually used."],
  ["Check existing documents", "Look for a current supplier code or comparable approved rule."],
  ["Check scope", "Confirm that it covers the relevant legal entity and supplier relationships."],
  ["Check approval status", "Distinguish draft, approved, in rollout and superseded status."],
  ["Check actual rollout", "Confirm whether the code has actually been communicated to relevant suppliers or integrated into processes."],
  ["Answer only the current status", "Keep existence, approval, communication, acknowledgment and practical use separate."]
] as const;

const supplierComparison = [
  ["Supplier Code", "What expectations do we set?"],
  ["Supplier Questionnaire", "What information do we ask the supplier for?"],
  ["Supplier Evidence", "What documents support the response?"],
  ["Supplier Assessment", "How do we evaluate the information internally?"]
] as const;

const supplierLifecycleSteps = [
  "Understand supplier base",
  "Define relevant expectations",
  "Define scope",
  "Draft code",
  "Internal review",
  "Approval",
  "Communication",
  "Document use"
] as const;

const supplierMistakes = [
  ["Copying another template unchanged", "The code does not fit the actual supplier structure."],
  ["Unclear scope", "It is not clear which suppliers are covered."],
  ["Claiming rights that do not exist", "Audit, information or termination rights are asserted without being properly agreed."],
  ["Demanding unrealistic guarantees", "Suppliers are asked to guarantee facts they cannot fully control."],
  ["Equating a code with supplier compliance", "An acknowledged document does not prove actual supplier performance."],
  ["No internal owner", "No one owns updates, communication or practical use."],
  ["Backdating rollout", "A newly introduced code is described as a long-standing process."],
  ["Poor version control", "Different or outdated versions remain in use."]
] as const;

const supplierPreApprovalItems = [
  "Is the issuing entity clear?",
  "Is the supplier scope defined?",
  "Do the requirements fit actual procurement?",
  "Are human-rights and working-condition expectations realistic?",
  "Are environmental expectations relevant and proportionate?",
  "Are ethics and compliance expectations clear?",
  "Does the code avoid claiming rights that do not exist?",
  "Does it avoid unrealistic guarantees?",
  "Is deviation handling understandable?",
  "Is internal ownership clear?",
  "Are version and approval status documented?",
  "Is there a realistic plan for communication and use?"
] as const;

const reusableComponents = [
  ["Data point", "Electricity use, Site A", "Store the defined information, not just a number."],
  ["Value / statement", "428 MWh", "The value remains usable only if unit, scope and period travel with it."],
  ["Definition", "Purchased electricity for the production site during the reporting period.", "A definition prevents similar metrics from being confused later."],
  ["Reporting period", "2025-01-01 to 2025-12-31", "Time period is a critical check for KPIs, certificates and evidence."],
  ["Source / evidence", "12 electricity invoices + internal annual summary", "The original basis should remain findable."],
  ["Owner", "Facility Management / Finance", "An owner helps confirm freshness and subject-matter correctness."],
  ["Status", "Current / needs review / superseded", "Status prevents old information from being treated as reusable without review."]
] as const;

const reusableStatusExamples = ["confirmed", "needs review", "superseded", "data missing"] as const;

const reusableDataRecord = [
  ["Data point", "Electricity consumption"],
  ["Company", "Example Manufacturing Ltd."],
  ["Site", "Plant A"],
  ["Reporting period", "2025"],
  ["Value", "428 MWh"],
  ["Unit", "MWh"],
  ["Source", "Electricity invoices"],
  ["Evidence", "Annual summary + original invoices"],
  ["Owner", "Facility / Finance"],
  ["Confirmed by", "Responsible internal function"],
  ["Status", "current"],
  ["Last review", "Internal review point"]
] as const;

const reuseGroups = [
  ["Longer-term reusable information", ["Company master data", "Site information", "Policies while current", "Certificates and validity", "KPI definitions", "Internal responsibilities", "Documented calculation methods"]],
  ["Periodically updated information", ["Electricity use", "Fuels", "Scope 1 and 2", "Employee headcount", "Accident KPIs", "Water use", "Waste quantities", "Training KPIs"]],
  ["Request-specific information", ["Exact question wording", "Requested scope", "Requested reporting year", "Platform fields", "Customer-specific explanations", "Product-related information", "Specific evidence requirements"]]
] as const;

const foundationLayers = [
  ["1 · Master data", "Legal entities, sites, employee structure, business activity and organisational scope."],
  ["2 · KPIs / quantitative data", "Energy, emissions, environmental, workforce and other recurring quantitative data."],
  ["3 · Policies and processes", "Current internally approved policies, procedures and responsibilities."],
  ["4 · Evidence", "Invoices, certificates, reports, HR extracts, records and other traceable sources."],
  ["5 · Request mapping", "Which data points were used for which customer question, platform or reporting requirement?"]
] as const;

const ownerExamples = [
  ["Energy", "Facility / Finance"],
  ["Employees", "HR"],
  ["Waste", "EHS / Quality"],
  ["Supplier data", "Procurement"],
  ["Policies", "Subject function + Management"]
] as const;

const freshnessStatuses = ["Current", "New period required", "Needs review", "Superseded", "No longer valid", "Data missing"] as const;

const reuseWorkflowSteps = [
  ["Analyse the request", "What is actually being asked?"],
  ["Define the data point", "Which concrete company information is needed for the answer?"],
  ["Find the original source", "Where does the information come from?"],
  ["Assign evidence and owner", "What supports the answer and who can confirm it internally?"],
  ["Store it structurally", "Document value, definition, period, scope, source and status together."],
  ["Recheck for the next request", "What is still current, what needs updating and what must be collected for the first time?"]
] as const;

const copyPasteWarnings = [
  ["Wrong reporting period", "Data from an earlier reporting year is reused without checking the new request."],
  ["Wrong legal entity", "A group value is used for a single company even though the scope does not fit."],
  ["Wrong site", "Plant-level data is presented as a value for the whole company."],
  ["Outdated policy", "A superseded or invalid policy is reused."],
  ["Changed definition", "The new customer uses a different KPI definition or boundary."],
  ["New customer requirement", "A similar-looking question is treated as identical."]
] as const;

const reusableCoreFlow = [
  "Capture once",
  "Document the source",
  "Confirm internally",
  "Store structurally",
  "Reuse for new requests",
  "Update what changed"
] as const;

function QuickAnswer({ children }: { children: ReactNode }) {
  return (
    <section aria-labelledby="quick-answer-title" className="bg-ink py-16 text-white sm:py-20 lg:py-24" id="quick-answer">
      <div className="site-shell grid gap-9 lg:grid-cols-[0.52fr_1.48fr] lg:gap-16">
        <div>
          <p className="eyebrow">Quick Answer</p>
          <h2 className="font-display mt-6 text-[clamp(2.65rem,5vw,4.8rem)] leading-[0.98]" id="quick-answer-title">In short</h2>
        </div>
        <div className="max-w-4xl text-lg leading-8 text-white/72 sm:text-xl sm:leading-9">{children}</div>
      </div>
    </section>
  );
}

export function EnglishEnvironmentalPolicyGuide() {
  return (
    <main id="top">
      <article>
        <ResourceHero
          artworkLabel="SCOPE · OWNER · STATUS · EVIDENCE"
          eyebrow="ENVIRONMENTAL POLICY"
          primaryHref="#building-blocks"
          primaryLabel="See the policy structure ↓"
          qualifier="A newly created Environmental Policy is not retrospective evidence that the commitments or measures described in it were already implemented in the past."
          qualifierTitle="A new policy does not prove past implementation."
          title="How to create an Environmental Policy that reflects how your company actually operates"
          intro={<>
            <p>Customers and supplier assessments may ask whether your company has an Environmental Policy.</p>
            <p className="mt-6">A credible policy should reflect the actual business, have a clear scope, name real responsibilities and contain commitments the company can support. Drafting the policy is different from proving implementation.</p>
          </>}
        />
        <QuickAnswer>
          <p>An Environmental Policy sets out a company’s fundamental environmental principles, defines its scope, identifies responsibilities and creates a framework for relevant objectives and measures.</p>
          <p className="mt-6">It should be based on actual business activity, internally reviewed and approved by the responsible function. The policy documents a formal commitment; implementation should be supported by separate processes, KPIs and evidence.</p>
        </QuickAnswer>

        <section aria-labelledby="distinction-title" className="py-16 sm:py-20 lg:py-24">
          <div className="site-shell grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <SectionHeading eyebrow="Core distinction" id="distinction-title" title="A policy is not the same as implementation or evidence." />
            <div>
              <div className="rounded-[1.2rem] border border-orange/25 bg-[var(--soft-orange)] p-6 sm:p-8" data-policy-distinction>
                <FlowLine items={["Policy", "Implementation", "Evidence"]} columns="lg:grid-cols-3" />
                <dl className="mt-8 grid gap-px overflow-hidden rounded-[1rem] bg-[rgba(21,21,21,0.12)] sm:grid-cols-3">
                  {[
                    ["Policy", "What the company formally commits to."],
                    ["Implementation", "What the company actually does."],
                    ["Evidence", "What documents or records support that implementation."]
                  ].map(([term, description]) => (
                    <div className="bg-white p-4" key={term}><dt className="font-display text-2xl text-ink">{term}</dt><dd className="mt-2 text-sm font-semibold leading-6 text-muted">{description}</dd></div>
                  ))}
                </dl>
              </div>
              <p className="font-display mt-8 text-[clamp(2rem,4vw,3.4rem)] leading-tight text-ink">Policy ≠ implementation ≠ evidence</p>
            </div>
          </div>
        </section>

        <section aria-labelledby="assessment-title" className="border-y border-[rgba(21,21,21,0.09)] bg-white py-16 sm:py-20 lg:py-24">
          <div className="site-shell">
            <SectionHeading eyebrow="Before drafting" id="assessment-title" title="Start with reality. Then write the policy.">
              <p>Review what already exists in the company before writing policy language.</p>
            </SectionHeading>
            <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" data-pre-drafting-assessment>
              {policyAssessmentItems.map((item) => <li className="rounded-[0.9rem] border border-[rgba(21,21,21,0.11)] bg-[var(--warm)] p-4 text-sm font-bold leading-6 text-ink" key={item}>{item}</li>)}
            </ul>
          </div>
        </section>

        <section aria-labelledby="purpose-title" className="py-16 sm:py-20 lg:py-24">
          <div className="site-shell">
            <SectionHeading eyebrow="Purpose" id="purpose-title" title="What an Environmental Policy is for" />
            <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4" data-policy-purpose-blocks>
              {policyPurposeBlocks.map(([title, copy], index) => <article className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-6 shadow-lift" key={title}><span className="font-mono text-xs font-bold text-orange">{String(index + 1).padStart(2, "0")}</span><h3 className="font-display mt-4 text-3xl leading-tight text-ink">{title}</h3><p className="mt-4 text-sm leading-7 text-muted">{copy}</p></article>)}
            </div>
          </div>
        </section>

        <section aria-labelledby="blocks-title" className="bg-ink py-16 text-white sm:py-20 lg:py-24" id="building-blocks">
          <div className="site-shell">
            <SectionHeading eyebrow="Framework" id="blocks-title" light title="Seven building blocks of a credible Environmental Policy" />
            <div className="mt-12 grid gap-6" data-policy-building-blocks>
              {policyBuildingBlocks.map(([title, copy, items]) => <section className="rounded-[1.2rem] border border-white/14 bg-white/[0.04] p-6 sm:p-8" key={title}><div className="grid gap-8 lg:grid-cols-[0.46fr_0.54fr]"><div><h3 className="font-display text-[clamp(2rem,4vw,3.4rem)] leading-tight text-white">{title}</h3><p className="mt-5 text-base leading-8 text-white/66">{copy}</p></div><ul className="grid gap-2 sm:grid-cols-2">{items.map((item) => <li className="rounded-[0.8rem] border border-white/10 bg-white/[0.06] p-3 text-sm font-bold leading-6 text-white/78" key={item}>{item}</li>)}</ul></div></section>)}
            </div>
          </div>
        </section>

        <WarningGrid id="not-in-policy-title" eyebrow="Limits" title="What not to include in an Environmental Policy" items={notInPolicyItems} dataAttr="not-in-policy-items" />
        <ComparisonSection />
        <DocumentHierarchy />
        <EvidenceSection evidenceItems={policyEvidenceItems} />
        <StatusSection id="status-title" title="What status does your Environmental Policy have?" items={policyStatusModel} dataAttr="policy-status-model" />
        <MetadataSection id="version-title" title="A policy needs a clear version." note="Do not invent retrospective approval dates." items={policyVersionMetadata} dataAttr="version-control-example" />
        <TextSection eyebrow="Approval" id="draft-approved-title" title="Draft is not the same as approved.">
          <p className="font-display text-[clamp(2rem,4vw,3.4rem)] leading-tight text-ink">Draft ≠ approved policy</p>
          <p>Evipace can prepare a draft from actual company practices and documents. Only an authorised internal company process can turn that draft into an official Environmental Policy.</p>
        </TextSection>
        <OutlineSection title="Example structure for an Environmental Policy" qualifier="This is a structure guide, not a universal Environmental Policy template." items={policyOutlineSections} dataAttr="policy-outline" />
        <WorkflowSection title="What to do when a customer asks for an Environmental Policy" items={policyWorkflowSteps} dataAttr="customer-policy-workflow" buttonHref="/en/resources/esg-questionnaire-checklist" />
        <TextSection eyebrow="If it is missing" id="no-policy-title" title="What if your company does not have an Environmental Policy yet?">
          <p>Do not answer retroactively as if an approved policy already existed.</p>
          <p>Review actual environmental practices and responsibilities first. From that reality, an honest draft can be prepared, reviewed internally, corrected and adopted by an authorised function.</p>
          <p className="font-display text-[clamp(2rem,4vw,3.4rem)] leading-tight text-ink">A gap can be closed. It should not be hidden retroactively.</p>
        </TextSection>
        <TextSection eyebrow="ISO 14001" id="iso-title" title="Do companies with ISO 14001 need a separate Environmental Policy?">
          <p>If an environmental management system already exists, the company may already have an environmental policy or related approved documents.</p>
          <p>Inspect existing documentation before creating a duplicate. A certificate is not automatically the same as the policy, and certification does not guarantee that every customer request is satisfied.</p>
        </TextSection>
        <AssessmentContext title="Environmental Policies in supplier assessments" body="EcoVadis and IntegrityNext may ask for policy, evidence or supporting information. This is contextual only: no affiliation, scoring guarantee or automatic acceptance is implied." />
        <TextSection eyebrow="Reuse" id="reuse-title" title="An approved policy should not be rediscovered for every request.">
          <p>Store scope, version, approval status, approver, document owner and file location. Then recheck whether the current version fits the next customer request.</p>
          <InlineLink href="/en/resources/reusable-esg-data">Build a reusable ESG data foundation</InlineLink>
        </TextSection>
        <FlowSection id="readiness-title" eyebrow="Readiness flow" title="From actual practice to approved policy" items={policyReadinessSteps} dataAttr="policy-readiness-map" columns="lg:grid-cols-4" />
        <MistakesSection title="Seven common Environmental Policy mistakes" items={policyMistakes} dataAttr="common-policy-mistakes" dark />
        <ChecklistSection title="Check before internal approval" items={policyPreApprovalItems} dataAttr="pre-approval-checklist" />
        <ResourceBridge items={[
          ["What ESG data do customers ask for?", "/en/resources/esg-data-customers-request-from-suppliers"],
          ["Who owns ESG data internally?", "/en/resources/esg-data-owners"],
          ["Is the evidence usable?", "/en/resources/esg-evidence-readiness-check"],
          ["Reuse the policy later", "/en/resources/reusable-esg-data"],
          ["Prepare a Supplier Code", "/en/resources/supplier-code-of-conduct"]
        ]} dataAttr="resource-bridge" />
        <CommercialBridge title="Customer asking for an Environmental Policy, but you do not want to invent anything?" body="Evipace can review actual practices, responsibilities and documents with you, structure open points and prepare a policy draft for your internal review and approval." note="The draft becomes an official company policy only through your internal review, correction and authorised approval." />
        <MethodSection body="This page describes a practical approach to preparing an Environmental Policy for ESG customer requests. It is not legal, certification or audit advice and does not define universal policy content." />
        <FinalSection title="A good Environmental Policy starts with the actual company, not with text." body="When scope, responsibilities and existing practice are clear, the policy can be realistic, traceable and internally supportable." />
      </article>
    </main>
  );
}

function WarningGrid({ id, eyebrow, title, items, dataAttr }: { id: string; eyebrow: string; title: string; items: readonly (readonly [string, string])[]; dataAttr: string }) {
  return <section aria-labelledby={id} className="py-16 sm:py-20 lg:py-24"><div className="site-shell"><SectionHeading eyebrow={eyebrow} id={id} title={title} /><div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3" data-not-in-policy-items={dataAttr === "not-in-policy-items" ? true : undefined} data-not-in-supplier-code-items={dataAttr === "not-in-supplier-code-items" ? true : undefined} data-copy-paste-warnings={dataAttr === "copy-paste-warnings" ? true : undefined}>{items.map(([itemTitle, copy]) => <article className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-6" key={itemTitle}><h3 className="font-display text-2xl leading-tight text-ink">{itemTitle}</h3><p className="mt-3 text-sm leading-7 text-muted">{copy}</p></article>)}</div></div></section>;
}

function ComparisonSection() {
  return <section aria-labelledby="generic-title" className="border-y border-[rgba(21,21,21,0.09)] bg-white py-16 sm:py-20 lg:py-24"><div className="site-shell"><SectionHeading eyebrow="Wording" id="generic-title" title="A template is only a starting point." /><div className="mt-12 grid gap-6 lg:grid-cols-2" data-generic-specific-comparison><article className="rounded-[1.1rem] border border-[rgba(21,21,21,0.12)] bg-[var(--warm)] p-6 sm:p-8"><p className="text-xs font-bold uppercase tracking-[0.13em] text-orange">Generic</p><blockquote className="font-display mt-5 text-3xl leading-tight text-ink">We are committed to protecting the environment and reducing our environmental footprint.</blockquote><p className="mt-5 text-sm leading-7 text-muted">This sounds acceptable, but it says little about which environmental aspects are actually relevant.</p></article><article className="rounded-[1.1rem] border border-orange/25 bg-[var(--soft-orange)] p-6 sm:p-8"><p className="text-xs font-bold uppercase tracking-[0.13em] text-orange">More company-specific</p><blockquote className="font-display mt-5 text-3xl leading-tight text-ink">For our production sites, we consider energy use, waste, relevant operating materials and other material operational environmental aspects. Responsibilities and measures are managed by the responsible functions and reviewed where needed.</blockquote><p className="mt-5 text-sm font-bold leading-7 text-muted">Use wording like this only where it fits the actual company.</p></article></div></div></section>;
}

function DocumentHierarchy() {
  return <section aria-labelledby="hierarchy-title" className="py-16 sm:py-20 lg:py-24"><div className="site-shell grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20"><SectionHeading eyebrow="Document system" id="hierarchy-title" title="Which documents belong together?" /><div><div className="rounded-[1.2rem] border border-orange/25 bg-[var(--soft-orange)] p-6 sm:p-8" data-document-hierarchy><FlowLine items={["Environmental Policy", "Procedure / work instruction", "Records", "KPI / report"]} /><dl className="mt-8 grid gap-px overflow-hidden rounded-[1rem] bg-[rgba(21,21,21,0.12)] sm:grid-cols-2">{[["Environmental Policy", "Principles and framework."], ["Procedure / work instruction", "How a concrete process works."], ["Records", "What was actually done."], ["KPI / report", "What result follows from it."]].map(([term, description]) => <div className="bg-white p-4" key={term}><dt className="text-xs font-bold uppercase tracking-[0.1em] text-muted">{term}</dt><dd className="mt-2 font-semibold text-ink">{description}</dd></div>)}</dl></div><div className="mt-8 rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-6 shadow-lift"><p className="text-xs font-bold uppercase tracking-[0.13em] text-orange">Illustrative example: waste</p><dl className="mt-5 grid gap-4 sm:grid-cols-2">{[["Policy", "Waste should be handled responsibly."], ["Procedure", "Internal process for waste separation."], ["Evidence", "Disposal record."], ["KPI", "Waste quantity in the reporting year."]].map(([term, description]) => <div className="border-t border-[rgba(21,21,21,0.14)] pt-4" key={term}><dt className="font-bold text-ink">{term}</dt><dd className="mt-2 text-sm leading-6 text-muted">{description}</dd></div>)}</dl></div></div></div></section>;
}

function EvidenceSection({ evidenceItems }: { evidenceItems: readonly string[] }) {
  return <section aria-labelledby="evidence-title" className="border-y border-[rgba(21,21,21,0.09)] bg-white py-16 sm:py-20 lg:py-24"><div className="site-shell"><SectionHeading eyebrow="Evidence" id="evidence-title" title="What supporting evidence may be relevant?"><p>The document itself is only one part of the evidence picture.</p></SectionHeading><ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" data-supporting-evidence data-supplier-code-evidence>{evidenceItems.map((item) => <li className="rounded-[0.9rem] border border-[rgba(21,21,21,0.11)] bg-[var(--warm)] p-4 text-sm font-bold leading-6 text-ink" key={item}>{item}</li>)}</ul><div className="mt-8 flex flex-col gap-3 sm:items-start"><InlineLink href="/en/resources/esg-evidence-for-suppliers">Map ESG evidence correctly</InlineLink><InlineLink href="/en/resources/esg-evidence-readiness-check">Check evidence readiness</InlineLink></div></div></section>;
}

function StatusSection({ id, title, items, dataAttr }: { id: string; title: string; items: readonly (readonly [string, string])[]; dataAttr: string }) {
  return <section aria-labelledby={id} className="py-16 sm:py-20 lg:py-24"><div className="site-shell"><SectionHeading eyebrow="Status" id={id} title={title} /><div className="mt-12 grid gap-4 md:grid-cols-5" data-policy-status-model={dataAttr === "policy-status-model" ? true : undefined} data-supplier-code-status-model={dataAttr === "supplier-code-status-model" ? true : undefined}>{items.map(([itemTitle, copy]) => <article className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-5" key={itemTitle}><h3 className="font-display text-2xl leading-tight text-ink">{itemTitle}</h3><p className="mt-3 text-sm leading-6 text-muted">{copy}</p></article>)}</div></div></section>;
}

function MetadataSection({ id, title, note, items, dataAttr }: { id: string; title: string; note: string; items: readonly (readonly [string, string])[]; dataAttr: string }) {
  return <section aria-labelledby={id} className="border-y border-[rgba(21,21,21,0.09)] bg-white py-16 sm:py-20 lg:py-24"><div className="site-shell grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20"><SectionHeading eyebrow="Version" id={id} title={title}><p>{note}</p></SectionHeading><div className="rounded-[1.2rem] border border-orange/25 bg-[var(--soft-orange)] p-5 sm:p-7" data-version-control-example={dataAttr === "version-control-example" ? true : undefined} data-supplier-code-version-control={dataAttr === "supplier-code-version-control" ? true : undefined}><p className="text-xs font-bold uppercase tracking-[0.13em] text-orange">Illustrative example metadata</p><dl className="mt-5 grid gap-px overflow-hidden rounded-[1rem] bg-[rgba(21,21,21,0.12)] sm:grid-cols-2">{items.map(([term, description]) => <div className="bg-white p-4" key={term}><dt className="text-xs font-bold uppercase tracking-[0.1em] text-muted">{term}</dt><dd className="mt-2 break-words font-semibold text-ink">{description}</dd></div>)}</dl></div></div></section>;
}

function OutlineSection({ title, qualifier, items, dataAttr }: { title: string; qualifier: string; items: readonly (readonly [string, string])[]; dataAttr: string }) {
  return <section aria-labelledby="outline-title" className="py-16 sm:py-20 lg:py-24"><div className="site-shell"><SectionHeading eyebrow="Outline" id="outline-title" title={title}><p>{qualifier}</p></SectionHeading><ol className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3" data-policy-outline={dataAttr === "policy-outline" ? true : undefined} data-supplier-code-outline={dataAttr === "supplier-code-outline" ? true : undefined}>{items.map(([itemTitle, copy]) => <li className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-6" key={itemTitle}><h3 className="font-display text-2xl leading-tight text-ink">{itemTitle}</h3><p className="mt-3 text-sm leading-7 text-muted">{copy}</p></li>)}</ol></div></section>;
}

function WorkflowSection({ title, items, dataAttr, buttonHref }: { title: string; items: readonly (readonly [string, string])[]; dataAttr: string; buttonHref: string }) {
  return <section aria-labelledby="workflow-title" className="bg-ink py-16 text-white sm:py-20 lg:py-24"><div className="site-shell"><SectionHeading eyebrow="Customer request" id="workflow-title" light title={title} /><ol className="mt-12 grid gap-px overflow-hidden rounded-[1.1rem] bg-white/14" data-customer-policy-workflow={dataAttr === "customer-policy-workflow" ? true : undefined} data-supplier-code-customer-workflow={dataAttr === "supplier-code-customer-workflow" ? true : undefined}>{items.map(([itemTitle, copy], index) => <li className="grid gap-4 bg-ink p-5 sm:grid-cols-[4rem_1fr] sm:p-6" key={itemTitle}><span className="font-mono text-xs font-bold text-orange">{String(index + 1).padStart(2, "0")}</span><div><h3 className="font-display text-2xl leading-tight text-white">{itemTitle}</h3><p className="mt-2 text-sm leading-6 text-white/62">{copy}</p></div></li>)}</ol><div className="mt-8"><ButtonLink href={buttonHref}>Use the ESG questionnaire checklist</ButtonLink></div></div></section>;
}

function TextSection({ eyebrow, id, title, children }: { eyebrow: string; id: string; title: string; children: ReactNode }) {
  return <section aria-labelledby={id} className="py-16 sm:py-20 lg:py-24"><div className="site-shell grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20"><SectionHeading eyebrow={eyebrow} id={id} title={title} /><div className="resource-prose">{children}</div></div></section>;
}

function AssessmentContext({ title, body }: { title: string; body: string }) {
  return <section aria-labelledby="assessments-title" className="border-y border-[rgba(21,21,21,0.09)] bg-white py-16 sm:py-20 lg:py-24"><div className="site-shell"><SectionHeading eyebrow="Assessment context" id="assessments-title" title={title}><p>{body}</p></SectionHeading><div className="mt-12 grid gap-5 lg:grid-cols-2">{[["EcoVadis", "/en/resources/ecovadis-documents-evidence"], ["IntegrityNext", "/en/resources/integritynext-invitation-for-suppliers"]].map(([title, href]) => <article className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-6" key={title}><h3 className="font-display text-3xl leading-tight text-ink">{title}</h3><p className="mt-4 text-sm leading-7 text-muted">Context for supplier assessments. No affiliation, automatic acceptance or scoring claim.</p><div className="mt-5"><InlineLink href={href}>Read related resource</InlineLink></div></article>)}</div></div></section>;
}

function FlowSection({ id, eyebrow, title, items, dataAttr, columns }: { id: string; eyebrow: string; title: string; items: readonly string[]; dataAttr: string; columns: string }) {
  return <section aria-labelledby={id} className="py-16 sm:py-20 lg:py-24"><div className="site-shell"><SectionHeading eyebrow={eyebrow} id={id} title={title} /><div className="mt-12 rounded-[1.2rem] border border-orange/25 bg-[var(--soft-orange)] p-6 sm:p-8" data-policy-readiness-map={dataAttr === "policy-readiness-map" ? true : undefined} data-supplier-code-lifecycle={dataAttr === "supplier-code-lifecycle" ? true : undefined}><FlowLine items={items} columns={columns} /></div></div></section>;
}

function MistakesSection({ title, items, dataAttr, dark = false }: { title: string; items: readonly (readonly [string, string])[]; dataAttr: string; dark?: boolean }) {
  return <section aria-labelledby="mistakes-title" className={`${dark ? "bg-ink text-white" : ""} py-16 sm:py-20 lg:py-24`}><div className="site-shell"><SectionHeading eyebrow="Common mistakes" id="mistakes-title" light={dark} title={title} /><div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4" data-common-policy-mistakes={dataAttr === "common-policy-mistakes" ? true : undefined} data-common-supplier-code-mistakes={dataAttr === "common-supplier-code-mistakes" ? true : undefined}>{items.map(([itemTitle, copy], index) => <article className={`rounded-[1rem] border p-6 ${dark ? "border-white/14 bg-white/[0.04]" : "border-[rgba(21,21,21,0.11)] bg-white"}`} key={itemTitle}><p className="font-mono text-xs font-bold text-orange">{String(index + 1).padStart(2, "0")}</p><h3 className={`font-display mt-4 text-2xl leading-tight ${dark ? "text-white" : "text-ink"}`}>{itemTitle}</h3><p className={`mt-3 text-sm leading-7 ${dark ? "text-white/62" : "text-muted"}`}>{copy}</p></article>)}</div></div></section>;
}

function ChecklistSection({ title, items, dataAttr }: { title: string; items: readonly string[]; dataAttr: string }) {
  return <section aria-labelledby="approval-title" className="border-y border-[rgba(21,21,21,0.09)] bg-white py-16 sm:py-20 lg:py-24"><div className="site-shell"><SectionHeading eyebrow="Pre-approval" id="approval-title" title={title} /><ul className="mt-12 grid gap-3 md:grid-cols-2" data-pre-approval-checklist={dataAttr === "pre-approval-checklist" ? true : undefined} data-supplier-code-pre-approval-checklist={dataAttr === "supplier-code-pre-approval-checklist" ? true : undefined}>{items.map((item) => <li className="flex gap-3 rounded-[0.9rem] border border-[rgba(21,21,21,0.11)] bg-white p-4 text-sm font-bold leading-6 text-ink" key={item}><span aria-hidden="true" className="text-orange">☐</span><span>{item}</span></li>)}</ul></div></section>;
}

function ResourceBridge({ items, dataAttr }: { items: readonly (readonly [string, string])[]; dataAttr: string }) {
  return <section aria-labelledby="resource-bridge-title" className="py-16 sm:py-20 lg:py-24"><div className="site-shell"><SectionHeading eyebrow="Resource bridge" id="resource-bridge-title" title="Place this document in the wider ESG system" /><div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-5" data-resource-bridge={dataAttr === "resource-bridge" ? true : undefined} data-supplier-code-resource-bridge={dataAttr === "supplier-code-resource-bridge" ? true : undefined} data-resource-system-map={dataAttr === "resource-system-map" ? true : undefined}>{items.map(([title, href]) => <article className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-[var(--warm)] p-6" key={title}><h3 className="font-display text-2xl leading-tight text-ink">{title}</h3><div className="mt-5"><InlineLink href={href}>Open resource</InlineLink></div></article>)}</div></div></section>;
}

function CommercialBridge({ title, body, note }: { title: string; body: string; note: string }) {
  return <section aria-labelledby="commercial-title" className="bg-[var(--warm)] py-16 sm:py-20 lg:py-24"><div className="site-shell"><div className="overflow-hidden rounded-[1.4rem] border border-orange/25 bg-[var(--soft-orange)]"><div className="grid lg:grid-cols-[0.78fr_1.22fr]"><div className="p-7 sm:p-10 lg:p-12"><Send aria-hidden="true" className="h-10 w-10 text-orange" /><SectionHeading eyebrow="Implementation" id="commercial-title" title={title} /></div><div className="border-t border-orange/20 bg-white/65 p-7 sm:p-10 lg:border-l lg:border-t-0 lg:p-12"><p className="text-base leading-8 text-muted">{body}</p><div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"><ButtonLink className="w-full sm:w-auto" href={SEND_REQUEST_HREF}>Send your ESG request</ButtonLink><ButtonLink className="w-full sm:w-auto" href="/en/esg-customer-requests" variant="secondary">Customer ESG request support</ButtonLink></div><p className="mt-5 text-sm font-semibold leading-7 text-muted">{note}</p></div></div></div></div></section>;
}

function MethodSection({ body }: { body: string }) {
  return <section aria-labelledby="method-title" className="py-16 sm:py-20 lg:py-24"><div className="site-shell grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20"><div><ShieldCheck aria-hidden="true" className="h-10 w-10 text-orange" /><SectionHeading eyebrow="Methodology" id="method-title" title="Methodological note" /></div><div className="resource-prose"><p>{body}</p><div className="mt-7"><InlineLink href="/en/methodology">How Evipace works with ESG data and evidence</InlineLink></div></div></div></section>;
}

function FinalSection({ title, body }: { title: string; body: string }) {
  return <section aria-labelledby="final-title" className="bg-ink py-16 text-white sm:py-20 lg:py-24"><div className="site-shell"><div className="max-w-4xl"><RefreshCw aria-hidden="true" className="h-10 w-10 text-orange" /><h2 className="font-display mt-6 text-[clamp(2.75rem,6vw,5.8rem)] leading-[0.95]" id="final-title">{title}</h2><p className="mt-7 max-w-3xl text-lg leading-8 text-white/68">{body}</p><div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"><ButtonLink href={SEND_REQUEST_HREF}>Send your ESG request</ButtonLink><ButtonLink href="/en/esg-customer-requests" variant="light">Customer ESG request support</ButtonLink></div></div></div></section>;
}

export function EnglishSupplierCodeOfConductGuide() {
  return (
    <main id="top"><article>
      <ResourceHero artworkLabel="SCOPE · ACKNOWLEDGMENT · STATUS · EVIDENCE" eyebrow="SUPPLIER CODE OF CONDUCT" primaryHref="#building-blocks" primaryLabel="See the code structure ↓" qualifierTitle="Acknowledgment is not supplier compliance." qualifier="A published or acknowledged Supplier Code of Conduct does not automatically prove that every supplier meets every requirement in it." title="How to create a Supplier Code of Conduct that works in practice" intro={<><p>Customers and supplier assessments may ask whether your company defines ESG and compliance expectations for suppliers.</p><p className="mt-6">A Supplier Code can document expectations on human rights, working conditions, environment, ethics and responsible procurement. It must fit the actual supplier base and procurement process, and it should not promise rights or processes the company does not have.</p></>} />
      <QuickAnswer><p>A Supplier Code of Conduct describes the expectations a company sets for suppliers. A credible code defines scope, uses realistic requirements, is internally approved, and is connected to communication, acknowledgment where used and practical supplier-management processes.</p></QuickAnswer>
      <section aria-labelledby="distinction-title" className="py-16 sm:py-20 lg:py-24"><div className="site-shell grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20"><SectionHeading eyebrow="Core distinctions" id="distinction-title" title="A Supplier Code is an expectation, not proof of supplier performance." /><div><div className="rounded-[1.2rem] border border-orange/25 bg-[var(--soft-orange)] p-6 sm:p-8" data-code-compliance-distinction><FlowLine items={["Code", "Implementation", "Supplier compliance"]} columns="lg:grid-cols-3" /><p className="font-display mt-8 text-3xl leading-tight text-ink">Published ≠ communicated ≠ acknowledged ≠ contractually incorporated</p></div><p className="font-display mt-8 text-[clamp(2rem,4vw,3.4rem)] leading-tight text-ink">Code ≠ implementation ≠ supplier compliance</p></div></div></section>
      <section aria-labelledby="assessment-title" className="border-y border-[rgba(21,21,21,0.09)] bg-white py-16 sm:py-20 lg:py-24"><div className="site-shell"><SectionHeading eyebrow="Before drafting" id="assessment-title" title="Understand procurement first. Then define supplier expectations." /><ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" data-procurement-assessment>{supplierAssessmentItems.map((item) => <li className="rounded-[0.9rem] border border-[rgba(21,21,21,0.11)] bg-[var(--warm)] p-4 text-sm font-bold leading-6 text-ink" key={item}>{item}</li>)}</ul></div></section>
      <section aria-labelledby="purpose-title" className="py-16 sm:py-20 lg:py-24"><div className="site-shell"><SectionHeading eyebrow="Purpose" id="purpose-title" title="What a Supplier Code of Conduct is for" /><div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4" data-supplier-code-purpose-blocks>{supplierPurposeBlocks.map(([title, copy], index) => <article className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-6 shadow-lift" key={title}><span className="font-mono text-xs font-bold text-orange">{String(index + 1).padStart(2, "0")}</span><h3 className="font-display mt-4 text-3xl leading-tight text-ink">{title}</h3><p className="mt-4 text-sm leading-7 text-muted">{copy}</p></article>)}</div></div></section>
      <section aria-labelledby="blocks-title" className="bg-ink py-16 text-white sm:py-20 lg:py-24" id="building-blocks"><div className="site-shell"><SectionHeading eyebrow="Framework" id="blocks-title" light title="Seven building blocks of a credible Supplier Code of Conduct" /><div className="mt-12 grid gap-6" data-supplier-code-building-blocks>{supplierBuildingBlocks.map(([title, copy, items]) => <section className="rounded-[1.2rem] border border-white/14 bg-white/[0.04] p-6 sm:p-8" key={title}><div className="grid gap-8 lg:grid-cols-[0.46fr_0.54fr]"><div><h3 className="font-display text-[clamp(2rem,4vw,3.4rem)] leading-tight text-white">{title}</h3><p className="mt-5 text-base leading-8 text-white/66">{copy}</p>{title.startsWith("3") ? <div className="mt-5"><Link className="group inline-flex min-h-11 items-center gap-2 text-sm font-bold text-white underline decoration-orange/55 underline-offset-4 transition hover:text-orange" href="/en/resources/environmental-policy"><span>Prepare the Environmental Policy separately</span><ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 text-orange transition-transform group-hover:translate-x-1" /></Link></div> : null}</div><ul className="grid gap-2 sm:grid-cols-2">{items.map((item) => <li className="rounded-[0.8rem] border border-white/10 bg-white/[0.06] p-3 text-sm font-bold leading-6 text-white/78" key={item}>{item}</li>)}</ul></div></section>)}</div></div></section>
      <WarningGrid id="not-in-code-title" eyebrow="Limits" title="What not to include in a Supplier Code of Conduct" items={notInSupplierCodeItems} dataAttr="not-in-supplier-code-items" />
      <TextSection eyebrow="Contract status" id="contract-title" title="Is a Supplier Code automatically part of the contract?"><p className="font-display text-3xl leading-tight text-ink">Not automatically.</p><p>Whether and how a Supplier Code is contractually incorporated depends on the actual contract and procurement process. This guide does not draw enforceability conclusions.</p><div className="rounded-[1.2rem] border border-orange/25 bg-[var(--soft-orange)] p-6 sm:p-8" data-contract-status-distinction><FlowLine items={["Published", "Communicated", "Acknowledged", "Contractually incorporated"]} /></div></TextSection>
      <section aria-labelledby="acknowledgment-title" className="py-16 sm:py-20 lg:py-24"><div className="site-shell"><SectionHeading eyebrow="Acknowledgment" id="acknowledgment-title" title="What does supplier acknowledgment mean?"><p>Acknowledgment may document receipt or confirmation. It does not automatically prove implementation or compliance.</p></SectionHeading><div className="mt-12 grid gap-3 md:grid-cols-5" data-supplier-acknowledgment>{supplierAcknowledgmentStates.map((state, index) => <div className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-5" key={state}><span className="font-mono text-xs font-bold text-orange">{String(index + 1).padStart(2, "0")}</span><p className="font-display mt-3 text-2xl leading-tight text-ink">{state}</p></div>)}</div></div></section>
      <EvidenceSection evidenceItems={supplierEvidenceItems} />
      <StatusSection id="status-title" title="What status does your Supplier Code have?" items={supplierStatusModel} dataAttr="supplier-code-status-model" />
      <MetadataSection id="version-title" title="A Supplier Code also needs version control." note="Do not invent backdated approval or rollout dates." items={supplierVersionMetadata} dataAttr="supplier-code-version-control" />
      <TextSection eyebrow="Approval" id="supplier-draft-approved-title" title="Draft is not the same as approved."><p className="font-display text-[clamp(2rem,4vw,3.4rem)] leading-tight text-ink">Draft ≠ approved Supplier Code</p><p>Evipace can prepare a draft, but the code becomes an official company document only through client review, corrections and authorised internal approval.</p></TextSection>
      <OutlineSection title="Example structure for a Supplier Code of Conduct" qualifier="This is a structure guide, not a universal contract or compliance template." items={supplierOutlineSections} dataAttr="supplier-code-outline" />
      <section aria-labelledby="deviation-title" className="bg-ink py-16 text-white sm:py-20 lg:py-24"><div className="site-shell"><SectionHeading eyebrow="Deviations" id="deviation-title" light title="What happens if a supplier does not meet a requirement?"><p>Do not default every deviation to immediate termination. Clarification, risk assessment and corrective action may be appropriate depending on the facts and actual agreements.</p></SectionHeading><div className="mt-12 rounded-[1.2rem] border border-white/14 bg-white/[0.04] p-6 sm:p-8" data-deviation-workflow><FlowLine dark items={supplierDeviationSteps} columns="lg:grid-cols-6" /></div><p className="mt-7 max-w-3xl text-sm font-bold leading-7 text-white/62">Specific legal or contractual response is outside this guide.</p></div></section>
      <TextSection eyebrow="Risk-based" id="risk-title" title="Does every supplier need the same treatment?"><p>A local office-supply vendor, a critical production supplier and a sensitive raw-material supplier may need different levels of information or review.</p><p>This is practical operating guidance, not a universal legal requirement.</p></TextSection>
      <WorkflowSection title="What to do when your customer asks for a Supplier Code of Conduct" items={supplierWorkflowSteps} dataAttr="supplier-code-customer-workflow" buttonHref="/en/resources/esg-questionnaire-checklist" />
      <TextSection eyebrow="If it is missing" id="no-code-title" title="What if your company does not have a Supplier Code yet?"><p>Do not answer retroactively as if a formal code already existed.</p><p>Review existing procurement requirements, identify actual expectations, draft realistically, review internally, approve and integrate the code into actual supplier processes.</p><p className="font-display text-[clamp(2rem,4vw,3.4rem)] leading-tight text-ink">A missing policy can be built. A past that did not exist should not be invented.</p></TextSection>
      <section aria-labelledby="comparison-title" className="border-y border-[rgba(21,21,21,0.09)] bg-white py-16 sm:py-20 lg:py-24"><div className="site-shell"><SectionHeading eyebrow="Distinction" id="comparison-title" title="Supplier Code and Supplier Questionnaire have different jobs." /><div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4" data-code-questionnaire-comparison>{supplierComparison.map(([title, copy]) => <article className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-[var(--warm)] p-6" key={title}><h3 className="font-display text-2xl leading-tight text-ink">{title}</h3><p className="mt-4 text-sm leading-7 text-muted">{copy}</p></article>)}</div><p className="mt-8 max-w-3xl text-sm font-bold leading-7 text-muted">A Supplier Code does not automatically replace a questionnaire or assessment.</p></div></section>
      <TextSection eyebrow="Avoid copy-paste" id="customer-own-title" title="A customer requirement and your own Supplier Code are not the same thing."><p>A customer may require your company to address supplier ESG expectations. That does not mean you should copy the customer’s Supplier Code word for word.</p><p>Your own code should fit your supplier structure, procurement process and expectations you can genuinely support and manage.</p></TextSection>
      <AssessmentContext title="Supplier Code of Conduct in ESG assessments" body="A Supplier Code can be relevant in assessments, but it should not be equated with full implementation or comprehensive supply-chain verification." />
      <TextSection eyebrow="Reuse" id="reuse-title" title="An approved Supplier Code should be findable for the next ESG request."><p>Store the current version, scope, owner and communication status in a reusable ESG information foundation.</p><InlineLink href="/en/resources/reusable-esg-data">Build a reusable ESG data foundation</InlineLink></TextSection>
      <FlowSection id="lifecycle-title" eyebrow="Lifecycle" title="From actual expectations to an applied Supplier Code" items={supplierLifecycleSteps} dataAttr="supplier-code-lifecycle" columns="lg:grid-cols-4" />
      <MistakesSection title="Eight common Supplier Code of Conduct mistakes" items={supplierMistakes} dataAttr="common-supplier-code-mistakes" />
      <ChecklistSection title="Check before internal approval" items={supplierPreApprovalItems} dataAttr="supplier-code-pre-approval-checklist" />
      <ResourceBridge items={[["What ESG data do customers ask for?", "/en/resources/esg-data-customers-request-from-suppliers"], ["Who owns ESG data internally?", "/en/resources/esg-data-owners"], ["Check evidence readiness", "/en/resources/esg-evidence-readiness-check"], ["Reuse the document later", "/en/resources/reusable-esg-data"], ["Prepare an Environmental Policy", "/en/resources/environmental-policy"]]} dataAttr="supplier-code-resource-bridge" />
      <CommercialBridge title="Customer asking for a Supplier Code, but your process is not cleanly documented yet?" body="Evipace can help understand the actual supplier and procurement context, structure relevant ESG and compliance topics and prepare a Supplier Code draft." note="The document becomes official only through your review, corrections and authorised internal approval." />
      <MethodSection body="This guide describes a practical approach to preparing a Supplier Code of Conduct for ESG customer requests and supplier management. It is not legal, contract, audit or certification advice." />
      <FinalSection title="A good Supplier Code starts with the actual supplier base, not with a template." body="When supplier structure, expectations, responsibilities and processes are clear, the code can be realistic, traceable and usable." />
    </article></main>
  );
}

export function EnglishReusableEsgDataGuide() {
  return (
    <main id="top"><article>
      <ResourceHero artworkLabel="DATA POINT · SOURCE · STATUS · REUSE" eyebrow="REUSABLE ESG DATA FOUNDATION" primaryHref="#structure" primaryLabel="See the data structure ↓" qualifierTitle="Reuse information. Recheck context." qualifier="Reuse the underlying information. Do not blindly reuse the answer. Scope, period, definition and evidence requirement still need review for every new request." title="Collect ESG data once. Reuse it for the next request." intro={<><p>The same ESG information is often requested by customers, questionnaires, platforms, reporting processes and supplier assessments.</p><p className="mt-6">Many companies still search old emails, reopen spreadsheets, ask the same internal people again and look for the same evidence every time. The first step is not necessarily new software; it is a structured reusable information foundation.</p></>} />
      <QuickAnswer><p>A reusable ESG data foundation connects recurring data points, internal owners, original sources, evidence, definitions, reporting periods and status.</p><p className="mt-6">For a new customer request, the company can check what already fits, what needs updating and what is genuinely missing instead of rebuilding every answer from scratch.</p></QuickAnswer>
      <section aria-labelledby="core-flow-title" className="py-16 sm:py-20 lg:py-24">
        <div className="site-shell">
          <SectionHeading eyebrow="Core flow" id="core-flow-title" title="Reuse the underlying information. Recheck the context.">
            <p>Reusable ESG work starts by preserving the source and status of the information, then checking what changed before the next external answer is prepared.</p>
          </SectionHeading>
          <div className="mt-12 rounded-[1.2rem] border border-orange/25 bg-[var(--soft-orange)] p-6 sm:p-8" data-reuse-core-flow>
            <FlowLine items={reusableCoreFlow} columns="lg:grid-cols-6" />
          </div>
        </div>
      </section>
      <TextSection eyebrow="Starting point" id="problem-title" title="Why does ESG start from zero so often?"><p>ESG information is usually spread across Finance, HR, Facility, Quality, EHS, Procurement and Management.</p><p>When every request is treated as a one-off project, the company ends up with separate spreadsheets, emails and folders. The next questionnaire sends people back to the same sources again.</p><p className="font-display text-[clamp(2rem,4vw,3.4rem)] leading-tight text-ink">The problem is often not missing information. The problem is missing structure.</p></TextSection>
      <section aria-labelledby="before-after-title" className="border-y border-[rgba(21,21,21,0.09)] bg-white py-16 sm:py-20 lg:py-24"><div className="site-shell"><SectionHeading eyebrow="Before / after" id="before-after-title" title="What changes with a reusable structure" /><div className="mt-12 grid gap-6 lg:grid-cols-2" data-before-after><article className="rounded-[1.2rem] border border-[rgba(21,21,21,0.12)] bg-[var(--warm)] p-6 sm:p-8"><h3 className="font-display text-3xl leading-tight text-ink">Without structure</h3><FlowLine items={["Customer A", "new spreadsheet", "ask Finance", "ask HR", "find invoices", "find evidence"]} columns="lg:grid-cols-3" /><p className="mt-7 font-display text-2xl leading-tight text-ink">Customer B → start again</p></article><article className="rounded-[1.2rem] border border-orange/25 bg-[var(--soft-orange)] p-6 sm:p-8"><h3 className="font-display text-3xl leading-tight text-ink">With structured data</h3><p className="mt-6 rounded-[1rem] bg-white p-5 font-display text-2xl leading-tight text-ink">Data point + source + evidence + owner + period + status</p><BulletList items={["Customer questionnaires", "EcoVadis", "IntegrityNext", "VSME", "Internal ESG reporting"]} /></article></div><p className="mt-8 max-w-4xl text-base leading-8 text-muted">The foundation reduces search work. The specific customer requirement still needs to be checked.</p></div></section>
      <section aria-labelledby="structure-title" className="py-16 sm:py-20 lg:py-24" id="structure"><div className="site-shell"><SectionHeading eyebrow="Reusable ESG data" id="structure-title" title="What should be stored for reuse?"><p>A useful ESG data foundation stores context, not just a value.</p></SectionHeading><div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3" data-reusable-components>{reusableComponents.map(([title, example, copy], index) => <article className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-6 shadow-lift" key={title}><p className="font-mono text-xs font-bold text-orange">{String(index + 1).padStart(2, "0")}</p><h3 className="font-display mt-4 text-3xl leading-tight text-ink">{title}</h3><p className="mt-4 rounded-[0.8rem] bg-[var(--warm)] p-4 text-sm font-bold leading-6 text-ink">{example}</p><p className="mt-4 text-sm leading-7 text-muted">{copy}</p></article>)}</div><div className="mt-8 flex flex-wrap gap-2">{reusableStatusExamples.map((status) => <span className="rounded-full border border-orange/25 bg-[var(--soft-orange)] px-3 py-2 text-xs font-bold uppercase tracking-[0.09em] text-[#b94f00]" key={status}>{status}</span>)}</div></div></section>
      <MetadataSection id="record-title" title="The smallest useful ESG data record" note="Illustrative example. This is not real customer data and not a statement about a real company." items={reusableDataRecord} dataAttr="version-control-example" />
      <section aria-labelledby="reuse-title" className="py-16 sm:py-20 lg:py-24"><div className="site-shell"><SectionHeading eyebrow="Reuse logic" id="reuse-title" title="Do not copy every answer. Reuse many data points." /><div className="mt-12 grid gap-5 lg:grid-cols-3" data-reuse-groups>{reuseGroups.map(([title, items]) => <section className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-white p-6" key={title}><h3 className="font-display text-3xl leading-tight text-ink">{title}</h3><BulletList items={items} /></section>)}</div><p className="font-display mt-10 max-w-4xl text-[clamp(1.8rem,3vw,2.7rem)] leading-tight text-ink">The aim is not a universal master answer, but a reliable information base for preparing the right answer.</p></div></section>
      <section aria-labelledby="layers-title" className="bg-ink py-16 text-white sm:py-20 lg:py-24"><div className="site-shell"><SectionHeading eyebrow="Framework" id="layers-title" light title="Five layers of a reusable ESG foundation" /><ol className="mt-12 grid gap-5 lg:grid-cols-5" data-foundation-layers>{foundationLayers.map(([title, copy]) => <li className="rounded-[1rem] border border-white/16 bg-white/[0.04] p-6" key={title}><h3 className="font-display text-2xl leading-tight text-white">{title}</h3><p className="mt-4 text-sm leading-7 text-white/62">{copy}</p></li>)}</ol></div></section>
      <TextSection eyebrow="Traceability" id="evidence-chain-title" title="Reuse works only when the source remains traceable."><div className="rounded-[1.2rem] border border-orange/25 bg-[var(--soft-orange)] p-6 sm:p-8" data-evidence-chain><FlowLine items={["Customer question", "Answer", "Data point", "Evidence", "Original source"]} columns="lg:grid-cols-5" /></div><p>Storing only the final answer loses much of the later value. Store the data point and source so the next request can be checked against scope, period and evidence requirement.</p><InlineLink href="/en/resources/esg-evidence-for-suppliers">Read about ESG evidence</InlineLink></TextSection>
      <section aria-labelledby="examples-title" className="border-y border-[rgba(21,21,21,0.09)] bg-white py-16 sm:py-20 lg:py-24"><div className="site-shell"><SectionHeading eyebrow="Practical examples" id="examples-title" title="Three examples of reuse with review" /><div className="mt-12 grid gap-6" data-practical-examples><article className="rounded-[1.1rem] border border-[rgba(21,21,21,0.11)] bg-[var(--warm)] p-6 sm:p-8"><p className="text-xs font-bold uppercase tracking-[0.13em] text-orange">Illustrative example</p><h3 className="font-display mt-4 text-3xl leading-tight text-ink">Example: electricity</h3><p className="mt-5 text-base leading-8 text-muted">If Customer A asks for 2025 electricity use, store company, site, period, value, unit, source and owner. When Customer B asks later for energy or emissions, check whether the same underlying data fits the new scope and definition.</p></article><article className="rounded-[1.1rem] border border-[rgba(21,21,21,0.11)] bg-white p-6 sm:p-8"><h3 className="font-display text-3xl leading-tight text-ink">Example: Environmental Policy</h3><p className="mt-5 text-base leading-8 text-muted">If an approved Environmental Policy exists, do not write a new one for every request. Check whether the version is current, applies to the answering entity and supports the customer question.</p><div className="mt-6"><InlineLink href="/en/resources/environmental-policy">Prepare an Environmental Policy correctly</InlineLink></div><div className="mt-3"><InlineLink href="/en/resources/supplier-code-of-conduct">Prepare a Supplier Code for reuse</InlineLink></div></article><article className="rounded-[1.1rem] border border-orange/25 bg-[var(--soft-orange)] p-6 sm:p-8"><h3 className="font-display text-3xl leading-tight text-ink">Example: Scope 1 &amp; 2</h3><p className="mt-5 text-base leading-8 text-muted">A structured Scope 1 and 2 data foundation can be reused across requests when activity data, sources, units, period, method and calculation stay traceable.</p><div className="mt-6"><InlineLink href="/en/resources/scope-1-2-data-collection-template">Collect Scope 1 and 2 data structurally</InlineLink></div><div className="mt-3"><InlineLink href="/en/resources/scope-1-2-data-calculation">Understand Scope 1 and 2 source data</InlineLink></div></article></div></div></section>
      <TextSection eyebrow="No new software required" id="system-title" title="A reusable ESG data foundation does not have to start with new software."><p>Companies can begin by improving definitions, ownership, sources, status, update logic and storage discipline in existing systems or controlled spreadsheets.</p></TextSection>
      <section aria-labelledby="owner-title" className="border-y border-[rgba(21,21,21,0.09)] bg-white py-16 sm:py-20 lg:py-24"><div className="site-shell"><SectionHeading eyebrow="Ownership" id="owner-title" title="Every reusable data point needs an owner."><p>Reusable data remains useful only if someone knows where it comes from, who can confirm it, who updates it and who approves external use where needed.</p></SectionHeading><dl className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5" data-owner-examples>{ownerExamples.map(([term, description]) => <div className="rounded-[1rem] border border-[rgba(21,21,21,0.11)] bg-[var(--warm)] p-5" key={term}><dt className="font-display text-2xl text-ink">{term}</dt><dd className="mt-3 text-sm font-semibold leading-6 text-muted">{description}</dd></div>)}</dl><div className="mt-8"><InlineLink href="/en/resources/esg-data-owners">Map ESG data owners</InlineLink></div></div></section>
      <section aria-labelledby="freshness-title" className="py-16 sm:py-20 lg:py-24"><div className="site-shell grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20"><SectionHeading eyebrow="Freshness" id="freshness-title" title="Reusable data needs a status." /><div className="grid gap-3 sm:grid-cols-2" data-freshness-statuses>{freshnessStatuses.map((status) => <div className="rounded-[0.9rem] border border-[rgba(21,21,21,0.11)] bg-white p-5 font-bold text-ink" key={status}>{status}</div>)}</div></div></section>
      <TextSection eyebrow="Request mapping" id="request-mapping-title" title="Same underlying information, different customer questions."><div className="rounded-[1.2rem] border border-orange/25 bg-[var(--soft-orange)] p-6 sm:p-8" data-request-mapping><p className="text-xs font-bold uppercase tracking-[0.13em] text-orange">Illustrative labels</p><h3 className="font-display mt-4 text-3xl leading-tight text-ink">Scope 2 emissions 2025</h3><BulletList items={["Customer A questionnaire", "EcoVadis assessment", "VSME preparation", "Customer B sustainability request"]} /></div><p>Map the reusable data point to each new request. Recheck scope, period, wording, unit, entity and evidence requirement before answering.</p></TextSection>
      <AssessmentContext title="Why reuse matters across ESG requests" body="Customer questionnaires, EcoVadis, IntegrityNext, VSME and Scope 1 and 2 work can ask similar topics in different formats. Similar is not identical." />
      <WorkflowSection title="How one ESG request becomes a reusable foundation" items={reuseWorkflowSteps} dataAttr="customer-policy-workflow" buttonHref="/en/resources/esg-questionnaire-checklist" />
      <WarningGrid id="copy-paste-title" eyebrow="Copy-paste risk" title="Reuse must not become copy-and-paste ESG." items={copyPasteWarnings} dataAttr="copy-paste-warnings" />
      <ResourceBridge items={[["Start with the customer request", "/en/resources/customer-esg-questionnaire-received"], ["Understand requested ESG data", "/en/resources/esg-data-customers-request-from-suppliers"], ["Map internal owners", "/en/resources/esg-data-owners"], ["Use the checklist", "/en/resources/esg-questionnaire-checklist"], ["Check evidence readiness", "/en/resources/esg-evidence-readiness-check"], ["Scope 1 & 2 source data", "/en/resources/scope-1-2-data-calculation"], ["Scope 1 & 2 collection template", "/en/resources/scope-1-2-data-collection-template"], ["VSME data", "/en/resources/vsme-data-sustainability-report"], ["Environmental Policy", "/en/resources/environmental-policy"], ["Supplier Code", "/en/resources/supplier-code-of-conduct"]]} dataAttr="resource-system-map" />
      <CommercialBridge title="Your ESG data already exists, but not as a reusable structure?" body="Evipace can help structure the information, sources and evidence needed for a specific customer ESG request so the work does not start from zero next time." note="Every external answer is still checked against scope, period and the specific customer requirement." />
      <MethodSection body="Reuse on this page means structured reuse of underlying company information and evidence. It does not mean transferring a previous answer unchecked to another customer, period, site, questionnaire or reporting context." />
      <FinalSection title="Every answered request should make the next one easier." body="Scattered company data can become a traceable, reusable ESG information foundation over time." />
    </article></main>
  );
}
