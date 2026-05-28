'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import type { CategoryKey } from '../lib/archetypes'
import { QUIZ_DATA } from '../lib/quizData'

interface Props {
  category: CategoryKey
  accentColor?: string
  onComplete: (answers: Record<number, string | number>) => void
}

export default function QuizEngine({ category, accentColor = '#c8b8f8', onComplete }: Props) {
  const questions = QUIZ_DATA[category]
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string | number>>({})
  const [sliderVal, setSliderVal] = useState(50)
  const [textVal, setTextVal] = useState('')
  const [selected, setSelected] = useState<string | null>(null)
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null)
  const [dir, setDir] = useState<'in' | 'out'>('in')
  const [transitioning, setTransitioning] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const q = questions[current]
  const progress = ((current + 1) / questions.length) * 100

  const advance = useCallback((value: string | number, e?: React.MouseEvent) => {
    if (transitioning) return
    if (typeof value === 'string') {
      setSelected(value)
      if (e) {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
        setRipple({ x: e.clientX - rect.left, y: e.clientY - rect.top })
      }
    }
    const newAnswers = { ...answers, [q.id]: value }
    setAnswers(newAnswers)
    const delay = typeof value === 'string' ? 300 : 0
    setTimeout(() => {
      if (current < questions.length - 1) {
        setTransitioning(true); setDir('out')
        setTimeout(() => {
          setCurrent(c => c + 1); setSelected(null); setRipple(null); setDir('in'); setTextVal('')
          setTimeout(() => setTransitioning(false), 50)
        }, 340)
      } else {
        setTransitioning(true)
        setTimeout(() => onComplete(newAnswers), 500)
      }
    }, delay)
  }, [transitioning, answers, current, questions, q, onComplete])

  useEffect(() => {
    if (q?.type === 'text' && inputRef.current) inputRef.current.focus()
  }, [current, q?.type])

  if (!q) return null

  const frame: React.CSSProperties = {
    opacity: transitioning && dir === 'out' ? 0 : 1,
    transform: transitioning && dir === 'out' ? 'translateX(-24px) scale(0.97)' : transitioning && dir === 'in' ? 'translateX(24px)' : 'translateX(0) scale(1)',
    transition: 'opacity 0.34s ease, transform 0.34s cubic-bezier(0.16,1,0.3,1)',
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative' }}>
      {/* Progress */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '2px', background: 'rgba(255,255,255,0.06)', zIndex: 10 }}>
        <div style={{ height: '100%', background: `linear-gradient(90deg, ${accentColor}, #f8c8a8)`, width: `${progress}%`, transition: 'width 0.6s cubic-bezier(0.16,1,0.3,1)' }} />
      </div>

      {/* Step dots */}
      <div style={{ position: 'fixed', top: '1.4rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '6px', zIndex: 10 }}>
        {questions.map((_, i) => (
          <div key={i} style={{ width: i === current ? '18px' : '5px', height: '5px', borderRadius: '3px', background: i < current ? `${accentColor}88` : i === current ? accentColor : 'rgba(255,255,255,0.15)', transition: 'all 0.4s ease' }} />
        ))}
      </div>

      <div style={{ position: 'fixed', top: '1.5rem', right: '1.5rem', fontSize: '11px', color: 'rgba(255,255,255,0.28)', fontWeight: 500, letterSpacing: '0.06em' }}>
        {current + 1} <span style={{ color: 'rgba(255,255,255,0.14)' }}>/ {questions.length}</span>
      </div>

      {/* Card */}
      <div style={{ maxWidth: '540px', width: '100%', ...frame }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '11px', letterSpacing: '0.18em', color: accentColor, textTransform: 'uppercase', marginBottom: '1rem', opacity: 0.7 }}>
            {q.type === 'text' ? 'essence' : q.type === 'slider' ? 'feel' : 'intuition'}
          </div>
          <h2 style={{ fontSize: 'clamp(1.4rem,4vw,2rem)', fontWeight: 400, fontFamily: 'Playfair Display, serif', lineHeight: 1.25, marginBottom: '0.8rem', color: 'var(--text)' }}>{q.text}</h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--muted)', fontStyle: 'italic' }}>{q.sub}</p>
        </div>

        {/* Choice */}
        {q.type === 'choice' && q.options && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            {q.options.map(opt => {
              const isSel = selected === opt.value
              return (
                <button key={opt.value} onClick={e => advance(opt.value, e)}
                  style={{ background: isSel ? `${accentColor}22` : 'rgba(255,255,255,0.04)', border: isSel ? `0.5px solid ${accentColor}88` : '0.5px solid rgba(255,255,255,0.09)', borderRadius: '16px', padding: '1.3rem 1.1rem', cursor: 'pointer', textAlign: 'left', color: 'var(--text)', transform: isSel ? 'scale(1.04)' : 'scale(1)', boxShadow: isSel ? `0 0 28px ${accentColor}28` : 'none', transition: 'all 0.22s cubic-bezier(0.16,1,0.3,1)', position: 'relative', overflow: 'hidden' }}
                  onMouseEnter={e => { if (!isSel) { const b = e.currentTarget as HTMLButtonElement; b.style.background=`${accentColor}12`; b.style.borderColor=`${accentColor}44`; b.style.transform='scale(1.02)' } }}
                  onMouseLeave={e => { if (!isSel) { const b = e.currentTarget as HTMLButtonElement; b.style.background='rgba(255,255,255,0.04)'; b.style.borderColor='rgba(255,255,255,0.09)'; b.style.transform='scale(1)' } }}>
                  {isSel && ripple && (
                    <span style={{ position: 'absolute', borderRadius: '50%', background: `${accentColor}30`, width: '200px', height: '200px', top: ripple.y - 100, left: ripple.x - 100, animation: 'rippleOut 0.5s ease forwards', pointerEvents: 'none' }} />
                  )}
                  <div style={{ fontSize: '1.8rem', marginBottom: '0.55rem' }}>{opt.emoji}</div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 500, marginBottom: '0.3rem' }}>{opt.label}</div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--muted)', lineHeight: 1.45 }}>{opt.desc}</div>
                </button>
              )
            })}
          </div>
        )}

        {/* Slider */}
        {q.type === 'slider' && (
          <div style={{ padding: '1rem 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.2rem', fontSize: '0.85rem', color: 'var(--muted)' }}>
              <span>{(q as {leftEmoji?:string}).leftEmoji} {(q as {left?:string}).left}</span>
              <span>{(q as {right?:string}).right} {(q as {rightEmoji?:string}).rightEmoji}</span>
            </div>
            <input type="range" min={0} max={100} value={sliderVal} onChange={e => setSliderVal(Number(e.target.value))} style={{ width: '100%', accentColor, cursor: 'pointer', height: '4px' }} />
            <div style={{ marginTop: '2.5rem', textAlign: 'center' }}>
              <button onClick={() => advance(sliderVal)}
                style={{ background: `${accentColor}20`, border: `0.5px solid ${accentColor}50`, borderRadius: '50px', padding: '0.85rem 2.8rem', color: 'var(--text)', cursor: 'pointer', fontSize: '0.92rem', fontWeight: 500, transition: 'all 0.2s' }}
                onMouseEnter={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background=`${accentColor}35`; b.style.boxShadow=`0 0 30px ${accentColor}22` }}
                onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.background=`${accentColor}20`; b.style.boxShadow='none' }}>
                This feels right →
              </button>
            </div>
          </div>
        )}

        {/* Text */}
        {q.type === 'text' && (
          <div style={{ textAlign: 'center' }}>
            <input ref={inputRef} type="text" value={textVal}
              onChange={e => setTextVal(e.target.value)}
              onKeyDown={e => { if (e.key==='Enter' && textVal.trim()) advance(textVal.trim()) }}
              placeholder={(q as {placeholder?:string}).placeholder || 'Type your word…'}
              style={{ background: 'transparent', border: 'none', borderBottom: `1px solid ${accentColor}44`, padding: '1rem 0', fontSize: '1.8rem', fontFamily: 'Playfair Display, serif', color: 'var(--text)', textAlign: 'center', width: '100%', outline: 'none', caretColor: accentColor }} />
            <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--muted)' }}>Press Enter or tap below</p>
            <button onClick={() => textVal.trim() && advance(textVal.trim())} disabled={!textVal.trim()}
              style={{ marginTop: '1.5rem', background: textVal.trim()?`${accentColor}20`:'rgba(255,255,255,0.03)', border: `0.5px solid ${accentColor}40`, borderRadius: '50px', padding: '0.8rem 2.5rem', color: textVal.trim()?'var(--text)':'var(--muted)', cursor: textVal.trim()?'pointer':'default', fontSize: '0.9rem', fontWeight: 500, transition: 'all 0.2s' }}>
              This is my word →
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export { QUIZ_DATA as quizData }
