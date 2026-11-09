"use client";

import { Printer, X } from "lucide-react";
import { FakeQr } from "./fake-qr";
import { ShopLogo } from "./shop-logo";
import { PoweredByGlyph } from "./brand";
import { readableOn, type Shop } from "@/lib/proto/model";

export function Poster({ shop, onClose }: { shop: Shop; onClose: () => void }) {
  const ink = readableOn(shop.color);
  const steps = [
    "Sebutkan nomor WhatsApp-mu ke kasir",
    "Kasir menambah stempel di kartumu",
    "Pantau kartumu lewat WhatsApp. Tanpa aplikasi, tanpa daftar",
  ];
  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-slate-900/80 p-4" role="dialog" aria-modal="true" aria-label="Poster QR">
      <div className="mx-auto max-w-[360px]">
        <div
          id="poster-print"
          className="flex aspect-[210/297] w-full flex-col items-center rounded-2xl p-6 text-center shadow-2xl"
          style={{ background: shop.color, color: ink }}
        >
          <ShopLogo color={shop.color} logo={shop.logo} fallbackIcon={shop.stampIcon} size={56} onColor />
          <p className="font-heading mt-2 text-lg font-bold">{shop.name}</p>

          <h2 className="font-heading mt-4 text-[26px] font-extrabold leading-tight">
            Kumpulkan {shop.stampsNeeded} stempel,
            <br />
            dapat {shop.reward.toLowerCase()}!
          </h2>

          <div className="mt-4 rounded-2xl bg-white p-3 shadow-lg">
            <div className="size-36">
              <FakeQr seed={shop.slug} />
            </div>
          </div>
          <p className="mt-2 text-xs font-semibold opacity-90">Scan untuk lihat cara kerja &amp; hadiahnya</p>

          <ol className="mt-4 w-full space-y-2 text-left text-sm">
            {steps.map((t, i) => (
              <li key={t} className="flex items-start gap-2">
                <span
                  className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold"
                  style={{ color: shop.color }}
                >
                  {i + 1}
                </span>
                <span className="pt-0.5">{t}</span>
              </li>
            ))}
          </ol>

          <div className="mt-auto flex flex-col items-center gap-1 pt-3 text-[11px]">
            <span className="opacity-80">glyph.id/{shop.slug}</span>
            <PoweredByGlyph variant={ink === "#ffffff" ? "white" : "dark"} />
          </div>
        </div>

        <div className="no-print mt-4 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => window.print()}
            className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-indigo-600 font-bold text-white active:scale-[0.98]"
          >
            <Printer className="size-5" /> Cetak
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-white font-bold text-slate-900 active:scale-[0.98]"
          >
            <X className="size-5" /> Tutup
          </button>
        </div>
        <p className="no-print mt-3 text-center text-xs text-slate-300">Prototipe: kode QR hanya tiruan, tidak bisa dipindai.</p>
      </div>
    </div>
  );
}
