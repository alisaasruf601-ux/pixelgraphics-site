/**
 * EDITABLE CONTENT — everything in /content/*.json is edited in the TinaCMS editor (/admin).
 * Code imports the JSON from here so the website is rebuilt with the new content on every save.
 */
import home from "../../content/home.json";
import theme from "../../content/theme.json";
export { home, theme };
export type IconChoice =
  | "brand" | "graphic" | "social" | "marketing" | "motion" | "web" | "consult" | "events"
  | "packaging" | "editorial" | "management"
  | "globe" | "remote" | "spark" | "target" | "check" | "mail" | "chat" | "calendar" | "calc" | "doc"
  | "shield" | "clock" | "pen" | "eye" | "handshake";
