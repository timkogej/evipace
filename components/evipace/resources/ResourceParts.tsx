import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { Check, Square } from "lucide-react";
import h from "../HomeLandingPage.module.css";
import { RevealOnView } from "../home/RevealOnView";
import sp from "../service-landing/ServicePage.module.css";
import r from "./Resource.module.css";

/**
 * Building blocks for the resource hub and guides, in the same centred
 * layout as the homepage and the service pages. Each page keeps its own
 * copy and data; these blocks only decide how it is laid out.
 */

type Locale = "en" | "de";
type Tone = "light" | "tinted" | "dark";

const crumbs = {
  en: { label: "Breadcrumb", home: "Home", hub: "Resources" },
  de: { label: "Brotkrümelnavigation", home: "Startseite", hub: "Ressourcen" }
} as const;

export function ResourceMain({
  children,
  className,
  locale
}: {
  children: ReactNode;
  /** Kept for the tool pages' print stylesheet in app/globals.css. */
  className?: string;
  locale: Locale;
}) {
  return (
    <main className={`${h.page}${className ? ` ${className}` : ""}`} data-locale={locale} id="top">
      {children}
    </main>
  );
}

/**
 * Centred hero with breadcrumb. `current` is the page's own crumb; omit it on
 * the hub itself, where "Resources" is the current page.
 */
export function ResourceHero({
  actions,
  children,
  current,
  eyebrow,
  locale,
  statement,
  title,
  titleId = "hero-title"
}: {
  actions?: ReactNode;
  children?: ReactNode;
  current?: string;
  eyebrow: string;
  locale: Locale;
  statement?: ReactNode;
  title: ReactNode;
  titleId?: string;
}) {
  const c = crumbs[locale];
  return (
    <header aria-labelledby={titleId} className={`${h.hero} ${h.pageHero}`}>
      <div className={`${h.shell} ${h.heroGrid}`}>
        <div className={h.heroCopy}>
          <nav aria-label={c.label} className={sp.breadcrumb}>
            <Link href={`/${locale}`}>{c.home}</Link>
            <span aria-hidden="true">/</span>
            {current ? (
              <>
                <Link href={locale === "de" ? "/de/ressourcen" : "/en/resources"}>{c.hub}</Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page">{current}</span>
              </>
            ) : (
              <span aria-current="page">{c.hub}</span>
            )}
          </nav>
          <p className={h.eyebrow}>{eyebrow}</p>
          <h1 className={h.display} id={titleId}>{title}</h1>
          {statement ? <p className={r.statement}>{statement}</p> : null}
          {children ? <div className={sp.intro}>{children}</div> : null}
          {actions ? <div className={h.actions}>{actions}</div> : null}
        </div>
      </div>
    </header>
  );
}

export function PillLink({ children, href }: { children: ReactNode; href: string }) {
  return (
    <Link className={h.pillButton} href={href}>
      {children}
      <span aria-hidden="true" className={h.pillArrow}>→</span>
    </Link>
  );
}

export function TextLink({ children, href, onDark = false }: { children: ReactNode; href: string; onDark?: boolean }) {
  const className = `${h.textLink}${onDark ? ` ${h.textLinkOnDark}` : ""}`;
  const inner = (
    <>
      {children}
      <span aria-hidden="true">→</span>
    </>
  );
  return href.startsWith("#") ? (
    <a className={className} href={href}>{inner}</a>
  ) : (
    <Link className={className} href={href}>{inner}</Link>
  );
}

export function ResourceBand({
  children,
  id,
  labelledBy,
  tone = "light"
}: {
  children: ReactNode;
  id?: string;
  labelledBy?: string;
  tone?: Tone;
}) {
  const toneClass = tone === "tinted" ? ` ${r.tinted}` : tone === "dark" ? ` ${r.dark} ${sp.dark}` : "";
  return (
    <section aria-labelledby={labelledBy} className={`${h.section} ${sp.anchored}${toneClass}`} id={id}>
      <RevealOnView className={h.shell}>{children}</RevealOnView>
    </section>
  );
}

/** A short principle in a framed box. */
export function Motto({ children, dark = false, label }: { children: ReactNode; dark?: boolean; label?: string }) {
  return (
    <div className={`${r.motto}${dark ? ` ${r.mottoDark}` : ""}`}>
      {label ? <p className={h.eyebrow}>{label}</p> : null}
      <p className={r.mottoText}>{children}</p>
    </div>
  );
}

export function ResourceCards({ children, columns = 3 }: { children: ReactNode; columns?: 2 | 3 | 4 }) {
  const columnClass = columns === 2 ? r.cards2 : columns === 4 ? r.cards4 : r.cards3;
  return <ul className={`${r.cards} ${columnClass}`}>{children}</ul>;
}

/** A guide or tool on the hub: the whole card is the link. */
export function ResourceCard({
  cta,
  description,
  featured = false,
  href,
  note,
  number,
  tag,
  title,
  type,
  wide = false
}: {
  cta?: string;
  description?: ReactNode;
  featured?: boolean;
  href: string;
  note?: ReactNode;
  number?: number;
  tag?: string;
  title: string;
  type?: string;
  wide?: boolean;
}) {
  return (
    <li className={wide ? r.wide : undefined} style={number ? ({ "--i": number - 1 } as CSSProperties) : undefined}>
      <Link className={`${r.card}${featured ? ` ${r.cardFeatured}` : ""}`} href={href}>
        {number || tag ? (
          <span className={r.cardTop}>
            {number ? <span aria-hidden="true" className={r.cardNumber}>{number}</span> : <span />}
            {tag ? <span className={r.tag}>{tag}</span> : null}
          </span>
        ) : null}
        {type ? <p className={r.cardType}>{type}</p> : null}
        <h3>{title}</h3>
        {description ? <p>{description}</p> : null}
        {note ? <p className={r.cardNote}>{note}</p> : null}
        <span className={r.cardMore}>
          {cta}
          <span aria-hidden="true">→</span>
        </span>
      </Link>
    </li>
  );
}

/** Centred box with a short heading, text and a link. */
export function NoteBox({ children, title }: { children: ReactNode; title: ReactNode }) {
  return (
    <div className={r.note}>
      <h3>{title}</h3>
      {children}
    </div>
  );
}

/** An interactive tool on the hub (dark band). */
export function ToolCard({
  facts,
  flow,
  href,
  intro,
  label,
  lead,
  linkLabel,
  privacy,
  small,
  title
}: {
  facts: readonly string[];
  flow: string;
  href: string;
  intro: string;
  label: string;
  lead: string;
  linkLabel: string;
  privacy: string;
  small: string;
  title: string;
}) {
  return (
    <li className={r.tool}>
      <p className={h.eyebrow} style={{ color: "var(--ev-orange-500)" }}>{label}</p>
      <h3>{title}</h3>
      <p className={r.toolLead}>{lead}</p>
      <p>{intro}</p>
      <p className={r.toolFlow}>{flow}</p>
      <ul className={r.toolFacts}>
        {facts.map((fact) => (
          <li key={fact}>
            <Check aria-hidden="true" />
            {fact}
          </li>
        ))}
      </ul>
      <p>{privacy}</p>
      <div className={`${h.actions} ${r.toolAction}`}>
        <PillLink href={href}>{linkLabel}</PillLink>
      </div>
      <p className={r.toolSmall}>{small}</p>
    </li>
  );
}

export function Flow({ dark = false, items }: { dark?: boolean; items: readonly string[] }) {
  return (
    <ol className={`${r.flow}${dark ? ` ${r.flowDark}` : ""}`}>
      {items.map((item, index) => (
        <li key={item}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <p>{item}</p>
        </li>
      ))}
    </ol>
  );
}

export function Terms({ items }: { items: ReadonlyArray<readonly [string, string]> }) {
  return (
    <dl className={r.terms}>
      {items.map(([term, description]) => (
        <div key={term}>
          <dt>{term}</dt>
          <dd>{description}</dd>
        </div>
      ))}
    </dl>
  );
}

export function CenterAction({ children }: { children: ReactNode }) {
  return <div className={r.centerAction}>{children}</div>;
}

/** A caveat box under the hero ("A new policy does not prove past implementation."). */
export function QualifierBox({
  body,
  footer,
  label,
  title
}: {
  body?: ReactNode;
  footer?: string;
  label: string;
  title: ReactNode;
}) {
  return (
    <aside className={r.qualifier}>
      <p className={r.qualifierLabel}>{label}</p>
      <p className={r.qualifierTitle}>{title}</p>
      {body ? <p>{body}</p> : null}
      {footer ? <p className={r.qualifierFooter}>{footer}</p> : null}
    </aside>
  );
}

/** Labelled key/value card, e.g. illustrative document metadata. */
export function MetaCard({
  items,
  label
}: {
  items: ReadonlyArray<readonly [string, string]>;
  label: string;
}) {
  return (
    <div className={r.meta}>
      <p className={r.metaLabel}>{label}</p>
      <dl>
        {items.map(([term, description]) => (
          <div key={term}>
            <dt>{term}</dt>
            <dd>{description}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** Open checklist (empty boxes): questions still to be checked. */
export function BoxList({ items }: { items: readonly ReactNode[] }) {
  return (
    <ul className={r.boxes}>
      {items.map((item, index) => (
        <li key={index}>
          <Square aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Short labelled panel inside a section (soft background). */
export function Panel({ children, label }: { children: ReactNode; label?: string }) {
  return (
    <div className={r.panel}>
      {label ? <p className={r.metaLabel}>{label}</p> : null}
      {children}
    </div>
  );
}

export function Bullets({ items }: { items: readonly ReactNode[] }) {
  return (
    <ul className={r.bullets}>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
}
