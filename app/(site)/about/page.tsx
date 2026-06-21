"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import GlyphMark from "@/components/common/glyph-mark";
import ScrollReveal from "@/components/animations/scroll-reveal";
import { BRAND_VALUES } from "@/lib/constants";
import { fadeUp, slideLeft, slideRight, scaleIn } from "@/lib/motion";

export default function AboutPage() {
  return (
    <main className="bg-[#09090B] min-h-screen">
      {/* Hero — large Kenaz mark */}
      <section className="pt-32 pb-20 text-center relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 50% -10%, rgba(79,70,229,0.12) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center mb-10"
          >
            <GlyphMark size={300} color="#4F46E5" showDot={true} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="inline-block mb-5 text-xs font-semibold uppercase tracking-widest text-[#6366F1] bg-[#4F46E5]/10 px-3 py-1 rounded-full border border-[#4F46E5]/20">
              Our Story
            </span>
            <h1 className="font-[family-name:var(--font-dm-sans)] text-5xl sm:text-6xl font-bold text-[#F4F4F5] leading-tight mb-6">
              Before the alphabet, there was the rune.
            </h1>
            <p className="text-lg text-[#71717A] leading-relaxed max-w-2xl mx-auto">
              Glyph was built on a simple conviction: the marks we make on the world&apos;s oldest relationships — merchant and customer — deserve to be permanent, intentional, and beautiful.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Brand story */}
      <section className="py-20 max-w-4xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <ScrollReveal variants={slideLeft}>
            <div className="space-y-6">
              <h2 className="font-[family-name:var(--font-dm-sans)] text-2xl font-bold text-[#F4F4F5]">
                Why we built Glyph
              </h2>
              <p className="text-[#71717A] leading-relaxed">
                Paper stamp cards are a broken promise. They get lost. They fade. They sit forgotten at the bottom of wallets. And when they do get completed, the business has no idea who just earned a free coffee, why they came back, or whether they&apos;ll return again.
              </p>
              <p className="text-[#71717A] leading-relaxed">
                We started Glyph because we believed loyalty deserved better infrastructure. Not an app — apps require downloads, accounts, maintenance. Not a QR sticker on a counter — that&apos;s just a digital version of the same broken promise. Something invisible. Something permanent. Something that works the same way in a café in Paris as it does in a barbershop in Lagos.
              </p>
              <p className="text-[#71717A] leading-relaxed">
                NFC was the answer. Tap, stamp, done. Under two seconds. No friction for anyone. And beneath it: a data layer that finally gives small business owners the customer intelligence that enterprise brands have had for decades.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal variants={slideRight}>
            <div className="space-y-6">
              <h2 className="font-[family-name:var(--font-dm-sans)] text-2xl font-bold text-[#F4F4F5]">
                The mark that started it all
              </h2>
              <p className="text-[#71717A] leading-relaxed">
                The Glyph logo is the Kenaz rune — one of the oldest symbols in the runic alphabet. In Proto-Germanic, it meant torch: a source of light, of knowledge, of controlled fire. It was the mark that humans made when they wanted to say: something important happened here.
              </p>
              <p className="text-[#71717A] leading-relaxed">
                We chose Kenaz because it encodes everything we believe about loyalty. A stamp is not a transaction. It&apos;s an acknowledgment. A customer walked through your door, spent their time and money with you, and in return you made a permanent mark: you were here, you matter, come back.
              </p>
              <p className="text-[#71717A] leading-relaxed">
                The amber dot at the tip of the rune is the torch flame. It represents the moment a reward unlocks — the payoff, the delight, the reason customers return. We call it the Ember.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* The Mark section */}
      <section className="py-20 bg-[#111113] border-y border-[#27272A]">
        <div className="max-w-4xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="inline-block mb-4 text-xs font-semibold uppercase tracking-widest text-[#F59E0B] bg-[#F59E0B]/10 px-3 py-1 rounded-full border border-[#F59E0B]/20">
                The Mark
              </span>
              <h2 className="font-[family-name:var(--font-dm-sans)] text-3xl sm:text-4xl font-bold text-[#F4F4F5] mb-4">
                What Kenaz means to us
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                symbol: "᚛",
                title: "Three Strokes",
                body: "The three lines of Kenaz represent the three parties in every loyalty relationship: the merchant, the customer, and the record between them. Every Glyph stamp is all three, in one tap.",
              },
              {
                symbol: "◆",
                title: "The Ember Dot",
                body: "The amber dot at the crown of the rune is the torch flame. In every Glyph stamp card, when the final stamp is earned, the Ember lights up — signalling that a reward has been unlocked.",
              },
              {
                symbol: "∞",
                title: "Permanence",
                body: "Kenaz was carved into stone because the maker intended it to last. Every digital stamp in Glyph is a permanent record. It cannot be lost, faded, or forgotten. It persists.",
              },
            ].map((item, i) => (
              <ScrollReveal key={item.title} variants={scaleIn} delay={i * 0.1}>
                <div className="text-center">
                  <div className="text-4xl mb-4 text-[#4F46E5] font-bold">{item.symbol}</div>
                  <h3 className="font-[family-name:var(--font-dm-sans)] font-semibold text-[#F4F4F5] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#71717A] leading-relaxed">{item.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <ScrollReveal variants={slideLeft}>
            <div className="rounded-2xl bg-[#4F46E5]/10 border border-[#4F46E5]/20 p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#6366F1] mb-4">Mission</p>
              <h3 className="font-[family-name:var(--font-dm-sans)] text-xl font-bold text-[#F4F4F5] mb-3">
                Make every visit count.
              </h3>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                Give every small business on earth the customer loyalty infrastructure that was previously only available to global chains — at a price that makes sense for a one-location café, barbershop, or studio.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal variants={slideRight}>
            <div className="rounded-2xl bg-[#F59E0B]/10 border border-[#F59E0B]/20 p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#F59E0B] mb-4">Vision</p>
              <h3 className="font-[family-name:var(--font-dm-sans)] text-xl font-bold text-[#F4F4F5] mb-3">
                A world where loyalty is earned, not hacked.
              </h3>
              <p className="text-sm text-[#A1A1AA] leading-relaxed">
                We believe loyalty is built visit by visit, mark by mark — not manufactured by discounts or dark patterns. The businesses that win long-term are the ones that make customers feel genuinely remembered.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Brand values */}
      <section className="py-20 bg-[#111113] border-t border-[#27272A]">
        <div className="max-w-6xl mx-auto px-6">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="inline-block mb-4 text-xs font-semibold uppercase tracking-widest text-[#6366F1] bg-[#4F46E5]/10 px-3 py-1 rounded-full border border-[#4F46E5]/20">
                Values
              </span>
              <h2 className="font-[family-name:var(--font-dm-sans)] text-3xl sm:text-4xl font-bold text-[#F4F4F5]">
                What we stand for
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BRAND_VALUES.map((value, i) => (
              <ScrollReveal key={value.num} variants={scaleIn} delay={i * 0.07}>
                <div className="rounded-2xl border border-[#27272A] bg-[#09090B] p-6 hover:border-[#4F46E5]/30 transition-all duration-300">
                  <div className="text-xs font-bold text-[#4F46E5] mb-3 tracking-widest">
                    {value.num}
                  </div>
                  <h3 className="font-[family-name:var(--font-dm-sans)] font-semibold text-[#F4F4F5] mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-[#71717A] leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-24">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <ScrollReveal variants={fadeUp}>
            <GlyphMark size={48} className="mx-auto mb-6" />
            <h2 className="font-[family-name:var(--font-dm-sans)] text-3xl font-bold text-[#F4F4F5] mb-4">
              Every tap, a mark of loyalty.
            </h2>
            <p className="text-[#71717A] mb-8">
              Join 500+ businesses building loyalty that lasts.
            </p>
            <Link
              href="/contact"
              className="cursor-pointer inline-flex items-center gap-2 bg-[#4F46E5] hover:bg-[#6366F1] text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/25"
            >
              Get Started
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
