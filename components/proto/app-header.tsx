import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { GlyphIcon } from "./brand";

/** Shared header for staff/owner screens: back arrow, Glyph mark, screen + shop name. */
export function AppHeader({
  title,
  shop,
  back = "/prototype",
  onBack,
  right,
}: {
  title: string;
  shop: string;
  back?: string;
  onBack?: (e: React.MouseEvent) => void;
  right?: React.ReactNode;
}) {
  return (
    <header className="flex h-14 shrink-0 items-center gap-1 bg-white px-2">
      <Link
        href={back}
        onClick={onBack}
        className="flex size-12 items-center justify-center rounded-xl text-slate-600 active:bg-slate-100"
        aria-label="Kembali"
      >
        <ArrowLeft className="size-6" />
      </Link>
      <GlyphIcon size={28} />
      <div className="ml-1 min-w-0 flex-1 leading-tight">
        <p className="text-xs text-slate-500">{title}</p>
        <p className="truncate font-bold">{shop}</p>
      </div>
      {right}
    </header>
  );
}
