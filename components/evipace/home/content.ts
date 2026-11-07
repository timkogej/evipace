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
      title: "Customers ask for ESG documents. We do the work.",
      body: "Questionnaires, EcoVadis, Scope 1 and 2, VSME and records: we take over the preparation, so your team can stay on production.",
      forward: "Send us a request",
      formLink: "Or use the request form",
      note: "A person at Evipace reviews every response.",
      callPrompt: "Prefer to talk first?",
      callLabel: "Call us"
    },
    flow: {
      label: "Example: a customer questionnaire, prepared by Evipace",
      badge: "Example",
      title: "Customer ESG questionnaire",
      due: "Due Friday",
      steps: ["Prepared", "Reviewed by Evipace", "Ready to send"],
      ready: "Ready to send",
      sent: "Approved. You send it to your customer.",
      approve: "Approve",
      approved: "Approved"
    },
    assurances: {
      label: "At a glance",
      items: [
        "Records and deadlines",
        "Scope 1 and 2 calculations and reports",
        "Customer questionnaires and EcoVadis requests",
        "Based in Ljubljana, Slovenia"
      ]
    },
    statement:
      "Documentation should not take time away from production. We take it over.",
    steps: {
      label: "How it works",
      title: "From your request to a finished response in three steps.",
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
      title: "The documentation your customers ask for, we prepare.",
      intro: "Start with what costs you the most time. If your need looks different, send it anyway and we will tell you what we can take over.",
      items: [
        {
          icon: "evidence",
          title: "Records and deadlines",
          body: "Certificates, policies and evidence, with the dates they expire or have to be renewed"
        },
        {
          icon: "carbon",
          title: "Calculations",
          body: "Scope 1 and 2 emissions, calculated from your invoices and meter readings"
        },
        {
          icon: "assessment",
          title: "Reports",
          body: "Sustainability reports such as VSME, prepared from your data"
        },
        {
          icon: "questionnaire",
          title: "Customer questionnaires",
          body: "ESG questionnaires from your customers, in Excel, Word or a portal"
        },
        {
          icon: "selfAssessment",
          title: "EcoVadis and IntegrityNext",
          body: "Answers and evidence for supplier assessments (Evipace is not affiliated with EcoVadis or IntegrityNext)"
        },
        {
          icon: "conduct",
          title: "Codes of conduct and policy requests",
          body: "Answers and supporting documents when a customer asks about your policies or its code of conduct"
        }
      ],
      link: "See how we work with you"
    },
    reuse: {
      label: "Faster the second time",
      title: "Prepared once, ready for the next request.",
      body: "Documents and data you have already provided are kept and reused for later requests, after we check that their period, scope and validity still fit. You find them in your Evipace portal.",
      badge: "Illustrative example",
      visualLabel: "Illustrative example of a document folder with current documents and one that needs an update",
      folder: "Your documents",
      confirmed: "Current",
      needsUpdate: "Needs update",
      documents: [
        { name: "Environmental policy", detail: "Policy document", status: "confirmed", type: "pdf" },
        { name: "Electricity invoices", detail: "Reporting year", status: "confirmed", type: "pdf" },
        { name: "Management system certificate", detail: "Validity to be checked", status: "update", type: "pdf" },
        { name: "Scope 1 and 2 calculation", detail: "Calculation sheet", status: "confirmed", type: "xlsx" }
      ]
    },
    example: {
      label: "How the work is shared",
      title: "A service with people in it, not software you have to run.",
      body: "Preparation uses automation; a person reviews the result.",
      lanes: [
        {
          title: "Preparation",
          points: [
            "The request is mapped question by question",
            "Documents you have already provided are reused",
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
      illustrationLabel: "Illustration: a folder, a document and a check mark",
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
          title: "Who decides",
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
          q: "What does Evipace do?",
          a: "Evipace is an ESG documentation service based in Ljubljana, Slovenia, founded by Tim Kogej. We prepare questionnaire answers, EcoVadis and IntegrityNext material, Scope 1 and 2 calculations, VSME reports and registers of records and deadlines for manufacturers and their suppliers. We provide a service, not software."
        },
        {
          q: "What can I hand over?",
          a: "Customer ESG questionnaires, EcoVadis and IntegrityNext requests, Scope 1 and 2 calculations, VSME reports, and records and deadlines. Forward the original email or the files you have."
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
          q: "What do you not do?",
          a: "We do not do Scope 3 or life-cycle assessments, certification, independent assurance, or measurements and inspections, and we do not prepare environmental or safety documentation. We do not promise an EcoVadis score or that a customer accepts an answer. Where an accredited measurement is needed, a provider of your choice does it, and we bring the results into your documentation."
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
      eyebrow: "ESG-Dokumentation für Hersteller und Lieferanten",
      title: "Ihre Kunden fragen nach ESG-Unterlagen. Wir übernehmen die Arbeit.",
      body: "Fragebögen, EcoVadis, Scope 1 und 2, VSME und Nachweise: Wir übernehmen die Vorbereitung, damit Ihr Team bei der Produktion bleiben kann.",
      forward: "Anfrage senden",
      formLink: "Oder das Anfrageformular nutzen",
      note: "Jede Antwort wird von einer Person bei Evipace geprüft.",
      callPrompt: "Lieber zuerst sprechen?",
      callLabel: "Rufen Sie uns an"
    },
    flow: {
      label: "Beispiel: ein Kundenfragebogen, von Evipace vorbereitet",
      badge: "Beispiel",
      title: "ESG-Fragebogen eines Kunden",
      due: "Fällig am Freitag",
      steps: ["Vorbereitet", "Von Evipace geprüft", "Versandbereit"],
      ready: "Versandbereit",
      sent: "Freigegeben. Sie senden es an Ihren Kunden.",
      approve: "Freigeben",
      approved: "Freigegeben"
    },
    assurances: {
      label: "Auf einen Blick",
      items: [
        "Nachweise und Fristen",
        "Scope-1- und Scope-2-Berechnungen und Berichte",
        "Kundenfragebögen und EcoVadis-Anfragen",
        "Mit Sitz in Ljubljana, Slowenien"
      ]
    },
    statement:
      "Dokumentation sollte der Produktion keine Zeit nehmen. Wir übernehmen sie.",
    steps: {
      label: "So funktioniert es",
      title: "In drei Schritten von der Anfrage zur fertigen Antwort.",
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
      title: "Die Dokumentation, die Ihre Kunden verlangen, bereiten wir vor.",
      intro: "Beginnen Sie mit dem, was Sie am meisten Zeit kostet. Sieht Ihr Bedarf anders aus, senden Sie ihn trotzdem. Wir sagen Ihnen, was wir übernehmen können.",
      items: [
        {
          icon: "evidence",
          title: "Nachweise und Fristen",
          body: "Zertifikate, Richtlinien und Nachweise, mit den Terminen, an denen sie ablaufen oder erneuert werden müssen"
        },
        {
          icon: "carbon",
          title: "Berechnungen",
          body: "Scope-1- und Scope-2-Emissionen, berechnet aus Ihren Rechnungen und Zählerständen"
        },
        {
          icon: "assessment",
          title: "Berichte",
          body: "Nachhaltigkeitsberichte wie VSME, vorbereitet aus Ihren Daten"
        },
        {
          icon: "questionnaire",
          title: "Kundenfragebögen",
          body: "ESG-Fragebögen Ihrer Kunden, in Excel, Word oder in einem Portal"
        },
        {
          icon: "selfAssessment",
          title: "EcoVadis und IntegrityNext",
          body: "Antworten und Nachweise für Lieferantenbewertungen (Evipace ist nicht mit EcoVadis oder IntegrityNext verbunden)"
        },
        {
          icon: "conduct",
          title: "Verhaltenskodizes und Richtlinienanfragen",
          body: "Antworten und Unterlagen, wenn ein Kunde nach Ihren Richtlinien oder seinem Verhaltenskodex fragt"
        }
      ],
      link: "So arbeiten wir mit Ihnen"
    },
    reuse: {
      label: "Beim zweiten Mal schneller",
      title: "Einmal vorbereitet, für die nächste Anfrage bereit.",
      body: "Unterlagen und Daten, die Sie uns schon gegeben haben, bleiben erhalten und werden für spätere Anfragen wiederverwendet, nachdem wir Zeitraum, Geltungsbereich und Gültigkeit geprüft haben. Sie finden sie in Ihrem Evipace-Portal.",
      badge: "Beispiel",
      visualLabel: "Beispielhafte Darstellung einer Dokumentenmappe mit aktuellen Dokumenten und einem Dokument, das aktualisiert werden muss",
      folder: "Ihre Unterlagen",
      confirmed: "Aktuell",
      needsUpdate: "Aktualisieren",
      documents: [
        { name: "Umweltrichtlinie", detail: "Richtliniendokument", status: "confirmed", type: "pdf" },
        { name: "Stromrechnungen", detail: "Berichtsjahr", status: "confirmed", type: "pdf" },
        { name: "Zertifikat Managementsystem", detail: "Gültigkeit zu prüfen", status: "update", type: "pdf" },
        { name: "Scope-1- und Scope-2-Berechnung", detail: "Berechnungsdatei", status: "confirmed", type: "xlsx" }
      ]
    },
    example: {
      label: "So teilen wir die Arbeit",
      title: "Eine Dienstleistung mit Menschen, keine Software, die Sie bedienen müssen.",
      body: "Die Vorbereitung nutzt Automatisierung; eine Person prüft das Ergebnis.",
      lanes: [
        {
          title: "Vorbereitung",
          points: [
            "Die Anfrage wird Frage für Frage zugeordnet",
            "Unterlagen, die Sie uns schon gegeben haben, werden wiederverwendet",
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
      illustrationLabel: "Illustration: eine Mappe, ein Dokument und ein Häkchen",
      items: [
        {
          title: "Wer wir sind",
          body: "Evipace hat seinen Sitz in Ljubljana, Slowenien, und übernimmt ESG-Dokumentation für Hersteller und Lieferanten.",
          link: { label: "Über Evipace", href: "/de/about" }
        },
        {
          title: "Ihre Dateien",
          body: "Dateien und Informationen, die Sie uns senden, werden vertraulich gespeichert und ausschließlich zur Bearbeitung Ihrer Anfrage verwendet.",
          link: { label: "Datenschutzerklärung", href: "/de/privacy" }
        },
        {
          title: "Wer entscheidet",
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
          q: "Was macht Evipace?",
          a: "Evipace ist ein ESG-Dokumentationsservice mit Sitz in Ljubljana, Slowenien, gegründet von Tim Kogej. Wir bereiten für Hersteller und ihre Lieferanten die Antworten auf ESG-Fragebögen, EcoVadis- und IntegrityNext-Unterlagen, Scope-1-und-2-Berechnungen, VSME-Berichte sowie Register für Nachweise und Fristen vor. Wir bieten eine Dienstleistung, keine Software."
        },
        {
          q: "Was kann ich übergeben?",
          a: "ESG-Fragebögen von Kunden, EcoVadis- und IntegrityNext-Anfragen, Scope-1-und-2-Berechnungen, VSME-Berichte sowie Nachweise und Fristen. Leiten Sie die ursprüngliche E-Mail oder Ihre vorhandenen Dateien weiter."
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
          q: "Was machen Sie nicht?",
          a: "Wir erstellen kein Scope 3 und keine Ökobilanzen, vergeben keine Zertifizierungen, bieten keine unabhängige Prüfung (Assurance) an, führen keine Messungen oder Prüfungen durch und bereiten keine Umwelt- oder Arbeitssicherheitsdokumentation vor. Wir versprechen weder einen EcoVadis-Score noch die Annahme einer Antwort durch Ihren Kunden. Wo eine akkreditierte Messung nötig ist, übernimmt sie ein Anbieter Ihrer Wahl, und wir übernehmen die Ergebnisse in Ihre Dokumentation."
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
