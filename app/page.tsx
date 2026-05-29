'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import type { CategoryKey, ArchetypeResult } from './lib/archetypes'
import { ARCHETYPE_REGISTRY } from './lib/archetypes'
import { QUIZ_DATA, SCORE_FUNCTIONS } from './lib/quizData'
import { triggerDownload } from './components/ShareCard'

const AmbientReel    = dynamic(() => import('./components/AmbientReel'),    { ssr: false })
const ParticleCanvas = dynamic(() => import('./components/ParticleCanvas'), { ssr: false })
const VideoScene     = dynamic(() => import('./components/VideoScene'),     { ssr: false })
const ImageScene     = dynamic(() => import('./components/ImageScene'),     { ssr: false })
const LoadingOverlay = dynamic(() => import('./components/LoadingOverlay'), { ssr: false })
const QuizEngine     = dynamic(() => import('./components/QuizEngine'),     { ssr: false })
const ShareCard      = dynamic(() => import('./components/ShareCard'),      { ssr: false })

type Stage = 'home' | 'preview' | 'quiz' | 'reveal' | 'place'

interface CatDef {
  key: CategoryKey; label: string; emoji: string; teaser: string
  price: string; color: string; gradient: string
}

const CATEGORIES: CatDef[] = [
  { key: 'animal',    label: 'Spirit Animal',  emoji: '🐾', teaser: 'Which creature carries your soul?',            price: '$0.99', color: '#f09438', gradient: 'rgba(240,148,56,0.14)' },
  { key: 'world',     label: 'Your World',      emoji: '🌍', teaser: 'A living, breathing place — uniquely yours.',  price: '$1.80', color: '#a07af8', gradient: 'rgba(160,122,248,0.14)' },
  { key: 'celebrity', label: 'Your Celebrity',  emoji: '⭐', teaser: 'Which icon shares your energy?',              price: '$1.50', color: '#f8cc38', gradient: 'rgba(248,204,56,0.14)' },
  { key: 'planet',    label: 'Your Planet',      emoji: '🪐', teaser: 'Where in the cosmos do you belong?',          price: '$2.90', color: '#38c4f8', gradient: 'rgba(56,196,248,0.14)' },
]

const ARCHETYPE_LISTS: Record<CategoryKey, string[]> = {
  world:     ['meadow','neon_alley','ocean','tokyo_rooftop','desert_canyon','storm_forest','arctic','autumn_forest','factory','cloud_sea'],
  animal:    ['wolf','eagle','fox','bear','dolphin','lion','owl','deer','tiger','octopus','panther','elephant','raven','cheetah','horse','whale','snake','hummingbird','gorilla','falcon'],
  celebrity: ['elon_musk','rihanna','keanu_reeves','oprah','david_bowie','beyonce','obama','billie_eilish','freddie_mercury','steve_jobs','leonardo_dicaprio','kanye_west','taylor_swift','lady_gaga','morgan_freeman','einstein','marilyn_monroe','nikola_tesla','tupac','nelson_mandela','elvis_presley','michael_jackson','madonna','bob_dylan','bob_marley','kurt_cobain','jim_morrison','prince','whitney_houston','amy_winehouse','frank_sinatra','johnny_cash','elton_john','bruce_springsteen','stevie_wonder','eminem','jay_z','kendrick_lamar','drake','adele','harry_styles','ariana_grande','the_weeknd','lizzo','post_malone','meryl_streep','tom_hanks','denzel_washington','angelina_jolie','will_smith','dwayne_johnson','zendaya','emma_watson','natalie_portman','cate_blanchett','viola_davis','johnny_depp','harrison_ford','tom_cruise','julia_roberts','ryan_gosling','scarlett_johansson','chris_evans','jennifer_lopez','anne_hathaway','lebron_james','serena_williams','cristiano_ronaldo','lionel_messi','muhammad_ali','tiger_woods','michael_jordan','simone_biles','roger_federer','usain_bolt','kobe_bryant','venus_williams','lewis_hamilton','naomi_osaka','stephen_curry','martin_luther_king','mahatma_gandhi','malala_yousafzai','frida_kahlo','andy_warhol','marie_curie','carl_sagan','jane_goodall','winston_churchill','cleopatra','jeff_bezos','bill_gates','warren_buffett','richard_branson','mark_zuckerberg','sheryl_sandberg','jk_rowling','alan_turing','jack_ma','ray_dalio'],
  planet:    ['mars','venus','saturn','jupiter','neptune','mercury','pluto','orion_nebula','black_hole','sirius','moon','andromeda','europa','sun','milky_way','vega','titan'],
}

const TICKER_NAMES = ['Sunlit Meadow','Wolf','Tokyo Rooftop','Eagle','Neon Alley','Mars','Rihanna','Arctic Tundra','Black Hole','Fox','Billie Eilish','Cloud Sea','Jupiter','Panther','David Bowie','Desert Canyon','Sirius','Bear','Andromeda','Freddie Mercury','Storm Forest','Octopus','Saturn','Beyoncé','Autumn Forest','Neptune','Deer','Keanu Reeves','Factory','Pluto','Lion','Orion Nebula','Dolphin','Obama','Raven','Cheetah','Horse','Humpback Whale','Serpent','Hummingbird','Gorilla','Falcon','Taylor Swift','Lady Gaga','Morgan Freeman','Einstein','Marilyn Monroe','Tesla','Tupac','Mandela','Europa','The Sun','Milky Way','Vega','Titan']

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
    } else if (p.get('start') === '1' && urlCat) {
      const catDef = CATEGORIES.find(c => c.key === urlCat)
      if (catDef) { setCategory(catDef); setStage('quiz') }
    }
  }, [])

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    setMouse({ x: (e.clientX / window.innerWidth - 0.5) * 2, y: (e.clientY / window.innerHeight - 0.5) * 2 })
    if (btnRef.current) {
      const r = btnRef.current.getBoundingClientRect()
      const dx = e.clientX - (r.left + r.width / 2), dy = e.clientY - (r.top + r.height / 2)
      setBtnMag(Math.sqrt(dx*dx+dy*dy) < 100 ? { x: dx*.35, y: dy*.35 } : { x:0, y:0 })
    }
  }, [])

  const GUMROAD_URLS: Record<CategoryKey, string> = {
    world:     'https://15682690152.gumroad.com/l/laohtv',
    animal:    'https://15682690152.gumroad.com/l/dwejrj',
    celebrity: 'https://15682690152.gumroad.com/l/ojyjng',
    planet:    'https://15682690152.gumroad.com/l/errpt',
  }

  const startPayment = () => {
    window.location.href = GUMROAD_URLS[category.key]
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

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text).catch(() => {})
    setCopied(key)
    setTimeout(() => setCopied(null), 2200)
  }

  // ─── HOME ─────────────────────────────────────────────────────────────────
  if (stage === 'home') return (
    <>
    <div style={{ minHeight: '100vh', background: '#04040c', position: 'relative', overflow: 'hidden' }} onMouseMove={onMouseMove}>
      <AmbientReel />
      <ParticleCanvas density={20} />

      {/* Parallax orbs */}
      <div style={{ position: 'fixed', top: '6%', left: '4%', width: '520px', height: '520px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(160,122,248,0.07) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 2, transform: `translate(${mouse.x*-18}px,${mouse.y*-18}px)`, transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1)' }} />
      <div style={{ position: 'fixed', bottom: '6%', right: '3%', width: '420px', height: '420px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(240,148,56,0.055) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 2, transform: `translate(${mouse.x*14}px,${mouse.y*14}px)`, transition: 'transform 1.1s cubic-bezier(0.16,1,0.3,1)' }} />
      <div style={{ position: 'fixed', top: '42%', right: '8%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(56,196,248,0.05) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 2, transform: `translate(${mouse.x*9}px,${mouse.y*-9}px)`, transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)' }} />

      <div style={{ position: 'relative', zIndex: 5, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '5rem 1.5rem 3rem' }}>

        {/* Brand pill */}
        <div className="fade-in" style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(160,122,248,0.1)', border: '0.5px solid rgba(160,122,248,0.28)', borderRadius: '50px', padding: '0.38rem 1.1rem', marginBottom: '2.4rem' }}>
            <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#a07af8', animation: 'breathe 2.8s ease infinite', display: 'inline-block', flexShrink: 0 }} />
            <span style={{ fontSize: '0.68rem', letterSpacing: '0.2em', color: 'rgba(160,122,248,0.92)', textTransform: 'uppercase', fontWeight: 500 }}>by Filmos · yourone.world</span>
          </div>

          {/* Hero */}
          <div style={{ transform: `translate(${mouse.x*-5}px,${mouse.y*-5}px)`, transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)' }}>
            <h1 style={{ fontSize: 'clamp(2.8rem,9vw,6rem)', fontFamily: 'Playfair Display, serif', fontWeight: 400, lineHeight: 1.04, marginBottom: '1.4rem' }}>
              <span style={{ color: 'var(--text)' }}>Discover who</span><br />
              <em style={{ background: 'linear-gradient(125deg, #e0d0ff 0%, #a07af8 45%, #f5a830 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                you really are
              </em>
            </h1>
            <p style={{ fontSize: 'clamp(0.9rem,1.8vw,1.05rem)', color: 'var(--text-2)', maxWidth: '400px', margin: '0 auto', lineHeight: 1.82 }}>
              10 questions. A revelation built entirely around you — your world, your animal, your cosmic identity.
            </p>
          </div>
        </div>

        {/* Archetype ticker */}
        <div className="fade-in marquee-wrap" style={{ width: '100%', maxWidth: '600px', marginBottom: '2.6rem' }}>
          <div className="marquee-track">
            {[...TICKER_NAMES, ...TICKER_NAMES].map((name, i) => (
              <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0 1.1rem', whiteSpace: 'nowrap' }}>
                <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.05em' }}>{name}</span>
                <span style={{ width: '2px', height: '2px', borderRadius: '50%', background: 'rgba(160,122,248,0.38)', display: 'inline-block', flexShrink: 0 }} />
              </span>
            ))}
          </div>
        </div>

        {/* Trust bar */}
        <div className="fade-in" style={{ marginBottom: '2.2rem', display: 'flex', alignItems: 'center', gap: '1.4rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#a07af8', animation: 'breathe 2.8s ease infinite', display: 'inline-block', flexShrink: 0 }} />
            <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.72)', fontWeight: 500 }}>{counter.toLocaleString()}<span style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 400 }}> discoveries made</span></span>
          </div>
          <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: '0.9rem' }}>|</span>
          <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.42)' }}>42 archetypes · 4 dimensions</span>
          <span style={{ color: 'rgba(255,255,255,0.15)', fontSize: '0.9rem' }}>|</span>
          <span style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.42)' }}>from $0.99</span>
        </div>

        {/* Category cards */}
        <div className="fade-in-delay2" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', maxWidth: '560px', width: '100%', marginBottom: '1.4rem' }}>
          {CATEGORIES.map((cat, idx) => (
            <button key={cat.key}
              onClick={() => { setCategory(cat); setStage('preview') }}
              style={{ background: cat.gradient, border: `0.5px solid ${cat.color}30`, borderRadius: '20px', padding: '1.4rem 1.3rem', cursor: 'pointer', textAlign: 'left', color: 'var(--text)', transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)', position: 'relative', overflow: 'hidden', animation: `slideUp 0.5s cubic-bezier(0.16,1,0.3,1) ${idx * 0.07 + 0.2}s both` }}
              onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background=cat.gradient.replace('0.14','0.28'); b.style.borderColor=cat.color+'66'; b.style.transform='translateY(-4px)'; b.style.boxShadow=`0 16px 48px ${cat.color}28, 0 4px 16px rgba(0,0,0,0.5)` }}
              onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background=cat.gradient; b.style.borderColor=cat.color+'30'; b.style.transform=''; b.style.boxShadow='none' }}>
              {/* Top accent bar */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${cat.color}, ${cat.color}55, transparent)` }} />
              <div style={{ fontSize: '2.1rem', marginBottom: '0.65rem', filter: `drop-shadow(0 0 16px ${cat.color}77)`, lineHeight: 1 }}>{cat.emoji}</div>
              <div style={{ fontSize: '0.97rem', fontWeight: 600, marginBottom: '0.3rem', color: 'rgba(255,255,255,0.96)' }}>{cat.label}</div>
              <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.55)', lineHeight: 1.5, marginBottom: '1.1rem' }}>{cat.teaser}</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.05rem', fontWeight: 700, color: cat.color, letterSpacing: '-0.01em' }}>{cat.price}</span>
                <span style={{ fontSize: '0.66rem', background: `${cat.color}18`, border: `0.5px solid ${cat.color}40`, borderRadius: '50px', padding: '0.22rem 0.65rem', color: cat.color, fontWeight: 500, flexShrink: 0 }}>Begin →</span>
              </div>
            </button>
          ))}
        </div>

        {/* How it works */}
        <div className="fade-in-delay3" style={{ maxWidth: '560px', width: '100%', marginBottom: '1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1px', background: 'rgba(255,255,255,0.06)', borderRadius: '14px', overflow: 'hidden' }}>
            {[
              { n: '01', h: 'Choose', sub: 'Pick the dimension to reveal' },
              { n: '02', h: 'Answer 10', sub: 'Honest questions, precise results' },
              { n: '03', h: 'Receive', sub: 'Yours forever with a code' },
            ].map(s => (
              <div key={s.n} style={{ background: 'rgba(255,255,255,0.022)', padding: '0.9rem 0.75rem', textAlign: 'center' }}>
                <div style={{ fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.14em', color: 'rgba(160,122,248,0.55)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>{s.n}</div>
                <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'rgba(255,255,255,0.82)', marginBottom: '0.25rem' }}>{s.h}</div>
                <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.38)', lineHeight: 1.4 }}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Code entry — collapsible */}
        <div className="fade-in-delay3" style={{ maxWidth: '560px', width: '100%' }}>
          <details style={{ background: 'rgba(255,255,255,0.02)', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '12px', padding: '0.8rem 1.1rem' }}>
            <summary style={{ fontSize: '0.76rem', color: 'rgba(255,255,255,0.42)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', userSelect: 'none', listStyle: 'none' }}>
              <span>🔑</span><span>Already have a code? Return to your world</span>
            </summary>
            <div style={{ paddingTop: '0.85rem', display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center' }}>
              <select value={codeCategory} onChange={e => setCodeCategory(e.target.value as CategoryKey)}
                style={{ background: 'rgba(255,255,255,0.06)', border: '0.5px solid rgba(255,255,255,0.14)', borderRadius: '9px', padding: '0.58rem 0.65rem', color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', outline: 'none', cursor: 'pointer' }}>
                {CATEGORIES.map(c => <option key={c.key} value={c.key} style={{ background: '#0a0a18' }}>{c.emoji} {c.label}</option>)}
              </select>
              <input value={codeInput} onChange={e => setCodeInput(e.target.value.toUpperCase())} onKeyDown={e => e.key === 'Enter' && enterCode()} placeholder="YOUR CODE" maxLength={8}
                style={{ background: 'rgba(255,255,255,0.05)', border: `0.5px solid ${codeError ? 'rgba(255,70,70,0.65)' : 'rgba(255,255,255,0.16)'}`, borderRadius: '9px', padding: '0.58rem 0.85rem', color: 'var(--text)', fontSize: '0.88rem', fontFamily: 'monospace', letterSpacing: '0.22em', outline: 'none', width: '138px', textTransform: 'uppercase', textAlign: 'center', boxShadow: codeError ? '0 0 14px rgba(255,70,70,0.22)' : 'none', transition: 'border-color 0.2s, box-shadow 0.2s' }} />
              <button onClick={enterCode}
                style={{ background: 'rgba(160,122,248,0.16)', border: '0.5px solid rgba(160,122,248,0.38)', borderRadius: '9px', padding: '0.58rem 1.1rem', color: 'var(--text)', cursor: 'pointer', fontSize: '0.84rem', fontWeight: 500, transition: 'all 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background='rgba(160,122,248,0.3)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background='rgba(160,122,248,0.16)' }}>
                Open →
              </button>
            </div>
            {codeError && <p style={{ textAlign: 'center', marginTop: '0.6rem', fontSize: '0.73rem', color: 'rgba(255,80,80,0.9)' }}>Invalid code — check the category and try again</p>}
          </details>
        </div>

      </div>
    </div>

    {/* Floating footer */}
    <div style={{ position: 'fixed', bottom: '1.2rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '0.9rem', alignItems: 'center', fontSize: '0.68rem', whiteSpace: 'nowrap', zIndex: 20, background: 'rgba(4,4,14,0.7)', backdropFilter: 'blur(12px)', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '50px', padding: '0.45rem 1.1rem' }}>
      <Link href="/pricing" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Pricing</Link>
      <span style={{ color: 'rgba(255,255,255,0.18)' }}>·</span>
      <Link href="/terms" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Terms</Link>
      <span style={{ color: 'rgba(255,255,255,0.18)' }}>·</span>
      <Link href="/privacy" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Privacy</Link>
      <span style={{ color: 'rgba(255,255,255,0.18)' }}>·</span>
      <Link href="/refund" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Refunds</Link>
    </div>
    </>
  )

  // ─── PREVIEW — taste Q1, then pay ────────────────────────────────────────
  if (stage === 'preview') {
    const q1 = QUIZ_DATA[category.key][0]
    return (
      <div style={{ minHeight: '100vh', background: '#04040c', position: 'relative', overflow: 'hidden' }} onMouseMove={onMouseMove}>
        <AmbientReel />
        <ParticleCanvas density={18} />
        <div style={{ position: 'fixed', inset: 0, background: `radial-gradient(ellipse at 50% 55%, ${category.color}1a 0%, transparent 68%)`, pointerEvents: 'none', zIndex: 1 }} />

        <div style={{ position: 'relative', zIndex: 5, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem 1.5rem' }}>
          <button onClick={() => { setStage('home') }}
            style={{ position: 'fixed', top: '1.4rem', left: '1.4rem', background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: '50px', padding: '0.45rem 1rem', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: '0.78rem', backdropFilter: 'blur(8px)', transition: 'all 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.85)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.5)' }}>
            ← Back
          </button>

          {/* Category identity */}
          <div style={{ marginBottom: '2.2rem', textAlign: 'center' }}>
            <div style={{ fontSize: '3.2rem', marginBottom: '0.7rem', filter: `drop-shadow(0 0 24px ${category.color}88)`, lineHeight: 1, animation: 'breathe 3s ease-in-out infinite' }}>{category.emoji}</div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: `${category.color}15`, border: `0.5px solid ${category.color}40`, borderRadius: '50px', padding: '0.3rem 0.9rem' }}>
              <span style={{ fontSize: '0.68rem', letterSpacing: '0.2em', color: category.color, textTransform: 'uppercase', fontWeight: 600 }}>{category.label}</span>
              <span style={{ fontSize: '0.65rem', color: `${category.color}77` }}>{category.price}</span>
            </div>
          </div>

          {/* Q1 preview */}
          <div style={{ maxWidth: '520px', width: '100%', textAlign: 'center', marginBottom: '2.5rem' }}>
            <div style={{ fontSize: '10px', letterSpacing: '0.2em', color: `${category.color}88`, textTransform: 'uppercase', marginBottom: '1rem' }}>
              Question 1 of {QUIZ_DATA[category.key].length} — preview
            </div>
            <h2 style={{ fontSize: 'clamp(1.35rem,3.8vw,1.9rem)', fontWeight: 400, fontFamily: 'Playfair Display, serif', lineHeight: 1.3, marginBottom: '0.7rem', color: 'var(--text)' }}>{q1.text}</h2>
            <p style={{ fontSize: '0.87rem', color: 'var(--muted)', fontStyle: 'italic', marginBottom: '1.8rem' }}>{q1.sub}</p>

            {q1.options && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '9px', marginBottom: '1.8rem' }}>
                {q1.options.map((opt, i) => (
                  <div key={opt.value} style={{ background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '1.1rem', textAlign: 'left', opacity: 0.55, position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: '0.45rem', right: '0.45rem', width: '16px', height: '16px', borderRadius: '5px', background: 'rgba(255,255,255,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.58rem', color: 'rgba(255,255,255,0.2)', fontWeight: 600 }}>{i+1}</div>
                    <div style={{ fontSize: '1.7rem', marginBottom: '0.45rem' }}>{opt.emoji}</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 500, marginBottom: '0.22rem', color: 'rgba(255,255,255,0.8)' }}>{opt.label}</div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--muted)', lineHeight: 1.4 }}>{opt.desc}</div>
                  </div>
                ))}
              </div>
            )}

            <p style={{ fontSize: '0.84rem', color: 'rgba(255,255,255,0.6)', fontStyle: 'italic' }}>
              {QUIZ_DATA[category.key].length - 1} more questions reveal your {category.label.toLowerCase()}. Claim it for {category.price}.
            </p>
          </div>

          <button ref={btnRef} onClick={startPayment}
            style={{ background: `linear-gradient(135deg, ${category.gradient.replace('0.14','0.22')}, rgba(0,0,0,0.2))`, border: `0.5px solid ${category.color}60`, borderRadius: '50px', padding: '1.1rem 3.2rem', color: '#fff', cursor: 'pointer', fontSize: '0.98rem', fontWeight: 600, letterSpacing: '0.02em', boxShadow: `0 0 48px ${category.color}30, 0 4px 24px rgba(0,0,0,0.5)`, transition: 'box-shadow 0.3s, transform 0.25s cubic-bezier(0.16,1,0.3,1)', transform: `translate(${btnMag.x}px,${btnMag.y}px)` }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 80px ${category.color}55, 0 4px 28px rgba(0,0,0,0.6)` }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 0 48px ${category.color}30, 0 4px 24px rgba(0,0,0,0.5)` }}>
            Claim my {category.label} — {category.price}
          </button>
        </div>
      </div>
    )
  }

  // ─── QUIZ ─────────────────────────────────────────────────────────────────
  if (stage === 'quiz') return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <ParticleCanvas density={22} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <QuizEngine category={category.key} accentColor={category.color} onComplete={onQuizComplete} />
      </div>
    </div>
  )

  // ─── REVEAL ───────────────────────────────────────────────────────────────
  if (stage === 'reveal' && result) return (
    <div style={{ minHeight: '100vh', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: 0, opacity: revealStep>=1?1:0, transform: revealStep>=1?'scale(1)':'scale(1.08)', transition: 'opacity 2.4s ease, transform 3.2s ease' }}>
        {category.key === 'world'
          ? <VideoScene sceneId={result.id} onReady={() => setMediaReady(true)} />
          : <ImageScene archetypeId={result.id} onReady={() => setMediaReady(true)} />
        }
        <LoadingOverlay show={!mediaReady} emoji={category.emoji} label={`Loading your ${category.label.toLowerCase()}`} color={category.color} />
      </div>
      {/* Veil lifts */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', opacity: revealStep>=2?0:1, transition: 'opacity 2s ease', zIndex: 1 }} />
      {/* Persistent vignette */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, transparent 18%, rgba(0,0,0,0.65) 100%)', zIndex: 2 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, transparent 25%, transparent 58%, rgba(0,0,0,0.9) 100%)', zIndex: 3 }} />
      {/* Color glow from archetype */}
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 60%, ${result.color}15 0%, transparent 55%)`, zIndex: 2, opacity: revealStep>=4?1:0, transition: 'opacity 2s ease' }} />

      <div style={{ position: 'relative', zIndex: 4, textAlign: 'center', padding: '2rem', maxWidth: '540px' }}>
        <div style={{ fontSize: '10px', letterSpacing: '0.3em', color: result.color, textTransform: 'uppercase', marginBottom: '1.4rem', opacity: revealStep>=3?1:0, transform: revealStep>=3?'translateY(0)':'translateY(14px)', transition: 'opacity 1s ease, transform 1s ease', fontWeight: 500 }}>{category.label}</div>
        <h1 style={{ fontSize: 'clamp(2.6rem,9vw,5.5rem)', fontFamily: 'Playfair Display, serif', fontWeight: 400, color: '#fff', textShadow: `0 0 80px ${result.color}66, 0 0 160px ${result.color}22, 0 4px 40px rgba(0,0,0,0.9)`, marginBottom: '0.7rem', lineHeight: 1.08, opacity: revealStep>=4?1:0, transform: revealStep>=4?'translateY(0)':'translateY(22px)', transition: 'opacity 1.3s ease, transform 1.5s cubic-bezier(0.16,1,0.3,1)' }}>{result.name}</h1>
        <div style={{ fontSize: '1.05rem', fontWeight: 500, color: result.color, marginBottom: '0.9rem', opacity: revealStep>=4?1:0, transition: 'opacity 1s ease 0.35s', fontStyle: 'italic', textShadow: `0 0 40px ${result.color}44` }}>{result.title}</div>
        <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.9)', fontStyle: 'italic', maxWidth: '420px', margin: '0 auto', lineHeight: 1.8, textShadow: '0 2px 20px rgba(0,0,0,0.9)', opacity: revealStep>=5?1:0, transform: revealStep>=5?'translateY(0)':'translateY(14px)', transition: 'opacity 1s ease 0.15s, transform 1s ease 0.15s' }}>{result.tagline}</p>
        <div style={{ marginTop: '2.8rem', fontSize: '0.75rem', letterSpacing: '0.16em', color: 'rgba(255,255,255,0.52)', textTransform: 'uppercase', opacity: revealStep>=6?1:0, transition: 'opacity 1.4s ease', animation: revealStep>=6 ? 'loadBreath 2s ease-in-out infinite' : 'none' }}>Opening your world…</div>
      </div>
    </div>
  )

  // ─── PLACE ────────────────────────────────────────────────────────────────
  if (stage === 'place' && result) {
    const shareUrl = `https://yourone.world/place/${code}?cat=${category.key}`
    const otherCats = CATEGORIES.filter(c => c.key !== category.key)

    return (
      <div style={{ minHeight: '100vh', background: '#000', position: 'relative' }}>
        <ShareCard result={result} code={code} category={category.label} onReady={setShareDataUrl} />

        {/* Background media */}
        <div style={{ position: 'fixed', inset: 0 }}>
          {category.key === 'world'
            ? <VideoScene sceneId={result.id} onReady={() => setMediaReady(true)} />
            : <ImageScene archetypeId={result.id} onReady={() => setMediaReady(true)} />
          }
          <LoadingOverlay show={!mediaReady} emoji={category.emoji} label={`Loading ${category.label.toLowerCase()}`} color={category.color} />
        </div>

        {/* Gradient overlays */}
        <div style={{ position: 'fixed', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.22) 0%, transparent 28%, rgba(0,0,0,0.65) 52%, rgba(0,0,0,0.97) 100%)', zIndex: 1 }} />
        <div style={{ position: 'fixed', inset: 0, background: `radial-gradient(ellipse at 50% 80%, ${result.color}0c 0%, transparent 55%)`, zIndex: 1 }} />

        {/* Scrollable content */}
        <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(44vh,52vh,58vh) clamp(1.4rem,4vw,2.8rem) clamp(1.5rem,4vw,3rem)', maxWidth: '660px' }}>
          <div style={{ animation: 'fadeIn 1s ease forwards' }}>

            {/* Identity header */}
            <div style={{ marginBottom: '1.8rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.18em', color: `${result.color}99`, textTransform: 'uppercase' }}>{category.label}</span>
                <span style={{ width: '1px', height: '10px', background: `${result.color}40` }} />
                <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.18em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase' }}>{code}</span>
              </div>
              <h1 style={{ fontSize: 'clamp(2rem,6vw,3.2rem)', fontFamily: 'Playfair Display, serif', fontWeight: 400, color: '#fff', lineHeight: 1.12, marginBottom: '0.4rem', textShadow: `0 0 60px ${result.color}22` }}>{result.name}</h1>
              <div style={{ fontSize: '1rem', color: result.color, fontStyle: 'italic', marginBottom: '0.9rem', fontWeight: 500 }}>{result.title}</div>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.75, fontStyle: 'italic', borderLeft: `2px solid ${result.color}44`, paddingLeft: '0.8rem' }}>{result.tagline}</p>
            </div>

            {/* Description — premium content */}
            <div style={{ background: 'rgba(0,0,0,0.42)', backdropFilter: 'blur(16px)', border: `0.5px solid ${result.color}20`, borderRadius: '16px', padding: '1.4rem 1.5rem', marginBottom: '1rem' }}>
              <div style={{ fontSize: '9px', letterSpacing: '0.18em', color: `${result.color}70`, textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 600 }}>Your revelation</div>
              <p style={{ fontSize: '0.92rem', color: 'rgba(255,255,255,0.9)', lineHeight: 2, letterSpacing: '0.01em' }}>{result.description}</p>
            </div>

            {/* Why you got this */}
            <div style={{ background: 'rgba(0,0,0,0.38)', backdropFilter: 'blur(12px)', border: `0.5px solid rgba(255,255,255,0.07)`, borderRadius: '16px', padding: '1.2rem 1.4rem', marginBottom: '1rem' }}>
              <div style={{ fontSize: '9px', letterSpacing: '0.18em', color: `${result.color}70`, textTransform: 'uppercase', marginBottom: '0.9rem', fontWeight: 600 }}>Why your answers pointed here</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {result.why.map((w, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                    <span style={{ width: '20px', height: '20px', borderRadius: '6px', background: `${result.color}18`, border: `0.5px solid ${result.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                      <span style={{ color: result.color, fontSize: '0.55rem', fontWeight: 700 }}>{String.fromCharCode(65+i)}</span>
                    </span>
                    <span style={{ fontSize: '0.84rem', color: 'rgba(255,255,255,0.84)', lineHeight: 1.65 }}>{w}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Code + share */}
            <div style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(14px)', border: `0.5px solid ${result.color}20`, borderRadius: '16px', padding: '1rem 1.3rem', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', marginBottom: '0.85rem' }}>
                <div>
                  <div style={{ fontSize: '8px', letterSpacing: '0.18em', color: `${result.color}66`, textTransform: 'uppercase', marginBottom: '0.3rem' }}>Your code — return anytime</div>
                  <span style={{ fontSize: '1.4rem', letterSpacing: '0.22em', fontWeight: 700, color: '#fff', fontFamily: 'monospace' }}>{code}</span>
                </div>
                <button onClick={() => copy(code,'code')}
                  style={{ background: `${result.color}18`, border: `0.5px solid ${result.color}44`, borderRadius: '9px', padding: '0.45rem 1rem', color: result.color, cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600, whiteSpace: 'nowrap', flexShrink: 0, transition: 'all 0.2s' }}>
                  {copied==='code' ? '✓ Copied' : 'Copy'}
                </button>
              </div>

              {/* Share buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '6px' }}>
                <button onClick={() => copy(shareUrl,'link')}
                  style={{ background: 'rgba(255,255,255,0.05)', border: '0.5px solid rgba(255,255,255,0.12)', borderRadius: '10px', padding: '0.55rem 0.2rem', color: 'rgba(255,255,255,0.78)', cursor: 'pointer', fontSize: '0.67rem', fontWeight: 500, transition: 'all 0.2s' }}>
                  {copied==='link'?'✓':'📋'} Link
                </button>
                <a href={`https://wa.me/?text=${encodeURIComponent(result.shareCaption)}`} target="_blank" rel="noreferrer"
                  style={{ background: 'rgba(37,211,102,0.08)', border: '0.5px solid rgba(37,211,102,0.22)', borderRadius: '10px', padding: '0.55rem 0.2rem', color: 'rgba(255,255,255,0.78)', fontSize: '0.67rem', fontWeight: 500, textDecoration: 'none', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  💬 WA
                </a>
                <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(result.shareCaption)}`} target="_blank" rel="noreferrer"
                  style={{ background: 'rgba(255,255,255,0.05)', border: '0.5px solid rgba(255,255,255,0.12)', borderRadius: '10px', padding: '0.55rem 0.2rem', color: 'rgba(255,255,255,0.78)', fontSize: '0.67rem', fontWeight: 500, textDecoration: 'none', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  𝕏 Post
                </a>
                <button onClick={() => shareDataUrl && triggerDownload(shareDataUrl, `yourone-${code}.png`)} disabled={!shareDataUrl}
                  style={{ background: 'rgba(255,255,255,0.05)', border: '0.5px solid rgba(255,255,255,0.12)', borderRadius: '10px', padding: '0.55rem 0.2rem', color: 'rgba(255,255,255,0.78)', cursor: shareDataUrl?'pointer':'default', fontSize: '0.67rem', fontWeight: 500, opacity: shareDataUrl?1:0.45, transition: 'all 0.2s' }}>
                  🖼 Card
                </button>
              </div>
            </div>

            {/* Challenge CTA */}
            <a href={`https://wa.me/?text=${encodeURIComponent(`I found my ${category.label}. Bet yours is completely different. ${category.price} → yourone.world`)}`} target="_blank" rel="noreferrer"
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', textAlign: 'center', background: `${result.color}12`, border: `0.5px solid ${result.color}2a`, borderRadius: '50px', padding: '0.72rem 1rem', color: result.color, fontSize: '0.8rem', fontWeight: 500, textDecoration: 'none', marginBottom: '0.6rem', transition: 'all 0.2s' }}>
              Challenge a friend — bet yours is different →
            </a>

            {/* Cross-sell strip */}
            <div style={{ background: 'rgba(0,0,0,0.3)', border: '0.5px solid rgba(255,255,255,0.06)', borderRadius: '16px', padding: '1rem 1.2rem', marginBottom: '0.7rem' }}>
              <div style={{ fontSize: '9px', letterSpacing: '0.16em', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', marginBottom: '0.7rem' }}>Explore other dimensions</div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {otherCats.map(c => (
                  <button key={c.key} onClick={() => { setCategory(c); setResult(null); setCode(''); setMediaReady(false); window.history.replaceState({}, '', '/'); setStage('preview') }}
                    style={{ background: `${c.color}12`, border: `0.5px solid ${c.color}30`, borderRadius: '50px', padding: '0.38rem 0.85rem', color: c.color, cursor: 'pointer', fontSize: '0.72rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.35rem', transition: 'all 0.2s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background=`${c.color}24` }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background=`${c.color}12` }}>
                    {c.emoji} {c.label} <span style={{ opacity: 0.6 }}>{c.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Back to home */}
            <button onClick={() => { setStage('home'); setResult(null); setCode(''); window.history.replaceState({}, '', '/') }}
              style={{ display: 'block', width: '100%', background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(255,255,255,0.08)', borderRadius: '50px', padding: '0.62rem', color: 'rgba(255,255,255,0.38)', cursor: 'pointer', fontSize: '0.72rem', marginBottom: '1.2rem', transition: 'all 0.2s' }}
              onMouseEnter={e => { const b=e.currentTarget as HTMLButtonElement; b.style.color='rgba(255,255,255,0.65)'; b.style.background='rgba(255,255,255,0.07)' }}
              onMouseLeave={e => { const b=e.currentTarget as HTMLButtonElement; b.style.color='rgba(255,255,255,0.38)'; b.style.background='rgba(255,255,255,0.03)' }}>
              ← Back to all worlds
            </button>

            <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.28)', textAlign: 'center', paddingBottom: '0.5rem' }}>
              a <strong style={{ color: 'rgba(255,255,255,0.5)' }}>Filmos</strong> product · yourone.world
            </p>
          </div>
        </div>
      </div>
    )
  }

  return null
}
