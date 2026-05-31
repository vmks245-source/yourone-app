'use client'
import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ARCHETYPE_REGISTRY } from '../../lib/archetypes'
import type { CategoryKey, ArchetypeResult } from '../../lib/archetypes'
import { decodeCode } from '../../lib/codeUtils'
import { ARCHETYPE_GROUP, GROUPS } from '../../lib/compatibility'

const CATEGORY_LABELS: Record<CategoryKey, string> = {
  world: 'Your World', animal: 'Spirit Animal', celebrity: 'Your Celebrity', planet: 'Your Planet',
}

interface Profile {
  name: string
  role: string
  building: string
  link: string
}

export default function ProfilePage() {
  const params  = useParams()
  const search  = useSearchParams()
  const code    = (params.code as string ?? '').toUpperCase()
  const cat     = (search.get('cat') ?? 'world') as CategoryKey

  const [result,   setResult]   = useState<ArchetypeResult | null>(null)
  const [profile,  setProfile]  = useState<Profile>({ name: '', role: '', building: '', link: '' })
  const [copied,   setCopied]   = useState(false)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const id = decodeCode(code, cat)
    if (!id) { setNotFound(true); return }
    const r = ARCHETYPE_REGISTRY[cat]?.[id]
    if (!r) { setNotFound(true); return }
    setResult(r)
    setProfile({
      name:     search.get('n') ?? '',
      role:     search.get('r') ?? '',
      building: search.get('b') ?? '',
      link:     search.get('l') ?? '',
    })
  }, [code, cat, search])

  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.href).catch(() => {})
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (notFound) return (
    <div style={{ minHeight: '100vh', background: '#04040c', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem', fontFamily: 'Inter, sans-serif' }}>
      <div style={{ fontSize: '2rem', color: 'rgba(255,255,255,0.2)' }}>◎</div>
      <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.88rem' }}>This profile wasn&apos;t found or the code is invalid.</p>
      <Link href="/" style={{ color: 'rgba(160,122,248,0.8)', fontSize: '0.8rem', textDecoration: 'none' }}>← Discover yours at yourone.world</Link>
    </div>
  )

  if (!result) return (
    <div style={{ minHeight: '100vh', background: '#04040c', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid transparent', borderTopColor: '#a07af8', animation: 'loadSpin 1.2s linear infinite' }} />
    </div>
  )

  const groupId  = ARCHETYPE_GROUP[result.id]
  const group    = groupId ? GROUPS[groupId] : null
  const catLabel = CATEGORY_LABELS[cat]
  const hasProfile = profile.name || profile.role || profile.building

  return (
    <div style={{ minHeight: '100vh', background: '#04040c', color: '#f0efff', fontFamily: 'Inter, -apple-system, sans-serif' }}>

      {/* Background glow */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', borderRadius: '50%', background: `radial-gradient(circle, ${result.color}10 0%, transparent 60%)` }} />
      </div>

      {/* Nav */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.5rem', backdropFilter: 'blur(12px)', background: 'rgba(4,4,12,0.7)', borderBottom: '0.5px solid rgba(255,255,255,0.06)' }}>
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontSize: '0.78rem', color: 'rgba(160,122,248,0.75)', letterSpacing: '0.1em', fontWeight: 600 }}>yourone.world</span>
        </Link>
        <Link href="/" style={{ textDecoration: 'none', background: 'rgba(160,122,248,0.1)', border: '0.5px solid rgba(160,122,248,0.3)', borderRadius: '50px', padding: '0.35rem 0.9rem', color: 'rgba(160,122,248,0.9)', fontSize: '0.72rem', fontWeight: 500 }}>
          Find yours →
        </Link>
      </nav>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '620px', margin: '0 auto', padding: '7rem 1.5rem 4rem' }}>

        {/* Archetype header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: `${result.color}12`, border: `0.5px solid ${result.color}35`, borderRadius: '50px', padding: '0.3rem 0.9rem', marginBottom: '1.4rem' }}>
            <span style={{ fontSize: '0.62rem', letterSpacing: '0.18em', color: result.color, textTransform: 'uppercase', fontWeight: 600 }}>{catLabel}</span>
            <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: `${result.color}60`, display: 'inline-block' }} />
            <span style={{ fontSize: '0.62rem', letterSpacing: '0.1em', color: `${result.color}80`, fontFamily: 'monospace' }}>{code}</span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.2rem,7vw,3.8rem)', fontFamily: 'Playfair Display, serif', fontWeight: 400, lineHeight: 1.08, marginBottom: '0.5rem', color: '#f0efff', textShadow: `0 0 60px ${result.color}22` }}>{result.name}</h1>
          <div style={{ fontSize: '1rem', color: result.color, fontStyle: 'italic', fontWeight: 500, marginBottom: '0.75rem' }}>{result.title}</div>
          <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.62)', fontStyle: 'italic', lineHeight: 1.72, borderLeft: `2px solid ${result.color}40`, paddingLeft: '0.8rem', textAlign: 'left', maxWidth: '460px', margin: '0 auto' }}>{result.tagline}</p>
        </div>

        {/* Profile card (if claimed) */}
        {hasProfile && (
          <div style={{ background: `linear-gradient(145deg, ${result.color}0c, rgba(4,4,12,0.9))`, border: `0.5px solid ${result.color}25`, borderRadius: '20px', padding: '1.5rem', marginBottom: '1rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: `linear-gradient(90deg, ${result.color}, ${result.color}44, transparent)` }} />

            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: profile.building ? '1rem' : 0, flexWrap: 'wrap' }}>
              <div>
                {profile.name && <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#f0efff', marginBottom: '0.2rem' }}>{profile.name}</div>}
                {profile.role && <div style={{ fontSize: '0.82rem', color: `${result.color}bb`, fontWeight: 500 }}>{profile.role}</div>}
              </div>
              {profile.link && (
                <a href={profile.link.startsWith('http') ? profile.link : `https://${profile.link}`} target="_blank" rel="noreferrer"
                  style={{ textDecoration: 'none', background: `${result.color}18`, border: `0.5px solid ${result.color}40`, borderRadius: '50px', padding: '0.4rem 1rem', color: result.color, fontSize: '0.74rem', fontWeight: 600, whiteSpace: 'nowrap', flexShrink: 0 }}>
                  Connect →
                </a>
              )}
            </div>

            {profile.building && (
              <div style={{ background: 'rgba(0,0,0,0.25)', borderRadius: '10px', padding: '0.75rem 1rem' }}>
                <div style={{ fontSize: '0.58rem', letterSpacing: '0.16em', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>currently building</div>
                <div style={{ fontSize: '0.84rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>{profile.building}</div>
              </div>
            )}
          </div>
        )}

        {/* Group badge */}
        {group && (
          <div style={{ background: 'rgba(255,255,255,0.02)', border: '0.5px solid rgba(255,255,255,0.07)', borderRadius: '16px', padding: '1.2rem 1.4rem', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.8rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: `${group.color}18`, border: `0.5px solid ${group.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', color: group.color, flexShrink: 0 }}>{group.emoji}</div>
              <div>
                <div style={{ fontSize: '0.58rem', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', marginBottom: '0.2rem' }}>collective group</div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#f0efff' }}>{group.name}</div>
              </div>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.48)', lineHeight: 1.65, marginBottom: '1rem' }}>{group.description}</p>

            <div style={{ borderTop: '0.5px solid rgba(255,255,255,0.05)', paddingTop: '0.85rem' }}>
              <div style={{ fontSize: '0.58rem', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', marginBottom: '0.55rem' }}>works best with</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {group.compatibility.map(p => (
                  <div key={p.with} style={{ background: `${GROUPS[p.with].color}10`, border: `0.5px solid ${GROUPS[p.with].color}30`, borderRadius: '10px', padding: '0.55rem 0.85rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
                      <span style={{ color: GROUPS[p.with].color, fontSize: '0.85rem' }}>{GROUPS[p.with].emoji}</span>
                      <span style={{ fontSize: '0.75rem', fontWeight: 600, color: GROUPS[p.with].color }}>{GROUPS[p.with].name}</span>
                    </div>
                    <div style={{ fontSize: '0.64rem', color: 'rgba(255,255,255,0.38)', fontStyle: 'italic' }}>{p.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Description */}
        <div style={{ background: 'rgba(0,0,0,0.35)', backdropFilter: 'blur(12px)', border: `0.5px solid ${result.color}18`, borderRadius: '16px', padding: '1.3rem 1.4rem', marginBottom: '1rem' }}>
          <div style={{ fontSize: '0.58rem', letterSpacing: '0.16em', color: `${result.color}66`, textTransform: 'uppercase', marginBottom: '0.85rem', fontWeight: 600 }}>their revelation</div>
          <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.82)', lineHeight: 1.95, letterSpacing: '0.01em' }}>{result.description}</p>
        </div>

        {/* Share + collective */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '1rem' }}>
          <button onClick={copyUrl}
            style={{ background: 'rgba(255,255,255,0.04)', border: '0.5px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '0.75rem', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', fontSize: '0.78rem', fontWeight: 500, transition: 'all 0.2s' }}>
            {copied ? '✓ Copied' : '📋 Share this profile'}
          </button>
          <Link href="/collective" style={{ textDecoration: 'none', background: 'rgba(160,122,248,0.08)', border: '0.5px solid rgba(160,122,248,0.25)', borderRadius: '12px', padding: '0.75rem', color: 'rgba(160,122,248,0.85)', fontSize: '0.78rem', fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            The Collective →
          </Link>
        </div>

        {/* Find yours CTA */}
        <div style={{ background: 'linear-gradient(145deg, rgba(160,122,248,0.07), rgba(68,136,255,0.04))', border: '0.5px solid rgba(160,122,248,0.18)', borderRadius: '16px', padding: '1.4rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.42)', marginBottom: '0.9rem', lineHeight: 1.65 }}>
            What&apos;s your archetype? Find your world, animal, celebrity, or planet — then claim your profile.
          </p>
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-block', background: 'linear-gradient(135deg, rgba(160,122,248,0.2), rgba(68,136,255,0.15))', border: '0.5px solid rgba(160,122,248,0.38)', borderRadius: '50px', padding: '0.7rem 2rem', color: '#f0efff', fontSize: '0.84rem', fontWeight: 600 }}>
            Discover yours at yourone.world →
          </Link>
        </div>

        <p style={{ fontSize: '0.62rem', color: 'rgba(255,255,255,0.2)', textAlign: 'center', marginTop: '2rem' }}>
          a <strong style={{ color: 'rgba(255,255,255,0.35)' }}>Filmos</strong> product · yourone.world
        </p>
      </div>
    </div>
  )
}
