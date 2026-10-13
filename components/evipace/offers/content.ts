import type { HomeLocale } from "../home/content";
import { BRAND_LINE } from "../home/content";

/**
 * Offers page copy. No prices, deadlines, references or figures. The German
 * strings are drafts awaiting the owner's review (DE-REVIEW).
 *
 * The client portal is described only in general terms (review and approval,
 * status, evidence library): its code is not in this repository.
 */

export type OfferId = "request" | "desk" | "report";

type Offer = {
  id: OfferId;
  name: string;
  kind: string;
  forWhom: string;
  note?: string;
  included: string[];
  youDo: string[];
  process: string[];
  weNeed: string[];
};

export type OffersContent = {
  breadcrumb: { home: string; current: string };
  hero: { eyebrow: string; title: string; body: string; jumpLabel: string };
  labels: {
    forWhom: string;
    included: string;
    youDo: string;
    process: string;
    weNeed: string;
    send: string;
  };
  offers: Offer[];
  compare: {
    label: string;
    title: string;
    caption: string;
    rowHeader: string;
    rows: Array<{ label: string; values: [string, string, string] }>;
  };
  steps: { label: string; title: string; items: Array<{ title: string; body: string }> };
  faq: {
    label: string;
    title: string;
    items: Array<{ q: string; a: string; link?: { label: string; page: "privacy" } }>;
  };
  cta: { slogan: string; title: string; body: string; forward: string; formLink: string };
};

export const offersContent: Record<HomeLocale, OffersContent> = {
  en: {
    breadcrumb: { home: "Home", current: "Offers" },
    hero: {
      eyebrow: "Ways to work with Evipace",
      title: "Choose how you want to work with us",
      body: "Forward one request, set up a standing desk, or prepare a voluntary report. We confirm scope and price after reviewing your request, before we start.",
      jumpLabel: "Jump to an offer"
    },
    labels: {
      forWhom: "Who it is for",
      included: "What is included",
      youDo: "What you do",
      process: "How it works",
      weNeed: "What we need from you",
      send: "Send your request"
    },
    offers: [
      {
        id: "request",
        name: "Request",
        kind: "One-off request",
        forWhom: "For a company that has one request from a customer and needs a prepared answer.",
        note: "Requests come in sizes S, M and L, depending on scope: the number of questions, the evidence involved and the number of sites. We set the size after reviewing your request.",
        included: [
          "Mapping of the request",
          "Draft answers from your data and evidence",
          "A list of what is missing",
          "Preparation for review and approval in your Evipace portal"
        ],
        youDo: ["Provide what is missing", "Review the prepared answers", "Approve them"],
        process: [
          "You forward the request by email or upload it.",
          "We review the scope and confirm size and price before we start.",
          "We prepare the draft answers and list what is missing.",
          "You review and approve in your Evipace portal."
        ],
        weNeed: [
          "The original request: the email or the files your customer sent",
          "Documents and data you already have on the topics asked",
          "A contact person for open questions"
        ]
      },
      {
        id: "desk",
        name: "Desk",
        kind: "Standing desk, annual",
        forWhom: "For a company that receives customer requests regularly.",
        included: [
          "Supplier Passport: an organised set of your confirmed evidence",
          "Regular refresh of evidence and annual data for Scope 1 and 2",
          "An intake for requests (forward to desk@evipace.com), including handling of the email",
          "A set number of requests per year included; additional requests at a reduced rate",
          "Priority handling",
          "Access to your Evipace portal with your evidence library"
        ],
        youDo: ["Confirm the evidence", "Review each answer", "Approve each answer"],
        process: [
          "We set up your Supplier Passport from the evidence you confirm.",
          "You forward requests as they arrive.",
          "We prepare each answer and reuse confirmed evidence where it still applies.",
          "You review and approve each answer in your Evipace portal."
        ],
        weNeed: [
          "Your existing policies, certificates and other evidence",
          "Annual energy and fuel data for Scope 1 and 2",
          "A contact person who confirms evidence and approves answers"
        ]
      },
      {
        id: "report",
        name: "Report",
        kind: "VSME report",
        forWhom: "For a company that wants a voluntary VSME report, for example because a customer or a bank asks for one.",
        note: "Where an independent review or public disclosure is needed, we explain the steps and costs in advance.",
        included: [
          "The report structure",
          "A draft from your confirmed data",
          "Preparation for review and approval in your Evipace portal"
        ],
        youDo: ["Provide your company data", "Confirm figures and statements", "Review and approve the report"],
        process: [
          "We agree with you what the report should cover.",
          "You provide the data and confirm what we may use.",
          "We prepare the draft from your confirmed data.",
          "You review and approve the report in your Evipace portal."
        ],
        weNeed: [
          "Company data for the reporting year",
          "Existing policies and evidence",
          "A contact person who confirms figures and statements"
        ]
      }
    ],
    compare: {
      label: "Which one is for me?",
      title: "Three options side by side.",
      caption: "Comparison of Request, Desk and Report",
      rowHeader: "Question",
      rows: [
        {
          label: "Who it is for",
          values: [
            "A company with one customer request",
            "A company that receives requests regularly",
            "A company that wants a voluntary VSME report"
          ]
        },
        {
          label: "How often you receive requests",
          values: ["Once, or rarely", "Several times a year", "Does not depend on requests"]
        },
        {
          label: "What you get",
          values: [
            "Draft answers and a list of what is missing",
            "A Supplier Passport, prepared answers and your evidence library",
            "A report structure and a draft report"
          ]
        },
        {
          label: "Who reviews and approves",
          values: ["You, in your Evipace portal", "You, in your Evipace portal", "You, in your Evipace portal"]
        }
      ]
    },
    steps: {
      label: "How a request works",
      title: "Four steps, the same for every request.",
      items: [
        { title: "Forward", body: "You send us the request by email or upload it." },
        { title: "Review of scope", body: "We review it and confirm scope and price before we start." },
        { title: "Draft", body: "We prepare the answers from your data and evidence and list what is missing." },
        { title: "You approve", body: "You review and approve. Nothing is sent without your approval." }
      ]
    },
    faq: {
      label: "Questions",
      title: "Before you choose.",
      items: [
        {
          q: "Can I start with one request and move to a desk later?",
          a: "Yes. Start with a single request, and we will talk about a desk when it makes sense for you."
        },
        {
          q: "What does it cost?",
          a: "We confirm scope and price after reviewing your request, before we start."
        },
        {
          q: "Do you send anything to my customer?",
          a: "Not without your approval. You review and approve every answer first."
        },
        {
          q: "How is my data handled?",
          a: "Files and information you send us are stored privately and used only to process your request.",
          link: { label: "Privacy Policy", page: "privacy" }
        },
        {
          q: "Are you affiliated with EcoVadis?",
          a: "No. Evipace is independent and is not affiliated with, accredited by or endorsed by EcoVadis or any other platform."
        }
      ]
    },
    cta: {
      slogan: BRAND_LINE,
      title: "Have a customer request waiting?",
      body: "Forward it today. You review and approve everything before anything is sent.",
      forward: "Forward your request",
      formLink: "Or send it via the form"
    }
  },
  de: {
    breadcrumb: { home: "Startseite", current: "Angebot" },
    hero: {
      eyebrow: "Zusammenarbeit mit Evipace",
      title: "Wählen Sie, wie Sie mit uns arbeiten möchten",
      body: "Leiten Sie eine einzelne Anfrage weiter, richten Sie einen laufenden Schreibtisch ein oder bereiten Sie einen freiwilligen Bericht vor. Umfang und Preis bestätigen wir nach der Prüfung Ihrer Anfrage, bevor wir beginnen.",
      jumpLabel: "Direkt zu einem Angebot"
    },
    labels: {
      forWhom: "Für wen",
      included: "Was enthalten ist",
      youDo: "Was Sie tun",
      process: "So läuft es ab",
      weNeed: "Was wir von Ihnen benötigen",
      send: "Anfrage senden"
    },
    offers: [
      {
        id: "request",
        name: "Request",
        kind: "Einmalige Anfrage",
        forWhom: "Für Unternehmen, die eine einzelne Kundenanfrage erhalten haben und eine vorbereitete Antwort benötigen.",
        note: "Anfragen gibt es in den Größen S, M und L, je nach Umfang: Anzahl der Fragen, betroffene Nachweise und Anzahl der Standorte. Die Größe legen wir nach der Prüfung Ihrer Anfrage fest.",
        included: [
          "Zuordnung der Anfrage",
          "Antwortentwürfe aus Ihren Daten und Nachweisen",
          "Eine Liste der fehlenden Angaben",
          "Vorbereitung zur Prüfung und Freigabe in Ihrem Evipace-Portal"
        ],
        youDo: ["Fehlende Angaben liefern", "Vorbereitete Antworten prüfen", "Antworten freigeben"],
        process: [
          "Sie leiten die Anfrage per E-Mail weiter oder laden sie hoch.",
          "Wir prüfen den Umfang und bestätigen Größe und Preis, bevor wir beginnen.",
          "Wir bereiten die Antwortentwürfe vor und listen auf, was fehlt.",
          "Sie prüfen und geben in Ihrem Evipace-Portal frei."
        ],
        weNeed: [
          "Die ursprüngliche Anfrage: die E-Mail oder die Dateien Ihres Kunden",
          "Vorhandene Unterlagen und Daten zu den abgefragten Themen",
          "Eine Ansprechperson für offene Fragen"
        ]
      },
      {
        id: "desk",
        name: "Desk",
        kind: "Laufender Schreibtisch, jährlich",
        forWhom: "Für Unternehmen, die regelmäßig Kundenanfragen erhalten.",
        included: [
          "Supplier Passport: eine geordnete Sammlung Ihrer bestätigten Nachweise",
          "Regelmäßige Aktualisierung der Nachweise und jährliche Daten zu Scope 1 und 2",
          "Ein Eingang für Anfragen (Weiterleitung an desk@evipace.com) einschließlich Bearbeitung der E-Mail",
          "Eine festgelegte Anzahl an Anfragen pro Jahr enthalten; weitere Anfragen zu einem günstigeren Satz",
          "Vorrangige Bearbeitung",
          "Zugang zu Ihrem Evipace-Portal mit Ihrer Nachweisbibliothek"
        ],
        youDo: ["Nachweise bestätigen", "Jede Antwort prüfen", "Jede Antwort freigeben"],
        process: [
          "Wir richten Ihren Supplier Passport aus den von Ihnen bestätigten Nachweisen ein.",
          "Sie leiten Anfragen bei Eingang weiter.",
          "Wir bereiten jede Antwort vor und nutzen bestätigte Nachweise, solange sie gültig sind.",
          "Sie prüfen jede Antwort und geben sie in Ihrem Evipace-Portal frei."
        ],
        weNeed: [
          "Ihre vorhandenen Richtlinien, Zertifikate und weiteren Nachweise",
          "Jährliche Energie- und Kraftstoffdaten für Scope 1 und 2",
          "Eine Ansprechperson, die Nachweise bestätigt und Antworten freigibt"
        ]
      },
      {
        id: "report",
        name: "Report",
        kind: "VSME-Bericht",
        forWhom: "Für Unternehmen, die einen freiwilligen VSME-Bericht wünschen, zum Beispiel weil ein Kunde oder eine Bank danach fragt.",
        note: "Wo eine unabhängige Prüfung oder eine Veröffentlichung nötig ist, erklären wir Schritte und Kosten im Voraus.",
        included: [
          "Die Berichtsstruktur",
          "Ein Entwurf aus Ihren bestätigten Daten",
          "Vorbereitung zur Prüfung und Freigabe in Ihrem Evipace-Portal"
        ],
        youDo: ["Unternehmensdaten bereitstellen", "Kennzahlen und Aussagen bestätigen", "Bericht prüfen und freigeben"],
        process: [
          "Wir stimmen mit Ihnen ab, was der Bericht abdecken soll.",
          "Sie liefern die Daten und bestätigen, was wir verwenden dürfen.",
          "Wir bereiten den Entwurf aus Ihren bestätigten Daten vor.",
          "Sie prüfen den Bericht und geben ihn in Ihrem Evipace-Portal frei."
        ],
        weNeed: [
          "Unternehmensdaten für das Berichtsjahr",
          "Vorhandene Richtlinien und Nachweise",
          "Eine Ansprechperson, die Kennzahlen und Aussagen bestätigt"
        ]
      }
    ],
    compare: {
      label: "Was passt zu mir?",
      title: "Drei Möglichkeiten im Vergleich.",
      caption: "Vergleich von Request, Desk und Report",
      rowHeader: "Frage",
      rows: [
        {
          label: "Für wen",
          values: [
            "Unternehmen mit einer einzelnen Kundenanfrage",
            "Unternehmen, die regelmäßig Anfragen erhalten",
            "Unternehmen, die einen freiwilligen VSME-Bericht wünschen"
          ]
        },
        {
          label: "Wie oft Sie Anfragen erhalten",
          values: ["Einmal oder selten", "Mehrmals im Jahr", "Unabhängig von Anfragen"]
        },
        {
          label: "Was Sie erhalten",
          values: [
            "Antwortentwürfe und eine Liste der fehlenden Angaben",
            "Einen Supplier Passport, vorbereitete Antworten und Ihre Nachweisbibliothek",
            "Eine Berichtsstruktur und einen Berichtsentwurf"
          ]
        },
        {
          label: "Wer prüft und freigibt",
          values: ["Sie, in Ihrem Evipace-Portal", "Sie, in Ihrem Evipace-Portal", "Sie, in Ihrem Evipace-Portal"]
        }
      ]
    },
    steps: {
      label: "So läuft eine Anfrage ab",
      title: "Vier Schritte, bei jeder Anfrage gleich.",
      items: [
        { title: "Weiterleiten", body: "Sie senden uns die Anfrage per E-Mail oder laden sie hoch." },
        { title: "Prüfung des Umfangs", body: "Wir prüfen sie und bestätigen Umfang und Preis, bevor wir beginnen." },
        { title: "Entwurf", body: "Wir bereiten die Antworten aus Ihren Daten und Nachweisen vor und listen auf, was fehlt." },
        { title: "Sie geben frei", body: "Sie prüfen und geben frei. Ohne Ihre Freigabe wird nichts versendet." }
      ]
    },
    faq: {
      label: "Fragen",
      title: "Bevor Sie wählen.",
      items: [
        {
          q: "Kann ich mit einer Anfrage beginnen und später zu einem Desk wechseln?",
          a: "Ja. Beginnen Sie mit einer einzelnen Anfrage. Über einen Desk sprechen wir, wenn es für Sie sinnvoll ist."
        },
        {
          q: "Was kostet es?",
          a: "Umfang und Preis bestätigen wir nach der Prüfung Ihrer Anfrage, bevor wir beginnen."
        },
        {
          q: "Senden Sie etwas an meinen Kunden?",
          a: "Nicht ohne Ihre Freigabe. Sie prüfen jede Antwort und geben sie zuerst frei."
        },
        {
          q: "Wie werden meine Daten behandelt?",
          a: "Dateien und Informationen, die Sie uns senden, werden vertraulich gespeichert und ausschließlich zur Bearbeitung Ihrer Anfrage verwendet.",
          link: { label: "Datenschutzerklärung", page: "privacy" }
        },
        {
          q: "Sind Sie mit EcoVadis verbunden?",
          a: "Nein. Evipace ist unabhängig und weder mit EcoVadis noch mit einer anderen Plattform verbunden, von ihr akkreditiert oder empfohlen."
        }
      ]
    },
    cta: {
      slogan: BRAND_LINE,
      title: "Wartet eine Kundenanfrage auf Sie?",
      body: "Leiten Sie sie heute weiter. Sie prüfen und geben alles frei, bevor etwas versendet wird.",
      forward: "Anfrage weiterleiten",
      formLink: "Oder über das Formular senden"
    }
  }
};
