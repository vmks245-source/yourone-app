export type { SceneConfig } from './types'

export {
  meadow_0, meadow_1, meadow_2, meadow_3, meadow_4,
  autumn_forest_0, autumn_forest_1, autumn_forest_2, autumn_forest_3, autumn_forest_4,
  storm_forest_0, storm_forest_1, storm_forest_2, storm_forest_3, storm_forest_4,
} from './nature'

export {
  ocean_0, ocean_1, ocean_2, ocean_3, ocean_4,
  arctic_0, arctic_1, arctic_2, arctic_3, arctic_4,
  cloud_sea_0, cloud_sea_1, cloud_sea_2, cloud_sea_3, cloud_sea_4,
} from './water'

export {
  neon_alley_0, neon_alley_1, neon_alley_2, neon_alley_3, neon_alley_4,
  tokyo_rooftop_0, tokyo_rooftop_1, tokyo_rooftop_2, tokyo_rooftop_3, tokyo_rooftop_4,
  factory_0, factory_1, factory_2, factory_3, factory_4,
} from './urban'

export {
  desert_canyon_0, desert_canyon_1, desert_canyon_2, desert_canyon_3, desert_canyon_4,
} from './desert'

import {
  meadow_0, meadow_1, meadow_2, meadow_3, meadow_4,
  autumn_forest_0, autumn_forest_1, autumn_forest_2, autumn_forest_3, autumn_forest_4,
  storm_forest_0, storm_forest_1, storm_forest_2, storm_forest_3, storm_forest_4,
} from './nature'
import {
  ocean_0, ocean_1, ocean_2, ocean_3, ocean_4,
  arctic_0, arctic_1, arctic_2, arctic_3, arctic_4,
  cloud_sea_0, cloud_sea_1, cloud_sea_2, cloud_sea_3, cloud_sea_4,
} from './water'
import {
  neon_alley_0, neon_alley_1, neon_alley_2, neon_alley_3, neon_alley_4,
  tokyo_rooftop_0, tokyo_rooftop_1, tokyo_rooftop_2, tokyo_rooftop_3, tokyo_rooftop_4,
  factory_0, factory_1, factory_2, factory_3, factory_4,
} from './urban'
import {
  desert_canyon_0, desert_canyon_1, desert_canyon_2, desert_canyon_3, desert_canyon_4,
} from './desert'
import type { SceneConfig } from './types'

export type SceneId =
  | 'meadow' | 'meadow_dawn' | 'meadow_dusk' | 'meadow_storm' | 'meadow_night'
  | 'autumn_peak' | 'autumn_rain' | 'autumn_amber' | 'autumn_frost' | 'autumn_bare'
  | 'storm_lightning' | 'storm_aftermath' | 'storm_blizzard' | 'storm_tropical' | 'storm_fire'
  | 'ocean' | 'ocean_midnight' | 'ocean_bioluminescent' | 'ocean_storm' | 'ocean_coral'
  | 'arctic' | 'arctic_day' | 'arctic_blizzard' | 'arctic_cathedral' | 'arctic_solstice'
  | 'cloud_sea' | 'cloud_above' | 'cloud_dawn' | 'cloud_volcanic' | 'cloud_infinite'
  | 'neon_alley' | 'neon_blade' | 'neon_karaoke' | 'neon_market' | 'neon_laundromat'
  | 'tokyo_rooftop' | 'tokyo_shibuya' | 'tokyo_lanterns' | 'tokyo_high' | 'tokyo_ryokan'
  | 'factory' | 'factory_foundry' | 'factory_server' | 'factory_rail' | 'factory_tower'
  | 'desert_canyon' | 'desert_arch' | 'desert_storm' | 'desert_saguaro' | 'desert_salt'

export const scenes: Record<SceneId, SceneConfig> = {
  meadow:           meadow_1,
  meadow_dawn:      meadow_0,
  meadow_dusk:      meadow_2,
  meadow_storm:     meadow_3,
  meadow_night:     meadow_4,

  autumn_peak:      autumn_forest_0,
  autumn_rain:      autumn_forest_1,
  autumn_amber:     autumn_forest_2,
  autumn_frost:     autumn_forest_3,
  autumn_bare:      autumn_forest_4,

  storm_lightning:  storm_forest_0,
  storm_aftermath:  storm_forest_1,
  storm_blizzard:   storm_forest_2,
  storm_tropical:   storm_forest_3,
  storm_fire:       storm_forest_4,

  ocean:               ocean_0,
  ocean_midnight:      ocean_1,
  ocean_bioluminescent: ocean_2,
  ocean_storm:         ocean_3,
  ocean_coral:         ocean_4,

  arctic:           arctic_0,
  arctic_day:       arctic_1,
  arctic_blizzard:  arctic_2,
  arctic_cathedral: arctic_3,
  arctic_solstice:  arctic_4,

  cloud_sea:        cloud_sea_0,
  cloud_above:      cloud_sea_1,
  cloud_dawn:       cloud_sea_2,
  cloud_volcanic:   cloud_sea_3,
  cloud_infinite:   cloud_sea_4,

  neon_alley:       neon_alley_0,
  neon_blade:       neon_alley_1,
  neon_karaoke:     neon_alley_2,
  neon_market:      neon_alley_3,
  neon_laundromat:  neon_alley_4,

  tokyo_rooftop:    tokyo_rooftop_0,
  tokyo_shibuya:    tokyo_rooftop_1,
  tokyo_lanterns:   tokyo_rooftop_2,
  tokyo_high:       tokyo_rooftop_3,
  tokyo_ryokan:     tokyo_rooftop_4,

  factory:          factory_0,
  factory_foundry:  factory_1,
  factory_server:   factory_2,
  factory_rail:     factory_3,
  factory_tower:    factory_4,

  desert_canyon:    desert_canyon_0,
  desert_arch:      desert_canyon_1,
  desert_storm:     desert_canyon_2,
  desert_saguaro:   desert_canyon_3,
  desert_salt:      desert_canyon_4,
}

// Quiz archetype → canonical SceneId
export const archetypeToScene: Record<string, SceneId> = {
  meadow:        'meadow',
  autumn_forest: 'autumn_peak',
  storm_forest:  'storm_lightning',
  ocean:         'ocean',
  arctic:        'arctic',
  cloud_sea:     'cloud_sea',
  neon_alley:    'neon_alley',
  tokyo_rooftop: 'tokyo_rooftop',
  factory:       'factory',
  desert_canyon: 'desert_canyon',
}

export const allSceneIds = Object.keys(scenes) as SceneId[]
