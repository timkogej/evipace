/**
 * Centralised image mapping for the homepage "what we handle" cards.
 *
 * Every service card is a full-bleed photograph, so each service needs its
 * own plate. Until the bespoke set is produced, each key points at the
 * closest existing repository asset — nothing is generated or downloaded,
 * and every card still demonstrates the final full-image behaviour.
 *
 * Replacing an image later is a one-line change here: the card component
 * reads `imageSrc`, `imagePosition` and `overlay` and never hard-codes a
 * file. `futureFileName` records the plate each key is waiting for.
 *
 * `imageAlt` is localised because the same key is rendered on both the
 * English and the German homepage.
 */
const homepageBase = "/images/evipace/homepage";

export type ServiceImageKey =
  | "customer-requests"
  | "questionnaires"
  | "scope-1-2"
  | "sustainability-reporting"
  | "policies-documentation"
  | "evidence-preparation"
  | "ecovadis"
  | "integritynext"
  | "vsme";

export type ServiceCardImage = {
  imageSrc: string;
  /** `object-position` for the plate inside the card. */
  imagePosition: string;
  imageAlt: { en: string; de: string };
  /** How hard the readability scrim is pulled over the photograph. */
  overlay: "soft" | "medium" | "strong";
  /** The bespoke plate this key is waiting for. */
  futureFileName: string;
};

export const serviceCardImages: Record<ServiceImageKey, ServiceCardImage> = {
  "customer-requests": {
    imageSrc: `${homepageBase}/customer-esg-data.webp`,
    imagePosition: "50% 46%",
    imageAlt: {
      en: "A customer ESG request being broken down into the datapoints it asks for",
      de: "Eine ESG-Kundenanfrage wird in die angefragten Datenpunkte zerlegt"
    },
    overlay: "medium",
    futureFileName: "service-customer-requests.webp"
  },
  questionnaires: {
    imageSrc: `${homepageBase}/service-questionnaires-2.webp`,
    imagePosition: "52% 50%",
    imageAlt: {
      en: "A supplier ESG questionnaire being answered with supporting evidence",
      de: "Ein ESG-Lieferantenfragebogen wird mit Nachweisen beantwortet"
    },
    overlay: "medium",
    futureFileName: "service-esg-questionnaires.webp"
  },
  "scope-1-2": {
    imageSrc: `${homepageBase}/service-scope-1-2.webp`,
    imagePosition: "58% 50%",
    imageAlt: {
      en: "Energy and fuel records used for a Scope 1 and Scope 2 calculation",
      de: "Energie- und Brennstoffdaten als Grundlage einer Scope-1- und Scope-2-Berechnung"
    },
    overlay: "medium",
    futureFileName: "service-scope-1-2.webp"
  },
  "sustainability-reporting": {
    imageSrc: `${homepageBase}/service-vsme.webp`,
    imagePosition: "50% 42%",
    imageAlt: {
      en: "A voluntary sustainability report prepared from structured company data",
      de: "Ein freiwilliger Nachhaltigkeitsbericht auf Basis strukturierter Unternehmensdaten"
    },
    overlay: "medium",
    futureFileName: "service-sustainability-reporting.webp"
  },
  "policies-documentation": {
    imageSrc: `${homepageBase}/evipace-services-policy.webp`,
    imagePosition: "50% 50%",
    imageAlt: {
      en: "Company policies and supporting documentation organised for internal review",
      de: "Unternehmensrichtlinien und Unterlagen, aufbereitet zur internen Prüfung"
    },
    overlay: "strong",
    futureFileName: "service-policies-documentation.webp"
  },
  "evidence-preparation": {
    imageSrc: `${homepageBase}/service-policies-evidence.webp`,
    imagePosition: "50% 52%",
    imageAlt: {
      en: "Statements connected to their underlying sources and supporting documents",
      de: "Aussagen werden mit Quellen und unterstützenden Dokumenten verknüpft"
    },
    overlay: "medium",
    futureFileName: "service-evidence-preparation.webp"
  },
  ecovadis: {
    imageSrc: `${homepageBase}/evipace-services-policy.webp`,
    imagePosition: "46% 54%",
    imageAlt: {
      en: "Existing ESG information organised ahead of an assessment submission",
      de: "Vorhandene ESG-Informationen werden vor einer Bewertung strukturiert"
    },
    overlay: "strong",
    futureFileName: "service-ecovadis-support.webp"
  },
  integritynext: {
    imageSrc: `${homepageBase}/service-policies-evidence.webp`,
    imagePosition: "44% 48%",
    imageAlt: {
      en: "Certificates, company information and evidence gathered for a platform request",
      de: "Zertifikate, Unternehmensinformationen und Nachweise für eine Plattformanfrage"
    },
    overlay: "medium",
    futureFileName: "service-integritynext-support.webp"
  },
  vsme: {
    imageSrc: `${homepageBase}/service-vsme.webp`,
    imagePosition: "50% 46%",
    imageAlt: {
      en: "A VSME sustainability report built from a structured ESG dataset",
      de: "Ein VSME-Nachhaltigkeitsbericht auf Basis einer strukturierten ESG-Datengrundlage"
    },
    overlay: "medium",
    futureFileName: "service-vsme-report.webp"
  }
};
