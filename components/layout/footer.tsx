import Link from "next/link";
import GlyphMark from "@/components/common/glyph-mark";
import { NAV_LINKS } from "@/lib/constants";
import NewsletterForm from "./newsletter-form";

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#09090B]">
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* Newsletter row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 pb-8 border-b border-white/[0.05]">
          <div>
            <p className="text-sm font-semibold text-[#F4F4F5] mb-0.5">Stay in the loop</p>
            <p className="text-xs text-[#52525B]">Product updates, loyalty tips, no spam.</p>
          </div>
          <div className="w-full sm:w-72">
            <NewsletterForm />
          </div>
        </div>

        {/* Row 1 */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 cursor-pointer select-none" aria-label="Glyph home">
            <GlyphMark size={22} />
            <span className="font-[family-name:var(--font-dm-sans)] font-bold text-[#F4F4F5] text-base tracking-tight">
              Glyph
            </span>
          </Link>

          {/* Nav links */}
          <nav>
            <ul className="flex flex-wrap items-center justify-center gap-6">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[#71717A] hover:text-[#F4F4F5] transition-colors duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contact" className="text-sm text-[#71717A] hover:text-[#F4F4F5] transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>

          {/* Social links */}
          <div className="flex items-center gap-3">
            {[
              { href: "https://twitter.com/glyphloyalty", label: "X / Twitter", icon: <XIcon /> },
              { href: "https://instagram.com/glyphloyalty", label: "Instagram", icon: <InstagramIcon /> },
              { href: "https://linkedin.com/company/glyphloyalty", label: "LinkedIn", icon: <LinkedInIcon /> },
            ].map(({ href, label, icon }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[#52525B] hover:text-[#F4F4F5] hover:bg-white/5 transition-all duration-200"
              >
                {icon}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="border-t border-white/[0.04] pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-[#52525B] italic tracking-wide">
            Every tap, a mark of loyalty.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-[#3F3F46]">&copy; 2026 Glyph</span>
            <Link href="/privacy" className="text-xs text-[#52525B] hover:text-[#71717A] transition-colors">Privacy</Link>
            <Link href="/terms" className="text-xs text-[#52525B] hover:text-[#71717A] transition-colors">Terms</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
