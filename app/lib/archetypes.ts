// All archetype result data across all 4 quiz categories

export interface ArchetypeResult {
  id: string
  name: string        // Place/animal/planet name
  title: string       // Personality badge — what they put in their bio
  tagline: string     // Identity label for share card
  description: string // Barnum-effect personal description
  why: string[]       // 3 bullets: "Your answers revealed..."
  shareCaption: string
  color: string
}

// ─── WORLD ($1.80) ───────────────────────────────────────────────────────────

export const WORLD_ARCHETYPES: Record<string, ArchetypeResult> = {
  meadow: {
    id: 'meadow', name: 'Sunlit Meadow', title: 'The Golden Wanderer',
    tagline: 'The world of someone who carries light without knowing it.',
    description: `You have always needed more space than others gave you. Not because you are difficult — because you were built for horizons. There is a warmth in you that does not announce itself; people simply feel safer in your presence without knowing why. You can stand completely open, completely visible, and not be afraid of what gets seen. Most people spend their lives learning how to do that. You already know. The meadow chose you because you do not chase beauty — you generate it, the way a field generates warmth on a still morning.`,
    why: ['You chose stillness and connection — you are most alive when rooted, not rushing', 'Your inner world is open and airy — you think in wide spaces, not narrow corridors', 'You move toward the light instinctively — in people, in places, in moments'],
    shareCaption: `I paid $1.80 and discovered I'm a Golden Wanderer. My world is a Sunlit Meadow. Yours is waiting → yourone.world`,
    color: '#f8d44a',
  },
  neon_alley: {
    id: 'neon_alley', name: 'Neon Rainy Alley', title: 'The Neon Ghost',
    tagline: 'The world of someone who thrives in what others walk past.',
    description: `You have always found something beautiful in the places others walk through without looking. The dark has never scared you — it is where you have always thought most clearly. There is a complexity to you that most people do not reach on the first attempt, or the second. You have learned to be a little invisible on purpose, and it serves you. The neon alley chose you because you understand something essential: that the most interesting life is not under the brightest light, but the one that knows how to read the light reflecting off wet pavement at 2am.`,
    why: ['You chose the night sky and deep midnight — you are most yourself when the world quiets', 'You are drawn to hidden corners — you find depth in what others overlook', 'Your inner world is dense and layered — you process in complexity, not simplicity'],
    shareCaption: `I paid $1.80 and discovered I'm a Neon Ghost. My world is a Rainy Alley at midnight. Yours is waiting → yourone.world`,
    color: '#ff2266',
  },
  ocean: {
    id: 'ocean', name: 'Misty Ocean at Dawn', title: 'The Still Depth',
    tagline: 'The world of someone who contains more than they reveal.',
    description: `You are still on the surface and infinite underneath it. You learned early — probably earlier than you should have — to show less than you feel. That is not emotional damage. That is depth. You have the rare ability to hold an enormous amount without collapsing, and people around you often lean on that without fully understanding what it costs. The ocean chose you because you already know that the most powerful things in the world do not make noise about it. You change things quietly, like a tide.`,
    why: ['You chose the edge of water and deep stillness — you live most fully at boundaries', 'You are most alive when still — your power is not in motion but in presence', 'You protect your inner world carefully — you give access to people who have earned it'],
    shareCaption: `I paid $1.80 and discovered I'm a Still Depth. My world is a Misty Ocean. Yours is waiting → yourone.world`,
    color: '#4a7a9b',
  },
  tokyo_rooftop: {
    id: 'tokyo_rooftop', name: 'Tokyo Rooftop at Rain', title: 'The Electric Watcher',
    tagline: 'The world of someone who sees the pattern in the pulse.',
    description: `You come alive when the world is in motion. There has always been something in you that needs to feel the hum of things — the city crossing, the light on wet pavement, the sense that a thousand lives are happening simultaneously within fifty metres of where you stand. You are more sensitive than you let on. The rooftop chose you because you have always needed height — not to escape, but to see the full shape of things before you decide where to move.`,
    why: ['You chose high above and city pulse — you need the panoramic view to feel oriented', 'You are most alive when moving — stagnation is the only thing that truly drains you', 'You are sharp and precise — your inner world is organised even when the outside is not'],
    shareCaption: `I paid $1.80 and discovered I'm an Electric Watcher. My world is a Tokyo Rooftop. Yours is waiting → yourone.world`,
    color: '#ff6644',
  },
  desert_canyon: {
    id: 'desert_canyon', name: 'Desert Canyon at Dusk', title: 'The Ancient One',
    tagline: 'The world of someone who was never meant to be rushed.',
    description: `You move slowly on purpose. You have always felt older than your years — not heavier, just more considered. There is something in you that refuses to be hurried, and that has cost you things in a world that rewards speed. But it has also protected you from a hundred decisions you would have regretted. The desert chose you because you understand permanence. You think in years, not weeks. You are the kind of person who can stand in total silence for a long time and find it full instead of empty.`,
    why: ['You chose vast and open, patient and deliberate — you understand before acting', 'You value stillness over chaos — you are the one still standing when the storm ends', 'Your inner world is sharp and clear — you have no patience for what is not real'],
    shareCaption: `I paid $1.80 and discovered I'm an Ancient One. My world is a Desert Canyon. Yours is waiting → yourone.world`,
    color: '#D4522A',
  },
  storm_forest: {
    id: 'storm_forest', name: 'Storm-hit Pine Forest', title: 'The Wild Charge',
    tagline: 'The world of someone who was never afraid of the dark.',
    description: `You are not afraid of the storm. You never were. There is a wildness in you that most people only glimpse — and when they see it, it unsettles them. You have spent much of your life making yourself smaller to fit into rooms not built for you. You have been careful with your intensity because you have learned what happens when you are not. But the storm did not choose you. You chose it. And everything you are is proof of that.`,
    why: ['You chose the storm and the electric — your energy runs at a frequency most cannot sustain', 'You are most alive in motion and chaos — stillness feels like death to you', 'You push toward depth over surface — you do not do anything halfway'],
    shareCaption: `I paid $1.80 and discovered I'm a Wild Charge. My world is a Storm-hit Forest. Yours is waiting → yourone.world`,
    color: '#8888cc',
  },
  arctic: {
    id: 'arctic', name: 'Arctic Tundra at Midnight', title: 'The Midnight Thinker',
    tagline: 'The world of someone who finds beauty in the vast and silent.',
    description: `Silence is not emptiness to you — it is where you do your most important work. You have always understood things that other people feel but cannot name. You think in long arcs. You are patient in a way that looks like coldness to people who do not know you well, and you stopped correcting that impression a long time ago. The aurora chose you because you are the kind of person who walks out alone at 2am and looks up without needing it to mean anything.`,
    why: ['You chose deep night and deep silence — your sharpest thoughts arrive only when everything quiets', 'You are most alive when still and thoughtful — the world mistakes your depth for distance', 'You find peace in the vast — you need scale, not smallness, to feel properly oriented'],
    shareCaption: `I paid $1.80 and discovered I'm a Midnight Thinker. My world is Arctic Tundra. Yours is waiting → yourone.world`,
    color: '#88ccff',
  },
  autumn_forest: {
    id: 'autumn_forest', name: 'Autumn Forest Path', title: 'The Golden Root',
    tagline: 'The world of someone who knows endings are just beginnings turning gold.',
    description: `You know that endings are just beginnings that have not announced themselves yet. You are grounded in a way that does not come from certainty — it comes from having been through enough to know you will survive it. People feel safe around you without always knowing why. You carry autumn because you understand that the most beautiful things are always the ones in the middle of changing.`,
    why: ['You chose soft and warm, the hidden corner — your power is in your roots, not your reach', 'You are most alive when connecting — you fill up in relationship, not isolation', 'You are dense and layered — your depth is not obvious immediately, but unmistakable eventually'],
    shareCaption: `I paid $1.80 and discovered I'm a Golden Root. My world is an Autumn Forest. Yours is waiting → yourone.world`,
    color: '#c07828',
  },
  factory: {
    id: 'factory', name: 'Abandoned Factory in Fog', title: 'The Rust Romantic',
    tagline: 'The world of someone who sees beauty in what others walk past.',
    description: `You see what others walk past. The abandoned thing, the overlooked place, the silence in a machine that used to roar — you find it beautiful because you understand what it cost to become what it is. You are not nostalgic, exactly. You are reverent. There is a quality to your solitude that does not feel like loneliness, because you have never needed it to be filled with the right things — just real ones.`,
    why: ['You chose the hidden, the overlooked, the quiet — you live slightly outside the mainstream gaze', 'You are most alive when creating — you need to build or you become restless', 'You carry weight quietly — your inner life is rich and private in ways most people never reach'],
    shareCaption: `I paid $1.80 and discovered I'm a Rust Romantic. My world is an Abandoned Factory. Yours is waiting → yourone.world`,
    color: '#8888aa',
  },
  cloud_sea: {
    id: 'cloud_sea', name: 'Cloud Sea at Sunset', title: 'The Weightless Dreamer',
    tagline: 'The world of someone who lives above the noise.',
    description: `You exist above the noise, and that is not escapism — that is architecture. You have built a world inside yourself that is more real to you than most of what is outside it. People sometimes mistake your dreaminess for distance. It is not. You are simply already somewhere else, building something they have not seen yet. The cloud sea chose you because you know what it feels like to be weightless — to look down on the chaos and understand, from that altitude, that everything below is going to be okay.`,
    why: ['You chose soft, dreamy, and open — your mind lives in possibility, not limitation', 'You are most alive when creating and imagining — the real world is often a draft of what you see', 'You carry a quiet peace — not because nothing is wrong, but because you have learned to float above it'],
    shareCaption: `I paid $1.80 and discovered I'm a Weightless Dreamer. My world is a Cloud Sea. Yours is waiting → yourone.world`,
    color: '#FFB8D0',
  },
}

// ─── ANIMAL ($0.99) ──────────────────────────────────────────────────────────

export const ANIMAL_ARCHETYPES: Record<string, ArchetypeResult> = {
  wolf: {
    id: 'wolf', name: 'Wolf', title: 'The Loyal Pack',
    tagline: 'You lead without announcing it. Loyalty is your religion.',
    description: `You are the wolf — the one who leads without declaring it. Your pack comes first, always, and that loyalty is not a weakness. It is a weapon. You read people with unsettling accuracy, move quietly until you need to move fast, and protect what is yours with a ferocity that surprises people who only saw the calm. You have a wildness you have learned to hold lightly, and a tenderness you reserve for the few who have earned it.`,
    why: ['You face threats directly', 'You lead from within the group, never above it', 'Your loyalty is fierce and completely selective'],
    shareCaption: `I paid $0.99 and discovered my spirit animal is the Wolf — The Loyal Pack. What's yours? → yourone.world`, color: '#8888cc',
  },
  eagle: {
    id: 'eagle', name: 'Eagle', title: 'The Visionary',
    tagline: 'You see what others miss. You always have.',
    description: `You are the eagle — solitary, elevated, and built for a view no one else has. You have always seen further than the people around you. You do not need a crowd. You need altitude — perspective, space, the long view. When you commit, you commit completely. When you move, you move with total precision. You are not warm in the conventional sense. You are something better: accurate.`,
    why: ['You prefer to assess before acting — the full picture first, always', 'You need space and solitude to function at your best', 'Your greatest gift is seeing what others are too close to notice'],
    shareCaption: `I paid $0.99 and discovered my spirit animal is the Eagle — The Visionary. What's yours? → yourone.world`, color: '#f8c840',
  },
  fox: {
    id: 'fox', name: 'Fox', title: 'The Clever Shadow',
    tagline: 'You solve the problem before others know it exists.',
    description: `You are the fox — adaptive, quick, and significantly more intelligent than you let on. You have always operated at an angle to the straight line, and that is not dishonesty. It is efficiency. You read situations fast. You find the exit before anyone else has noticed the door. You are playful in a way that hides how sharp you are. The fox chose you because you have never needed anyone to understand your methods — only to see your results.`,
    why: ['You disappear when threatened — you fight from the shadow, not the centre', 'Your intelligence is your primary weapon, not your strength or your warmth', 'You move between groups with ease, belonging fully to none of them'],
    shareCaption: `I paid $0.99 and discovered my spirit animal is the Fox — The Clever Shadow. What's yours? → yourone.world`, color: '#ff6030',
  },
  bear: {
    id: 'bear', name: 'Bear', title: 'The Quiet Protector',
    tagline: 'Still until it matters. Then everything.',
    description: `You are the bear — patient, immovable, and operating on a timescale that others find unnerving. You are the calmest person in the room until someone threatens what you love, and then you are something else entirely. You need deep rest, real solitude, to return as yourself. You are not aggressive. You are sovereign. There is a difference, and you know it.`,
    why: ['You let things come to you — patience is your most underestimated quality', 'You absorb impact instead of deflecting it — you carry what others put down', 'Your protection is absolute for the few you have genuinely chosen'],
    shareCaption: `I paid $0.99 and discovered my spirit animal is the Bear — The Quiet Protector. What's yours? → yourone.world`, color: '#c07828',
  },
  dolphin: {
    id: 'dolphin', name: 'Dolphin', title: 'The Connector',
    tagline: 'Joy is not your escape. It is your strategy.',
    description: `You are the dolphin — moving through groups with grace and curiosity. You play not because you are naive but because you understand something the serious animals miss: that joy is how you gather information about the world. You are the one who makes things work between people. You read emotion fast. You connect the dots everyone else is staring at separately.`,
    why: ['You protect through alerting others — your instinct is collective before personal', 'Your intelligence is emotional and relational — you read rooms before you read words', 'You need genuine connection to feel alive — isolation diminishes you fast'],
    shareCaption: `I paid $0.99 and discovered my spirit animal is the Dolphin — The Connector. What's yours? → yourone.world`, color: '#00c8a8',
  },
  lion: {
    id: 'lion', name: 'Lion', title: 'The Sovereign',
    tagline: 'You were born to occupy the centre of whatever room you enter.',
    description: `You are the lion — not because you fight, but because you do not need to. Your presence does the work before you open your mouth. You rest more than people expect, and you move less than they think. That is not laziness. That is confidence — you know what requires your energy, and you give it nothing less than everything.`,
    why: ['You face threats directly and without hesitation — you do not wait', 'Your social position matters — you lead from the front, always', 'You give loyalty completely to those inside your circle'],
    shareCaption: `I paid $0.99 and discovered my spirit animal is the Lion — The Sovereign. What's yours? → yourone.world`, color: '#f8d44a',
  },
  owl: {
    id: 'owl', name: 'Owl', title: 'The Watcher',
    tagline: 'You know. You have always known.',
    description: `You are the owl — the one who sees everything from the dark without being seen. People come to you for answers you always seem to have, and they are never sure how you got them. You are not mysterious on purpose. You are simply interior. Your world is vast and private and runs deeper than what shows on the surface.`,
    why: ['You circle the threat before moving — assessment always comes before action', 'You operate in quiet and darkness — that is not isolation, it is your natural environment', 'You hold vast amounts quietly — you share your knowledge rarely and only when it matters'],
    shareCaption: `I paid $0.99 and discovered my spirit animal is the Owl — The Watcher. What's yours? → yourone.world`, color: '#4a7a9b',
  },
  deer: {
    id: 'deer', name: 'Deer', title: 'The Gentle Force',
    tagline: 'Your softness is not weakness. It is a choice.',
    description: `You are the deer — gentle, alert, and carrying a grace that has nothing to do with fragility. You feel everything, and that is your gift, not your flaw. You have a sensitivity that most people have trained out of themselves, and you chose to keep it — at cost, sometimes — because you know it is what makes you capable of the deep connections you have. The deer chose you because being soft in a hard world requires more courage than being hard.`,
    why: ['Your instinct is protective, not self-preserving — you think of others first', 'You move with awareness — you do not crash through the world', 'Your warmth is genuine and immediate — people feel safe around you fast'],
    shareCaption: `I paid $0.99 and discovered my spirit animal is the Deer — The Gentle Force. What's yours? → yourone.world`, color: '#c07028',
  },
  tiger: {
    id: 'tiger', name: 'Tiger', title: 'The Solitary Power',
    tagline: 'You do not need anyone to know how strong you are.',
    description: `You are the tiger — solitary, self-sufficient, and operating at a level of power you do not advertise. You are the most capable person in most rooms you walk into. You move alone by choice. Your solitude is not loneliness — it is freedom. You give your full, intense focus to whatever you decide matters, and when you move toward something, it is with complete commitment. There is no half-measure in you.`,
    why: ['You pursue directly — when you decide to move, you close the distance completely', 'You choose solitude — independence is your nature, not a coping mechanism', 'Your intensity is contained but unmistakable — people sense it even when you are still'],
    shareCaption: `I paid $0.99 and discovered my spirit animal is the Tiger — The Solitary Power. What's yours? → yourone.world`, color: '#ff6030',
  },
  octopus: {
    id: 'octopus', name: 'Octopus', title: 'The Shapeshifter',
    tagline: 'You are the most intelligent thing in the room. You prefer they do not know it.',
    description: `You are the octopus — the most alien and the most brilliant. You solve problems through improvisation and curiosity. You adapt to environments completely. You can be anything, which means you have had to decide very carefully what to actually be. You process the world differently from almost everyone you know. That has always felt like aloneness. It is actually singularity.`,
    why: ['You disappear when threatened — camouflage is your primary strategy', 'Your intelligence is experimental — you learn by doing, touching, testing everything', 'You operate alone — community is interesting to you, but entirely optional'],
    shareCaption: `I paid $0.99 and discovered my spirit animal is the Octopus — The Shapeshifter. What's yours? → yourone.world`, color: '#8b1a5a',
  },
  panther: {
    id: 'panther', name: 'Panther', title: 'The Midnight Walker',
    tagline: 'You move through the world like it owes you nothing.',
    description: `You are the panther — the apex predator that no one sees coming. You are most yourself at night, in the dark, moving silently through a world that does not fully understand what you are. You have a power that is not performed — it simply exists, underneath everything, and people feel it even when you are completely calm. You do not need validation. You have a self-certainty that others mistake for arrogance. It is not. It is just that you already know who you are.`,
    why: ['You operate in shadows — that is not hiding, it is strategy', 'Your power is completely self-contained — you do not need others to reflect it back', 'You move fast when you decide to — everything before that moment is pure patience'],
    shareCaption: `I paid $0.99 and discovered my spirit animal is the Panther — The Midnight Walker. What's yours? → yourone.world`, color: '#1a0a2e',
  },
  elephant: {
    id: 'elephant', name: 'Elephant', title: 'The Memory Keeper',
    tagline: 'You hold what others have forgotten. That is your burden and your gift.',
    description: `You are the elephant — ancient, communal, and carrying more than anyone sees. You remember everything. Not out of resentment, but out of reverence — because history matters to you, because the people who came before matter. You protect your people with everything you have. You grieve deeply and heal slowly. You are the one they call when the ground shifts, because you have been through enough ground-shifting to know how to stand in it.`,
    why: ['You protect others above yourself — your instinct is always collective', 'Your emotional memory is extraordinary — you carry the weight of your relationships fully', 'You lead from the front in crisis — your calm under pressure is your most important gift'],
    shareCaption: `I paid $0.99 and discovered my spirit animal is the Elephant — The Memory Keeper. What's yours? → yourone.world`, color: '#88a880',
  },
}

// ─── CELEBRITY ($1.50) ───────────────────────────────────────────────────────

export const CELEBRITY_ARCHETYPES: Record<string, ArchetypeResult> = {
  elon_musk: {
    id: 'elon_musk', name: 'Elon Musk', title: 'The Disruptor',
    tagline: 'You see 10 years ahead and have no patience for the present.',
    description: `Your personality resonates with Elon Musk's archetype — the person who sees the infrastructure of things and cannot help but break it. You think at a scale most people find uncomfortable. Your ambition is not status-seeking. It is correction. You believe the world is running on the wrong operating system, and you are the kind of person who would rewrite it rather than complain about it. Your flaw is your superpower: you move faster than others can follow.`,
    why: ['You make decisions based on a future only you can fully see', 'Your relationship with power is direct — you want it to do what needs doing', 'You rebuild after failure faster than most people acknowledge the failure'],
    shareCaption: `I paid $1.50 and my personality resonates with Elon Musk — The Disruptor. Whose archetype are you? → yourone.world`, color: '#4488ff',
  },
  rihanna: {
    id: 'rihanna', name: 'Rihanna', title: 'The Sovereign',
    tagline: 'You built an empire by refusing to ask for permission.',
    description: `Your personality resonates with Rihanna's archetype — the person who is completely, unapologetically themselves at a frequency so high it becomes an industry. You do not perform confidence — you live in it. Your creativity is not a career, it is a constitution. Your power is exactly as loud as it needs to be, and you decide that moment by moment.`,
    why: ['Your creative output is honest before anything else — authenticity is non-negotiable', 'Your ambition transforms everything it touches — career, culture, industry', 'You are the most present person in the room — you are always, completely, here'],
    shareCaption: `I paid $1.50 and my personality resonates with Rihanna — The Sovereign. Whose archetype are you? → yourone.world`, color: '#ff2266',
  },
  keanu_reeves: {
    id: 'keanu_reeves', name: 'Keanu Reeves', title: 'The Quiet Force',
    tagline: 'Your stillness changes the temperature of every room you enter.',
    description: `Your personality resonates with Keanu Reeves' archetype — the person who carries enormous weight without making it anyone else's problem. You are genuinely kind in a world that mistakes kindness for weakness. Your presence is calming in a way that goes beyond personality. You have been through the kind of thing that breaks people, and you emerged not harder, but somehow more present. That is not ordinary. That is rare.`,
    why: ['You are in complete service of others — your power is used, always, for someone else', 'Your public and private self are the same person — you never learned to perform', 'You carry your past with grace — it informs you without defining you'],
    shareCaption: `I paid $1.50 and my personality resonates with Keanu Reeves — The Quiet Force. Whose archetype are you? → yourone.world`, color: '#88ccff',
  },
  oprah: {
    id: 'oprah', name: 'Oprah Winfrey', title: 'The Illuminator',
    tagline: 'You make people feel seen. That is the rarest power.',
    description: `Your personality resonates with Oprah's archetype — the person who transforms their pain into a light that others navigate by. You have an extraordinary emotional intelligence. You make people feel seen in a way that changes them. Your ambition and compassion are the same engine. You build things at scale because scale is the only way to do what you actually came here to do.`,
    why: ['You use your power entirely in service — that is not selflessness, it is your strategy', 'You turn experience into narrative — you find the lesson before you finish feeling the thing', 'You are most alive when connecting — your energy comes entirely from real human contact'],
    shareCaption: `I paid $1.50 and my personality resonates with Oprah — The Illuminator. Whose archetype are you? → yourone.world`, color: '#f8c840',
  },
  david_bowie: {
    id: 'david_bowie', name: 'David Bowie', title: 'The Eternal Reinventor',
    tagline: 'You are not confused. You are ahead.',
    description: `Your personality resonates with David Bowie's archetype — the person who exists at the frontier of what is possible in a self. You have always been multiple versions of yourself simultaneously. You do not perform change. You ARE change. Your creativity is not a skill, it is a nervous system. You have always been slightly ahead of where the culture was — lonely at times, legendary eventually.`,
    why: ['Your creative output is legendary in scale — you do not make small things', 'You constructed a public self as deliberately as any character in fiction', 'You chose reinvention over stagnation, always — you would rather be misunderstood than predictable'],
    shareCaption: `I paid $1.50 and my personality resonates with David Bowie — The Eternal Reinventor. Whose archetype are you? → yourone.world`, color: '#c8b8f8',
  },
  beyonce: {
    id: 'beyonce', name: 'Beyoncé', title: 'The Architect',
    tagline: 'Everything you touch becomes a cathedral.',
    description: `Your personality resonates with Beyoncé's archetype — the person for whom excellence is not a goal but a baseline. You work at a level of discipline that others see as talent, not understanding what it costs. You are more private than people expect. Your vulnerability, when it comes, is devastating — because it is chosen, surgical, and real.`,
    why: ['Your execution is flawless — you do not release anything until it matches exactly what you saw', 'Your power is completely self-generated — you do not wait for permission', 'You are building something that will outlast you — that is the only project that interests you'],
    shareCaption: `I paid $1.50 and my personality resonates with Beyoncé — The Architect. Whose archetype are you? → yourone.world`, color: '#f8d44a',
  },
  obama: {
    id: 'obama', name: 'Barack Obama', title: 'The Bridge Builder',
    tagline: 'You hold contradictions together without breaking.',
    description: `Your personality resonates with Barack Obama's archetype — the person who holds complexity without needing to resolve it into something simple. You communicate in a way that makes people feel understood across enormous differences. You can stand in the middle of a disagreement and make both sides feel heard. That is not weakness. That is the rarest form of strength.`,
    why: ['You are strategic and service-oriented — your ambition serves something larger than yourself', 'Your communication is your greatest instrument — you know exactly when to speak and how', 'You hold the long view — you make decisions your future self will be proud of'],
    shareCaption: `I paid $1.50 and my personality resonates with Barack Obama — The Bridge Builder. Whose archetype are you? → yourone.world`, color: '#4488ff',
  },
  billie_eilish: {
    id: 'billie_eilish', name: 'Billie Eilish', title: 'The Dark Angel',
    tagline: 'Your honesty is the most disruptive thing about you.',
    description: `Your personality resonates with Billie Eilish's archetype — the person who is so honest it becomes a form of power. You say the thing no one else will say, not to be provocative, but because pretending feels like dying. You have a darkness that is not performance — it is vocabulary. You use it to name things that need to be named.`,
    why: ['Your authenticity is radical — you never learned to curate yourself for comfort', 'Your darkness is not damage — it is depth, and you have made it into something beautiful', 'You are most yourself in private — your public self is offered, not performed'],
    shareCaption: `I paid $1.50 and my personality resonates with Billie Eilish — The Dark Angel. Whose archetype are you? → yourone.world`, color: '#2a1555',
  },
  freddie_mercury: {
    id: 'freddie_mercury', name: 'Freddie Mercury', title: 'The Flame',
    tagline: 'You were built to burn bright. You always knew it.',
    description: `Your personality resonates with Freddie Mercury's archetype — the person for whom performance IS authenticity. You feel everything at a higher volume than the people around you. Your joy is total. Your grief is total. You were built for a stage — not because you need the audience, but because the size of what you carry requires space to unfold. There is a tenderness inside the spectacle that only the closest people ever see.`,
    why: ['Your creative output is explosive — when you make something, it cannot be ignored', 'Your intensity draws and exhausts in equal measure — you are not for everyone, and that is perfect', 'You live fully in the present — the past is material, but now is everything'],
    shareCaption: `I paid $1.50 and my personality resonates with Freddie Mercury — The Flame. Whose archetype are you? → yourone.world`, color: '#ff6030',
  },
  steve_jobs: {
    id: 'steve_jobs', name: 'Steve Jobs', title: 'The Perfectionist',
    tagline: 'You see the finished thing before anyone else has started.',
    description: `Your personality resonates with Steve Jobs' archetype — the person who cannot tolerate the gap between what is possible and what currently exists. You have a vision so clear and total that you become, to others, unreasonable. You are unreasonable. That is not a flaw — it is the mechanism. You believe that how something feels is inseparable from what it does. You have always been building toward something others cannot yet see.`,
    why: ['You see the future in complete detail — and you have no patience for the distance to it', 'Your standards are non-negotiable — you would rather delay than ship something wrong', 'Creativity and systems are the same thing to you — beauty is functional'],
    shareCaption: `I paid $1.50 and my personality resonates with Steve Jobs — The Perfectionist. Whose archetype are you? → yourone.world`, color: '#c8c8c8',
  },
  leonardo_dicaprio: {
    id: 'leonardo_dicaprio', name: 'Leonardo DiCaprio', title: 'The Dreamer',
    tagline: 'You became exactly who you decided to become.',
    description: `Your personality resonates with Leonardo DiCaprio's archetype — the person who chose depth over ease, craft over comfort, and kept choosing it. You are intensely private despite being intensely present. You care about things beyond yourself in a way that has shaped every decision. Your ambition is not about recognition — it is about doing the thing properly.`,
    why: ['You chose craft over celebrity — the work matters more than the attention it brings', 'Your private and public self are distinct — you guard the interior life carefully', 'You care about the world at scale — your personal ambitions serve something larger'],
    shareCaption: `I paid $1.50 and my personality resonates with Leonardo DiCaprio — The Dreamer. Whose archetype are you? → yourone.world`, color: '#4a7a9b',
  },
  kanye_west: {
    id: 'kanye_west', name: 'Kanye West', title: 'The Visionary Storm',
    tagline: 'You cannot separate your genius from your chaos.',
    description: `Your personality resonates with Kanye West's archetype — the person whose vision is so large that the distance between it and what currently exists produces a friction visible to everyone. You are building something that has not existed before, and the process is not clean. You feel everything at maximum intensity. Your confidence is not arrogance — it is a survival mechanism for someone who sees what they see and has to live in a world that does not yet.`,
    why: ['Your creative vision is total — you will not stop until it matches exactly what you see', 'Your intensity makes you difficult and undeniable in equal measure', 'You are visionary and present simultaneously — the past barely exists for you'],
    shareCaption: `I paid $1.50 and my personality resonates with Kanye West — The Visionary Storm. Whose archetype are you? → yourone.world`, color: '#c8b8f8',
  },
}

// ─── PLANET ($2.90) ──────────────────────────────────────────────────────────

export const PLANET_ARCHETYPES: Record<string, ArchetypeResult> = {
  mars: {
    id: 'mars', name: 'Mars', title: 'The Warrior Planet',
    tagline: 'You were built for the battle, not the aftermath.',
    description: `You are Mars — the warrior's world, red and iron-rich and closer to the sun than you perhaps should be. You move toward what you want with a directness that other people find uncomfortable. Conflict does not drain you — it focuses you. You have a ferocity that is not anger, exactly, but a burning commitment to the things you have decided matter. Mars chose you because you understand that some things require force, and you are the person willing to apply it.`,
    why: ['You face threats directly and without delay — your first instinct is always action', 'Your ambition is forward-moving — you claim what you want', 'Your energy is explosive and focused — still until committed, then everything'],
    shareCaption: `I paid $2.90 and my planet is Mars — The Warrior Planet. What's yours? → yourone.world`, color: '#D4522A',
  },
  venus: {
    id: 'venus', name: 'Venus', title: "The Lover's World",
    tagline: 'You understand that beauty is not decoration. It is truth.',
    description: `You are Venus — warm, brilliant, and shrouded in something that protects your core. You have an extraordinary relationship with beauty — not superficial beauty, but the structural kind: beauty in relationships, in ideas, in the way things feel when they are right. You are more complex than people expect from someone so warm. The clouds of Venus are made of acid, and your softness protects something equally formidable.`,
    why: ['You process the world through feeling and beauty — emotion is your primary language', 'You are most alive in relationship — love, in all its forms, is your operating system', 'Your softness is deliberate — it is a choice, not a limitation'],
    shareCaption: `I paid $2.90 and my planet is Venus — The Lover's World. What's yours? → yourone.world`, color: '#f8c840',
  },
  saturn: {
    id: 'saturn', name: 'Saturn', title: 'The Ringed Kingdom',
    tagline: 'You built your world carefully. It shows.',
    description: `You are Saturn — the most architecturally extraordinary object in the solar system, surrounded by rings that are both impossible and inevitable. You think in systems. You build structures that last. Your patience is geological — you can hold a position for years when others have long since moved on. People misread your slowness as hesitance. It is precision. When you finally build something, you build it so well that it circles you forever.`,
    why: ['You think in long arcs — you make decisions based on decades, not days', 'You are structured and deliberate — the architecture matters more than the surface', 'Your patience is your greatest asset — you outlast almost everything that challenges you'],
    shareCaption: `I paid $2.90 and my planet is Saturn — The Ringed Kingdom. What's yours? → yourone.world`, color: '#c0a060',
  },
  jupiter: {
    id: 'jupiter', name: 'Jupiter', title: "The Giant's Domain",
    tagline: 'Your gravity changes the orbits of the people around you.',
    description: `You are Jupiter — the largest thing in the room, always. Your presence has a gravity that people feel without being able to name it. You protect things — not just people, but ideas, spaces, orbits. You are expansive in your thinking, generous in your energy, and you have a warmth that radiates at a scale that is impossible to ignore.`,
    why: ['You protect others instinctively — your first thought in a threat is who else is affected', 'Your presence is gravitational — things reorganise around you without you asking', 'Your thinking operates at scale — you are uncomfortable with the small picture'],
    shareCaption: `I paid $2.90 and my planet is Jupiter — The Giant's Domain. What's yours? → yourone.world`, color: '#c07828',
  },
  neptune: {
    id: 'neptune', name: 'Neptune', title: 'The Dream Ocean',
    tagline: "You live at a distance most people can't reach. That is by design.",
    description: `You are Neptune — the farthest true planet, moving at a pace so slow it has not yet completed a full orbit since its discovery. Your inner world is oceanic — vast, stormy in some places, completely still in others, full of things that have never been seen. You are the most creative person most people have ever known, or the most mysterious, or both. Neptune chose you because you were always going to be the last place people look, and the one they remember most.`,
    why: ['You think in long cycles — change for you is tidal, not sudden', 'Your interior life is your primary reality — the external world is a rough draft', 'You are most yourself at distance — closeness requires significant trust from you'],
    shareCaption: `I paid $2.90 and my planet is Neptune — The Dream Ocean. What's yours? → yourone.world`, color: '#4488ff',
  },
  mercury: {
    id: 'mercury', name: 'Mercury', title: 'The Swift Messenger',
    tagline: 'You process faster than others speak. You have always waited.',
    description: `You are Mercury — the fastest planet, closest to the source, moving at a pace other planets cannot sustain. You think quickly and communicate precisely. You make connections between ideas at a speed that leaves others behind, and you have learned to slow down for them — not because you need to, but because you understand that being understood matters. Mercury has no atmosphere — you take things in directly. That is both a gift and a cost.`,
    why: ['Your mind moves faster than most — you have the answer before the question is finished', 'You communicate precisely — words are your primary tool and you choose them carefully', 'You adapt to environments completely — flexibility is your survival strategy and your strength'],
    shareCaption: `I paid $2.90 and my planet is Mercury — The Swift Messenger. What's yours? → yourone.world`, color: '#c8c8c8',
  },
  pluto: {
    id: 'pluto', name: 'Pluto', title: 'The Dwarf Sovereign',
    tagline: 'They said you were not enough. You have outlasted everyone who said it.',
    description: `You are Pluto — the outlier, the reclassified, the one they changed the rules for. You have been underestimated your entire life, and that has served you in ways you are only beginning to understand. You operate far from the centre, in the cold, on a long elliptical path that is entirely your own. You are not interested in fitting in. You are interested in being exactly, completely what you are.`,
    why: ['You have been misunderstood your whole life — you wear it like armour now', 'You operate at distance from the mainstream — that is independence, not marginalisation', 'Your transformation is your most powerful quality — you are not the same person you were five years ago'],
    shareCaption: `I paid $2.90 and my planet is Pluto — The Dwarf Sovereign. What's yours? → yourone.world`, color: '#8888aa',
  },
  orion_nebula: {
    id: 'orion_nebula', name: 'The Orion Nebula', title: 'The Birthplace',
    tagline: 'You are where things are made. You always have been.',
    description: `You are the Orion Nebula — a nursery of stars, enormous and luminous and constantly in the process of becoming something new. You are generative at a level that is almost unsettling. New things emerge from you constantly — ideas, people, projects, solutions. You are not the finished product. You are the conditions that make the finished product possible. That is a more important role than most people ever inhabit.`,
    why: ['Your creative output is constant and generative — you are always making something', 'You attract and develop others — your environment produces excellence', 'You are expansive in your thinking — the universe inside you is still expanding'],
    shareCaption: `I paid $2.90 and my cosmic home is the Orion Nebula — The Birthplace. What's yours? → yourone.world`, color: '#c8b8f8',
  },
  black_hole: {
    id: 'black_hole', name: 'Sagittarius A*', title: 'The Heart of Darkness',
    tagline: 'Everything orbits you. You give back nothing. That is honest.',
    description: `You are Sagittarius A* — the supermassive black hole at the centre of the Milky Way, around which everything else slowly orbits. Your gravity is not metaphor. You pull things in and they do not come back unchanged. You contain enormous amounts, consume experience entirely, and transform it into something that bends the space around you. You are not easy. You were never supposed to be.`,
    why: ['Your intensity transforms everything it contacts — you do not leave people as you found them', 'Your interior life consumes you as much as anything external', 'You operate at the centre of things — systems organise around you naturally'],
    shareCaption: `I paid $2.90 and my cosmic self is Sagittarius A* — The Heart of Darkness. What's yours? → yourone.world`, color: '#1a0a2e',
  },
  sirius: {
    id: 'sirius', name: 'Sirius', title: 'The Brightest Star',
    tagline: 'You were always going to be visible. You had to decide what to do with it.',
    description: `You are Sirius — the brightest star in the night sky, so bright that ancient civilisations built calendars around your rising. You have always been seen. That is not always comfortable. You carry a visibility you did not necessarily choose, and you have had to decide what to do with it. Sirius chose you because you are someone who, once they commit to being seen, cannot be unseen. Your light changes the sky.`,
    why: ['You generate your own light — you are not a reflection of anyone else\'s brilliance', 'Your visibility is a fact, not a choice — the question was always what to build in that light', 'You are most alive when fully expressed — diminishing yourself costs more than it saves'],
    shareCaption: `I paid $2.90 and my star is Sirius — The Brightest Star. What's yours? → yourone.world`, color: '#88ccff',
  },
  moon: {
    id: 'moon', name: 'The Moon', title: 'The Night Keeper',
    tagline: 'You reflect what others need to see. That is a different kind of power.',
    description: `You are the Moon — not because you are secondary, but because you understand reflection in a way that stars do not. You have an extraordinary ability to show people themselves. You are cyclical in a way others find mysterious. You pull things toward you rhythmically, including the tides of other people's emotions. You have always had a relationship with the dark side of things that you keep entirely private.`,
    why: ['You are most powerful in your effect on others — you change things by proximity', 'You move in cycles — you know your phases now, and you use them deliberately', 'You carry a private interior — there is always a side of you no one gets to see'],
    shareCaption: `I paid $2.90 and my cosmic self is The Moon — The Night Keeper. What's yours? → yourone.world`, color: '#c8d8f0',
  },
  andromeda: {
    id: 'andromeda', name: 'The Andromeda Galaxy', title: 'The Incoming',
    tagline: 'You are moving toward something enormous. You always have been.',
    description: `You are Andromeda — the nearest large galaxy, moving irreversibly toward the Milky Way. You are on a collision course with something significant, and it is not a disaster. It is a merger. You are the kind of person whose arrival changes the configuration of everything around them. You are not destructive. You are transformative at a scale that only makes sense from a sufficient distance.`,
    why: ['You are moving toward something major — your life has been building toward a convergence', 'Your effect on systems is large and slow and total — you reorganise what you enter', 'You exist at a scale that requires patience to understand — the full picture takes time'],
    shareCaption: `I paid $2.90 and my cosmic self is Andromeda — The Incoming. What's yours? → yourone.world`, color: '#8b1a5a',
  },
}

export const ARCHETYPE_REGISTRY = {
  world:     WORLD_ARCHETYPES,
  animal:    ANIMAL_ARCHETYPES,
  celebrity: CELEBRITY_ARCHETYPES,
  planet:    PLANET_ARCHETYPES,
} as const

export type CategoryKey = keyof typeof ARCHETYPE_REGISTRY
