'use client'
import { useEffect, useRef, useState } from 'react'
import { scenes } from '../scenes/index'
import type { SceneId } from '../scenes/index'

const REEL: SceneId[] = [
  'cloud_sea', 'ocean_midnight', 'arctic', 'neon_alley',
  'desert_canyon', 'storm_lightning', 'meadow_night', 'tokyo_rooftop',
  'ocean_bioluminescent', 'arctic_solstice', 'autumn_amber', 'neon_blade',
]

const SCENE_DURATION = 7000
const FADE_DURATION = 2500

export default function AmbientReel() {
  const canvasARef = useRef<HTMLCanvasElement>(null)
  const canvasBRef = useRef<HTMLCanvasElement>(null)
  const [dims, setDims] = useState({ w: 1920, h: 1080 })

  useEffect(() => {
    const update = () => setDims({ w: window.innerWidth, h: window.innerHeight })
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  useEffect(() => {
    const canvasA = canvasARef.current
    const canvasB = canvasBRef.current
    if (!canvasA || !canvasB) return

    const ctxA = canvasA.getContext('2d')
    const ctxB = canvasB.getContext('2d')
    if (!ctxA || !ctxB) return

    canvasA.width = dims.w; canvasA.height = dims.h
    canvasB.width = dims.w; canvasB.height = dims.h

    let idx = 0
    let tA = 0, tB = 0
    let animId: number
    let fading = false
    let fadeStart = 0
    let activeCanvas: 'A' | 'B' = 'A'

    const drawLoop = () => {
      const sceneA = scenes[REEL[idx % REEL.length]]
      const sceneB = scenes[REEL[(idx + 1) % REEL.length]]

      ctxA.clearRect(0, 0, dims.w, dims.h)
      sceneA.draw(ctxA, dims.w, dims.h, tA)
      tA += 0.016

      ctxB.clearRect(0, 0, dims.w, dims.h)
      sceneB.draw(ctxB, dims.w, dims.h, tB)
      tB += 0.016

      if (fading) {
        const elapsed = Date.now() - fadeStart
        const progress = Math.min(elapsed / FADE_DURATION, 1)
        const eased = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2

        if (activeCanvas === 'A') {
          canvasA.style.opacity = String(1 - eased)
          canvasB.style.opacity = String(eased)
        } else {
          canvasA.style.opacity = String(eased)
          canvasB.style.opacity = String(1 - eased)
        }

        if (progress >= 1) {
          fading = false
          idx++
          activeCanvas = activeCanvas === 'A' ? 'B' : 'A'
        }
      }

      animId = requestAnimationFrame(drawLoop)
    }

    const cycleTimer = setInterval(() => {
      if (!fading) { fading = true; fadeStart = Date.now() }
    }, SCENE_DURATION)

    canvasA.style.opacity = '1'
    canvasB.style.opacity = '0'
    drawLoop()

    return () => { cancelAnimationFrame(animId); clearInterval(cycleTimer) }
  }, [dims])

  const canvasStyle: React.CSSProperties = {
    position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block',
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
      <canvas ref={canvasARef} style={{ ...canvasStyle, opacity: 1, transition: 'opacity 2.5s ease' }} />
      <canvas ref={canvasBRef} style={{ ...canvasStyle, opacity: 0, transition: 'opacity 2.5s ease' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(4,4,12,0.70)', zIndex: 1 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 50% 50%, transparent 25%, rgba(0,0,0,0.60) 100%)', zIndex: 2 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 25%, transparent 72%, rgba(0,0,0,0.55) 100%)', zIndex: 3 }} />
    </div>
  )
}
