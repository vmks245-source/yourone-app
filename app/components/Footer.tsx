'use client'

import Link from 'next/link'
import { Sparkles, MapPin, Mail, Phone, ArrowUpRight, ShieldCheck, Award, Globe, Share2 } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative bg-slate-900 border-t border-slate-800 text-slate-300 pt-20 pb-12 overflow-hidden">
      {/* Glow Ambient background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-t from-indigo-900/20 via-purple-900/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-pink-500 p-[1px]">
                <div className="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-indigo-400" />
                </div>
              </div>
              <span className="font-heading font-extrabold text-xl tracking-tight text-white">
                ONE WORLD <span className="text-indigo-400">STUDIO</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              We engineer world-class mobile applications, high-converting bespoke websites, and data-driven digital growth strategies using behavioral neuroscience and AI.
            </p>

            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-xs text-slate-200">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> 99.4% Client Retention
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700 text-xs text-slate-200">
                <Award className="w-4 h-4 text-amber-400" /> 18+ Design Awards
              </div>
            </div>

            <div className="flex items-center gap-3 text-slate-400 pt-2">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 hover:text-white hover:border-indigo-400 transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 hover:text-white hover:border-indigo-400 transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 hover:text-white hover:border-indigo-400 transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"/></svg>
              </a>
            </div>
          </div>

          {/* Capability Col */}
          <div className="space-y-4">
            <h4 className="text-white font-heading font-semibold text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><Link href="#services" className="hover:text-indigo-400 transition-colors">Mobile App Engineering</Link></li>
              <li><Link href="#services" className="hover:text-indigo-400 transition-colors">Next.js & Webflow Websites</Link></li>
              <li><Link href="#services" className="hover:text-indigo-400 transition-colors">Digital Marketing & SEO</Link></li>
              <li><Link href="#services" className="hover:text-indigo-400 transition-colors">Neuromarketing UI/UX</Link></li>
              <li><Link href="#services" className="hover:text-indigo-400 transition-colors">AI System Integration</Link></li>
              <li><Link href="#services" className="hover:text-indigo-400 transition-colors">E-Commerce & SaaS Platforms</Link></li>
            </ul>
          </div>

          {/* Global Locations Col */}
          <div className="space-y-4">
            <h4 className="text-white font-heading font-semibold text-sm uppercase tracking-wider">Studio Locations</h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200 block text-xs">Hyderabad, Telangana, India</strong>
                  Cyber Towers, HITECH City, Madhapur, Hyderabad 500081
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200 block text-xs">United States</strong>
                  1619 Delaware Ave, Wilmington, DE 19806
                </div>
              </div>
            </div>
          </div>

          {/* Contact Direct Col */}
          <div className="space-y-4">
            <h4 className="text-white font-heading font-semibold text-sm uppercase tracking-wider">Direct Inquiries</h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <a href="mailto:hello@yourone.world" className="hover:text-indigo-400 transition-colors">hello@yourone.world</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                <a href="tel:+18023473690" className="hover:text-indigo-400 transition-colors">+1 (802) 347-3690 (US)</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                <a href="tel:+919920282736" className="hover:text-indigo-400 transition-colors">+91 99202 82736 (IN)</a>
              </div>
            </div>

            <div className="pt-2">
              <Link 
                href="#estimator" 
                className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 group"
              >
                Project Cost Estimator <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} One World Studio. All rights reserved. Operating under yourone.world domain.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-200 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-slate-200 transition-colors">Terms of Service</Link>
            <Link href="/refund" className="hover:text-slate-200 transition-colors">Client SLA & Guarantees</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
