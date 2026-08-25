import type { ReactNode } from "react";
import { InView } from "./InView";

/**
 * "Collect once. Use many times." as one connected object.
 *
 * A single structured record — the passport — carries the metadata fields
 * as an open index rather than a grid of equal cards. A shared spine runs
 * down its right edge, and every destination branches off that same spine,
 * so the reuse story is legible from the composition alone: one record,
 * one output point, many requests.
 *
 * All wording arrives as props; the component holds no copy of its own.
 */
export type ReuseDestination = {
  /** Who is asking — set small, in orange. */
  source: string;
  /** What they ask for. */
  need: string;
};

type ReuseDataPassportProps = {
  /** Optional registration label, where the locale already has one. */
  recordLabel?: string;
  /** The structured metadata fields, in their existing order. */
  fields: string[];
  /**
   * Where the same record gets reused, in their existing order. Locales
   * without a destinations list simply render the record on its own.
   */
  destinations?: ReuseDestination[];
  /** Optional note and link rendered inside the record's footer. */
  footer?: ReactNode;
  className?: string;
};

/**
 * Slip widths, so the destinations read as an authored constellation
 * rather than a stack of identical rows. Cycled if a locale supplies more.
 */
const slipWidths = ["96%", "88%", "100%", "84%", "93%", "90%"];

export function ReuseDataPassport({
  recordLabel,
  fields,
  destinations,
  footer,
  className = ""
}: ReuseDataPassportProps) {
  const lastField = fields.length - 1;
  const hasRail = Boolean(destinations?.length);

  return (
    <InView className={`reuse ${className}`}>
      <div className={`reuse__stage${hasRail ? "" : " reuse__stage--solo"}`}>
        <div className="reuse__record">
          <span aria-hidden="true" className="reuse__spine">
            <span className="reuse__spine-run" />
          </span>

          {recordLabel ? <p className="reuse__label">{recordLabel}</p> : null}

          <ol className="reuse__fields">
            {fields.map((field, index) => (
              <li
                className={`reuse__field${index === lastField ? " reuse__field--out" : ""}`}
                key={field}
                style={{ "--evi-d": `${240 + index * 70}ms` } as React.CSSProperties}
              >
                <span aria-hidden="true" className="reuse__field-num">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="reuse__field-name">{field}</span>
                <span aria-hidden="true" className="reuse__field-rule" />
              </li>
            ))}
          </ol>

          {footer ? <div className="reuse__footer">{footer}</div> : null}
        </div>

        {/*
          The rail is the record's right edge continued: destinations hang
          off the same line the record ends on, not off separate cards.
        */}
        {hasRail ? (
        <ul className="reuse__rail">
          <li aria-hidden="true" className="reuse__origin" />
          {destinations?.map((destination, index) => (
            <li
              className="reuse__dest"
              key={`${destination.source}-${destination.need}`}
              style={
                {
                  "--evi-d": `${900 + index * 90}ms`,
                  "--reuse-w": slipWidths[index % slipWidths.length]
                } as React.CSSProperties
              }
            >
              <p className="reuse__dest-source">{destination.source}</p>
              <p className="reuse__dest-need">{destination.need}</p>
            </li>
          ))}
        </ul>
        ) : null}
      </div>
    </InView>
  );
}
