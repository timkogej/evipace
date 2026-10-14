import type { ReactNode } from "react";
import { CheckCircle2, MinusCircle } from "lucide-react";
import h from "../HomeLandingPage.module.css";
import { RevealOnView } from "../home/RevealOnView";
import m from "./Methodology.module.css";

/**
 * Shared layout for the English and German Methodology pages, in the same
 * centred style as the homepage. The page files keep their own copy and data;
 * these parts only decide how it is laid out.
 */

/** Settles into place once on screen; visible without JavaScript. */
export function Rise({
  children,
  className = ""
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return <RevealOnView className={className}>{children}</RevealOnView>;
}

type Tone = "light" | "warm" | "paper" | "dark";

const bandTone: Record<Tone, string> = {
  light: m.band,
  warm: `${m.band} ${m.bandTinted}`,
  paper: `${m.band} ${m.bandTinted}`,
  dark: `${m.band} ${m.bandDark}`
};

export function Section({
  eyebrow,
  heading,
  children,
  id,
  intro,
  detailsLabel,
  collapsible = false,
  tone = "light"
}: {
  eyebrow?: string;
  heading: string;
  children: ReactNode;
  id?: string;
  /** Kept for the page files' call sites; photos are no longer used. */
  image?: "process" | "emissions";
  intro?: ReactNode;
  detailsLabel?: string;
  collapsible?: boolean;
  tone?: Tone;
}) {
  if (collapsible) {
    return (
      <section className={`${m.band} ${m.bandCompact}`} id={id}>
        <div className={h.shell}>
          <details className={m.disclosure}>
            <summary className={m.disclosureSummary}>
              <span className={m.disclosureText}>
                {eyebrow ? <span className={h.eyebrow}>{eyebrow}</span> : null}
                <h2 className={m.disclosureTitle}>{heading}</h2>
              </span>
              <span aria-hidden="true" className={m.toggle} />
            </summary>
            <div className={m.disclosureBody}>{children}</div>
          </details>
        </div>
      </section>
    );
  }

  return (
    <section className={bandTone[tone]} id={id}>
      <div className={h.shell}>
        <Rise className={m.head}>
          {eyebrow ? <p className={h.eyebrow}>{eyebrow}</p> : null}
          <h2 className={h.heading}>{heading}</h2>
        </Rise>
        {intro ? <div className={m.intro}>{intro}</div> : null}
        <div className={m.content}>
          {detailsLabel ? (
            <details className={m.deepDive}>
              <summary>
                {detailsLabel}
                <span aria-hidden="true" className={m.toggle} />
              </summary>
              <div className={m.deepDiveBody}>{children}</div>
            </details>
          ) : (
            children
          )}
        </div>
      </div>
    </section>
  );
}

export function CheckList({
  items,
  variant = "lines"
}: {
  items: string[];
  dark?: boolean;
  variant?: "lines" | "checks";
}) {
  return (
    <ul className={`${m.list} ${variant === "checks" ? m.listChecks : m.listLines}`}>
      {items.map((item) => (
        <li className={m.listItem} key={item}>
          {variant === "checks" ? (
            <CheckCircle2 aria-hidden="true" className={m.checkIcon} />
          ) : null}
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function LimitList({ items }: { items: string[] }) {
  return (
    <ul className={m.list}>
      {items.map((item) => (
        <li className={m.listItem} key={item}>
          <MinusCircle aria-hidden="true" className={m.limitIcon} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function MethodHero({
  eyebrow,
  title,
  lead,
  jumpLabel,
  jumps
}: {
  eyebrow: string;
  title: string;
  lead: string;
  jumpLabel: string;
  jumps: Array<{ id: string; label: string }>;
}) {
  return (
    <section aria-labelledby="methodology-title" className={`${h.hero} ${h.pageHero}`} id="top">
      <div className={`${h.shell} ${h.heroGrid}`}>
        <div className={h.heroCopy}>
          <p className={h.eyebrow}>{eyebrow}</p>
          <h1 className={`${h.display} ${m.title}`} id="methodology-title">{title}</h1>
          <p className={h.heroBody}>{lead}</p>
          <nav aria-label={jumpLabel} className={h.jump}>
            {jumps.map((jump) => (
              <a className={h.jumpLink} href={`#${jump.id}`} key={jump.id}>
                {jump.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}

export function MethodOverview({
  eyebrow,
  title,
  steps
}: {
  eyebrow: string;
  title: string;
  steps: Array<{ label: string; body: string }>;
}) {
  return (
    <section aria-labelledby="methodology-overview-title" className={m.band}>
      <div className={h.shell}>
        <Rise className={m.head}>
          <p className={h.eyebrow}>{eyebrow}</p>
          <h2 className={h.heading} id="methodology-overview-title">{title}</h2>
        </Rise>
        <ol className={`${h.steps} ${m.overview}`}>
          {steps.map((step, index) => (
            <li className={h.step} key={step.label} style={{ "--i": index } as React.CSSProperties}>
              <span aria-hidden="true" className={h.stepNumber}>{index + 1}</span>
              <h3 className={h.cardTitle}>{step.label}</h3>
              <p>{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

type ProjectStep = {
  number: string;
  title: string;
  body: string;
  items?: string[];
  closing?: string;
};

export function ProcessSteps({ intro, steps }: { intro: string; steps: ProjectStep[] }) {
  return (
    <>
      <p className={m.stepsIntro}>{intro}</p>
      <div className={m.steps}>
        {steps.map((step) => (
          <details className={m.step} key={step.title}>
            <summary className={m.stepSummary}>
              <span className={m.stepNumber}>{step.number}</span>
              <span className={m.stepText}>
                <span className={m.stepTitle}>{step.title}</span>
                <span className={m.stepBody}>{step.body}</span>
              </span>
              <span aria-hidden="true" className={m.toggle} />
            </summary>
            <div className={m.stepDetail}>
              {step.items ? (
                <ul className={m.stepItems}>
                  {step.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
              {step.closing ? <p className={m.text}>{step.closing}</p> : null}
            </div>
          </details>
        ))}
      </div>
    </>
  );
}
