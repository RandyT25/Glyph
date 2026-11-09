"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Check, Delete, MessageCircle, Nfc, Search, Undo2 } from "lucide-react";
import { AppHeader } from "@/components/proto/app-header";
import { BottomBar, Column, Loading } from "@/components/proto/column";
import { StampGrid } from "@/components/proto/stamp-grid";
import { useToast } from "@/components/proto/use-toast";
import { addStamp, undoLast, useProto, type StampResult } from "@/lib/proto/store";
import { displayName, firstName, formatPhone, isFull, isValidPhone, type Customer, type Shop } from "@/lib/proto/model";

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "clear", "0", "back"] as const;
const MAX_DIGITS = 13;
type Mode = "nomor" | "nama" | "nfc";
const MODES: Array<[Mode, string]> = [
  ["nomor", "Nomor"],
  ["nama", "Cari nama"],
  ["nfc", "Tap NFC"],
];

const grid = (shop: Shop, filled: number) => (
  <StampGrid total={shop.stampsNeeded} filled={filled} color={shop.color} size="sm" icon={shop.stampIcon} image={shop.stampImage} shape={shop.stampShape} />
);

export default function CashierPage() {
  const state = useProto();
  const [mode, setMode] = useState<Mode>("nomor");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [query, setQuery] = useState("");
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<StampResult | null>(null);
  const { show, node } = useToast();
  const scanTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Hardware keyboard (desktop demos): digits + backspace, number mode only.
  useEffect(() => {
    if (result || mode !== "nomor") return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement | null)?.tagName === "INPUT") return;
      if (/^\d$/.test(e.key)) setPhone((p) => (p.length < MAX_DIGITS ? p + e.key : p));
      else if (e.key === "Backspace") setPhone((p) => p.slice(0, -1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [result, mode]);

  useEffect(() => () => clearTimeout(scanTimer.current), []);

  if (!state) return <Loading />;
  const { shop } = state;
  const needed = shop.stampsNeeded;

  const pickCustomer = (c: Customer) => {
    setPhone(c.phone);
    setName("");
    setQuery("");
    setMode("nomor");
  };

  const press = (k: (typeof KEYS)[number]) => {
    if (k === "clear") setPhone("");
    else if (k === "back") setPhone((p) => p.slice(0, -1));
    else setPhone((p) => (p.length < MAX_DIGITS ? p + k : p));
  };

  const simulateTap = () => {
    const holders = state.customers.filter((c) => c.nfc);
    if (holders.length === 0) {
      show("Belum ada pelanggan dengan kartu NFC");
      return;
    }
    setScanning(true);
    scanTimer.current = setTimeout(() => {
      const c = holders[Math.floor(Math.random() * holders.length)];
      setScanning(false);
      pickCustomer(c);
      show(`Kartu NFC terbaca: ${displayName(c)}`);
    }, 1000);
  };

  const valid = isValidPhone(phone);
  const existing = state.customers.find((c) => c.phone === phone);
  const full = !!existing && isFull(existing.stamps, needed);

  const submit = () => {
    if (!valid) return;
    const r = addStamp(phone, name);
    if (r) {
      try {
        navigator.vibrate?.(40);
      } catch {
        /* not supported */
      }
      setResult(r);
    }
  };

  const next = () => {
    setPhone("");
    setName("");
    setMode("nomor");
    setResult(null);
  };

  const undo = () => {
    const c = undoLast();
    setResult(null);
    setPhone("");
    setName("");
    show(c ? `Dibatalkan: ${displayName(c)}` : "Stempel terakhir dibatalkan");
  };

  const resultCustomer = result ? state.customers.find((c) => c.id === result.customerId) : null;

  /* ---------------- success ---------------- */
  if (result && resultCustomer) {
    const redeemed = result.kind === "redeem";
    const cardFull = result.kind === "full";
    return (
      <Column>
        {node}
        <div className="flex flex-1 flex-col items-center px-5 pt-14 text-center">
          <div className="proto-pop flex size-28 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30">
            <Check className="size-16" strokeWidth={3.5} />
          </div>
          <h1 className="font-heading mt-6 text-2xl font-bold">
            {redeemed ? "Reward ditukar, WA terkirim" : "Stempel ditambahkan, WA terkirim"}
          </h1>

          <div className="mt-6 w-full rounded-2xl bg-slate-50 p-4 text-left ring-1 ring-slate-200">
            <p className="text-lg font-bold">{displayName(resultCustomer)}</p>
            <p className="mb-3 text-sm text-slate-500">{formatPhone(resultCustomer.phone)}</p>
            {grid(shop, resultCustomer.stamps)}
            <p className="mt-3 text-sm font-semibold text-slate-700">
              {redeemed
                ? `Kartu baru dimulai: 0 dari ${needed}`
                : cardFull
                  ? "Kartu penuh! Reward siap ditukar"
                  : `${resultCustomer.stamps} dari ${needed} stempel · ${needed - resultCustomer.stamps} lagi untuk reward`}
            </p>
          </div>

          <Link
            href="/prototype/wa"
            className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-slate-300 font-semibold text-slate-800 active:bg-slate-50"
          >
            <MessageCircle className="size-5 text-emerald-600" /> Lihat pesan WA
          </Link>

          <button type="button" onClick={undo} className="mt-3 flex h-11 items-center gap-1.5 px-3 text-sm text-slate-500 underline underline-offset-4">
            <Undo2 className="size-4" /> Batalkan stempel terakhir
          </button>
        </div>
        <BottomBar>
          <button type="button" onClick={next} className="h-16 w-full rounded-2xl bg-indigo-600 text-xl font-bold text-white active:scale-[0.98]">
            Pelanggan berikutnya
          </button>
        </BottomBar>
      </Column>
    );
  }

  /* ---------------- input ---------------- */
  const hint =
    phone.length === 0
      ? "Ketik nomor WhatsApp pelanggan"
      : phone.length > 1 && !phone.startsWith("08")
        ? "Nomor harus diawali 08"
        : `Kurang ${Math.max(10 - phone.length, 0)} angka lagi`;

  const buttonLabel = full ? "Tukar Reward" : "+ Stempel";
  const buttonStyle = !valid
    ? "bg-slate-200 text-slate-400"
    : full
      ? "bg-emerald-600 text-white active:scale-[0.98]"
      : "bg-indigo-600 text-white active:scale-[0.98]";

  const recent = [...state.customers].sort((a, b) => b.lastVisit - a.lastVisit).slice(0, 4);
  const q = query.trim().toLowerCase();
  const qDigits = q.replace(/\D/g, "");
  const matches = [...state.customers]
    .sort((a, b) => b.lastVisit - a.lastVisit)
    .filter((c) => !q || c.name.toLowerCase().includes(q) || (qDigits.length > 0 && c.phone.includes(qDigits)))
    .slice(0, 6);

  return (
    <Column>
      {node}
      <AppHeader title="Kasir" shop={shop.name} />

      <div className="px-4">
        <div className="grid grid-cols-3 gap-1 rounded-xl bg-slate-100 p-1" role="tablist" aria-label="Cara memilih pelanggan">
          {MODES.map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={mode === id}
              onClick={() => setMode(id)}
              className={`flex h-11 items-center justify-center gap-1.5 rounded-lg text-sm font-bold ${mode === id ? "bg-white text-slate-900 shadow" : "text-slate-500"}`}
            >
              {id === "nfc" && <Nfc className="size-4" />}
              {id === "nama" && <Search className="size-4" />}
              {label}
            </button>
          ))}
        </div>

        {mode === "nomor" && (
          <>
            <div
              className="mt-3 flex h-16 items-center justify-center rounded-2xl bg-slate-100 font-heading text-[32px] font-bold tabular-nums tracking-wide"
              aria-live="polite"
              aria-label="Nomor WhatsApp"
            >
              {phone ? formatPhone(phone) : <span className="text-slate-300">08xx xxxx xxxx</span>}
            </div>

            <div className="mt-3 flex min-h-[132px] flex-col justify-center">
              {existing ? (
                <div className="rounded-2xl p-3 ring-1" style={{ background: `${shop.color}0d`, borderColor: shop.color }}>
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="truncate text-lg font-bold">
                      {displayName(existing)}
                      {existing.nfc && <Nfc className="ml-1.5 inline size-4 text-slate-400" aria-label="Punya kartu NFC" />}
                    </p>
                    <p className="shrink-0 text-sm font-semibold" style={{ color: shop.color }}>
                      {Math.min(existing.stamps, needed)}/{needed}
                    </p>
                  </div>
                  <div className="my-2">{grid(shop, existing.stamps)}</div>
                  <p className={`text-sm font-semibold ${full ? "text-emerald-700" : "text-slate-600"}`}>
                    {full ? "Kartu penuh! Siap tukar reward" : `${needed - existing.stamps} lagi untuk reward`}
                  </p>
                </div>
              ) : valid ? (
                <div className="rounded-2xl bg-indigo-50 p-3 ring-1 ring-indigo-200">
                  <p className="font-bold text-indigo-900">Pelanggan baru</p>
                  <label className="mt-1 block text-sm text-indigo-900/70" htmlFor="nama">
                    Nama (boleh dikosongkan)
                  </label>
                  <input
                    id="nama"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="mis. Andi"
                    autoComplete="off"
                    maxLength={40}
                    className="mt-1 h-12 w-full rounded-xl border border-indigo-200 bg-white px-3 text-base outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                  />
                </div>
              ) : phone.length === 0 ? (
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">Pelanggan terakhir</p>
                  <div className="flex flex-wrap gap-2">
                    {recent.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => pickCustomer(c)}
                        className="h-11 rounded-full border border-slate-300 px-4 text-sm font-semibold active:bg-slate-100"
                      >
                        {firstName(c) || formatPhone(c.phone).slice(-4)}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-center text-slate-400">{hint}</p>
              )}
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2">
              {KEYS.map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => press(k)}
                  aria-label={k === "back" ? "Hapus satu angka" : k === "clear" ? "Hapus semua" : k}
                  className="flex h-14 items-center justify-center rounded-xl bg-slate-100 text-2xl font-semibold text-slate-900 active:bg-slate-300"
                >
                  {k === "back" ? <Delete className="size-6" /> : k === "clear" ? <span className="text-base font-medium text-slate-500">Hapus</span> : k}
                </button>
              ))}
            </div>
          </>
        )}

        {mode === "nama" && (
          <div className="mt-3">
            <label className="relative block">
              <span className="sr-only">Cari nama atau nomor</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 size-5 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ketik nama pelanggan"
                autoComplete="off"
                className="h-14 w-full rounded-2xl border border-slate-300 bg-white pl-10 pr-3 text-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
            </label>
            <ul className="mt-3 divide-y divide-slate-100 overflow-hidden rounded-2xl ring-1 ring-slate-200">
              {matches.length === 0 && <li className="p-6 text-center text-slate-400">Tidak ada yang cocok. Pakai tab Nomor untuk pelanggan baru.</li>}
              {matches.map((c) => (
                <li key={c.id}>
                  <button type="button" onClick={() => pickCustomer(c)} className="flex min-h-[64px] w-full items-center gap-3 px-3 text-left active:bg-slate-50">
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-semibold">{displayName(c)}</span>
                      <span className="block text-sm text-slate-500">{formatPhone(c.phone)}</span>
                    </span>
                    <span className="text-sm font-bold text-slate-700">
                      {Math.min(c.stamps, needed)}/{needed}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {mode === "nfc" && (
          <div className="mt-3 flex flex-col items-center rounded-2xl bg-slate-50 px-5 py-8 text-center ring-1 ring-slate-200">
            <div className="relative flex size-32 items-center justify-center">
              {scanning && <span className="absolute inset-0 animate-ping rounded-full bg-indigo-400/40" />}
              <span className={`relative flex size-24 items-center justify-center rounded-full text-white ${scanning ? "bg-indigo-600" : "bg-slate-800"}`}>
                <Nfc className="size-12" />
              </span>
            </div>
            <p className="mt-4 text-lg font-bold">{scanning ? "Membaca kartu…" : "Dekatkan kartu NFC pelanggan"}</p>
            <p className="mt-1 text-sm text-slate-500">ke bagian belakang HP kasir. Nomor dan kartu pelanggan langsung terisi.</p>
            <button
              type="button"
              onClick={simulateTap}
              disabled={scanning}
              className="mt-5 h-12 rounded-xl border border-slate-300 bg-white px-5 text-sm font-bold active:bg-slate-100 disabled:opacity-50"
            >
              Simulasikan tap kartu
            </button>
            <p className="mt-3 text-xs text-slate-400">Prototipe: di versi asli, HP kasir membaca kartu sungguhan.</p>
          </div>
        )}

        <div className="flex h-12 items-center justify-center">
          {state.undo && (
            <button type="button" onClick={undo} className="flex h-11 items-center gap-1.5 px-3 text-sm text-slate-500 underline underline-offset-4">
              <Undo2 className="size-4" /> Batalkan stempel terakhir
            </button>
          )}
        </div>
      </div>

      <div className="flex-1" />
      <BottomBar>
        <button type="button" onClick={submit} disabled={!valid} className={`h-20 w-full rounded-2xl text-3xl font-extrabold ${buttonStyle}`}>
          {buttonLabel}
        </button>
      </BottomBar>
    </Column>
  );
}
