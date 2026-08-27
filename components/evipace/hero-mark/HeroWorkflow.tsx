import type { SiteLocale } from "@/lib/site-navigation";
import { heroWorkflow } from "./workflow-steps";

/**
 * The three workflow steps that sit around the homepage mark.
 *
 * Real content, so real semantics: one ordered list with a localized
 * accessible name. The desktop composition (01 upper-left, 02 right, 03
 * lower-left of the mark) and the stacked phone/tablet sequence are both
 * pure CSS on `.mark-hero__workflow*` — the markup is identical at every
 * width, which is also why it is complete without JavaScript.
 *
 * The connector is decorative: a warm-grey base line with a short orange
 * lead segment that draws itself once and then stays put.
 */
/**
 * 01 (upper-left) over the top of the mark to 02 (right), back under the
 * bottom to 03 (lower-left), then a short leg in toward the document. Drawn
 * in the stage's own percentage space, so it tracks the nodes at every width
 * and stays clear of the artwork.
 */
const CONNECTOR =
  "M13 6 C 42 1, 83 13, 87 42 C 91 73, 55 93, 22 92 C 31 91, 37 88, 43 83";

/**
 * The orange lead: exactly the first 40% of the 01 -> 02 leg, split off the
 * curve above with de Casteljau so the two paths are geometrically identical
 * where they overlap. Giving the lead its own `d` is what lets both lines draw
 * with a plain dash wipe and finish solid — no repeating dash pattern to get
 * wrong at a viewport size nobody tested.
 */
const CONNECTOR_LEAD = "M13 6 C 24.6 4, 38.1 4.7, 50.4 8.2";

export function HeroWorkflow({ locale }: { locale: SiteLocale }) {
  const { label, steps } = heroWorkflow[locale];

  return (
    <div className="mark-hero__workflow">
      <svg
        aria-hidden="true"
        className="mark-hero__workflow-path"
        focusable="false"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <path className="mark-hero__workflow-line" d={CONNECTOR} />
        <path className="mark-hero__workflow-lead" d={CONNECTOR_LEAD} />
      </svg>

      <ol aria-label={label} className="mark-hero__workflow-list">
        {steps.map((step, index) => (
          <li
            className={`mark-hero__workflow-node mark-hero__workflow-node--${index + 1}`}
            key={step.number}
          >
            <span className="mark-hero__workflow-number">{step.number}</span>
            <span className="mark-hero__workflow-text">{step.text}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
