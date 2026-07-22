'use client'

import { useState } from 'react'
import { Calculator, CheckCircle2, ArrowRight, Sparkles, Smartphone, Globe, TrendingUp, Cpu, Zap, ShieldCheck } from 'lucide-react'

type ScopeType = 'app' | 'website' | 'marketing' | 'fullstack'

interface ServiceOption {
  id: string
  label: string
  price: number
  desc: string
}

const SERVICE_SCOPES: Record<ScopeType, { title: string; basePrice: number; options: ServiceOption[] }> = {
  app: {
    title: 'Mobile & Web App Development',
    basePrice: 4800,
    options: [
      { id: 'ios_android', label: 'Cross-Platform App (iOS + Android)', price: 3500, desc: 'Single React Native / Flutter codebase with native performance' },
      { id: 'ai_agents', label: 'AI Agent & LLM Integration', price: 2200, desc: 'Conversational UI, fine-tuned RAG pipelines, autonomous workflows' },
      { id: 'backend_api', label: 'Scalable Cloud Backend & APIs', price: 1800, desc: 'Supabase / Node.js, microservices, auth, webhooks & realtime DB' },
      { id: 'offline_sync', label: 'Offline Sync & Realtime Analytics', price: 1200, desc: 'Local persistence, WebSocket feeds, telemetry tracking' }
    ]
  },
  website: {
    title: 'Bespoke Website Building & Web Systems',
    basePrice: 2800,
    options: [
      { id: 'nextjs_3d', label: 'Next.js 15 WebGL / 3D Experiences', price: 2400, desc: '60fps micro-animations, GSAP scrollytelling, custom shaders' },
      { id: 'cms_webflow', label: 'Custom CMS & Content Engine', price: 1400, desc: 'Sanity / Strapi / Webflow CMS integration for easy editor updates' },
      { id: 'cro_funnels', label: 'High-Conversion Funnel Engineering', price: 1600, desc: 'Neuromarketing visual hierarchy, A/B tested checkout flows' },
      { id: 'seo_speed', label: '100/100 Core Web Vitals & Technical SEO', price: 950, desc: 'Instant page loads, structured Schema.org markup, SEO indexing' }
    ]
  },
  marketing: {
    title: 'Digital Marketing & Neuromarketing Growth',
    basePrice: 2200,
    options: [
      { id: 'neuromarketing_audit', label: 'Neuromarketing UI/UX Audit', price: 1500, desc: 'Eye-tracking & cognitive load analysis to uncover conversion leaks' },
      { id: 'performance_ads', label: 'Performance Ad Campaign Management', price: 2000, desc: 'Meta, Google, TikTok ad creatives & multi-funnel retargeting' },
      { id: 'brand_identity', label: 'Complete Brand Identity & Guidelines', price: 1800, desc: 'Visual design system, typography, motion graphics & brand deck' },
      { id: 'seo_content', label: 'Organic Search & Content Engine', price: 1200, desc: 'Rank #1 keyword acquisition strategy & automated content pipelines' }
    ]
  },
  fullstack: {
    title: 'All-In-One Enterprise Transformation',
    basePrice: 8500,
    options: [
      { id: 'full_app_web', label: 'Complete Web + Mobile Suite', price: 4500, desc: 'Shared design system across Mobile App, Web App, and Marketing Site' },
      { id: 'growth_engine', label: '6-Month Dedicated Growth Sprints', price: 3800, desc: 'Continuous CRO, feature iterations, performance marketing management' },
      { id: 'ai_copilot', label: 'Custom Enterprise AI Copilot', price: 3200, desc: 'Proprietary AI assistant deployed on your private data infrastructure' },
      { id: 'devops_scale', label: 'Zero-Downtime Multi-Region Hosting', price: 1500, desc: 'Vercel Enterprise, AWS auto-scaling, SOC2 security compliance' }
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

  // Calculate estimated investment
  const addOnsTotal = activeScope.options
    .filter(opt => selectedOptions.includes(opt.id))
    .reduce((sum, opt) => sum + opt.price, 0)

  const rawTotal = activeScope.basePrice + addOnsTotal
  const finalEstimate = timelineSpeed === 'express' ? Math.round(rawTotal * 1.25) : rawTotal
  const estimatedWeeks = timelineSpeed === 'express' ? '3 - 5 Weeks' : '6 - 8 Weeks'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="estimator" className="py-24 relative overflow-hidden bg-slate-950/80 border-y border-white/10">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-semibold uppercase tracking-wider">
            <Calculator className="w-4 h-4" /> Interactive Project Scope Estimator
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Calculate Your Project Scope & <span className="text-gradient">Instant Investment Quote</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Transparent pricing based on exact engineering deliverables. Select your scope below to generate an estimate in seconds.
          </p>
        </div>

        {/* Scope Type Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto mb-12">
          <button
            onClick={() => { setActiveType('app'); setSelectedOptions(['ios_android', 'backend_api']); }}
            className={`p-4 rounded-2xl text-left transition-all flex flex-col gap-3 border ${
              activeType === 'app' 
                ? 'bg-gradient-to-br from-indigo-900/40 to-slate-900 border-indigo-500/60 shadow-lg shadow-indigo-500/20 text-white' 
                : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-white hover:border-white/20'
            }`}
          >
            <Smartphone className={`w-6 h-6 ${activeType === 'app' ? 'text-indigo-400' : 'text-slate-500'}`} />
            <div>
              <div className="font-semibold text-sm">App Building</div>
              <div className="text-xs text-slate-500">iOS, Android, React Native</div>
            </div>
          </button>

          <button
            onClick={() => { setActiveType('website'); setSelectedOptions(['nextjs_3d', 'seo_speed']); }}
            className={`p-4 rounded-2xl text-left transition-all flex flex-col gap-3 border ${
              activeType === 'website' 
                ? 'bg-gradient-to-br from-indigo-900/40 to-slate-900 border-indigo-500/60 shadow-lg shadow-indigo-500/20 text-white' 
                : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-white hover:border-white/20'
            }`}
          >
            <Globe className={`w-6 h-6 ${activeType === 'website' ? 'text-indigo-400' : 'text-slate-500'}`} />
            <div>
              <div className="font-semibold text-sm">Website Building</div>
              <div className="text-xs text-slate-500">Next.js 15, 3D & Webflow</div>
            </div>
          </button>

          <button
            onClick={() => { setActiveType('marketing'); setSelectedOptions(['neuromarketing_audit', 'performance_ads']); }}
            className={`p-4 rounded-2xl text-left transition-all flex flex-col gap-3 border ${
              activeType === 'marketing' 
                ? 'bg-gradient-to-br from-indigo-900/40 to-slate-900 border-indigo-500/60 shadow-lg shadow-indigo-500/20 text-white' 
                : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-white hover:border-white/20'
            }`}
          >
            <TrendingUp className={`w-6 h-6 ${activeType === 'marketing' ? 'text-indigo-400' : 'text-slate-500'}`} />
            <div>
              <div className="font-semibold text-sm">Digital Marketing</div>
              <div className="text-xs text-slate-500">SEO, Ads & Neuromarketing</div>
            </div>
          </button>

          <button
            onClick={() => { setActiveType('fullstack'); setSelectedOptions(['full_app_web', 'growth_engine']); }}
            className={`p-4 rounded-2xl text-left transition-all flex flex-col gap-3 border ${
              activeType === 'fullstack' 
                ? 'bg-gradient-to-br from-indigo-900/40 to-slate-900 border-indigo-500/60 shadow-lg shadow-indigo-500/20 text-white' 
                : 'bg-slate-900/60 border-white/5 text-slate-400 hover:text-white hover:border-white/20'
            }`}
          >
            <Zap className={`w-6 h-6 ${activeType === 'fullstack' ? 'text-amber-400' : 'text-slate-500'}`} />
            <div>
              <div className="font-semibold text-sm">Full Transformation</div>
              <div className="text-xs text-slate-500">Complete Product Suite</div>
            </div>
          </button>
        </div>

        {/* Interactive Estimator Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Options Checklist */}
          <div className="lg:col-span-7 space-y-4">
            <div className="p-6 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center justify-between">
                <span>Select Deliverables for {activeScope.title}</span>
                <span className="text-xs font-mono text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-full">
                  Base Architecture: ${activeScope.basePrice.toLocaleString()}
                </span>
              </h3>
              <p className="text-xs text-slate-400 mb-6">
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
                          ? 'bg-indigo-950/40 border-indigo-500/50 text-white shadow-md' 
                          : 'bg-slate-900/40 border-white/5 text-slate-300 hover:border-white/15'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center mt-0.5 transition-colors ${
                          isChecked ? 'bg-indigo-600 border-indigo-500 text-white' : 'border-slate-700 bg-slate-950'
                        }`}>
                          {isChecked && <CheckCircle2 className="w-4 h-4 text-white" />}
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-white">{option.label}</div>
                          <div className="text-xs text-slate-400 mt-0.5">{option.desc}</div>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="font-mono text-sm font-bold text-indigo-300">+${option.price.toLocaleString()}</span>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Delivery Velocity Selector */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <label className="text-xs uppercase tracking-wider text-slate-400 font-semibold mb-3 block">
                  Delivery Velocity & Sprint Pacing
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setTimelineSpeed('standard')}
                    className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                      timelineSpeed === 'standard'
                        ? 'bg-indigo-600/20 border-indigo-500 text-white'
                        : 'bg-slate-900 border-white/5 text-slate-400'
                    }`}
                  >
                    Standard Sprint Pacing (6-8 Weeks)
                  </button>
                  <button
                    type="button"
                    onClick={() => setTimelineSpeed('express')}
                    className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                      timelineSpeed === 'express'
                        ? 'bg-indigo-600/20 border-indigo-500 text-white'
                        : 'bg-slate-900 border-white/5 text-slate-400'
                    }`}
                  >
                    Express Fast-Track (+25% Speed, 3-5 Weeks)
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Real-time Summary Card & Lead Form */}
          <div className="lg:col-span-5">
            <div className="p-8 rounded-3xl bg-gradient-to-b from-indigo-950/60 via-slate-900 to-slate-950 border border-indigo-500/30 backdrop-blur-2xl shadow-2xl shadow-indigo-950/50 sticky top-24">
              
              <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-6">
                <div>
                  <span className="text-xs text-slate-400 uppercase tracking-widest block font-medium">Estimated Investment</span>
                  <div className="font-heading text-4xl font-extrabold text-white font-mono mt-1 text-gradient">
                    ${finalEstimate.toLocaleString()} <span className="text-xs font-sans font-normal text-slate-400">USD</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 uppercase tracking-widest block font-medium">Delivery Pacing</span>
                  <span className="text-sm font-semibold text-emerald-400 font-mono mt-1 block">
                    {estimatedWeeks}
                  </span>
                </div>
              </div>

              {/* What's included checklist */}
              <div className="space-y-3 mb-8">
                <div className="text-xs font-semibold uppercase text-slate-400 tracking-wider">Includes Studio Guarantee:</div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Dedicated Senior Tech Lead + UI/UX Strategist</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>100% Source Code & IP Transfer</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>60-Day Post-Launch SLA & Bug Warranty</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <ShieldCheck className="w-4 h-4 text-indigo-400 shrink-0" />
                  <span>Weekly Demo Sprints & Figma Live Link</span>
                </div>
              </div>

              {/* Instant Inquiry Form */}
              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="font-heading text-lg font-bold text-white">Proposal Reserved!</h4>
                  <p className="text-xs text-slate-300">
                    Thank you <strong className="text-white">{clientName}</strong>! Your estimated quote of <strong>${finalEstimate.toLocaleString()}</strong> has been locked in. Our lead strategist will reach out to <strong>{clientEmail}</strong> within 2 hours.
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
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      required
                      placeholder="work.email@company.com"
                      value={clientEmail}
                      onChange={e => setClientEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 font-semibold text-white text-sm shadow-xl shadow-indigo-500/30 hover:opacity-95 transition-opacity flex items-center justify-center gap-2 group"
                  >
                    Lock In Estimate & Reserve Sprint <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <p className="text-[11px] text-center text-slate-500">
                    No credit card required. NDA signed upon first call.
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
