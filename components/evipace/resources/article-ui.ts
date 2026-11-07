/** Interface strings for the content-driven resource article, per locale. */
export const articleUi = {
  en: {
    onThisPage: "On this page",
    method: "Evipace method",
    methodDefault: "Customer request - scope - data owner - source - evidence - internal review.",
    methodology: "See methodology",
    methodologyHref: "/en/methodology",
    quickAnswer: "Quick answer",
    quickDefault: "Start with the request, not the spreadsheet.",
    faq: "FAQ",
    faqTitle: "Frequently asked questions",
    sources: "Sources and further reading",
    cta: {
      body: "Send the questionnaire, customer email, spreadsheet or portal export. We can map what is being asked, identify the internal sources and prepare a response for your review.",
      formHref: "/en/send-request",
      formLabel: "Send the request",
      forwardLabel: "Forward your request",
      note: "Questionnaire - Excel - PDF - portal - customer email",
      slogan: "ESG documentation, handled.",
      title: "Already have the customer request?"
    }
  },
  de: {
    onThisPage: "Auf dieser Seite",
    method: "Evipace-Methode",
    methodDefault: "Kundenanfrage - Geltungsbereich - Datenverantwortliche - Quelle - Nachweis - interne Prüfung.",
    methodology: "Methodik ansehen",
    methodologyHref: "/de/methodology",
    quickAnswer: "Kurz und klar",
    quickDefault: "Beginnen Sie mit der Anfrage, nicht mit der Tabelle.",
    faq: "FAQ",
    faqTitle: "Häufige Fragen",
    sources: "Quellen und weiterführende Informationen",
    cta: {
      body: "Senden Sie uns den Fragebogen, die Kunden-E-Mail, die Tabelle oder den Portal-Export. Wir ordnen zu, was gefragt wird, finden die internen Quellen und bereiten die Antwort vor.",
      formHref: "/de/send-request",
      formLabel: "ESG-Anfrage senden",
      forwardLabel: "Anfrage weiterleiten",
      note: "Fragebogen · Excel · PDF · Portal · Kunden-E-Mail",
      slogan: "ESG-Dokumentation, erledigt.",
      title: "Der Kunde hat bereits gefragt?"
    }
  }
} as const;