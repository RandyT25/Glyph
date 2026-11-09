import { Clock, Gift, MapPin, MessageCircle } from "lucide-react";
import { StampGrid } from "./stamp-grid";
import { ShopLogo } from "./shop-logo";
import { isFull, readableOn, type Shop } from "@/lib/proto/model";

type Props = {
  shop: Pick<Shop, "name" | "color" | "stampsNeeded" | "reward"> & Partial<Pick<Shop, "hours" | "address">>;
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

  return (
    <div className="bg-slate-50 pb-6">
      <header
        className="px-5 pb-16 pt-8 text-center"
        style={{ background: shop.color, color: ink }}
      >
        <div className="flex justify-center">
          <ShopLogo color={shop.color} size={64} onColor />
        </div>
        <h1 className="font-heading mt-3 text-2xl font-bold">{shop.name}</h1>
        <p className="text-sm opacity-80">Kartu Stempel</p>
      </header>

      <section className="-mt-10 px-4">
        <div className="rounded-3xl bg-white p-5 shadow-lg ring-1 ring-black/5">
          <p className="text-sm text-slate-500">Kartu milik</p>
          <p className="font-heading text-xl font-bold text-slate-900">{customerName}</p>

          <div className="mt-4">
            <StampGrid total={n} filled={stamps} color={shop.color} />
          </div>

          <p className="mt-4 text-center text-lg font-semibold text-slate-900">
            {have} dari {n} stempel
          </p>

          {full ? (
            <div className="mt-3 rounded-2xl bg-emerald-600 p-4 text-center text-white">
              <Gift className="mx-auto mb-1 size-7" />
              <p className="text-lg font-bold">Reward siap!</p>
              <p className="text-sm">Tunjukkan halaman ini ke kasir</p>
              <p className="mt-1 text-sm font-semibold">🎁 {shop.reward}</p>
            </div>
          ) : (
            <div
              className="mt-3 flex items-center gap-3 rounded-2xl p-4"
              style={{ background: `${shop.color}14` }}
            >
              <Gift className="size-7 shrink-0" style={{ color: shop.color }} />
              <p className="text-sm text-slate-700">
                <span className="font-bold text-slate-900">{n - have} lagi</span> untuk{" "}
                <span className="font-bold text-slate-900">{shop.reward.toLowerCase()}</span>
              </p>
            </div>
          )}
        </div>
      </section>

      {!preview && (
        <section className="mt-4 space-y-3 px-4">
          <div className="rounded-2xl bg-white p-4 ring-1 ring-black/5">
            <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-900">
              <Clock className="size-4" style={{ color: shop.color }} /> Jam buka
            </p>
            <dl className="space-y-1 text-sm">
              {shop.hours?.map((h) => (
                <div key={h.label} className="flex justify-between gap-3">
                  <dt className="text-slate-500">{h.label}</dt>
                  <dd className="font-medium text-slate-900">{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-2xl bg-white p-4 ring-1 ring-black/5">
            <p className="mb-1 flex items-center gap-2 text-sm font-semibold text-slate-900">
              <MapPin className="size-4" style={{ color: shop.color }} /> Lokasi
            </p>
            <p className="text-sm text-slate-600">{shop.address}</p>
          </div>

          <button
            type="button"
            onClick={onChatShop}
            className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl text-base font-bold active:scale-[0.98]"
            style={{ background: shop.color, color: ink }}
          >
            <MessageCircle className="size-5" /> Chat WhatsApp {shop.name}
          </button>
        </section>
      )}
    </div>
  );
}
