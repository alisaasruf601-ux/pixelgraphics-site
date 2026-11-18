import type { Metadata } from "next";
import { PageHero } from "@/components/ui";
import { BookingForm } from "@/components/BookingForm";
import { Icon } from "@/components/Icon";

export const metadata: Metadata = {
  title: "Book a Meeting",
  description: "Request a free online consultation with Pixel Graphics via Google Meet, Zoom, Microsoft Teams or WhatsApp.",
  alternates: { canonical: "/book" },
};

export default function BookPage() {
  return (
    <>
      <PageHero kicker="Book a meeting" title="Let’s meet" accent="online."
        intro="Choose two moments that suit you. We’ll confirm one of them by email with the meeting link — in your own time zone." />
      <section className="py-16 sm:py-24">
        <div className="container-site grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
          <ul className="space-y-6">
            {[
              { i: "clock" as const, t: "30 minutes", d: "Enough time to understand your goals and answer your questions." },
              { i: "remote" as const, t: "Fully online", d: "Google Meet, Zoom, Microsoft Teams or a WhatsApp call." },
              { i: "check" as const, t: "No obligation", d: "The first consultation is free and without commitment." },
            ].map((x) => (
              <li key={x.t} className="flex gap-4"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-teal/10 text-cloud"><Icon name={x.i} className="h-7 w-7" /></span>
                <span><span className="block font-display text-lg uppercase text-cloud">{x.t}</span><span className="text-ink-300">{x.d}</span></span></li>
            ))}
          </ul>
          <div className="rounded-panel border border-white/[0.07] bg-ink-800/50 p-6 sm:p-10"><BookingForm /></div>
        </div>
      </section>
    </>
  );
}
