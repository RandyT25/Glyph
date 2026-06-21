import GlyphMark from "@/components/common/glyph-mark";
import { NAV_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#09090B]">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Row 1 */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          {/* Logo left */}
          <a
            href="/"
            className="flex items-center gap-2.5 cursor-pointer select-none"
            aria-label="Glyph home"
          >
            <GlyphMark size={22} />
            <span className="font-[family-name:var(--font-dm-sans)] font-bold text-[#F4F4F5] text-base tracking-tight">
              Glyph
            </span>
          </a>

          {/* Nav links center */}
          <nav>
            <ul className="flex flex-wrap items-center justify-center gap-6">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-[#71717A] hover:text-[#F4F4F5] transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/contact"
                  className="text-sm text-[#71717A] hover:text-[#F4F4F5] transition-colors duration-200"
                >
                  Contact
                </a>
              </li>
            </ul>
          </nav>

          {/* Copyright right */}
          <p className="text-sm text-[#71717A]">
            &copy; 2026 Glyph
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-white/[0.04] pt-8">
          {/* Row 2 — tagline */}
          <p className="text-center text-sm text-[#52525B] italic tracking-wide">
            Every tap, a mark of loyalty.
          </p>
        </div>
      </div>
    </footer>
  );
}
