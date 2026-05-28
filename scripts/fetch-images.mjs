#!/usr/bin/env node
/**
 * Downloads 5 copyright-free 4K images per archetype (animal, celebrity, planet).
 * 36 archetypes × 5 images = 180 JPEGs → images/{archetypeId}_{0-4}.jpg
 * Usage: node scripts/fetch-images.mjs
 */

import { createWriteStream, mkdirSync, existsSync, statSync } from 'fs'
import { pipeline } from 'stream/promises'
import https from 'https'
import http from 'http'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.join(__dirname, '..', 'images')
mkdirSync(OUT, { recursive: true })

const KEY = process.env.PEXELS_API_KEY || 'NSWbBhxiZ8SDbYQkrXe7m6w2aLJmrINHj0vCM4VBnN9FJm5Md6MOWpuN'
const N = 5 // images per archetype

// ─── Queries ──────────────────────────────────────────────────────────────────

const ANIMAL_QUERIES = {
  wolf: 'wolf wildlife forest wild night', eagle: 'eagle soaring sky bird prey',
  fox: 'red fox wildlife nature', bear: 'grizzly bear wilderness wild',
  dolphin: 'dolphin ocean jumping water', lion: 'lion savanna pride portrait wildlife',
  owl: 'owl night bird wildlife', deer: 'deer forest morning mist',
  tiger: 'tiger jungle wildlife portrait', octopus: 'octopus underwater ocean sea',
  panther: 'leopard jaguar black cat night jungle', elephant: 'elephant herd africa savanna',
}

// Thematic aesthetic images — not photos of real people
const CELEBRITY_QUERIES = {
  elon_musk: 'rocket launch space exploration technology future',
  rihanna: 'luxury jewelry fashion gold red aesthetic',
  keanu_reeves: 'rainy city night film noir cinematic motorcycle',
  oprah: 'golden studio light stage warm interview',
  david_bowie: 'glam rock neon lightning artistic stage music',
  beyonce: 'golden stage performance crown royal light',
  obama: 'american flag patriotic washington monument sky',
  billie_eilish: 'dark moody neon green aesthetic glow room',
  freddie_mercury: 'concert stadium rock lights crowd epic',
  steve_jobs: 'minimalist clean white design technology apple',
  leonardo_dicaprio: 'wilderness nature forest ocean environmental',
  kanye_west: 'chicago urban streetwear art graffiti architecture',
}

const PLANET_QUERIES = {
  mars: 'mars planet red surface nasa desert landscape',
  venus: 'venus planet yellow orange atmosphere space',
  saturn: 'saturn rings planet nasa hubble telescope',
  jupiter: 'jupiter planet red spot gas giant space',
  neptune: 'neptune blue planet space deep',
  mercury: 'mercury planet gray craters space nasa',
  pluto: 'pluto dwarf planet icy nasa new horizons',
  orion_nebula: 'orion nebula colorful stars space galaxy',
  black_hole: 'black hole space dark event horizon galaxy',
  sirius: 'bright star night sky milky way galaxy stars',
  moon: 'full moon night sky lunar close',
  andromeda: 'andromeda galaxy spiral stars deep space',
}

const ALL = [
  ...Object.entries(ANIMAL_QUERIES).map(([id, q]) => ({ id, q, cat: 'animal' })),
  ...Object.entries(CELEBRITY_QUERIES).map(([id, q]) => ({ id, q, cat: 'celebrity' })),
  ...Object.entries(PLANET_QUERIES).map(([id, q]) => ({ id, q, cat: 'planet' })),
]

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { Authorization: KEY } }, res => {
      let d = ''
      res.on('data', c => d += c)
      res.on('end', () => { try { resolve(JSON.parse(d)) } catch(e) { reject(e) } })
    }).on('error', reject)
  })
}

async function search(q, n) {
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(q)}&per_page=${Math.min(n*2,30)}&orientation=landscape&size=large`
  const data = await fetch(url)
  if (!data.photos?.length) return []
  return data.photos.slice(0, n*2).map(p => p.src.original || p.src.large2x || p.src.large)
}

function dl(url, dest) {
  return new Promise((resolve, reject) => {
    const go = (u, h = 0) => {
      if (h > 8) return reject(new Error('too many redirects'))
      const mod = u.startsWith('https') ? https : http
      mod.get(u, res => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) return go(res.headers.location, h+1)
        if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`))
        pipeline(res, createWriteStream(dest)).then(resolve).catch(reject)
      }).on('error', reject)
    }
    go(url)
  })
}

async function main() {
  let ok = 0, fail = 0

  for (const { id, q, cat } of ALL) {
    const existing = Array.from({length:N}, (_,i) => {
      const f = path.join(OUT, `${id}_${i}.jpg`)
      return existsSync(f) && statSync(f).size > 30_000
    })
    if (existing.every(Boolean)) {
      console.log(`  ✓ skip [${cat}] ${id}`)
      ok += N; continue
    }

    process.stdout.write(`  ↓ [${cat}] ${id.padEnd(24)}… `)
    try {
      const urls = await search(q, N)
      if (!urls.length) throw new Error('no results')
      let got = 0, ui = 0
      for (let i = 0; i < N; i++) {
        if (existing[i]) { got++; continue }
        const dest = path.join(OUT, `${id}_${i}.jpg`)
        while (ui < urls.length) {
          try { await dl(urls[ui++], dest); const mb=(statSync(dest).size/1e6).toFixed(1); process.stdout.write(`${mb}MB `); got++; break } catch { /* try next url */ }
        }
      }
      console.log(`✓ ${got}/${N}`)
      ok += got
    } catch(e) {
      console.log(`✗ ${e.message}`)
      fail++
    }
    await new Promise(r => setTimeout(r, 400))
  }

  console.log(`\nDone: ${ok} ok, ${fail} failed`)
}

main().catch(console.error)
