"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import GlyphMark from "@/components/common/glyph-mark";
import { NAV_LINKS } from "@/lib/constants";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="fixed top-4 left-4 right-4 z-50 flex justify-center pointer-events-none">
        <nav
          className={[
            "w-full max-w-6xl mx-auto rounded-2xl px-6 py-3 flex items-center justify-between pointer-events-auto transition-all duration-300",
            scrolled
              ? "bg-[#09090B]/80 backdrop-blur-md border border-white/[0.06] shadow-2xl shadow-black/40"
              : "bg-transparent",
          ].join(" ")}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 cursor-pointer select-none"
            aria-label="Glyph home"
          >
            <GlyphMark size={34} />
            <span className="font-[family-name:var(--font-dm-sans)] font-bold text-[#F4F4F5] text-xl tracking-tight">
              Glyph
            </span>
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-[#71717A] hover:text-[#F4F4F5] transition-colors duration-200 font-medium"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/contact"
              className="text-sm text-[#71717A] hover:text-[#F4F4F5] transition-colors duration-200 font-medium"
            >
              Contact
            </Link>
            <Link
              href="/demo"
              className="cursor-pointer inline-flex items-center gap-2 border border-[#4F46E5] hover:border-[#6366F1] text-[#6366F1] hover:text-white hover:bg-[#4F46E5] text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200"
            >
              See Demo
            </Link>
            <Link
              href="/contact"
              className="cursor-pointer inline-flex items-center gap-2 bg-[#4F46E5] hover:bg-[#6366F1] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200"
            >
              Book Demo
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-[#A1A1AA] hover:text-white transition-colors duration-200 cursor-pointer"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </div>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#09090B]/95 backdrop-blur-xl flex flex-col pt-24 px-8 pb-8"
          >
            <nav className="flex flex-col gap-1 flex-1">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block text-2xl font-[family-name:var(--font-dm-sans)] font-semibold text-[#A1A1AA] hover:text-white py-3 border-b border-white/[0.06] transition-colors duration-200 cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.06, duration: 0.3 }}
              >
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="block text-2xl font-[family-name:var(--font-dm-sans)] font-semibold text-[#A1A1AA] hover:text-white py-3 border-b border-white/[0.06] transition-colors duration-200 cursor-pointer"
                >
                  Contact
                </Link>
              </motion.div>
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="mt-6 w-full inline-flex items-center justify-center bg-[#4F46E5] hover:bg-[#6366F1] text-white text-base font-semibold px-6 py-4 rounded-xl transition-all duration-200 cursor-pointer"
              >
                Book Demo
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
