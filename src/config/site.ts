import data from "../../content/site.json";

/**
 * SITE CONFIGURATION. Contact details, booking link, social links, logo intro and hero video
 * come from content/site.json (editable in the TinaCMS editor at /admin).
 *
 * Empty strings mean "not configured yet": the related button/link is hidden
 * (never shown as a fake working link). Fill them in before launch.
 */
export const site = {
  name: "Pixel Graphics",
  positioning: "Creative Without Borders.",
  tagline: "Design. Market. Grow Your Brand.",
  description:
    "Pixel Graphics is an independent, remote-first creative and digital marketing studio based in Suriname, creating branding, graphic design, social media and content strategy for brands worldwide.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  markets: ["Netherlands", "Suriname", "Brazil", "Worldwide"],

  contact: data.contact,

  /**
   * Online meeting booking. Paste a Calendly / Cal.com / Google Calendar booking link
   * to send "Book a Meeting" straight there. Left empty, visitors use the built-in
   * booking request form at /book (submissions arrive like the contact form).
   */
  bookingUrl: data.bookingUrl,

  /**
   * Logo animation at the start of the homepage.
   *  - "every-visit":       plays every time the homepage is opened (default)
   *  - "once-per-session":  plays once, then not again until the browser is closed
   *  - "off":               no logo animation
   * Visitors can always skip it, and it is skipped for people who turned on "reduce motion".
   */
  logoIntro: data.logoIntro as "every-visit" | "once-per-session" | "off",

  /**
   * Respect the visitor's "reduce motion" / "animation effects off" setting?
   *  - false (default): the logo animation and photo animations always play (they can be skipped)
   *  - true:  visitors who turned animations off see the website without them
   */
  respectReducedMotion: false,

  /**
   * Homepage background video (optional). Upload your video to the `public/video/` folder
   * and write its path here, e.g. "/video/hero.mp4". It fills the top of the homepage
   * behind the headline (the animated service cards stay on top of it).
   *  - src:    the video file (MP4, ideally under 8 MB — it plays muted on a loop)
   *  - poster: a still image shown while the video loads, e.g. "/video/hero-poster.jpg" (optional)
   */
  heroVideo: data.heroVideo,

  /** Social profiles — leave empty to hide. */
  social: data.social,
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Our Process", href: "/process" },
  { label: "Contact", href: "/contact" },
] as const;

export const bookingHref = site.bookingUrl || "/book";
export const isExternalBooking = Boolean(site.bookingUrl);

/** WhatsApp number for display, e.g. "+597 832-0838". */
export function whatsappDisplay() {
  const d = (site.contact.whatsapp || "").replace(/\D/g, "");
  if (!d) return "";
  if (d.startsWith("597") && d.length === 10) return `+597 ${d.slice(3, 6)}-${d.slice(6)}`;
  if (d.startsWith("31") && d.length === 11) return `+31 ${d.slice(2, 3)} ${d.slice(3, 7)} ${d.slice(7)}`;
  return `+${d}`;
}

export function whatsappLink(message = "Hi Pixel Graphics, I'd like to talk about a project.") {
  if (!site.contact.whatsapp) return "";
  return `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const socialLinks = (Object.entries(site.social) as [keyof typeof site.social, string][])
  .filter(([, url]) => Boolean(url))
  .map(([key, url]) => ({ key, url, label: key[0].toUpperCase() + key.slice(1) }));

/** Lists settings still missing — shown to the site owner in development only. */
export function missingConfig(): string[] {
  const m: string[] = [];
  if (!site.contact.email) m.push("Business email (src/config/site.ts → contact.email)");
  if (!site.contact.whatsapp) m.push("WhatsApp number (src/config/site.ts → contact.whatsapp)");
  if (!socialLinks.length) m.push("Social media links (src/config/site.ts → social)");
  return m;
}
