import type { SceneConfig } from './types'

export const desert_canyon_0: SceneConfig = {
  name: 'Desert Canyon at Dusk', mood: 'Ancient and unhurried — you carry the wisdom of things that last.',
  colors: ['#8B3A0F', '#D4522A', '#FFB347'],
  draw(ctx, w, h, t) {
    const sky = ctx.createLinearGradient(0, 0, 0, h * .45)
    sky.addColorStop(0, '#1a0a2e'); sky.addColorStop(.4, '#8B1A3A'); sky.addColorStop(1, '#FF6B35')
    ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h * .45)
    const sunX = w * .55, sunY = h * .38, sg = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, 150)
    sg.addColorStop(0, 'rgba(255,220,80,.8)'); sg.addColorStop(.2, 'rgba(255,140,40,.4)'); sg.addColorStop(1, 'transparent')
    ctx.fillStyle = sg; ctx.fillRect(0, 0, w, h); ctx.beginPath(); ctx.arc(sunX, sunY, 28, 0, Math.PI * 2); ctx.fillStyle = 'rgba(255,200,60,.9)'; ctx.fill()
    const walls: [number, number, number, number, string][] = [[0, .3, .22, .7, '#6B2D0A'], [.78, .25, .22, .75, '#7A3412'], [.18, .45, .15, .55, '#8B4A1A'], [.65, .42, .13, .58, '#7A3810']]
    walls.forEach(([wx, wy, ww,, wc]) => { ctx.fillStyle = wc; ctx.beginPath(); ctx.moveTo(wx * w, wy * h); for (let x = 0; x <= ww * w; x += 8) ctx.lineTo(wx * w + x, wy * h + Math.sin(x * .1) * 8 - Math.sin(x * .05) * 12); ctx.lineTo((wx + ww) * w, h); ctx.lineTo(wx * w, h); ctx.closePath(); ctx.fill(); for (let s = 0; s < 4; s++) { ctx.strokeStyle = 'rgba(255,160,80,.15)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(wx * w, (wy + .05 + s * .04) * h); ctx.lineTo((wx + ww) * w, (wy + .05 + s * .04) * h); ctx.stroke() } })
    const floor = ctx.createLinearGradient(0, h * .7, 0, h); floor.addColorStop(0, '#C4622A'); floor.addColorStop(1, '#8B3A0F'); ctx.fillStyle = floor; ctx.fillRect(0, h * .72, w, h)
    for (let i = 0; i < 6; i++) { const hx = w * .1 + i * w * .15; ctx.strokeStyle = 'rgba(255,140,60,.08)'; ctx.lineWidth = 15; ctx.beginPath(); ctx.moveTo(hx, h * .7); ctx.lineTo(hx + Math.sin(t * 3 + i) * 3, h * .5); ctx.stroke() }
    for (let i = 0; i < 20; i++) { const stx = (i * 317) % w, sty = (i * 131) % (h * .3); ctx.beginPath(); ctx.arc(stx, sty, .8, 0, Math.PI * 2); ctx.fillStyle = `rgba(255,240,200,${.3 + Math.sin(t * .5 + i) * .3})`; ctx.fill() }
    const v = ctx.createRadialGradient(w / 2, h / 2, h * .22, w / 2, h / 2, h * .9); v.addColorStop(0, 'transparent'); v.addColorStop(1, 'rgba(0,0,0,.72)'); ctx.fillStyle = v; ctx.fillRect(0, 0, w, h)
  }
}

export const desert_canyon_1: SceneConfig = {
  name: 'Arch Under Stars', mood: 'You stand in the frame of something immense. That is not a coincidence.',
  colors: ['#0a0410', '#301828', '#ff6030'],
  draw(ctx, w, h, t) {
    const sky = ctx.createLinearGradient(0, 0, 0, h * .65); sky.addColorStop(0, '#050210'); sky.addColorStop(.4, '#120818'); sky.addColorStop(.8, '#2a1010'); sky.addColorStop(1, '#5a2010'); ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h * .65)
    for (let i = 0; i < 200; i++) { const sx = (i * 2347) % w, sy = (i * 1847) % (h * .58), a = .18 + Math.sin(t * .25 + i * .65) * .14; ctx.beginPath(); ctx.arc(sx, sy, .35 + .35 * (i % 3), 0, Math.PI * 2); ctx.fillStyle = `rgba(210,220,255,${a})`; ctx.fill() }
    const mw = ctx.createRadialGradient(w * .5, h * .65, 0, w * .5, h * .65, w * .7); mw.addColorStop(0, 'rgba(255,100,40,.4)'); mw.addColorStop(.3, 'rgba(180,60,20,.15)'); mw.addColorStop(1, 'transparent'); ctx.fillStyle = mw; ctx.fillRect(0, 0, w, h)
    ctx.fillStyle = '#1a0a04'
    ctx.beginPath(); ctx.moveTo(0, h); ctx.lineTo(0, h * .4); for (let x = 0; x <= w * .28; x += 4) ctx.lineTo(x, h * .4 + Math.sin(x * .02) * h * .08 + Math.sin(x * .008) * h * .12); ctx.lineTo(w * .28, h); ctx.closePath(); ctx.fill()
    ctx.beginPath(); ctx.moveTo(w, h); ctx.lineTo(w, h * .35); for (let x = w; x >= w * .68; x -= 4) ctx.lineTo(x, h * .35 + Math.sin((w - x) * .02) * h * .1 + Math.sin((w - x) * .009) * h * .12); ctx.lineTo(w * .68, h); ctx.closePath(); ctx.fill()
    ctx.fillStyle = '#120802'; ctx.beginPath(); ctx.arc(w * .5, h * .62, w * .22, Math.PI, 0); ctx.fill()
    const hg2 = ctx.createRadialGradient(w * .5, h * .62, 0, w * .5, h * .62, w * .25); hg2.addColorStop(0, 'rgba(255,120,50,.25)'); hg2.addColorStop(1, 'transparent'); ctx.fillStyle = hg2; ctx.fillRect(0, 0, w, h)
    const floor = ctx.createLinearGradient(0, h * .7, 0, h); floor.addColorStop(0, '#2a1006'); floor.addColorStop(1, '#0e0602'); ctx.fillStyle = floor; ctx.fillRect(0, h * .72, w, h)
    const v = ctx.createRadialGradient(w / 2, h / 2, h * .22, w / 2, h / 2, h * .9); v.addColorStop(0, 'transparent'); v.addColorStop(1, 'rgba(0,0,0,.8)'); ctx.fillStyle = v; ctx.fillRect(0, 0, w, h)
  }
}

export const desert_canyon_2: SceneConfig = {
  name: 'Sandstorm Rising', mood: 'The storm is not a warning. It is an invitation.',
  colors: ['#180c04', '#c07828', '#f8c060'],
  draw(ctx, w, h, t) {
    const sky = ctx.createLinearGradient(0, 0, 0, h); sky.addColorStop(0, '#100804'); sky.addColorStop(.4, '#5a3010'); sky.addColorStop(.8, '#c07020'); sky.addColorStop(1, '#e09030'); ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h)
    for (let l = 0; l < 6; l++) { const ll = h * (.15 + l * .15) + Math.sin(t * .12 + l * 1.4) * 20; const lg = ctx.createLinearGradient(0, ll - 40, 0, ll + 40); lg.addColorStop(0, 'transparent'); lg.addColorStop(.5, `rgba(200,140,60,${.06 - l * .008})`); lg.addColorStop(1, 'transparent'); ctx.fillStyle = lg; ctx.fillRect(-100, ll - 40, w + 200, 80) }
    ctx.fillStyle = '#2a1408'
    ctx.beginPath(); ctx.moveTo(0, h); ctx.lineTo(0, h * .55); for (let x = 0; x <= w * .25; x += 5) ctx.lineTo(x, h * .55 + Math.sin(x * .012) * h * .1); ctx.lineTo(w * .25, h); ctx.closePath(); ctx.fill()
    ctx.beginPath(); ctx.moveTo(w, h); ctx.lineTo(w, h * .5); for (let x = w; x >= w * .72; x -= 5) ctx.lineTo(x, h * .5 + Math.sin((w - x) * .015) * h * .12); ctx.lineTo(w * .72, h); ctx.closePath(); ctx.fill()
    for (let i = 0; i < 80; i++) { const sx = (i * 1453 + t * (150 + (i % 5) * 20) + Math.sin(t * .4 + i * .3) * 30) % (w + 100) - 50, sy = (i * 897 + t * (40 + (i % 4) * 10)) % h, sa = (.2 + (i % 5) * .04) * (.4 + Math.sin(t * .3 + i) * .3); ctx.beginPath(); ctx.arc(sx, sy, .5 + (i % 4) * .4, 0, Math.PI * 2); ctx.fillStyle = `rgba(200,150,80,${sa})`; ctx.fill() }
    const floor = ctx.createLinearGradient(0, h * .75, 0, h); floor.addColorStop(0, '#c07028'); floor.addColorStop(1, '#6a3c10'); ctx.fillStyle = floor; ctx.fillRect(0, h * .78, w, h)
    const v = ctx.createRadialGradient(w / 2, h / 2, h * .18, w / 2, h / 2, h * .92); v.addColorStop(0, 'transparent'); v.addColorStop(1, 'rgba(0,0,0,.75)'); ctx.fillStyle = v; ctx.fillRect(0, 0, w, h)
  }
}

export const desert_canyon_3: SceneConfig = {
  name: 'Saguaro Midnight', mood: 'Solitude is not loneliness. You know the difference.',
  colors: ['#02040a', '#0a1428', '#c88840'],
  draw(ctx, w, h, t) {
    const sky = ctx.createLinearGradient(0, 0, 0, h * .65); sky.addColorStop(0, '#010205'); sky.addColorStop(.5, '#060c18'); sky.addColorStop(1, '#0e1828'); ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h * .65)
    for (let i = 0; i < 200; i++) { const sx = (i * 2347) % w, sy = (i * 1847) % (h * .58), a = .2 + Math.sin(t * (.2 + (i % 11) * .02) + i * .65) * .16; ctx.beginPath(); ctx.arc(sx, sy, .35 + .35 * (i % 3), 0, Math.PI * 2); ctx.fillStyle = `rgba(210,225,255,${a})`; ctx.fill() }
    ctx.beginPath(); ctx.arc(w * .82, h * .1, 22, 0, Math.PI * 2); ctx.fillStyle = 'rgba(225,235,210,.92)'; ctx.fill()
    const ground = ctx.createLinearGradient(0, h * .62, 0, h); ground.addColorStop(0, '#1a1208'); ground.addColorStop(1, '#0a0804'); ctx.fillStyle = ground; ctx.fillRect(0, h * .65, w, h)
    for (let i = 0; i < 12; i++) { const cx = (i * 1453) % w, cy = h * .65, ch = 60 + (i % 4) * 30; ctx.fillStyle = '#101a08'; ctx.fillRect(cx - 5, cy - ch, 10, ch); if (i % 3 !== 0) { ctx.fillRect(cx - 12, cy - ch * .6, 7, ch * .2); ctx.fillRect(cx + 5, cy - ch * .5, 7, ch * .2) } }
    const v = ctx.createRadialGradient(w / 2, h / 2, h * .25, w / 2, h / 2, h * .9); v.addColorStop(0, 'transparent'); v.addColorStop(1, 'rgba(0,0,0,.82)'); ctx.fillStyle = v; ctx.fillRect(0, 0, w, h)
  }
}

export const desert_canyon_4: SceneConfig = {
  name: 'Salt Flat Dawn', mood: 'You reflect the sky. That is not a metaphor.',
  colors: ['#080a10', '#4080b8', '#e8f0ff'],
  draw(ctx, w, h, t) {
    const sky = ctx.createLinearGradient(0, 0, 0, h * .5); sky.addColorStop(0, '#04060c'); sky.addColorStop(.4, '#101828'); sky.addColorStop(.8, '#2a4060'); sky.addColorStop(1, '#5080a8'); ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h * .5)
    for (let i = 0; i < 120; i++) { const sx = (i * 2347) % w, sy = (i * 1847) % (h * .45), a = .15 + Math.sin(t * .25 + i * .65) * .12; ctx.beginPath(); ctx.arc(sx, sy, .35 + .3 * (i % 3), 0, Math.PI * 2); ctx.fillStyle = `rgba(215,225,255,${a})`; ctx.fill() }
    const hg3 = ctx.createRadialGradient(w * .5, h * .5, 0, w * .5, h * .5, w * .6); hg3.addColorStop(0, 'rgba(160,200,255,.25)'); hg3.addColorStop(1, 'transparent'); ctx.fillStyle = hg3; ctx.fillRect(0, 0, w, h)
    const flat = ctx.createLinearGradient(0, h * .5, 0, h); flat.addColorStop(0, '#6090c0'); flat.addColorStop(.3, '#a0c0e0'); flat.addColorStop(1, '#d0e4f8'); ctx.fillStyle = flat; ctx.fillRect(0, h * .52, w, h)
    for (let r = 0; r < 8; r++) { const ry2 = h * (.52 + r * .06); const rx = ctx.createLinearGradient(0, ry2 - 2, 0, ry2 + 2); rx.addColorStop(0, 'transparent'); rx.addColorStop(.5, `rgba(180,210,240,${.12 - r * .01})`); rx.addColorStop(1, 'transparent'); ctx.fillStyle = rx; ctx.fillRect(0, ry2 - 2, w, 4) }
    for (let i = 0; i < 4; i++) { const mx = w * (.15 + i * .2), mr = 40 + i * 15; const rg = ctx.createRadialGradient(mx, h * .52, 0, mx, h * .52, mr); rg.addColorStop(0, `rgba(${140 + i * 20},${165 + i * 15},${200 + i * 10},.22)`); rg.addColorStop(1, 'transparent'); ctx.fillStyle = rg; ctx.beginPath(); ctx.ellipse(mx, h * .52, mr, mr * .15, 0, 0, Math.PI * 2); ctx.fill() }
    const v = ctx.createRadialGradient(w / 2, h / 2, h * .25, w / 2, h / 2, h * .88); v.addColorStop(0, 'transparent'); v.addColorStop(1, 'rgba(0,0,0,.65)'); ctx.fillStyle = v; ctx.fillRect(0, 0, w, h)
  }
}
