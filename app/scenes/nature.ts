import type { SceneConfig } from './types'

// ─── MEADOW ──────────────────────────────────────────────────────────────────

export const meadow_0: SceneConfig = {
  name: 'The Dew Hours', mood: 'You arrive before the world does. That quiet is yours.',
  colors: ['#050815', '#2a1555', '#c07080'],
  draw(ctx, w, h, t) {
    const sky = ctx.createLinearGradient(0, 0, 0, h * .65)
    sky.addColorStop(0, '#020610'); sky.addColorStop(.4, '#0d0628'); sky.addColorStop(.75, '#3a1448'); sky.addColorStop(1, '#b06070')
    ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h * .65)
    const hg = ctx.createRadialGradient(w * .5, h * .65, 0, w * .5, h * .65, w * .55)
    hg.addColorStop(0, 'rgba(190,100,140,.28)'); hg.addColorStop(1, 'transparent')
    ctx.fillStyle = hg; ctx.fillRect(0, 0, w, h)
    for (let i = 0; i < 70; i++) { const sx = (i * 2347) % w, sy = (i * 1847) % (h * .5), fade = Math.max(0, 1 - sy / (h * .38)), a = fade * (.35 + Math.sin(t * .4 + i) * .2); if (a > .02) { ctx.beginPath(); ctx.arc(sx, sy, .4 + .35 * (i % 3), 0, Math.PI * 2); ctx.fillStyle = `rgba(210,220,255,${a})`; ctx.fill() } }
    ctx.fillStyle = '#060412'; ctx.beginPath(); ctx.moveTo(0, h)
    for (let x = 0; x <= w; x += 5) ctx.lineTo(x, h * .63 + Math.sin(x * .004) * h * .04 + Math.sin(x * .013) * h * .015)
    ctx.lineTo(w, h); ctx.closePath(); ctx.fill()
    for (let m = 0; m < 5; m++) { const my = h * (.63 + m * .075) + Math.sin(t * .07 + m) * 9, mg = ctx.createLinearGradient(0, my - 24, 0, my + 24); mg.addColorStop(0, 'transparent'); mg.addColorStop(.5, `rgba(170,155,210,${.08 - m * .013})`); mg.addColorStop(1, 'transparent'); ctx.fillStyle = mg; ctx.fillRect(0, my - 24, w, 48) }
    const gr = ctx.createLinearGradient(0, h * .63, 0, h); gr.addColorStop(0, '#0a0710'); gr.addColorStop(1, '#04030a'); ctx.fillStyle = gr; ctx.fillRect(0, h * .63, w, h)
    for (let i = 0; i < 65; i++) { const dx = (i * 1373) % w, dy = h * .66 + (i * 897) % (h * .28), a = .12 + Math.sin(t * 1.6 + i * 2.1) * .09; ctx.beginPath(); ctx.arc(dx, dy, .5, 0, Math.PI * 2); ctx.fillStyle = `rgba(200,220,255,${a})`; ctx.fill() }
    const v = ctx.createRadialGradient(w / 2, h / 2, h * .28, w / 2, h / 2, h * .88); v.addColorStop(0, 'transparent'); v.addColorStop(1, 'rgba(0,0,0,.72)'); ctx.fillStyle = v; ctx.fillRect(0, 0, w, h)
  }
}

export const meadow_1: SceneConfig = {
  name: 'Sunlit Vastness', mood: 'There is nothing between you and the horizon. That is freedom.',
  colors: ['#4a9fe8', '#7ed56f', '#f8d44a'],
  draw(ctx, w, h, t) {
    const sky = ctx.createLinearGradient(0, 0, 0, h * .58)
    sky.addColorStop(0, '#1a6ec8'); sky.addColorStop(.5, '#4a9fe8'); sky.addColorStop(1, '#a8d8f0')
    ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h * .58)
    for (let c = 0; c < 7; c++) { const cx = ((c * w / 5 + t * 6) % (w + 200)) - 100, cy = h * (.12 + (c % 3) * .08), cr = 60 + (c % 3) * 30, cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, cr); cg.addColorStop(0, 'rgba(255,255,255,.82)'); cg.addColorStop(.6, 'rgba(255,255,255,.35)'); cg.addColorStop(1, 'transparent'); ctx.fillStyle = cg; ctx.fillRect(cx - cr, cy - cr * .5, cr * 2, cr) }
    const sx = w * .72, sy = h * .14, sg = ctx.createRadialGradient(sx, sy, 0, sx, sy, 130)
    sg.addColorStop(0, 'rgba(255,245,180,.95)'); sg.addColorStop(.25, 'rgba(255,220,80,.55)'); sg.addColorStop(.6, 'rgba(255,190,40,.15)'); sg.addColorStop(1, 'transparent')
    ctx.fillStyle = sg; ctx.fillRect(0, 0, w, h); ctx.beginPath(); ctx.arc(sx, sy, 34, 0, Math.PI * 2); ctx.fillStyle = 'rgba(255,248,180,.96)'; ctx.fill()
    ctx.fillStyle = '#3d8840'; ctx.beginPath(); ctx.moveTo(0, h)
    for (let x = 0; x <= w; x += 4) ctx.lineTo(x, h * .56 + Math.sin(x * .006) * h * .035 + Math.sin(x * .018) * h * .012)
    ctx.lineTo(w, h); ctx.closePath(); ctx.fill()
    const ground = ctx.createLinearGradient(0, h * .56, 0, h); ground.addColorStop(0, '#7cd860'); ground.addColorStop(.4, '#5ab848'); ground.addColorStop(1, '#3a8830'); ctx.fillStyle = ground; ctx.fillRect(0, h * .58, w, h)
    const flowers = [[255, 90, 140], [255, 220, 50], [180, 100, 255], [255, 140, 60], [255, 255, 255]]
    for (let i = 0; i < 120; i++) { const fx = (i * 1453) % w, fy = h * .62 + (i * 723) % (h * .32), fc = flowers[i % 5], sway = Math.sin(t * 1.2 + i * .7) * 4; ctx.beginPath(); ctx.arc(fx + sway, fy, 2.5 + (i % 3), 0, Math.PI * 2); ctx.fillStyle = `rgba(${fc[0]},${fc[1]},${fc[2]},.75)`; ctx.fill() }
    for (let i = 0; i < 80; i++) { const gx = (i / 80) * w, gy = h * .61 + Math.sin(i * 1.7) * 18, sway = Math.sin(t * 1.4 + i * .35) * 10; ctx.beginPath(); ctx.moveTo(gx, gy); ctx.bezierCurveTo(gx + sway * .5, gy - 16, gx + sway, gy - 28, gx + sway * 1.3, gy - 38); ctx.strokeStyle = 'rgba(40,140,40,.55)'; ctx.lineWidth = 1.2; ctx.stroke() }
    const v = ctx.createRadialGradient(w / 2, h / 2, h * .3, w / 2, h / 2, h * .85); v.addColorStop(0, 'transparent'); v.addColorStop(1, 'rgba(0,0,0,.45)'); ctx.fillStyle = v; ctx.fillRect(0, 0, w, h)
  }
}

export const meadow_2: SceneConfig = {
  name: 'The Golden Unraveling', mood: 'Everything softens at the end of the day. You let it.',
  colors: ['#2a0a3a', '#d4622a', '#f8c840'],
  draw(ctx, w, h, t) {
    const sky = ctx.createLinearGradient(0, 0, 0, h * .6)
    sky.addColorStop(0, '#1a0828'); sky.addColorStop(.35, '#6a1828'); sky.addColorStop(.7, '#c04020'); sky.addColorStop(1, '#f09030')
    ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h * .6)
    const sx = w * .15, sy = h * .52, sg = ctx.createRadialGradient(sx, sy, 0, sx, sy, 200)
    sg.addColorStop(0, 'rgba(255,230,100,.9)'); sg.addColorStop(.2, 'rgba(255,160,40,.5)'); sg.addColorStop(.55, 'rgba(255,100,20,.15)'); sg.addColorStop(1, 'transparent')
    ctx.fillStyle = sg; ctx.fillRect(0, 0, w, h); ctx.beginPath(); ctx.arc(sx, sy, 40, 0, Math.PI * 2); ctx.fillStyle = 'rgba(255,235,120,.92)'; ctx.fill()
    for (let ray = 0; ray < 8; ray++) { const ang = (ray / 8) * .6 - .1 + Math.sin(t * .08) * .015, rg = ctx.createLinearGradient(sx, sy, sx + Math.cos(ang) * w * 1.5, sy + Math.sin(ang) * h); rg.addColorStop(0, 'rgba(255,200,80,.08)'); rg.addColorStop(1, 'transparent'); ctx.fillStyle = rg; ctx.fillRect(0, 0, w, h) }
    ctx.fillStyle = '#1a1008'; ctx.beginPath(); ctx.moveTo(0, h)
    for (let x = 0; x <= w; x += 4) ctx.lineTo(x, h * .58 + Math.sin(x * .005) * h * .04 + Math.sin(x * .016) * h * .018)
    ctx.lineTo(w, h); ctx.closePath(); ctx.fill()
    const ground = ctx.createLinearGradient(0, h * .58, 0, h); ground.addColorStop(0, '#c08020'); ground.addColorStop(.5, '#806010'); ground.addColorStop(1, '#3a2808'); ctx.fillStyle = ground; ctx.fillRect(0, h * .6, w, h)
    for (let i = 0; i < 90; i++) { const gx = (i / 90) * w, gy = h * .6 + Math.sin(i * 1.3) * 20, sway = Math.sin(t * 1.1 + i * .4) * 14; ctx.beginPath(); ctx.moveTo(gx, gy); ctx.bezierCurveTo(gx + sway * .5, gy - 22, gx + sway, gy - 38, gx + sway * 1.4, gy - 52); ctx.strokeStyle = `rgba(${180 + (i % 30)},${120 + (i % 20)},20,.6)`; ctx.lineWidth = 1.3; ctx.stroke() }
    const v = ctx.createRadialGradient(w / 2, h / 2, h * .28, w / 2, h / 2, h * .88); v.addColorStop(0, 'transparent'); v.addColorStop(1, 'rgba(0,0,0,.7)'); ctx.fillStyle = v; ctx.fillRect(0, 0, w, h)
  }
}

export const meadow_3: SceneConfig = {
  name: 'The Weight of Gray', mood: 'You know how to stand in the wind. That is not nothing.',
  colors: ['#1a1a28', '#3a4a38', '#88a880'],
  draw(ctx, w, h, t) {
    const sky = ctx.createLinearGradient(0, 0, 0, h * .6)
    sky.addColorStop(0, '#0e0e18'); sky.addColorStop(.5, '#1c1e28'); sky.addColorStop(1, '#2e3038')
    ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h * .6)
    for (let c = 0; c < 8; c++) { const cx = ((c * w / 6 + Math.sin(t * .12 + c) * 30) % (w + 200)) - 100, cy = h * (.08 + (c % 4) * .1), cr = 90 + (c % 3) * 40, cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, cr); cg.addColorStop(0, 'rgba(55,58,72,.95)'); cg.addColorStop(.7, 'rgba(45,47,62,.7)'); cg.addColorStop(1, 'transparent'); ctx.fillStyle = cg; ctx.fillRect(cx - cr, cy - cr * .6, cr * 2, cr * 1.2) }
    ctx.fillStyle = '#181e14'; ctx.beginPath(); ctx.moveTo(0, h)
    for (let x = 0; x <= w; x += 4) ctx.lineTo(x, h * .58 + Math.sin(x * .005) * h * .04 + Math.sin(x * .017) * h * .016)
    ctx.lineTo(w, h); ctx.closePath(); ctx.fill()
    const ground = ctx.createLinearGradient(0, h * .58, 0, h); ground.addColorStop(0, '#2a3825'); ground.addColorStop(1, '#131a10'); ctx.fillStyle = ground; ctx.fillRect(0, h * .6, w, h)
    for (let i = 0; i < 100; i++) { const gx = (i / 100) * w, gy = h * .61 + Math.sin(i * 1.2) * 22, sway = Math.sin(t * 2.2 + i * .38) * 22 + Math.sin(t * 3.5 + i) * 8; ctx.beginPath(); ctx.moveTo(gx, gy); ctx.bezierCurveTo(gx + sway * .4, gy - 18, gx + sway * .8, gy - 32, gx + sway, gy - 42); ctx.strokeStyle = `rgba(55,88,42,.65)`; ctx.lineWidth = 1.3; ctx.stroke() }
    for (let i = 0; i < 80; i++) { const rx = (i * 167 + t * 280) % w, ry = (i * 113 + t * 480) % h; ctx.beginPath(); ctx.moveTo(rx, ry); ctx.lineTo(rx - 1, ry + 10); ctx.strokeStyle = 'rgba(160,170,190,.18)'; ctx.lineWidth = .7; ctx.stroke() }
    const v = ctx.createRadialGradient(w / 2, h / 2, h * .2, w / 2, h / 2, h * .9); v.addColorStop(0, 'transparent'); v.addColorStop(1, 'rgba(0,0,0,.78)'); ctx.fillStyle = v; ctx.fillRect(0, 0, w, h)
  }
}

export const meadow_4: SceneConfig = {
  name: 'Firefly Field', mood: 'In the dark, you still shine. That is all that matters.',
  colors: ['#020408', '#0a1a0a', '#88ff88'],
  draw(ctx, w, h, t) {
    const sky = ctx.createLinearGradient(0, 0, 0, h * .65)
    sky.addColorStop(0, '#010206'); sky.addColorStop(.5, '#040810'); sky.addColorStop(1, '#060a08')
    ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h * .65)
    for (let i = 0; i < 180; i++) { const sx = (i * 2347) % w, sy = (i * 1847) % (h * .55), a = .25 + Math.sin(t * (.2 + (i % 11) * .03) + i * .7) * .2; ctx.beginPath(); ctx.arc(sx, sy, .4 + .4 * (i % 3), 0, Math.PI * 2); ctx.fillStyle = `rgba(220,230,255,${a})`; ctx.fill() }
    ctx.fillStyle = '#030805'; ctx.beginPath(); ctx.moveTo(0, h)
    for (let x = 0; x <= w; x += 4) ctx.lineTo(x, h * .62 + Math.sin(x * .005) * h * .038 + Math.sin(x * .014) * h * .015)
    ctx.lineTo(w, h); ctx.closePath(); ctx.fill()
    const ground = ctx.createLinearGradient(0, h * .62, 0, h); ground.addColorStop(0, '#060a05'); ground.addColorStop(1, '#020302'); ctx.fillStyle = ground; ctx.fillRect(0, h * .64, w, h)
    for (let i = 0; i < 120; i++) { const gx = (i / 120) * w, gy = h * .63 + Math.sin(i * 1.5) * 22, sway = Math.sin(t * 1.0 + i * .4) * 8; ctx.beginPath(); ctx.moveTo(gx, gy); ctx.bezierCurveTo(gx + sway * .4, gy - 18, gx + sway, gy - 32, gx + sway * 1.2, gy - 44); ctx.strokeStyle = 'rgba(20,45,15,.7)'; ctx.lineWidth = 1.1; ctx.stroke() }
    for (let i = 0; i < 90; i++) { const phase = (t * (.8 + (i % 13) * .04) + i * 1.73) % (Math.PI * 2), blink = Math.max(0, Math.sin(phase) - .4) / .6, fx = (i * 1453 + Math.sin(t * .15 + i) * 40) % w, fy = h * .45 + (i * 997) % (h * .45) + Math.sin(t * .25 + i * .8) * 30; if (blink > .05) { const fg = ctx.createRadialGradient(fx, fy, 0, fx, fy, 18 * blink); fg.addColorStop(0, `rgba(160,255,120,${blink * .9})`); fg.addColorStop(.4, `rgba(80,200,60,${blink * .4})`); fg.addColorStop(1, 'transparent'); ctx.fillStyle = fg; ctx.fillRect(fx - 18, fy - 18, 36, 36); ctx.beginPath(); ctx.arc(fx, fy, 1.5 * blink, 0, Math.PI * 2); ctx.fillStyle = `rgba(200,255,180,${blink})`; ctx.fill() } }
    const v = ctx.createRadialGradient(w / 2, h / 2, h * .3, w / 2, h / 2, h * .9); v.addColorStop(0, 'transparent'); v.addColorStop(1, 'rgba(0,0,0,.8)'); ctx.fillStyle = v; ctx.fillRect(0, 0, w, h)
  }
}

// ─── AUTUMN FOREST ───────────────────────────────────────────────────────────

export const autumn_forest_0: SceneConfig = {
  name: 'Peak Flame', mood: 'Everything you have built is burning gold. That is not an ending.',
  colors: ['#8b2500', '#d44020', '#f8a020'],
  draw(ctx, w, h, t) {
    const sky = ctx.createLinearGradient(0, 0, 0, h * .45)
    sky.addColorStop(0, '#1a0808'); sky.addColorStop(.6, '#8a2510'); sky.addColorStop(1, '#d04818')
    ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h * .45)
    const ls = ctx.createRadialGradient(w * .45, 0, 0, w * .45, 0, h * .9); ls.addColorStop(0, 'rgba(255,180,60,.18)'); ls.addColorStop(1, 'transparent'); ctx.fillStyle = ls; ctx.fillRect(0, 0, w, h)
    const lc = ['rgba(200,60,10,.88)', 'rgba(240,100,15,.85)', 'rgba(210,145,10,.82)', 'rgba(170,40,0,.8)', 'rgba(255,160,20,.78)']
    for (let i = 0; i < 16; i++) { const tx = (i / 16) * w + Math.sin(i * .7) * 15, ty = h * (.22 + Math.sin(i * .8) * .05), h2 = 180 + Math.sin(i * 1.1) * 50; ctx.fillStyle = '#2a1000'; ctx.fillRect(tx - 5, ty, 10, h2 * .75); ctx.fillStyle = lc[i % 5]; ctx.beginPath(); ctx.arc(tx, ty + 15, 40 + Math.sin(i) * 12, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.arc(tx - 20, ty + 35, 30 + Math.sin(i * 1.3) * 8, 0, Math.PI * 2); ctx.fill() }
    for (let r = 0; r < 5; r++) { ctx.strokeStyle = `rgba(255,175,55,${.05 + Math.sin(t * .3 + r) * .02})`; ctx.lineWidth = 50; ctx.beginPath(); ctx.moveTo(w * (.15 + r * .18), 0); ctx.lineTo(w * (.08 + r * .22), h); ctx.stroke() }
    for (let l = 0; l < 40; l++) { const lx = (l * 137 + t * 35 + Math.sin(t * .5 + l) * 25) % w, ly = (l * 89 + t * 70) % h, lr = 3.5 + (l % 4) * 1.2, la = Math.max(0, Math.sin(l * .7 + t * .3)) * .85; if (la > .1) { ctx.save(); ctx.translate(lx, ly); ctx.rotate(t * .7 + l); const ri = l % 5, leafRgb = [[200, 60, 10], [240, 100, 15], [210, 145, 10], [170, 40, 0], [255, 160, 20]][ri]; ctx.fillStyle = `rgba(${leafRgb[0]},${leafRgb[1]},${leafRgb[2]},${la})`; ctx.beginPath(); ctx.ellipse(0, 0, lr, lr * 1.7, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore() } }
    const ground = ctx.createLinearGradient(0, h * .72, 0, h); ground.addColorStop(0, 'rgba(150,55,10,.9)'); ground.addColorStop(1, 'rgba(80,25,5,.95)'); ctx.fillStyle = ground; ctx.fillRect(0, h * .78, w, h)
    const v = ctx.createRadialGradient(w / 2, h / 2, h * .3, w / 2, h / 2, h * .88); v.addColorStop(0, 'transparent'); v.addColorStop(1, 'rgba(0,0,0,.68)'); ctx.fillStyle = v; ctx.fillRect(0, 0, w, h)
  }
}

export const autumn_forest_1: SceneConfig = {
  name: 'Rain Cathedral', mood: 'The rain does not dampen beauty. It deepens it.',
  colors: ['#1a0a08', '#4a2010', '#cc7030'],
  draw(ctx, w, h, t) {
    const sky = ctx.createLinearGradient(0, 0, 0, h * .5); sky.addColorStop(0, '#0e0806'); sky.addColorStop(1, '#2a1408'); ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h * .5)
    for (let i = 0; i < 14; i++) { const tx = (i / 14) * w, ty = h * (.18 + Math.sin(i * .9) * .06), ht = 200 + Math.sin(i * 1.2) * 55; ctx.fillStyle = '#100604'; ctx.fillRect(tx - 4, ty, 8, ht * .8); const wc = ['rgba(180,55,10,.7)', 'rgba(150,40,8,.7)', 'rgba(200,100,15,.65)'][i % 3]; ctx.fillStyle = wc; ctx.beginPath(); ctx.arc(tx, ty + 12, 38 + Math.sin(i) * 10, 0, Math.PI * 2); ctx.fill(); ctx.beginPath(); ctx.arc(tx - 18, ty + 32, 28, 0, Math.PI * 2); ctx.fill() }
    for (let r = 0; r < 4; r++) { ctx.strokeStyle = `rgba(255,165,40,${.06 + Math.sin(t * .25 + r) * .025})`; ctx.lineWidth = 45; ctx.beginPath(); ctx.moveTo(w * (.1 + r * .25), 0); ctx.lineTo(w * (.05 + r * .28), h); ctx.stroke() }
    const ground = ctx.createLinearGradient(0, h * .75, 0, h); ground.addColorStop(0, '#1c0c06'); ground.addColorStop(1, '#0e0504'); ctx.fillStyle = ground; ctx.fillRect(0, h * .78, w, h)
    for (let i = 0; i < 130; i++) { const rx = (i * 167 + t * 320) % w, ry = (i * 113 + t * 550) % h; ctx.beginPath(); ctx.moveTo(rx, ry); ctx.lineTo(rx - .8, ry + 11); ctx.strokeStyle = 'rgba(170,185,195,.22)'; ctx.lineWidth = .7; ctx.stroke() }
    for (let m = 0; m < 3; m++) { const my = h * (.6 + m * .1), mg = ctx.createLinearGradient(0, my - 18, 0, my + 18); mg.addColorStop(0, 'transparent'); mg.addColorStop(.5, `rgba(140,100,70,${.08 - m * .02})`); mg.addColorStop(1, 'transparent'); ctx.fillStyle = mg; ctx.fillRect(0, my - 18, w, 36) }
    const v = ctx.createRadialGradient(w / 2, h / 2, h * .25, w / 2, h / 2, h * .9); v.addColorStop(0, 'transparent'); v.addColorStop(1, 'rgba(0,0,0,.78)'); ctx.fillStyle = v; ctx.fillRect(0, 0, w, h)
  }
}

export const autumn_forest_2: SceneConfig = {
  name: 'The Amber Vault', mood: 'Some light finds you even in the thickest of things.',
  colors: ['#2a1000', '#c06018', '#ffcf60'],
  draw(ctx, w, h, t) {
    ctx.fillStyle = '#0a0502'; ctx.fillRect(0, 0, w, h)
    for (let r = 0; r < 6; r++) { const rg = ctx.createLinearGradient(w * (.1 + r * .16), 0, w * (.08 + r * .18), h); rg.addColorStop(0, `rgba(255,${170 + r * 8},${40 + r * 5},${.12 + Math.sin(t * .28 + r) * .03})`); rg.addColorStop(.7, `rgba(255,${160 + r * 5},30,.05)`); rg.addColorStop(1, 'transparent'); ctx.fillStyle = rg; ctx.fillRect(0, 0, w, h) }
    for (let i = 0; i < 16; i++) { const tx = (i / 16) * w + Math.sin(i * 1.1) * 12, ty = -20; ctx.fillStyle = '#180a02'; ctx.fillRect(tx - 5, ty, 10, h + 40); const lc = ['rgba(200,80,15,.78)', 'rgba(230,115,12,.75)', 'rgba(200,150,8,.72)'][i % 3]; ctx.fillStyle = lc; ctx.beginPath(); ctx.arc(tx, h * (.25 + (i % 4) * .04), 42 + Math.sin(i * 1.3) * 14, 0, Math.PI * 2); ctx.fill() }
    for (let l = 0; l < 50; l++) { const lx = (l * 137 + t * 30 + Math.sin(t * .45 + l) * 22) % w, ly = (l * 89 + t * 65) % h, lr = 3 + (l % 4), la = .55 + Math.sin(l * .8 + t * .2) * .25; ctx.save(); ctx.translate(lx, ly); ctx.rotate(t * .6 + l); const leafRi = l % 4; const leafColors = [[220, 75, 8], [245, 105, 12], [215, 150, 8], [180, 45, 0]]; const lRgb = leafColors[leafRi]; ctx.fillStyle = `rgba(${lRgb[0]},${lRgb[1]},${lRgb[2]},${la})`; ctx.beginPath(); ctx.ellipse(0, 0, lr, lr * 1.8, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore() }
    const ground = ctx.createLinearGradient(0, h * .8, 0, h); ground.addColorStop(0, '#1c0c04'); ground.addColorStop(1, '#0a0502'); ctx.fillStyle = ground; ctx.fillRect(0, h * .82, w, h)
    const v = ctx.createRadialGradient(w / 2, h * .4, h * .12, w / 2, h * .4, h * .95); v.addColorStop(0, 'transparent'); v.addColorStop(1, 'rgba(0,0,0,.82)'); ctx.fillStyle = v; ctx.fillRect(0, 0, w, h)
  }
}

export const autumn_forest_3: SceneConfig = {
  name: 'First Frost', mood: 'Something is changing. You are already becoming the next version.',
  colors: ['#0a0c18', '#283840', '#a8c8d0'],
  draw(ctx, w, h, t) {
    const sky = ctx.createLinearGradient(0, 0, 0, h * .55); sky.addColorStop(0, '#05070f'); sky.addColorStop(.6, '#101820'); sky.addColorStop(1, '#1e2c30'); ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h * .55)
    for (let i = 0; i < 60; i++) { const sx = (i * 2347) % w, sy = (i * 1847) % (h * .42), a = .2 + Math.sin(t * .35 + i * .9) * .15; ctx.beginPath(); ctx.arc(sx, sy, .4 + .3 * (i % 3), 0, Math.PI * 2); ctx.fillStyle = `rgba(220,230,245,${a})`; ctx.fill() }
    ctx.beginPath(); ctx.arc(w * .6, h * .15, 24, 0, Math.PI * 2); ctx.fillStyle = 'rgba(225,232,248,.92)'; ctx.fill()
    for (let i = 0; i < 16; i++) { const tx = (i / 16) * w, ty = h * (.2 + Math.sin(i * .9) * .05), ht = 200 + Math.sin(i * 1.1) * 40, isLate = i % 3 === 0; ctx.fillStyle = '#0e0c0a'; ctx.fillRect(tx - 4, ty, 8, ht * .85); if (!isLate) { const lc = ['rgba(160,85,20,.72)', 'rgba(140,55,12,.7)', 'rgba(185,140,15,.68)'][i % 3]; ctx.fillStyle = lc; ctx.beginPath(); ctx.arc(tx, ty + 15, 34 + Math.sin(i) * 9, 0, Math.PI * 2); ctx.fill() } }
    const ground = ctx.createLinearGradient(0, h * .75, 0, h); ground.addColorStop(0, '#1a1c1e'); ground.addColorStop(1, '#0e0f11'); ctx.fillStyle = ground; ctx.fillRect(0, h * .78, w, h)
    for (let i = 0; i < 120; i++) { const fx = (i * 1453) % w, fy = h * .8 + (i * 723) % (h * .18), a = .12 + Math.sin(t * .3 + i) * .06; ctx.beginPath(); ctx.arc(fx, fy, .7, 0, Math.PI * 2); ctx.fillStyle = `rgba(220,230,240,${a})`; ctx.fill() }
    const v = ctx.createRadialGradient(w / 2, h / 2, h * .28, w / 2, h / 2, h * .88); v.addColorStop(0, 'transparent'); v.addColorStop(1, 'rgba(0,0,0,.75)'); ctx.fillStyle = v; ctx.fillRect(0, 0, w, h)
  }
}

export const autumn_forest_4: SceneConfig = {
  name: 'After Falling', mood: 'Bare is not empty. The bones of things are beautiful too.',
  colors: ['#0e0c14', '#1e1a18', '#6060a0'],
  draw(ctx, w, h, t) {
    const sky = ctx.createLinearGradient(0, 0, 0, h * .6); sky.addColorStop(0, '#06050e'); sky.addColorStop(.45, '#121018'); sky.addColorStop(1, '#1c1a22'); ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h * .6)
    for (let i = 0; i < 80; i++) { const sx = (i * 2347) % w, sy = (i * 1847) % (h * .52), a = .18 + Math.sin(t * .28 + i * .75) * .14; ctx.beginPath(); ctx.arc(sx, sy, .4 + .35 * (i % 3), 0, Math.PI * 2); ctx.fillStyle = `rgba(200,210,230,${a})`; ctx.fill() }
    ctx.beginPath(); ctx.arc(w * .78, h * .12, 20, 0, Math.PI * 2); ctx.fillStyle = 'rgba(210,218,240,.88)'; ctx.fill()
    for (let i = 0; i < 20; i++) { const tx = (i / 20) * w, ty = h * (.18 + Math.sin(i * .9) * .06); ctx.fillStyle = '#0d0b0a'; ctx.fillRect(tx - 4, ty, 8, h * .65); ctx.strokeStyle = '#14100c'; ctx.lineWidth = 1.5; for (let b = 0; b < 4; b++) { const bx = tx + (b % 2 === 0 ? 1 : -1) * (12 + b * 8), by = ty + h * (.12 + b * .08), len = 25 + b * 8; ctx.beginPath(); ctx.moveTo(tx, by); ctx.lineTo(bx + Math.sin(t * .15 + i + b) * 4, by - len * .5); ctx.stroke() } }
    const ground = ctx.createLinearGradient(0, h * .75, 0, h); ground.addColorStop(0, '#12100e'); ground.addColorStop(1, '#0a080a'); ctx.fillStyle = ground; ctx.fillRect(0, h * .78, w, h)
    const fog = ctx.createLinearGradient(0, h * .6, 0, h * .78); fog.addColorStop(0, 'transparent'); fog.addColorStop(.5, 'rgba(120,115,130,.12)'); fog.addColorStop(1, 'transparent'); ctx.fillStyle = fog; ctx.fillRect(0, h * .6, w, h * .18)
    const v = ctx.createRadialGradient(w / 2, h / 2, h * .3, w / 2, h / 2, h * .9); v.addColorStop(0, 'transparent'); v.addColorStop(1, 'rgba(0,0,0,.8)'); ctx.fillStyle = v; ctx.fillRect(0, 0, w, h)
  }
}

// ─── STORM FOREST ────────────────────────────────────────────────────────────

export const storm_forest_0: SceneConfig = {
  name: 'The Lightning Hour', mood: 'Wild and uncontainable. You are not afraid of the storm. You are the storm.',
  colors: ['#040810', '#102010', '#8888cc'],
  draw(ctx, w, h, t) {
    const sky = ctx.createLinearGradient(0, 0, 0, h * .65); sky.addColorStop(0, '#020408'); sky.addColorStop(.5, '#0a0c14'); sky.addColorStop(1, '#141a10'); ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h * .65)
    for (let c = 0; c < 6; c++) { const cx = ((c * w / 5 + Math.sin(t * .15 + c) * 25) % (w + 150)) - 75, cy = h * (.08 + c * .06), cr = 100 + c * 25, cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, cr); cg.addColorStop(0, 'rgba(30,35,48,.95)'); cg.addColorStop(1, 'transparent'); ctx.fillStyle = cg; ctx.fillRect(cx - cr, cy - cr * .6, cr * 2, cr * 1.2) }
    const flash = Math.max(0, Math.sin(t * .9) * Math.sin(t * 3.7))
    if (flash > .55) { const fi = (flash - .55) * 2.5; ctx.fillStyle = `rgba(210,215,255,${fi * .35})`; ctx.fillRect(0, 0, w, h); ctx.strokeStyle = `rgba(220,225,255,${fi * .9})`; ctx.lineWidth = 2.5; ctx.beginPath(); let lx = w * .6, ly = 0; while (ly < h * .65) { ctx.lineTo(lx, ly); lx += (Math.random() - .48) * 38; ly += 28 } ctx.stroke() }
    for (let i = 0; i < 22; i++) { const tx = (i / 22) * w, ty = h * (.38 + Math.sin(i * .7) * .08), ht = 130 + Math.sin(i * 1.2) * 40, sw = Math.sin(t * 2.2 + i * .5) * (10 + Math.sin(t * 4) * 4); ctx.fillStyle = '#1a2610'; ctx.fillRect(tx - 3, ty + ht * .65, 6, ht * .38); for (let l = 0; l < 3; l++) { ctx.fillStyle = `rgba(${10 + l * 4},${35 + l * 12},${8 + l * 3},${.92 - l * .08})`; ctx.beginPath(); ctx.moveTo(tx + sw * (1 - l * .2), ty + l * ht * .25); ctx.lineTo(tx - 22 + sw * (.5 - l * .1), ty + ht * (.35 + l * .2)); ctx.lineTo(tx + 22 + sw * (.5 - l * .1), ty + ht * (.35 + l * .2)); ctx.closePath(); ctx.fill() } }
    for (let i = 0; i < 100; i++) { const rx = (i * 167 + t * 480) % w, ry = (i * 113 + t * 780) % (h * .9); ctx.beginPath(); ctx.moveTo(rx, ry); ctx.lineTo(rx - 2, ry + 16); ctx.strokeStyle = 'rgba(150,162,200,.28)'; ctx.lineWidth = .8; ctx.stroke() }
    const mist = ctx.createLinearGradient(0, h * .78, 0, h); mist.addColorStop(0, 'transparent'); mist.addColorStop(.5, 'rgba(40,60,38,.5)'); mist.addColorStop(1, 'rgba(15,22,12,.85)'); ctx.fillStyle = mist; ctx.fillRect(0, h * .78, w, h)
    const v = ctx.createRadialGradient(w / 2, h / 2, h * .22, w / 2, h / 2, h * .9); v.addColorStop(0, 'transparent'); v.addColorStop(1, 'rgba(0,0,0,.82)'); ctx.fillStyle = v; ctx.fillRect(0, 0, w, h)
  }
}

export const storm_forest_1: SceneConfig = {
  name: 'Aftermath Mist', mood: 'The storm always ends. What remains is more beautiful.',
  colors: ['#0a1408', '#1e3020', '#80b098'],
  draw(ctx, w, h, t) {
    const sky = ctx.createLinearGradient(0, 0, 0, h * .6); sky.addColorStop(0, '#080e06'); sky.addColorStop(.5, '#10180c'); sky.addColorStop(1, '#1a2818'); ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h * .6)
    const hg = ctx.createRadialGradient(w * .5, h * .6, 0, w * .5, h * .6, w * .6); hg.addColorStop(0, 'rgba(160,200,160,.2)'); hg.addColorStop(1, 'transparent'); ctx.fillStyle = hg; ctx.fillRect(0, 0, w, h)
    for (let i = 0; i < 20; i++) { const tx = (i / 20) * w, ty = h * (.3 + Math.sin(i * .8) * .08), ht = 150 + Math.sin(i * 1.2) * 45; ctx.fillStyle = '#182014'; ctx.fillRect(tx - 4, ty + ht * .7, 8, ht * .35); ctx.fillStyle = `rgba(18,50,16,.88)`; ctx.beginPath(); ctx.arc(tx, ty + 12, 38 + Math.sin(i) * 10, 0, Math.PI * 2); ctx.fill() }
    for (let m = 0; m < 7; m++) { const my = h * (.42 + m * .08) + Math.sin(t * .06 + m * 1.5) * 15, mg = ctx.createLinearGradient(0, my - 28, 0, my + 28); mg.addColorStop(0, 'transparent'); mg.addColorStop(.5, `rgba(155,185,150,${.12 - m * .012})`); mg.addColorStop(1, 'transparent'); ctx.fillStyle = mg; ctx.fillRect(0, my - 28, w, 56) }
    const ground = ctx.createLinearGradient(0, h * .72, 0, h); ground.addColorStop(0, '#121c10'); ground.addColorStop(1, '#080d06'); ctx.fillStyle = ground; ctx.fillRect(0, h * .76, w, h)
    for (let p = 0; p < 12; p++) { const px = w * (.06 + p * .08), py = h * .86, pg = ctx.createRadialGradient(px, py, 0, px, py, 25); pg.addColorStop(0, 'rgba(120,160,120,.22)'); pg.addColorStop(1, 'transparent'); ctx.fillStyle = pg; ctx.beginPath(); ctx.ellipse(px, py, 28, 6, 0, 0, Math.PI * 2); ctx.fill() }
    const v = ctx.createRadialGradient(w / 2, h / 2, h * .28, w / 2, h / 2, h * .88); v.addColorStop(0, 'transparent'); v.addColorStop(1, 'rgba(0,0,0,.75)'); ctx.fillStyle = v; ctx.fillRect(0, 0, w, h)
  }
}

export const storm_forest_2: SceneConfig = {
  name: 'Snow Assault', mood: 'The blizzard does not stop you. You walk through it.',
  colors: ['#080e18', '#182438', '#c8d8f0'],
  draw(ctx, w, h, t) {
    const sky = ctx.createLinearGradient(0, 0, 0, h); sky.addColorStop(0, '#06090f'); sky.addColorStop(.5, '#0e1520'); sky.addColorStop(1, '#161e2a'); ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h)
    for (let i = 0; i < 22; i++) { const tx = (i / 22) * w, ty = h * (.25 + Math.sin(i * .7) * .08), ht = 150 + Math.sin(i * 1.1) * 45, sw = Math.sin(t * 2.8 + i * .5) * 16; ctx.fillStyle = '#101820'; ctx.fillRect(tx - 4, ty + ht * .7, 8, ht * .35); ctx.fillStyle = 'rgba(14,22,16,.92)'; ctx.beginPath(); ctx.moveTo(tx + sw, ty); ctx.lineTo(tx - 24 + sw * .5, ty + ht * .35); ctx.lineTo(tx + 24 + sw * .5, ty + ht * .35); ctx.closePath(); ctx.fill(); ctx.strokeStyle = 'rgba(210,225,240,.25)'; ctx.lineWidth = 1; ctx.stroke() }
    for (let i = 0; i < 220; i++) { const sx = (i * 167 + t * 380 + Math.sin(t * .5 + i * .3) * 30) % w, sy = (i * 113 + t * 280) % h, ss = .6 + (i % 4) * .4; ctx.beginPath(); ctx.arc(sx, sy, ss, 0, Math.PI * 2); ctx.fillStyle = `rgba(225,235,248,.55)`; ctx.fill() }
    const ground = ctx.createLinearGradient(0, h * .72, 0, h); ground.addColorStop(0, '#b8cce0'); ground.addColorStop(.3, '#d0e0f0'); ground.addColorStop(1, '#e8f0f8'); ctx.fillStyle = ground; ctx.fillRect(0, h * .76, w, h)
    const fog = ctx.createLinearGradient(0, h * .55, 0, h * .78); fog.addColorStop(0, 'transparent'); fog.addColorStop(.5, 'rgba(180,200,220,.22)'); fog.addColorStop(1, 'transparent'); ctx.fillStyle = fog; ctx.fillRect(0, h * .55, w, h * .23)
    const v = ctx.createRadialGradient(w / 2, h / 2, h * .22, w / 2, h / 2, h * .9); v.addColorStop(0, 'transparent'); v.addColorStop(1, 'rgba(0,0,0,.78)'); ctx.fillStyle = v; ctx.fillRect(0, 0, w, h)
  }
}

export const storm_forest_3: SceneConfig = {
  name: 'Tropical Fury', mood: 'Everything alive is bending. You are the one still standing.',
  colors: ['#030808', '#0a1e0a', '#40a060'],
  draw(ctx, w, h, t) {
    const sky = ctx.createLinearGradient(0, 0, 0, h * .55); sky.addColorStop(0, '#020505'); sky.addColorStop(.6, '#060e06'); sky.addColorStop(1, '#0a1408'); ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h * .55)
    for (let i = 0; i < 18; i++) { const tx = (i / 18) * w, ty = h * (.3 + Math.sin(i * .8) * .1), sw = Math.sin(t * 2.8 + i * .6) * 22 + Math.sin(t * 5 + i) * 8; ctx.fillStyle = '#050f04'; ctx.fillRect(tx - 4, ty + 120, 8, h * .45); for (let l = 0; l < 5; l++) { const leafY = ty + l * 28, leafW = 35 + l * 5, bend = sw * (1 - l * .15); ctx.fillStyle = `rgba(${15 + l * 5},${60 + l * 18},${12 + l * 4},.88)`; ctx.save(); ctx.translate(tx + bend, leafY); ctx.rotate(Math.PI * .08 * Math.sign(bend)); ctx.beginPath(); ctx.ellipse(0, 0, leafW, 12, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore() } }
    for (let i = 0; i < 160; i++) { const rx = (i * 167 + t * 600 + Math.sin(t * .3 + i * .15) * 20) % (w + 100) - 50, ry = (i * 113 + t * 900) % h; ctx.beginPath(); ctx.moveTo(rx, ry); ctx.lineTo(rx - 4, ry + 18); ctx.strokeStyle = 'rgba(140,180,155,.22)'; ctx.lineWidth = .7; ctx.stroke() }
    const ground = ctx.createLinearGradient(0, h * .7, 0, h); ground.addColorStop(0, '#060f04'); ground.addColorStop(1, '#030704'); ctx.fillStyle = ground; ctx.fillRect(0, h * .74, w, h)
    const v = ctx.createRadialGradient(w / 2, h / 2, h * .25, w / 2, h / 2, h * .9); v.addColorStop(0, 'transparent'); v.addColorStop(1, 'rgba(0,0,0,.82)'); ctx.fillStyle = v; ctx.fillRect(0, 0, w, h)
  }
}

export const storm_forest_4: SceneConfig = {
  name: 'Edge of Fire', mood: 'You have survived the burning. What grows back is stronger.',
  colors: ['#0a0400', '#8a2000', '#ff6020'],
  draw(ctx, w, h, t) {
    const sky = ctx.createLinearGradient(0, 0, 0, h * .65); sky.addColorStop(0, '#060200'); sky.addColorStop(.3, '#1a0800'); sky.addColorStop(.7, '#4a1400'); sky.addColorStop(1, '#8a2800'); ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h * .65)
    const fg = ctx.createRadialGradient(w * .65, h * .7, 0, w * .65, h * .7, w * .7); fg.addColorStop(0, 'rgba(255,120,20,.45)'); fg.addColorStop(.4, 'rgba(200,60,10,.2)'); fg.addColorStop(1, 'transparent'); ctx.fillStyle = fg; ctx.fillRect(0, 0, w, h)
    for (let i = 0; i < 18; i++) { const tx = (i / 18) * w, ty = h * (.35 + Math.sin(i * .7) * .1), ht = 140 + Math.sin(i * 1.2) * 40, sw = Math.sin(t * 1.5 + i * .4) * 8, burnt = i > 10; ctx.fillStyle = burnt ? '#0a0400' : '#180a02'; ctx.fillRect(tx - 3, ty + ht * .7, 6, ht * .35); if (!burnt) { ctx.fillStyle = 'rgba(18,28,6,.9)'; ctx.beginPath(); ctx.moveTo(tx + sw, ty); ctx.lineTo(tx - 20 + sw * .5, ty + ht * .38); ctx.lineTo(tx + 20 + sw * .5, ty + ht * .38); ctx.closePath(); ctx.fill() } }
    for (let i = 0; i < 25; i++) { const fx = w * .55 + (i * 137) % (w * .5), fy = h * .55 + (i * 89) % (h * .2), fh = 30 + (i % 5) * 15, fphase = t * 2.5 + i * .8, fw = Math.sin(fphase) * 8, fa = .6 + Math.sin(fphase * 1.4) * .2; const fg2 = ctx.createRadialGradient(fx + fw, fy, 0, fx + fw, fy - fh * .5, fh); fg2.addColorStop(0, `rgba(255,${120 + Math.sin(fphase) * 30 | 0},20,${fa})`); fg2.addColorStop(.4, `rgba(255,60,10,${fa * .6})`); fg2.addColorStop(1, 'transparent'); ctx.fillStyle = fg2; ctx.fillRect(fx - fh, fy - fh, fh * 2, fh * 2) }
    for (let i = 0; i < 40; i++) { const ex = (i * 1373 + t * 45 + Math.sin(t + i) * 25) % w, ey = h * .45 + (i * 567 + t * -80 + 9999) % (h * .45), ea = .2 + Math.sin(t * 2 + i) * .15; ctx.beginPath(); ctx.arc(ex, ey, .8, 0, Math.PI * 2); ctx.fillStyle = `rgba(255,${(140 + i % 50) | 0},20,${ea})`; ctx.fill() }
    const ground = ctx.createLinearGradient(0, h * .7, 0, h); ground.addColorStop(0, '#180600'); ground.addColorStop(1, '#0a0300'); ctx.fillStyle = ground; ctx.fillRect(0, h * .72, w, h)
    const v = ctx.createRadialGradient(w / 2, h / 2, h * .25, w / 2, h / 2, h * .9); v.addColorStop(0, 'transparent'); v.addColorStop(1, 'rgba(0,0,0,.78)'); ctx.fillStyle = v; ctx.fillRect(0, 0, w, h)
  }
}
