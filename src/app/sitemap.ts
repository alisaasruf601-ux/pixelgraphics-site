import type { MetadataRoute } from "next";
import { site } from "@/config/site";
const routes = ["", "/about", "/services", "/pricing", "/calculator", "/process", "/contact", "/book", "/brief", "/privacy", "/terms", "/service-agreement"];
export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({ url: `${site.url}${r}`, changeFrequency: "monthly", priority: r === "" ? 1 : r.startsWith("/privacy") || r.startsWith("/terms") || r.startsWith("/service") && r !== "/services" ? 0.3 : 0.8 }));
}
