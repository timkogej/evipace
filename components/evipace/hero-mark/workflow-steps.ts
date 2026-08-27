import type { SiteLocale } from "@/lib/site-navigation";

/**
 * The three homepage workflow steps, per locale.
 *
 * One structure, one visual component (HeroWorkflow) — the steps are content,
 * so they live here rather than being duplicated into each locale's hero.
 */

export type HeroWorkflowStep = {
  /** Displayed step number, e.g. "01". */
  number: string;
  text: string;
};

export type HeroWorkflowContent = {
  /** Accessible name for the ordered list. */
  label: string;
  steps: [HeroWorkflowStep, HeroWorkflowStep, HeroWorkflowStep];
};

export const heroWorkflow: Record<SiteLocale, HeroWorkflowContent> = {
  en: {
    label: "How working with Evipace runs",
    steps: [
      { number: "01", text: "You send the request" },
      { number: "02", text: "We handle the ESG work" },
      { number: "03", text: "You receive a ready-to-submit result" }
    ]
  },
  de: {
    label: "So läuft die Zusammenarbeit mit Evipace",
    steps: [
      { number: "01", text: "Sie senden die Anfrage" },
      { number: "02", text: "Wir übernehmen die ESG-Arbeit" },
      { number: "03", text: "Sie erhalten ein einreichungsfertiges Ergebnis" }
    ]
  }
};
