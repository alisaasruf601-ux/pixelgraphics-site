/**
 * TinaCMS editor configuration — opens at /admin.
 * Every collection edits one JSON file in /content. Saving commits to GitHub,
 * and Netlify rebuilds the website (animations unchanged).
 */
import { defineConfig } from "tinacms";
import type { TinaField } from "tinacms";
import { HEADING_FONTS, BODY_FONTS } from "../src/config/fonts";
import { ACCENT_COLORS, HEADING_SIZES, TEXT_SIZES } from "../src/config/theme";

const ICONS = ["brand", "graphic", "social", "marketing", "packaging", "editorial", "management", "motion", "web", "consult", "events", "globe", "remote", "spark", "target", "check", "mail", "chat", "calendar", "calc", "doc", "shield", "clock", "pen", "eye", "handshake"];

const text = (name: string, label: string, extra: Partial<TinaField> = {}): TinaField => ({ type: "string", name, label, ...extra } as TinaField);
const area = (name: string, label: string): TinaField => ({ type: "string", name, label, ui: { component: "textarea" } } as TinaField);
const list = (name: string, label: string): TinaField => ({ type: "string", name, label, list: true } as TinaField);
const button = (name: string, label: string): TinaField => ({
  type: "object", name, label,
  fields: [text("label", "Button text"), text("link", "Link (e.g. /contact or https://…)")],
} as TinaField);
const single = { allowedActions: { create: false, delete: false }, router: () => "/" };

export default defineConfig({
  branch: process.env.NEXT_PUBLIC_TINA_BRANCH || process.env.HEAD || process.env.BRANCH || "main",
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: { outputFolder: "admin", publicFolder: "public" },
  media: { tina: { mediaRoot: "uploads", publicFolder: "public" } },
  schema: {
    collections: [
      {
        name: "home", label: "Homepage", path: "content", format: "json", match: { include: "home" }, ui: single,
        fields: [
          { type: "object", name: "hero", label: "Top of the page", fields: [
            text("kicker", "Small line above the headline"),
            { type: "object", name: "headline", label: "Headline lines", list: true,
              ui: { itemProps: (i: { text?: string }) => ({ label: i?.text }) },
              fields: [text("text", "Text"), { type: "boolean", name: "accent", label: "Teal colour" }] },
            area("intro", "Text under the headline"),
            button("primaryButton", "Main button"),
            button("secondaryButton", "Second button"),
            text("markets", "Countries line"),
          ] },
          { type: "object", name: "services", label: "Services section", fields: [
            text("kicker", "Small line above the title"), text("title", "Title (white part)"), text("accent", "Title (teal part)"),
            area("intro", "Intro text"), text("cardButton", "Button text in the service window"),
          ] },
          { type: "object", name: "calculator", label: "Calculator block", fields: [
            text("title", "Title (dark part)"), text("accent", "Title (green part)"), area("text", "Text"),
            list("points", "Check-mark points"), text("button", "Button text"),
          ] },
          { type: "object", name: "process", label: "Process section", fields: [
            text("kicker", "Small line above the title"), text("title", "Title (white part)"), text("accent", "Title (teal part)"),
            area("intro", "Intro text"), text("button", "Button text"),
            { type: "object", name: "steps", label: "Steps", list: true, ui: { itemProps: (i: { title?: string }) => ({ label: i?.title }) },
              fields: [text("title", "Title"), area("text", "Text"), text("icon", "Icon", { options: ICONS })] },
          ] },
          { type: "object", name: "pricing", label: "Pricing section", fields: [
            text("kicker", "Small line above the title"), text("title", "Title (white part)"), text("accent", "Title (teal part)"),
            area("intro", "Intro text"), text("note", "Small note under the packages"),
          ] },
          { type: "object", name: "finalCta", label: "Bottom call-to-action", fields: [
            text("title", "Title (white part)"), text("accent", "Title (teal part)"), area("text", "Text"),
            text("primaryButton", "Main button text"), text("secondaryButton", "Second button text"),
          ] },
        ],
      },
      {
        name: "services", label: "Services", path: "content", format: "json", match: { include: "services" }, ui: single,
        fields: [
          { type: "object", name: "showcase", label: "Homepage service photos (the 6 animated cards)", list: true,
            ui: { itemProps: (i: { title?: string }) => ({ label: i?.title }) },
            fields: [
              text("title", "Title on the card"),
              { type: "image", name: "image", label: "Photo (landscape, about 1600 px wide). Leave empty for the designed visual." },
              text("slug", "Linked service (do not change)", { options: ["branding", "marketing-advertising", "social-media-design", "packaging", "editorial-print", "social-media-management"] }),
            ] },
          { type: "object", name: "departments", label: "Service departments", list: true,
            ui: { itemProps: (i: { title?: string }) => ({ label: i?.title }) },
            fields: [
              text("title", "Full title"), text("shortTitle", "Short title"), text("number", "Number (01, 02…)"),
              text("icon", "Icon / illustration", { options: ICONS.slice(0, 11) }),
              area("summary", "Short summary (cards)"), area("intro", "Introduction (service page and window)"),
              list("services", "Services included"), list("deliverables", "What you receive (optional)"),
              text("slug", "Page address (do not change)"),
            ] },
        ],
      },
      {
        name: "pricing", label: "Prices & packages", path: "content", format: "json", match: { include: "pricing" }, ui: single,
        fields: [
          { type: "object", name: "hourly", label: "Hourly calculator (graphic design)", fields: [
            text("service", "Service name"),
            { type: "number", name: "rate", label: "Price per hour (US$)" },
            { type: "number", name: "minHours", label: "Minimum hours" },
            { type: "number", name: "maxHours", label: "Maximum hours" },
            { type: "number", name: "rushSurcharge", label: "Rush surcharge (0.25 = +25%)" },
            list("quickPicks", "Quick-pick hour buttons (numbers)"),
            list("examples", "Examples of work"),
            text("department", "Linked service (do not change)"),
          ] },
          { type: "object", name: "packages", label: "Monthly packages", list: true,
            ui: { itemProps: (i: { name?: string }) => ({ label: i?.name }) },
            fields: [
              text("name", "Name"), { type: "number", name: "priceFrom", label: "Price from (US$ per month)" },
              { type: "boolean", name: "recommended", label: "Highlight as recommended" },
              area("bestFor", "Best for"), list("included", "What’s included"), list("deliverables", "Deliverables"),
              text("revisions", "Revisions"), text("duration", "Delivery"), list("extras", "Optional extras"), list("limitations", "Not included"),
              text("id", "Code (do not change)"), text("period", "Period (do not change)"),
            ] },
          list("packageTerms", "Small print under the packages"),
        ],
      },
      {
        name: "about", label: "About page", path: "content", format: "json", match: { include: "about" },
        ui: { allowedActions: { create: false, delete: false }, router: () => "/about" },
        fields: [
          { type: "object", name: "hero", label: "Top of the page", fields: [text("kicker", "Small line"), text("title", "Title (white part)"), text("accent", "Title (teal part)"), area("intro", "Intro text")] },
          { type: "object", name: "intro", label: "Who we are", fields: [
            text("kicker", "Small line above the title"),
            { type: "object", name: "headline", label: "Title lines", list: true, ui: { itemProps: (i: { text?: string }) => ({ label: i?.text }) },
              fields: [text("text", "Text"), { type: "boolean", name: "accent", label: "Teal colour" }] },
            { type: "string", name: "paragraphs", label: "Paragraphs", list: true, ui: { component: "textarea" } } as TinaField,
            { type: "image", name: "photo", label: "Photo on the right (leave empty for the brand visual)" },
          ] },
          { type: "object", name: "cards", label: "Story, mission & vision", list: true, ui: { itemProps: (i: { kicker?: string }) => ({ label: i?.kicker }) },
            fields: [text("kicker", "Small line"), text("title", "Title"), area("text", "Text")] },
          { type: "object", name: "values", label: "Values", fields: [
            text("kicker", "Small line"), text("title", "Title (white part)"), text("accent", "Title (teal part)"), area("intro", "Intro"),
            { type: "object", name: "items", label: "Values", list: true, ui: { itemProps: (i: { title?: string }) => ({ label: i?.title }) },
              fields: [text("icon", "Icon", { options: ICONS }), text("title", "Title"), area("text", "Text")] },
          ] },
          { type: "object", name: "why", label: "Why Pixel Graphics", fields: [
            text("kicker", "Small line"), text("title", "Title (dark part)"), text("accent", "Title (green part)"),
            { type: "object", name: "items", label: "Reasons", list: true, ui: { itemProps: (i: { title?: string }) => ({ label: i?.title }) },
              fields: [text("title", "Title"), area("text", "Text")] },
          ] },
          { type: "object", name: "remote", label: "Remote approach", fields: [
            text("kicker", "Small line"), text("title", "Title (white part)"), text("accent", "Title (teal part)"), area("intro", "Intro"),
            { type: "object", name: "items", label: "Cards", list: true, ui: { itemProps: (i: { title?: string }) => ({ label: i?.title }) },
              fields: [text("icon", "Icon", { options: ICONS }), text("title", "Title"), area("text", "Text")] },
            text("button", "Button text"),
          ] },
        ],
      },
      {
        name: "site", label: "Contact & social media", path: "content", format: "json", match: { include: "site" }, ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: "object", name: "contact", label: "Contact", fields: [text("email", "Business email"), text("whatsapp", "WhatsApp number (digits only, with country code)")] },
          text("bookingUrl", "Booking link (Calendly etc.) — leave empty to use the website’s booking form"),
          { type: "object", name: "social", label: "Social media links (leave empty to hide)", fields: [
            text("instagram", "Instagram"), text("facebook", "Facebook"), text("linkedin", "LinkedIn"), text("behance", "Behance")] },
          text("logoIntro", "Logo animation", { options: ["every-visit", "once-per-session", "off"] }),
          { type: "object", name: "heroVideo", label: "Homepage background video (optional)", fields: [
            text("src", "Video file path, e.g. /uploads/hero.mp4"), { type: "image", name: "poster", label: "Still image while loading" }] },
        ],
      },
      {
        name: "theme", label: "Fonts, sizes & colours", path: "content", format: "json", match: { include: "theme" }, ui: single,
        fields: [
          text("headingFont", "Headings font", { options: [...HEADING_FONTS] }),
          text("bodyFont", "Body text font", { options: [...BODY_FONTS] }),
          text("headingSize", "Heading size", { options: Object.keys(HEADING_SIZES) }),
          text("textSize", "Text size", { options: Object.keys(TEXT_SIZES) }),
          text("accentColor", "Accent colour (brand colours)", { options: Object.keys(ACCENT_COLORS) }),
        ],
      },
    ],
  },
});
