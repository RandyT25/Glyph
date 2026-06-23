import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Glyph",
  description: "Terms and conditions for using the Glyph loyalty platform.",
};

const LAST_UPDATED = "22 June 2026";

export default function TermsPage() {
  return (
    <main className="bg-[#09090B] min-h-screen">
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        {/* Header */}
        <div className="mb-12">
          <span className="inline-block mb-4 text-xs font-semibold uppercase tracking-widest text-[#6366F1] bg-[#4F46E5]/10 px-3 py-1 rounded-full border border-[#4F46E5]/20">
            Legal
          </span>
          <h1 className="font-[family-name:var(--font-dm-sans)] text-4xl sm:text-5xl font-bold text-[#F4F4F5] mb-4">
            Terms of Service
          </h1>
          <p className="text-[#52525B] text-sm">Last updated: {LAST_UPDATED}</p>
        </div>

        <div className="space-y-10 text-[#A1A1AA] leading-relaxed">

          <Section title="1. Acceptance of terms">
            <p>
              By creating an account or using the Glyph platform (&quot;Service&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree, do not use the Service.
            </p>
            <p>
              These Terms apply to all users, including merchants who create and manage loyalty programmes (&quot;Merchants&quot;) and customers who participate in those programmes (&quot;Customers&quot;).
            </p>
          </Section>

          <Section title="2. Description of service">
            <p>
              Glyph provides an NFC-based loyalty platform that allows Merchants to create stamp card programmes and Customers to collect stamps and redeem rewards. The Service includes:
            </p>
            <ul>
              <li>A merchant dashboard for managing campaigns, locations, and NFC tags</li>
              <li>A customer portal for viewing loyalty cards, stamp history, and rewards</li>
              <li>An NFC tap-to-stamp system via signed tokens</li>
              <li>Analytics and reporting tools for merchants</li>
            </ul>
          </Section>

          <Section title="3. Accounts">
            <p>
              You must create an account to use Glyph. You are responsible for maintaining the security of your account credentials and for all activity that occurs under your account.
            </p>
            <p>
              You must provide accurate and complete information when creating your account. You may not impersonate another person or use a name you are not authorised to use.
            </p>
            <p>
              You must be at least 16 years old to create an account. By creating an account, you confirm that you meet this requirement.
            </p>
          </Section>

          <Section title="4. Merchant obligations">
            <p>As a Merchant, you agree to:</p>
            <ul>
              <li>Honour the rewards described in your active loyalty campaigns</li>
              <li>Use NFC tags only for legitimate loyalty stamping purposes</li>
              <li>Not create misleading or fraudulent campaigns</li>
              <li>Comply with applicable data protection laws when collecting customer data through Glyph</li>
              <li>Not share your service role credentials or API keys with third parties</li>
            </ul>
            <p>
              Glyph is not responsible for disputes between Merchants and Customers regarding reward fulfilment. Merchants are solely responsible for delivering the rewards they promise.
            </p>
          </Section>

          <Section title="5. Acceptable use">
            <p>You may not use Glyph to:</p>
            <ul>
              <li>Violate any applicable laws or regulations</li>
              <li>Forge, tamper with, or reverse-engineer NFC tokens</li>
              <li>Automate or artificially generate stamp events</li>
              <li>Scrape, crawl, or extract data from the platform without authorisation</li>
              <li>Transmit malware, spam, or any harmful content</li>
              <li>Interfere with or disrupt the integrity or performance of the Service</li>
              <li>Attempt to gain unauthorised access to any part of the Service</li>
            </ul>
            <p>
              We reserve the right to suspend or terminate accounts that violate these terms, at our sole discretion.
            </p>
          </Section>

          <Section title="6. Intellectual property">
            <p>
              The Glyph platform, including all software, design, trademarks, and content (the Kenaz mark, the Ember system, the Glyph name), is owned by Glyph and protected by applicable intellectual property laws.
            </p>
            <p>
              You retain ownership of any content you submit to the platform (business names, campaign descriptions, logos). By submitting content, you grant Glyph a non-exclusive licence to use that content solely to provide the Service.
            </p>
          </Section>

          <Section title="7. Pricing and payment">
            <p>
              Glyph offers a free Starter plan and paid plans (Growth, Enterprise). Paid plan pricing is shown on our pricing page.
            </p>
            <p>
              Paid plans are billed monthly or annually as selected. All fees are non-refundable except as required by law or as explicitly stated in a separate agreement.
            </p>
            <p>
              We reserve the right to change pricing with 30 days&apos; notice. Continued use after a price change constitutes acceptance of the new pricing.
            </p>
          </Section>

          <Section title="8. Limitation of liability">
            <p>
              To the maximum extent permitted by applicable law, Glyph is not liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill, arising out of or in connection with your use of the Service.
            </p>
            <p>
              Our total liability to you for any claim arising out of or relating to these Terms or the Service is limited to the amount you paid us in the 12 months preceding the claim, or $100 USD, whichever is greater.
            </p>
          </Section>

          <Section title="9. Disclaimers">
            <p>
              The Service is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, express or implied, including warranties of merchantability, fitness for a particular purpose, or non-infringement.
            </p>
            <p>
              We do not warrant that the Service will be uninterrupted, error-free, or free of viruses or other harmful components. NFC functionality depends on device and browser support, which Glyph does not control.
            </p>
          </Section>

          <Section title="10. Termination">
            <p>
              You may delete your account at any time. We may suspend or terminate your access to the Service at any time for any reason, including violation of these Terms.
            </p>
            <p>
              On termination, your right to use the Service ceases immediately. We will handle your data as described in our Privacy Policy.
            </p>
          </Section>

          <Section title="11. Changes to these terms">
            <p>
              We may update these Terms from time to time. We will notify you of material changes by email or by displaying a notice in the platform. Continued use of Glyph after changes take effect constitutes acceptance of the revised Terms.
            </p>
          </Section>

          <Section title="12. Governing law">
            <p>
              These Terms are governed by and construed in accordance with applicable law. Any disputes arising under these Terms shall be resolved through good-faith negotiation. If negotiation fails, disputes shall be submitted to binding arbitration.
            </p>
          </Section>

          <Section title="13. Contact">
            <p>
              For questions about these Terms, contact us at{" "}
              <a href="mailto:randythurion@gmail.com" className="text-[#4F46E5] hover:text-[#6366F1] transition-colors">
                randythurion@gmail.com
              </a>.
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
      <div className="space-y-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5 [&_li]:text-sm">
        {children}
      </div>
    </section>
  );
}
