'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import dynamic from 'next/dynamic'
import type { SceneId } from './components/SceneRenderer'
import { scenes } from './components/SceneRenderer'

const AmbientReel = dynamic(() => import('./components/AmbientReel'), { ssr: false })
const ParticleCanvas = dynamic(() => import('./components/ParticleCanvas'), { ssr: false })
const SceneRenderer = dynamic(() => import('./components/SceneRenderer'), { ssr: false })
const QuizEngine = dynamic(() => import('./components/QuizEngine'), { ssr: false })

type Stage = 'landing' | 'quiz' | 'reveal' | 'place'

const CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const ARCHETYPE_LIST = ['meadow','neon_alley','ocean','tokyo_rooftop','desert_canyon','storm_forest','arctic','autumn_forest','factory','cloud_sea']

function decodeCode(c: string): string | null {
  if (!c || c.length !== 8) return null
  const upper = c.toUpperCase()
  if (!upper.split('').every(ch => CHARS.includes(ch))) return null
  const idx = CHARS.indexOf(upper[0])
  if (idx < 0 || idx > 9) return null
  const chk = upper.slice(1, 6).split('').reduce((a, ch) => a + CHARS.indexOf(ch), 0) % 36
  if (CHARS[chk] !== upper[6]) return null
  const int2 = (idx * 5 + chk * 3 + 17) % 36
  if (CHARS[int2] !== upper[7]) return null
  return ARCHETYPE_LIST[idx] ?? null
}

export default function Home() {
  const [stage, setStage] = useState<Stage>('landing')
  const [archetype, setArchetype] = useState<SceneId>('cloud_sea')
  const [code, setCode] = useState('')
  const [copied, setCopied] = useState(false)
  const [revealStep, setRevealStep] = useState(0)
  const [dims, setDims] = useState({ w: 1200, h: 700 })
  const [paymentPending, setPaymentPending] = useState(false)
  const [showCodeEntry, setShowCodeEntry] = useState(false)
  const [codeInput, setCodeInput] = useState('')
  const [codeError, setCodeError] = useState(false)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const [btnMag, setBtnMag] = useState({ x: 0, y: 0 })
  const btnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const update = () => setDims({ w: window.innerWidth, h: window.innerHeight })
    update()
    window.addEventListener('resize', update)
    const params = new URLSearchParams(window.location.search)
    const urlCode = params.get('code') || window.location.pathname.split('/place/')[1]
    if (urlCode) {
      const decoded = decodeCode(urlCode.toUpperCase())
      if (decoded) {
        setArchetype(decoded as SceneId)
        setCode(urlCode.toUpperCase())
        setStage('place')
      }
    }
    return () => window.removeEventListener('resize', update)
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const nx = (e.clientX / window.innerWidth - 0.5) * 2
    const ny = (e.clientY / window.innerHeight - 0.5) * 2
    setMouse({ x: nx, y: ny })
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect()
      const dx = e.clientX - (rect.left + rect.width / 2)
      const dy = e.clientY - (rect.top + rect.height / 2)
      const dist = Math.sqrt(dx * dx + dy * dy)
      setBtnMag(dist < 100 ? { x: dx * 0.35, y: dy * 0.35 } : { x: 0, y: 0 })
    }
  }, [])

  const handleMouseLeave = useCallback(() => setBtnMag({ x: 0, y: 0 }), [])

  const handleQuizComplete = (arc: string, generatedCode: string) => {
    setArchetype(arc as SceneId)
    setCode(generatedCode)
    setStage('reveal')
    setRevealStep(0)
    setTimeout(() => setRevealStep(1), 800)
    setTimeout(() => setRevealStep(2), 2200)
    setTimeout(() => setRevealStep(3), 3400)
    setTimeout(() => setRevealStep(4), 4200)
    setTimeout(() => setRevealStep(5), 5400)
    setTimeout(() => setRevealStep(6), 6800)
    setTimeout(() => {
      setStage('place')
      window.history.replaceState({}, '', `/place/${generatedCode}`)
    }, 8500)
  }

  const handleStartPayment = () => {
    setPaymentPending(true)
    const checkoutUrl = (process.env.NEXT_PUBLIC_LEMON_CHECKOUT_URL as string) || '#'
    if (checkoutUrl === '#') {
      setPaymentPending(false)
      setStage('quiz')
      return
    }
    window.open(checkoutUrl, '_blank', 'width=520,height=700,scrollbars=yes')
    const check = setInterval(() => {
      try {
        if (localStorage.getItem('yourone_paid') === 'true') {
          clearInterval(check)
          localStorage.removeItem('yourone_paid')
          setPaymentPending(false)
          setStage('quiz')
        }
      } catch { /* ignore */ }
    }, 800)
    setTimeout(() => clearInterval(check), 120000)
  }

  const handleEnterCode = () => {
    const c = codeInput.toUpperCase().trim()
    const decoded = decodeCode(c)
    if (decoded) {
      setArchetype(decoded as SceneId)
      setCode(c)
      setStage('place')
      window.history.replaceState({}, '', `/place/${c}`)
    } else {
      setCodeError(true)
      setTimeout(() => setCodeError(false), 1500)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // ─── QUIZ ─────────────────────────────────────────
  if (stage === 'quiz') return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <ParticleCanvas density={30} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <QuizEngine onComplete={handleQuizComplete} />
      </div>
    </div>
  )

  // ─── REVEAL ───────────────────────────────────────
  if (stage === 'reveal') {
    const scene = scenes[archetype]
    return (
      <div style={{ minHeight: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
        <div style={{ position: 'absolute', inset: 0, opacity: revealStep >= 1 ? 1 : 0, transform: revealStep >= 1 ? 'scale(1)' : 'scale(1.08)', transition: 'opacity 2.2s ease, transform 3s ease' }}>
          <SceneRenderer sceneId={archetype} width={dims.w} height={dims.h} />
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)', opacity: revealStep >= 2 ? 0 : 1, transition: 'opacity 1.8s ease', zIndex: 1 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, transparent 20%, rgba(0,0,0,0.7) 100%)', zIndex: 2 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 30%, transparent 60%, rgba(0,0,0,0.85) 100%)', zIndex: 3 }} />
        <div style={{ position: 'relative', zIndex: 4, textAlign: 'center', padding: '2rem' }}>
          <div style={{ fontSize: '10px', letterSpacing: '0.28em', color: 'rgba(200,184,248,0.6)', textTransform: 'uppercase', marginBottom: '1.2rem', opacity: revealStep >= 3 ? 1 : 0, transform: revealStep >= 3 ? 'translateY(0)' : 'translateY(12px)', transition: 'opacity 1s ease, transform 1s ease' }}>
            your one world
          </div>
          <h1 style={{ fontSize: 'clamp(2.4rem,8vw,5rem)', fontFamily: 'Playfair Display, serif', fontWeight: 400, color: '#fff', textShadow: '0 0 60px rgba(200,184,248,0.4), 0 2px 40px rgba(0,0,0,0.9)', marginBottom: '1rem', lineHeight: 1.1, opacity: revealStep >= 4 ? 1 : 0, transform: revealStep >= 4 ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 1.2s ease, transform 1.4s cubic-bezier(0.16,1,0.3,1)' }}>
            {scene?.name}
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.72)', fontStyle: 'italic', maxWidth: '400px', margin: '0 auto', lineHeight: 1.75, textShadow: '0 2px 20px rgba(0,0,0,0.9)', opacity: revealStep >= 5 ? 1 : 0, transform: revealStep >= 5 ? 'translateY(0)' : 'translateY(12px)', transition: 'opacity 1s ease 0.1s, transform 1s ease 0.1s' }}>
            {scene?.mood}
          </p>
          <div style={{ marginTop: '2.5rem', fontSize: '0.78rem', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', opacity: revealStep >= 6 ? 1 : 0, transition: 'opacity 1.2s ease' }}>
            Opening your world…
          </div>
        </div>
      </div>
    )
  }

  // ─── PLACE ────────────────────────────────────────
  if (stage === 'place') {
    const scene = scenes[archetype]
    const shareUrl = `https://yourone.world/place/${code}`
    const shareText = `My digital world is "${scene?.name}". What is yours? → yourone.world  (My code: ${code})`
    return (
      <div style={{ minHeight: '100vh', background: '#000', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'fixed', inset: 0 }}>
          <SceneRenderer sceneId={archetype} width={dims.w} height={dims.h} />
        </div>
        <div style={{ position: 'fixed', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.92) 100%)', zIndex: 1 }} />
        <div style={{ position: 'relative', zIndex: 2, minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: 'clamp(1.5rem,4vw,3rem)', maxWidth: '600px' }}>
          <div style={{ marginBottom: '1.5rem', animation: 'fadeIn 1s ease forwards' }}>
            <div style={{ fontSize: '10px', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '0.6rem' }}>your one world</div>
            <h1 style={{ fontSize: 'clamp(1.6rem,5vw,2.8rem)', fontFamily: 'Playfair Display, serif', fontWeight: 400, color: '#fff', lineHeight: 1.2, marginBottom: '0.6rem' }}>{scene?.name}</h1>
            <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.6)', fontStyle: 'italic', lineHeight: 1.65, marginBottom: '1.5rem' }}>{scene?.mood}</p>
            <div style={{ background: 'rgba(0,0,0,0.55)', border: '0.5px solid rgba(255,255,255,0.12)', borderRadius: '14px', padding: '1rem 1.2rem', marginBottom: '1rem', backdropFilter: 'blur(12px)' }}>
              <div style={{ fontSize: '10px', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.35)', marginBottom: '0.5rem' }}>YOUR CODE — RETURN ANYTIME</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
                <span style={{ fontSize: '1.4rem', letterSpacing: '0.18em', fontWeight: 700, color: '#fff', fontFamily: 'monospace' }}>{code}</span>
                <button onClick={() => copyToClipboard(code)} style={{ background: 'rgba(255,255,255,0.08)', border: '0.5px solid rgba(255,255,255,0.18)', borderRadius: '8px', padding: '0.4rem 1rem', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 500, whiteSpace: 'nowrap', flexShrink: 0 }}>
                  {copied ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginBottom: '1rem' }}>
              <button onClick={() => copyToClipboard(shareUrl)} style={{ background: 'rgba(200,184,248,0.1)', border: '0.5px solid rgba(200,184,248,0.25)', borderRadius: '50px', padding: '0.7rem 0.5rem', color: '#fff', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 500 }}>📋 Copy link</button>
              <a href={`https://wa.me/?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noreferrer" style={{ background: 'rgba(37,211,102,0.1)', border: '0.5px solid rgba(37,211,102,0.25)', borderRadius: '50px', padding: '0.7rem 0.5rem', color: '#fff', fontSize: '0.8rem', fontWeight: 500, textDecoration: 'none', textAlign: 'center', display: 'block' }}>💬 WhatsApp</a>
              <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noreferrer" style={{ background: 'rgba(29,161,242,0.1)', border: '0.5px solid rgba(29,161,242,0.25)', borderRadius: '50px', padding: '0.7rem 0.5rem', color: '#fff', fontSize: '0.8rem', fontWeight: 500, textDecoration: 'none', textAlign: 'center', display: 'block' }}>𝕏 Post</a>
            </div>
            <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.22)', textAlign: 'center' }}>a <strong style={{ color: 'rgba(255,255,255,0.4)' }}>Filmos</strong> product · yourone.world</p>
          </div>
        </div>
      </div>
    )
  }

  // ─── LANDING ──────────────────────────────────────
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', position: 'relative', overflow: 'hidden' }} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <AmbientReel />
      <ParticleCanvas density={25} />

      {/* Parallax orbs */}
      <div style={{ position: 'fixed', top: '12%', left: '8%', width: '520px', height: '520px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(200,184,248,0.06) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 4, transform: `translate(${mouse.x * -18}px, ${mouse.y * -18}px)`, transition: 'transform 0.8s cubic-bezier(0.16,1,0.3,1)' }} />
      <div style={{ position: 'fixed', bottom: '8%', right: '4%', width: '420px', height: '420px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(248,200,168,0.05) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 4, transform: `translate(${mouse.x * 14}px, ${mouse.y * 14}px)`, transition: 'transform 1.2s cubic-bezier(0.16,1,0.3,1)' }} />

      <div style={{ position: 'relative', zIndex: 5, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
        <div className="fade-in" style={{ marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '10px', letterSpacing: '0.28em', color: 'rgba(200,184,248,0.55)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>by Filmos</div>
          <div style={{ fontSize: '11px', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.22)', textTransform: 'uppercase' }}>yourone · world</div>
        </div>

        <div className="fade-in-delay" style={{ transform: `translate(${mouse.x * -6}px, ${mouse.y * -6}px)`, transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)' }}>
          <h1 style={{ fontSize: 'clamp(3rem,10vw,6rem)', fontFamily: 'Playfair Display, serif', fontWeight: 400, lineHeight: 1.05, marginBottom: '1.5rem', color: 'var(--text)', textShadow: '0 0 80px rgba(200,184,248,0.2)' }}>
            Your world<br />
            <em style={{ color: 'rgba(200,184,248,0.92)', fontStyle: 'italic' }}>is waiting</em>
          </h1>
          <p style={{ fontSize: 'clamp(0.95rem,2.5vw,1.15rem)', color: 'var(--muted)', maxWidth: '400px', lineHeight: 1.75, marginBottom: '0.6rem' }}>
            Answer 10 questions. Receive a living, breathing digital world — uniquely, entirely yours.
          </p>
          <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.2)', marginBottom: '3rem', fontStyle: 'italic' }}>
            You will not know what you get until it is revealed.
          </p>
        </div>

        <div className="fade-in-delay2" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <button
            ref={btnRef}
            onClick={handleStartPayment}
            disabled={paymentPending}
            style={{ background: 'linear-gradient(135deg, rgba(200,184,248,0.16), rgba(248,200,168,0.10))', border: '0.5px solid rgba(200,184,248,0.42)', borderRadius: '50px', padding: '1.15rem 3.2rem', color: 'var(--text)', cursor: paymentPending ? 'wait' : 'pointer', fontSize: '1rem', fontWeight: 500, letterSpacing: '0.02em', boxShadow: '0 0 50px rgba(200,184,248,0.18), 0 4px 24px rgba(0,0,0,0.5)', transition: 'box-shadow 0.3s, transform 0.25s cubic-bezier(0.16,1,0.3,1)', transform: `translate(${btnMag.x}px, ${btnMag.y}px)` }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 80px rgba(200,184,248,0.35), 0 4px 28px rgba(0,0,0,0.6)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 50px rgba(200,184,248,0.18), 0 4px 24px rgba(0,0,0,0.5)' }}
          >
            {paymentPending ? 'Complete payment in new window…' : 'Find my place — $1.80'}
          </button>

          {paymentPending && (
            <div style={{ fontSize: '0.78rem', color: 'var(--muted)', maxWidth: '280px', textAlign: 'center', lineHeight: 1.6 }}>
              Pay in the popup, then your quiz opens here automatically.<br />
              <button onClick={() => { setPaymentPending(false); setStage('quiz') }} style={{ marginTop: '0.6rem', background: 'none', border: 'none', color: 'rgba(200,184,248,0.55)', cursor: 'pointer', fontSize: '0.72rem', textDecoration: 'underline' }}>
                Already paid? Click to continue
              </button>
            </div>
          )}

          {!showCodeEntry ? (
            <button onClick={() => setShowCodeEntry(true)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.24)', cursor: 'pointer', fontSize: '0.78rem', marginTop: '0.25rem', transition: 'color 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.5)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.24)' }}>
              Already have a code? Enter it →
            </button>
          ) : (
            <div style={{ display: 'flex', gap: '8px', marginTop: '0.25rem' }}>
              <input value={codeInput} onChange={e => setCodeInput(e.target.value.toUpperCase())} onKeyDown={e => e.key === 'Enter' && handleEnterCode()}
                placeholder="YOUR CODE" maxLength={8}
                style={{ background: 'rgba(255,255,255,0.05)', border: `0.5px solid ${codeError ? 'rgba(255,80,80,0.6)' : 'rgba(255,255,255,0.18)'}`, borderRadius: '8px', padding: '0.55rem 0.8rem', color: 'var(--text)', fontSize: '0.85rem', fontFamily: 'monospace', letterSpacing: '0.18em', outline: 'none', width: '165px', textTransform: 'uppercase', textAlign: 'center', boxShadow: codeError ? '0 0 16px rgba(255,80,80,0.2)' : 'none', transition: 'border-color 0.2s' }} />
              <button onClick={handleEnterCode} style={{ background: 'rgba(255,255,255,0.07)', border: '0.5px solid rgba(255,255,255,0.15)', borderRadius: '8px', padding: '0.55rem 1.1rem', color: 'var(--text)', cursor: 'pointer', fontSize: '0.85rem' }}>Enter</button>
            </div>
          )}
        </div>

        <div className="fade-in-delay3" style={{ position: 'fixed', bottom: '1.8rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '1.5rem', fontSize: '0.72rem', color: 'rgba(255,255,255,0.2)', whiteSpace: 'nowrap' }}>
          <span>No account</span><span>·</span><span>50 worlds</span><span>·</span><span>Yours forever</span>
        </div>
      </div>
    </div>
  )
}
