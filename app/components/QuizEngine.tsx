'use client'
import { useState, useRef, useEffect, useCallback } from 'react'
import type { CategoryKey } from '../lib/archetypes'
import { QUIZ_DATA } from '../lib/quizData'

interface Props {
  category: CategoryKey
  accentColor?: string
  onComplete: (answers: Record<number, string | number>) => void
}

export default function QuizEngine({ category, accentColor = '#a07af8', onComplete }: Props) {
  const questions = QUIZ_DATA[category]
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string | number>>({})
  const [sliderVal, setSliderVal] = useState(50)
  const [textVal, setTextVal] = useState('')
  const [selected, setSelected] = useState<string | null>(null)
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null)
  const [dir, setDir] = useState<'in' | 'out'>('in')
  const [transitioning, setTransitioning] = useState(false)
  const [hoveredOption, setHoveredOption] = useState<string | null>(null)
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
    const delay = typeof value === 'string' ? 320 : 0
    setTimeout(() => {
      if (current < questions.length - 1) {
        setTransitioning(true)
        setDir('out')
        setTimeout(() => {
          setCurrent(c => c + 1)
          setSelected(null)
          setRipple(null)
          setDir('in')
          setTextVal('')
          setHoveredOption(null)
          setTimeout(() => setTransitioning(false), 50)
        }, 360)
      } else {
        setTransitioning(true)
        setTimeout(() => onComplete(newAnswers), 500)
      }
    }, delay)
  }, [transitioning, answers, current, questions, q, onComplete])

  useEffect(() => {
    if (q?.type === 'text' && inputRef.current) inputRef.current.focus()
  }, [current, q?.type])

  useEffect(() => {
    if (q?.type !== 'choice' || !q.options) return
    const handler = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName === 'INPUT') return
      const idx = parseInt(e.key) - 1
      if (idx >= 0 && idx < (q.options?.length ?? 0) && !transitioning) {
        advance(q.options![idx].value)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [q, advance, transitioning])

  if (!q) return null

  const frameStyle: React.CSSProperties = {
    opacity: transitioning && dir === 'out' ? 0 : 1,
    transform:
      transitioning && dir === 'out'
        ? 'translateY(20px) scale(0.97)'
        : transitioning && dir === 'in'
        ? 'translateY(-20px) scale(0.97)'
        : 'translateY(0) scale(1)',
    transition: 'opacity 0.36s cubic-bezier(0.16,1,0.3,1), transform 0.36s cubic-bezier(0.16,1,0.3,1)',
  }

  const typeLabel =
    q.type === 'text' ? 'essence' : q.type === 'slider' ? 'spectrum' : 'intuition'

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '5rem 1.5rem 3rem',
      position: 'relative',
    }}>
      {/* Ambient radial glow */}
      <div style={{
        position: 'fixed', inset: 0,
        background: `radial-gradient(ellipse at 50% 80%, ${accentColor}18 0%, transparent 65%)`,
        pointerEvents: 'none', zIndex: 0,
      }} />
      <div style={{
        position: 'fixed', inset: 0,
        background: `radial-gradient(ellipse at 20% 20%, ${accentColor}08 0%, transparent 55%)`,
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Progress bar */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        height: '3px', background: 'rgba(255,255,255,0.05)', zIndex: 10,
      }}>
        <div style={{
          height: '100%',
          background: `linear-gradient(90deg, ${accentColor}cc, ${accentColor})`,
          width: `${progress}%`,
          transition: 'width 0.7s cubic-bezier(0.16,1,0.3,1)',
          boxShadow: `0 0 12px ${accentColor}88`,
        }} />
      </div>

      {/* Step dots */}
      <div style={{
        position: 'fixed', top: '1.2rem', left: '50%',
        transform: 'translateX(-50%)', display: 'flex',
        gap: '5px', zIndex: 10,
      }}>
        {questions.map((_, i) => (
          <div key={i} style={{
            width: i === current ? '20px' : '5px',
            height: '5px', borderRadius: '3px',
            background: i < current
              ? `${accentColor}99`
              : i === current
              ? accentColor
              : 'rgba(255,255,255,0.12)',
            transition: 'all 0.5s cubic-bezier(0.16,1,0.3,1)',
            boxShadow: i === current ? `0 0 8px ${accentColor}88` : 'none',
          }} />
        ))}
      </div>

      {/* Question counter */}
      <div style={{
        position: 'fixed', top: '1.3rem', right: '1.5rem',
        fontSize: '10px', color: 'rgba(255,255,255,0.22)',
        fontWeight: 600, letterSpacing: '0.08em', zIndex: 10,
        fontFamily: 'Inter, sans-serif',
      }}>
        {current + 1}<span style={{ opacity: 0.45 }}>/{questions.length}</span>
      </div>

      {/* Main card */}
      <div style={{ maxWidth: '560px', width: '100%', position: 'relative', zIndex: 1, ...frameStyle }}>

        {/* Question header */}
        <div style={{ textAlign: 'center', marginBottom: '2.8rem' }}>
          {/* Type pill */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: `${accentColor}14`, border: `0.5px solid ${accentColor}30`,
            borderRadius: '50px', padding: '0.3rem 0.9rem',
            marginBottom: '1.5rem',
          }}>
            <span style={{ fontSize: '9px', letterSpacing: '0.2em', color: accentColor, textTransform: 'uppercase', fontWeight: 600 }}>
              {typeLabel}
            </span>
            {q.type === 'choice' && (
              <span style={{ fontSize: '8px', color: `${accentColor}70`, letterSpacing: '0.06em', fontStyle: 'italic' }}>
                · press 1–{q.options?.length}
              </span>
            )}
          </div>

          <h2 style={{
            fontSize: 'clamp(1.5rem, 4.5vw, 2.2rem)',
            fontWeight: 400,
            fontFamily: 'Playfair Display, serif',
            lineHeight: 1.2,
            marginBottom: '0.9rem',
            color: 'var(--text)',
            letterSpacing: '-0.01em',
          }}>
            {q.text}
          </h2>

          {q.sub && (
            <p style={{
              fontSize: '0.9rem', color: 'var(--text-2)',
              fontStyle: 'italic', lineHeight: 1.6,
              maxWidth: '420px', margin: '0 auto',
            }}>
              {q.sub}
            </p>
          )}
        </div>

        {/* Choice */}
        {q.type === 'choice' && q.options && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {q.options.map((opt, index) => {
              const isSel = selected === opt.value
              const isHov = hoveredOption === opt.value && !isSel
              return (
                <button
                  key={opt.value}
                  onClick={e => advance(opt.value, e)}
                  onMouseEnter={() => setHoveredOption(opt.value)}
                  onMouseLeave={() => setHoveredOption(null)}
                  style={{
                    background: isSel
                      ? `linear-gradient(145deg, ${accentColor}22, ${accentColor}10)`
                      : isHov
                      ? `rgba(255,255,255,0.06)`
                      : 'rgba(255,255,255,0.035)',
                    border: isSel
                      ? `1px solid ${accentColor}66`
                      : isHov
                      ? `1px solid rgba(255,255,255,0.16)`
                      : `1px solid rgba(255,255,255,0.07)`,
                    borderRadius: '18px',
                    padding: '1.4rem 1.2rem 1.2rem',
                    cursor: 'pointer',
                    textAlign: 'left',
                    color: 'var(--text)',
                    transform: isSel ? 'scale(1.035)' : isHov ? 'scale(1.015)' : 'scale(1)',
                    boxShadow: isSel
                      ? `0 0 30px ${accentColor}28, 0 8px 24px rgba(0,0,0,0.3)`
                      : isHov
                      ? '0 4px 20px rgba(0,0,0,0.2)'
                      : '0 2px 8px rgba(0,0,0,0.15)',
                    transition: 'all 0.25s cubic-bezier(0.16,1,0.3,1)',
                    position: 'relative',
                    overflow: 'hidden',
                    backdropFilter: isSel ? 'blur(8px)' : 'none',
                  }}
                >
                  {isSel && ripple && (
                    <span style={{
                      position: 'absolute', borderRadius: '50%',
                      background: `${accentColor}28`,
                      width: '220px', height: '220px',
                      top: ripple.y - 110, left: ripple.x - 110,
                      animation: 'rippleOut 0.55s ease forwards',
                      pointerEvents: 'none',
                    }} />
                  )}

                  {/* Index badge */}
                  <div style={{
                    position: 'absolute', top: '0.6rem', right: '0.6rem',
                    width: '19px', height: '19px', borderRadius: '6px',
                    background: isSel ? `${accentColor}40` : 'rgba(255,255,255,0.06)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '9px', color: isSel ? accentColor : 'rgba(255,255,255,0.25)',
                    fontWeight: 700, letterSpacing: '0',
                    transition: 'all 0.25s ease',
                  }}>
                    {index + 1}
                  </div>

                  {/* Selected checkmark overlay */}
                  {isSel && (
                    <div style={{
                      position: 'absolute', bottom: '0.6rem', right: '0.6rem',
                      width: '16px', height: '16px', borderRadius: '50%',
                      background: accentColor,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '9px', color: '#000', fontWeight: 800,
                    }}>
                      ✓
                    </div>
                  )}

                  <div style={{ fontSize: '2rem', marginBottom: '0.6rem', lineHeight: 1 }}>
                    {opt.emoji}
                  </div>
                  <div style={{
                    fontSize: '0.93rem', fontWeight: 600,
                    marginBottom: '0.35rem',
                    color: isSel ? 'var(--text)' : 'var(--text)',
                    letterSpacing: '-0.01em',
                  }}>
                    {opt.label}
                  </div>
                  <div style={{
                    fontSize: '0.75rem', color: isSel ? 'var(--text-2)' : 'var(--muted)',
                    lineHeight: 1.5, transition: 'color 0.2s',
                  }}>
                    {opt.desc}
                  </div>
                </button>
              )
            })}
          </div>
        )}

        {/* Slider */}
        {q.type === 'slider' && (
          <div style={{ padding: '0.5rem 0' }}>
            {/* Labels */}
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              marginBottom: '2rem', fontSize: '0.88rem',
            }}>
              <div style={{ textAlign: 'center', maxWidth: '40%' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.3rem' }}>
                  {(q as { leftEmoji?: string }).leftEmoji}
                </div>
                <div style={{ color: 'var(--text-2)', fontSize: '0.82rem' }}>
                  {(q as { left?: string }).left}
                </div>
              </div>
              <div style={{ textAlign: 'center', maxWidth: '40%' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.3rem' }}>
                  {(q as { rightEmoji?: string }).rightEmoji}
                </div>
                <div style={{ color: 'var(--text-2)', fontSize: '0.82rem' }}>
                  {(q as { right?: string }).right}
                </div>
              </div>
            </div>

            {/* Value display */}
            <div style={{ textAlign: 'center', marginBottom: '1.2rem' }}>
              <span style={{
                display: 'inline-block',
                padding: '0.3rem 1rem',
                background: `${accentColor}18`,
                border: `0.5px solid ${accentColor}40`,
                borderRadius: '50px',
                fontSize: '0.85rem',
                color: accentColor,
                fontWeight: 600,
                minWidth: '3.5rem',
                transition: 'all 0.15s ease',
              }}>
                {sliderVal}
              </span>
            </div>

            <input
              type="range" min={0} max={100} value={sliderVal}
              onChange={e => setSliderVal(Number(e.target.value))}
              style={{ width: '100%', accentColor, cursor: 'pointer', height: '6px' }}
            />

            <div style={{ marginTop: '2.8rem', textAlign: 'center' }}>
              <button
                onClick={() => advance(sliderVal)}
                style={{
                  background: `linear-gradient(135deg, ${accentColor}28, ${accentColor}18)`,
                  border: `1px solid ${accentColor}50`,
                  borderRadius: '50px',
                  padding: '0.9rem 3rem',
                  color: 'var(--text)',
                  cursor: 'pointer',
                  fontSize: '0.92rem',
                  fontWeight: 500,
                  letterSpacing: '0.02em',
                  boxShadow: `0 0 24px ${accentColor}18`,
                  transition: 'all 0.22s cubic-bezier(0.16,1,0.3,1)',
                }}
                onMouseEnter={e => {
                  const b = e.currentTarget as HTMLButtonElement
                  b.style.background = `linear-gradient(135deg, ${accentColor}40, ${accentColor}28)`
                  b.style.boxShadow = `0 0 40px ${accentColor}30`
                  b.style.transform = 'scale(1.02)'
                }}
                onMouseLeave={e => {
                  const b = e.currentTarget as HTMLButtonElement
                  b.style.background = `linear-gradient(135deg, ${accentColor}28, ${accentColor}18)`
                  b.style.boxShadow = `0 0 24px ${accentColor}18`
                  b.style.transform = 'scale(1)'
                }}
              >
                This feels right →
              </button>
            </div>
          </div>
        )}

        {/* Text */}
        {q.type === 'text' && (
          <div>
            <div style={{
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid rgba(255,255,255,0.08)`,
              borderRadius: '16px',
              padding: '2rem',
              marginBottom: '1.5rem',
              position: 'relative',
            }}>
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
                background: `linear-gradient(90deg, transparent, ${accentColor}40, transparent)`,
                borderRadius: '16px 16px 0 0',
              }} />
              <input
                ref={inputRef}
                type="text"
                value={textVal}
                onChange={e => setTextVal(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && textVal.trim()) advance(textVal.trim()) }}
                placeholder={(q as { placeholder?: string }).placeholder || 'Type your word…'}
                style={{
                  background: 'transparent',
                  border: 'none',
                  padding: '0.5rem 0',
                  fontSize: 'clamp(1.6rem, 5vw, 2.2rem)',
                  fontFamily: 'Playfair Display, serif',
                  color: textVal ? 'var(--text)' : 'var(--muted)',
                  textAlign: 'center',
                  width: '100%',
                  outline: 'none',
                  caretColor: accentColor,
                  letterSpacing: '-0.02em',
                }}
              />
              {textVal && (
                <div style={{
                  position: 'absolute', bottom: '0.8rem', left: '50%',
                  transform: 'translateX(-50%)',
                  width: '40px', height: '2px',
                  background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
                  borderRadius: '2px',
                  transition: 'opacity 0.3s',
                }} />
              )}
            </div>

            <p style={{
              textAlign: 'center', marginBottom: '1.2rem',
              fontSize: '0.78rem', color: 'var(--muted)',
              letterSpacing: '0.04em',
            }}>
              Press <kbd style={{ background: 'rgba(255,255,255,0.08)', border: '0.5px solid rgba(255,255,255,0.15)', borderRadius: '4px', padding: '0.1rem 0.4rem', fontSize: '0.75rem' }}>Enter</kbd> or tap below
            </p>

            <div style={{ textAlign: 'center' }}>
              <button
                onClick={() => textVal.trim() && advance(textVal.trim())}
                disabled={!textVal.trim()}
                style={{
                  background: textVal.trim()
                    ? `linear-gradient(135deg, ${accentColor}28, ${accentColor}18)`
                    : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${textVal.trim() ? `${accentColor}50` : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: '50px',
                  padding: '0.9rem 2.8rem',
                  color: textVal.trim() ? 'var(--text)' : 'var(--muted)',
                  cursor: textVal.trim() ? 'pointer' : 'default',
                  fontSize: '0.92rem',
                  fontWeight: 500,
                  letterSpacing: '0.02em',
                  boxShadow: textVal.trim() ? `0 0 24px ${accentColor}18` : 'none',
                  transition: 'all 0.22s cubic-bezier(0.16,1,0.3,1)',
                }}
              >
                This is my word →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export { QUIZ_DATA as quizData }
