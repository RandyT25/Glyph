import type { Metadata, Viewport } from "next";
import "./proto.css";
import { LangId } from "@/components/proto/lang-id";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const viewport: Viewport = { themeColor: "#4F46E5" };

export const metadata: Metadata = {
  title: "Glyph — Prototipe Kartu Stempel",
  description: "Prototipe klik kartu stempel digital untuk toko kecil. Data palsu, tanpa backend.",
  robots: { index: false, follow: false },
  icons: {
    icon: [
      { url: `${BASE}/brand/icon-48.png`, sizes: "48x48", type: "image/png" },
      { url: `${BASE}/brand/icon-192.png`, sizes: "192x192", type: "image/png" },
    ],
    apple: { url: `${BASE}/brand/apple-touch-icon.png`, sizes: "180x180" },
  },
  manifest: `${BASE}/brand/prototype-manifest.json`,
  appleWebApp: { capable: true, title: "Glyph", statusBarStyle: "default" },
};

export default function PrototypeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh flex-1 bg-slate-200 text-slate-900">
      <LangId />
      {children}
    </div>
  );
}
