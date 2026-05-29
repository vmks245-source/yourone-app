'use client'
import { useEffect, useState, useRef } from 'react'
import { IMAGE_MAP, pexelsUrl } from '../lib/imageMap'

const R2 = 'https://pub-558ced66b1054a088b11443d1cd1ea5d.r2.dev'
const TOTAL      = 5
const DISPLAY_MS = 7000
const FADE_MS    = 2000

interface Props {
  archetypeId: string
  style?: React.CSSProperties
  onReady?: () => void
}

export default function ImageScene({ archetypeId, style, onReady }: Props) {
  const [curr,   setCurr]   = useState(0)
  const [next,   setNext]   = useState(1)
  const [fading, setFading] = useState(false)
  const tick     = useRef(0)
  const notified = useRef(false)

  const ids = IMAGE_MAP[archetypeId]
  const url = (n: number) =>
    ids ? pexelsUrl(ids[n % ids.length]) : `${R2}/${archetypeId}_${n % TOTAL}.jpg`

  useEffect(() => {
    setCurr(0); setNext(1); setFading(false)
    tick.current = 0; notified.current = false

    const timer = setInterval(() => {
      tick.current++
      setFading(true)
      setTimeout(() => {
        setCurr(tick.current % TOTAL)
        setNext((tick.current + 1) % TOTAL)
        setFading(false)
      }, FADE_MS)
    }, DISPLAY_MS)

    return () => clearInterval(timer)
  }, [archetypeId])

  const handleFirstLoad = () => {
    if (!notified.current) {
      notified.current = true
      onReady?.()
    }
  }

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: '#06060e', ...style }}>
      {/* Preload next image */}
      <img key={`n-${archetypeId}-${next}`} src={url(next)} alt=""
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0 }} />
      {/* Current image */}
      <img key={`c-${archetypeId}-${curr}`} src={url(curr)} alt=""
        onLoad={handleFirstLoad}
        style={{
          position: 'absolute', inset: 0, width: '100%', height: '100%',
          objectFit: 'cover',
          opacity: fading ? 0 : 1,
          transition: fading ? `opacity ${FADE_MS}ms ease` : 'none',
          animation: 'kenBurns 14s ease-out forwards',
        }} />
    </div>
  )
}
