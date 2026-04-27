import type { CSSProperties } from "react";
import mandala from "@/assets/mandala.png";

interface MandalaBgProps {
  className?: string;
  spin?: boolean;
  glow?: boolean;
  style?: CSSProperties;
}

export const MandalaBg = ({ className = "", spin = true, glow = true, style }: MandalaBgProps) => (
  <div className={`pointer-events-none select-none ${className}`} style={style}>
    {glow && (
      <div className="absolute inset-0 rounded-full bg-gradient-saffron blur-3xl opacity-30 animate-glow-pulse" />
    )}
    <img
      src={mandala}
      alt=""
      aria-hidden
      className={`relative h-full w-full opacity-25 ${spin ? "animate-slow-spin" : "animate-reverse-spin"}`}
    />
  </div>
);
