import { handleSubmission } from "@/lib/server";
import { contactSchema } from "@/lib/schemas";
export async function POST(req: Request) {
  return handleSubmission(req, "contact inquiry", contactSchema, (d) => [
    `Name: ${d.fullName}`, `Business: ${d.businessName || "—"}`, `Email: ${d.email}`, `Phone/WhatsApp: ${d.phone || "—"}`,
    `Country: ${d.country}`, `Service: ${d.service}`, `Budget: ${d.budget || "—"}`, `Preferred contact: ${d.preferredContact}`, `Project: ${d.description}`,
  ]);
}
