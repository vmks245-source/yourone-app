'use client'
import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'

export default function PlacePage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const code = params.code as string
  const cat = searchParams.get('cat') || 'world'
  const [dots, setDots] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setDots(d => (d + 1) % 4), 380)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = `/?code=${code}&cat=${cat}`
    }, 600)
    return () => clearTimeout(timer)
  }, [code, cat])

  const dotStr = '···'.slice(0, dots)

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at 50% 45%, #080814 0%, #030308 100%)',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      gap: '2rem',
    }}>
      <div style={{ position: 'relative', width: '80px', height: '80px' }}>
        <div style={{ position: 'absolute', inset: '-16px', borderRadius: '50%', border: '1px solid rgba(160,122,248,0.12)', animation: 'loadPulse 2.8s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid transparent', borderTopColor: '#a07af8', borderRightColor: 'rgba(160,122,248,0.3)', animation: 'loadSpin 1.2s linear infinite' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', filter: 'drop-shadow(0 0 12px rgba(160,122,248,0.5))' }}>
          ✦
        </div>
      </div>

      <p style={{ fontSize: '0.72rem', letterSpacing: '0.22em', color: 'rgba(160,122,248,0.6)', textTransform: 'uppercase', fontWeight: 600, fontFamily: 'Inter, -apple-system, sans-serif', minWidth: '16ch', textAlign: 'center' }}>
        Opening your world<span style={{ minWidth: '2em', display: 'inline-block', color: 'rgba(160,122,248,0.35)' }}>{dotStr}</span>
      </p>

      <p style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em', fontFamily: 'Inter, sans-serif' }}>
        yourone.world
      </p>
    </div>
  )
}
