import type { IconName } from "@/config/services";
import { Icon } from "./Icon";
import { PXGlyphBox } from "./Logo";

const bg: Record<IconName, string> = {
  brand: "from-teal to-deep", graphic: "from-ink-800 to-ink-950", social: "from-deep to-ink-800", marketing: "from-ink-800 to-ink-950",
  motion: "from-teal to-deep", web: "from-ink-800 to-ink-950", consult: "from-deep to-ink-800", events: "from-ink-800 to-ink-950",
  packaging: "from-ink-800 to-ink-950", editorial: "from-teal to-deep", management: "from-deep to-ink-800",
};

/** Brand-built visual for each service department (replaces stock imagery). */
export function DeptVisual({ icon, className = "", large = false }: { icon: IconName; className?: string; large?: boolean }) {
  const light = icon === "brand" || icon === "motion" || icon === "editorial";
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${bg[icon]} ${className}`} aria-hidden="true">
      <div className="pattern-bg absolute inset-0 opacity-40 mix-blend-overlay" />
      <svg viewBox="0 0 320 200" className="absolute inset-0 h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.06]" preserveAspectRatio="xMidYMid slice">
        {scenes[icon]}
      </svg>
      <div className={`absolute ${large ? "bottom-6 left-6 h-16 w-16 rounded-2xl" : "bottom-4 left-4 h-12 w-12 rounded-xl"} grid place-items-center ${light ? "bg-ink text-cloud" : "bg-cloud text-ink"} shadow-lg`}>
        <Icon name={icon} className={large ? "h-9 w-9" : "h-7 w-7"} />
      </div>
    </div>
  );
}

const W = "#F7F8F8", T = "#69C9CA", D = "#299A94", K = "#222026", G = "#4a4850";
const scenes: Record<IconName, React.ReactNode> = {
  brand: (<g>
    <g transform="rotate(-12 150 100)"><rect x="96" y="40" width="130" height="80" rx="8" fill={K} /><g transform="translate(112 60) scale(.26)"><PXGlyphBox /></g><rect x="112" y="96" width="60" height="5" rx="2" fill={G} /></g>
    <g transform="rotate(8 220 110)"><rect x="170" y="70" width="130" height="80" rx="8" fill={W} /><rect x="186" y="86" width="34" height="34" rx="17" fill={K} /><rect x="230" y="92" width="52" height="6" rx="3" fill="#cfd0d3" /><rect x="230" y="104" width="36" height="6" rx="3" fill="#cfd0d3" /><rect x="186" y="132" width="16" height="8" rx="2" fill={T} /><rect x="206" y="132" width="16" height="8" rx="2" fill={D} /><rect x="226" y="132" width="16" height="8" rx="2" fill={K} /></g>
  </g>),
  graphic: (<g>
    <g transform="rotate(-6 120 100)"><rect x="70" y="20" width="110" height="150" rx="6" fill={T} /><text x="84" y="70" fontFamily="Archivo Black" fontSize="26" fill={K}>BOLD</text><text x="84" y="96" fontFamily="Archivo Black" fontSize="26" fill={W}>IDEAS.</text><circle cx="150" cy="140" r="22" fill={K} /></g>
    <g transform="rotate(7 230 110)"><rect x="185" y="40" width="100" height="140" rx="6" fill={W} /><rect x="197" y="54" width="76" height="56" rx="4" fill={D} /><rect x="197" y="120" width="60" height="6" rx="3" fill="#cfd0d3" /><rect x="197" y="132" width="44" height="6" rx="3" fill="#cfd0d3" /><rect x="197" y="152" width="40" height="14" rx="7" fill={K} /></g>
  </g>),
  social: (<g>
    <rect x="118" y="14" width="86" height="176" rx="16" fill="#111015" /><rect x="124" y="22" width="74" height="160" rx="11" fill={W} />
    <circle cx="137" cy="36" r="7" fill={T} /><rect x="148" y="32" width="36" height="6" rx="3" fill="#cfd0d3" />
    {[0, 1, 2].map((r) => [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={128 + c * 23} y={52 + r * 23} width="20" height="20" rx="2" fill={(r + c) % 3 === 0 ? T : (r + c) % 3 === 1 ? K : D} />))}
    <g transform="translate(224 50)"><rect width="70" height="34" rx="17" fill={W} /><path d="M18 11c-4-4-10 1-6 6l6 6 6-6c4-5-2-10-6-6z" fill={T} /><text x="32" y="22" fontFamily="Poppins" fontWeight="700" fontSize="11" fill={K}>+128</text></g>
  </g>),
  marketing: (<g>
    <rect x="60" y="30" width="200" height="140" rx="12" fill="#2f2d35" />
    {[40, 62, 50, 84, 74, 104].map((h, i) => <rect key={i} x={82 + i * 28} y={150 - h} width="18" height={h} rx="4" fill={i === 5 ? T : i % 2 ? D : G} />)}
    <path d="M86 112 L114 96 L142 104 L170 78 L198 86 L232 50" stroke={W} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" /><circle cx="232" cy="50" r="6" fill={T} />
    <g transform="translate(218 14)"><rect width="74" height="30" rx="15" fill={T} /><text x="14" y="20" fontFamily="Poppins" fontWeight="700" fontSize="12" fill={K}>ROI ↑</text></g>
  </g>),
  motion: (<g>
    <rect x="50" y="34" width="220" height="124" rx="12" fill={K} />
    <circle cx="160" cy="88" r="28" fill={T} /><path d="M152 74 L174 88 L152 102Z" fill={K} />
    <rect x="66" y="140" width="188" height="6" rx="3" fill={G} /><rect x="66" y="140" width="110" height="6" rx="3" fill={T} /><circle cx="176" cy="143" r="7" fill={W} />
    {[0, 1, 2, 3, 4].map((i) => <rect key={i} x={60 + i * 44} y={170} width="38" height="20" rx="4" fill={i === 2 ? W : "#1b1a1f"} opacity={i === 2 ? 1 : .6} />)}
  </g>),
  web: (<g>
    <rect x="40" y="26" width="240" height="160" rx="10" fill={W} /><rect x="40" y="26" width="240" height="20" rx="10" fill="#e3e6e6" /><circle cx="54" cy="36" r="3.5" fill="#bbb" /><circle cx="66" cy="36" r="3.5" fill="#bbb" /><circle cx="78" cy="36" r="3.5" fill="#bbb" />
    <rect x="40" y="46" width="240" height="70" fill={K} /><text x="56" y="80" fontFamily="Archivo Black" fontSize="18" fill={W}>YOUR</text><text x="56" y="100" fontFamily="Archivo Black" fontSize="18" fill={T}>BRAND.</text>
    <polygon points="200,116 230,46 262,46 232,116" fill={D} opacity=".8" />
    {[0, 1, 2].map((i) => <rect key={i} x={56 + i * 72} y={128} width="62" height="44" rx="6" fill={i === 1 ? T : "#e8ebeb"} />)}
  </g>),
  consult: (<g>
    <g><rect x="50" y="40" width="150" height="58" rx="18" fill={W} /><path d="M70 98 l0 18 l18 -18z" fill={W} /><rect x="68" y="58" width="100" height="7" rx="3.5" fill="#cfd0d3" /><rect x="68" y="72" width="70" height="7" rx="3.5" fill="#cfd0d3" /></g>
    <g><rect x="120" y="110" width="150" height="58" rx="18" fill={T} /><path d="M250 168 l0 18 l-18 -18z" fill={T} /><rect x="138" y="128" width="96" height="7" rx="3.5" fill={K} opacity=".55" /><rect x="138" y="142" width="64" height="7" rx="3.5" fill={K} opacity=".55" /></g>
    <circle cx="246" cy="60" r="20" fill={K} /><path d="M238 60 l6 6 l12 -12" stroke={T} strokeWidth="4" fill="none" strokeLinecap="round" />
  </g>),
  packaging: (<g>
    {/* box */}
    <g transform="translate(58 46)">
      <polygon points="0,30 62,0 124,30 62,60" fill={W} /><polygon points="0,30 62,60 62,140 0,110" fill="#d9dcdc" /><polygon points="124,30 62,60 62,140 124,110" fill={T} />
      <polygon points="20,40 82,10 96,17 34,47" fill={D} opacity=".55" /><g transform="translate(78 80) skewY(-26) scale(.9)"><rect width="34" height="10" rx="2" fill={K} /><rect y="16" width="24" height="6" rx="2" fill={K} opacity=".6" /></g>
    </g>
    {/* bottle with label */}
    <g transform="translate(206 30)">
      <rect x="22" y="0" width="20" height="16" rx="3" fill={K} /><path d="M18 16h28l6 22v104a12 12 0 0 1-12 12H24a12 12 0 0 1-12-12V38z" fill={K} />
      <rect x="14" y="62" width="36" height="52" rx="4" fill={T} /><rect x="20" y="74" width="24" height="5" rx="2.5" fill={K} /><rect x="20" y="84" width="16" height="5" rx="2.5" fill={K} opacity=".6" />
    </g>
  </g>),
  editorial: (<g>
    {/* open magazine spread */}
    <g transform="rotate(-6 160 100)">
      <path d="M40 40 Q100 30 160 44 V176 Q100 162 40 172z" fill={W} /><path d="M160 44 Q220 30 280 40 V172 Q220 162 160 176z" fill="#eef0f0" />
      <rect x="54" y="52" width="92" height="56" rx="4" fill={K} /><text x="62" y="86" fontFamily="Archivo Black" fontSize="17" fill={W}>ISSUE</text><text x="62" y="102" fontFamily="Archivo Black" fontSize="11" fill={T}>NO. 01</text>
      {[0, 1, 2, 3].map((i) => <rect key={i} x="54" y={120 + i * 11} width={i === 3 ? 56 : 88} height="5" rx="2.5" fill="#cfd0d3" />)}
      <rect x="174" y="52" width="92" height="40" rx="4" fill={T} />
      {[0, 1, 2, 3, 4].map((i) => <rect key={i} x="174" y={104 + i * 11} width={i === 4 ? 50 : 90} height="5" rx="2.5" fill="#cfd0d3" />)}
      <path d="M160 44 V176" stroke="#c4c7c7" strokeWidth="2" />
    </g>
  </g>),
  management: (<g>
    {/* content calendar */}
    <rect x="36" y="34" width="150" height="132" rx="12" fill={W} /><rect x="36" y="34" width="150" height="28" rx="12" fill={K} /><rect x="36" y="50" width="150" height="12" fill={K} />
    <text x="50" y="54" fontFamily="Archivo Black" fontSize="11" fill={W}>CONTENT PLAN</text>
    {[0, 1, 2].map((r) => [0, 1, 2, 3].map((c) => <rect key={`${r}${c}`} x={48 + c * 33} y={74 + r * 29} width="27" height="23" rx="4" fill={(r * 4 + c) % 5 === 0 ? T : (r * 4 + c) % 5 === 3 ? D : "#e8ebeb"} />))}
    {/* phone with engagement */}
    <g transform="translate(200 22)"><rect width="84" height="156" rx="14" fill="#111015" /><rect x="6" y="8" width="72" height="140" rx="9" fill={K} />
      <rect x="14" y="20" width="56" height="56" rx="6" fill={T} /><rect x="14" y="84" width="40" height="5" rx="2.5" fill={G} /><rect x="14" y="94" width="28" height="5" rx="2.5" fill={G} />
      <g transform="translate(14 110)"><rect width="56" height="26" rx="13" fill={W} /><path d="M14 9c-3-3-8 1-5 5l5 5 5-5c3-4-2-8-5-5z" fill={T} /><text x="24" y="17" fontFamily="Poppins" fontWeight="700" fontSize="9" fill={K}>+2.4k</text></g>
    </g>
  </g>),
  events: (<g>
    <g transform="rotate(-8 140 100)"><rect x="70" y="40" width="150" height="110" rx="10" fill={W} /><rect x="70" y="40" width="150" height="40" rx="10" fill={D} /><text x="84" y="68" fontFamily="Archivo Black" fontSize="16" fill={W}>LAUNCH</text><rect x="84" y="96" width="80" height="7" rx="3.5" fill="#cfd0d3" /><rect x="84" y="110" width="56" height="7" rx="3.5" fill="#cfd0d3" /><rect x="84" y="126" width="46" height="14" rx="7" fill={K} /></g>
    <g transform="translate(222 46)"><rect width="66" height="100" rx="10" fill={T} /><rect x="27" y="-10" width="12" height="20" rx="4" fill={K} /><circle cx="33" cy="42" r="14" fill={K} /><rect x="14" y="66" width="38" height="6" rx="3" fill={K} opacity=".6" /><rect x="20" y="78" width="26" height="6" rx="3" fill={K} opacity=".6" /></g>
  </g>),
};
