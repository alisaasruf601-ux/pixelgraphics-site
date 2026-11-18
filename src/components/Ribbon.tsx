import { useId } from "react";

/** The brand pattern: zigzag ribbons built from the PX "X" with a charcoal→teal gradient. */
export function Ribbon({ width = 700, height = 430, cols = 3, rows = 2, className = "" }: { width?: number; height?: number; cols?: number; rows?: number; className?: string }) {
  const id = useId().replace(/:/g, "");
  const H = (height - 30) / rows - 14, dx = H * 0.6, W = H * 0.46;
  const shapes: React.ReactNode[] = [];
  for (let r = 0; r < rows; r++) {
    const y = 10 + r * (H + 14), off = r % 2 ? -W * 1.3 : W * 0.2;
    for (let c = 0; c < cols; c++) {
      const x = off + c * 2 * dx;
      shapes.push(<polygon key={`u${r}${c}`} filter={`url(#rs${id})`} fill={`url(#gu${id})`} points={`${x},${y + H} ${x + W},${y + H} ${x + W + dx},${y} ${x + dx},${y}`} />);
      shapes.push(<polygon key={`d${r}${c}`} filter={`url(#rs${id})`} fill={`url(#gd${id})`} points={`${x + dx},${y} ${x + dx + W},${y} ${x + 2 * dx + W},${y + H} ${x + 2 * dx},${y + H}`} />);
    }
  }
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`gu${id}`} x1="0" x2="1"><stop offset="0" stopColor="#222026" /><stop offset=".55" stopColor="#2a3a3c" /><stop offset="1" stopColor="#299A94" /></linearGradient>
        <linearGradient id={`gd${id}`} x1="0" x2="1"><stop offset="0" stopColor="#222026" /><stop offset=".6" stopColor="#222026" /><stop offset="1" stopColor="#299A94" /></linearGradient>
        <filter id={`rs${id}`}><feDropShadow dx="-6" dy="10" stdDeviation="8" floodOpacity=".28" /></filter>
      </defs>
      {shapes}
    </svg>
  );
}
