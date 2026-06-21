"use client";

import ScrollReveal from "@/components/animations/scroll-reveal";
import SectionHeader from "@/components/common/section-header";
import { TESTIMONIALS } from "@/lib/constants";
import { scaleIn } from "@/lib/motion";

export default function Testimonials() {
  return (
    <section className="py-28 bg-[#09090B]">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeader
            label="Social Proof"
            title={
              <>
                Real businesses.{" "}
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage: "linear-gradient(135deg, #6366F1, #4F46E5)",
                  }}
                >
                  Real results.
                </span>
              </>
            }
            description="Hear from business owners who replaced paper stamp cards with Glyph."
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial, i) => (
            <ScrollReveal key={testimonial.name} variants={scaleIn} delay={i * 0.1}>
              <div className="relative rounded-2xl p-7 bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.1] transition-all duration-300 h-full flex flex-col">
                {/* Large quote mark */}
                <div
                  className="absolute top-5 right-6 font-[family-name:var(--font-dm-sans)] text-7xl font-bold text-[#4F46E5] leading-none select-none"
                  style={{ opacity: 0.15 }}
                  aria-hidden="true"
                >
                  &ldquo;
                </div>

                {/* Quote text */}
                <blockquote className="text-sm text-[#A1A1AA] leading-relaxed flex-1 mb-6 relative z-10">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-[#4F46E5]/20 border border-[#4F46E5]/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-xs font-bold text-[#6366F1]">
                      {testimonial.avatar}
                    </span>
                  </div>

                  {/* Name + role */}
                  <div>
                    <p className="text-sm font-semibold text-[#F4F4F5]">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-[#52525B]">
                      {testimonial.role} &middot; {testimonial.business}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
