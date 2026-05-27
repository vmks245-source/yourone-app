'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { videoUrl, REEL_ORDER } from '../lib/videoMap'

const SCENE_DURATION = 8000
const FADE_DURATION  = 2000

export default function AmbientReel() {
  const vidA = useRef<HTMLVideoElement>(null)
  const vidB = useRef<HTMLVideoElement>(null)
  const [opacityA, setOpacityA] = useState(1)
  const [opacityB, setOpacityB] = useState(0)

  const prime = useCallback((el: HTMLVideoElement | null, idx: number) => {
    if (!el) return
    el.src = videoUrl(REEL_ORDER[idx % REEL_ORDER.length])
    el.load()
    el.play().catch(() => {})
  }, [])

  useEffect(() => {
    prime(vidA.current, 0)
    prime(vidB.current, 1)

    let current = 0
    let side: 'A' | 'B' = 'A'

    const cycle = () => {
      current++
      if (side === 'A') {
        prime(vidB.current, current)
        setOpacityA(0); setOpacityB(1)
        side = 'B'
        setTimeout(() => prime(vidA.current, current + 1), FADE_DURATION)
      } else {
        prime(vidA.current, current)
        setOpacityA(1); setOpacityB(0)
        side = 'A'
        setTimeout(() => prime(vidB.current, current + 1), FADE_DURATION)
      }
    }

    const timer = setInterval(cycle, SCENE_DURATION)
    return () => clearInterval(timer)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const base: React.CSSProperties = {
    position: 'absolute', inset: 0, width: '100%', height: '100%',
    objectFit: 'cover', transition: `opacity ${FADE_DURATION}ms ease`,
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: '#060610' }}>
      <video ref={vidA} autoPlay loop muted playsInline preload="auto" style={{ ...base, opacity: opacityA }} />
      <video ref={vidB} autoPlay loop muted playsInline preload="auto" style={{ ...base, opacity: opacityB }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(4,4,14,0.62)', zIndex: 1 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, transparent 28%, rgba(0,0,0,0.62) 100%)', zIndex: 2 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.38) 0%, transparent 22%, transparent 72%, rgba(0,0,0,0.55) 100%)', zIndex: 3 }} />
    </div>
  )
}
