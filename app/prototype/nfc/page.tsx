"use client";

import { Check, Nfc } from "lucide-react";
import { AppHeader } from "@/components/proto/app-header";
import { Column, Loading } from "@/components/proto/column";
import { NfcCard } from "@/components/proto/nfc-card";
import { useToast } from "@/components/proto/use-toast";
import { setNfc, useProto } from "@/lib/proto/store";
import { displayName, formatPhone } from "@/lib/proto/model";

export default function NfcPage() {
  const state = useProto();
  const { show, node } = useToast();
  if (!state) return <Loading />;
  const { shop, customers } = state;
  const holders = customers.filter((c) => c.nfc).length;
  const sorted = [...customers].sort((a, b) => Number(!!b.nfc) - Number(!!a.nfc) || b.stamps - a.stamps);

  return (
    <Column className="bg-slate-50!">
      {node}
      <AppHeader title="Kartu NFC" shop={shop.name} back="/prototype/dashboard" />

      <div className="space-y-5 p-4">
        <section>
          <p className="mb-2 text-sm font-semibold text-slate-700">Kartu fisik yang dibagikan ke pelanggan tetap</p>
          <NfcCard shop={shop} />
          <p className="mt-2 text-xs text-slate-500">
            Memakai logo, warna, dan tema desain kartu toko. Ubah di “Ubah desain kartu”. Gambar ini hanya contoh tampilan.
          </p>
        </section>

        <section className="grid grid-cols-2 gap-2">
          <div className="rounded-2xl bg-white p-3 ring-1 ring-slate-200">
            <p className="font-heading text-3xl font-extrabold tabular-nums">{holders}</p>
            <p className="text-xs text-slate-500">pelanggan punya kartu NFC</p>
          </div>
          <div className="rounded-2xl bg-white p-3 ring-1 ring-slate-200">
            <p className="font-heading text-3xl font-extrabold tabular-nums">{customers.length - holders}</p>
            <p className="text-xs text-slate-500">masih pakai nomor WhatsApp</p>
          </div>
        </section>

        <section>
          <p className="mb-2 text-sm font-semibold text-slate-700">Beri kartu ke pelanggan</p>
          <ul className="divide-y divide-slate-100 overflow-hidden rounded-2xl bg-white ring-1 ring-slate-200">
            {sorted.map((c) => (
              <li key={c.id} className="flex items-center gap-3 p-3">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{displayName(c)}</p>
                  <p className="text-sm text-slate-500">{formatPhone(c.phone)}</p>
                </div>
                {c.nfc ? (
                  <button
                    type="button"
                    onClick={() => {
                      setNfc(c.id, false);
                      show(`Kartu NFC ${displayName(c)} dinonaktifkan`);
                    }}
                    className="flex h-11 items-center gap-1.5 rounded-xl bg-emerald-50 px-3 text-sm font-bold text-emerald-700 active:bg-emerald-100"
                    aria-label={`Nonaktifkan kartu NFC ${displayName(c)}`}
                  >
                    <Check className="size-4" /> Aktif
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setNfc(c.id, true);
                      show(`Kartu NFC diberikan ke ${displayName(c)}`);
                    }}
                    className="flex h-11 items-center gap-1.5 rounded-xl bg-slate-900 px-3 text-sm font-bold text-white active:bg-slate-700"
                    aria-label={`Beri kartu NFC ke ${displayName(c)}`}
                  >
                    <Nfc className="size-4" /> Beri kartu
                  </button>
                )}
              </li>
            ))}
          </ul>
          <p className="mt-2 text-xs text-slate-500">Pelanggan tanpa kartu NFC, atau dengan HP tanpa NFC, tetap bisa distempel lewat nomor WhatsApp.</p>
        </section>
      </div>
    </Column>
  );
}
