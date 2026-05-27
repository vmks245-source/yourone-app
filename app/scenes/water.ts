import type { SceneConfig } from './types'

// ─── OCEAN ───────────────────────────────────────────────────────────────────

export const ocean_0: SceneConfig = {
  name: 'Misty Ocean at Dawn', mood: 'Still on the surface, infinite beneath — that is you.',
  colors: ['#1a2a4a', '#4a7a9b', '#e8dcc8'],
  draw(ctx, w, h, t) {
    const sky = ctx.createLinearGradient(0, 0, 0, h * .5)
    sky.addColorStop(0, '#0d1929'); sky.addColorStop(.6, '#2d4a6b'); sky.addColorStop(1, '#c8a882')
    ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h * .5)
    const hg = ctx.createRadialGradient(w * .5, h * .5, 0, w * .5, h * .5, w * .6)
    hg.addColorStop(0, 'rgba(255,180,80,.3)'); hg.addColorStop(1, 'transparent')
    ctx.fillStyle = hg; ctx.fillRect(0, 0, w, h)
    for (let i = 0; i < 5; i++) { const fy = h * .35 + i * 20; const fog = ctx.createRadialGradient(w * .5, fy, 0, w * .5, fy, w * (.6 + i * .1)); fog.addColorStop(0, `rgba(200,210,220,${.06 - i * .01})`); fog.addColorStop(1, 'transparent'); ctx.fillStyle = fog; ctx.fillRect(0, 0, w, h) }
    for (let wave = 0; wave < 6; wave++) { const wy = h * (.5 + wave * .08), wc = ctx.createLinearGradient(0, wy, 0, wy + 60); wc.addColorStop(0, `rgba(${30 + wave * 10},${80 + wave * 15},${120 + wave * 10},${.8 - wave * .1})`); wc.addColorStop(1, 'rgba(20,60,100,.9)'); ctx.fillStyle = wc; ctx.beginPath(); ctx.moveTo(0, h); ctx.lineTo(0, wy); for (let x = 0; x <= w; x += 4) { const amp = 3 - wave * .3; ctx.lineTo(x, wy + Math.sin(x * .015 + t * (.4 - wave * .05) + wave) * amp + Math.sin(x * .03 + t * .7) * amp * .5) } ctx.lineTo(w, h); ctx.closePath(); ctx.fill() }
    const mist = ctx.createLinearGradient(0, h * .46, 0, h * .58); mist.addColorStop(0, 'transparent'); mist.addColorStop(.5, 'rgba(180,200,220,.15)'); mist.addColorStop(1, 'transparent'); ctx.fillStyle = mist; ctx.fillRect(0, h * .46, w, h * .12)
    for (let i = 0; i < 30; i++) { const sx = (i * 237) % w, sy = (i * 89) % (h * .3), sa = .5 * Math.max(0, 1 - sy / (h * .3)); ctx.beginPath(); ctx.arc(sx, sy, .8, 0, Math.PI * 2); ctx.fillStyle = `rgba(255,255,255,${sa})`; ctx.fill() }
    const v = ctx.createRadialGradient(w / 2, h / 2, h * .25, w / 2, h / 2, h * .9); v.addColorStop(0, 'transparent'); v.addColorStop(1, 'rgba(0,0,0,.65)'); ctx.fillStyle = v; ctx.fillRect(0, 0, w, h)
  }
}

export const ocean_1: SceneConfig = {
  name: 'Midnight Surge', mood: 'The deep calls to those brave enough to listen.',
  colors: ['#020610', '#04122a', '#1a4a8a'],
  draw(ctx, w, h, t) {
    const sky = ctx.createLinearGradient(0, 0, 0, h * .5); sky.addColorStop(0, '#010308'); sky.addColorStop(.7, '#030a18'); sky.addColorStop(1, '#060e22'); ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h * .5)
    for (let i = 0; i < 200; i++) { const sx = (i * 2347) % w, sy = (i * 1847) % (h * .48), a = .18 + Math.sin(t * .3 + i * .6) * .14; ctx.beginPath(); ctx.arc(sx, sy, .35 + .35 * (i % 3), 0, Math.PI * 2); ctx.fillStyle = `rgba(210,225,255,${a})`; ctx.fill() }
    ctx.beginPath(); ctx.arc(w * .8, h * .1, 28, 0, Math.PI * 2); ctx.fillStyle = 'rgba(228,235,255,.92)'; ctx.fill()
    const mg = ctx.createRadialGradient(w * .8, h * .1, 0, w * .8, h * .1, 120); mg.addColorStop(0, 'rgba(180,200,255,.22)'); mg.addColorStop(1, 'transparent'); ctx.fillStyle = mg; ctx.fillRect(0, 0, w, h)
    ctx.fillStyle = 'rgba(200,215,255,.12)'; ctx.fillRect(w * .78, h * .1, 4, h * .38)
    for (let wave = 0; wave < 8; wave++) { const wy = h * (.48 + wave * .065), r = 20 + wave * 8, g = 50 + wave * 10, b = 100 + wave * 12; ctx.fillStyle = `rgba(${r},${g},${b},${.75 + wave * .025})`; ctx.beginPath(); ctx.moveTo(0, h); ctx.lineTo(0, wy); for (let x = 0; x <= w; x += 4) ctx.lineTo(x, wy + Math.sin(x * .018 + t * (.35 - wave * .04) + wave * 1.2) * (4 - wave * .3) + Math.sin(x * .035 + t * .65) * (2 - wave * .15)); ctx.lineTo(w, h); ctx.closePath(); ctx.fill() }
    const v = ctx.createRadialGradient(w / 2, h / 2, h * .28, w / 2, h / 2, h * .9); v.addColorStop(0, 'transparent'); v.addColorStop(1, 'rgba(0,0,0,.8)'); ctx.fillStyle = v; ctx.fillRect(0, 0, w, h)
  }
}

export const ocean_2: SceneConfig = {
  name: 'Bioluminescent Tide', mood: 'You carry light that others cannot see. It finds its way out.',
  colors: ['#010408', '#001828', '#00e8c8'],
  draw(ctx, w, h, t) {
    ctx.fillStyle = '#010306'; ctx.fillRect(0, 0, w, h)
    for (let i = 0; i < 150; i++) { const sx = (i * 2347) % w, sy = (i * 1847) % (h * .42), a = .12 + Math.sin(t * .25 + i * .55) * .1; ctx.beginPath(); ctx.arc(sx, sy, .35, 0, Math.PI * 2); ctx.fillStyle = `rgba(200,215,255,${a})`; ctx.fill() }
    for (let wave = 0; wave < 6; wave++) { const wy = h * (.45 + wave * .08); ctx.fillStyle = `rgba(0,${15 + wave * 6},${25 + wave * 8},${.7 + wave * .04})`; ctx.beginPath(); ctx.moveTo(0, h); ctx.lineTo(0, wy); for (let x = 0; x <= w; x += 4) ctx.lineTo(x, wy + Math.sin(x * .016 + t * (.38 - wave * .05) + wave) * (4 - wave * .35)); ctx.lineTo(w, h); ctx.closePath(); ctx.fill() }
    for (let i = 0; i < 60; i++) { const bx = (i * 1453 + Math.sin(t * .08 + i) * 50) % w, by = h * .5 + (i * 997) % (h * .45) + Math.sin(t * .2 + i * 1.3) * 20, ba = .4 + Math.sin(t * (.6 + i * .03) + i * 1.7) * .35; if (ba > .12) { const bg = ctx.createRadialGradient(bx, by, 0, bx, by, 12); bg.addColorStop(0, `rgba(0,255,210,${ba * .9})`); bg.addColorStop(.4, `rgba(0,200,180,${ba * .4})`); bg.addColorStop(1, 'transparent'); ctx.fillStyle = bg; ctx.fillRect(bx - 12, by - 12, 24, 24); ctx.beginPath(); ctx.arc(bx, by, 1.5, 0, Math.PI * 2); ctx.fillStyle = `rgba(180,255,240,${ba})`; ctx.fill() } }
    for (let i = 0; i < 30; i++) { const fx = (i * 1373 + t * 14) % w, fy = h * .48 + Math.sin(t * .25 + i) * h * .04; ctx.beginPath(); ctx.moveTo(fx, fy); for (let j = 1; j < 6; j++) ctx.lineTo(fx + Math.sin(t * .5 + i + j) * j * 3, fy + j * 4 + Math.sin(t + i + j * 2) * 2); ctx.strokeStyle = `rgba(0,220,185,${.15 + Math.sin(t * .4 + i) * .08})`; ctx.lineWidth = 1; ctx.stroke() }
    const v = ctx.createRadialGradient(w / 2, h / 2, h * .28, w / 2, h / 2, h * .9); v.addColorStop(0, 'transparent'); v.addColorStop(1, 'rgba(0,0,0,.78)'); ctx.fillStyle = v; ctx.fillRect(0, 0, w, h)
  }
}

export const ocean_3: SceneConfig = {
  name: 'Storm Horizon', mood: 'You see the wave before it comes. That is power.',
  colors: ['#0a0c10', '#1a2030', '#4060a0'],
  draw(ctx, w, h, t) {
    const sky = ctx.createLinearGradient(0, 0, 0, h * .52); sky.addColorStop(0, '#060810'); sky.addColorStop(.5, '#0e1220'); sky.addColorStop(1, '#182030'); ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h * .52)
    for (let c = 0; c < 7; c++) { const cx = ((c * w / 5 + Math.sin(t * .1 + c) * 35) % (w + 200)) - 100, cy = h * (.06 + c * .07), cr = 110 + c * 20, cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, cr); cg.addColorStop(0, 'rgba(25,32,50,.95)'); cg.addColorStop(1, 'transparent'); ctx.fillStyle = cg; ctx.fillRect(cx - cr, cy - cr * .6, cr * 2, cr * 1.3) }
    const flash = Math.max(0, Math.sin(t * .6) * Math.sin(t * 2.8)); if (flash > .65) { ctx.fillStyle = `rgba(200,210,255,${(flash - .65) * .35})`; ctx.fillRect(0, 0, w, h) }
    for (let wave = 0; wave < 7; wave++) { const wy = h * (.5 + wave * .07), r = 15 + wave * 5, g = 30 + wave * 8, b = 70 + wave * 10; ctx.fillStyle = `rgba(${r},${g},${b},${.85 - wave * .08})`; ctx.beginPath(); ctx.moveTo(0, h); ctx.lineTo(0, wy); for (let x = 0; x <= w; x += 4) ctx.lineTo(x, wy + Math.sin(x * .02 + t * (.5 - wave * .06) + wave) * (5 - wave * .4) + Math.sin(x * .04 + t * .9) * (3 - wave * .3)); ctx.lineTo(w, h); ctx.closePath(); ctx.fill() }
    for (let i = 0; i < 60; i++) { const rx = (i * 167 + t * 250) % w, ry = (i * 113 + t * 420) % h; ctx.beginPath(); ctx.moveTo(rx, ry); ctx.lineTo(rx - 1, ry + 12); ctx.strokeStyle = 'rgba(160,175,210,.2)'; ctx.lineWidth = .75; ctx.stroke() }
    const v = ctx.createRadialGradient(w / 2, h / 2, h * .25, w / 2, h / 2, h * .9); v.addColorStop(0, 'transparent'); v.addColorStop(1, 'rgba(0,0,0,.8)'); ctx.fillStyle = v; ctx.fillRect(0, 0, w, h)
  }
}

export const ocean_4: SceneConfig = {
  name: 'Coral Shallows', mood: 'Beauty lives in the hidden places. You always find it.',
  colors: ['#001822', '#004050', '#00c8a8'],
  draw(ctx, w, h, t) {
    const sky = ctx.createLinearGradient(0, 0, 0, h * .42); sky.addColorStop(0, '#001015'); sky.addColorStop(1, '#002030'); ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h * .42)
    const waterFull = ctx.createLinearGradient(0, h * .42, 0, h); waterFull.addColorStop(0, '#003848'); waterFull.addColorStop(.5, '#002838'); waterFull.addColorStop(1, '#001828'); ctx.fillStyle = waterFull; ctx.fillRect(0, h * .42, w, h)
    for (let r = 0; r < 8; r++) { const ry = h * (.42 + r * .065), rx = ctx.createLinearGradient(0, ry - 5, 0, ry + 5); rx.addColorStop(0, 'transparent'); rx.addColorStop(.5, `rgba(0,200,180,${.08 - r * .008})`); rx.addColorStop(1, 'transparent'); ctx.fillStyle = rx; ctx.fillRect(0, ry - 5, w, 10) }
    const coralColors = ['rgba(255,80,80,.8)', 'rgba(255,140,60,.8)', 'rgba(220,60,180,.8)', 'rgba(80,220,160,.8)', 'rgba(255,200,60,.8)']
    for (let i = 0; i < 25; i++) { const cx = (i * 1373) % w, cy = h * (.78 + (i * 567) % (h * .18)), cr = 8 + (i % 5) * 6; ctx.fillStyle = coralColors[i % 5]; for (let b = 0; b < 5; b++) { const bx = cx + Math.cos(b / 5 * Math.PI * 2) * cr * (.5 + Math.sin(t * .4 + i + b) * .1), by = cy - b * 5; ctx.beginPath(); ctx.arc(bx, by, 3 + b * 1.5, 0, Math.PI * 2); ctx.fill() } }
    for (let i = 0; i < 18; i++) { const sx = (i * 1453 + Math.sin(t * .2 + i) * 60) % w, sy = h * .55 + (i * 897) % (h * .35), sa = .25 + Math.sin(t * (.5 + i * .04) + i * 1.4) * .2; if (sa > .08) { ctx.beginPath(); ctx.arc(sx, sy, 2, 0, Math.PI * 2); ctx.fillStyle = `rgba(0,255,200,${sa})`; ctx.fill() } }
    for (let i = 0; i < 12; i++) { const fx = (i * 1373 + t * 20) % w, fy = h * (.55 + (i * 567) % (h * .35)); ctx.beginPath(); ctx.moveTo(fx, fy); ctx.bezierCurveTo(fx + Math.sin(t * .5 + i) * 15, fy - 20, fx + Math.sin(t * .5 + i + 1) * 12, fy - 40, fx + Math.sin(t * .5 + i + 2) * 10, fy - 60); ctx.strokeStyle = `rgba(0,200,160,${.3 + Math.sin(t * .4 + i) * .1})`; ctx.lineWidth = 2; ctx.stroke() }
    const v = ctx.createRadialGradient(w / 2, h / 2, h * .2, w / 2, h / 2, h * .9); v.addColorStop(0, 'transparent'); v.addColorStop(1, 'rgba(0,0,0,.72)'); ctx.fillStyle = v; ctx.fillRect(0, 0, w, h)
  }
}

// ─── ARCTIC ──────────────────────────────────────────────────────────────────

export const arctic_0: SceneConfig = {
  name: 'Aurora at Midnight', mood: 'You find peace in the vast and silent. Clarity comes to you in stillness.',
  colors: ['#0a1428', '#1a3a5a', '#88ccff'],
  draw(ctx, w, h, t) {
    const sky = ctx.createLinearGradient(0, 0, 0, h * .65); sky.addColorStop(0, '#020818'); sky.addColorStop(.5, '#0a1a38'); sky.addColorStop(1, '#0d2245'); ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h * .65)
    for (let a = 0; a < 3; a++) { const ay = h * (.15 + a * .1), aw = w * .8, ax = w * .1 + Math.sin(t * .2 + a) * w * .05; const aColors = [['rgba(0,255,150,', 'rgba(0,200,255,'], ['rgba(100,0,255,', 'rgba(0,255,200,'], ['rgba(0,150,255,', 'rgba(150,0,255,']]; for (let x = 0; x < aw; x += 2) { const wave = Math.sin(x * .01 + t * .3 + a * 2) * 30 + Math.sin(x * .02 + t * .5) * 15, alpha = Math.max(0, Math.sin(x / aw * Math.PI)) * .4; ctx.strokeStyle = aColors[a][0] + alpha + ')'; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(ax + x, ay + wave); ctx.lineTo(ax + x, ay + wave + 40 + Math.sin(x * .05) * 20); ctx.stroke() } }
    for (let i = 0; i < 60; i++) { const sx = (i * 237 + 17) % w, sy = (i * 131 + 31) % (h * .55), sa = .4 + Math.sin(t * .8 + i * .3) * .3; ctx.beginPath(); ctx.arc(sx, sy, .6 + Math.sin(i) * .4, 0, Math.PI * 2); ctx.fillStyle = `rgba(200,220,255,${sa})`; ctx.fill() }
    ctx.beginPath(); ctx.arc(w * .2, h * .15, 22, 0, Math.PI * 2); ctx.fillStyle = 'rgba(220,230,255,.95)'; ctx.fill()
    const ice = ctx.createLinearGradient(0, h * .65, 0, h); ice.addColorStop(0, '#c8e0f8'); ice.addColorStop(.3, '#a0c8e8'); ice.addColorStop(1, '#6898c8'); ctx.fillStyle = ice; ctx.fillRect(0, h * .65, w, h)
    for (let c = 0; c < 8; c++) { ctx.strokeStyle = 'rgba(255,255,255,.3)'; ctx.lineWidth = .5; ctx.beginPath(); ctx.moveTo(w * .1 + c * w * .12, h * .65); ctx.lineTo(w * .15 + c * w * .12 + Math.sin(c) * 20, h); ctx.stroke() }
    const v = ctx.createRadialGradient(w / 2, h / 2, h * .28, w / 2, h / 2, h * .88); v.addColorStop(0, 'transparent'); v.addColorStop(1, 'rgba(0,0,0,.72)'); ctx.fillStyle = v; ctx.fillRect(0, 0, w, h)
  }
}

export const arctic_1: SceneConfig = {
  name: 'Polar Day', mood: 'A sun that never sets teaches you something about endurance.',
  colors: ['#b0d8f8', '#e0f0ff', '#fffce8'],
  draw(ctx, w, h, t) {
    const sky = ctx.createLinearGradient(0, 0, 0, h * .6); sky.addColorStop(0, '#88c0e8'); sky.addColorStop(.5, '#b8d8f8'); sky.addColorStop(1, '#d8eefc'); ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h * .6)
    const sx = w * .5, sy = h * .28, sg = ctx.createRadialGradient(sx, sy, 0, sx, sy, 200); sg.addColorStop(0, 'rgba(255,255,240,.95)'); sg.addColorStop(.2, 'rgba(255,245,200,.6)'); sg.addColorStop(.6, 'rgba(255,230,150,.15)'); sg.addColorStop(1, 'transparent'); ctx.fillStyle = sg; ctx.fillRect(0, 0, w, h); ctx.beginPath(); ctx.arc(sx, sy, 48, 0, Math.PI * 2); ctx.fillStyle = 'rgba(255,255,245,.96)'; ctx.fill()
    for (let i = 0; i < 5; i++) { const cx = ((i * w / 4 + t * 4) % (w + 200)) - 100, cy = h * (.08 + i * .06), cr = 70 + i * 25, cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, cr); cg.addColorStop(0, 'rgba(255,255,255,.82)'); cg.addColorStop(.6, 'rgba(255,255,255,.35)'); cg.addColorStop(1, 'transparent'); ctx.fillStyle = cg; ctx.fillRect(cx - cr, cy - cr * .5, cr * 2, cr) }
    const ice2 = ctx.createLinearGradient(0, h * .6, 0, h); ice2.addColorStop(0, '#e8f4fc'); ice2.addColorStop(.3, '#f0f8ff'); ice2.addColorStop(1, '#ffffff'); ctx.fillStyle = ice2; ctx.fillRect(0, h * .62, w, h)
    for (let i = 0; i < 12; i++) { const dx = (i * 1373) % w, dy = h * (.62 + (i * 567) % (h * .3)); ctx.beginPath(); ctx.arc(dx, dy, 4 + (i % 3) * 3, 0, Math.PI * 2); ctx.fillStyle = 'rgba(200,228,248,.6)'; ctx.fill() }
    const v = ctx.createRadialGradient(w / 2, h / 2, h * .3, w / 2, h / 2, h * .88); v.addColorStop(0, 'transparent'); v.addColorStop(1, 'rgba(0,0,0,.35)'); ctx.fillStyle = v; ctx.fillRect(0, 0, w, h)
  }
}

export const arctic_2: SceneConfig = {
  name: 'Blizzard Wall', mood: 'White is not absence. It is the full presence of everything at once.',
  colors: ['#0e1420', '#283848', '#c8d8e8'],
  draw(ctx, w, h, t) {
    const sky = ctx.createLinearGradient(0, 0, 0, h); sky.addColorStop(0, '#080e18'); sky.addColorStop(.5, '#101e2c'); sky.addColorStop(1, '#1a2a3a'); ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h)
    for (let layer = 0; layer < 4; layer++) { const density = 40 + layer * 30, size = .5 + layer * .4; for (let i = 0; i < density; i++) { const sx = (i * (2347 - layer * 300) + t * (280 + layer * 80) + Math.sin(t * .4 + i * .2) * 25) % (w + 80) - 40, sy = (i * (1847 - layer * 200) + t * (200 + layer * 60)) % (h + 40) - 20, sa = (.3 + layer * .12) * (.6 + Math.sin(t * .5 + i) * .3); ctx.beginPath(); ctx.arc(sx, sy, size, 0, Math.PI * 2); ctx.fillStyle = `rgba(230,238,248,${sa})`; ctx.fill() } }
    const ground = ctx.createLinearGradient(0, h * .65, 0, h); ground.addColorStop(0, '#a8bcd0'); ground.addColorStop(.4, '#c8d8e8'); ground.addColorStop(1, '#e0eaf4'); ctx.fillStyle = ground; ctx.fillRect(0, h * .68, w, h)
    const fog = ctx.createLinearGradient(0, h * .5, 0, h * .72); fog.addColorStop(0, 'transparent'); fog.addColorStop(.5, 'rgba(190,210,228,.3)'); fog.addColorStop(1, 'transparent'); ctx.fillStyle = fog; ctx.fillRect(0, h * .5, w, h * .22)
    const v = ctx.createRadialGradient(w / 2, h / 2, h * .18, w / 2, h / 2, h * .92); v.addColorStop(0, 'transparent'); v.addColorStop(1, 'rgba(0,0,0,.78)'); ctx.fillStyle = v; ctx.fillRect(0, 0, w, h)
  }
}

export const arctic_3: SceneConfig = {
  name: 'Ice Cathedral', mood: 'Some places are so still they feel sacred. You know this feeling.',
  colors: ['#060c18', '#0e2840', '#60a8d8'],
  draw(ctx, w, h, t) {
    const sky = ctx.createLinearGradient(0, 0, 0, h * .55); sky.addColorStop(0, '#030810'); sky.addColorStop(.6, '#0a1e34'); sky.addColorStop(1, '#102840'); ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h * .55)
    for (let a = 0; a < 2; a++) { const ay = h * (.18 + a * .12), aw = w * .9, ax = w * .05 + Math.sin(t * .15 + a) * w * .04; for (let x = 0; x < aw; x += 2) { const wave = Math.sin(x * .008 + t * .2 + a * 3) * 25 + Math.sin(x * .018 + t * .4) * 12, alpha = Math.max(0, Math.sin(x / aw * Math.PI)) * .35; ctx.strokeStyle = `rgba(${a ? 0 : 60},${a ? 180 : 220},255,${alpha})`; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(ax + x, ay + wave); ctx.lineTo(ax + x, ay + wave + 30); ctx.stroke() } }
    for (let i = 0; i < 80; i++) { const sx = (i * 2347) % w, sy = (i * 1847) % (h * .5), a = .15 + Math.sin(t * .3 + i * .55) * .12; ctx.beginPath(); ctx.arc(sx, sy, .35 + .3 * (i % 3), 0, Math.PI * 2); ctx.fillStyle = `rgba(200,225,255,${a})`; ctx.fill() }
    ctx.beginPath(); ctx.arc(w * .15, h * .12, 18, 0, Math.PI * 2); ctx.fillStyle = 'rgba(218,228,248,.9)'; ctx.fill()
    for (let i = 0; i < 8; i++) { const ix = (i * w / 7), iy = h * .55, iw = 20 + (i % 3) * 15, ih = 80 + (i % 4) * 40; ctx.fillStyle = `rgba(${80 + i * 8},${130 + i * 10},${180 + i * 8},.7)`; ctx.beginPath(); ctx.moveTo(ix - iw / 2, iy + ih); ctx.lineTo(ix, iy); ctx.lineTo(ix + iw / 2, iy + ih); ctx.closePath(); ctx.fill() }
    const ice3 = ctx.createLinearGradient(0, h * .65, 0, h); ice3.addColorStop(0, '#5090c8'); ice3.addColorStop(.4, '#80b8e0'); ice3.addColorStop(1, '#a8d0f0'); ctx.fillStyle = ice3; ctx.fillRect(0, h * .68, w, h)
    const v = ctx.createRadialGradient(w / 2, h / 2, h * .25, w / 2, h / 2, h * .9); v.addColorStop(0, 'transparent'); v.addColorStop(1, 'rgba(0,0,0,.75)'); ctx.fillStyle = v; ctx.fillRect(0, 0, w, h)
  }
}

export const arctic_4: SceneConfig = {
  name: 'Solstice Fire', mood: 'Even the coldest night has its fire. You are proof of that.',
  colors: ['#060408', '#1a0820', '#ff4080'],
  draw(ctx, w, h, t) {
    const sky = ctx.createLinearGradient(0, 0, 0, h * .6); sky.addColorStop(0, '#030208'); sky.addColorStop(.4, '#0e0618'); sky.addColorStop(.8, '#2a0a30'); sky.addColorStop(1, '#4a0a28'); ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h * .6)
    for (let a = 0; a < 4; a++) { const ay = h * (.1 + a * .09), aw = w * .85; for (let x = 0; x < aw; x += 2) { const wave = Math.sin(x * .009 + t * .25 + a * 2.2) * 28 + Math.sin(x * .02 + t * .45) * 14, alpha = Math.max(0, Math.sin(x / aw * Math.PI)) * .45; const aColors4 = ['rgba(255,40,120,', 'rgba(200,0,255,', 'rgba(255,100,0,', 'rgba(0,180,255,']; ctx.strokeStyle = aColors4[a] + alpha + ')'; ctx.lineWidth = 9; ctx.beginPath(); ctx.moveTo(w * .075 + x, ay + wave); ctx.lineTo(w * .075 + x, ay + wave + 45); ctx.stroke() } }
    for (let i = 0; i < 100; i++) { const sx = (i * 2347) % w, sy = (i * 1847) % (h * .55), a = .15 + Math.sin(t * .3 + i * .6) * .12; ctx.beginPath(); ctx.arc(sx, sy, .35 + .3 * (i % 3), 0, Math.PI * 2); ctx.fillStyle = `rgba(210,220,255,${a})`; ctx.fill() }
    const fx = w * .5, fy = h * .62; for (let i = 0; i < 8; i++) { const fa = t * 3 + i * Math.PI / 4, fr = 30 + Math.sin(t * 2.5 + i) * 15, fxp = fx + Math.cos(fa) * fr, fyp = fy + Math.sin(fa) * fr * .3, fgr = ctx.createRadialGradient(fxp, fyp, 0, fxp, fyp, 40); fgr.addColorStop(0, `rgba(255,80,160,${.6 + Math.sin(t * 3 + i) * .2})`); fgr.addColorStop(1, 'transparent'); ctx.fillStyle = fgr; ctx.fillRect(fxp - 40, fyp - 40, 80, 80) }
    const ice4 = ctx.createLinearGradient(0, h * .62, 0, h); ice4.addColorStop(0, '#1a0a20'); ice4.addColorStop(.4, '#0e0618'); ice4.addColorStop(1, '#060408'); ctx.fillStyle = ice4; ctx.fillRect(0, h * .65, w, h)
    const v = ctx.createRadialGradient(w / 2, h / 2, h * .28, w / 2, h / 2, h * .9); v.addColorStop(0, 'transparent'); v.addColorStop(1, 'rgba(0,0,0,.78)'); ctx.fillStyle = v; ctx.fillRect(0, 0, w, h)
  }
}

// ─── CLOUD SEA ───────────────────────────────────────────────────────────────

export const cloud_sea_0: SceneConfig = {
  name: 'Cloud Sea at Sunset', mood: 'You exist above the noise — weightless, dreaming, untouchable.',
  colors: ['#1a0a2e', '#8B1A5A', '#FFB8D0'],
  draw(ctx, w, h, t) {
    const sky = ctx.createLinearGradient(0, 0, 0, h); sky.addColorStop(0, '#0d0520'); sky.addColorStop(.3, '#3a0a4a'); sky.addColorStop(.6, '#8B1A5A'); sky.addColorStop(1, '#e8607a'); ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h)
    for (let i = 0; i < 40; i++) { const sx = (i * 237) % w, sy = (i * 131) % (h * .4); ctx.beginPath(); ctx.arc(sx, sy, .7, 0, Math.PI * 2); ctx.fillStyle = `rgba(255,240,255,${.3 + Math.sin(t + i) * .2})`; ctx.fill() }
    const sg2 = ctx.createRadialGradient(w * .5, h * .85, 0, w * .5, h * .85, w * .6); sg2.addColorStop(0, 'rgba(255,160,80,.4)'); sg2.addColorStop(.3, 'rgba(255,80,120,.2)'); sg2.addColorStop(1, 'transparent'); ctx.fillStyle = sg2; ctx.fillRect(0, 0, w, h)
    for (let layer = 0; layer < 5; layer++) { const ly = h * (.5 + layer * .08), drift = Math.sin(t * .1 + layer) * 15; for (let c = 0; c < 8; c++) { const cx = (c * w / 6 + drift + layer * 30) % (w + 100) - 50, cy = ly + Math.sin(c * 1.7) * 15, cr = 60 + Math.sin(c * .8) * 25, cc = ctx.createRadialGradient(cx, cy, 0, cx, cy, cr); const r = 220 + layer * 5, g = 180 - layer * 15, b = 200 - layer * 10; cc.addColorStop(0, `rgba(${r},${g},${b},${.6 + layer * .08})`); cc.addColorStop(1, 'transparent'); ctx.fillStyle = cc; ctx.fillRect(cx - cr, cy - cr, cr * 2, cr * 2) } }
    for (let wi = 0; wi < 6; wi++) { const wx = (wi * w / 5 + t * 8 + Math.sin(t * .2 + wi) * 30) % (w + 200) - 100, wy = h * (.4 + wi * .05) + Math.sin(t * .15 + wi) * 20; ctx.strokeStyle = `rgba(255,200,220,${.1 + Math.sin(t * .3 + wi) * .05})`; ctx.lineWidth = 20; ctx.beginPath(); ctx.moveTo(wx, wy); ctx.lineTo(wx + 80, wy + Math.sin(t + wi) * 8); ctx.stroke() }
    const v = ctx.createRadialGradient(w / 2, h / 2, h * .28, w / 2, h / 2, h * .88); v.addColorStop(0, 'transparent'); v.addColorStop(1, 'rgba(0,0,0,.62)'); ctx.fillStyle = v; ctx.fillRect(0, 0, w, h)
  }
}

export const cloud_sea_1: SceneConfig = {
  name: 'Above the World', mood: 'The view from here changes everything. So do you.',
  colors: ['#050a18', '#0a2040', '#80c0f8'],
  draw(ctx, w, h, t) {
    const sky = ctx.createLinearGradient(0, 0, 0, h * .55); sky.addColorStop(0, '#020810'); sky.addColorStop(.5, '#081828'); sky.addColorStop(1, '#102040'); ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h * .55)
    for (let i = 0; i < 120; i++) { const sx = (i * 2347) % w, sy = (i * 1847) % (h * .48), a = .2 + Math.sin(t * .3 + i * .65) * .16; ctx.beginPath(); ctx.arc(sx, sy, .35 + .35 * (i % 3), 0, Math.PI * 2); ctx.fillStyle = `rgba(215,228,255,${a})`; ctx.fill() }
    ctx.beginPath(); ctx.arc(w * .7, h * .1, 30, 0, Math.PI * 2); ctx.fillStyle = 'rgba(225,235,255,.9)'; ctx.fill()
    for (let layer = 0; layer < 6; layer++) { const ly = h * (.52 + layer * .07), drift = Math.sin(t * .08 + layer * 1.2) * 20; for (let c = 0; c < 10; c++) { const cx = (c * w / 8 + drift + layer * 25) % (w + 120) - 60, cy = ly + Math.sin(c * 1.5) * 18, cr = 55 + Math.sin(c * .9) * 22, wb = 200 + layer * 8, wg = 218 + layer * 6; const cc = ctx.createRadialGradient(cx, cy, 0, cx, cy, cr); cc.addColorStop(0, `rgba(${wb},${wg},255,${.65 + layer * .06})`); cc.addColorStop(1, 'transparent'); ctx.fillStyle = cc; ctx.fillRect(cx - cr, cy - cr, cr * 2, cr * 2) } }
    const v = ctx.createRadialGradient(w / 2, h / 2, h * .25, w / 2, h / 2, h * .88); v.addColorStop(0, 'transparent'); v.addColorStop(1, 'rgba(0,0,0,.72)'); ctx.fillStyle = v; ctx.fillRect(0, 0, w, h)
  }
}

export const cloud_sea_2: SceneConfig = {
  name: 'Dawn Break', mood: 'The first light always comes. You know this more than most.',
  colors: ['#100828', '#e08040', '#ffd080'],
  draw(ctx, w, h, t) {
    const sky = ctx.createLinearGradient(0, 0, 0, h * .6); sky.addColorStop(0, '#080418'); sky.addColorStop(.3, '#280a28'); sky.addColorStop(.6, '#8a2a18'); sky.addColorStop(1, '#e08030'); ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h * .6)
    const sg3 = ctx.createRadialGradient(w * .5, h * .65, 0, w * .5, h * .65, w * .65); sg3.addColorStop(0, 'rgba(255,210,80,.55)'); sg3.addColorStop(.25, 'rgba(255,140,40,.3)'); sg3.addColorStop(.6, 'rgba(255,80,40,.1)'); sg3.addColorStop(1, 'transparent'); ctx.fillStyle = sg3; ctx.fillRect(0, 0, w, h)
    for (let i = 0; i < 50; i++) { const sx = (i * 2347) % w, sy = (i * 1847) % (h * .35), a = (.2 + Math.sin(t * .28 + i * .65) * .15) * (1 - sy / (h * .35)); ctx.beginPath(); ctx.arc(sx, sy, .4, 0, Math.PI * 2); ctx.fillStyle = `rgba(215,220,250,${a})`; ctx.fill() }
    for (let layer = 0; layer < 5; layer++) { const ly = h * (.55 + layer * .075), drift = Math.sin(t * .09 + layer * 1.4) * 18; for (let c = 0; c < 9; c++) { const cx = (c * w / 7 + drift + layer * 22) % (w + 110) - 55, cy = ly + Math.sin(c * 1.6) * 16, cr = 58 + Math.sin(c * .85) * 24, r = 255, g = 200 - layer * 15, b = 180 - layer * 20; const cc = ctx.createRadialGradient(cx, cy, 0, cx, cy, cr); cc.addColorStop(0, `rgba(${r},${g},${b},${.62 + layer * .07})`); cc.addColorStop(1, 'transparent'); ctx.fillStyle = cc; ctx.fillRect(cx - cr, cy - cr, cr * 2, cr * 2) } }
    const v = ctx.createRadialGradient(w / 2, h / 2, h * .25, w / 2, h / 2, h * .88); v.addColorStop(0, 'transparent'); v.addColorStop(1, 'rgba(0,0,0,.68)'); ctx.fillStyle = v; ctx.fillRect(0, 0, w, h)
  }
}

export const cloud_sea_3: SceneConfig = {
  name: 'Volcanic Arch', mood: 'Even the most turbulent landscape has its own terrible beauty.',
  colors: ['#0a0404', '#401010', '#ff6020'],
  draw(ctx, w, h, t) {
    const sky = ctx.createLinearGradient(0, 0, 0, h * .65); sky.addColorStop(0, '#060202'); sky.addColorStop(.35, '#200808'); sky.addColorStop(.7, '#481010'); sky.addColorStop(1, '#701a08'); ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h * .65)
    const vg = ctx.createRadialGradient(w * .5, h * .68, 0, w * .5, h * .68, w * .7); vg.addColorStop(0, 'rgba(255,120,20,.6)'); vg.addColorStop(.3, 'rgba(200,50,10,.25)'); vg.addColorStop(1, 'transparent'); ctx.fillStyle = vg; ctx.fillRect(0, 0, w, h)
    const smoke = ctx.createLinearGradient(0, 0, 0, h * .55); smoke.addColorStop(0, 'rgba(20,10,8,.55)'); smoke.addColorStop(1, 'transparent'); ctx.fillStyle = smoke; ctx.fillRect(0, 0, w, h * .55)
    for (let layer = 0; layer < 5; layer++) { const ly = h * (.52 + layer * .08), drift = Math.sin(t * .08 + layer * 1.3) * 18; for (let c = 0; c < 8; c++) { const cx = (c * w / 6 + drift + layer * 28) % (w + 110) - 55, cy = ly + Math.sin(c * 1.6) * 16, cr = 55 + Math.sin(c * .85) * 22, r = 80 + layer * 15, g = 30 + layer * 8, b = 20 + layer * 5; const cc = ctx.createRadialGradient(cx, cy, 0, cx, cy, cr); cc.addColorStop(0, `rgba(${r},${g},${b},${.55 + layer * .08})`); cc.addColorStop(1, 'transparent'); ctx.fillStyle = cc; ctx.fillRect(cx - cr, cy - cr, cr * 2, cr * 2) } }
    for (let i = 0; i < 35; i++) { const ex = (i * 1373 + t * 55 + Math.sin(t + i) * 30) % w, ey = h * (.55 + (i * 567 - t * 70 + 9999) % (h * .35)), ea = .25 + Math.sin(t * 2.5 + i) * .18; ctx.beginPath(); ctx.arc(ex, ey, .9, 0, Math.PI * 2); ctx.fillStyle = `rgba(255,${(120 + i % 60) | 0},20,${ea})`; ctx.fill() }
    const v = ctx.createRadialGradient(w / 2, h / 2, h * .22, w / 2, h / 2, h * .9); v.addColorStop(0, 'transparent'); v.addColorStop(1, 'rgba(0,0,0,.8)'); ctx.fillStyle = v; ctx.fillRect(0, 0, w, h)
  }
}

export const cloud_sea_4: SceneConfig = {
  name: 'The Infinite Float', mood: 'There are no edges here. Neither are there any in you.',
  colors: ['#0e0820', '#303060', '#d0c0ff'],
  draw(ctx, w, h, t) {
    const sky = ctx.createLinearGradient(0, 0, 0, h); sky.addColorStop(0, '#06040f'); sky.addColorStop(.3, '#120e24'); sky.addColorStop(.6, '#1e1840'); sky.addColorStop(1, '#2a205a'); ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h)
    for (let i = 0; i < 160; i++) { const sx = (i * 2347) % w, sy = (i * 1847) % h, a = .12 + Math.sin(t * (.18 + (i % 11) * .015) + i * .7) * .1; ctx.beginPath(); ctx.arc(sx, sy, .35 + .35 * (i % 3), 0, Math.PI * 2); ctx.fillStyle = `rgba(215,210,255,${a})`; ctx.fill() }
    for (let layer = 0; layer < 6; layer++) { const ly = h * (.35 + layer * .1), drift = Math.sin(t * .07 + layer * 1.5) * 22; for (let c = 0; c < 10; c++) { const cx = (c * w / 8 + drift + layer * 20) % (w + 120) - 60, cy = ly + Math.sin(c * 1.4) * 20, cr = 52 + Math.sin(c * .9) * 22, base = 160 + layer * 15; const cc = ctx.createRadialGradient(cx, cy, 0, cx, cy, cr); cc.addColorStop(0, `rgba(${base},${base - 10},255,${.45 + layer * .08})`); cc.addColorStop(1, 'transparent'); ctx.fillStyle = cc; ctx.fillRect(cx - cr, cy - cr, cr * 2, cr * 2) } }
    const v = ctx.createRadialGradient(w / 2, h / 2, h * .2, w / 2, h / 2, h * .92); v.addColorStop(0, 'transparent'); v.addColorStop(1, 'rgba(0,0,0,.75)'); ctx.fillStyle = v; ctx.fillRect(0, 0, w, h)
  }
}
