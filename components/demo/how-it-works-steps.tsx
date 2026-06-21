"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Layers, Nfc, Gift } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Layers,
    title: "Create your campaign",
    desc: "Set up a stamp card, points system or tiered reward in under 5 minutes. No technical skill required.",
    color: "#4F46E5",
  },
  {
    number: "02",
    icon: Nfc,
    title: "Customer taps the stamper",
    desc: "NFC stamper sits on your counter. Customer taps their phone. A digital stamp appears instantly.",
    color: "#6366F1",
  },
  {
    number: "03",
    icon: Gift,
    title: "Reward unlocks",
    desc: "When the card is complete, the reward unlocks automatically. Amber glow. They come back because it felt earned.",
    color: "#F59E0B",
  },
];

export default function HowItWorksSteps() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="py-16 border-t border-[#18181B]">
      <div className="text-center mb-12">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-xs font-semibold uppercase tracking-widest text-[#4F46E5] mb-3"
        >
          How it works
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="font-[family-name:var(--font-dm-sans)] text-3xl font-bold text-white"
        >
          Three steps from nothing to loyal customer
        </motion.h2>
      </div>

      <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Connecting lines (desktop only) */}
        <div className="hidden md:block absolute top-10 left-[calc(33.3%-1px)] right-[calc(33.3%-1px)] h-px">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="h-full bg-gradient-to-r from-[#4F46E5]/40 via-[#6366F1]/40 to-[#F59E0B]/40 origin-left"
          />
        </div>

        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative bg-[#111113] border border-[#27272A] rounded-2xl p-6 hover:border-[#3F3F46] transition-colors duration-200"
          >
            <div className="flex items-start gap-4 mb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${step.color}15` }}
              >
                <step.icon size={22} style={{ color: step.color }} />
              </div>
              <span
                className="text-5xl font-bold font-[family-name:var(--font-dm-sans)] leading-none mt-1 select-none"
                style={{ color: `${step.color}20` }}
              >
                {step.number}
              </span>
            </div>
            <h3 className="font-[family-name:var(--font-dm-sans)] text-lg font-bold text-white mb-2">
              {step.title}
            </h3>
            <p className="text-sm text-[#71717A] leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
