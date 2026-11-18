import type { Metadata } from "next";
import { PageHero, SectionHeading, Button } from "@/components/ui";
import { purchaseOptions, packageTerms, hourly } from "@/config/pricing";
import { PricingPreview, FinalCTA } from "@/components/sections";
import { Reveal } from "@/components/Reveal";
import { money } from "@/lib/format";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Graphic design by the hour, monthly design and marketing packages from US$200/month, and personal quotations from Pixel Graphics.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <PageHero kicker="Pricing" title="Clear prices." accent="Personal quotes."
        intro="Graphic design by the hour, ongoing monthly support, or a personal quotation built around your project.">
        <ul className="mt-12 grid gap-4 md:grid-cols-3">
          {purchaseOptions.map((o) => (
            <li key={o.key}>
              <a href={o.href} className="group flex h-full flex-col rounded-card border border-white/10 bg-ink-800/70 p-6 backdrop-blur transition hover:-translate-y-1 hover:border-teal/50">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-teal font-display text-ink">{o.key}</span>
                <span className="mt-5 font-display text-xl uppercase text-cloud md:min-h-[2lh]">{o.title}</span>
                <span className="mt-2 flex-1 text-[15px] text-ink-300">{o.text}</span>
                <span className="mt-5 text-sm font-semibold text-teal">{o.cta} <span aria-hidden="true" className="inline-block transition group-hover:translate-x-1">→</span></span>
              </a>
            </li>
          ))}
        </ul>
      </PageHero>

      <section id="hourly" className="scroll-mt-24 border-y border-white/5 bg-ink-900 py-20 sm:py-28">
        <div className="container-site">
          <Reveal><SectionHeading kicker="A · Graphic design by the hour" title="Hourly" accent="rate" intro="One-off graphic design work is charged per hour. Use the calculator to see your price instantly." /></Reveal>
          <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
            <Reveal className="h-full">
              <div className="flex h-full flex-col rounded-panel border border-teal/30 bg-ink-800/60 p-8">
                <p className="text-sm text-ink-300">{hourly.service}</p>
                <p className="mt-2"><span className="font-display text-5xl text-teal sm:text-6xl">{money(hourly.rate)}</span><span className="text-ink-300"> / hour</span></p>
                <ul className="mt-6 space-y-2 text-[15px] text-ink-200">
                  <li>Minimum {hourly.minHours} hours per project</li>
                  <li>Rush delivery: +{Math.round(hourly.rushSurcharge * 100)}%</li>
                  <li>Hours are confirmed with you before we start</li>
                </ul>
                <Button href="/calculator" arrow className="mt-8 self-start">Open the calculator</Button>
              </div>
            </Reveal>
            <Reveal delay={0.08} className="h-full">
              <div className="h-full rounded-panel border border-white/[0.07] bg-ink-800/40 p-8">
                <p className="text-sm font-semibold tracking-[0.15em] text-cloud">EXAMPLES</p>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {hourly.examples.map((e) => <li key={e} className="flex items-center gap-3 text-[15px] text-ink-200"><span className="h-1.5 w-1.5 shrink-0 rounded-full bg-teal" aria-hidden="true" />{e}</li>)}
                </ul>
                <p className="mt-8 border-t border-white/10 pt-6 text-sm leading-relaxed text-ink-300">Branding, social media, marketing and other services are not charged by the hour. They are quoted personally. <a href="#custom-quote" className="font-semibold text-teal underline underline-offset-4">Request a quote</a></p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="packages" className="scroll-mt-24 py-20 sm:py-28">
        <div className="container-site">
          <Reveal><SectionHeading kicker="B · Monthly service packages" title="Monthly" accent="packages" intro="Ongoing support for brand, graphic design, social media, content planning and campaigns. Website design is not part of these packages and is available as a separate service." /></Reveal>
          <PricingPreview detailed />
          <ul className="mx-auto mt-12 max-w-3xl space-y-2 text-center text-sm text-ink-400">{packageTerms.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
      </section>

      <section id="custom-quote" className="scroll-mt-24 py-20 sm:py-28">
        <div className="container-site">
          <Reveal>
            <div className="grid items-center gap-10 rounded-panel bg-deep-700 p-8 sm:p-12 lg:grid-cols-[1.4fr_1fr] lg:p-16">
              <div>
                <p className="kicker mb-6 !text-cloud before:!bg-cloud">C · Personal quotation</p>
                <h2 className="text-balance text-[1.9rem] text-cloud sm:text-6xl">Have something different <span className="text-teal">in mind?</span></h2>
                <p className="mt-6 max-w-xl text-base text-teal-100 sm:text-lg">Branding, social media, marketing or something else? Answer a few questions about your project and receive a personal quotation.</p>
              </div>
              <div className="flex flex-col gap-3 lg:items-end">
                <Button href="/brief" variant="dark" arrow>Request a Custom Quote</Button>
                <Button href="/contact?topic=quote" variant="outline" className="!border-cloud/40">Or send a quick message</Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
