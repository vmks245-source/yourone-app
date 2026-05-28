'use client'
import { useEffect, useState } from 'react'

interface Props {
  show: boolean
  emoji?: string
  label?: string
  color?: string
}

export default function LoadingOverlay({ show, emoji = '✦', label = 'Loading your world', color = '#c8b8f8' }: Props) {
  const [mounted, setMounted] = useState(true)
  const [dots, setDots] = useState('.')

  // Keep DOM alive during fade-out
  useEffect(() => {
    if (!show) {
      const t = setTimeout(() => setMounted(false), 1000)
      return () => clearTimeout(t)
    }
    setMounted(true)
  }, [show])

  // Animated dots
  useEffect(() => {
    const t = setInterval(() => setDots(d => d.length >= 3 ? '.' : d + '.'), 480)
    return () => clearInterval(t)
  }, [])

  if (!mounted) return null

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 20,
      background: '#04040c',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      opacity: show ? 1 : 0,
      transition: 'opacity 0.9s ease',
      pointerEvents: show ? 'auto' : 'none',
    }}>
      {/* Radial background glow */}
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 50% 50%, ${color}09 0%, transparent 65%)`, animation: 'loadBreath 3s ease-in-out infinite', pointerEvents: 'none' }} />

      {/* Ring + emoji */}
      <div style={{ position: 'relative', width: '96px', height: '96px', marginBottom: '2rem' }}>
        <div style={{ position: 'absolute', inset: '-18px', borderRadius: '50%', border: `1px solid ${color}22`, animation: 'loadPulse 2.4s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', inset: '-6px', borderRadius: '50%', border: `1px solid ${color}33`, animation: 'loadPulse 2.4s ease-in-out 0.4s infinite' }} />
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid transparent', borderTopColor: color, borderRightColor: `${color}44`, animation: 'loadSpin 1.1s linear infinite' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', animation: 'loadBreath 3s ease-in-out infinite' }}>
          {emoji}
        </div>
      </div>

      <div style={{ fontSize: '0.8rem', letterSpacing: '0.16em', color: `${color}77`, textTransform: 'uppercase', fontWeight: 500, minWidth: '200px', textAlign: 'center' }}>
        {label}{dots}
      </div>
    </div>
  )
}
