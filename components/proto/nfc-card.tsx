import { Nfc } from "lucide-react";
import { ShopLogo } from "./shop-logo";
import { PoweredByGlyph } from "./brand";
import { readableOn, type Shop } from "@/lib/proto/model";

/** Mockup of the physical NFC card a shop hands to regulars, using the shop's own look. */
export function NfcCard({ shop }: { shop: Pick<Shop, "name" | "color" | "logo" | "stampIcon" | "template" | "cover"> }) {
  const light = shop.template === "minimal";
  const ink = light ? "#0f172a" : readableOn(shop.color);
  return (
    <div
      className="relative flex aspect-[1.586] w-full flex-col justify-between overflow-hidden rounded-2xl p-4 shadow-xl"
      style={{
        color: ink,
        background: light
          ? "#ffffff"
          : shop.cover
            ? `linear-gradient(rgba(0,0,0,.35), rgba(0,0,0,.6)), url(${shop.cover}) center/cover`
            : `linear-gradient(135deg, ${shop.color}, ${shop.color}cc)`,
        boxShadow: light ? `inset 0 0 0 2px ${shop.color}, 0 12px 28px rgba(0,0,0,.18)` : undefined,
      }}
    >
      <span className="pointer-events-none absolute -right-10 -top-10 size-40 rounded-full bg-white/10" />
      <span className="pointer-events-none absolute -bottom-14 -left-8 size-44 rounded-full bg-white/10" />
      <div className="relative flex items-center gap-2">
        <ShopLogo color={shop.color} logo={shop.logo} fallbackIcon={shop.stampIcon} size={36} onColor={!light} />
        <p className="font-heading text-base font-bold leading-tight">{shop.name}</p>
      </div>
      <div className="relative flex items-end justify-between">
        <div>
          <p className="text-[11px] uppercase tracking-widest opacity-70">Kartu Stempel</p>
          <p className="text-xs font-semibold">Tap untuk stempel</p>
        </div>
        <Nfc className="size-9 opacity-90" aria-hidden />
      </div>
      <div className="relative -mb-1 flex justify-end" style={{ color: ink }}>
        <PoweredByGlyph variant={ink === "#ffffff" ? "white" : "dark"} />
      </div>
    </div>
  );
}
