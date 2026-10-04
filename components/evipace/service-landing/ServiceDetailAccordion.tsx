import type { ReactNode } from "react";
import styles from "./ServiceDetails.module.css";

export function ServiceDetailAccordion({
  label,
  children
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <details className="group border-y border-[rgba(21,21,21,0.1)] bg-[#f8f8f6]">
      <summary className={`${styles.summary} site-shell flex min-h-24 cursor-pointer items-center justify-between gap-6 py-6 text-lg font-semibold text-ink`}>
        <span>{label}</span>
        <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[rgba(21,21,21,0.18)] text-xl leading-none transition group-open:rotate-45">+</span>
      </summary>
      {children}
    </details>
  );
}
