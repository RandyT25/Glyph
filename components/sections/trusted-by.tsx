"use client";

import { TRUSTED_BY } from "@/lib/constants";

export default function TrustedBy() {
  // Double for seamless loop
  const items = [...TRUSTED_BY, ...TRUSTED_BY];

  return (
    <section className="py-16 bg-[#09090B] border-t border-white/[0.04] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 mb-10 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#52525B]">
          Trusted by 500+ businesses worldwide
        </p>
      </div>

      {/* Marquee container */}
      <div className="relative">
        {/* Fade edges */}
        <div
          className="absolute inset-y-0 left-0 z-10 w-24 pointer-events-none"
          style={{
            background: "linear-gradient(to right, #09090B, transparent)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-y-0 right-0 z-10 w-24 pointer-events-none"
          style={{
            background: "linear-gradient(to left, #09090B, transparent)",
          }}
          aria-hidden="true"
        />

        <div className="flex">
          <div
            className="animate-marquee flex items-center gap-12 whitespace-nowrap"
            style={{ willChange: "transform" }}
            aria-hidden="true"
          >
            {items.map((name, i) => (
              <span
                key={`${name}-${i}`}
                className="flex items-center gap-3 text-sm font-medium text-[#52525B] hover:text-[#71717A] transition-colors duration-200"
              >
                <span
                  className="w-1 h-1 rounded-full bg-[#27272A] inline-block"
                  aria-hidden="true"
                />
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
