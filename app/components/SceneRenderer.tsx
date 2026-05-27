'use client'
import { useEffect, useRef } from 'react'

export type SceneId =
  | 'meadow' | 'neon_alley' | 'ocean' | 'tokyo_rooftop'
  | 'desert_canyon' | 'storm_forest' | 'arctic' | 'autumn_forest'
  | 'factory' | 'cloud_sea'

interface SceneConfig {
  name: string; mood: string; colors: string[]
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => void
}

const scenes: Record<SceneId, SceneConfig> = {
  meadow: {
    name: 'Sunlit Meadow', mood: 'You carry warmth and open skies wherever you go.',
    colors: ['#87CEEB','#98FB98','#FFD700'],
    draw(ctx, w, h, t) {
      // Sky gradient
      const sky = ctx.createLinearGradient(0,0,0,h*0.6)
      sky.addColorStop(0,'#87CEEB'); sky.addColorStop(1,'#FFF8DC')
      ctx.fillStyle = sky; ctx.fillRect(0,0,w,h*0.6)
      // Sun
      const sx = w*0.75, sy = h*0.18
      const glow = ctx.createRadialGradient(sx,sy,0,sx,sy,120)
      glow.addColorStop(0,'rgba(255,230,100,0.9)'); glow.addColorStop(0.3,'rgba(255,200,50,0.5)'); glow.addColorStop(1,'rgba(255,200,50,0)')
      ctx.fillStyle = glow; ctx.fillRect(0,0,w,h)
      ctx.beginPath(); ctx.arc(sx,sy,36,0,Math.PI*2)
      ctx.fillStyle='rgba(255,240,120,0.95)'; ctx.fill()
      // Mountains
      ctx.fillStyle='rgba(100,140,100,0.5)'
      ctx.beginPath(); ctx.moveTo(0,h*0.55)
      for(let x=0;x<=w;x+=40) ctx.lineTo(x, h*0.55 - Math.sin(x*0.008)*60 - Math.sin(x*0.02)*20)
      ctx.lineTo(w,h); ctx.lineTo(0,h); ctx.closePath(); ctx.fill()
      // Ground
      const ground = ctx.createLinearGradient(0,h*0.55,0,h)
      ground.addColorStop(0,'#7CFC00'); ground.addColorStop(1,'#228B22')
      ctx.fillStyle = ground; ctx.fillRect(0,h*0.58,w,h)
      // Wind-blown grass blades
      for(let i=0;i<80;i++) {
        const gx = (i/80)*w, gy = h*0.6 + Math.sin(i*1.3)*20
        const sway = Math.sin(t*1.5 + i*0.4)*12
        ctx.beginPath(); ctx.moveTo(gx, gy)
        ctx.bezierCurveTo(gx+sway*0.5, gy-20, gx+sway, gy-35, gx+sway*1.2, gy-45)
        ctx.strokeStyle=`rgba(50,160,50,0.7)`; ctx.lineWidth=1.5; ctx.stroke()
      }
      // Wind particles
      for(let i=0;i<12;i++) {
        const wx = ((t*60 + i*120) % (w+100)) - 50
        const wy = h*0.3 + Math.sin(t + i)*80
        ctx.beginPath(); ctx.moveTo(wx,wy); ctx.lineTo(wx+30,wy-2)
        ctx.strokeStyle='rgba(255,255,255,0.3)'; ctx.lineWidth=1; ctx.stroke()
      }
    }
  },
  neon_alley: {
    name: 'Neon Rainy Alley', mood: 'You thrive where others see only shadow — your world is beautifully complex.',
    colors: ['#0a0a1a','#ff2266','#00ffcc'],
    draw(ctx, w, h, t) {
      ctx.fillStyle='#05050f'; ctx.fillRect(0,0,w,h)
      // Rain reflections on ground
      const ref = ctx.createLinearGradient(0,h*0.65,0,h)
      ref.addColorStop(0,'rgba(255,30,100,0.15)'); ref.addColorStop(0.5,'rgba(0,200,200,0.1)'); ref.addColorStop(1,'rgba(10,10,30,0.8)')
      ctx.fillStyle=ref; ctx.fillRect(0,h*0.65,w,h)
      // Neon signs glow
      const signs = [{x:w*0.15,y:h*0.3,c:'rgba(255,30,100,',txt:'BAR'},{x:w*0.7,y:h*0.25,c:'rgba(0,200,255,',txt:'OPEN'},{x:w*0.45,y:h*0.35,c:'rgba(180,0,255,',txt:'24H'}]
      signs.forEach(s => {
        const pulse = 0.6 + 0.4*Math.sin(t*2+s.x)
        const rg = ctx.createRadialGradient(s.x,s.y,0,s.x,s.y,80)
        rg.addColorStop(0,s.c+(0.4*pulse)+')'); rg.addColorStop(1,s.c+'0)')
        ctx.fillStyle=rg; ctx.fillRect(s.x-80,s.y-80,160,160)
        ctx.font='bold 14px monospace'; ctx.fillStyle=s.c+'0.9)'; ctx.textAlign='center'; ctx.fillText(s.txt,s.x,s.y)
      })
      // Buildings silhouette
      ctx.fillStyle='#0d0d20'
      const buildings = [[0,0.6,0.18,0.7],[0.2,0.4,0.15,0.75],[0.38,0.55,0.12,0.7],[0.55,0.35,0.2,0.75],[0.78,0.5,0.22,0.7]]
      buildings.forEach(([bx,by,bw,bh]) => {
        ctx.fillRect(bx*w, by*h, bw*w, bh*h)
        // windows
        for(let wy2=by*h+10;wy2<bh*h+by*h-20;wy2+=18)
          for(let wx2=bx*w+8;wx2<(bx+bw)*w-8;wx2+=16) {
            if(Math.random()>0.6) { ctx.fillStyle='rgba(255,220,100,0.5)'; ctx.fillRect(wx2,wy2,6,10) }
          }
        ctx.fillStyle='#0d0d20'
      })
      // Rain drops
      for(let i=0;i<120;i++) {
        const rx = (i*137 + t*200) % w
        const ry = (i*89 + t*400) % h
        ctx.beginPath(); ctx.moveTo(rx,ry); ctx.lineTo(rx-1,ry+12)
        ctx.strokeStyle='rgba(150,180,255,0.25)'; ctx.lineWidth=0.8; ctx.stroke()
      }
      // Ground puddle reflections
      for(let i=0;i<6;i++) {
        const px = w*0.1+i*(w*0.15), py = h*0.82
        const pr = ctx.createRadialGradient(px,py,0,px,py,40)
        pr.addColorStop(0,`rgba(${i%2?'255,30,100':'0,200,255'},0.2)`); pr.addColorStop(1,'transparent')
        ctx.fillStyle=pr; ctx.beginPath(); ctx.ellipse(px,py,40+Math.sin(t+i)*5,8,0,0,Math.PI*2); ctx.fill()
      }
    }
  },
  ocean: {
    name: 'Misty Ocean at Dawn', mood: 'Still on the surface, infinite beneath — that is you.',
    colors: ['#1a2a4a','#4a7a9b','#e8dcc8'],
    draw(ctx, w, h, t) {
      const sky = ctx.createLinearGradient(0,0,0,h*0.5)
      sky.addColorStop(0,'#0d1929'); sky.addColorStop(0.6,'#2d4a6b'); sky.addColorStop(1,'#c8a882')
      ctx.fillStyle=sky; ctx.fillRect(0,0,w,h*0.5)
      // Horizon glow
      const hg = ctx.createRadialGradient(w*0.5,h*0.5,0,w*0.5,h*0.5,w*0.6)
      hg.addColorStop(0,'rgba(255,180,80,0.3)'); hg.addColorStop(1,'transparent')
      ctx.fillStyle=hg; ctx.fillRect(0,0,w,h)
      // Fog layers
      for(let i=0;i<5;i++) {
        const fy = h*0.35+i*20, fw = w*(0.6+i*0.1)
        const fog = ctx.createRadialGradient(w*0.5,fy,0,w*0.5,fy,fw)
        fog.addColorStop(0,`rgba(200,210,220,${0.06-i*0.01})`); fog.addColorStop(1,'transparent')
        ctx.fillStyle=fog; ctx.fillRect(0,0,w,h)
      }
      // Ocean waves
      for(let wave=0;wave<6;wave++) {
        const wy = h*(0.5+wave*0.08)
        const wc = ctx.createLinearGradient(0,wy,0,wy+60)
        wc.addColorStop(0,`rgba(${30+wave*10},${80+wave*15},${120+wave*10},${0.8-wave*0.1})`)
        wc.addColorStop(1,`rgba(20,60,100,0.9)`)
        ctx.fillStyle=wc; ctx.beginPath(); ctx.moveTo(0,h)
        ctx.lineTo(0,wy)
        for(let x=0;x<=w;x+=4) {
          const amp = 3-wave*0.3
          ctx.lineTo(x, wy+Math.sin(x*0.015+t*(0.4-wave*0.05)+wave)*amp+Math.sin(x*0.03+t*0.7)*amp*0.5)
        }
        ctx.lineTo(w,h); ctx.closePath(); ctx.fill()
      }
      // Mist at water line
      const mist = ctx.createLinearGradient(0,h*0.46,0,h*0.58)
      mist.addColorStop(0,'transparent'); mist.addColorStop(0.5,'rgba(180,200,220,0.15)'); mist.addColorStop(1,'transparent')
      ctx.fillStyle=mist; ctx.fillRect(0,h*0.46,w,h*0.12)
      // Stars fading
      for(let i=0;i<30;i++) {
        const sx2 = (i*237)%w, sy2 = (i*89)%(h*0.3)
        const sa = 0.5*Math.max(0,(1-(sy2/(h*0.3))))
        ctx.beginPath(); ctx.arc(sx2,sy2,0.8,0,Math.PI*2)
        ctx.fillStyle=`rgba(255,255,255,${sa})`; ctx.fill()
      }
    }
  },
  tokyo_rooftop: {
    name: 'Tokyo Rooftop at Rain', mood: 'You find beauty in the pulse of things — alive when the world is in motion.',
    colors: ['#0a0a18','#ff6644','#4488ff'],
    draw(ctx, w, h, t) {
      ctx.fillStyle='#080818'; ctx.fillRect(0,0,w,h)
      // City skyline
      const bdata = [[0,0.4,0.08],[0.1,0.25,0.12],[0.24,0.35,0.09],[0.35,0.2,0.14],[0.51,0.32,0.1],[0.63,0.18,0.16],[0.81,0.28,0.12],[0.95,0.4,0.05]]
      bdata.forEach(([bx,by,bw]) => {
        const bg = ctx.createLinearGradient(bx*w,by*h,bx*w,(by+0.6)*h)
        bg.addColorStop(0,'#1a1a30'); bg.addColorStop(1,'#0d0d20')
        ctx.fillStyle=bg; ctx.fillRect(bx*w,by*h,bw*w,h)
        for(let wy3=(by*h+15);wy3<h-10;wy3+=20)
          for(let wx3=(bx*w+6);wx3<(bx+bw)*w-6;wx3+=14) {
            const on = Math.sin(wx3*0.3+wy3*0.7+t*0.1)>0.1
            if(on) { ctx.fillStyle=`rgba(255,${180+Math.sin(wx3)*30},100,0.6)`; ctx.fillRect(wx3,wy3,5,8) }
          }
      })
      // Neon Tokyo tower glow
      const tg = ctx.createRadialGradient(w*0.5,h*0.2,0,w*0.5,h*0.2,200)
      tg.addColorStop(0,'rgba(255,80,40,0.2)'); tg.addColorStop(1,'transparent')
      ctx.fillStyle=tg; ctx.fillRect(0,0,w,h)
      ctx.strokeStyle='rgba(255,100,60,0.8)'; ctx.lineWidth=3
      ctx.beginPath(); ctx.moveTo(w*0.5,h*0.05); ctx.lineTo(w*0.5,h*0.3); ctx.stroke()
      // Wet rooftop reflection
      const ref2 = ctx.createLinearGradient(0,h*0.72,0,h)
      ref2.addColorStop(0,'rgba(40,40,80,0.9)'); ref2.addColorStop(1,'rgba(10,10,20,1)')
      ctx.fillStyle=ref2; ctx.fillRect(0,h*0.72,w,h)
      for(let i=0;i<8;i++) {
        const lx = w*(0.1+i*0.11), intensity = 0.3+Math.sin(t+i)*0.1
        const lg2 = ctx.createRadialGradient(lx,h*0.72,0,lx,h*0.72,50)
        lg2.addColorStop(0,`rgba(${i%2?'255,80,40':'60,120,255'},${intensity})`); lg2.addColorStop(1,'transparent')
        ctx.fillStyle=lg2; ctx.beginPath(); ctx.ellipse(lx,h*0.82,15,60,0,0,Math.PI*2); ctx.fill()
      }
      // Rain
      for(let i=0;i<100;i++) {
        const rx=(i*167+t*300)%w, ry=(i*113+t*500)%h
        ctx.beginPath(); ctx.moveTo(rx,ry); ctx.lineTo(rx-0.5,ry+10)
        ctx.strokeStyle='rgba(180,200,255,0.2)'; ctx.lineWidth=0.7; ctx.stroke()
      }
    }
  },
  desert_canyon: {
    name: 'Desert Canyon at Dusk', mood: 'Ancient and unhurried — you carry the wisdom of things that last.',
    colors: ['#8B3A0F','#D4522A','#FFB347'],
    draw(ctx, w, h, t) {
      const sky = ctx.createLinearGradient(0,0,0,h*0.45)
      sky.addColorStop(0,'#1a0a2e'); sky.addColorStop(0.4,'#8B1A3A'); sky.addColorStop(1,'#FF6B35')
      ctx.fillStyle=sky; ctx.fillRect(0,0,w,h*0.45)
      // Setting sun
      const sunY = h*0.38, sunX = w*0.55
      const sg = ctx.createRadialGradient(sunX,sunY,0,sunX,sunY,150)
      sg.addColorStop(0,'rgba(255,220,80,0.8)'); sg.addColorStop(0.2,'rgba(255,140,40,0.4)'); sg.addColorStop(1,'transparent')
      ctx.fillStyle=sg; ctx.fillRect(0,0,w,h)
      ctx.beginPath(); ctx.arc(sunX,sunY,28,0,Math.PI*2)
      ctx.fillStyle='rgba(255,200,60,0.9)'; ctx.fill()
      // Canyon walls
      const walls: Array<[number,number,number,number,string]> = [[0,0.3,0.22,0.7,'#6B2D0A'],[0.78,0.25,0.22,0.75,'#7A3412'],[0.18,0.45,0.15,0.55,'#8B4A1A'],[0.65,0.42,0.13,0.58,'#7A3810']]
      walls.forEach(([wx,wy,ww,wh,wc]) => {
        ctx.fillStyle=wc
        ctx.beginPath(); ctx.moveTo(wx*w,(wy)*h)
        for(let x=0;x<=ww*w;x+=8) ctx.lineTo(wx*w+x,(wy)*h+Math.sin(x*0.1)*8-Math.sin(x*0.05)*12)
        ctx.lineTo((wx+ww)*w,h); ctx.lineTo(wx*w,h); ctx.closePath(); ctx.fill()
        // Rock strata lines
        for(let s=0;s<4;s++) {
          ctx.strokeStyle=`rgba(255,160,80,0.15)`; ctx.lineWidth=1
          ctx.beginPath(); ctx.moveTo(wx*w,(wy+0.05+s*0.04)*h)
          ctx.lineTo((wx+ww)*w,(wy+0.05+s*0.04)*h); ctx.stroke()
        }
      })
      // Desert floor
      const floor = ctx.createLinearGradient(0,h*0.7,0,h)
      floor.addColorStop(0,'#C4622A'); floor.addColorStop(1,'#8B3A0F')
      ctx.fillStyle=floor; ctx.fillRect(0,h*0.72,w,h)
      // Heat shimmer
      for(let i=0;i<6;i++) {
        const hx = w*0.1+i*w*0.15, shimmer = Math.sin(t*3+i)*3
        ctx.strokeStyle='rgba(255,140,60,0.08)'; ctx.lineWidth=15
        ctx.beginPath(); ctx.moveTo(hx,h*0.7); ctx.lineTo(hx+shimmer,h*0.5); ctx.stroke()
      }
      // Stars appearing
      for(let i=0;i<20;i++) {
        const stx=(i*317)%w, sty=(i*131)%(h*0.3)
        ctx.beginPath(); ctx.arc(stx,sty,0.8,0,Math.PI*2)
        ctx.fillStyle=`rgba(255,240,200,${0.3+Math.sin(t*0.5+i)*0.3})`; ctx.fill()
      }
    }
  },
  storm_forest: {
    name: 'Storm-hit Pine Forest', mood: 'Wild and uncontainable — the storm does not scare you. You are the storm.',
    colors: ['#0a1a0a','#1a4a1a','#8888cc'],
    draw(ctx, w, h, t) {
      const sky = ctx.createLinearGradient(0,0,0,h*0.6)
      sky.addColorStop(0,'#0a0a14'); sky.addColorStop(0.5,'#1a1a2e'); sky.addColorStop(1,'#2a2a1a')
      ctx.fillStyle=sky; ctx.fillRect(0,0,w,h)
      // Lightning flash
      const flash = Math.max(0,Math.sin(t*0.7)*Math.sin(t*3.1))
      if(flash>0.6) {
        ctx.fillStyle=`rgba(220,220,255,${(flash-0.6)*0.3})`; ctx.fillRect(0,0,w,h)
        // Lightning bolt
        ctx.strokeStyle=`rgba(200,200,255,${(flash-0.6)*2})`; ctx.lineWidth=2
        ctx.beginPath(); let lx=w*0.6,ly=0
        while(ly<h*0.5) { ctx.lineTo(lx,ly); lx+=(Math.random()-0.5)*40; ly+=30 }
        ctx.stroke()
      }
      // Storm clouds
      for(let c=0;c<5;c++) {
        const cx = (w*0.1+c*w*0.22+Math.sin(t*0.2+c)*20)%w
        const cy = h*(0.1+c*0.05)
        const cr = 80+c*20
        const cloud = ctx.createRadialGradient(cx,cy,0,cx,cy,cr)
        cloud.addColorStop(0,'rgba(40,40,60,0.9)'); cloud.addColorStop(1,'transparent')
        ctx.fillStyle=cloud; ctx.fillRect(cx-cr,cy-cr,cr*2,cr*2)
      }
      // Pine trees
      for(let i=0;i<20;i++) {
        const tx = (i/20)*w, ty = h*(0.4+Math.sin(i*0.7)*0.1)
        const height = 120+Math.sin(i*1.2)*40
        const sway = Math.sin(t*1.8+i*0.5)*(8+Math.sin(t*3)*3)
        // trunk
        ctx.fillStyle='#2a1a0a'; ctx.fillRect(tx+sway*0.5-3, ty+height*0.7, 6, height*0.35)
        // foliage layers
        for(let l=0;l<3;l++) {
          ctx.fillStyle=`rgba(${10+l*5},${40+l*15},${10+l*5},${0.9-l*0.1})`
          ctx.beginPath()
          ctx.moveTo(tx+sway*(1-l*0.2), ty+(l*height*0.25))
          ctx.lineTo(tx-25+sway*(0.5-l*0.1), ty+height*(0.35+l*0.2))
          ctx.lineTo(tx+25+sway*(0.5-l*0.1), ty+height*(0.35+l*0.2))
          ctx.closePath(); ctx.fill()
        }
      }
      // Rain streaks
      for(let i=0;i<80;i++) {
        const rx=(i*167+t*400)%w, ry=(i*113+t*600)%(h*0.9)
        ctx.beginPath(); ctx.moveTo(rx,ry); ctx.lineTo(rx-2,ry+15)
        ctx.strokeStyle='rgba(150,160,200,0.3)'; ctx.lineWidth=0.8; ctx.stroke()
      }
      // Ground mist
      const mist2 = ctx.createLinearGradient(0,h*0.75,0,h)
      mist2.addColorStop(0,'transparent'); mist2.addColorStop(0.5,'rgba(60,80,60,0.4)'); mist2.addColorStop(1,'rgba(20,30,20,0.8)')
      ctx.fillStyle=mist2; ctx.fillRect(0,h*0.75,w,h)
    }
  },
  arctic: {
    name: 'Arctic Tundra at Midnight', mood: 'You find peace in the vast and silent — clarity comes to you in stillness.',
    colors: ['#0a1428','#1a3a5a','#88ccff'],
    draw(ctx, w, h, t) {
      const sky = ctx.createLinearGradient(0,0,0,h*0.65)
      sky.addColorStop(0,'#020818'); sky.addColorStop(0.5,'#0a1a38'); sky.addColorStop(1,'#0d2245')
      ctx.fillStyle=sky; ctx.fillRect(0,0,w,h*0.65)
      // Aurora borealis
      for(let a=0;a<3;a++) {
        const ay = h*(0.15+a*0.1), aw = w*0.8
        const ax = w*0.1+Math.sin(t*0.2+a)*w*0.05
        const colors2 = [['rgba(0,255,150,','rgba(0,200,255,'],['rgba(100,0,255,','rgba(0,255,200,'],['rgba(0,150,255,','rgba(150,0,255,']]
        for(let x=0;x<aw;x+=2) {
          const wave = Math.sin(x*0.01+t*0.3+a*2)*30+Math.sin(x*0.02+t*0.5)*15
          const alpha = Math.max(0,Math.sin(x/aw*Math.PI))*0.4
          ctx.strokeStyle=colors2[a][0]+alpha+')'; ctx.lineWidth=8
          ctx.beginPath(); ctx.moveTo(ax+x,ay+wave); ctx.lineTo(ax+x,ay+wave+40+Math.sin(x*0.05)*20); ctx.stroke()
        }
      }
      // Stars
      for(let i=0;i<60;i++) {
        const stx=(i*237+17)%w, sty=(i*131+31)%(h*0.55)
        const sa2 = 0.4+Math.sin(t*0.8+i*0.3)*0.3
        ctx.beginPath(); ctx.arc(stx,sty,0.6+Math.sin(i)*0.4,0,Math.PI*2)
        ctx.fillStyle=`rgba(200,220,255,${sa2})`; ctx.fill()
      }
      // Moon
      ctx.beginPath(); ctx.arc(w*0.2,h*0.15,22,0,Math.PI*2)
      ctx.fillStyle='rgba(220,230,255,0.95)'; ctx.fill()
      const mg = ctx.createRadialGradient(w*0.2,h*0.15,0,w*0.2,h*0.15,80)
      mg.addColorStop(0,'rgba(180,200,255,0.2)'); mg.addColorStop(1,'transparent')
      ctx.fillStyle=mg; ctx.fillRect(0,0,w,h)
      // Icy ground
      const ice = ctx.createLinearGradient(0,h*0.65,0,h)
      ice.addColorStop(0,'#c8e0f8'); ice.addColorStop(0.3,'#a0c8e8'); ice.addColorStop(1,'#6898c8')
      ctx.fillStyle=ice; ctx.fillRect(0,h*0.65,w,h)
      // Ice cracks/sheen
      for(let c=0;c<8;c++) {
        ctx.strokeStyle='rgba(255,255,255,0.3)'; ctx.lineWidth=0.5
        ctx.beginPath(); ctx.moveTo(w*0.1+c*w*0.12, h*0.65)
        ctx.lineTo(w*0.15+c*w*0.12+Math.sin(c)*20, h)
        ctx.stroke()
      }
      // Ground reflection of aurora
      const ref3 = ctx.createLinearGradient(0,h*0.65,0,h)
      ref3.addColorStop(0,'rgba(0,200,150,0.15)'); ref3.addColorStop(1,'transparent')
      ctx.fillStyle=ref3; ctx.fillRect(0,h*0.65,w,h)
    }
  },
  autumn_forest: {
    name: 'Autumn Forest Path', mood: 'Grounded, warm, and real — you know that endings are just beginnings turning gold.',
    colors: ['#8B2500','#D4522A','#FFB347'],
    draw(ctx, w, h, t) {
      const sky = ctx.createLinearGradient(0,0,0,h*0.4)
      sky.addColorStop(0,'#2a1a0a'); sky.addColorStop(1,'#a04020')
      ctx.fillStyle=sky; ctx.fillRect(0,0,w,h*0.4)
      // Warm light shaft
      const ls = ctx.createRadialGradient(w*0.5,0,0,w*0.5,0,h*0.8)
      ls.addColorStop(0,'rgba(255,180,60,0.15)'); ls.addColorStop(1,'transparent')
      ctx.fillStyle=ls; ctx.fillRect(0,0,w,h)
      // Trees
      const treeColors = ['#4a1a00','#5a2000','#3a1400']
      for(let i=0;i<14;i++) {
        const tx2 = (i/14)*w, ty2 = h*(0.25+Math.sin(i*0.8)*0.05)
        const isEdge = i<3||i>11
        const height2 = isEdge?180:240
        ctx.fillStyle=treeColors[i%3]; ctx.fillRect(tx2-5,ty2,10,height2)
        // Canopy
        const leafColors = ['rgba(180,60,10,0.8)','rgba(220,100,20,0.8)','rgba(200,140,10,0.8)','rgba(160,40,0,0.7)']
        ctx.fillStyle=leafColors[i%4]
        ctx.beginPath(); ctx.arc(tx2,ty2+20,35+Math.sin(i)*10,0,Math.PI*2); ctx.fill()
      }
      // Falling leaves
      for(let l=0;l<25;l++) {
        const lx2 = (l*137+t*30+Math.sin(t*0.5+l)*20)%w
        const ly2 = (l*89+t*60)%h
        const lr = 3+Math.sin(l)*1.5
        const leafC = ['rgba(220,80,10,0.8)','rgba(200,140,10,0.8)','rgba(180,50,0,0.7)']
        ctx.fillStyle=leafC[l%3]
        ctx.save(); ctx.translate(lx2,ly2); ctx.rotate(t+l)
        ctx.beginPath(); ctx.ellipse(0,0,lr,lr*1.6,0,0,Math.PI*2); ctx.fill()
        ctx.restore()
      }
      // Path
      ctx.fillStyle='rgba(120,70,20,0.6)'
      ctx.beginPath(); ctx.moveTo(w*0.35,h); ctx.lineTo(w*0.4,h*0.5); ctx.lineTo(w*0.6,h*0.5); ctx.lineTo(w*0.65,h); ctx.closePath(); ctx.fill()
      // Ground leaves
      const ground2 = ctx.createLinearGradient(0,h*0.7,0,h)
      ground2.addColorStop(0,'rgba(140,60,10,0.8)'); ground2.addColorStop(1,'rgba(80,30,0,0.9)')
      ctx.fillStyle=ground2; ctx.fillRect(0,h*0.75,w,h)
      // Light rays through canopy
      for(let r=0;r<4;r++) {
        ctx.strokeStyle=`rgba(255,180,60,${0.04+Math.sin(t*0.3+r)*0.02})`; ctx.lineWidth=40
        ctx.beginPath(); ctx.moveTo(w*(0.2+r*0.2),0); ctx.lineTo(w*(0.1+r*0.25),h); ctx.stroke()
      }
    }
  },
  factory: {
    name: 'Abandoned Factory in Fog', mood: 'You see beauty in what others overlook — rust and silence hold their own kind of truth.',
    colors: ['#1a1a14','#4a4a3a','#8888aa'],
    draw(ctx, w, h, t) {
      ctx.fillStyle='#141410'; ctx.fillRect(0,0,w,h)
      // Fog layers
      for(let f=0;f<6;f++) {
        const fy2 = h*(0.3+f*0.1)+Math.sin(t*0.1+f)*10
        const fog2 = ctx.createLinearGradient(0,fy2-40,0,fy2+40)
        fog2.addColorStop(0,'transparent'); fog2.addColorStop(0.5,`rgba(180,180,160,${0.05-f*0.005})`); fog2.addColorStop(1,'transparent')
        ctx.fillStyle=fog2; ctx.fillRect(0,fy2-40,w,80)
      }
      // Factory structure
      ctx.fillStyle='#1e1e18'
      // Main building
      ctx.fillRect(w*0.1,h*0.3,w*0.5,h*0.6)
      ctx.fillRect(w*0.65,h*0.4,w*0.25,h*0.5)
      // Roof details
      ctx.fillStyle='#252520'
      ctx.fillRect(w*0.08,h*0.28,w*0.54,h*0.04)
      // Smokestacks
      for(let s=0;s<3;s++) {
        const sx2=w*(0.2+s*0.15), sy2=h*0.1
        ctx.fillStyle='#1a1a16'; ctx.fillRect(sx2-8,sy2,16,h*0.22)
        // Smoke
        for(let sm=0;sm<5;sm++) {
          const smx=sx2+Math.sin(t*0.5+sm*1.2+s)*15
          const smy=sy2-20-sm*25+((t*15+sm*40)%120)
          const smr=8+sm*5
          ctx.beginPath(); ctx.arc(smx,smy,smr,0,Math.PI*2)
          ctx.fillStyle=`rgba(100,100,90,${0.15-sm*0.02})`; ctx.fill()
        }
      }
      // Broken windows
      for(let wr=0;wr<3;wr++) for(let wc2=0;wc2<6;wc2++) {
        const wox=w*0.12+wc2*w*0.08, woy=h*0.35+wr*h*0.12
        const broken=Math.sin(wox*woy)>0.3
        ctx.strokeStyle=broken?'rgba(60,60,50,0.5)':'rgba(180,200,180,0.1)'
        ctx.lineWidth=broken?0.5:0.8
        ctx.strokeRect(wox,woy,30,22)
        if(!broken) { ctx.fillStyle='rgba(160,180,160,0.05)'; ctx.fillRect(wox,woy,30,22) }
      }
      // Ground puddles with reflections
      ctx.fillStyle='rgba(80,80,70,0.6)'; ctx.beginPath(); ctx.ellipse(w*0.35,h*0.88,80,12,0,0,Math.PI*2); ctx.fill()
      const ref4 = ctx.createLinearGradient(0,h*0.86,0,h*0.9)
      ref4.addColorStop(0,'rgba(140,150,120,0.15)'); ref4.addColorStop(1,'transparent')
      ctx.fillStyle=ref4; ctx.fillRect(0,h*0.86,w,h*0.04)
      // Floating dust particles
      for(let d=0;d<20;d++) {
        const dx=(d*173+t*10)%w, dy=h*0.2+(d*89+t*5)%(h*0.7)
        ctx.beginPath(); ctx.arc(dx,dy,0.8,0,Math.PI*2)
        ctx.fillStyle=`rgba(200,190,160,${0.1+Math.sin(t+d)*0.05})`; ctx.fill()
      }
    }
  },
  cloud_sea: {
    name: 'Cloud Sea at Sunset', mood: 'You exist above the noise — weightless, dreaming, untouchable.',
    colors: ['#1a0a2e','#8B1A5A','#FFB8D0'],
    draw(ctx, w, h, t) {
      const sky = ctx.createLinearGradient(0,0,0,h)
      sky.addColorStop(0,'#0d0520'); sky.addColorStop(0.3,'#3a0a4a'); sky.addColorStop(0.6,'#8B1A5A'); sky.addColorStop(1,'#e8607a')
      ctx.fillStyle=sky; ctx.fillRect(0,0,w,h)
      // Stars
      for(let i=0;i<40;i++) {
        const stx=(i*237)%w, sty=(i*131)%(h*0.4)
        ctx.beginPath(); ctx.arc(stx,sty,0.7,0,Math.PI*2)
        ctx.fillStyle=`rgba(255,240,255,${0.3+Math.sin(t+i)*0.2})`; ctx.fill()
      }
      // Sun below horizon glow
      const sg2 = ctx.createRadialGradient(w*0.5,h*0.85,0,w*0.5,h*0.85,w*0.6)
      sg2.addColorStop(0,'rgba(255,160,80,0.4)'); sg2.addColorStop(0.3,'rgba(255,80,120,0.2)'); sg2.addColorStop(1,'transparent')
      ctx.fillStyle=sg2; ctx.fillRect(0,0,w,h)
      // Cloud sea layers
      for(let layer=0;layer<5;layer++) {
        const ly3 = h*(0.5+layer*0.08)
        const drift = Math.sin(t*0.1+layer)*15
        const alpha = 0.6+layer*0.08
        for(let c=0;c<8;c++) {
          const cx2 = (c*w/6+drift+layer*30)%(w+100)-50
          const cy2 = ly3+Math.sin(c*1.7)*15
          const cr2 = 60+Math.sin(c*0.8)*25
          const cc = ctx.createRadialGradient(cx2,cy2,0,cx2,cy2,cr2)
          const r=220+layer*5, g=180-layer*15, b=200-layer*10
          cc.addColorStop(0,`rgba(${r},${g},${b},${alpha})`); cc.addColorStop(1,'transparent')
          ctx.fillStyle=cc; ctx.fillRect(cx2-cr2,cy2-cr2,cr2*2,cr2*2)
        }
      }
      // Soft horizon glow through clouds
      const hglow = ctx.createLinearGradient(0,h*0.6,0,h*0.75)
      hglow.addColorStop(0,'transparent'); hglow.addColorStop(0.5,'rgba(255,120,80,0.15)'); hglow.addColorStop(1,'transparent')
      ctx.fillStyle=hglow; ctx.fillRect(0,h*0.6,w,h*0.15)
      // Floating wisps
      for(let wi=0;wi<6;wi++) {
        const wx2=(wi*w/5+t*8+Math.sin(t*0.2+wi)*30)%(w+200)-100
        const wy2=h*(0.4+wi*0.05)+Math.sin(t*0.15+wi)*20
        ctx.strokeStyle=`rgba(255,200,220,${0.1+Math.sin(t*0.3+wi)*0.05})`; ctx.lineWidth=20
        ctx.beginPath(); ctx.moveTo(wx2,wy2); ctx.lineTo(wx2+80,wy2+Math.sin(t+wi)*8); ctx.stroke()
      }
    }
  }
}

export { scenes }
export default function SceneRenderer({ sceneId, width = 800, height = 500 }: { sceneId: SceneId; width?: number; height?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let animId: number
    let t = 0
    const scene = scenes[sceneId]

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
