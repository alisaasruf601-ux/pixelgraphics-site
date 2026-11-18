import { handleSubmission } from "@/lib/server";
import { quoteSchema } from "@/lib/schemas";
import { priceHours } from "@/lib/calc";
import { money } from "@/lib/format";
import { hourly } from "@/config/pricing";
export async function POST(req: Request) {
  // The price is recalculated on the server from the config — never trusted from the browser.
  return handleSubmission(req, "graphic design request", quoteSchema, (d) => {
    const p = priceHours(d.hours, d.rush);
    return [
      `Name: ${d.fullName}`, `Email: ${d.email}`, `Business: ${d.businessName || "—"}`, `Country: ${d.country}`,
      `Graphic design: ${p.hours} hours × ${money(hourly.rate)} = ${money(p.subtotal)}`,
      `Rush delivery: ${d.rush ? `yes (+${money(p.rushCost)})` : "no"}`,
      `Indicative total: ${money(p.total)}`,
      `What needs designing: ${d.description || "—"}`, `Notes: ${d.notes || "—"}`,
    ];
  });
}
