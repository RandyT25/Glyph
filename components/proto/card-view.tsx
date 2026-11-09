import { Clock, Gift, MapPin, MessageCircle } from "lucide-react";
import { StampGrid } from "./stamp-grid";
import { ShopLogo } from "./shop-logo";
import { PoweredByGlyph } from "./brand";
import { isFull, readableOn, type Shop } from "@/lib/proto/model";

export type CardShop = Pick<
  Shop,
  "name" | "color" | "stampsNeeded" | "reward" | "template" | "logo" | "cover" | "stampIcon" | "stampImage" | "stampShape"
> &
  Partial<Pick<Shop, "hours" | "address">>;

type Props = {
  shop: CardShop;
  customerName: string;
  stamps: number;
  /** compact preview: no opening hours / WA button */
  preview?: boolean;
  onChatShop?: () => void;
};

export function CardView({ shop, customerName, stamps, preview = false, onChatShop }: Props) {
  const n = shop.stampsNeeded;
  const have = Math.min(stamps, n);
  const full = isFull(stamps, n);
  const ink = readableOn(shop.color);
  const t = shop.template;
  const solid = t === "penuh";

  const grid = (
    <StampGrid
      total={n}
      filled={stamps}
      color={shop.color}
      icon={shop.stampIcon}
      image={shop.stampImage}
      shape={shop.stampShape}
      onColor={solid}
    />
  );

  const rewardBlock = full ? (
    <div className="rounded-2xl bg-emerald-600 p-4 text-center text-white">
      <Gift className="mx-auto mb-1 size-7" />
      <p className="text-lg font-bold">Reward siap!</p>
      <p className="text-sm">Tunjukkan halaman ini ke kasir</p>
      <p className="mt-1 text-sm font-semibold">{shop.reward}</p>
    </div>
  ) : (
    <div
      className={`flex items-center gap-3 p-4 ${t === "minimal" ? "rounded-lg border-l-4 bg-slate-50" : "rounded-2xl"}`}
      style={solid ? { background: "#fff" } : { background: t === "minimal" ? undefined : `${shop.color}14`, borderColor: shop.color }}
    >
      <Gift className="size-7 shrink-0" style={{ color: shop.color }} />
      <p className="text-sm text-slate-700">
        <span className="font-bold text-slate-900">{n - have} lagi</span> untuk{" "}
        <span className="font-bold text-slate-900">{shop.reward.toLowerCase()}</span>
      </p>
    </div>
  );

  const info = !preview && (
    <section className="space-y-3 px-4">
      <div className="rounded-2xl bg-white p-4 text-slate-900 ring-1 ring-black/5">
        <p className="mb-2 flex items-center gap-2 text-sm font-semibold">
          <Clock className="size-4" style={{ color: shop.color }} /> Jam buka
        </p>
        <dl className="space-y-1 text-sm">
          {shop.hours?.map((h) => (
            <div key={h.label} className="flex justify-between gap-3">
              <dt className="text-slate-500">{h.label}</dt>
              <dd className="font-medium">{h.time}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="rounded-2xl bg-white p-4 text-slate-900 ring-1 ring-black/5">
        <p className="mb-1 flex items-center gap-2 text-sm font-semibold">
          <MapPin className="size-4" style={{ color: shop.color }} /> Lokasi
        </p>
        <p className="text-sm text-slate-600">{shop.address}</p>
      </div>
      <button
        type="button"
        onClick={onChatShop}
        className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl text-base font-bold active:scale-[0.98]"
        style={solid ? { background: "#fff", color: shop.color } : { background: shop.color, color: ink }}
      >
        <MessageCircle className="size-5" /> Chat WhatsApp {shop.name}
      </button>
    </section>
  );

  const footer = (
    <div className={`flex justify-center pt-5 ${solid ? "" : "text-slate-500"}`} style={solid ? { color: ink } : undefined}>
      <PoweredByGlyph variant={solid && ink === "#ffffff" ? "white" : "dark"} />
    </div>
  );

  /* ---------- MINIMAL ---------- */
  if (t === "minimal") {
    return (
      <div className="bg-white pb-6">
        <header className="flex items-center gap-3 border-b border-slate-200 px-5 py-5">
          <ShopLogo color={shop.color} logo={shop.logo} fallbackIcon={shop.stampIcon} size={48} />
          <div className="leading-tight">
            <h1 className="font-heading text-lg font-bold text-slate-900">{shop.name}</h1>
            <p className="text-sm text-slate-500">Kartu Stempel</p>
          </div>
        </header>
        <section className="space-y-4 px-5 py-5">
          <div>
            <p className="text-sm text-slate-500">Kartu milik</p>
            <p className="font-heading text-xl font-bold text-slate-900">{customerName}</p>
          </div>
          {grid}
          <div>
            <div className="mb-1 flex justify-between text-sm font-semibold text-slate-900">
              <span>
                {have} dari {n} stempel
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full" style={{ width: `${(have / n) * 100}%`, background: shop.color }} />
            </div>
          </div>
          {rewardBlock}
        </section>
        {info && <div className="mt-1 bg-slate-50 py-4">{info}</div>}
        {footer}
      </div>
    );
  }

  /* ---------- KLASIK + PENUH share a header ---------- */
  const hasCover = !!shop.cover;
  const headInk = hasCover ? "#ffffff" : ink;

  return (
    <div className={solid ? "pb-6" : "bg-slate-50 pb-6"} style={solid ? { background: shop.color, color: ink } : undefined}>
      <header
        className={`px-5 text-center ${solid ? "pb-6 pt-8" : "pb-16 pt-8"}`}
        style={{
          color: headInk,
          background: hasCover
            ? `linear-gradient(rgba(0,0,0,.30), rgba(0,0,0,.6)), url(${shop.cover}) center/cover`
            : solid
              ? "transparent"
              : shop.color,
        }}
      >
        <div className="flex justify-center">
          <ShopLogo color={shop.color} logo={shop.logo} fallbackIcon={shop.stampIcon} size={64} onColor />
        </div>
        <h1 className="font-heading mt-3 text-2xl font-bold">{shop.name}</h1>
        <p className="text-sm opacity-80">Kartu Stempel</p>
      </header>

      <section className={solid ? "px-4" : "-mt-10 px-4"}>
        <div
          className={`rounded-3xl p-5 ${solid ? "bg-white/15 ring-1 ring-white/30" : "bg-white shadow-lg ring-1 ring-black/5"}`}
          style={solid ? { color: ink } : undefined}
        >
          <p className={`text-sm ${solid ? "opacity-80" : "text-slate-500"}`}>Kartu milik</p>
          <p className={`font-heading text-xl font-bold ${solid ? "" : "text-slate-900"}`}>{customerName}</p>
          <div className="mt-4">{grid}</div>
          <p className={`mt-4 text-center text-lg font-semibold ${solid ? "" : "text-slate-900"}`}>
            {have} dari {n} stempel
          </p>
          <div className="mt-3">{rewardBlock}</div>
        </div>
      </section>

      {info && <div className="mt-4">{info}</div>}
      {footer}
    </div>
  );
}
