import type { PageKey } from "@/lib/seo/page-registry";

export const siteLocales = ["en", "de"] as const;

export type SiteLocale = (typeof siteLocales)[number];
export type NavigationSection = "services" | "resources" | "methodology" | "about";

export type NavigationItem = {
  label: string;
  href: string;
  pageKey?: PageKey;
};

export type NavigationDirectoryItem = {
  label: string;
  href?: string;
  pageKey?: PageKey;
};

export type NavigationDirectory = {
  id: Extract<NavigationSection, "services" | "resources">;
  label: string;
  matchPrefixes?: string[];
  groups: Array<{
    label: string;
    items: NavigationDirectoryItem[];
  }>;
  actions?: NavigationItem[];
};

export type FooterColumn = {
  title: string;
  links: NavigationItem[];
};

type PageRoute = {
  pageKey: PageKey;
  href: string;
};

type SiteNavigation = {
  locale: SiteLocale;
  home: NavigationItem;
  primaryAction: NavigationItem;
  directories: NavigationDirectory[];
  directLinks: Array<NavigationItem & { section: NavigationSection }>;
  footerColumns: FooterColumn[];
  labels: {
    primaryNavigation: string;
    openNavigation: string;
    closeNavigation: string;
    mobileNavigationTitle: string;
    language: string;
    currentLanguage: string;
    unavailableTranslation: string;
  };
};

/**
 * The internal-link inventory for the site chrome. Indexable destinations
 * mirror lib/seo/page-registry.ts; send-request is the one deliberate
 * reachable-but-unlisted conversion route in each live locale.
 */
export const pageRoutes: Record<SiteLocale, PageRoute[]> = {
  en: [
    { pageKey: "home", href: "/en" },
    { pageKey: "about", href: "/en/about" },
    { pageKey: "methodology", href: "/en/methodology" },
    { pageKey: "sendRequest", href: "/en/send-request" },
    { pageKey: "esgKundenanfragen", href: "/en/esg-customer-requests" },
    {
      pageKey: "esgFragebogenLieferanten",
      href: "/en/esg-questionnaire-support"
    },
    { pageKey: "scope12Berechnung", href: "/en/scope-1-2-calculation" },
    { pageKey: "ecovadisUnterstuetzung", href: "/en/ecovadis-support" },
    {
      pageKey: "integrityNextUnterstuetzung",
      href: "/en/integritynext-support"
    },
    {
      pageKey: "vsmeNachhaltigkeitsbericht",
      href: "/en/vsme-sustainability-report"
    },
    { pageKey: "resourcesHub", href: "/en/resources" },
    {
      pageKey: "esgFragebogenVomKundenErhalten",
      href: "/en/resources/customer-esg-questionnaire-received"
    },
    {
      pageKey: "welcheEsgDatenKundenLieferanten",
      href: "/en/resources/esg-data-customers-request-from-suppliers"
    },
    {
      pageKey: "esgNachweiseLieferanten",
      href: "/en/resources/esg-evidence-for-suppliers"
    },
    {
      pageKey: "ecovadisDokumenteNachweise",
      href: "/en/resources/ecovadis-documents-evidence"
    },
    {
      pageKey: "integrityNextEinladungLieferanten",
      href: "/en/resources/integritynext-invitation-for-suppliers"
    },
    {
      pageKey: "scope12DatenBerechnung",
      href: "/en/resources/scope-1-2-data-calculation"
    },
    {
      pageKey: "scope123EinfachErklaert",
      href: "/en/resources/scope-1-2-3-explained"
    },
    {
      pageKey: "vsmeDatenNachhaltigkeitsbericht",
      href: "/en/resources/vsme-data-sustainability-report"
    },
    {
      pageKey: "esgDatenVerantwortlicheAbteilungen",
      href: "/en/resources/esg-data-owners"
    },
    {
      pageKey: "environmentalPolicyErstellen",
      href: "/en/resources/environmental-policy"
    },
    {
      pageKey: "supplierCodeOfConductErstellen",
      href: "/en/resources/supplier-code-of-conduct"
    },
    {
      pageKey: "esgDatenEinmalSammelnMehrfachNutzen",
      href: "/en/resources/reusable-esg-data"
    }
  ],
  de: [
    { pageKey: "home", href: "/de" },
    { pageKey: "about", href: "/de/about" },
    { pageKey: "methodology", href: "/de/methodology" },
    { pageKey: "sendRequest", href: "/de/send-request" },
    {
      pageKey: "esgKundenanfragen",
      href: "/de/esg-kundenanfragen"
    },
    {
      pageKey: "esgFragebogenLieferanten",
      href: "/de/esg-fragebogen-lieferanten"
    },
    {
      pageKey: "ecovadisUnterstuetzung",
      href: "/de/ecovadis-unterstuetzung"
    },
    {
      pageKey: "integrityNextUnterstuetzung",
      href: "/de/integritynext-unterstuetzung"
    },
    {
      pageKey: "vsmeNachhaltigkeitsbericht",
      href: "/de/vsme-nachhaltigkeitsbericht"
    },
    {
      pageKey: "scope12Berechnung",
      href: "/de/scope-1-2-berechnung"
    },
    {
      pageKey: "resourcesHub",
      href: "/de/ressourcen"
    },
    {
      pageKey: "welcheEsgDatenKundenLieferanten",
      href: "/de/ressourcen/welche-esg-daten-kunden-lieferanten"
    },
    {
      pageKey: "environmentalPolicyErstellen",
      href: "/de/ressourcen/environmental-policy-erstellen"
    },
    {
      pageKey: "supplierCodeOfConductErstellen",
      href: "/de/ressourcen/supplier-code-of-conduct-erstellen"
    },
    {
      pageKey: "esgDatenEinmalSammelnMehrfachNutzen",
      href: "/de/ressourcen/esg-daten-einmal-sammeln-mehrfach-nutzen"
    },
    {
      pageKey: "esgFragebogenVomKundenErhalten",
      href: "/de/ressourcen/esg-fragebogen-vom-kunden-erhalten"
    },
    {
      pageKey: "esgDatenVerantwortlicheAbteilungen",
      href: "/de/ressourcen/esg-daten-verantwortliche-abteilungen"
    },
    {
      pageKey: "esgFragebogenChecklisteLieferanten",
      href: "/de/ressourcen/esg-fragebogen-checkliste-lieferanten"
    },
    {
      pageKey: "esgNachweiseLieferanten",
      href: "/de/ressourcen/esg-nachweise-lieferanten"
    },
    {
      pageKey: "ecovadisDokumenteNachweise",
      href: "/de/ressourcen/ecovadis-dokumente-nachweise"
    },
    {
      pageKey: "integrityNextEinladungLieferanten",
      href: "/de/ressourcen/integritynext-einladung-lieferanten"
    },
    {
      pageKey: "scope123EinfachErklaert",
      href: "/de/ressourcen/scope-1-2-3-einfach-erklaert"
    },
    {
      pageKey: "scope12DatenBerechnung",
      href: "/de/ressourcen/scope-1-2-daten-berechnung"
    },
    {
      pageKey: "scope12DatenerfassungsVorlage",
      href: "/de/ressourcen/scope-1-2-datenerfassungs-vorlage"
    },
    {
      pageKey: "vsmeDatenNachhaltigkeitsbericht",
      href: "/de/ressourcen/vsme-daten-nachhaltigkeitsbericht"
    }
  ]
};

function route(locale: SiteLocale, pageKey: PageKey): string {
  const entry = pageRoutes[locale].find((candidate) => candidate.pageKey === pageKey);

  if (!entry) {
    throw new Error(`Missing ${locale} navigation route for ${pageKey}`);
  }

  return entry.href;
}

const deServices: NavigationDirectory = {
  id: "services",
  label: "Leistungen",
  groups: [
    {
      label: "Kundenanfragen",
      items: [
        {
          label: "ESG-Kundenanfragen",
          href: route("de", "esgKundenanfragen"),
          pageKey: "esgKundenanfragen"
        },
        {
          label: "ESG-Fragebögen für Lieferanten",
          href: route("de", "esgFragebogenLieferanten"),
          pageKey: "esgFragebogenLieferanten"
        }
      ]
    },
    {
      label: "Plattformen",
      items: [
        {
          label: "EcoVadis-Unterstützung",
          href: route("de", "ecovadisUnterstuetzung"),
          pageKey: "ecovadisUnterstuetzung"
        },
        {
          label: "IntegrityNext-Unterstützung",
          href: route("de", "integrityNextUnterstuetzung"),
          pageKey: "integrityNextUnterstuetzung"
        }
      ]
    },
    {
      label: "Berichte & Emissionen",
      items: [
        {
          label: "VSME-Nachhaltigkeitsbericht",
          href: route("de", "vsmeNachhaltigkeitsbericht"),
          pageKey: "vsmeNachhaltigkeitsbericht"
        },
        {
          label: "Scope 1 & 2",
          href: route("de", "scope12Berechnung"),
          pageKey: "scope12Berechnung"
        }
      ]
    }
  ]
};

const deResources: NavigationDirectory = {
  id: "resources",
  label: "Ressourcen",
  matchPrefixes: ["/de/ressourcen/"],
  groups: [
    {
      label: "Kundenanfragen",
      items: [
        {
          label: "Welche ESG-Daten verlangen Kunden?",
          href: route("de", "welcheEsgDatenKundenLieferanten"),
          pageKey: "welcheEsgDatenKundenLieferanten"
        },
        {
          label: "ESG-Fragebogen erhalten – was jetzt?",
          href: route("de", "esgFragebogenVomKundenErhalten"),
          pageKey: "esgFragebogenVomKundenErhalten"
        },
        {
          label: "Wer liefert welche ESG-Daten?",
          href: route("de", "esgDatenVerantwortlicheAbteilungen"),
          pageKey: "esgDatenVerantwortlicheAbteilungen"
        },
        {
          label: "ESG-Fragebogen Checkliste",
          href: route("de", "esgFragebogenChecklisteLieferanten"),
          pageKey: "esgFragebogenChecklisteLieferanten"
        },
        {
          label: "ESG-Daten wiederverwenden",
          href: route("de", "esgDatenEinmalSammelnMehrfachNutzen"),
          pageKey: "esgDatenEinmalSammelnMehrfachNutzen"
        }
      ]
    },
    {
      label: "Nachweise & Plattformen",
      items: [
        {
          label: "ESG-Nachweise für Lieferanten",
          href: route("de", "esgNachweiseLieferanten"),
          pageKey: "esgNachweiseLieferanten"
        },
        {
          label: "EcoVadis-Dokumente & Nachweise",
          href: route("de", "ecovadisDokumenteNachweise"),
          pageKey: "ecovadisDokumenteNachweise"
        },
        {
          label: "IntegrityNext für Lieferanten",
          href: route("de", "integrityNextEinladungLieferanten"),
          pageKey: "integrityNextEinladungLieferanten"
        }
      ]
    },
    {
      label: "Carbon & Emissionen",
      items: [
        {
          label: "Scope 1, 2 & 3 einfach erklärt",
          href: route("de", "scope123EinfachErklaert"),
          pageKey: "scope123EinfachErklaert"
        },
        {
          label: "Scope 1 & 2: Welche Daten braucht man?",
          href: route("de", "scope12DatenBerechnung"),
          pageKey: "scope12DatenBerechnung"
        },
        {
          label: "Scope 1 & 2 Datenerfassungs-Vorlage",
          href: route("de", "scope12DatenerfassungsVorlage"),
          pageKey: "scope12DatenerfassungsVorlage"
        }
      ]
    },
    {
      label: "Berichterstattung",
      items: [
        {
          label: "VSME: Welche Daten braucht man?",
          href: route("de", "vsmeDatenNachhaltigkeitsbericht"),
          pageKey: "vsmeDatenNachhaltigkeitsbericht"
        }
      ]
    }
  ],
  actions: [
    {
      label: "Alle Ressourcen",
      href: route("de", "resourcesHub"),
      pageKey: "resourcesHub"
    }
  ]
};

const enServices: NavigationDirectory = {
  id: "services",
  label: "Services",
  groups: [
    {
      label: "Customer requests",
      items: [
        {
          label: "Customer ESG requests",
          href: route("en", "esgKundenanfragen"),
          pageKey: "esgKundenanfragen"
        },
        {
          label: "ESG questionnaire support",
          href: route("en", "esgFragebogenLieferanten"),
          pageKey: "esgFragebogenLieferanten"
        }
      ]
    },
    {
      label: "Platforms",
      items: [
        {
          label: "EcoVadis Support",
          href: route("en", "ecovadisUnterstuetzung"),
          pageKey: "ecovadisUnterstuetzung"
        },
        {
          label: "IntegrityNext Support",
          href: route("en", "integrityNextUnterstuetzung"),
          pageKey: "integrityNextUnterstuetzung"
        }
      ]
    },
    {
      label: "Carbon & reporting",
      items: [
        {
          label: "VSME Sustainability Reporting",
          href: route("en", "vsmeNachhaltigkeitsbericht"),
          pageKey: "vsmeNachhaltigkeitsbericht"
        },
        {
          label: "Scope 1 & 2 calculation",
          href: route("en", "scope12Berechnung"),
          pageKey: "scope12Berechnung"
        }
      ]
    }
  ],
  actions: [
    { label: "See what we handle", href: "/en#services" },
    {
      label: "Send your ESG request",
      href: route("en", "sendRequest"),
      pageKey: "sendRequest"
    }
  ]
};

const enResources: NavigationDirectory = {
  id: "resources",
  label: "Resources",
  matchPrefixes: ["/en/resources/"],
  groups: [
    {
      label: "Start here",
      items: [
        {
          label: "Customer ESG questionnaire received",
          href: route("en", "esgFragebogenVomKundenErhalten"),
          pageKey: "esgFragebogenVomKundenErhalten"
        },
        {
          label: "ESG data customers request",
          href: route("en", "welcheEsgDatenKundenLieferanten"),
          pageKey: "welcheEsgDatenKundenLieferanten"
        },
        {
          label: "ESG data owners",
          href: route("en", "esgDatenVerantwortlicheAbteilungen"),
          pageKey: "esgDatenVerantwortlicheAbteilungen"
        }
      ]
    },
    {
      label: "Evidence and platforms",
      items: [
        {
          label: "ESG evidence for suppliers",
          href: route("en", "esgNachweiseLieferanten"),
          pageKey: "esgNachweiseLieferanten"
        },
        {
          label: "EcoVadis documents and evidence",
          href: route("en", "ecovadisDokumenteNachweise"),
          pageKey: "ecovadisDokumenteNachweise"
        },
        {
          label: "IntegrityNext invitation",
          href: route("en", "integrityNextEinladungLieferanten"),
          pageKey: "integrityNextEinladungLieferanten"
        }
      ]
    },
    {
      label: "Carbon and reporting",
      items: [
        {
          label: "Scope 1 & 2 data",
          href: route("en", "scope12DatenBerechnung"),
          pageKey: "scope12DatenBerechnung"
        },
        {
          label: "Scope 1, 2 & 3 explained",
          href: route("en", "scope123EinfachErklaert"),
          pageKey: "scope123EinfachErklaert"
        },
        {
          label: "VSME data guide",
          href: route("en", "vsmeDatenNachhaltigkeitsbericht"),
          pageKey: "vsmeDatenNachhaltigkeitsbericht"
        }
      ]
    }
  ],
  actions: [
    {
      label: "All resources",
      href: route("en", "resourcesHub"),
      pageKey: "resourcesHub"
    }
  ]
};

export const siteNavigation: Record<SiteLocale, SiteNavigation> = {
  en: {
    locale: "en",
    home: { label: "evipace — Home", href: route("en", "home"), pageKey: "home" },
    primaryAction: {
      label: "Send your ESG request",
      href: route("en", "sendRequest"),
      pageKey: "sendRequest"
    },
    directories: [enServices, enResources],
    directLinks: [
      {
        label: "Methodology",
        href: route("en", "methodology"),
        pageKey: "methodology",
        section: "methodology"
      },
      {
        label: "About",
        href: route("en", "about"),
        pageKey: "about",
        section: "about"
      }
    ],
    footerColumns: [
      {
        title: "Services",
        links: [
          {
            label: "Customer ESG requests",
            href: route("en", "esgKundenanfragen"),
            pageKey: "esgKundenanfragen"
          },
          {
            label: "ESG questionnaire support",
            href: route("en", "esgFragebogenLieferanten"),
            pageKey: "esgFragebogenLieferanten"
          },
          {
            label: "EcoVadis Support",
            href: route("en", "ecovadisUnterstuetzung"),
            pageKey: "ecovadisUnterstuetzung"
          },
          {
            label: "IntegrityNext Support",
            href: route("en", "integrityNextUnterstuetzung"),
            pageKey: "integrityNextUnterstuetzung"
          },
          {
            label: "Scope 1 & 2 calculation",
            href: route("en", "scope12Berechnung"),
            pageKey: "scope12Berechnung"
          },
          {
            label: "VSME Sustainability Reporting",
            href: route("en", "vsmeNachhaltigkeitsbericht"),
            pageKey: "vsmeNachhaltigkeitsbericht"
          },
          { label: "What we handle", href: "/en#services" }
        ]
      },
      {
        title: "Resources",
        links: [
          {
            label: "All resources",
            href: route("en", "resourcesHub"),
            pageKey: "resourcesHub"
          },
          {
            label: "Customer ESG questionnaire",
            href: route("en", "esgFragebogenVomKundenErhalten"),
            pageKey: "esgFragebogenVomKundenErhalten"
          },
          {
            label: "ESG evidence",
            href: route("en", "esgNachweiseLieferanten"),
            pageKey: "esgNachweiseLieferanten"
          },
          {
            label: "Scope 1 & 2 data",
            href: route("en", "scope12DatenBerechnung"),
            pageKey: "scope12DatenBerechnung"
          },
          {
            label: "ESG data owners",
            href: route("en", "esgDatenVerantwortlicheAbteilungen"),
            pageKey: "esgDatenVerantwortlicheAbteilungen"
          }
        ]
      },
      {
        title: "Company",
        links: [
          { label: "About", href: route("en", "about"), pageKey: "about" },
          {
            label: "Methodology",
            href: route("en", "methodology"),
            pageKey: "methodology"
          }
        ]
      },
      {
        title: "Contact",
        links: [
          { label: "hello@evipace.com", href: "mailto:hello@evipace.com" }
        ]
      }
    ],
    labels: {
      primaryNavigation: "Primary navigation",
      openNavigation: "Open navigation",
      closeNavigation: "Close navigation",
      mobileNavigationTitle: "Navigation",
      language: "Language",
      currentLanguage: "Current language",
      unavailableTranslation: "No English version of this page"
    }
  },
  de: {
    locale: "de",
    home: {
      label: "evipace — Startseite",
      href: route("de", "home"),
      pageKey: "home"
    },
    primaryAction: {
      label: "ESG-Anfrage senden",
      href: route("de", "sendRequest"),
      pageKey: "sendRequest"
    },
    directories: [deServices, deResources],
    directLinks: [
      {
        label: "Methodik",
        href: route("de", "methodology"),
        pageKey: "methodology",
        section: "methodology"
      },
      {
        label: "Über evipace",
        href: route("de", "about"),
        pageKey: "about",
        section: "about"
      }
    ],
    footerColumns: [
      {
        title: "Leistungen",
        links: deServices.groups.flatMap((group) =>
          group.items.flatMap((item) =>
            item.href ? [{ label: item.label, href: item.href, pageKey: item.pageKey }] : []
          )
        )
      },
      {
        title: "Ressourcen",
        links: [
          {
            label: "Alle Ressourcen",
            href: route("de", "resourcesHub"),
            pageKey: "resourcesHub"
          },
          {
            label: "ESG-Fragebogen Checkliste",
            href: route("de", "esgFragebogenChecklisteLieferanten"),
            pageKey: "esgFragebogenChecklisteLieferanten"
          },
          {
            label: "ESG-Nachweise",
            href: route("de", "esgNachweiseLieferanten"),
            pageKey: "esgNachweiseLieferanten"
          },
          {
            label: "Scope 1, 2 & 3",
            href: route("de", "scope123EinfachErklaert"),
            pageKey: "scope123EinfachErklaert"
          },
          {
            label: "VSME-Datenleitfaden",
            href: route("de", "vsmeDatenNachhaltigkeitsbericht"),
            pageKey: "vsmeDatenNachhaltigkeitsbericht"
          }
        ]
      },
      {
        title: "Unternehmen",
        links: [
          { label: "Methodik", href: route("de", "methodology"), pageKey: "methodology" },
          { label: "Über evipace", href: route("de", "about"), pageKey: "about" }
        ]
      },
      {
        title: "Kontakt",
        links: [
          { label: "hello@evipace.com", href: "mailto:hello@evipace.com" }
        ]
      }
    ],
    labels: {
      primaryNavigation: "Hauptnavigation",
      openNavigation: "Navigation öffnen",
      closeNavigation: "Navigation schließen",
      mobileNavigationTitle: "Navigation",
      language: "Sprache",
      currentLanguage: "Aktuelle Sprache",
      unavailableTranslation: "Keine englische Version dieser Seite"
    }
  }
};

export function isSiteLocale(locale: string): locale is SiteLocale {
  return (siteLocales as readonly string[]).includes(locale);
}

export function normalizeNavigationPath(pathname: string): string {
  const path = pathname.split(/[?#]/, 1)[0] || "/";
  return path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path;
}

export function isCurrentNavigationItem(pathname: string, href?: string): boolean {
  return (
    Boolean(href) &&
    !href!.includes("#") &&
    normalizeNavigationPath(pathname) === normalizeNavigationPath(href!)
  );
}

export function getActiveNavigationSection(
  locale: SiteLocale,
  pathname: string
): NavigationSection | null {
  const currentPath = normalizeNavigationPath(pathname);
  const navigation = siteNavigation[locale];

  for (const directory of navigation.directories) {
    if (
      directory.matchPrefixes?.some((prefix) =>
        currentPath.startsWith(prefix)
      ) ||
      directory.groups.some((group) =>
        group.items.some((item) => isCurrentNavigationItem(currentPath, item.href))
      ) ||
      directory.actions?.some((item) =>
        isCurrentNavigationItem(currentPath, item.href)
      )
    ) {
      return directory.id;
    }
  }

  const directLink = navigation.directLinks.find((item) =>
    isCurrentNavigationItem(currentPath, item.href)
  );

  return directLink?.section ?? null;
}

export type LanguageDestination = {
  locale: SiteLocale;
  label: "EN" | "DE";
  href: string;
  isCurrent: boolean;
  isEquivalent: boolean;
};

export function getLanguageDestinations(
  currentLocale: SiteLocale,
  pathname: string
): LanguageDestination[] {
  const currentPath = normalizeNavigationPath(pathname);
  const currentRoute = pageRoutes[currentLocale].find(
    (candidate) => normalizeNavigationPath(candidate.href) === currentPath
  );

  return siteLocales.map((locale) => {
    const equivalent = currentRoute
      ? pageRoutes[locale].find(
          (candidate) => candidate.pageKey === currentRoute.pageKey
        )
      : undefined;
    const isCurrent = locale === currentLocale;

    return {
      locale,
      label: locale === "en" ? "EN" : "DE",
      href: isCurrent
        ? currentPath
        : equivalent?.href ?? route(locale, "home"),
      isCurrent,
      isEquivalent: isCurrent || Boolean(equivalent)
    };
  });
}
