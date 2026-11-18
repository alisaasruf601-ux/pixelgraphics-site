import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { locales, localizeHref } from "@/i18n/config";

const routes = ["/", "/about", "/services", "/pricing", "/calculator", "/process", "/contact", "/book", "/brief", "/privacy", "/terms", "/service-agreement"];
const priority = (r: string) => (r === "/" ? 1 : ["/privacy", "/terms", "/service-agreement"].includes(r) ? 0.3 : 0.8);

/** Every page in every language, with links between the language versions (hreflang). */
export default function sitemap(): MetadataRoute.Sitemap {
  return routes.flatMap((r) => locales.map((l) => ({
    url: `${site.url}${localizeHref(r, l)}`.replace(/\/$/, "") || site.url,
    changeFrequency: "monthly" as const,
    priority: priority(r),
    alternates: { languages: Object.fromEntries(locales.map((x) => [x === "pt" ? "pt-BR" : x, `${site.url}${localizeHref(r, x)}`])) },
  })));
}
