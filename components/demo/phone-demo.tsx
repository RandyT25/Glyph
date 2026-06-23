"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Wifi, Battery, Stamp, Wallet, MapPin, Bell, User } from "lucide-react";
import dynamic from "next/dynamic";
import GlyphMark from "@/components/common/glyph-mark";

// Lottie — browser-only, loaded lazily
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const SCREENS = [
  { id: "wallet",   label: "Wallet" },
  { id: "scan",     label: "NFC Scan" },
  { id: "stamped",  label: "Stamps Added" },
  { id: "ember",    label: "Reward" },
  { id: "history",  label: "History" },
  { id: "gift",     label: "Gift Animation" },
  { id: "redeemed", label: "Redeemed" },
];

const CALLOUTS: Record<string, { icon: string; title: string; desc: string }[]> = {
  wallet: [
    { icon: "✦", title: "Digital loyalty cards", desc: "Brand-coloured card per merchant, circular stamp dots, reward banner" },
    { icon: "✦", title: "Multi-merchant wallet", desc: "All your loyalty cards in one place" },
    { icon: "✦", title: "Real-time progress", desc: "Always know how close you are" },
  ],
  scan: [
    { icon: "✦", title: "Zero friction", desc: "No app download. No sign-up required. Just tap your phone." },
    { icon: "✦", title: "Works on any phone", desc: "iOS and Android NFC supported out of the box" },
    { icon: "✦", title: "Instant confirmation", desc: "Stamp verified and added in under a second" },
  ],
  stamped: [
    { icon: "✦", title: "Confetti on every stamp", desc: "Satisfying celebration plays the moment a stamp is confirmed" },
    { icon: "✦", title: "Multi-stamp confirmed", desc: "×3 badge shows exactly how many were added at once" },
    { icon: "✦", title: "Progress ring updates", desc: "Card animates to the new position in real time" },
  ],
  ember: [
    { icon: "✦", title: "Ember burst moment", desc: "Amber sparks rise as your reward unlocks — earned and special" },
    { icon: "✦", title: "Glass bottom sheet", desc: "Reward details and one-tap redemption, no hunting required" },
    { icon: "✦", title: "Instant unlock", desc: "Reward triggers the moment your card completes" },
  ],
  history: [
    { icon: "✦", title: "Full stamp history", desc: "Every visit, every location recorded" },
    { icon: "✦", title: "Filter by merchant", desc: "Drill into individual businesses" },
    { icon: "✦", title: "Lifetime record", desc: "Permanent marks that compound over time" },
  ],
  gift: [
    { icon: "✦", title: "Gift animation on reward", desc: "A delightful gift burst plays the moment a reward is unlocked" },
    { icon: "✦", title: "Feels special every time", desc: "Customers remember moments that surprise them — this is one of them" },
    { icon: "✦", title: "Built-in delight", desc: "No setup required — plays automatically on every card completion" },
  ],
  redeemed: [
    { icon: "✦", title: "Confirmation animation", desc: "A satisfying checkmark plays when a reward is marked as redeemed" },
    { icon: "✦", title: "Clear closure", desc: "Customer and merchant both see the transaction is complete" },
    { icon: "✦", title: "Instant status update", desc: "Reward moves to redeemed history in real time" },
  ],
};

const historyItems = [
  { date: "Jun 21", time: "9:14 AM", merchant: "Maison Café — Marais", stamp: 6 },
  { date: "Jun 19", time: "8:52 AM", merchant: "Maison Café — Marais", stamp: 5 },
  { date: "Jun 17", time: "10:31 AM", merchant: "Maison Café — Opera", stamp: 4 },
  { date: "Jun 15", time: "9:03 AM", merchant: "Maison Café — Marais", stamp: 3 },
  { date: "Jun 12", time: "8:45 AM", merchant: "Maison Café — Marais", stamp: 2 },
];

// Circular stamp grid — matches the real app
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
              animate={isFilled ? { scale: 1 } : { scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 20, delay: isFilled ? i * 0.04 : 0 }}
              className="aspect-square rounded-full flex items-center justify-center"
              style={{ background: isFilled ? (reward ? "#F59E0B" : "#4F46E5") : "#27272A" }}
            >
              {isFilled && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 500, damping: 20 }}>
                  <svg width="9" height="9" viewBox="0 0 120 120" fill="none" aria-hidden="true">
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
      <div className={`w-full rounded-full py-1.5 flex items-center justify-center text-[9px] font-semibold transition-all duration-500 ${filled >= total ? "bg-[#F59E0B]/20 text-[#F59E0B]" : "bg-[#18181B] text-[#52525B]"}`}>
        {filled >= total ? "Free Coffee Unlocked!" : `${total - filled} more → Free Coffee`}
      </div>
    </div>
  );
}

function MinusIcon() {
  return <svg width="10" height="2" viewBox="0 0 10 2" fill="none"><line x1="0.5" y1="1" x2="9.5" y2="1" stroke="#7B75F0" strokeWidth="1.8" strokeLinecap="round"/></svg>;
}
function PlusIcon() {
  return <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><line x1="5" y1="0.5" x2="5" y2="9.5" stroke="#7B75F0" strokeWidth="1.8" strokeLinecap="round"/><line x1="0.5" y1="5" x2="9.5" y2="5" stroke="#7B75F0" strokeWidth="1.8" strokeLinecap="round"/></svg>;
}

const STAMP_CIRCUMFERENCE = 2 * Math.PI * 26;

// Lottie confetti — fetches JSON lazily, plays once inside the phone frame
function PhoneConfetti() {
  const [data, setData] = useState<object | null>(null);
  useEffect(() => {
    // basePath /Glyph must be prepended — Next.js doesn't do this automatically for client fetch()
    fetch("/Glyph/animations/confetti.json").then(r => r.json()).then(setData).catch(() => {});
  }, []);
  if (!data) return null;
  return (
    <div className="absolute inset-0 pointer-events-none z-10">
      <Lottie
        animationData={data}
        loop={false}
        autoplay
        style={{ width: "100%", height: "100%" }}
        rendererSettings={{ preserveAspectRatio: "xMidYMid slice" }}
      />
    </div>
  );
}

// Lottie gift reward — plays inside phone frame
function PhoneGiftReward() {
  const [data, setData] = useState<object | null>(null);
  useEffect(() => {
    fetch("/Glyph/animations/gift-reward.json").then(r => r.json()).then(setData).catch(() => {});
  }, []);
  if (!data) return null;
  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
      <Lottie
        animationData={data}
        loop={false}
        autoplay
        style={{ width: "100%", height: "100%" }}
        rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
      />
    </div>
  );
}

// Lottie sucesso — plays inside phone frame
function PhoneSucesso() {
  const [data, setData] = useState<object | null>(null);
  useEffect(() => {
    fetch("/Glyph/animations/sucesso.json").then(r => r.json()).then(setData).catch(() => {});
  }, []);
  if (!data) return null;
  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
      <Lottie
        animationData={data}
        loop={false}
        autoplay
        style={{ width: "100%", height: "100%" }}
        rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
      />
    </div>
  );
}

// Mini bottom nav — matches the real app's raised-centre-button design
function PhoneNav() {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-20">
      <div
        className="flex items-center mx-1.5 mb-1 rounded-2xl relative"
        style={{ background: "rgba(13,13,18,0.97)", border: "1px solid rgba(255,255,255,0.07)" }}
      >
        {[
          { Icon: Wallet, label: "Wallet" },
          { Icon: MapPin, label: "Discover" },
          null, // centre space
          { Icon: Bell, label: "Activity" },
          { Icon: User, label: "Profile" },
        ].map((tab, i) =>
          tab === null ? (
            <div key={i} className="flex-1" style={{ height: 30 }} />
          ) : (
            <div key={i} className="flex-1 flex flex-col items-center gap-0.5 py-1.5">
              <tab.Icon size={12} className="text-[#52525B]" />
              <span className="text-[5px] text-[#52525B]">{tab.label}</span>
            </div>
          )
        )}
      </div>

      {/* Raised centre button */}
      <div
        className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center"
        style={{ bottom: "calc(0.25rem + 8px)" }}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{
            background: "linear-gradient(145deg, #6366F1, #4F46E5)",
            boxShadow: "0 3px 10px rgba(79,70,229,0.5), 0 0 0 2px rgba(13,13,18,0.97)",
          }}
        >
          <GlyphMark size={16} color="white" showDot={false} />
        </div>
        <span className="text-[5px] font-semibold mt-0.5" style={{ color: "#7B75F0" }}>Stamp</span>
      </div>

      {/* Home indicator */}
      <div className="flex justify-center mb-1 mt-0.5">
        <div className="w-10 h-0.5 bg-[#27272A] rounded-full" />
      </div>
    </div>
  );
}

function PhoneScreen({ screen }: { screen: string }) {
  switch (screen) {

    // ── Screen 1: Wallet — brand header card + circular stamps ──
    case "wallet":
      return (
        <div className="flex flex-col h-full pb-[44px]">
          <div className="px-3 pt-2 pb-2 border-b border-[#27272A] flex items-center gap-2">
            <GlyphMark size={14} />
            <p className="text-[10px] font-bold text-white font-[family-name:var(--font-dm-sans)]">My Wallet</p>
          </div>
          <div className="flex-1 p-2.5 overflow-hidden">
            <div className="rounded-2xl overflow-hidden" style={{ boxShadow: "0 4px 20px rgba(79,70,229,0.2)" }}>
              {/* Brand color header */}
              <div
                className="px-3 pt-3 pb-2.5 flex items-center justify-between"
                style={{ background: "linear-gradient(135deg, #5550E8 0%, #4040C0 100%)" }}
              >
                <div>
                  <p className="text-[7px] font-semibold uppercase tracking-[0.1em] mb-0.5" style={{ color: "rgba(255,255,255,0.6)" }}>Maison Café</p>
                  <p className="text-[11px] font-bold text-white font-[family-name:var(--font-dm-sans)]">Coffee Loyalty</p>
                </div>
                <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,255,255,0.15)" }}>
                  <GlyphMark size={16} color="white" showDot={false} />
                </div>
              </div>
              {/* Stamp grid body */}
              <div className="bg-[#111113] px-3 pt-3 pb-2.5">
                <StampGrid filled={5} />
              </div>
            </div>
          </div>
        </div>
      );

    // ── Screen 2: NFC Scan — sonar pulse effect ───────────────
    case "scan":
      return (
        <div className="flex flex-col items-center justify-center h-full pb-[44px] relative overflow-hidden">

          {/* Sonar / radar pulse — 4 waves expanding from centre */}
          <div className="relative flex items-center justify-center mb-5" style={{ width: 160, height: 160 }}>
            {[0, 1, 2, 3].map(i => (
              <motion.div
                key={i}
                initial={{ scale: 0.28, opacity: 0.75 }}
                animate={{ scale: 1, opacity: 0 }}
                transition={{
                  duration: 2.2,
                  delay: i * 0.55,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                className="absolute rounded-full"
                style={{
                  width: 160,
                  height: 160,
                  background: "rgba(79,70,229,0.14)",
                  border: "1.5px solid rgba(99,102,241,0.45)",
                }}
              />
            ))}

            {/* Centre — gently pulsing filled circle */}
            <motion.div
              animate={{ scale: [1, 1.07, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-[52px] h-[52px] rounded-full flex items-center justify-center z-10"
              style={{
                background: "linear-gradient(135deg, #5A52E8, #4040C4)",
                boxShadow: "0 0 0 6px rgba(79,70,229,0.12), 0 0 28px rgba(79,70,229,0.45)",
              }}
            >
              <GlyphMark size={26} color="white" showDot={false} />
            </motion.div>
          </div>

          <div className="text-center px-4">
            <p className="text-xs font-bold text-white mb-1 font-[family-name:var(--font-dm-sans)]">
              Hold near NFC stamper
            </p>
            <p className="text-[9px] text-[#71717A] leading-relaxed">
              Your loyalty card opens automatically.<br />No app download needed.
            </p>
          </div>

          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex items-center gap-1.5 bg-[#4F46E5]/10 border border-[#4F46E5]/25 rounded-full px-3 py-1 mt-4"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#4F46E5]" />
            <span className="text-[8px] text-[#6366F1] font-semibold">Scanning…</span>
          </motion.div>
        </div>
      );

    // ── Screen 3: Stamps Added + Lottie Confetti ─────────────
    case "stamped":
      return (
        <div className="flex flex-col items-center justify-center h-full gap-2.5 relative px-4 pb-[44px]">
          {/* Lottie confetti — plays once, clipped to phone frame */}
          <PhoneConfetti />

          <motion.div
            initial={{ y: -40, scale: 0.5, rotate: -15, opacity: 0 }}
            animate={{ y: 0, scale: 1, rotate: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
            className="relative z-10"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#4F46E5] flex items-center justify-center shadow-lg shadow-indigo-500/40">
              <GlyphMark size={30} color="white" />
            </div>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.35, type: "spring", stiffness: 400, damping: 18 }}
              className="absolute -top-2 -right-2 w-[22px] h-[22px] rounded-full flex items-center justify-center"
              style={{ background: "#F59E0B", boxShadow: "0 0 0 2px #09090B" }}
            >
              <span className="text-[8px] font-bold text-black leading-none">×3</span>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-center z-10">
            <p className="text-sm font-bold text-white font-[family-name:var(--font-dm-sans)]">3 stamps added!</p>
            <p className="text-[9px] text-[#71717A]">3 more to your free coffee</p>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="relative w-16 h-16 z-10">
            <svg viewBox="0 0 64 64" className="w-16 h-16 -rotate-90">
              <circle cx="32" cy="32" r="26" fill="none" stroke="#27272A" strokeWidth="3" />
              <motion.circle
                cx="32" cy="32" r="26" fill="none" stroke="#4F46E5" strokeWidth="3" strokeLinecap="round"
                strokeDasharray={STAMP_CIRCUMFERENCE}
                initial={{ strokeDashoffset: STAMP_CIRCUMFERENCE }}
                animate={{ strokeDashoffset: STAMP_CIRCUMFERENCE * (1 - 6 / 9) }}
                transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xs font-bold text-white leading-none font-[family-name:var(--font-dm-sans)]">6</span>
              <span className="text-[7px] text-[#71717A]">of 9</span>
            </div>
          </motion.div>
        </div>
      );

    // ── Screen 4: Ember Burst Reward ──────────────────────────
    case "ember":
      return (
        <div className="flex flex-col h-full relative overflow-hidden pb-[44px]" style={{ background: "radial-gradient(ellipse 90% 55% at 50% 36%, rgba(245,158,11,0.13) 0%, transparent 72%)" }}>
          {[
            { left: "14%", size: 2.5, dur: 2.8, delay: 0.2, op: 0.7 },
            { left: "27%", size: 2, dur: 3.2, delay: 0.6, op: 0.5 },
            { left: "41%", size: 3, dur: 2.4, delay: 0.1, op: 0.6 },
            { left: "59%", size: 2, dur: 3.5, delay: 0.8, op: 0.5 },
            { left: "73%", size: 3, dur: 2.6, delay: 0.4, op: 0.65 },
            { left: "85%", size: 2.5, dur: 3.0, delay: 0.9, op: 0.45 },
            { left: "20%", size: 2, dur: 3.8, delay: 1.3, op: 0.4 },
            { left: "66%", size: 2.5, dur: 2.9, delay: 1.0, op: 0.55 },
          ].map((e, i) => (
            <motion.div key={i} initial={{ y: "110%", opacity: 0 }} animate={{ y: "-15%", opacity: [0, e.op, 0] }} transition={{ duration: e.dur, delay: e.delay, repeat: Infinity, ease: "easeOut" }} className="absolute rounded-full pointer-events-none" style={{ left: e.left, bottom: 0, width: e.size, height: e.size, background: "#F59E0B", boxShadow: `0 0 ${e.size * 2}px rgba(245,158,11,0.5)` }} />
          ))}

          <div className="flex-1 flex flex-col items-center justify-center gap-3 px-3 relative z-10">
            <motion.div initial={{ scale: 0.3, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 220, damping: 16, delay: 0.1 }} className="relative">
              {[0, 1].map(i => (
                <motion.div key={i} initial={{ scale: 1, opacity: 0 }} animate={{ scale: [1, 1.65, 2.1], opacity: [0.45, 0.2, 0] }} transition={{ duration: 1.8, delay: 0.3 + i * 0.32, repeat: Infinity, repeatDelay: 0.4 }} className="absolute inset-0 rounded-[18px] pointer-events-none" style={{ background: "rgba(245,158,11,0.22)", margin: "-3px" }} />
              ))}
              <div className="w-14 h-14 rounded-[18px] flex items-center justify-center" style={{ background: "linear-gradient(145deg, #FBBF24 0%, #D97706 100%)", boxShadow: "0 0 22px rgba(245,158,11,0.48)" }}>
                <GlyphMark size={30} color="white" showDot={false} />
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }} className="text-center">
              <p className="text-[7px] font-semibold tracking-[0.13em] uppercase mb-1" style={{ color: "rgba(245,158,11,0.65)" }}>Card complete</p>
              <p className="text-sm font-bold text-white font-[family-name:var(--font-dm-sans)]" style={{ letterSpacing: "-0.3px" }}>Reward unlocked.</p>
            </motion.div>
          </div>

          <motion.div initial={{ y: 56, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ type: "spring", stiffness: 280, damping: 28, delay: 0.18 }} className="mx-2 mb-1 rounded-xl p-2.5 relative z-10" style={{ background: "rgba(13,13,18,0.97)", border: "1px solid rgba(245,158,11,0.2)", backdropFilter: "blur(12px)" }}>
            <div className="flex items-center gap-2 mb-2.5 pb-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center" style={{ background: "rgba(245,158,11,0.12)", border: "1px solid rgba(245,158,11,0.2)" }}>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M1.5 4.5a.75.75 0 01.75-.75h8.5a.75.75 0 01.75.75v1a1 1 0 000 2v1a.75.75 0 01-.75.75h-8.5A.75.75 0 011.5 9.5v-1a1 1 0 000-2v-1z" stroke="#F59E0B" strokeWidth="1.1"/><line x1="4.5" y1="3.8" x2="4.5" y2="9.8" stroke="#F59E0B" strokeWidth="1" strokeLinecap="round" strokeDasharray="1.5 1.5"/></svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[7px] text-[#52525B]">Your reward</p>
                <p className="text-[10px] font-bold text-white font-[family-name:var(--font-dm-sans)] truncate">Free Coffee</p>
                <p className="text-[6.5px]" style={{ color: "rgba(245,158,11,0.65)" }}>Show to merchant</p>
              </div>
            </div>
            <div className="w-full py-1.5 rounded-lg text-center text-[9px] font-semibold text-black" style={{ background: "linear-gradient(135deg, #FBBF24, #D97706)" }}>Go to my rewards</div>
          </motion.div>
        </div>
      );

    // ── Screen 5: History ─────────────────────────────────────
    case "history":
      return (
        <div className="flex flex-col h-full pb-[44px]">
          <div className="px-3 pt-2 pb-2 border-b border-[#27272A]">
            <p className="text-xs font-bold text-white font-[family-name:var(--font-dm-sans)]">Stamp History</p>
          </div>
          <div className="flex-1 overflow-hidden">
            {historyItems.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }} className="flex items-center gap-2 px-2.5 py-2 border-b border-[#18181B] last:border-0">
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

    // ── Screen 6: Gift Reward animation ──────────────────────
    case "gift":
      return (
        <div className="flex flex-col items-center justify-center h-full pb-[44px] relative overflow-hidden"
          style={{ background: "radial-gradient(ellipse 90% 60% at 50% 40%, rgba(245,158,11,0.12) 0%, transparent 70%)" }}
        >
          <PhoneGiftReward />
          <div className="relative z-20 text-center px-4 mt-auto mb-6">
            <p className="text-[7px] font-semibold tracking-[0.13em] uppercase mb-1" style={{ color: "rgba(245,158,11,0.65)" }}>Card complete</p>
            <p className="text-xs font-bold text-white font-[family-name:var(--font-dm-sans)]">Reward unlocked.</p>
          </div>
        </div>
      );

    // ── Screen 7: Redeemed ────────────────────────────────
    case "redeemed":
      return (
        <div className="flex flex-col items-center justify-center h-full pb-[44px] relative overflow-hidden bg-[#09090B]">
          <PhoneSucesso />
          <div className="relative z-20 text-center px-4 mt-auto mb-6">
            <p className="text-[7px] font-semibold tracking-[0.13em] uppercase mb-1 text-[#4ADE80]">Confirmed</p>
            <p className="text-xs font-bold text-white font-[family-name:var(--font-dm-sans)]">Reward redeemed ✓</p>
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

  const goTo = (index: number) => { setDirection(index > screen ? 1 : -1); setScreen(index); };
  const next = () => goTo((screen + 1) % SCREENS.length);
  const prev = () => goTo((screen - 1 + SCREENS.length) % SCREENS.length);

  useEffect(() => {
    if (paused || shouldReduceMotion) return;
    intervalRef.current = setInterval(next, 3000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen, paused, shouldReduceMotion]);

  const currentCallouts = CALLOUTS[SCREENS[screen].id] ?? [];

  return (
    <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
      {/* Phone */}
      <div className="relative flex-shrink-0" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div className="relative w-[220px] h-[440px] bg-[#09090B] rounded-[36px] border-2 border-[#27272A] shadow-2xl shadow-black/60 overflow-hidden">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#09090B] rounded-b-2xl z-30" />
          {/* Status bar */}
          <div className="flex items-center justify-between px-5 pt-2 pb-1 text-[9px] text-[#71717A] relative z-20">
            <span>9:41</span>
            <div className="flex items-center gap-1"><Wifi size={9} /><Battery size={9} /></div>
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

            {/* Bottom nav — always visible above screen content */}
            <PhoneNav />
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {SCREENS.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} className={`transition-all duration-200 rounded-full cursor-pointer ${i === screen ? "w-5 h-1.5 bg-[#4F46E5]" : "w-1.5 h-1.5 bg-[#3F3F46] hover:bg-[#71717A]"}`} aria-label={`Screen ${i + 1}`} />
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
          <motion.div key={screen} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }} className="space-y-4">
            {currentCallouts.map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} className="flex items-start gap-3">
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
