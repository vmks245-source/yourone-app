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
    position: 'absolute', inset: '-4%', width: '108%', height: '108%',
    objectFit: 'cover',
    transition: `opacity ${FADE_DURATION}ms cubic-bezier(0.45,0,0.55,1)`,
    animation: 'kenBurns 12s ease-in-out infinite alternate',
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, background: '#04040c', overflow: 'hidden' }}>
      <video ref={vidA} autoPlay loop muted playsInline preload="auto" style={{ ...base, opacity: opacityA }} />
      <video ref={vidB} autoPlay loop muted playsInline preload="auto" style={{ ...base, opacity: opacityB, animationDelay: '-6s' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(4,4,14,0.55)', zIndex: 1 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, transparent 20%, rgba(0,0,0,0.55) 75%, rgba(0,0,0,0.85) 100%)', zIndex: 2 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, transparent 18%, transparent 68%, rgba(0,0,0,0.72) 100%)', zIndex: 3 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.18) 0%, transparent 12%, transparent 88%, rgba(0,0,0,0.18) 100%)', zIndex: 3 }} />
    </div>
  )
}
