"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import GlyphMark from "@/components/common/glyph-mark";
import PhoneDemo from "@/components/demo/phone-demo";
import DashboardDemo from "@/components/demo/dashboard-demo";
import DemoTabs from "@/components/demo/demo-tabs";
import HowItWorksSteps from "@/components/demo/how-it-works-steps";

type DemoTab = "customer" | "merchant";

export default function DemoPage() {
  const [tab, setTab] = useState<DemoTab>("customer");

  return (
    <div className="min-h-screen bg-[#09090B]">
      {/* Top bar */}
      <div className="sticky top-0 z-50 bg-[#09090B]/80 backdrop-blur-md border-b border-[#27272A] px-6 py-3 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm text-[#71717A] hover:text-white transition-colors duration-200 cursor-pointer"
        >
          <ArrowLeft size={15} />
          Back to Glyph.com
        </Link>
        <div className="flex items-center gap-2">
          <GlyphMark size={20} />
          <span className="text-xs font-bold text-[#71717A] uppercase tracking-widest">Interactive Demo</span>
        </div>
        <Link
          href="/contact"
          className="text-sm font-semibold text-white bg-[#4F46E5] hover:bg-[#6366F1] px-4 py-2 rounded-xl transition-colors duration-200 cursor-pointer"
        >
          Book Demo
        </Link>
      </div>

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center pt-14 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-[#4F46E5]/10 border border-[#4F46E5]/20 rounded-full px-4 py-1.5 mb-6"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#4F46E5] animate-pulse" />
            <span className="text-xs font-semibold text-[#6366F1] uppercase tracking-widest">Live Demo</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.07 }}
            className="font-[family-name:var(--font-dm-sans)] text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight"
          >
            See Glyph in action
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.14 }}
            className="text-lg text-[#71717A] max-w-xl mx-auto leading-relaxed"
          >
            Walk through the full experience — from the customer&apos;s first tap to the merchant&apos;s analytics dashboard.
          </motion.p>
        </div>

        {/* Tab switcher */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-lg mx-auto mb-12"
        >
          <DemoTabs active={tab} onChange={(t) => setTab(t)} />
        </motion.div>

        {/* Demo content */}
        <AnimatePresence mode="wait">
          {tab === "customer" ? (
            <motion.div
              key="customer"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex justify-center mb-16"
            >
              <PhoneDemo />
            </motion.div>
          ) : (
            <motion.div
              key="merchant"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex justify-center mb-16"
            >
              <DashboardDemo />
            </motion.div>
          )}
        </AnimatePresence>

        {/* How it works */}
        <HowItWorksSteps />

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center py-16"
        >
          <div className="bg-[#111113] border border-[#27272A] rounded-3xl p-10 max-w-2xl mx-auto">
            <GlyphMark size={48} className="mx-auto mb-5" />
            <h2 className="font-[family-name:var(--font-dm-sans)] text-3xl font-bold text-white mb-3">
              Ready to start?
            </h2>
            <p className="text-[#71717A] mb-8 leading-relaxed">
              Set up your first loyalty campaign in under 5 minutes. No hardware needed to start — your first NFC stamper ships within 48 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[#4F46E5] hover:bg-[#6366F1] text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/25 cursor-pointer"
              >
                Book a live demo
              </Link>
              <Link
                href="/pricing"
                className="inline-flex items-center justify-center gap-2 bg-transparent border border-[#27272A] hover:border-[#4F46E5] text-[#F4F4F5] font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 cursor-pointer"
              >
                See pricing
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
