import { InView } from "./InView";

/**
 * The finished package a client receives, as one document rather than a
 * grid of identical cells.
 *
 * Deliverables become a continuous index inside a single taupe dossier,
 * with a couple of offset paper layers behind it and one orange tab. The
 * last item is treated as the dossier's foundation — a warmer footer band
 * rather than an orphaned row.
 *
 * Copy arrives as props; the component carries no wording of its own.
 */
type DeliveryDossierProps = {
  items: string[];
  /** Optional small uppercase label, where the locale already has one. */
  label?: string;
  /** Optional closing statement rendered under the index. */
  statement?: string;
  className?: string;
};

export function DeliveryDossier({
  items,
  label,
  statement,
  className = ""
}: DeliveryDossierProps) {
  const indexed = items.slice(0, -1);
  const foundation = items[items.length - 1];

  return (
    <InView className={`dossier ${className}`}>
      <span aria-hidden="true" className="dossier__layer dossier__layer--back" />
      <span aria-hidden="true" className="dossier__layer dossier__layer--mid" />

      <div className="dossier__sheet">
        <span aria-hidden="true" className="dossier__tab" />
        <span aria-hidden="true" className="dossier__clip" />

        {label ? <p className="dossier__label">{label}</p> : null}

        <ol className="dossier__index">
          {indexed.map((item, index) => (
            <li className="dossier__row" key={item}>
              <span aria-hidden="true" className="dossier__num">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="dossier__item">{item}</span>
            </li>
          ))}
        </ol>

        {foundation ? (
          <p className="dossier__foundation">
            <span aria-hidden="true" className="dossier__num">
              {String(items.length).padStart(2, "0")}
            </span>
            <span className="dossier__item">{foundation}</span>
          </p>
        ) : null}

        {statement ? <p className="dossier__statement">{statement}</p> : null}
      </div>
    </InView>
  );
}
