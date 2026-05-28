'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import dynamic from 'next/dynamic'
import type { CategoryKey, ArchetypeResult } from './lib/archetypes'
import { ARCHETYPE_REGISTRY } from './lib/archetypes'
import { QUIZ_DATA, SCORE_FUNCTIONS } from './lib/quizData'
import { triggerDownload } from './components/ShareCard'

const AmbientReel      = dynamic(() => import('./components/AmbientReel'),      { ssr: false })
const ParticleCanvas   = dynamic(() => import('./components/ParticleCanvas'),   { ssr: false })
const VideoScene       = dynamic(() => import('./components/VideoScene'),       { ssr: false })
const ImageScene       = dynamic(() => import('./components/ImageScene'),       { ssr: false })
const LoadingOverlay   = dynamic(() => import('./components/LoadingOverlay'),   { ssr: false })
const QuizEngine       = dynamic(() => import('./components/QuizEngine'),       { ssr: false })
const ShareCard        = dynamic(() => import('./components/ShareCard'),        { ssr: false })

type Stage = 'home' | 'preview' | 'quiz' | 'reveal' | 'place'

interface CatDef {
  key: CategoryKey; label: string; emoji: string; teaser: string
  price: string; color: string; gradient: string
}

const CATEGORIES: CatDef[] = [
  { key: 'animal',    label: 'Spirit Animal',   emoji: '🐾', teaser: 'Which creature carries your soul?',             price: '$0.99', color: '#c07828', gradient: 'rgba(192,120,40,0.15)' },
  { key: 'world',     label: 'Your World',       emoji: '🌍', teaser: 'A living, breathing place — uniquely yours.',   price: '$1.80', color: '#c8b8f8', gradient: 'rgba(200,184,248,0.15)' },
  { key: 'celebrity', label: 'Your Celebrity',   emoji: '⭐', teaser: 'Which icon resonates with your personality?',   price: '$1.50', color: '#f8d44a', gradient: 'rgba(248,212,74,0.15)' },
  { key: 'planet',    label: 'Your Planet',       emoji: '🪐', teaser: 'Where in the cosmos do you truly belong?',     price: '$2.90', color: '#88ccff', gradient: 'rgba(136,204,255,0.15)' },
]

const ARCHETYPE_LISTS: Record<CategoryKey, string[]> = {
  world:     ['meadow','neon_alley','ocean','tokyo_rooftop','desert_canyon','storm_forest','arctic','autumn_forest','factory','cloud_sea'],
  animal:    ['wolf','eagle','fox','bear','dolphin','lion','owl','deer','tiger','octopus','panther','elephant'],
  celebrity: ['elon_musk','rihanna','keanu_reeves','oprah','david_bowie','beyonce','obama','billie_eilish','freddie_mercury','steve_jobs','leonardo_dicaprio','kanye_west'],
  planet:    ['mars','venus','saturn','jupiter','neptune','mercury','pluto','orion_nebula','black_hole','sirius','moon','andromeda'],
}

const CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'

function encodeCode(cat: CategoryKey, resultId: string, answers: Record<number, string | number>): string {
  const list = ARCHETYPE_LISTS[cat]
  const idx = Math.max(0, list.indexOf(resultId))
  const catIdx = Object.keys(ARCHETYPE_REGISTRY).indexOf(cat)
  const ts = Date.now()
  const n0 = Object.values(answers).reduce((a: number, v) => a + (typeof v === 'string' ? v.charCodeAt(0) : Number(v)), 0)
  const nonce = [CHARS[n0 % 36], CHARS[(idx + 1) % 36], CHARS[(ts & 0x3f) % 36], CHARS[((ts >> 8) & 0x3f) % 36], CHARS[catIdx % 36]].join('')
  const chk = nonce.split('').reduce((a, ch) => a + CHARS.indexOf(ch), 0) % 36
  const int2 = (idx * 5 + chk * 3 + 17) % 36
  return CHARS[idx % 36] + nonce + CHARS[chk] + CHARS[int2]
}

function decodeCode(c: string, cat: CategoryKey): string | null {
  if (!c || c.length !== 8) return null
  const upper = c.toUpperCase()
  if (!upper.split('').every(ch => CHARS.includes(ch))) return null
  const idx = CHARS.indexOf(upper[0])
  const list = ARCHETYPE_LISTS[cat]
  if (idx < 0 || idx >= list.length) return null
  const chk = upper.slice(1, 6).split('').reduce((a, ch) => a + CHARS.indexOf(ch), 0) % 36
  if (CHARS[chk] !== upper[6]) return null
  return list[idx] ?? null
}

function useCounter(base: number) {
  const [n, setN] = useState(base)
  useEffect(() => {
    setN(base + Math.floor(Math.random() * 200))
    const t = setInterval(() => setN(c => c + (Math.random() < 0.08 ? 1 : 0)), 8000)
    return () => clearInterval(t)
  }, [base])
  return n
}

export default function Home() {
  const [stage, setStage] = useState<Stage>('home')
  const [category, setCategory] = useState<CatDef>(CATEGORIES[1])
  const [result, setResult] = useState<ArchetypeResult | null>(null)
  const [code, setCode] = useState('')
  const [revealStep, setRevealStep] = useState(0)
  const [dims, setDims] = useState({ w: 1200, h: 700 })
  const [paymentPending, setPaymentPending] = useState(false)
  const [codeInput, setCodeInput] = useState('')
  const [codeCategory, setCodeCategory] = useState<CategoryKey>('world')
  const [codeError, setCodeError] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const [shareDataUrl, setShareDataUrl] = useState<string | null>(null)
  const [mediaReady, setMediaReady] = useState(false)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [btnMag, setBtnMag] = useState({ x: 0, y: 0 })
  const btnRef = useRef<HTMLButtonElement>(null)
  const counter = useCounter(2847)

  useEffect(() => {
    const upd = () => setDims({ w: window.innerWidth, h: window.innerHeight })
    upd(); window.addEventListener('resize', upd)
    const p = new URLSearchParams(window.location.search)
    const urlCode = p.get('code') || window.location.pathname.split('/place/')[1]
    const urlCat = (p.get('cat') as CategoryKey) || 'world'
    if (urlCode) {
      const catDef = CATEGORIES.find(c => c.key === urlCat) || CATEGORIES[1]
      const decoded = decodeCode(urlCode.toUpperCase(), urlCat)
      if (decoded) {
        const r = ARCHETYPE_REGISTRY[urlCat][decoded]
        if (r) { setResult(r); setCode(urlCode.toUpperCase()); setCategory(catDef); setMediaReady(false); setStage('place') }
      }
    }
    return () => window.removeEventListener('resize', upd)
  }, [])

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    setMouse({ x: (e.clientX / window.innerWidth - 0.5) * 2, y: (e.clientY / window.innerHeight - 0.5) * 2 })
    if (btnRef.current) {
      const r = btnRef.current.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2)
      setBtnMag(Math.sqrt(dx*dx+dy*dy) < 100 ? { x: dx*.35, y: dy*.35 } : { x:0, y:0 })
    }
  }, [])

  const startPayment = () => {
    setPaymentPending(true)
    const url = (process.env.NEXT_PUBLIC_LEMON_CHECKOUT_URL as string) || '#'
    if (url === '#') { setPaymentPending(false); setStage('quiz'); return }
    window.open(url, '_blank', 'width=520,height=700,scrollbars=yes')
    const t = setInterval(() => {
      try { if (localStorage.getItem('yourone_paid') === 'true') { clearInterval(t); localStorage.removeItem('yourone_paid'); setPaymentPending(false); setStage('quiz') } } catch { /* */ }
    }, 800)
    setTimeout(() => clearInterval(t), 120000)
  }

  const onQuizComplete = (answers: Record<number, string | number>) => {
    const id = SCORE_FUNCTIONS[category.key](answers)
    const r = ARCHETYPE_REGISTRY[category.key][id]
    if (!r) return
    const c = encodeCode(category.key, id, answers)
    setResult(r); setCode(c); setMediaReady(false); setStage('reveal'); setRevealStep(0)
    setTimeout(() => setRevealStep(1), 800)
    setTimeout(() => setRevealStep(2), 2200)
    setTimeout(() => setRevealStep(3), 3400)
    setTimeout(() => setRevealStep(4), 4200)
    setTimeout(() => setRevealStep(5), 5600)
    setTimeout(() => setRevealStep(6), 7000)
    setTimeout(() => { setStage('place'); window.history.replaceState({}, '', `/place/${c}?cat=${category.key}`) }, 8800)
  }

  const enterCode = () => {
    const c = codeInput.toUpperCase().trim()
    const id = decodeCode(c, codeCategory)
    if (id) {
      const r = ARCHETYPE_REGISTRY[codeCategory][id]
      const catDef = CATEGORIES.find(x => x.key === codeCategory) || CATEGORIES[1]
      if (r) { setResult(r); setCode(c); setCategory(catDef); setMediaReady(false); setStage('place'); window.history.replaceState({}, '', `/place/${c}?cat=${codeCategory}`) }
    } else { setCodeError(true); setTimeout(() => setCodeError(false), 1500) }
  }

  const copy = (text: string, key: string) => { navigator.clipboard.writeText(text).catch(() => {}); setCopied(key); setTimeout(() => setCopied(null), 2200) }

  const btnStyle = (cat: CatDef): React.CSSProperties => ({
    background: cat.gradient, border: `0.5px solid ${cat.color}44`,
    borderRadius: '18px', padding: '1.4rem 1.2rem', cursor: 'pointer',
    textAlign: 'left', color: 'var(--text)',
    transition: 'all 0.22s cubic-bezier(0.16,1,0.3,1)',
  })

  // ─── HOME ─────────────────────────────────────────────────────────────────
  if (stage === 'home') return (
    <div style={{ minHeight: '100vh', background: '#04040c', position: 'relative', overflow: 'hidden' }} onMouseMove={onMouseMove}>
      <AmbientReel /><ParticleCanvas density={20} />
      <div style={{ position: 'fixed', top: '12%', left: '6%', width: '460px', height: '460px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,184,248,0.055) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 4, transform: `translate(${mouse.x*-16}px,${mouse.y*-16}px)`, transition: 'transform 0.8s cubic-bezier(0.16,1,0.3,1)' }} />
      <div style={{ position: 'fixed', bottom: '10%', right: '4%', width: '360px', height: '360px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(248,200,168,0.045) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 4, transform: `translate(${mouse.x*12}px,${mouse.y*12}px)`, transition: 'transform 1s cubic-bezier(0.16,1,0.3,1)' }} />

      <div style={{ position: 'relative', zIndex: 5, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.5rem' }}>
        <div className="fade-in" style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontSize: '10px', letterSpacing: '0.28em', color: 'rgba(200,184,248,0.5)', textTransform: 'uppercase', marginBottom: '0.3rem' }}>by Filmos</div>
          <div style={{ fontSize: '11px', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase' }}>yourone · world</div>
        </div>

        <div className="fade-in-delay" style={{ textAlign: 'center', marginBottom: '0.8rem', transform: `translate(${mouse.x*-5}px,${mouse.y*-5}px)`, transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)' }}>
          <h1 style={{ fontSize: 'clamp(2.8rem,9vw,5.5rem)', fontFamily: 'Playfair Display, serif', fontWeight: 400, lineHeight: 1.05, color: 'var(--text)', textShadow: '0 0 80px rgba(200,184,248,0.18)', marginBottom: '1.2rem' }}>
            Discover who<br /><em style={{ color: 'rgba(200,184,248,0.92)' }}>you really are</em>
          </h1>
          <p style={{ fontSize: 'clamp(0.9rem,2vw,1.05rem)', color: 'var(--muted)', maxWidth: '380px', margin: '0 auto', lineHeight: 1.75 }}>
            Answer 10 questions. Receive a revelation. You will not know what you get until it is revealed.
          </p>
        </div>

        <div className="fade-in-delay" style={{ marginBottom: '2.5rem', fontSize: '0.78rem', color: 'rgba(200,184,248,0.5)', letterSpacing: '0.08em' }}>
          ✦ {counter.toLocaleString()} discoveries made
        </div>

        <div className="fade-in-delay2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', maxWidth: '540px', width: '100%', marginBottom: '2rem' }}>
          {CATEGORIES.map(cat => (
            <button key={cat.key} onClick={() => { setCategory(cat); setStage('preview') }} style={btnStyle(cat)}
              onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background=cat.gradient.replace('0.15','0.28'); b.style.borderColor=cat.color+'88'; b.style.transform='translateY(-2px) scale(1.02)' }}
              onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background=cat.gradient; b.style.borderColor=cat.color+'44'; b.style.transform='' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '0.55rem' }}>{cat.emoji}</div>
              <div style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: '0.3rem', color: 'rgba(255,255,255,0.92)' }}>{cat.label}</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.42)', lineHeight: 1.45, marginBottom: '0.8rem' }}>{cat.teaser}</div>
              <div style={{ fontSize: '1rem', fontWeight: 600, color: cat.color }}>{cat.price}</div>
            </button>
          ))}
        </div>

        {/* ── Open Your World — always visible ── */}
        <div className="fade-in-delay3" style={{ maxWidth: '540px', width: '100%', marginTop: '0.5rem' }}>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: '18px', padding: '1.2rem 1.4rem' }}>
            <div style={{ fontSize: '10px', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: '0.9rem', textAlign: 'center' }}>
              🔑 Already have a code? Open your world
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <select value={codeCategory} onChange={e => setCodeCategory(e.target.value as CategoryKey)}
                style={{ background: 'rgba(255,255,255,0.06)', border: '0.5px solid rgba(255,255,255,0.15)', borderRadius: '10px', padding: '0.6rem 0.7rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.82rem', outline: 'none', cursor: 'pointer' }}>
                {CATEGORIES.map(c => <option key={c.key} value={c.key} style={{ background: '#0a0a18' }}>{c.emoji} {c.label}</option>)}
              </select>
              <input
                value={codeInput}
                onChange={e => setCodeInput(e.target.value.toUpperCase())}
                onKeyDown={e => e.key === 'Enter' && enterCode()}
                placeholder="YOUR CODE"
                maxLength={8}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: `0.5px solid ${codeError ? 'rgba(255,80,80,0.6)' : 'rgba(255,255,255,0.18)'}`,
                  borderRadius: '10px', padding: '0.6rem 0.9rem',
                  color: 'var(--text)', fontSize: '0.88rem', fontFamily: 'monospace',
                  letterSpacing: '0.2em', outline: 'none', width: '155px',
                  textTransform: 'uppercase', textAlign: 'center',
                  boxShadow: codeError ? '0 0 14px rgba(255,80,80,0.2)' : 'none',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
              />
              <button onClick={enterCode}
                style={{ background: 'rgba(200,184,248,0.12)', border: '0.5px solid rgba(200,184,248,0.3)', borderRadius: '10px', padding: '0.6rem 1.2rem', color: 'var(--text)', cursor: 'pointer', fontSize: '0.88rem', fontWeight: 500, transition: 'all 0.2s' }}
                onMouseEnter={e => { const b=e.currentTarget as HTMLButtonElement; b.style.background='rgba(200,184,248,0.22)'; b.style.boxShadow='0 0 20px rgba(200,184,248,0.15)' }}
                onMouseLeave={e => { const b=e.currentTarget as HTMLButtonElement; b.style.background='rgba(200,184,248,0.12)'; b.style.boxShadow='none' }}>
                Open →
              </button>
            </div>
            {codeError && <div style={{ textAlign: 'center', marginTop: '0.55rem', fontSize: '0.75rem', color: 'rgba(255,100,100,0.8)' }}>Invalid code — check the category and try again</div>}
          </div>
        </div>

        <div className="fade-in-delay3" style={{ position: 'fixed', bottom: '1.6rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '1.5rem', fontSize: '0.72rem', color: 'rgba(255,255,255,0.18)', whiteSpace: 'nowrap' }}>
          <span>No account</span><span>·</span><span>50+ worlds</span><span>·</span><span>Yours forever</span>
        </div>
      </div>
    </div>
  )

  // ─── PREVIEW — Q1 free taste ─────────────────────────────────────────────
  if (stage === 'preview') {
    const q1 = QUIZ_DATA[category.key][0]
    return (
      <div style={{ minHeight: '100vh', background: '#04040c', position: 'relative', overflow: 'hidden' }} onMouseMove={onMouseMove}>
        <AmbientReel /><ParticleCanvas density={20} />
        <div style={{ position: 'relative', zIndex: 5, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <button onClick={() => setStage('home')} style={{ position: 'fixed', top: '1.5rem', left: '1.5rem', background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', cursor: 'pointer', fontSize: '0.82rem' }}>← Back</button>

          <div style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{category.emoji}</div>
            <div style={{ fontSize: '0.75rem', letterSpacing: '0.2em', color: category.color, textTransform: 'uppercase', opacity: 0.8 }}>{category.label}</div>
          </div>

          <div style={{ maxWidth: '520px', width: '100%', textAlign: 'center', marginBottom: '2.5rem' }}>
            <div style={{ fontSize: '11px', letterSpacing: '0.18em', color: category.color, textTransform: 'uppercase', marginBottom: '1rem', opacity: 0.7 }}>Question 1 of {QUIZ_DATA[category.key].length}</div>
            <h2 style={{ fontSize: 'clamp(1.4rem,4vw,2rem)', fontWeight: 400, fontFamily: 'Playfair Display, serif', lineHeight: 1.25, marginBottom: '0.8rem', color: 'var(--text)' }}>{q1.text}</h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--muted)', fontStyle: 'italic', marginBottom: '2rem' }}>{q1.sub}</p>
            {q1.options && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '2rem' }}>
                {q1.options.map(opt => (
                  <div key={opt.value} style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.09)', borderRadius: '16px', padding: '1.2rem', textAlign: 'left', color: 'var(--text)', opacity: 0.6 }}>
                    <div style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>{opt.emoji}</div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 500, marginBottom: '0.25rem' }}>{opt.label}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>{opt.desc}</div>
                  </div>
                ))}
              </div>
            )}
            <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.3)', fontStyle: 'italic' }}>
              Your {category.label.toLowerCase()} is forming. Claim it for {category.price} to continue.
            </p>
          </div>

          <button ref={btnRef} onClick={startPayment} disabled={paymentPending}
            style={{ background: `linear-gradient(135deg, ${category.gradient}, rgba(248,200,168,0.08))`, border: `0.5px solid ${category.color}66`, borderRadius: '50px', padding: '1.15rem 3.2rem', color: 'var(--text)', cursor: paymentPending?'wait':'pointer', fontSize: '1rem', fontWeight: 500, letterSpacing: '0.02em', boxShadow: `0 0 50px ${category.color}2e, 0 4px 24px rgba(0,0,0,0.5)`, transition: 'box-shadow 0.3s, transform 0.25s cubic-bezier(0.16,1,0.3,1)', transform: `translate(${btnMag.x}px,${btnMag.y}px)` }}
            onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.boxShadow=`0 0 80px ${category.color}55, 0 4px 28px rgba(0,0,0,0.6)`}}
            onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.boxShadow=`0 0 50px ${category.color}2e, 0 4px 24px rgba(0,0,0,0.5)`}}>
            {paymentPending ? 'Complete payment in new window…' : `Claim my ${category.label} — ${category.price}`}
          </button>
          {paymentPending && (
            <div style={{ marginTop: '1rem', fontSize: '0.78rem', color: 'var(--muted)', maxWidth: '280px', textAlign: 'center', lineHeight: 1.6 }}>
              Pay in the popup, then your quiz opens automatically.<br />
              <button onClick={() => { setPaymentPending(false); setStage('quiz') }} style={{ marginTop: '0.6rem', background: 'none', border: 'none', color: `${category.color}88`, cursor: 'pointer', fontSize: '0.72rem', textDecoration: 'underline' }}>Already paid?</button>
            </div>
          )}
        </div>
      </div>
    )
  }

  // ─── QUIZ ─────────────────────────────────────────────────────────────────
  if (stage === 'quiz') return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <ParticleCanvas density={25} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <QuizEngine category={category.key} accentColor={category.color} onComplete={onQuizComplete} />
      </div>
    </div>
  )

  // ─── REVEAL ───────────────────────────────────────────────────────────────
  if (stage === 'reveal' && result) return (
    <div style={{ minHeight: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: revealStep>=1?1:0, transform: revealStep>=1?'scale(1)':'scale(1.06)', transition: 'opacity 2.2s ease, transform 3s ease' }}>
        {category.key === 'world'
          ? <VideoScene sceneId={result.id} onReady={() => setMediaReady(true)} />
          : <ImageScene archetypeId={result.id} onReady={() => setMediaReady(true)} />
        }
        <LoadingOverlay show={!mediaReady} emoji={category.emoji} label={`Loading ${category.label.toLowerCase()}`} color={category.color} />
      </div>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', opacity: revealStep>=2?0:1, transition: 'opacity 1.8s ease', zIndex: 1 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, transparent 20%, rgba(0,0,0,0.7) 100%)', zIndex: 2 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 28%, transparent 60%, rgba(0,0,0,0.88) 100%)', zIndex: 3 }} />
      <div style={{ position: 'relative', zIndex: 4, textAlign: 'center', padding: '2rem', maxWidth: '520px' }}>
        <div style={{ fontSize: '10px', letterSpacing: '0.28em', color: 'rgba(200,184,248,0.6)', textTransform: 'uppercase', marginBottom: '1.2rem', opacity: revealStep>=3?1:0, transform: revealStep>=3?'translateY(0)':'translateY(12px)', transition: 'opacity 1s ease, transform 1s ease' }}>{category.label.toLowerCase()}</div>
        <h1 style={{ fontSize: 'clamp(2.4rem,8vw,5rem)', fontFamily: 'Playfair Display, serif', fontWeight: 400, color: '#fff', textShadow: `0 0 60px ${result.color}66, 0 2px 40px rgba(0,0,0,0.9)`, marginBottom: '0.6rem', lineHeight: 1.1, opacity: revealStep>=4?1:0, transform: revealStep>=4?'translateY(0)':'translateY(20px)', transition: 'opacity 1.2s ease, transform 1.4s cubic-bezier(0.16,1,0.3,1)' }}>{result.name}</h1>
        <div style={{ fontSize: '1rem', fontWeight: 500, color: result.color, marginBottom: '0.8rem', opacity: revealStep>=4?1:0, transition: 'opacity 1s ease 0.3s', fontStyle: 'italic' }}>{result.title}</div>
        <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.7)', fontStyle: 'italic', maxWidth: '400px', margin: '0 auto', lineHeight: 1.75, textShadow: '0 2px 20px rgba(0,0,0,0.9)', opacity: revealStep>=5?1:0, transform: revealStep>=5?'translateY(0)':'translateY(12px)', transition: 'opacity 1s ease 0.1s, transform 1s ease 0.1s' }}>{result.tagline}</p>
        <div style={{ marginTop: '2.5rem', fontSize: '0.78rem', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', opacity: revealStep>=6?1:0, transition: 'opacity 1.2s ease' }}>Opening your world…</div>
      </div>
    </div>
  )

  // ─── PLACE ────────────────────────────────────────────────────────────────
  if (stage === 'place' && result) {
    const shareUrl = `https://yourone.world/place/${code}?cat=${category.key}`
    return (
      <div style={{ minHeight: '100vh', background: '#000', position: 'relative', overflow: 'hidden' }}>
        <ShareCard result={result} code={code} category={category.label} onReady={setShareDataUrl} />
        <div style={{ position: 'fixed', inset: 0 }}>
          {category.key === 'world'
            ? <VideoScene sceneId={result.id} onReady={() => setMediaReady(true)} />
            : <ImageScene archetypeId={result.id} onReady={() => setMediaReady(true)} />
          }
          <LoadingOverlay show={!mediaReady} emoji={category.emoji} label={`Loading ${category.label.toLowerCase()}`} color={category.color} />
        </div>
        <div style={{ position: 'fixed', inset: 0, background: 'linear-gradient(to bottom, transparent 28%, rgba(0,0,0,0.94) 100%)', zIndex: 1 }} />

        <div style={{ position: 'relative', zIndex: 2, minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 'clamp(1.5rem,4vw,3rem)', maxWidth: '620px' }}>
          <div style={{ marginBottom: '1.5rem', animation: 'fadeIn 1s ease forwards' }}>
            <div style={{ fontSize: '10px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.32)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>{category.label}</div>
            <h1 style={{ fontSize: 'clamp(1.8rem,5vw,3rem)', fontFamily: 'Playfair Display, serif', fontWeight: 400, color: '#fff', lineHeight: 1.15, marginBottom: '0.3rem' }}>{result.name}</h1>
            <div style={{ fontSize: '0.95rem', color: result.color, fontStyle: 'italic', marginBottom: '0.8rem', fontWeight: 500 }}>{result.title}</div>
            <p style={{ fontSize: '0.92rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: '1.2rem', fontStyle: 'italic' }}>{result.tagline}</p>

            {/* Why you got this */}
            <div style={{ background: 'rgba(0,0,0,0.5)', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: '14px', padding: '1rem 1.2rem', marginBottom: '1rem', backdropFilter: 'blur(12px)' }}>
              <div style={{ fontSize: '10px', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', marginBottom: '0.7rem' }}>Why you got this</div>
              {result.why.map((w, i) => (
                <div key={i} style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', marginBottom: i < result.why.length-1 ? '0.5rem' : 0 }}>
                  <span style={{ color: result.color, fontSize: '0.7rem', marginTop: '3px', flexShrink: 0 }}>◆</span>
                  <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.58)', lineHeight: 1.55 }}>{w}</span>
                </div>
              ))}
            </div>

            {/* Code */}
            <div style={{ background: 'rgba(0,0,0,0.5)', border: '0.5px solid rgba(255,255,255,0.12)', borderRadius: '14px', padding: '1rem 1.2rem', marginBottom: '0.8rem', backdropFilter: 'blur(12px)' }}>
              <div style={{ fontSize: '10px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.3)', marginBottom: '0.5rem' }}>YOUR CODE — RETURN ANYTIME</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                <span style={{ fontSize: '1.4rem', letterSpacing: '0.18em', fontWeight: 700, color: '#fff', fontFamily: 'monospace' }}>{code}</span>
                <button onClick={() => copy(code,'code')} style={{ background: 'rgba(255,255,255,0.08)', border: '0.5px solid rgba(255,255,255,0.18)', borderRadius: '8px', padding: '0.4rem 1rem', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 500, whiteSpace: 'nowrap', flexShrink: 0 }}>{copied==='code'?'✓ Copied':'Copy'}</button>
              </div>
            </div>

            {/* Share row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '7px', marginBottom: '0.7rem' }}>
              <button onClick={() => copy(shareUrl,'link')} style={{ background: 'rgba(200,184,248,0.1)', border: '0.5px solid rgba(200,184,248,0.22)', borderRadius: '40px', padding: '0.65rem 0.4rem', color: '#fff', cursor: 'pointer', fontSize: '0.72rem', fontWeight: 500 }}>{copied==='link'?'✓ Copied':'📋 Link'}</button>
              <a href={`https://wa.me/?text=${encodeURIComponent(result.shareCaption)}`} target="_blank" rel="noreferrer" style={{ background: 'rgba(37,211,102,0.1)', border: '0.5px solid rgba(37,211,102,0.22)', borderRadius: '40px', padding: '0.65rem 0.4rem', color: '#fff', fontSize: '0.72rem', fontWeight: 500, textDecoration: 'none', textAlign: 'center', display: 'block' }}>💬 Share</a>
              <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(result.shareCaption)}`} target="_blank" rel="noreferrer" style={{ background: 'rgba(29,161,242,0.1)', border: '0.5px solid rgba(29,161,242,0.22)', borderRadius: '40px', padding: '0.65rem 0.4rem', color: '#fff', fontSize: '0.72rem', fontWeight: 500, textDecoration: 'none', textAlign: 'center', display: 'block' }}>𝕏 Post</a>
              <button onClick={() => shareDataUrl && triggerDownload(shareDataUrl, `yourone-${code}.png`)} disabled={!shareDataUrl} style={{ background: 'rgba(255,255,255,0.07)', border: '0.5px solid rgba(255,255,255,0.15)', borderRadius: '40px', padding: '0.65rem 0.4rem', color: '#fff', cursor: shareDataUrl?'pointer':'default', fontSize: '0.72rem', fontWeight: 500, opacity: shareDataUrl?1:0.4 }}>🖼 Card</button>
            </div>

            {/* Challenge */}
            <a href={`https://wa.me/?text=${encodeURIComponent(`I found my ${category.label}. I bet yours is completely different. It's ${category.price} → yourone.world`)}`} target="_blank" rel="noreferrer"
              style={{ display: 'block', textAlign: 'center', background: `linear-gradient(135deg, ${result.color}18, transparent)`, border: `0.5px solid ${result.color}33`, borderRadius: '50px', padding: '0.75rem 1rem', color: result.color, fontSize: '0.82rem', fontWeight: 500, textDecoration: 'none', marginBottom: '0.7rem', transition: 'all 0.2s' }}>
              Challenge a friend — bet yours is different →
            </a>

            {/* Upsell */}
            <button onClick={() => setStage('home')} style={{ display: 'block', width: '100%', background: 'none', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: '50px', padding: '0.65rem', color: 'rgba(255,255,255,0.32)', cursor: 'pointer', fontSize: '0.75rem', marginBottom: '0.8rem' }}>
              Gift a discovery to someone — from $0.99 →
            </button>

            {/* Home button */}
            <button onClick={() => { setStage('home'); setResult(null); setCode(''); window.history.replaceState({}, '', '/') }}
              style={{ display: 'block', width: '100%', background: 'rgba(255,255,255,0.05)', border: '0.5px solid rgba(255,255,255,0.12)', borderRadius: '50px', padding: '0.7rem', color: 'rgba(255,255,255,0.45)', cursor: 'pointer', fontSize: '0.78rem', marginBottom: '0.8rem', transition: 'all 0.2s' }}
              onMouseEnter={e => { const b=e.currentTarget as HTMLButtonElement; b.style.background='rgba(255,255,255,0.1)'; b.style.color='rgba(255,255,255,0.7)' }}
              onMouseLeave={e => { const b=e.currentTarget as HTMLButtonElement; b.style.background='rgba(255,255,255,0.05)'; b.style.color='rgba(255,255,255,0.45)' }}>
              ← Try another category
            </button>

            <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.18)', textAlign: 'center' }}>a <strong style={{ color: 'rgba(255,255,255,0.32)' }}>Filmos</strong> product · yourone.world</p>
          </div>
        </div>
      </div>
    )
  }

  return null
}
