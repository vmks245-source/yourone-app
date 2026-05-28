'use client'
import { useEffect, useRef, useState, useCallback } from 'react'

const R2 = 'https://pub-558ced66b1054a088b11443d1cd1ea5d.r2.dev'
const TOTAL = 5       // images per archetype: {id}_0.jpg … {id}_4.jpg
const DISPLAY_MS = 6000
const FADE_MS    = 1800

interface Props {
  archetypeId: string
  style?: React.CSSProperties
}

export default function ImageScene({ archetypeId, style }: Props) {
  const [idxA,   setIdxA]   = useState(0)
  const [idxB,   setIdxB]   = useState(1)
  const [opA,    setOpA]    = useState(1)
  const [opB,    setOpB]    = useState(0)
  const [scaleA, setScaleA] = useState(1)
  const [scaleB, setScaleB] = useState(1.06)
  const active = useRef<'A' | 'B'>('A')
  const tick   = useRef(0)

  const url = useCallback((n: number) => `${R2}/${archetypeId}_${n % TOTAL}.jpg`, [archetypeId])

  useEffect(() => {
    setIdxA(0); setIdxB(1); setOpA(1); setOpB(0)
    setScaleA(1); setScaleB(1.06)
    active.current = 'A'; tick.current = 0

    const timer = setInterval(() => {
      tick.current++
      if (active.current === 'A') {
        setIdxB(tick.current + 1); setScaleB(1.06)
        setOpA(0); setOpB(1)
        setTimeout(() => { active.current = 'B'; setIdxA(tick.current + 2); setScaleA(1.06) }, FADE_MS)
      } else {
        setIdxA(tick.current + 1); setScaleA(1.06)
        setOpB(0); setOpA(1)
        setTimeout(() => { active.current = 'A'; setIdxB(tick.current + 2); setScaleB(1.06) }, FADE_MS)
      }
    }, DISPLAY_MS)

    return () => clearInterval(timer)
  }, [archetypeId])

  // Ken Burns: active image slowly zooms in
  useEffect(() => { if (opA > 0) { const t = setTimeout(() => setScaleA(1.13), 80); return () => clearTimeout(t) } }, [opA, idxA])
  useEffect(() => { if (opB > 0) { const t = setTimeout(() => setScaleB(1.13), 80); return () => clearTimeout(t) } }, [opB, idxB])

  const base: React.CSSProperties = {
    position: 'absolute', inset: 0, width: '100%', height: '100%',
    objectFit: 'cover', willChange: 'opacity, transform',
  }

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: '#06060e', ...style }}>
      <img src={url(idxA)} alt="" style={{ ...base, opacity: opA, transform: `scale(${scaleA})`, transition: `opacity ${FADE_MS}ms ease, transform ${DISPLAY_MS + FADE_MS}ms linear` }} />
      <img src={url(idxB)} alt="" style={{ ...base, opacity: opB, transform: `scale(${scaleB})`, transition: `opacity ${FADE_MS}ms ease, transform ${DISPLAY_MS + FADE_MS}ms linear` }} />
    </div>
  )
}
