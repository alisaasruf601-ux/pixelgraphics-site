"use client";
import Link from "next/link";
import { departments } from "@/config/services";
import { type Package } from "@/config/pricing";
import { type IconChoice } from "@/config/content";
import { useLive, tf } from "./LiveContent";
import { bookingHref } from "@/config/site";
import { money } from "@/lib/format";
import { Button, Kicker } from "./ui";
import { DeptVisual } from "./DeptVisual";
import { Icon } from "./Icon";
import { Reveal } from "./Reveal";

export function ServiceCards() {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {departments.map((d, i) => (
        <li key={d.slug}>
          <Reveal delay={(i % 4) * 0.08} className="h-full">
            <Link href={`/services#${d.slug}`} className="group flex h-full flex-col overflow-hidden rounded-card border border-white/[0.07] bg-ink-800/60 transition duration-500 hover:-translate-y-2 hover:border-teal/40 hover:shadow-glow">
              <DeptVisual icon={d.icon} className="aspect-[16/10]" />
              <div className="flex flex-1 flex-col p-6">
                <span className="text-xs font-semibold tracking-[0.18em] text-ink-400">{d.number}</span>
                <h3 className="mt-2 text-xl leading-tight text-cloud">{d.shortTitle}</h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-300">{d.summary}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-teal">Explore service <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span></span>
              </div>
            </Link>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

export function CalculatorBanner() {
  const { home } = useLive();
  const c = home.calculator;
  return (
    <Reveal>
      <div className="relative overflow-hidden rounded-panel bg-teal px-6 py-14 text-ink sm:px-12 lg:px-16 lg:py-20">
        <CalculatorPreview />
        <div className="relative max-w-xl">
          <div className="mb-6 inline-grid h-14 w-14 place-items-center rounded-2xl bg-ink text-cloud"><Icon name="calc" className="h-8 w-8" /></div>
          <h2 className="text-ink [--fs:1.95rem] sm:[--fs:3.75rem]" style={{ fontSize: "calc(var(--fs) * var(--heading-scale, 1))" }}><span data-tina-field={tf(c, "title")}>{c.title}</span> <span className="text-deep-800" data-tina-field={tf(c, "accent")}>{c.accent}</span></h2>
          <p className="mt-5 text-base text-ink/80 sm:text-lg" data-tina-field={tf(c, "text")}>{c.text}</p>
          <ul className="mt-6 space-y-2 text-[15px] font-medium">
            {c.points.map((t, i) => (
              <li key={i} className="flex items-center gap-3" data-tina-field={tf(c, "points", i)}><span className="grid h-6 w-6 place-items-center rounded-full bg-ink text-xs text-teal" aria-hidden="true">✓</span>{t}</li>
            ))}
          </ul>
          <Button href="/calculator" variant="dark" arrow className="mt-8" field={tf(c, "button")}>{c.button}</Button>
        </div>
      </div>
    </Reveal>
  );
}

export function ProcessPreview() {
  const { home } = useLive();
  const processSteps = home.process.steps.map((st, i) => ({ ...st, n: String(i + 1).padStart(2, "0"), icon: st.icon as IconChoice, src: st }));
  return (
    <ol className="relative grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <div className="absolute left-0 right-0 top-[38px] hidden h-px bg-gradient-to-r from-teal/0 via-teal/50 to-teal/0 lg:block" aria-hidden="true" />
      {processSteps.map((s, i) => (
        <li key={s.n}>
          <Reveal delay={i * 0.1}>
            <div className="relative grid h-[76px] w-[76px] place-items-center rounded-2xl border border-teal/30 bg-ink-800 text-cloud shadow-glow" data-tina-field={tf(s.src, "icon")}>
              <Icon name={s.icon} className="h-9 w-9" />
              <span className="absolute -right-3 -top-3 grid h-8 w-8 place-items-center rounded-full bg-teal text-xs font-bold text-ink">{s.n}</span>
            </div>
            <h3 className="mt-7 text-2xl text-cloud" data-tina-field={tf(s.src, "title")}>{s.title}</h3>
            <p className="mt-3 leading-relaxed text-ink-300" data-tina-field={tf(s.src, "text")}>{s.text}</p>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

export function PackageCard({ pkg, detailed = false }: { pkg: Package; detailed?: boolean }) {
  const rec = pkg.recommended;
  return (
    <div className={`relative flex h-full flex-col rounded-panel p-7 sm:p-9 ${rec ? "bg-gradient-to-b from-deep-700 to-deep-800 text-cloud shadow-glow lg:-translate-y-4" : "border border-white/[0.08] bg-ink-800/70"}`}>
      {rec && <span data-tina-field={tf(pkg, "recommended")} className="absolute -top-3.5 left-7 rounded-full bg-teal px-4 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-ink">Recommended</span>}
      <h3 className="text-2xl tracking-wide" data-tina-field={tf(pkg, "name")}>{pkg.name}</h3>
      <p className={`mt-2 min-h-[48px] text-sm leading-relaxed ${rec ? "text-teal-100" : "text-ink-300"}`} data-tina-field={tf(pkg, "bestFor")}>{pkg.bestFor}</p>
      <p className="mt-6"><span className="text-sm font-medium opacity-80">From </span><span className="font-display text-[2.6rem] sm:text-5xl" data-tina-field={tf(pkg, "priceFrom")}>{money(Number(pkg.priceFrom))}</span><span className="text-sm opacity-80">/month</span></p>
      <ul className={`mt-7 space-y-3 border-t pt-7 text-[15px] ${rec ? "border-white/20" : "border-white/10"}`}>
        {(detailed ? pkg.deliverables : pkg.deliverables.slice(0, 4)).map((f, i) => (
          <li key={i} className="flex gap-3" data-tina-field={tf(pkg, "deliverables", i)}><span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[11px] font-bold ${rec ? "bg-cloud text-deep" : "bg-teal text-ink"}`} aria-hidden="true">✓</span>{f}</li>
        ))}
      </ul>
      {detailed && (
        <dl className={`mt-7 space-y-4 border-t pt-7 text-sm ${rec ? "border-white/20" : "border-white/10"}`}>
          <Meta label="Focus" value={pkg.included.join(" · ")} rec={rec} />
          <Meta label="Revisions" value={pkg.revisions} rec={rec} />
          <Meta label="Duration" value={pkg.duration} rec={rec} />
          <Meta label="Optional extras" value={pkg.extras.join(" · ")} rec={rec} />
          <div><dt className={`mb-1.5 font-semibold ${rec ? "text-teal-100" : "text-teal"}`}>Not included</dt>
            <dd><ul className="space-y-1 opacity-85">{pkg.limitations.map((l) => <li key={l}>– {l}</li>)}</ul></dd></div>
        </dl>
      )}
      <div className="mt-auto pt-8">
        <Button href={`/contact?package=${pkg.id}`} variant={rec ? "primary" : "outline"} arrow className="w-full justify-between">Choose {pkg.name}</Button>
      </div>
    </div>
  );
}
function Meta({ label, value, rec }: { label: string; value: string; rec?: boolean }) {
  return <div><dt className={`mb-1 font-semibold ${rec ? "text-teal-100" : "text-teal"}`}>{label}</dt><dd className="opacity-90">{value}</dd></div>;
}

export function PricingPreview({ detailed = false }: { detailed?: boolean }) {
  const packages = useLive().pricing.packages as Package[];
  return (
    <div className="grid gap-6 pt-4 lg:grid-cols-3 lg:items-stretch">
      {packages.map((p, i) => <Reveal key={i} delay={i * 0.1} className="h-full"><PackageCard pkg={p} detailed={detailed} /></Reveal>)}
    </div>
  );
}

export function FinalCTA({ title = "Let’s Bring Your Next", accent = "Project to Life.", text = "Tell us what you have in mind. We’ll schedule an online meeting and help you choose the right next step.", fields = {} }:
  { title?: string; accent?: string; text?: string; fields?: { title?: string; accent?: string; text?: string; primary?: string; secondary?: string } }) {
  const { home } = useLive();
  return (
    <section className="py-20 sm:py-28">
      <div className="container-site">
        <Reveal>
          <div className="pattern-bg relative overflow-hidden rounded-panel border border-white/[0.06] px-6 py-16 text-center sm:px-12 sm:py-24">
            <div className="glow-teal pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/2" aria-hidden="true" />
            <div className="relative mx-auto max-w-3xl">
              <Kicker className="mb-6 justify-center">Let’s work together</Kicker>
              <h2 className="text-balance text-cloud [--fs:1.95rem] sm:[--fs:3.75rem] lg:[--fs:4.5rem]" style={{ fontSize: "calc(var(--fs) * var(--heading-scale, 1))" }}><span data-tina-field={fields.title}>{title}</span> <span className="text-teal" data-tina-field={fields.accent}>{accent}</span></h2>
              <p className="mx-auto mt-6 max-w-xl text-base text-ink-200 sm:text-lg" data-tina-field={fields.text}>{text}</p>
              <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
                <Button href={bookingHref} arrow field={fields.primary}>{home.finalCta.primaryButton}</Button>
                <Button href="/contact" variant="outline" field={fields.secondary}>{home.finalCta.secondaryButton}</Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Sharp, live-styled picture of the hourly calculator (uses the real rate from pricing.ts). */
function CalculatorPreview() {
  const hourly = useLive().pricing.hourly;
  const hours = 8;
  const rate = Number(hourly.rate) || 0;
  const total = Math.round(hours * rate * 100) / 100;
  return (
    <div aria-hidden="true" className="pointer-events-none absolute right-10 top-1/2 hidden w-[400px] -translate-y-1/2 rotate-[-4deg] lg:block xl:right-20 xl:w-[430px]">
      <div className="rounded-[28px] bg-ink p-7 text-cloud shadow-[0_40px_80px_-30px_rgba(0,0,0,.55)]">
        <p className="text-[11px] font-semibold tracking-[0.2em] text-teal">YOUR ESTIMATE</p>
        <p className="mt-2 text-sm text-ink-300"><span className="pointer-events-auto" data-tina-field={tf(hourly, "service")}>{hourly.service}</span> · <span className="pointer-events-auto text-cloud" data-tina-field={tf(hourly, "rate")}>{money(rate)}</span> per hour</p>
        <div className="mt-6 flex items-center justify-between rounded-2xl bg-white/[0.06] px-4 py-3">
          <span className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-xl">−</span>
          <span className="flex items-baseline gap-2"><span className="font-display text-4xl">{hours}</span><span className="text-sm text-ink-300">hours</span></span>
          <span className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-xl">+</span>
        </div>
        <div className="mt-4 h-1.5 rounded-full bg-white/10"><div className="h-full w-1/4 rounded-full bg-teal" /></div>
        <div className="mt-4 flex flex-wrap gap-2">
          {["4 hours", "8 hours", "16 hours"].map((h) => (
            <span key={h} className={`rounded-full border px-3 py-1.5 text-xs ${h === "8 hours" ? "border-teal bg-teal text-ink" : "border-white/15 text-ink-200"}`}>{h}</span>
          ))}
        </div>
        <div className="mt-6 flex items-end justify-between border-t border-white/10 pt-5">
          <span className="text-sm text-ink-300">Estimated total</span>
          <span className="font-display text-4xl text-teal">{money(total)}</span>
        </div>
        <div className="mt-5 rounded-full bg-teal py-3 text-center text-sm font-semibold text-ink">Request this project →</div>
      </div>
    </div>
  );
}
