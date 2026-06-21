"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StampProgressProps {
  filledCount?: number;
  animated?: boolean;
  className?: string;
}

// Inline small Glyph mark for stamps
function SmallGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <line x1="38" y1="14" x2="38" y2="106" stroke="white" strokeWidth="7" strokeLinecap="round" />
      <line x1="38" y1="60" x2="90" y2="16" stroke="white" strokeWidth="7" strokeLinecap="round" />
      <line x1="38" y1="60" x2="90" y2="104" stroke="white" strokeWidth="7" strokeLinecap="round" />
      <circle cx="90" cy="16" r="12" fill="#FCD34D" />
    </svg>
  );
}

export default function StampProgress({
  filledCount = 0,
  animated = false,
  className,
}: StampProgressProps) {
  const shouldReduceMotion = useReducedMotion();
  const [displayCount, setDisplayCount] = useState(animated ? 0 : filledCount);
  const allFilled = displayCount >= 8;

  useEffect(() => {
    if (!animated || shouldReduceMotion) {
      setDisplayCount(filledCount);
      return;
    }

    let count = 0;
    setDisplayCount(0);

    const interval = setInterval(() => {
      count += 1;
      setDisplayCount(count);
      if (count >= 8) {
        clearInterval(interval);
        // After 1s pause, reset and loop
        setTimeout(() => {
          setDisplayCount(0);
        }, 1000);
      }
    }, 500);

    return () => clearInterval(interval);
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
            style={{
              boxShadow: "0 0 32px 8px rgba(245,158,11,0.25)",
            }}
          />
        )}
      </AnimatePresence>

      <div className="grid grid-cols-4 gap-2">
        {Array.from({ length: 8 }).map((_, i) => {
          const filled = i < displayCount;
          return (
            <div
              key={i}
              className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300",
                filled
                  ? "bg-[#4F46E5] shadow-lg shadow-indigo-500/30"
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
    </div>
  );
}
