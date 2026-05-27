#!/usr/bin/env node
/**
 * Downloads 50 copyright-free 4K videos from Pexels (one per scene).
 * Usage: node scripts/fetch-videos.mjs
 * Output: videos/{sceneId}.mp4
 */

import { createWriteStream, mkdirSync, existsSync, statSync } from 'fs'
import { pipeline } from 'stream/promises'
import https from 'https'
import http from 'http'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, '..')
const OUT  = path.join(ROOT, 'videos')
mkdirSync(OUT, { recursive: true })

const PEXELS_KEY = process.env.PEXELS_API_KEY || 'NSWbBhxiZ8SDbYQkrXe7m6w2aLJmrINHj0vCM4VBnN9FJm5Md6MOWpuN'

const SCENES = {
  meadow:               'green meadow sunlight wildflowers summer',
  meadow_dawn:          'morning fog meadow dew sunrise mist',
  meadow_dusk:          'golden hour sunset meadow warm light field',
  meadow_storm:         'overcast windy rain grass stormy field',
  meadow_night:         'night stars dark fireflies meadow',

  autumn_peak:          'autumn forest fall foliage red orange leaves',
  autumn_rain:          'rain autumn forest wet leaves dripping',
  autumn_amber:         'sunbeams amber autumn forest canopy light',
  autumn_frost:         'frost cold morning trees autumn fog',
  autumn_bare:          'bare winter trees fog mist empty forest',

  storm_lightning:      'lightning storm night thunder dramatic sky',
  storm_aftermath:      'forest mist after rain green peaceful',
  storm_blizzard:       'blizzard snow storm pine trees winter',
  storm_tropical:       'tropical storm wind palm trees hurricane',
  storm_fire:           'wildfire forest fire flames night',

  ocean:                'ocean waves dawn misty sea calm',
  ocean_midnight:       'night ocean moonlight dark waves sea',
  ocean_bioluminescent: 'bioluminescent waves glowing blue beach night',
  ocean_storm:          'storm ocean waves dramatic crashing sea',
  ocean_coral:          'coral reef underwater colorful fish clear',

  arctic:               'aurora borealis northern lights night stars',
  arctic_day:           'arctic midnight sun polar snow landscape',
  arctic_blizzard:      'blizzard snow storm whiteout winter',
  arctic_cathedral:     'ice cave glacier blue frozen lake',
  arctic_solstice:      'bonfire fire snow night winter dark',

  cloud_sea:            'aerial view clouds sunset pink orange sky',
  cloud_above:          'above clouds blue sky sunlight airplane',
  cloud_dawn:           'clouds sunrise dawn breaking orange horizon',
  cloud_volcanic:       'volcanic eruption lava smoke dramatic',
  cloud_infinite:       'night sky stars milky way timelapse',

  neon_alley:           'neon signs rain city night alley asia',
  neon_blade:           'city night rain street neon reflections cyberpunk',
  neon_karaoke:         'entertainment neon lights night japan street',
  neon_market:          'night market asia street food busy',
  neon_laundromat:      'quiet city street night rain urban empty',

  tokyo_rooftop:        'tokyo city night skyline rooftop',
  tokyo_shibuya:        'shibuya crossing tokyo pedestrians busy',
  tokyo_lanterns:       'japanese lanterns night temple street warm',
  tokyo_high:           'tokyo aerial night cityscape lights high',
  tokyo_ryokan:         'japanese garden pond zen tranquil nature',

  factory:              'abandoned factory industrial fog rust',
  factory_foundry:      'steel mill molten metal sparks foundry',
  factory_server:       'server room data center blue lights',
  factory_rail:         'train rail yard dusk industrial tracks',
  factory_tower:        'radio tower antenna night sky dark',

  desert_canyon:        'canyon desert sunset red rock dramatic',
  desert_arch:          'natural arch rock desert stars night',
  desert_storm:         'sandstorm dust storm desert dramatic',
  desert_saguaro:       'saguaro cactus desert night stars arizona',
  desert_salt:          'salt flat reflection mirror sky desert',
}

function pexelsFetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { Authorization: PEXELS_KEY } }, res => {
      let data = ''
      res.on('data', c => data += c)
      res.on('end', () => { try { resolve(JSON.parse(data)) } catch(e) { reject(e) } })
    }).on('error', reject)
  })
}

async function searchBestVideo(query) {
  const encoded = encodeURIComponent(query)
  for (const minWidth of ['3840', '1920']) {
    const url = `https://api.pexels.com/videos/search?query=${encoded}&per_page=15&min_width=${minWidth}&orientation=landscape`
    const data = await pexelsFetch(url)
    if (!data.videos?.length) continue

    const sorted = data.videos
      .filter(v => v.duration >= 10 && v.duration <= 60)
      .sort((a, b) => {
        const s = v => (v.duration >= 18 && v.duration <= 35 ? 100 : 0) + (v.width >= 3840 ? 50 : 0)
        return s(b) - s(a)
      })

    const video = sorted[0] || data.videos[0]
    const files = video.video_files.sort((a, b) => (b.width || 0) - (a.width || 0))
    const best = files.find(f => f.width >= 3840) || files.find(f => f.width >= 1920) || files[0]
    if (best?.link) return { link: best.link, id: video.id, width: best.width, duration: video.duration }
  }
  return null
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const follow = (u, hops = 0) => {
      if (hops > 8) return reject(new Error('Too many redirects'))
      const mod = u.startsWith('https') ? https : http
      mod.get(u, res => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location)
          return follow(res.headers.location, hops + 1)
        if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}`))
        pipeline(res, createWriteStream(dest)).then(resolve).catch(reject)
      }).on('error', reject)
    }
    follow(url)
  })
}

async function main() {
  const entries = Object.entries(SCENES)
  let ok = 0, fail = 0

  for (const [sceneId, query] of entries) {
    const dest = path.join(OUT, `${sceneId}.mp4`)
    if (existsSync(dest) && statSync(dest).size > 500_000) {
      console.log(`  ✓ skip  ${sceneId}`)
      ok++; continue
    }

    process.stdout.write(`  ↓ ${sceneId.padEnd(26)} … `)
    try {
      const video = await searchBestVideo(query)
      if (!video) throw new Error('no results')
      await downloadFile(video.link, dest)
      const mb = (statSync(dest).size / 1e6).toFixed(1)
      console.log(`✓  ${video.width}p · ${video.duration}s · ${mb}MB`)
      ok++
    } catch (err) {
      console.log(`✗  ${err.message}`)
      fail++
    }
    await new Promise(r => setTimeout(r, 350))
  }

  console.log(`\nDone: ${ok} ok, ${fail} failed`)
}

main().catch(console.error)
