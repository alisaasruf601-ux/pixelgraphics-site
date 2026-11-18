"use client";
import { useState } from "react";
import { useSubmit } from "./forms";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const { submit, status, message, errors } = useSubmit("/api/newsletter");
  return (
    <form noValidate onSubmit={(e) => { e.preventDefault(); submit({ email, website: "" }).then((ok) => ok && setEmail("")); }}>
      <label htmlFor="nl-email" className="sr-only">Email address</label>
      <div className="flex rounded-full bg-ink-800 p-1.5 ring-1 ring-white/10 focus-within:ring-teal">
        <input id="nl-email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address" aria-invalid={Boolean(errors.email)} aria-describedby="nl-status"
          className="min-w-0 flex-1 bg-transparent px-4 text-[15px] text-cloud placeholder:text-ink-400 focus:outline-none" />
        <button type="submit" disabled={status === "loading"} aria-label="Subscribe"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-teal font-bold text-ink transition hover:bg-teal-300 disabled:opacity-60">
          {status === "loading" ? "…" : "→"}</button>
      </div>
      <p id="nl-status" role="status" className={`mt-2 min-h-[1.25rem] text-sm ${status === "error" ? "text-red-300" : "text-teal"}`}>
        {status === "success" ? "Thanks, you're subscribed." : errors.email || (status === "error" ? message : "")}
      </p>
    </form>
  );
}
