'use client'
import { videoUrl } from '../lib/videoMap'

interface Props {
  sceneId: string
  style?: React.CSSProperties
}

export default function VideoScene({ sceneId, style }: Props) {
  return (
    <video
      key={sceneId}
      src={videoUrl(sceneId)}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
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
