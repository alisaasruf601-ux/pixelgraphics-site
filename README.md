# Pixel Graphics — website

Premium dark-mode website for **Pixel Graphics** — *Creative Without Borders. Design. Market. Grow Your Brand.*

Built with Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 3 and Framer Motion.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production
```

## What to edit (no coding knowledge needed for these files)

| What | File |
|---|---|
| Email, WhatsApp, booking link, social media | `src/config/site.ts` |
| **All prices**: monthly packages and the hourly rate for graphic design (calculator) | `src/config/pricing.ts` |
| Service departments and their service lists | `src/config/services.ts` |
| Email notifications & analytics IDs | `.env.local` (copy from `.env.example`) |

- Empty contact/social values are **hidden** on the site (never shown as fake links). In development a small
  “Setup” panel (bottom-left) lists what is still missing.
- Every price on the site — homepage, Pricing page, fixed-price list, calculator, and the server-side estimate
  in emails — is read from `src/config/pricing.ts`. **All current prices and package contents are placeholders for review.**

## Pages

`/` Home · `/about` · `/services` (8 departments, anchors like `/services#branding`) · `/pricing` ·
`/calculator` (multi-step price calculator, `?department=` preselects) · `/process` · `/contact` (`?package=growth`,
`?service=…`, `?topic=consultation` prefill) · `/book` (meeting request) · `/brief` (project brief / custom quote) ·
`/privacy`, `/terms`, `/service-agreement` (draft templates) · `sitemap.xml`, `robots.txt`.

## Forms & submissions

Contact, booking, project brief, calculator request and newsletter all post to `/api/*` routes that:
validate input on the server (zod), block spam (honeypot + per-IP rate limit), and re-calculate calculator prices
from the config (browser prices are never trusted).

- With `RESEND_API_KEY`, `NOTIFY_TO_EMAIL`, `NOTIFY_FROM_EMAIL` set → each submission is emailed to you.
- Without them → submissions are saved to `.data/submissions.jsonl` (development / review). **Configure email before launch** —
  on most hosts (e.g. Vercel) the file system is not persistent.

## Booking

Set `bookingUrl` in `src/config/site.ts` to a Calendly / Cal.com / Google booking link and every “Book a Meeting” button
goes there. Left empty, visitors use the built-in request form at `/book`.

## Analytics

`NEXT_PUBLIC_GA_ID` and `NEXT_PUBLIC_META_PIXEL_ID` load Google Analytics / Meta Pixel **only after a visitor accepts
cookies** (GDPR). With no IDs set, no cookie banner is shown.

## Before launch — checklist

- [ ] Replace the redrawn logo with the original files (see `public/brand/README.md`)
- [ ] Add licensed photography (see `docs/IMAGE-BRIEF.md`)
- [ ] Confirm all prices, package contents, revisions and terms in `src/config/pricing.ts`
- [ ] Fill in email, WhatsApp, social links (and optionally `bookingUrl`) in `src/config/site.ts`
- [ ] Configure email notifications (`.env.local`)
- [ ] Have the legal pages reviewed and completed
- [ ] Review draft copy on the About page (story, mission, vision)
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the live domain

See `DESIGN.md` for the design system and `docs/ARCHITECTURE.md` for later phases.
