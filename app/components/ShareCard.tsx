'use client'
import { useEffect, useRef, useCallback } from 'react'
import type { ArchetypeResult } from '../lib/archetypes'

interface Props {
  result: ArchetypeResult
  code: string
  category: string
  onReady?: (dataUrl: string) => void
}

export default function ShareCard({ result, code, category, onReady }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const W = 1080, H = 1080
    canvas.width = W; canvas.height = H

    // Background
    const bg = ctx.createLinearGradient(0, 0, W, H)
    bg.addColorStop(0, '#05050f'); bg.addColorStop(0.5, '#0a080f'); bg.addColorStop(1, '#040408')
    ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H)

    // Archetype color glow
    const hex = result.color || '#c8b8f8'
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)

    const glow = ctx.createRadialGradient(W / 2, H * 0.42, 0, W / 2, H * 0.42, W * 0.55)
    glow.addColorStop(0, `rgba(${r},${g},${b},0.14)`); glow.addColorStop(1, 'transparent')
    ctx.fillStyle = glow; ctx.fillRect(0, 0, W, H)

    ctx.textAlign = 'center'

    // Category label
    ctx.font = '500 22px -apple-system, sans-serif'
    ctx.fillStyle = `rgba(${r},${g},${b},0.6)`
    ctx.fillText(category.toUpperCase(), W / 2, 130)

    // Title
    ctx.font = '400 56px Georgia, serif'
    ctx.fillStyle = 'rgba(255,255,255,0.95)'
    ctx.fillText(result.title, W / 2, 220)

    // Name
    ctx.font = '300 36px Georgia, serif'
    ctx.fillStyle = `rgba(${r},${g},${b},0.85)`
    ctx.fillText(result.name, W / 2, 285)

    // Divider
    ctx.strokeStyle = `rgba(${r},${g},${b},0.3)`; ctx.lineWidth = 1
    ctx.beginPath(); ctx.moveTo(W * 0.25, 320); ctx.lineTo(W * 0.75, 320); ctx.stroke()

    // Tagline word-wrap
    ctx.font = '300 28px Georgia, serif'; ctx.fillStyle = 'rgba(255,255,255,0.62)'
    const words = result.tagline.split(' ')
    let line = '', y = 385
    for (const word of words) {
      const test = line ? line + ' ' + word : word
      if (ctx.measureText(test).width > W * 0.72) { ctx.fillText(line, W / 2, y); line = word; y += 44 }
      else { line = test }
    }
    if (line) { ctx.fillText(line, W / 2, y); y += 44 }
    y += 50

    // Code box
    const bw = 320, bh = 90, bx = (W - bw) / 2
    ctx.fillStyle = 'rgba(255,255,255,0.05)'
    ctx.strokeStyle = `rgba(${r},${g},${b},0.3)`; ctx.lineWidth = 1
    ctx.beginPath(); ctx.roundRect(bx, y, bw, bh, 14); ctx.fill(); ctx.stroke()
    ctx.font = '500 13px monospace'; ctx.fillStyle = 'rgba(255,255,255,0.35)'
    ctx.fillText('YOUR CODE', W / 2, y + 28)
    ctx.font = '700 32px monospace'; ctx.fillStyle = '#ffffff'
    ctx.fillText(code, W / 2, y + 68)

    // Footer
    ctx.font = '400 22px -apple-system, sans-serif'; ctx.fillStyle = 'rgba(255,255,255,0.22)'
    ctx.fillText('yourone.world', W / 2, H - 55)
    ctx.font = '300 18px -apple-system, sans-serif'; ctx.fillStyle = 'rgba(255,255,255,0.12)'
    ctx.fillText('a Filmos product', W / 2, H - 28)

    onReady?.(canvas.toDataURL('image/png'))
  }, [result, code, category, onReady])

  useEffect(() => { draw() }, [draw])

  return <canvas ref={canvasRef} style={{ display: 'none' }} />
}

export function triggerDownload(dataUrl: string, filename: string) {
  const a = document.createElement('a')
  a.href = dataUrl; a.download = filename; a.click()
}
