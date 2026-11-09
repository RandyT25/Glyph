/* Official Glyph brand assets (public/brand). Plain <img> because the site is a static export. */
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const brandSrc = {
  icon: `${BASE}/brand/glyph-icon.png`,
  wordmark: `${BASE}/brand/glyph-wordmark.png`,
  wordmarkWhite: `${BASE}/brand/glyph-wordmark-white.png`,
  wordmarkGradient: `${BASE}/brand/glyph-wordmark-gradient.png`,
};

export function GlyphIcon({ size = 40, className = "" }: { size?: number; className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={brandSrc.icon} width={size} height={size} alt="Glyph" className={`rounded-[22%] ${className}`} />;
}

/** "Didukung Glyph" footer mark. variant=white for use on a coloured background. */
export function PoweredByGlyph({ variant = "dark" }: { variant?: "dark" | "white" }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] opacity-80">
      Didukung
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={variant === "white" ? brandSrc.wordmarkWhite : brandSrc.wordmark}
        alt="Glyph"
        height={18}
        className="h-[18px] w-auto"
      />
    </span>
  );
}
