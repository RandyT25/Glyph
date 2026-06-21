"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import ScrollReveal from "@/components/animations/scroll-reveal";
import SectionHeader from "@/components/common/section-header";
import { PRICING_TIERS } from "@/lib/constants";
import { scaleIn } from "@/lib/motion";

export default function PricingTeaser() {
  return (
    <section className="py-28 bg-[#09090B]">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeader
            label="Pricing"
            title="Simple, transparent pricing"
            description="Start free. Grow on your own terms. No long-term contracts."
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {PRICING_TIERS.map((tier, i) => (
            <ScrollReveal key={tier.name} variants={scaleIn} delay={i * 0.1}>
              <div
                className={[
                  "relative rounded-2xl p-7 h-full flex flex-col transition-all duration-300",
                  tier.highlighted
                    ? "bg-[#111113] border-2 border-[#4F46E5] shadow-xl shadow-indigo-500/15"
                    : "bg-white/[0.02] border border-white/[0.06]",
                ].join(" ")}
              >
                {/* Popular badge */}
                {tier.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-[#4F46E5] text-white text-xs font-bold px-4 py-1.5 rounded-full tracking-wide shadow-lg shadow-indigo-500/30">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Tier name */}
                <div className="mb-6">
                  <h3 className="font-[family-name:var(--font-dm-sans)] font-bold text-[#F4F4F5] text-xl mb-1">
                    {tier.name}
                  </h3>
                  <p className="text-xs text-[#52525B] leading-relaxed">
                    {tier.description}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-8">
                  {tier.price.monthly === null ? (
                    <p className="font-[family-name:var(--font-dm-sans)] text-3xl font-bold text-[#F4F4F5]">
                      Custom
                    </p>
                  ) : tier.price.monthly === 0 ? (
                    <p className="font-[family-name:var(--font-dm-sans)] text-3xl font-bold text-[#F4F4F5]">
                      Free
                    </p>
                  ) : (
                    <div className="flex items-end gap-1">
                      <span className="text-[#52525B] text-sm mt-1">$</span>
                      <span className="font-[family-name:var(--font-dm-sans)] text-4xl font-bold text-[#F4F4F5]">
                        {tier.price.monthly}
                      </span>
                      <span className="text-[#52525B] text-sm mb-1">/mo</span>
                    </div>
                  )}
                </div>

                {/* Features */}
                <ul className="flex flex-col gap-3 mb-4 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className="w-4 h-4 rounded-full bg-[#4F46E5]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check size={10} className="text-[#6366F1]" />
                      </div>
                      <span className="text-sm text-[#A1A1AA]">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Add-on note */}
                {"addOnNote" in tier && tier.addOnNote && (
                  <p className="text-xs text-[#F59E0B]/70 italic mb-5 leading-relaxed">
                    ★ {tier.addOnNote as string}
                  </p>
                )}

                {/* CTA */}
                <Link
                  href={tier.price.monthly === null ? "/contact" : "/pricing"}
                  className={[
                    "cursor-pointer inline-flex items-center justify-center w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200",
                    tier.highlighted
                      ? "bg-[#4F46E5] hover:bg-[#6366F1] text-white shadow-lg shadow-indigo-500/25"
                      : "bg-transparent border border-[#27272A] hover:border-[#4F46E5] text-[#F4F4F5]",
                  ].join(" ")}
                >
                  {tier.cta}
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Link to full pricing */}
        <div className="text-center">
          <Link
            href="/pricing"
            className="text-sm text-[#52525B] hover:text-[#4F46E5] transition-colors duration-200 inline-flex items-center gap-1"
          >
            Full pricing details &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
