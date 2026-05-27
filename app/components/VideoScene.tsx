'use client'
import { useEffect, useRef, useState } from 'react'
import { videoUrl } from '../lib/videoMap'

interface Props {
  sceneId: string
  style?: React.CSSProperties
  onError?: () => void
}

export default function VideoScene({ sceneId, style, onError }: Props) {
  const ref = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const v = ref.current
    if (!v) return
    setReady(false)
    v.src = videoUrl(sceneId)
    v.load()
    v.play().catch(() => {})
  }, [sceneId])

  return (
    <video
      ref={ref}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      onCanPlay={() => setReady(true)}
      onError={onError}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
        opacity: ready ? 1 : 0,
        transition: 'opacity 1.2s ease',
        ...style,
      }}
    />
  )
}
