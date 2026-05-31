'use client'
import Link from 'next/link'
import { GROUPS } from '../lib/compatibility'
import type { GroupId } from '../lib/compatibility'

const ALL_PAIRS: { a: GroupId; b: GroupId }[] = [
  { a: 'dreamer', b: 'maker' },
  { a: 'heart',   b: 'force' },
  { a: 'mind',    b: 'maker' },
  { a: 'dreamer', b: 'heart' },
  { a: 'mind',    b: 'force' },
]

export default function CollectivePage() {
  const groupList = Object.values(GROUPS)

  return (
    <div style={{ minHeight: '100vh', background: '#04040c', color: '#f0efff', fontFamily: 'Inter, -apple-system, sans-serif' }}>

      {/* Background orbs */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '10%', left: '5%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(68,136,255,0.06) 0%, transparent 65%)' }} />
        <div style={{ position: 'absolute', bottom: '15%', right: '5%', width: '400px', height: '400px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(160,122,248,0.06) 0%, transparent 65%)' }} />
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '800px', height: '800px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(240,96,160,0.03) 0%, transparent 60%)' }} />
      </div>

      {/* Nav */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 2rem', backdropFilter: 'blur(12px)', background: 'rgba(4,4,12,0.7)', borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontSize: '0.8rem', color: 'rgba(160,122,248,0.8)', letterSpacing: '0.1em', fontWeight: 600 }}>yourone.world</span>
        </Link>
        <Link href="/" style={{ textDecoration: 'none', background: 'rgba(160,122,248,0.1)', border: '0.5px solid rgba(160,122,248,0.3)', borderRadius: '50px', padding: '0.38rem 1rem', color: 'rgba(160,122,248,0.9)', fontSize: '0.76rem', fontWeight: 500 }}>
          Discover yours →
        </Link>
      </nav>

      <div style={{ position: 'relative', zIndex: 1, paddingTop: '5rem' }}>

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section style={{ textAlign: 'center', padding: '5rem 1.5rem 4rem', maxWidth: '720px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(160,122,248,0.08)', border: '0.5px solid rgba(160,122,248,0.25)', borderRadius: '50px', padding: '0.38rem 1.1rem', marginBottom: '2.5rem' }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#a07af8', display: 'inline-block', animation: 'breathe 2.8s ease infinite' }} />
            <span style={{ fontSize: '0.68rem', letterSpacing: '0.2em', color: 'rgba(160,122,248,0.85)', textTransform: 'uppercase', fontWeight: 500 }}>yourone collective</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.6rem,7vw,5rem)', fontFamily: 'Playfair Display, serif', fontWeight: 400, lineHeight: 1.06, marginBottom: '1.4rem' }}>
            <span style={{ color: '#f0efff' }}>Find the people</span><br />
            <em style={{ background: 'linear-gradient(125deg, #e0d0ff 0%, #a07af8 45%, #4488ff 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              built to work with you
            </em>
          </h1>

          <p style={{ fontSize: 'clamp(0.92rem,1.8vw,1.08rem)', color: 'rgba(255,255,255,0.58)', lineHeight: 1.85, maxWidth: '520px', margin: '0 auto 2.5rem' }}>
            Your archetype isn&apos;t just a result. It&apos;s a verified identity that connects you with the right co-founders, collaborators, and creative partners — the people whose strengths complete yours.
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/" style={{ textDecoration: 'none', background: 'linear-gradient(135deg, rgba(160,122,248,0.2), rgba(68,136,255,0.15))', border: '0.5px solid rgba(160,122,248,0.4)', borderRadius: '50px', padding: '0.85rem 2.2rem', color: '#f0efff', fontSize: '0.92rem', fontWeight: 600, letterSpacing: '0.02em' }}>
              Get your archetype →
            </Link>
            <a href="#groups" style={{ textDecoration: 'none', background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: '50px', padding: '0.85rem 2.2rem', color: 'rgba(255,255,255,0.65)', fontSize: '0.92rem', fontWeight: 500 }}>
              Explore the groups
            </a>
          </div>
        </section>

        {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
        <section style={{ padding: '2rem 1.5rem 4rem', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'rgba(255,255,255,0.05)', borderRadius: '20px', overflow: 'hidden' }}>
            {[
              { n: '01', icon: '◎', title: 'Take the quiz', sub: 'Answer 10 honest questions to reveal your archetype' },
              { n: '02', icon: '◈', title: 'Claim your profile', sub: 'Add your name and what you\'re building to make it yours' },
              { n: '03', icon: '◉', title: 'Find your pair', sub: 'See which archetypes are built to work with yours' },
            ].map(s => (
              <div key={s.n} style={{ background: 'rgba(255,255,255,0.018)', padding: '1.6rem 1.2rem', textAlign: 'center' }}>
                <div style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.18em', color: 'rgba(160,122,248,0.45)', textTransform: 'uppercase', marginBottom: '0.8rem' }}>{s.n}</div>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.6rem', color: 'rgba(160,122,248,0.7)' }}>{s.icon}</div>
                <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'rgba(255,255,255,0.88)', marginBottom: '0.4rem' }}>{s.title}</div>
                <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.38)', lineHeight: 1.5 }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── THE 5 GROUPS ─────────────────────────────────────────────────── */}
        <section id="groups" style={{ padding: '2rem 1.5rem 5rem', maxWidth: '960px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ fontSize: '0.62rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: '0.8rem' }}>the five groups</div>
            <h2 style={{ fontSize: 'clamp(1.5rem,4vw,2.4rem)', fontFamily: 'Playfair Display, serif', fontWeight: 400, color: '#f0efff', maxWidth: '560px', margin: '0 auto' }}>Every archetype belongs to a group. Every group needs the others.</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '12px' }}>
            {groupList.map(g => (
              <div key={g.id} style={{ background: `linear-gradient(145deg, ${g.color}0d, rgba(4,4,12,0.9))`, border: `0.5px solid ${g.color}25`, borderRadius: '20px', padding: '1.6rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${g.color}, ${g.color}44, transparent)` }} />

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: `${g.color}18`, border: `0.5px solid ${g.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.15rem', color: g.color, flexShrink: 0 }}>{g.emoji}</div>
                  <div>
                    <div style={{ fontSize: '0.97rem', fontWeight: 700, color: '#f0efff', marginBottom: '0.15rem' }}>{g.name}</div>
                    <div style={{ fontSize: '0.65rem', color: `${g.color}99`, letterSpacing: '0.01em' }}>{g.tagline}</div>
                  </div>
                </div>

                <p style={{ fontSize: '0.79rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.72, marginBottom: '1.1rem' }}>{g.description}</p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '1.1rem' }}>
                  {g.traits.map(t => (
                    <span key={t} style={{ fontSize: '0.62rem', background: `${g.color}10`, border: `0.5px solid ${g.color}25`, borderRadius: '50px', padding: '0.2rem 0.6rem', color: `${g.color}cc` }}>{t}</span>
                  ))}
                </div>

                <div style={{ borderTop: '0.5px solid rgba(255,255,255,0.05)', paddingTop: '0.9rem' }}>
                  <div style={{ fontSize: '0.6rem', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', marginBottom: '0.55rem' }}>best paired with</div>
                  {g.compatibility.map(p => (
                    <div key={p.with} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                      <span style={{ fontSize: '0.6rem', background: `${GROUPS[p.with].color}15`, border: `0.5px solid ${GROUPS[p.with].color}35`, borderRadius: '4px', padding: '0.18rem 0.45rem', color: GROUPS[p.with].color, fontWeight: 600, whiteSpace: 'nowrap', flexShrink: 0 }}>{GROUPS[p.with].name}</span>
                      <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.42)', fontStyle: 'italic' }}>{p.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── COMPATIBILITY PAIRS ───────────────────────────────────────────── */}
        <section style={{ padding: '2rem 1.5rem 5rem', maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div style={{ fontSize: '0.62rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: '0.8rem' }}>proven combinations</div>
            <h2 style={{ fontSize: 'clamp(1.4rem,3.5vw,2.1rem)', fontFamily: 'Playfair Display, serif', fontWeight: 400, color: '#f0efff' }}>The pairs that built everything worth building</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {ALL_PAIRS.map(({ a, b }) => {
              const ga = GROUPS[a]
              const gb = GROUPS[b]
              const pairData = ga.compatibility.find(p => p.with === b) || gb.compatibility.find(p => p.with === a)
              if (!pairData) return null
              return (
                <div key={`${a}-${b}`} style={{ background: 'rgba(255,255,255,0.02)', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '1.2rem 1.4rem', display: 'flex', alignItems: 'center', gap: '1.2rem', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', flexShrink: 0 }}>
                    <span style={{ width: '38px', height: '38px', borderRadius: '10px', background: `${ga.color}15`, border: `0.5px solid ${ga.color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', color: ga.color }}>{ga.emoji}</span>
                    <span style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.18)' }}>+</span>
                    <span style={{ width: '38px', height: '38px', borderRadius: '10px', background: `${gb.color}15`, border: `0.5px solid ${gb.color}35`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', color: gb.color }}>{gb.emoji}</span>
                  </div>
                  <div style={{ flex: 1, minWidth: '160px' }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#f0efff', marginBottom: '0.22rem' }}>{pairData.label}</div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.46)', lineHeight: 1.6 }}>{pairData.description}</div>
                  </div>
                  <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.2)', whiteSpace: 'nowrap', flexShrink: 0, textAlign: 'right' }}>
                    {ga.name.replace('The ', '')}<br />× {gb.name.replace('The ', '')}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────────────── */}
        <section style={{ padding: '2rem 1.5rem 6rem', textAlign: 'center' }}>
          <div style={{ maxWidth: '500px', margin: '0 auto', background: 'linear-gradient(145deg, rgba(160,122,248,0.08), rgba(68,136,255,0.05))', border: '0.5px solid rgba(160,122,248,0.2)', borderRadius: '24px', padding: '2.5rem 2rem' }}>
            <div style={{ fontSize: '2.2rem', marginBottom: '1rem', color: 'rgba(160,122,248,0.7)' }}>◎</div>
            <h3 style={{ fontSize: 'clamp(1.1rem,2.5vw,1.5rem)', fontFamily: 'Playfair Display, serif', fontWeight: 400, marginBottom: '0.8rem', color: '#f0efff' }}>Start with knowing who you are</h3>
            <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.45)', lineHeight: 1.8, marginBottom: '1.8rem' }}>
              Take the quiz. Get your archetype. Claim your profile and share it with the people who need to know what you bring.
            </p>
            <Link href="/" style={{ textDecoration: 'none', display: 'inline-block', background: 'linear-gradient(135deg, rgba(160,122,248,0.22), rgba(68,136,255,0.18))', border: '0.5px solid rgba(160,122,248,0.45)', borderRadius: '50px', padding: '0.9rem 2.5rem', color: '#f0efff', fontSize: '0.9rem', fontWeight: 600, letterSpacing: '0.02em' }}>
              Discover your archetype →
            </Link>
          </div>
        </section>

      </div>

      {/* Footer */}
      <div style={{ borderTop: '0.5px solid rgba(255,255,255,0.05)', padding: '1.2rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.8rem' }}>
        <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.25)' }}>a Filmos product · yourone.world</span>
        <div style={{ display: 'flex', gap: '1.2rem', fontSize: '0.68rem' }}>
          <Link href="/pricing" style={{ color: 'rgba(255,255,255,0.38)', textDecoration: 'none' }}>Pricing</Link>
          <Link href="/privacy" style={{ color: 'rgba(255,255,255,0.38)', textDecoration: 'none' }}>Privacy</Link>
          <Link href="/terms" style={{ color: 'rgba(255,255,255,0.38)', textDecoration: 'none' }}>Terms</Link>
        </div>
      </div>

    </div>
  )
}
