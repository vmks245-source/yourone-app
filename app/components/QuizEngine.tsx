'use client'
import { useState, useRef, useEffect } from 'react'

export interface QuizAnswer { questionId: number; value: string | number }

const questions = [
  {
    id: 1, type: 'visual', text: 'Which sky speaks to you?',
    sub: 'Close your eyes for a moment. Then choose.',
    options: [
      { value: 'bright', label: 'Bright & boundless', emoji: '☀️', desc: 'Golden, warm, no limits' },
      { value: 'stormy', label: 'Stormy & electric', emoji: '⚡', desc: 'Thunder, energy, alive' },
      { value: 'night', label: 'Deep night sky', emoji: '🌌', desc: 'Stars, silence, infinite' },
      { value: 'dawn', label: 'Soft at dawn', emoji: '🌅', desc: 'Quiet, rising, becoming' },
    ]
  },
  {
    id: 2, type: 'word', text: 'You are most alive when you are...',
    sub: 'Not what you do — how it feels.',
    options: [
      { value: 'moving', label: 'Moving', emoji: '🌊', desc: 'In motion, unstoppable' },
      { value: 'still', label: 'Still', emoji: '🪨', desc: 'Centered, watching, knowing' },
      { value: 'creating', label: 'Creating', emoji: '🔥', desc: 'Building something from nothing' },
      { value: 'connecting', label: 'Connecting', emoji: '🌿', desc: 'With people, nature, ideas' },
    ]
  },
  {
    id: 3, type: 'visual', text: 'Which place pulls you in?',
    sub: 'You find yourself here. No explanation needed.',
    options: [
      { value: 'vast_open', label: 'Vast and open', emoji: '🏔️', desc: 'Fields, sky, horizon' },
      { value: 'hidden_corner', label: 'A hidden corner', emoji: '🏚️', desc: 'Tucked away, secret, yours' },
      { value: 'edge_of_water', label: 'Edge of water', emoji: '🌊', desc: 'Sea, lake, the in-between' },
      { value: 'high_above', label: 'High above', emoji: '🌆', desc: 'Rooftops, peaks, looking down' },
    ]
  },
  {
    id: 4, type: 'slider', text: 'The world feels...',
    sub: 'Where do you sit inside it, most of the time?',
    left: 'Chaotic & electric', right: 'Still & ordered', leftEmoji: '🌪️', rightEmoji: '🧊'
  },
  {
    id: 5, type: 'word', text: 'Your inner world is mostly...',
    sub: 'The landscape inside you.',
    options: [
      { value: 'dense', label: 'Dense & layered', emoji: '🌳', desc: 'Deep, complex, rooted' },
      { value: 'open', label: 'Open & airy', emoji: '🌬️', desc: 'Light, free, curious' },
      { value: 'sharp', label: 'Sharp & clear', emoji: '💎', desc: 'Precise, focused, certain' },
      { value: 'dreamy', label: 'Soft & dreamy', emoji: '☁️', desc: 'Floating, imagining, feeling' },
    ]
  },
  {
    id: 6, type: 'visual', text: 'Choose a time of day',
    sub: 'When you feel most like yourself.',
    options: [
      { value: 'golden_hour', label: 'Golden hour', emoji: '🌇', desc: '5pm, warm light, almost evening' },
      { value: 'midnight', label: 'Deep midnight', emoji: '🌑', desc: '2am, only you, the quiet' },
      { value: 'early_morning', label: 'Early morning', emoji: '🌄', desc: '6am, world not yet awake' },
      { value: 'midday', label: 'High midday', emoji: '🌞', desc: 'Full brightness, sharp shadows' },
    ]
  },
  {
    id: 7, type: 'audio', text: 'Which sound feels like you?',
    sub: 'The one that could play forever.',
    options: [
      { value: 'wind', label: 'Wind through grass', emoji: '🌾', desc: 'Constant, soft, free' },
      { value: 'rain', label: 'Heavy rain', emoji: '🌧️', desc: 'Relentless, cleansing, dark' },
      { value: 'city', label: 'City at night', emoji: '🌃', desc: 'Distant hum, pulse, alive' },
      { value: 'silence', label: 'Deep silence', emoji: '🔇', desc: 'So quiet you hear yourself' },
    ]
  },
  {
    id: 8, type: 'word', text: 'When alone, you feel...',
    sub: 'Your truest state.',
    options: [
      { value: 'recharged', label: 'Recharged', emoji: '⚡', desc: 'This is where you fill up' },
      { value: 'restless', label: 'Restless', emoji: '🌀', desc: 'You need motion, people, noise' },
      { value: 'thoughtful', label: 'Thoughtful', emoji: '🌙', desc: 'Ideas come, things become clear' },
      { value: 'peaceful', label: 'Peaceful', emoji: '🕊️', desc: 'Nothing missing, just being' },
    ]
  },
  {
    id: 9, type: 'visual', text: 'Pick a texture that matches you',
    sub: 'Not what you touch — what you are.',
    options: [
      { value: 'rough', label: 'Rough & raw', emoji: '🪨', desc: 'Stone, bark, unpolished truth' },
      { value: 'smooth', label: 'Smooth & cool', emoji: '🧊', desc: 'Glass, water, controlled' },
      { value: 'soft', label: 'Soft & warm', emoji: '🍂', desc: 'Moss, fabric, comforting' },
      { value: 'sharp', label: 'Sharp & geometric', emoji: '💠', desc: 'Crystal, metal, precise' },
    ]
  },
  {
    id: 10, type: 'text', text: 'One word. Your truest self is...',
    sub: 'Don\'t think. The first word is the right one.',
    placeholder: 'Type your word...'
  }
]

function mapAnswersToArchetype(answers: QuizAnswer[]): string {
  const a: Record<number, string | number> = {}
  answers.forEach(ans => { a[ans.questionId] = ans.value })

  let score = { bright: 0, dark: 0, nature: 0, urban: 0, calm: 0, wild: 0, open: 0, hidden: 0 }

  if (a[1] === 'bright') { score.bright += 2; score.open += 1 }
  if (a[1] === 'stormy') { score.wild += 2; score.dark += 1 }
  if (a[1] === 'night') { score.dark += 2 }
  if (a[1] === 'dawn') { score.calm += 1; score.nature += 1 }

  if (a[2] === 'moving') score.wild += 2
  if (a[2] === 'still') { score.calm += 2; score.nature += 1 }
  if (a[2] === 'creating') score.urban += 1
  if (a[2] === 'connecting') score.nature += 1

  if (a[3] === 'vast_open') { score.open += 2; score.nature += 1 }
  if (a[3] === 'hidden_corner') { score.hidden += 2; score.dark += 1 }
  if (a[3] === 'edge_of_water') { score.calm += 1; score.nature += 1 }
  if (a[3] === 'high_above') { score.urban += 2; score.open += 1 }

  const sliderVal = Number(a[4] ?? 50)
  if (sliderVal < 35) { score.wild += 2; score.dark += 1 }
  if (sliderVal > 65) { score.calm += 2 }

  if (a[5] === 'dense') { score.nature += 2; score.dark += 1 }
  if (a[5] === 'open') { score.open += 2; score.bright += 1 }
  if (a[5] === 'sharp') score.urban += 2
  if (a[5] === 'dreamy') { score.calm += 1; score.open += 1 }

  if (a[6] === 'golden_hour') { score.bright += 1; score.nature += 1 }
  if (a[6] === 'midnight') { score.dark += 2; score.hidden += 1 }
  if (a[6] === 'early_morning') { score.calm += 2; score.nature += 1 }
  if (a[6] === 'midday') { score.bright += 2 }

  if (a[7] === 'wind') { score.open += 2; score.nature += 1 }
  if (a[7] === 'rain') { score.dark += 1; score.wild += 1 }
  if (a[7] === 'city') score.urban += 2
  if (a[7] === 'silence') { score.calm += 2; score.hidden += 1 }

  if (a[8] === 'recharged') { score.calm += 1; score.nature += 1 }
  if (a[8] === 'restless') { score.wild += 1; score.urban += 1 }
  if (a[8] === 'thoughtful') { score.dark += 1; score.hidden += 1 }
  if (a[8] === 'peaceful') score.calm += 2

  if (a[9] === 'rough') { score.nature += 1; score.wild += 1 }
  if (a[9] === 'smooth') { score.urban += 1; score.calm += 1 }
  if (a[9] === 'soft') { score.nature += 2; score.bright += 1 }
  if (a[9] === 'sharp') score.urban += 2

  const isDark = score.dark > score.bright
  const isNature = score.nature >= score.urban
  const isWild = score.wild >= score.calm
  const isOpen = score.open >= score.hidden

  if (!isDark && isNature && isOpen && !isWild) return 'meadow'
  if (isDark && !isNature && isWild) return 'storm_forest'
  if (!isDark && !isNature && isOpen) return 'tokyo_rooftop'
  if (!isDark && isNature && !isOpen) return 'autumn_forest'
  if (isDark && !isNature && !isWild) return 'neon_alley'
  if (!isDark && !isNature && !isWild && isOpen) return 'ocean'
  if (isDark && isNature && !isWild) return 'arctic'
  if (!isDark && !isNature && !isOpen) return 'factory'
  if (!isDark && isNature && isWild) return 'desert_canyon'
  return 'cloud_sea'
}

function encodeCode(archetype: string, answers: QuizAnswer[]): string {
  const archetypeMap: Record<string, number> = {
    meadow: 0, neon_alley: 1, ocean: 2, tokyo_rooftop: 3,
    desert_canyon: 4, storm_forest: 5, arctic: 6, autumn_forest: 7, factory: 8, cloud_sea: 9
  }
  const idx = archetypeMap[archetype] ?? 0
  const checksum = answers.reduce((acc, a) => acc + (typeof a.value === 'string' ? a.value.charCodeAt(0) : Number(a.value)), 0) % 36
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  return chars[idx] + chars[checksum % 36] + chars[(idx * 7 + 11) % 36] + chars[(checksum * 3 + 5) % 36] + chars[(idx + checksum) % 36] + chars[(idx * 3 + checksum * 2) % 36]
}

interface QuizEngineProps { onComplete: (archetype: string, code: string) => void }

export default function QuizEngine({ onComplete }: QuizEngineProps) {
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswer[]>([])
  const [sliderVal, setSliderVal] = useState(50)
  const [textVal, setTextVal] = useState('')
  const [transitioning, setTransitioning] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const q = questions[current]
  const progress = (current / questions.length) * 100

  const advance = (value: string | number) => {
    if (transitioning) return
    const newAnswers = [...answers, { questionId: q.id, value }]
    setAnswers(newAnswers)

    if (current < questions.length - 1) {
      setTransitioning(true)
      setTimeout(() => { setCurrent(c => c + 1); setTransitioning(false) }, 400)
    } else {
      const archetype = mapAnswersToArchetype(newAnswers)
      const code = encodeCode(archetype, newAnswers)
      setTimeout(() => onComplete(archetype, code), 600)
    }
  }

  useEffect(() => {
    if (q.type === 'text' && inputRef.current) inputRef.current.focus()
  }, [current, q.type])

  return (
    <div style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'2rem', position:'relative' }}>
      {/* Progress */}
      <div style={{ position:'fixed', top:0, left:0, right:0, height:'2px', background:'rgba(255,255,255,0.08)', zIndex:10 }}>
        <div style={{ height:'100%', background:'linear-gradient(90deg, #c8b8f8, #f8c8a8)', width:`${progress}%`, transition:'width 0.5s ease' }} />
      </div>

      {/* Question counter */}
      <div style={{ position:'fixed', top:'1.5rem', right:'1.5rem', fontSize:'12px', color:'var(--muted)', fontWeight:500 }}>
        {current + 1} / {questions.length}
      </div>

      {/* Question */}
      <div style={{ maxWidth:'520px', width:'100%', opacity: transitioning ? 0 : 1, transform: transitioning ? 'translateY(12px)' : 'translateY(0)', transition:'all 0.4s ease' }}>
        <div style={{ textAlign:'center', marginBottom:'2.5rem' }}>
          <div style={{ fontSize:'12px', letterSpacing:'0.1em', color:'var(--accent)', textTransform:'uppercase', marginBottom:'1rem', opacity:0.8 }}>
            {q.type === 'audio' ? 'sound' : q.type === 'slider' ? 'feel' : q.type === 'text' ? 'essence' : 'intuition'}
          </div>
          <h2 style={{ fontSize:'clamp(1.4rem,4vw,1.9rem)', fontWeight:400, fontFamily:'Playfair Display, serif', lineHeight:1.3, marginBottom:'0.75rem', color:'var(--text)' }}>
            {q.text}
          </h2>
          <p style={{ fontSize:'0.9rem', color:'var(--muted)', fontStyle:'italic' }}>{q.sub}</p>
        </div>

        {/* Options for visual/word/audio */}
        {(q.type === 'visual' || q.type === 'word' || q.type === 'audio') && q.options && (
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'12px' }}>
            {q.options.map(opt => (
              <button key={opt.value} onClick={() => advance(opt.value)}
                style={{ background:'rgba(255,255,255,0.04)', border:'0.5px solid rgba(255,255,255,0.1)', borderRadius:'14px', padding:'1.2rem', cursor:'pointer', textAlign:'left', transition:'all 0.2s', color:'var(--text)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background='rgba(200,184,248,0.1)'; (e.currentTarget as HTMLButtonElement).style.borderColor='rgba(200,184,248,0.3)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background='rgba(255,255,255,0.04)'; (e.currentTarget as HTMLButtonElement).style.borderColor='rgba(255,255,255,0.1)' }}>
                <div style={{ fontSize:'1.6rem', marginBottom:'0.5rem' }}>{opt.emoji}</div>
                <div style={{ fontSize:'0.9rem', fontWeight:500, marginBottom:'0.3rem' }}>{opt.label}</div>
                <div style={{ fontSize:'0.75rem', color:'var(--muted)' }}>{opt.desc}</div>
              </button>
            ))}
          </div>
        )}

        {/* Slider */}
        {q.type === 'slider' && (
          <div style={{ padding:'1rem 0' }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:'1rem', fontSize:'0.85rem', color:'var(--muted)' }}>
              <span>{(q as { leftEmoji?: string }).leftEmoji} {(q as { left?: string }).left}</span>
              <span>{(q as { right?: string }).right} {(q as { rightEmoji?: string }).rightEmoji}</span>
            </div>
            <input type="range" min={0} max={100} value={sliderVal}
              onChange={e => setSliderVal(Number(e.target.value))}
              style={{ width:'100%', accentColor:'var(--accent)', cursor:'pointer', height:'6px' }} />
            <div style={{ marginTop:'2rem', textAlign:'center' }}>
              <button onClick={() => advance(sliderVal)}
                style={{ background:'rgba(200,184,248,0.12)', border:'0.5px solid rgba(200,184,248,0.3)', borderRadius:'50px', padding:'0.8rem 2.5rem', color:'var(--text)', cursor:'pointer', fontSize:'0.9rem', fontWeight:500, transition:'all 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background='rgba(200,184,248,0.2)' }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background='rgba(200,184,248,0.12)' }}>
                This feels right →
              </button>
            </div>
          </div>
        )}

        {/* Text input */}
        {q.type === 'text' && (
          <div style={{ textAlign:'center' }}>
            <input ref={inputRef} type="text" value={textVal}
              onChange={e => setTextVal(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && textVal.trim()) advance(textVal.trim()) }}
              placeholder={(q as { placeholder?: string }).placeholder}
              style={{ background:'transparent', border:'none', borderBottom:'1px solid rgba(255,255,255,0.2)', padding:'1rem 0', fontSize:'1.8rem', fontFamily:'Playfair Display, serif', color:'var(--text)', textAlign:'center', width:'100%', outline:'none', caretColor:'var(--accent)' }} />
            <p style={{ marginTop:'1rem', fontSize:'0.8rem', color:'var(--muted)' }}>Press Enter or click below</p>
            <button onClick={() => textVal.trim() && advance(textVal.trim())}
              disabled={!textVal.trim()}
              style={{ marginTop:'1.5rem', background: textVal.trim() ? 'rgba(200,184,248,0.12)' : 'rgba(255,255,255,0.03)', border:'0.5px solid rgba(200,184,248,0.3)', borderRadius:'50px', padding:'0.8rem 2.5rem', color: textVal.trim() ? 'var(--text)' : 'var(--muted)', cursor: textVal.trim() ? 'pointer' : 'default', fontSize:'0.9rem', fontWeight:500, transition:'all 0.2s' }}>
              This is my word →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export { mapAnswersToArchetype, encodeCode }
