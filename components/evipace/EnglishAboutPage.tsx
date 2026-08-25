import type { ReactNode } from "react";
import {
  CheckCircle2,
  Factory,
  FileCheck2,
  Layers3,
  MapPin,
  MinusCircle
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { publicContactEmail } from "@/lib/company-info";
import { evipaceImages } from "@/lib/evipace-images";
import {
  BoundariesBackgroundGraphic,
  DataFoundationBackgroundGraphic,
  EuropeBackgroundGraphic,
  OriginBackgroundGraphic,
  SpeedBackgroundGraphic
} from "./AboutSectionDecorations";
import { ButtonLink } from "./ButtonLink";
import { Reveal } from "./Reveal";

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
    body: "A policy prepared by evipace only becomes a company policy once it has been reviewed and formally adopted by the company."
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
  "what evipace prepares",
  "what remains missing",
  "what the company itself needs to confirm"
];

const boundaries = [
  "We do not issue ESG certifications.",
  "We do not replace independent assurance.",
  "We do not guarantee a particular EcoVadis result, IntegrityNext status, customer decision or other third-party outcome.",
  "We do not present company practices or evidence as existing when they do not."
];

type SectionTone = "paper" | "warm" | "dark";

type SectionProps = {
  id?: string;
  eyebrow: string;
  heading: string;
  children: ReactNode;
  tone?: SectionTone;
  className?: string;
  decoration?: ReactNode;
};

function Section({
  id,
  eyebrow,
  heading,
  children,
  tone = "paper",
  className = "",
  decoration
}: SectionProps) {
  const toneClass =
    tone === "dark"
      ? "bg-ink text-white"
      : tone === "warm"
        ? "bg-[var(--warm)] text-ink"
        : "bg-[var(--paper)] text-ink";

  return (
    <section
      className={`section-padding relative isolate overflow-hidden border-t border-[rgba(21,21,21,0.09)] ${toneClass} ${className}`}
      id={id}
    >
      {decoration}
      <div className="site-shell relative z-10">
        <Reveal className="max-w-5xl">
          <p className="eyebrow">{eyebrow}</p>
          <h2
            className={`heading-md font-display mt-6 max-w-[15ch] ${tone === "dark" ? "text-white" : "text-ink"}`}
          >
            {heading}
          </h2>
        </Reveal>
        <div className="mt-12 sm:mt-16">{children}</div>
      </div>
    </section>
  );
}

function CheckList({
  items,
  dark = false,
  columns = false
}: {
  items: string[];
  dark?: boolean;
  columns?: boolean;
}) {
  return (
    <ul className={columns ? "grid gap-3 sm:grid-cols-2" : "grid gap-3"}>
      {items.map((item) => (
        <li
          className={`flex gap-3 leading-7 ${dark ? "text-white/72" : "text-muted"}`}
          key={item}
        >
          <CheckCircle2
            aria-hidden="true"
            className="mt-1 h-4 w-4 shrink-0 text-orange"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function EnglishAboutPage() {
  return (
    <>
      <main>
        <section
          aria-labelledby="about-title"
          className="relative isolate overflow-hidden pb-16 pt-32 sm:pb-24 sm:pt-40"
          id="top"
        >
          <div className="pointer-events-none absolute right-[4vw] top-20 hidden font-display text-[12rem] leading-none text-[rgba(21,21,21,0.035)] xl:block">
            EVIPACE
          </div>
          <div className="site-shell grid items-end gap-14 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="relative z-10 max-w-5xl">
              <p className="eyebrow">About evipace</p>
              <h1
                className="heading-lg font-display mt-7 max-w-[13ch]"
                id="about-title"
              >
                ESG should not become more complicated than the task itself.
              </h1>
              <div className="body-lg mt-8 max-w-3xl space-y-5">
                <p>
                  evipace was created to give manufacturing companies a
                  practical alternative between large ESG consulting projects
                  and self-service software.
                </p>
                <p>
                  When a customer asks for ESG data, a questionnaire needs to be
                  completed or emissions figures are missing, the result should
                  not be another full-time project.
                </p>
              </div>
              <p className="mt-8 max-w-2xl border-l-2 border-orange pl-5 text-xl font-semibold leading-8 text-ink">
                There should be a clearly defined task — and a structured way
                to get it done.
              </p>
            </div>

            <Reveal
              className="relative border-y border-[rgba(21,21,21,0.14)] py-7 lg:mb-3"
              delay={0.08}
            >
              <p className="text-xs font-bold uppercase text-orange">
                From request to result
              </p>
              <div className="mt-6 grid gap-0">
                {[
                  ["01", "Concrete requirement"],
                  ["02", "Existing information"],
                  ["03", "Usable result"]
                ].map(([number, label], index) => (
                  <div
                    className={`grid grid-cols-[2.5rem_1fr] items-center gap-4 py-5 ${index > 0 ? "border-t border-[rgba(21,21,21,0.1)]" : ""}`}
                    key={number}
                  >
                    <span className="font-mono text-xs font-bold text-orange">
                      {number}
                    </span>
                    <span className="font-display text-2xl text-ink">
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <Section
          decoration={<OriginBackgroundGraphic />}
          eyebrow="Origin"
          heading="Why evipace exists."
          id="why"
          tone="warm"
        >
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <Reveal className="space-y-5 text-lg leading-8 text-muted">
              <p>The idea behind evipace started with a simple observation:</p>
              <p className="font-display text-3xl leading-tight text-ink sm:text-4xl">
                ESG requirements from larger companies are reaching smaller
                suppliers — but the resources to deal with them do not
                automatically follow.
              </p>
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
            </Reveal>

            <Reveal
              className="border-l border-[rgba(21,21,21,0.13)] pl-6 sm:pl-9"
              delay={0.08}
            >
              <p className="text-sm font-bold uppercase text-orange">
                Suddenly required
              </p>
              <div className="mt-7">
                <CheckList columns items={requestedInformation} />
              </div>
            </Reveal>
          </div>

          <Reveal className="mt-16 border-t border-[rgba(21,21,21,0.14)] pt-10 sm:mt-20 sm:pt-12">
            <p className="font-display max-w-5xl text-4xl leading-tight text-ink sm:text-5xl">
              The information may already exist. It simply does not exist in
              the form the questionnaire expects.
            </p>
            <div className="mt-10 grid gap-x-8 border-y border-[rgba(21,21,21,0.1)] sm:grid-cols-2 lg:grid-cols-5">
              {sourceLocations.map(([source, information], index) => (
                <div
                  className={`py-6 ${index > 0 ? "sm:border-l sm:border-[rgba(21,21,21,0.1)] sm:pl-6" : ""}`}
                  key={source}
                >
                  <p className="text-xs font-bold uppercase text-orange">
                    {source}
                  </p>
                  <p className="mt-3 text-sm font-semibold leading-6 text-muted">
                    {information}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-8 max-w-3xl text-lg leading-8 text-muted">
              All of those separate pieces eventually need to become one
              consistent ESG response.
            </p>
          </Reveal>
        </Section>

        <Section
          eyebrow="Positioning"
          heading="Something was missing between consulting and software."
        >
          <Reveal className="max-w-3xl space-y-5 text-lg leading-8 text-muted">
            <p>
              Companies facing a concrete ESG requirement often find two broad
              types of solution.
            </p>
          </Reveal>

          <div className="mt-10 grid border-y border-[rgba(21,21,21,0.13)] lg:grid-cols-3">
            <Reveal className="py-9 lg:pr-9">
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
            </Reveal>

            <Reveal
              className="border-y border-[rgba(21,21,21,0.13)] bg-[var(--soft-orange)] px-0 py-9 sm:px-9 lg:border-x lg:border-y-0"
              delay={0.06}
            >
              <p className="text-xs font-bold uppercase text-orange">evipace</p>
              <p className="mt-5 font-display text-3xl leading-tight text-ink">
                Help prepare the actual ESG work and move it toward a usable
                result.
              </p>
            </Reveal>

            <Reveal className="py-9 lg:pl-9" delay={0.12}>
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
            </Reveal>
          </div>

          <Reveal className="mt-12 max-w-4xl space-y-4 text-xl leading-8 text-muted">
            <p className="font-display text-4xl text-ink">
              evipace was built for the space between the two.
            </p>
            <p>Not simply to advise companies on what they should do.</p>
            <p>
              And not simply to provide software and leave the execution with
              them.
            </p>
          </Reveal>
        </Section>

        <Section
          decoration={<SpeedBackgroundGraphic />}
          eyebrow="Brand idea"
          heading="ESG, done faster."
          id="how-we-work"
          tone="dark"
        >
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <Reveal className="space-y-5 text-lg leading-8 text-white/72">
              <p>The evipace name reflects a simple ambition:</p>
              <p className="font-display text-3xl leading-tight text-white sm:text-4xl">
                Complex ESG requirements should be faster to handle without
                becoming less traceable.
              </p>
              <p>
                Speed does not come from skipping steps. It comes from a better
                process.
              </p>
              <p className="border-l-2 border-orange pl-5 text-xl font-semibold text-white">
                Faster does not mean more superficial. It means more structured.
              </p>
            </Reveal>

            <Reveal
              className="grid gap-x-8 gap-y-0 border-y border-white/15 sm:grid-cols-2"
              delay={0.08}
            >
              {speedPrinciples.map((principle, index) => (
                <div
                  className="flex min-h-20 items-center gap-4 border-b border-white/10 py-5"
                  key={principle}
                >
                  <span className="font-mono text-xs font-bold text-orange">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="font-semibold leading-6 text-white/82">
                    {principle}
                  </p>
                </div>
              ))}
            </Reveal>
          </div>
        </Section>

        <Section
          eyebrow="Founder"
          heading="Founded by Tim Kogej."
          id="founder"
          tone="warm"
        >
          <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
            <Reveal className="self-start border-y border-[rgba(21,21,21,0.14)] py-8 lg:sticky lg:top-28">
              <p className="font-display text-5xl leading-none text-ink sm:text-6xl">
                {founder.name}
              </p>
              <p className="mt-5 text-sm font-bold text-orange">
                {founder.role}
              </p>
              <div className="mt-8 flex items-center gap-3 border-t border-[rgba(21,21,21,0.1)] pt-5 text-sm font-semibold text-muted">
                <MapPin aria-hidden="true" className="h-4 w-4 text-orange" />
                <span>{founder.location}</span>
              </div>
            </Reveal>

            <Reveal
              className="max-w-3xl space-y-5 text-lg leading-8 text-muted"
              delay={0.08}
            >
              <p>
                Tim Kogej founded evipace with the goal of making ESG work more
                practical, understandable and accessible for smaller and
                mid-sized companies.
              </p>
              <p>
                The starting point is not how much a company can say about ESG.
                It is a more practical question:
              </p>
              <p className="font-display text-3xl leading-tight text-ink sm:text-4xl">
                How do you turn a concrete ESG requirement into a manageable
                piece of work?
              </p>
              <p>
                evipace is being built at the intersection of structured data,
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
              <p className="border-l-2 border-orange pl-5 font-semibold text-ink">
                The quality of an outcome should not depend on one person
                claiming to know everything. It should depend on using the
                right method and the right expertise for the task.
              </p>
            </Reveal>
          </div>
        </Section>

        <Section
          eyebrow="Principles"
          heading="What we want to do differently."
        >
          <div className="grid border-t border-[rgba(21,21,21,0.14)] lg:grid-cols-3">
            {[
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
            ].map((principle, index) => (
              <Reveal
                className={`border-b border-[rgba(21,21,21,0.14)] py-9 lg:px-8 ${index === 0 ? "lg:pl-0" : "lg:border-l"}`}
                delay={index * 0.05}
                key={principle.number}
              >
                <p className="font-mono text-xs font-bold text-orange">
                  {principle.number}
                </p>
                <h3 className="font-display mt-5 text-3xl leading-tight text-ink">
                  {principle.title}
                </h3>
                <p className="mt-5 leading-7 text-muted">{principle.body}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-10 max-w-3xl text-xl font-semibold leading-8 text-ink">
            ESG work does not become more credible by hiding uncertainty.
          </Reveal>
        </Section>

        <Section
          eyebrow="Service model"
          heading="Practical ESG execution for manufacturing companies."
          tone="warm"
        >
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <Reveal className="space-y-5 text-lg leading-8 text-muted">
              <p>
                evipace focuses on ESG tasks that arise from real business
                relationships.
              </p>
              <p>
                We do not treat every one of these as a completely separate
                universe. Many of them depend on the same underlying company
                information.
              </p>
              <p className="font-display text-3xl leading-tight text-ink">
                What is organised for one customer today can become the
                starting point for the next requirement tomorrow.
              </p>
              <div className="pt-3">
                <Link className="orange-link" href="/en#services">
                  Explore our services
                </Link>
              </div>
            </Reveal>

            <Reveal
              className="border-l border-[rgba(21,21,21,0.14)] pl-6 sm:pl-9"
              delay={0.08}
            >
              <p className="mb-7 text-sm font-bold uppercase text-orange">
                For example, when
              </p>
              <CheckList items={practicalNeeds} />
            </Reveal>
          </div>
        </Section>

        <section
          aria-labelledby="manufacturing-title"
          className="border-t border-[rgba(21,21,21,0.09)] bg-[var(--paper)]"
          id="focus"
        >
          <div className="relative min-h-[28rem] overflow-hidden sm:min-h-[34rem]">
            <Image
              alt="Modern European manufacturing facility"
              className="object-cover object-[64%_50%]"
              fill
              quality={86}
              sizes="100vw"
              src={evipaceImages.industrialBreak.src}
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(15,15,15,0.88)_0%,rgba(15,15,15,0.66)_44%,rgba(15,15,15,0.12)_78%)]" />
            <div className="site-shell relative z-10 flex min-h-[28rem] items-end py-14 sm:min-h-[34rem] sm:py-20">
              <Reveal className="max-w-2xl text-white">
                <p className="eyebrow">Manufacturing</p>
                <h2
                  className="heading-md font-display mt-6 max-w-[12ch] text-white"
                  id="manufacturing-title"
                >
                  Why manufacturing?
                </h2>
                <p className="mt-7 max-w-xl text-lg leading-8 text-white/78">
                  For a manufacturer or industrial supplier, ESG is rarely an
                  isolated communications exercise. It is connected directly
                  to the way the business operates.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="site-shell grid gap-12 py-16 sm:py-20 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <Reveal>
              <p className="text-sm font-bold uppercase text-orange">
                Connected to
              </p>
              <div className="mt-7">
                <CheckList columns items={industrialInputs} />
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="font-display text-3xl leading-tight text-ink sm:text-4xl">
                That is why evipace is particularly focused on companies that
                make things.
              </p>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
                {industries.map((industry) => (
                  <span
                    className="border-b border-[rgba(21,21,21,0.18)] pb-2 text-sm font-semibold text-muted"
                    key={industry}
                  >
                    {industry}
                  </span>
                ))}
              </div>
              <p className="mt-9 text-lg font-semibold leading-8 text-ink">
                ESG has to work alongside production, quality, delivery
                deadlines and day-to-day operations — not outside them.
              </p>
            </Reveal>
          </div>
        </section>

        <Section
          decoration={<EuropeBackgroundGraphic />}
          eyebrow="Location and markets"
          heading="Founded in Slovenia. Built for European supply chains."
          id="location-markets"
          tone="warm"
        >
          <div className="grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
            <Reveal>
              <div className="flex items-start gap-5 border-y border-[rgba(21,21,21,0.14)] py-7">
                <MapPin
                  aria-hidden="true"
                  className="mt-1 h-6 w-6 shrink-0 text-orange"
                />
                <div>
                  <p className="font-display text-3xl text-ink">Slovenia</p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-muted">
                    Where evipace was founded
                  </p>
                </div>
              </div>
              <p className="mt-8 text-sm font-bold uppercase text-orange">
                Initial focus
              </p>
              <div className="mt-5">
                <CheckList items={markets} />
              </div>
            </Reveal>

            <Reveal
              className="max-w-3xl space-y-5 text-lg leading-8 text-muted"
              delay={0.08}
            >
              <p>
                evipace was founded in Slovenia and is being built from the
                beginning for companies operating within European supply
                chains.
              </p>
              <p>
                As the service develops, evipace is intended to support
                companies across additional European markets as well.
              </p>
              <p className="font-display text-3xl leading-tight text-ink sm:text-4xl">
                Supply chains are international. ESG work has to reflect that
                reality.
              </p>
              <p>
                A manufacturer in Slovenia may supply a German customer. An
                Austrian buyer may request data from a supplier in Italy. A
                European platform may require information across several
                operating locations.
              </p>
            </Reveal>
          </div>
        </Section>

        <Section
          decoration={<DataFoundationBackgroundGraphic />}
          eyebrow="Data foundation"
          heading="A company should not have to start from zero with every ESG request."
          id="data-foundation"
        >
          <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
            <Reveal className="space-y-5 text-lg leading-8 text-muted">
              <p>Completing one request is useful.</p>
              <p className="font-display text-3xl leading-tight text-ink sm:text-4xl">
                Building a better foundation for the next one is more valuable.
              </p>
              <p>
                That is why we do not think of ESG work only as a sequence of
                isolated documents. We think about the underlying data.
              </p>
              <p>
                The more structured this information becomes, the easier it is
                to reuse: for another customer, another platform, a report or
                the next internal decision.
              </p>
            </Reveal>

            <Reveal
              className="grid gap-x-8 gap-y-0 border-y border-[rgba(21,21,21,0.14)] sm:grid-cols-2"
              delay={0.08}
            >
              {reusableData.map((item) => (
                <div
                  className="flex min-h-16 items-center gap-3 border-b border-[rgba(21,21,21,0.09)] py-4"
                  key={item}
                >
                  <Layers3
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-orange"
                  />
                  <span className="text-sm font-semibold text-muted">{item}</span>
                </div>
              ))}
            </Reveal>
          </div>
        </Section>

        <Section
          eyebrow="Trust"
          heading="How we work."
          id="methodology"
          tone="dark"
        >
          <Reveal className="max-w-3xl space-y-5 text-lg leading-8 text-white/72">
            <p>With ESG work, the final output is only part of the story.</p>
            <p className="font-display text-3xl leading-tight text-white sm:text-4xl">
              How that output was prepared matters too.
            </p>
            <p>
              Our methodology is therefore built around a few straightforward
              principles.
            </p>
          </Reveal>

          <div className="mt-12 grid border-t border-white/15 lg:grid-cols-5">
            {methodologyPrinciples.map((principle, index) => (
              <Reveal
                className={`border-b border-white/15 py-7 lg:px-6 ${index > 0 ? "lg:border-l" : "lg:pl-0"}`}
                delay={index * 0.04}
                key={principle.title}
              >
                <FileCheck2
                  aria-hidden="true"
                  className="h-5 w-5 text-orange"
                />
                <h3 className="mt-5 font-display text-2xl leading-tight text-white">
                  {principle.title}
                </h3>
                <p className="mt-4 text-sm leading-6 text-white/64">
                  {principle.body}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-10">
            <Link className="orange-link text-white" href="/en/methodology">
              Our methodology
            </Link>
          </Reveal>
        </Section>

        <Section
          eyebrow="Working together"
          heading="Direct contact. A clear working process."
          tone="warm"
        >
          <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
            <Reveal className="space-y-5 text-lg leading-8 text-muted">
              <p>
                evipace is intentionally being built as a focused specialist
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
              <p className="font-semibold text-ink">
                The structure should remain clear even when the underlying task
                is complex.
              </p>
            </Reveal>

            <Reveal
              className="border-y border-[rgba(21,21,21,0.14)] py-7"
              delay={0.08}
            >
              <p className="mb-6 text-sm font-bold uppercase text-orange">
                Clarity about
              </p>
              <CheckList items={responsibilityPoints} />
            </Reveal>
          </div>
        </Section>

        <Section
          decoration={<BoundariesBackgroundGraphic />}
          eyebrow="Boundaries"
          heading="What evipace does not want to become."
          id="boundaries"
        >
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <Reveal className="space-y-5 text-lg leading-8 text-muted">
              <p>
                evipace was not created to cover every sustainability topic for
                every possible company. Nor is the goal to become the broadest
                ESG generalist.
              </p>
              <p className="font-display text-3xl leading-tight text-ink sm:text-4xl">
                The focus is more specific: helping companies deal with real
                ESG requirements in a structured way.
              </p>
            </Reveal>

            <Reveal
              className="border-l border-[rgba(21,21,21,0.14)] pl-6 sm:pl-9"
              delay={0.08}
            >
              <ul className="grid gap-4">
                {boundaries.map((boundary) => (
                  <li className="flex gap-3 leading-7 text-muted" key={boundary}>
                    <MinusCircle
                      aria-hidden="true"
                      className="mt-1 h-4 w-4 shrink-0 text-orange"
                    />
                    <span>{boundary}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal className="mt-14 border-t border-[rgba(21,21,21,0.14)] pt-9">
            <p className="text-sm font-bold uppercase text-orange">
              Our standard
            </p>
            <p className="font-display mt-5 max-w-5xl text-4xl leading-tight text-ink sm:text-5xl">
              Careful work, clear sources, visible gaps and a traceable process.
            </p>
          </Reveal>
        </Section>

        <Section
          eyebrow="Direction"
          heading="evipace will grow with the requirements its customers face."
          tone="warm"
        >
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            <Reveal className="border-y border-[rgba(21,21,21,0.14)] py-8">
              <div className="flex items-center gap-4">
                <Factory aria-hidden="true" className="h-6 w-6 text-orange" />
                <p className="font-display text-3xl text-ink">
                  Relevance before breadth.
                </p>
              </div>
            </Reveal>
            <Reveal
              className="max-w-3xl space-y-5 text-lg leading-8 text-muted"
              delay={0.08}
            >
              <p>
                ESG changes. Standards develop. Customers ask for new
                information. Companies need new forms of data.
              </p>
              <p>
                evipace will evolve with those requirements. New services,
                methods and markets should be added where they genuinely help
                manufacturing companies deal with the ESG work reaching them.
              </p>
              <p className="font-display text-3xl leading-tight text-ink sm:text-4xl">
                Reduce complexity without pretending to have more certainty
                than the data supports. Take on practical work rather than only
                advising what should be done. Turn scattered information into a
                usable, traceable foundation.
              </p>
            </Reveal>
          </div>
        </Section>

        <section className="relative isolate overflow-hidden bg-[var(--soft-orange)] py-20 sm:py-28">
          <div className="site-shell relative z-10 max-w-5xl">
            <Reveal>
              <p className="eyebrow">Contact</p>
              <h2 className="font-display mt-6 max-w-[13ch] text-5xl leading-none sm:text-6xl lg:text-7xl">
                Already have an ESG requirement on your desk?
              </h2>
              <div className="mt-7 max-w-2xl space-y-4 text-xl leading-8 text-[rgba(21,21,21,0.68)]">
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
                <ButtonLink href={SEND_REQUEST_HREF}>
                  Send your ESG request
                </ButtonLink>
                <a
                  className="orange-link"
                  href={`mailto:${publicContactEmail}`}
                >
                  {publicContactEmail}
                </a>
              </div>
              <p className="mt-7 text-sm font-semibold leading-7 text-[rgba(21,21,21,0.62)]">
                Customer request · Questionnaire · Emissions · Reporting ·
                Evidence
              </p>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}
