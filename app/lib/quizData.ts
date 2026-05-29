import type { CategoryKey } from './archetypes'

export interface QuizOption {
  value: string; label: string; emoji: string; desc: string
}

export interface QuizQuestion {
  id: number
  type: 'choice' | 'slider' | 'text'
  text: string
  sub: string
  options?: QuizOption[]
  left?: string; right?: string
  leftEmoji?: string; rightEmoji?: string
  placeholder?: string
}

// ─── WORLD QUIZ ($1.80) — 8 character + 2 place/mood questions ───────────────

export const WORLD_QUESTIONS: QuizQuestion[] = [
  {
    id: 1, type: 'choice',
    text: 'When things fall apart around you, your first instinct is to…',
    sub: 'Not what you should do. What you actually do.',
    options: [
      { value: 'run_toward', label: 'Run toward it', emoji: '🔥', desc: 'You need to touch the chaos directly' },
      { value: 'go_quiet', label: 'Go completely quiet', emoji: '🌑', desc: 'Retreat until you understand it' },
      { value: 'rebuild', label: 'Start rebuilding', emoji: '⚙️', desc: 'Before the dust settles, you are already planning' },
      { value: 'watch_wait', label: 'Watch and wait', emoji: '🦅', desc: 'Read the full situation before you commit to anything' },
    ],
  },
  {
    id: 2, type: 'choice',
    text: 'The thing you guard most fiercely about yourself is…',
    sub: 'The thing you would never let just anyone reach.',
    options: [
      { value: 'solitude', label: 'Your solitude', emoji: '🌌', desc: 'The version of you no one else gets' },
      { value: 'depth', label: 'Your capacity to feel', emoji: '🌊', desc: 'How much you actually experience' },
      { value: 'vision', label: 'Your vision', emoji: '💡', desc: 'The thing only you can see clearly' },
      { value: 'loyalty', label: 'Your loyalty', emoji: '🐺', desc: 'You give it rarely and completely' },
    ],
  },
  {
    id: 3, type: 'choice',
    text: 'Which sky speaks to you?',
    sub: 'Close your eyes for a moment. Then choose.',
    options: [
      { value: 'bright', label: 'Bright & boundless', emoji: '☀️', desc: 'Golden, warm, no limits' },
      { value: 'stormy', label: 'Stormy & electric', emoji: '⚡', desc: 'Thunder, energy, alive' },
      { value: 'night', label: 'Deep night sky', emoji: '🌌', desc: 'Stars, silence, infinite' },
      { value: 'dawn', label: 'Soft at dawn', emoji: '🌅', desc: 'Quiet, rising, becoming' },
    ],
  },
  {
    id: 4, type: 'choice',
    text: 'Most people who know you well would say you are…',
    sub: 'The honest answer, not the flattering one.',
    options: [
      { value: 'intense', label: 'Intense', emoji: '🌋', desc: 'More than you let them see' },
      { value: 'reliable', label: 'Reliable', emoji: '⚓', desc: 'The one who shows up' },
      { value: 'unpredictable', label: 'Unpredictable', emoji: '🌀', desc: 'Always surprising them' },
      { value: 'unreachable', label: 'Hard to reach', emoji: '🏔️', desc: 'But worth the effort' },
    ],
  },
  {
    id: 5, type: 'slider',
    text: 'In how you move through life, you are…',
    sub: 'Where you actually sit, not where you wish you sat.',
    left: 'Chaotic & intuitive', right: 'Measured & deliberate',
    leftEmoji: '🌪️', rightEmoji: '🧊',
  },
  {
    id: 6, type: 'choice',
    text: 'What you protect most in the people you love is…',
    sub: 'The thing you could not watch them lose.',
    options: [
      { value: 'freedom', label: 'Their freedom', emoji: '🦋', desc: 'You never cage what you care about' },
      { value: 'peace', label: 'Their peace', emoji: '🕊️', desc: 'You absorb their storm so they don\'t have to' },
      { value: 'truth', label: 'Their truth', emoji: '🔮', desc: 'You push them toward who they actually are' },
      { value: 'trust', label: 'Their trust', emoji: '🤝', desc: 'You never give them reason to doubt you' },
    ],
  },
  {
    id: 7, type: 'choice',
    text: 'Which place pulls you in?',
    sub: 'You find yourself here. No explanation needed.',
    options: [
      { value: 'vast_open', label: 'Vast and open', emoji: '🏔️', desc: 'Fields, sky, horizon — no walls' },
      { value: 'hidden_corner', label: 'A hidden corner', emoji: '🏚️', desc: 'Tucked away, secret, yours' },
      { value: 'edge_of_water', label: 'Edge of water', emoji: '🌊', desc: 'Sea, lake, the in-between' },
      { value: 'high_above', label: 'High above', emoji: '🌆', desc: 'Rooftops, peaks, looking down at everything' },
    ],
  },
  {
    id: 8, type: 'choice',
    text: 'When you are alone for a long time, what surfaces first?',
    sub: 'The thing that was waiting underneath everything else.',
    options: [
      { value: 'pretending', label: 'That you have been pretending', emoji: '🎭', desc: 'A quiet reckoning with the gap between face and feeling' },
      { value: 'clarity', label: 'A clarity you can\'t find anywhere else', emoji: '💎', desc: 'Solitude is where you actually think' },
      { value: 'restless', label: 'Restlessness', emoji: '🔥', desc: 'You need friction to feel alive' },
      { value: 'unnamed', label: 'Sadness without a name', emoji: '🌧️', desc: 'Not bad — just heavy. And honest.' },
    ],
  },
  {
    id: 9, type: 'choice',
    text: 'Which sound feels like you?',
    sub: 'The one that could play on a loop forever.',
    options: [
      { value: 'wind', label: 'Wind through grass', emoji: '🌾', desc: 'Constant, soft, free' },
      { value: 'rain', label: 'Heavy rain', emoji: '🌧️', desc: 'Relentless, cleansing, honest' },
      { value: 'city', label: 'City at night', emoji: '🌃', desc: 'Distant hum, pulse, alive' },
      { value: 'silence', label: 'Deep silence', emoji: '🔇', desc: 'So quiet you can finally hear yourself' },
    ],
  },
  {
    id: 10, type: 'text',
    text: 'One word. Your truest self is…',
    sub: 'Don\'t think. The first word is the right one.',
    placeholder: 'Type your word…',
  },
]

// ─── ANIMAL QUIZ ($0.99) ─────────────────────────────────────────────────────

export const ANIMAL_QUESTIONS: QuizQuestion[] = [
  {
    id: 1, type: 'choice',
    text: 'When you sense danger, your instinct is to…',
    sub: 'Pure instinct. Before the mind catches up.',
    options: [
      { value: 'face', label: 'Face it directly', emoji: '🦁', desc: 'You need to see the threat head-on' },
      { value: 'vanish', label: 'Disappear instantly', emoji: '🐾', desc: 'You fight from the shadows, not the centre' },
      { value: 'circle', label: 'Circle it first', emoji: '🦅', desc: 'Assess everything before committing' },
      { value: 'alert', label: 'Alert the others', emoji: '🐘', desc: 'Your instinct is collective protection' },
    ],
  },
  {
    id: 2, type: 'choice',
    text: 'Your natural place in a group is…',
    sub: 'Not what you were told. What actually happens.',
    options: [
      { value: 'lead_quietly', label: 'Lead without announcing it', emoji: '🐺', desc: 'The one who decides without declaring it' },
      { value: 'alone', label: 'Alone, joining only when needed', emoji: '🐆', desc: 'You cooperate — but solitude is your default' },
      { value: 'bridge', label: 'The connector between others', emoji: '🐬', desc: 'You move between groups and make things work' },
      { value: 'centre', label: 'The calm in the middle', emoji: '🐘', desc: 'The one people orient themselves around' },
    ],
  },
  {
    id: 3, type: 'choice',
    text: 'How do you get what you want?',
    sub: 'Your actual strategy, stripped of politeness.',
    options: [
      { value: 'direct', label: 'Direct pursuit', emoji: '🐯', desc: 'You close the distance fast when you commit' },
      { value: 'patience', label: 'Patience', emoji: '🦉', desc: 'You wait longer than anyone else would' },
      { value: 'intelligence', label: 'Outthinking it', emoji: '🦊', desc: 'You solve the problem before it becomes one' },
      { value: 'together', label: 'With others', emoji: '🐺', desc: 'You have never needed to do it alone' },
    ],
  },
  {
    id: 4, type: 'choice',
    text: 'When you love something or someone, you…',
    sub: 'How love actually looks when it is yours.',
    options: [
      { value: 'protect', label: 'Protect it fiercely and silently', emoji: '🐻', desc: 'From everything, without saying so' },
      { value: 'full_attention', label: 'Give it your complete attention', emoji: '🦅', desc: 'For as long as it lasts, completely' },
      { value: 'lead_toward', label: 'Lead it somewhere better', emoji: '🦁', desc: 'You cannot help but push the things you love forward' },
      { value: 'play', label: 'Play with it, test it', emoji: '🐬', desc: 'Your love is alive, curious, never static' },
    ],
  },
  {
    id: 5, type: 'slider',
    text: 'Your nature is…',
    sub: 'Not what you perform. What you actually are.',
    left: 'Solitary & self-contained', right: 'Pack-driven & communal',
    leftEmoji: '🐯', rightEmoji: '🐺',
  },
  {
    id: 6, type: 'choice',
    text: 'What you leave in every room you enter is…',
    sub: 'What people feel after you have left.',
    options: [
      { value: 'stillness', label: 'Stillness', emoji: '🦉', desc: 'Things slow down around you' },
      { value: 'energy', label: 'Energy', emoji: '⚡', desc: 'Things speed up' },
      { value: 'sharpness', label: 'Sharpness', emoji: '💎', desc: 'People think more clearly' },
      { value: 'warmth', label: 'Warmth', emoji: '🌅', desc: 'People feel safer' },
    ],
  },
  {
    id: 7, type: 'choice',
    text: 'Your most honest relationship is with…',
    sub: 'The truth of where you actually live.',
    options: [
      { value: 'self', label: 'The version of yourself no one sees', emoji: '🌑', desc: 'Your interior life is the real one' },
      { value: 'nature', label: 'The natural world', emoji: '🌿', desc: 'It does not ask anything of you' },
      { value: 'work', label: 'The thing you build or create', emoji: '🔨', desc: 'Creation is your primary relationship' },
      { value: 'others', label: 'Other people', emoji: '🤝', desc: 'You need them — genuinely and completely' },
    ],
  },
  {
    id: 8, type: 'choice',
    text: 'When something breaks you open, you…',
    sub: 'The honest pattern. Not the composed version.',
    options: [
      { value: 'vanish_heal', label: 'Disappear until you\'re whole again', emoji: '🌑', desc: 'Solitude repairs. Contact only postpones it.' },
      { value: 'move_through', label: 'Let it move through you fully', emoji: '🌊', desc: 'Feel every edge of it until it passes.' },
      { value: 'protect_others', label: 'Make sure no one else feels it', emoji: '🐻', desc: 'Your pain stays yours. Not theirs.' },
      { value: 'redirect', label: 'Redirect it into something', emoji: '🦊', desc: 'Pain is energy. Transform it immediately.' },
    ],
  },
  {
    id: 9, type: 'choice',
    text: 'What you do when no one is watching reveals…',
    sub: 'The truest self is the one that nobody performs.',
    options: [
      { value: 'always_building', label: 'You are always building something', emoji: '🦅', desc: 'Arranging, creating, constructing — always.' },
      { value: 'watching_closely', label: 'You watch everything closely', emoji: '🦉', desc: 'Reading the world constantly when the pressure is off.' },
      { value: 'deeper_rest', label: 'You rest harder than you let on', emoji: '🐻', desc: 'Conservation. You are built for deep recovery.' },
      { value: 'more_playful', label: 'You are lighter than you show', emoji: '🐬', desc: 'Alone, the mask comes off. You are easier than they know.' },
    ],
  },
  {
    id: 10, type: 'text',
    text: 'One word. In your most honest moment, you are…',
    sub: 'The word you would use if no one was listening.',
    placeholder: 'Type your word…',
  },
]

// ─── CELEBRITY QUIZ ($1.50) ──────────────────────────────────────────────────

export const CELEBRITY_QUESTIONS: QuizQuestion[] = [
  {
    id: 1, type: 'choice',
    text: 'Your ambition is…',
    sub: 'What it actually is. Not what sounds good.',
    options: [
      { value: 'change_infrastructure', label: 'To change how something works', emoji: '⚙️', desc: 'An industry, a system, a fundamental assumption' },
      { value: 'create_true', label: 'To create something undeniably true', emoji: '🎨', desc: 'So honest it cannot be ignored' },
      { value: 'become_known', label: 'To become something the world knows', emoji: '👑', desc: 'Legacy. Recognition. Impact at scale.' },
      { value: 'make_feel', label: 'To make people feel less alone', emoji: '🤝', desc: 'The emotional reach is the entire point' },
    ],
  },
  {
    id: 2, type: 'choice',
    text: 'When something you built fails publicly, you…',
    sub: 'Your actual response. Not the official statement.',
    options: [
      { value: 'rebuild_louder', label: 'Rebuild immediately, louder', emoji: '🚀', desc: 'Failure is data. Next iteration starts now.' },
      { value: 'disappear_process', label: 'Disappear, then return changed', emoji: '🌑', desc: 'Process privately. Return different.' },
      { value: 'turn_to_art', label: 'Turn it into something', emoji: '🎭', desc: 'Failure becomes content, philosophy, evolution' },
      { value: 'absorb_forgive', label: 'Absorb it and keep moving', emoji: '🌊', desc: 'Grief it. Forgive yourself. Continue.' },
    ],
  },
  {
    id: 3, type: 'choice',
    text: 'The thing that makes you difficult also makes you…',
    sub: 'Name the shadow and what lives on the other side.',
    options: [
      { value: 'visionary', label: 'Visionary', emoji: '🔭', desc: 'You see ten years ahead and have no patience for now' },
      { value: 'magnetic', label: 'Magnetic', emoji: '⚡', desc: 'Your intensity draws and exhausts in equal measure' },
      { value: 'unstoppable', label: 'Unstoppable', emoji: '🏔️', desc: 'You do not stop when you should — that is also why you won' },
      { value: 'transformative', label: 'Transformative', emoji: '🌀', desc: 'You destabilise everything around you — which creates new things' },
    ],
  },
  {
    id: 4, type: 'choice',
    text: 'The version of you the world sees is…',
    sub: 'How deliberate is your public self?',
    options: [
      { value: 'constructed', label: 'Deliberately constructed', emoji: '🏗️', desc: 'You control the narrative' },
      { value: 'accidentally', label: 'Accidentally visible', emoji: '🌊', desc: 'You did not plan any of this' },
      { value: 'exactly_you', label: 'Exactly you', emoji: '✨', desc: 'You never learned to perform' },
      { value: 'character', label: 'A character', emoji: '🎭', desc: 'Your private self they will never reach' },
    ],
  },
  {
    id: 5, type: 'slider',
    text: 'Your decision-making runs on…',
    sub: 'Where you actually operate when the stakes are real.',
    left: 'Pure logic & data', right: 'Pure instinct & emotion',
    leftEmoji: '🖥️', rightEmoji: '🫀',
  },
  {
    id: 6, type: 'choice',
    text: 'Your relationship with power is…',
    sub: 'Honest self-assessment. No one is watching.',
    options: [
      { value: 'want_it', label: 'You want it, unapologetically', emoji: '⚡', desc: 'To do what needs doing. There is no other way.' },
      { value: 'carry_carefully', label: 'You have it but carry it carefully', emoji: '⚖️', desc: 'You are aware of its weight at all times' },
      { value: 'reject_quietly', label: 'You reject it publicly, accumulate quietly', emoji: '🦊', desc: 'Your actual influence is not the stated kind' },
      { value: 'in_service', label: 'You use it entirely for others', emoji: '🕊️', desc: 'The power itself is never interesting — only what it can do' },
    ],
  },
  {
    id: 7, type: 'choice',
    text: 'You want to be remembered as…',
    sub: 'Your truest answer about legacy.',
    options: [
      { value: 'changed_possible', label: 'The one who changed what was possible', emoji: '🚀', desc: 'A structural shift in what humans can do' },
      { value: 'completely_real', label: 'The one who was completely real', emoji: '🔥', desc: 'Devastatingly honest, never performed' },
      { value: 'built_empire', label: 'The one who built an empire', emoji: '👑', desc: 'Cultural, financial — it matters and you know it' },
      { value: 'less_alone', label: 'The one who made people feel less alone', emoji: '🤝', desc: 'That reach is the only metric' },
    ],
  },
  {
    id: 8, type: 'choice',
    text: 'When you create something — a project, an idea, a life — what matters most?',
    sub: 'The thing you cannot compromise on.',
    options: [
      { value: 'executes_perfectly', label: 'That it works perfectly', emoji: '🔬', desc: 'Execution is everything. Ship nothing broken.' },
      { value: 'completely_honest', label: 'That it\'s completely honest', emoji: '🎯', desc: 'Fail authentically before succeeding falsely' },
      { value: 'outlive_you', label: 'That it outlives you', emoji: '⏳', desc: 'It should be here long after you are not' },
      { value: 'helps_others', label: 'That it helps someone', emoji: '🌱', desc: 'Impact on others is the only real metric' },
    ],
  },
  {
    id: 9, type: 'text',
    text: 'Your public identity in one word is…',
    sub: 'What you would want on the poster.',
    placeholder: 'Type your word…',
  },
]

// ─── PLANET QUIZ ($2.90) ─────────────────────────────────────────────────────

export const PLANET_QUESTIONS: QuizQuestion[] = [
  {
    id: 1, type: 'choice',
    text: 'Your relationship with time is…',
    sub: 'How you actually experience it moving around you.',
    options: [
      { value: 'ahead', label: 'You move faster than it', emoji: '☄️', desc: 'You are always already in the next thing' },
      { value: 'slower', label: 'You move slower, on purpose', emoji: '🪐', desc: 'You think in decades. That is not lag. That is wisdom.' },
      { value: 'ignore', label: 'You ignore it completely', emoji: '🌌', desc: 'Time is someone else\'s problem' },
      { value: 'controlled', label: 'It controls you', emoji: '⏳', desc: 'Always aware, always counting' },
    ],
  },
  {
    id: 2, type: 'choice',
    text: 'You are most moved by…',
    sub: 'What actually reaches you, underneath everything.',
    options: [
      { value: 'smallest', label: 'The smallest things', emoji: '🌱', desc: 'A word, a glance, a detail no one else caught' },
      { value: 'largest', label: 'The largest things', emoji: '🌍', desc: 'Systems, patterns, the arc of civilisations' },
      { value: 'between', label: 'The space between things', emoji: '🌑', desc: 'Silence, distance, absence — what is not there' },
      { value: 'ending', label: 'Things that end', emoji: '🍂', desc: 'Beauty is always most itself in the moment of passing' },
    ],
  },
  {
    id: 3, type: 'choice',
    text: 'People are drawn to you because…',
    sub: 'What you actually provide to the people who stay.',
    options: [
      { value: 'unnamed_force', label: 'A force they can\'t name but feel', emoji: '🌑', desc: 'Your gravity is not announced' },
      { value: 'most_stable', label: 'You are the most stable thing near them', emoji: '🏔️', desc: 'The anchor. The constant.' },
      { value: 'most_exciting', label: 'You are the most alive thing near them', emoji: '⚡', desc: 'Electric. Unpredictable. Worth it.' },
      { value: 'go_places', label: 'You go places no one else follows', emoji: '🚀', desc: 'The distance itself is the draw' },
    ],
  },
  {
    id: 4, type: 'choice',
    text: 'What you sacrifice to be who you are…',
    sub: 'The cost that is real and you know it.',
    options: [
      { value: 'closeness', label: 'Closeness', emoji: '🌌', desc: 'You exist at a distance that most people find too far' },
      { value: 'speed', label: 'Speed', emoji: '🐢', desc: 'You chose depth over momentum, every time' },
      { value: 'safety', label: 'Safety', emoji: '🌋', desc: 'Your nature is inherently volatile and you have made peace with it' },
      { value: 'privacy', label: 'Privacy', emoji: '🔦', desc: 'You were always going to be visible' },
    ],
  },
  {
    id: 5, type: 'slider',
    text: 'Your inner world is…',
    sub: 'The actual weather inside you, not the forecast.',
    left: 'Turbulent & stormy', right: 'Still & crystalline',
    leftEmoji: '🌪️', rightEmoji: '💎',
  },
  {
    id: 6, type: 'choice',
    text: 'What you want to leave behind is…',
    sub: 'The legacy question. Your truest answer.',
    options: [
      { value: 'pattern', label: 'A pattern others can map', emoji: '🗺️', desc: 'Structural. Lasting. Something that organises what comes after.' },
      { value: 'feeling', label: 'A feeling', emoji: '🌅', desc: 'People who knew you changed. That is enough.' },
      { value: 'question', label: 'A question', emoji: '❓', desc: 'You want to disturb more than you want to answer' },
      { value: 'mystery', label: 'A mystery', emoji: '🌑', desc: 'You were never meant to be fully understood' },
    ],
  },
  {
    id: 7, type: 'choice',
    text: 'The truth about you that almost no one knows is…',
    sub: 'The thing that is real and private.',
    options: [
      { value: 'same_wound', label: 'You\'ve been circling the same wound your whole life', emoji: '🌀', desc: 'Not stuck — orbiting something that matters' },
      { value: 'warmer', label: 'You are much warmer than your distance suggests', emoji: '🌅', desc: 'The cold is not the truth of you' },
      { value: 'contains_violence', label: 'You contain something powerful you have learned to hold', emoji: '🌋', desc: 'Not destructive — transformative' },
      { value: 'older', label: 'You are older than you look, in ways that matter', emoji: '🌌', desc: 'Something in you has been here longer than the rest of you' },
    ],
  },
  {
    id: 8, type: 'choice',
    text: 'Your creative or intellectual output is…',
    sub: 'The rhythm of what you make.',
    options: [
      { value: 'dense_slow', label: 'Dense and slow — years between major works', emoji: '🪐', desc: 'But when it arrives, it is unmissable' },
      { value: 'constant', label: 'Constant — always in motion, always producing', emoji: '☿', desc: 'The output never stops and neither do you' },
      { value: 'explosive', label: 'Explosive — massive, rare, world-altering', emoji: '💥', desc: 'You do not make small things' },
      { value: 'circular', label: 'The same great theme, circled forever', emoji: '🔄', desc: 'You return to the same questions with increasing clarity' },
    ],
  },
  {
    id: 9, type: 'choice',
    text: 'If you could change one thing about how humans relate to the universe…',
    sub: 'Your actual cosmological wish.',
    options: [
      { value: 'feel_scale', label: 'Make them feel the actual scale', emoji: '🌌', desc: 'We are so small. That is beautiful and it changes everything.' },
      { value: 'less_afraid', label: 'Make them less afraid of the dark', emoji: '🌑', desc: 'The unknown is not a threat. It is an invitation.' },
      { value: 'longer', label: 'Make them think longer', emoji: '⏳', desc: 'The problems we have come from thinking in days, not centuries' },
      { value: 'connected', label: 'Make them feel connected to all of it', emoji: '✨', desc: 'The atoms in you were in a star. That should change how you treat everything.' },
    ],
  },
  {
    id: 10, type: 'text',
    text: 'In one word — your cosmic nature is…',
    sub: 'Not what you want it to be. What it already is.',
    placeholder: 'Type your word…',
  },
]

export const QUIZ_DATA: Record<CategoryKey, QuizQuestion[]> = {
  world:     WORLD_QUESTIONS,
  animal:    ANIMAL_QUESTIONS,
  celebrity: CELEBRITY_QUESTIONS,
  planet:    PLANET_QUESTIONS,
}

// ─── Scoring ─────────────────────────────────────────────────────────────────

type A = Record<number, string | number>

export function mapWorldAnswers(a: A): string {
  const s = { bright: 0, dark: 0, nature: 0, urban: 0, calm: 0, wild: 0, open: 0, hidden: 0 }
  const q1 = a[1]; const q2 = a[2]; const q3 = a[3]; const q4 = a[4]
  const slider = Number(a[5] ?? 50)
  const q6 = a[6]; const q7 = a[7]; const q8 = a[8]; const q9 = a[9]

  if (q1 === 'run_toward') { s.wild += 2; s.bright += 1 }
  if (q1 === 'go_quiet')   { s.dark += 2; s.hidden += 1 }
  if (q1 === 'rebuild')    { s.urban += 2; s.bright += 1 }
  if (q1 === 'watch_wait') { s.calm += 2; s.open += 1 }

  if (q2 === 'solitude') { s.dark += 2; s.hidden += 2 }
  if (q2 === 'depth')    { s.dark += 1; s.nature += 1 }
  if (q2 === 'vision')   { s.open += 2; s.bright += 1 }
  if (q2 === 'loyalty')  { s.nature += 2; s.calm += 1 }

  if (q3 === 'bright') { s.bright += 2; s.open += 1 }
  if (q3 === 'stormy') { s.wild += 2; s.dark += 1 }
  if (q3 === 'night')  { s.dark += 2 }
  if (q3 === 'dawn')   { s.calm += 1; s.nature += 1 }

  if (q4 === 'intense')      { s.dark += 1; s.wild += 1 }
  if (q4 === 'reliable')     { s.calm += 2; s.nature += 1 }
  if (q4 === 'unpredictable') { s.wild += 2; s.urban += 1 }
  if (q4 === 'unreachable')  { s.hidden += 2; s.dark += 1 }

  if (slider < 35) { s.wild += 2; s.dark += 1 }
  if (slider > 65) { s.calm += 2 }

  if (q6 === 'freedom') { s.open += 2; s.nature += 1 }
  if (q6 === 'peace')   { s.calm += 2; s.nature += 1 }
  if (q6 === 'truth')   { s.dark += 1; s.bright += 1 }
  if (q6 === 'trust')   { s.calm += 1; s.hidden += 1 }

  if (q7 === 'vast_open')     { s.open += 2; s.nature += 1 }
  if (q7 === 'hidden_corner') { s.hidden += 2; s.dark += 1 }
  if (q7 === 'edge_of_water') { s.calm += 1; s.nature += 1 }
  if (q7 === 'high_above')    { s.urban += 2; s.open += 1 }

  if (q8 === 'pretending') { s.dark += 2; s.hidden += 1 }
  if (q8 === 'clarity')    { s.calm += 2; s.nature += 1 }
  if (q8 === 'restless')   { s.wild += 2; s.urban += 1 }
  if (q8 === 'unnamed')    { s.dark += 1; s.nature += 1 }

  if (q9 === 'wind')    { s.open += 2; s.nature += 1 }
  if (q9 === 'rain')    { s.dark += 1; s.wild += 1 }
  if (q9 === 'city')    { s.urban += 2 }
  if (q9 === 'silence') { s.calm += 2; s.hidden += 1 }

  const isDark = s.dark > s.bright, isNature = s.nature >= s.urban
  const isWild = s.wild >= s.calm,   isOpen   = s.open   >= s.hidden

  if (!isDark && isNature && isOpen && !isWild) return 'meadow'
  if (isDark && !isNature && isWild)            return 'storm_forest'
  if (!isDark && !isNature && isOpen)           return 'tokyo_rooftop'
  if (!isDark && isNature && !isOpen)           return 'autumn_forest'
  if (isDark && !isNature && !isWild)           return 'neon_alley'
  if (!isDark && !isNature && !isWild && isOpen) return 'ocean'
  if (isDark && isNature && !isWild)            return 'arctic'
  if (!isDark && !isNature && !isOpen)          return 'factory'
  if (!isDark && isNature && isWild)            return 'desert_canyon'
  return 'cloud_sea'
}

function topScore(s: Record<string, number>): string {
  return Object.entries(s).sort((a, b) => b[1] - a[1])[0][0]
}

export function mapAnimalAnswers(a: A): string {
  const s: Record<string, number> = {
    wolf:0, eagle:0, fox:0, bear:0, dolphin:0, lion:0, owl:0, deer:0,
    tiger:0, octopus:0, panther:0, elephant:0,
    raven:0, cheetah:0, horse:0, whale:0, snake:0, hummingbird:0, gorilla:0, falcon:0,
  }
  const add = (k: string, n: number) => { s[k] += n }

  const q1=a[1],q2=a[2],q3=a[3],q4=a[4],slider=Number(a[5]??50),q6=a[6],q7=a[7],q8=a[8],q9=a[9]

  if (q1==='face')   { add('lion',2); add('tiger',2); add('bear',1); add('gorilla',1) }
  if (q1==='vanish') { add('panther',2); add('fox',2); add('octopus',1); add('snake',1) }
  if (q1==='circle') { add('wolf',2); add('eagle',2); add('owl',1); add('falcon',2) }
  if (q1==='alert')  { add('elephant',2); add('dolphin',2); add('deer',1); add('whale',1) }

  if (q2==='lead_quietly') { add('wolf',2); add('lion',1); add('gorilla',1) }
  if (q2==='alone')        { add('tiger',2); add('panther',2); add('eagle',1); add('falcon',1) }
  if (q2==='bridge')       { add('dolphin',2); add('fox',2); add('hummingbird',1) }
  if (q2==='centre')       { add('elephant',2); add('bear',1); add('owl',1); add('whale',1) }

  if (q3==='direct')       { add('tiger',2); add('lion',2); add('cheetah',3) }
  if (q3==='patience')     { add('owl',2); add('bear',2); add('snake',2) }
  if (q3==='intelligence') { add('fox',2); add('octopus',2); add('raven',2) }
  if (q3==='together')     { add('wolf',2); add('dolphin',2); add('elephant',1); add('whale',1) }

  if (q4==='protect')       { add('bear',2); add('wolf',1); add('elephant',1); add('gorilla',2) }
  if (q4==='full_attention') { add('eagle',2); add('tiger',1); add('falcon',1) }
  if (q4==='lead_toward')   { add('lion',2); add('elephant',1); add('horse',2) }
  if (q4==='play')          { add('dolphin',2); add('fox',1); add('hummingbird',2) }

  if (slider<30)       { add('tiger',2); add('panther',2); add('eagle',1); add('falcon',2) }
  else if (slider<50)  { add('wolf',1); add('bear',1); add('snake',1) }
  else if (slider<70)  { add('dolphin',1); add('wolf',1); add('horse',1) }
  else                 { add('dolphin',2); add('elephant',2); add('deer',1); add('whale',2) }

  if (q6==='stillness') { add('owl',2); add('bear',1); add('snake',1) }
  if (q6==='energy')    { add('dolphin',2); add('fox',1); add('hummingbird',3) }
  if (q6==='sharpness') { add('eagle',2); add('tiger',1); add('raven',1) }
  if (q6==='warmth')    { add('deer',2); add('elephant',1); add('horse',1) }

  if (q7==='self')   { add('panther',2); add('tiger',1); add('snake',1) }
  if (q7==='nature') { add('deer',2); add('bear',1); add('horse',2); add('whale',1) }
  if (q7==='work')   { add('eagle',2); add('octopus',1); add('falcon',1) }
  if (q7==='others') { add('dolphin',2); add('wolf',1); add('elephant',1); add('gorilla',1) }

  if (q8==='vanish_heal')    { add('panther',2); add('tiger',1); add('owl',1); add('snake',2) }
  if (q8==='move_through')   { add('wolf',2); add('dolphin',1); add('deer',1); add('whale',1) }
  if (q8==='protect_others') { add('bear',2); add('elephant',2); add('gorilla',2) }
  if (q8==='redirect')       { add('fox',2); add('octopus',2); add('eagle',1); add('raven',1) }

  if (q9==='always_building')  { add('eagle',2); add('octopus',2); add('falcon',1) }
  if (q9==='watching_closely') { add('owl',2); add('panther',1); add('fox',1); add('raven',3) }
  if (q9==='deeper_rest')      { add('bear',2); add('elephant',1); add('whale',1) }
  if (q9==='more_playful')     { add('dolphin',2); add('fox',1); add('deer',1); add('hummingbird',2) }

  return topScore(s)
}

export function mapCelebrityAnswers(a: A): string {
  const s: Record<string,number> = {
    elon_musk:0, rihanna:0, keanu_reeves:0, oprah:0, david_bowie:0, beyonce:0,
    obama:0, billie_eilish:0, freddie_mercury:0, steve_jobs:0, leonardo_dicaprio:0, kanye_west:0,
    taylor_swift:0, lady_gaga:0, morgan_freeman:0, einstein:0,
    marilyn_monroe:0, nikola_tesla:0, tupac:0, nelson_mandela:0,
    elvis_presley:0, michael_jackson:0, madonna:0, bob_dylan:0, bob_marley:0,
    kurt_cobain:0, jim_morrison:0, prince:0, whitney_houston:0, amy_winehouse:0,
    frank_sinatra:0, johnny_cash:0, elton_john:0, bruce_springsteen:0, stevie_wonder:0,
    eminem:0, jay_z:0, kendrick_lamar:0, drake:0, adele:0,
    harry_styles:0, ariana_grande:0, the_weeknd:0, lizzo:0, post_malone:0,
    meryl_streep:0, tom_hanks:0, denzel_washington:0, angelina_jolie:0, will_smith:0,
    dwayne_johnson:0, zendaya:0, emma_watson:0, natalie_portman:0, cate_blanchett:0,
    viola_davis:0, johnny_depp:0, harrison_ford:0, tom_cruise:0, julia_roberts:0,
    ryan_gosling:0, scarlett_johansson:0, chris_evans:0, jennifer_lopez:0, anne_hathaway:0,
    lebron_james:0, serena_williams:0, cristiano_ronaldo:0, lionel_messi:0, muhammad_ali:0,
    tiger_woods:0, michael_jordan:0, simone_biles:0, roger_federer:0, usain_bolt:0,
    kobe_bryant:0, venus_williams:0, lewis_hamilton:0, naomi_osaka:0, stephen_curry:0,
    martin_luther_king:0, mahatma_gandhi:0, malala_yousafzai:0, frida_kahlo:0, andy_warhol:0,
    marie_curie:0, carl_sagan:0, jane_goodall:0, winston_churchill:0, cleopatra:0,
    jeff_bezos:0, bill_gates:0, warren_buffett:0, richard_branson:0, mark_zuckerberg:0,
    sheryl_sandberg:0, jk_rowling:0, alan_turing:0, jack_ma:0, ray_dalio:0,
  }
  const add = (k:string,n:number) => { s[k]+=n }

  const q1=a[1],q2=a[2],q3=a[3],q4=a[4],slider=Number(a[5]??50),q6=a[6],q7=a[7],q8=a[8]

  if(q1==='change_infrastructure'){add('elon_musk',2);add('steve_jobs',2);add('obama',1);add('nikola_tesla',2)}
  if(q1==='create_true'){add('billie_eilish',2);add('david_bowie',2);add('kanye_west',1);add('lady_gaga',2);add('tupac',1)}
  if(q1==='become_known'){add('beyonce',2);add('freddie_mercury',2);add('rihanna',1);add('taylor_swift',2)}
  if(q1==='make_feel'){add('oprah',2);add('keanu_reeves',2);add('obama',1);add('morgan_freeman',1);add('nelson_mandela',1)}

  if(q2==='rebuild_louder'){add('elon_musk',2);add('kanye_west',2);add('taylor_swift',1)}
  if(q2==='disappear_process'){add('billie_eilish',2);add('keanu_reeves',2);add('marilyn_monroe',1)}
  if(q2==='turn_to_art'){add('david_bowie',2);add('kanye_west',1);add('beyonce',1);add('lady_gaga',2);add('tupac',1)}
  if(q2==='absorb_forgive'){add('obama',2);add('leonardo_dicaprio',2);add('oprah',1);add('nelson_mandela',2)}

  if(q3==='visionary'){add('elon_musk',2);add('steve_jobs',2);add('kanye_west',1);add('nikola_tesla',2);add('einstein',1)}
  if(q3==='magnetic'){add('freddie_mercury',2);add('rihanna',2);add('kanye_west',1);add('lady_gaga',1)}
  if(q3==='unstoppable'){add('beyonce',2);add('rihanna',1);add('elon_musk',1);add('taylor_swift',1)}
  if(q3==='transformative'){add('david_bowie',2);add('obama',2);add('oprah',1);add('nelson_mandela',2)}

  if(q4==='constructed'){add('beyonce',2);add('david_bowie',2);add('rihanna',1);add('taylor_swift',2)}
  if(q4==='accidentally'){add('keanu_reeves',2);add('leonardo_dicaprio',1);add('marilyn_monroe',1)}
  if(q4==='exactly_you'){add('billie_eilish',2);add('freddie_mercury',2);add('morgan_freeman',1)}
  if(q4==='character'){add('david_bowie',2);add('beyonce',1);add('lady_gaga',2)}

  if(slider<25){add('steve_jobs',2);add('elon_musk',2);add('nikola_tesla',2)}
  else if(slider<45){add('obama',1);add('beyonce',1);add('steve_jobs',1);add('einstein',1)}
  else if(slider<65){add('leonardo_dicaprio',1);add('keanu_reeves',1);add('morgan_freeman',1)}
  else{add('oprah',2);add('freddie_mercury',2);add('billie_eilish',1);add('marilyn_monroe',1)}

  if(q6==='want_it'){add('elon_musk',2);add('rihanna',1);add('kanye_west',1);add('taylor_swift',1)}
  if(q6==='carry_carefully'){add('obama',2);add('beyonce',1);add('morgan_freeman',1);add('nelson_mandela',1)}
  if(q6==='reject_quietly'){add('david_bowie',2);add('leonardo_dicaprio',2);add('nikola_tesla',1)}
  if(q6==='in_service'){add('oprah',2);add('keanu_reeves',2);add('nelson_mandela',2)}

  if(q7==='changed_possible'){add('elon_musk',2);add('steve_jobs',2);add('nikola_tesla',2);add('einstein',2)}
  if(q7==='completely_real'){add('billie_eilish',2);add('freddie_mercury',1);add('tupac',2)}
  if(q7==='built_empire'){add('beyonce',2);add('rihanna',2);add('kanye_west',1);add('taylor_swift',2)}
  if(q7==='less_alone'){add('oprah',2);add('keanu_reeves',2);add('obama',1);add('morgan_freeman',1);add('marilyn_monroe',1)}

  if(q8==='executes_perfectly'){add('steve_jobs',2);add('beyonce',2);add('taylor_swift',1)}
  if(q8==='completely_honest'){add('billie_eilish',2);add('freddie_mercury',1);add('tupac',2);add('lady_gaga',1)}
  if(q8==='outlive_you'){add('david_bowie',2);add('elon_musk',1);add('kanye_west',1);add('nikola_tesla',2)}
  if(q8==='helps_others'){add('oprah',2);add('keanu_reeves',2);add('obama',1);add('leonardo_dicaprio',1);add('nelson_mandela',2)}

  // ── Extended celebrity scoring ─────────────────────────────────────────────
  if(q1==='create_true'){add('kurt_cobain',2);add('bob_dylan',2);add('prince',2);add('bob_marley',1);add('eminem',1);add('kendrick_lamar',1);add('jim_morrison',1);add('amy_winehouse',1)}
  if(q1==='become_known'){add('michael_jackson',2);add('elvis_presley',2);add('madonna',2);add('whitney_houston',1);add('adele',1);add('ariana_grande',1);add('jennifer_lopez',1);add('lizzo',1)}
  if(q1==='change_infrastructure'){add('bill_gates',2);add('alan_turing',2);add('mark_zuckerberg',1);add('jeff_bezos',1);add('marie_curie',1);add('carl_sagan',1)}
  if(q1==='make_feel'){add('martin_luther_king',2);add('mahatma_gandhi',2);add('malala_yousafzai',1);add('serena_williams',1);add('tom_hanks',1);add('viola_davis',1)}

  if(q2==='rebuild_louder'){add('dwayne_johnson',2);add('will_smith',1);add('lebron_james',2);add('cristiano_ronaldo',1);add('richard_branson',1)}
  if(q2==='disappear_process'){add('amy_winehouse',2);add('jim_morrison',2);add('johnny_depp',1);add('meryl_streep',1);add('ryan_gosling',1)}
  if(q2==='turn_to_art'){add('frida_kahlo',2);add('andy_warhol',2);add('elton_john',1);add('prince',1);add('cleopatra',1)}
  if(q2==='absorb_forgive'){add('mahatma_gandhi',2);add('martin_luther_king',2);add('malala_yousafzai',2);add('jane_goodall',1);add('tom_hanks',1)}

  if(q3==='visionary'){add('marie_curie',2);add('carl_sagan',2);add('alan_turing',2);add('bill_gates',1);add('jeff_bezos',1)}
  if(q3==='magnetic'){add('michael_jackson',2);add('madonna',2);add('jennifer_lopez',1);add('ariana_grande',1);add('lizzo',1);add('cleopatra',1);add('elton_john',1)}
  if(q3==='unstoppable'){add('cristiano_ronaldo',2);add('michael_jordan',2);add('serena_williams',2);add('lebron_james',1);add('simone_biles',1);add('usain_bolt',1)}
  if(q3==='transformative'){add('martin_luther_king',2);add('mahatma_gandhi',2);add('malala_yousafzai',2);add('winston_churchill',1);add('nelson_mandela',1)}

  if(q4==='constructed'){add('michael_jackson',2);add('jennifer_lopez',1);add('madonna',1);add('jay_z',1);add('beyonce',1)}
  if(q4==='accidentally'){add('frank_sinatra',1);add('johnny_cash',1);add('harrison_ford',1);add('bruce_springsteen',1)}
  if(q4==='exactly_you'){add('kurt_cobain',2);add('eminem',2);add('bob_dylan',1);add('jack_ma',1)}
  if(q4==='character'){add('johnny_depp',2);add('tom_hanks',2);add('meryl_streep',2);add('cate_blanchett',1);add('harrison_ford',1)}

  if(q6==='want_it'){add('jeff_bezos',2);add('mark_zuckerberg',2);add('cristiano_ronaldo',1);add('lebron_james',1);add('jay_z',1);add('dwayne_johnson',1)}
  if(q6==='carry_carefully'){add('warren_buffett',2);add('ray_dalio',1);add('tom_hanks',1);add('denzel_washington',1);add('roger_federer',1)}
  if(q6==='reject_quietly'){add('warren_buffett',1);add('jk_rowling',1);add('natalie_portman',1);add('cate_blanchett',1);add('bob_dylan',1)}
  if(q6==='in_service'){add('serena_williams',2);add('malala_yousafzai',2);add('martin_luther_king',2);add('jane_goodall',2);add('viola_davis',1);add('sheryl_sandberg',1)}

  if(q7==='changed_possible'){add('marie_curie',2);add('alan_turing',2);add('carl_sagan',2);add('bill_gates',1);add('malala_yousafzai',1);add('winston_churchill',1)}
  if(q7==='completely_real'){add('amy_winehouse',2);add('kurt_cobain',2);add('eminem',2);add('kendrick_lamar',2);add('bob_marley',1)}
  if(q7==='built_empire'){add('michael_jackson',2);add('jennifer_lopez',1);add('adele',1);add('ariana_grande',1);add('jeff_bezos',1);add('jack_ma',1)}
  if(q7==='less_alone'){add('jk_rowling',2);add('adele',2);add('stevie_wonder',1);add('frank_sinatra',1);add('anne_hathaway',1);add('zendaya',1)}

  if(q8==='executes_perfectly'){add('michael_jordan',2);add('serena_williams',2);add('cristiano_ronaldo',2);add('simone_biles',2);add('tiger_woods',1);add('roger_federer',1)}
  if(q8==='completely_honest'){add('kurt_cobain',2);add('amy_winehouse',2);add('kendrick_lamar',2);add('bob_dylan',1);add('eminem',1)}
  if(q8==='outlive_you'){add('martin_luther_king',2);add('winston_churchill',2);add('carl_sagan',1);add('mahatma_gandhi',1);add('cleopatra',1)}
  if(q8==='helps_others'){add('malala_yousafzai',2);add('jane_goodall',2);add('serena_williams',1);add('viola_davis',1);add('jk_rowling',1)}

  if(slider<25){add('jeff_bezos',1);add('mark_zuckerberg',1);add('cristiano_ronaldo',1);add('michael_jordan',1)}
  else if(slider<45){add('warren_buffett',1);add('roger_federer',1);add('meryl_streep',1);add('bob_dylan',1)}
  else if(slider<65){add('tom_hanks',1);add('adele',1);add('zendaya',1);add('natalie_portman',1);add('harry_styles',1)}
  else{add('lizzo',2);add('ariana_grande',1);add('the_weeknd',1);add('drake',1);add('post_malone',1)}

  return topScore(s)
}

export function mapPlanetAnswers(a: A): string {
  const s: Record<string,number> = {
    mars:0, venus:0, saturn:0, jupiter:0, neptune:0, mercury:0,
    pluto:0, orion_nebula:0, black_hole:0, sirius:0, moon:0, andromeda:0,
    europa:0, sun:0, milky_way:0, vega:0, titan:0,
  }
  const add=(k:string,n:number)=>{s[k]+=n}

  const q1=a[1],q2=a[2],q3=a[3],q4=a[4],slider=Number(a[5]??50)
  const q6=a[6],q7=a[7],q8=a[8],q9=a[9]

  if(q1==='ahead'){add('mercury',2);add('mars',1);add('vega',2)}
  if(q1==='slower'){add('saturn',2);add('neptune',1);add('andromeda',1);add('titan',1)}
  if(q1==='ignore'){add('neptune',2);add('pluto',2);add('milky_way',1)}
  if(q1==='controlled'){add('moon',2);add('mercury',1);add('europa',1)}

  if(q2==='smallest'){add('moon',2);add('venus',2);add('europa',1)}
  if(q2==='largest'){add('jupiter',2);add('andromeda',2);add('black_hole',1);add('milky_way',2);add('sun',1)}
  if(q2==='between'){add('pluto',2);add('neptune',2);add('europa',1)}
  if(q2==='ending'){add('orion_nebula',2);add('andromeda',1);add('vega',1)}

  if(q3==='unnamed_force'){add('black_hole',2);add('saturn',1);add('milky_way',1)}
  if(q3==='most_stable'){add('jupiter',2);add('saturn',2);add('sun',1)}
  if(q3==='most_exciting'){add('sirius',2);add('mars',2);add('vega',2)}
  if(q3==='go_places'){add('pluto',2);add('neptune',2);add('andromeda',1);add('titan',1)}

  if(q4==='closeness'){add('neptune',2);add('pluto',2);add('europa',1)}
  if(q4==='speed'){add('saturn',2);add('andromeda',1);add('titan',1)}
  if(q4==='safety'){add('mars',2);add('black_hole',1);add('vega',1)}
  if(q4==='privacy'){add('sirius',2);add('moon',1);add('milky_way',1)}

  if(slider<25){add('mars',2);add('black_hole',2);add('vega',1)}
  else if(slider<45){add('neptune',1);add('pluto',1);add('europa',1)}
  else if(slider<65){add('saturn',1);add('jupiter',1);add('milky_way',1)}
  else{add('saturn',2);add('venus',2);add('sun',1)}

  if(q6==='pattern'){add('saturn',2);add('andromeda',1);add('milky_way',1)}
  if(q6==='feeling'){add('moon',2);add('venus',2);add('sirius',1);add('sun',1)}
  if(q6==='question'){add('black_hole',2);add('pluto',2);add('europa',1)}
  if(q6==='mystery'){add('neptune',2);add('pluto',1);add('andromeda',1);add('titan',2)}

  if(q7==='same_wound'){add('pluto',2);add('saturn',1);add('titan',1)}
  if(q7==='warmer'){add('moon',2);add('neptune',1);add('europa',2)}
  if(q7==='contains_violence'){add('black_hole',2);add('mars',1);add('vega',1)}
  if(q7==='older'){add('andromeda',2);add('orion_nebula',1);add('milky_way',1)}

  if(q8==='dense_slow'){add('saturn',2);add('andromeda',1);add('milky_way',1)}
  if(q8==='constant'){add('mercury',2);add('orion_nebula',1);add('sun',2)}
  if(q8==='explosive'){add('black_hole',2);add('sirius',2);add('mars',1);add('vega',2)}
  if(q8==='circular'){add('saturn',2);add('moon',1);add('milky_way',1)}

  if(q9==='feel_scale'){add('andromeda',2);add('black_hole',1);add('milky_way',2)}
  if(q9==='less_afraid'){add('pluto',2);add('neptune',1);add('europa',2)}
  if(q9==='longer'){add('saturn',2);add('andromeda',1);add('titan',1)}
  if(q9==='connected'){add('orion_nebula',2);add('sirius',1);add('moon',1);add('sun',2)}

  return topScore(s)
}

export const SCORE_FUNCTIONS: Record<CategoryKey, (a: A) => string> = {
  world: mapWorldAnswers, animal: mapAnimalAnswers,
  celebrity: mapCelebrityAnswers, planet: mapPlanetAnswers,
}
