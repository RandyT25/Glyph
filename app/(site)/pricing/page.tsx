"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { PRICING_TIERS } from "@/lib/constants";
import ScrollReveal from "@/components/animations/scroll-reveal";
import { scaleIn, fadeUp } from "@/lib/motion";

const faqs = [
  {
    q: "Do my customers need to download an app?",
    a: "No. Glyph works via NFC Web Push and QR — customers tap their phone or scan a code and receive a stamp instantly in their mobile browser. There is no app download, no sign-up form, and no friction. For returning visits, their loyalty card is available via a link saved to their home screen or in Apple/Google Wallet.",
  },
  {
    q: "What happens when a customer reaches their reward?",
    a: "When a customer completes their stamp card, the reward unlocks automatically. They see a confirmation screen with a unique redemption code. Your staff verifies the code in the Glyph merchant app or dashboard. The card resets and they start earning toward their next reward.",
  },
  {
    q: "Can I use Glyph across multiple locations?",
    a: "Yes. The Growth tier supports up to 3 locations and stampers. Enterprise is unlimited. Customers accumulate stamps across all your locations on the same card, and you get unified analytics from the top-level dashboard.",
  },
  {
    q: "Is there a contract or minimum term?",
    a: "No contracts. Glyph is month-to-month. Cancel any time and your data is yours — we'll export everything in CSV format on request. Annual billing is available at a 20% discount if you prefer.",
  },
  {
    q: "How does the NFC stamper work physically?",
    a: "The Glyph stamper is a small, palm-sized device that sits on your counter. It plugs into any USB-A port for power. It requires no internet connection of its own — it broadcasts a secure URL via NFC and updates stamps through the customer's phone. Setup takes under two minutes.",
  },
  {
    q: "What data do you store about customers?",
    a: "Glyph stores a pseudonymous identifier for each customer — no names, emails, or personal details unless the customer chooses to share them via Wallet. We're GDPR compliant and customers can request deletion of their data at any time. We never sell customer data.",
  },
];

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="bg-[#09090B] min-h-screen">
      {/* Hero */}
      <section className="pt-36 pb-16 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 50% 0%, rgba(79,70,229,0.1) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block mb-5 text-xs font-semibold uppercase tracking-widest text-[#6366F1] bg-[#4F46E5]/10 px-3 py-1 rounded-full border border-[#4F46E5]/20">
              Pricing
            </span>
            <h1 className="font-[family-name:var(--font-dm-sans)] text-5xl sm:text-6xl font-bold text-[#F4F4F5] leading-tight mb-5">
              Simple, honest pricing
            </h1>
            <p className="text-lg text-[#71717A] mb-10">
              Start free. Upgrade when you need more. Cancel any time.
            </p>

            {/* Toggle */}
            <div className="inline-flex items-center gap-3 bg-[#111113] border border-[#27272A] rounded-xl p-1">
              <button
                onClick={() => setIsAnnual(false)}
                className={[
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer",
                  !isAnnual
                    ? "bg-[#4F46E5] text-white shadow"
                    : "text-[#71717A] hover:text-white",
                ].join(" ")}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={[
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer",
                  isAnnual
                    ? "bg-[#4F46E5] text-white shadow"
                    : "text-[#71717A] hover:text-white",
                ].join(" ")}
              >
                Annual
                <span className="ml-1.5 text-[10px] font-bold text-[#F59E0B]">-20%</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing cards */}
      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRICING_TIERS.map((tier, i) => (
            <ScrollReveal key={tier.name} variants={scaleIn} delay={i * 0.1}>
              <div
                className={[
                  "relative rounded-2xl p-7 h-full flex flex-col transition-all duration-300",
                  tier.highlighted
                    ? "bg-[#111113] border-2 border-[#4F46E5] shadow-2xl shadow-indigo-500/20"
                    : "bg-white/[0.02] border border-white/[0.06]",
                ].join(" ")}
              >
                {tier.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="bg-[#4F46E5] text-white text-xs font-bold px-4 py-1.5 rounded-full tracking-wide shadow-lg shadow-indigo-500/30">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="font-[family-name:var(--font-dm-sans)] font-bold text-[#F4F4F5] text-xl mb-1">
                    {tier.name}
                  </h3>
                  <p className="text-xs text-[#52525B] leading-relaxed">
                    {tier.description}
                  </p>
                </div>

                {/* Price */}
                <div className="mb-8 min-h-[60px] flex flex-col justify-center">
                  {tier.price.monthly === null ? (
                    <p className="font-[family-name:var(--font-dm-sans)] text-3xl font-bold text-[#F4F4F5]">
                      Custom
                    </p>
                  ) : tier.price.monthly === 0 ? (
                    <p className="font-[family-name:var(--font-dm-sans)] text-3xl font-bold text-[#F4F4F5]">
                      Free
                    </p>
                  ) : (
                    <div className="flex items-end gap-1">
                      <span className="text-[#52525B] text-sm mt-1">$</span>
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={isAnnual ? "annual" : "monthly"}
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.2 }}
                          className="font-[family-name:var(--font-dm-sans)] text-4xl font-bold text-[#F4F4F5]"
                        >
                          {isAnnual
                            ? tier.price.annual
                            : tier.price.monthly}
                        </motion.span>
                      </AnimatePresence>
                      <span className="text-[#52525B] text-sm mb-1">/mo</span>
                    </div>
                  )}
                  {isAnnual && tier.price.monthly !== null && tier.price.monthly > 0 && (
                    <p className="text-xs text-[#F59E0B] mt-1">
                      Billed ${(tier.price.annual ?? 0) * 12}/year — save ${((tier.price.monthly ?? 0) - (tier.price.annual ?? 0)) * 12}/yr
                    </p>
                  )}
                </div>

                {/* Features */}
                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className="w-4 h-4 rounded-full bg-[#4F46E5]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check size={10} className="text-[#6366F1]" />
                      </div>
                      <span className="text-sm text-[#A1A1AA]">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={tier.price.monthly === null ? "/contact" : "/contact"}
                  className={[
                    "cursor-pointer inline-flex items-center justify-center w-full py-3.5 rounded-xl text-sm font-semibold transition-all duration-200",
                    tier.highlighted
                      ? "bg-[#4F46E5] hover:bg-[#6366F1] text-white shadow-lg shadow-indigo-500/25"
                      : "bg-transparent border border-[#27272A] hover:border-[#4F46E5] text-[#F4F4F5]",
                  ].join(" ")}
                >
                  {tier.cta}
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Feature comparison note */}
      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-6">
          <ScrollReveal variants={fadeUp}>
            <div className="rounded-2xl border border-[#27272A] bg-[#111113] p-8 text-center">
              <p className="text-[#71717A] text-sm mb-2">All tiers include:</p>
              <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 mt-4">
                {[
                  "NFC stampers included",
                  "No setup fee",
                  "Unlimited stamps",
                  "SSL encryption",
                  "99.9% uptime SLA",
                  "Cancel any time",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <Check size={12} className="text-[#4F46E5]" />
                    <span className="text-sm text-[#A1A1AA]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-28">
        <div className="max-w-3xl mx-auto px-6">
          <ScrollReveal>
            <h2 className="font-[family-name:var(--font-dm-sans)] text-3xl font-bold text-[#F4F4F5] text-center mb-12">
              Frequently asked questions
            </h2>
          </ScrollReveal>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} variants={fadeUp} delay={i * 0.05}>
                <div className="rounded-xl border border-[#27272A] bg-[#111113] overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-4 text-left cursor-pointer group"
                    aria-expanded={openFaq === i}
                  >
                    <span className="text-sm font-medium text-[#F4F4F5] group-hover:text-white transition-colors duration-200">
                      {faq.q}
                    </span>
                    <motion.div
                      animate={{ rotate: openFaq === i ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0 ml-4 text-[#52525B]"
                    >
                      <ChevronDown size={16} />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 border-t border-[#27272A]/50">
                          <p className="text-sm text-[#71717A] leading-relaxed pt-4">
                            {faq.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="pb-28">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-[family-name:var(--font-dm-sans)] text-3xl font-bold text-[#F4F4F5] mb-4">
            Still have questions?
          </h2>
          <p className="text-[#71717A] mb-8">
            Book a 15-minute call and we&apos;ll answer everything — no sales pressure, no pitch deck.
          </p>
          <Link
            href="/contact"
            className="cursor-pointer inline-flex items-center gap-2 bg-[#4F46E5] hover:bg-[#6366F1] text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/25"
          >
            Talk to a Human
          </Link>
        </div>
      </section>
    </main>
  );
}
