"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Wifi, Battery, Stamp } from "lucide-react";
import GlyphMark from "@/components/common/glyph-mark";
import NfcRipple from "@/components/animations/nfc-ripple";

const SCREENS = [
  { id: "wallet", label: "Wallet" },
  { id: "tap", label: "NFC Tap" },
  { id: "earned", label: "Stamp Earned" },
  { id: "reward", label: "Reward" },
  { id: "history", label: "History" },
];

const CALLOUTS: Record<string, { icon: string; title: string; desc: string }[]> = {
  wallet: [
    { icon: "✦", title: "Digital loyalty cards", desc: "One tap replaces every paper card" },
    { icon: "✦", title: "Multi-merchant wallet", desc: "All your loyalty cards in one place" },
    { icon: "✦", title: "Real-time progress", desc: "Always know how close you are" },
  ],
  tap: [
    { icon: "✦", title: "Zero friction", desc: "No app download. No sign-up. Just tap." },
    { icon: "✦", title: "Instant recognition", desc: "Verified in under a second" },
    { icon: "✦", title: "Works on any phone", desc: "iOS and Android NFC supported" },
  ],
  earned: [
    { icon: "✦", title: "Satisfying feedback", desc: "Haptic, visual, and audio confirmation" },
    { icon: "✦", title: "Live stamp animation", desc: "Stamp flies onto your card" },
    { icon: "✦", title: "Progress ring", desc: "See exactly how far you've come" },
  ],
  reward: [
    { icon: "✦", title: "Instant unlock", desc: "Reward triggers the moment you complete" },
    { icon: "✦", title: "Amber glow moment", desc: "Designed to feel earned and special" },
    { icon: "✦", title: "No expiry by default", desc: "Your reward waits until you're ready" },
  ],
  history: [
    { icon: "✦", title: "Full stamp history", desc: "Every visit, every location recorded" },
    { icon: "✦", title: "Filter by merchant", desc: "Drill into individual businesses" },
    { icon: "✦", title: "Lifetime record", desc: "Permanent marks that compound over time" },
  ],
};

const historyItems = [
  { date: "Jun 21", time: "9:14 AM", merchant: "Maison Café — Marais", stamp: 6 },
  { date: "Jun 19", time: "8:52 AM", merchant: "Maison Café — Marais", stamp: 5 },
  { date: "Jun 17", time: "10:31 AM", merchant: "Maison Café — Opera", stamp: 4 },
  { date: "Jun 15", time: "9:03 AM", merchant: "Maison Café — Marais", stamp: 3 },
  { date: "Jun 12", time: "8:45 AM", merchant: "Maison Café — Marais", stamp: 2 },
];

function StampGrid({ filled, total = 9, reward = false }: { filled: number; total?: number; reward?: boolean }) {
  return (
    <div className="space-y-1.5">
      <div className="grid grid-cols-3 gap-1.5">
        {Array.from({ length: total }).map((_, i) => {
          const isFilled = i < filled;
          return (
            <motion.div
              key={i}
              initial={false}
              animate={isFilled ? { backgroundColor: reward ? "#F59E0B" : "#4F46E5", scale: 1 } : { scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 20, delay: isFilled ? i * 0.04 : 0 }}
              className="aspect-square rounded-md flex items-center justify-center"
              style={{ background: isFilled ? (reward ? "#F59E0B" : "#4F46E5") : "#27272A" }}
            >
              {isFilled && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 20 }}>
                  <svg width="10" height="10" viewBox="0 0 120 120" fill="none" aria-hidden="true">
                    <line x1="38" y1="14" x2="38" y2="106" stroke="white" strokeWidth="14" strokeLinecap="round" />
                    <line x1="38" y1="60" x2="90" y2="16" stroke="white" strokeWidth="14" strokeLinecap="round" />
                    <line x1="38" y1="60" x2="90" y2="104" stroke="white" strokeWidth="14" strokeLinecap="round" />
                    <circle cx="90" cy="16" r="18" fill={reward ? "white" : "#FCD34D"} />
                  </svg>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
      <div className={`w-full rounded-md py-2 flex items-center justify-center text-[10px] font-semibold transition-all duration-500 ${filled >= total ? "bg-[#F59E0B]/20 text-[#F59E0B]" : "bg-[#18181B] text-[#52525B]"}`}>
        {filled >= total ? "Free Coffee Unlocked!" : `${total - filled} more → Free Coffee`}
      </div>
    </div>
  );
}

function ConfettiDot({ x, y, color, delay }: { x: number; y: number; color: string; delay: number }) {
  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full"
      style={{ background: color, left: "50%", top: "40%" }}
      initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
      animate={{ x, y, opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    />
  );
}

const CONFETTI = [
  { x: -50, y: -60, color: "#4F46E5", delay: 0 },
  { x: 40, y: -70, color: "#F59E0B", delay: 0.05 },
  { x: 60, y: -30, color: "#6366F1", delay: 0.1 },
  { x: -60, y: -20, color: "#FCD34D", delay: 0.05 },
  { x: -30, y: 50, color: "#4F46E5", delay: 0.1 },
  { x: 50, y: 40, color: "#F59E0B", delay: 0 },
  { x: 70, y: -50, color: "#E0E7FF", delay: 0.08 },
  { x: -70, y: 30, color: "#6366F1", delay: 0.06 },
  { x: 0, y: 70, color: "#FCD34D", delay: 0.04 },
  { x: -40, y: -55, color: "#4F46E5", delay: 0.09 },
  { x: 30, y: 60, color: "#F59E0B", delay: 0.07 },
  { x: -20, y: 65, color: "#6366F1", delay: 0.03 },
];

function PhoneScreen({ screen }: { screen: string }) {
  switch (screen) {
    case "wallet":
      return (
        <div className="flex flex-col h-full">
          <div className="px-3 pt-2 pb-3 border-b border-[#27272A]">
            <p className="text-[9px] text-[#71717A]">Good morning!</p>
            <p className="text-xs font-bold text-white font-[family-name:var(--font-dm-sans)]">Your loyalty cards</p>
          </div>
          <div className="flex-1 p-2.5 overflow-hidden">
            <div className="bg-[#111113] rounded-xl border border-[#4F46E5]/30 p-2.5" style={{ background: "linear-gradient(135deg, rgba(79,70,229,0.12), #09090B)" }}>
              <div className="flex items-center justify-between mb-2.5">
                <div>
                  <p className="text-[8px] font-bold text-[#6366F1] uppercase tracking-wider">Maison Café</p>
                  <p className="text-[10px] font-bold text-white font-[family-name:var(--font-dm-sans)]">Coffee Loyalty</p>
                </div>
                <GlyphMark size={18} />
              </div>
              <StampGrid filled={5} />
            </div>
          </div>
        </div>
      );

    case "tap":
      return (
        <div className="flex flex-col items-center justify-center h-full gap-3 px-4">
          <div className="relative">
            <NfcRipple className="w-20 h-20" />
          </div>
          <div className="text-center">
            <p className="text-xs font-bold text-white font-[family-name:var(--font-dm-sans)]">Hold to stamper</p>
            <p className="text-[9px] text-[#71717A] mt-0.5">Place phone near NFC device</p>
          </div>
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex items-center gap-1.5 bg-[#4F46E5]/10 border border-[#4F46E5]/30 rounded-full px-3 py-1"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#4F46E5]" />
            <span className="text-[9px] text-[#6366F1] font-semibold">Scanning…</span>
          </motion.div>
        </div>
      );

    case "earned":
      return (
        <div className="flex flex-col items-center justify-center h-full gap-2 relative">
          {CONFETTI.map((c, i) => <ConfettiDot key={i} {...c} />)}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="w-14 h-14 rounded-2xl bg-[#4F46E5] flex items-center justify-center shadow-lg shadow-indigo-500/40"
          >
            <GlyphMark size={30} color="white" />
          </motion.div>
          <div className="text-center">
            <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-sm font-bold text-white font-[family-name:var(--font-dm-sans)]">Stamp #6 Earned!</motion.p>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="text-[9px] text-[#71717A]">3 more to your free coffee</motion.p>
          </div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="w-full px-4">
            <div className="relative">
              <svg viewBox="0 0 100 6" className="w-full">
                <rect x="0" y="0" width="100" height="6" rx="3" fill="#27272A" />
                <motion.rect x="0" y="0" width="0" height="6" rx="3" fill="#4F46E5" initial={{ width: 0 }} animate={{ width: "66.6" }} transition={{ delay: 0.4, duration: 0.5 }} />
              </svg>
              <p className="text-[8px] text-[#71717A] text-center mt-1">6 / 9 stamps</p>
            </div>
          </motion.div>
        </div>
      );

    case "reward":
      return (
        <div className="flex flex-col items-center justify-center h-full gap-2 relative">
          <motion.div className="absolute inset-0 rounded-2xl" animate={{ boxShadow: ["0 0 0px rgba(245,158,11,0)", "0 0 40px rgba(245,158,11,0.3)", "0 0 0px rgba(245,158,11,0)"] }} transition={{ duration: 2, repeat: Infinity }} />
          <motion.div animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, #F59E0B, #FCD34D)" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="white" />
              </svg>
            </div>
          </motion.div>
          <div className="text-center px-3">
            <p className="text-sm font-bold text-[#F59E0B] font-[family-name:var(--font-dm-sans)]">Reward Unlocked!</p>
            <p className="text-[10px] text-white font-semibold mt-0.5">Free Coffee</p>
            <p className="text-[8px] text-[#71717A] mt-0.5">Show this screen to redeem</p>
          </div>
          <StampGrid filled={9} reward={true} />
        </div>
      );

    case "history":
      return (
        <div className="flex flex-col h-full">
          <div className="px-3 pt-2 pb-2 border-b border-[#27272A]">
            <p className="text-xs font-bold text-white font-[family-name:var(--font-dm-sans)]">Stamp History</p>
          </div>
          <div className="flex-1 overflow-hidden">
            {historyItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className="flex items-center gap-2 px-2.5 py-2 border-b border-[#18181B] last:border-0"
              >
                <div className="w-6 h-6 rounded-lg bg-[#4F46E5]/10 flex items-center justify-center flex-shrink-0">
                  <Stamp size={11} className="text-[#6366F1]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] font-medium text-[#F4F4F5] truncate">{item.merchant}</p>
                  <p className="text-[8px] text-[#71717A]">{item.date} · {item.time}</p>
                </div>
                <span className="text-[9px] font-bold text-[#6366F1]">#{item.stamp}</span>
              </motion.div>
            ))}
          </div>
        </div>
      );

    default:
      return null;
  }
}

export default function PhoneDemo() {
  const [screen, setScreen] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (index: number) => {
    setDirection(index > screen ? 1 : -1);
    setScreen(index);
  };

  const next = () => goTo((screen + 1) % SCREENS.length);
  const prev = () => goTo((screen - 1 + SCREENS.length) % SCREENS.length);

  useEffect(() => {
    if (paused || shouldReduceMotion) return;
    intervalRef.current = setInterval(next, 3000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [screen, paused, shouldReduceMotion]);

  const currentCallouts = CALLOUTS[SCREENS[screen].id] ?? [];

  return (
    <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
      {/* Phone */}
      <div
        className="relative flex-shrink-0"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Phone frame */}
        <div className="relative w-[220px] h-[440px] bg-[#09090B] rounded-[36px] border-2 border-[#27272A] shadow-2xl shadow-black/60 overflow-hidden">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#09090B] rounded-b-2xl z-10" />
          {/* Status bar */}
          <div className="flex items-center justify-between px-5 pt-2 pb-1 text-[9px] text-[#71717A]">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <Wifi size={9} />
              <Battery size={9} />
            </div>
          </div>

          {/* Screen content */}
          <div className="absolute inset-0 top-7 overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={screen}
                custom={direction}
                initial={shouldReduceMotion ? {} : { x: direction * 40, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={shouldReduceMotion ? {} : { x: direction * -40, opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 pt-1"
              >
                <PhoneScreen screen={SCREENS[screen].id} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Home indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 bg-[#3F3F46] rounded-full" />
        </div>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {SCREENS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`transition-all duration-200 rounded-full cursor-pointer ${i === screen ? "w-5 h-1.5 bg-[#4F46E5]" : "w-1.5 h-1.5 bg-[#3F3F46] hover:bg-[#71717A]"}`}
              aria-label={`Screen ${i + 1}`}
            />
          ))}
        </div>

        {/* Prev/Next */}
        <div className="flex items-center justify-center gap-3 mt-3">
          <button onClick={prev} className="w-8 h-8 rounded-full border border-[#27272A] bg-[#18181B] hover:border-[#4F46E5] flex items-center justify-center transition-colors cursor-pointer">
            <ChevronLeft size={14} className="text-[#71717A]" />
          </button>
          <span className="text-xs text-[#52525B] font-medium">{SCREENS[screen].label}</span>
          <button onClick={next} className="w-8 h-8 rounded-full border border-[#27272A] bg-[#18181B] hover:border-[#4F46E5] flex items-center justify-center transition-colors cursor-pointer">
            <ChevronRight size={14} className="text-[#71717A]" />
          </button>
        </div>
      </div>

      {/* Feature callouts */}
      <div className="flex-1 space-y-4 max-w-xs">
        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {currentCallouts.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-3"
              >
                <div className="w-6 h-6 rounded-lg bg-[#4F46E5]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[#6366F1] text-xs">✦</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{c.title}</p>
                  <p className="text-xs text-[#71717A] mt-0.5 leading-relaxed">{c.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
