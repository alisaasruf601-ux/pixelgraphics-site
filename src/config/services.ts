/**
 * SERVICE DEPARTMENTS — the single source for the Services page, homepage cards,
 * footer, contact form options and calculator departments.
 */
import data from "../../content/services.json";

export type IconName =
  | "brand" | "graphic" | "social" | "marketing" | "motion" | "web" | "consult" | "events"
  | "packaging" | "editorial" | "management";

export interface Department {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  icon: IconName;
  summary: string;
  intro: string;
  services: string[];
  /** What the client receives — shown in the homepage service panel. */
  deliverables: string[];
}

export const departments: Department[] = data.departments as Department[];

/**
 * HOMEPAGE SHOWCASE — the six service cards that fly from the hero stack into the
 * services grid. `title` is the name shown on the card; `slug` links it to the
 * department above (description, services, deliverables).
 * `image` (optional): upload a photo of your work to /public/showcase/ and write its
 * path here, e.g. "/showcase/branding.jpg", to replace the illustrated visual.
 */
export const showcase: { slug: string; title: string; image?: string }[] = data.showcase;

export const getDepartment = (slug: string) => departments.find((d) => d.slug === slug);
