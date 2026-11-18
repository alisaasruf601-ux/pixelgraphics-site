import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/ui";
import { ContactForm } from "@/components/ContactForm";
import { Icon } from "@/components/Icon";
import { site, socialLinks, whatsappLink, whatsappDisplay, bookingHref } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Pixel Graphics about your branding, design, social media or marketing project. We work with clients in the Netherlands, Suriname, Brazil and worldwide.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const wa = whatsappLink();
  return (
    <>
      <PageHero kicker="Contact" title="Let’s" accent="talk."
        intro="Tell us about your business and project. We reply within 1–2 working days, by email, WhatsApp or in an online meeting." />
      <section className="py-16 sm:py-24">
        <div className="container-site grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          <aside className="space-y-4" aria-label="Other ways to reach us">
            <ContactCard icon="calendar" title="Book an online meeting" text="Pick a time that suits your time zone." href={bookingHref} cta="Book a Meeting" />
            {wa && <ContactCard icon="chat" title="WhatsApp" text={`Quick question? Message us directly: ${whatsappDisplay()}`} href={wa} cta="Chat on WhatsApp" external />}
            {site.contact.email && <ContactCard icon="mail" title="Email" text={site.contact.email} href={`mailto:${site.contact.email}`} cta="Send an email" />}
            <ContactCard icon="calc" title="Not sure about the budget?" text="Calculate graphic design work by the hour, or request a personal quote." href="/calculator" cta="Use the calculator" />
            <ContactCard icon="doc" title="Bigger project?" text="Share the details in a structured project brief." href="/brief" cta="Open the project brief" />
            {socialLinks.length > 0 && (
              <div className="rounded-card border border-white/[0.07] bg-ink-800/60 p-6">
                <p className="text-sm font-semibold text-cloud">Follow us</p>
                <ul className="mt-3 flex flex-wrap gap-2">{socialLinks.map((s) => <li key={s.key}><a href={s.url} target="_blank" rel="noopener noreferrer" className="chip">{s.label}</a></li>)}</ul>
              </div>
            )}
          </aside>
          <div className="rounded-panel border border-white/[0.07] bg-ink-800/50 p-6 sm:p-10">
            <h2 className="text-3xl text-cloud">Send us a <span className="text-teal">message</span></h2>
            <p className="mb-8 mt-2 text-ink-300">Fields marked <span className="text-teal">*</span> are required.</p>
            <Suspense fallback={<p className="text-ink-300">Loading form…</p>}><ContactForm /></Suspense>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactCard({ icon, title, text, href, cta, external }: { icon: "calendar" | "chat" | "mail" | "calc" | "doc"; title: string; text: string; href: string; cta: string; external?: boolean }) {
  const ext = external || href.startsWith("http");
  return (
    <a href={href} {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="group flex items-start gap-4 rounded-card border border-white/[0.07] bg-ink-800/60 p-6 transition hover:border-teal/50">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-teal/10 text-cloud group-hover:bg-teal group-hover:text-ink"><Icon name={icon} className="h-7 w-7" /></span>
      <span><span className="block font-semibold text-cloud">{title}</span><span className="block text-sm text-ink-300">{text}</span><span className="mt-2 block text-sm font-semibold text-teal">{cta} →</span></span>
    </a>
  );
}
