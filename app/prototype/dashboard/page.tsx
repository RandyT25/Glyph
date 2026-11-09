"use client";

import Link from "next/link";
import { useState } from "react";
import { Gift, Nfc, Palette, Printer, Search, Stamp } from "lucide-react";
import { AppHeader } from "@/components/proto/app-header";
import { Column, Loading } from "@/components/proto/column";
import { CardView } from "@/components/proto/card-view";
import { Poster } from "@/components/proto/poster";
import { useProto } from "@/lib/proto/store";
import { clockTime, displayName, formatPhone, relativeDay, weekStats, type ProtoState, type Shop } from "@/lib/proto/model";

export default function DashboardPage() {
  const state = useProto();
  const [tab, setTab] = useState<"pelanggan" | "riwayat" | "pengaturan">("pelanggan");
  if (!state) return <Loading />;

  return (
    <Column className="bg-slate-50!">
      <AppHeader title="Dasbor pemilik" shop={state.shop.name} />

      <div className="sticky top-0 z-10 grid grid-cols-3 gap-1 border-b border-slate-200 bg-white p-2" role="tablist">
        {(
          [
            ["pelanggan", "Pelanggan"],
            ["riwayat", "Riwayat"],
            ["pengaturan", "Kartu & poster"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            onClick={() => setTab(id)}
            className={`h-12 rounded-xl text-sm font-bold ${tab === id ? "bg-slate-900 text-white" : "text-slate-600 active:bg-slate-100"}`}
          >
            {label}
          </button>
        ))}
      </div>

      <div hidden={tab !== "pelanggan"}>
        <CustomersTab state={state} />
      </div>
      <div hidden={tab !== "riwayat"}>
        <HistoryTab state={state} />
      </div>
      <div hidden={tab !== "pengaturan"}>
        <SettingsTab shop={state.shop} />
      </div>
    </Column>
  );
}

/* ---------------- customers ---------------- */

function CustomersTab({ state }: { state: ProtoState }) {
  const [q, setQ] = useState("");
  const stats = weekStats(state);
  const needed = state.shop.stampsNeeded;
  const term = q.trim().toLowerCase();
  const digits = term.replace(/\D/g, "");
  const rows = [...state.customers]
    .sort((a, b) => b.lastVisit - a.lastVisit)
    .filter((c) => !term || c.name.toLowerCase().includes(term) || (digits.length > 0 && c.phone.includes(digits)));

  return (
    <div className="space-y-4 p-4">
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Pelanggan minggu ini", value: stats.customers },
          { label: "Stempel diberikan", value: stats.stamps },
          { label: "Reward ditukar", value: stats.rewards },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl bg-white p-3 ring-1 ring-slate-200">
            <p className="font-heading text-3xl font-extrabold tabular-nums">{s.value}</p>
            <p className="mt-1 text-xs leading-tight text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>
      <p className="-mt-2 text-xs text-slate-400">7 hari terakhir</p>

      <div>
        <label className="relative block">
          <span className="sr-only">Cari pelanggan</span>
          <Search className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Cari nama atau nomor"
            className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-10 pr-3 text-base outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
        </label>

        <p className="mb-2 mt-4 text-sm font-semibold text-slate-700">
          Pelanggan ({rows.length})
        </p>
        {rows.length === 0 ? (
          <p className="rounded-2xl bg-white p-6 text-center text-slate-400 ring-1 ring-slate-200">Tidak ada pelanggan yang cocok</p>
        ) : (
          <ul className="divide-y divide-slate-100 overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200">
            {rows.map((c) => {
              const have = Math.min(c.stamps, needed);
              const full = c.stamps >= needed;
              return (
                <li key={c.id} className="flex items-center gap-3 p-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">{displayName(c)}</p>
                    <p className="text-sm text-slate-500">{formatPhone(c.phone)}</p>
                    <p className="text-xs text-slate-400">Terakhir: {relativeDay(c.lastVisit)}</p>
                  </div>
                  <div className="w-20 shrink-0 text-right">
                    <p className={`text-sm font-bold ${full ? "text-emerald-600" : "text-slate-800"}`}>
                      {have}/{needed}
                    </p>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${(have / needed) * 100}%`, background: full ? "#059669" : state.shop.color }}
                      />
                    </div>
                    {full && <p className="mt-1 text-[11px] font-semibold text-emerald-600">Penuh</p>}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

/* ---------------- history ---------------- */

function HistoryTab({ state }: { state: ProtoState }) {
  const byId = new Map(state.customers.map((c) => [c.id, c]));
  const rows = [...state.events].sort((a, b) => b.at - a.at).slice(0, 40);
  return (
    <div className="p-4">
      <p className="mb-1 text-sm font-semibold text-slate-700">Aktivitas terbaru</p>
      <p className="mb-3 text-xs text-slate-500">Setiap stempel dan reward tercatat, supaya Anda bisa memeriksa kalau ada yang janggal.</p>
      <ul className="divide-y divide-slate-100 overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200">
        {rows.map((e) => {
          const c = byId.get(e.customerId);
          const redeem = e.type === "redeem";
          return (
            <li key={e.id} className="flex items-center gap-3 p-3">
              <span className={`flex size-10 shrink-0 items-center justify-center rounded-full ${redeem ? "bg-emerald-100 text-emerald-700" : "bg-indigo-50 text-indigo-600"}`}>
                {redeem ? <Gift className="size-5" /> : <Stamp className="size-5" />}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold">{c ? displayName(c) : "Pelanggan dihapus"}</p>
                <p className="text-sm text-slate-500">{redeem ? "Reward ditukar" : "+1 stempel"}</p>
              </div>
              <div className="text-right text-xs text-slate-400">
                <p>{relativeDay(e.at)}</p>
                <p>{clockTime(e.at)}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ---------------- settings ---------------- */

function SettingsTab({ shop }: { shop: Shop }) {
  const [poster, setPoster] = useState(false);
  return (
    <div className="space-y-4 p-4">
      <section>
        <p className="mb-2 text-sm font-semibold text-slate-700">Kartu pelanggan saat ini</p>
        <div className="overflow-hidden rounded-3xl ring-1 ring-slate-200">
          <CardView shop={shop} customerName="Contoh Pelanggan" stamps={Math.min(4, shop.stampsNeeded - 1)} preview />
        </div>
        <dl className="mt-3 grid grid-cols-2 gap-2 text-sm">
          <div className="rounded-xl bg-white p-3 ring-1 ring-slate-200">
            <dt className="text-xs text-slate-500">Stempel dibutuhkan</dt>
            <dd className="font-bold">{shop.stampsNeeded}</dd>
          </div>
          <div className="rounded-xl bg-white p-3 ring-1 ring-slate-200">
            <dt className="text-xs text-slate-500">Reward</dt>
            <dd className="font-bold">{shop.reward}</dd>
          </div>
        </dl>
      </section>

      <Link
        href="/prototype/desain"
        className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-indigo-600 text-lg font-bold text-white active:scale-[0.98]"
      >
        <Palette className="size-5" /> Ubah desain kartu
      </Link>

      <Link
        href="/prototype/nfc"
        className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl border-2 border-slate-900 text-lg font-bold text-slate-900 active:bg-slate-100"
      >
        <Nfc className="size-5" /> Kartu NFC
      </Link>

      <button
        type="button"
        onClick={() => setPoster(true)}
        className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl border-2 border-slate-900 text-lg font-bold text-slate-900 active:bg-slate-100"
      >
        <Printer className="size-5" /> Cetak poster QR
      </button>

      {poster && <Poster shop={shop} onClose={() => setPoster(false)} />}
    </div>
  );
}
