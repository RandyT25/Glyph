import type { Metadata } from "next";
import Hero from "@/components/sections/hero";
import TrustedBy from "@/components/sections/trusted-by";
import HowItWorks from "@/components/sections/how-it-works";
import FeaturesBento from "@/components/sections/features-bento";
import PhoneShowcase from "@/components/sections/phone-showcase";
import Testimonials from "@/components/sections/testimonials";
import PricingTeaser from "@/components/sections/pricing-teaser";
import FinalCTA from "@/components/sections/final-cta";

export const metadata: Metadata = {
  title: "Glyph — NFC Loyalty Platform",
  description:
    "Replace paper stamp cards with beautiful NFC-powered digital rewards. Turn every customer visit into lasting loyalty.",
};

export default function HomePage() {
  return (
    <main>
      <Hero />
      <TrustedBy />
      <HowItWorks />
      <FeaturesBento />
      <PhoneShowcase />
      <Testimonials />
      <PricingTeaser />
      <FinalCTA />
    </main>
  );
}
