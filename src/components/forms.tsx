"use client";
import Link from "next/link";
import { useCallback, useState, type ReactNode } from "react";

type Status = "idle" | "loading" | "success" | "error";
export function useSubmit(endpoint: string) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const submit = useCallback(async (payload: unknown) => {
    setStatus("loading"); setErrors({}); setMessage("");
    try {
      const res = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) { setStatus("success"); return true; }
      setErrors(json.errors ?? {}); setMessage(json.message || "Something went wrong. Please try again."); setStatus("error");
      return false;
    } catch {
      setMessage("Network error — check your connection and try again."); setStatus("error"); return false;
    }
  }, [endpoint]);
  const reset = () => { setStatus("idle"); setErrors({}); setMessage(""); };
  return { submit, status, message, errors, reset };
}

/** Read a <form> into a plain object. Checkbox groups with the same name become arrays. */
export function formToObject(form: HTMLFormElement, arrays: string[] = []) {
  const fd = new FormData(form);
  const out: Record<string, unknown> = {};
  for (const name of arrays) out[name] = fd.getAll(name).map(String);
  fd.forEach((v, k) => { if (!arrays.includes(k)) out[k] = String(v); });
  form.querySelectorAll<HTMLInputElement>('input[type="checkbox"][data-bool]').forEach((c) => (out[c.name] = c.checked));
  return out;
}

interface FieldProps { name: string; label: string; error?: string; required?: boolean; hint?: string; className?: string }

export function TextField({ name, label, error, required, hint, className = "", type = "text", ...rest }:
  FieldProps & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={className}>
      <label htmlFor={name} className="field-label">{label}{required && <span className="text-teal" aria-hidden="true"> *</span>}</label>
      <input id={name} name={name} type={type} required={required} aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-err` : hint ? `${name}-hint` : undefined} className={`field ${error ? "field-error" : ""}`} {...rest} />
      <FieldMsg name={name} error={error} hint={hint} />
    </div>
  );
}

export function TextArea({ name, label, error, required, hint, className = "", rows = 5, ...rest }:
  FieldProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className={className}>
      <label htmlFor={name} className="field-label">{label}{required && <span className="text-teal" aria-hidden="true"> *</span>}</label>
      <textarea id={name} name={name} rows={rows} required={required} aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-err` : hint ? `${name}-hint` : undefined} className={`field resize-y ${error ? "field-error" : ""}`} {...rest} />
      <FieldMsg name={name} error={error} hint={hint} />
    </div>
  );
}

export function SelectField({ name, label, error, required, hint, className = "", options, placeholder = "Select…", ...rest }:
  FieldProps & { options: readonly string[]; placeholder?: string } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className={className}>
      <label htmlFor={name} className="field-label">{label}{required && <span className="text-teal" aria-hidden="true"> *</span>}</label>
      <select id={name} name={name} required={required} aria-invalid={Boolean(error)} defaultValue=""
        aria-describedby={error ? `${name}-err` : undefined} className={`field appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 20 20%22 fill=%22%2369C9CA%22><path d=%22M5 7l5 6 5-6z%22/></svg>')] bg-[length:18px] bg-[right_14px_center] bg-no-repeat pr-10 ${error ? "field-error" : ""}`} {...rest}>
        <option value="" disabled>{placeholder}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
      <FieldMsg name={name} error={error} hint={hint} />
    </div>
  );
}

/** Pill-style radio or checkbox group (keyboard accessible native inputs). */
export function ChoiceGroup({ name, label, options, type = "radio", error, required, defaultValue }:
  { name: string; label: string; options: readonly string[]; type?: "radio" | "checkbox"; error?: string; required?: boolean; defaultValue?: string }) {
  return (
    <fieldset aria-describedby={error ? `${name}-err` : undefined}>
      <legend className="field-label">{label}{required && <span className="text-teal" aria-hidden="true"> *</span>}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o} className="relative">
            <input type={type} name={name} value={o} defaultChecked={defaultValue === o} className="peer sr-only" />
            <span className="chip peer-checked:border-teal peer-checked:bg-teal peer-checked:text-ink peer-focus-visible:ring-2 peer-focus-visible:ring-teal peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-ink">{o}</span>
          </label>
        ))}
      </div>
      <FieldMsg name={name} error={error} />
    </fieldset>
  );
}

export function Consent({ error }: { error?: string }) {
  return (
    <div>
      <label className="flex cursor-pointer items-start gap-3 text-sm text-ink-200">
        <input type="checkbox" name="consent" data-bool className="mt-0.5 h-5 w-5 shrink-0 accent-[#69C9CA]" aria-invalid={Boolean(error)} aria-describedby={error ? "consent-err" : undefined} />
        <span>I agree that Pixel Graphics processes my details to respond to this request, as described in the <Link href="/privacy" className="text-teal underline underline-offset-2">privacy policy</Link>.</span>
      </label>
      <FieldMsg name="consent" error={error} />
    </div>
  );
}

/** Hidden anti-spam field. */
export function Honeypot() {
  return <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden"><label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label></div>;
}

function FieldMsg({ name, error, hint }: { name: string; error?: string; hint?: string }) {
  if (error) return <p id={`${name}-err`} className="mt-1.5 text-sm text-red-300">⚠ {error}</p>;
  if (hint) return <p id={`${name}-hint`} className="mt-1.5 text-sm text-ink-400">{hint}</p>;
  return null;
}

export function FormError({ message }: { message: string }) {
  if (!message) return null;
  return <div role="alert" className="rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">{message}</div>;
}

export function SuccessPanel({ title, children, onReset }: { title: string; children: ReactNode; onReset?: () => void }) {
  return (
    <div role="status" className="rounded-panel border border-teal/30 bg-teal/[0.07] p-8 text-center sm:p-12">
      <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full bg-teal text-3xl text-ink" aria-hidden="true">✓</div>
      <h2 className="text-3xl text-cloud sm:text-4xl">{title}</h2>
      <div className="mx-auto mt-4 max-w-md text-ink-200">{children}</div>
      {onReset && <button type="button" onClick={onReset} className="btn btn-outline mt-8">Send another</button>}
    </div>
  );
}

export const countries = ["Netherlands", "Suriname", "Brazil", "Belgium", "Germany", "United Kingdom", "United States", "Canada", "Curaçao", "Aruba", "Portugal", "Other"] as const;
export const budgets = ["Under US$250", "US$250 – 500", "US$500 – 1,000", "US$1,000 – 2,500", "US$2,500+", "Not sure yet"] as const;
