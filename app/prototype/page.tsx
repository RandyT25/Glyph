"use client";

import Link from "next/link";
import { BarChart3, CreditCard, MessageCircle, Palette, RotateCcw, Store, Gift } from "lucide-react";
import { GlyphIcon } from "@/components/proto/brand";
import { Column } from "@/components/proto/column";
import { useToast } from "@/components/proto/use-toast";
import { resetDemo } from "@/lib/proto/store";

const SCREENS = [
  { href: "/prototype/kasir", title: "Layar Kasir", desc: "Tambah stempel dalam hitungan detik", icon: Store, tone: "bg-indigo-600 text-white" },
  { href: "/prototype/wa", title: "Pesan WhatsApp", desc: "Pesan yang diterima pelanggan", icon: MessageCircle, tone: "bg-emerald-600 text-white" },
  { href: "/prototype/kartu?c=8x2f", title: "Kartu Pelanggan", desc: "Dewi · 4 dari 10 stempel", icon: CreditCard, tone: "bg-orange-600 text-white" },
  { href: "/prototype/kartu?c=q7rz", title: "Kartu Pelanggan (penuh)", desc: "Rizky · reward siap ditukar", icon: Gift, tone: "bg-orange-600 text-white" },
  { href: "/prototype/desain", title: "Desain Kartu", desc: "Logo, tema, warna, dan gambar stempel", icon: Palette, tone: "bg-pink-600 text-white" },
  { href: "/prototype/dashboard", title: "Dasbor Pemilik", desc: "Statistik, pelanggan, pengaturan kartu", icon: BarChart3, tone: "bg-slate-800 text-white" },
];

export default function PrototypeHome() {
  const { show, node } = useToast();
  return (
    <Column>
      {node}
      <header className="px-5 pb-4 pt-8">
        <div className="flex items-center gap-2">
          <GlyphIcon size={40} />
          <span className="font-heading text-2xl font-bold">Glyph</span>
          <span className="ml-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800">Prototipe</span>
        </div>
        <h1 className="font-heading mt-5 text-2xl font-bold leading-tight">Kartu stempel digital untuk toko kecil</h1>
        <p className="mt-2 text-slate-600">
          Pelanggan cukup sebut nomor WhatsApp. Kasir tekan satu tombol. Tidak ada aplikasi, tidak ada login.
        </p>
        <p className="mt-2 text-sm text-slate-500">Data palsu, hanya tersimpan di browser ini. Toko contoh: Barber Joko.</p>
      </header>

      <nav className="flex-1 space-y-3 px-4 pb-4" aria-label="Layar prototipe">
        {SCREENS.map(({ href, title, desc, icon: Icon, tone }) => (
          <Link
            key={href}
            href={href}
            className="flex min-h-[72px] items-center gap-4 rounded-2xl bg-slate-50 p-3 ring-1 ring-slate-200 active:bg-slate-100"
          >
            <span className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${tone}`}>
              <Icon className="size-6" />
            </span>
            <span>
              <span className="block text-base font-bold">{title}</span>
              <span className="block text-sm text-slate-500">{desc}</span>
            </span>
          </Link>
        ))}
      </nav>

      <footer className="px-4 pb-6">
        <button
          type="button"
          onClick={() => {
            resetDemo();
            show("Data demo dikembalikan ke awal");
          }}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl text-sm font-medium text-slate-500 active:bg-slate-100"
        >
          <RotateCcw className="size-4" /> Reset data demo
        </button>
      </footer>
    </Column>
  );
}
