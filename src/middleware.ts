import { NextResponse, type NextRequest } from "next/server";
import { locales, defaultLocale, isLocale } from "@/i18n/config";

/**
 * LANGUAGE ROUTING
 *  /about       → English (served from /en/about internally)
 *  /nl/about    → Dutch, /pt/... Portuguese, /es/... Spanish, /de/... German
 *  /en/about    → redirects to /about (English has no prefix)
 * A first visit to the homepage is sent to the visitor's browser language (once; the
 * language menu remembers the choice in the NEXT_LOCALE cookie).
 */
export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const first = pathname.split("/")[1];

  if (first === defaultLocale) {
    const url = req.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }
  if (isLocale(first)) return NextResponse.next();

  if (pathname === "/" && !req.cookies.get("NEXT_LOCALE") && !/bot|crawl|spider|slurp|preview/i.test(req.headers.get("user-agent") || "")) {
    const preferred = preferredLocale(req.headers.get("accept-language") || "");
    if (preferred && preferred !== defaultLocale) {
      const res = NextResponse.redirect(new URL(`/${preferred}${search}`, req.url), 307);
      res.cookies.set("NEXT_LOCALE", preferred, { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
      return res;
    }
  }
  const url = req.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

function preferredLocale(header: string) {
  const langs = header.split(",").map((p) => {
    const [tag, q] = p.trim().split(";q=");
    return { code: tag.slice(0, 2).toLowerCase(), q: q ? Number(q) : 1 };
  }).sort((a, b) => b.q - a.q);
  return langs.map((l) => l.code).find((c) => (locales as readonly string[]).includes(c));
}

export const config = {
  // Everything except API routes, the /admin editor, Next internals and files with an extension.
  matcher: ["/((?!api|admin|_next|uploads|brand|video|showcase|favicon|icon|robots|sitemap|.*\\..*).*)"],
};
