import { privacyPathForLocale } from "./consent";

export type ConsentLocale = "en" | "de";

export const consentCopy = {
  en: {
    heading: "Your privacy choices",
    explanation:
      "We use essential technologies to operate this website. With your permission, we also use Google Analytics to understand how the site is used and improve it. You can accept or reject analytics at any time.",
    reject: "Reject analytics",
    accept: "Accept analytics",
    privacyLink: "Privacy policy",
    reopen: "Cookie settings",
    close: "Close cookie settings",
    currentAccepted: "Current choice: Analytics accepted.",
    currentRejected: "Current choice: Analytics rejected."
  },
  de: {
    heading: "Ihre Datenschutzeinstellungen",
    explanation:
      "Wir verwenden technisch notwendige Technologien, um diese Website zu betreiben. Mit Ihrer Einwilligung nutzen wir außerdem Google Analytics, um die Nutzung der Website zu verstehen und sie zu verbessern. Sie können Analytics jederzeit akzeptieren oder ablehnen.",
    reject: "Analytics ablehnen",
    accept: "Analytics akzeptieren",
    privacyLink: "Datenschutzerklärung",
    reopen: "Cookie-Einstellungen",
    close: "Cookie-Einstellungen schließen",
    currentAccepted: "Aktuelle Auswahl: Analytics akzeptiert.",
    currentRejected: "Aktuelle Auswahl: Analytics abgelehnt."
  }
} as const;

export function getConsentCopy(locale: ConsentLocale) {
  return {
    ...consentCopy[locale],
    privacyPath: privacyPathForLocale(locale)
  };
}
