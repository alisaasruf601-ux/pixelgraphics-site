"use client";
import { useRef, useState } from "react";
import type { Department } from "@/config/services";
import { useLive } from "./LiveContent";
import { useI18n } from "@/i18n/I18nProvider";
import { TextField, TextArea, SelectField, Consent, Honeypot, FormError, SuccessPanel, useSubmit, formToObject, useFormOptions } from "./forms";

const SECTION_COUNT = 4;
// fields per section, used to jump to the first section with an error
const fieldSection: Record<string, number> = { fullName: 0, email: 0, businessName: 0, country: 0, industry: 1, about: 1, goals: 1, audience: 1, services: 2, deliverables: 2, style: 2, references: 2, deadline: 3, budget: 3, consent: 3 };

/** Project brief generator: a guided, four-part brief that arrives as one structured document. */
export function BriefForm() {
  const { t } = useI18n();
  const f = t.forms;
  const b = f.brief;
  const sections = b.sections;
  const departments = useLive().services.departments as Department[];
  const { countries, budgets } = useFormOptions();
  const { submit, status, message, errors, reset } = useSubmit("/api/brief");
  const [part, setPart] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);
  if (status === "success") return <SuccessPanel title={b.sentTitle} onReset={() => { reset(); setPart(0); }}>{b.sentText}</SuccessPanel>;

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (part < SECTION_COUNT - 1) { setPart(part + 1); formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
    const ok = await submit(formToObject(e.currentTarget, ["services"]));
    if (!ok) {
      // jump back to the first section that has an error (read after state update)
      setTimeout(() => {
        const first = Array.from(formRef.current?.querySelectorAll("[aria-invalid=true], [id$='-err']") ?? [])[0] as HTMLElement | undefined;
        const name = first?.getAttribute("name") || first?.id.replace(/-err$/, "");
        if (name && fieldSection[name] !== undefined) setPart(fieldSection[name]);
      }, 50);
    }
  };

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} className="relative scroll-mt-28">
      <Honeypot />
      <ol className="mb-8 grid grid-cols-4 gap-2" aria-label={b.sectionsAria}>
        {sections.map((s, i) => (
          <li key={s}><button type="button" onClick={() => setPart(i)} aria-current={i === part ? "step" : undefined}
            className={`w-full border-t-[3px] pt-2 text-left text-[11px] font-semibold uppercase tracking-[0.12em] sm:text-xs ${i === part ? "border-teal text-cloud" : i < part ? "border-deep text-ink-300" : "border-white/10 text-ink-400"}`}>{s}</button></li>
        ))}
      </ol>
      {/* All parts stay mounted (hidden) so values are kept and submitted together */}
      <div className={part === 0 ? "grid gap-5 sm:grid-cols-2" : "hidden"}>
        <TextField name="fullName" label={f.fullName} required autoComplete="name" error={errors.fullName} />
        <TextField name="email" type="email" label={f.email} required autoComplete="email" error={errors.email} />
        <TextField name="businessName" label={f.businessName} required autoComplete="organization" error={errors.businessName} />
        <SelectField name="country" label={f.country} required options={countries} error={errors.country} />
      </div>
      <div className={part === 1 ? "grid gap-5" : "hidden"}>
        <TextField name="industry" label={b.industry} placeholder={b.industryPh} error={errors.industry} />
        <TextArea name="about" label={b.about} required rows={4} error={errors.about} />
        <TextArea name="goals" label={b.goals} required rows={4} error={errors.goals} />
        <TextArea name="audience" label={b.audience} rows={3} error={errors.audience} />
      </div>
      <div className={part === 2 ? "grid gap-5" : "hidden"}>
        <fieldset aria-describedby={errors.services ? "services-err" : undefined}>
          <legend className="field-label">{b.services} <span className="text-teal" aria-hidden="true">*</span></legend>
          <div className="grid gap-2 sm:grid-cols-2">
            {departments.map((d) => (
              <label key={d.slug} className="relative">
                <input type="checkbox" name="services" value={d.shortTitle} className="peer sr-only" />
                <span className="chip w-full justify-start rounded-xl peer-checked:border-teal peer-checked:bg-teal peer-checked:text-ink peer-focus-visible:ring-2 peer-focus-visible:ring-teal">{d.shortTitle}</span>
              </label>
            ))}
          </div>
          {errors.services && <p id="services-err" className="mt-1.5 text-sm text-red-300">⚠ {errors.services}</p>}
        </fieldset>
        <TextArea name="deliverables" label={b.deliverables} rows={3} placeholder={b.deliverablesPh} error={errors.deliverables} />
        <TextArea name="style" label={b.style} rows={3} placeholder={b.stylePh} error={errors.style} />
        <TextArea name="references" label={b.references} rows={2} error={errors.references} />
      </div>
      <div className={part === 3 ? "grid gap-5 sm:grid-cols-2" : "hidden"}>
        <TextField name="deadline" type="date" label={b.deadline} error={errors.deadline} />
        <SelectField name="budget" label={f.budget} options={budgets} error={errors.budget} />
        <div className="sm:col-span-2"><Consent error={errors.consent} /></div>
      </div>
      <div className="mt-6"><FormError message={status === "error" ? message : ""} /></div>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6">
        {part > 0 ? <button type="button" onClick={() => setPart(part - 1)} className="btn btn-outline">← {f.back}</button> : <span />}
        <button type="submit" disabled={status === "loading"} className="btn btn-primary disabled:opacity-60">
          {part < SECTION_COUNT - 1 ? f.next : status === "loading" ? f.sending : b.submit}<span className="btn-arrow" aria-hidden="true">→</span>
        </button>
      </div>
    </form>
  );
}
