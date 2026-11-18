import type { IconName } from "@/config/services";

type Name = IconName | "globe" | "remote" | "spark" | "target" | "check" | "arrow" | "mail" | "chat" | "calendar" | "calc" | "doc" | "shield" | "clock" | "plus" | "minus" | "close" | "menu" | "pen" | "eye" | "handshake";

/** Brand icon style: charcoal/white line, rounded joins, Aqua Teal solid accent (class "a"). */
const paths: Record<Name, React.ReactNode> = {
  brand: <><rect className="a" x="36" y="34" width="20" height="20" rx="3" /><rect x="8" y="8" width="36" height="44" rx="4" /><path d="M16 20h20M16 28h14M16 36h10M50 8v14" /></>,
  graphic: <><rect x="8" y="8" width="40" height="48" rx="4" /><circle className="a" cx="44" cy="20" r="10" /><path d="M16 44l8-10 6 7 4-4 8 7H16z" /></>,
  social: <><rect x="16" y="6" width="32" height="52" rx="5" /><path d="M28 50h8M22 37h20M22 43h12" /><rect className="a" x="22" y="14" width="20" height="16" rx="2" /></>,
  marketing: <><path d="M8 54h48M14 54V36M26 54V26M38 54V32" /><rect className="a" x="44" y="16" width="10" height="38" rx="2" /><path d="M12 24l14-10 12 8 16-14" /></>,
  motion: <><circle cx="32" cy="32" r="24" /><path className="a" d="M27 22l15 10-15 10z" /><path d="M4 32h4M56 32h4" /></>,
  web: <><rect x="6" y="10" width="52" height="38" rx="4" /><path d="M6 20h52M24 56h16M32 48v8M38 28h12M38 35h8" /><rect className="a" x="14" y="27" width="16" height="13" rx="2" /></>,
  consult: <><path d="M8 14h34v22H22l-8 7v-7H8z" /><path className="a" d="M30 30h26v20h-6v6l-7-6H30z" /></>,
  events: <><rect x="8" y="12" width="48" height="42" rx="4" /><path d="M8 24h48M20 6v12M44 6v12" /><path className="a" d="M32 30l3.5 7 7.5 1-5.5 5 1.5 7.5-7-4-7 4 1.5-7.5-5.5-5 7.5-1z" /></>,
  packaging: <><path d="M8 20l24-12 24 12v26L32 58 8 46z" /><path d="M8 20l24 12 24-12M32 32v26" /><path className="a" d="M20 14l24 12v8l-6-3v-8L14 17z" /></>,
  editorial: <><path d="M6 12c10-3 18-2 26 4 8-6 16-7 26-4v40c-10-3-18-2-26 4-8-6-16-7-26-4z" /><path d="M32 16v40" /><rect className="a" x="38" y="22" width="14" height="10" rx="2" /><path d="M12 24h12M12 32h12M12 40h12M38 40h14" /></>,
  management: <><rect x="6" y="12" width="40" height="38" rx="4" /><path d="M6 22h40M16 6v10M36 6v10M14 30h6M24 30h6M14 38h6" /><circle className="a" cx="46" cy="44" r="13" /><path d="M41 44l4 4 7-8" stroke="#222026" /></>,
  globe: <><circle cx="32" cy="32" r="24" /><path d="M8 32h48M32 8c8 8 8 40 0 48M32 8c-8 8-8 40 0 48" /><circle className="a" cx="48" cy="16" r="6" /></>,
  remote: <><rect x="6" y="12" width="40" height="28" rx="3" /><path d="M2 46h48" /><circle className="a" cx="50" cy="40" r="10" /><path d="M46 40h8M50 36v8" /></>,
  spark: <><path className="a" d="M32 6l6 18 18 6-18 6-6 18-6-18-18-6 18-6z" /></>,
  target: <><circle cx="30" cy="34" r="22" /><circle cx="30" cy="34" r="12" /><circle className="a" cx="30" cy="34" r="5" /><path d="M30 34L54 10M46 10h8v8" /></>,
  check: <><circle className="a" cx="32" cy="32" r="24" /><path d="M21 33l7 7 15-16" strokeWidth="5" /></>,
  arrow: <path d="M12 32h40M38 18l14 14-14 14" />,
  mail: <><rect x="6" y="14" width="52" height="36" rx="4" /><path d="M6 18l26 18 26-18" /></>,
  chat: <><path d="M32 8a24 24 0 0 0-21 35L8 56l13-3A24 24 0 1 0 32 8z" /><path className="a" d="M24 22c0 10 8 18 18 18l4-5-6-4-3 3c-3-1-6-4-7-7l3-3-4-6z" /></>,
  calendar: <><rect x="8" y="12" width="48" height="42" rx="4" /><path d="M8 24h48M20 6v12M44 6v12" /><rect className="a" x="16" y="32" width="12" height="10" rx="2" /></>,
  calc: <><rect x="12" y="6" width="40" height="52" rx="5" /><rect className="a" x="18" y="12" width="28" height="12" rx="2" /><path d="M20 34h4M30 34h4M40 34h4M20 44h4M30 44h4M40 44h4" /></>,
  doc: <><path d="M14 6h24l12 12v40H14z" /><path d="M38 6v12h12M22 30h20M22 38h20M22 46h12" /></>,
  shield: <><path d="M32 6l22 8v16c0 14-10 24-22 28C20 54 10 44 10 30V14z" /><path className="a" d="M24 32l6 6 12-12" /></>,
  clock: <><circle cx="32" cy="32" r="24" /><path d="M32 18v14l10 6" /></>,
  plus: <path d="M32 14v36M14 32h36" />,
  minus: <path d="M14 32h36" />,
  close: <path d="M16 16l32 32M48 16L16 48" />,
  menu: <path d="M12 20h40M12 32h40M12 44h28" />,
  pen: <><path d="M44 8l12 12-30 30H14V38z" /><path className="a" d="M38 14l12 12 6-6-12-12z" /></>,
  eye: <><path d="M4 32s10-18 28-18 28 18 28 18-10 18-28 18S4 32 4 32z" /><circle className="a" cx="32" cy="32" r="8" /></>,
  handshake: <><path d="M4 22l12-6 16 10 16-10 12 6v16l-8 4-12 10-16-12-12-4z" /><path className="a" d="M24 34l8 6 8-6" /></>,
};

export function Icon({ name, className = "h-6 w-6", accent = true }: { name: Name; className?: string; accent?: boolean }) {
  return (
    <svg viewBox="0 0 64 64" className={`pg-icon ${className}`} aria-hidden="true" focusable="false"
      fill="none" stroke="currentColor" strokeWidth={3.4} strokeLinecap="round" strokeLinejoin="round">
      <style>{`.pg-icon .a{fill:${accent ? "#69C9CA" : "currentColor"};stroke:none}`}</style>
      {paths[name]}
    </svg>
  );
}
export type { Name as IconKey };
