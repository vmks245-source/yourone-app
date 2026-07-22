'use client'

import { useState } from 'react'
import { Brain, Eye, Sparkles, Target, Zap, Activity, Award, Check } from 'lucide-react'

export default function NeuromarketingSection() {
  const [activeTab, setActiveTab] = useState<'neuro' | 'behavior' | 'cro'>('neuro')

  return (
    <section id="methodology" className="py-24 relative overflow-hidden bg-[#030712]">
      {/* Background ambient mesh */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono font-semibold uppercase tracking-wider">
            <Brain className="w-4 h-4" /> Behavioral Science & AI Engineering
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            We Build Apps & Websites Grounded in <span className="text-gradient-warm">Neuromarketing</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            We don’t just design pretty interfaces — we analyze human cognitive load, visual heatmaps, and emotional triggers to engineer digital experiences that convert browsers into high-LTV customers.
          </p>
        </div>

        {/* Interactive Neuromarketing Tabs */}
        <div className="flex justify-center mb-12">
          <div className="p-1.5 rounded-2xl bg-slate-900 border border-white/10 flex gap-2">
            <button
              onClick={() => setActiveTab('neuro')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'neuro'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Brain className="w-4 h-4" /> Cognitive UX Design
            </button>
            <button
              onClick={() => setActiveTab('behavior')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'behavior'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Eye className="w-4 h-4" /> Eye-Tracking & F-Pattern
            </button>
            <button
              onClick={() => setActiveTab('cro')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
                activeTab === 'cro'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Target className="w-4 h-4" /> Micro-Friction CRO
            </button>
          </div>
        </div>

        {/* Tab Content Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text Explanation */}
          <div className="lg:col-span-6 space-y-6">
            {activeTab === 'neuro' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                  <Brain className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white">
                  Reducing Cognitive Load for Instant Decision-Making
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  The human brain makes sub-conscious decisions in under 50 milliseconds. By applying Hick’s Law and Gestalt principles, our UI designs streamline navigation so users effortlessly move towards action without cognitive fatigue.
                </p>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Visual Hierarchy Framing:</strong> Directing eye focus through contrast and whitespace.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Subconscious Reassurance:</strong> Social proof triggers embedded at critical decision nodes.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Dopamine Micro-Feedback:</strong> Haptic feedback & subtle animations on action completion.</span>
                  </li>
                </ul>
              </div>
            )}

            {activeTab === 'behavior' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                  <Eye className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white">
                  Predictive Heatmaps & Eye-Tracking Flow
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  We run AI-driven predictive heatmaps and user recording analysis across every prototype to ensure key call-to-actions lie directly in the user’s natural reading vector.
                </p>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>F & Z Reading Vectors:</strong> Aligning value propositions along biological scanning habits.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Gaze Cueing:</strong> Directional visual cues pointing directly to conversion elements.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Mobile Thumb-Zone Optimization:</strong> Primary buttons placed in zero-reach-effort zones.</span>
                  </li>
                </ul>
              </div>
            )}

            {activeTab === 'cro' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                  <Target className="w-6 h-6" />
                </div>
                <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white">
                  Zero-Friction Checkout & Onboarding Funnels
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Every extra form field drops conversion by up to 14%. We eliminate onboarding friction with single-tap OAuth, smart auto-fill, and progressive disclosure flows.
                </p>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Progressive Disclosure:</strong> Revealing complexity only when needed to prevent dropoff.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Instant Gratification:</strong> Onboarding value delivered before requiring registration.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>A/B Tested Funnels:</strong> +310% average conversion lift measured across client builds.</span>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Right Interactive Mockup / Visual Card */}
          <div className="lg:col-span-6">
            <div className="p-8 rounded-3xl bg-slate-900/90 border border-white/10 backdrop-blur-2xl relative group overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-500/20 to-purple-500/0 rounded-full blur-2xl" />
              
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80" />
                  <span className="text-xs text-slate-400 ml-2 font-mono">neuromarketing_engine.v4</span>
                </div>
                <span className="text-xs text-indigo-400 font-mono bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-500/20 flex items-center gap-1">
                  <Activity className="w-3 h-3 animate-pulse" /> Live Heatmap Analysis
                </span>
              </div>

              {/* Simulated Heatmap UX Card */}
              <div className="space-y-4 relative">
                
                <div className="p-4 rounded-xl bg-slate-950 border border-indigo-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                      <Zap className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 uppercase font-mono">Conversion Node #1</div>
                      <div className="text-sm font-semibold text-white">Hero Call-To-Action Optimization</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-md">
                    +48.2% CTR
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-purple-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                      <Eye className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 uppercase font-mono">Attention Anchor #2</div>
                      <div className="text-sm font-semibold text-white">Neuromarketing Visual Contrast</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-md">
                    89% Eye Lock
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-slate-950 border border-pink-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-pink-600/20 border border-pink-500/30 flex items-center justify-center text-pink-400">
                      <Brain className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-400 uppercase font-mono">Cognitive Friction #3</div>
                      <div className="text-sm font-semibold text-white">Zero-Click App Onboarding</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-md">
                    99.1% Completion
                  </span>
                </div>

              </div>

              {/* Bottom metric ticker */}
              <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-xl font-bold font-mono text-white">45ms</div>
                  <div className="text-[10px] text-slate-400 uppercase">First Visual Impression</div>
                </div>
                <div>
                  <div className="text-xl font-bold font-mono text-emerald-400">3.4x</div>
                  <div className="text-[10px] text-slate-400 uppercase">Higher LTV Rate</div>
                </div>
                <div>
                  <div className="text-xl font-bold font-mono text-indigo-400">0.2s</div>
                  <div className="text-[10px] text-slate-400 uppercase">Interactive Reaction</div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
