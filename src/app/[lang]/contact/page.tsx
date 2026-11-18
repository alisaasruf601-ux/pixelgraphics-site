import { Suspense } from "react";
import { localizeHref } from "@/i18n/config";
import { pageI18n, pageMetadata } from "@/i18n/server";
import { PageHero } from "@/components/ui";
import { ContactForm } from "@/components/ContactForm";
import { Icon } from "@/components/Icon";
import { site, socialLinks, whatsappLink, whatsappDisplay, bookingHref } from "@/config/site";

export const generateMetadata = pageMetadata("contact", "/contact");

export default async function ContactPage(props: { params: Promise<{ lang: string }> }) {
  const { lang, t } = await pageI18n(props);
  const c = t.contact;
  const L = (h: string) => localizeHref(h, lang);
  const wa = whatsappLink(t.whatsapp.message);
  return (
    <>
      <PageHero kicker={c.kicker} title={c.title} accent={c.accent} intro={c.intro} />
      <section className="py-16 sm:py-24">
        <div className="container-site grid gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
          <aside className="space-y-4" aria-label={c.otherWays}>
            <ContactCard icon="calendar" title={c.meetTitle} text={c.meetText} href={L(bookingHref)} cta={t.header.book} />
            {wa && <ContactCard icon="chat" title="WhatsApp" text={`${c.waText} ${whatsappDisplay()}`} href={wa} cta={c.waCta} external />}
            {site.contact.email && <ContactCard icon="mail" title={t.forms.email} text={site.contact.email} href={`mailto:${site.contact.email}`} cta={c.mailCta} />}
            <ContactCard icon="calc" title={c.budgetTitle} text={c.budgetText} href={L("/calculator")} cta={c.budgetCta} />
            <ContactCard icon="doc" title={c.biggerTitle} text={c.biggerText} href={L("/brief")} cta={c.biggerCta} />
            {socialLinks.length > 0 && (
              <div className="rounded-card border border-white/[0.07] bg-ink-800/60 p-6">
                <p className="text-sm font-semibold text-cloud">{c.follow}</p>
                <ul className="mt-3 flex flex-wrap gap-2">{socialLinks.map((s) => <li key={s.key}><a href={s.url} target="_blank" rel="noopener noreferrer" className="chip">{s.label}</a></li>)}</ul>
              </div>
            )}
          </aside>
          <div className="rounded-panel border border-white/[0.07] bg-ink-800/50 p-6 sm:p-10">
            <h2 className="text-2xl text-cloud sm:text-3xl">{c.formTitle} <span className="text-teal">{c.formAccent}</span></h2>
            <p className="mb-8 mt-2 text-ink-300">{c.required[0]} <span className="text-teal">*</span> {c.required[1]}</p>
            <Suspense fallback={<p className="text-ink-300">{c.loading}</p>}><ContactForm /></Suspense>
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
