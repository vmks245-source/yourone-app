import type { SceneConfig } from './types'

// ─── NEON ALLEY ──────────────────────────────────────────────────────────────

export const neon_alley_0: SceneConfig = {
  name: 'Neon Rainy Alley', mood: 'You thrive where others see only shadow — your world is beautifully complex.',
  colors: ['#0a0a1a', '#ff2266', '#00ffcc'],
  draw(ctx, w, h, t) {
    ctx.fillStyle = '#05050f'; ctx.fillRect(0, 0, w, h)
    const ref = ctx.createLinearGradient(0, h * .65, 0, h); ref.addColorStop(0, 'rgba(255,30,100,.15)'); ref.addColorStop(.5, 'rgba(0,200,200,.1)'); ref.addColorStop(1, 'rgba(10,10,30,.8)'); ctx.fillStyle = ref; ctx.fillRect(0, h * .65, w, h)
    const signs = [{ x: w * .15, y: h * .3, c: 'rgba(255,30,100,', txt: 'BAR' }, { x: w * .7, y: h * .25, c: 'rgba(0,200,255,', txt: 'OPEN' }, { x: w * .45, y: h * .35, c: 'rgba(180,0,255,', txt: '24H' }]
    signs.forEach(s => { const pulse = .6 + .4 * Math.sin(t * 2 + s.x); const rg = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, 80); rg.addColorStop(0, s.c + (.4 * pulse) + ')'); rg.addColorStop(1, s.c + '0)'); ctx.fillStyle = rg; ctx.fillRect(s.x - 80, s.y - 80, 160, 160); ctx.font = 'bold 14px monospace'; ctx.fillStyle = s.c + '.9)'; ctx.textAlign = 'center'; ctx.fillText(s.txt, s.x, s.y) })
    ctx.fillStyle = '#0d0d20'; [[0, .6, .18, .7], [.2, .4, .15, .75], [.38, .55, .12, .7], [.55, .35, .2, .75], [.78, .5, .22, .7]].forEach(([bx, by, bw, bh]) => { ctx.fillRect(bx * w, by * h, bw * w, bh * h); for (let wy2 = by * h + 10; wy2 < bh * h + by * h - 20; wy2 += 18) for (let wx2 = bx * w + 8; wx2 < (bx + bw) * w - 8; wx2 += 16) if (Math.sin(wx2 * .3 + wy2 * .7 + t * .1) > .1) { ctx.fillStyle = 'rgba(255,220,100,.5)'; ctx.fillRect(wx2, wy2, 6, 10); ctx.fillStyle = '#0d0d20' } })
    for (let i = 0; i < 120; i++) { const rx = (i * 137 + t * 200) % w, ry = (i * 89 + t * 400) % h; ctx.beginPath(); ctx.moveTo(rx, ry); ctx.lineTo(rx - 1, ry + 12); ctx.strokeStyle = 'rgba(150,180,255,.25)'; ctx.lineWidth = .8; ctx.stroke() }
    for (let i = 0; i < 6; i++) { const px = w * .1 + i * (w * .15), py = h * .82, pr = ctx.createRadialGradient(px, py, 0, px, py, 40); pr.addColorStop(0, `rgba(${i % 2 ? '255,30,100' : '0,200,255'},.2)`); pr.addColorStop(1, 'transparent'); ctx.fillStyle = pr; ctx.beginPath(); ctx.ellipse(px, py, 40 + Math.sin(t + i) * 5, 8, 0, 0, Math.PI * 2); ctx.fill() }
    const v = ctx.createRadialGradient(w / 2, h / 2, h * .22, w / 2, h / 2, h * .9); v.addColorStop(0, 'transparent'); v.addColorStop(1, 'rgba(0,0,0,.75)'); ctx.fillStyle = v; ctx.fillRect(0, 0, w, h)
  }
}

export const neon_alley_1: SceneConfig = {
  name: 'Blade District', mood: 'You see the circuit beneath the chrome. A rare gift.',
  colors: ['#04040e', '#ff4400', '#0088ff'],
  draw(ctx, w, h, t) {
    ctx.fillStyle = '#020208'; ctx.fillRect(0, 0, w, h)
    ;([[0, .3, .1, .7], [.12, .2, .14, .8], [.28, .4, .09, .65], [.4, .15, .18, .85], [.6, .28, .12, .75], [.75, .1, .2, .9]] as [number, number, number, number][]).forEach(([bx, by, bw, bh], idx) => { const bg = ctx.createLinearGradient(bx * w, by * h, bx * w, h); bg.addColorStop(0, '#14142a'); bg.addColorStop(1, '#0a0a18'); ctx.fillStyle = bg; ctx.fillRect(bx * w, by * h, bw * w, bh * h); const nc = idx % 2 ? 'rgba(255,68,0,' : 'rgba(0,136,255,'; const ng = ctx.createLinearGradient(bx * w, by * h, (bx + bw) * w, by * h); ng.addColorStop(0, nc + '.0)'); ng.addColorStop(.5, nc + '.3)'); ng.addColorStop(1, nc + '.0)'); ctx.fillStyle = ng; ctx.fillRect(bx * w, by * h, bw * w, 2) })
    for (let i = 0; i < 60; i++) { const rx = (i * 167 + t * 350) % w, ry = (i * 113 + t * 600) % h; ctx.beginPath(); ctx.moveTo(rx, ry); ctx.lineTo(rx - 1, ry + 14); ctx.strokeStyle = 'rgba(120,150,220,.22)'; ctx.lineWidth = .8; ctx.stroke() }
    ;[{ x: .2, y: .45, c: 'rgba(255,68,0,' }, { x: .55, y: .32, c: 'rgba(0,200,255,' }, { x: .8, y: .5, c: 'rgba(180,0,255,' }].forEach(s => { const pulse = .5 + .5 * Math.sin(t * 2.5 + s.x * 10); const sg = ctx.createRadialGradient(s.x * w, s.y * h, 0, s.x * w, s.y * h, 90); sg.addColorStop(0, s.c + (.5 * pulse) + ')'); sg.addColorStop(1, s.c + '0)'); ctx.fillStyle = sg; ctx.fillRect(s.x * w - 90, s.y * h - 90, 180, 180) })
    for (let i = 0; i < 8; i++) { const px = w * (.08 + i * .12), py = h * .88, pg = ctx.createRadialGradient(px, py, 0, px, py, 35); const pc = i % 2 ? 'rgba(255,68,0,' : 'rgba(0,136,255,'; pg.addColorStop(0, pc + '.2)'); pg.addColorStop(1, 'transparent'); ctx.fillStyle = pg; ctx.beginPath(); ctx.ellipse(px, py, 38 + Math.sin(t * 1.5 + i) * 6, 7, 0, 0, Math.PI * 2); ctx.fill() }
    const v = ctx.createRadialGradient(w / 2, h / 2, h * .2, w / 2, h / 2, h * .92); v.addColorStop(0, 'transparent'); v.addColorStop(1, 'rgba(0,0,0,.8)'); ctx.fillStyle = v; ctx.fillRect(0, 0, w, h)
  }
}

export const neon_alley_2: SceneConfig = {
  name: 'Karaoke Fog', mood: 'Every song is a world. You have collected more than most.',
  colors: ['#080410', '#cc00ff', '#ffcc00'],
  draw(ctx, w, h, t) {
    ctx.fillStyle = '#04020a'; ctx.fillRect(0, 0, w, h)
    for (let f = 0; f < 8; f++) { const fy = h * (.2 + f * .1) + Math.sin(t * .06 + f * 1.3) * 20; const fg = ctx.createLinearGradient(0, fy - 35, 0, fy + 35); fg.addColorStop(0, 'transparent'); fg.addColorStop(.5, `rgba(${f % 2 ? 180 : 80},${f % 3 ? 0 : 60},${f % 2 ? 255 : 180},.06)`); fg.addColorStop(1, 'transparent'); ctx.fillStyle = fg; ctx.fillRect(0, fy - 35, w, 70) }
    [[0, .25, .22], [.25, .15, .18], [.45, .3, .1], [.57, .12, .25], [.84, .2, .16]].forEach(([bx, by, bw], idx) => { ctx.fillStyle = '#0e0a18'; ctx.fillRect(bx * w, by * h, bw * w, h); for (let wy3 = by * h + 12; wy3 < h - 12; wy3 += 18) for (let wx3 = bx * w + 8; wx3 < (bx + bw) * w - 8; wx3 += 14) { const on = Math.sin(wx3 * .25 + wy3 * .6 + t * .15 + idx) > .2; if (on) { const wc = idx % 3 === 0 ? 'rgba(255,200,0,.55)' : idx % 3 === 1 ? 'rgba(200,0,255,.55)' : 'rgba(0,200,180,.55)'; ctx.fillStyle = wc; ctx.fillRect(wx3, wy3, 5, 9) } } })
    ;[{ x: .15, y: .38, c: 'rgba(204,0,255,', txt: 'GiRLs' }, { x: .6, y: .28, c: 'rgba(255,204,0,', txt: '熱唱' }, { x: .82, y: .42, c: 'rgba(0,220,200,', txt: 'OK' }].forEach(s => { const p = .55 + .45 * Math.abs(Math.sin(t * 1.8 + s.x * 8)); const sg = ctx.createRadialGradient(s.x * w, s.y * h, 0, s.x * w, s.y * h, 70); sg.addColorStop(0, s.c + (.45 * p) + ')'); sg.addColorStop(1, s.c + '0)'); ctx.fillStyle = sg; ctx.fillRect(s.x * w - 70, s.y * h - 70, 140, 140); ctx.font = `bold ${(12 + p * 3) | 0}px monospace`; ctx.fillStyle = s.c + p + ')'; ctx.textAlign = 'center'; ctx.fillText(s.txt, s.x * w, s.y * h) })
    for (let i = 0; i < 80; i++) { const rx = (i * 167 + t * 280) % w, ry = (i * 113 + t * 480) % h; ctx.beginPath(); ctx.moveTo(rx, ry); ctx.lineTo(rx - .8, ry + 11); ctx.strokeStyle = 'rgba(160,140,210,.2)'; ctx.lineWidth = .7; ctx.stroke() }
    const v = ctx.createRadialGradient(w / 2, h / 2, h * .22, w / 2, h / 2, h * .9); v.addColorStop(0, 'transparent'); v.addColorStop(1, 'rgba(0,0,0,.78)'); ctx.fillStyle = v; ctx.fillRect(0, 0, w, h)
  }
}

export const neon_alley_3: SceneConfig = {
  name: 'Market at 3am', mood: 'The world is quietest just before it wakes. That hour belongs to you.',
  colors: ['#060410', '#ff8800', '#00ccff'],
  draw(ctx, w, h, t) {
    ctx.fillStyle = '#030208'; ctx.fillRect(0, 0, w, h)
    for (let i = 0; i < 8; i++) { const lx = i * w / 7, ly = h * (.25 + (i % 3) * .15), ll = 80 + (i % 4) * 30; ctx.strokeStyle = `rgba(255,${120 + (i % 4) * 30},${i % 2 ? 0 : 200},.7)`; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(lx, h * .15); ctx.lineTo(lx, ly); for (let j = 0; j < 5; j++) { const jx = lx - 20 + (j % 2) * 40, jy = ly + j * (ll / 5); ctx.lineTo(jx, jy) } ctx.stroke() }
    [[.05, .55, .18], [.25, .5, .15], [.42, .58, .2], [.65, .52, .14], [.82, .56, .18]].forEach(([bx, by, bw], idx) => { ctx.fillStyle = '#100818'; ctx.fillRect(bx * w, by * h, bw * w, h); const aw = ctx.createLinearGradient(bx * w, by * h, (bx + bw) * w, by * h); const c1 = idx % 2 ? 'rgba(255,136,0,' : 'rgba(0,200,255,'; const c2 = idx % 3 === 2 ? 'rgba(255,0,128,' : c1; aw.addColorStop(0, c1 + '.3)'); aw.addColorStop(.5, c2 + '.5)'); aw.addColorStop(1, c1 + '.3)'); ctx.fillStyle = aw; ctx.fillRect(bx * w, by * h, bw * w, 6) })
    for (let i = 0; i < 60; i++) { const rx = (i * 167 + t * 200) % w, ry = (i * 113 + t * 360) % h; ctx.beginPath(); ctx.moveTo(rx, ry); ctx.lineTo(rx - .9, ry + 12); ctx.strokeStyle = 'rgba(140,160,200,.18)'; ctx.lineWidth = .7; ctx.stroke() }
    const ref2 = ctx.createLinearGradient(0, h * .82, 0, h); ref2.addColorStop(0, 'rgba(50,20,80,.6)'); ref2.addColorStop(1, 'rgba(10,5,20,.9)'); ctx.fillStyle = ref2; ctx.fillRect(0, h * .82, w, h)
    for (let i = 0; i < 6; i++) { const px = w * (.08 + i * .16), py = h * .9, pg = ctx.createRadialGradient(px, py, 0, px, py, 30); pg.addColorStop(0, `rgba(${i % 2 ? '255,136,0' : '0,200,255'},.18)`); pg.addColorStop(1, 'transparent'); ctx.fillStyle = pg; ctx.beginPath(); ctx.ellipse(px, py, 35, 6, 0, 0, Math.PI * 2); ctx.fill() }
    const v = ctx.createRadialGradient(w / 2, h / 2, h * .2, w / 2, h / 2, h * .9); v.addColorStop(0, 'transparent'); v.addColorStop(1, 'rgba(0,0,0,.78)'); ctx.fillStyle = v; ctx.fillRect(0, 0, w, h)
  }
}

export const neon_alley_4: SceneConfig = {
  name: 'Laundromat at 4am', mood: 'Ordinary places become sacred at unusual hours.',
  colors: ['#080610', '#4400cc', '#ccff44'],
  draw(ctx, w, h, t) {
    ctx.fillStyle = '#050408'; ctx.fillRect(0, 0, w, h)
    ctx.fillStyle = '#0e0c18'; ctx.fillRect(w * .1, h * .15, w * .8, h * .75)
    ctx.strokeStyle = 'rgba(100,80,200,.6)'; ctx.lineWidth = 2; ctx.strokeRect(w * .1, h * .15, w * .8, h * .75)
    for (let d = 0; d < 4; d++) { const dx = w * (.15 + d * .18), dy = h * .35, dr = 35; ctx.strokeStyle = 'rgba(150,130,210,.5)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(dx, dy, dr, 0, Math.PI * 2); ctx.stroke(); const clothes = ['rgba(255,100,80,.7)', 'rgba(80,180,255,.7)', 'rgba(255,220,60,.7)', 'rgba(180,255,80,.7)']; for (let c = 0; c < 4; c++) { const ca = t * (d % 2 ? 1 : -1) * 1.2 + c * Math.PI / 2; ctx.beginPath(); ctx.arc(dx + Math.cos(ca) * dr * .6, dy + Math.sin(ca) * dr * .6, 5, 0, Math.PI * 2); ctx.fillStyle = clothes[c]; ctx.fill() } }
    const fl = ctx.createLinearGradient(0, h * .85, 0, h); fl.addColorStop(0, 'rgba(60,40,130,.4)'); fl.addColorStop(1, 'rgba(20,15,45,.7)'); ctx.fillStyle = fl; ctx.fillRect(0, h * .85, w, h)
    for (let i = 0; i < 30; i++) { const rx = (i * 167 + t * 160) % w, ry = (i * 113 + t * 280) % h; ctx.beginPath(); ctx.moveTo(rx, ry); ctx.lineTo(rx - .8, ry + 11); ctx.strokeStyle = 'rgba(130,120,200,.18)'; ctx.lineWidth = .7; ctx.stroke() }
    ctx.font = '11px monospace'; ctx.fillStyle = 'rgba(100,200,80,.5)'; ctx.textAlign = 'center'; ctx.fillText('OPEN 24H', w * .5, h * .2)
    const v = ctx.createRadialGradient(w / 2, h / 2, h * .22, w / 2, h / 2, h * .9); v.addColorStop(0, 'transparent'); v.addColorStop(1, 'rgba(0,0,0,.8)'); ctx.fillStyle = v; ctx.fillRect(0, 0, w, h)
  }
}

// ─── TOKYO ROOFTOP ───────────────────────────────────────────────────────────

export const tokyo_rooftop_0: SceneConfig = {
  name: 'Tokyo Rooftop at Rain', mood: 'You find beauty in the pulse of things — alive when the world is in motion.',
  colors: ['#0a0a18', '#ff6644', '#4488ff'],
  draw(ctx, w, h, t) {
    ctx.fillStyle = '#080818'; ctx.fillRect(0, 0, w, h)
    const bdata = [[0, .4, .08], [.1, .25, .12], [.24, .35, .09], [.35, .2, .14], [.51, .32, .1], [.63, .18, .16], [.81, .28, .12], [.95, .4, .05]]
    bdata.forEach(([bx, by, bw]) => { const bg = ctx.createLinearGradient(bx * w, by * h, bx * w, h); bg.addColorStop(0, '#1a1a30'); bg.addColorStop(1, '#0d0d20'); ctx.fillStyle = bg; ctx.fillRect(bx * w, by * h, bw * w, h); for (let wy3 = by * h + 15; wy3 < h - 10; wy3 += 20) for (let wx3 = bx * w + 6; wx3 < (bx + bw) * w - 6; wx3 += 14) if (Math.sin(wx3 * .3 + wy3 * .7 + t * .1) > .1) { ctx.fillStyle = `rgba(255,${(180 + Math.sin(wx3) * 30) | 0},100,.6)`; ctx.fillRect(wx3, wy3, 5, 8) } })
    const tg = ctx.createRadialGradient(w * .5, h * .2, 0, w * .5, h * .2, 200); tg.addColorStop(0, 'rgba(255,80,40,.2)'); tg.addColorStop(1, 'transparent'); ctx.fillStyle = tg; ctx.fillRect(0, 0, w, h)
    ctx.strokeStyle = 'rgba(255,100,60,.8)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(w * .5, h * .05); ctx.lineTo(w * .5, h * .3); ctx.stroke()
    const ref2 = ctx.createLinearGradient(0, h * .72, 0, h); ref2.addColorStop(0, 'rgba(40,40,80,.9)'); ref2.addColorStop(1, 'rgba(10,10,20,1)'); ctx.fillStyle = ref2; ctx.fillRect(0, h * .72, w, h)
    for (let i = 0; i < 8; i++) { const lx = w * (.1 + i * .11), intensity = .3 + Math.sin(t + i) * .1; const lg2 = ctx.createRadialGradient(lx, h * .72, 0, lx, h * .72, 50); lg2.addColorStop(0, `rgba(${i % 2 ? '255,80,40' : '60,120,255'},${intensity})`); lg2.addColorStop(1, 'transparent'); ctx.fillStyle = lg2; ctx.beginPath(); ctx.ellipse(lx, h * .82, 15, 60, 0, 0, Math.PI * 2); ctx.fill() }
    for (let i = 0; i < 100; i++) { const rx = (i * 167 + t * 300) % w, ry = (i * 113 + t * 500) % h; ctx.beginPath(); ctx.moveTo(rx, ry); ctx.lineTo(rx - .5, ry + 10); ctx.strokeStyle = 'rgba(180,200,255,.2)'; ctx.lineWidth = .7; ctx.stroke() }
    const v = ctx.createRadialGradient(w / 2, h / 2, h * .22, w / 2, h / 2, h * .9); v.addColorStop(0, 'transparent'); v.addColorStop(1, 'rgba(0,0,0,.75)'); ctx.fillStyle = v; ctx.fillRect(0, 0, w, h)
  }
}

export const tokyo_rooftop_1: SceneConfig = {
  name: 'Shibuya Overflow', mood: 'You find your center in the crossing. That is rare.',
  colors: ['#060610', '#ff2244', '#22aaff'],
  draw(ctx, w, h, t) {
    ctx.fillStyle = '#040408'; ctx.fillRect(0, 0, w, h)
    ;([[0, .35, .1], [.12, .18, .13], [.27, .3, .08], [.37, .12, .16], [.55, .25, .12], [.69, .1, .18], [.89, .28, .11]] as [number, number, number][]).forEach(([bx, by, bw], idx) => { const bg = ctx.createLinearGradient(bx * w, by * h, bx * w, h); bg.addColorStop(0, '#121228'); bg.addColorStop(1, '#080818'); ctx.fillStyle = bg; ctx.fillRect(bx * w, by * h, bw * w, h); for (let wy3 = by * h + 10; wy3 < h - 12; wy3 += 16) for (let wx3 = bx * w + 5; wx3 < (bx + bw) * w - 5; wx3 += 12) if (Math.sin(wx3 * .35 + wy3 * .75 + t * .08 + idx) > .15) { ctx.fillStyle = idx % 2 ? 'rgba(255,40,70,.55)' : 'rgba(40,160,255,.55)'; ctx.fillRect(wx3, wy3, 4, 7) } })
    const crossingY = h * .72; ctx.fillStyle = 'rgba(30,30,60,.9)'; ctx.fillRect(0, crossingY, w, h)
    for (let i = 0; i < 10; i++) { const sx = i * w / 9; ctx.fillStyle = 'rgba(255,255,255,.1)'; ctx.fillRect(sx, crossingY, 28, h) }
    for (let i = 0; i < 20; i++) { const fx = (i * 1373 + t * (i % 2 ? 60 : -50) + 9999) % w, fy = crossingY + 10 + (i * 567) % (h * .22), fa = .5 + Math.sin(t + i) * .3; const fc = i % 3 === 0 ? 'rgba(255,40,70,' : i % 3 === 1 ? 'rgba(40,160,255,' : 'rgba(255,255,255,'; ctx.beginPath(); ctx.arc(fx, fy, 2, 0, Math.PI * 2); ctx.fillStyle = fc + fa + ')'; ctx.fill() }
    for (let i = 0; i < 80; i++) { const rx = (i * 167 + t * 350) % w, ry = (i * 113 + t * 550) % h; ctx.beginPath(); ctx.moveTo(rx, ry); ctx.lineTo(rx - .6, ry + 11); ctx.strokeStyle = 'rgba(160,180,220,.18)'; ctx.lineWidth = .7; ctx.stroke() }
    const v = ctx.createRadialGradient(w / 2, h / 2, h * .2, w / 2, h / 2, h * .9); v.addColorStop(0, 'transparent'); v.addColorStop(1, 'rgba(0,0,0,.78)'); ctx.fillStyle = v; ctx.fillRect(0, 0, w, h)
  }
}

export const tokyo_rooftop_2: SceneConfig = {
  name: 'Lantern District', mood: 'Warmth is something you make — not something you wait for.',
  colors: ['#0e0608', '#cc4400', '#ffcc44'],
  draw(ctx, w, h, t) {
    ctx.fillStyle = '#080404'; ctx.fillRect(0, 0, w, h)
    ;([[0, .3, .12], [.14, .18, .14], [.3, .28, .1], [.42, .14, .16], [.6, .24, .12], [.74, .1, .2], [.96, .28, .04]] as [number, number, number][]).forEach(([bx, by, bw]) => { ctx.fillStyle = '#130808'; ctx.fillRect(bx * w, by * h, bw * w, h); for (let wy3 = by * h + 12; wy3 < h - 10; wy3 += 18) for (let wx3 = bx * w + 6; wx3 < (bx + bw) * w - 6; wx3 += 14) if (Math.sin(wx3 * .28 + wy3 * .62 + t * .09) > .12) { ctx.fillStyle = 'rgba(255,180,60,.55)'; ctx.fillRect(wx3, wy3, 5, 8) } })
    for (let i = 0; i < 12; i++) { const lx = w * (.08 + i * .08), ly = h * (.28 + Math.sin(i * .7) * .08), lg = ctx.createRadialGradient(lx, ly, 0, lx, ly, 30); lg.addColorStop(0, 'rgba(255,100,20,.55)'); lg.addColorStop(1, 'transparent'); ctx.fillStyle = lg; ctx.fillRect(lx - 30, ly - 30, 60, 60); ctx.fillStyle = 'rgba(255,140,40,.8)'; ctx.beginPath(); ctx.ellipse(lx, ly, 12, 16, 0, 0, Math.PI * 2); ctx.fill(); ctx.fillStyle = 'rgba(255,200,120,.9)'; ctx.beginPath(); ctx.ellipse(lx, ly, 5, 6, 0, 0, Math.PI * 2); ctx.fill() }
    const ref3 = ctx.createLinearGradient(0, h * .75, 0, h); ref3.addColorStop(0, 'rgba(50,20,10,.8)'); ref3.addColorStop(1, 'rgba(20,8,4,.95)'); ctx.fillStyle = ref3; ctx.fillRect(0, h * .75, w, h)
    for (let i = 0; i < 70; i++) { const rx = (i * 167 + t * 220) % w, ry = (i * 113 + t * 400) % h; ctx.beginPath(); ctx.moveTo(rx, ry); ctx.lineTo(rx - .8, ry + 11); ctx.strokeStyle = 'rgba(160,140,120,.18)'; ctx.lineWidth = .7; ctx.stroke() }
    const v = ctx.createRadialGradient(w / 2, h / 2, h * .2, w / 2, h / 2, h * .9); v.addColorStop(0, 'transparent'); v.addColorStop(1, 'rgba(0,0,0,.78)'); ctx.fillStyle = v; ctx.fillRect(0, 0, w, h)
  }
}

export const tokyo_rooftop_3: SceneConfig = {
  name: 'High Above It All', mood: 'Distance does not mean detachment. You see everything from here.',
  colors: ['#040810', '#2244aa', '#88ccff'],
  draw(ctx, w, h, t) {
    const sky = ctx.createLinearGradient(0, 0, 0, h * .45); sky.addColorStop(0, '#020508'); sky.addColorStop(.6, '#081228'); sky.addColorStop(1, '#102040'); ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h * .45)
    for (let i = 0; i < 100; i++) { const sx = (i * 2347) % w, sy = (i * 1847) % (h * .38), a = .12 + Math.sin(t * .28 + i * .65) * .1; ctx.beginPath(); ctx.arc(sx, sy, .35 + .3 * (i % 3), 0, Math.PI * 2); ctx.fillStyle = `rgba(215,225,255,${a})`; ctx.fill() }
    [[0, .45, .08], [.1, .3, .12], [.25, .4, .09], [.36, .22, .14], [.52, .35, .1], [.64, .2, .16], [.82, .32, .12], [.96, .42, .04]].forEach(([bx, by, bw]) => { const bg = ctx.createLinearGradient(bx * w, by * h, bx * w, h); bg.addColorStop(0, '#0e1830'); bg.addColorStop(1, '#060c18'); ctx.fillStyle = bg; ctx.fillRect(bx * w, by * h, bw * w, h); for (let wy3 = by * h + 12; wy3 < h - 10; wy3 += 16) for (let wx3 = bx * w + 5; wx3 < (bx + bw) * w - 5; wx3 += 12) if (Math.sin(wx3 * .3 + wy3 * .65 + t * .08) > .2) { ctx.fillStyle = 'rgba(200,220,255,.5)'; ctx.fillRect(wx3, wy3, 4, 7) } })
    const roof = ctx.createLinearGradient(0, h * .78, 0, h); roof.addColorStop(0, '#1a2240'); roof.addColorStop(1, '#0c1428'); ctx.fillStyle = roof; ctx.fillRect(0, h * .8, w, h)
    const v = ctx.createRadialGradient(w / 2, h / 2, h * .22, w / 2, h / 2, h * .9); v.addColorStop(0, 'transparent'); v.addColorStop(1, 'rgba(0,0,0,.78)'); ctx.fillStyle = v; ctx.fillRect(0, 0, w, h)
  }
}

export const tokyo_rooftop_4: SceneConfig = {
  name: 'Ryokan Garden', mood: 'Slowness is its own kind of power.',
  colors: ['#040808', '#224422', '#88cc88'],
  draw(ctx, w, h, t) {
    const sky = ctx.createLinearGradient(0, 0, 0, h * .5); sky.addColorStop(0, '#020504'); sky.addColorStop(.6, '#081008'); sky.addColorStop(1, '#101808'); ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h * .5)
    for (let i = 0; i < 60; i++) { const sx = (i * 2347) % w, sy = (i * 1847) % (h * .42), a = .1 + Math.sin(t * .25 + i * .65) * .08; ctx.beginPath(); ctx.arc(sx, sy, .35 + .3 * (i % 3), 0, Math.PI * 2); ctx.fillStyle = `rgba(200,220,200,${a})`; ctx.fill() }
    ctx.beginPath(); ctx.arc(w * .75, h * .14, 20, 0, Math.PI * 2); ctx.fillStyle = 'rgba(215,225,210,.88)'; ctx.fill()
    const ground = ctx.createLinearGradient(0, h * .5, 0, h); ground.addColorStop(0, '#0e1a0c'); ground.addColorStop(1, '#060c04'); ctx.fillStyle = ground; ctx.fillRect(0, h * .52, w, h)
    for (let i = 0; i < 8; i++) { const tx = w * (.1 + i * .11), ty = h * (.38 + Math.sin(i * .8) * .06), ht2 = 80 + Math.sin(i * 1.2) * 20; ctx.fillStyle = '#0a1008'; ctx.fillRect(tx - 3, ty, 6, ht2); ctx.fillStyle = `rgba(${15 + i * 3},${55 + i * 8},${12 + i * 3},.85)`; ctx.beginPath(); ctx.arc(tx, ty + 8, 28 + Math.sin(i) * 8, 0, Math.PI * 2); ctx.fill() }
    for (let i = 0; i < 50; i++) { const bx = (i * 1453 + Math.sin(t * .12 + i) * 25) % w, by2 = h * .55 + (i * 997) % (h * .35), ba = .15 + Math.sin(t * .4 + i) * .1; ctx.beginPath(); ctx.arc(bx, by2, .8, 0, Math.PI * 2); ctx.fillStyle = `rgba(160,200,140,${ba})`; ctx.fill() }
    const pond = ctx.createRadialGradient(w * .5, h * .75, 0, w * .5, h * .75, 80); pond.addColorStop(0, 'rgba(40,80,60,.7)'); pond.addColorStop(.5, 'rgba(20,50,40,.5)'); pond.addColorStop(1, 'transparent'); ctx.fillStyle = pond; ctx.beginPath(); ctx.ellipse(w * .5, h * .75, 80, 25, 0, 0, Math.PI * 2); ctx.fill()
    const v = ctx.createRadialGradient(w / 2, h / 2, h * .22, w / 2, h / 2, h * .9); v.addColorStop(0, 'transparent'); v.addColorStop(1, 'rgba(0,0,0,.75)'); ctx.fillStyle = v; ctx.fillRect(0, 0, w, h)
  }
}

// ─── FACTORY ─────────────────────────────────────────────────────────────────

export const factory_0: SceneConfig = {
  name: 'Abandoned Factory in Fog', mood: 'You see beauty in what others overlook — rust and silence hold their own kind of truth.',
  colors: ['#1a1a14', '#4a4a3a', '#8888aa'],
  draw(ctx, w, h, t) {
    ctx.fillStyle = '#141410'; ctx.fillRect(0, 0, w, h)
    for (let f = 0; f < 6; f++) { const fy2 = h * (.3 + f * .1) + Math.sin(t * .1 + f) * 10; const fog2 = ctx.createLinearGradient(0, fy2 - 40, 0, fy2 + 40); fog2.addColorStop(0, 'transparent'); fog2.addColorStop(.5, `rgba(180,180,160,${.05 - f * .005})`); fog2.addColorStop(1, 'transparent'); ctx.fillStyle = fog2; ctx.fillRect(0, fy2 - 40, w, 80) }
    ctx.fillStyle = '#1e1e18'; ctx.fillRect(w * .1, h * .3, w * .5, h * .6); ctx.fillRect(w * .65, h * .4, w * .25, h * .5)
    ctx.fillStyle = '#252520'; ctx.fillRect(w * .08, h * .28, w * .54, h * .04)
    for (let s = 0; s < 3; s++) { const sx = w * (.2 + s * .15); ctx.fillStyle = '#1a1a16'; ctx.fillRect(sx - 8, h * .1, 16, h * .22); for (let sm = 0; sm < 5; sm++) { const smx = sx + Math.sin(t * .5 + sm * 1.2 + s) * 15, smy = h * .1 - 20 - sm * 25 + ((t * 15 + sm * 40) % 120), smr = 8 + sm * 5; ctx.beginPath(); ctx.arc(smx, smy, smr, 0, Math.PI * 2); ctx.fillStyle = `rgba(100,100,90,${.15 - sm * .02})`; ctx.fill() } }
    for (let wr = 0; wr < 3; wr++) for (let wc2 = 0; wc2 < 6; wc2++) { const wox = w * .12 + wc2 * w * .08, woy = h * .35 + wr * h * .12, broken = Math.sin(wox * woy) > .3; ctx.strokeStyle = broken ? 'rgba(60,60,50,.5)' : 'rgba(180,200,180,.1)'; ctx.lineWidth = broken ? .5 : .8; ctx.strokeRect(wox, woy, 30, 22); if (!broken) { ctx.fillStyle = 'rgba(160,180,160,.05)'; ctx.fillRect(wox, woy, 30, 22) } }
    ctx.fillStyle = 'rgba(80,80,70,.6)'; ctx.beginPath(); ctx.ellipse(w * .35, h * .88, 80, 12, 0, 0, Math.PI * 2); ctx.fill()
    for (let d = 0; d < 20; d++) { const dx = (d * 173 + t * 10) % w, dy = h * .2 + (d * 89 + t * 5) % (h * .7); ctx.beginPath(); ctx.arc(dx, dy, .8, 0, Math.PI * 2); ctx.fillStyle = `rgba(200,190,160,${.1 + Math.sin(t + d) * .05})`; ctx.fill() }
    const v = ctx.createRadialGradient(w / 2, h / 2, h * .22, w / 2, h / 2, h * .9); v.addColorStop(0, 'transparent'); v.addColorStop(1, 'rgba(0,0,0,.78)'); ctx.fillStyle = v; ctx.fillRect(0, 0, w, h)
  }
}

export const factory_1: SceneConfig = {
  name: 'Steel Foundry at Night', mood: 'Things are made in heat and pressure. So were you.',
  colors: ['#0a0800', '#401800', '#ff6600'],
  draw(ctx, w, h, t) {
    ctx.fillStyle = '#060500'; ctx.fillRect(0, 0, w, h)
    for (let f = 0; f < 4; f++) { const fy = h * (.25 + f * .15) + Math.sin(t * .08 + f) * 12; const fg = ctx.createLinearGradient(0, fy - 30, 0, fy + 30); fg.addColorStop(0, 'transparent'); fg.addColorStop(.5, `rgba(80,50,20,${.08 - f * .015})`); fg.addColorStop(1, 'transparent'); ctx.fillStyle = fg; ctx.fillRect(0, fy - 30, w, 60) }
    ctx.fillStyle = '#1a1200'; ctx.fillRect(0, h * .35, w, h); ctx.fillStyle = '#100e00'; ctx.fillRect(w * .1, h * .2, w * .55, h * .7); ctx.fillRect(w * .7, h * .28, w * .25, h * .65)
    for (let s = 0; s < 4; s++) { const sx = w * (.15 + s * .18); ctx.fillStyle = '#0e0a00'; ctx.fillRect(sx - 10, h * .08, 20, h * .3); for (let sm = 0; sm < 6; sm++) { const smx = sx + Math.sin(t * .6 + sm * 1.1 + s) * 18, smy = h * .08 - 15 - sm * 22 + ((t * 12 + sm * 35) % 110), smr = 10 + sm * 4; ctx.beginPath(); ctx.arc(smx, smy, smr, 0, Math.PI * 2); ctx.fillStyle = `rgba(${150 + sm * 10},${60 + sm * 8},10,${.12 - sm * .015})`; ctx.fill() } }
    for (let i = 0; i < 20; i++) { const ex = (i * 1373 + t * 40 + Math.sin(t * 1.5 + i) * 20) % w, ey = h * .35 + (i * 567 - t * 60 + 9999) % (h * .5), ea = .35 + Math.sin(t * 3 + i) * .2; ctx.beginPath(); ctx.arc(ex, ey, 1, 0, Math.PI * 2); ctx.fillStyle = `rgba(255,${(100 + i % 50) | 0},10,${ea})`; ctx.fill() }
    const pour = ctx.createRadialGradient(w * .38, h * .55, 0, w * .38, h * .55, 60); pour.addColorStop(0, 'rgba(255,150,20,.7)'); pour.addColorStop(.4, 'rgba(200,80,5,.3)'); pour.addColorStop(1, 'transparent'); ctx.fillStyle = pour; ctx.fillRect(0, 0, w, h)
    const v = ctx.createRadialGradient(w / 2, h / 2, h * .2, w / 2, h / 2, h * .9); v.addColorStop(0, 'transparent'); v.addColorStop(1, 'rgba(0,0,0,.82)'); ctx.fillStyle = v; ctx.fillRect(0, 0, w, h)
  }
}

export const factory_2: SceneConfig = {
  name: 'Server Hall', mood: 'Underneath the hum, something vast is thinking.',
  colors: ['#040810', '#001840', '#00aaff'],
  draw(ctx, w, h, t) {
    ctx.fillStyle = '#030608'; ctx.fillRect(0, 0, w, h)
    const floor = ctx.createLinearGradient(0, h * .7, 0, h); floor.addColorStop(0, '#060c14'); floor.addColorStop(1, '#030810'); ctx.fillStyle = floor; ctx.fillRect(0, h * .7, w, h)
    for (let r = 0; r < 5; r++) { const rx = w * (.05 + r * .18); ctx.fillStyle = '#0c1828'; ctx.fillRect(rx, h * .08, w * .12, h * .65); ctx.strokeStyle = 'rgba(0,120,200,.4)'; ctx.lineWidth = 1; ctx.strokeRect(rx, h * .08, w * .12, h * .65); for (let row = 0; row < 8; row++) for (let col = 0; col < 3; col++) { const lx = rx + 8 + col * 18, ly = h * .12 + row * h * .07, on = Math.sin(lx * .3 + ly * .5 + t * .5 + r) > 0; ctx.beginPath(); ctx.arc(lx, ly, 3, 0, Math.PI * 2); ctx.fillStyle = on ? (row % 3 === 0 ? 'rgba(0,220,255,.9)' : 'rgba(0,180,80,.9)') : 'rgba(30,40,60,.4)'; ctx.fill() } }
    const cg3 = ctx.createLinearGradient(0, 0, 0, h * .1); cg3.addColorStop(0, 'rgba(0,100,160,.5)'); cg3.addColorStop(1, 'transparent'); ctx.fillStyle = cg3; ctx.fillRect(0, 0, w, h * .1)
    const v = ctx.createRadialGradient(w / 2, h / 2, h * .2, w / 2, h / 2, h * .92); v.addColorStop(0, 'transparent'); v.addColorStop(1, 'rgba(0,0,0,.8)'); ctx.fillStyle = v; ctx.fillRect(0, 0, w, h)
  }
}

export const factory_3: SceneConfig = {
  name: 'Rail Yard Dusk', mood: 'Even the heaviest things can be moved if you know how.',
  colors: ['#100808', '#303018', '#a08820'],
  draw(ctx, w, h, t) {
    const sky = ctx.createLinearGradient(0, 0, 0, h * .5); sky.addColorStop(0, '#0c0606'); sky.addColorStop(.5, '#1e1408'); sky.addColorStop(1, '#3a2808'); ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h * .5)
    const sg5 = ctx.createRadialGradient(w * .3, h * .55, 0, w * .3, h * .55, w * .5); sg5.addColorStop(0, 'rgba(200,120,30,.35)'); sg5.addColorStop(.4, 'rgba(150,80,10,.15)'); sg5.addColorStop(1, 'transparent'); ctx.fillStyle = sg5; ctx.fillRect(0, 0, w, h)
    const ground2 = ctx.createLinearGradient(0, h * .5, 0, h); ground2.addColorStop(0, '#1a1808'); ground2.addColorStop(1, '#0e0e04'); ctx.fillStyle = ground2; ctx.fillRect(0, h * .52, w, h)
    for (let r = 0; r < 5; r++) { const ry = h * (.55 + r * .04), vp = w * .4; ctx.strokeStyle = `rgba(${80 + r * 8},${70 + r * 6},${30 + r * 4},.7)`; ctx.lineWidth = 2 - r * .3; ctx.beginPath(); ctx.moveTo(0, ry); ctx.lineTo(vp, h * .53); ctx.moveTo(w, ry); ctx.lineTo(vp, h * .53); ctx.stroke() }
    const carColors = ['#1e2010', '#201410', '#181814', '#1a1010', '#141a10']
    for (let i = 0; i < 4; i++) { const cx = w * (.05 + i * .24), cy = h * .52; ctx.fillStyle = carColors[i % 5]; ctx.fillRect(cx, cy - h * .2, w * .2, h * .2); ctx.strokeStyle = 'rgba(100,90,60,.4)'; ctx.lineWidth = 1; ctx.strokeRect(cx, cy - h * .2, w * .2, h * .2) }
    for (let i = 0; i < 30; i++) { const dx = (i * 1373 + t * 6) % w, dy = h * .2 + (i * 897 + t * 3) % (h * .35); ctx.beginPath(); ctx.arc(dx, dy, .6, 0, Math.PI * 2); ctx.fillStyle = `rgba(180,160,100,${.07 + Math.sin(t + i) * .03})`; ctx.fill() }
    const v = ctx.createRadialGradient(w / 2, h / 2, h * .22, w / 2, h / 2, h * .9); v.addColorStop(0, 'transparent'); v.addColorStop(1, 'rgba(0,0,0,.8)'); ctx.fillStyle = v; ctx.fillRect(0, 0, w, h)
  }
}

export const factory_4: SceneConfig = {
  name: 'The Last Radio Tower', mood: 'Something is still broadcasting. Someone is still listening.',
  colors: ['#060814', '#1a1a30', '#cc4488'],
  draw(ctx, w, h, t) {
    const sky = ctx.createLinearGradient(0, 0, 0, h * .6); sky.addColorStop(0, '#030508'); sky.addColorStop(.5, '#0e0e20'); sky.addColorStop(1, '#1a1428'); ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h * .6)
    for (let i = 0; i < 80; i++) { const sx = (i * 2347) % w, sy = (i * 1847) % (h * .55), a = .12 + Math.sin(t * .28 + i * .65) * .1; ctx.beginPath(); ctx.arc(sx, sy, .35 + .3 * (i % 3), 0, Math.PI * 2); ctx.fillStyle = `rgba(200,210,230,${a})`; ctx.fill() }
    const tx = w * .5; ctx.fillStyle = '#1a1828'; ctx.fillRect(tx - 4, h * .08, 8, h * .6); for (let l = 0; l < 8; l++) { const ly = h * .08 + l * h * .07, lw = 30 + l * 5; ctx.strokeStyle = 'rgba(120,110,160,.5)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(tx - lw, ly); ctx.lineTo(tx + lw, ly); ctx.stroke() }
    ctx.beginPath(); ctx.arc(tx, h * .08, 6, 0, Math.PI * 2); ctx.fillStyle = `rgba(200,60,130,${.7 + Math.sin(t * 2) * .3})`; ctx.fill()
    for (let ring = 0; ring < 4; ring++) { const rr = (ring * 40 + ((t * 25) % 160)), ra = Math.max(0, 1 - rr / 160) * .35; ctx.strokeStyle = `rgba(200,60,130,${ra})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.arc(tx, h * .08, rr, 0, Math.PI * 2); ctx.stroke() }
    const ground3 = ctx.createLinearGradient(0, h * .6, 0, h); ground3.addColorStop(0, '#14121e'); ground3.addColorStop(1, '#0a0814'); ctx.fillStyle = ground3; ctx.fillRect(0, h * .62, w, h)
    const v = ctx.createRadialGradient(w / 2, h / 2, h * .22, w / 2, h / 2, h * .9); v.addColorStop(0, 'transparent'); v.addColorStop(1, 'rgba(0,0,0,.78)'); ctx.fillStyle = v; ctx.fillRect(0, 0, w, h)
  }
}
