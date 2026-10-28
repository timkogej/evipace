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
  visual: {
    badge: string;
    label: string;
    folder: string;
    title: string;
    rows: Array<{ step: string; detail: string; status: string; tone: "done" | "open" | "wait" }>;
    reviewer: string;
    approve: string;
    /** Shown at the end of the hero scroll, once the response is approved. */
    approved: string;
    approvedNote: string;
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

/** Brand line: stays English in every locale. */
export const BRAND_LINE = "ESG work. Done right. Done faster.";

export const homeContent: Record<HomeLocale, HomeContent> = {
  en: {
    hero: {
      eyebrow: "Your external desk for customer sustainability and supply-chain requests",
      title: "Forward your customer's request. We prepare the answer.",
      body: "Got an ESG questionnaire, an EcoVadis request, a carbon data request or a customer code of conduct? Forward it. We map it, reuse the evidence you have already confirmed, ask only for what is missing, and prepare the response for you to review and approve. Forward it by email or upload it.",
      forward: "Forward your request",
      formLink: "Or send it via the form",
      note: "You review and approve everything before anything is sent.",
      callPrompt: "Prefer to talk first?",
      callLabel: "Call us"
    },
    visual: {
      badge: "Illustrative example",
      label: "Illustrative example of how a forwarded request moves through the desk",
      folder: "Customer request",
      title: "Request desk",
      rows: [
        { step: "Request received", detail: "Forwarded by email", status: "Done", tone: "done" },
        { step: "Mapped to your evidence", detail: "Confirmed evidence reused", status: "Done", tone: "done" },
        { step: "Missing information", detail: "We ask only for what is missing", status: "Your input", tone: "open" },
        { step: "Response prepared", detail: "Reviewed by a person at Evipace", status: "Ready", tone: "done" }
      ],
      reviewer: "Waiting for your approval",
      approve: "Review and approve",
      approved: "Approved",
      approvedNote: "Approved by you"
    },
    assurances: {
      label: "How we work",
      items: [
        "Excel, Word and portal questionnaires",
        "A person reviews every response",
        "Only evidence you have confirmed is reused",
        "Based in Ljubljana, Slovenia"
      ]
    },
    statement:
      "Your customer's request does not have to land on your desk. Forward it, and we turn what you have already confirmed into an answer that is ready for your approval.",
    steps: {
      label: "How it works",
      title: "Three steps from request to approved response.",
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
          title: "Send us the request",
          body: "Forward it by email, upload it in the form, or add it in your Evipace portal. No new brief is needed."
        },
        {
          title: "We prepare the answer",
          body: "We map the request, reuse the evidence you have already confirmed and ask you only for what is missing."
        },
        {
          title: "You review and approve in your Evipace portal",
          body: "You check the prepared answer in your portal and approve it when it is right."
        }
      ]
    },
    forwardable: {
      label: "What you can forward",
      title: "If your customer asked for it, you can forward it.",
      intro: "These are the requests we see most often. If yours looks different, send it anyway and we will tell you what we can prepare.",
      items: [
        {
          icon: "questionnaire",
          title: "ESG questionnaire",
          body: "Sustainability questionnaires from your customers, in Excel, Word or a portal"
        },
        {
          icon: "assessment",
          title: "EcoVadis request",
          body: "Preparing the assessment answers and evidence (Evipace is not affiliated with EcoVadis)"
        },
        { icon: "carbon", title: "Carbon data request", body: "Scope 1 and 2 data and calculations" },
        {
          icon: "conduct",
          title: "Customer code of conduct",
          body: "Policies and declarations your customer asks you to confirm"
        },
        {
          icon: "selfAssessment",
          title: "Supplier self-assessment",
          body: "Supplier forms and platform invitations"
        },
        {
          icon: "evidence",
          title: "Evidence and policies",
          body: "Collecting and organising what you already have"
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
          body: "Evipace is based in Ljubljana, Slovenia, and works for manufacturers and suppliers in European supply chains.",
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
      title: "Before you forward the first request.",
      items: [
        {
          q: "What can I forward?",
          a: "Customer requests about sustainability and responsible supply chains: ESG questionnaires, EcoVadis requests, carbon data requests, customer codes of conduct and similar. Forward the original email or the files you received."
        },
        {
          q: "What do you need from me?",
          a: "The request itself. Once we have mapped it, we ask only for the information and evidence that is still missing."
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
          q: "How do you decide scope and price?",
          a: "After reviewing your request, we confirm scope and price before we start."
        }
      ]
    },
    cta: {
      slogan: BRAND_LINE,
      title: "Have a customer request waiting?",
      body: "Forward it today, and we will tell you what we can prepare.",
      formLink: "Or send it via the form",
      offersLink: "See the ways to work with us"
    }
  },
  de: {
    hero: {
      eyebrow: "Ihr externer Schreibtisch für Nachhaltigkeits- und Lieferketten-Anfragen Ihrer Kunden",
      title: "Leiten Sie die Anfrage Ihres Kunden weiter. Wir bereiten die Antwort vor.",
      body: "Eine ESG-Anfrage, eine EcoVadis-Anfrage, eine Anfrage zu CO2-Daten oder ein Verhaltenskodex Ihres Kunden? Leiten Sie sie weiter. Wir ordnen sie zu, nutzen bereits bestätigte Nachweise, fragen nur nach Fehlendem und bereiten die Antwort zur Prüfung und Freigabe vor. Leiten Sie sie per E-Mail weiter oder laden Sie sie hoch.",
      forward: "Anfrage weiterleiten",
      formLink: "Oder über das Formular senden",
      note: "Sie prüfen und geben alles frei, bevor etwas versendet wird.",
      callPrompt: "Lieber zuerst sprechen?",
      callLabel: "Rufen Sie uns an"
    },
    visual: {
      badge: "Beispiel",
      label: "Beispielhafte Darstellung, wie eine weitergeleitete Anfrage bearbeitet wird",
      folder: "Kundenanfrage",
      title: "Anfragen-Schreibtisch",
      rows: [
        { step: "Anfrage eingegangen", detail: "Per E-Mail weitergeleitet", status: "Erledigt", tone: "done" },
        { step: "Ihren Nachweisen zugeordnet", detail: "Bestätigte Nachweise genutzt", status: "Erledigt", tone: "done" },
        { step: "Fehlende Angaben", detail: "Wir fragen nur nach Fehlendem", status: "Ihre Angabe", tone: "open" },
        { step: "Antwort vorbereitet", detail: "Von einer Person bei Evipace geprüft", status: "Bereit", tone: "done" }
      ],
      reviewer: "Wartet auf Ihre Freigabe",
      approve: "Prüfen und freigeben",
      approved: "Freigegeben",
      approvedNote: "Von Ihnen freigegeben"
    },
    assurances: {
      label: "So arbeiten wir",
      items: [
        "Fragebögen in Excel, Word und Portalen",
        "Eine Person prüft jede Antwort",
        "Nur von Ihnen bestätigte Nachweise werden wiederverwendet",
        "Mit Sitz in Ljubljana, Slowenien"
      ]
    },
    statement:
      "Die Anfrage Ihres Kunden muss nicht auf Ihrem Schreibtisch liegen bleiben. Leiten Sie sie weiter, und wir machen aus dem, was Sie bereits bestätigt haben, eine Antwort, die bereit für Ihre Freigabe ist.",
    steps: {
      label: "So funktioniert es",
      title: "Drei Schritte von der Anfrage zur freigegebenen Antwort.",
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
          title: "Senden Sie uns die Anfrage",
          body: "Leiten Sie sie per E-Mail weiter, laden Sie sie im Formular hoch oder fügen Sie sie in Ihrem Evipace-Portal hinzu. Ein neues Briefing ist nicht nötig."
        },
        {
          title: "Wir bereiten die Antwort vor",
          body: "Wir ordnen die Anfrage zu, nutzen bereits bestätigte Nachweise und fragen nur nach dem, was fehlt."
        },
        {
          title: "Sie prüfen und geben in Ihrem Evipace-Portal frei",
          body: "Sie prüfen die vorbereitete Antwort in Ihrem Portal und geben sie frei, wenn sie stimmt."
        }
      ]
    },
    forwardable: {
      label: "Was Sie weiterleiten können",
      title: "Wenn Ihr Kunde danach fragt, können Sie es weiterleiten.",
      intro: "Diese Anfragen sehen wir am häufigsten. Sieht Ihre anders aus, senden Sie sie trotzdem. Wir sagen Ihnen, was wir vorbereiten können.",
      items: [
        {
          icon: "questionnaire",
          title: "ESG-Fragebogen",
          body: "Nachhaltigkeitsfragebögen Ihrer Kunden, in Excel, Word oder in einem Portal"
        },
        {
          icon: "assessment",
          title: "EcoVadis-Anfrage",
          body: "Vorbereitung der Antworten und Nachweise für die Bewertung (Evipace ist nicht mit EcoVadis verbunden)"
        },
        { icon: "carbon", title: "Anfrage zu CO2-Daten", body: "Daten und Berechnungen zu Scope 1 und 2" },
        {
          icon: "conduct",
          title: "Verhaltenskodex des Kunden",
          body: "Richtlinien und Erklärungen, die Ihr Kunde von Ihnen bestätigt haben möchte"
        },
        {
          icon: "selfAssessment",
          title: "Lieferanten-Selbstauskunft",
          body: "Lieferantenformulare und Einladungen auf Plattformen"
        },
        {
          icon: "evidence",
          title: "Nachweise und Richtlinien",
          body: "Sammeln und Ordnen dessen, was bereits vorhanden ist"
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
          body: "Evipace hat seinen Sitz in Ljubljana, Slowenien, und arbeitet für Hersteller und Zulieferer in europäischen Lieferketten.",
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
      title: "Bevor Sie die erste Anfrage weiterleiten.",
      items: [
        {
          q: "Was kann ich weiterleiten?",
          a: "Kundenanfragen zu Nachhaltigkeit und verantwortungsvollen Lieferketten: ESG-Fragebögen, EcoVadis-Anfragen, Anfragen zu CO2-Daten, Verhaltenskodizes Ihrer Kunden und Ähnliches. Leiten Sie die ursprüngliche E-Mail oder die erhaltenen Dateien weiter."
        },
        {
          q: "Was benötigen Sie von mir?",
          a: "Die Anfrage selbst. Nach der Zuordnung fragen wir nur nach den Angaben und Nachweisen, die noch fehlen."
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
          q: "Wie legen Sie Umfang und Preis fest?",
          a: "Nach der Prüfung bestätigen wir Umfang und Preis, bevor wir beginnen."
        }
      ]
    },
    cta: {
      slogan: BRAND_LINE,
      title: "Wartet eine Kundenanfrage auf Sie?",
      body: "Leiten Sie sie heute weiter, und wir sagen Ihnen, was wir vorbereiten können.",
      formLink: "Oder über das Formular senden",
      offersLink: "Wege der Zusammenarbeit ansehen"
    }
  }
};
