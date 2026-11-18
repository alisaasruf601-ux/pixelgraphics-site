/**
 * PRICING CONFIGURATION — the ONLY place prices and package details live.
 *
 * - Monthly packages (Starter / Growth / Premium)
 * - The hourly rate for graphic design (used by the calculator)
 * Everything else is quoted personally through the project brief.
 * Change a number here and it updates everywhere on the site.
 */

import data from "../../content/pricing.json";

export const currency = { code: "USD", symbol: "US$", locale: "en-US" } as const;

export const estimateDisclaimer =
  "This is an indicative estimate, not a quotation. Final pricing is confirmed after we review your full project scope.";

/* ------------------------------------------------------------------ */
/* Monthly packages                                                    */
/* ------------------------------------------------------------------ */

export interface Package {
  id: string;
  name: string;
  priceFrom: number;
  period: "month";
  recommended?: boolean;
  bestFor: string;
  included: string[];
  deliverables: string[];
  revisions: string;
  duration: string;
  extras: string[];
  limitations: string[];
}

export const packages: Package[] = data.packages as Package[];

export const packageTerms: string[] = data.packageTerms;

/* ------------------------------------------------------------------ */
/* Purchasing options (Pricing page)                                   */
/* ------------------------------------------------------------------ */

export const purchaseOptions = [
  { key: "A", title: "Graphic design by the hour", text: "Flyers, posts, brochures and more. Calculate your price per hour instantly.", href: "#hourly", cta: "See hourly rate" },
  { key: "B", title: "Monthly service packages", text: "Ongoing design, social media and marketing support for one monthly fee.", href: "#packages", cta: "Compare packages" },
  { key: "C", title: "Personal quotation", text: "Branding, social media, marketing or something else? Answer a few questions and get a quote.", href: "#custom-quote", cta: "Request a quote" },
] as const;

/* ------------------------------------------------------------------ */
/* Hourly calculator (graphic design only)                             */
/* ------------------------------------------------------------------ */

/**
 * The calculator on /calculator. Only graphic design is priced by the hour;
 * every other service is quoted personally via the project brief (/brief).
 */
export const hourly = {
  ...data.hourly,
  rate: Number(data.hourly.rate),
  minHours: Number(data.hourly.minHours),
  maxHours: Number(data.hourly.maxHours),
  rushSurcharge: Number(data.hourly.rushSurcharge),
  quickPicks: (data.hourly.quickPicks as (number | string)[]).map(Number).filter((n) => n > 0),
};
