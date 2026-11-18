"use client";
import { useEffect, useState } from "react";
import { TextField, TextArea, SelectField, ChoiceGroup, Consent, Honeypot, FormError, SuccessPanel, useSubmit, formToObject, countries } from "./forms";

const topics = ["Free consultation", "New project", "Monthly package", "Hourly calculator estimate", "Other"] as const;
const times = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"] as const;

export function BookingForm() {
  const { submit, status, message, errors, reset } = useSubmit("/api/booking");
  const [tz, setTz] = useState("");
  const [minDate, setMinDate] = useState("");
  useEffect(() => {
    try { setTz(Intl.DateTimeFormat().resolvedOptions().timeZone); } catch {}
    const d = new Date(); d.setDate(d.getDate() + 1); setMinDate(d.toISOString().slice(0, 10));
  }, []);
  if (status === "success") return <SuccessPanel title="Request received" onReset={reset}>Thanks! We’ll confirm one of your preferred times by email, together with the meeting link.</SuccessPanel>;
  return (
    <form noValidate className="relative grid gap-5 sm:grid-cols-2" onSubmit={(e) => { e.preventDefault(); submit(formToObject(e.currentTarget)); }}>
      <Honeypot />
      <TextField name="fullName" label="Full name" required autoComplete="name" error={errors.fullName} />
      <TextField name="email" type="email" label="Email" required autoComplete="email" error={errors.email} />
      <TextField name="businessName" label="Business name" autoComplete="organization" error={errors.businessName} />
      <SelectField name="country" label="Country" required options={countries} error={errors.country} />
      <div className="sm:col-span-2"><ChoiceGroup name="topic" label="What would you like to discuss?" required options={topics} defaultValue="Free consultation" error={errors.topic} /></div>
      <div className="sm:col-span-2"><ChoiceGroup name="platform" label="Meeting platform" required options={["Google Meet", "Zoom", "Microsoft Teams", "WhatsApp call"]} defaultValue="Google Meet" error={errors.platform} /></div>
      <TextField name="date1" type="date" label="Preferred date" required min={minDate} error={errors.date1} />
      <SelectField name="time1" label="Preferred time" required options={times} error={errors.time1} />
      <TextField name="date2" type="date" label="Alternative date" min={minDate} error={errors.date2} />
      <SelectField name="time2" label="Alternative time" options={times} error={errors.time2} />
      <TextField key={tz} name="timezone" label="Your time zone" required defaultValue={tz} hint="Detected automatically. Change it if needed." className="sm:col-span-2" error={errors.timezone} />
      <TextArea name="notes" label="Anything we should prepare?" rows={4} className="sm:col-span-2" error={errors.notes} />
      <div className="sm:col-span-2"><Consent error={errors.consent} /></div>
      <div className="sm:col-span-2"><FormError message={status === "error" ? message : ""} /></div>
      <div className="sm:col-span-2"><button type="submit" disabled={status === "loading"} className="btn btn-primary disabled:opacity-60">{status === "loading" ? "Sending…" : "Request meeting"}<span className="btn-arrow" aria-hidden="true">→</span></button></div>
    </form>
  );
}
