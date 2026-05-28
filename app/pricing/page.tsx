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
    tagline: 'A living, breathing place — uniquely yours.',
    description: 'Discover the landscape that mirrors your inner world. A rich, immersive result with visual media generated from your quiz answers.',
    price: '$1.80',
    accent: '#a07af8',
    glow: 'rgba(160,122,248,0.15)',
  },
  {
    emoji: '🐾',
    name: 'Spirit Animal',
    tagline: 'Which creature carries your soul?',
    description: 'Ten questions reveal the animal that walks beside you — and why that connection runs deeper than you think.',
    price: '$0.99',
    accent: '#f09438',
    glow: 'rgba(240,148,56,0.15)',
  },
  {
    emoji: '⭐',
    name: 'Your Celebrity',
    tagline: 'Which icon shares your energy?',
    description: 'Find the cultural figure who resonates with your personality, creative drive, and way of moving through the world.',
    price: '$1.50',
    accent: '#f8cc38',
    glow: 'rgba(248,204,56,0.15)',
  },
  {
    emoji: '🪐',
    name: 'Your Planet',
    tagline: 'Where in the cosmos do you belong?',
    description: 'Your cosmic address, revealed. The planet whose character, atmosphere, and energy reflects who you truly are.',
    price: '$2.90',
    accent: '#38c4f8',
    glow: 'rgba(56,196,248,0.15)',
  },
]

const FAQS = [
  {
    q: 'What exactly do I receive?',
    a: 'A personalised result — your unique world, animal, celebrity match, or planet — generated from your quiz answers. Results include your archetype name, description, and why it fits you.',
  },
  {
    q: 'Is payment secure?',
    a: 'Yes. Payments are processed by Gumroad, a trusted platform used by millions of creators worldwide. We never see or store your card details.',
  },
  {
    q: 'Do I need an account?',
    a: 'No account, no sign-up, no email required. Complete the quiz, pay once, and your result appears immediately.',
  },
  {
    q: 'Can I retake the quiz?',
    a: "Each quiz purchase is valid for that session. Since answers shape your result, retaking with different answers would give you a different archetype — that's by design.",
  },
]

export default function PricingPage() {
  return (
    <main style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      color: 'var(--text)',
      fontFamily: "'Inter', -apple-system, sans-serif",
    }}>
      {/* Nav */}
      <nav style={{
        padding: '1.4rem 2rem',
        borderBottom: '1px solid var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        backdropFilter: 'blur(8px)',
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(5,5,15,0.8)',
      }}>
        <Link href="/" style={{ color: 'var(--text)', textDecoration: 'none', fontFamily: "'Playfair Display', serif", fontSize: '1.15rem', letterSpacing: '0.02em' }}>
          Your One
        </Link>
        <Link href="/" style={{ color: 'var(--text-2)', textDecoration: 'none', fontSize: '0.82rem', letterSpacing: '0.06em' }}>
          ← Home
        </Link>
      </nav>

      {/* Ambient glow */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, background: 'radial-gradient(ellipse at 50% 0%, rgba(139,108,248,0.08) 0%, transparent 60%)' }} />

      {/* Hero */}
      <section style={{ textAlign: 'center', padding: 'clamp(3.5rem, 10vw, 7rem) 1.5rem 3rem', position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center',
          background: 'rgba(139,108,248,0.1)', border: '0.5px solid rgba(139,108,248,0.25)',
          borderRadius: '50px', padding: '0.35rem 1rem', marginBottom: '1.8rem',
          fontSize: '0.75rem', letterSpacing: '0.18em', color: 'var(--accent)',
          textTransform: 'uppercase', fontWeight: 600,
        }}>
          Simple pricing
        </div>

        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(2.4rem, 7vw, 4.5rem)', fontWeight: 400, lineHeight: 1.1, marginBottom: '1.4rem', letterSpacing: '-0.02em' }}>
          One quiz.<br />
          <span style={{ background: 'linear-gradient(135deg, #f0efff 0%, #a07af8 60%, #f5a830 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            One price.
          </span><br />
          One revelation.
        </h1>

        <p style={{ color: 'var(--text-2)', fontSize: '1.05rem', maxWidth: '460px', margin: '0 auto', lineHeight: 1.75 }}>
          Every discovery is a single, one-time payment. No subscriptions. No accounts. No recurring charges — ever.
        </p>
      </section>

      {/* Product cards */}
      <section style={{ maxWidth: '960px', margin: '0 auto', padding: '1rem 1.5rem 5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', position: 'relative', zIndex: 1 }}>
        {PRODUCTS.map((p) => (
          <article key={p.name} style={{
            background: `linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)`,
            border: `1px solid ${p.accent}28`,
            borderRadius: '20px', padding: '2rem 1.75rem',
            boxShadow: `0 0 60px ${p.glow}, 0 8px 32px rgba(0,0,0,0.2)`,
            display: 'flex', flexDirection: 'column', gap: '0.85rem',
            position: 'relative', overflow: 'hidden',
            backdropFilter: 'blur(4px)',
          }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, transparent, ${p.accent}88, transparent)` }} />

            <span style={{ fontSize: '2.2rem', lineHeight: 1 }}>{p.emoji}</span>

            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', fontWeight: 400, color: p.accent, marginBottom: '0.3rem', letterSpacing: '-0.01em' }}>
                {p.name}
              </h2>
              <p style={{ color: 'var(--text-2)', fontSize: '0.8rem', fontStyle: 'italic' }}>{p.tagline}</p>
            </div>

            <p style={{ color: 'var(--muted)', fontSize: '0.875rem', lineHeight: 1.65, flex: 1 }}>{p.description}</p>

            <div style={{ borderTop: `1px solid ${p.accent}1a`, paddingTop: '1.2rem', display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
              <span style={{ fontSize: '2.1rem', fontWeight: 700, color: p.accent, letterSpacing: '-0.03em', lineHeight: 1 }}>{p.price}</span>
              <span style={{ color: 'var(--muted)', fontSize: '0.78rem', letterSpacing: '0.04em' }}>one-time</span>
            </div>
          </article>
        ))}
      </section>

      {/* Value strip */}
      <section style={{ maxWidth: '700px', margin: '0 auto', padding: '0 1.5rem 5rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        {[
          { icon: '🔒', title: 'Secure payment', sub: 'Processed by Gumroad' },
          { icon: '⚡', title: 'Instant result', sub: 'No waiting, no emails' },
          { icon: '✦', title: 'No account needed', sub: 'Totally anonymous' },
        ].map(({ icon, title, sub }) => (
          <div key={title} style={{ background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: '14px', padding: '1.4rem 1rem' }}>
            <div style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>{icon}</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.25rem' }}>{title}</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{sub}</div>
          </div>
        ))}
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: '620px', margin: '0 auto', padding: '0 1.5rem 6rem', position: 'relative', zIndex: 1 }}>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: 400, marginBottom: '2rem', textAlign: 'center', letterSpacing: '-0.01em' }}>
          Common questions
        </h3>
        {FAQS.map(({ q, a }) => (
          <div key={q} style={{ borderBottom: '1px solid var(--border)', padding: '1.4rem 0' }}>
            <p style={{ fontWeight: 600, marginBottom: '0.6rem', fontSize: '0.95rem', color: 'var(--text)' }}>{q}</p>
            <p style={{ color: 'var(--text-2)', fontSize: '0.875rem', lineHeight: 1.7 }}>{a}</p>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section style={{ textAlign: 'center', padding: '0 1.5rem 6rem', position: 'relative', zIndex: 1 }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <button style={{ background: 'linear-gradient(135deg, rgba(160,122,248,0.25), rgba(160,122,248,0.12))', border: '1px solid rgba(160,122,248,0.4)', borderRadius: '50px', padding: '1rem 2.8rem', color: 'var(--text)', cursor: 'pointer', fontSize: '0.95rem', fontWeight: 500, letterSpacing: '0.02em', boxShadow: '0 0 40px rgba(160,122,248,0.2)' }}>
            Start a quiz →
          </button>
        </Link>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '1.5rem 2rem', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}>
        {[['Terms of Service', '/terms'], ['Privacy Policy', '/privacy'], ['Refund Policy', '/refund']].map(([label, href]) => (
          <Link key={href} href={href} style={{ color: 'var(--muted)', textDecoration: 'none', fontSize: '0.78rem', letterSpacing: '0.05em' }}>
            {label}
          </Link>
        ))}
      </footer>
    </main>
  )
}
