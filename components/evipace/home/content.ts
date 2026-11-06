import type { FileType } from "./paper";

export type HomeLocale = "en" | "de";

export type ForwardIcon = "questionnaire" | "assessment" | "carbon" | "conduct" | "selfAssessment" | "evidence";

export type HomeContent = {
  hero: {
    eyebrow: string;
    title: string;
    body: string;
    forward: string;
    formLink: string;
    note: string;
    /** Line under the note offering a call; shown only when a phone number is set. */
    callPrompt: string;
    callLabel: string;
  };
  /** Hero: one small card, a questionnaire waiting for the client's approval. */
  flow: {
    label: string;
    badge: string;
    title: string;
    due: string;
    /** Prepared, reviewed, your approval. */
    steps: [string, string, string];
    /** Footer line while it waits, and after approval. */
    ready: string;
    sent: string;
    approve: string;
    approved: string;
  };
  assurances: { label: string; items: string[] };
  statement: string;
  steps: {
    label: string;
    title: string;
    items: Array<{ title: string; body: string }>;
    /** Decorative desk card beside the pinned steps; it changes with each step. */
    scene: {
      badge: string;
      received: { title: string; file: string; meta: string };
      preparing: { title: string; rows: [string, string, string] };
      ready: { title: string; summary: string; approve: string; approved: string };
    };
  };
  forwardable: {
    label: string;
    title: string;
    intro: string;
    items: Array<{ icon: ForwardIcon; title: string; body: string }>;
    link: string;
  };
  reuse: {
    label: string;
    title: string;
    body: string;
    badge: string;
    visualLabel: string;
    folder: string;
    confirmed: string;
    needsUpdate: string;
    documents: Array<{ name: string; detail: string; status: "confirmed" | "update"; type: FileType }>;
  };
  example: {
    label: string;
    title: string;
    body: string;
    lanes: Array<{ title: string; points: string[] }>;
    badge: string;
    cardTitle: string;
    rows: Array<[string, string]>;
    status: string;
  };
  trust: {
    label: string;
    title: string;
    illustrationLabel: string;
    items: Array<{ title: string; body: string; link?: { label: string; href: string } }>;
  };
  faq: { label: string; title: string; items: Array<{ q: string; a: string }> };
  cta: { slogan: string; title: string; body: string; formLink: string; offersLink: string };
};

/**
 * Homepage copy. The German strings are drafts awaiting the owner's review
 * (DE-REVIEW) except the hero eyebrow, title and body, which were supplied.
 */

/** Brand line, per locale. */
export const BRAND_LINE = "ESG documentation, handled.";
export const BRAND_LINE_DE = "ESG-Dokumentation, erledigt.";

export const homeContent: Record<HomeLocale, HomeContent> = {
  en: {
    hero: {
      eyebrow: "ESG documentation for manufacturers",
      title: "Less paperwork. More production.",
      body: "We prepare your reports, records and customer questionnaires. A person at Evipace reviews, you approve.",
      forward: "Send us a request",
      formLink: "Or use the request form",
      note: "Nothing leaves without your approval.",
      callPrompt: "Prefer to talk first?",
      callLabel: "Call us"
    },
    flow: {
      label: "Example: a customer questionnaire waiting for your approval",
      badge: "Example",
      title: "Customer ESG questionnaire",
      due: "Due Friday",
      steps: ["Prepared", "Reviewed by Evipace", "Your approval"],
      ready: "Ready for your approval",
      sent: "Approved and sent to your customer",
      approve: "Approve",
      approved: "Approved"
    },
    assurances: {
      label: "How we work",
      items: [
        "Records and deadlines",
        "Scope 1 and 2 calculations and reports",
        "Customer questionnaires and EcoVadis requests",
        "Based in Ljubljana, Slovenia"
      ]
    },
    statement:
      "Documentation should not take time away from production. We take it over, and you confirm it.",
    steps: {
      label: "How it works",
      title: "Three steps from handover to approved document.",
      scene: {
        badge: "Illustrative example",
        received: { title: "New request", file: "Customer ESG questionnaire.xlsx", meta: "Forwarded by email" },
        preparing: {
          title: "Preparing the answer",
          rows: ["Questions mapped", "Confirmed evidence reused", "Missing information requested"]
        },
        ready: { title: "Ready for your approval", summary: "Draft response with evidence", approve: "Approve", approved: "Approved" }
      },
      items: [
        {
          title: "You hand it over",
          body: "Forward a customer request, or tell us which records, calculations or reports are due. Email, form or portal, no new brief needed."
        },
        {
          title: "We prepare it",
          body: "Our system reads your data and prepares the document. A person at Evipace reviews it and asks you only for what is missing."
        },
        {
          title: "You approve",
          body: "You check the result in your Evipace portal and approve it when it is right. Nothing is sent before that."
        }
      ]
    },
    forwardable: {
      label: "What we take over",
      title: "The documentation your plant has to keep, we keep for you.",
      intro: "Start with what costs you the most time. If your need looks different, send it anyway and we will tell you what we can take over.",
      items: [
        {
          icon: "evidence",
          title: "Records and deadlines",
          body: "Permits, certificates and evidence, with the dates they expire or have to be renewed"
        },
        {
          icon: "carbon",
          title: "Calculations",
          body: "Scope 1 and 2 emissions, calculated from your invoices and meter readings"
        },
        {
          icon: "assessment",
          title: "Reports",
          body: "Sustainability reports such as VSME, prepared for your approval"
        },
        {
          icon: "questionnaire",
          title: "Customer questionnaires",
          body: "ESG questionnaires from your customers, in Excel, Word or a portal"
        },
        {
          icon: "selfAssessment",
          title: "EcoVadis and supplier assessments",
          body: "Answers and evidence for assessments (Evipace is not affiliated with EcoVadis)"
        },
        {
          icon: "conduct",
          title: "Policies and customer codes",
          body: "Policies and declarations your customers ask you to confirm"
        }
      ],
      link: "See how we work with you"
    },
    reuse: {
      label: "Faster the second time",
      title: "What you confirm once is ready for the next request.",
      body: "Evidence you have confirmed is kept and reused for later requests, after we check that its period, scope and validity still fit. You find it in the evidence library in your Evipace portal.",
      badge: "Illustrative example",
      visualLabel: "Illustrative example of an evidence folder with confirmed documents and one that needs an update",
      folder: "Evidence library",
      confirmed: "Confirmed",
      needsUpdate: "Needs update",
      documents: [
        { name: "Environmental policy", detail: "Policy document", status: "confirmed", type: "pdf" },
        { name: "Electricity invoices", detail: "Reporting year", status: "confirmed", type: "pdf" },
        { name: "Management system certificate", detail: "Validity to be checked", status: "update", type: "pdf" },
        { name: "Scope 1 and 2 calculation", detail: "Calculation sheet", status: "confirmed", type: "xlsx" }
      ]
    },
    example: {
      label: "Prepared by us, approved by you",
      title: "A service with people in it, not software you have to run.",
      body: "Preparation uses automation; a person reviews the result.",
      lanes: [
        {
          title: "Preparation",
          points: [
            "The request is mapped question by question",
            "Evidence you have confirmed is reused",
            "Missing information is listed for you"
          ]
        },
        {
          title: "Review",
          points: [
            "A person at Evipace reviews the response",
            "You review and approve it",
            "You send it to your customer"
          ]
        }
      ],
      badge: "Illustrative example · not a client case",
      cardTitle: "Prepared response",
      rows: [
        ["Question", "What were your Scope 2 emissions in the reporting year?"],
        ["Draft response", "Wording based on your electricity data and a documented calculation."],
        ["Evidence", "Electricity invoices and the calculation sheet."],
        ["To confirm", "Reporting period and organisational boundary."]
      ],
      status: "Needs your approval"
    },
    trust: {
      label: "Trust",
      title: "Who we are, how we treat your files, and who decides.",
      illustrationLabel: "Illustration: a folder, a document and an approval mark",
      items: [
        {
          title: "Who we are",
          body: "Evipace is based in Ljubljana, Slovenia, and takes over ESG documentation for manufacturing companies.",
          link: { label: "About Evipace", href: "/en/about" }
        },
        {
          title: "Your files",
          body: "Files and information you send us are stored privately and used only to process your request.",
          link: { label: "Privacy Policy", href: "/en/privacy" }
        },
        {
          title: "Your approval",
          body: "The final response is yours: you decide what goes to your customer, and you send it.",
          link: { label: "Our methodology", href: "/en/methodology" }
        }
      ]
    },
    faq: {
      label: "Questions",
      title: "Before you hand over the first task.",
      items: [
        {
          q: "What can I hand over?",
          a: "Records and deadlines, Scope 1 and 2 calculations, sustainability reports, and customer requests such as ESG questionnaires or EcoVadis. Forward the original email or the files you have."
        },
        {
          q: "What do you need from me?",
          a: "The request or the data you already have, such as invoices and certificates. We ask only for what is still missing."
        },
        {
          q: "Do you send anything to my customer?",
          a: "No. We prepare the response. You review and approve it, and you send it."
        },
        {
          q: "How are my files handled?",
          a: "Files and information you send us are stored privately and used only to process your request. Details are in our Privacy Policy."
        },
        {
          q: "Is Evipace affiliated with EcoVadis or other platforms?",
          a: "No. Evipace is independent and is not affiliated with, accredited by or endorsed by EcoVadis or any other assessment platform. We help you prepare your own response."
        },
        {
          q: "Do you carry out measurements and inspections yourselves?",
          a: "No. We do not carry out measurements or inspections. Where an accredited one is needed, a provider of your choice does it, and we bring the results into your documentation."
        },
        {
          q: "How do you decide scope and price?",
          a: "After reviewing your request, we confirm scope and price before we start."
        }
      ]
    },
    cta: {
      slogan: BRAND_LINE,
      title: "Have documentation waiting?",
      body: "Send it today, and we will tell you what we can take over.",
      formLink: "Or use the request form",
      offersLink: "See the ways to work with us"
    }
  },
  de: {
    hero: {
      eyebrow: "ESG-Dokumentation für Produktionsunternehmen",
      title: "Weniger Papierkram. Mehr Produktion.",
      body: "Wir bereiten Ihre Berichte, Nachweise und Kundenfragebögen vor. Eine Person bei Evipace prüft, Sie geben frei.",
      forward: "Anfrage senden",
      formLink: "Oder das Anfrageformular nutzen",
      note: "Ohne Ihre Freigabe verlässt nichts das Haus.",
      callPrompt: "Lieber zuerst sprechen?",
      callLabel: "Rufen Sie uns an"
    },
    flow: {
      label: "Beispiel: ein Kundenfragebogen wartet auf Ihre Freigabe",
      badge: "Beispiel",
      title: "ESG-Fragebogen eines Kunden",
      due: "Fällig am Freitag",
      steps: ["Vorbereitet", "Von Evipace geprüft", "Ihre Freigabe"],
      ready: "Bereit zu Ihrer Freigabe",
      sent: "Freigegeben und an Ihren Kunden gesendet",
      approve: "Freigeben",
      approved: "Freigegeben"
    },
    assurances: {
      label: "So arbeiten wir",
      items: [
        "Nachweise und Fristen",
        "Scope-1- und Scope-2-Berechnungen und Berichte",
        "Kundenfragebögen und EcoVadis-Anfragen",
        "Mit Sitz in Ljubljana, Slowenien"
      ]
    },
    statement:
      "Dokumentation sollte der Produktion keine Zeit nehmen. Wir übernehmen sie, Sie bestätigen sie.",
    steps: {
      label: "So funktioniert es",
      title: "Drei Schritte von der Übergabe zum freigegebenen Dokument.",
      scene: {
        badge: "Beispiel",
        received: { title: "Neue Anfrage", file: "ESG-Fragebogen des Kunden.xlsx", meta: "Per E-Mail weitergeleitet" },
        preparing: {
          title: "Antwort in Vorbereitung",
          rows: ["Fragen zugeordnet", "Bestätigte Nachweise wiederverwendet", "Fehlende Angaben angefragt"]
        },
        ready: { title: "Bereit zur Freigabe", summary: "Antwortentwurf mit Nachweisen", approve: "Freigeben", approved: "Freigegeben" }
      },
      items: [
        {
          title: "Sie übergeben",
          body: "Leiten Sie eine Kundenanfrage weiter oder sagen Sie uns, welche Nachweise, Berechnungen oder Berichte anstehen. Per E-Mail, Formular oder Portal, ohne neues Briefing."
        },
        {
          title: "Wir bereiten vor",
          body: "Unser System liest Ihre Daten und bereitet das Dokument vor. Eine Person bei Evipace prüft es und fragt nur nach dem, was fehlt."
        },
        {
          title: "Sie geben frei",
          body: "Sie prüfen das Ergebnis in Ihrem Evipace-Portal und geben es frei, wenn es stimmt. Vorher wird nichts versendet."
        }
      ]
    },
    forwardable: {
      label: "Was wir übernehmen",
      title: "Die Dokumentation, die Ihr Werk führen muss, führen wir für Sie.",
      intro: "Beginnen Sie mit dem, was Sie am meisten Zeit kostet. Sieht Ihr Bedarf anders aus, senden Sie ihn trotzdem. Wir sagen Ihnen, was wir übernehmen können.",
      items: [
        {
          icon: "evidence",
          title: "Nachweise und Fristen",
          body: "Genehmigungen, Zertifikate und Nachweise, mit den Terminen, an denen sie ablaufen oder erneuert werden müssen"
        },
        {
          icon: "carbon",
          title: "Berechnungen",
          body: "Scope-1- und Scope-2-Emissionen, berechnet aus Ihren Rechnungen und Zählerständen"
        },
        {
          icon: "assessment",
          title: "Berichte",
          body: "Nachhaltigkeitsberichte wie VSME, vorbereitet zu Ihrer Freigabe"
        },
        {
          icon: "questionnaire",
          title: "Kundenfragebögen",
          body: "ESG-Fragebögen Ihrer Kunden, in Excel, Word oder in einem Portal"
        },
        {
          icon: "selfAssessment",
          title: "EcoVadis und Lieferantenbewertungen",
          body: "Antworten und Nachweise für Bewertungen (Evipace ist nicht mit EcoVadis verbunden)"
        },
        {
          icon: "conduct",
          title: "Richtlinien und Kundenkodizes",
          body: "Richtlinien und Erklärungen, die Ihre Kunden von Ihnen bestätigt haben möchten"
        }
      ],
      link: "So arbeiten wir mit Ihnen"
    },
    reuse: {
      label: "Beim zweiten Mal schneller",
      title: "Was Sie einmal bestätigen, steht für die nächste Anfrage bereit.",
      body: "Von Ihnen bestätigte Nachweise bleiben erhalten und werden für spätere Anfragen wiederverwendet, nachdem wir Zeitraum, Geltungsbereich und Gültigkeit geprüft haben. Sie finden sie in der Nachweisbibliothek in Ihrem Evipace-Portal.",
      badge: "Beispiel",
      visualLabel: "Beispielhafte Darstellung einer Nachweismappe mit bestätigten Dokumenten und einem Dokument, das aktualisiert werden muss",
      folder: "Nachweisbibliothek",
      confirmed: "Bestätigt",
      needsUpdate: "Aktualisieren",
      documents: [
        { name: "Umweltrichtlinie", detail: "Richtliniendokument", status: "confirmed", type: "pdf" },
        { name: "Stromrechnungen", detail: "Berichtsjahr", status: "confirmed", type: "pdf" },
        { name: "Zertifikat Managementsystem", detail: "Gültigkeit zu prüfen", status: "update", type: "pdf" },
        { name: "Scope-1- und Scope-2-Berechnung", detail: "Berechnungsdatei", status: "confirmed", type: "xlsx" }
      ]
    },
    example: {
      label: "Von uns vorbereitet, von Ihnen freigegeben",
      title: "Eine Dienstleistung mit Menschen, keine Software, die Sie bedienen müssen.",
      body: "Die Vorbereitung nutzt Automatisierung; eine Person prüft das Ergebnis.",
      lanes: [
        {
          title: "Vorbereitung",
          points: [
            "Die Anfrage wird Frage für Frage zugeordnet",
            "Von Ihnen bestätigte Nachweise werden wiederverwendet",
            "Fehlende Angaben werden für Sie aufgelistet"
          ]
        },
        {
          title: "Prüfung",
          points: [
            "Eine Person bei Evipace prüft die Antwort",
            "Sie prüfen und geben sie frei",
            "Sie senden sie an Ihren Kunden"
          ]
        }
      ],
      badge: "Beispiel · kein Kundenprojekt",
      cardTitle: "Vorbereitete Antwort",
      rows: [
        ["Frage", "Wie hoch waren Ihre Scope-2-Emissionen im Berichtsjahr?"],
        ["Antwortentwurf", "Formulierung auf Grundlage Ihrer Stromdaten und einer dokumentierten Berechnung."],
        ["Nachweise", "Stromrechnungen und Berechnungsdatei."],
        ["Zu bestätigen", "Berichtszeitraum und Unternehmensgrenze."]
      ],
      status: "Wartet auf Ihre Freigabe"
    },
    trust: {
      label: "Vertrauen",
      title: "Wer wir sind, wie wir mit Ihren Dateien umgehen und wer entscheidet.",
      illustrationLabel: "Illustration: eine Mappe, ein Dokument und ein Freigabezeichen",
      items: [
        {
          title: "Wer wir sind",
          body: "Evipace hat seinen Sitz in Ljubljana, Slowenien, und übernimmt ESG-Dokumentation für Produktionsunternehmen.",
          link: { label: "Über Evipace", href: "/de/about" }
        },
        {
          title: "Ihre Dateien",
          body: "Dateien und Informationen, die Sie uns senden, werden vertraulich gespeichert und ausschließlich zur Bearbeitung Ihrer Anfrage verwendet.",
          link: { label: "Datenschutzerklärung", href: "/de/privacy" }
        },
        {
          title: "Ihre Freigabe",
          body: "Die endgültige Antwort gehört Ihnen: Sie entscheiden, was an Ihren Kunden geht, und Sie versenden sie.",
          link: { label: "Unsere Methodik", href: "/de/methodology" }
        }
      ]
    },
    faq: {
      label: "Fragen",
      title: "Bevor Sie die erste Aufgabe übergeben.",
      items: [
        {
          q: "Was kann ich übergeben?",
          a: "Nachweise und Fristen, Scope-1- und Scope-2-Berechnungen, Nachhaltigkeitsberichte und Kundenanfragen wie ESG-Fragebögen oder EcoVadis. Leiten Sie die ursprüngliche E-Mail oder Ihre vorhandenen Dateien weiter."
        },
        {
          q: "Was benötigen Sie von mir?",
          a: "Die Anfrage oder die Daten, die Sie bereits haben, etwa Rechnungen und Zertifikate. Wir fragen nur nach dem, was noch fehlt."
        },
        {
          q: "Senden Sie etwas an meinen Kunden?",
          a: "Nein. Wir bereiten die Antwort vor. Sie prüfen sie, geben sie frei und versenden sie selbst."
        },
        {
          q: "Wie werden meine Dateien behandelt?",
          a: "Dateien und Informationen, die Sie uns senden, werden vertraulich gespeichert und ausschließlich zur Bearbeitung Ihrer Anfrage verwendet. Einzelheiten stehen in unserer Datenschutzerklärung."
        },
        {
          q: "Ist Evipace mit EcoVadis oder anderen Plattformen verbunden?",
          a: "Nein. Evipace ist unabhängig und weder mit EcoVadis noch mit einer anderen Bewertungsplattform verbunden, von ihr akkreditiert oder empfohlen. Wir unterstützen Sie bei der Vorbereitung Ihrer eigenen Antwort."
        },
        {
          q: "Führen Sie Messungen und Prüfungen selbst durch?",
          a: "Nein. Wir führen keine Messungen oder Prüfungen durch. Wo eine akkreditierte nötig ist, übernimmt sie ein Anbieter Ihrer Wahl, und wir übernehmen die Ergebnisse in Ihre Dokumentation."
        },
        {
          q: "Wie legen Sie Umfang und Preis fest?",
          a: "Nach der Prüfung bestätigen wir Umfang und Preis, bevor wir beginnen."
        }
      ]
    },
    cta: {
      slogan: BRAND_LINE_DE,
      title: "Wartet Dokumentation auf Sie?",
      body: "Senden Sie sie heute, und wir sagen Ihnen, was wir übernehmen können.",
      formLink: "Oder das Anfrageformular nutzen",
      offersLink: "Wege der Zusammenarbeit ansehen"
    }
  }
};
