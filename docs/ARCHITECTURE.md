# Architecture & roadmap

## Release 1 (built)
- Marketing pages, design system, responsive navigation
- Project Price Calculator (config-driven, server re-pricing)
- Contact form, meeting booking request (or external booking link), project brief generator, newsletter
- Email notifications (Resend) with local fallback, spam protection, GDPR cookie consent for GA / Meta Pixel
- WhatsApp click-to-chat (when configured), SEO metadata, sitemap, robots, JSON-LD

## Code map
```
src/config/        site.ts · services.ts · pricing.ts   ← business content & prices
src/lib/           calc.ts (pricing engine) · schemas.ts (validation) · server.ts (delivery, rate limit)
src/app/api/*      contact · booking · brief · quote · newsletter
src/components/    Header, Footer, Calculator, forms, sections, visuals
```

## Later phases (prepared, not built)
| Feature | Suggested approach | Hooks already in place |
|---|---|---|
| Online booking with live availability | Cal.com or Calendly embed | `site.bookingUrl` switches all buttons |
| Digital proposals | Generate from a brief/quote submission (PDF or web page per client) | Brief + quote payloads are structured JSON |
| Electronic contract signing | DocuSign / Dropbox Sign / Signwell API after proposal acceptance | — |
| Client workspace (login) | Auth (e.g. Clerk/Auth.js) + database (Postgres) | Submissions already typed via zod schemas |
| File sharing | Object storage (S3/R2) with signed URLs inside the workspace | — |
| Project progress tracking | Project + milestone tables mirroring the 9 process steps (`/process`) | Steps defined on Process page |
| Feedback & design approvals | Comment threads per deliverable + “approve” action | Process steps 7–8 |
| Newsletter platform | Connect `/api/newsletter` to Mailchimp/Brevo/Resend Audiences | Single route to swap |

When moving to multi-server hosting, replace the in-memory rate limiter in `src/lib/server.ts` with a shared store.
