'use client'
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { SceneId, scenes } from './components/SceneRenderer'

const ParticleCanvas = dynamic(() => import('./components/ParticleCanvas'), { ssr: false })
const SceneRenderer = dynamic(() => import('./components/SceneRenderer'), { ssr: false })
const QuizEngine = dynamic(() => import('./components/QuizEngine'), { ssr: false })

type Stage = 'landing' | 'quiz' | 'reveal' | 'place'

function decodeCode(c: string): string | null {
  if (!c || c.length !== 6) return null
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const idx = chars.indexOf(c[0].toUpperCase())
  if (idx < 0 || idx > 9) return null
  const archetypeList = ['meadow','neon_alley','ocean','tokyo_rooftop','desert_canyon','storm_forest','arctic','autumn_forest','factory','cloud_sea']
  return archetypeList[idx] ?? null
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

  useEffect(() => {
    const updateDims = () => setDims({ w: window.innerWidth, h: window.innerHeight })
    updateDims()
    window.addEventListener('resize', updateDims)

    // Check URL for code
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
    return () => window.removeEventListener('resize', updateDims)
  }, [])

  const handleQuizComplete = (arc: string, generatedCode: string) => {
    setArchetype(arc as SceneId)
    setCode(generatedCode)
    setStage('reveal')
    setRevealStep(0)
    setTimeout(() => setRevealStep(1), 600)
    setTimeout(() => setRevealStep(2), 2000)
    setTimeout(() => setRevealStep(3), 3200)
    setTimeout(() => {
      setStage('place')
      window.history.replaceState({}, '', `/place/${generatedCode}`)
    }, 5200)
  }

  const handleStartPayment = () => {
    setPaymentPending(true)
    const checkoutUrl = (process.env.NEXT_PUBLIC_LEMON_CHECKOUT_URL as string) || '#'
    if (checkoutUrl === '#') {
      // Dev mode - skip payment
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
      } catch(e) { /* ignore */ }
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

  // ─── QUIZ ───────────────────────────────────────
  if (stage === 'quiz') return (
    <div style={{ minHeight:'100vh', background:'var(--bg)' }}>
      <ParticleCanvas density={40} />
      <div style={{ position:'relative', zIndex:1 }}>
        <QuizEngine onComplete={handleQuizComplete} />
      </div>
    </div>
  )

  // ─── REVEAL ─────────────────────────────────────
  if (stage === 'reveal') return (
    <div style={{ minHeight:'100vh', background:'#000', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden', position:'relative' }}>
      <div style={{ position:'absolute', inset:0, opacity: revealStep >= 1 ? 1 : 0, transition:'opacity 1.8s ease' }}>
        <SceneRenderer sceneId={archetype} width={dims.w} height={dims.h} />
      </div>
      <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.3)', zIndex:1 }} />
      <div style={{ position:'relative', zIndex:2, textAlign:'center', padding:'2rem' }}>
        {revealStep >= 2 && (
          <h1 style={{ fontSize:'clamp(2rem,7vw,4rem)', fontFamily:'Playfair Display, serif', fontWeight:400, color:'#fff', textShadow:'0 2px 40px rgba(0,0,0,0.9)', marginBottom:'1rem', animation:'fadeIn 1.2s ease forwards' }}>
            {scenes[archetype]?.name}
          </h1>
        )}
        {revealStep >= 3 && (
          <p style={{ fontSize:'1.05rem', color:'rgba(255,255,255,0.75)', fontStyle:'italic', maxWidth:'420px', margin:'0 auto', textShadow:'0 2px 20px rgba(0,0,0,0.9)', lineHeight:1.7, animation:'fadeIn 1s ease forwards' }}>
            {scenes[archetype]?.mood}
          </p>
        )}
      </div>
    </div>
  )

  // ─── PLACE (YOUR WORLD) ─────────────────────────
  if (stage === 'place') {
    const scene = scenes[archetype]
    const shareUrl = `https://yourone.world/place/${code}`
    const shareText = `My digital world is "${scene?.name}". What is yours? → yourone.world  (My code: ${code})`
    return (
      <div style={{ minHeight:'100vh', background:'#000', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'fixed', inset:0 }}>
          <SceneRenderer sceneId={archetype} width={dims.w} height={dims.h} />
        </div>
        <div style={{ position:'fixed', inset:0, background:'linear-gradient(to bottom, transparent 35%, rgba(0,0,0,0.9) 100%)', zIndex:1 }} />
        <div style={{ position:'relative', zIndex:2, minHeight:'100vh', display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'clamp(1.5rem,4vw,3rem)', maxWidth:'600px' }}>
          <div style={{ marginBottom:'1.5rem' }}>
            <div style={{ fontSize:'10px', letterSpacing:'0.18em', color:'rgba(255,255,255,0.4)', textTransform:'uppercase', marginBottom:'0.6rem' }}>your one world</div>
            <h1 style={{ fontSize:'clamp(1.6rem,5vw,2.8rem)', fontFamily:'Playfair Display, serif', fontWeight:400, color:'#fff', lineHeight:1.2, marginBottom:'0.6rem' }}>
              {scene?.name}
            </h1>
            <p style={{ fontSize:'0.95rem', color:'rgba(255,255,255,0.6)', fontStyle:'italic', lineHeight:1.65, marginBottom:'1.5rem' }}>
              {scene?.mood}
            </p>
            {/* Code box */}
            <div style={{ background:'rgba(0,0,0,0.55)', border:'0.5px solid rgba(255,255,255,0.12)', borderRadius:'14px', padding:'1rem 1.2rem', marginBottom:'1rem', backdropFilter:'blur(12px)' }}>
              <div style={{ fontSize:'10px', letterSpacing:'0.1em', color:'rgba(255,255,255,0.35)', marginBottom:'0.5rem' }}>YOUR CODE — RETURN ANYTIME</div>
              <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', gap:'1rem' }}>
                <span style={{ fontSize:'1.9rem', letterSpacing:'0.32em', fontWeight:700, color:'#fff', fontFamily:'monospace' }}>{code}</span>
                <button onClick={() => copyToClipboard(code)}
                  style={{ background:'rgba(255,255,255,0.08)', border:'0.5px solid rgba(255,255,255,0.18)', borderRadius:'8px', padding:'0.4rem 1rem', color:'rgba(255,255,255,0.7)', cursor:'pointer', fontSize:'0.75rem', fontWeight:500, whiteSpace:'nowrap', flexShrink:0 }}>
                  {copied ? '✓ Copied' : 'Copy'}
                </button>
              </div>
            </div>
            {/* Share buttons */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:'8px', marginBottom:'1rem' }}>
              <button onClick={() => copyToClipboard(shareUrl)}
                style={{ background:'rgba(200,184,248,0.1)', border:'0.5px solid rgba(200,184,248,0.25)', borderRadius:'50px', padding:'0.7rem 0.5rem', color:'#fff', cursor:'pointer', fontSize:'0.8rem', fontWeight:500 }}>
                📋 Copy link
              </button>
              <a href={`https://wa.me/?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noreferrer"
                style={{ background:'rgba(37,211,102,0.1)', border:'0.5px solid rgba(37,211,102,0.25)', borderRadius:'50px', padding:'0.7rem 0.5rem', color:'#fff', cursor:'pointer', fontSize:'0.8rem', fontWeight:500, textDecoration:'none', textAlign:'center', display:'block' }}>
                💬 WhatsApp
              </a>
              <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`} target="_blank" rel="noreferrer"
                style={{ background:'rgba(29,161,242,0.1)', border:'0.5px solid rgba(29,161,242,0.25)', borderRadius:'50px', padding:'0.7rem 0.5rem', color:'#fff', cursor:'pointer', fontSize:'0.8rem', fontWeight:500, textDecoration:'none', textAlign:'center', display:'block' }}>
                𝕏 Post
              </a>
            </div>
            <p style={{ fontSize:'0.72rem', color:'rgba(255,255,255,0.22)', textAlign:'center' }}>
              a <strong style={{ color:'rgba(255,255,255,0.4)' }}>Filmos</strong> product · yourone.world
            </p>
          </div>
        </div>
      </div>
    )
  }

  // ─── LANDING ────────────────────────────────────
  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', position:'relative', overflow:'hidden' }}>
      <ParticleCanvas density={80} />
      {/* Ambient glow */}
      <div style={{ position:'fixed', top:'15%', left:'10%', width:'500px', height:'500px', borderRadius:'50%', background:'radial-gradient(circle, rgba(200,184,248,0.04) 0%, transparent 65%)', pointerEvents:'none', zIndex:0 }} />
      <div style={{ position:'fixed', bottom:'10%', right:'5%', width:'400px', height:'400px', borderRadius:'50%', background:'radial-gradient(circle, rgba(248,200,168,0.035) 0%, transparent 65%)', pointerEvents:'none', zIndex:0 }} />

      <div style={{ position:'relative', zIndex:1, minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'2rem', textAlign:'center' }}>
        {/* Byline */}
        <div className="fade-in" style={{ marginBottom:'2.5rem' }}>
          <div style={{ fontSize:'10px', letterSpacing:'0.22em', color:'rgba(200,184,248,0.5)', textTransform:'uppercase', marginBottom:'0.4rem' }}>by Filmos</div>
          <div style={{ fontSize:'11px', letterSpacing:'0.16em', color:'rgba(255,255,255,0.2)', textTransform:'uppercase' }}>yourone · world</div>
        </div>

        {/* Hero text */}
        <div className="fade-in-delay">
          <h1 style={{ fontSize:'clamp(2.8rem,9vw,5.5rem)', fontFamily:'Playfair Display, serif', fontWeight:400, lineHeight:1.08, marginBottom:'1.5rem', color:'var(--text)' }}>
            Your world<br />
            <em style={{ color:'rgba(200,184,248,0.9)', fontStyle:'italic' }}>is waiting</em>
          </h1>
          <p style={{ fontSize:'clamp(0.95rem,2.5vw,1.15rem)', color:'var(--muted)', maxWidth:'420px', lineHeight:1.75, marginBottom:'0.6rem' }}>
            Answer 10 questions. Receive a living, breathing digital world — uniquely, entirely yours.
          </p>
          <p style={{ fontSize:'0.82rem', color:'rgba(255,255,255,0.18)', marginBottom:'3rem', fontStyle:'italic' }}>
            You will not know what you get until it is revealed.
          </p>
        </div>

        {/* CTA */}
        <div className="fade-in-delay2" style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'1rem' }}>
          <button onClick={handleStartPayment} disabled={paymentPending}
            style={{
              background:'linear-gradient(135deg, rgba(200,184,248,0.14), rgba(248,200,168,0.08))',
              border:'0.5px solid rgba(200,184,248,0.38)',
              borderRadius:'50px', padding:'1.1rem 3rem',
              color:'var(--text)', cursor: paymentPending ? 'wait' : 'pointer',
              fontSize:'1rem', fontWeight:500, letterSpacing:'0.01em',
              boxShadow:'0 0 40px rgba(200,184,248,0.15), 0 4px 20px rgba(0,0,0,0.4)',
              transition:'all 0.3s'
            }}>
            {paymentPending ? 'Complete payment in new window…' : 'Find my place — $1.80'}
          </button>

          {paymentPending && (
            <div style={{ fontSize:'0.78rem', color:'var(--muted)', maxWidth:'280px', textAlign:'center', lineHeight:1.6 }}>
              Pay in the popup, then your quiz opens here automatically.
              <br />
              <button onClick={() => { setPaymentPending(false); setStage('quiz') }}
                style={{ marginTop:'0.6rem', background:'none', border:'none', color:'rgba(200,184,248,0.55)', cursor:'pointer', fontSize:'0.72rem', textDecoration:'underline' }}>
                Already paid? Click to continue
              </button>
            </div>
          )}

          {/* Code entry */}
          {!showCodeEntry ? (
            <button onClick={() => setShowCodeEntry(true)}
              style={{ background:'none', border:'none', color:'rgba(255,255,255,0.22)', cursor:'pointer', fontSize:'0.78rem', marginTop:'0.25rem' }}>
              Already have a code? Enter it →
            </button>
          ) : (
            <div style={{ display:'flex', gap:'8px', marginTop:'0.25rem' }}>
              <input value={codeInput} onChange={e => setCodeInput(e.target.value.toUpperCase())}
                onKeyDown={e => e.key === 'Enter' && handleEnterCode()}
                placeholder="YOUR CODE" maxLength={6}
                style={{ background:'rgba(255,255,255,0.05)', border:`0.5px solid ${codeError ? 'rgba(255,80,80,0.5)' : 'rgba(255,255,255,0.15)'}`, borderRadius:'8px', padding:'0.55rem 0.8rem', color:'var(--text)', fontSize:'0.85rem', fontFamily:'monospace', letterSpacing:'0.22em', outline:'none', width:'140px', textTransform:'uppercase', textAlign:'center' }} />
              <button onClick={handleEnterCode}
                style={{ background:'rgba(255,255,255,0.07)', border:'0.5px solid rgba(255,255,255,0.15)', borderRadius:'8px', padding:'0.55rem 1.1rem', color:'var(--text)', cursor:'pointer', fontSize:'0.85rem' }}>
                Enter
              </button>
            </div>
          )}
        </div>

        {/* Footer hints */}
        <div className="fade-in-delay3" style={{ position:'fixed', bottom:'1.8rem', left:'50%', transform:'translateX(-50%)', display:'flex', gap:'1.5rem', fontSize:'0.72rem', color:'rgba(255,255,255,0.18)', whiteSpace:'nowrap' }}>
          <span>No account</span><span>·</span><span>10 worlds</span><span>·</span><span>Yours forever</span>
        </div>
      </div>
    </div>
  )
}
