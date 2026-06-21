export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "Demo", href: "/demo" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

export const FEATURES = [
  {
    id: "nfc-cards",
    icon: "Nfc",
    title: "NFC Loyalty Cards",
    description:
      "Customers tap their phone to the stamper. No app download. No friction. Instant loyalty.",
    size: "large",
  },
  {
    id: "qr-backup",
    icon: "QrCode",
    title: "QR Backup",
    description: "Every NFC stamp has a QR fallback for older devices.",
    size: "small",
  },
  {
    id: "analytics",
    icon: "BarChart3",
    title: "Real-Time Analytics",
    description:
      "Track visits, retention rates, top customers, and revenue impact across all locations.",
    size: "large",
  },
  {
    id: "multi-location",
    icon: "MapPin",
    title: "Multi-Location",
    description: "One dashboard for every branch. Unified loyalty across your whole business.",
    size: "small",
  },
  {
    id: "push-notifications",
    icon: "Bell",
    title: "Push Notifications",
    description: "Remind customers when they're close to a reward.",
    size: "small",
  },
  {
    id: "customer-insights",
    icon: "Users",
    title: "Customer Insights",
    description:
      "Understand visit frequency, churn risk, and your top 20% of customers by name.",
    size: "small",
  },
  {
    id: "rewards-engine",
    icon: "Gift",
    title: "Rewards Engine",
    description:
      "Stamp cards, point systems, tiered rewards — build any program in minutes.",
    size: "small",
  },
  {
    id: "wallet",
    icon: "Wallet",
    title: "Wallet Integration",
    description: "Apple Wallet and Google Wallet passes for zero-friction access.",
    size: "small",
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: "01",
    title: "Create Your Campaign",
    description:
      "Set up a loyalty program in minutes. Choose your stamp target, reward, and branding — no technical knowledge needed.",
    icon: "Layers",
  },
  {
    step: "02",
    title: "Customer Taps the Stamper",
    description:
      "Your NFC stamper sits on the counter. Customers tap their phone. A digital stamp appears — no app download, no sign-up.",
    icon: "Nfc",
  },
  {
    step: "03",
    title: "Stamps Accumulate",
    description:
      "Each visit adds a digital mark to their loyalty card. They see their progress in real time. The goal is visible. The reward is real.",
    icon: "Stamp",
  },
  {
    step: "04",
    title: "Unlock the Reward",
    description:
      "When the card is complete, the reward unlocks instantly. Amber glow. The Kenaz mark lights up. They come back because it felt earned.",
    icon: "Gift",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "We replaced paper stamp cards six months ago. Retention went from 34% to 67%. The data alone is worth every penny.",
    name: "Sophie Laurent",
    role: "Owner",
    business: "Maison Café, Paris",
    avatar: "SL",
  },
  {
    quote:
      "My customers love tapping their phones. It feels premium. They show their loyalty card to their friends. Free marketing.",
    name: "James Okafor",
    role: "Founder",
    business: "Barber & Co, London",
    avatar: "JO",
  },
  {
    quote:
      "I manage 12 locations. Glyph gives me one view of every customer, every visit, every location. It changed how I run the business.",
    name: "Mei Tanaka",
    role: "Operations Director",
    business: "Sakura Wellness, Tokyo",
    avatar: "MT",
  },
];

export const PRICING_TIERS = [
  {
    name: "Starter",
    price: { monthly: 0, annual: 0 },
    description: "For single-location businesses just getting started.",
    features: [
      "1 location",
      "QR code stamps (no hardware needed)",
      "Up to 200 active customers",
      "Basic analytics",
      "NFC stamper add-on — from $49",
      "Email support",
    ],
    addOnNote: "NFC stampers from $49. First stamper 50% off when upgrading to Growth.",
    cta: "Start Free",
    highlighted: false,
  },
  {
    name: "Growth",
    price: { monthly: 29, annual: 23 },
    description: "For growing businesses that want real insights.",
    features: [
      "Up to 3 locations",
      "3 NFC stampers",
      "Unlimited customers",
      "Full analytics dashboard",
      "Push notifications",
      "Customer insights",
      "Priority support",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: { monthly: null, annual: null },
    description: "For multi-location chains and franchise groups.",
    features: [
      "Unlimited locations",
      "Custom stamper branding",
      "Advanced analytics & API",
      "Wallet integration",
      "Dedicated success manager",
      "Custom onboarding",
      "SLA guarantee",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export const TRUSTED_BY = [
  "Maison Café",
  "Barber & Co",
  "Sakura Wellness",
  "The Roast Room",
  "Bloom Florist",
  "Nova Fitness",
  "Craft & Pour",
  "Studio One",
];

export const BRAND_VALUES = [
  {
    num: "01",
    title: "The Mark Matters",
    description:
      "Every interaction should feel intentional. A Glyph stamp isn't a transaction — it's an acknowledgment.",
  },
  {
    num: "02",
    title: "Invisible Technology",
    description:
      "The best technology disappears. Complexity lives in our code, not in your workflow.",
  },
  {
    num: "03",
    title: "Earned, Not Automated",
    description:
      "Loyalty is built visit by visit, mark by mark. We build programs where rewards feel genuinely deserved.",
  },
  {
    num: "04",
    title: "Precision Over Flash",
    description:
      "We are not a startup that moves fast and breaks things. Small businesses trust us with their most important asset: their repeat customers.",
  },
  {
    num: "05",
    title: "Permanent Records",
    description:
      "Paper fades. Digital persists. Every mark is a permanent record of a real human relationship.",
  },
  {
    num: "06",
    title: "Global by Design",
    description:
      "A café in Tokyo, a salon in London, a restaurant in São Paulo — Glyph works everywhere.",
  },
];
