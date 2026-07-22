'use client'

import { ExternalLink, ArrowUpRight, Sparkles } from 'lucide-react'

export interface CaseStudy {
  id: string
  title: string
  client: string
  category: 'App Building' | 'Website Building' | 'Digital Marketing' | 'AI Product'
  metrics: string
  description: string
  tags: string[]
  gradient: string
  imageBg: string
}

export default function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <div className="group relative rounded-3xl bg-slate-900/60 border border-white/10 hover:border-indigo-500/50 transition-all duration-500 overflow-hidden flex flex-col justify-between hover:shadow-2xl hover:shadow-indigo-500/20 hover:-translate-y-1">
      {/* Top Visual Canvas Header */}
      <div className={`h-56 relative p-6 flex flex-col justify-between overflow-hidden bg-gradient-to-br ${study.gradient}`}>
        <div className="absolute inset-0 bg-mesh-grid opacity-30" />
        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />
        
        {/* Top Badges */}
        <div className="relative z-10 flex items-center justify-between">
          <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[11px] font-mono text-indigo-300 border border-white/10 uppercase tracking-wider">
            {study.category}
          </span>
          <span className="px-3 py-1 rounded-full bg-emerald-500/90 text-slate-950 text-xs font-mono font-bold shadow-lg">
            {study.metrics}
          </span>
        </div>

        {/* Client Name & Decorative Elements */}
        <div className="relative z-10">
          <span className="text-xs uppercase tracking-widest text-slate-300 font-semibold block">{study.client}</span>
          <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-white mt-1 group-hover:text-indigo-200 transition-colors">
            {study.title}
          </h3>
        </div>
      </div>

      {/* Body description & Tech Stack */}
      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
        <p className="text-slate-300 text-sm leading-relaxed">
          {study.description}
        </p>

        <div>
          <div className="flex flex-wrap gap-2 pt-2 border-t border-white/5">
            {study.tags.map((tag, i) => (
              <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-950/90 text-slate-400 text-xs border border-white/5 font-mono">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between text-xs font-semibold text-indigo-400 group-hover:text-indigo-300">
            <span className="flex items-center gap-1">
              View Full Case Study Breakdown
            </span>
            <div className="w-8 h-8 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all">
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
