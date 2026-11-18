import { z } from "zod";

const text = (max: number) => z.string().trim().max(max);
const required = (label: string, max = 200) => z.string().trim().min(1, `${label} is required`).max(max);
const email = z.string().trim().min(1, "Email is required").email("Enter a valid email address").max(200);
/** Honeypot: real visitors never fill this hidden field. */
const honeypot = z.string().max(0).optional().or(z.literal(""));

export const contactSchema = z.object({
  fullName: required("Full name"),
  businessName: text(200).optional(),
  email,
  country: required("Country", 100),
  service: required("Service", 120),
  budget: text(60).optional(),
  description: z.string().trim().min(20, "Please describe your project in at least 20 characters").max(5000),
  preferredContact: z.enum(["Email", "WhatsApp", "Online meeting"], { errorMap: () => ({ message: "Choose a communication method" }) }),
  phone: text(40).optional(),
  consent: z.literal(true, { errorMap: () => ({ message: "Please agree to the privacy policy" }) }),
  website: honeypot,
});

export const bookingSchema = z.object({
  fullName: required("Full name"),
  email,
  businessName: text(200).optional(),
  country: required("Country", 100),
  topic: required("Meeting topic", 120),
  platform: z.enum(["Google Meet", "Zoom", "Microsoft Teams", "WhatsApp call"], { errorMap: () => ({ message: "Choose a platform" }) }),
  date1: required("Preferred date", 20),
  time1: required("Preferred time", 20),
  date2: text(20).optional(),
  time2: text(20).optional(),
  timezone: required("Time zone", 80),
  notes: text(2000).optional(),
  consent: z.literal(true, { errorMap: () => ({ message: "Please agree to the privacy policy" }) }),
  website: honeypot,
});

export const briefSchema = z.object({
  fullName: required("Full name"),
  email,
  businessName: required("Business name"),
  country: required("Country", 100),
  industry: text(120).optional(),
  about: z.string().trim().min(20, "Tell us a little more about your business (20+ characters)").max(3000),
  goals: z.string().trim().min(10, "Describe your goals (10+ characters)").max(3000),
  audience: text(2000).optional(),
  services: z.array(z.string().max(120)).min(1, "Choose at least one service").max(20),
  deliverables: text(3000).optional(),
  style: text(2000).optional(),
  references: text(2000).optional(),
  deadline: text(40).optional(),
  budget: text(60).optional(),
  consent: z.literal(true, { errorMap: () => ({ message: "Please agree to the privacy policy" }) }),
  website: honeypot,
});

export const quoteSchema = z.object({
  fullName: required("Full name"),
  email,
  businessName: text(200).optional(),
  country: required("Country", 100),
  notes: text(3000).optional(),
  consent: z.literal(true, { errorMap: () => ({ message: "Please agree to the privacy policy" }) }),
  website: honeypot,
  hours: z.number().int().min(1).max(1000),
  rush: z.boolean(),
  description: text(2000).optional(),
});

export const newsletterSchema = z.object({ email, website: honeypot });

export type FieldErrors = Record<string, string>;
export function flattenErrors(err: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const i of err.issues) { const k = String(i.path[0] ?? "form"); if (!out[k]) out[k] = i.message; }
  return out;
}
