import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Glyph",
  description: "How Glyph collects, uses, and protects your data.",
};

const LAST_UPDATED = "22 June 2026";

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-[#09090B] min-h-screen">
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        {/* Header */}
        <div className="mb-12">
          <span className="inline-block mb-4 text-xs font-semibold uppercase tracking-widest text-[#6366F1] bg-[#4F46E5]/10 px-3 py-1 rounded-full border border-[#4F46E5]/20">
            Legal
          </span>
          <h1 className="font-[family-name:var(--font-dm-sans)] text-4xl sm:text-5xl font-bold text-[#F4F4F5] mb-4">
            Privacy Policy
          </h1>
          <p className="text-[#52525B] text-sm">Last updated: {LAST_UPDATED}</p>
        </div>

        <div className="prose prose-invert max-w-none space-y-10 text-[#A1A1AA] leading-relaxed">

          <Section title="1. Who we are">
            <p>
              Glyph (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) operates the Glyph loyalty platform, including the web application at{" "}
              <span className="text-[#F4F4F5]">glyph-app-sigma.vercel.app</span> and the marketing website. We provide NFC-based customer loyalty tools for merchants and their customers.
            </p>
            <p>
              For questions about this policy, contact us at{" "}
              <a href="mailto:randythurion@gmail.com" className="text-[#4F46E5] hover:text-[#6366F1] transition-colors">
                randythurion@gmail.com
              </a>.
            </p>
          </Section>

          <Section title="2. Information we collect">
            <Subsection title="From merchants">
              <ul>
                <li>Account information: name, email address, business name, business type</li>
                <li>Location details: business address, city, country</li>
                <li>Campaign configuration: stamp targets, reward descriptions, campaign settings</li>
                <li>NFC tag data: tag identifiers, registration tokens, tap history</li>
              </ul>
            </Subsection>
            <Subsection title="From customers">
              <ul>
                <li>Account information: name, email address</li>
                <li>Loyalty activity: stamps earned, rewards redeemed, visit history</li>
                <li>Device information collected at the time of NFC taps (IP address, timestamp)</li>
                <li>Referral codes you share or use</li>
              </ul>
            </Subsection>
            <Subsection title="Automatically">
              <ul>
                <li>Log data: IP addresses, browser type, pages visited, time spent</li>
                <li>Usage data: features used, interactions within the platform</li>
              </ul>
            </Subsection>
          </Section>

          <Section title="3. How we use your information">
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve the Glyph platform</li>
              <li>Process NFC stamp events and award loyalty rewards</li>
              <li>Authenticate users and protect accounts</li>
              <li>Send transactional emails (password resets, reward notifications)</li>
              <li>Provide merchants with analytics about their loyalty programmes</li>
              <li>Detect and prevent fraud, abuse, and security incidents</li>
              <li>Comply with legal obligations</li>
            </ul>
            <p>
              We do not sell your personal data to third parties. We do not use your data for advertising purposes.
            </p>
          </Section>

          <Section title="4. Data sharing">
            <p>We share data only in the following circumstances:</p>
            <ul>
              <li>
                <strong className="text-[#F4F4F5]">Service providers:</strong> We use Supabase (database and authentication) and Vercel (hosting). These providers process data on our behalf under data processing agreements.
              </li>
              <li>
                <strong className="text-[#F4F4F5]">Merchants and customers:</strong> Merchants can see anonymised analytics about their customers&apos; loyalty activity. Customers can see their own stamp and reward history.
              </li>
              <li>
                <strong className="text-[#F4F4F5]">Legal requirements:</strong> We may disclose data if required by law, court order, or to protect the rights and safety of Glyph or others.
              </li>
            </ul>
          </Section>

          <Section title="5. Data retention">
            <p>
              We retain your account data for as long as your account is active. If you delete your account, we will delete your personal data within 30 days, except where we are required to retain it for legal or compliance reasons.
            </p>
            <p>
              Anonymised, aggregated analytics data (with no link to individual users) may be retained indefinitely.
            </p>
          </Section>

          <Section title="6. Security">
            <p>
              We implement appropriate technical and organisational measures to protect your data, including:
            </p>
            <ul>
              <li>Encryption of data in transit (TLS) and at rest</li>
              <li>Row-level security policies on all database tables</li>
              <li>JWT-signed NFC tokens with expiration</li>
              <li>Rate limiting on stamp and authentication endpoints</li>
            </ul>
            <p>
              No method of transmission over the internet is 100% secure. We cannot guarantee absolute security, but we take it seriously.
            </p>
          </Section>

          <Section title="7. Your rights">
            <p>Depending on your location, you may have the right to:</p>
            <ul>
              <li>Access the personal data we hold about you</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Export your data in a portable format</li>
              <li>Object to or restrict certain processing</li>
            </ul>
            <p>
              To exercise any of these rights, email us at{" "}
              <a href="mailto:randythurion@gmail.com" className="text-[#4F46E5] hover:text-[#6366F1] transition-colors">
                randythurion@gmail.com
              </a>. We will respond within 30 days.
            </p>
          </Section>

          <Section title="8. Cookies">
            <p>
              We use only essential cookies required to maintain your authenticated session. We do not use tracking, advertising, or analytics cookies.
            </p>
          </Section>

          <Section title="9. Children">
            <p>
              Glyph is not directed at children under 16. We do not knowingly collect personal data from children. If you believe a child has provided us with data, please contact us and we will delete it promptly.
            </p>
          </Section>

          <Section title="10. Changes to this policy">
            <p>
              We may update this Privacy Policy from time to time. We will notify users of material changes by email or by displaying a notice in the platform. Continued use of Glyph after changes constitutes acceptance of the updated policy.
            </p>
          </Section>

        </div>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="font-[family-name:var(--font-dm-sans)] text-lg font-semibold text-[#F4F4F5]">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function Subsection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-[#F4F4F5]">{title}</h3>
      <div className="pl-4 space-y-1 [&_ul]:list-disc [&_ul]:pl-4 [&_ul]:space-y-1 [&_li]:text-sm">
        {children}
      </div>
    </div>
  );
}
