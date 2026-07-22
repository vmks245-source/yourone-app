'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Sparkles, ArrowRight, Menu, X, Smartphone, Globe, TrendingUp, Layers } from 'lucide-react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#030712]/85 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl shadow-indigo-950/20' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[1px] shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#030712] rounded-[11px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-indigo-400 group-hover:rotate-12 transition-transform" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-xl tracking-tight text-white flex items-center gap-1.5">
                ONE WORLD <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 font-mono">STUDIO</span>
              </span>
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-medium">Digital Product & Growth</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <Link href="#services" className="hover:text-indigo-400 transition-colors flex items-center gap-1.5">
              Services
            </Link>
            <Link href="#portfolio" className="hover:text-indigo-400 transition-colors">
              Work & Case Studies
            </Link>
            <Link href="#estimator" className="hover:text-indigo-400 transition-colors flex items-center gap-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Project Estimator
            </Link>
            <Link href="#methodology" className="hover:text-indigo-400 transition-colors">
              Neuromarketing
            </Link>
            <Link href="#contact" className="hover:text-indigo-400 transition-colors">
              Contact
            </Link>
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Available Q3/Q4 Projects
            </div>
            <Link 
              href="#estimator" 
              className="relative group overflow-hidden rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-[1px] font-semibold text-sm shadow-lg shadow-indigo-500/25 active:scale-95 transition-all"
            >
              <span className="block px-5 py-2 rounded-full bg-[#030712] group-hover:bg-transparent text-white transition-all duration-300 flex items-center gap-2">
                Start Project <ArrowRight className="w-4 h-4 text-indigo-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileOpen && (
          <div className="md:hidden mt-4 p-6 rounded-2xl bg-slate-950/95 border border-white/10 backdrop-blur-2xl flex flex-col gap-4 animate-in fade-in slide-in-from-top-4">
            <Link 
              href="#services" 
              onClick={() => setMobileOpen(false)}
              className="text-lg font-medium text-slate-200 hover:text-indigo-400 py-2 border-b border-slate-900"
            >
              Services & Capabilities
            </Link>
            <Link 
              href="#portfolio" 
              onClick={() => setMobileOpen(false)}
              className="text-lg font-medium text-slate-200 hover:text-indigo-400 py-2 border-b border-slate-900"
            >
              Featured Case Studies
            </Link>
            <Link 
              href="#estimator" 
              onClick={() => setMobileOpen(false)}
              className="text-lg font-medium text-slate-200 hover:text-indigo-400 py-2 border-b border-slate-900 flex items-center justify-between"
            >
              Project Cost Calculator <span className="text-xs text-emerald-400 font-mono">Instant Quote</span>
            </Link>
            <Link 
              href="#methodology" 
              onClick={() => setMobileOpen(false)}
              className="text-lg font-medium text-slate-200 hover:text-indigo-400 py-2 border-b border-slate-900"
            >
              Neuromarketing UX
            </Link>
            <Link 
              href="#contact" 
              onClick={() => setMobileOpen(false)}
              className="text-lg font-medium text-slate-200 hover:text-indigo-400 py-2"
            >
              Contact Studio
            </Link>
            <Link 
              href="#estimator"
              onClick={() => setMobileOpen(false)}
              className="mt-2 text-center py-3 rounded-xl bg-indigo-600 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30"
            >
              Book Strategy Session
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
