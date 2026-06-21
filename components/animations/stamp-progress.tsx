"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StampProgressProps {
  filledCount?: number;
  animated?: boolean;
  className?: string;
  rewardLabel?: string;
}

function SmallGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <line x1="38" y1="14" x2="38" y2="106" stroke="white" strokeWidth="8" strokeLinecap="round" />
      <line x1="38" y1="60" x2="90" y2="16" stroke="white" strokeWidth="8" strokeLinecap="round" />
      <line x1="38" y1="60" x2="90" y2="104" stroke="white" strokeWidth="8" strokeLinecap="round" />
      <circle cx="90" cy="16" r="14" fill="#FCD34D" />
    </svg>
  );
}

const TOTAL_STAMPS = 9;

export default function StampProgress({
  filledCount = 0,
  animated = false,
  className,
  rewardLabel = "Free Coffee",
}: StampProgressProps) {
  const shouldReduceMotion = useReducedMotion();
  const [displayCount, setDisplayCount] = useState(animated ? 0 : filledCount);
  const allFilled = displayCount >= TOTAL_STAMPS;

  useEffect(() => {
    if (!animated || shouldReduceMotion) {
      setDisplayCount(filledCount);
      return;
    }

    let count = 0;
    setDisplayCount(0);

    const fill = setInterval(() => {
      count += 1;
      setDisplayCount(count);
      if (count >= TOTAL_STAMPS) {
        clearInterval(fill);
        setTimeout(() => setDisplayCount(0), 1200);
      }
    }, 450);

    return () => clearInterval(fill);
  }, [animated, filledCount, shouldReduceMotion]);

  return (
    <div className={cn("relative", className)}>
      {/* Amber glow when all filled */}
      <AnimatePresence>
        {allFilled && !shouldReduceMotion && (
          <motion.div
            className="absolute inset-0 rounded-xl pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ boxShadow: "0 0 40px 10px rgba(245,158,11,0.2)" }}
          />
        )}
      </AnimatePresence>

      {/* 9 stamp slots — 3 per row */}
      <div className="grid grid-cols-3 gap-2 mb-2">
        {Array.from({ length: TOTAL_STAMPS }).map((_, i) => {
          const filled = i < displayCount;
          return (
            <div
              key={i}
              className={cn(
                "w-full aspect-square rounded-lg flex items-center justify-center transition-all duration-300",
                filled
                  ? "bg-[#4F46E5] shadow-md shadow-indigo-500/30"
                  : "border-2 border-dashed border-[#27272A]"
              )}
            >
              <AnimatePresence>
                {filled && (
                  <motion.div
                    key={`stamp-${i}`}
                    initial={shouldReduceMotion ? {} : { scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <SmallGlyph />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* 10th slot — reward row (full width) */}
      <motion.div
        animate={allFilled ? { scale: [1, 1.02, 1] } : { scale: 1 }}
        transition={{ duration: 0.4, repeat: allFilled ? 2 : 0 }}
        className={cn(
          "w-full rounded-lg px-3 py-2.5 flex items-center justify-center gap-2 border-2 transition-all duration-500",
          allFilled
            ? "bg-[#F59E0B]/15 border-[#F59E0B]/60 shadow-lg shadow-amber-500/20"
            : "border-dashed border-[#27272A]"
        )}
      >
        {allFilled ? (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#F59E0B" />
            </svg>
            <span className="text-[#F59E0B] text-xs font-bold tracking-wide uppercase">{rewardLabel} Unlocked!</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#F59E0B" />
            </svg>
          </>
        ) : (
          <span className="text-[#52525B] text-xs font-medium tracking-wide">
            {TOTAL_STAMPS - displayCount > 0
              ? `${TOTAL_STAMPS - displayCount} more stamp${TOTAL_STAMPS - displayCount > 1 ? "s" : ""} → ${rewardLabel}`
              : rewardLabel}
          </span>
        )}
      </motion.div>
    </div>
  );
}
