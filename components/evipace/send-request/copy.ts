import { MAX_FILES } from "@/lib/request-upload-constants";

/**
 * Presentation-layer strings for the send-request UI, keyed by the same
 * component structure as RequestForm/FileDropzone/SuccessState. This is the
 * ONLY thing that differs between /en/send-request and /de/send-request —
 * the components themselves, the API calls, validation, upload mechanics
 * and state machine are locale-agnostic and untouched.
 *
 * `defaultSendRequestCopy` is the English copy the components already had
 * hardcoded before localization existed; every component falls back to it,
 * so /en/send-request's rendered output is unchanged.
 *
 * Every field here is a plain string, deliberately — this object is built
 * in a Server Component (app/[locale]/send-request/page.tsx) and passed as
 * a prop into Client Components, and functions can't cross that boundary.
 */
export type RequestFormCopy = {
  labels: {
    name: string;
    email: string;
    company: string;
    deadline: string;
    optional: string;
    message: string;
  };
  errors: {
    noFiles: string;
    disabled: string;
    submitFailed: string;
    finalizeFailed: string;
    generic: string;
  };
  uploadingText: string;
  privacy: {
    intro: string;
    linkPrefix: string;
    linkLabel: string;
  };
  submitLabel: string;
  submittingLabel: string;
};

export type FileDropzoneCopy = {
  addFilesAriaLabel: string;
  dropText: string;
  hintText: string;
  /**
   * Aria-label for the "remove this file" button, with "{file}" as the
   * filename placeholder — a plain string template (not a function, since
   * this crosses the Server -> Client Component boundary) so each locale
   * can put the filename wherever its word order needs it, e.g.
   * "Remove {file}" vs. "{file} entfernen".
   */
  removeAriaLabelTemplate: string;
};

export type SuccessStateCopy = {
  heading: string;
  body: string;
};

export type SendRequestCopy = {
  form: RequestFormCopy;
  dropzone: FileDropzoneCopy;
  success: SuccessStateCopy;
};

export const defaultSendRequestCopy: SendRequestCopy = {
  form: {
    labels: {
      name: "Name",
      email: "Work email",
      company: "Company",
      deadline: "Deadline",
      optional: "(optional)",
      message: "Message / context"
    },
    errors: {
      noFiles: "Attach at least one file.",
      disabled: "This form isn't accepting submissions yet. Please email us directly.",
      submitFailed: "We couldn't submit your request. Please check the form and try again.",
      finalizeFailed:
        "Your files uploaded, but we couldn't confirm the submission. Please try again or email us directly.",
      generic: "Something went wrong. Please try again."
    },
    uploadingText: "Uploading your files…",
    privacy: {
      intro:
        "Files and information you send us are stored privately and used only to process your request.",
      linkPrefix: "Read our",
      linkLabel: "Privacy Policy"
    },
    submitLabel: "Send your ESG request",
    submittingLabel: "Sending…"
  },
  dropzone: {
    addFilesAriaLabel: "Add files",
    dropText: "Drop files here, or click to choose",
    hintText: `.xlsx, .docx, .pdf, .csv, .jpg, .png — up to ${MAX_FILES} files, 25MB each`,
    removeAriaLabelTemplate: "Remove {file}"
  },
  success: {
    heading: "Your request was successfully received.",
    body: "We have your files and details. We'll be in touch shortly."
  }
};

export const deSendRequestCopy: SendRequestCopy = {
  form: {
    labels: {
      name: "Name",
      email: "Geschäftliche E-Mail",
      company: "Unternehmen",
      deadline: "Frist",
      optional: "(optional)",
      message: "Nachricht / Kontext"
    },
    errors: {
      noFiles: "Bitte fügen Sie mindestens eine Datei hinzu.",
      disabled:
        "Dieses Formular nimmt aktuell noch keine Anfragen entgegen. Bitte schreiben Sie uns direkt eine E-Mail.",
      submitFailed:
        "Ihre Anfrage konnte nicht gesendet werden. Bitte überprüfen Sie das Formular und versuchen Sie es erneut.",
      finalizeFailed:
        "Ihre Dateien wurden hochgeladen, die Einreichung konnte jedoch nicht bestätigt werden. Bitte versuchen Sie es erneut oder schreiben Sie uns direkt eine E-Mail.",
      generic: "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut."
    },
    uploadingText: "Ihre Dateien werden hochgeladen…",
    privacy: {
      intro:
        "Dateien und Informationen, die Sie uns senden, werden vertraulich gespeichert und ausschließlich zur Bearbeitung Ihrer Anfrage verwendet.",
      linkPrefix: "Lesen Sie unsere",
      linkLabel: "Datenschutzerklärung"
    },
    submitLabel: "ESG-Anfrage senden",
    submittingLabel: "Wird gesendet…"
  },
  dropzone: {
    addFilesAriaLabel: "Dateien hinzufügen",
    dropText: "Dateien hier ablegen oder klicken zum Auswählen",
    hintText: `.xlsx, .docx, .pdf, .csv, .jpg, .png — bis zu ${MAX_FILES} Dateien, je 25 MB`,
    removeAriaLabelTemplate: "{file} entfernen"
  },
  success: {
    heading: "Ihre Anfrage wurde erfolgreich empfangen.",
    body: "Wir haben Ihre Dateien und Angaben erhalten. Wir melden uns in Kürze bei Ihnen."
  }
};
