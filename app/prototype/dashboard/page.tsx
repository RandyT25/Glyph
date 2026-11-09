"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Minus, Plus, Printer, Search } from "lucide-react";
import { Column, Loading } from "@/components/proto/column";
import { CardView } from "@/components/proto/card-view";
import { Poster } from "@/components/proto/poster";
import { useToast } from "@/components/proto/use-toast";
import { saveShop, useProto } from "@/lib/proto/store";
import { displayName, formatPhone, relativeDay, weekStats, type ProtoState, type Shop } from "@/lib/proto/model";

const SWATCHES = ["#D9480F", "#B91C1C", "#0F766E", "#1D4ED8", "#7C3AED", "#BE185D"];
const MIN_STAMPS = 5;
const MAX_STAMPS = 20;

export default function DashboardPage() {
  const state = useProto();
  const [tab, setTab] = useState<"pelanggan" | "pengaturan">("pelanggan");
  const { show, node } = useToast();
  if (!state) return <Loading />;

  return (
    <Column className="bg-slate-50!">
      {node}
      <header className="flex h-14 items-center gap-2 bg-white px-2">
        <Link href="/prototype" className="flex size-12 items-center justify-center rounded-xl text-slate-600 active:bg-slate-100" aria-label="Kembali ke menu">
          <ArrowLeft className="size-6" />
        </Link>
        <div className="leading-tight">
          <p className="text-xs text-slate-500">Dasbor pemilik</p>
          <p className="font-bold">{state.shop.name}</p>
        </div>
      </header>

      <div className="sticky top-0 z-10 grid grid-cols-2 gap-1 border-b border-slate-200 bg-white p-2" role="tablist">
        {(
          [
            ["pelanggan", "Pelanggan"],
            ["pengaturan", "Pengaturan kartu"],
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
      <div hidden={tab !== "pengaturan"}>
        <SettingsTab shop={state.shop} onSaved={() => show("Pengaturan kartu disimpan")} />
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

/* ---------------- settings ---------------- */

function SettingsTab({ shop, onSaved }: { shop: Shop; onSaved: () => void }) {
  const [needed, setNeeded] = useState(shop.stampsNeeded);
  const [reward, setReward] = useState(shop.reward);
  const [color, setColor] = useState(shop.color);
  const [poster, setPoster] = useState(false);

  const dirty = needed !== shop.stampsNeeded || reward.trim() !== shop.reward || color !== shop.color;
  const cleanReward = reward.trim() || shop.reward;
  const draft = { ...shop, stampsNeeded: needed, reward: cleanReward, color };
  const sampleStamps = Math.min(4, needed - 1);

  return (
    <div className="space-y-5 p-4">
      <section className="space-y-4 rounded-2xl bg-white p-4 ring-1 ring-slate-200">
        <div>
          <p className="mb-2 text-sm font-semibold">Stempel yang dibutuhkan</p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setNeeded((n) => Math.max(MIN_STAMPS, n - 1))}
              disabled={needed <= MIN_STAMPS}
              aria-label="Kurangi stempel"
              className="flex size-12 items-center justify-center rounded-xl bg-slate-100 active:bg-slate-300 disabled:opacity-40"
            >
              <Minus className="size-5" />
            </button>
            <p className="w-16 text-center font-heading text-3xl font-extrabold tabular-nums">{needed}</p>
            <button
              type="button"
              onClick={() => setNeeded((n) => Math.min(MAX_STAMPS, n + 1))}
              disabled={needed >= MAX_STAMPS}
              aria-label="Tambah stempel"
              className="flex size-12 items-center justify-center rounded-xl bg-slate-100 active:bg-slate-300 disabled:opacity-40"
            >
              <Plus className="size-5" />
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="reward" className="mb-2 block text-sm font-semibold">
            Tulisan reward
          </label>
          <input
            id="reward"
            value={reward}
            onChange={(e) => setReward(e.target.value)}
            maxLength={40}
            className="h-12 w-full rounded-xl border border-slate-300 px-3 text-base outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
        </div>

        <div>
          <p className="mb-2 text-sm font-semibold">Warna toko</p>
          <div className="flex flex-wrap items-center gap-3">
            {SWATCHES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                aria-label={`Warna ${c}`}
                aria-pressed={color === c}
                className="size-11 rounded-full ring-offset-2"
                style={{ background: c, boxShadow: color === c ? `0 0 0 3px #fff, 0 0 0 5px ${c}` : undefined }}
              />
            ))}
            <label className="flex h-11 items-center gap-2 rounded-xl border border-slate-300 px-3 text-sm text-slate-600">
              Lainnya
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="size-7 cursor-pointer border-0 bg-transparent p-0"
                aria-label="Pilih warna sendiri"
              />
            </label>
          </div>
        </div>
      </section>

      <section>
        <p className="mb-2 text-sm font-semibold text-slate-700">Pratinjau kartu pelanggan</p>
        <div className="overflow-hidden rounded-3xl ring-1 ring-slate-200">
          <CardView shop={draft} customerName="Contoh Pelanggan" stamps={sampleStamps} preview />
        </div>
      </section>

      <button
        type="button"
        disabled={!dirty}
        onClick={() => {
          saveShop({ stampsNeeded: needed, reward: cleanReward, color });
          setReward(cleanReward);
          onSaved();
        }}
        className={`h-14 w-full rounded-2xl text-lg font-bold ${dirty ? "bg-indigo-600 text-white active:scale-[0.98]" : "bg-slate-200 text-slate-400"}`}
      >
        {dirty ? "Simpan perubahan" : "Tidak ada perubahan"}
      </button>

      <button
        type="button"
        onClick={() => setPoster(true)}
        className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl border-2 border-slate-900 text-lg font-bold text-slate-900 active:bg-slate-100"
      >
        <Printer className="size-5" /> Cetak poster QR
      </button>

      {poster && <Poster shop={draft} onClose={() => setPoster(false)} />}
    </div>
  );
}
