"use client";

import { Layers, Nfc, Stamp, Gift } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import ScrollReveal from "@/components/animations/scroll-reveal";
import SectionHeader from "@/components/common/section-header";
import { HOW_IT_WORKS_STEPS } from "@/lib/constants";
import { slideLeft, slideRight } from "@/lib/motion";

const iconMap: Record<string, LucideIcon> = {
  Layers,
  Nfc,
  Stamp,
  Gift,
};

export default function HowItWorks() {
  return (
    <section className="py-28 bg-[#09090B]">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeader
            label="Process"
            title="How It Works"
            description="Four steps from setup to reward. No complexity, no friction."
          />
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-[calc(50%-1px)] top-0 bottom-0 w-px bg-[#27272A] hidden lg:block"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-16">
            {HOW_IT_WORKS_STEPS.map((step, index) => {
              const Icon = iconMap[step.icon] ?? Layers;
              const isLeft = index % 2 === 0;
              const variant = isLeft ? slideLeft : slideRight;

              return (
                <div
                  key={step.step}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
                >
                  {/* Left side */}
                  <ScrollReveal
                    variants={variant}
                    className={isLeft ? "order-1" : "order-1 lg:order-2"}
                  >
                    <div
                      className={[
                        "flex items-start gap-6",
                        isLeft ? "" : "lg:justify-end lg:text-right",
                      ].join(" ")}
                    >
                      {/* Icon */}
                      <div
                        className={[
                          "flex-shrink-0",
                          isLeft ? "" : "lg:order-2",
                        ].join(" ")}
                      >
                        <div
                          className={[
                            "w-14 h-14 rounded-2xl flex items-center justify-center",
                            index === 0
                              ? "bg-[#4F46E5] ring-4 ring-[#4F46E5]/20 shadow-lg shadow-indigo-500/30"
                              : "bg-[#18181B] border border-[#27272A]",
                          ].join(" ")}
                        >
                          <Icon
                            size={24}
                            className={
                              index === 0 ? "text-white" : "text-[#4F46E5]"
                            }
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <div className={isLeft ? "" : "lg:text-right"}>
                        <div className="text-xs font-bold text-[#4F46E5] mb-2 tracking-widest uppercase">
                          Step {step.step}
                        </div>
                        <h3 className="font-[family-name:var(--font-dm-sans)] text-xl font-bold text-[#F4F4F5] mb-3">
                          {step.title}
                        </h3>
                        <p className="text-[#71717A] leading-relaxed text-sm max-w-xs">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>

                  {/* Right side — center node on desktop */}
                  <div
                    className={[
                      "hidden lg:flex items-center justify-center",
                      isLeft ? "order-2" : "order-1",
                    ].join(" ")}
                  >
                    {/* Step node */}
                    <div className="relative z-10 w-12 h-12 rounded-full border-2 border-[#27272A] bg-[#09090B] flex items-center justify-center">
                      <span className="font-[family-name:var(--font-dm-sans)] font-bold text-sm text-[#52525B]">
                        {step.step}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
