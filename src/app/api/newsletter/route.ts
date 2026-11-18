import { handleSubmission } from "@/lib/server";
import { newsletterSchema } from "@/lib/schemas";
export async function POST(req: Request) {
  return handleSubmission(req, "newsletter subscription", newsletterSchema, (d) => [`Email: ${d.email}`]);
}
