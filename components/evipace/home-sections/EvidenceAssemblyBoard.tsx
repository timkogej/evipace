import { InView } from "./InView";

/**
 * "Scattered evidence becomes one structured output."
 *
 * Source departments are laid out as loose paper index slips in a
 * controlled constellation rather than a card grid, with hairline
 * connections converging on a single dossier below them.
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

/**
 * Slip geometry, in percentages of the board. Two loose columns with
 * deliberately unequal widths and staggered offsets — scattered enough to
 * read as fragmentation, ordered enough to stay editorial. Index 6 is only
 * reached by locales that supply a sixth source.
 */
const slipLayout = [
  { left: 0, top: 2, width: 44 },
  { left: 56, top: 0, width: 42 },
  { left: 5, top: 18, width: 41 },
  { left: 52, top: 16, width: 44 },
  { left: 0, top: 34, width: 45 },
  { left: 50, top: 32, width: 46 }
];

/** Where each slip's connection leaves it, in the same coordinate space. */
const linkOrigins = [
  { x: 44, y: 12 },
  { x: 56, y: 10 },
  { x: 46, y: 28 },
  { x: 52, y: 26 },
  { x: 45, y: 44 },
  { x: 50, y: 45 }
];

/**
 * Where each connection meets the dossier. Spread along its top edge
 * rather than stacked on one point, so six lines read as six sources
 * arriving rather than as a single bundled cable.
 */
const CONVERGE_Y = 55;
const convergeX = [30, 70, 39, 61, 45, 55];

export function EvidenceAssemblyBoard({
  sources,
  sourcesLabel,
  output,
  className = ""
}: EvidenceAssemblyBoardProps) {
  const slips = sources.slice(0, slipLayout.length);
  // Without a document index the dossier is short, so the board does not
  // need to reserve as much height beneath the slips.
  const compact = !output.items?.length;

  return (
    <InView className={`evb ${compact ? "evb--compact " : ""}${className}`}>
      {sourcesLabel ? <p className="evb__caption">{sourcesLabel}</p> : null}

      <div className="evb__board">
        {/*
          Percentage coordinate space with `preserveAspectRatio="none"`, so
          the lines land on the slips at any board size; non-scaling strokes
          keep them a hairline regardless of the distortion. That also puts
          the dash pattern in screen pixels, which is why the draw uses a
          fixed pixel dasharray rather than `pathLength`.
        */}
        <svg
          aria-hidden="true"
          className="evb__links"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          {slips.map((source, index) => {
            const from = linkOrigins[index];
            // Leaves the slip horizontally, arrives at the dossier
            // vertically: a quiet quarter-arc rather than a tangle.
            const toX = convergeX[index];
            const d = `M${from.x} ${from.y} C ${(from.x + toX) / 2} ${from.y}, ${toX} ${(from.y + CONVERGE_Y) / 2}, ${toX} ${CONVERGE_Y}`;
            return (
              <path
                className={`evb__link evb__link--${index + 1}`}
                d={d}
                key={source.label}
                vectorEffect="non-scaling-stroke"
              />
            );
          })}
        </svg>

        {/*
          Anchor dots are HTML, not SVG: the board's coordinate space is
          stretched, which would squash a circle into an ellipse.
        */}
        <div aria-hidden="true" className="evb__nodes">
          {slips.map((source, index) => (
            <span
              className={`evb__node evb__node--${index + 1}`}
              key={`node-${source.label}`}
              style={
                {
                  "--evb-nx": `${linkOrigins[index].x}%`,
                  "--evb-ny": `${linkOrigins[index].y}%`
                } as React.CSSProperties
              }
            />
          ))}
        </div>

        <ul className="evb__slips">
          {slips.map((source, index) => (
            <li
              className={`evb__slip evb__slip--${index + 1}`}
              key={source.label}
              style={
                {
                  "--evb-l": `${slipLayout[index].left}%`,
                  "--evb-t": `${slipLayout[index].top}%`,
                  "--evb-w": `${slipLayout[index].width}%`,
                  "--evi-d": `${index * 90}ms`
                } as React.CSSProperties
              }
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
