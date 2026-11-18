import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { BriefForm } from "@/components/BriefForm";

export const metadata: Metadata = {
  title: "Project Brief",
  description: "Share your project details with Pixel Graphics in a guided brief and receive a personalised proposal.",
  alternates: { canonical: "/brief" },
};

export default function BriefPage() {
  return (
    <>
      <PageHero kicker="Project brief & custom quote" title="Tell us about" accent="your project."
        intro="Four short parts, about 10 minutes. The more we know, the more accurate your personalised proposal will be." />
      <section className="py-16 sm:py-24">
        <div className="container-site max-w-4xl">
          <div className="rounded-panel border border-white/[0.07] bg-ink-800/50 p-6 sm:p-10"><BriefForm /></div>
        </div>
      </section>
    </>
  );
}
