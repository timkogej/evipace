export type EvipaceImageAsset = {
  src: string;
  alt: string;
  label?: string;
  sizes?: string;
  imageClassName?: string;
  priority?: boolean;
  quality?: number;
};

const brandBase = "/images/evipace/brand";
const homepageBase = "/images/evipace/homepage";

export const evipaceImages = {
  brand: {
    logo: `${brandBase}/evipace-logo.png`,
    mark: `${brandBase}/evipace-mark.png`,
    logoGlow: `${brandBase}/evipace-logo-glow.png`
  },
  hero: {
    src: `${homepageBase}/evipace-hero-3.webp`,
    alt: "Evipace consultant reviewing supplier ESG request documents with a client in a meeting room",
    sizes: "100vw",
    imageClassName:
      "object-[72%_50%] sm:object-[64%_50%] lg:object-[54%_50%] xl:object-[50%_50%]",
    priority: true,
    quality: 88
  },
  customerData: {
    src: `${homepageBase}/customer-esg-data.webp`,
    alt: "Company ESG data spread across invoices, spreadsheets and business documents",
    sizes: "(min-width: 1024px) 42vw, 100vw",
    imageClassName: "object-[50%_52%]",
    quality: 84
  },
  services: {
    questionnaires: {
      src: `${homepageBase}/service-questionnaires.webp`,
      alt: "Supplier ESG questionnaire with evidence and completion statuses",
      sizes: "(min-width: 1024px) 44vw, 100vw",
      imageClassName: "object-[50%_48%]",
      quality: 84
    },
    vsme: {
      src: `${homepageBase}/service-vsme.webp`,
      alt: "VSME Sustainability Report 2026",
      sizes: "(min-width: 1024px) 44vw, 100vw",
      imageClassName: "object-[50%_44%]",
      quality: 84
    },
    scope: {
      src: `${homepageBase}/service-scope-1-2.webp`,
      alt: "Scope 1 and Scope 2 emissions calculation using energy and fuel data",
      sizes: "(min-width: 1024px) 44vw, 100vw",
      imageClassName: "object-[52%_50%]",
      quality: 84
    },
    evidence: {
      src: `${homepageBase}/service-policies-evidence.webp`,
      alt: "Organised ESG policies and supporting evidence documents",
      sizes: "(min-width: 1024px) 44vw, 100vw",
      imageClassName: "object-[50%_48%]",
      quality: 84
    }
  },
  howItWorks: {
    src: `${homepageBase}/how-it-works.webp`,
    alt: "Business documents organised into a finished ESG response",
    sizes: "(min-width: 1024px) 34vw, 100vw",
    imageClassName: "object-[52%_50%]",
    quality: 84
  },
  questionnaireForward: {
    src: `${homepageBase}/questionnaire-forward.webp`,
    alt: "Customer ESG questionnaire being reviewed with evidence status",
    sizes: "(min-width: 1024px) 54vw, 100vw",
    imageClassName: "object-[50%_48%] sm:object-[50%_50%]",
    quality: 86
  },
  founder: {
    src: `${homepageBase}/about-founder.webp`,
    alt: "Founder of Evipace discussing work at a desk",
    sizes: "(min-width: 1024px) 31vw, 100vw",
    imageClassName: "object-[50%_38%] sm:object-[50%_42%]",
    quality: 86
  },
  industrialBreak: {
    src: `${homepageBase}/industrial-break.webp`,
    alt: "Modern European manufacturing facility",
    sizes: "100vw",
    imageClassName: "object-[72%_50%] lg:object-[64%_50%]",
    quality: 86
  }
} satisfies Record<string, unknown>;
