"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Wifi, Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import StampProgress from "@/components/animations/stamp-progress";

type Screen = 0 | 1 | 2 | 3 | 4;

const screenCount = 5;

interface ScreenConfig {
  id: Screen;
  label: string;
}

const screens: ScreenConfig[] = [
  { id: 0, label: "Home" },
  { id: 1, label: "Stamp Picker" },
  { id: 2, label: "Stamps Added" },
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

                    {/* Screen 1: Stamp Picker */}
                    {currentScreen === 1 && (
                      <div className="flex flex-col items-center justify-center h-full px-8 gap-6">
                        <div className="text-center">
                          <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#52525B] mb-1">Collect stamps</p>
                          <h2 className="font-[family-name:var(--font-dm-sans)] text-xl font-bold text-[#F4F4F5]">How many today?</h2>
                        </div>

                        <div className="flex items-center justify-center gap-5">
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ border: "1px solid rgba(99,102,241,0.22)", background: "rgba(79,70,229,0.06)" }}>
                            <svg width="14" height="2" viewBox="0 0 14 2" fill="none" aria-hidden="true"><line x1="0.5" y1="1" x2="13.5" y2="1" stroke="#7B75F0" strokeWidth="2" strokeLinecap="round"/></svg>
                          </div>

                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="w-[120px] h-[120px] rounded-[26px] flex flex-col items-center justify-center gap-1.5"
                            style={{ background: "linear-gradient(145deg, #1e1b4b 0%, #0f0e1e 100%)", border: "1px solid rgba(99,102,241,0.2)", boxShadow: "0 8px 32px rgba(79,70,229,0.25)" }}
                          >
                            <svg width="22" height="22" viewBox="0 0 120 120" fill="none" aria-hidden="true">
                              <line x1="38" y1="14" x2="38" y2="106" stroke="rgba(99,102,241,0.3)" strokeWidth="8" strokeLinecap="round"/>
                              <line x1="38" y1="60" x2="90" y2="16" stroke="rgba(99,102,241,0.3)" strokeWidth="8" strokeLinecap="round"/>
                              <line x1="38" y1="60" x2="90" y2="104" stroke="rgba(99,102,241,0.3)" strokeWidth="8" strokeLinecap="round"/>
                            </svg>
                            <span className="text-5xl font-bold text-white font-[family-name:var(--font-dm-sans)] leading-none" style={{ letterSpacing: "-2px" }}>3</span>
                          </motion.div>

                          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ border: "1px solid rgba(99,102,241,0.22)", background: "rgba(79,70,229,0.06)" }}>
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><line x1="7" y1="0.5" x2="7" y2="13.5" stroke="#7B75F0" strokeWidth="2" strokeLinecap="round"/><line x1="0.5" y1="7" x2="13.5" y2="7" stroke="#7B75F0" strokeWidth="2" strokeLinecap="round"/></svg>
                          </div>
                        </div>

                        <button className="w-full py-4 rounded-2xl font-semibold text-white text-base" style={{ background: "linear-gradient(135deg, #6366F1 0%, #4F46E5 100%)", boxShadow: "0 6px 28px rgba(79,70,229,0.38)" }}>
                          Collect 3 stamps →
                        </button>
                        <p className="text-xs text-[#52525B] text-center">Tap the button then hold near the NFC stamper</p>
                      </div>
                    )}

                    {/* Screen 2: Stamps Added */}
                    {currentScreen === 2 && (
                      <div className="flex flex-col items-center px-6 gap-5">
                        <motion.div
                          initial={{ y: -60, scale: 0.4, rotate: -20, opacity: 0 }}
                          animate={{ y: 0, scale: 1, rotate: 0, opacity: 1 }}
                          transition={{ type: "spring", stiffness: 280, damping: 18, delay: 0.1 }}
                          className="relative mt-4"
                        >
                          <div className="w-20 h-20 rounded-2xl bg-[#4F46E5] flex items-center justify-center shadow-xl shadow-indigo-500/30">
                            <svg width="40" height="40" viewBox="0 0 120 120" fill="none" aria-hidden="true">
                              <line x1="38" y1="14" x2="38" y2="106" stroke="white" strokeWidth="8" strokeLinecap="round"/>
                              <line x1="38" y1="60" x2="90" y2="16" stroke="white" strokeWidth="8" strokeLinecap="round"/>
                              <line x1="38" y1="60" x2="90" y2="104" stroke="white" strokeWidth="8" strokeLinecap="round"/>
                              <circle cx="90" cy="16" r="14" fill="#FCD34D"/>
                            </svg>
                          </div>
                          <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.42, type: "spring", stiffness: 400, damping: 18 }}
                            className="absolute -top-3 -right-3 w-9 h-9 rounded-full flex items-center justify-center"
                            style={{ background: "#F59E0B", boxShadow: "0 0 0 3px #09090B" }}
                          >
                            <span className="text-sm font-bold text-black leading-none">×3</span>
                          </motion.div>
                        </motion.div>

                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-center">
                          <p className="text-xs text-[#52525B] mb-1">Maison Café</p>
                          <h2 className="font-[family-name:var(--font-dm-sans)] text-2xl font-bold text-[#F4F4F5]">3 stamps added!</h2>
                        </motion.div>

                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.44 }} className="relative w-28 h-28">
                          <svg viewBox="0 0 112 112" className="w-28 h-28 -rotate-90">
                            <circle cx="56" cy="56" r="46" fill="none" stroke="#27272A" strokeWidth="5"/>
                            <motion.circle
                              cx="56" cy="56" r="46" fill="none" stroke="#4F46E5" strokeWidth="5" strokeLinecap="round"
                              strokeDasharray={2 * Math.PI * 46}
                              initial={{ strokeDashoffset: 2 * Math.PI * 46 }}
                              animate={{ strokeDashoffset: 2 * Math.PI * 46 * (1 - 6 / 8) }}
                              transition={{ duration: 0.55, delay: 0.5, ease: "easeOut" }}
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-2xl font-bold text-white font-[family-name:var(--font-dm-sans)]">6</span>
                            <span className="text-xs text-[#71717A]">of 8</span>
                          </div>
                        </motion.div>

                        <p className="text-sm text-[#71717A]">2 more for a free coffee!</p>
                      </div>
                    )}

                    {/* Screen 3: Ember Burst Reward */}
                    {currentScreen === 3 && (
                      <div
                        className="flex flex-col h-full relative overflow-hidden"
                        style={{ background: "radial-gradient(ellipse 80% 55% at 50% 36%, rgba(245,158,11,0.13) 0%, transparent 68%)" }}
                      >
                        {[
                          { left: "12%", size: 4, dur: 3.0, delay: 0.2, op: 0.65 },
                          { left: "26%", size: 3,   dur: 3.5, delay: 0.7, op: 0.5 },
                          { left: "42%", size: 5,   dur: 2.6, delay: 0.1, op: 0.55 },
                          { left: "58%", size: 3,   dur: 3.8, delay: 0.9, op: 0.5 },
                          { left: "72%", size: 4,   dur: 2.8, delay: 0.4, op: 0.6 },
                          { left: "86%", size: 3.5, dur: 3.2, delay: 1.0, op: 0.45 },
                          { left: "20%", size: 3,   dur: 4.0, delay: 1.4, op: 0.4 },
                          { left: "65%", size: 4,   dur: 3.1, delay: 1.1, op: 0.5 },
                        ].map((e, i) => (
                          <motion.div
                            key={i}
                            initial={{ y: "110%", opacity: 0 }}
                            animate={{ y: "-15%", opacity: [0, e.op, 0] }}
                            transition={{ duration: e.dur, delay: e.delay, repeat: Infinity, ease: "easeOut" }}
                            className="absolute rounded-full pointer-events-none"
                            style={{ left: e.left, bottom: 0, width: e.size, height: e.size, background: "#F59E0B", boxShadow: `0 0 ${e.size * 2.5}px rgba(245,158,11,0.5)` }}
                          />
                        ))}

                        <div className="flex-1 flex flex-col items-center justify-center gap-5 px-6 relative z-10">
                          <motion.div initial={{ scale: 0.3, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.08 }} className="relative">
                            {[0, 1].map(i => (
                              <motion.div key={i} initial={{ scale: 1, opacity: 0 }} animate={{ scale: [1, 1.6, 2.1], opacity: [0.45, 0.2, 0] }} transition={{ duration: 1.8, delay: 0.3 + i * 0.32, repeat: Infinity, repeatDelay: 0.4 }} className="absolute inset-0 rounded-3xl pointer-events-none" style={{ background: "rgba(245,158,11,0.22)", margin: "-4px" }} />
                            ))}
                            <div className="w-24 h-24 rounded-3xl flex items-center justify-center" style={{ background: "linear-gradient(145deg, #FBBF24 0%, #D97706 100%)", boxShadow: "0 0 40px rgba(245,158,11,0.48)" }}>
                              <svg width="52" height="52" viewBox="0 0 120 120" fill="none" aria-hidden="true">
                                <line x1="38" y1="14" x2="38" y2="106" stroke="white" strokeWidth="8" strokeLinecap="round"/>
                                <line x1="38" y1="60" x2="90" y2="16" stroke="white" strokeWidth="8" strokeLinecap="round"/>
                                <line x1="38" y1="60" x2="90" y2="104" stroke="white" strokeWidth="8" strokeLinecap="round"/>
                              </svg>
                            </div>
                          </motion.div>

                          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center">
                            <p className="text-xs font-semibold tracking-[0.16em] uppercase mb-2" style={{ color: "rgba(245,158,11,0.65)" }}>Card complete</p>
                            <h2 className="font-[family-name:var(--font-dm-sans)] text-3xl font-bold text-white" style={{ letterSpacing: "-0.5px" }}>Reward<br/>unlocked.</h2>
                          </motion.div>
                        </div>

                        <motion.div initial={{ y: 80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 260, damping: 28, delay: 0.2 }} className="mx-4 mb-6 rounded-2xl p-5 relative z-10" style={{ background: "rgba(13,13,18,0.97)", border: "1px solid rgba(245,158,11,0.2)", backdropFilter: "blur(16px)" }}>
                          <div className="flex items-center gap-3 mb-4 pb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                            <div className="w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center" style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.2)" }}>
                              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                                <path d="M2.5 6.5a1 1 0 011-1h11a1 1 0 011 1v1.25a1.25 1.25 0 000 2.5V11.5a1 1 0 01-1 1h-11a1 1 0 01-1-1V10.25a1.25 1.25 0 000-2.5V6.5z" stroke="#F59E0B" strokeWidth="1.4"/>
                                <line x1="6.5" y1="6" x2="6.5" y2="12.5" stroke="#F59E0B" strokeWidth="1.2" strokeLinecap="round" strokeDasharray="1.8 1.8"/>
                              </svg>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-[#52525B] mb-0.5">Your reward</p>
                              <p className="text-base font-bold text-white font-[family-name:var(--font-dm-sans)]">Free Coffee</p>
                              <p className="text-xs mt-0.5" style={{ color: "rgba(245,158,11,0.7)" }}>Show to merchant at the counter</p>
                            </div>
                          </div>
                          <button className="w-full py-3.5 rounded-xl font-semibold text-[#09090B] text-sm" style={{ background: "linear-gradient(135deg, #FBBF24, #D97706)" }}>Go to my rewards</button>
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
