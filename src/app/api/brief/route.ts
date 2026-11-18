import { handleSubmission } from "@/lib/server";
import { briefSchema } from "@/lib/schemas";
export async function POST(req: Request) {
  return handleSubmission(req, "project brief", briefSchema, (d) => [
    `Name: ${d.fullName}`, `Email: ${d.email}`, `Business: ${d.businessName} (${d.industry || "—"})`, `Country: ${d.country}`,
    `About: ${d.about}`, `Goals: ${d.goals}`, `Audience: ${d.audience || "—"}`, `Services: ${d.services.join(", ")}`,
    `Deliverables: ${d.deliverables || "—"}`, `Style: ${d.style || "—"}`, `References: ${d.references || "—"}`, `Deadline: ${d.deadline || "—"}`, `Budget: ${d.budget || "—"}`,
  ]);
}
