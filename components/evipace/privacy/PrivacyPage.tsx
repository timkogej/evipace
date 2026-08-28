import type { ReactNode } from "react";
import { publicContactEmail } from "@/lib/company-info";

type PrivacyPageProps = {
  locale: "en" | "de";
};

type SectionProps = {
  heading: string;
  children: ReactNode;
};

const controllerName = "Sonja Žužek s.p.";
const controllerAddress = "Prešernova cesta 21A, 1234 Mengeš, Slovenia";
const authorizedContact = "Tim Kogej";
const lastUpdated = "28 August 2026";
const consentCookieName = "evipace_cookie_consent";

export function PrivacyPage({ locale }: PrivacyPageProps) {
  if (locale === "de") return <GermanPrivacyPage />;
  return <EnglishPrivacyPage />;
}

function Section({ heading, children }: SectionProps) {
  return (
    <section className="section-padding py-7 sm:py-9">
      <div className="site-shell">
        <div className="max-w-3xl break-words">
          <h2 className="text-2xl font-bold leading-tight text-ink sm:text-3xl">
            {heading}
          </h2>
          <div className="mt-5 space-y-4 text-lg leading-8 text-muted">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

function EnglishPrivacyPage() {
  return (
    <main>
      <section className="section-padding pb-8 pt-32 sm:pb-10">
        <div className="site-shell">
          <div className="max-w-3xl break-words">
            <p className="eyebrow">Privacy</p>
            <h1 className="heading-lg font-display mt-6">Privacy policy</h1>
            <p className="body-lg mt-7 max-w-2xl text-muted">
              This notice explains how evipace handles personal data on this
              website, in the ESG request form, in uploaded documents and in
              optional analytics.
            </p>
            <p className="mt-5 text-sm font-semibold text-muted">
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      <Section heading="Controller and privacy contact">
        <p>
          The controller for this website is {controllerName},{" "}
          {controllerAddress}. The website is operated under the brand name
          evipace.
        </p>
        <p>
          For privacy questions, contact{" "}
          <a className="orange-link" href={`mailto:${publicContactEmail}`}>
            {publicContactEmail}
          </a>
          . {authorizedContact} is an authorized contact for privacy requests.
        </p>
      </Section>

      <Section heading="What the ESG request form collects">
        <p>
          If you submit an ESG request, the required fields are your name,
          business email address and company name. You must also attach at least
          one document. The message and requested deadline fields are optional.
          Without the required information and documents, evipace cannot receive
          and assess the request through this form.
        </p>
        <p>
          The form also records a submission reference, timestamps, the language
          version used for the form where available, uploaded-document filenames,
          declared file size, declared file type and technical storage metadata
          used to handle the upload securely.
        </p>
        <p>
          Uploaded documents may contain additional personal data supplied by
          the submitter. Please do not upload unnecessary personal data,
          special-category data, identification documents or unrelated
          confidential information.
        </p>
      </Section>

      <Section heading="Validation, security and abuse prevention">
        <p>
          The form validates required fields, email format, message length,
          deadline length, file count, file size, total upload size and allowed
          file types. A hidden honeypot field is used as an anti-abuse signal.
        </p>
        <p>
          For rate limiting, the application stores a keyed HMAC value derived
          from the requester IP address. The raw IP address is not stored in the
          request database. Rate-limit checks currently use a one-hour window.
        </p>
      </Section>

      <Section heading="Purposes and legal bases">
        <p>
          When you request services for yourself or as the prospective
          contractual party, evipace processes the request to take steps at your
          request before entering into a contract under GDPR Article 6(1)(b).
        </p>
        <p>
          When you act for your employer or another company, evipace processes
          the request under GDPR Article 6(1)(f), legitimate interests in
          handling B2B inquiries, communicating with company representatives and
          preparing the requested ESG service.
        </p>
        <p>
          The same Article 6(1)(b) and/or Article 6(1)(f) bases apply, depending
          on the relationship to the prospective engagement, when evipace stores
          uploaded documents, notifies the evipace team, replies to the
          submitter and assesses the requested ESG work.
        </p>
        <p>
          Validation, rate limiting, fraud prevention, service security and
          troubleshooting rely on GDPR Article 6(1)(f), legitimate interests in
          protecting the website and request service. Where specific information
          must be retained to comply with an applicable legal obligation, GDPR
          Article 6(1)(c) may apply to that information only.
        </p>
        <p>
          Vercel Web Analytics is used, where applicable under GDPR Article
          6(1)(f), for legitimate interests in understanding website use and
          maintaining website performance.
        </p>
      </Section>

      <Section heading="Request processing and email delivery">
        <p>
          Request data is stored in the inbound request database. Uploaded
          documents are stored in a private Supabase Storage bucket. The browser
          receives per-file signed upload tokens used for the upload.
        </p>
        <p>
          After files are verified, the request is marked as submitted. Resend
          is used to send an internal notification to evipace. Internal
          notifications may include uploaded files or time-limited signed links
          to them. A visitor confirmation email is sent only if the separate
          confirmation email feature is enabled.
        </p>
        <p>
          The internal email contains the request reference, submitted timestamp,
          recorded locale, name, email address, company, deadline, message and
          safe file display information.
        </p>
      </Section>

      <Section heading="Website technologies and analytics">
        <p>
          Vercel hosts the website. Vercel Web Analytics measures aggregated
          website traffic and performance, operates without third-party
          analytics cookies and is described by Vercel as storing anonymized
          analytics data. It is separate from optional Google Analytics 4, and
          accepting or rejecting Google Analytics does not change Vercel Web
          Analytics consent.
        </p>
        <p>
          evipace also uses technically necessary first-party technologies to
          operate the website, route pages by language and remember cookie
          choices.
        </p>
        <p>
          The cookie <code>{consentCookieName}</code> stores whether analytics
          was accepted or rejected. It is a first-party consent cookie, is used
          only to remember that choice and is retained for up to 180 days.
        </p>
        <p>
          Google Analytics 4 is optional. The legal basis is consent under GDPR
          Article 6(1)(a). Google Analytics is not loaded before analytics
          consent is accepted. You can reject analytics without losing access to
          the website. You can change your choice later through the Cookie
          settings control in the Footer.
        </p>
        <p>
          If analytics is accepted, Google Analytics cookies such as{" "}
          <code>_ga</code> and <code>_ga_*</code> may be created. Advertising
          storage, advertising user data and advertising personalization remain
          denied. evipace does not intentionally send form contents,
          uploaded-document information, filenames, email addresses, names or
          company names to Google Analytics. The verified Google Analytics
          retention period is 14 months, and reset on new activity is disabled.
          This applies to user-level and event-level data covered by Google
          Analytics retention controls; standard aggregated reports may not be
          governed by the same retention setting.
        </p>
      </Section>

      <Section heading="Service providers and transfers">
        <p>
          evipace uses Supabase for the request database and private
          uploaded-document storage, Resend for transactional email delivery and
          internal request notification, Vercel for website hosting and Vercel
          Web Analytics, and Google for optional Google Analytics 4 after
          consent.
        </p>
        <p>
          These providers may process data in the EEA, the United States or
          other locations according to their services, infrastructure and
          subprocessors. Where processing outside the EEA occurs, applicable
          safeguards may include adequacy decisions, the EU Standard Contractual
          Clauses or equivalent contractual and technical safeguards. evipace
          does not sell personal data.
        </p>
      </Section>

      <Section heading="Retention">
        <p>
          If an inquiry does not result in an engagement, request-form data and
          uploaded documents are retained for no longer than six months after
          submission or the last relevant communication, whichever is later.
        </p>
        <p>
          If an engagement begins, relevant information may be retained for the
          duration of the engagement and afterwards only as needed for
          contractual claims, legal obligations or the establishment, exercise
          or defence of legal claims. Legal obligations apply only to the
          information that must be retained for that purpose.
        </p>
        <p>
          The consent-choice cookie is retained for up to 180 days. Security and
          rate-limit data in the request database is linked to the same request
          retention process; rate-limit checks use a one-hour window.
        </p>
      </Section>

      <Section heading="Your rights">
        <p>
          The source of request data is normally you or the person submitting
          the form on behalf of an organization. Subject to legal conditions,
          you may have the right of access, rectification, erasure, restriction
          of processing, objection where processing relies on legitimate
          interests, and data portability where applicable.
        </p>
        <p>
          Where processing is based on consent, you may withdraw consent at any
          time without affecting the lawfulness of processing before withdrawal.
          For Google Analytics, use the Cookie settings control in the Footer.
        </p>
        <p>
          You also have the right to lodge a complaint with the{" "}
          <a className="orange-link" href="https://www.ip-rs.si/">
            Information Commissioner of the Republic of Slovenia
          </a>
          . This website does not use solely automated decision-making that
          produces legal or similarly significant effects.
        </p>
      </Section>
    </main>
  );
}

function GermanPrivacyPage() {
  return (
    <main>
      <section className="section-padding pb-8 pt-32 sm:pb-10">
        <div className="site-shell">
          <div className="max-w-3xl break-words">
            <p className="eyebrow">Datenschutz</p>
            <h1 className="heading-lg font-display mt-6">
              Datenschutzerklärung
            </h1>
            <p className="body-lg mt-7 max-w-2xl text-muted">
              Diese Erklärung beschreibt, wie evipace personenbezogene Daten auf
              dieser Website, im ESG-Anfrageformular, in hochgeladenen
              Dokumenten und bei optionaler Analyse verarbeitet.
            </p>
            <p className="mt-5 text-sm font-semibold text-muted">
              Zuletzt aktualisiert: {lastUpdated}
            </p>
          </div>
        </div>
      </section>

      <Section heading="Verantwortlicher und Datenschutzkontakt">
        <p>
          Verantwortlicher für diese Website ist {controllerName},{" "}
          {controllerAddress}. Die Website wird unter dem Namen evipace
          betrieben.
        </p>
        <p>
          Für Datenschutzfragen kontaktieren Sie{" "}
          <a className="orange-link" href={`mailto:${publicContactEmail}`}>
            {publicContactEmail}
          </a>
          . {authorizedContact} ist ein autorisierter Kontakt für
          Datenschutzanfragen.
        </p>
      </Section>

      <Section heading="Welche Daten das ESG-Anfrageformular erfasst">
        <p>
          Wenn Sie eine ESG-Anfrage senden, sind Name, geschäftliche
          E-Mail-Adresse und Unternehmensname Pflichtfelder. Außerdem muss
          mindestens ein Dokument angehängt werden. Nachricht und gewünschte
          Frist sind optional. Ohne die Pflichtangaben und Dokumente kann
          evipace die Anfrage über dieses Formular nicht entgegennehmen und
          prüfen.
        </p>
        <p>
          Das Formular erfasst außerdem eine Anfrage-Referenz, Zeitstempel, die
          verwendete Sprachversion des Formulars, soweit verfügbar, Dateinamen
          hochgeladener Dokumente, angegebene Dateigröße, angegebenen Dateityp
          und technische Speichermetadaten zur sicheren Verarbeitung des
          Uploads.
        </p>
        <p>
          Hochgeladene Dokumente können zusätzliche personenbezogene Daten
          enthalten, die von der absendenden Person bereitgestellt werden. Bitte
          laden Sie keine unnötigen personenbezogenen Daten, besonderen
          Kategorien personenbezogener Daten, Ausweisdokumente oder nicht
          relevante vertrauliche Informationen hoch.
        </p>
      </Section>

      <Section heading="Validierung, Sicherheit und Missbrauchsschutz">
        <p>
          Das Formular validiert Pflichtfelder, E-Mail-Format, Nachrichtenlänge,
          Fristlänge, Anzahl der Dateien, Dateigröße, Gesamtgröße der Uploads
          und zugelassene Dateitypen. Ein verstecktes Honeypot-Feld dient als
          Signal zur Missbrauchserkennung.
        </p>
        <p>
          Für Rate Limiting speichert die Anwendung einen schlüsselbasierten
          HMAC-Wert, der aus der IP-Adresse der anfragenden Person abgeleitet
          wird. Die rohe IP-Adresse wird nicht in der Anfragedatenbank
          gespeichert. Rate-Limit-Prüfungen verwenden derzeit ein Zeitfenster
          von einer Stunde.
        </p>
      </Section>

      <Section heading="Zwecke und Rechtsgrundlagen">
        <p>
          Wenn Sie Leistungen für sich selbst anfragen oder selbst die
          potenzielle Vertragspartei sind, verarbeitet evipace die Anfrage zur
          Durchführung vorvertraglicher Maßnahmen auf Ihre Anfrage nach Artikel
          6 Absatz 1 Buchstabe b DSGVO.
        </p>
        <p>
          Wenn Sie für Ihren Arbeitgeber oder ein anderes Unternehmen handeln,
          verarbeitet evipace die Anfrage nach Artikel 6 Absatz 1 Buchstabe f
          DSGVO auf Grundlage berechtigter Interessen an der Bearbeitung von
          B2B-Anfragen, der Kommunikation mit Unternehmensvertretern und der
          Vorbereitung der angefragten ESG-Leistung.
        </p>
        <p>
          Dieselben Rechtsgrundlagen nach Artikel 6 Absatz 1 Buchstabe b
          und/oder Artikel 6 Absatz 1 Buchstabe f DSGVO gelten, je nach
          Beziehung zur möglichen Beauftragung, wenn evipace hochgeladene
          Dokumente speichert, das evipace-Team benachrichtigt, der absendenden
          Person antwortet und die angefragte ESG-Arbeit prüft.
        </p>
        <p>
          Validierung, Rate Limiting, Betrugsprävention, Dienstsicherheit und
          Fehlerbehebung beruhen auf Artikel 6 Absatz 1 Buchstabe f DSGVO,
          berechtigte Interessen am Schutz der Website und des Anfragedienstes.
          Soweit bestimmte Informationen zur Erfüllung einer anwendbaren
          rechtlichen Verpflichtung aufbewahrt werden müssen, kann Artikel 6
          Absatz 1 Buchstabe c DSGVO nur für diese Informationen gelten.
        </p>
        <p>
          Vercel Web Analytics wird, soweit anwendbar nach Artikel 6 Absatz 1
          Buchstabe f DSGVO, auf Grundlage berechtigter Interessen daran
          eingesetzt, die Nutzung der Website zu verstehen und ihre Performance
          zu erhalten.
        </p>
      </Section>

      <Section heading="Bearbeitung der Anfrage und E-Mail-Versand">
        <p>
          Anfragedaten werden in der Inbound-Request-Datenbank gespeichert.
          Hochgeladene Dokumente werden in einem privaten Supabase-Storage-Bucket
          gespeichert. Der Browser erhält signierte Upload-Tokens pro Datei, die
          für den Upload verwendet werden.
        </p>
        <p>
          Nach der Überprüfung der Dateien wird die Anfrage als eingereicht
          markiert. Resend wird verwendet, um eine interne Benachrichtigung an
          evipace zu senden. Interne Benachrichtigungen können hochgeladene
          Dateien oder zeitlich begrenzte signierte Links zu ihnen enthalten.
          Eine Bestätigungs-E-Mail an die absendende Person wird nur gesendet,
          wenn die separate Bestätigungsfunktion aktiviert ist.
        </p>
        <p>
          Die interne E-Mail enthält Anfrage-Referenz, Einreichungszeitpunkt,
          gespeicherte Sprachversion, Name, E-Mail-Adresse, Unternehmen, Frist,
          Nachricht und sichere Anzeigeinformationen zu Dateien.
        </p>
      </Section>

      <Section heading="Website-Technologien und Analytics">
        <p>
          Vercel hostet die Website. Vercel Web Analytics misst aggregierten
          Website-Traffic und Performance, arbeitet ohne
          Third-Party-Analytics-Cookies und wird von Vercel als Speicherung
          anonymisierter Analytics-Daten beschrieben. Es ist von optionalem
          Google Analytics 4 getrennt; die Annahme oder Ablehnung von Google
          Analytics ändert die Einwilligung zu Vercel Web Analytics nicht.
        </p>
        <p>
          evipace verwendet außerdem technisch notwendige
          First-Party-Technologien, um die Website zu betreiben, Seiten nach
          Sprache auszuliefern und Cookie-Entscheidungen zu merken.
        </p>
        <p>
          Das Cookie <code>{consentCookieName}</code> speichert, ob Analytics
          akzeptiert oder abgelehnt wurde. Es ist ein First-Party-Consent-Cookie,
          dient nur dazu, diese Entscheidung zu merken, und wird für bis zu 180
          Tage gespeichert.
        </p>
        <p>
          Google Analytics 4 ist optional. Rechtsgrundlage ist die Einwilligung
          nach Artikel 6 Absatz 1 Buchstabe a DSGVO. Google Analytics wird nicht
          geladen, bevor Analytics akzeptiert wurde; eine Ablehnung verhindert
          die Nutzung der Website nicht. Sie können Ihre Auswahl später über die
          Cookie-Einstellungen im Footer ändern.
        </p>
        <p>
          Wenn Analytics akzeptiert wird, können Google-Analytics-Cookies wie{" "}
          <code>_ga</code> und <code>_ga_*</code> gesetzt werden. Advertising
          Storage, Advertising User Data und Advertising Personalization bleiben
          abgelehnt. evipace sendet Formularinhalte, Informationen zu
          hochgeladenen Dokumenten, Dateinamen, E-Mail-Adressen, Namen oder
          Unternehmensnamen nicht absichtlich an Google Analytics. Die
          verifizierte Aufbewahrungsdauer in Google Analytics beträgt 14 Monate;
          das Zurücksetzen bei neuer Aktivität ist deaktiviert. Dies gilt für
          nutzerbezogene und ereignisbezogene Daten, die von den
          Aufbewahrungskontrollen in Google Analytics erfasst werden;
          standardmäßige aggregierte Berichte unterliegen möglicherweise nicht
          derselben Aufbewahrungseinstellung.
        </p>
      </Section>

      <Section heading="Dienstleister und Übermittlungen">
        <p>
          evipace nutzt Supabase für die Anfragedatenbank und private Speicherung
          hochgeladener Dokumente, Resend für transaktionalen E-Mail-Versand und
          interne Anfragebenachrichtigungen, Vercel für Website-Hosting und
          Vercel Web Analytics sowie Google für optionales Google Analytics 4
          nach Einwilligung.
        </p>
        <p>
          Diese Anbieter können Daten entsprechend ihren Diensten, ihrer
          Infrastruktur und ihren Unterauftragsverarbeitern im EWR, in den USA
          oder an anderen Orten verarbeiten. Soweit Verarbeitung außerhalb des
          EWR stattfindet, können geeignete Garantien Angemessenheitsbeschlüsse,
          EU-Standardvertragsklauseln oder gleichwertige vertragliche und
          technische Schutzmaßnahmen umfassen. evipace verkauft keine
          personenbezogenen Daten.
        </p>
      </Section>

      <Section heading="Aufbewahrung">
        <p>
          Wenn aus einer Anfrage keine Beauftragung entsteht, werden
          Formularinformationen und hochgeladene Dokumente höchstens sechs
          Monate nach der Einreichung oder der letzten relevanten Kommunikation
          aufbewahrt, je nachdem, welcher Zeitpunkt später liegt.
        </p>
        <p>
          Wenn eine Beauftragung beginnt, können relevante Informationen für die
          Dauer der Beauftragung und danach nur so lange aufbewahrt werden, wie
          sie für vertragliche Ansprüche, rechtliche Verpflichtungen oder die
          Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen
          benötigt werden. Rechtliche Verpflichtungen gelten nur für die
          Informationen, die zu diesem Zweck aufbewahrt werden müssen.
        </p>
        <p>
          Das Consent-Choice-Cookie wird für bis zu 180 Tage gespeichert.
          Sicherheits- und Rate-Limit-Daten in der Anfragedatenbank sind mit
          demselben Aufbewahrungsprozess für Anfragen verbunden;
          Rate-Limit-Prüfungen verwenden ein Zeitfenster von einer Stunde.
        </p>
      </Section>

      <Section heading="Ihre Rechte">
        <p>
          Quelle der Anfragedaten sind in der Regel Sie oder die Person, die das
          Formular im Namen einer Organisation absendet. Vorbehaltlich der
          gesetzlichen Voraussetzungen können Sie ein Recht auf Auskunft,
          Berichtigung, Löschung, Einschränkung der Verarbeitung, Widerspruch
          bei Verarbeitung auf Grundlage berechtigter Interessen sowie
          Datenübertragbarkeit haben, soweit anwendbar.
        </p>
        <p>
          Soweit eine Verarbeitung auf Einwilligung beruht, können Sie die
          Einwilligung jederzeit widerrufen, ohne dass die Rechtmäßigkeit der
          Verarbeitung vor dem Widerruf berührt wird. Für Google Analytics
          nutzen Sie die Cookie-Einstellungen im Footer.
        </p>
        <p>
          Sie haben außerdem das Recht, eine Beschwerde bei dem{" "}
          <a className="orange-link" href="https://www.ip-rs.si/">
            Informationsbeauftragten der Republik Slowenien
          </a>{" "}
          einzureichen. Diese Website verwendet keine ausschließlich
          automatisierte Entscheidungsfindung, die rechtliche Wirkung entfaltet
          oder Sie in ähnlicher Weise erheblich beeinträchtigt.
        </p>
      </Section>
    </main>
  );
}
