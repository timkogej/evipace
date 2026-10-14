import type { ReactNode } from "react";
import h from "../HomeLandingPage.module.css";
import sp from "./ServicePage.module.css";

/** A full-width "show more" band; the sections inside open below it. */
export function ServiceDetailAccordion({
  label,
  children
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <details className={`${h.tokens} ${sp.details}`}>
      <summary>
        <span>{label}</span>
        <span aria-hidden="true" className={sp.detailsIcon}>+</span>
      </summary>
      {children}
    </details>
  );
}
