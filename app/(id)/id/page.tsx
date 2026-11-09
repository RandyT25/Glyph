import type { Metadata } from "next";
import Link from "next/link";
import GlyphMark from "@/components/common/glyph-mark";
import { LangId } from "@/components/proto/lang-id";
import { brandSrc } from "@/components/proto/brand";

export const metadata: Metadata = {
  title: "Glyph — Kartu Stempel Digital NFC untuk Toko Kecil",
  description:
    "Ganti kartu stempel kertas dengan kartu NFC premium dan stempel digital lewat WhatsApp. Tanpa aplikasi, tanpa login untuk pelanggan. Untuk barbershop, laundry, dan kafe.",
  openGraph: {
    title: "Glyph — Kartu Stempel Digital NFC untuk Toko Kecil",
    description: "Tap kartunya. Stempel masuk. Pelanggan kembali. Tanpa aplikasi, tanpa login.",
    type: "website",
    siteName: "Glyph",
    locale: "id_ID",
  },
};

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const img = (name: string) => `${BASE}/site/${name}`;

/* ---------- small pieces ---------- */

function Phone({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-900 p-1.5 shadow-2xl shadow-black/50 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={img(src)} alt={alt} width={570} height={1170} loading="lazy" decoding="async" className="h-auto w-full rounded-[1.6rem]" />
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-sm font-semibold uppercase tracking-widest text-amber-400">{children}</p>;
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="font-heading mt-3 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">{children}</h2>;
}

function CtaPrimary({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex h-14 items-center justify-center rounded-2xl bg-indigo-600 px-7 text-base font-bold text-white transition hover:bg-indigo-500 active:scale-[0.98]"
    >
      {children}
    </Link>
  );
}

function CtaGhost({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex h-14 items-center justify-center rounded-2xl border border-white/15 px-7 text-base font-semibold text-zinc-100 transition hover:bg-white/5 active:scale-[0.98]"
    >
      {children}
    </Link>
  );
}

const PAINS = [
  { t: "Kartu hilang atau tertinggal", d: "Pelanggan punya niat kembali, tetapi kartunya di dompet yang lain. Stempel pun terhenti di tengah jalan." },
  { t: "Tidak tahu siapa pelanggan setia", d: "Kartu kertas tidak meninggalkan jejak. Anda tidak bisa melihat siapa yang rajin datang dan siapa yang sudah lama hilang." },
  { t: "Stempel mudah dipalsukan", d: "Siapa pun bisa mengisi stempel sendiri. Dengan Glyph, setiap stempel tercatat lengkap dengan waktunya." },
];

const STEPS = [
  { n: "1", t: "Tap atau sebut nomor", d: "Pelanggan tetap cukup tap kartu NFC. Pelanggan baru cukup menyebut nomor WhatsApp.", src: "kasir-nfc.webp", alt: "Layar kasir dengan mode Tap NFC" },
  { n: "2", t: "Kasir tekan + Stempel", d: "Satu tombol besar. Saat kartu penuh, tombolnya berubah menjadi hijau: Tukar Reward.", src: "kasir-kenal.webp", alt: "Layar kasir menampilkan kartu pelanggan dan tombol + Stempel" },
  { n: "3", t: "WhatsApp terkirim", d: "Pelanggan menerima progres stempel dan tautan ke kartunya. Tanpa aplikasi, tanpa login.", src: "wa.webp", alt: "Pesan WhatsApp berisi progres stempel dan tautan kartu" },
];

const FOR_WHO = [
  { name: "Barbershop", reward: "Potong rambut gratis", color: "#D9480F", note: "Pelanggan potong tiap 2 sampai 4 minggu. Kartu stempel membuat jadwal itu jadi kebiasaan." },
  { name: "Laundry", reward: "Cuci 1 kg gratis", color: "#0369A1", note: "Pelanggan datang berulang dan mudah pindah ke laundry lain. Beri alasan untuk tetap di sini." },
  { name: "Kafe", reward: "Kopi gratis", color: "#7C4A2D", note: "Kopi harian adalah kebiasaan. Stempel digital mengubahnya menjadi hadiah yang terasa dekat." },
];

const FAQ = [
  { q: "Apakah pelanggan harus mengunduh aplikasi?", a: "Tidak. Pelanggan menerima pesan WhatsApp berisi tautan, lalu kartunya terbuka di browser. Tidak ada aplikasi dan tidak ada login." },
  { q: "Apakah semua pelanggan wajib punya kartu NFC?", a: "Tidak. Kartu NFC adalah jalur cepat untuk pelanggan tetap. Pelanggan baru, atau pelanggan dengan HP tanpa NFC, tetap bisa distempel lewat nomor WhatsApp." },
  { q: "HP apa yang dibutuhkan kasir?", a: "Untuk membaca kartu NFC, HP kasir perlu mendukung NFC. Kalau tidak, kasir tetap bisa memakai nomor WhatsApp atau mencari nama pelanggan." },
  { q: "Apakah kartunya bisa disesuaikan dengan toko saya?", a: "Bisa. Anda memilih tema, mengunggah logo dan foto sampul, memilih warna, lalu memakai ikon atau gambar stempel sendiri. Kartu NFC fisiknya mengikuti desain yang sama." },
  { q: "Berapa harganya?", a: "Paket harga masih kami siapkan. Hubungi kami kalau ingin tahu lebih awal." },
  { q: "Apakah ini sudah bisa dipakai di toko?", a: "Saat ini berupa prototipe yang bisa Anda klik sendiri. Data yang tampil hanya contoh dan tidak tersambung ke WhatsApp sungguhan." },
];

/* ---------- page ---------- */

export default function IndonesianLanding() {
  return (
    <div className="min-h-dvh bg-[#09090B] text-zinc-200">
      <LangId />

      {/* nav */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-[#09090B]/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link href="/id/" className="flex items-center gap-2" aria-label="Glyph">
            <GlyphMark size={30} color="#818CF8" />
            <span className="font-heading text-xl font-bold text-white">Glyph</span>
          </Link>
          <nav className="hidden items-center gap-7 text-sm text-zinc-400 md:flex" aria-label="Navigasi utama">
            <a href="#cara-kerja" className="hover:text-white">Cara kerja</a>
            <a href="#nfc" className="hover:text-white">Kartu NFC</a>
            <a href="#desain" className="hover:text-white">Desain</a>
            <a href="#faq" className="hover:text-white">Tanya jawab</a>
          </nav>
          <Link href="/prototype/" className="inline-flex h-11 items-center rounded-xl bg-white px-4 text-sm font-bold text-zinc-900 hover:bg-zinc-200">
            Coba demo
          </Link>
        </div>
      </header>

      <main>
        {/* hero */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(79,70,229,0.35),transparent)]" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-2 lg:pt-24">
            <div>
              <span className="inline-flex rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-xs font-semibold text-amber-300">
                Kartu stempel digital untuk toko kecil di Indonesia
              </span>
              <h1 className="font-heading mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl">
                Tap kartunya. Stempel masuk. Pelanggan kembali.
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-zinc-400">
                Glyph mengganti kartu stempel kertas dengan kartu NFC yang terasa premium dan stempel digital lewat WhatsApp. Pelanggan tidak perlu mengunduh aplikasi atau membuat akun.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <CtaPrimary href="/prototype/kasir/">Coba demo kasir</CtaPrimary>
                <CtaGhost href="/prototype/kartu/?c=8x2f">Lihat kartu pelanggan</CtaGhost>
              </div>
              <p className="mt-4 text-sm text-zinc-500">Prototipe yang bisa diklik. Data contoh, tanpa perlu daftar.</p>
            </div>

            <div className="relative mx-auto flex w-full max-w-md justify-center">
              <Phone src="kartu-klasik.webp" alt="Kartu stempel pelanggan Barber Joko" className="w-[52%] -rotate-3" />
              <Phone src="kasir-kenal.webp" alt="Layar kasir dengan tombol + Stempel" className="-ml-6 mt-10 w-[52%] rotate-3" />
            </div>
          </div>
        </section>

        {/* pain */}
        <section className="border-y border-white/10 bg-white/[0.02]">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <Eyebrow>Masalah kartu kertas</Eyebrow>
            <H2>Pelanggan sudah niat kembali. Kartunya yang menghalangi.</H2>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {PAINS.map((p) => (
                <div key={p.t} className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6">
                  <h3 className="font-heading text-lg font-bold text-white">{p.t}</h3>
                  <p className="mt-2 leading-relaxed text-zinc-400">{p.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* how it works */}
        <section id="cara-kerja" className="scroll-mt-20">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <Eyebrow>Cara kerja</Eyebrow>
            <H2>Tiga langkah, selesai di depan kasir.</H2>
            <div className="mt-12 grid gap-10 md:grid-cols-3">
              {STEPS.map((s) => (
                <div key={s.n} className="flex flex-col">
                  <Phone src={s.src} alt={s.alt} className="mx-auto w-48" />
                  <div className="mt-6 flex items-start gap-3">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-sm font-bold text-white">{s.n}</span>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-white">{s.t}</h3>
                      <p className="mt-1 leading-relaxed text-zinc-400">{s.d}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* NFC */}
        <section id="nfc" className="scroll-mt-20 border-y border-white/10 bg-gradient-to-b from-indigo-950/40 to-transparent">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2">
            <div className="order-2 mx-auto w-full max-w-xs lg:order-1">
              <Phone src="nfc.webp" alt="Layar Kartu NFC dengan contoh kartu fisik toko" />
            </div>
            <div className="order-1 lg:order-2">
              <Eyebrow>Kartu NFC</Eyebrow>
              <H2>Kartu fisik yang terasa premium, dibuat untuk pelanggan tetap.</H2>
              <p className="mt-4 text-lg leading-relaxed text-zinc-400">
                Beri kartu NFC bergambar logo toko Anda ke pelanggan yang sering datang. Saat mereka tap, kartu pelanggan langsung terbuka di kasir tanpa perlu mengetik nomor.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "Tap, lalu kartu pelanggan langsung terisi di layar kasir",
                  "Desain mengikuti toko Anda: logo, warna, dan tema yang sama dengan kartu digital",
                  "Kartu NFC tidak memakai baterai",
                  "Tidak wajib: pelanggan tanpa kartu tetap bisa pakai nomor WhatsApp",
                ].map((t) => (
                  <li key={t} className="flex gap-3 text-zinc-300">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-amber-400" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* design */}
        <section id="desain" className="scroll-mt-20">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <Eyebrow>Desain kartu</Eyebrow>
            <H2>Setiap toko punya kartu sendiri.</H2>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-zinc-400">
              Pilih satu dari tiga tema, unggah logo dan foto sampul, pilih warna, lalu pakai ikon atau gambar stempel buatan Anda. Atau mulai dari contoh Barbershop, Laundry, atau Kafe.
            </p>
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-3">
              {[
                { src: "kartu-klasik.webp", n: "Klasik", d: "Header berwarna" },
                { src: "kartu-penuh.webp", n: "Penuh", d: "Seluruh kartu berwarna" },
                { src: "kartu-minimal.webp", n: "Minimal", d: "Putih dan bersih" },
              ].map((t) => (
                <figure key={t.n} className="mx-auto w-full max-w-[15rem]">
                  <Phone src={t.src} alt={`Kartu stempel tema ${t.n}`} />
                  <figcaption className="mt-4 text-center">
                    <span className="font-heading font-bold text-white">{t.n}</span>
                    <span className="block text-sm text-zinc-500">{t.d}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* for who */}
        <section className="border-y border-white/10 bg-white/[0.02]">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
            <Eyebrow>Untuk siapa</Eyebrow>
            <H2>Dibuat untuk usaha yang pelanggannya datang berulang.</H2>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {FOR_WHO.map((f) => (
                <div key={f.name} className="overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/60">
                  <div className="h-2" style={{ background: f.color }} />
                  <div className="p-6">
                    <h3 className="font-heading text-xl font-bold text-white">{f.name}</h3>
                    <p className="mt-1 text-sm font-semibold text-amber-300">Hadiah: {f.reward}</p>
                    <p className="mt-3 leading-relaxed text-zinc-400">{f.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* dashboard */}
        <section>
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2">
            <div>
              <Eyebrow>Dasbor pemilik</Eyebrow>
              <H2>Lihat siapa yang setia, dan siapa yang mulai hilang.</H2>
              <ul className="mt-6 space-y-3">
                {[
                  "Pelanggan minggu ini, stempel yang diberikan, dan reward yang ditukar",
                  "Daftar pelanggan lengkap dengan kunjungan terakhir, bisa dicari dengan nama atau nomor",
                  "Riwayat setiap stempel dan reward, supaya mudah memeriksa kalau ada yang janggal",
                  "Poster QR siap cetak untuk dipasang di kasir",
                ].map((t) => (
                  <li key={t} className="flex gap-3 text-zinc-300">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-amber-400" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mx-auto grid w-full max-w-md grid-cols-2 gap-4">
              <Phone src="dasbor.webp" alt="Dasbor pemilik: statistik dan daftar pelanggan" />
              <Phone src="riwayat.webp" alt="Dasbor pemilik: riwayat stempel" className="mt-8" />
            </div>
          </div>
        </section>

        {/* faq */}
        <section id="faq" className="scroll-mt-20 border-t border-white/10">
          <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
            <Eyebrow>Tanya jawab</Eyebrow>
            <H2>Yang biasa ditanyakan pemilik toko.</H2>
            <div className="mt-8 divide-y divide-white/10 rounded-2xl border border-white/10 bg-zinc-900/50">
              {FAQ.map((f) => (
                <details key={f.q} className="group p-5">
                  <summary className="flex min-h-[44px] cursor-pointer list-none items-center justify-between gap-4 font-semibold text-white">
                    {f.q}
                    <span className="text-xl text-zinc-500 transition group-open:rotate-45" aria-hidden>
                      +
                    </span>
                  </summary>
                  <p className="mt-2 leading-relaxed text-zinc-400">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* final cta */}
        <section>
          <div className="mx-auto max-w-4xl px-4 pb-24 sm:px-6">
            <div className="rounded-3xl bg-gradient-to-br from-indigo-600 to-indigo-900 p-10 text-center sm:p-14">
              <h2 className="font-heading text-3xl font-extrabold text-white sm:text-4xl">Mau coba di toko Anda?</h2>
              <p className="mx-auto mt-3 max-w-xl text-indigo-100">Klik prototipenya sekarang, atau hubungi kami untuk membicarakan kartu stempel di toko Anda.</p>
              <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                <Link href="/prototype/" className="inline-flex h-14 items-center justify-center rounded-2xl bg-white px-7 font-bold text-indigo-900 hover:bg-indigo-50">
                  Coba demo
                </Link>
                <Link href="/contact/" className="inline-flex h-14 items-center justify-center rounded-2xl border border-white/30 px-7 font-semibold text-white hover:bg-white/10">
                  Hubungi kami
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-zinc-500 sm:flex-row sm:px-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={brandSrc.wordmarkWhite} alt="Glyph" className="h-6 w-auto" />
          <nav className="flex gap-6" aria-label="Tautan kaki halaman">
            <Link href="/privacy/" className="hover:text-white">Privasi</Link>
            <Link href="/terms/" className="hover:text-white">Syarat</Link>
            <Link href="/" className="hover:text-white">English</Link>
          </nav>
          <p>© 2026 Glyph</p>
        </div>
      </footer>
    </div>
  );
}
