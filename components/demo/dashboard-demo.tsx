"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, LayoutDashboard, Megaphone, Users, BarChart3, Nfc } from "lucide-react";
import GlyphMark from "@/components/common/glyph-mark";

const SCREENS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "campaigns", label: "Campaigns", icon: Megaphone },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "customers", label: "Customers", icon: Users },
  { id: "nfc", label: "NFC Tags", icon: Nfc },
];

const CALLOUTS: Record<string, { icon: string; title: string; desc: string }[]> = {
  overview: [
    { icon: "✦", title: "Live stats dashboard", desc: "Members, stamps, retention and revenue — updated in real time" },
    { icon: "✦", title: "Activity feed", desc: "See every customer tap as it happens across all locations" },
    { icon: "✦", title: "One view for all locations", desc: "Unified dashboard across your entire business" },
  ],
  campaigns: [
    { icon: "✦", title: "Create in minutes", desc: "Set up stamp cards, points or tiered campaigns with zero technical skill" },
    { icon: "✦", title: "Multiple campaign types", desc: "Stamp cards, points systems, seasonal bonuses — all in one place" },
    { icon: "✦", title: "Pause and archive", desc: "Full lifecycle control over every loyalty program" },
  ],
  analytics: [
    { icon: "✦", title: "Retention curve", desc: "See exactly when customers drop off and what brings them back" },
    { icon: "✦", title: "Revenue impact", desc: "Measure the real incremental revenue your loyalty program generates" },
    { icon: "✦", title: "Visit frequency", desc: "Know your busiest days and when to push notifications" },
  ],
  customers: [
    { icon: "✦", title: "Customer tier system", desc: "VIP, Gold, Silver auto-assigned based on visit frequency" },
    { icon: "✦", title: "Lifetime value insight", desc: "Know which 20% of customers drive 80% of your revenue" },
    { icon: "✦", title: "Churn risk detection", desc: "Identify customers who haven't visited recently" },
  ],
  nfc: [
    { icon: "✦", title: "Signed NFC tokens", desc: "Every tag cryptographically signed — impossible to clone or fake" },
    { icon: "✦", title: "Multi-location tags", desc: "Assign individual stampers to each branch" },
    { icon: "✦", title: "Tap analytics", desc: "Track usage per tag — know which counter is busiest" },
  ],
};

const statCards = [
  { label: "Active Members", value: "2,847", change: "+12%", color: "#4F46E5" },
  { label: "Stamps Today", value: "143", change: "+8%", color: "#F59E0B" },
  { label: "Retention Rate", value: "94%", change: "+3%", color: "#10B981" },
  { label: "Revenue Impact", value: "$14.2K", change: "+21%", color: "#8B5CF6" },
];

const activity = [
  { name: "Sophie L.", action: "Completed stamp card", reward: true, time: "2m" },
  { name: "James O.", action: "Earned stamp #6", reward: false, time: "8m" },
  { name: "Mei T.", action: "First visit", reward: false, time: "15m" },
  { name: "Carlos R.", action: "Completed stamp card", reward: true, time: "22m" },
];

const campaigns = [
  { name: "Summer Coffee Card", type: "Stamp Card", status: "active", members: 1204, completions: 87 },
  { name: "Loyalty Points — All Items", type: "Points", status: "active", members: 1643, completions: 156 },
  { name: "Winter Pastry Bonus", type: "Time-Bonus", status: "paused", members: 432, completions: 23 },
];

const customers = [
  { name: "Sophie Laurent", initials: "SL", visits: 47, tier: "VIP" },
  { name: "James Okafor", initials: "JO", visits: 31, tier: "Gold" },
  { name: "Mei Tanaka", initials: "MT", visits: 28, tier: "Gold" },
  { name: "Carlos Rivera", initials: "CR", visits: 24, tier: "Silver" },
  { name: "Aisha Bello", initials: "AB", visits: 19, tier: "Silver" },
];

const tierColor: Record<string, string> = {
  VIP: "text-[#6366F1] bg-[#4F46E5]/15",
  Gold: "text-[#F59E0B] bg-[#F59E0B]/10",
  Silver: "text-slate-300 bg-slate-300/10",
};

const nfcTags = [
  { name: "Counter Stamper #1", location: "Main Branch", active: true, taps: 847 },
  { name: "Counter Stamper #2", location: "Main Branch", active: true, taps: 623 },
  { name: "Drive-Through Stamp", location: "Opera Branch", active: false, taps: 201 },
];

// Simple SVG line chart
function LineChart() {
  const points = [98, 89, 82, 76, 68, 61, 58, 56];
  const w = 280; const h = 60;
  const coords = points.map((v, i) => {
    const x = (i / (points.length - 1)) * w;
    const y = h - ((v - 40) / 60) * h;
    return `${x},${y}`;
  });
  const pathD = `M ${coords.join(" L ")}`;
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none">
      <defs>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4F46E5" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#4F46E5" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${pathD} L ${w},${h} L 0,${h} Z`} fill="url(#lineGrad)" />
      <path d={pathD} fill="none" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function BarChart() {
  const days = ["M", "T", "W", "T", "F", "S", "S"];
  const vals = [42, 58, 71, 65, 89, 94, 48];
  const max = 94;
  return (
    <div className="flex items-end gap-1 h-10">
      {vals.map((v, i) => (
        <div key={i} className="flex flex-col items-center gap-0.5 flex-1">
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: i * 0.07, duration: 0.4 }}
            style={{ height: `${(v / max) * 40}px`, transformOrigin: "bottom" }}
            className="w-full bg-[#4F46E5] rounded-t"
          />
          <span className="text-[7px] text-[#52525B]">{days[i]}</span>
        </div>
      ))}
    </div>
  );
}

function DashboardScreen({ screen, activeNav }: { screen: string; activeNav: string }) {
  switch (screen) {
    case "overview":
      return (
        <div className="flex flex-col h-full">
          <div className="px-3 py-2 border-b border-[#27272A]">
            <p className="text-[10px] font-bold text-white font-[family-name:var(--font-dm-sans)]">Overview</p>
            <p className="text-[8px] text-[#71717A]">Maison Café · Today</p>
          </div>
          <div className="flex-1 overflow-hidden p-2 space-y-2">
            <div className="grid grid-cols-2 gap-1.5">
              {statCards.map((s) => (
                <div key={s.label} className="bg-[#18181B] rounded-lg p-2 border border-[#27272A]">
                  <p className="text-[8px] text-[#71717A] uppercase tracking-wider">{s.label}</p>
                  <p className="text-xs font-bold text-white font-[family-name:var(--font-dm-sans)]">{s.value}</p>
                  <p className="text-[8px] text-emerald-400">{s.change}</p>
                </div>
              ))}
            </div>
            <div className="bg-[#18181B] rounded-lg border border-[#27272A] overflow-hidden">
              <div className="flex items-center justify-between px-2 py-1.5 border-b border-[#27272A]">
                <p className="text-[9px] font-semibold text-white">Live Activity</p>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[7px] text-emerald-400">Live</span>
                </div>
              </div>
              {activity.map((a, i) => (
                <div key={i} className="flex items-center gap-2 px-2 py-1.5 border-b border-[#18181B] last:border-0">
                  <div className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 ${a.reward ? "bg-[#F59E0B]/10" : "bg-[#4F46E5]/10"}`}>
                    <span className="text-[7px]">{a.reward ? "🎁" : "✓"}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[8px] font-medium text-[#F4F4F5] truncate">{a.name}</p>
                    <p className="text-[7px] text-[#71717A] truncate">{a.action}</p>
                  </div>
                  <span className="text-[7px] text-[#52525B]">{a.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case "campaigns":
      return (
        <div className="flex flex-col h-full">
          <div className="px-3 py-2 border-b border-[#27272A] flex items-center justify-between">
            <p className="text-[10px] font-bold text-white font-[family-name:var(--font-dm-sans)]">Campaigns</p>
            <div className="bg-[#4F46E5] rounded px-1.5 py-0.5 text-[7px] text-white font-semibold cursor-pointer">+ New</div>
          </div>
          <div className="flex-1 overflow-hidden p-2 space-y-2">
            {campaigns.map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-[#18181B] rounded-lg border border-[#27272A] p-2">
                <div className="flex items-start justify-between mb-1">
                  <p className="text-[9px] font-semibold text-white">{c.name}</p>
                  <span className={`text-[7px] font-semibold px-1.5 py-0.5 rounded-full ${c.status === "active" ? "text-emerald-400 bg-emerald-400/10" : "text-amber-400 bg-amber-400/10"}`}>
                    {c.status === "active" ? "Active" : "Paused"}
                  </span>
                </div>
                <p className="text-[8px] text-[#71717A] mb-1.5">{c.type}</p>
                <div className="flex items-center gap-3 text-[7px] text-[#52525B]">
                  <span>{c.members.toLocaleString()} members</span>
                  <span>{c.completions} completions</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      );

    case "analytics":
      return (
        <div className="flex flex-col h-full">
          <div className="px-3 py-2 border-b border-[#27272A]">
            <p className="text-[10px] font-bold text-white font-[family-name:var(--font-dm-sans)]">Analytics</p>
          </div>
          <div className="flex-1 overflow-hidden p-2 space-y-2">
            <div className="bg-[#18181B] rounded-lg border border-[#27272A] p-2">
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-[9px] font-semibold text-white">Customer Retention</p>
                <p className="text-[8px] font-bold text-[#6366F1]">94%</p>
              </div>
              <LineChart />
              <div className="flex justify-between mt-0.5">
                {["Wk1","Wk3","Wk6","Wk12"].map(w => <span key={w} className="text-[6px] text-[#52525B]">{w}</span>)}
              </div>
            </div>
            <div className="bg-[#18181B] rounded-lg border border-[#27272A] p-2">
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-[9px] font-semibold text-white">Visit Frequency</p>
                <p className="text-[8px] text-[#71717A]">This week</p>
              </div>
              <BarChart />
            </div>
            <div className="bg-[#18181B] rounded-lg border border-[#27272A] p-2">
              <p className="text-[9px] font-semibold text-white mb-1">Revenue Impact</p>
              <div className="flex items-end gap-1">
                <p className="text-base font-bold text-white font-[family-name:var(--font-dm-sans)]">$14.2K</p>
                <p className="text-[8px] text-emerald-400 mb-0.5">+21% this month</p>
              </div>
            </div>
          </div>
        </div>
      );

    case "customers":
      return (
        <div className="flex flex-col h-full">
          <div className="px-3 py-2 border-b border-[#27272A]">
            <p className="text-[10px] font-bold text-white font-[family-name:var(--font-dm-sans)]">Customers</p>
            <p className="text-[8px] text-[#71717A]">2,847 total</p>
          </div>
          <div className="flex-1 overflow-hidden divide-y divide-[#18181B]">
            {customers.map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.08 }} className="flex items-center gap-2 px-2.5 py-2">
                <div className="w-6 h-6 rounded-full bg-[#4F46E5]/20 flex items-center justify-center text-[8px] font-bold text-[#6366F1] flex-shrink-0">{c.initials}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] font-medium text-[#F4F4F5] truncate">{c.name}</p>
                  <p className="text-[8px] text-[#71717A]">{c.visits} visits</p>
                </div>
                <span className={`text-[7px] font-semibold px-1.5 py-0.5 rounded-full ${tierColor[c.tier]}`}>{c.tier}</span>
              </motion.div>
            ))}
          </div>
        </div>
      );

    case "nfc":
      return (
        <div className="flex flex-col h-full">
          <div className="px-3 py-2 border-b border-[#27272A] flex items-center justify-between">
            <p className="text-[10px] font-bold text-white font-[family-name:var(--font-dm-sans)]">NFC Tags</p>
            <div className="bg-[#4F46E5] rounded px-1.5 py-0.5 text-[7px] text-white font-semibold cursor-pointer">+ Register</div>
          </div>
          <div className="flex-1 overflow-hidden divide-y divide-[#18181B]">
            {nfcTags.map((tag, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="flex items-center gap-2 px-2.5 py-2.5">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${tag.active ? "bg-[#4F46E5]/10" : "bg-[#18181B]"}`}>
                  <Nfc size={13} className={tag.active ? "text-[#6366F1]" : "text-[#52525B]"} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] font-medium text-[#F4F4F5] truncate">{tag.name}</p>
                  <p className="text-[8px] text-[#71717A]">{tag.location} · {tag.taps} taps</p>
                </div>
                <div className={`w-1.5 h-1.5 rounded-full ${tag.active ? "bg-emerald-400" : "bg-[#52525B]"}`} />
              </motion.div>
            ))}
          </div>
        </div>
      );

    default:
      return null;
  }
}

export default function DashboardDemo() {
  const [screen, setScreen] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const goTo = (index: number) => {
    setDirection(index > screen ? 1 : -1);
    setScreen(index);
  };

  const next = () => goTo((screen + 1) % SCREENS.length);
  const prev = () => goTo((screen - 1 + SCREENS.length) % SCREENS.length);

  useEffect(() => {
    if (paused || shouldReduceMotion) return;
    const id = setInterval(next, 3500);
    return () => clearInterval(id);
  }, [screen, paused, shouldReduceMotion]);

  const currentCallouts = CALLOUTS[SCREENS[screen].id] ?? [];

  return (
    <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
      {/* Browser mockup */}
      <div
        className="relative flex-shrink-0"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="w-[420px] h-[340px] bg-[#09090B] rounded-xl border border-[#27272A] shadow-2xl shadow-black/60 overflow-hidden">
          {/* Browser chrome */}
          <div className="flex items-center gap-2 px-3 py-2 bg-[#111113] border-b border-[#27272A]">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
            </div>
            <div className="flex-1 bg-[#18181B] rounded-md px-2.5 py-1 flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-400/60" />
              <span className="text-[9px] text-[#52525B]">glyph.app/dashboard</span>
            </div>
          </div>

          {/* App shell */}
          <div className="flex h-[calc(100%-36px)]">
            {/* Sidebar */}
            <div className="w-[80px] bg-[#111113] border-r border-[#27272A] flex flex-col py-2 px-1.5 gap-0.5">
              <div className="flex items-center gap-1.5 px-1.5 py-1.5 mb-1">
                <GlyphMark size={14} />
                <span className="text-[8px] font-bold text-white font-[family-name:var(--font-dm-sans)] truncate">Glyph</span>
              </div>
              {SCREENS.map(({ id, label, icon: Icon }, i) => {
                const active = i === screen;
                return (
                  <button
                    key={id}
                    onClick={() => goTo(i)}
                    className={`relative flex items-center gap-1.5 px-1.5 py-1.5 rounded-lg transition-colors cursor-pointer w-full text-left ${active ? "bg-[#18181B] text-white" : "text-[#52525B] hover:text-[#71717A]"}`}
                  >
                    {active && (
                      <motion.div
                        layoutId="sidebar-active-demo"
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-4 bg-[#4F46E5] rounded-full"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <Icon size={10} className={active ? "text-[#6366F1]" : ""} />
                    <span className="text-[7px] font-medium truncate">{label}</span>
                  </button>
                );
              })}
            </div>

            {/* Content */}
            <div className="flex-1 overflow-hidden relative">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={screen}
                  custom={direction}
                  initial={shouldReduceMotion ? {} : { x: direction * 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={shouldReduceMotion ? {} : { x: direction * -20, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <DashboardScreen screen={SCREENS[screen].id} activeNav={SCREENS[screen].id} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Progress dots + nav */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {SCREENS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`transition-all duration-200 rounded-full cursor-pointer ${i === screen ? "w-5 h-1.5 bg-[#4F46E5]" : "w-1.5 h-1.5 bg-[#3F3F46] hover:bg-[#71717A]"}`}
            />
          ))}
        </div>
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
