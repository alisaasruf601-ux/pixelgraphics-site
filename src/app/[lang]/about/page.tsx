import { AboutView } from "@/components/AboutView";
import { pageMetadata } from "@/i18n/server";

export const generateMetadata = pageMetadata("about", "/about");

export default function AboutPage() {
  return <AboutView />;
}
