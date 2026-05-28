import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pricing — Your One',
  description: 'Simple, one-time pricing for every digital world discovery.',
}

const PRODUCTS = [
  {
    emoji: '🌍',
    name: 'Your World',
    description: 'A living, breathing place — uniquely yours. Discover the landscape that mirrors your inner world.',
    price: '$1.80',
    accent: '#c8b8f8',
    glow: 'rgba(200,184,248,0.18)',
  },
  {
    emoji: '🐾',
    name: 'Spirit Animal',
    description: 'Which creature carries your soul? Ten questions reveal the animal that walks beside you.',
    price: '$0.99',
    accent: '#d4a96a',
    glow: 'rgba(192,120,40,0.18)',
  },
  {
    emoji: '⭐',
    name: 'Your Celebrity',
    description: 'Which icon resonates with your personality? Find the cultural figure who shares your energy.',
    price: '$1.50',
    accent: '#f8d44a',
    glow: 'rgba(248,212,74,0.18)',
  },
  {
    emoji: '🪐',
    name: 'Your Planet',
    description: 'Where in the cosmos do you truly belong? Your cosmic address, revealed.',
    price: '$2.90',
    accent: '#88ccff',
    glow: 'rgba(136,204,255,0.18)',
  },
]

export default function PricingPage() {
  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', fontFamily: "'Inter', -apple-system, sans-serif" }}>
      {/* Nav */}
      <nav style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ color: 'var(--text)', textDecoration: 'none', fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', letterSpacing: '0.02em' }}>
          Your One
        </Link>
        <Link href="/" style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '0.875rem', letterSpacing: '0.04em' }}>
          ← Back
        </Link>
      </nav>

      {/* Hero */}
      <section style={{ textAlign: 'center', padding: 'clamp(3rem, 8vw, 6rem) 1.5rem 2rem' }}>
        <p style={{ color: 'var(--accent)', fontSize: '0.8rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '1rem' }}>
          Pricing
        </p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.2rem, 6vw, 4rem)', fontWeight: 400, lineHeight: 1.15, marginBottom: '1.25rem' }}>
          One question.<br />One price.<br />One world.
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: '1.05rem', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
          Every discovery is a single, one-time payment. No subscriptions. No accounts required. Just answers.
        </p>
      </section>

      {/* Cards */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem 4rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
        {PRODUCTS.map((p) => (
          <div key={p.name} style={{
            background: `linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%)`,
            border: `1px solid ${p.glow.replace('0.18', '0.25')}`,
            borderRadius: '16px',
            padding: '2rem 1.75rem',
            boxShadow: `0 0 40px ${p.glow}`,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
          }}>
            <span style={{ fontSize: '2rem', lineHeight: 1 }}>{p.emoji}</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.35rem', fontWeight: 400, color: p.accent }}>
              {p.name}
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.65, flex: 1 }}>
              {p.description}
            </p>
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.25rem', display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
              <span style={{ fontSize: '2rem', fontWeight: 600, color: p.accent, letterSpacing: '-0.02em' }}>{p.price}</span>
              <span style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>one-time</span>
            </div>
          </div>
        ))}
      </section>

      {/* FAQ strip */}
      <section style={{ maxWidth: '620px', margin: '0 auto', padding: '0 1.5rem 5rem' }}>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 400, marginBottom: '1.75rem', textAlign: 'center' }}>
          Common questions
        </h3>
        {[
          { q: 'What do I get?', a: 'A personalised result — your unique world, animal, celebrity match, or planet — generated from your quiz answers.' },
          { q: 'Is payment secure?', a: 'Yes. Payments are processed securely by Paddle, a trusted merchant of record. We never see your card details.' },
          { q: 'Can I get a refund?', a: 'Digital results are delivered instantly. Please see our Refund Policy for full details.' },
          { q: 'Do I need an account?', a: 'No account, no sign-up. Complete the quiz, pay once, and receive your result immediately.' },
        ].map(({ q, a }) => (
          <div key={q} style={{ borderBottom: '1px solid var(--border)', padding: '1.25rem 0' }}>
            <p style={{ fontWeight: 500, marginBottom: '0.5rem', fontSize: '0.95rem' }}>{q}</p>
            <p style={{ color: 'var(--muted)', fontSize: '0.875rem', lineHeight: 1.65 }}>{a}</p>
          </div>
        ))}
      </section>

      {/* Footer links */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '1.5rem 2rem', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}>
        {[['Terms of Service', '/terms'], ['Privacy Policy', '/privacy'], ['Refund Policy', '/refund']].map(([label, href]) => (
          <Link key={href} href={href} style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '0.8rem', letterSpacing: '0.04em' }}>
            {label}
          </Link>
        ))}
      </footer>
    </main>
  )
}
