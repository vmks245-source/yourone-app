import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service — Your One',
  description: 'Terms and conditions governing use of yourone.world.',
}

const LAST_UPDATED = 'May 28, 2025'
const CONTACT_EMAIL = 'support@yourone.world'

export default function TermsPage() {
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
          Terms of Service
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: '3rem' }}>Last updated: {LAST_UPDATED}</p>

        <Section title="1. Acceptance of Terms">
          By accessing or using yourone.world ("the Service"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the Service.
        </Section>

        <Section title="2. Description of Service">
          Your One provides personalised digital content in the form of quiz-based results ("Digital Results"), including but not limited to spirit animal assignments, digital world descriptions, celebrity matches, and planet assignments. These are creative, entertainment-based digital products delivered instantly upon purchase.
        </Section>

        <Section title="3. Eligibility">
          You must be at least 13 years of age to use this Service. By using the Service, you represent and warrant that you meet this requirement. If you are under 18, you may only use the Service with the involvement and consent of a parent or legal guardian.
        </Section>

        <Section title="4. Purchases and Payments">
          <p style={{ marginBottom: '0.75rem' }}>
            All purchases on the Service are processed by Gumroad.com Market Limited ("Gumroad"), our authorised reseller and Merchant of Record. Gumroad handles all payment processing, tax compliance, and invoicing. Your purchase is subject to Gumroad&apos;s terms and conditions in addition to these terms.
          </p>
          <p>
            Prices are displayed in USD. Applicable taxes may be added at checkout depending on your location. You agree to pay all charges incurred by you or any users of your account at the prices in effect when such charges are incurred.
          </p>
        </Section>

        <Section title="5. Digital Products and Delivery">
          Digital Results are delivered immediately upon successful payment. Because delivery is instant and the content is personalised to your quiz answers, these products are not eligible for exchange or substitution. Please refer to our Refund Policy for details on our refund procedures.
        </Section>

        <Section title="6. Intellectual Property">
          All content on the Service, including text, graphics, logos, images, and the Digital Results generated for you, are the property of Your One or its content suppliers and are protected by applicable intellectual property laws. Your Digital Result is licensed to you for personal, non-commercial use only. You may not resell, redistribute, or commercially exploit any content from the Service.
        </Section>

        <Section title="7. User Conduct">
          You agree not to:
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.75rem', lineHeight: 2, color: 'var(--muted)' }}>
            <li>Attempt to reverse-engineer, scrape, or systematically extract content from the Service</li>
            <li>Use automated tools to interact with the Service</li>
            <li>Interfere with or disrupt the integrity or performance of the Service</li>
            <li>Attempt to gain unauthorised access to any portion of the Service</li>
            <li>Use the Service for any unlawful purpose</li>
          </ul>
        </Section>

        <Section title="8. Disclaimer of Warranties">
          The Service and all Digital Results are provided &quot;as is&quot; and &quot;as available&quot; without any warranties of any kind, either express or implied. Your One makes no warranties regarding the accuracy, reliability, or completeness of any content. Digital Results are for entertainment purposes only and should not be relied upon for any decision-making.
        </Section>

        <Section title="9. Limitation of Liability">
          To the maximum extent permitted by applicable law, Your One shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of, or inability to use, the Service or any Digital Results, even if advised of the possibility of such damages. Our total liability to you for any claim shall not exceed the amount you paid for the specific product giving rise to the claim.
        </Section>

        <Section title="10. Privacy">
          Your use of the Service is also governed by our Privacy Policy, which is incorporated into these Terms by reference. Please review our Privacy Policy to understand our practices.
        </Section>

        <Section title="11. Changes to Terms">
          We reserve the right to modify these Terms at any time. We will indicate the date of the most recent update at the top of this page. Your continued use of the Service following any changes constitutes your acceptance of the revised Terms.
        </Section>

        <Section title="12. Governing Law">
          These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles. Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts in the applicable jurisdiction.
        </Section>

        <Section title="13. Contact">
          If you have any questions about these Terms, please contact us at:
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
      {[['Pricing', '/pricing'], ['Privacy Policy', '/privacy'], ['Refund Policy', '/refund']].map(([label, href]) => (
        <Link key={href} href={href} style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.04em' }}>
          {label}
        </Link>
      ))}
    </footer>
  )
}
