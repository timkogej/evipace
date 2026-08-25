import Link from "next/link";
import { ArrowDown, ArrowRight, ClipboardCheck, ClipboardList, FileCheck2 } from "lucide-react";
import { ButtonLink } from "../ButtonLink";
import { EsgEvidenceReadinessTool } from "./EsgEvidenceReadinessTool";
import { EsgQuestionnaireChecklist } from "./EsgQuestionnaireChecklist";
import { EnglishScope12DataCollectionTool } from "./EnglishScope12DataCollectionTool";

function Breadcrumb({ current }: { current: string }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[rgba(21,21,21,0.52)]"
    >
      <Link className="transition hover:text-orange" href="/en">
        Home
      </Link>
      <span aria-hidden="true">/</span>
      <Link className="transition hover:text-orange" href="/en/resources">
        Resources
      </Link>
      <span aria-hidden="true">/</span>
      <span aria-current="page" className="text-ink">
        {current}
      </span>
    </nav>
  );
}

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
    <header
      aria-labelledby="article-title"
      className="resource-article-hero relative isolate overflow-hidden pb-16 pt-28 sm:pb-20 sm:pt-32 lg:pb-24"
    >
      <div className="site-shell relative z-10">
        <Breadcrumb current={current} />
        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.55fr)] lg:items-end lg:gap-16">
          <div className="min-w-0">
            <p className="eyebrow">{eyebrow}</p>
            <h1
              className="font-display mt-7 max-w-[14ch] break-words text-[clamp(3.05rem,6.4vw,6.2rem)] leading-[0.92]"
              id="article-title"
            >
              {title}
            </h1>
            <p className="mt-8 max-w-3xl text-[clamp(1.08rem,1.55vw,1.35rem)] leading-[1.65] text-muted">
              {deck}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <ButtonLink href="#tool-start">
                Start the tool <ArrowDown aria-hidden="true" className="h-4 w-4" />
              </ButtonLink>
              <Link
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[rgba(21,21,21,0.18)] px-6 py-3 text-center text-sm font-bold text-ink transition hover:border-orange hover:text-orange"
                href="/en/resources"
              >
                All resources
              </Link>
            </div>
          </div>
          <aside className="rounded-[1.15rem] border border-orange/25 bg-[rgba(255,255,255,0.78)] p-6 shadow-[0_24px_70px_rgba(21,21,21,0.07)] backdrop-blur-sm sm:p-7">
            <ClipboardCheck aria-hidden="true" className="h-8 w-8 text-orange" />
            <p className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-orange">
              Working flow
            </p>
            <p className="font-display mt-4 text-[1.72rem] leading-tight text-ink">
              {flow}
            </p>
          </aside>
        </div>
      </div>
    </header>
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
    <section className="border-t border-[rgba(21,21,21,0.1)] py-16 sm:py-20">
      <div className="site-shell grid gap-8 lg:grid-cols-[0.62fr_1.38fr] lg:gap-16">
        <div>
          <FileCheck2 aria-hidden="true" className="h-9 w-9 text-orange" />
          <h2 className="font-display mt-5 max-w-[14ch] text-[clamp(2.4rem,4.8vw,4.5rem)] leading-none">
            From tool to response.
          </h2>
        </div>
        <div className="max-w-3xl text-lg leading-8 text-muted">
          <p>{body}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href="/en/send-request">{cta}</ButtonLink>
            {serviceHref && serviceLabel ? (
              <ButtonLink href={serviceHref} variant="secondary">
                {serviceLabel}
              </ButtonLink>
            ) : null}
            <Link
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[rgba(21,21,21,0.18)] px-6 py-3 text-sm font-bold text-ink transition hover:border-orange hover:text-orange"
              href="/en/methodology"
            >
              See methodology <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function EnglishQuestionnaireChecklistGuide() {
  return (
    <main className="esg-checklist-page" id="top">
      <ToolHero
        current="ESG Questionnaire Checklist"
        deck="Use this interactive checklist to review scope, ownership, ESG data, evidence, calculations, gaps, consistency and final submission checks before returning a customer ESG questionnaire."
        eyebrow="ESG QUESTIONNAIRE CHECKLIST"
        flow="Request -> scope -> owners -> data -> evidence -> calculations -> review -> submission"
        title="ESG Questionnaire Checklist for Suppliers"
      />
      <section className="site-shell py-14 sm:py-16 lg:py-20" id="tool-start">
        <EsgQuestionnaireChecklist locale="en" />
      </section>
      <Bridge
        body="Already have the questionnaire? Send us the original request, spreadsheet, portal export or customer email. We can help identify required data, source owners, evidence and real gaps for internal review."
        cta="Send the questionnaire"
        serviceHref="/en/esg-questionnaire-support"
        serviceLabel="ESG questionnaire support"
      />
    </main>
  );
}

export function EnglishEvidenceReadinessGuide() {
  return (
    <main className="evidence-readiness-page" id="top">
      <ToolHero
        current="ESG Evidence Readiness Check"
        deck="Check whether one ESG document actually supports the answer you want to give by reviewing statement fit, entity, scope, period, source, validity and traceability."
        eyebrow="ESG EVIDENCE READINESS"
        flow="Statement -> entity -> scope -> period -> source -> validity -> confirmation"
        title="Is this ESG evidence actually usable?"
      />
      <div className="site-shell py-12 sm:py-16" id="tool-start">
        <EsgEvidenceReadinessTool locale="en" />
      </div>
      <Bridge
        body="Working through a customer ESG request and unsure whether your evidence supports the answer? Send us the request and the evidence list you are considering."
        cta="Send the ESG request"
        serviceHref="/en/esg-questionnaire-support"
        serviceLabel="Get questionnaire support"
      />
    </main>
  );
}

export function EnglishScope12DataCollectionGuide() {
  return (
    <main className="scope12-data-page" id="top">
      <ToolHero
        current="Scope 1 & 2 Data Collection Template"
        deck="Collect electricity, fuel, vehicle, refrigerant, process-emission and purchased-energy activity data by site, period, unit and source before applying emission factors."
        eyebrow="SCOPE 1 & 2 DATA COLLECTION"
        flow="Boundary -> sites -> activity data -> unit -> period -> source -> gaps -> review -> calculation"
        title="Collect the data you need for Scope 1 and Scope 2."
      />
      <section className="bg-ink py-14 text-white sm:py-16">
        <div className="site-shell grid gap-8 lg:grid-cols-[0.58fr_1.42fr] lg:gap-16">
          <div>
            <ClipboardList aria-hidden="true" className="h-9 w-9 text-orange" />
            <h2 className="font-display mt-5 max-w-[14ch] text-[clamp(2.4rem,4.8vw,4.5rem)] leading-none">
              Activity data first. CO2e later.
            </h2>
          </div>
          <p className="max-w-3xl text-lg leading-8 text-white/70">
            This workspace helps you collect and structure activity data. It does
            not apply emission factors, calculate a verified carbon footprint or
            certify a Scope 1 and Scope 2 inventory.
          </p>
        </div>
      </section>
      <section className="site-shell py-14 sm:py-16 lg:py-20" id="tool-start">
        <EnglishScope12DataCollectionTool />
      </section>
      <Bridge
        body="Need the Scope 1 & 2 calculation after collecting the data? Send us the request and the collected source data so the calculation method, factors and assumptions can be reviewed."
        cta="Send the Scope 1 & 2 request"
        serviceHref="/en/scope-1-2-calculation"
        serviceLabel="Scope 1 & 2 calculation service"
      />
    </main>
  );
}
