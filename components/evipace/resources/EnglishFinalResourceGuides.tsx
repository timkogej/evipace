import type { ReactNode } from "react";
import { ClosingCta } from "../home/ClosingCta";
import {
  Band,
  Callout,
  Card,
  CardGrid,
  Chips,
  Head,
  Items,
  Prose,
  Steps
} from "../service-landing/Blocks";
import r from "./Resource.module.css";
import {
  BoxList,
  Bullets,
  CenterAction,
  Flow,
  MetaCard,
  Panel,
  PillLink,
  QualifierBox,
  ResourceCard,
  ResourceCards,
  ResourceHero,
  ResourceMain,
  Terms,
  TextLink
} from "./ResourceParts";

const SEND_REQUEST_HREF = "/en/send-request";

function GuideHero({
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
    <ResourceHero
      actions={
        <>
          <PillLink href={primaryHref}>{primaryLabel}</PillLink>
          <TextLink href={SEND_REQUEST_HREF}>Already received a customer request?</TextLink>
        </>
      }
      current={eyebrow}
      eyebrow={eyebrow}
      locale="en"
      title={title}
      titleId="guide-title"
    >
      {intro}
      <QualifierBox body={qualifier} footer={artworkLabel} label="Qualifier" title={qualifierTitle} />
    </ResourceHero>
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
    <Band id="quick-answer" labelledBy="quick-answer-heading" tone="dark">
      <Head dark eyebrow="Quick Answer" id="quick-answer-heading" title="In short" />
      <Prose dark>{children}</Prose>
    </Band>
  );
}

function SimpleCards({ items, columns = 3 }: { items: readonly (readonly [string, string])[]; columns?: 2 | 3 }) {
  return (
    <CardGrid columns={columns}>
      {items.map(([title, copy]) => (
        <Card key={title} title={title}>
          <p>{copy}</p>
        </Card>
      ))}
    </CardGrid>
  );
}

function BuildingBlocks({ items, extra }: { items: readonly (readonly [string, string, readonly string[]])[]; extra?: (title: string) => ReactNode }) {
  return (
    <CardGrid columns={2}>
      {items.map(([title, copy, list]) => (
        <Card key={title} title={title}>
          <p>{copy}</p>
          {extra?.(title)}
          <Items items={list} />
        </Card>
      ))}
    </CardGrid>
  );
}

export function EnglishEnvironmentalPolicyGuide() {
  return (
    <ResourceMain locale="en">
      <article>
        <GuideHero
          artworkLabel="SCOPE · OWNER · STATUS · EVIDENCE"
          eyebrow="ENVIRONMENTAL POLICY"
          primaryHref="#building-blocks"
          primaryLabel="See the policy structure ↓"
          qualifier="A newly created Environmental Policy is not retrospective evidence that the commitments or measures described in it were already implemented in the past."
          qualifierTitle="A new policy does not prove past implementation."
          title="How to create an Environmental Policy that reflects how your company actually operates"
          intro={<>
            <p>Customers and supplier assessments may ask whether your company has an Environmental Policy.</p>
            <p>A credible policy should reflect the actual business, have a clear scope, name real responsibilities and contain commitments the company can support. Drafting the policy is different from proving implementation.</p>
          </>}
        />
        <QuickAnswer>
          <p>An Environmental Policy sets out a company’s fundamental environmental principles, defines its scope, identifies responsibilities and creates a framework for relevant objectives and measures.</p>
          <p>It should be based on actual business activity, internally reviewed and approved by the responsible function. The policy documents a formal commitment; implementation should be supported by separate processes, KPIs and evidence.</p>
        </QuickAnswer>

        <Band labelledBy="distinction-title">
          <Head eyebrow="Core distinction" id="distinction-title" title="A policy is not the same as implementation or evidence." />
          <div data-policy-distinction>
            <Flow items={["Policy", "Implementation", "Evidence"]} />
            <div className={r.blockGap}>
              <Terms items={[
                ["Policy", "What the company formally commits to."],
                ["Implementation", "What the company actually does."],
                ["Evidence", "What documents or records support that implementation."]
              ]} />
            </div>
          </div>
          <p className={r.closingLine}>Policy ≠ implementation ≠ evidence</p>
        </Band>

        <Band labelledBy="assessment-title" tone="tinted">
          <Head eyebrow="Before drafting" id="assessment-title" title="Start with reality. Then write the policy.">
            <p>Review what already exists in the company before writing policy language.</p>
          </Head>
          <div data-pre-drafting-assessment><Chips items={policyAssessmentItems} /></div>
        </Band>

        <Band labelledBy="purpose-title">
          <Head eyebrow="Purpose" id="purpose-title" title="What an Environmental Policy is for" />
          <div data-policy-purpose-blocks><SimpleCards columns={2} items={policyPurposeBlocks} /></div>
        </Band>

        <Band id="building-blocks" labelledBy="blocks-title" tone="dark">
          <Head dark eyebrow="Framework" id="blocks-title" title="Seven building blocks of a credible Environmental Policy" />
          <div data-policy-building-blocks><BuildingBlocks items={policyBuildingBlocks} /></div>
        </Band>

        <WarningGrid id="not-in-policy-title" eyebrow="Limits" title="What not to include in an Environmental Policy" items={notInPolicyItems} dataAttr="not-in-policy-items" />
        <ComparisonSection />
        <DocumentHierarchy />
        <EvidenceSection evidenceItems={policyEvidenceItems} />
        <StatusSection id="status-title" title="What status does your Environmental Policy have?" items={policyStatusModel} dataAttr="policy-status-model" />
        <MetadataSection id="version-title" title="A policy needs a clear version." note="Do not invent retrospective approval dates." items={policyVersionMetadata} dataAttr="version-control-example" />
        <TextSection eyebrow="Approval" id="draft-approved-title" title="Draft is not the same as approved.">
          <Callout>Draft ≠ approved policy</Callout>
          <p>Evipace can prepare a draft from actual company practices and documents. Only an authorised internal company process can turn that draft into an official Environmental Policy.</p>
        </TextSection>
        <OutlineSection title="Example structure for an Environmental Policy" qualifier="This is a structure guide, not a universal Environmental Policy template." items={policyOutlineSections} dataAttr="policy-outline" />
        <WorkflowSection title="What to do when a customer asks for an Environmental Policy" items={policyWorkflowSteps} dataAttr="customer-policy-workflow" buttonHref="/en/resources/esg-questionnaire-checklist" />
        <TextSection eyebrow="If it is missing" id="no-policy-title" title="What if your company does not have an Environmental Policy yet?">
          <p>Do not answer retroactively as if an approved policy already existed.</p>
          <p>Review actual environmental practices and responsibilities first. From that reality, an honest draft can be prepared, reviewed internally, corrected and adopted by an authorised function.</p>
          <Callout>A gap can be closed. It should not be hidden retroactively.</Callout>
        </TextSection>
        <TextSection eyebrow="ISO 14001" id="iso-title" title="Do companies with ISO 14001 need a separate Environmental Policy?" tone="tinted">
          <p>If an environmental management system already exists, the company may already have an environmental policy or related approved documents.</p>
          <p>Inspect existing documentation before creating a duplicate. A certificate is not automatically the same as the policy, and certification does not guarantee that every customer request is satisfied.</p>
        </TextSection>
        <AssessmentContext title="Environmental Policies in supplier assessments" body="EcoVadis and IntegrityNext may ask for policy, evidence or supporting information. This is contextual only: no affiliation, scoring guarantee or automatic acceptance is implied." />
        <TextSection eyebrow="Reuse" id="reuse-title" title="An approved policy should not be rediscovered for every request." tone="tinted">
          <p>Store scope, version, approval status, approver, document owner and file location. Then recheck whether the current version fits the next customer request.</p>
          <p><TextLink href="/en/resources/reusable-esg-data">Build a reusable ESG data foundation</TextLink></p>
        </TextSection>
        <FlowSection id="readiness-title" eyebrow="Readiness flow" title="From actual practice to approved policy" items={policyReadinessSteps} dataAttr="policy-readiness-map" />
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
      </article>
      <FinalSection title="A good Environmental Policy starts with the actual company, not with text." body="When scope, responsibilities and existing practice are clear, the policy can be realistic, traceable and internally supportable." />
    </ResourceMain>
  );
}

function WarningGrid({ id, eyebrow, title, items, dataAttr }: { id: string; eyebrow: string; title: string; items: readonly (readonly [string, string])[]; dataAttr: string }) {
  return (
    <Band labelledBy={id}>
      <Head eyebrow={eyebrow} id={id} title={title} />
      <div data-copy-paste-warnings={dataAttr === "copy-paste-warnings" ? true : undefined} data-not-in-policy-items={dataAttr === "not-in-policy-items" ? true : undefined} data-not-in-supplier-code-items={dataAttr === "not-in-supplier-code-items" ? true : undefined}>
        <SimpleCards items={items} />
      </div>
    </Band>
  );
}

function ComparisonSection() {
  return (
    <Band labelledBy="generic-title" tone="tinted">
      <Head eyebrow="Wording" id="generic-title" title="A template is only a starting point." />
      <div data-generic-specific-comparison>
        <CardGrid columns={2}>
          <Card>
            <p className={r.cardType}>Generic</p>
            <blockquote className={r.quote}>We are committed to protecting the environment and reducing our environmental footprint.</blockquote>
            <p>This sounds acceptable, but it says little about which environmental aspects are actually relevant.</p>
          </Card>
          <Card>
            <p className={r.cardType}>More company-specific</p>
            <blockquote className={r.quote}>For our production sites, we consider energy use, waste, relevant operating materials and other material operational environmental aspects. Responsibilities and measures are managed by the responsible functions and reviewed where needed.</blockquote>
            <p><strong>Use wording like this only where it fits the actual company.</strong></p>
          </Card>
        </CardGrid>
      </div>
    </Band>
  );
}

function DocumentHierarchy() {
  return (
    <Band labelledBy="hierarchy-title">
      <Head eyebrow="Document system" id="hierarchy-title" title="Which documents belong together?" />
      <div data-document-hierarchy>
        <Flow items={["Environmental Policy", "Procedure / work instruction", "Records", "KPI / report"]} />
        <div className={r.blockGap}>
          <Terms items={[["Environmental Policy", "Principles and framework."], ["Procedure / work instruction", "How a concrete process works."], ["Records", "What was actually done."], ["KPI / report", "What result follows from it."]]} />
        </div>
      </div>
      <div className={r.blockGap}>
        <MetaCard items={[["Policy", "Waste should be handled responsibly."], ["Procedure", "Internal process for waste separation."], ["Evidence", "Disposal record."], ["KPI", "Waste quantity in the reporting year."]]} label="Illustrative example: waste" />
      </div>
    </Band>
  );
}

function EvidenceSection({ evidenceItems }: { evidenceItems: readonly string[] }) {
  return (
    <Band labelledBy="evidence-title" tone="tinted">
      <Head eyebrow="Evidence" id="evidence-title" title="What supporting evidence may be relevant?">
        <p>The document itself is only one part of the evidence picture.</p>
      </Head>
      <div data-supplier-code-evidence data-supporting-evidence><Chips items={evidenceItems} /></div>
      <CenterAction>
        <TextLink href="/en/resources/esg-evidence-for-suppliers">Map ESG evidence correctly</TextLink>
        <TextLink href="/en/resources/esg-evidence-readiness-check">Check evidence readiness</TextLink>
      </CenterAction>
    </Band>
  );
}

function StatusSection({ id, title, items, dataAttr }: { id: string; title: string; items: readonly (readonly [string, string])[]; dataAttr: string }) {
  return (
    <Band labelledBy={id}>
      <Head eyebrow="Status" id={id} title={title} />
      <div data-policy-status-model={dataAttr === "policy-status-model" ? true : undefined} data-supplier-code-status-model={dataAttr === "supplier-code-status-model" ? true : undefined}>
        <Terms items={items} />
      </div>
    </Band>
  );
}

function MetadataSection({ id, title, note, items, dataAttr }: { id: string; title: string; note: string; items: readonly (readonly [string, string])[]; dataAttr: string }) {
  return (
    <Band labelledBy={id} tone="tinted">
      <Head eyebrow="Version" id={id} title={title}>
        <p>{note}</p>
      </Head>
      <div data-supplier-code-version-control={dataAttr === "supplier-code-version-control" ? true : undefined} data-version-control-example={dataAttr === "version-control-example" ? true : undefined}>
        <MetaCard items={items} label="Illustrative example metadata" />
      </div>
    </Band>
  );
}

function OutlineSection({ title, qualifier, items, dataAttr }: { title: string; qualifier: string; items: readonly (readonly [string, string])[]; dataAttr: string }) {
  return (
    <Band labelledBy="outline-title">
      <Head eyebrow="Outline" id="outline-title" title={title}>
        <p>{qualifier}</p>
      </Head>
      <div data-policy-outline={dataAttr === "policy-outline" ? true : undefined} data-supplier-code-outline={dataAttr === "supplier-code-outline" ? true : undefined}>
        <SimpleCards items={items} />
      </div>
    </Band>
  );
}

function WorkflowSection({ title, items, dataAttr, buttonHref }: { title: string; items: readonly (readonly [string, string])[]; dataAttr: string; buttonHref: string }) {
  return (
    <Band labelledBy="workflow-title" tone="dark">
      <Head dark eyebrow="Customer request" id="workflow-title" title={title} />
      <div className={r.darkSteps} data-customer-policy-workflow={dataAttr === "customer-policy-workflow" ? true : undefined} data-supplier-code-customer-workflow={dataAttr === "supplier-code-customer-workflow" ? true : undefined}>
        <Steps items={items.map(([itemTitle, copy]) => ({ title: itemTitle, body: copy }))} />
      </div>
      <CenterAction>
        <PillLink href={buttonHref}>Use the ESG questionnaire checklist</PillLink>
      </CenterAction>
    </Band>
  );
}

function TextSection({ eyebrow, id, title, children, tone = "light" }: { eyebrow: string; id: string; title: string; children: ReactNode; tone?: "light" | "tinted" }) {
  return (
    <Band labelledBy={id} tone={tone}>
      <Head eyebrow={eyebrow} id={id} title={title} />
      <Prose>{children}</Prose>
    </Band>
  );
}

function AssessmentContext({ title, body }: { title: string; body: string }) {
  return (
    <Band labelledBy="assessments-title">
      <Head eyebrow="Assessment context" id="assessments-title" title={title}>
        <p>{body}</p>
      </Head>
      <CardGrid columns={2}>
        {[["EcoVadis", "/en/resources/ecovadis-documents-evidence"], ["IntegrityNext", "/en/resources/integritynext-invitation-for-suppliers"]].map(([cardTitle, href]) => (
          <Card key={cardTitle} title={cardTitle}>
            <p>Context for supplier assessments. No affiliation, automatic acceptance or scoring claim.</p>
            <TextLink href={href}>Read related resource</TextLink>
          </Card>
        ))}
      </CardGrid>
    </Band>
  );
}

function FlowSection({ id, eyebrow, title, items, dataAttr }: { id: string; eyebrow: string; title: string; items: readonly string[]; dataAttr: string }) {
  return (
    <Band labelledBy={id} tone="tinted">
      <Head eyebrow={eyebrow} id={id} title={title} />
      <div data-policy-readiness-map={dataAttr === "policy-readiness-map" ? true : undefined} data-supplier-code-lifecycle={dataAttr === "supplier-code-lifecycle" ? true : undefined}>
        <Flow items={items} />
      </div>
    </Band>
  );
}

function MistakesSection({ title, items, dataAttr, dark = false }: { title: string; items: readonly (readonly [string, string])[]; dataAttr: string; dark?: boolean }) {
  return (
    <Band labelledBy="mistakes-title" tone={dark ? "dark" : "light"}>
      <Head dark={dark} eyebrow="Common mistakes" id="mistakes-title" title={title} />
      <div data-common-policy-mistakes={dataAttr === "common-policy-mistakes" ? true : undefined} data-common-supplier-code-mistakes={dataAttr === "common-supplier-code-mistakes" ? true : undefined}>
        <SimpleCards items={items} />
      </div>
    </Band>
  );
}

function ChecklistSection({ title, items, dataAttr }: { title: string; items: readonly string[]; dataAttr: string }) {
  return (
    <Band labelledBy="approval-title" tone="tinted">
      <Head eyebrow="Pre-approval" id="approval-title" title={title} />
      <div data-pre-approval-checklist={dataAttr === "pre-approval-checklist" ? true : undefined} data-supplier-code-pre-approval-checklist={dataAttr === "supplier-code-pre-approval-checklist" ? true : undefined}>
        <BoxList items={items} />
      </div>
    </Band>
  );
}

function ResourceBridge({ items, dataAttr }: { items: readonly (readonly [string, string])[]; dataAttr: string }) {
  return (
    <Band labelledBy="resource-bridge-title">
      <Head eyebrow="Resource bridge" id="resource-bridge-title" title="Place this document in the wider ESG system" />
      <div data-resource-bridge={dataAttr === "resource-bridge" ? true : undefined} data-resource-system-map={dataAttr === "resource-system-map" ? true : undefined} data-supplier-code-resource-bridge={dataAttr === "supplier-code-resource-bridge" ? true : undefined}>
        <ResourceCards>
          {items.map(([itemTitle, href]) => (
            <ResourceCard cta="Open resource" href={href} key={href} title={itemTitle} />
          ))}
        </ResourceCards>
      </div>
    </Band>
  );
}

function CommercialBridge({ title, body, note }: { title: string; body: string; note: string }) {
  return (
    <Band labelledBy="commercial-title" tone="tinted">
      <Head eyebrow="Implementation" id="commercial-title" title={title}>
        <p>{body}</p>
      </Head>
      <CenterAction>
        <PillLink href={SEND_REQUEST_HREF}>Send your ESG request</PillLink>
        <TextLink href="/en/esg-customer-requests">Customer ESG request support</TextLink>
      </CenterAction>
      <p className={r.centerText}>{note}</p>
    </Band>
  );
}

function MethodSection({ body }: { body: string }) {
  return (
    <Band labelledBy="method-title">
      <Head eyebrow="Methodology" id="method-title" title="Methodological note" />
      <Prose>
        <p>{body}</p>
        <p><TextLink href="/en/methodology">How Evipace works with ESG data and evidence</TextLink></p>
      </Prose>
    </Band>
  );
}

function FinalSection({ title, body }: { title: string; body: string }) {
  return (
    <ClosingCta
      body={<p>{body}</p>}
      formHref={SEND_REQUEST_HREF}
      formLabel="Send your ESG request"
      forwardLabel="Forward your request"
      offers={{ label: "Customer ESG request support", href: "/en/esg-customer-requests" }}
      slogan="ESG work. Done right. Done faster."
      title={title}
    />
  );
}

export function EnglishSupplierCodeOfConductGuide() {
  return (
    <ResourceMain locale="en">
      <article>
        <GuideHero artworkLabel="SCOPE · ACKNOWLEDGMENT · STATUS · EVIDENCE" eyebrow="SUPPLIER CODE OF CONDUCT" primaryHref="#building-blocks" primaryLabel="See the code structure ↓" qualifierTitle="Acknowledgment is not supplier compliance." qualifier="A published or acknowledged Supplier Code of Conduct does not automatically prove that every supplier meets every requirement in it." title="How to create a Supplier Code of Conduct that works in practice" intro={<><p>Customers and supplier assessments may ask whether your company defines ESG and compliance expectations for suppliers.</p><p>A Supplier Code can document expectations on human rights, working conditions, environment, ethics and responsible procurement. It must fit the actual supplier base and procurement process, and it should not promise rights or processes the company does not have.</p></>} />
        <QuickAnswer><p>A Supplier Code of Conduct describes the expectations a company sets for suppliers. A credible code defines scope, uses realistic requirements, is internally approved, and is connected to communication, acknowledgment where used and practical supplier-management processes.</p></QuickAnswer>

        <Band labelledBy="distinction-title">
          <Head eyebrow="Core distinctions" id="distinction-title" title="A Supplier Code is an expectation, not proof of supplier performance." />
          <div data-code-compliance-distinction>
            <Flow items={["Code", "Implementation", "Supplier compliance"]} />
            <p className={r.closingLine}>Published ≠ communicated ≠ acknowledged ≠ contractually incorporated</p>
          </div>
          <p className={r.closingLine}>Code ≠ implementation ≠ supplier compliance</p>
        </Band>

        <Band labelledBy="assessment-title" tone="tinted">
          <Head eyebrow="Before drafting" id="assessment-title" title="Understand procurement first. Then define supplier expectations." />
          <div data-procurement-assessment><Chips items={supplierAssessmentItems} /></div>
        </Band>

        <Band labelledBy="purpose-title">
          <Head eyebrow="Purpose" id="purpose-title" title="What a Supplier Code of Conduct is for" />
          <div data-supplier-code-purpose-blocks><SimpleCards columns={2} items={supplierPurposeBlocks} /></div>
        </Band>

        <Band id="building-blocks" labelledBy="blocks-title" tone="dark">
          <Head dark eyebrow="Framework" id="blocks-title" title="Seven building blocks of a credible Supplier Code of Conduct" />
          <div data-supplier-code-building-blocks>
            <BuildingBlocks
              extra={(blockTitle) => blockTitle.startsWith("3") ? <p><TextLink href="/en/resources/environmental-policy" onDark>Prepare the Environmental Policy separately</TextLink></p> : null}
              items={supplierBuildingBlocks}
            />
          </div>
        </Band>

        <WarningGrid id="not-in-code-title" eyebrow="Limits" title="What not to include in a Supplier Code of Conduct" items={notInSupplierCodeItems} dataAttr="not-in-supplier-code-items" />
        <Band labelledBy="contract-title" tone="tinted">
          <Head eyebrow="Contract status" id="contract-title" title="Is a Supplier Code automatically part of the contract?" />
          <Prose>
            <Callout>Not automatically.</Callout>
            <p>Whether and how a Supplier Code is contractually incorporated depends on the actual contract and procurement process. This guide does not draw enforceability conclusions.</p>
          </Prose>
          <div className={r.blockGap} data-contract-status-distinction>
            <Flow items={["Published", "Communicated", "Acknowledged", "Contractually incorporated"]} />
          </div>
        </Band>
        <Band labelledBy="acknowledgment-title">
          <Head eyebrow="Acknowledgment" id="acknowledgment-title" title="What does supplier acknowledgment mean?">
            <p>Acknowledgment may document receipt or confirmation. It does not automatically prove implementation or compliance.</p>
          </Head>
          <div data-supplier-acknowledgment><Flow items={supplierAcknowledgmentStates} /></div>
        </Band>
        <EvidenceSection evidenceItems={supplierEvidenceItems} />
        <StatusSection id="status-title" title="What status does your Supplier Code have?" items={supplierStatusModel} dataAttr="supplier-code-status-model" />
        <MetadataSection id="version-title" title="A Supplier Code also needs version control." note="Do not invent backdated approval or rollout dates." items={supplierVersionMetadata} dataAttr="supplier-code-version-control" />
        <TextSection eyebrow="Approval" id="supplier-draft-approved-title" title="Draft is not the same as approved.">
          <Callout>Draft ≠ approved Supplier Code</Callout>
          <p>Evipace can prepare a draft, but the code becomes an official company document only through client review, corrections and authorised internal approval.</p>
        </TextSection>
        <OutlineSection title="Example structure for a Supplier Code of Conduct" qualifier="This is a structure guide, not a universal contract or compliance template." items={supplierOutlineSections} dataAttr="supplier-code-outline" />
        <Band labelledBy="deviation-title" tone="dark">
          <Head dark eyebrow="Deviations" id="deviation-title" title="What happens if a supplier does not meet a requirement?">
            <p>Do not default every deviation to immediate termination. Clarification, risk assessment and corrective action may be appropriate depending on the facts and actual agreements.</p>
          </Head>
          <div data-deviation-workflow><Flow dark items={supplierDeviationSteps} /></div>
          <p className={`${r.centerText} ${r.onDark}`}>Specific legal or contractual response is outside this guide.</p>
        </Band>
        <TextSection eyebrow="Risk-based" id="risk-title" title="Does every supplier need the same treatment?">
          <p>A local office-supply vendor, a critical production supplier and a sensitive raw-material supplier may need different levels of information or review.</p>
          <p>This is practical operating guidance, not a universal legal requirement.</p>
        </TextSection>
        <WorkflowSection title="What to do when your customer asks for a Supplier Code of Conduct" items={supplierWorkflowSteps} dataAttr="supplier-code-customer-workflow" buttonHref="/en/resources/esg-questionnaire-checklist" />
        <TextSection eyebrow="If it is missing" id="no-code-title" title="What if your company does not have a Supplier Code yet?">
          <p>Do not answer retroactively as if a formal code already existed.</p>
          <p>Review existing procurement requirements, identify actual expectations, draft realistically, review internally, approve and integrate the code into actual supplier processes.</p>
          <Callout>A missing policy can be built. A past that did not exist should not be invented.</Callout>
        </TextSection>
        <Band labelledBy="comparison-title" tone="tinted">
          <Head eyebrow="Distinction" id="comparison-title" title="Supplier Code and Supplier Questionnaire have different jobs." />
          <div data-code-questionnaire-comparison><Terms items={supplierComparison} /></div>
          <p className={r.centerText}><strong>A Supplier Code does not automatically replace a questionnaire or assessment.</strong></p>
        </Band>
        <TextSection eyebrow="Avoid copy-paste" id="customer-own-title" title="A customer requirement and your own Supplier Code are not the same thing.">
          <p>A customer may require your company to address supplier ESG expectations. That does not mean you should copy the customer’s Supplier Code word for word.</p>
          <p>Your own code should fit your supplier structure, procurement process and expectations you can genuinely support and manage.</p>
        </TextSection>
        <AssessmentContext title="Supplier Code of Conduct in ESG assessments" body="A Supplier Code can be relevant in assessments, but it should not be equated with full implementation or comprehensive supply-chain verification." />
        <TextSection eyebrow="Reuse" id="reuse-title" title="An approved Supplier Code should be findable for the next ESG request." tone="tinted">
          <p>Store the current version, scope, owner and communication status in a reusable ESG information foundation.</p>
          <p><TextLink href="/en/resources/reusable-esg-data">Build a reusable ESG data foundation</TextLink></p>
        </TextSection>
        <FlowSection id="lifecycle-title" eyebrow="Lifecycle" title="From actual expectations to an applied Supplier Code" items={supplierLifecycleSteps} dataAttr="supplier-code-lifecycle" />
        <MistakesSection title="Eight common Supplier Code of Conduct mistakes" items={supplierMistakes} dataAttr="common-supplier-code-mistakes" />
        <ChecklistSection title="Check before internal approval" items={supplierPreApprovalItems} dataAttr="supplier-code-pre-approval-checklist" />
        <ResourceBridge items={[["What ESG data do customers ask for?", "/en/resources/esg-data-customers-request-from-suppliers"], ["Who owns ESG data internally?", "/en/resources/esg-data-owners"], ["Check evidence readiness", "/en/resources/esg-evidence-readiness-check"], ["Reuse the document later", "/en/resources/reusable-esg-data"], ["Prepare an Environmental Policy", "/en/resources/environmental-policy"]]} dataAttr="supplier-code-resource-bridge" />
        <CommercialBridge title="Customer asking for a Supplier Code, but your process is not cleanly documented yet?" body="Evipace can help understand the actual supplier and procurement context, structure relevant ESG and compliance topics and prepare a Supplier Code draft." note="The document becomes official only through your review, corrections and authorised internal approval." />
        <MethodSection body="This guide describes a practical approach to preparing a Supplier Code of Conduct for ESG customer requests and supplier management. It is not legal, contract, audit or certification advice." />
      </article>
      <FinalSection title="A good Supplier Code starts with the actual supplier base, not with a template." body="When supplier structure, expectations, responsibilities and processes are clear, the code can be realistic, traceable and usable." />
    </ResourceMain>
  );
}

export function EnglishReusableEsgDataGuide() {
  return (
    <ResourceMain locale="en">
      <article>
        <GuideHero artworkLabel="DATA POINT · SOURCE · STATUS · REUSE" eyebrow="REUSABLE ESG DATA FOUNDATION" primaryHref="#structure" primaryLabel="See the data structure ↓" qualifierTitle="Reuse information. Recheck context." qualifier="Reuse the underlying information. Do not blindly reuse the answer. Scope, period, definition and evidence requirement still need review for every new request." title="Collect ESG data once. Reuse it for the next request." intro={<><p>The same ESG information is often requested by customers, questionnaires, platforms, reporting processes and supplier assessments.</p><p>Many companies still search old emails, reopen spreadsheets, ask the same internal people again and look for the same evidence every time. The first step is not necessarily new software; it is a structured reusable information foundation.</p></>} />
        <QuickAnswer><p>A reusable ESG data foundation connects recurring data points, internal owners, original sources, evidence, definitions, reporting periods and status.</p><p>For a new customer request, the company can check what already fits, what needs updating and what is genuinely missing instead of rebuilding every answer from scratch.</p></QuickAnswer>

        <Band labelledBy="core-flow-title">
          <Head eyebrow="Core flow" id="core-flow-title" title="Reuse the underlying information. Recheck the context.">
            <p>Reusable ESG work starts by preserving the source and status of the information, then checking what changed before the next external answer is prepared.</p>
          </Head>
          <div data-reuse-core-flow><Flow items={reusableCoreFlow} /></div>
        </Band>
        <TextSection eyebrow="Starting point" id="problem-title" title="Why does ESG start from zero so often?" tone="tinted">
          <p>ESG information is usually spread across Finance, HR, Facility, Quality, EHS, Procurement and Management.</p>
          <p>When every request is treated as a one-off project, the company ends up with separate spreadsheets, emails and folders. The next questionnaire sends people back to the same sources again.</p>
          <Callout>The problem is often not missing information. The problem is missing structure.</Callout>
        </TextSection>
        <Band labelledBy="before-after-title">
          <Head eyebrow="Before / after" id="before-after-title" title="What changes with a reusable structure" />
          <div data-before-after>
            <CardGrid columns={2}>
              <Card title="Without structure">
                <Items items={["Customer A", "new spreadsheet", "ask Finance", "ask HR", "find invoices", "find evidence"]} />
                <p className={r.cardQuote}>Customer B → start again</p>
              </Card>
              <Card title="With structured data">
                <p className={r.cardQuote}>Data point + source + evidence + owner + period + status</p>
                <Items items={["Customer questionnaires", "EcoVadis", "IntegrityNext", "VSME", "Internal ESG reporting"]} />
              </Card>
            </CardGrid>
          </div>
          <p className={r.centerText}>The foundation reduces search work. The specific customer requirement still needs to be checked.</p>
        </Band>
        <Band id="structure" labelledBy="structure-title" tone="tinted">
          <Head eyebrow="Reusable ESG data" id="structure-title" title="What should be stored for reuse?">
            <p>A useful ESG data foundation stores context, not just a value.</p>
          </Head>
          <div data-reusable-components>
            <CardGrid>
              {reusableComponents.map(([title, example, copy]) => (
                <Card key={title} title={title}>
                  <p className={r.example}>{example}</p>
                  <p>{copy}</p>
                </Card>
              ))}
            </CardGrid>
          </div>
          <div className={r.blockGap}><Chips items={reusableStatusExamples} /></div>
        </Band>
        <MetadataSection id="record-title" title="The smallest useful ESG data record" note="Illustrative example. This is not real customer data and not a statement about a real company." items={reusableDataRecord} dataAttr="version-control-example" />
        <Band labelledBy="reuse-title">
          <Head eyebrow="Reuse logic" id="reuse-title" title="Do not copy every answer. Reuse many data points." />
          <div data-reuse-groups>
            <CardGrid>
              {reuseGroups.map(([title, items]) => (
                <Card key={title} title={title}>
                  <Items items={items} />
                </Card>
              ))}
            </CardGrid>
          </div>
          <p className={r.closingLine}>The aim is not a universal master answer, but a reliable information base for preparing the right answer.</p>
        </Band>
        <Band labelledBy="layers-title" tone="dark">
          <Head dark eyebrow="Framework" id="layers-title" title="Five layers of a reusable ESG foundation" />
          <div className={r.darkSteps} data-foundation-layers>
            <Steps items={foundationLayers.map(([title, copy]) => ({ title, body: copy }))} />
          </div>
        </Band>
        <Band labelledBy="evidence-chain-title">
          <Head eyebrow="Traceability" id="evidence-chain-title" title="Reuse works only when the source remains traceable." />
          <div data-evidence-chain><Flow items={["Customer question", "Answer", "Data point", "Evidence", "Original source"]} /></div>
          <Prose>
            <p>Storing only the final answer loses much of the later value. Store the data point and source so the next request can be checked against scope, period and evidence requirement.</p>
            <p><TextLink href="/en/resources/esg-evidence-for-suppliers">Read about ESG evidence</TextLink></p>
          </Prose>
        </Band>
        <Band labelledBy="examples-title" tone="tinted">
          <Head eyebrow="Practical examples" id="examples-title" title="Three examples of reuse with review" />
          <div data-practical-examples>
            <CardGrid>
              <Card title="Example: electricity">
                <p className={r.cardType}>Illustrative example</p>
                <p>If Customer A asks for 2025 electricity use, store company, site, period, value, unit, source and owner. When Customer B asks later for energy or emissions, check whether the same underlying data fits the new scope and definition.</p>
              </Card>
              <Card title="Example: Environmental Policy">
                <p>If an approved Environmental Policy exists, do not write a new one for every request. Check whether the version is current, applies to the answering entity and supports the customer question.</p>
                <p><TextLink href="/en/resources/environmental-policy">Prepare an Environmental Policy correctly</TextLink></p>
                <p><TextLink href="/en/resources/supplier-code-of-conduct">Prepare a Supplier Code for reuse</TextLink></p>
              </Card>
              <Card title="Example: Scope 1 & 2">
                <p>A structured Scope 1 and 2 data foundation can be reused across requests when activity data, sources, units, period, method and calculation stay traceable.</p>
                <p><TextLink href="/en/resources/scope-1-2-data-collection-template">Collect Scope 1 and 2 data structurally</TextLink></p>
                <p><TextLink href="/en/resources/scope-1-2-data-calculation">Understand Scope 1 and 2 source data</TextLink></p>
              </Card>
            </CardGrid>
          </div>
        </Band>
        <TextSection eyebrow="No new software required" id="system-title" title="A reusable ESG data foundation does not have to start with new software.">
          <p>Companies can begin by improving definitions, ownership, sources, status, update logic and storage discipline in existing systems or controlled spreadsheets.</p>
        </TextSection>
        <Band labelledBy="owner-title" tone="tinted">
          <Head eyebrow="Ownership" id="owner-title" title="Every reusable data point needs an owner.">
            <p>Reusable data remains useful only if someone knows where it comes from, who can confirm it, who updates it and who approves external use where needed.</p>
          </Head>
          <div data-owner-examples><Terms items={ownerExamples} /></div>
          <CenterAction><TextLink href="/en/resources/esg-data-owners">Map ESG data owners</TextLink></CenterAction>
        </Band>
        <Band labelledBy="freshness-title">
          <Head eyebrow="Freshness" id="freshness-title" title="Reusable data needs a status." />
          <div data-freshness-statuses><Chips items={freshnessStatuses} /></div>
        </Band>
        <Band labelledBy="request-mapping-title" tone="tinted">
          <Head eyebrow="Request mapping" id="request-mapping-title" title="Same underlying information, different customer questions." />
          <div className={r.single} data-request-mapping>
            <Panel label="Illustrative labels">
              <h3 className={r.panelTitle}>Scope 2 emissions 2025</h3>
              <Bullets items={["Customer A questionnaire", "EcoVadis assessment", "VSME preparation", "Customer B sustainability request"]} />
            </Panel>
          </div>
          <Prose>
            <p>Map the reusable data point to each new request. Recheck scope, period, wording, unit, entity and evidence requirement before answering.</p>
          </Prose>
        </Band>
        <AssessmentContext title="Why reuse matters across ESG requests" body="Customer questionnaires, EcoVadis, IntegrityNext, VSME and Scope 1 and 2 work can ask similar topics in different formats. Similar is not identical." />
        <WorkflowSection title="How one ESG request becomes a reusable foundation" items={reuseWorkflowSteps} dataAttr="customer-policy-workflow" buttonHref="/en/resources/esg-questionnaire-checklist" />
        <WarningGrid id="copy-paste-title" eyebrow="Copy-paste risk" title="Reuse must not become copy-and-paste ESG." items={copyPasteWarnings} dataAttr="copy-paste-warnings" />
        <ResourceBridge items={[["Start with the customer request", "/en/resources/customer-esg-questionnaire-received"], ["Understand requested ESG data", "/en/resources/esg-data-customers-request-from-suppliers"], ["Map internal owners", "/en/resources/esg-data-owners"], ["Use the checklist", "/en/resources/esg-questionnaire-checklist"], ["Check evidence readiness", "/en/resources/esg-evidence-readiness-check"], ["Scope 1 & 2 source data", "/en/resources/scope-1-2-data-calculation"], ["Scope 1 & 2 collection template", "/en/resources/scope-1-2-data-collection-template"], ["VSME data", "/en/resources/vsme-data-sustainability-report"], ["Environmental Policy", "/en/resources/environmental-policy"], ["Supplier Code", "/en/resources/supplier-code-of-conduct"]]} dataAttr="resource-system-map" />
        <CommercialBridge title="Your ESG data already exists, but not as a reusable structure?" body="Evipace can help structure the information, sources and evidence needed for a specific customer ESG request so the work does not start from zero next time." note="Every external answer is still checked against scope, period and the specific customer requirement." />
        <MethodSection body="Reuse on this page means structured reuse of underlying company information and evidence. It does not mean transferring a previous answer unchecked to another customer, period, site, questionnaire or reporting context." />
      </article>
      <FinalSection title="Every answered request should make the next one easier." body="Scattered company data can become a traceable, reusable ESG information foundation over time." />
    </ResourceMain>
  );
}
