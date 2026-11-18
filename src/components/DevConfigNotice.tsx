import { missingConfig } from "@/config/site";
/** Development-only reminder of settings that still need real values. Never rendered in production. */
export function DevConfigNotice() {
  if (process.env.NODE_ENV === "production") return null;
  const m = missingConfig();
  if (!m.length) return null;
  return (
    <details className="fixed bottom-4 left-4 z-[65] max-w-xs rounded-xl border border-amber-300/40 bg-ink-900/95 p-3 text-xs text-amber-100 shadow-lift">
      <summary className="cursor-pointer font-semibold">⚙ Setup: {m.length} item(s) to configure</summary>
      <ul className="mt-2 list-disc space-y-1 pl-4">{m.map((x) => <li key={x}>{x}</li>)}</ul>
      <p className="mt-2 text-amber-200/70">Shown in development only.</p>
    </details>
  );
}
