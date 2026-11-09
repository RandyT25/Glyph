"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ImagePlus, Minus, Plus, Trash2 } from "lucide-react";
import { CardView } from "@/components/proto/card-view";
import { Loading } from "@/components/proto/column";
import { STAMP_ICONS } from "@/components/proto/stamp-icons";
import { useToast } from "@/components/proto/use-toast";
import { COVER_OPTS, fileToDataUrl, LOGO_OPTS, STAMP_OPTS, type ImageOpts } from "@/lib/proto/image";
import { PRESETS, type Shop, type StampIconId, type TemplateId } from "@/lib/proto/model";
import { saveShop, useProto } from "@/lib/proto/store";

type Draft = Pick<
  Shop,
  "name" | "color" | "reward" | "stampsNeeded" | "template" | "logo" | "cover" | "stampIcon" | "stampImage" | "stampShape"
>;

const pick = (s: Shop): Draft => ({
  name: s.name,
  color: s.color,
  reward: s.reward,
  stampsNeeded: s.stampsNeeded,
  template: s.template,
  logo: s.logo,
  cover: s.cover,
  stampIcon: s.stampIcon,
  stampImage: s.stampImage,
  stampShape: s.stampShape,
});

const TABS = ["Tema", "Logo", "Stempel", "Warna", "Isi"] as const;
type Tab = (typeof TABS)[number];

const SWATCHES = ["#D9480F", "#B91C1C", "#BE185D", "#7C3AED", "#1D4ED8", "#0369A1", "#0F766E", "#15803D", "#7C4A2D", "#111827"];
const TEMPLATES: Array<{ id: TemplateId; label: string; desc: string }> = [
  { id: "klasik", label: "Klasik", desc: "Header berwarna" },
  { id: "penuh", label: "Penuh", desc: "Seluruh kartu berwarna" },
  { id: "minimal", label: "Minimal", desc: "Putih dan bersih" },
];

export default function DesignPage() {
  const state = useProto();
  if (!state) return <Loading />;
  return <Editor shop={state.shop} />;
}

function Editor({ shop }: { shop: Shop }) {
  const [draft, setDraft] = useState<Draft>(() => pick(shop));
  const [tab, setTab] = useState<Tab>("Tema");
  const [showFull, setShowFull] = useState(false);
  const { show, node } = useToast();

  const set = <K extends keyof Draft>(k: K, v: Draft[K]) => setDraft((d) => ({ ...d, [k]: v }));
  const dirty = JSON.stringify(draft) !== JSON.stringify(pick(shop));
  const n = draft.stampsNeeded;
  const previewShop = { ...shop, ...draft, reward: draft.reward.trim() || shop.reward, name: draft.name.trim() || shop.name };

  const upload = async (file: File | undefined, key: "logo" | "cover" | "stampImage", opts: ImageOpts) => {
    if (!file) return;
    try {
      set(key, await fileToDataUrl(file, opts));
    } catch (e) {
      show(e instanceof Error ? e.message : "Gagal memuat gambar");
    }
  };

  const save = () => {
    saveShop({ ...draft, reward: previewShop.reward, name: previewShop.name });
    show("Desain kartu disimpan");
  };

  return (
    <main className="mx-auto flex h-dvh w-full max-w-[430px] flex-col bg-white shadow-xl">
      {node}
      <header className="flex h-14 shrink-0 items-center gap-2 px-2">
        <Link
          href="/prototype/dashboard"
          onClick={(e) => {
            if (dirty && !window.confirm("Perubahan belum disimpan. Tetap keluar?")) e.preventDefault();
          }}
          className="flex size-12 items-center justify-center rounded-xl text-slate-600 active:bg-slate-100"
          aria-label="Kembali ke dasbor"
        >
          <ArrowLeft className="size-6" />
        </Link>
        <div className="leading-tight">
          <p className="text-xs text-slate-500">Desain kartu</p>
          <p className="font-bold">{shop.name}</p>
        </div>
      </header>

      {/* live preview (zoomed out so more of the card fits) */}
      <div className="relative h-[42dvh] shrink-0 bg-slate-200">
        <div className="h-full overflow-y-auto">
          <div style={{ zoom: 0.6 }} className="mx-auto max-w-[430px] bg-white">
            <CardView shop={previewShop} customerName="Contoh Pelanggan" stamps={showFull ? n : Math.min(4, n - 1)} preview />
          </div>
        </div>
        <div className="absolute bottom-5 right-1.5 flex flex-col rounded-2xl bg-slate-900/85 p-1 text-[11px] font-semibold text-white shadow-lg">
          {([false, true] as const).map((full) => (
            <button
              key={String(full)}
              type="button"
              onClick={() => setShowFull(full)}
              className={`h-8 rounded-xl px-2 ${showFull === full ? "bg-white text-slate-900" : ""}`}
            >
              {full ? "Penuh" : "Jalan"}
            </button>
          ))}
        </div>
      </div>

      {/* controls */}
      <div className="relative -mt-3 flex min-h-0 flex-1 flex-col rounded-t-3xl bg-white shadow-[0_-8px_24px_rgba(0,0,0,0.12)]">
        <div className="flex shrink-0 gap-1 overflow-x-auto px-3 pt-3" role="tablist">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`h-11 shrink-0 rounded-xl px-3.5 text-sm font-bold ${tab === t ? "bg-slate-900 text-white" : "text-slate-600 active:bg-slate-100"}`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="min-h-0 flex-1 space-y-5 overflow-y-auto p-4">
          {tab === "Tema" && (
            <>
              <Group title="Mulai dari contoh" hint="Sekali ketuk mengatur warna, ikon, tata letak, dan hadiah. Sesudah itu boleh diubah.">
                <div className="grid grid-cols-3 gap-2">
                  {PRESETS.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setDraft((d) => ({ ...d, ...p.patch, stampImage: null }))}
                      className="flex h-16 flex-col items-center justify-center gap-1 rounded-xl border border-slate-200 text-sm font-semibold active:bg-slate-50"
                    >
                      <span className="size-4 rounded-full" style={{ background: p.patch.color }} />
                      {p.label}
                    </button>
                  ))}
                </div>
              </Group>
              <Group title="Tata letak">
                <div className="grid grid-cols-3 gap-2">
                  {TEMPLATES.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      aria-pressed={draft.template === t.id}
                      onClick={() => set("template", t.id)}
                      className={`rounded-xl border-2 p-2 text-left ${draft.template === t.id ? "border-indigo-600 bg-indigo-50" : "border-slate-200"}`}
                    >
                      <Thumb id={t.id} color={draft.color} />
                      <p className="mt-2 text-sm font-bold">{t.label}</p>
                      <p className="text-[11px] leading-tight text-slate-500">{t.desc}</p>
                    </button>
                  ))}
                </div>
              </Group>
            </>
          )}

          {tab === "Logo" && (
            <>
              <Group title="Logo toko" hint="Tampil di bagian atas kartu, di WhatsApp, dan di poster. Otomatis diperkecil.">
                <Upload value={draft.logo} round onFile={(f) => upload(f, "logo", LOGO_OPTS)} onClear={() => set("logo", null)} label="Pilih logo" />
              </Group>
              <Group
                title="Foto sampul (opsional)"
                hint={draft.template === "minimal" ? "Tema Minimal tidak memakai foto sampul. Pilih Klasik atau Penuh." : "Menjadi latar bagian atas kartu. Foto gelap atau ramai pun tetap terbaca."}
              >
                <Upload
                  value={draft.cover}
                  disabled={draft.template === "minimal"}
                  onFile={(f) => upload(f, "cover", COVER_OPTS)}
                  onClear={() => set("cover", null)}
                  label="Pilih foto"
                />
              </Group>
            </>
          )}

          {tab === "Stempel" && (
            <>
              <Group title="Ikon stempel">
                <div className="grid grid-cols-4 gap-2">
                  {(Object.keys(STAMP_ICONS) as StampIconId[]).map((id) => {
                    const { Icon, label } = STAMP_ICONS[id];
                    const active = draft.stampIcon === id && !draft.stampImage;
                    return (
                      <button
                        key={id}
                        type="button"
                        aria-label={label}
                        aria-pressed={active}
                        onClick={() => setDraft((d) => ({ ...d, stampIcon: id, stampImage: null }))}
                        className={`flex h-14 items-center justify-center rounded-xl border-2 ${active ? "border-indigo-600 bg-indigo-50" : "border-slate-200"}`}
                      >
                        <Icon className="size-6" style={{ color: draft.color }} />
                      </button>
                    );
                  })}
                </div>
              </Group>
              <Group title="Atau pakai gambar sendiri" hint="Pakai gambar sederhana dan berbentuk persegi, misalnya maskot atau logo kecil. Otomatis dipotong sesuai bentuk stempel.">
                <Upload value={draft.stampImage} onFile={(f) => upload(f, "stampImage", STAMP_OPTS)} onClear={() => set("stampImage", null)} label="Pilih gambar stempel" />
              </Group>
              <Group title="Bentuk stempel">
                <Segmented
                  value={draft.stampShape}
                  onChange={(v) => set("stampShape", v)}
                  options={[
                    ["circle", "Bulat"],
                    ["square", "Kotak"],
                  ]}
                />
              </Group>
            </>
          )}

          {tab === "Warna" && (
            <Group title="Warna toko" hint="Warna tulisan di atasnya dipilih otomatis (putih atau gelap) supaya selalu terbaca.">
              <div className="flex flex-wrap items-center gap-3">
                {SWATCHES.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => set("color", c)}
                    aria-label={`Warna ${c}`}
                    aria-pressed={draft.color === c}
                    className="size-11 rounded-full"
                    style={{ background: c, boxShadow: draft.color === c ? `0 0 0 3px #fff, 0 0 0 5px ${c}` : undefined }}
                  />
                ))}
                <label className="flex h-11 items-center gap-2 rounded-xl border border-slate-300 px-3 text-sm text-slate-600">
                  Lainnya
                  <input type="color" value={draft.color} onChange={(e) => set("color", e.target.value)} className="size-7 cursor-pointer border-0 bg-transparent p-0" aria-label="Pilih warna sendiri" />
                </label>
              </div>
            </Group>
          )}

          {tab === "Isi" && (
            <>
              <Group title="Nama toko">
                <TextInput value={draft.name} onChange={(v) => set("name", v)} max={30} />
              </Group>
              <Group title="Stempel yang dibutuhkan">
                <div className="flex items-center gap-3">
                  <Step label="Kurangi stempel" disabled={n <= 5} onClick={() => set("stampsNeeded", n - 1)}>
                    <Minus className="size-5" />
                  </Step>
                  <p className="w-16 text-center font-heading text-3xl font-extrabold tabular-nums">{n}</p>
                  <Step label="Tambah stempel" disabled={n >= 20} onClick={() => set("stampsNeeded", n + 1)}>
                    <Plus className="size-5" />
                  </Step>
                </div>
              </Group>
              <Group title="Tulisan reward">
                <TextInput value={draft.reward} onChange={(v) => set("reward", v)} max={40} />
              </Group>
            </>
          )}
        </div>

        <div className="shrink-0 border-t border-slate-200 px-4 pb-4 pt-3">
          <button
            type="button"
            disabled={!dirty}
            onClick={save}
            className={`h-14 w-full rounded-2xl text-lg font-bold ${dirty ? "bg-indigo-600 text-white active:scale-[0.98]" : "bg-slate-200 text-slate-400"}`}
          >
            {dirty ? "Simpan desain" : "Tidak ada perubahan"}
          </button>
        </div>
      </div>
    </main>
  );
}

/* ---------------- small building blocks ---------------- */

function Group({ title, hint, children }: { title: string; hint?: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-sm font-bold text-slate-900">{title}</h2>
      {hint && <p className="mb-2 mt-0.5 text-xs leading-snug text-slate-500">{hint}</p>}
      {!hint && <div className="h-2" />}
      {children}
    </section>
  );
}

function TextInput({ value, onChange, max }: { value: string; onChange: (v: string) => void; max: number }) {
  return (
    <input
      value={value}
      maxLength={max}
      onChange={(e) => onChange(e.target.value)}
      className="h-12 w-full rounded-xl border border-slate-300 px-3 text-base outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
    />
  );
}

function Step({ children, label, onClick, disabled }: { children: React.ReactNode; label: string; onClick: () => void; disabled: boolean }) {
  return (
    <button type="button" aria-label={label} onClick={onClick} disabled={disabled} className="flex size-12 items-center justify-center rounded-xl bg-slate-100 active:bg-slate-300 disabled:opacity-40">
      {children}
    </button>
  );
}

function Segmented<T extends string>({ value, onChange, options }: { value: T; onChange: (v: T) => void; options: Array<[T, string]> }) {
  return (
    <div className="grid grid-cols-2 gap-1 rounded-xl bg-slate-100 p-1">
      {options.map(([v, label]) => (
        <button key={v} type="button" aria-pressed={value === v} onClick={() => onChange(v)} className={`h-11 rounded-lg text-sm font-bold ${value === v ? "bg-white shadow" : "text-slate-500"}`}>
          {label}
        </button>
      ))}
    </div>
  );
}

function Upload({
  value,
  onFile,
  onClear,
  label,
  round = false,
  disabled = false,
}: {
  value: string | null;
  onFile: (f: File | undefined) => void;
  onClear: () => void;
  label: string;
  round?: boolean;
  disabled?: boolean;
}) {
  return (
    <div className={`flex items-center gap-3 ${disabled ? "opacity-40" : ""}`}>
      <div
        className={`flex size-16 shrink-0 items-center justify-center overflow-hidden border border-dashed border-slate-300 bg-slate-50 text-slate-300 ${round ? "rounded-full" : "rounded-xl"}`}
      >
        {value ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={value} alt="" className={`size-full ${round ? "object-contain p-1" : "object-cover"}`} />
        ) : (
          <ImagePlus className="size-6" />
        )}
      </div>
      <label className={`flex h-12 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border border-slate-300 text-sm font-semibold text-slate-800 active:bg-slate-50 ${disabled ? "pointer-events-none" : ""}`}>
        {value ? "Ganti" : label}
        <input
          type="file"
          accept="image/*"
          className="sr-only"
          disabled={disabled}
          onChange={(e) => {
            onFile(e.target.files?.[0]);
            e.target.value = "";
          }}
        />
      </label>
      {value && (
        <button type="button" onClick={onClear} aria-label="Hapus gambar" className="flex size-12 items-center justify-center rounded-xl text-red-600 active:bg-red-50">
          <Trash2 className="size-5" />
        </button>
      )}
    </div>
  );
}

function Thumb({ id, color }: { id: TemplateId; color: string }) {
  const box = "h-16 w-full overflow-hidden rounded-md ring-1 ring-black/10";
  if (id === "penuh")
    return (
      <div className={box} style={{ background: color }}>
        <div className="mx-1.5 mt-5 h-8 rounded bg-white/25" />
      </div>
    );
  if (id === "minimal")
    return (
      <div className={`${box} bg-white p-1.5`}>
        <div className="mb-1.5 flex items-center gap-1 border-b border-slate-200 pb-1">
          <span className="size-3 rounded-full" style={{ background: color }} />
          <span className="h-1 w-6 rounded bg-slate-300" />
        </div>
        <div className="grid grid-cols-5 gap-0.5">
          {Array.from({ length: 10 }, (_, i) => (
            <span key={i} className="aspect-square rounded-[2px]" style={{ background: i < 4 ? color : `${color}33` }} />
          ))}
        </div>
      </div>
    );
  return (
    <div className={`${box} bg-slate-50`}>
      <div className="h-7" style={{ background: color }} />
      <div className="-mt-3 mx-1.5 h-8 rounded bg-white shadow" />
    </div>
  );
}
