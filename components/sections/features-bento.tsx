"use client";

import { useState } from "react";
import {
  Nfc,
  QrCode,
  BarChart3,
  MapPin,
  Bell,
  Users,
  Gift,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import ScrollReveal from "@/components/animations/scroll-reveal";
import SectionHeader from "@/components/common/section-header";
import { FEATURES } from "@/lib/constants";
import { scaleIn } from "@/lib/motion";

const iconMap: Record<string, LucideIcon> = {
  Nfc,
  QrCode,
  BarChart3,
  MapPin,
  Bell,
  Users,
  Gift,
  Wallet,
};

export default function FeaturesBento() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="py-28 bg-[#09090B]">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeader
            label="Features"
            title={
              <>
                Everything you need to build{" "}
                <span
                  className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage: "linear-gradient(135deg, #6366F1, #4F46E5)",
                  }}
                >
                  loyal customers
                </span>
              </>
            }
            description="From tap to reward — every tool to run a premium loyalty program."
          />
        </ScrollReveal>

        {/* Features grid — 4 per row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((feature, i) => {
            const Icon = iconMap[feature.icon] ?? Nfc;
            const isHovered = hoveredId === feature.id;

            return (
              <ScrollReveal
                key={feature.id}
                variants={scaleIn}
                delay={i * 0.05}
                className="col-span-1"
              >
                <div
                  onMouseEnter={() => setHoveredId(feature.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={[
                    "group relative rounded-2xl p-6 h-full cursor-default",
                    "bg-white/[0.02] border border-white/[0.06]",
                    "transition-all duration-300",
                    isHovered
                      ? "border-[#4F46E5]/40 shadow-lg shadow-indigo-500/10 bg-white/[0.04]"
                      : "",
                  ].join(" ")}
                >
                  {/* Subtle glow on hover */}
                  {isHovered && (
                    <div
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      style={{
                        boxShadow: "inset 0 0 40px rgba(79,70,229,0.05)",
                      }}
                      aria-hidden="true"
                    />
                  )}

                  {/* Icon */}
                  <div className="w-10 h-10 rounded-xl bg-[#4F46E5]/15 border border-[#4F46E5]/20 flex items-center justify-center mb-5">
                    <Icon size={18} className="text-[#6366F1]" />
                  </div>

                  {/* Content */}
                  <h3 className="font-[family-name:var(--font-dm-sans)] font-semibold text-[#F4F4F5] text-base mb-2 group-hover:text-white transition-colors duration-200">
                    {feature.title}
                  </h3>
                  <p className="text-[#71717A] text-sm leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Corner accent */}
                  <div
                    className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-[#4F46E5] opacity-30 group-hover:opacity-70 transition-opacity duration-300"
                    aria-hidden="true"
                  />
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
