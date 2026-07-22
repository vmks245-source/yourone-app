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
    <div className="group relative rounded-3xl bg-white border border-amber-200/80 hover:border-amber-500/50 transition-all duration-500 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl hover:shadow-amber-900/10 hover:-translate-y-1">
      {/* Top Visual Canvas Header */}
      <div className={`h-56 relative p-6 flex flex-col justify-between overflow-hidden bg-gradient-to-br ${study.gradient}`}>
        <div className="absolute inset-0 bg-mesh-grid opacity-20" />
        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700" />
        
        {/* Top Badges */}
        <div className="relative z-10 flex items-center justify-between">
          <span className="px-3 py-1 rounded-full bg-stone-900/85 backdrop-blur-md text-[11px] font-mono text-amber-200 border border-white/10 uppercase tracking-wider font-medium">
            {study.category}
          </span>
          <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-mono font-bold shadow-md">
            {study.metrics}
          </span>
        </div>

        {/* Client Name & Title */}
        <div className="relative z-10">
          <span className="text-xs uppercase tracking-widest text-amber-100 font-semibold block">{study.client}</span>
          <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-white mt-1 group-hover:text-amber-100 transition-colors">
            {study.title}
          </h3>
        </div>
      </div>

      {/* Body description & Tech Stack */}
      <div className="p-6 space-y-4 flex-1 flex flex-col justify-between bg-white">
        <p className="text-stone-600 text-sm leading-relaxed">
          {study.description}
        </p>

        <div>
          <div className="flex flex-wrap gap-2 pt-2 border-t border-amber-100/60">
            {study.tags.map((tag, i) => (
              <span key={i} className="px-2.5 py-1 rounded-lg bg-amber-50/70 text-stone-700 text-xs border border-amber-200/60 font-mono font-medium">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between text-xs font-bold text-amber-800 group-hover:text-amber-900">
            <span className="flex items-center gap-1">
              View Full Case Study Breakdown
            </span>
            <div className="w-8 h-8 rounded-full bg-amber-100/80 border border-amber-300/60 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-all">
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
