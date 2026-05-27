'use client'
import { useEffect, useRef } from 'react'
import { scenes as allScenes } from '../scenes/index'
export type { SceneId } from '../scenes/index'
export { scenes } from '../scenes/index'


export default function SceneRenderer({ sceneId, width = 800, height = 500 }: { sceneId: import('../scenes/index').SceneId; width?: number; height?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let animId: number
    let t = 0
    const scene = allScenes[sceneId]

    const draw = () => {
      t += 0.016
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      scene.draw(ctx, canvas.width, canvas.height, t)
      animId = requestAnimationFrame(draw)
    }

    canvas.width = width; canvas.height = height
    draw()
    return () => cancelAnimationFrame(animId)
  }, [sceneId, width, height])

  return <canvas ref={canvasRef} style={{ width:'100%', height:'100%', display:'block' }} />
}
