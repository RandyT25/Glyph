import { Scissors } from "lucide-react";
import { readableOn } from "@/lib/proto/model";

export function ShopLogo({ color, size = 48, onColor = false }: { color: string; size?: number; onColor?: boolean }) {
  // onColor: logo sits on a brand-colour background, so invert (white disc, brand icon)
  const bg = onColor ? "#ffffff" : color;
  const fg = onColor ? color : readableOn(color);
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-full"
      style={{ width: size, height: size, background: bg, color: fg }}
      aria-hidden
    >
      <Scissors style={{ width: size * 0.5, height: size * 0.5 }} />
    </span>
  );
}
