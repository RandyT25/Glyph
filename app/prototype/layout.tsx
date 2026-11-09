import type { Metadata } from "next";
import "./proto.css";
import { LangId } from "@/components/proto/lang-id";

export const metadata: Metadata = {
  title: "Glyph — Prototipe Kartu Stempel",
  description: "Prototipe klik kartu stempel digital untuk toko kecil. Data palsu, tanpa backend.",
  robots: { index: false, follow: false },
};

export default function PrototypeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh flex-1 bg-slate-200 text-slate-900">
      <LangId />
      {children}
    </div>
  );
}
