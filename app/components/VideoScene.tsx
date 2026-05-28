'use client'
import { videoUrl } from '../lib/videoMap'

interface Props {
  sceneId: string
  style?: React.CSSProperties
  onReady?: () => void
}

export default function VideoScene({ sceneId, style, onReady }: Props) {
  return (
    <video
      key={sceneId}
      src={videoUrl(sceneId)}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      onCanPlay={onReady}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        display: 'block',
        ...style,
      }}
    />
  )
}
