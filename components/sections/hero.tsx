"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Badge from "@/components/common/badge";
import PhoneMockup from "@/components/animations/phone-mockup";
import NfcRipple from "@/components/animations/nfc-ripple";
import { stagger, fadeUp } from "@/lib/motion";

const stats = [
  { value: "500+", label: "Businesses" },
  { value: "2.4M", label: "Stamps Issued" },
  { value: "94%", label: "Avg Retention" },
];

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-screen flex flex-col bg-[#09090B]">
      {/* Aurora background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="aurora-1 absolute rounded-full"
          style={{
            width: 700,
            height: 700,
            left: "10%",
            top: "-10%",
            background: "radial-gradient(ellipse at center, rgba(79,70,229,0.12) 0%, transparent 70%)",
          }}
        />
        <div
          className="aurora-2 absolute rounded-full"
          style={{
            width: 600,
            height: 600,
            right: "5%",
            bottom: "-5%",
            background: "radial-gradient(ellipse at center, rgba(139,92,246,0.08) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex items-center pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: content */}
            <motion.div
              variants={shouldReduceMotion ? {} : stagger}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-6"
            >
              {/* Badge */}
              <motion.div variants={shouldReduceMotion ? {} : fadeUp}>
                <Badge variant="indigo">NFC-Powered Loyalty</Badge>
              </motion.div>

              {/* H1 */}
              <motion.h1
                variants={shouldReduceMotion ? {} : fadeUp}
                className="font-[family-name:var(--font-dm-sans)] text-5xl sm:text-6xl lg:text-7xl font-bold text-[#F4F4F5] leading-[1.05] tracking-tight"
              >
                Turn Every Visit{" "}
                <span className="text-transparent bg-clip-text"
                  style={{
                    backgroundImage: "linear-gradient(135deg, #6366F1 0%, #4F46E5 50%, #F59E0B 100%)",
                  }}
                >
                  Into Loyalty.
                </span>
              </motion.h1>

              {/* Subheadline */}
              <motion.p
                variants={shouldReduceMotion ? {} : fadeUp}
                className="text-lg text-[#71717A] leading-relaxed max-w-lg"
              >
                Replace paper stamp cards with beautiful NFC-powered digital rewards. Zero friction for customers. Full insight for you.
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                variants={shouldReduceMotion ? {} : fadeUp}
                className="flex flex-col sm:flex-row gap-3 mt-2"
              >
                <Link
                  href="/contact"
                  className="cursor-pointer inline-flex items-center justify-center gap-2 bg-[#4F46E5] hover:bg-[#6366F1] text-white font-semibold text-sm px-6 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40"
                >
                  Book Demo
                </Link>
                <Link
                  href="/pricing"
                  className="cursor-pointer inline-flex items-center justify-center gap-2 bg-transparent border border-[#27272A] hover:border-[#4F46E5] text-[#F4F4F5] hover:text-white font-semibold text-sm px-6 py-3.5 rounded-xl transition-all duration-200"
                >
                  Start Free
                </Link>
              </motion.div>

              {/* Stats row */}
              <motion.div
                variants={shouldReduceMotion ? {} : fadeUp}
                className="flex items-center gap-8 pt-2"
              >
                {stats.map((stat, i) => (
                  <div key={stat.label}>
                    {i > 0 && (
                      <span className="sr-only">/</span>
                    )}
                    <div className="flex flex-col">
                      <span className="font-[family-name:var(--font-dm-sans)] font-bold text-xl text-[#F4F4F5]">
                        {stat.value}
                      </span>
                      <span className="text-xs text-[#71717A]">{stat.label}</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: phone animation */}
            <div className="flex flex-col items-center justify-center relative pb-20 overflow-visible">
              <motion.div
                initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative overflow-visible"
              >
                <PhoneMockup />
                {/* NFC ripple at phone bottom */}
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2">
                  <NfcRipple />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll chevron */}
      <div className="relative z-10 flex justify-center pb-8">
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-[#3F3F46]"
          aria-hidden="true"
        >
          <ChevronDown size={24} />
        </motion.div>
      </div>
    </section>
  );
}
