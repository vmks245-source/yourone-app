export type GroupId = 'dreamer' | 'maker' | 'heart' | 'mind' | 'force'

export interface CompatibilityPair {
  with: GroupId
  label: string
  description: string
}

export interface GroupInfo {
  id: GroupId
  name: string
  tagline: string
  description: string
  color: string
  emoji: string
  traits: string[]
  compatibility: CompatibilityPair[]
}

// Every archetype ID mapped to its group
export const ARCHETYPE_GROUP: Record<string, GroupId> = {
  // ── Animals ──────────────────────────────────────────────────────────────
  eagle: 'dreamer', tiger: 'dreamer', falcon: 'dreamer', cheetah: 'dreamer',
  bear: 'maker', elephant: 'maker', gorilla: 'maker', horse: 'maker',
  dolphin: 'heart', deer: 'heart', whale: 'heart', hummingbird: 'heart',
  owl: 'mind', fox: 'mind', raven: 'mind', octopus: 'mind', snake: 'mind',
  lion: 'force', wolf: 'force', panther: 'force',
  // ── Worlds ────────────────────────────────────────────────────────────────
  tokyo_rooftop: 'dreamer', storm_forest: 'dreamer', cloud_sea: 'dreamer',
  factory: 'maker', desert_canyon: 'maker', autumn_forest: 'maker',
  meadow: 'heart',
  neon_alley: 'mind', arctic: 'mind', ocean: 'mind',
  // ── Celebrities ───────────────────────────────────────────────────────────
  elon_musk: 'dreamer', nikola_tesla: 'dreamer', alan_turing: 'dreamer',
  kanye_west: 'dreamer', david_bowie: 'dreamer', einstein: 'dreamer',
  steve_jobs: 'maker', beyonce: 'maker', cristiano_ronaldo: 'maker',
  kobe_bryant: 'maker', taylor_swift: 'maker', michael_jordan: 'maker',
  dwayne_johnson: 'maker', simone_biles: 'maker',
  oprah: 'heart', keanu_reeves: 'heart', obama: 'heart', bob_marley: 'heart',
  tom_hanks: 'heart', harry_styles: 'heart', stephen_curry: 'heart',
  serena_williams: 'heart', roger_federer: 'heart', adele: 'heart',
  marie_curie: 'mind', carl_sagan: 'mind', bill_gates: 'mind',
  ray_dalio: 'mind', warren_buffett: 'mind', jane_goodall: 'mind',
  billie_eilish: 'mind', kurt_cobain: 'mind', amy_winehouse: 'mind',
  rihanna: 'force', muhammad_ali: 'force', cleopatra: 'force',
  lebron_james: 'force', martin_luther_king: 'force',
  freddie_mercury: 'force', nelson_mandela: 'force',
  // ── Planets ───────────────────────────────────────────────────────────────
  mars: 'dreamer', orion_nebula: 'dreamer', sirius: 'dreamer', vega: 'dreamer',
  saturn: 'maker', titan: 'maker', jupiter: 'maker', europa: 'maker',
  venus: 'heart', moon: 'heart', milky_way: 'heart',
  mercury: 'mind', neptune: 'mind', pluto: 'mind', andromeda: 'mind',
  black_hole: 'force', sun: 'force',
}

export const GROUPS: Record<GroupId, GroupInfo> = {
  dreamer: {
    id: 'dreamer',
    name: 'The Dreamer',
    tagline: 'You see the future others haven\'t found yet.',
    description: 'Dreamers generate the vision. They operate in possibility space before it exists. They think at a scale that feels unreasonable to everyone else — until it isn\'t.',
    color: '#4488ff',
    emoji: '✦',
    traits: ['Big-picture thinking', 'Sees 10 years ahead', 'High tolerance for ambiguity', 'Generates ideas constantly'],
    compatibility: [
      {
        with: 'maker',
        label: 'The Founding Pair',
        description: 'You generate the vision they make real. Every company that changed the world had this combination at its core.',
      },
      {
        with: 'heart',
        label: 'The Creative Studio',
        description: 'You spark the direction. They make everyone feel it. Ideas here don\'t just get built — they resonate.',
      },
    ],
  },

  maker: {
    id: 'maker',
    name: 'The Maker',
    tagline: 'You build the thing everyone else is still talking about.',
    description: 'Makers execute with precision. Where others see plans, they see problems to solve. They measure twice, cut once, and ship things that work.',
    color: '#f09438',
    emoji: '⚙',
    traits: ['Execution-focused', 'Systems thinker', 'Relentless standard-setter', 'Builds what lasts'],
    compatibility: [
      {
        with: 'dreamer',
        label: 'The Founding Pair',
        description: 'They dream it. You build it. This is the most powerful partnership in any industry.',
      },
      {
        with: 'mind',
        label: 'The R&D Engine',
        description: 'You build the machine. They understand how it works. Precision meets curiosity — this drives breakthrough innovation.',
      },
    ],
  },

  heart: {
    id: 'heart',
    name: 'The Heart',
    tagline: 'You make people feel like they belong. That\'s the rarest power.',
    description: 'Hearts build the culture around the work. They connect people before they connect ideas. Everything they touch gains warmth, loyalty, and staying power.',
    color: '#f060a0',
    emoji: '◈',
    traits: ['Deep emotional intelligence', 'Builds genuine community', 'Makes people feel seen', 'Catalyses trust'],
    compatibility: [
      {
        with: 'force',
        label: 'The Movement',
        description: 'You build the community. They give it a voice. This is how culture actually gets made — not engineered, but felt.',
      },
      {
        with: 'dreamer',
        label: 'The Creative Studio',
        description: 'They spark the direction. You make everyone feel it. Things get made and they matter — immediately.',
      },
    ],
  },

  mind: {
    id: 'mind',
    name: 'The Mind',
    tagline: 'You find the pattern nobody else was looking for.',
    description: 'Minds see beneath the surface. They question, analyse, and understand things at a depth that makes their conclusions look like intuition. It isn\'t.',
    color: '#40c0c8',
    emoji: '⬡',
    traits: ['Deep analytical thinking', 'Questions assumptions', 'Finds hidden patterns', 'Thinks before speaking'],
    compatibility: [
      {
        with: 'force',
        label: 'The Power Team',
        description: 'You read the room before entering it. They command it. Strategy and presence together — this is what changes institutions.',
      },
      {
        with: 'maker',
        label: 'The R&D Engine',
        description: 'They build the machine. You understand how it works — and why it will eventually break. Precision meets curiosity.',
      },
    ],
  },

  force: {
    id: 'force',
    name: 'The Force',
    tagline: 'You command rooms you haven\'t even entered yet.',
    description: 'Forces move people. Not through manipulation — through presence. Their conviction is so total that others reorganise around it without being asked.',
    color: '#a07af8',
    emoji: '◉',
    traits: ['Gravitational presence', 'Leads movements', 'Conviction that changes minds', 'Protects what matters'],
    compatibility: [
      {
        with: 'mind',
        label: 'The Power Team',
        description: 'You command the room. They already know what\'s in it. Strategy and presence — this is what changes institutions.',
      },
      {
        with: 'heart',
        label: 'The Movement',
        description: 'They build the community. You give it a voice. This is how culture gets made at scale.',
      },
    ],
  },
}
