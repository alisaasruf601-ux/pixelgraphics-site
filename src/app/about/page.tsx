import type { Metadata } from "next";
import { AboutView } from "@/components/AboutView";

export const metadata: Metadata = {
  title: "About",
  description: "Pixel Graphics is a fully remote creative studio based in Suriname, working with brands worldwide on branding, graphic design, social media and content strategy.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <AboutView />;
}
