import "server-only";
import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import type { z } from "zod";
import { flattenErrors } from "./schemas";

/* ---- Simple in-memory rate limit (per IP, per route). Use a shared store (e.g. Redis) on multi-instance hosting. ---- */
const hits = new Map<string, number[]>();
function rateLimited(key: string, limit = 5, windowMs = 10 * 60_000) {
  const now = Date.now();
  const arr = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  arr.push(now); hits.set(key, arr);
  return arr.length > limit;
}

const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/**
 * Delivers a submission. With RESEND_API_KEY + NOTIFY_TO_EMAIL set it emails the studio
 * (automated notification). Otherwise it stores the submission in .data/submissions.jsonl
 * so nothing is lost during development / content review.
 */
async function deliver(kind: string, data: Record<string, unknown>, summary: string[]) {
  const record = { kind, receivedAt: new Date().toISOString(), data };
  const { RESEND_API_KEY, NOTIFY_TO_EMAIL, NOTIFY_FROM_EMAIL } = process.env;
  if (RESEND_API_KEY && NOTIFY_TO_EMAIL && NOTIFY_FROM_EMAIL) {
    const html = `<h2>New ${escapeHtml(kind)}</h2>` + summary.map((l) => `<p>${escapeHtml(l)}</p>`).join("");
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from: NOTIFY_FROM_EMAIL, to: NOTIFY_TO_EMAIL, reply_to: String(data.email ?? ""), subject: `Pixel Graphics — new ${kind}`, html }),
    });
    if (!res.ok) throw new Error(`Email provider error ${res.status}`);
    return;
  }
  const dir = path.join(process.cwd(), ".data");
  await fs.mkdir(dir, { recursive: true });
  await fs.appendFile(path.join(dir, "submissions.jsonl"), JSON.stringify(record) + "\n", "utf8");
}

export async function handleSubmission<T extends z.ZodTypeAny>(
  req: Request, kind: string, schema: T, summarize: (d: z.infer<T>) => string[],
) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(`${kind}:${ip}`)) {
    return NextResponse.json({ ok: false, message: "Too many submissions. Please try again in a few minutes." }, { status: 429 });
  }
  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 }); }
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    const errors = flattenErrors(parsed.error);
    // A filled honeypot means a bot: pretend success, store nothing.
    if (errors.website) return NextResponse.json({ ok: true });
    return NextResponse.json({ ok: false, message: "Please check the highlighted fields.", errors }, { status: 422 });
  }
  const { website: _hp, ...data } = parsed.data as Record<string, unknown>;
  try {
    await deliver(kind, data, summarize(parsed.data));
  } catch (e) {
    console.error(`[${kind}] delivery failed`, e);
    return NextResponse.json({ ok: false, message: "We couldn't send your message right now. Please try again later." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
