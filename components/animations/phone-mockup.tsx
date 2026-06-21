"use client";

import { motion, useReducedMotion } from "framer-motion";
import { floatY } from "@/lib/motion";
import StampProgress from "./stamp-progress";

interface PhoneMockupProps {
  className?: string;
}

export default function PhoneMockup({ className }: PhoneMockupProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      animate={shouldReduceMotion ? undefined : floatY.animate}
      style={{ width: 260 }}
    >
      {/* Phone frame */}
      <div
        className="relative rounded-[36px] overflow-hidden"
        style={{
          background: "#111113",
          border: "2px solid #27272A",
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.04), 0 32px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.06)",
          width: 260,
          height: 520,
        }}
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-7 bg-[#09090B] rounded-b-2xl z-10 flex items-center justify-center">
          <div className="w-12 h-1.5 bg-[#27272A] rounded-full" />
        </div>

        {/* Screen */}
        <div className="absolute inset-0 bg-[#09090B] pt-10 flex flex-col">
          {/* Status bar */}
          <div className="flex items-center justify-between px-6 pt-2 pb-1 text-[10px] text-[#71717A]">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-2 border border-[#71717A] rounded-[2px] relative">
                <div className="absolute inset-0.5 bg-[#71717A] w-2/3 rounded-[1px]" />
              </div>
            </div>
          </div>

          {/* Card content */}
          <div className="flex-1 flex flex-col px-5 pt-3 pb-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <p className="text-[10px] text-[#71717A] mb-0.5">Your loyalty card</p>
                <h3 className="text-white font-[family-name:var(--font-dm-sans)] font-bold text-base leading-tight">
                  Maison Café
                </h3>
              </div>
              <div className="w-8 h-8 rounded-full bg-[#4F46E5]/20 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 120 120" fill="none" aria-hidden="true">
                  <line x1="38" y1="14" x2="38" y2="106" stroke="#6366F1" strokeWidth="8" strokeLinecap="round" />
                  <line x1="38" y1="60" x2="90" y2="16" stroke="#6366F1" strokeWidth="8" strokeLinecap="round" />
                  <line x1="38" y1="60" x2="90" y2="104" stroke="#6366F1" strokeWidth="8" strokeLinecap="round" />
                  <circle cx="90" cy="16" r="12" fill="#F59E0B" />
                </svg>
              </div>
            </div>

            {/* Stamp progress */}
            <div className="bg-[#111113] rounded-2xl p-4 border border-[#27272A] mb-4">
              <StampProgress filledCount={7} animated={false} rewardLabel="Free Coffee" />
            </div>

            {/* Progress label */}
            <div className="bg-[#4F46E5]/10 border border-[#4F46E5]/20 rounded-xl px-4 py-3 mb-4">
              <p className="text-[#6366F1] text-xs font-semibold text-center">
                7 / 9 stamps — 2 more for your free coffee!
              </p>
            </div>

            {/* Member since */}
            <div className="flex items-center justify-between text-[10px] text-[#52525B] mt-auto">
              <span>Member since Jan 2026</span>
              <span>Visits: 23</span>
            </div>
          </div>

          {/* Bottom nav bar */}
          <div className="flex items-center justify-around px-6 py-4 border-t border-[#111113] bg-[#09090B]">
            {["Home", "Cards", "History", "Profile"].map((tab) => (
              <div key={tab} className="flex flex-col items-center gap-1">
                <div className={[
                  "w-5 h-1 rounded-full",
                  tab === "Cards" ? "bg-[#4F46E5]" : "bg-[#27272A]"
                ].join(" ")} />
                <span className={[
                  "text-[8px]",
                  tab === "Cards" ? "text-[#6366F1]" : "text-[#52525B]"
                ].join(" ")}>
                  {tab}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
