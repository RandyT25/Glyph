"use client";

import { TrendingUp, Users, Star, ArrowRightLeft } from "lucide-react";
import ScrollReveal from "@/components/animations/scroll-reveal";
import PhoneMockup from "@/components/animations/phone-mockup";
import { slideLeft, slideRight } from "@/lib/motion";

const merchantStats = [
  { label: "Active Members", value: "2,847", icon: Users, color: "#4F46E5" },
  { label: "Stamps Today", value: "143", icon: Star, color: "#F59E0B" },
  { label: "Retention", value: "94%", icon: TrendingUp, color: "#10B981" },
  { label: "Top Customer", value: "Sophie L.", icon: Star, color: "#F59E0B" },
];

export default function PhoneShowcase() {
  return (
    <section className="py-28 bg-[#09090B]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section label */}
        <div className="text-center mb-16">
          <span className="inline-block mb-4 text-xs font-semibold uppercase tracking-widest text-[#6366F1] bg-[#4F46E5]/10 px-3 py-1 rounded-full border border-[#4F46E5]/20">
            Platform
          </span>
          <h2 className="font-[family-name:var(--font-dm-sans)] text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F4F4F5] leading-tight">
            One platform.{" "}
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(135deg, #6366F1, #F59E0B)",
              }}
            >
              Both sides.
            </span>
          </h2>
          <p className="mt-4 text-[#71717A] max-w-xl mx-auto">
            Merchants get a powerful dashboard. Customers get a beautiful loyalty experience. Everyone wins.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Merchant dashboard mockup */}
          <ScrollReveal variants={slideLeft}>
            <div className="rounded-2xl border border-[#27272A] bg-[#111113] p-6 h-full">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-xs text-[#52525B] uppercase tracking-widest mb-1">Merchant View</p>
                  <h3 className="font-[family-name:var(--font-dm-sans)] font-bold text-white text-lg">
                    Maison Café Dashboard
                  </h3>
                </div>
                <span className="text-xs text-[#10B981] bg-[#10B981]/10 border border-[#10B981]/20 px-2 py-1 rounded-full font-medium">
                  Live
                </span>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {merchantStats.map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <div
                      key={stat.label}
                      className="bg-[#09090B] rounded-xl p-4 border border-[#27272A]"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Icon size={12} style={{ color: stat.color }} />
                        <span className="text-[10px] text-[#52525B] uppercase tracking-wide">
                          {stat.label}
                        </span>
                      </div>
                      <p className="font-[family-name:var(--font-dm-sans)] font-bold text-lg text-white">
                        {stat.value}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Activity bar chart */}
              <div className="bg-[#09090B] rounded-xl p-4 border border-[#27272A]">
                <p className="text-[10px] text-[#52525B] uppercase tracking-widest mb-4">
                  Stamps This Week
                </p>
                <div className="flex items-end gap-2 h-20">
                  {[40, 65, 45, 80, 70, 95, 60].map((height, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t-sm transition-all duration-500"
                      style={{
                        height: `${height}%`,
                        background:
                          i === 5
                            ? "#4F46E5"
                            : "linear-gradient(to top, #27272A, #3F3F46)",
                      }}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-2">
                  {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                    <span key={i} className="text-[9px] text-[#52525B] flex-1 text-center">
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Separator */}
          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 flex-col items-center gap-2 pointer-events-none">
            <div className="w-px h-16 bg-[#27272A]" />
            <div className="w-8 h-8 rounded-full border border-[#27272A] bg-[#09090B] flex items-center justify-center">
              <ArrowRightLeft size={14} className="text-[#52525B]" />
            </div>
            <div className="w-px h-16 bg-[#27272A]" />
          </div>

          {/* Customer phone */}
          <ScrollReveal variants={slideRight}>
            <div className="flex flex-col items-center gap-4">
              <p className="text-xs text-[#52525B] uppercase tracking-widest">Customer View</p>
              <PhoneMockup />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
