'use client'
import { useEffect, useRef, useCallback } from 'react'
import type { ArchetypeResult } from '../lib/archetypes'

interface Props {
  result: ArchetypeResult
  code: string
  category: string
  onReady?: (dataUrl: string) => void
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '')
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)]
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(' ')
  const lines: string[] = []
  let line = ''
  for (const word of words) {
    const test = line ? line + ' ' + word : word
    if (ctx.measureText(test).width > maxWidth) {
      if (line) lines.push(line)
      line = word
    } else {
      line = test
    }
  }
  if (line) lines.push(line)
  return lines
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, radius: number) {
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.lineTo(x + w - radius, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + radius)
  ctx.lineTo(x + w, y + h - radius)
  ctx.quadraticCurveTo(x + w, y + h, x + w - radius, y + h)
  ctx.lineTo(x + radius, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - radius)
  ctx.lineTo(x, y + radius)
  ctx.quadraticCurveTo(x, y, x + radius, y)
  ctx.closePath()
}

export default function ShareCard({ result, code, category, onReady }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const draw = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const W = 1080, H = 1080
    canvas.width = W
    canvas.height = H

    const [r, g, b] = hexToRgb(result.color || '#a07af8')

    // Deep background
    const bgGrad = ctx.createLinearGradient(0, 0, W * 0.6, H)
    bgGrad.addColorStop(0, '#030308')
    bgGrad.addColorStop(1, '#06060e')
    ctx.fillStyle = bgGrad
    ctx.fillRect(0, 0, W, H)

    // Subtle dot grid
    ctx.fillStyle = 'rgba(255,255,255,0.028)'
    const spacing = 36
    for (let gx = spacing; gx < W; gx += spacing) {
      for (let gy = spacing; gy < H; gy += spacing) {
        ctx.beginPath(); ctx.arc(gx, gy, 1, 0, Math.PI * 2); ctx.fill()
      }
    }

    // Primary radial glow
    const glowTop = ctx.createRadialGradient(W / 2, H * 0.28, 0, W / 2, H * 0.28, W * 0.6)
    glowTop.addColorStop(0, `rgba(${r},${g},${b},0.18)`)
    glowTop.addColorStop(0.5, `rgba(${r},${g},${b},0.06)`)
    glowTop.addColorStop(1, 'transparent')
    ctx.fillStyle = glowTop; ctx.fillRect(0, 0, W, H)

    // Secondary glow — bottom corner
    const glowBot = ctx.createRadialGradient(W * 0.8, H * 0.85, 0, W * 0.8, H * 0.85, W * 0.4)
    glowBot.addColorStop(0, `rgba(${r},${g},${b},0.08)`)
    glowBot.addColorStop(1, 'transparent')
    ctx.fillStyle = glowBot; ctx.fillRect(0, 0, W, H)

    // Top accent line
    const accentLine = ctx.createLinearGradient(0, 0, W, 0)
    accentLine.addColorStop(0, 'transparent')
    accentLine.addColorStop(0.3, `rgba(${r},${g},${b},0.7)`)
    accentLine.addColorStop(0.7, `rgba(${r},${g},${b},0.7)`)
    accentLine.addColorStop(1, 'transparent')
    ctx.fillStyle = accentLine; ctx.fillRect(0, 0, W, 2)

    // Outer frames
    ctx.strokeStyle = `rgba(${r},${g},${b},0.18)`; ctx.lineWidth = 1
    roundRect(ctx, 36, 36, W - 72, H - 72, 28); ctx.stroke()
    ctx.strokeStyle = 'rgba(255,255,255,0.04)'; ctx.lineWidth = 1
    roundRect(ctx, 40, 40, W - 80, H - 80, 24); ctx.stroke()

    // Category pill
    const pillW = 200, pillH = 36, pillX = (W - pillW) / 2, pillY = 100
    ctx.fillStyle = `rgba(${r},${g},${b},0.12)`
    roundRect(ctx, pillX, pillY, pillW, pillH, 18); ctx.fill()
    ctx.strokeStyle = `rgba(${r},${g},${b},0.3)`; ctx.lineWidth = 1
    roundRect(ctx, pillX, pillY, pillW, pillH, 18); ctx.stroke()
    ctx.font = '600 12px -apple-system, Arial, sans-serif'
    ctx.textAlign = 'center'
    ctx.fillStyle = `rgba(${r},${g},${b},0.88)`
    ctx.fillText(category.toUpperCase(), W / 2, pillY + 23)

    // Title
    ctx.font = '400 52px Georgia, "Times New Roman", serif'
    ctx.fillStyle = '#ffffff'
    ctx.fillText(result.title, W / 2, 218)

    // Name
    ctx.font = '300 80px Georgia, "Times New Roman", serif'
    ctx.fillStyle = `rgb(${r},${g},${b})`
    ctx.fillText(result.name, W / 2, 318)

    // Horizontal rule
    const ruleGrad = ctx.createLinearGradient(W * 0.18, 0, W * 0.82, 0)
    ruleGrad.addColorStop(0, 'transparent')
    ruleGrad.addColorStop(0.5, `rgba(${r},${g},${b},0.4)`)
    ruleGrad.addColorStop(1, 'transparent')
    ctx.strokeStyle = ruleGrad; ctx.lineWidth = 1
    ctx.beginPath(); ctx.moveTo(W * 0.18, 356); ctx.lineTo(W * 0.82, 356); ctx.stroke()

    // Tagline
    ctx.font = 'italic 300 28px Georgia, "Times New Roman", serif'
    ctx.fillStyle = 'rgba(255,255,255,0.7)'
    const tagLines = wrapText(ctx, result.tagline, W * 0.72)
    let ty = 408
    for (const tl of tagLines) {
      ctx.fillText(tl, W / 2, ty); ty += 42
    }
    ty += 32

    // Why points box (up to 3)
    const whyItems = result.why.slice(0, 3)
    const whyBoxH = 26 + whyItems.length * 50 + 20
    const whyBoxY = ty
    const whyBoxX = W * 0.12
    const whyBoxW = W * 0.76

    ctx.fillStyle = 'rgba(255,255,255,0.025)'
    roundRect(ctx, whyBoxX, whyBoxY, whyBoxW, whyBoxH, 16); ctx.fill()
    ctx.strokeStyle = `rgba(${r},${g},${b},0.14)`; ctx.lineWidth = 1
    roundRect(ctx, whyBoxX, whyBoxY, whyBoxW, whyBoxH, 16); ctx.stroke()

    ctx.font = '600 11px -apple-system, Arial, sans-serif'
    ctx.fillStyle = `rgba(${r},${g},${b},0.5)`
    ctx.fillText('WHY YOU', W / 2, whyBoxY + 22)

    whyItems.forEach((why, i) => {
      const itemY = whyBoxY + 46 + i * 50
      // Letter badge
      ctx.fillStyle = `rgba(${r},${g},${b},0.15)`
      roundRect(ctx, whyBoxX + 22, itemY - 14, 24, 24, 6); ctx.fill()
      ctx.strokeStyle = `rgba(${r},${g},${b},0.35)`; ctx.lineWidth = 1
      roundRect(ctx, whyBoxX + 22, itemY - 14, 24, 24, 6); ctx.stroke()
      ctx.font = '700 11px -apple-system, Arial, sans-serif'
      ctx.fillStyle = `rgb(${r},${g},${b})`
      ctx.fillText(String.fromCharCode(65 + i), whyBoxX + 34, itemY + 2)

      // Why text
      const maxW = whyBoxW - 70
      ctx.font = '300 19px -apple-system, Arial, sans-serif'
      ctx.fillStyle = 'rgba(255,255,255,0.78)'
      ctx.textAlign = 'left'
      let whyLine = why
      while (ctx.measureText(whyLine + '…').width > maxW && whyLine.length > 10) {
        whyLine = whyLine.slice(0, -1)
      }
      if (whyLine !== why) whyLine += '…'
      ctx.fillText(whyLine, whyBoxX + 58, itemY + 2)
      ctx.textAlign = 'center'
    })

    ty = whyBoxY + whyBoxH + 44

    // Code box
    const codeW = 360, codeH = 96, codeX = (W - codeW) / 2, codeY = ty
    const codeGrad = ctx.createLinearGradient(codeX, codeY, codeX + codeW, codeY + codeH)
    codeGrad.addColorStop(0, `rgba(${r},${g},${b},0.12)`)
    codeGrad.addColorStop(1, `rgba(${r},${g},${b},0.04)`)
    ctx.fillStyle = codeGrad
    roundRect(ctx, codeX, codeY, codeW, codeH, 18); ctx.fill()
    ctx.strokeStyle = `rgba(${r},${g},${b},0.38)`; ctx.lineWidth = 1.5
    roundRect(ctx, codeX, codeY, codeW, codeH, 18); ctx.stroke()
    ctx.font = '500 11px -apple-system, Arial, sans-serif'
    ctx.fillStyle = `rgba(${r},${g},${b},0.5)`
    ctx.fillText('RETURN CODE', W / 2, codeY + 26)
    ctx.font = '700 36px "Courier New", monospace'
    ctx.fillStyle = '#ffffff'
    ctx.fillText(code, W / 2, codeY + 70)

    // Footer
    ctx.font = '500 20px -apple-system, Arial, sans-serif'
    ctx.fillStyle = 'rgba(255,255,255,0.3)'
    ctx.fillText('yourone.world', W / 2, H - 68)
    ctx.font = '400 15px -apple-system, Arial, sans-serif'
    ctx.fillStyle = 'rgba(255,255,255,0.14)'
    ctx.fillText('a Filmos product', W / 2, H - 44)

    // Bottom accent dots
    for (let i = -2; i <= 2; i++) {
      ctx.fillStyle = i === 0 ? `rgba(${r},${g},${b},0.7)` : `rgba(${r},${g},${b},${0.2 - Math.abs(i) * 0.06})`
      ctx.beginPath(); ctx.arc(W / 2 + i * 14, H - 18, i === 0 ? 3.5 : 2, 0, Math.PI * 2); ctx.fill()
    }

    onReady?.(canvas.toDataURL('image/png'))
  }, [result, code, category, onReady])

  useEffect(() => { draw() }, [draw])

  return <canvas ref={canvasRef} style={{ display: 'none' }} />
}

export function triggerDownload(dataUrl: string, filename: string) {
  const a = document.createElement('a')
  a.href = dataUrl
  a.download = filename
  a.click()
}
