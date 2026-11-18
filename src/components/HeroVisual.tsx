/**
 * Cinematic remote workspace (brand-built SVG): laptop showing Pixel Graphics branding,
 * desk, plant, mug and turquoise light. Replace with licensed photography when available —
 * see docs/IMAGE-BRIEF.md.
 */
import { PXGlyphBox } from "./Logo";
export function HeroVisual({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 640 560" className={className} role="img" aria-label="Remote creative workspace: a laptop showing the Pixel Graphics brand on a desk with a plant and turquoise light">
      <defs>
        <radialGradient id="hv-light" cx="70%" cy="20%" r="80%"><stop offset="0" stopColor="#69C9CA" stopOpacity=".55" /><stop offset=".45" stopColor="#299A94" stopOpacity=".18" /><stop offset="1" stopColor="#222026" stopOpacity="0" /></radialGradient>
        <linearGradient id="hv-wall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#1f2a2d" /><stop offset="1" stopColor="#1b1a1f" /></linearGradient>
        <linearGradient id="hv-desk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3a3840" /><stop offset="1" stopColor="#1c1b20" /></linearGradient>
        <linearGradient id="hv-screen" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#24222a" /><stop offset="1" stopColor="#1a191e" /></linearGradient>
        <linearGradient id="hv-beam" x1="0" x2="1"><stop offset="0" stopColor="#69C9CA" stopOpacity="0" /><stop offset=".5" stopColor="#69C9CA" stopOpacity=".16" /><stop offset="1" stopColor="#69C9CA" stopOpacity="0" /></linearGradient>
        <linearGradient id="hv-leaf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#3fb3a8" /><stop offset="1" stopColor="#1f6e68" /></linearGradient>
        <filter id="hv-blur"><feGaussianBlur stdDeviation="18" /></filter>
        <filter id="hv-sh"><feDropShadow dx="0" dy="18" stdDeviation="16" floodColor="#000" floodOpacity=".55" /></filter>
        <clipPath id="hv-clip"><rect width="640" height="560" rx="34" /></clipPath>
      </defs>
      <g clipPath="url(#hv-clip)">
        <rect width="640" height="560" fill="url(#hv-wall)" />
        {/* window slats casting diagonal light — echoes the brand pattern */}
        <g opacity=".9">
          <polygon points="360,0 430,0 250,380 180,380" fill="url(#hv-beam)" />
          <polygon points="470,0 540,0 360,380 290,380" fill="url(#hv-beam)" />
          <polygon points="580,0 650,0 470,380 400,380" fill="url(#hv-beam)" />
        </g>
        <rect width="640" height="560" fill="url(#hv-light)" />
        {/* shelf with books */}
        <rect x="40" y="96" width="190" height="8" rx="3" fill="#2f2d35" />
        <rect x="58" y="44" width="16" height="52" rx="2" fill="#299A94" /><rect x="78" y="52" width="14" height="44" rx="2" fill="#35333b" />
        <rect x="96" y="40" width="18" height="56" rx="2" fill="#69C9CA" opacity=".8" /><rect x="118" y="58" width="40" height="38" rx="4" fill="#2a2830" />
        <circle cx="198" cy="78" r="16" fill="#35333b" /><circle cx="198" cy="78" r="6" fill="#69C9CA" opacity=".7" />
        {/* framed brand art */}
        <rect x="430" y="60" width="150" height="110" rx="8" fill="#2a2830" stroke="#3a3840" strokeWidth="4" />
        <polygon points="455,150 485,150 520,85 490,85" fill="#299A94" /><polygon points="490,85 520,85 555,150 525,150" fill="#69C9CA" opacity=".85" />
        {/* lamp glow */}
        <circle cx="560" cy="250" r="90" fill="#69C9CA" opacity=".25" filter="url(#hv-blur)" />
        {/* desk */}
        <path d="M0 400 L640 380 L640 560 L0 560Z" fill="url(#hv-desk)" />
        <path d="M0 400 L640 380" stroke="#69C9CA" strokeOpacity=".35" strokeWidth="2" />
        {/* lamp */}
        <rect x="548" y="370" width="46" height="10" rx="4" fill="#15141a" />
        <path d="M571 372 L585 290 L540 250" stroke="#15141a" strokeWidth="7" fill="none" strokeLinecap="round" />
        <path d="M512 232 L566 252 L548 284 Z" fill="#15141a" /><ellipse cx="530" cy="270" rx="22" ry="7" fill="#69C9CA" opacity=".9" transform="rotate(25 530 270)" />
        {/* plant */}
        <g>
          <path d="M84 330 C60 260 40 250 30 220 C70 240 90 280 92 330Z" fill="url(#hv-leaf)" />
          <path d="M96 330 C100 250 120 220 150 200 C140 250 118 290 104 332Z" fill="url(#hv-leaf)" />
          <path d="M90 330 C80 270 86 230 100 190 C112 240 104 290 98 332Z" fill="#2fa59c" />
          <path d="M100 334 C130 290 160 280 186 270 C170 300 140 320 106 338Z" fill="url(#hv-leaf)" />
          <path d="M62 330 h76 l-10 64 h-56z" fill="#ececec" /><path d="M62 330 h76 l-2 10 h-72z" fill="#d6d6d6" />
        </g>
        {/* laptop */}
        <g filter="url(#hv-sh)">
          <path d="M170 196 Q170 186 180 186 L460 186 Q470 186 470 196 L470 372 L170 372Z" fill="#121116" />
          <rect x="182" y="198" width="276" height="164" rx="4" fill="url(#hv-screen)" />
          {/* screen content: Pixel Graphics website */}
          <g>
            <rect x="182" y="198" width="276" height="164" rx="4" fill="#222026" />
            <polygon points="330,362 360,198 400,198 370,362" fill="#2a3a3c" opacity=".7" />
            <polygon points="380,362 410,198 450,198 420,362" fill="#299A94" opacity=".35" />
            <g transform="translate(196 210) scale(.13)"><PXGlyphBox /></g>
            <rect x="222" y="212" width="2" height="12" fill="#F7F8F8" />
            <text x="228" y="218" fill="#F7F8F8" fontFamily="Archivo Black" fontSize="6.5">PIXEL</text>
            <text x="228" y="225" fill="#69C9CA" fontFamily="Archivo Black" fontSize="6.5">GRAPHICS</text>
            <rect x="404" y="212" width="40" height="11" rx="5.5" fill="#69C9CA" />
            <rect x="196" y="244" width="14" height="2" rx="1" fill="#69C9CA" />
            <text x="196" y="266" fill="#F7F8F8" fontFamily="Archivo Black" fontSize="17">DESIGN.</text>
            <text x="196" y="285" fill="#F7F8F8" fontFamily="Archivo Black" fontSize="17">MARKET.</text>
            <text x="196" y="304" fill="#69C9CA" fontFamily="Archivo Black" fontSize="17">GROW.</text>
            <rect x="196" y="316" width="90" height="3" rx="1.5" fill="#4a4850" /><rect x="196" y="323" width="70" height="3" rx="1.5" fill="#4a4850" />
            <rect x="196" y="336" width="48" height="12" rx="6" fill="#69C9CA" /><rect x="250" y="336" width="44" height="12" rx="6" fill="none" stroke="#8a8990" />
          </g>
          <path d="M140 372 L500 372 L516 388 Q516 394 508 394 L132 394 Q124 394 124 388Z" fill="#2c2b31" />
          <rect x="290" y="374" width="60" height="5" rx="2.5" fill="#1b1a1f" />
        </g>
        {/* mug with PX */}
        <g filter="url(#hv-sh)">
          <path d="M478 360 h52 v44 q0 12 -12 12 h-28 q-12 0 -12 -12z" fill="#1b1a1f" />
          <path d="M530 372 q16 0 16 14 q0 14 -16 14" fill="none" stroke="#1b1a1f" strokeWidth="6" />
          <g transform="translate(488 378) scale(.19)"><PXGlyphBox /></g>
        </g>
        {/* notebook + pen */}
        <g transform="rotate(-8 230 470)">
          <rect x="170" y="430" width="130" height="88" rx="6" fill="#299A94" />
          <rect x="170" y="430" width="12" height="88" rx="3" fill="#1f7a75" />
          <path d="M320 440 L390 500" stroke="#F7F8F8" strokeWidth="6" strokeLinecap="round" /><path d="M320 440 L332 450" stroke="#69C9CA" strokeWidth="6" strokeLinecap="round" />
        </g>
        {/* phone */}
        <g transform="rotate(10 440 470)"><rect x="410" y="430" width="52" height="96" rx="10" fill="#111015" /><rect x="415" y="436" width="42" height="84" rx="7" fill="#2a2830" /><rect x="420" y="446" width="32" height="20" rx="3" fill="#69C9CA" opacity=".85" /><rect x="420" y="472" width="32" height="4" rx="2" fill="#4a4850" /><rect x="420" y="480" width="22" height="4" rx="2" fill="#4a4850" /></g>
        {/* vignette */}
        <rect width="640" height="560" fill="url(#hv-light)" opacity=".25" />
      </g>
    </svg>
  );
}
