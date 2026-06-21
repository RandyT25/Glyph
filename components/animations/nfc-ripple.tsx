"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface NfcRippleProps {
  className?: string;
}

export default function NfcRipple({ className }: NfcRippleProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      className={cn("overflow-visible", className)}
      aria-hidden="true"
    >
      {/* Outer ripple */}
      <motion.circle
        cx="60"
        cy="60"
        r="24"
        fill="none"
        stroke="#4F46E5"
        strokeWidth="1.5"
        initial={{ scale: 1, opacity: 0.5 }}
        animate={
          shouldReduceMotion
            ? undefined
            : {
                scale: [1, 2.8],
                opacity: [0.5, 0],
              }
        }
        transition={
          shouldReduceMotion
            ? undefined
            : {
                duration: 1.6,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0,
              }
        }
      />
      {/* Middle ripple */}
      <motion.circle
        cx="60"
        cy="60"
        r="24"
        fill="none"
        stroke="#4F46E5"
        strokeWidth="1.5"
        initial={{ scale: 1, opacity: 0.3 }}
        animate={
          shouldReduceMotion
            ? undefined
            : {
                scale: [1, 2.8],
                opacity: [0.3, 0],
              }
        }
        transition={
          shouldReduceMotion
            ? undefined
            : {
                duration: 1.6,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.4,
              }
        }
      />
      {/* Inner ripple */}
      <motion.circle
        cx="60"
        cy="60"
        r="24"
        fill="none"
        stroke="#4F46E5"
        strokeWidth="1.5"
        initial={{ scale: 1, opacity: 0.15 }}
        animate={
          shouldReduceMotion
            ? undefined
            : {
                scale: [1, 2.8],
                opacity: [0.15, 0],
              }
        }
        transition={
          shouldReduceMotion
            ? undefined
            : {
                duration: 1.6,
                repeat: Infinity,
                ease: "easeOut",
                delay: 0.8,
              }
        }
      />
      {/* Center dot */}
      <circle cx="60" cy="60" r="8" fill="#4F46E5" />
      <circle cx="60" cy="60" r="4" fill="#6366F1" />
    </svg>
  );
}
