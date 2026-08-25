/**
 * One continuous horizontal line of incoming request types.
 *
 * The rail holds the list twice so a -50% translation loops with no seam
 * and no gap. Only the first copy is real content; the second is inert to
 * assistive technology, so the list is announced exactly once.
 *
 * Pure CSS — no client component, no observer, no JavaScript at all.
 */
type RequestStreamProps = {
  items: string[];
  /** Accessible name for the region, supplied by the locale. */
  label: string;
  className?: string;
};

function Track({ items, hidden }: { items: string[]; hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden ? "true" : undefined}
      className="reqstream__track"
      role={hidden ? "presentation" : undefined}
    >
      {items.map((item) => (
        <li className="reqstream__item" key={item}>
          {item}
        </li>
      ))}
    </ul>
  );
}

export function RequestStream({
  items,
  label,
  className = ""
}: RequestStreamProps) {
  return (
    <div aria-label={label} className={`reqstream ${className}`} role="group">
      <div className="reqstream__rail">
        <Track items={items} />
        <Track hidden items={items} />
      </div>
    </div>
  );
}
