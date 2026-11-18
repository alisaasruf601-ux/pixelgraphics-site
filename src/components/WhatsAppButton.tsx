"use client";
/** Floating WhatsApp button (bottom-right on every page). Hidden when no number is set. */
import { usePathname } from "next/navigation";
import { whatsappLink, whatsappDisplay } from "@/config/site";

export function WhatsAppGlyph({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true" fill="currentColor">
      <path d="M16 3C9 3 3.3 8.6 3.3 15.5c0 2.4.7 4.7 1.9 6.6L3 29l7.1-2.1c1.8 1 3.8 1.5 5.9 1.5 7 0 12.7-5.6 12.7-12.5S23 3 16 3zm0 22.9c-1.9 0-3.8-.5-5.4-1.5l-.4-.2-4.2 1.2 1.3-4-.3-.4c-1.1-1.7-1.7-3.6-1.7-5.6C5.3 9.8 10.1 5.1 16 5.1s10.7 4.7 10.7 10.4S21.9 25.9 16 25.9z" />
      <path d="M22.1 18.6c-.3-.2-2-1-2.3-1.1-.3-.1-.5-.2-.8.2-.2.3-.9 1.1-1.1 1.3-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.7-1.7-1-.9-1.7-2-1.9-2.3-.2-.3 0-.5.1-.7l.5-.6c.2-.2.2-.3.3-.6.1-.2 0-.4 0-.6-.1-.2-.8-1.8-1-2.5-.3-.7-.6-.6-.8-.6h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8 0 1.6 1.2 3.2 1.4 3.4.2.2 2.3 3.5 5.6 4.9.8.3 1.4.5 1.9.7.8.3 1.5.2 2.1.1.6-.1 2-.8 2.2-1.6.3-.8.3-1.5.2-1.6-.1-.2-.3-.2-.6-.4z" />
    </svg>
  );
}

export function WhatsAppButton() {
  const pathname = usePathname();
  const href = whatsappLink();
  if (!href) return null;
  const raised = pathname === "/calculator"; // keep clear of the calculator's mobile price bar
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      aria-label={`Chat with Pixel Graphics on WhatsApp (${whatsappDisplay()})`}
      className={`group fixed right-4 z-50 flex items-center gap-2 rounded-full bg-[#25D366] p-3.5 text-white shadow-[0_12px_30px_-8px_rgba(37,211,102,.6)] transition hover:scale-105 hover:shadow-[0_16px_36px_-8px_rgba(37,211,102,.75)] focus-visible:outline-offset-4 sm:right-6 ${raised ? "bottom-24 lg:bottom-6" : "bottom-[max(16px,env(safe-area-inset-bottom))] sm:bottom-6"}`}>
      <WhatsAppGlyph className="h-7 w-7" />
      <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 group-hover:max-w-[160px] group-hover:pr-1 lg:inline-block">Chat with us</span>
    </a>
  );
}
