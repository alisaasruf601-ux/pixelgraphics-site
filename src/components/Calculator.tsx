"use client";
/**
 * Hourly calculator — graphic design only. Rate, minimum hours and rush surcharge
 * come from `hourly` in src/config/pricing.ts.
 */
import { useEffect, useRef, useState } from "react";
import Link from "./LocalLink";
import { toHourly } from "@/config/pricing";
import { useLive } from "./LiveContent";
import { useI18n } from "@/i18n/I18nProvider";
import { priceHours } from "@/lib/calc";
import { money } from "@/lib/format";
import { TextField, TextArea, SelectField, Consent, Honeypot, FormError, SuccessPanel, useSubmit, formToObject, useFormOptions } from "./forms";
import { fmt } from "@/i18n/config";

export function Calculator() {
  const { t } = useI18n();
  const c = t.calc;
  const hourly = toHourly(useLive().pricing.hourly);
  const [hours, setHours] = useState(hourly.minHours);
  const [rush, setRush] = useState(false);
  const [kinds, setKinds] = useState<string[]>([]);
  const [requesting, setRequesting] = useState(false);
  const p = priceHours(hours, rush);
  const sliderMax = Math.min(hourly.maxHours, 80);

  const setH = (v: number) => setHours(Math.min(hourly.maxHours, Math.max(hourly.minHours, Math.round(v) || hourly.minHours)));
  const toggleKind = (k: string) => setKinds((ks) => (ks.includes(k) ? ks.filter((x) => x !== k) : [...ks, k]));

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-start">
      <div className="space-y-6">
        {/* 1. Work type */}
        <section className="rounded-panel border border-white/10 bg-ink-800/50 p-6 sm:p-8" aria-labelledby="calc-kind">
          <StepLabel n={1} id="calc-kind">{c.kind}</StepLabel>
          <p className="mt-2 text-sm text-ink-300">{c.kindHint}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {hourly.examples.map((k) => (
              <button key={k} type="button" aria-pressed={kinds.includes(k)} onClick={() => toggleKind(k)} className={`chip ${kinds.includes(k) ? "chip-on" : ""}`}>{k}</button>
            ))}
          </div>
        </section>

        {/* 2. Hours */}
        <section className="rounded-panel border border-white/10 bg-ink-800/50 p-6 sm:p-8" aria-labelledby="calc-hours">
          <StepLabel n={2} id="calc-hours">{c.howMany}</StepLabel>
          <p className="mt-2 text-sm text-ink-300">{fmt(c.hoursHint, { min: hourly.minHours })}</p>
          <div className="mt-6 flex items-center gap-4">
            <button type="button" onClick={() => setH(hours - 1)} disabled={hours <= hourly.minHours} aria-label={c.less}
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/15 text-2xl text-cloud transition hover:border-teal hover:text-teal disabled:opacity-30">−</button>
            <label className="flex flex-1 items-baseline justify-center gap-2">
              <span className="sr-only">{c.hoursLabel}</span>
              <input type="number" inputMode="numeric" min={hourly.minHours} max={hourly.maxHours} value={hours}
                onChange={(e) => setHours(Number(e.target.value) || 0)} onBlur={() => setH(hours)}
                className="w-24 bg-transparent text-center font-display text-5xl text-cloud outline-none [appearance:textfield] focus-visible:rounded-lg focus-visible:ring-2 focus-visible:ring-teal [&::-webkit-inner-spin-button]:appearance-none" />
              <span className="text-ink-300">{c.hours}</span>
            </label>
            <button type="button" onClick={() => setH(hours + 1)} disabled={hours >= hourly.maxHours} aria-label={c.more}
              className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/15 text-2xl text-cloud transition hover:border-teal hover:text-teal disabled:opacity-30">+</button>
          </div>
          <input type="range" min={hourly.minHours} max={sliderMax} value={Math.min(hours, sliderMax)} onChange={(e) => setH(Number(e.target.value))}
            aria-label={c.hoursLabel} className="mt-6 w-full accent-[#69C9CA]" />
          <div className="mt-5 flex flex-wrap gap-2">
            {hourly.quickPicks.map((h) => (
              <button key={h} type="button" aria-pressed={hours === h} onClick={() => setH(h)} className={`chip ${hours === h ? "chip-on" : ""}`}>{fmt(c.hoursN, { n: h })}</button>
            ))}
          </div>
        </section>

        {/* 3. Delivery */}
        <section className="rounded-panel border border-white/10 bg-ink-800/50 p-6 sm:p-8" aria-labelledby="calc-delivery">
          <StepLabel n={3} id="calc-delivery">{c.delivery}</StepLabel>
          <div className="mt-5 grid gap-3 sm:grid-cols-2" role="radiogroup" aria-labelledby="calc-delivery">
            {[{ v: false, t: c.standard, d: c.standardD }, { v: true, t: c.rush, d: `${c.rushD} · +${Math.round(hourly.rushSurcharge * 100)}%` }].map((o) => (
              <button key={o.t} type="button" role="radio" aria-checked={rush === o.v} onClick={() => setRush(o.v)}
                className={`rounded-2xl border p-5 text-left transition ${rush === o.v ? "border-teal bg-teal/10" : "border-white/10 hover:border-teal/50"}`}>
                <span className="block font-semibold text-cloud">{o.t}</span>
                <span className="mt-1 block text-sm text-ink-300">{o.d}</span>
              </button>
            ))}
          </div>
        </section>
      </div>

      {/* Summary */}
      <aside className="lg:sticky lg:top-28" aria-label={c.estimateAria}>
        <div className="rounded-panel border border-teal/25 bg-ink-900 p-6 sm:p-8">
          <p className="text-xs font-semibold tracking-[0.2em] text-teal">{t.calcPreview.estimate}</p>
          <p className="mt-3 text-ink-300">{hourly.service} · <span className="text-cloud">{money(hourly.rate)}</span> {t.calcPreview.perHour}</p>
          <dl className="mt-6 space-y-2 border-t border-white/10 pt-5 text-[15px]">
            <div className="flex justify-between"><dt className="text-ink-300">{fmt(c.hoursN, { n: p.hours })} × {money(p.rate)}</dt><dd className="text-cloud">{money(p.subtotal)}</dd></div>
            {rush && <div className="flex justify-between"><dt className="text-ink-300">{c.rushDelivery} (+{Math.round(hourly.rushSurcharge * 100)}%)</dt><dd className="text-cloud">+{money(p.rushCost)}</dd></div>}
          </dl>
          <div className="mt-5 flex items-end justify-between border-t border-white/10 pt-5">
            <span className="text-sm text-ink-300">{t.calcPreview.total}</span>
            <span className="font-display text-4xl text-teal" aria-live="polite">{money(p.total)}</span>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-ink-400">{c.disclaimer}</p>
          {!requesting && <button type="button" onClick={() => setRequesting(true)} className="btn btn-primary mt-6 w-full">{c.requestProject} <span className="btn-arrow" aria-hidden="true">→</span></button>}
        </div>
        <p className="mt-5 rounded-2xl border border-white/10 p-5 text-sm leading-relaxed text-ink-300">
          {c.other}{" "}
          <Link href="/brief" className="font-semibold text-teal underline underline-offset-4">{c.requestQuote}</Link>
        </p>
      </aside>

      {requesting && <div className="lg:col-span-2"><RequestForm hours={p.hours} rush={rush} total={p.total} kinds={kinds} /></div>}

      {/* Mobile: price always visible */}
      {!requesting && (
        <div className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-ink/95 px-5 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 backdrop-blur lg:hidden">
          <div className="flex items-center justify-between gap-4">
            <div><p className="text-xs text-ink-300">{fmt(c.hoursN, { n: p.hours })}{rush ? ` · ${c.rush.toLowerCase()}` : ""}</p><p className="font-display text-2xl text-teal">{money(p.total)}</p></div>
            <button type="button" onClick={() => setRequesting(true)} className="btn btn-primary !px-5 !py-3">{c.request} <span className="btn-arrow" aria-hidden="true">→</span></button>
          </div>
        </div>
      )}
    </div>
  );
}

function StepLabel({ n, id, children }: { n: number; id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="flex items-center gap-3 font-sans text-lg font-semibold normal-case tracking-normal text-cloud">
      <span className="grid h-8 w-8 place-items-center rounded-full bg-teal font-display text-sm text-ink" aria-hidden="true">{n}</span>{children}
    </h2>
  );
}

function RequestForm({ hours, rush, total, kinds }: { hours: number; rush: boolean; total: number; kinds: string[] }) {
  const { t } = useI18n();
  const c = t.calc;
  const f = t.forms;
  const { countries } = useFormOptions();
  const { submit, status, message, errors, reset } = useSubmit("/api/quote");
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { ref.current?.scrollIntoView({ behavior: "smooth", block: "start" }); }, []);
  if (status === "success") return <div ref={ref}><SuccessPanel title={f.booking.sentTitle} onReset={reset}>{fmt(c.sentText, { total: money(total) })}</SuccessPanel></div>;
  return (
    <div ref={ref} className="scroll-mt-28 rounded-panel border border-white/10 bg-ink-900/70 p-6 sm:p-8">
      <h3 className="text-2xl text-cloud">{c.requestProject}</h3>
      <p className="mt-2 text-ink-300">{fmt(c.summary, { n: hours, rush: rush ? c.summaryRush : "", total: money(total) })}</p>
      <form noValidate className="relative mt-6 grid gap-5 sm:grid-cols-2"
        onSubmit={(e) => {
          e.preventDefault();
          const data = formToObject(e.currentTarget) as Record<string, unknown>;
          const desc = [kinds.length ? `Type: ${kinds.join(", ")}` : "", String(data.description ?? "")].filter(Boolean).join("\n");
          submit({ ...data, description: desc, hours, rush });
        }}>
        <Honeypot />
        <TextField name="fullName" label={f.fullName} required autoComplete="name" error={errors.fullName} />
        <TextField name="email" type="email" label={f.email} required autoComplete="email" error={errors.email} />
        <TextField name="businessName" label={f.businessName} autoComplete="organization" error={errors.businessName} />
        <SelectField name="country" label={f.country} required options={countries} error={errors.country} />
        <TextArea name="description" label={c.whatDesign} className="sm:col-span-2" rows={3} error={errors.description} />
        <TextArea name="notes" label={c.anythingElse} className="sm:col-span-2" rows={3} error={errors.notes} />
        <div className="sm:col-span-2"><Consent error={errors.consent} /></div>
        <div className="sm:col-span-2"><FormError message={status === "error" ? message : ""} /></div>
        <div className="sm:col-span-2"><button type="submit" disabled={status === "loading"} className="btn btn-primary disabled:opacity-60">{status === "loading" ? f.sending : c.sendRequest}<span className="btn-arrow" aria-hidden="true">→</span></button></div>
      </form>
    </div>
  );
}
