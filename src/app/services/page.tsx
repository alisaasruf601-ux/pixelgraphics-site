import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Button } from "@/components/ui";
import { departments } from "@/config/services";
import { DeptVisual } from "@/components/DeptVisual";
import servicesJson from "../../../content/services.json";

const imageFor = (slug: string) => (servicesJson.showcase as { slug: string; image?: string }[]).find((s) => s.slug === slug)?.image;
import { Reveal } from "@/components/Reveal";
import { CalculatorBanner, FinalCTA } from "@/components/sections";

export const metadata: Metadata = {
  title: "Services",
  description: "Branding & visual identity, marketing & advertising, social media design, packaging design, editorial & print design and social media management from Pixel Graphics.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero kicker="Our services" title="Six services." accent="One creative partner."
        intro="Everything your brand needs to be seen and remembered, from logo and packaging to print and social media. We focus on what we do best: design that works.">
        <nav aria-label="Service departments" className="mt-12">
          <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {departments.map((d) => <li key={d.slug}><a href={`#${d.slug}`} className="chip w-full"><span className="text-teal">{d.number}</span>{d.shortTitle}</a></li>)}
          </ul>
        </nav>
      </PageHero>

      <div className="py-12 sm:py-20">
        {departments.map((d, i) => {
          const flip = i % 2 === 1;
          return (
            <section key={d.slug} id={d.slug} aria-labelledby={`${d.slug}-h`} className="scroll-mt-28 py-10 sm:py-14">
              <div className="container-site">
                <div className={`grid items-start gap-10 rounded-panel border border-white/[0.06] p-5 sm:p-8 lg:grid-cols-2 lg:gap-14 lg:p-12 ${i % 2 ? "bg-ink-900" : "bg-ink-800/40"}`}>
                  <Reveal className={`${flip ? "lg:order-2" : ""} lg:sticky lg:top-28`}>
                    <div className="group overflow-hidden rounded-card">
                      {imageFor(d.slug)
                        // eslint-disable-next-line @next/next/no-img-element
                        ? <img src={imageFor(d.slug)} alt={d.title} loading="lazy" decoding="async" className="aspect-[16/11] w-full object-cover" />
                        : <DeptVisual icon={d.icon} large className="aspect-[4/3]" />}
                    </div>
                  </Reveal>
                  <Reveal delay={0.1}>
                    <p className="font-display text-5xl text-deep sm:text-7xl" aria-hidden="true">{d.number}</p>
                    <h2 id={`${d.slug}-h`} className="mt-2 text-balance text-[1.6rem] text-cloud sm:text-4xl">{d.title}</h2>
                    <p className="mt-5 text-base leading-relaxed text-ink-200 sm:text-lg">{d.intro}</p>
                    <h3 className="mt-8 font-sans text-xs font-semibold normal-case tracking-[0.2em] text-teal">WHAT WE OFFER</h3>
                    <ul className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                      {d.services.map((s) => <li key={s} className="flex items-center gap-3 text-[15px] text-ink-200"><span className="h-1.5 w-1.5 shrink-0 rounded-full bg-teal" aria-hidden="true" />{s}</li>)}
                    </ul>
                    <div className="mt-9 flex flex-wrap gap-3 border-t border-white/10 pt-7">
                      <Button href={`/contact?service=${encodeURIComponent(d.shortTitle)}`} arrow className="!py-3">Start Your Project</Button>
                      <Button href="/contact?topic=consultation" variant="outline" className="!py-3">Ask a question</Button>
                    </div>
                  </Reveal>
                </div>
              </div>
            </section>
          );
        })}
      </div>
      <section className="pb-6"><div className="container-site"><CalculatorBanner /></div></section>
      <p className="container-site mt-6 text-sm text-ink-400">Need a combination of services? <Link href="/brief" className="text-teal underline underline-offset-4">Fill in a project brief</Link> and we’ll put together a proposal.</p>
      <FinalCTA />
    </>
  );
}
