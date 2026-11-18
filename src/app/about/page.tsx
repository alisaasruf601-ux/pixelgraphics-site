import type { Metadata } from "next";
import { PageHero, SectionHeading, Button } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { Icon, type IconKey } from "@/components/Icon";
import { Ribbon } from "@/components/Ribbon";
import { FinalCTA } from "@/components/sections";
import { LogoMark } from "@/components/Logo";

export const metadata: Metadata = {
  title: "About",
  description: "Pixel Graphics is an independent, remote-first creative and digital marketing studio helping businesses build distinctive brands across the Netherlands, Suriname, Brazil and worldwide.",
  alternates: { canonical: "/about" },
};

const values: { icon: IconKey; title: string; text: string }[] = [
  { icon: "spark", title: "Creative thinking", text: "Fresh ideas grounded in what your business actually needs." },
  { icon: "chat", title: "Professional communication", text: "Clear updates, honest timelines and fast replies." },
  { icon: "globe", title: "International collaboration", text: "Comfortable working across countries, cultures and time zones." },
  { icon: "remote", title: "Flexible remote workflow", text: "Online meetings, shared files and structured feedback rounds." },
  { icon: "eye", title: "Attention to detail", text: "Every pixel, colour and word checked before delivery." },
  { icon: "target", title: "Strategic design", text: "Design decisions that support your goals, not just look good." },
];

const why = [
  { title: "One studio, many disciplines", text: "Branding, design, social media, marketing and motion — consistent because it comes from one place." },
  { title: "Clear scope and pricing", text: "Fixed prices, monthly packages or a custom proposal: you know what you get before we start." },
  { title: "Built for international clients", text: "We work in English with clients in the Netherlands, Suriname, Brazil and beyond." },
  { title: "Brand consistency", text: "Everything we deliver follows your brand identity, so every touchpoint feels like you." },
];

const remote = [
  { icon: "calendar" as const, title: "Online meetings", text: "Kick-offs, presentations and check-ins via Google Meet, Zoom, Teams or WhatsApp." },
  { icon: "doc" as const, title: "Shared briefs & files", text: "A structured project brief and a shared folder keep everything in one place." },
  { icon: "pen" as const, title: "Structured feedback", text: "Clear review rounds with consolidated feedback — no endless email threads." },
  { icon: "clock" as const, title: "Time-zone friendly", text: "We plan meeting times and deadlines around your time zone." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero kicker="About Pixel Graphics" title="Creative" accent="Without Borders."
        intro="Pixel Graphics is an independent creative and digital marketing studio combining strategic thinking, visual communication and digital solutions to help businesses build distinctive brands." />

      <section className="py-20 sm:py-28">
        <div className="container-site grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <SectionHeading kicker="Who we are" title="A remote-first" accent="creative studio" align="left" />
            <div className="space-y-5 text-lg leading-relaxed text-ink-200">
              <p>We are a remote-first studio for branding, graphic design, social media, digital marketing and motion. We work fully online, which means we can work with businesses wherever they are — from Amsterdam to Paramaribo to São Paulo.</p>
              <p>Our focus is simple: help businesses look professional, communicate clearly and grow with design that is consistent across every channel.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative aspect-[5/4] overflow-hidden rounded-panel bg-teal">
              <Ribbon width={700} height={430} className="absolute -left-10 top-10 w-[115%]" />
              <div className="absolute bottom-6 right-6 grid h-28 w-28 place-items-center rounded-3xl bg-ink p-5 shadow-lift"><LogoMark className="w-full" /></div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-white/5 bg-ink-900 py-20 sm:py-28">
        <div className="container-site grid gap-6 lg:grid-cols-3">
          {[
            { k: "Our story", t: "Why we started", b: "Pixel Graphics was created to give growing businesses access to complete, professional creative support — without the overhead of a large agency. Working remotely lets us stay focused, flexible and close to our clients online." },
            { k: "Our mission", t: "Make brands stand out", b: "To help businesses build distinctive, consistent brands through strategic design, clear communication and practical digital marketing." },
            { k: "Our vision", t: "Creativity without borders", b: "To be a trusted creative partner for businesses across the Netherlands, Suriname, Brazil and internationally — wherever they are." },
          ].map((c, i) => (
            <Reveal key={c.k} delay={i * 0.1} className="h-full">
              <article className={`flex h-full flex-col rounded-panel p-8 sm:p-10 ${i === 1 ? "bg-deep-700" : "card-dark"}`}>
                <p className={`kicker mb-6 ${i === 1 ? "!text-cloud before:!bg-cloud" : ""}`}>{c.k}</p>
                <h2 className="text-3xl text-cloud">{c.t}</h2>
                <p className={`mt-5 leading-relaxed ${i === 1 ? "text-teal-100" : "text-ink-300"}`}>{c.b}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <p className="container-site mt-6 text-sm text-ink-400">Story, mission and vision are draft copy — review and adjust to your own words.</p>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-site">
          <Reveal><SectionHeading kicker="Our values" title="What we" accent="stand for" intro="Six principles that shape how we design, communicate and collaborate." /></Reveal>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <li key={v.title}><Reveal delay={(i % 3) * 0.08} className="h-full">
                <div className="group h-full rounded-card border border-white/[0.07] bg-ink-800/60 p-7 transition hover:border-teal/40">
                  <span className="grid h-14 w-14 place-items-center rounded-2xl bg-teal/10 text-cloud transition group-hover:bg-teal group-hover:text-ink"><Icon name={v.icon} className="h-8 w-8" accent /></span>
                  <h3 className="mt-6 text-xl text-cloud">{v.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-300">{v.text}</p>
                </div>
              </Reveal></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-teal py-20 text-ink sm:py-28">
        <div className="container-site">
          <Reveal><SectionHeading dark kicker="Why work with us" title="Why Pixel" accent="Graphics?" /></Reveal>
          <ol className="grid gap-x-10 gap-y-12 md:grid-cols-2">
            {why.map((w, i) => (
              <li key={w.title} className="border-t-2 border-ink pt-6"><Reveal delay={i * 0.06}>
                <span className="font-display text-5xl text-deep-800">0{i + 1}</span>
                <h3 className="mt-3 text-2xl">{w.title}</h3>
                <p className="mt-3 text-lg leading-relaxed text-ink/80">{w.text}</p>
              </Reveal></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container-site">
          <Reveal><SectionHeading kicker="How remote works" title="Our remote" accent="working approach" intro="Working remotely doesn't mean working at a distance. Here's how we keep collaboration personal and organised." /></Reveal>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {remote.map((r, i) => (
              <li key={r.title}><Reveal delay={i * 0.08} className="h-full"><div className="h-full rounded-card border border-white/[0.07] bg-ink-800/60 p-7">
                <Icon name={r.icon} className="h-10 w-10 text-cloud" /><h3 className="mt-5 text-lg text-cloud">{r.title}</h3><p className="mt-2 text-[15px] leading-relaxed text-ink-300">{r.text}</p>
              </div></Reveal></li>
            ))}
          </ul>
          <div className="mt-12"><Button href="/process" variant="outline" arrow>See our full process</Button></div>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
