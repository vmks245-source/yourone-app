'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ProjectEstimator from './components/ProjectEstimator'
import NeuromarketingSection from './components/NeuromarketingSection'
import CaseStudyCard, { CaseStudy } from './components/CaseStudyCard'
import { 
  Sparkles, ArrowRight, Smartphone, Globe, TrendingUp, Layers, 
  CheckCircle2, ShieldCheck, Award, Star, Zap, Cpu, Users, 
  MessageSquare, ChevronRight, Play, Check, MapPin, Mail, Phone 
} from 'lucide-react'

// Featured Case Studies Data
const FEATURED_CASE_STUDIES: CaseStudy[] = [
  {
    id: '1',
    title: 'Fintech Mobile Trading & Wealth Platform',
    client: 'Apex Capital',
    category: 'App Building',
    metrics: '+310% Conversion Lift',
    description: 'Engineered a real-time cross-platform React Native app with biometric authentication, sub-10ms stock data feeds, and behavioral UX onboarding.',
    tags: ['React Native', 'Supabase', 'Node.js', 'Biometrics'],
    gradient: 'from-indigo-900 via-slate-900 to-purple-950',
    imageBg: '/images/case1.jpg'
  },
  {
    id: '2',
    title: '3D Interactive E-Commerce Flagship Store',
    client: 'Veloce Luxury',
    category: 'Website Building',
    metrics: '$14.2M Revenue Generated',
    description: 'Built a 60fps WebGL product configurator and Next.js 15 storefront with instant search, bespoke micro-interactions, and 100/100 Core Web Vitals.',
    tags: ['Next.js 15', 'Three.js', 'Shopify API', 'Tailwind'],
    gradient: 'from-[#0f172a] via-purple-950 to-slate-900',
    imageBg: '/images/case2.jpg'
  },
  {
    id: '3',
    title: 'AI Copilot SaaS & Performance Growth Engine',
    client: 'CognitiveScale AI',
    category: 'AI Product',
    metrics: '89,000+ Active Subscribers',
    description: 'Designed and deployed an autonomous AI workspace app integrated with LLM fine-tuning, Stripe usage billing, and an automated SEO landing funnel.',
    tags: ['OpenAI SDK', 'Next.js', 'Stripe Billing', 'Vercel AI'],
    gradient: 'from-slate-900 via-indigo-950 to-cyan-950',
    imageBg: '/images/case3.jpg'
  },
  {
    id: '4',
    title: 'Health & Subscription Meal Platform',
    client: 'Bowl Republic',
    category: 'Digital Marketing',
    metrics: '4.9★ App Store Rating',
    description: 'Executed complete digital marketing overhaul, behavioral funnel optimization, and full-stack React Native app delivery for daily meal subscriptions.',
    tags: ['Neuromarketing', 'Meta Ads', 'React Native', 'Razorpay'],
    gradient: 'from-purple-950 via-slate-900 to-indigo-900',
    imageBg: '/images/case4.jpg'
  }
]

export default function Home() {
  const [contactSubmitted, setContactSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', service: 'App Building', budget: '$5,000 - $15,000', message: '' })

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setContactSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* Navigation Header */}
      <Navbar />

      {/* ── HERO SECTION ─────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden bg-mesh-grid">
        {/* Glow Spheres */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/15 to-pink-500/10 blur-[150px] pointer-events-none rounded-full" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-4xl mx-auto space-y-8">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs sm:text-sm font-semibold tracking-wide shadow-lg shadow-indigo-500/10 animate-fade-in">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Award-Winning App Building, Website Engineering & Neuromarketing</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
              We Engineer Digital Products, <span className="text-gradient">Award-Winning Websites</span>, & Growth Systems.
            </h1>

            {/* Subtitle */}
            <p className="text-slate-300 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed font-normal">
              One World Studio combines high-velocity mobile app development, bespoke web systems, and behavioral science to turn ambitious ideas into high-revenue digital platforms.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                href="#estimator"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold text-base shadow-xl shadow-indigo-500/30 hover:opacity-95 transition-all flex items-center justify-center gap-3 group"
              >
                Estimate Project Scope <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="#portfolio"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-slate-900/80 border border-white/10 hover:border-white/25 text-slate-200 font-semibold text-base backdrop-blur-xl transition-all flex items-center justify-center gap-2"
              >
                Explore Case Studies
              </Link>
            </div>

            {/* Live Stats Bar */}
            <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <div className="p-4 rounded-2xl bg-slate-900/40 border border-white/5 backdrop-blur-md">
                <div className="font-heading text-3xl font-extrabold text-white font-mono">250+</div>
                <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Apps & Web Systems Shipped</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/40 border border-white/5 backdrop-blur-md">
                <div className="font-heading text-3xl font-extrabold text-emerald-400 font-mono">$45M+</div>
                <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Client Revenue Generated</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/40 border border-white/5 backdrop-blur-md">
                <div className="font-heading text-3xl font-extrabold text-indigo-400 font-mono">99.4%</div>
                <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Client Satisfaction Rate</div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/40 border border-white/5 backdrop-blur-md">
                <div className="font-heading text-3xl font-extrabold text-amber-400 font-mono">18+</div>
                <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">UX & Product Awards</div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ── CLIENT & TECH LOGO TICKER ───────────────────────────────────── */}
      <section className="py-8 border-y border-white/5 bg-slate-950/60 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-4 text-center">
          <span className="text-xs text-slate-500 font-mono uppercase tracking-widest">
            Powered by Enterprise Tech Stack & Trusted by Global Brands
          </span>
        </div>
        <div className="flex overflow-hidden">
          <div className="animate-marquee flex items-center gap-12 text-slate-400 text-sm font-semibold font-mono whitespace-nowrap">
            <span className="flex items-center gap-2 text-slate-300"><Smartphone className="w-4 h-4 text-indigo-400" /> REACT NATIVE</span>
            <span>•</span>
            <span className="flex items-center gap-2 text-slate-300"><Globe className="w-4 h-4 text-indigo-400" /> NEXT.JS 15</span>
            <span>•</span>
            <span className="flex items-center gap-2 text-slate-300"><Cpu className="w-4 h-4 text-indigo-400" /> OPENAI AGENTS</span>
            <span>•</span>
            <span className="flex items-center gap-2 text-slate-300"><Layers className="w-4 h-4 text-indigo-400" /> SUPABASE</span>
            <span>•</span>
            <span className="flex items-center gap-2 text-slate-300"><Zap className="w-4 h-4 text-indigo-400" /> TAILWIND CSS</span>
            <span>•</span>
            <span className="flex items-center gap-2 text-slate-300"><ShieldCheck className="w-4 h-4 text-indigo-400" /> VERCEL ENTERPRISE</span>
            <span>•</span>
            <span className="flex items-center gap-2 text-slate-300"><Smartphone className="w-4 h-4 text-indigo-400" /> FLUTTER</span>
            <span>•</span>
            <span className="flex items-center gap-2 text-slate-300"><Globe className="w-4 h-4 text-indigo-400" /> THREE.JS / WEBGL</span>
            <span>•</span>
          </div>
        </div>
      </section>

      {/* ── CORE CAPABILITIES / SERVICES ──────────────────────────────── */}
      <section id="services" className="py-24 relative bg-[#030712]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-semibold uppercase tracking-wider">
              <Layers className="w-4 h-4" /> Full-Stack Capability Suite
            </div>
            <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              End-to-End Solutions for <span className="text-gradient">Web, App & Growth</span>
            </h2>
            <p className="text-slate-400 text-base sm:text-lg">
              Whether launching a mobile application, building an enterprise site, or scaling ad performance, we deliver precision engineering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Service 1: App Building */}
            <div className="glass-panel glass-panel-hover p-8 rounded-3xl space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-indigo-600/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <Smartphone className="w-7 h-7" />
                </div>
                <div className="text-xs font-mono text-indigo-400 uppercase tracking-widest">01. Mobile & Web Apps</div>
                <h3 className="font-heading text-2xl font-bold text-white">App Building & Engineering</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Native & cross-platform iOS and Android mobile apps engineered with React Native and Flutter. Includes biometrics, offline sync, push notifications, and cloud APIs.
                </p>
              </div>

              <ul className="space-y-2.5 pt-4 border-t border-white/5 text-xs text-slate-300 font-medium">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> React Native & Flutter Mobile Apps</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Realtime Supabase / Node.js Backends</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> AI Agent & Chatbot Integration</li>
              </ul>
            </div>

            {/* Service 2: Website Building */}
            <div className="glass-panel glass-panel-hover p-8 rounded-3xl space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-purple-600/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Globe className="w-7 h-7" />
                </div>
                <div className="text-xs font-mono text-purple-400 uppercase tracking-widest">02. Web Systems</div>
                <h3 className="font-heading text-2xl font-bold text-white">Bespoke Website Building</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Ultra-fast Next.js 15 websites, Webflow enterprise platforms, and 3D WebGL interactive experiences designed for maximum conversion and brand prestige.
                </p>
              </div>

              <ul className="space-y-2.5 pt-4 border-t border-white/5 text-xs text-slate-300 font-medium">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Next.js 15 & 60fps Scrollytelling</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Headless E-Commerce & Sanity CMS</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> 100/100 Lighthouse & Speed Audit</li>
              </ul>
            </div>

            {/* Service 3: Digital Marketing */}
            <div className="glass-panel glass-panel-hover p-8 rounded-3xl space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-pink-600/10 border border-pink-500/30 flex items-center justify-center text-pink-400">
                  <TrendingUp className="w-7 h-7" />
                </div>
                <div className="text-xs font-mono text-pink-400 uppercase tracking-widest">03. Digital Growth</div>
                <h3 className="font-heading text-2xl font-bold text-white">Digital Marketing & SEO</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Data-driven performance marketing across Meta, Google, and TikTok. Powered by neuromarketing cognitive audits, landing page CRO, and organic SEO.
                </p>
              </div>

              <ul className="space-y-2.5 pt-4 border-t border-white/5 text-xs text-slate-300 font-medium">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Neuromarketing Conversion Audits</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Meta & Google Paid Ads Scaling</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" /> Technical SEO & Keyword Domination</li>
              </ul>
            </div>

          </div>

        </div>
      </section>

      {/* ── NEUROMARKETING & BEHAVIORAL SCIENCE SECTION ────────────────── */}
      <NeuromarketingSection />

      {/* ── FEATURED CASE STUDIES / PORTFOLIO GRID ──────────────────────── */}
      <section id="portfolio" className="py-24 relative bg-slate-950 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider mb-4">
                <Award className="w-4 h-4" /> Proven Track Record
              </div>
              <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Featured Work & <span className="text-gradient">Case Studies</span>
              </h2>
            </div>
            <p className="text-slate-400 text-sm max-w-md">
              A showcase of recent mobile applications, digital platforms, and high-converting marketing campaigns built by One World Studio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {FEATURED_CASE_STUDIES.map(study => (
              <CaseStudyCard key={study.id} study={study} />
            ))}
          </div>

        </div>
      </section>

      {/* ── INTERACTIVE PROJECT ESTIMATOR ───────────────────────────────── */}
      <ProjectEstimator />

      {/* ── AGENCY DEVELOPMENT METHODOLOGY ──────────────────────────────── */}
      <section className="py-24 relative bg-[#030712]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white">
              The 4-Step <span className="text-gradient">High-Velocity Sprint Framework</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              How we take your idea from concept to production-ready launch in weeks, not months.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 space-y-4">
              <div className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full w-fit">
                PHASE 01
              </div>
              <h4 className="font-heading text-xl font-bold text-white">Discovery & Neuromarketing</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                User psychology mapping, target persona research, feature scoping, and competitive positioning.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 space-y-4">
              <div className="text-xs font-mono font-bold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full w-fit">
                PHASE 02
              </div>
              <h4 className="font-heading text-xl font-bold text-white">UI/UX & Prototyping</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Figma design systems, interactive clickable prototypes, micro-interactions, and visual design signoff.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 space-y-4">
              <div className="text-xs font-mono font-bold text-pink-400 bg-pink-500/10 border border-pink-500/20 px-3 py-1 rounded-full w-fit">
                PHASE 03
              </div>
              <h4 className="font-heading text-xl font-bold text-white">Production Engineering</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Clean Next.js / React Native code, API integrations, cloud DB architecture, and automated CI/CD pipelines.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/10 space-y-4">
              <div className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full w-fit">
                PHASE 04
              </div>
              <h4 className="font-heading text-xl font-bold text-white">Launch & Growth Scale</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                App Store / Play Store deployment, Vercel edge launch, performance marketing execution & CRO scaling.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ── CLIENT TESTIMONIALS & CLUTCH BADGES ──────────────────────────── */}
      <section className="py-20 bg-slate-950 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="flex items-center justify-center gap-1 text-amber-400 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400" />
              ))}
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
              Rated 4.9/5 Across Verified Client Reviews
            </h3>
            <p className="text-xs text-slate-400 mt-2 font-mono">
              Clutch • GoodFirms • Google Reviews • ProductHunt
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/5 space-y-4">
              <p className="text-xs text-slate-300 leading-relaxed italic">
                "One World Studio transformed our mobile experience completely. The React Native app performs seamlessly and our user conversion jumped by 310% within the first month of launch."
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                <div className="w-9 h-9 rounded-full bg-indigo-600/30 text-indigo-300 font-bold flex items-center justify-center text-xs">
                  JS
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Jonathan S.</div>
                  <div className="text-[10px] text-slate-400">VP Product, Apex Capital</div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/5 space-y-4">
              <p className="text-xs text-slate-300 leading-relaxed italic">
                "Their Neuromarketing UX approach is genuine magic. The 3D website they built on Next.js 15 generated $14M+ in revenue for our luxury brand."
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                <div className="w-9 h-9 rounded-full bg-purple-600/30 text-purple-300 font-bold flex items-center justify-center text-xs">
                  VL
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Victoria L.</div>
                  <div className="text-[10px] text-slate-400">Founder, Veloce Luxury</div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-900/60 border border-white/5 space-y-4">
              <p className="text-xs text-slate-300 leading-relaxed italic">
                "Speed, communication, and engineering quality were unmatched. They delivered our entire AI SaaS platform and mobile app sprint ahead of deadline."
              </p>
              <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                <div className="w-9 h-9 rounded-full bg-emerald-600/30 text-emerald-300 font-bold flex items-center justify-center text-xs">
                  MK
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Manikanta K.</div>
                  <div className="text-[10px] text-slate-400">Founder, Bowl Republic & Filmos</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── DIRECT CONTACT & STRATEGY INQUIRY SECTION ───────────────────── */}
      <section id="contact" className="py-24 relative bg-[#030712] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Contact Info */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono font-semibold uppercase tracking-wider">
                <MessageSquare className="w-4 h-4" /> Start Your Project
              </div>
              <h2 className="font-heading text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Let's Build Something <span className="text-gradient">Extraordinary Together</span>
              </h2>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Have a mobile app concept, website project, or digital marketing goal? Talk directly with our lead strategist to get a scope proposal within 2 hours.
              </p>

              <div className="space-y-4 pt-4 text-sm text-slate-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-indigo-400 shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 uppercase font-mono">Email Us</div>
                    <a href="mailto:hello@yourone.world" className="font-semibold text-white hover:text-indigo-400 transition-colors">hello@yourone.world</a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-indigo-400 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-slate-500 uppercase font-mono">Call Studio</div>
                    <span className="font-semibold text-white">+1 (802) 347-3690 / +91 99202 82736</span>
                  </div>
                </div>
              </div>

              {/* Guarantees */}
              <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 flex items-center gap-3 text-xs text-indigo-200">
                <ShieldCheck className="w-6 h-6 text-indigo-400 shrink-0" />
                <span>NDA signed upfront. Full source code & IP ownership guaranteed on delivery.</span>
              </div>
            </div>

            {/* Right Contact Form */}
            <div className="lg:col-span-6">
              <div className="p-8 rounded-3xl bg-slate-900/90 border border-white/10 backdrop-blur-2xl shadow-2xl">
                {contactSubmitted ? (
                  <div className="py-12 text-center space-y-4">
                    <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />
                    <h3 className="font-heading text-2xl font-bold text-white">Inquiry Received!</h3>
                    <p className="text-sm text-slate-300 max-w-md mx-auto">
                      Thank you <strong className="text-white">{formData.name}</strong>! We've received your request for <strong>{formData.service}</strong>. Our studio lead will contact you at <strong>{formData.email}</strong> shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <h3 className="font-heading text-xl font-bold text-white mb-2">Book Free Technical Consultation</h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-slate-400 mb-1 block">Your Name</label>
                        <input
                          type="text"
                          required
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-slate-400 mb-1 block">Work Email</label>
                        <input
                          type="email"
                          required
                          placeholder="john@company.com"
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-slate-400 mb-1 block">Primary Need</label>
                        <select
                          value={formData.service}
                          onChange={e => setFormData({ ...formData, service: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500"
                        >
                          <option>App Building (Mobile / Web App)</option>
                          <option>Website Building (Next.js / 3D)</option>
                          <option>Digital Marketing & SEO</option>
                          <option>Neuromarketing UI/UX Audit</option>
                          <option>Full Product Suite</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-slate-400 mb-1 block">Estimated Budget</label>
                        <select
                          value={formData.budget}
                          onChange={e => setFormData({ ...formData, budget: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500"
                        >
                          <option>$3,000 - $8,000</option>
                          <option>$8,000 - $15,000</option>
                          <option>$15,000 - $30,000</option>
                          <option>$30,000+</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-slate-400 mb-1 block">Project Brief / Details</label>
                      <textarea
                        rows={3}
                        placeholder="Tell us about your project timeline, features, or goals..."
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-indigo-500 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 font-semibold text-white text-sm shadow-xl shadow-indigo-500/30 hover:opacity-95 transition-opacity"
                    >
                      Send Project Inquiry
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Footer */}
      <Footer />

    </div>
  )
}
