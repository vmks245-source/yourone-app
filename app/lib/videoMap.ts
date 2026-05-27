const R2 = 'https://pub-558ced66b1054a088b11443d1cd1ea5d.r2.dev'

export const videoUrl = (sceneId: string) => `${R2}/${sceneId}.mp4`

// All 50 scene IDs in reel order for the ambient landing loop
export const REEL_ORDER = [
  'cloud_sea', 'ocean', 'arctic', 'neon_alley',
  'desert_canyon', 'storm_lightning', 'meadow', 'tokyo_rooftop',
  'ocean_bioluminescent', 'arctic_solstice', 'autumn_amber', 'neon_blade',
  'meadow_dusk', 'ocean_midnight', 'storm_aftermath', 'tokyo_lanterns',
  'desert_arch', 'cloud_dawn', 'arctic_cathedral', 'factory_foundry',
]
