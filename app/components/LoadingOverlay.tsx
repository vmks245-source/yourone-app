'use client'
import { useEffect, useState } from 'react'

interface Props {
  show: boolean
  emoji?: string
  label?: string
  color?: string
}

export default function LoadingOverlay({ show, emoji = '✦', label = 'Loading your world', color = '#a07af8' }: Props) {
  const [mounted, setMounted] = useState(true)
  const [dots, setDots] = useState(0)

  useEffect(() => {
    if (!show) {
      const t = setTimeout(() => setMounted(false), 1100)
      return () => clearTimeout(t)
    }
    setMounted(true)
  }, [show])

  useEffect(() => {
    const t = setInterval(() => setDots(d => (d + 1) % 4), 420)
    return () => clearInterval(t)
  }, [])

  if (!mounted) return null

  const dotStr = '···'.slice(0, dots)

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 20,
      background: 'radial-gradient(ellipse at 50% 45%, #080814 0%, #030308 100%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      opacity: show ? 1 : 0,
      transition: 'opacity 1.1s cubic-bezier(0.16,1,0.3,1)',
      pointerEvents: show ? 'auto' : 'none',
    }}>
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 50%, ${color}12 0%, transparent 62%)`, animation: 'loadBreath 3.2s ease-in-out infinite', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 30% 70%, ${color}06 0%, transparent 50%)`, animation: 'loadBreath 4s ease-in-out 1s infinite', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', width: '110px', height: '110px', marginBottom: '2.4rem' }}>
        <div style={{ position: 'absolute', inset: '-32px', borderRadius: '50%', border: `1px solid ${color}10`, animation: 'loadPulse 3.5s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', inset: '-20px', borderRadius: '50%', border: `1px solid ${color}18`, animation: 'loadPulse 2.8s ease-in-out 0.5s infinite' }} />
        <div style={{ position: 'absolute', inset: '-8px', borderRadius: '50%', border: `1px solid ${color}28`, animation: 'loadPulse 2s ease-in-out 0.9s infinite' }} />
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid transparent', borderTopColor: color, borderRightColor: `${color}55`, animation: 'loadSpin 1.2s cubic-bezier(0.4,0,0.2,1) infinite' }} />
        <div style={{ position: 'absolute', inset: '12px', borderRadius: '50%', border: '1px solid transparent', borderBottomColor: `${color}44`, borderLeftColor: `${color}22`, animation: 'loadSpin 1.8s linear infinite reverse' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.2rem', animation: 'loadBreath 3s ease-in-out infinite', filter: `drop-shadow(0 0 16px ${color}66)` }}>
          {emoji}
        </div>
      </div>

      <div style={{ fontSize: '0.72rem', letterSpacing: '0.22em', color: `${color}88`, textTransform: 'uppercase', fontWeight: 600, textAlign: 'center', minWidth: '220px' }}>
        {label}<span style={{ display: 'inline-block', minWidth: '1.6em', color: `${color}55` }}>{dotStr}</span>
      </div>

      <div style={{ position: 'absolute', bottom: '2rem', fontSize: '0.62rem', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.14)', textTransform: 'uppercase' }}>
        yourone.world
      </div>
    </div>
  )
}
