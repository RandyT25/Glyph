"use client";

import ScrollReveal from "@/components/animations/scroll-reveal";
import GlyphMark from "@/components/common/glyph-mark";

export default function FinalCTA() {
  return (
    <section className="py-28 relative overflow-hidden">
      {/* Indigo gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #3730A3 0%, #4F46E5 60%, #312E81 100%)",
        }}
        aria-hidden="true"
      />

      {/* Large watermark glyph mark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <GlyphMark size={380} color="rgba(255,255,255,0.04)" showDot={false} />
      </div>

      {/* Subtle grid texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <ScrollReveal>
          <h2 className="font-[family-name:var(--font-dm-sans)] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6">
            Your customers remember how you made them feel.
          </h2>
          <p className="text-indigo-200/80 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Start building loyalty today. First stamper free.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/contact"
              className="cursor-pointer inline-flex items-center justify-center gap-2 bg-white hover:bg-indigo-50 text-[#312E81] font-semibold text-base px-8 py-4 rounded-xl transition-all duration-200 shadow-xl shadow-black/20 min-w-[160px]"
            >
              Book a Demo
            </a>
            <a
              href="/pricing"
              className="cursor-pointer inline-flex items-center justify-center gap-2 bg-transparent border border-white/30 hover:border-white/60 hover:bg-white/10 text-white font-semibold text-base px-8 py-4 rounded-xl transition-all duration-200 min-w-[160px]"
            >
              Start Free
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
