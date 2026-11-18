import type { Metadata } from "next";
import { PageHero, SectionHeading, Button } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { Icon, type IconKey } from "@/components/Icon";
import { FinalCTA } from "@/components/sections";
import { bookingHref } from "@/config/site";

export const metadata: Metadata = {
  title: "Our Process",
  description: "How a project with Pixel Graphics works, from your first inquiry to final delivery, fully online.",
  alternates: { canonical: "/process" },
};

const journey: { title: string; icon: IconKey; text: string; you: string; link?: { label: string; href: string } }[] = [
  { title: "Initial inquiry", icon: "chat", text: "You reach out via the contact form, WhatsApp, the price calculator or by booking a meeting.", you: "Tell us briefly what you need.", link: { label: "Contact us", href: "/contact" } },
  { title: "Project briefing", icon: "doc", text: "We collect the details: your business, goals, audience, deliverables, style and deadline.", you: "Fill in the project brief (about 10 minutes).", link: { label: "Open the brief", href: "/brief" } },
  { title: "Consultation", icon: "calendar", text: "A short online meeting to discuss your brief, ask questions and align on direction.", you: "Join the call on your preferred platform.", link: { label: "Book a meeting", href: bookingHref } },
  { title: "Proposal and quotation", icon: "calc", text: "You receive a clear proposal with scope, deliverables, timeline, revision rounds and price.", you: "Review the proposal and ask for changes if needed." },
  { title: "Contract and payment", icon: "shield", text: "We confirm the agreement in writing. Work starts after a 50% deposit.", you: "Sign the agreement and pay the 50% deposit." },
  { title: "Creative development", icon: "pen", text: "We research, design and produce your work, sharing progress at agreed moments.", you: "Stay available for quick questions." },
  { title: "Feedback and revisions", icon: "eye", text: "You review the work and send consolidated feedback. We refine within the agreed revision rounds.", you: "Collect feedback from your team in one round." },
  { title: "Final approval", icon: "check", text: "Once everything is right, you give final approval and pay the remaining 50%.", you: "Approve the final versions and pay the remaining 50%." },
  { title: "Delivery", icon: "handshake", text: "We deliver all final files in the agreed formats, ready to use online and in print.", you: "Download your files and start growing." },
];

const remote: { icon: IconKey; title: string; text: string }[] = [
  { icon: "calendar", title: "Meetings online", text: "Google Meet, Zoom, Microsoft Teams or a WhatsApp call, whatever suits you." },
  { icon: "doc", title: "One shared workspace", text: "Briefs, drafts and final files are shared in one organised online folder." },
  { icon: "clock", title: "Your time zone", text: "Meetings and deadlines are planned in your local time." },
  { icon: "chat", title: "Clear communication", text: "Regular updates by email or WhatsApp, so you always know the status." },
];

export default function ProcessPage() {
  return (
    <>
      <PageHero kicker="Our process" title="From first message" accent="to final files."
        intro="A clear nine-step journey, run fully online. You always know what happens next and what we need from you." />

      <section className="py-20 sm:py-28" aria-labelledby="journey-h">
        <div className="container-site">
          <h2 id="journey-h" className="sr-only">The client journey</h2>
          <ol className="relative mx-auto max-w-4xl">
            <div className="absolute bottom-0 left-[27px] top-0 w-px bg-gradient-to-b from-teal via-deep to-teal/0 sm:left-1/2" aria-hidden="true" />
            {journey.map((s, i) => {
              const right = i % 2 === 1;
              return (
                <li key={s.title} className="relative pb-12 last:pb-0 sm:grid sm:grid-cols-2 sm:gap-16">
                  <div className="absolute left-0 top-0 z-10 grid h-14 w-14 place-items-center rounded-2xl border border-teal/40 bg-ink-800 text-cloud shadow-glow sm:left-1/2 sm:-translate-x-1/2">
                    <Icon name={s.icon} className="h-7 w-7" />
                  </div>
                  <Reveal className={`pl-20 sm:pl-0 ${right ? "sm:col-start-2 sm:pl-12" : "sm:pr-12 sm:text-right"}`}>
                    <p className="font-display text-sm text-teal">STEP {String(i + 1).padStart(2, "0")}</p>
                    <h3 className="mt-2 text-2xl text-cloud sm:text-3xl">{s.title}</h3>
                    <p className="mt-3 leading-relaxed text-ink-300">{s.text}</p>
                    <p className={`mt-4 inline-flex items-start gap-2 rounded-xl bg-teal/[0.08] px-4 py-2.5 text-left text-sm text-ink-200 ${right ? "" : "sm:flex-row-reverse sm:text-right"}`}>
                      <span className="font-semibold text-teal">You:</span>{s.you}
                    </p>
                    {s.link && <p className="mt-3"><a href={s.link.href} className="text-sm font-semibold text-teal hover:underline">{s.link.label} →</a></p>}
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="border-y border-white/5 bg-ink-900 py-20 sm:py-28">
        <div className="container-site">
          <Reveal><SectionHeading kicker="Remote collaboration" title="How remote" accent="collaboration works" intro="We work with clients in different countries and time zones. These four habits keep every project personal, organised and on schedule." /></Reveal>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {remote.map((r, i) => (
              <li key={r.title}><Reveal delay={i * 0.08} className="h-full"><div className="h-full rounded-card border border-white/[0.07] bg-ink-800/60 p-7">
                <Icon name={r.icon} className="h-10 w-10 text-cloud" /><h3 className="mt-5 text-lg text-cloud">{r.title}</h3><p className="mt-2 text-[15px] leading-relaxed text-ink-300">{r.text}</p>
              </div></Reveal></li>
            ))}
          </ul>
          <div className="mt-12 flex flex-col gap-3 sm:flex-row"><Button href="/brief" arrow>Start your project brief</Button><Button href="/calculator" variant="outline">Hourly calculator</Button></div>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
