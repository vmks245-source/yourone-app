import type { CategoryKey } from './archetypes'

export const ARCHETYPE_LISTS: Record<CategoryKey, string[]> = {
  world:     ['meadow','neon_alley','ocean','tokyo_rooftop','desert_canyon','storm_forest','arctic','autumn_forest','factory','cloud_sea'],
  animal:    ['wolf','eagle','fox','bear','dolphin','lion','owl','deer','tiger','octopus','panther','elephant','raven','cheetah','horse','whale','snake','hummingbird','gorilla','falcon'],
  celebrity: ['elon_musk','rihanna','keanu_reeves','oprah','david_bowie','beyonce','obama','billie_eilish','freddie_mercury','steve_jobs','leonardo_dicaprio','kanye_west','taylor_swift','lady_gaga','morgan_freeman','einstein','marilyn_monroe','nikola_tesla','tupac','nelson_mandela','elvis_presley','michael_jackson','madonna','bob_dylan','bob_marley','kurt_cobain','jim_morrison','prince','whitney_houston','amy_winehouse','frank_sinatra','johnny_cash','elton_john','bruce_springsteen','stevie_wonder','eminem','jay_z','kendrick_lamar','drake','adele','harry_styles','ariana_grande','the_weeknd','lizzo','post_malone','meryl_streep','tom_hanks','denzel_washington','angelina_jolie','will_smith','dwayne_johnson','zendaya','emma_watson','natalie_portman','cate_blanchett','viola_davis','johnny_depp','harrison_ford','tom_cruise','julia_roberts','ryan_gosling','scarlett_johansson','chris_evans','jennifer_lopez','anne_hathaway','lebron_james','serena_williams','cristiano_ronaldo','lionel_messi','muhammad_ali','tiger_woods','michael_jordan','simone_biles','roger_federer','usain_bolt','kobe_bryant','venus_williams','lewis_hamilton','naomi_osaka','stephen_curry','martin_luther_king','mahatma_gandhi','malala_yousafzai','frida_kahlo','andy_warhol','marie_curie','carl_sagan','jane_goodall','winston_churchill','cleopatra','jeff_bezos','bill_gates','warren_buffett','richard_branson','mark_zuckerberg','sheryl_sandberg','jk_rowling','alan_turing','jack_ma','ray_dalio'],
  planet:    ['mars','venus','saturn','jupiter','neptune','mercury','pluto','orion_nebula','black_hole','sirius','moon','andromeda','europa','sun','milky_way','vega','titan'],
}

const CHARS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'

export function decodeCode(c: string, cat: CategoryKey): string | null {
  if (!c || c.length !== 8) return null
  const upper = c.toUpperCase()
  if (!upper.split('').every(ch => CHARS.includes(ch))) return null
  const idx = CHARS.indexOf(upper[0])
  const list = ARCHETYPE_LISTS[cat]
  if (idx < 0 || idx >= list.length) return null
  const chk = upper.slice(1, 6).split('').reduce((a, ch) => a + CHARS.indexOf(ch), 0) % 36
  if (CHARS[chk] !== upper[6]) return null
  return list[idx] ?? null
}

export function encodeCode(cat: CategoryKey, resultId: string, answers: Record<number, string | number>): string {
  const list = ARCHETYPE_LISTS[cat]
  const idx = Math.max(0, list.indexOf(resultId))
  const catIdx = Object.keys(ARCHETYPE_LISTS).indexOf(cat)
  const ts = Date.now()
  const n0 = Object.values(answers).reduce((a: number, v) => a + (typeof v === 'string' ? v.charCodeAt(0) : Number(v)), 0)
  const nonce = [CHARS[n0 % 36], CHARS[(idx + 1) % 36], CHARS[(ts & 0x3f) % 36], CHARS[((ts >> 8) & 0x3f) % 36], CHARS[catIdx % 36]].join('')
  const chk = nonce.split('').reduce((a, ch) => a + CHARS.indexOf(ch), 0) % 36
  const int2 = (idx * 5 + chk * 3 + 17) % 36
  return CHARS[idx % 36] + nonce + CHARS[chk] + CHARS[int2]
}
