"use client";

import Link from "next/link";
import { ArrowLeft, CheckCheck } from "lucide-react";
import { Column, Loading } from "@/components/proto/column";
import { ShopLogo } from "@/components/proto/shop-logo";
import { buildMessage, clockTime, WA_DOMAIN, type ProtoState } from "@/lib/proto/model";
import { useProto } from "@/lib/proto/store";

function pickMessage(s: ProtoState) {
  if (s.lastWa) {
    const c = s.customers.find((x) => x.id === s.lastWa!.customerId);
    return { text: s.lastWa.text, code: s.lastWa.code, at: s.lastWa.at, who: c?.name.trim() || "pelanggan", sample: false };
  }
  const c = s.customers.find((x) => x.code === "8x2f") ?? s.customers[0];
  return { text: buildMessage("stamp", s.shop, c), code: c.code, at: Date.now(), who: c.name.split(" ")[0], sample: true };
}

export default function WaPage() {
  const state = useProto();
  if (!state) return <Loading />;
  const { shop } = state;
  const msg = pickMessage(state);
  const url = `${WA_DOMAIN}${msg.code}`;
  const [before] = msg.text.split(url);

  return (
    <Column className="bg-[#ECE5DD]!">
      <header className="flex items-center gap-2 bg-[#075E54] px-2 py-2 text-white">
        <Link href="/prototype/kasir" className="flex size-11 items-center justify-center rounded-xl active:bg-white/10" aria-label="Kembali ke kasir">
          <ArrowLeft className="size-6" />
        </Link>
        <ShopLogo color={shop.color} size={40} onColor />
        <div className="leading-tight">
          <p className="font-semibold">{shop.name}</p>
          <p className="text-xs text-white/70">Akun bisnis</p>
        </div>
      </header>

      <div className="flex-1 px-3 py-4">
        <p className="mx-auto mb-3 w-fit rounded-lg bg-[#E1F2FB] px-3 py-1 text-xs text-slate-600 shadow-sm">Hari ini</p>

        <div className="relative max-w-[86%] rounded-lg rounded-tl-none bg-white px-3 pb-1.5 pt-2 text-[15px] leading-snug text-slate-900 shadow-sm">
          <p className="whitespace-pre-wrap break-words" style={{ fontFeatureSettings: '"calt" 0' }}>
            {before}
            <Link
              href={`/prototype/kartu?c=${msg.code}`}
              className="font-medium text-[#027EB5] underline underline-offset-2"
            >
              {url}
            </Link>
          </p>
          <p className="mt-0.5 flex items-center justify-end gap-1 text-[11px] text-slate-400">
            {clockTime(msg.at)}
            <CheckCheck className="size-3.5 text-[#53BDEB]" />
          </p>
        </div>
      </div>

      <div className="space-y-2 bg-white px-4 py-4">
        <p className="text-center text-sm font-semibold text-slate-800">Ketuk tautan biru untuk membuka kartu</p>
        <p className="text-center text-xs text-slate-500">
          {msg.sample
            ? "Contoh pesan. Tambah stempel di layar kasir untuk melihat pesan yang sebenarnya."
            : `Pesan ini diterima ${msg.who} di WhatsApp-nya.`}
        </p>
        <Link
          href="/prototype/kasir"
          className="flex h-12 items-center justify-center rounded-xl border border-slate-300 text-sm font-semibold text-slate-700 active:bg-slate-50"
        >
          Kembali ke kasir
        </Link>
      </div>
    </Column>
  );
}
