/**
 * Copy for the hero's evidence-mapping process annotation.
 *
 * These five labels narrate the same story the page makes in prose —
 * customer request -> source evidence -> visible gap -> human-reviewed
 * response. The overlay that renders them is `aria-hidden`, so this is
 * supplementary visual copy only; nothing here is the page's accessible
 * name for anything.
 */
export type HeroProcessLocale = "en" | "de";

export type HeroProcessLabels = {
  requestReceived: string;
  evidenceLinked: string;
  gapVisible: string;
  humanReviewed: string;
  readyForConfirmation: string;
};

export const heroProcessLabels: Record<HeroProcessLocale, HeroProcessLabels> = {
  en: {
    requestReceived: "Request received",
    evidenceLinked: "Evidence linked",
    gapVisible: "Gap kept visible",
    humanReviewed: "Human reviewed",
    readyForConfirmation: "Ready for your confirmation"
  },
  de: {
    requestReceived: "Anfrage eingegangen",
    evidenceLinked: "Nachweise verknüpft",
    gapVisible: "Lücke bleibt sichtbar",
    humanReviewed: "Von Menschen geprüft",
    readyForConfirmation: "Bereit für Ihre Bestätigung"
  }
};
