"use client";
import { useEffect, useState } from "react";
import { TextField, TextArea, SelectField, ChoiceGroup, Consent, Honeypot, FormError, SuccessPanel, useSubmit, formToObject, useFormOptions } from "./forms";
import { useI18n } from "@/i18n/I18nProvider";

const topicValues = ["Free consultation", "New project", "Monthly package", "Hourly calculator estimate", "Other"] as const;
const times = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"] as const;

export function BookingForm() {
  const { t } = useI18n();
  const f = t.forms;
  const { countries } = useFormOptions();
  const topics = topicValues.map((value, i) => ({ value, label: f.booking.topics[i] }));
  const { submit, status, message, errors, reset } = useSubmit("/api/booking");
  const [tz, setTz] = useState("");
  const [minDate, setMinDate] = useState("");
  useEffect(() => {
    try { setTz(Intl.DateTimeFormat().resolvedOptions().timeZone); } catch {}
    const d = new Date(); d.setDate(d.getDate() + 1); setMinDate(d.toISOString().slice(0, 10));
  }, []);
  if (status === "success") return <SuccessPanel title={f.booking.sentTitle} onReset={reset}>{f.booking.sentText}</SuccessPanel>;
  return (
    <form noValidate className="relative grid gap-5 sm:grid-cols-2" onSubmit={(e) => { e.preventDefault(); submit(formToObject(e.currentTarget)); }}>
      <Honeypot />
      <TextField name="fullName" label={f.fullName} required autoComplete="name" error={errors.fullName} />
      <TextField name="email" type="email" label={f.email} required autoComplete="email" error={errors.email} />
      <TextField name="businessName" label={f.businessName} autoComplete="organization" error={errors.businessName} />
      <SelectField name="country" label={f.country} required options={countries} error={errors.country} />
      <div className="sm:col-span-2"><ChoiceGroup name="topic" label={f.booking.topic} required options={topics} defaultValue="Free consultation" error={errors.topic} /></div>
      <div className="sm:col-span-2"><ChoiceGroup name="platform" label={f.booking.platform} required options={["Google Meet", "Zoom", "Microsoft Teams", { value: "WhatsApp call", label: f.booking.whatsappCall }]} defaultValue="Google Meet" error={errors.platform} /></div>
      <TextField name="date1" type="date" label={f.booking.date1} required min={minDate} error={errors.date1} />
      <SelectField name="time1" label={f.booking.time1} required options={times} error={errors.time1} />
      <TextField name="date2" type="date" label={f.booking.date2} min={minDate} error={errors.date2} />
      <SelectField name="time2" label={f.booking.time2} options={times} error={errors.time2} />
      <TextField key={tz} name="timezone" label={f.booking.tz} required defaultValue={tz} hint={f.booking.tzHint} className="sm:col-span-2" error={errors.timezone} />
      <TextArea name="notes" label={f.booking.notes} rows={4} className="sm:col-span-2" error={errors.notes} />
      <div className="sm:col-span-2"><Consent error={errors.consent} /></div>
      <div className="sm:col-span-2"><FormError message={status === "error" ? message : ""} /></div>
      <div className="sm:col-span-2"><button type="submit" disabled={status === "loading"} className="btn btn-primary disabled:opacity-60">{status === "loading" ? f.sending : f.booking.submit}<span className="btn-arrow" aria-hidden="true">→</span></button></div>
    </form>
  );
}
