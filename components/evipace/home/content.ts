export type HomeLocale = "en" | "de";

type Offer = {
  name: string;
  kind: string;
  forWhom: string;
  included: string[];
  youDo: string[];
};

export type HomeContent = {
  hero: {
    eyebrow: string;
    title: string;
    body: string;
    forward: string;
    formLink: string;
    note: string;
  };
  visual: {
    badge: string;
    label: string;
    folder: string;
    title: string;
    rows: Array<{ step: string; detail: string; status: string; tone: "done" | "open" | "wait" }>;
    reviewer: string;
    approve: string;
  };
  assurances: { label: string; items: string[] };
  steps: { label: string; title: string; items: Array<{ title: string; body: string }> };
  offers: {
    label: string;
    title: string;
    intro: string;
    forWhomLabel: string;
    includedLabel: string;
    youDoLabel: string;
    items: Offer[];
    closing: string;
    cta: string;
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
    items: Array<{ title: string; body: string; link?: { label: string; href: string } }>;
  };
  faq: { label: string; title: string; items: Array<{ q: string; a: string }> };
  cta: { slogan: string; title: string; body: string; formLink: string };
};

/** Brand line: stays English in every locale. */
export const BRAND_LINE = "ESG work. Done right. Done faster.";

export const homeContent: Record<HomeLocale, HomeContent> = {
  en: {
    hero: {
      eyebrow: "Your external desk for customer sustainability and supply-chain requests",
      title: "Forward your customer's request. We prepare the answer.",
      body: "Got an ESG questionnaire, an EcoVadis request, a carbon data request or a customer code of conduct? Forward it. We map it, reuse the evidence you have already confirmed, ask only for what is missing, and prepare the response for you to review and approve.",
      forward: "Forward your request",
      formLink: "Or send it via the form",
      note: "You review and approve everything before anything is sent."
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
      approve: "Review and approve"
    },
    assurances: {
      label: "How we work",
      items: [
        "You approve before anything is sent",
        "A person reviews every response",
        "Only evidence you have confirmed is reused",
        "Slovenia-based"
      ]
    },
    steps: {
      label: "How it works",
      title: "Three steps from request to approved response.",
      items: [
        {
          title: "Forward the request",
          body: "Send the email, questionnaire, spreadsheet or PDF your customer sent you. No new brief is needed."
        },
        {
          title: "We prepare the response",
          body: "We map the request, reuse the evidence you have already confirmed and ask you only for what is missing."
        },
        {
          title: "You review and approve",
          body: "You check the prepared response and approve it. Nothing goes to your customer without your approval."
        }
      ]
    },
    offers: {
      label: "Three ways to work with us",
      title: "Start with one request, or keep a desk for all of them.",
      intro: "Choose what matches the request in front of you. Every option ends the same way: with your review and approval.",
      forWhomLabel: "Who it is for",
      includedLabel: "What is included",
      youDoLabel: "What you do",
      items: [
        {
          name: "Request",
          kind: "One-off request",
          forWhom: "Suppliers who have received a single customer request and need a prepared response.",
          included: [
            "The request mapped to the information you already have",
            "A prepared response with its supporting evidence",
            "A short list of what is still missing"
          ],
          youDo: ["Forward the request", "Provide what is missing", "Review, approve and send the response"]
        },
        {
          name: "Desk",
          kind: "Ongoing desk for recurring requests",
          forWhom: "Suppliers who receive customer requests throughout the year.",
          included: [
            "One address for every incoming request",
            "Confirmed evidence kept ready and reused where it still applies",
            "A prepared response for each request"
          ],
          youDo: [
            "Forward requests as they arrive",
            "Confirm evidence when it changes",
            "Review and approve each response"
          ]
        },
        {
          name: "Report",
          kind: "VSME report",
          forWhom: "Companies that want a voluntary sustainability report based on the VSME standard.",
          included: [
            "A report structure based on VSME",
            "A draft prepared from the data you confirm",
            "A list of open points and missing data"
          ],
          youDo: ["Provide your company data", "Confirm figures and statements", "Review and approve the report"]
        }
      ],
      closing: "After reviewing your request, we confirm scope and price before we start.",
      cta: "Send your request"
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
      items: [
        {
          title: "Who we are",
          body: "Evipace is a Slovenia-based service for manufacturers and suppliers in European supply chains.",
          link: { label: "About Evipace", href: "/en/about" }
        },
        {
          title: "Your files",
          body: "Files and information you send us are stored privately and used only to process your request.",
          link: { label: "Privacy Policy", href: "/en/privacy" }
        },
        {
          title: "Your approval",
          body: "You review and approve everything before anything is sent. The final response is yours.",
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
      body: "Forward it today. You review and approve everything before anything is sent.",
      formLink: "Or send it via the form"
    }
  },
  de: {
    hero: {
      eyebrow: "Ihr externer Schreibtisch für Nachhaltigkeits- und Lieferketten-Anfragen Ihrer Kunden",
      title: "Leiten Sie die Anfrage Ihres Kunden weiter. Wir bereiten die Antwort vor.",
      body: "Eine ESG-Anfrage, eine EcoVadis-Anfrage, eine Anfrage zu CO2-Daten oder ein Verhaltenskodex Ihres Kunden? Leiten Sie sie weiter. Wir ordnen sie zu, nutzen bereits bestätigte Nachweise, fragen nur nach Fehlendem und bereiten die Antwort zur Prüfung und Freigabe vor.",
      forward: "Anfrage weiterleiten",
      formLink: "Oder über das Formular senden",
      note: "Sie prüfen und geben alles frei, bevor etwas versendet wird."
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
      approve: "Prüfen und freigeben"
    },
    assurances: {
      label: "So arbeiten wir",
      items: [
        "Sie geben frei, bevor etwas versendet wird",
        "Eine Person prüft jede Antwort",
        "Nur von Ihnen bestätigte Nachweise werden wiederverwendet",
        "Mit Sitz in Slowenien"
      ]
    },
    steps: {
      label: "So funktioniert es",
      title: "Drei Schritte von der Anfrage zur freigegebenen Antwort.",
      items: [
        {
          title: "Anfrage weiterleiten",
          body: "Senden Sie die E-Mail, den Fragebogen, die Excel-Datei oder das PDF Ihres Kunden. Ein neues Briefing ist nicht nötig."
        },
        {
          title: "Wir bereiten die Antwort vor",
          body: "Wir ordnen die Anfrage zu, nutzen bereits bestätigte Nachweise und fragen nur nach dem, was fehlt."
        },
        {
          title: "Sie prüfen und geben frei",
          body: "Sie prüfen die vorbereitete Antwort und geben sie frei. Ohne Ihre Freigabe geht nichts an Ihren Kunden."
        }
      ]
    },
    offers: {
      label: "Drei Wege der Zusammenarbeit",
      title: "Beginnen Sie mit einer Anfrage oder nutzen Sie einen Schreibtisch für alle.",
      intro: "Wählen Sie, was zur aktuellen Anfrage passt. Jede Variante endet gleich: mit Ihrer Prüfung und Freigabe.",
      forWhomLabel: "Für wen",
      includedLabel: "Was enthalten ist",
      youDoLabel: "Was Sie tun",
      items: [
        {
          name: "Request",
          kind: "Einmalige Anfrage",
          forWhom: "Lieferanten, die eine einzelne Kundenanfrage erhalten haben und eine vorbereitete Antwort benötigen.",
          included: [
            "Zuordnung der Anfrage zu Ihren vorhandenen Informationen",
            "Eine vorbereitete Antwort mit den passenden Nachweisen",
            "Eine kurze Liste der noch fehlenden Angaben"
          ],
          youDo: ["Anfrage weiterleiten", "Fehlende Angaben liefern", "Antwort prüfen, freigeben und versenden"]
        },
        {
          name: "Desk",
          kind: "Laufender Schreibtisch für wiederkehrende Anfragen",
          forWhom: "Lieferanten, die über das Jahr hinweg Kundenanfragen erhalten.",
          included: [
            "Eine Adresse für jede eingehende Anfrage",
            "Bestätigte Nachweise bleiben bereit und werden genutzt, solange sie gültig sind",
            "Eine vorbereitete Antwort für jede Anfrage"
          ],
          youDo: [
            "Anfragen bei Eingang weiterleiten",
            "Nachweise bei Änderungen bestätigen",
            "Jede Antwort prüfen und freigeben"
          ]
        },
        {
          name: "Report",
          kind: "VSME-Bericht",
          forWhom: "Unternehmen, die einen freiwilligen Nachhaltigkeitsbericht auf Basis des VSME-Standards wünschen.",
          included: [
            "Eine Berichtsstruktur auf Basis von VSME",
            "Ein Entwurf aus den von Ihnen bestätigten Daten",
            "Eine Liste offener Punkte und fehlender Daten"
          ],
          youDo: ["Unternehmensdaten bereitstellen", "Kennzahlen und Aussagen bestätigen", "Bericht prüfen und freigeben"]
        }
      ],
      closing: "Nach der Prüfung bestätigen wir Umfang und Preis, bevor wir beginnen.",
      cta: "Anfrage senden"
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
      items: [
        {
          title: "Wer wir sind",
          body: "Evipace ist ein Dienstleister aus Slowenien für Hersteller und Zulieferer in europäischen Lieferketten.",
          link: { label: "Über Evipace", href: "/de/about" }
        },
        {
          title: "Ihre Dateien",
          body: "Dateien und Informationen, die Sie uns senden, werden vertraulich gespeichert und ausschließlich zur Bearbeitung Ihrer Anfrage verwendet.",
          link: { label: "Datenschutzerklärung", href: "/de/privacy" }
        },
        {
          title: "Ihre Freigabe",
          body: "Sie prüfen und geben alles frei, bevor etwas versendet wird. Die endgültige Antwort ist Ihre.",
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
      body: "Leiten Sie sie heute weiter. Sie prüfen und geben alles frei, bevor etwas versendet wird.",
      formLink: "Oder über das Formular senden"
    }
  }
};
