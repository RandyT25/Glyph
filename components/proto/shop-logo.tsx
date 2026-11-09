import { Store } from "lucide-react";
import { readableOn } from "@/lib/proto/model";
import { STAMP_ICONS } from "./stamp-icons";
import type { StampIconId } from "@/lib/proto/model";

type Props = {
  color: string;
  logo?: string | null;
  fallbackIcon?: StampIconId;
  size?: number;
  /** sits on a brand-colour background: white disc */
  onColor?: boolean;
};

export function ShopLogo({ color, logo, fallbackIcon, size = 48, onColor = false }: Props) {
  const Fallback = fallbackIcon ? STAMP_ICONS[fallbackIcon].Icon : Store;
  if (logo) {
    return (
      <span
        className="inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-2 ring-white/70"
        style={{ width: size, height: size }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} alt="Logo toko" className="size-full object-contain p-[10%]" />
      </span>
    );
  }
  const bg = onColor ? "#ffffff" : color;
  const fg = onColor ? color : readableOn(color);
  return (
    <span
      className="inline-flex shrink-0 items-center justify-center rounded-full"
      style={{ width: size, height: size, background: bg, color: fg }}
      aria-hidden
    >
      <Fallback style={{ width: size * 0.5, height: size * 0.5 }} />
    </span>
  );
}
