import type { ComponentType, ReactNode, SVGProps } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import h from "../HomeLandingPage.module.css";
import { RevealOnView } from "../home/RevealOnView";
import sp from "./ServicePage.module.css";

/**
 * Building blocks for the German service pages, in the same centred layout
 * as the homepage and the English service pages. Each page component keeps
 * its own copy and data; these blocks only decide how it is laid out.
 */

type Tone = "light" | "tinted" | "dark";
type Icon = ComponentType<SVGProps<SVGSVGElement> & { "aria-hidden"?: boolean | "true" }>;

/** The page wrapper: brings the design tokens and the German type scale. */
export function ServiceMain({ children }: { children: ReactNode }) {
  return (
    <main className={h.page} data-locale="de" id="top">
      {children}
    </main>
  );
}

export function Band({
  children,
  id,
  label,
  labelledBy,
  tone = "light"
}: {
  children: ReactNode;
  id?: string;
  label?: string;
  labelledBy?: string;
  tone?: Tone;
}) {
  const toneClass = tone === "tinted" ? ` ${h.tinted}` : tone === "dark" ? ` ${sp.dark}` : "";
  return (
    <section
      aria-label={label}
      aria-labelledby={labelledBy}
      className={`${h.section} ${sp.anchored}${toneClass}`}
      id={id}
    >
      <RevealOnView className={h.shell}>{children}</RevealOnView>
    </section>
  );
}

/** Centred eyebrow, heading and optional lead; extra children follow. */
export function Head({
  children,
  dark = false,
  eyebrow,
  id,
  lead,
  title
}: {
  children?: ReactNode;
  dark?: boolean;
  eyebrow?: string;
  id?: string;
  lead?: ReactNode;
  title: ReactNode;
}) {
  return (
    <header className={`${h.sectionHead}${dark ? ` ${sp.darkHead}` : ""}`}>
      {eyebrow ? <p className={h.eyebrow}>{eyebrow}</p> : null}
      <h2 className={h.heading} id={id}>{title}</h2>
      {lead ? <p className={h.lead}>{lead}</p> : null}
      {children ? <div className={sp.headExtra}>{children}</div> : null}
    </header>
  );
}

/** A centred column of running text (paragraphs, links, callouts). */
export function Prose({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return <div className={`${sp.prose}${dark ? ` ${sp.darkBody}` : ""}`}>{children}</div>;
}

export function Callout({ children }: { children: ReactNode }) {
  return <p className={sp.callout}>{children}</p>;
}

export function InlineLink({ children, href }: { children: ReactNode; href: string }) {
  return (
    <Link className={sp.inlineLink} href={href}>
      {children}
    </Link>
  );
}

export function CardGrid({ children, columns = 3 }: { children: ReactNode; columns?: 1 | 2 | 3 }) {
  return <ul className={columns === 1 ? sp.grid1 : columns === 2 ? sp.grid2 : sp.grid3}>{children}</ul>;
}

export function Card({
  children,
  icon: IconComponent,
  title,
  wide = false
}: {
  children?: ReactNode;
  icon?: Icon;
  title?: ReactNode;
  wide?: boolean;
}) {
  return (
    <li className={`${sp.card}${wide ? ` ${sp.cardWide}` : ""}`}>
      {IconComponent ? <IconComponent aria-hidden="true" className={sp.cardIcon} /> : null}
      {title ? <h3>{title}</h3> : null}
      {children}
    </li>
  );
}

/** Small ruled list inside a card. */
export function Items({ items }: { items: readonly string[] }) {
  return (
    <ul className={sp.items}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

/** Bordered checklist with ticks, two columns from tablet up. */
export function Checklist({ items }: { items: readonly ReactNode[] }) {
  return (
    <ul className={sp.checks}>
      {items.map((item, index) => (
        <li key={index}>
          <CheckCircle2 aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Short labels (e.g. company types) as a centred row of chips. */
export function Chips({ items }: { items: readonly string[] }) {
  return (
    <ul className={sp.chips}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

/** Numbered steps, as on the homepage. */
export function Steps({
  items
}: {
  items: ReadonlyArray<{ title: string; body: ReactNode; extra?: ReactNode }>;
}) {
  return (
    <ol className={`${h.steps} ${sp.stepsGrid}`}>
      {items.map((step, index) => (
        <li className={h.step} key={step.title} style={{ "--i": index } as React.CSSProperties}>
          <span aria-hidden="true" className={h.stepNumber}>{index + 1}</span>
          <h3 className={h.cardTitle}>{step.title}</h3>
          <p>{step.body}</p>
          {step.extra}
        </li>
      ))}
    </ol>
  );
}

export function LinkCard({
  body,
  href,
  more,
  title
}: {
  body?: ReactNode;
  href: string;
  more?: string;
  title: ReactNode;
}) {
  return (
    <li>
      <Link className={sp.linkCard} href={href}>
        <h3>{title}</h3>
        {body ? <p>{body}</p> : null}
        {more ? <span className={sp.linkMore}>{more} →</span> : null}
      </Link>
    </li>
  );
}

export function Faq({
  eyebrow,
  items,
  title
}: {
  eyebrow: string;
  items: ReadonlyArray<{ question: string; answer: string }>;
  title: string;
}) {
  return (
    <section aria-labelledby="faq-title" className={`${h.section} ${h.tinted} ${sp.anchored}`} id="faq">
      <RevealOnView className={`${h.shell} ${h.faqGrid}`}>
        <header>
          <p className={h.eyebrow}>{eyebrow}</p>
          <h2 className={h.heading} id="faq-title">{title}</h2>
        </header>
        <div className={h.faq}>
          {items.map((item) => (
            <details className={h.faqItem} key={item.question}>
              <summary>
                <h3>{item.question}</h3>
                <span aria-hidden="true" className={h.faqIcon} />
              </summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </RevealOnView>
    </section>
  );
}

export function ServiceHero({
  actions,
  breadcrumb,
  children,
  eyebrow,
  lead,
  note,
  title
}: {
  actions: { primary: { label: string; href: string }; secondary?: { label: string; href: string } };
  breadcrumb: string;
  children?: ReactNode;
  eyebrow: string;
  lead: ReactNode;
  note?: ReactNode;
  title: ReactNode;
}) {
  return (
    <section aria-labelledby="hero-title" className={`${h.hero} ${h.pageHero}`}>
      <div className={`${h.shell} ${h.heroGrid}`}>
        <div className={h.heroCopy}>
          <nav aria-label="Brotkrümelnavigation" className={sp.breadcrumb}>
            <Link href="/de">Startseite</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{breadcrumb}</span>
          </nav>
          <p className={h.eyebrow}>{eyebrow}</p>
          <h1 className={h.display} id="hero-title">{title}</h1>
          <div className={sp.intro}>{typeof lead === "string" ? <p>{lead}</p> : lead}</div>
          <div className={h.actions}>
            <Link className={h.pillButton} href={actions.primary.href}>
              {actions.primary.label}
              <span aria-hidden="true" className={h.pillArrow}><span className={h.arrowGlyph}>→</span></span>
            </Link>
            {actions.secondary ? (
              actions.secondary.href.startsWith("#") ? (
                <a className={h.textLink} href={actions.secondary.href}>
                  {actions.secondary.label}<span aria-hidden="true">→</span>
                </a>
              ) : (
                <Link className={h.textLink} href={actions.secondary.href}>
                  {actions.secondary.label}<span aria-hidden="true">→</span>
                </Link>
              )
            ) : null}
          </div>
          {note ? <p className={sp.qualifier}>{note}</p> : null}
          {children}
        </div>
      </div>
    </section>
  );
}

/** Ordered panel under the hero, in the desk-panel style. */
export function HeroPanel({ items, label }: { items: readonly string[]; label: string }) {
  return (
    <aside className={sp.heroPanel}>
      <p className={sp.panelLabel}>{label}</p>
      <ol>
        {items.map((item, index) => (
          <li key={item}>
            <span aria-hidden="true">{index + 1}</span>
            <span>{item}</span>
          </li>
        ))}
      </ol>
    </aside>
  );
}

/** Small status card under the hero (illustrative overview of a request). */
export function StatusPanel({
  label,
  rows
}: {
  label: string;
  rows: ReadonlyArray<{ label: string; status: string; open?: boolean }>;
}) {
  return (
    <aside className={sp.heroPanel}>
      <p className={sp.panelLabel}>{label}</p>
      <ul className={sp.statusRows}>
        {rows.map((row) => (
          <li key={row.label}>
            <span>{row.label}</span>
            <span className={h.pill} data-tone={row.open ? "open" : "ok"}>{row.status}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

/** A short calculation chain, e.g. activity data × factor = emissions. */
export function Formula({
  label,
  parts
}: {
  label?: string;
  parts: ReadonlyArray<{ title: string; value?: string } | { op: string }>;
}) {
  return (
    <figure className={sp.formula}>
      {label ? <figcaption className={sp.panelLabel}>{label}</figcaption> : null}
      <div className={sp.formulaRow}>
        {parts.map((part, index) =>
          "op" in part ? (
            <span aria-hidden="true" className={sp.formulaOp} key={index}>{part.op}</span>
          ) : (
            <div className={sp.formulaTerm} key={index}>
              <p>{part.title}</p>
              {part.value ? <p className={sp.formulaValue}>{part.value}</p> : null}
            </div>
          )
        )}
      </div>
    </figure>
  );
}
