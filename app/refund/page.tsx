import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Refund Policy — Your One',
  description: 'Refund and cancellation policy for Your One digital products.',
}

const LAST_UPDATED = 'May 28, 2025'
const CONTACT_EMAIL = 'support@yourone.world'

export default function RefundPage() {
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
          Refund Policy
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: '3rem' }}>Last updated: {LAST_UPDATED}</p>

        {/* Summary callout */}
        <div style={{ padding: '1.25rem 1.5rem', background: 'rgba(200,184,248,0.08)', border: '1px solid rgba(200,184,248,0.25)', borderRadius: '12px', marginBottom: '3rem' }}>
          <p style={{ fontSize: '0.95rem', lineHeight: 1.75 }}>
            <strong style={{ color: 'var(--accent)' }}>Summary:</strong>{' '}
            Because Digital Results are delivered instantly and are personalised to your quiz answers, we generally do not offer refunds. However, if something went wrong on our end, we will always make it right. Contact us within <strong style={{ color: 'var(--text)' }}>14 days</strong> of purchase.
          </p>
        </div>

        <Section title="1. Digital Products">
          Your One sells digital content (&quot;Digital Results&quot;) — personalised creative outputs generated from your quiz answers, including spirit animals, digital world descriptions, celebrity matches, and planet assignments.

          <p style={{ marginTop: '1rem' }}>
            Because these products are:
          </p>
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem', lineHeight: 2, color: 'var(--muted)' }}>
            <li>Delivered immediately upon successful payment</li>
            <li>Personalised and unique to your specific answers</li>
            <li>Consumed at the point of delivery</li>
          </ul>
          <p style={{ marginTop: '1rem' }}>
            …they are generally non-refundable once delivered, in accordance with consumer rights exceptions for digital content that has been supplied and immediately consumed.
          </p>
        </Section>

        <Section title="2. When We Will Refund">
          We will issue a full refund in the following circumstances:
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.75rem', lineHeight: 2, color: 'var(--muted)' }}>
            <li>You were charged but your Digital Result was not delivered due to a technical error</li>
            <li>You were charged more than once for the same purchase (duplicate charge)</li>
            <li>The product you received was materially different from what was described</li>
            <li>A technical fault on our side prevented you from accessing your result</li>
          </ul>
        </Section>

        <Section title="3. When We Do Not Refund">
          Refunds will not be issued in the following circumstances:
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.75rem', lineHeight: 2, color: 'var(--muted)' }}>
            <li>You received your Digital Result but did not like or agree with the outcome</li>
            <li>You changed your mind after purchase</li>
            <li>You made a purchase by mistake (please review your order carefully before paying)</li>
            <li>More than 14 days have passed since the purchase date</li>
          </ul>
        </Section>

        <Section title="4. How to Request a Refund">
          To request a refund, please email us at <strong style={{ color: 'var(--accent)' }}>{CONTACT_EMAIL}</strong> with the following information:
          <ul style={{ paddingLeft: '1.5rem', marginTop: '0.75rem', lineHeight: 2, color: 'var(--muted)' }}>
            <li>The email address used during purchase</li>
            <li>Your order or transaction ID (found in your Paddle receipt)</li>
            <li>The date of purchase</li>
            <li>A brief description of the issue</li>
          </ul>
          <p style={{ marginTop: '1rem' }}>
            We will review your request and respond within <strong style={{ color: 'var(--text)' }}>3 business days</strong>. Approved refunds are processed by Paddle and typically appear on your statement within 5–10 business days, depending on your payment method and bank.
          </p>
        </Section>

        <Section title="5. Payment Processing">
          All payments and refunds are handled by Paddle.com Market Limited, our authorised Merchant of Record. Paddle is responsible for billing and will appear on your bank or card statement. Refunds are issued through Paddle back to your original payment method.
        </Section>

        <Section title="6. Chargebacks">
          We strongly encourage you to contact us directly before initiating a chargeback with your bank or card issuer. We will work in good faith to resolve any legitimate issue. Unjustified chargebacks may result in restrictions on your ability to use the Service in future.
        </Section>

        <Section title="7. EU / UK Consumer Rights">
          If you are a consumer in the European Union or United Kingdom, you may have a statutory right to withdraw from a digital content purchase within 14 days. However, by completing the quiz and making a purchase you expressly consent to immediate delivery of your Digital Result, and acknowledge that this right to withdrawal is waived upon delivery in accordance with applicable consumer protection law (EU Directive 2011/83/EU, Article 16(m); UK Consumer Contracts Regulations 2013, Regulation 28).
        </Section>

        <Section title="8. Changes to This Policy">
          We may update this Refund Policy from time to time. The most recent version is always available at yourone.world/refund and is effective from the date shown above.
        </Section>

        <Section title="9. Contact">
          For refund requests or any questions about this policy:
          <div style={{ marginTop: '0.75rem', padding: '1rem 1.25rem', background: 'rgba(255,255,255,0.04)', borderRadius: '10px', border: '1px solid var(--border)' }}>
            <p style={{ color: 'var(--accent)' }}>{CONTACT_EMAIL}</p>
            <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginTop: '0.25rem' }}>We aim to respond within 3 business days</p>
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
      {[['Pricing', '/pricing'], ['Terms of Service', '/terms'], ['Privacy Policy', '/privacy']].map(([label, href]) => (
        <Link key={href} href={href} style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.04em' }}>
          {label}
        </Link>
      ))}
    </footer>
  )
}
