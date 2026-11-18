import { handleSubmission } from "@/lib/server";
import { bookingSchema } from "@/lib/schemas";
export async function POST(req: Request) {
  return handleSubmission(req, "meeting request", bookingSchema, (d) => [
    `Name: ${d.fullName}`, `Email: ${d.email}`, `Business: ${d.businessName || "—"}`, `Country: ${d.country}`, `Topic: ${d.topic}`,
    `Platform: ${d.platform}`, `Option 1: ${d.date1} ${d.time1}`, `Option 2: ${d.date2 || "—"} ${d.time2 || ""}`, `Time zone: ${d.timezone}`, `Notes: ${d.notes || "—"}`,
  ]);
}
