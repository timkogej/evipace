import Image from "next/image";
import Link from "next/link";
import { publicContactEmail } from "@/lib/company-info";
import { evipaceImages } from "@/lib/evipace-images";
import {
  aboutToneBorder,
  aboutToneClass,
  AboutSection,
  HairlineList,
  NumberedRows,
  Rise
} from "./about/AboutComposition";
import { ButtonLink } from "./ButtonLink";

const SEND_REQUEST_HREF = "/en/send-request";

const founder = {
  name: "Tim Kogej",
  role: "Founder & Managing Director",
  location: "Slovenia"
};

const requestedInformation = [
  "energy and emissions",
  "employees",
  "policies",
  "certificates",
  "environmental management",
  "supply chains",
  "company processes",
  "supporting evidence"
];

const sourceLocations = [
  ["Invoice", "one required figure"],
  ["Quality management", "a certificate"],
  ["HR", "employee data"],
  ["Management", "a business practice"],
  ["Spreadsheet", "consumption data"]
];

const speedPrinciples = [
  "structure requirements",
  "identify existing company data",
  "connect source documents",
  "prepare traceable calculations",
  "organise supporting evidence",
  "make open questions visible",
  "make ESG information reusable"
];

const practicalNeeds = [
  "a customer requests sustainability information",
  "a supplier questionnaire needs to be completed",
  "EcoVadis or IntegrityNext needs to be prepared",
  "Scope 1 and Scope 2 figures are required",
  "a voluntary sustainability report needs to be developed",
  "ESG policies and supporting evidence need to be organised"
];

const industrialInputs = [
  "energy use",
  "fuels",
  "production processes",
  "materials",
  "quality systems",
  "certificates",
  "employees",
  "suppliers",
  "customer requirements",
  "real operational practices"
];

const industries = [
  "Machinery",
  "Metalworking",
  "Automotive suppliers",
  "Plastics",
  "Electronics",
  "Component manufacturing",
  "Other industrial B2B companies"
];

const markets = [
  "Slovenia",
  "Germany and Austria",
  "Italy",
  "Southeast Europe"
];

const reusableData = [
  "energy and consumption data",
  "emissions calculations",
  "company information",
  "policies",
  "certificates",
  "evidence",
  "methods",
  "sources",
  "responsibilities"
];

const methodologyPrinciples = [
  {
    title: "Source before statement.",
    body: "Material information should be connected to real company data where relevant."
  },
  {
    title: "Gap before invention.",
    body: "Missing information is made visible rather than replaced with a plausible claim."
  },
  {
    title: "Draft before approval.",
    body: "A policy prepared by Evipace only becomes a company policy once it has been reviewed and formally adopted by the company."
  },
  {
    title: "Technology as a tool.",
    body: "Digital and AI-assisted tools can support the preparation process. They do not replace responsibility or human review."
  },
  {
    title: "Traceability before perfect presentation.",
    body: "The result should not only look complete. It should be possible to understand how it was produced."
  }
];

const responsibilityPoints = [
  "what is required",
  "what already exists",
  "what Evipace prepares",
  "what remains missing",
  "what the company itself needs to confirm"
];

const boundaries = [
  "We do not issue ESG certifications.",
  "We do not replace independent assurance.",
  "We do not guarantee a particular EcoVadis result, IntegrityNext status, customer decision or other third-party outcome.",
  "We do not present company practices or evidence as existing when they do not."
];

const workingPrinciples = [
  {
    number: "01",
    title: "Start with the actual task.",
    body: "Not every company needs a complete ESG strategy first. Sometimes a customer needs an answer, a Scope 1 figure needs to be calculated, a questionnaire has to be completed or a usable ESG data foundation needs to be built. That is where we start."
  },
  {
    number: "02",
    title: "Use what already exists.",
    body: "Before creating new processes, documents or systems, we look at the information the company already has. The problem is often not that everything is missing. What is missing is the structure connecting it."
  },
  {
    number: "03",
    title: "Make it traceable, not perfectly staged.",
    body: "Missing information remains missing information. A draft is not yet an adopted company policy. An estimate remains an estimate. Evidence should only support what it can genuinely demonstrate."
  }
];

export function EnglishAboutPage() {
  return (
    <main className="about-page">
      <section
        aria-labelledby="about-title"
        className="about-hero relative isolate overflow-hidden"
        id="top"
      >
        <span aria-hidden="true" className="about-ghost">
          EVIPACE
        </span>
        <div className="site-shell relative z-10">
          <Rise>
            <p className="eyebrow">About Evipace</p>
            <h1 className="about-h1 font-display mt-6" id="about-title">
              ESG should not become more complicated than the task itself.
            </h1>
          </Rise>

          <div className="mt-12 grid gap-x-16 gap-y-10 sm:mt-14 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)]">
            <Rise step={1}>
              <div className="about-body text-muted">
                <p>
                  Evipace is a Slovenia-based ESG service provider that helps
                  manufacturing companies and their suppliers prepare the ESG
                  data, documentation and evidence their customers and supply
                  chains ask for.
                </p>
                <p>
                  Evipace was created to give manufacturing companies a
                  practical alternative between large ESG consulting projects
                  and self-service software.
                </p>
                <p>
                  When a customer asks for ESG data, a questionnaire needs to be
                  completed or emissions figures are missing, the result should
                  not be another full-time project.
                </p>
              </div>
              <p className="about-quote mt-7 border-l-2 border-orange pl-5 text-ink">
                There should be a clearly defined task — and a structured way
                to get it done.
              </p>
            </Rise>

            <Rise step={2}>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-orange">
                From request to result
              </p>
              <div className="mt-5 border-t border-[rgba(21,21,21,0.14)]">
                {[
                  ["01", "Concrete requirement"],
                  ["02", "Existing information"],
                  ["03", "Usable result"]
                ].map(([number, label]) => (
                  <div
                    className="grid grid-cols-[2.25rem_1fr] items-baseline gap-4 border-b border-[rgba(21,21,21,0.1)] py-4"
                    key={number}
                  >
                    <span className="font-mono text-[0.68rem] font-bold text-orange">
                      {number}
                    </span>
                    <span className="font-display text-xl text-ink sm:text-2xl">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </Rise>
          </div>
        </div>
      </section>

      <AboutSection
        eyebrow="Origin"
        heading="Why Evipace exists."
        id="why"
        tone="paper"
      >
        <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <Rise>
            <p className="about-body text-muted">
              The idea behind Evipace started with a simple observation:
            </p>
            <p className="about-statement about-statement--wide font-display mt-4 text-ink">
              ESG requirements from larger companies are reaching smaller
              suppliers — but the resources to deal with them do not
              automatically follow.
            </p>
            <div className="about-body mt-6 text-muted">
              <p>
                A large corporation may have sustainability teams, dedicated
                systems and external advisers. For a smaller or mid-sized
                manufacturer, the reality is often very different.
              </p>
              <p>
                There may be no dedicated ESG department to take ownership of
                the task. Instead, it gets spread across management, quality,
                finance, HR, purchasing and operations.
              </p>
            </div>
          </Rise>

          <Rise
            className="border-l border-[rgba(21,21,21,0.13)] pl-6 sm:pl-9"
            step={1}
          >
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-orange">
              Suddenly required
            </p>
            <div className="mt-5">
              <HairlineList items={requestedInformation} split />
            </div>
          </Rise>
        </div>

        <Rise
          className="mt-12 border-t border-[rgba(21,21,21,0.14)] pt-9 sm:mt-14"
          step={2}
        >
          <p className="about-statement about-statement--wide font-display text-ink">
            The information may already exist. It simply does not exist in
            the form the questionnaire expects.
          </p>
          <div className="mt-8 grid gap-x-8 border-y border-[rgba(21,21,21,0.1)] sm:grid-cols-2 lg:grid-cols-5">
            {sourceLocations.map(([source, information], index) => (
              <div
                className={`py-5 ${index > 0 ? "sm:border-l sm:border-[rgba(21,21,21,0.1)] sm:pl-6" : ""}`}
                key={source}
              >
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-orange">
                  {source}
                </p>
                <p className="mt-2.5 text-sm font-semibold leading-6 text-muted">
                  {information}
                </p>
              </div>
            ))}
          </div>
          <p className="about-body mt-7 text-muted">
            All of those separate pieces eventually need to become one
            consistent ESG response.
          </p>
        </Rise>
      </AboutSection>

      <AboutSection
        eyebrow="Positioning"
        heading="Something was missing between consulting and software."
        tone="surface"
      >
        <Rise className="max-w-3xl space-y-5 text-lg leading-8 text-muted">
          <p>
            Companies facing a concrete ESG requirement often find two broad
            types of solution.
          </p>
        </Rise>

        <div className="mt-10 grid border-y border-[rgba(21,21,21,0.13)] lg:grid-cols-3">
          <Rise className="py-9 lg:pr-9">
            <p className="text-xs font-bold uppercase text-orange">
              Consulting projects
            </p>
            <p className="mt-5 font-display text-3xl leading-tight text-ink">
              Useful for strategy, transformation and long-term governance.
            </p>
            <p className="mt-5 leading-7 text-muted">
              But not every ESG task requires a multi-month consulting
              engagement.
            </p>
          </Rise>

          <Rise
            className="border-y border-[rgba(21,21,21,0.13)] bg-[var(--soft-orange)] px-0 py-9 sm:px-9 lg:border-x lg:border-y-0"
            step={1}
          >
            <p className="text-xs font-bold uppercase text-orange">Evipace</p>
            <p className="mt-5 font-display text-3xl leading-tight text-ink">
              Help prepare the actual ESG work and move it toward a usable
              result.
            </p>
          </Rise>

          <Rise className="py-9 lg:pl-9" step={2}>
            <p className="text-xs font-bold uppercase text-orange">
              Software platforms
            </p>
            <p className="mt-5 font-display text-3xl leading-tight text-ink">
              Helpful for organising data and supporting workflows.
            </p>
            <p className="mt-5 leading-7 text-muted">
              But finding data, interpreting questions, matching documents,
              calculating metrics and resolving gaps may still remain with
              the company.
            </p>
          </Rise>
        </div>

        <Rise className="mt-12 max-w-4xl space-y-4 text-xl leading-8 text-muted">
          <p className="font-display text-4xl text-ink">
            Evipace was built for the space between the two.
          </p>
          <p>Not simply to advise companies on what they should do.</p>
          <p>
            And not simply to provide software and leave the execution with
            them.
          </p>
        </Rise>
      </AboutSection>

      <AboutSection
        eyebrow="Brand idea"
        heading="ESG, done faster."
        id="how-we-work"
        tone="dark"
      >
        <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
          <Rise>
            <p className="about-body text-white/70">
              The Evipace name reflects a simple ambition:
            </p>
            <p className="about-statement about-statement--wide font-display mt-4 text-white">
              Complex ESG requirements should be faster to handle without
              becoming less traceable.
            </p>
            <p className="about-body mt-6 text-white/70">
              Speed does not come from skipping steps. It comes from a better
              process.
            </p>
            <p className="about-quote mt-6 border-l-2 border-orange pl-5 text-white">
              Faster does not mean more superficial. It means more structured.
            </p>
          </Rise>

          <Rise className="border-t border-white/15" step={1}>
            <NumberedRows dark items={speedPrinciples} />
          </Rise>
        </div>
      </AboutSection>

      <AboutSection
        eyebrow="Founder"
        heading="Founded on practical work."
        id="founder"
        tone="soft"
      >
        <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,0.66fr)_minmax(0,1.34fr)]">
          <Rise className="self-start">
            <p className="about-signature__name font-display text-ink">
              {founder.name}
            </p>
            <p className="about-signature__role mt-4">{founder.role}</p>
            <p className="mt-2 text-sm font-semibold text-muted">
              {founder.location}
            </p>
          </Rise>

          <Rise step={1}>
            <div className="about-body text-muted">
              <p>
                Tim Kogej founded Evipace with the goal of making ESG work more
                practical, understandable and accessible for smaller and
                mid-sized companies.
              </p>
              <p>
                The starting point is not how much a company can say about ESG.
                It is a more practical question:
              </p>
            </div>
            <p className="about-statement about-statement--wide font-display mt-5 text-ink">
              How do you turn a concrete ESG requirement into a manageable
              piece of work?
            </p>
            <div className="about-body mt-5 text-muted">
              <p>
                Evipace is being built at the intersection of structured data,
                technology and specialist ESG work. The ambition is to
                translate complex requirements into clear working processes
                and support companies where ESG requirements turn into actual
                operational work.
              </p>
              <p>
                Where a project requires additional specialist knowledge, the
                working model is designed to involve appropriate external
                expertise when needed.
              </p>
            </div>
            <p className="about-quote mt-6 border-l-2 border-orange pl-5 text-ink">
              The quality of an outcome should not depend on one person
              claiming to know everything. It should depend on using the
              right method and the right expertise for the task.
            </p>
          </Rise>
        </div>
      </AboutSection>

      <AboutSection
        eyebrow="Principles"
        heading="What we want to do differently."
        tone="surface"
      >
        <div className="grid border-t border-[rgba(21,21,21,0.14)] lg:grid-cols-3">
          {workingPrinciples.map((principle, index) => (
            <Rise
              className={`border-b border-[rgba(21,21,21,0.14)] py-8 lg:px-8 ${index === 0 ? "lg:pl-0" : "lg:border-l"}`}
              key={principle.number}
              step={index as 0 | 1 | 2}
            >
              <p className="font-mono text-[0.68rem] font-bold text-orange">
                {principle.number}
              </p>
              <h3 className="about-h3 font-display mt-4 text-ink">
                {principle.title}
              </h3>
              <p className="about-body mt-4 text-muted">{principle.body}</p>
            </Rise>
          ))}
        </div>
        <Rise className="mt-8" step={1}>
          <p className="about-quote text-ink">
            ESG work does not become more credible by hiding uncertainty.
          </p>
        </Rise>
      </AboutSection>

      <AboutSection
        eyebrow="Service model"
        heading="Practical ESG execution for manufacturing companies."
        tone="paper"
      >
        <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
          <Rise>
            <div className="about-body text-muted">
              <p>
                Evipace focuses on ESG tasks that arise from real business
                relationships.
              </p>
              <p>
                We do not treat every one of these as a completely separate
                universe. Many of them depend on the same underlying company
                information.
              </p>
            </div>
            <p className="about-statement about-statement--wide font-display mt-4 text-ink">
              What is organised for one customer today can become the
              starting point for the next requirement tomorrow.
            </p>
            <div className="about-body mt-6 text-muted">
              <p>
                In practice that usually means{" "}
                <Link className="orange-link" href="/en/esg-customer-requests">
                  customer ESG requests
                </Link>
                ,{" "}
                <Link
                  className="orange-link"
                  href="/en/esg-questionnaire-support"
                >
                  supplier questionnaires
                </Link>
                ,{" "}
                <Link className="orange-link" href="/en/ecovadis-support">
                  EcoVadis
                </Link>{" "}
                and{" "}
                <Link className="orange-link" href="/en/integritynext-support">
                  IntegrityNext
                </Link>{" "}
                preparation,{" "}
                <Link className="orange-link" href="/en/scope-1-2-calculation">
                  Scope 1 and Scope 2 calculations
                </Link>{" "}
                and{" "}
                <Link
                  className="orange-link"
                  href="/en/vsme-sustainability-report"
                >
                  VSME sustainability reporting
                </Link>
                .
              </p>
            </div>
            <div className="mt-6">
              <Link className="orange-link" href="/en#services">
                Explore our services
              </Link>
            </div>
          </Rise>

          <Rise
            className="border-l border-[rgba(21,21,21,0.14)] pl-6 sm:pl-9"
            step={1}
          >
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-orange">
              For example, when
            </p>
            <div className="mt-5">
              <HairlineList items={practicalNeeds} />
            </div>
          </Rise>
        </div>
      </AboutSection>

      <section
        aria-labelledby="manufacturing-title"
        className={`border-t ${aboutToneBorder.surface} ${aboutToneClass.surface}`}
        id="focus"
      >
        <div className="relative min-h-[20rem] overflow-hidden sm:min-h-[25rem]">
          <Image
            alt="Modern European manufacturing facility"
            className="object-cover object-[64%_50%]"
            fill
            quality={86}
            sizes="100vw"
            src={evipaceImages.industrialBreak.src}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,15,15,0.88)_0%,rgba(15,15,15,0.66)_44%,rgba(15,15,15,0.12)_78%)]" />
          <div className="site-shell relative z-10 flex min-h-[20rem] items-end py-12 sm:min-h-[25rem] sm:py-14">
            <Rise className="max-w-2xl text-white">
              <p className="eyebrow">Manufacturing</p>
              <h2
                className="about-h2 font-display mt-5 text-white"
                id="manufacturing-title"
              >
                Why manufacturing?
              </h2>
              <p className="about-lead mt-5 text-white/78">
                For a manufacturer or industrial supplier, ESG is rarely an
                isolated communications exercise. It is connected directly
                to the way the business operates.
              </p>
            </Rise>
          </div>
        </div>

        <div className="about-section site-shell">
          <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
            <Rise>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-orange">
                Connected to
              </p>
              <div className="mt-5">
                <HairlineList items={industrialInputs} split />
              </div>
            </Rise>
            <Rise step={1}>
              <p className="about-statement about-statement--wide font-display text-ink">
                That is why Evipace is particularly focused on companies that
                make things.
              </p>
              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
                {industries.map((industry) => (
                  <span
                    className="border-b border-[rgba(21,21,21,0.18)] pb-2 text-sm font-semibold text-muted"
                    key={industry}
                  >
                    {industry}
                  </span>
                ))}
              </div>
              <p className="about-quote mt-7 text-ink">
                ESG has to work alongside production, quality, delivery
                deadlines and day-to-day operations — not outside them.
              </p>
            </Rise>
          </div>
        </div>
      </section>

      <AboutSection
        eyebrow="Location and markets"
        heading="Founded in Slovenia. Built for European supply chains."
        id="location-markets"
        tone="paper"
      >
        <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)]">
          <Rise>
            <div className="border-t border-[rgba(21,21,21,0.14)] pt-6">
              <p className="font-display text-3xl text-ink">Slovenia</p>
              <p className="mt-2 text-sm font-semibold leading-6 text-muted">
                Where Evipace was founded
              </p>
            </div>
            <p className="mt-7 text-xs font-bold uppercase tracking-[0.14em] text-orange">
              Initial focus
            </p>
            <div className="mt-4">
              <HairlineList items={markets} />
            </div>
          </Rise>

          <Rise step={1}>
            <div className="about-body text-muted">
              <p>
                Evipace was founded in Slovenia and is being built from the
                beginning for companies operating within European supply
                chains.
              </p>
              <p>
                As the service develops, Evipace is intended to support
                companies across additional European markets as well.
              </p>
            </div>
            <p className="about-statement about-statement--wide font-display mt-4 text-ink">
              Supply chains are international. ESG work has to reflect that
              reality.
            </p>
            <div className="about-body mt-5 text-muted">
              <p>
                A manufacturer in Slovenia may supply a German customer. An
                Austrian buyer may request data from a supplier in Italy. A
                European platform may require information across several
                operating locations.
              </p>
            </div>
          </Rise>
        </div>
      </AboutSection>

      <AboutSection
        eyebrow="Data foundation"
        heading="A company should not have to start from zero with every ESG request."
        id="data-foundation"
        tone="surface"
      >
        <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)]">
          <Rise>
            <p className="about-body text-muted">
              Completing one request is useful.
            </p>
            <p className="about-statement about-statement--wide font-display mt-4 text-ink">
              Building a better foundation for the next one is more valuable.
            </p>
            <div className="about-body mt-6 text-muted">
              <p>
                That is why we do not think of ESG work only as a sequence of
                isolated documents. We think about the underlying data.
              </p>
              <p>
                The more structured this information becomes, the easier it is
                to reuse: for another customer, another platform, a report or
                the next internal decision.
              </p>
              <p>
                Our{" "}
                <Link className="orange-link" href="/en/resources">
                  practical ESG guides for suppliers
                </Link>{" "}
                set out how that foundation can be built in-house.
              </p>
            </div>
          </Rise>

          <Rise
            className="border-l border-[rgba(21,21,21,0.13)] pl-6 sm:pl-9"
            step={1}
          >
            <HairlineList items={reusableData} split />
          </Rise>
        </div>
      </AboutSection>

      <AboutSection
        eyebrow="Trust"
        heading="How we work."
        id="methodology"
        tone="dark"
      >
        <Rise>
          <p className="about-body text-white/70">
            With ESG work, the final output is only part of the story.
          </p>
          <p className="about-statement about-statement--wide font-display mt-4 text-white">
            How that output was prepared matters too.
          </p>
          <p className="about-body mt-5 text-white/70">
            Our methodology is therefore built around a few straightforward
            principles.
          </p>
        </Rise>

        <div className="mt-10 grid border-t border-white/15 lg:grid-cols-5">
          {methodologyPrinciples.map((principle, index) => (
            <Rise
              className={`border-b border-white/15 py-6 lg:px-6 ${index > 0 ? "lg:border-l" : "lg:pl-0"}`}
              key={principle.title}
              step={(index % 3) as 0 | 1 | 2}
            >
              <h3 className="font-display text-xl leading-tight text-white">
                {principle.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-white/64">
                {principle.body}
              </p>
            </Rise>
          ))}
        </div>

        <Rise className="mt-8" step={1}>
          <Link className="orange-link text-white" href="/en/methodology">
            Our methodology
          </Link>
        </Rise>
      </AboutSection>

      <AboutSection
        eyebrow="Working together"
        heading="Direct contact. A clear working process."
        tone="paper"
      >
        <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)]">
          <Rise>
            <div className="about-body text-muted">
              <p>
                Evipace is intentionally being built as a focused specialist
                service.
              </p>
              <p>
                That means avoiding unnecessary layers of consulting, overly
                complicated project structures and self-service models that
                ultimately leave the work with the customer.
              </p>
              <p>
                Where specialist expertise is required, appropriate external
                expertise can be involved when relevant to the engagement.
              </p>
            </div>
            <p className="about-quote mt-6 text-ink">
              The structure should remain clear even when the underlying task
              is complex.
            </p>
          </Rise>

          <Rise
            className="border-l border-[rgba(21,21,21,0.14)] pl-6 sm:pl-9"
            step={1}
          >
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-orange">
              Clarity about
            </p>
            <div className="mt-5">
              <HairlineList items={responsibilityPoints} />
            </div>
          </Rise>
        </div>
      </AboutSection>

      <AboutSection
        eyebrow="Boundaries"
        heading="What Evipace does not want to become."
        id="boundaries"
        tone="surface"
      >
        <div className="grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,0.98fr)_minmax(0,1.02fr)]">
          <Rise>
            <div className="about-body text-muted">
              <p>
                Evipace was not created to cover every sustainability topic for
                every possible company. Nor is the goal to become the broadest
                ESG generalist.
              </p>
            </div>
            <p className="about-statement about-statement--wide font-display mt-4 text-ink">
              The focus is more specific: helping companies deal with real
              ESG requirements in a structured way.
            </p>
          </Rise>

          <Rise
            className="border-l border-[rgba(21,21,21,0.14)] pl-6 sm:pl-9"
            step={1}
          >
            <HairlineList items={boundaries} muted />
          </Rise>
        </div>

        <Rise
          className="mt-12 border-t border-[rgba(21,21,21,0.14)] pt-8"
          step={2}
        >
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-orange">
            Our standard
          </p>
          <p className="about-statement about-statement--wide font-display mt-4 text-ink">
            Careful work, clear sources, visible gaps and a traceable process.
          </p>
        </Rise>
      </AboutSection>

      <section
        className={`about-section border-t ${aboutToneBorder.paper} ${aboutToneClass.paper}`}
      >
        <div className="site-shell grid gap-x-14 gap-y-10 lg:grid-cols-[minmax(0,0.74fr)_minmax(0,1.26fr)]">
          <Rise>
            <p className="eyebrow">Direction</p>
            <h2 className="about-h2 font-display mt-5 text-ink">
              Evipace will grow with the requirements its customers face.
            </h2>
            <p className="about-plate mt-9 font-display text-3xl leading-tight text-ink">
              Relevance before breadth.
            </p>
          </Rise>
          <Rise step={1}>
            <div className="about-body text-muted">
              <p>
                ESG changes. Standards develop. Customers ask for new
                information. Companies need new forms of data.
              </p>
              <p>
                Evipace will evolve with those requirements. New services,
                methods and markets should be added where they genuinely help
                manufacturing companies deal with the ESG work reaching them.
              </p>
            </div>
            <p className="about-statement about-statement--wide font-display mt-5 text-ink">
              Reduce complexity without pretending to have more certainty
              than the data supports. Take on practical work rather than only
              advising what should be done. Turn scattered information into a
              usable, traceable foundation.
            </p>
          </Rise>
        </div>
      </section>

      <section className="bg-[var(--soft-orange)] py-20 sm:py-28">
        <div className="site-shell max-w-5xl">
          <Rise>
            <p className="eyebrow">Contact</p>
            <h2 className="about-cta-heading font-display mt-5">
              Already have an ESG requirement on your desk?
            </h2>
            <div className="about-lead mt-6 space-y-4 text-[rgba(21,21,21,0.7)]">
              <p>
                You do not need to work out which service category it belongs
                to first.
              </p>
              <p>
                Send us the request, questionnaire or a short description of
                the task. We will review what is required and how we can help
                structure the work.
              </p>
            </div>
            <div className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <ButtonLink href={SEND_REQUEST_HREF}>Send your ESG request</ButtonLink>
              <a className="orange-link" href={`mailto:${publicContactEmail}`}>
                {publicContactEmail}
              </a>
            </div>
            <p className="mt-7 text-sm font-semibold leading-7 text-[rgba(21,21,21,0.62)]">
              Customer request · Questionnaire · Emissions · Reporting ·
              Evidence
            </p>
          </Rise>
        </div>
      </section>
    </main>
  );
}
