import type { ReactNode } from "react";
import { InView } from "./InView";

/**
 * An ordered process as one continuous spine rather than a stack of boxes.
 *
 * A single hairline runs the height of the list, each step sits on it as a
 * registration node with its number set into the line, and the copy stays
 * open — hairline separators only, no card borders.
 *
 * Copy arrives as props; the component is locale-neutral.
 */
export type ProcessStep = {
  number: string;
  title: string;
  body: string;
  /** Optional trailing element, e.g. a CTA some locales carry on a step. */
  action?: ReactNode;
};

type ProcessSpineProps = {
  steps: ProcessStep[];
  className?: string;
};

export function ProcessSpine({ steps, className = "" }: ProcessSpineProps) {
  return (
    <InView className={`spine ${className}`}>
      <ol className="spine__list">
        {steps.map((step, index) => (
          <li
            className={`spine__step${index === steps.length - 1 ? " spine__step--last" : ""}`}
            key={step.number}
            style={{ "--evi-d": `${320 + index * 120}ms` } as React.CSSProperties}
          >
            {/*
              Each step carries the segment of line below its own node, so
              the spine ends exactly at the final node instead of running
              past it.
            */}
            <span aria-hidden="true" className="spine__link" />
            <span aria-hidden="true" className="spine__node" />
            {/* The number sits on the line itself, not inside the heading. */}
            <p className="spine__num">{step.number}</p>
            <div className="spine__body">
              <h3 className="spine__title">{step.title}</h3>
              <p className="spine__text">{step.body}</p>
              {step.action ? (
                <div className="spine__action">{step.action}</div>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </InView>
  );
}
