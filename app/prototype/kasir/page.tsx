"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, Check, Delete, MessageCircle, Undo2 } from "lucide-react";
import { BottomBar, Column, Loading } from "@/components/proto/column";
import { StampGrid } from "@/components/proto/stamp-grid";
import { useToast } from "@/components/proto/use-toast";
import { addStamp, undoLast, useProto, type StampResult } from "@/lib/proto/store";
import { displayName, formatPhone, isFull, isValidPhone } from "@/lib/proto/model";

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "clear", "0", "back"] as const;
const MAX_DIGITS = 13;

export default function CashierPage() {
  const state = useProto();
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [result, setResult] = useState<StampResult | null>(null);
  const { show, node } = useToast();

  // Hardware keyboard support (handy on desktop); ignored while typing a name or on the success screen.
  useEffect(() => {
    if (result) return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement | null)?.tagName === "INPUT") return;
      if (/^\d$/.test(e.key)) setPhone((p) => (p.length < MAX_DIGITS ? p + e.key : p));
      else if (e.key === "Backspace") setPhone((p) => p.slice(0, -1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [result]);

  if (!state) return <Loading />;
  const { shop } = state;
  const needed = shop.stampsNeeded;

  const press = (k: (typeof KEYS)[number]) => {
    if (k === "clear") setPhone("");
    else if (k === "back") setPhone((p) => p.slice(0, -1));
    else setPhone((p) => (p.length < MAX_DIGITS ? p + k : p));
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
            <StampGrid total={needed} filled={resultCustomer.stamps} color={shop.color} size="sm" />
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
          <button
            type="button"
            onClick={next}
            className="h-16 w-full rounded-2xl bg-indigo-600 text-xl font-bold text-white active:scale-[0.98]"
          >
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

  return (
    <Column>
      {node}
      <header className="flex h-14 items-center gap-2 px-2">
        <Link href="/prototype" className="flex size-12 items-center justify-center rounded-xl text-slate-600 active:bg-slate-100" aria-label="Kembali ke menu">
          <ArrowLeft className="size-6" />
        </Link>
        <div className="leading-tight">
          <p className="text-xs text-slate-500">Kasir</p>
          <p className="font-bold">{shop.name}</p>
        </div>
      </header>

      <div className="px-4">
        <div
          className="flex h-16 items-center justify-center rounded-2xl bg-slate-100 font-heading text-[32px] font-bold tabular-nums tracking-wide"
          aria-live="polite"
          aria-label="Nomor WhatsApp"
        >
          {phone ? formatPhone(phone) : <span className="text-slate-300">08xx xxxx xxxx</span>}
        </div>

        <div className="mt-3 flex min-h-[132px] flex-col justify-center">
          {existing ? (
            <div className="rounded-2xl p-3 ring-1" style={{ background: `${shop.color}0d`, borderColor: shop.color }}>
              <div className="flex items-baseline justify-between gap-2">
                <p className="truncate text-lg font-bold">{displayName(existing)}</p>
                <p className="shrink-0 text-sm font-semibold" style={{ color: shop.color }}>
                  {Math.min(existing.stamps, needed)}/{needed}
                </p>
              </div>
              <div className="my-2">
                <StampGrid total={needed} filled={existing.stamps} color={shop.color} size="sm" />
              </div>
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
        <button
          type="button"
          onClick={submit}
          disabled={!valid}
          className={`h-20 w-full rounded-2xl text-3xl font-extrabold ${buttonStyle}`}
        >
          {buttonLabel}
        </button>
      </BottomBar>
    </Column>
  );
}
