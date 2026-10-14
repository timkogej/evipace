import type { ReactNode } from "react";
import Link from "next/link";
import h from "../HomeLandingPage.module.css";
import { ClosingCta } from "../home/ClosingCta";
import { Band, Head, Prose } from "../service-landing/Blocks";
import { EsgEvidenceReadinessTool } from "./EsgEvidenceReadinessTool";
import { EsgQuestionnaireChecklist } from "./EsgQuestionnaireChecklist";
import { EnglishScope12DataCollectionTool } from "./EnglishScope12DataCollectionTool";
import r from "./Resource.module.css";
import { PillLink, QualifierBox, ResourceHero, ResourceMain, TextLink } from "./ResourceParts";

function ToolHero({
  current,
  deck,
  eyebrow,
  flow,
  title
}: {
  current: string;
  deck: string;
  eyebrow: string;
  flow: string;
  title: string;
}) {
  return (
    <ResourceHero
      actions={
        <>
          <PillLink href="#tool-start">Start the tool ↓</PillLink>
          <TextLink href="/en/resources">All resources</TextLink>
        </>
      }
      current={current}
      eyebrow={eyebrow}
      locale="en"
      title={title}
      titleId="tool-title"
    >
      <p>{deck}</p>
      <div className={r.noPrint}>
        <QualifierBox label="Working flow" title={flow} />
      </div>
    </ResourceHero>
  );
}

/** The tool itself keeps its own interface; it sits on a calm tinted band. */
function ToolBand({ children }: { children: ReactNode }) {
  return (
    <section className={r.toolBand} id="tool-start">
      <div className={h.shell}>{children}</div>
    </section>
  );
}

function Bridge({
  body,
  cta,
  serviceHref,
  serviceLabel
}: {
  body: string;
  cta: string;
  serviceHref?: string;
  serviceLabel?: string;
}) {
  return (
    <div className={r.noPrint}>
      <ClosingCta
        body={
          <>
            <p>{body}</p>
            <p>
              <Link className={`${h.textLink} ${h.textLinkOnDark}`} href="/en/methodology">
                See methodology<span aria-hidden="true">→</span>
              </Link>
            </p>
          </>
        }
        formHref="/en/send-request"
        formLabel={cta}
        forwardLabel="Forward your request"
        offers={serviceHref && serviceLabel ? { label: serviceLabel, href: serviceHref } : undefined}
        slogan="ESG work. Done right. Done faster."
        title="From tool to response."
      />
    </div>
  );
}

export function EnglishQuestionnaireChecklistGuide() {
  return (
    <ResourceMain className="esg-checklist-page" locale="en">
      <ToolHero
        current="ESG Questionnaire Checklist"
        deck="Use this interactive checklist to review scope, ownership, ESG data, evidence, calculations, gaps, consistency and final submission checks before returning a customer ESG questionnaire."
        eyebrow="ESG QUESTIONNAIRE CHECKLIST"
        flow="Request -> scope -> owners -> data -> evidence -> calculations -> review -> submission"
        title="ESG Questionnaire Checklist for Suppliers"
      />
      <ToolBand>
        <EsgQuestionnaireChecklist locale="en" />
      </ToolBand>
      <Bridge
        body="Already have the questionnaire? Send us the original request, spreadsheet, portal export or customer email. We can help identify required data, source owners, evidence and real gaps for internal review."
        cta="Send the questionnaire"
        serviceHref="/en/esg-questionnaire-support"
        serviceLabel="ESG questionnaire support"
      />
    </ResourceMain>
  );
}

export function EnglishEvidenceReadinessGuide() {
  return (
    <ResourceMain className="evidence-readiness-page" locale="en">
      <ToolHero
        current="ESG Evidence Readiness Check"
        deck="Check whether one ESG document actually supports the answer you want to give by reviewing statement fit, entity, scope, period, source, validity and traceability."
        eyebrow="ESG EVIDENCE READINESS"
        flow="Statement -> entity -> scope -> period -> source -> validity -> confirmation"
        title="Is this ESG evidence actually usable?"
      />
      <ToolBand>
        <EsgEvidenceReadinessTool locale="en" />
      </ToolBand>
      <Bridge
        body="Working through a customer ESG request and unsure whether your evidence supports the answer? Send us the request and the evidence list you are considering."
        cta="Send the ESG request"
        serviceHref="/en/esg-questionnaire-support"
        serviceLabel="Get questionnaire support"
      />
    </ResourceMain>
  );
}

export function EnglishScope12DataCollectionGuide() {
  return (
    <ResourceMain className="scope12-data-page" locale="en">
      <ToolHero
        current="Scope 1 & 2 Data Collection Template"
        deck="Collect electricity, fuel, vehicle, refrigerant, process-emission and purchased-energy activity data by site, period, unit and source before applying emission factors."
        eyebrow="SCOPE 1 & 2 DATA COLLECTION"
        flow="Boundary -> sites -> activity data -> unit -> period -> source -> gaps -> review -> calculation"
        title="Collect the data you need for Scope 1 and Scope 2."
      />
      <Band labelledBy="activity-first-title" tone="dark">
        <Head dark id="activity-first-title" title="Activity data first. CO2e later." />
        <Prose dark>
          <p>
            This workspace helps you collect and structure activity data. It does
            not apply emission factors, calculate a verified carbon footprint or
            certify a Scope 1 and Scope 2 inventory.
          </p>
        </Prose>
      </Band>
      <ToolBand>
        <EnglishScope12DataCollectionTool />
      </ToolBand>
      <Bridge
        body="Need the Scope 1 & 2 calculation after collecting the data? Send us the request and the collected source data so the calculation method, factors and assumptions can be reviewed."
        cta="Send the Scope 1 & 2 request"
        serviceHref="/en/scope-1-2-calculation"
        serviceLabel="Scope 1 & 2 calculation service"
      />
    </ResourceMain>
  );
}
