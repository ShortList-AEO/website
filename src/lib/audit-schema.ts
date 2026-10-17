import * as z from "zod";
import { auditForm } from "@/content/form";

const e = auditForm.errors;
const categories = auditForm.categories as readonly string[];

/** One schema for the browser and the server, so both reject the same input. */
export const auditSchema = z.object({
  brand: z.string().trim().min(1, e.brand).max(120, e.brand),
  website: z
    .string()
    .trim()
    .min(3, e.website)
    .max(200, e.website)
    .regex(/^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,}(\/\S*)?$/i, e.website),
  category: z.string().refine((v) => categories.includes(v), e.category),
  founder: z.string().trim().min(1, e.founder).max(120, e.founder),
  email: z.email(e.email).max(200, e.email),
  whatsapp: z
    .string()
    .trim()
    .max(20, e.whatsapp)
    .regex(/^$|^\+?[0-9][0-9\s-]{7,18}$/, e.whatsapp)
    .optional()
    .default(""),
  /** Honeypot: real people never see or fill this field. */
  company_url: z.string().max(0).optional().default(""),
});

export type AuditRequest = z.infer<typeof auditSchema>;
export type AuditField = Exclude<keyof AuditRequest, "company_url">;
