"use client";
import { useSearchParams } from "next/navigation";
import { departments } from "@/config/services";
import { packages } from "@/config/pricing";
import { TextField, TextArea, SelectField, ChoiceGroup, Consent, Honeypot, FormError, SuccessPanel, useSubmit, formToObject, countries, budgets } from "./forms";

export function ContactForm() {
  const params = useSearchParams();
  const pkg = packages.find((p) => p.id === params.get("package"));
  const topic = params.get("topic");
  const preService = params.get("service") ?? "";
  const serviceOptions = [...departments.map((d) => d.shortTitle), ...packages.map((p) => `${p.name} monthly package`), "Free consultation", "Not sure yet"];
  const defaultService = pkg ? `${pkg.name} monthly package` : topic === "consultation" ? "Free consultation" : serviceOptions.includes(preService) ? preService : "";
  const { submit, status, message, errors, reset } = useSubmit("/api/contact");

  if (status === "success") return <SuccessPanel title="Message sent" onReset={reset}>Thank you for reaching out. We’ll reply within 1–2 working days via your preferred communication method.</SuccessPanel>;

  return (
    <form noValidate className="relative grid gap-5 sm:grid-cols-2" onSubmit={(e) => { e.preventDefault(); submit(formToObject(e.currentTarget)); }}>
      <Honeypot />
      <TextField name="fullName" label="Full name" required autoComplete="name" error={errors.fullName} />
      <TextField name="businessName" label="Business name" autoComplete="organization" error={errors.businessName} />
      <TextField name="email" type="email" label="Email" required autoComplete="email" error={errors.email} />
      <SelectField name="country" label="Country" required options={countries} error={errors.country} />
      <SelectFieldWithDefault name="service" label="Service required" required options={serviceOptions} defaultValue={defaultService} error={errors.service} />
      <SelectField name="budget" label="Estimated budget" options={budgets} error={errors.budget} />
      <TextArea name="description" label="Project description" required className="sm:col-span-2" rows={6} placeholder="What do you need, for which goal, and by when?" error={errors.description} />
      <div className="sm:col-span-2"><ChoiceGroup name="preferredContact" label="Preferred communication method" required options={["Email", "WhatsApp", "Online meeting"]} defaultValue="Email" error={errors.preferredContact} /></div>
      <TextField name="phone" type="tel" label="Phone / WhatsApp number" autoComplete="tel" hint="Only needed if you prefer WhatsApp or a call." className="sm:col-span-2" error={errors.phone} />
      <div className="sm:col-span-2"><Consent error={errors.consent} /></div>
      <div className="sm:col-span-2"><FormError message={status === "error" ? message : ""} /></div>
      <div className="sm:col-span-2"><button type="submit" disabled={status === "loading"} className="btn btn-primary w-full disabled:opacity-60 sm:w-auto">{status === "loading" ? "Sending…" : "Send message"}<span className="btn-arrow" aria-hidden="true">→</span></button></div>
    </form>
  );
}

function SelectFieldWithDefault(props: React.ComponentProps<typeof SelectField> & { defaultValue: string }) {
  // key forces the uncontrolled select to pick up a default from the URL
  return <SelectField key={props.defaultValue} {...props} />;
}
