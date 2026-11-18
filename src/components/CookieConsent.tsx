"use client";
import Script from "next/script";
import Link from "next/link";
import { useEffect, useState } from "react";

const KEY = "pg-cookie-consent";
const GA = process.env.NEXT_PUBLIC_GA_ID;
const PIXEL = process.env.NEXT_PUBLIC_META_PIXEL_ID;

/** Analytics (Google Analytics, Meta Pixel) load only after explicit consent, and only when IDs are configured. */
export function CookieConsent() {
  const [choice, setChoice] = useState<"accepted" | "declined" | null | undefined>(undefined);
  useEffect(() => { try { setChoice((localStorage.getItem(KEY) as "accepted" | "declined" | null) ?? null); } catch { setChoice(null); } }, []);
  const decide = (c: "accepted" | "declined") => { try { localStorage.setItem(KEY, c); } catch {} setChoice(c); };
  if (!GA && !PIXEL) return null; // nothing to consent to
  return (
    <>
      {choice === "accepted" && GA && (<>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA}`} strategy="afterInteractive" />
        <Script id="ga" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA}',{anonymize_ip:true});`}</Script>
      </>)}
      {choice === "accepted" && PIXEL && (
        <Script id="meta-pixel" strategy="afterInteractive">{`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL}');fbq('track','PageView');`}</Script>
      )}
      {choice === null && (
        <div role="dialog" aria-label="Cookie preferences" className="fixed inset-x-4 bottom-4 z-[70] mx-auto max-w-xl rounded-card border border-white/10 bg-ink-800/95 p-5 shadow-lift backdrop-blur-xl sm:p-6">
          <p className="text-sm leading-relaxed text-ink-200">We use analytics cookies to understand how visitors use this site, only if you allow it. See our <Link href="/privacy" className="text-teal underline">privacy policy</Link>.</p>
          <div className="mt-4 flex gap-3">
            <button type="button" className="btn btn-primary !py-2.5" onClick={() => decide("accepted")}>Accept</button>
            <button type="button" className="btn btn-outline !py-2.5" onClick={() => decide("declined")}>Decline</button>
          </div>
        </div>
      )}
    </>
  );
}
