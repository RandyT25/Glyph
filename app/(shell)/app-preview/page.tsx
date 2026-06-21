"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Wifi, Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import StampProgress from "@/components/animations/stamp-progress";
import NfcRipple from "@/components/animations/nfc-ripple";

type Screen = 0 | 1 | 2 | 3 | 4;

const screenCount = 5;

interface ScreenConfig {
  id: Screen;
  label: string;
}

const screens: ScreenConfig[] = [
  { id: 0, label: "Home" },
  { id: 1, label: "Tap" },
  { id: 2, label: "Stamp Earned" },
  { id: 3, label: "Reward" },
  { id: 4, label: "History" },
];

const historyItems = [
  { date: "Jun 21, 2026", time: "9:14 AM", stamp: 8, location: "Maison Café — Marais" },
  { date: "Jun 19, 2026", time: "8:52 AM", stamp: 7, location: "Maison Café — Marais" },
  { date: "Jun 17, 2026", time: "10:31 AM", stamp: 6, location: "Maison Café — Opera" },
  { date: "Jun 15, 2026", time: "9:03 AM", stamp: 5, location: "Maison Café — Marais" },
  { date: "Jun 12, 2026", time: "8:45 AM", stamp: 4, location: "Maison Café — Marais" },
];

export default function AppPreviewPage() {
  const [currentScreen, setCurrentScreen] = useState<Screen>(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const goTo = (index: Screen) => {
    setDirection(index > currentScreen ? 1 : -1);
    setCurrentScreen(index);
  };

  const next = () => {
    if (currentScreen < screenCount - 1) goTo((currentScreen + 1) as Screen);
  };

  const prev = () => {
    if (currentScreen > 0) goTo((currentScreen - 1) as Screen);
  };

  return (
    <main className="bg-[#09090B] min-h-screen pt-0 pb-20">
      {/* Back to site bar */}
      <div className="bg-[#1E1B4B] border-b border-indigo-700/30 h-8 flex items-center justify-between px-6 sticky top-0 z-50">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-xs text-indigo-300 hover:text-white transition-colors duration-200"
        >
          <ArrowLeft size={11} />
          Back to Glyph.com
        </Link>
        <span className="text-xs text-indigo-500 tracking-wide">App Preview</span>
      </div>
      <div className="pt-20">
      <div className="max-w-2xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block mb-4 text-xs font-semibold uppercase tracking-widest text-[#6366F1] bg-[#4F46E5]/10 px-3 py-1 rounded-full border border-[#4F46E5]/20">
            Customer App Preview
          </span>
          <h1 className="font-[family-name:var(--font-dm-sans)] text-4xl font-bold text-[#F4F4F5] mb-3">
            The customer experience
          </h1>
          <p className="text-[#71717A]">
            Walk through what your customers see — from first tap to reward unlocked.
          </p>
        </div>

        {/* Phone frame */}
        <div className="flex justify-center mb-8">
          <div
            className="relative"
            style={{ width: 360, height: 720 }}
          >
            {/* Frame */}
            <div
              className="absolute inset-0 rounded-[48px] overflow-hidden"
              style={{
                background: "#0C0C0E",
                border: "3px solid #27272A",
                boxShadow:
                  "0 0 0 1px rgba(255,255,255,0.04), 0 40px 100px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.06)",
              }}
            >
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-8 bg-[#09090B] rounded-b-3xl z-20 flex items-center justify-center">
                <div className="w-14 h-2 bg-[#27272A] rounded-full" />
              </div>

              {/* Status bar */}
              <div className="absolute top-10 left-0 right-0 flex items-center justify-between px-8 z-20">
                <span className="text-[10px] text-[#71717A] font-medium">9:41</span>
                <div className="flex items-center gap-1">
                  <Wifi size={10} className="text-[#71717A]" />
                  <div className="flex gap-0.5">
                    {[3, 4, 5, 6].map((h) => (
                      <div
                        key={h}
                        className="w-1 bg-[#71717A] rounded-[1px]"
                        style={{ height: h }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Screen content */}
              <div className="absolute inset-0 pt-20 pb-6 overflow-hidden">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentScreen}
                    custom={direction}
                    initial={{ x: direction * 80, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: direction * -80, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full flex flex-col"
                  >
                    {/* Screen 0: Home */}
                    {currentScreen === 0 && (
                      <div className="flex flex-col px-6 gap-5">
                        <div>
                          <p className="text-xs text-[#52525B] mb-1">Good morning!</p>
                          <h2 className="font-[family-name:var(--font-dm-sans)] text-xl font-bold text-[#F4F4F5]">
                            Your loyalty cards
                          </h2>
                        </div>

                        {/* Card */}
                        <div className="rounded-2xl bg-[#111113] border border-[#27272A] p-5">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <p className="text-xs text-[#52525B] mb-0.5">Active</p>
                              <h3 className="font-[family-name:var(--font-dm-sans)] font-bold text-white">
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
                          <StampProgress filledCount={5} />
                          <p className="text-xs text-[#52525B] mt-3 text-center">5/8 stamps</p>
                        </div>

                        {/* Another card (locked) */}
                        <div className="rounded-2xl bg-[#0C0C0E] border border-dashed border-[#27272A] p-5 flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-[#18181B] flex items-center justify-center">
                            <span className="text-[#52525B] text-lg">+</span>
                          </div>
                          <p className="text-sm text-[#52525B]">Visit a new business to add a card</p>
                        </div>
                      </div>
                    )}

                    {/* Screen 1: Tap */}
                    {currentScreen === 1 && (
                      <div className="flex flex-col items-center justify-center h-full px-6 gap-6">
                        <h2 className="font-[family-name:var(--font-dm-sans)] text-xl font-bold text-[#F4F4F5] text-center">
                          Hold near stamper
                        </h2>
                        <div className="relative flex items-center justify-center">
                          <NfcRipple />
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-[#4F46E5] animate-pulse" />
                          <p className="text-sm text-[#71717A]">Detecting...</p>
                        </div>
                        <p className="text-xs text-[#52525B] text-center max-w-[200px]">
                          Place your phone within 2cm of the Glyph stamper on the counter.
                        </p>
                      </div>
                    )}

                    {/* Screen 2: Stamp earned */}
                    {currentScreen === 2 && (
                      <div className="flex flex-col items-center px-6 gap-5">
                        <motion.div
                          initial={{ scale: 0, rotate: -20 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                          className="w-16 h-16 rounded-2xl bg-[#4F46E5] flex items-center justify-center shadow-xl shadow-indigo-500/30"
                        >
                          <svg width="28" height="28" viewBox="0 0 120 120" fill="none" aria-hidden="true">
                            <line x1="38" y1="14" x2="38" y2="106" stroke="white" strokeWidth="8" strokeLinecap="round" />
                            <line x1="38" y1="60" x2="90" y2="16" stroke="white" strokeWidth="8" strokeLinecap="round" />
                            <line x1="38" y1="60" x2="90" y2="104" stroke="white" strokeWidth="8" strokeLinecap="round" />
                            <circle cx="90" cy="16" r="14" fill="#FCD34D" />
                          </svg>
                        </motion.div>

                        {/* Confetti dots */}
                        <div className="absolute inset-x-0 flex justify-center overflow-hidden pointer-events-none" style={{ top: 120 }} aria-hidden="true">
                          {Array.from({ length: 12 }).map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-2 h-2 rounded-full"
                              style={{
                                background: i % 3 === 0 ? "#4F46E5" : i % 3 === 1 ? "#F59E0B" : "#6366F1",
                                left: `${20 + i * 5}%`,
                              }}
                              initial={{ y: 0, opacity: 1 }}
                              animate={{ y: 80, opacity: 0, x: (i % 2 === 0 ? 1 : -1) * (10 + i * 3) }}
                              transition={{ duration: 0.8, delay: i * 0.05 }}
                            />
                          ))}
                        </div>

                        <div className="text-center">
                          <p className="text-xs text-[#52525B] mb-1">Stamp earned!</p>
                          <h2 className="font-[family-name:var(--font-dm-sans)] text-2xl font-bold text-[#F4F4F5]">
                            Maison Café
                          </h2>
                        </div>

                        <div className="w-full">
                          <StampProgress filledCount={6} />
                          <p className="text-xs text-center text-[#71717A] mt-2">
                            6/8 — 2 more for a free coffee!
                          </p>
                        </div>
                      </div>
                    )}

                    {/* Screen 3: Reward */}
                    {currentScreen === 3 && (
                      <div
                        className="flex flex-col items-center justify-center h-full px-6 gap-5 relative"
                        style={{
                          background: "radial-gradient(ellipse at center, rgba(245,158,11,0.15) 0%, transparent 70%)",
                        }}
                      >
                        <motion.div
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: "spring", stiffness: 200, damping: 15 }}
                          className="text-center"
                        >
                          <div className="text-5xl mb-4">🎉</div>
                          <div className="inline-block bg-[#F59E0B] rounded-2xl px-6 py-2 mb-4">
                            <p className="font-[family-name:var(--font-dm-sans)] text-lg font-black text-[#09090B] tracking-wide">
                              FREE COFFEE UNLOCKED
                            </p>
                          </div>
                          <p className="text-sm text-[#A1A1AA] mb-6">
                            Show this screen to your barista.
                          </p>

                          {/* Redemption code */}
                          <div className="bg-[#111113] border border-[#F59E0B]/30 rounded-xl px-8 py-4 mb-4">
                            <p className="text-xs text-[#52525B] mb-1">Redemption Code</p>
                            <p className="font-mono text-2xl font-bold text-[#F59E0B] tracking-widest">
                              GLYPH-7X4K
                            </p>
                          </div>

                          <p className="text-xs text-[#52525B]">Valid until Jun 28, 2026</p>
                        </motion.div>
                      </div>
                    )}

                    {/* Screen 4: History */}
                    {currentScreen === 4 && (
                      <div className="flex flex-col px-6 gap-4">
                        <h2 className="font-[family-name:var(--font-dm-sans)] text-xl font-bold text-[#F4F4F5]">
                          Visit History
                        </h2>
                        <div className="space-y-3">
                          {historyItems.map((item, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -16 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.06 }}
                              className="flex items-center gap-3 bg-[#111113] rounded-xl border border-[#27272A] px-4 py-3"
                            >
                              <div className="w-8 h-8 rounded-lg bg-[#4F46E5]/15 flex items-center justify-center flex-shrink-0">
                                <Calendar size={14} className="text-[#6366F1]" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-[#F4F4F5]">
                                  Stamp #{item.stamp}
                                </p>
                                <p className="text-[9px] text-[#52525B] truncate">{item.location}</p>
                              </div>
                              <div className="text-right flex-shrink-0">
                                <p className="text-[9px] text-[#52525B]">{item.date}</p>
                                <p className="text-[9px] text-[#3F3F46]">{item.time}</p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Home indicator */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-[#27272A] rounded-full" />
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={prev}
            disabled={currentScreen === 0}
            className="w-11 h-11 rounded-full border border-[#27272A] bg-[#111113] flex items-center justify-center text-[#71717A] hover:text-white hover:border-[#4F46E5] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
            aria-label="Previous screen"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Step indicators */}
          <div className="flex items-center gap-2">
            {screens.map((s) => (
              <button
                key={s.id}
                onClick={() => goTo(s.id)}
                className={[
                  "transition-all duration-300 rounded-full cursor-pointer",
                  s.id === currentScreen
                    ? "w-8 h-2 bg-[#4F46E5]"
                    : "w-2 h-2 bg-[#27272A] hover:bg-[#52525B]",
                ].join(" ")}
                aria-label={s.label}
              />
            ))}
          </div>

          <button
            onClick={next}
            disabled={currentScreen === screenCount - 1}
            className="w-11 h-11 rounded-full border border-[#27272A] bg-[#111113] flex items-center justify-center text-[#71717A] hover:text-white hover:border-[#4F46E5] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 cursor-pointer"
            aria-label="Next screen"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Screen label */}
        <div className="text-center mt-4">
          <p className="text-xs text-[#52525B]">
            {currentScreen + 1} / {screenCount} — {screens[currentScreen].label}
          </p>
        </div>
      </div>
      </div>
    </main>
  );
}
