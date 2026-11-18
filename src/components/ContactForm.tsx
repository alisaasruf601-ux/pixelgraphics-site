"use client";
import { useSearchParams } from "next/navigation";
import type { Department } from "@/config/services";
import type { Package } from "@/config/pricing";
import { useLive } from "./LiveContent";
import { useI18n } from "@/i18n/I18nProvider";
import { TextField, TextArea, SelectField, ChoiceGroup, Consent, Honeypot, FormError, SuccessPanel, useSubmit, formToObject, useFormOptions } from "./forms";
import { fmt } from "@/i18n/config";

export function ContactForm() {
  const params = useSearchParams();
  const { t } = useI18n();
  const f = t.forms;
  const live = useLive();
  const departments = live.services.departments as Department[];
  const packages = live.pricing.packages as Package[];
  const { countries, budgets } = useFormOptions();
  const pkg = packages.find((p) => p.id === params.get("package"));
  const topic = params.get("topic");
  const preService = params.get("service") ?? "";
  const serviceOptions = [
    ...departments.map((d) => ({ value: d.shortTitle, label: d.shortTitle })),
    ...packages.map((p) => ({ value: `${p.name} monthly package`, label: fmt(f.monthlyPackage, { name: p.name }) })),
    { value: "Free consultation", label: f.freeConsultation }, { value: "Not sure yet", label: f.notSure },
  ];
  const defaultService = pkg ? `${pkg.name} monthly package` : topic === "consultation" ? "Free consultation" : serviceOptions.some((o) => o.value === preService) ? preService : "";
  const { submit, status, message, errors, reset } = useSubmit("/api/contact");

  if (status === "success") return <SuccessPanel title={f.contact.sentTitle} onReset={reset}>{f.contact.sentText}</SuccessPanel>;

  return (
    <form noValidate className="relative grid gap-5 sm:grid-cols-2" onSubmit={(e) => { e.preventDefault(); submit(formToObject(e.currentTarget)); }}>
      <Honeypot />
      <TextField name="fullName" label={f.fullName} required autoComplete="name" error={errors.fullName} />
      <TextField name="businessName" label={f.businessName} autoComplete="organization" error={errors.businessName} />
      <TextField name="email" type="email" label={f.email} required autoComplete="email" error={errors.email} />
      <SelectField name="country" label={f.country} required options={countries} error={errors.country} />
      <SelectFieldWithDefault name="service" label={f.contact.service} required options={serviceOptions} defaultValue={defaultService} error={errors.service} />
      <SelectField name="budget" label={f.budget} options={budgets} error={errors.budget} />
      <TextArea name="description" label={f.contact.description} required className="sm:col-span-2" rows={6} placeholder={f.contact.descriptionPh} error={errors.description} />
      <div className="sm:col-span-2"><ChoiceGroup name="preferredContact" label={f.contact.method} required options={[{ value: "Email", label: f.contact.methods[0] }, { value: "WhatsApp", label: f.contact.methods[1] }, { value: "Online meeting", label: f.contact.methods[2] }]} defaultValue="Email" error={errors.preferredContact} /></div>
      <TextField name="phone" type="tel" label={f.contact.phone} autoComplete="tel" hint={f.contact.phoneHint} className="sm:col-span-2" error={errors.phone} />
      <div className="sm:col-span-2"><Consent error={errors.consent} /></div>
      <div className="sm:col-span-2"><FormError message={status === "error" ? message : ""} /></div>
      <div className="sm:col-span-2"><button type="submit" disabled={status === "loading"} className="btn btn-primary w-full disabled:opacity-60 sm:w-auto">{status === "loading" ? f.sending : f.contact.submit}<span className="btn-arrow" aria-hidden="true">→</span></button></div>
    </form>
  );
}

function SelectFieldWithDefault(props: React.ComponentProps<typeof SelectField> & { defaultValue: string }) {
  // key forces the uncontrolled select to pick up a default from the URL
  return <SelectField key={props.defaultValue} {...props} />;
}
