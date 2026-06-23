"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Wallet, MapPin, Bell, User, Stamp } from "lucide-react";
import dynamic from "next/dynamic";
import GlyphMark from "@/components/common/glyph-mark";

// Lottie — browser-only, loaded lazily
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

// ── Customer journey: 6 screens, one story ─────────────────
const SCREENS = [
  { id: "wallet",   label: "Wallet" },
  { id: "scan",     label: "Tap to Stamp" },
  { id: "stamped",  label: "Stamp Confirmed" },
  { id: "gift",     label: "Reward Unlocked" },
  { id: "redeem",   label: "Redeem" },
  { id: "redeemed", label: "Redeemed" },
];

// Per-screen auto-rotate intervals (ms)
const SCREEN_DURATIONS: Record<string, number> = {
  wallet:   4000,
  scan:     4000,
  stamped:  4000,
  gift:     5000,
  redeem:   4500,
  redeemed: 5000,
};

const CALLOUTS: Record<string, { icon: string; title: string; desc: string }[]> = {
  wallet: [
    { icon: "✦", title: "One tap, instant stamp", desc: "Customer taps their phone to the NFC stamper — no app download, no friction" },
    { icon: "✦", title: "Works on any phone", desc: "iOS and Android supported out of the box, no special hardware needed" },
    { icon: "✦", title: "Track every visit", desc: "Every stamp is recorded in the customer's wallet automatically" },
  ],
  scan: [
    { icon: "✦", title: "No app required", desc: "The loyalty card opens in the browser the moment the phone detects NFC" },
    { icon: "✦", title: "Works on iOS & Android", desc: "Web NFC on Android Chrome, URL redirect on iPhone — both work seamlessly" },
    { icon: "✦", title: "Instant confirmation", desc: "Stamp verified and added in under a second, no typing or scanning" },
  ],
  stamped: [
    { icon: "✦", title: "Confetti on every stamp", desc: "A satisfying celebration fires every time a stamp is added" },
    { icon: "✦", title: "Progress updates live", desc: "The card animates to the new stamp count in real time" },
    { icon: "✦", title: "Multi-stamp in one tap", desc: "Merchants can award multiple stamps at once — all confirmed together" },
  ],
  gift: [
    { icon: "✦", title: "Reward unlocks automatically", desc: "The moment the card completes, the reward fires — no button to press" },
    { icon: "✦", title: "Gift animation every time", desc: "A delightful animation marks the moment — customers remember it" },
    { icon: "✦", title: "Feels earned and special", desc: "The experience is designed to make customers feel valued, not just tracked" },
  ],
  redeem: [
    { icon: "✦", title: "No hardware needed", desc: "Merchant confirms entirely in the Glyph app — no scanner, no terminal" },
    { icon: "✦", title: "One tap to confirm", desc: "Incoming redemption appears in the merchant dashboard automatically" },
    { icon: "✦", title: "Works on any device", desc: "Merchant app runs in any browser — phone, tablet, or desktop at the counter" },
  ],
  redeemed: [
    { icon: "✦", title: "Instant confirmation for both sides", desc: "Customer and merchant both see the transaction is complete" },
    { icon: "✦", title: "Reward history recorded", desc: "Every redemption is logged — full audit trail for the merchant" },
    { icon: "✦", title: "Customer leaves happy", desc: "The last touchpoint is a success animation — they'll come back" },
  ],
};

const STAMP_CIRCUMFERENCE = 2 * Math.PI * 26;

// ── Lottie sub-components (accept pre-loaded data as props) ──

function PhoneConfetti({ data }: { data: object | null }) {
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

function PhoneGiftReward({ data }: { data: object | null }) {
  if (!data) return null;
  return (
    <div className="pointer-events-none flex items-center justify-center" style={{ height: 100 }}>
      <Lottie
        animationData={data}
        loop
        autoplay
        style={{ width: 100, height: 100 }}
        rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
      />
    </div>
  );
}

function PhoneSucesso({ data }: { data: object | null }) {
  if (!data) return null;
  return (
    <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
      <Lottie
        animationData={data}
        loop
        autoplay
        style={{ width: "80%", height: "80%" }}
        rendererSettings={{ preserveAspectRatio: "xMidYMid meet" }}
      />
    </div>
  );
}

// ── Stamp grid ────────────────────────────────────────────────
function StampGrid({ filled, total = 9, reward = false }: { filled: number; total?: number; reward?: boolean }) {
  return (
    <div className="space-y-1.5">
      <div className="grid grid-cols-3 gap-1.5">
        {Array.from({ length: total }).map((_, i) => {
          const isFilled = i < filled;
          return (
            <motion.div
              key={i}
              className="aspect-square rounded-full flex items-center justify-center"
              style={{ background: isFilled ? (reward ? "#F59E0B" : "#4F46E5") : "#27272A" }}
            >
              {isFilled && (
                <svg width="9" height="9" viewBox="0 0 120 120" fill="none" aria-hidden="true">
                  <line x1="38" y1="14" x2="38" y2="106" stroke="white" strokeWidth="14" strokeLinecap="round" />
                  <line x1="38" y1="60" x2="90" y2="16" stroke="white" strokeWidth="14" strokeLinecap="round" />
                  <line x1="38" y1="60" x2="90" y2="104" stroke="white" strokeWidth="14" strokeLinecap="round" />
                  <circle cx="90" cy="16" r="18" fill={reward ? "white" : "#FCD34D"} />
                </svg>
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

// ── Bottom nav ────────────────────────────────────────────────
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
          null,
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
      <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center" style={{ bottom: "calc(0.25rem + 8px)" }}>
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: "linear-gradient(145deg, #6366F1, #4F46E5)", boxShadow: "0 3px 10px rgba(79,70,229,0.5), 0 0 0 2px rgba(13,13,18,0.97)" }}
        >
          <GlyphMark size={16} color="white" showDot={false} />
        </div>
        <span className="text-[5px] font-semibold mt-0.5" style={{ color: "#7B75F0" }}>Stamp</span>
      </div>
      <div className="flex justify-center mb-1 mt-0.5">
        <div className="w-10 h-0.5 bg-[#27272A] rounded-full" />
      </div>
    </div>
  );
}

// ── Phone screens ─────────────────────────────────────────────
function PhoneScreen({ screen, lottieCache }: { screen: string; lottieCache: Record<string, object> }) {
  switch (screen) {

    // 1 — Wallet
    case "wallet":
      return (
        <div className="flex flex-col h-full pb-[44px]">
          <div className="px-3 pt-2 pb-2 border-b border-[#27272A] flex items-center gap-2">
            <GlyphMark size={14} />
            <p className="text-[10px] font-bold text-white font-[family-name:var(--font-dm-sans)]">My Wallet</p>
          </div>
          <div className="flex-1 p-2.5 overflow-hidden">
            <div className="rounded-2xl overflow-hidden" style={{ boxShadow: "0 4px 20px rgba(79,70,229,0.2)" }}>
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
              <div className="bg-[#111113] px-3 pt-3 pb-2.5">
                <StampGrid filled={6} />
              </div>
            </div>
          </div>
        </div>
      );

    // 2 — NFC Scan
    case "scan":
      return (
        <div className="flex flex-col items-center justify-center h-full pb-[44px] relative overflow-hidden">
          <div className="relative flex items-center justify-center mb-5" style={{ width: 160, height: 160 }}>
            {[0, 1, 2, 3].map(i => (
              <motion.div
                key={i}
                initial={{ scale: 0.28, opacity: 0.75 }}
                animate={{ scale: 1, opacity: 0 }}
                transition={{ duration: 2.2, delay: i * 0.55, repeat: Infinity, ease: "easeOut" }}
                className="absolute rounded-full"
                style={{ width: 160, height: 160, background: "rgba(79,70,229,0.14)", border: "1.5px solid rgba(99,102,241,0.45)" }}
              />
            ))}
            <motion.div
              animate={{ scale: [1, 1.07, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-[52px] h-[52px] rounded-full flex items-center justify-center z-10"
              style={{ background: "linear-gradient(135deg, #5A52E8, #4040C4)", boxShadow: "0 0 0 6px rgba(79,70,229,0.12), 0 0 28px rgba(79,70,229,0.45)" }}
            >
              <GlyphMark size={26} color="white" showDot={false} />
            </motion.div>
          </div>
          <div className="text-center px-4">
            <p className="text-xs font-bold text-white mb-1 font-[family-name:var(--font-dm-sans)]">Hold near NFC stamper</p>
            <p className="text-[9px] text-[#71717A] leading-relaxed">Your loyalty card opens automatically.<br />No app download needed.</p>
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

    // 3 — Stamp confirmed
    case "stamped":
      return (
        <div className="flex flex-col items-center justify-center h-full gap-2.5 relative px-4 pb-[44px]">
          <PhoneConfetti data={lottieCache["confetti"] ?? null} />
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
            <p className="text-[9px] text-[#71717A]">Card complete — reward unlocked</p>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="relative w-16 h-16 z-10">
            <svg viewBox="0 0 64 64" className="w-16 h-16 -rotate-90">
              <circle cx="32" cy="32" r="26" fill="none" stroke="#27272A" strokeWidth="3" />
              <motion.circle
                cx="32" cy="32" r="26" fill="none" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round"
                strokeDasharray={STAMP_CIRCUMFERENCE}
                initial={{ strokeDashoffset: STAMP_CIRCUMFERENCE }}
                animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xs font-bold text-white leading-none font-[family-name:var(--font-dm-sans)]">9</span>
              <span className="text-[7px] text-[#71717A]">of 9</span>
            </div>
          </motion.div>
        </div>
      );

    // 4 — Reward unlocked (ember screen + Gift Lottie overlay)
    case "gift":
      return (
        <div className="flex flex-col h-full relative overflow-hidden pb-[44px]"
          style={{ background: "radial-gradient(ellipse 90% 55% at 50% 36%, rgba(245,158,11,0.13) 0%, transparent 72%)" }}
        >
          {/* Floating ember sparks */}
          {[
            { left: "14%", size: 2.5, dur: 2.8, delay: 0.2, op: 0.7 },
            { left: "27%", size: 2,   dur: 3.2, delay: 0.6, op: 0.5 },
            { left: "41%", size: 3,   dur: 2.4, delay: 0.1, op: 0.6 },
            { left: "59%", size: 2,   dur: 3.5, delay: 0.8, op: 0.5 },
            { left: "73%", size: 3,   dur: 2.6, delay: 0.4, op: 0.65 },
            { left: "85%", size: 2.5, dur: 3.0, delay: 0.9, op: 0.45 },
          ].map((e, i) => (
            <motion.div
              key={i}
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: "-15%", opacity: [0, e.op, 0] }}
              transition={{ duration: e.dur, delay: e.delay, repeat: Infinity, ease: "easeOut" }}
              className="absolute rounded-full pointer-events-none"
              style={{ left: e.left, bottom: 0, width: e.size, height: e.size, background: "#F59E0B", boxShadow: `0 0 ${e.size * 2}px rgba(245,158,11,0.5)` }}
            />
          ))}

          {/* Gift Lottie + text — inline in flex layout, no overlap */}
          <div className="flex-1 flex flex-col items-center justify-center gap-2 px-3 relative z-10">
            <PhoneGiftReward data={lottieCache["gift-reward"] ?? null} />
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }} className="text-center">
              <p className="text-[7px] font-semibold tracking-[0.13em] uppercase mb-1" style={{ color: "rgba(245,158,11,0.65)" }}>Card complete</p>
              <p className="text-sm font-bold text-white font-[family-name:var(--font-dm-sans)]" style={{ letterSpacing: "-0.3px" }}>Reward unlocked.</p>
            </motion.div>
          </div>

          {/* Bottom sheet */}
          <motion.div
            initial={{ y: 56, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 280, damping: 28, delay: 0.18 }}
            className="mx-2 mb-1 rounded-xl p-2.5 relative z-10"
            style={{ background: "rgba(13,13,18,0.97)", border: "1px solid rgba(245,158,11,0.2)", backdropFilter: "blur(12px)" }}
          >
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

    // 5 — Merchant confirms redemption in their app (no scanner needed)
    case "redeem":
      return (
        <div className="flex flex-col h-full bg-[#0D0D0F]">
          {/* Merchant app header */}
          <div className="px-3 pt-2 pb-2 border-b border-[#27272A] flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <GlyphMark size={12} />
              <p className="text-[9px] font-bold text-white font-[family-name:var(--font-dm-sans)]">Merchant Dashboard</p>
            </div>
            <span className="text-[7px] font-semibold px-1.5 py-0.5 rounded-full text-[#F59E0B]" style={{ background: "rgba(245,158,11,0.12)" }}>Maison Café</span>
          </div>

          <div className="flex-1 flex flex-col p-3 gap-3">
            {/* Incoming redemption label */}
            <div className="flex items-center gap-1.5">
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]"
              />
              <p className="text-[7px] font-semibold uppercase tracking-[0.12em] text-[#F59E0B]">Incoming redemption</p>
            </div>

            {/* Reward detail card */}
            <div className="rounded-xl overflow-hidden" style={{ border: "1px solid rgba(245,158,11,0.25)", background: "rgba(245,158,11,0.06)" }}>
              <div className="p-2.5 flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(245,158,11,0.15)" }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="5" r="3" stroke="#F59E0B" strokeWidth="1.2"/>
                    <path d="M2 13c0-2.761 2.686-5 6-5s6 2.239 6 5" stroke="#F59E0B" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[7px] text-[#71717A]">Customer · Coffee Loyalty Card</p>
                  <p className="text-[11px] font-bold text-white font-[family-name:var(--font-dm-sans)]">Free Coffee</p>
                </div>
              </div>
              <div className="px-2.5 pb-2.5 flex items-center gap-1">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><circle cx="5" cy="5" r="4" stroke="#52525B" strokeWidth="1"/><line x1="5" y1="3" x2="5" y2="5.5" stroke="#52525B" strokeWidth="1" strokeLinecap="round"/><circle cx="5" cy="7" r="0.5" fill="#52525B"/></svg>
                <p className="text-[6.5px] text-[#52525B]">Earned today · 9 stamps completed</p>
              </div>
            </div>

            {/* Confirm button */}
            <motion.div
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 24 }}
              className="rounded-xl py-2.5 flex items-center justify-center gap-1.5 cursor-pointer"
              style={{ background: "linear-gradient(135deg, #FBBF24, #D97706)" }}
            >
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2 5.5l2.5 2.5 4.5-4.5" stroke="#09090B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span className="text-[9px] font-bold text-black">Confirm Redemption</span>
            </motion.div>

            <button className="text-[7.5px] text-[#52525B] text-center w-full">Deny</button>
          </div>
        </div>
      );

    // 6 — Redeemed (Sucesso animation)
    case "redeemed":
      return (
        <div className="flex flex-col items-center justify-center h-full pb-[44px] relative overflow-hidden bg-[#09090B]">
          <PhoneSucesso data={lottieCache["sucesso"] ?? null} />
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="relative z-20 text-center px-4 mt-auto mb-8"
          >
            <p className="text-[7px] font-semibold tracking-[0.13em] uppercase mb-1 text-[#4ADE80]">Confirmed</p>
            <p className="text-xs font-bold text-white font-[family-name:var(--font-dm-sans)]">Reward redeemed ✓</p>
          </motion.div>
        </div>
      );

    default:
      return null;
  }
}

// ── Main component ────────────────────────────────────────────
export default function PhoneDemo() {
  const [screen, setScreen] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const [lottieCache, setLottieCache] = useState<Record<string, object>>({});
  const shouldReduceMotion = useReducedMotion();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Preload all Lottie JSON files immediately on mount
  useEffect(() => {
    ["confetti", "gift-reward", "sucesso"].forEach(name => {
      fetch(`/Glyph/animations/${name}.json`)
        .then(r => r.json())
        .then(d => setLottieCache(prev => ({ ...prev, [name]: d })))
        .catch(() => {});
    });
  }, []);

  const goTo = (index: number) => {
    setDirection(index > screen ? 1 : -1);
    setScreen(index);
  };
  const next = () => goTo((screen + 1) % SCREENS.length);
  const prev = () => goTo((screen - 1 + SCREENS.length) % SCREENS.length);

  useEffect(() => {
    if (paused || shouldReduceMotion) return;
    const duration = SCREEN_DURATIONS[SCREENS[screen].id] ?? 4000;
    intervalRef.current = setInterval(next, duration);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen, paused, shouldReduceMotion]);

  const currentCallouts = CALLOUTS[SCREENS[screen].id] ?? [];

  return (
    <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
      {/* Phone mockup */}
      <div className="relative flex-shrink-0" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
        <div className="relative w-[220px] h-[440px] bg-[#09090B] rounded-[36px] border-2 border-[#27272A] shadow-2xl shadow-black/60 overflow-hidden">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-5 bg-[#09090B] rounded-b-2xl z-30" />
          {/* Status bar */}
          <div className="flex items-center justify-between px-5 pt-2 pb-1 text-[9px] text-[#71717A] relative z-20">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none"><path d="M5 12.55a11 11 0 0114.08 0M1.42 9a16 16 0 0121.16 0M8.53 16.11a6 6 0 016.95 0M12 20h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none"><rect x="2" y="7" width="15" height="11" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M17 11h2a2 2 0 012 2v0a2 2 0 01-2 2h-2" stroke="currentColor" strokeWidth="2"/></svg>
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
                <PhoneScreen screen={SCREENS[screen].id} lottieCache={lottieCache} />
              </motion.div>
            </AnimatePresence>

            <PhoneNav />
          </div>
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

        {/* Prev / Next */}
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
