"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Nfc,
  QrCode,
  BarChart3,
  MapPin,
  Bell,
  Users,
  Gift,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import ScrollReveal from "@/components/animations/scroll-reveal";
import { slideLeft, slideRight, fadeUp } from "@/lib/motion";

const features = [
  {
    id: "nfc",
    icon: Nfc,
    color: "#4F46E5",
    title: "NFC Loyalty Cards",
    description:
      "Glyph replaces the paper stamp card entirely. Your NFC stamper sits on the counter — no installation, no setup beyond plugging it in. A customer holds their phone near it and receives a digital stamp instantly. No app download required. No sign-up friction. The entire interaction takes less than two seconds and feels like magic. The technology is NFC Web Push: the stamper broadcasts a secure URL, the phone opens a lightweight web page, the stamp records server-side. It works on every modern Android and iPhone. Your customers never need to think about it.",
    illustration: (
      <div className="flex items-center justify-center h-full">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-[#4F46E5]/10 border-2 border-[#4F46E5]/30 flex items-center justify-center">
            <Nfc size={40} className="text-[#4F46E5]" />
          </div>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-full border border-[#4F46E5]/20 animate-ping"
              style={{ animationDelay: `${i * 0.4}s`, animationDuration: "2s" }}
            />
          ))}
        </div>
      </div>
    ),
  },
  {
    id: "analytics",
    icon: BarChart3,
    color: "#F59E0B",
    title: "Real-Time Analytics",
    description:
      "Most small businesses have no idea which customers are about to churn. Glyph changes that. Your dashboard shows visit frequency, lifetime value, days since last visit, and churn risk score — all updated in real time. See your busiest hours, your top customers by stamps earned, and your week-over-week retention rates. Export CSVs for your accountant or marketing agency. Multi-location operators can compare performance across branches at a glance. Data you used to have to guess at is now a single click away.",
    illustration: (
      <div className="space-y-2 p-4 bg-[#111113] rounded-xl border border-[#27272A]">
        {[80, 45, 95, 60, 75].map((h, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-16 text-[9px] text-[#52525B]">
              {["Mon", "Tue", "Wed", "Thu", "Fri"][i]}
            </div>
            <div
              className="h-4 rounded-sm bg-[#4F46E5]"
              style={{ width: `${h}%`, opacity: 0.6 + i * 0.08 }}
            />
            <span className="text-[9px] text-[#52525B]">{h}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "qr",
    icon: QrCode,
    color: "#6366F1",
    title: "QR Backup",
    description:
      "NFC works on 98% of modern smartphones, but we built QR backup so no customer is ever left out. Every Glyph stamper also displays a dynamic QR code on a small e-ink display. Customers who don't have NFC enabled, or who use an older device, can scan the QR code and receive the same stamp experience. The QR code rotates every 30 seconds to prevent screenshot fraud. The entire system is seamless: customers don't know they're on a fallback path, and merchants don't manage two separate systems.",
    illustration: (
      <div className="flex items-center justify-center">
        <div className="relative w-24 h-24 bg-[#111113] border border-[#27272A] rounded-xl p-3">
          <div className="grid grid-cols-5 grid-rows-5 gap-0.5 w-full h-full">
            {Array.from({ length: 25 }).map((_, i) => (
              <div
                key={i}
                className="rounded-[1px]"
                style={{
                  background:
                    [0, 1, 2, 5, 10, 14, 20, 21, 22, 24, 6, 11, 12, 13, 18].includes(i)
                      ? "#6366F1"
                      : "#27272A",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "multi-location",
    icon: MapPin,
    color: "#10B981",
    title: "Multi-Location Management",
    description:
      "Managing one location is simple. Managing twelve is where most loyalty platforms fall apart. Glyph was designed for growth from day one. Add a new location in 90 seconds — name it, assign a stamper, and your loyalty program is live there. Customers who visit any of your locations accumulate stamps on the same card. You see aggregated analytics across all sites, or drill down into individual branch performance. If you're running a franchise, each franchisee gets their own login with visibility only into their own data, while you see everything from the top.",
    illustration: (
      <div className="relative h-32">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {[
              { x: 0, y: 0, label: "Paris" },
              { x: 60, y: -30, label: "London" },
              { x: -50, y: 30, label: "Tokyo" },
            ].map((loc) => (
              <div
                key={loc.label}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1"
                style={{ left: `calc(50% + ${loc.x}px)`, top: `calc(50% + ${loc.y}px)` }}
              >
                <div className="w-2 h-2 rounded-full bg-[#4F46E5]" />
                <span className="text-[8px] text-[#52525B]">{loc.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "push",
    icon: Bell,
    color: "#F59E0B",
    title: "Push Notifications",
    description:
      "The best time to bring a customer back is when they're close. Glyph's push notification engine lets you set distance-triggered reminders ('You're 200m from Maison Café — you have 6 stamps, one more for a free coffee!'), time-based nudges ('It's been 14 days since your last visit'), and milestone alerts ('You're halfway to your reward!'). Customers opt in at the moment they receive their first stamp, when engagement is highest. Average open rates on Glyph push notifications run at 34% — more than five times the email benchmark.",
    illustration: (
      <div className="bg-[#111113] rounded-xl border border-[#27272A] p-4 max-w-xs">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#4F46E5] flex items-center justify-center flex-shrink-0">
            <Bell size={14} className="text-white" />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-white">Maison Café</p>
            <p className="text-[9px] text-[#71717A] mt-0.5">
              You&apos;re 150m away — 1 more stamp for your free coffee!
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "insights",
    icon: Users,
    color: "#8B5CF6",
    title: "Customer Insights",
    description:
      "Glyph builds a profile for every customer automatically — no forms, no sign-ups required. As a customer taps the stamper, we capture a pseudonymous identifier. Over time, we build a visit history, calculate lifetime value, identify their favourite location, flag when they're at churn risk, and score their loyalty tier. You can see your top 20% of customers by name (if they've chosen to share it via wallet), set up VIP campaigns for your best regulars, and identify the customers most likely to leave before they do. This is the kind of customer intelligence that used to require an enterprise CRM.",
    illustration: (
      <div className="space-y-2">
        {[
          { initials: "SL", name: "Sophie L.", stamps: 47, tier: "VIP" },
          { initials: "JO", name: "James O.", stamps: 31, tier: "Regular" },
          { initials: "MT", name: "Mei T.", stamps: 28, tier: "Regular" },
        ].map((c) => (
          <div
            key={c.name}
            className="flex items-center gap-3 bg-[#111113] rounded-lg px-3 py-2 border border-[#27272A]"
          >
            <div className="w-6 h-6 rounded-full bg-[#4F46E5]/20 flex items-center justify-center flex-shrink-0">
              <span className="text-[8px] font-bold text-[#6366F1]">{c.initials}</span>
            </div>
            <span className="text-[9px] text-white flex-1">{c.name}</span>
            <span className="text-[9px] text-[#52525B]">{c.stamps} stamps</span>
            <span
              className={[
                "text-[8px] px-1.5 py-0.5 rounded-full font-semibold",
                c.tier === "VIP"
                  ? "bg-[#F59E0B]/20 text-[#F59E0B]"
                  : "bg-[#27272A] text-[#71717A]",
              ].join(" ")}
            >
              {c.tier}
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "rewards",
    icon: Gift,
    color: "#EC4899",
    title: "Rewards Engine",
    description:
      "Not every loyalty program works the same way. Glyph's rewards engine supports stamp cards (the classic: collect 8, get one free), point systems (earn 1 point per dollar, redeem at any threshold), tiered rewards (Bronze, Silver, Gold membership with increasing benefits), and time-based bonuses (double stamps on Tuesday afternoons). Set up any combination in the dashboard — no developer required. Define your reward, set the earning rate, write the redemption message, and publish. Changes take effect instantly across all your stampers.",
    illustration: (
      <div className="flex items-center gap-3 flex-wrap">
        {[
          { label: "Stamp Card", color: "#4F46E5" },
          { label: "Points", color: "#F59E0B" },
          { label: "Tiered", color: "#EC4899" },
        ].map((t) => (
          <div
            key={t.label}
            className="px-3 py-1.5 rounded-full border text-[9px] font-semibold"
            style={{
              borderColor: `${t.color}40`,
              background: `${t.color}15`,
              color: t.color,
            }}
          >
            {t.label}
          </div>
        ))}
      </div>
    ),
  },
  {
    id: "wallet",
    icon: Wallet,
    color: "#F59E0B",
    title: "Wallet Integration",
    description:
      "Glyph loyalty cards live in Apple Wallet and Google Wallet — the same place your customers keep their boarding passes and concert tickets. This means zero friction for returning customers: they open their phone, their card is right there on the lock screen when they walk in. No app to find, no website to remember. Wallet passes update in real time: stamp count, reward progress, and promotional messages all push directly to the card. For merchants, this means your brand sits alongside the biggest names in retail every time a customer opens their digital wallet.",
    illustration: (
      <div className="bg-gradient-to-br from-[#1a1a1a] to-[#111113] rounded-xl border border-[#27272A] p-4 max-w-[180px]">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-md bg-[#4F46E5] flex items-center justify-center">
            <svg width="10" height="10" viewBox="0 0 120 120" fill="none" aria-hidden="true">
              <line x1="38" y1="14" x2="38" y2="106" stroke="white" strokeWidth="10" strokeLinecap="round" />
              <line x1="38" y1="60" x2="90" y2="16" stroke="white" strokeWidth="10" strokeLinecap="round" />
              <line x1="38" y1="60" x2="90" y2="104" stroke="white" strokeWidth="10" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-[9px] font-semibold text-white">Maison Café</span>
        </div>
        <div className="text-[8px] text-[#52525B]">7/8 stamps</div>
        <div className="mt-2 w-full h-1.5 rounded-full bg-[#27272A]">
          <div className="h-full rounded-full bg-[#4F46E5]" style={{ width: "87.5%" }} />
        </div>
      </div>
    ),
  },
];

export default function FeaturesPage() {
  return (
    <main className="bg-[#09090B] min-h-screen">
      {/* Hero */}
      <section className="pt-36 pb-24 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(79,70,229,0.1) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block mb-5 text-xs font-semibold uppercase tracking-widest text-[#6366F1] bg-[#4F46E5]/10 px-3 py-1 rounded-full border border-[#4F46E5]/20">
              Platform Features
            </span>
            <h1 className="font-[family-name:var(--font-dm-sans)] text-5xl sm:text-6xl font-bold text-[#F4F4F5] leading-tight mb-6">
              Everything you need to build loyalty that lasts.
            </h1>
            <p className="text-lg text-[#71717A] max-w-2xl mx-auto leading-relaxed">
              From the first tap to the thousandth visit — Glyph gives you every tool to make customers come back, again and again.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Feature sections */}
      <div className="max-w-6xl mx-auto px-6 pb-28 space-y-24">
        {features.map((feature, i) => {
          const Icon = feature.icon;
          const isEven = i % 2 === 0;

          return (
            <div
              key={feature.id}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
            >
              {/* Content */}
              <ScrollReveal
                variants={isEven ? slideLeft : slideRight}
                className={isEven ? "order-1" : "order-1 lg:order-2"}
              >
                <div>
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                    style={{ background: `${feature.color}20`, border: `1px solid ${feature.color}30` }}
                  >
                    <Icon size={22} style={{ color: feature.color }} />
                  </div>
                  <h2 className="font-[family-name:var(--font-dm-sans)] text-2xl sm:text-3xl font-bold text-[#F4F4F5] mb-5 leading-tight">
                    {feature.title}
                  </h2>
                  <p className="text-[#71717A] leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </div>
              </ScrollReveal>

              {/* Illustration */}
              <ScrollReveal
                variants={isEven ? slideRight : slideLeft}
                className={isEven ? "order-2" : "order-2 lg:order-1"}
              >
                <div className="rounded-2xl border border-[#27272A] bg-[#111113] p-8 min-h-[200px] flex items-center justify-center">
                  {feature.illustration}
                </div>
              </ScrollReveal>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <section className="py-24 border-t border-white/[0.06]">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-[family-name:var(--font-dm-sans)] text-3xl font-bold text-[#F4F4F5] mb-4">
            Ready to see it in action?
          </h2>
          <p className="text-[#71717A] mb-8">
            Book a 15-minute demo and we&apos;ll walk you through every feature for your type of business.
          </p>
          <Link
            href="/contact"
            className="cursor-pointer inline-flex items-center gap-2 bg-[#4F46E5] hover:bg-[#6366F1] text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/25"
          >
            Book a Demo
          </Link>
        </div>
      </section>
    </main>
  );
}
