import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy — Your One',
  description: 'How Your One collects, uses, and protects your information.',
}

const LAST_UPDATED = 'May 28, 2025'
const CONTACT_EMAIL = 'support@yourone.world'

export default function PrivacyPage() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <nav style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ color: 'var(--text)', textDecoration: 'none', fontFamily: "'Playfair Display', serif", fontSize: '1.2rem' }}>
          Your One
        </Link>
        <Link href="/" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '0.875rem', letterSpacing: '0.04em' }}>
          ← Back
        </Link>
      </nav>

      <article style={{ maxWidth: '720px', margin: '0 auto', padding: 'clamp(2.5rem, 6vw, 5rem) 1.5rem 5rem' }}>
        <p style={{ color: 'var(--accent)', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>Legal</p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 400, marginBottom: '0.75rem' }}>
          Privacy Policy
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: '3rem' }}>Last updated: {LAST_UPDATED}</p>

        <Section title="1. Introduction">
          Your One (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard information when you visit yourone.world and make purchases through our Service. Please read this policy carefully.
        </Section>

        <Section title="2. Information We Collect">
          <p style={{ marginBottom: '0.75rem' }}>
            <strong style={{ color: 'var(--text)' }}>Information you provide:</strong> When you complete our quiz and make a purchase, we collect your quiz answers and the email address used for payment receipt (handled by our payment processor, Paddle).
          </p>
          <p style={{ marginBottom: '0.75rem' }}>
            <strong style={{ color: 'var(--text)' }}>Payment information:</strong> We do not collect or store your payment card details. All payment processing is handled by Paddle.com Market Limited, who act as our Merchant of Record. Paddle&apos;s privacy policy governs their handling of your payment data.
          </p>
          <p>
            <strong style={{ color: 'var(--text)' }}>Automatically collected information:</strong> We may automatically collect certain technical information, including your IP address, browser type, device type, pages viewed, and time spent on the Service. This is used solely for service operation and improvement.
          </p>
        </Section>

        <Section title="3. How We Use Your Information">
          We use the information we collect to:
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.75rem', lineHeight: 2, color: 'var(--muted)' }}>
            <li>Deliver your personalised Digital Result</li>
            <li>Process and fulfil your purchase</li>
            <li>Send transactional communications (purchase confirmation, support responses)</li>
            <li>Improve and maintain the Service</li>
            <li>Comply with legal obligations</li>
            <li>Detect and prevent fraud or abuse</li>
          </ul>
          <p style={{ marginTop: '1rem' }}>
            We do not sell your personal information to third parties for marketing purposes.
          </p>
        </Section>

        <Section title="4. Quiz Answers">
          Your quiz answers are used to generate your personalised result and to improve the quality of our quiz experiences. Quiz answers are not personally identifiable unless linked to a purchase. We may use aggregated, anonymised quiz data for analytics and product development.
        </Section>

        <Section title="5. Cookies and Tracking">
          We use essential cookies to operate the Service (e.g., session state). We may also use analytics tools that set cookies to understand how visitors use the site. You can disable cookies in your browser settings, though this may affect certain functionality. We do not use advertising or tracking cookies for cross-site behavioural advertising.
        </Section>

        <Section title="6. Data Sharing and Disclosure">
          <p style={{ marginBottom: '0.75rem' }}>We share your information only in the following circumstances:</p>
          <ul style={{ paddingLeft: '1.5rem', lineHeight: 2, color: 'var(--muted)' }}>
            <li><strong style={{ color: 'var(--text)' }}>Paddle:</strong> As our payment processor and Merchant of Record, Paddle receives the information necessary to process your transaction.</li>
            <li><strong style={{ color: 'var(--text)' }}>Service providers:</strong> Trusted third parties who assist us in operating the Service (e.g., hosting, analytics), bound by confidentiality obligations.</li>
            <li><strong style={{ color: 'var(--text)' }}>Legal requirements:</strong> When required by law, court order, or to protect the rights and safety of our users or the public.</li>
            <li><strong style={{ color: 'var(--text)' }}>Business transfers:</strong> In connection with a merger, acquisition, or sale of assets, with appropriate confidentiality protections.</li>
          </ul>
        </Section>

        <Section title="7. Data Retention">
          We retain personal data only as long as necessary to provide the Service and fulfil the purposes described in this policy, or as required by law. Purchase records may be retained for tax and accounting purposes for up to 7 years. Quiz answers are retained in anonymised form only.
        </Section>

        <Section title="8. Your Rights">
          Depending on your location, you may have the following rights regarding your personal data:
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.75rem', lineHeight: 2, color: 'var(--muted)' }}>
            <li>Right to access the personal data we hold about you</li>
            <li>Right to correct inaccurate data</li>
            <li>Right to erasure (&quot;right to be forgotten&quot;)</li>
            <li>Right to restriction of processing</li>
            <li>Right to data portability</li>
            <li>Right to object to processing</li>
          </ul>
          <p style={{ marginTop: '1rem' }}>
            To exercise any of these rights, please contact us at {CONTACT_EMAIL}. We will respond within 30 days.
          </p>
        </Section>

        <Section title="9. Children's Privacy">
          The Service is not directed to children under 13. We do not knowingly collect personal information from children under 13. If you believe a child under 13 has provided us with personal information, please contact us immediately and we will take steps to delete that information.
        </Section>

        <Section title="10. Security">
          We implement reasonable technical and organisational measures to protect your information from unauthorised access, disclosure, or destruction. However, no internet transmission or electronic storage is 100% secure. We cannot guarantee absolute security.
        </Section>

        <Section title="11. Third-Party Links">
          The Service may contain links to third-party websites. We are not responsible for the privacy practices of those sites and encourage you to review their privacy policies.
        </Section>

        <Section title="12. International Data Transfers">
          Your information may be transferred to and processed in countries other than your own. We take appropriate safeguards to ensure such transfers comply with applicable data protection laws.
        </Section>

        <Section title="13. Changes to This Policy">
          We may update this Privacy Policy from time to time. We will indicate the date of the most recent revision at the top of this page. Your continued use of the Service after changes constitutes acceptance of the revised policy.
        </Section>

        <Section title="14. Contact Us">
          For any privacy-related questions, requests, or concerns:
          <div style={{ marginTop: '0.75rem', padding: '1rem 1.25rem', background: 'rgba(255,255,255,0.04)', borderRadius: '10px', border: '1px solid var(--border)' }}>
            <p style={{ color: 'var(--accent)' }}>{CONTACT_EMAIL}</p>
            <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>yourone.world</p>
          </div>
        </Section>
      </article>

      <Footer />
    </main>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: '2.5rem' }}>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.15rem', fontWeight: 400, color: 'var(--accent)', marginBottom: '0.875rem' }}>
        {title}
      </h2>
      <div style={{ color: 'var(--muted)', fontSize: '0.925rem', lineHeight: 1.8 }}>
        {children}
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border)', padding: '1.5rem 2rem', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}>
      {[['Pricing', '/pricing'], ['Terms of Service', '/terms'], ['Refund Policy', '/refund']].map(([label, href]) => (
        <Link key={href} href={href} style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.04em' }}>
          {label}
        </Link>
      ))}
    </footer>
  )
}
