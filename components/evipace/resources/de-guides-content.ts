import { primarySources } from "@/lib/seo/primary-sources";
import type { EnglishResourceArticleContent } from "./EnglishResourceArticle";

/**
 * German editions of the ESG-questionnaire answer guide and the Scope 2
 * method guide. Same scope limits as the English editions (see
 * english-batch3-content.ts).
 */
export const howToAnswerEsgQuestionnaireContentDe: EnglishResourceArticleContent = {
  eyebrow: "Antworten im ESG-Fragebogen",
  title: "ESG-Fragebogen beantworten: Ja, teilweise, Nein oder nicht zutreffend",
  deck:
    "Ein praktisches Muster, um ESG-Fragen von Kunden wahrheitsgemäß zu beantworten: was die Antworttypen bedeuten, was eine vollständige Antwort enthält und was Sie beifügen.",
  methodNote:
    "Frage - Antworttyp - Geltungsbereich und Zeitraum - Nachweis - Verantwortliche - Lücke.",
  quickAnswerTitle: "Eine Antwort ist eine Aussage plus das Dokument, das sie belegt.",
  summary: [
    "Die meisten ESG-Fragen von Kunden lassen sich mit wenigen Antworttypen beantworten: Ja, teilweise, Nein oder nicht zutreffend. Wichtiger als der Typ ist, was dahintersteht: der Geltungsbereich, der Zeitraum und das Dokument, das die Antwort belegt.",
    "Gibt es das Dokument noch nicht, lautet die ehrliche Antwort Nein oder teilweise, mit einem Hinweis auf das Geplante. Ein Entwurf oder eine Absicht ist kein Ja."
  ],
  quickChecks: [
    {
      title: "Antworttyp wählen.",
      body: "Ja, teilweise, Nein oder nicht zutreffend, nach dem, was das Unternehmen heute tatsächlich hat."
    },
    {
      title: "Bereich und Zeitraum nennen.",
      body: "Welche Standorte oder Gesellschaften und welchen Berichtszeitraum die Antwort abdeckt."
    },
    {
      title: "Nachweis beifügen.",
      body: "Ein aktuelles Dokument, das genau diese Antwort belegt, oder den Hinweis, dass keines existiert."
    },
    {
      title: "Verantwortliche benennen.",
      body: "Die Person oder Funktion, die die Antwort auf Nachfrage bestätigen kann."
    }
  ],
  nav: [
    { number: "01", label: "Antworttypen", href: "#antworttypen" },
    { number: "02", label: "Vollständige Antwort", href: "#vollstaendige-antwort" },
    { number: "03", label: "Typische Fragen", href: "#typische-fragen" },
    { number: "04", label: "Was Sie vermeiden", href: "#vermeiden" },
    { number: "05", label: "Was Evipace tut", href: "#evipace" }
  ],
  sections: [
    {
      id: "antworttypen",
      number: "01",
      title: "Die vier Antworttypen",
      cards: [
        {
          title: "Ja",
          body: "Das Unternehmen hat es heute eingeführt, und ein aktuelles Dokument oder eine Aufzeichnung zeigt es. Eine beschlossene Richtlinie zählt, ein Entwurf nicht."
        },
        {
          title: "Teilweise",
          body: "Ein Teil ist umgesetzt, zum Beispiel an einem Standort oder für einen Teil des Themas. Nennen Sie, welcher Teil, und was fehlt."
        },
        {
          title: "Nein",
          body: "Es ist nicht umgesetzt. Ist ein Schritt geplant, nennen Sie ihn und nur dann ein Datum, wenn das Unternehmen es beschlossen hat."
        },
        {
          title: "Nicht zutreffend",
          body: "Die Frage betrifft Tätigkeiten, die das Unternehmen nicht ausübt. Begründen Sie es in einem Satz und nutzen Sie die Antwort nicht, um einer schwierigen Frage auszuweichen."
        }
      ]
    },
    {
      id: "vollstaendige-antwort",
      number: "02",
      title: "Was eine vollständige Antwort enthält",
      bullets: [
        "Den Antworttyp, klar benannt.",
        "Den Geltungsbereich: welche Gesellschaft, welcher Standort oder welches Sortiment.",
        "Den Berichtszeitraum oder das Datum, bis zu dem das Dokument gültig war.",
        "Das belegende Dokument, benannt, mit Datum oder Version.",
        "Die verantwortliche Person im Unternehmen, die es erklären kann."
      ],
      principle: {
        label: "Faustregel",
        text: "Können Sie kein Dokument und keine Aufzeichnung nennen, sagen Sie das. Eine benannte Lücke lässt sich besser vertreten als eine, die der Kunde selbst findet."
      }
    },
    {
      id: "typische-fragen",
      number: "03",
      title: "Typische Fragearten und wie Sie antworten",
      paragraphs: [
        "Die Tabelle zeigt gängige Fragearten, keine Liste dessen, was jeder Kunde fragt. Wortlaut und verlangte Nachweise ergeben sich aus dem Fragebogen Ihres Kunden."
      ],
      matrix: {
        caption: "Typische Fragearten im ESG-Fragebogen und wie man sie beantwortet",
        columns: ["Frageart", "So antworten Sie", "Nachweis beifügen"],
        rows: [
          [
            "Haben Sie eine Richtlinie zu einem Thema?",
            "Ja nur, wenn sie beschlossen und in Kraft ist. Sonst Nein oder teilweise.",
            "Die beschlossene Richtlinie mit Datum und Verantwortlichem."
          ],
          [
            "Haben Sie ein Zertifikat?",
            "Ja, wenn es heute gültig ist. Nennen Sie, wenn es abgelaufen oder in Verlängerung ist.",
            "Das Zertifikat mit Geltungsbereich und Ablaufdatum."
          ],
          [
            "Geben Sie eine Kennzahl an, etwa Energieverbrauch oder Mitarbeiterzahl",
            "Nennen Sie den Wert für den angegebenen Zeitraum und die Einheit; Schätzungen als Schätzung kennzeichnen.",
            "Die Rechnung, den Zählerstand oder das Register, aus dem der Wert stammt."
          ],
          [
            "Schulen Sie Mitarbeitende zu einem Thema?",
            "Beschreiben Sie, was geschieht und für wen, nicht was beabsichtigt ist.",
            "Schulungsnachweise oder einen Schulungsplan."
          ],
          [
            "Überwachen Sie Ihre eigenen Lieferanten?",
            "Beschreiben Sie den tatsächlichen Prozess. Gibt es keinen, antworten Sie Nein.",
            "Den Lieferantenkodex, Fragebogen oder Prüfnachweis."
          ],
          [
            "Gab es Vorfälle oder Beschwerden?",
            "Antworten Sie für den genannten Zeitraum; gab es keine, sagen Sie keine in diesem Zeitraum.",
            "Das Vorfall- oder Beschwerdeprotokoll."
          ]
        ]
      }
    },
    {
      id: "vermeiden",
      number: "04",
      title: "Was Sie vermeiden",
      bullets: [
        "Ja antworten, wenn etwas nur geplant oder als Entwurf vorliegt.",
        "Eine Zahl aufrunden oder eine Schätzung als Messung darstellen.",
        "Eine Aussage ohne Dokument einfügen.",
        "Nicht zutreffend wählen, um einer Frage auszuweichen, die zutrifft.",
        "Eine Frage leer lassen, ohne zu sagen, warum."
      ]
    },
    {
      id: "evipace",
      number: "05",
      title: "Was Evipace tut und was nicht",
      paragraphs: [
        "Evipace liest den Fragebogen, ordnet jede Frage Ihren vorhandenen Daten und Dokumenten zu, bereitet die Antworten im oben beschriebenen Aufbau vor und listet auf, was fehlt. Eine Person bei Evipace prüft das Ergebnis, und Sie senden es selbst an Ihren Kunden.",
        "Evipace erzeugt keine Nachweise, die es nicht gibt, und kann nicht garantieren, dass ein Kunde eine Antwort akzeptiert."
      ],
      links: [
        { label: "ESG-Fragebogen für Lieferanten", href: "/de/esg-kundenanfragen" },
        {
          label: "ESG-Fragebogen-Checkliste für Lieferanten",
          href: "/de/ressourcen/esg-fragebogen-checkliste-lieferanten"
        },
        {
          label: "ESG-Nachweise für Lieferanten",
          href: "/de/ressourcen/esg-nachweise-lieferanten"
        }
      ]
    }
  ],
  cta: {
    eyebrow: "ESG-Fragebogen",
    title: "Der Fragebogen liegt vor Ihnen?",
    body:
      "Leiten Sie ihn weiter. Wir ordnen jede Frage Ihren vorhandenen Dokumenten zu, bereiten die Antworten vor und listen die Lücken auf.",
    primaryLabel: "ESG-Anfrage senden",
    primaryHref: "/de/send-request",
    secondaryLabel: "ESG-Fragebogen für Lieferanten",
    secondaryHref: "/de/esg-kundenanfragen"
  },
  faq: [
    {
      question: "Soll ich Ja antworten, wenn eine Richtlinie fast fertig ist?",
      answer:
        "Nein. Eine Richtlinie zählt, sobald sie beschlossen und in Kraft ist. Bis dahin antworten Sie Nein oder teilweise und nennen, falls das Unternehmen ein Datum beschlossen hat, was geplant ist."
    },
    {
      question: "Wann ist „nicht zutreffend“ die richtige Antwort?",
      answer:
        "Wenn die Frage eine Tätigkeit betrifft, die das Unternehmen nicht ausübt. Geben Sie eine Begründung in einem Satz. Trifft das Thema zu und es ist nichts umgesetzt, lautet die Antwort Nein."
    },
    {
      question: "Muss ich jeder Antwort ein Dokument beifügen?",
      answer:
        "Fügen Sie eines bei, wo der Fragebogen es erlaubt und ein Dokument existiert. Gibt es keines, sagen Sie das, statt etwas beizufügen, das die Antwort nicht belegt."
    },
    {
      question: "Kann Evipace garantieren, dass der Kunde meine Antworten akzeptiert?",
      answer:
        "Nein. Evipace bereitet wahrheitsgemäße, strukturierte Antworten vor und zeigt die Lücken. Die Akzeptanz entscheidet Ihr Kunde."
    }
  ],
  sources: []
};

export const scope2LocationMarketContentDe: EnglishResourceArticleContent = {
  eyebrow: "Scope 2 Strom",
  title: "Scope 2: location-based und market-based einfach erklärt",
  deck:
    "Warum derselbe Stromverbrauch zwei Scope-2-Werte ergeben kann, welche Daten jede Methode braucht und was Sie festhalten.",
  methodNote:
    "Stromverbrauch - Methode - Emissionsfaktor - Vertragsinformation - Quelle.",
  quickAnswerTitle: "Dieselben kWh, zwei Methoden, zwei Ergebnisse.",
  summary: [
    "Die location-based Methode wendet den durchschnittlichen Emissionsfaktor des Stromnetzes an, in dem der Strom verbraucht wird. Die market-based Methode bildet den Strom ab, den ein Unternehmen gewählt hat, anhand von Vertragsinformationen wie lieferantenspezifischen Faktoren oder Herkunftsnachweisen.",
    "Der GHG Protocol Scope 2 Guidance zufolge sollen Unternehmen mit Standorten in Märkten, die solche Vertragsinformationen bieten, beide Werte berichten. Die Kilowattstunden sind dieselben, Emissionsfaktoren und Nachweise unterscheiden sich."
  ],
  quickChecks: [
    {
      title: "kWh erfassen.",
      body: "Stromverbrauch je Standort und Zeitraum, aus Rechnungen oder Zählern."
    },
    {
      title: "Netzfaktor anwenden.",
      body: "Für location-based: den Faktor des Netzes, in dem der Standort Strom bezieht."
    },
    {
      title: "Vertragsinformationen sammeln.",
      body: "Für market-based: Lieferantenfaktoren, Zertifikate oder Verträge für denselben Zeitraum."
    },
    {
      title: "Quellen festhalten.",
      body: "Faktor, Quelle und Version zu jedem Wert notieren."
    }
  ],
  nav: [
    { number: "01", label: "Die zwei Methoden", href: "#zwei-methoden" },
    { number: "02", label: "Benötigte Daten", href: "#daten" },
    { number: "03", label: "Ökostrom", href: "#oekostrom" },
    { number: "04", label: "Was dokumentieren", href: "#dokumentieren" },
    { number: "05", label: "Was Evipace tut", href: "#evipace" }
  ],
  sections: [
    {
      id: "zwei-methoden",
      number: "01",
      title: "Die zwei Methoden",
      paragraphs: [
        "Scope 2 umfasst indirekte Emissionen aus eingekaufter Elektrizität, Wärme, Dampf und Kälte. Für Strom beschreibt das GHG Protocol zwei Berechnungswege, die unterschiedliche Fragen beantworten."
      ],
      matrix: {
        caption: "Location-based und market-based Scope 2 im Vergleich",
        columns: ["", "Location-based", "Market-based"],
        rows: [
          [
            "Welche Frage sie beantwortet",
            "Welche Emissionen verursacht das Netz, in dem wir Strom verbrauchen?",
            "Welche Emissionen verursacht der Strom, den wir gewählt haben?"
          ],
          [
            "Emissionsfaktor",
            "Durchschnittsfaktor des Netzes am Standort.",
            "Faktor aus Vertragsinformationen, etwa lieferantenspezifisch oder über Zertifikate."
          ],
          [
            "Nachweis",
            "Verbrauchsdaten und ein veröffentlichter Netzfaktor.",
            "Verbrauchsdaten plus die Vertragsinformation für denselben Zeitraum."
          ],
          [
            "Ändert sich beim Lieferantenwechsel",
            "Nein.",
            "Ja, wenn sich die Vertragsinformation ändert."
          ]
        ]
      },
      sources: [primarySources.ghgScope2Guidance]
    },
    {
      id: "daten",
      number: "02",
      title: "Die Daten, die jede Methode braucht",
      bullets: [
        "Beide: Stromverbrauch je Standort und Berichtszeitraum in kWh oder MWh.",
        "Location-based: ein Netz-Emissionsfaktor je Standort, mit Quelle und Jahr.",
        "Market-based: der Liefervertrag, ein lieferantenspezifischer Faktor oder Herkunftsnachweise für denselben Zeitraum und dieselbe Menge."
      ],
      principle: {
        label: "Ebenen trennen",
        text: "Halten Sie Verbrauch, Faktor und Ergebnis getrennt fest, damit jedes einzeln geprüft und aktualisiert werden kann."
      }
    },
    {
      id: "oekostrom",
      number: "03",
      title: "Und Ökostrom?",
      paragraphs: [
        "Der Stromverbrauch bleibt Teil von Scope 2, ob er als erneuerbar bezeichnet wird oder nicht. Es ändert sich nur die Berechnung: Der market-based Wert kann den Vertrag abbilden, sofern die belegenden Zertifikate oder Vertragsinformationen dokumentiert sind und zu Zeitraum und Menge passen.",
        "Ein Ökostromtarif ohne Dokumentation ändert den Wert nicht. Fehlt der Nachweis, wird die Lücke benannt."
      ]
    },
    {
      id: "dokumentieren",
      number: "04",
      title: "Was Sie festhalten",
      bullets: [
        "Welche Methode jeder berichtete Wert verwendet.",
        "Den Emissionsfaktor, seine Quelle und Version oder sein Jahr.",
        "Bei market-based Werten: welche Vertragsinformation für welchen Zeitraum verwendet wurde.",
        "Annahmen und Schätzungen, als solche gekennzeichnet.",
        "Die Bilanzgrenze: einbezogene Gesellschaften und Standorte."
      ],
      paragraphs: [
        "Die Scope-2-Vorgaben werden überarbeitet. Arbeiten Sie mit dem Standard, der zum Zeitpunkt Ihrer Berechnung gilt, und dokumentieren Sie Ihre Quellen, damit ein späteres Update nachvollziehbar eingearbeitet werden kann."
      ]
    },
    {
      id: "evipace",
      number: "05",
      title: "Was Evipace tut und was nicht",
      paragraphs: [
        "Bei einer Scope-1-und-2-Berechnung hält Evipace fest, welche Methode, Faktoren und Vertragsinformationen verwendet werden, macht Quellen und Annahmen sichtbar und zeigt, was fehlt. Eine Person bei Evipace prüft sie.",
        "Evipace deckt Scope 3 nicht ab und bietet weder Prüfung noch Zertifizierung. Die Berichtsregeln eines Kunden können eine bestimmte Methode verlangen; maßgeblich ist die Anfrage, nicht dieser Leitfaden."
      ],
      links: [
        { label: "Scope 1 und 2 berechnen", href: "/de/scope-1-2-berechnung" },
        {
          label: "Welche Daten für Scope 1 und 2",
          href: "/de/ressourcen/scope-1-2-daten-berechnung"
        },
        {
          label: "Datenerfassungs-Vorlage",
          href: "/de/ressourcen/scope-1-2-datenerfassungs-vorlage"
        }
      ]
    }
  ],
  cta: {
    eyebrow: "Scope 1 und 2 berechnen",
    title: "Rechnungen vorhanden, Berechnung fehlt?",
    body:
      "Senden Sie uns Strom-, Kraftstoff- und Kältemittelunterlagen. Wir bereiten die Scope-1-und-2-Berechnung vor und dokumentieren Quellen und Annahmen.",
    primaryLabel: "ESG-Anfrage senden",
    primaryHref: "/de/send-request",
    secondaryLabel: "Scope 1 und 2 berechnen",
    secondaryHref: "/de/scope-1-2-berechnung"
  },
  faq: [
    {
      question: "Muss ich beide Methoden berichten?",
      answer:
        "Der GHG Protocol Scope 2 Guidance zufolge sollen Unternehmen mit Standorten in Märkten, die Vertragsinformationen bieten, beide berichten. Was Ihr Kunde oder Ihr Berichtsrahmen verlangt, ergibt sich aus der jeweiligen Anfrage."
    },
    {
      question: "Warum unterscheiden sich die beiden Werte?",
      answer:
        "Sie nutzen denselben Stromverbrauch, aber unterschiedliche Emissionsfaktoren. Location-based verwendet den Netzdurchschnitt, market-based bildet Vertragsinformationen wie einen Lieferantenfaktor oder Zertifikate ab."
    },
    {
      question: "Wird der market-based Wert durch Ökostrom automatisch null?",
      answer:
        "Nicht automatisch. Der Wert hängt von dokumentierten Vertragsinformationen ab, die zu Zeitraum und Menge passen. Ohne sie sollte die Lücke benannt werden."
    },
    {
      question: "Berechnet Evipace Scope 3?",
      answer:
        "Nein. Die Berechnung von Evipace umfasst nur Scope 1 und Scope 2."
    }
  ],
  sources: [primarySources.ghgScope2Guidance]
};
