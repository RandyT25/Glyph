import Link from "next/link";

const POSTS = [
  {
    slug: "why-nfc-loyalty-beats-paper-cards",
    title: "Why NFC loyalty beats paper stamp cards",
    date: "June 18, 2026",
    excerpt: "Paper stamp cards get lost, forged, and forgotten. NFC loyalty turns every visit into a frictionless tap — and gives you the data to act on.",
    readTime: "4 min read",
    category: "Merchant tips",
  },
  {
    slug: "how-to-increase-customer-retention",
    title: "5 loyalty tactics that actually increase retention",
    date: "June 10, 2026",
    excerpt: "Most loyalty programs fail because they reward purchases, not relationships. Here's what the data says about what keeps customers coming back.",
    readTime: "6 min read",
    category: "Strategy",
  },
  {
    slug: "anatomy-of-a-great-stamp-campaign",
    title: "The anatomy of a great stamp campaign",
    date: "May 29, 2026",
    excerpt: "Stamp target, reward value, campaign name — small decisions that compound. We break down what separates a campaign with 40% redemption from one with 8%.",
    readTime: "5 min read",
    category: "Product",
  },
  {
    slug: "nfc-vs-qr-codes-for-loyalty",
    title: "NFC vs QR codes for loyalty — what's the difference?",
    date: "May 20, 2026",
    excerpt: "Both live on your counter. One taps, one scans. Here's how to choose the right method — and why Glyph supports both.",
    readTime: "3 min read",
    category: "Product",
  },
  {
    slug: "push-notifications-done-right",
    title: "Push notifications done right: how to reach customers without annoying them",
    date: "May 12, 2026",
    excerpt: "Permission-based push notifications see 34% open rates — 4× email. The secret: timing and relevance. Here's the playbook.",
    readTime: "5 min read",
    category: "Marketing",
  },
];

export const metadata = {
  title: "Blog — Glyph",
  description: "Loyalty tips, product updates, and merchant stories from the Glyph team.",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#09090B] pt-24 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#4F46E5] mb-3">The Glyph Blog</p>
          <h1
            className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Loyalty that works
          </h1>
          <p className="text-[#71717A] text-lg max-w-md mx-auto">
            Tips for merchants, product updates, and stories from the community.
          </p>
        </div>

        <div className="space-y-px">
          {POSTS.map((post, i) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col sm:flex-row sm:items-start gap-4 p-6 rounded-2xl hover:bg-[#111113] transition-colors"
              style={{ borderBottom: i < POSTS.length - 1 ? "1px solid #18181B" : "none" }}
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#4F46E5]">
                    {post.category}
                  </span>
                  <span className="text-[#3F3F46]">·</span>
                  <span className="text-xs text-[#52525B]">{post.readTime}</span>
                </div>
                <h2
                  className="text-lg font-bold text-white group-hover:text-[#A1A1AA] transition-colors leading-snug mb-2"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {post.title}
                </h2>
                <p className="text-sm text-[#71717A] line-clamp-2">{post.excerpt}</p>
              </div>
              <span className="text-xs text-[#3F3F46] sm:pt-1 flex-shrink-0">{post.date}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
