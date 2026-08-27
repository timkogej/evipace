import { InView } from "./InView";

/**
 * "Scattered evidence becomes one structured output."
 *
 * The source departments read as a calm, aligned card set above the single
 * dossier they resolve into. An earlier version scattered them at hand-picked
 * offsets and drew hairline curves converging on the dossier; that was busy
 * and fussy at desktop widths, so the composition now says the same thing
 * through order alone — many equal inputs on top, one output beneath.
 *
 * The cards share the language the rest of the site already uses for small
 * surfaces: white, one hairline warm-grey border, a small orange label, a
 * restrained radius. No gradients, no stacked-paper edges, no connectors.
 *
 * All copy arrives as props so the same composition serves every locale.
 */
export type EvidenceSource = {
  /** Department name, set small and in orange. */
  label: string;
  /** What that department actually holds. */
  description: string;
};

export type EvidenceOutput = {
  /** Optional small uppercase label on the dossier. */
  label?: string;
  /** Optional document index inside the dossier. */
  items?: string[];
  /** Optional closing statement rendered inside the dossier. */
  statement?: string;
};

type EvidenceAssemblyBoardProps = {
  sources: EvidenceSource[];
  /** Optional label above the sources, where the locale already has one. */
  sourcesLabel?: string;
  output: EvidenceOutput;
  className?: string;
};

/** Locales supply five or six sources; the grid takes them as they come. */
const MAX_SOURCES = 6;

export function EvidenceAssemblyBoard({
  sources,
  sourcesLabel,
  output,
  className = ""
}: EvidenceAssemblyBoardProps) {
  const slips = sources.slice(0, MAX_SOURCES);
  // Without a document index the dossier is short, so it sits tighter under
  // the cards.
  const compact = !output.items?.length;

  return (
    <InView className={`evb ${compact ? "evb--compact " : ""}${className}`}>
      {sourcesLabel ? <p className="evb__caption">{sourcesLabel}</p> : null}

      <div className="evb__board">
        <ul className="evb__slips">
          {slips.map((source, index) => (
            <li
              className="evb__slip"
              key={source.label}
              style={{ "--evi-d": `${index * 80}ms` } as React.CSSProperties}
            >
              <p className="evb__slip-label">{source.label}</p>
              <p className="evb__slip-text">{source.description}</p>
            </li>
          ))}
        </ul>

        <div className="evb__dossier">
          <span aria-hidden="true" className="evb__dossier-tab" />
          {output.label ? (
            <p className="evb__dossier-label">{output.label}</p>
          ) : null}

          {output.items?.length ? (
            <ol className="evb__dossier-index">
              {output.items.map((item, index) => (
                <li className="evb__dossier-row" key={item}>
                  <span aria-hidden="true" className="evb__dossier-num">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="evb__dossier-item">{item}</span>
                </li>
              ))}
            </ol>
          ) : null}

          {output.statement ? (
            <p className="evb__dossier-statement">{output.statement}</p>
          ) : null}
        </div>
      </div>
    </InView>
  );
}
