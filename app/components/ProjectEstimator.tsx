'use client'

import { useState } from 'react'
import { Calculator, CheckCircle2, ArrowRight, Smartphone, Globe, TrendingUp, Zap, ShieldCheck } from 'lucide-react'

type ScopeType = 'app' | 'website' | 'marketing' | 'fullstack'

interface ServiceOption {
  id: string
  label: string
  desc: string
}

const SERVICE_SCOPES: Record<ScopeType, { title: string; options: ServiceOption[] }> = {
  app: {
    title: 'Mobile & Web App Development',
    options: [
      { id: 'ios_android', label: 'Cross-Platform App (iOS + Android)', desc: 'Single React Native / Flutter codebase with native performance' },
      { id: 'ai_agents', label: 'AI Agent & LLM Integration', desc: 'Conversational UI, fine-tuned RAG pipelines, autonomous workflows' },
      { id: 'backend_api', label: 'Scalable Cloud Backend & APIs', desc: 'Supabase / Node.js, microservices, auth, webhooks & realtime DB' },
      { id: 'offline_sync', label: 'Offline Sync & Realtime Analytics', desc: 'Local persistence, WebSocket feeds, telemetry tracking' }
    ]
  },
  website: {
    title: 'Bespoke Website Building & Web Systems',
    options: [
      { id: 'nextjs_3d', label: 'Next.js 15 WebGL / 3D Experiences', desc: '60fps micro-animations, GSAP scrollytelling, custom shaders' },
      { id: 'cms_webflow', label: 'Custom CMS & Content Engine', desc: 'Sanity / Strapi / Webflow CMS integration for easy editor updates' },
      { id: 'cro_funnels', label: 'High-Conversion Funnel Engineering', desc: 'Neuromarketing visual hierarchy, A/B tested checkout flows' },
      { id: 'seo_speed', label: '100/100 Core Web Vitals & Technical SEO', desc: 'Instant page loads, structured Schema.org markup, SEO indexing' }
    ]
  },
  marketing: {
    title: 'Digital Marketing & Neuromarketing Growth',
    options: [
      { id: 'neuromarketing_audit', label: 'Neuromarketing UI/UX Audit', desc: 'Eye-tracking & cognitive load analysis to uncover conversion leaks' },
      { id: 'performance_ads', label: 'Performance Ad Campaign Management', desc: 'Meta, Google, TikTok ad creatives & multi-funnel retargeting' },
      { id: 'brand_identity', label: 'Complete Brand Identity & Guidelines', desc: 'Visual design system, typography, motion graphics & brand deck' },
      { id: 'seo_content', label: 'Organic Search & Content Engine', desc: 'Rank #1 keyword acquisition strategy & automated content pipelines' }
    ]
  },
  fullstack: {
    title: 'All-In-One Enterprise Transformation',
    options: [
      { id: 'full_app_web', label: 'Complete Web + Mobile Suite', desc: 'Shared design system across Mobile App, Web App, and Marketing Site' },
      { id: 'growth_engine', label: 'Dedicated Growth Sprints', desc: 'Continuous CRO, feature iterations, performance marketing management' },
      { id: 'ai_copilot', label: 'Custom Enterprise AI Copilot', desc: 'Proprietary AI assistant deployed on your private data infrastructure' },
      { id: 'devops_scale', label: 'Zero-Downtime Multi-Region Hosting', desc: 'Vercel Enterprise, AWS auto-scaling, SOC2 security compliance' }
    ]
  }
}

export default function ProjectEstimator() {
  const [activeType, setActiveType] = useState<ScopeType>('app')
  const [selectedOptions, setSelectedOptions] = useState<string[]>(['ios_android', 'backend_api'])
  const [timelineSpeed, setTimelineSpeed] = useState<'standard' | 'express'>('standard')
  const [submitted, setSubmitted] = useState(false)
  const [clientEmail, setClientEmail] = useState('')
  const [clientName, setClientName] = useState('')

  const activeScope = SERVICE_SCOPES[activeType]

  const toggleOption = (id: string) => {
    setSelectedOptions(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    )
  }

  const selectedCount = activeScope.options.filter(opt => selectedOptions.includes(opt.id)).length
  const estimatedWeeks = timelineSpeed === 'express' ? '3 - 5 Weeks' : '6 - 8 Weeks'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="estimator" className="py-24 relative overflow-hidden bg-[#faf5ea]/90 border-y border-amber-200/80">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-amber-500/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-300/70 text-amber-900 text-xs font-mono font-semibold uppercase tracking-wider">
            <Calculator className="w-4 h-4 text-amber-700" /> Interactive Project Scope Estimator
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight">
            Calculate Your Project Scope & <span className="text-gradient">Timeline Sprint Plan</span>
          </h2>
          <p className="text-stone-600 text-base sm:text-lg">
            Customize your project deliverables based on exact engineering modules. Select your scope below to generate a tailored sprint roadmap.
          </p>
        </div>

        {/* Scope Type Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto mb-12">
          <button
            onClick={() => { setActiveType('app'); setSelectedOptions(['ios_android', 'backend_api']); }}
            className={`p-4 rounded-2xl text-left transition-all flex flex-col gap-3 border ${
              activeType === 'app' 
                ? 'bg-white border-amber-500 shadow-md shadow-amber-600/10 text-stone-900' 
                : 'bg-white/70 border-amber-200/70 text-stone-600 hover:text-stone-900 hover:border-amber-300'
            }`}
          >
            <Smartphone className={`w-6 h-6 ${activeType === 'app' ? 'text-amber-700' : 'text-stone-400'}`} />
            <div>
              <div className="font-semibold text-sm">App Building</div>
              <div className="text-xs text-stone-500">iOS, Android, React Native</div>
            </div>
          </button>

          <button
            onClick={() => { setActiveType('website'); setSelectedOptions(['nextjs_3d', 'seo_speed']); }}
            className={`p-4 rounded-2xl text-left transition-all flex flex-col gap-3 border ${
              activeType === 'website' 
                ? 'bg-white border-amber-500 shadow-md shadow-amber-600/10 text-stone-900' 
                : 'bg-white/70 border-amber-200/70 text-stone-600 hover:text-stone-900 hover:border-amber-300'
            }`}
          >
            <Globe className={`w-6 h-6 ${activeType === 'website' ? 'text-amber-700' : 'text-stone-400'}`} />
            <div>
              <div className="font-semibold text-sm">Website Building</div>
              <div className="text-xs text-stone-500">Next.js 15, 3D & Webflow</div>
            </div>
          </button>

          <button
            onClick={() => { setActiveType('marketing'); setSelectedOptions(['neuromarketing_audit', 'performance_ads']); }}
            className={`p-4 rounded-2xl text-left transition-all flex flex-col gap-3 border ${
              activeType === 'marketing' 
                ? 'bg-white border-amber-500 shadow-md shadow-amber-600/10 text-stone-900' 
                : 'bg-white/70 border-amber-200/70 text-stone-600 hover:text-stone-900 hover:border-amber-300'
            }`}
          >
            <TrendingUp className={`w-6 h-6 ${activeType === 'marketing' ? 'text-amber-700' : 'text-stone-400'}`} />
            <div>
              <div className="font-semibold text-sm">Digital Marketing</div>
              <div className="text-xs text-stone-500">SEO, Ads & Neuromarketing</div>
            </div>
          </button>

          <button
            onClick={() => { setActiveType('fullstack'); setSelectedOptions(['full_app_web', 'growth_engine']); }}
            className={`p-4 rounded-2xl text-left transition-all flex flex-col gap-3 border ${
              activeType === 'fullstack' 
                ? 'bg-white border-amber-600 shadow-md shadow-amber-600/10 text-stone-900' 
                : 'bg-white/70 border-amber-200/70 text-stone-600 hover:text-stone-900 hover:border-amber-300'
            }`}
          >
            <Zap className={`w-6 h-6 ${activeType === 'fullstack' ? 'text-orange-600' : 'text-stone-400'}`} />
            <div>
              <div className="font-semibold text-sm">Full Transformation</div>
              <div className="text-xs text-stone-500">Complete Product Suite</div>
            </div>
          </button>
        </div>

        {/* Interactive Estimator Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Options Checklist */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-6 rounded-3xl bg-white border border-amber-200/80 shadow-lg backdrop-blur-xl">
              <h3 className="text-lg font-bold text-stone-900 mb-2 flex items-center justify-between">
                <span>Select Deliverables for {activeScope.title}</span>
                <span className="text-xs font-mono text-amber-900 bg-amber-100/80 border border-amber-300/70 px-2.5 py-1 rounded-full font-semibold">
                  {selectedCount} Modules Selected
                </span>
              </h3>
              <p className="text-xs text-stone-500 mb-6">
                Customize your exact feature stack below. Every option includes full IP ownership, clean documentation & post-launch warranty.
              </p>

              <div className="space-y-3">
                {activeScope.options.map(option => {
                  const isChecked = selectedOptions.includes(option.id)
                  return (
                    <div 
                      key={option.id}
                      onClick={() => toggleOption(option.id)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start justify-between gap-4 ${
                        isChecked 
                          ? 'bg-amber-50/80 border-amber-400 text-stone-900 shadow-sm' 
                          : 'bg-[#faf5ea]/50 border-amber-200/60 text-stone-700 hover:border-amber-300'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center mt-0.5 transition-colors ${
                          isChecked ? 'bg-amber-600 border-amber-600 text-white' : 'border-amber-300 bg-white'
                        }`}>
                          {isChecked && <CheckCircle2 className="w-4 h-4 text-white" />}
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-stone-900">{option.label}</div>
                          <div className="text-xs text-stone-500 mt-0.5">{option.desc}</div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-xs font-mono font-semibold text-amber-800 bg-amber-100/60 px-2 py-0.5 rounded-full">Included</span>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Delivery Velocity Selector */}
              <div className="mt-8 pt-6 border-t border-amber-100">
                <label className="text-xs uppercase tracking-wider text-stone-500 font-semibold mb-3 block">
                  Delivery Velocity & Sprint Pacing
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setTimelineSpeed('standard')}
                    className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                      timelineSpeed === 'standard'
                        ? 'bg-amber-100/70 border-amber-400 text-amber-900'
                        : 'bg-[#faf5ea] border-amber-200 text-stone-600'
                    }`}
                  >
                    Standard Sprint Pacing (6-8 Weeks)
                  </button>
                  <button
                    type="button"
                    onClick={() => setTimelineSpeed('express')}
                    className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                      timelineSpeed === 'express'
                        ? 'bg-amber-100/70 border-amber-400 text-amber-900'
                        : 'bg-[#faf5ea] border-amber-200 text-stone-600'
                    }`}
                  >
                    Express Fast-Track (3-5 Weeks)
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Real-time Summary Card & Lead Form */}
          <div className="lg:col-span-5">
            <div className="p-8 rounded-3xl bg-white border border-amber-200/80 shadow-xl sticky top-24">
              
              <div className="flex items-center justify-between border-b border-amber-100 pb-6 mb-6">
                <div>
                  <span className="text-xs text-stone-500 uppercase tracking-widest block font-semibold">Scope Deliverables</span>
                  <div className="font-heading text-2xl font-extrabold text-stone-900 font-mono mt-1 text-gradient">
                    {selectedCount} Key Modules
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-stone-500 uppercase tracking-widest block font-semibold">Delivery Pacing</span>
                  <span className="text-sm font-bold text-emerald-700 font-mono mt-1 block">
                    {estimatedWeeks}
                  </span>
                </div>
              </div>

              {/* What's included checklist */}
              <div className="space-y-3 mb-8">
                <div className="text-xs font-semibold uppercase text-stone-500 tracking-wider">Includes Studio Guarantee:</div>
                <div className="flex items-center gap-2 text-xs text-stone-700 font-medium">
                  <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Dedicated Senior Tech Lead + UI/UX Strategist</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-stone-700 font-medium">
                  <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>100% Source Code & IP Transfer</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-stone-700 font-medium">
                  <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>60-Day Post-Launch SLA & Bug Warranty</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-stone-700 font-medium">
                  <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Weekly Demo Sprints & Figma Live Link</span>
                </div>
              </div>

              {/* Instant Inquiry Form */}
              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-100/70 border border-emerald-300 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" />
                  <h4 className="font-heading text-lg font-bold text-stone-900">Proposal Reserved!</h4>
                  <p className="text-xs text-stone-700">
                    Thank you <strong className="text-stone-900">{clientName}</strong>! Your customized scope for <strong>{selectedCount} modules</strong> ({estimatedWeeks}) has been reserved. Our lead strategist will reach out to <strong>{clientEmail}</strong> within 2 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Your Name / Company Name"
                      value={clientName}
                      onChange={e => setClientName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#faf5ea]/70 border border-amber-200 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      required
                      placeholder="work.email@company.com"
                      value={clientEmail}
                      onChange={e => setClientEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-[#faf5ea]/70 border border-amber-200 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-indigo-600 font-semibold text-white text-sm shadow-md shadow-amber-600/30 hover:opacity-95 transition-opacity flex items-center justify-center gap-2 group"
                  >
                    Request Detailed Proposal & Reserve Sprint <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <p className="text-[11px] text-center text-stone-500">
                    NDA signed upon first call. Direct technical feedback guaranteed.
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
