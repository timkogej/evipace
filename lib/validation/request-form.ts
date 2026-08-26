import { z } from "zod";
import {
  ALLOWED_FILE_TYPES,
  MAX_FILES,
  MAX_FILE_SIZE_BYTES,
  MAX_TOTAL_SIZE_BYTES,
  isAllowedFile
} from "@/lib/request-upload-constants";

const fileMetadataSchema = z.object({
  filename: z.string().min(1).max(255),
  size: z
    .number()
    .int()
    .positive()
    .max(MAX_FILE_SIZE_BYTES, "File exceeds the 25 MB per-file limit."),
  mimeType: z.string().min(1)
});

export const requestSubmissionSchema = z
  .object({
    name: z.string().trim().min(1, "Name is required.").max(200),
    email: z.string().trim().email("Enter a valid work email."),
    company: z.string().trim().min(1, "Company is required.").max(200),
    message: z.string().trim().max(4000).optional(),
    deadline: z.string().trim().max(40).optional(),
    // Which language version of the form this came from. Reported in the
    // internal notification; never shown to the visitor and never used to
    // branch server behaviour, so an absent or unknown value is simply
    // not recorded rather than a validation failure.
    locale: z.enum(["en", "de"]).optional(),
    // Honeypot: real visitors never fill this in. Any non-empty value is
    // treated as a bot signal.
    website: z.string().max(0, "").optional(),
    files: z
      .array(fileMetadataSchema)
      .min(1, "Attach at least one file.")
      .max(MAX_FILES, `Attach at most ${MAX_FILES} files.`)
  })
  .superRefine((data, ctx) => {
    const totalSize = data.files.reduce((sum, f) => sum + f.size, 0);
    if (totalSize > MAX_TOTAL_SIZE_BYTES) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["files"],
        message: "Total attachment size exceeds the 75 MB limit."
      });
    }

    for (const [index, file] of Array.from(data.files.entries())) {
      if (!isAllowedFile(file.filename, file.mimeType)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["files", index],
          message: `"${file.filename}" is not an accepted file type. Accepted: ${Object.keys(ALLOWED_FILE_TYPES).join(", ")}.`
        });
      }
    }
  });

export type RequestSubmissionInput = z.infer<typeof requestSubmissionSchema>;
