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
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Highest Client Satisfaction
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-slate-400 pt-2 flex-wrap">
              {/* Facebook */}
              <a href="https://facebook.com/oneworldstudio.world" target="_blank" rel="noopener noreferrer" title="Facebook" className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 hover:text-white hover:border-indigo-400 transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              {/* X */}
              <a href="https://x.com/oneworldstudio_" target="_blank" rel="noopener noreferrer" title="X (Twitter)" className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 hover:text-white hover:border-indigo-400 transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              {/* Instagram */}
              <a href="https://instagram.com/oneworldstudio.world" target="_blank" rel="noopener noreferrer" title="Instagram" className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 hover:text-white hover:border-indigo-400 transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              {/* LinkedIn */}
              <a href="https://linkedin.com/company/oneworldstudio" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 hover:text-white hover:border-indigo-400 transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg>
              </a>
              {/* Threads */}
              <a href="https://threads.net/@oneworldstudio.world" target="_blank" rel="noopener noreferrer" title="Threads" className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 hover:text-white hover:border-indigo-400 transition-all">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12.186 24c-3.155 0-5.748-.98-7.708-2.916C2.52 19.148 1.5 16.037 1.5 11.963 1.5 7.89 2.52 4.78 4.478 2.844 6.438.908 9.03 0 12.186 0c3.125 0 5.706.908 7.67 2.724 1.965 1.815 2.986 4.708 3.038 8.602h-3.41c-.046-2.92-.72-5.006-2.023-6.26-1.303-1.254-3.08-1.88-5.333-1.88-2.253 0-4.043.633-5.37 1.898-1.327 1.265-1.99 3.344-1.99 6.236 0 2.89.663 4.977 1.99 6.26 1.327 1.282 3.117 1.924 5.37 1.924 2.115 0 3.82-.544 5.068-1.63 1.25-1.088 1.933-2.637 2.05-4.647h3.407c-.12 3.018-1.127 5.433-3.02 7.247C17.933 23.082 15.342 24 12.186 24z"/></svg>
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

          {/* Location Col */}
          <div className="space-y-4">
            <h4 className="text-white font-heading font-semibold text-sm uppercase tracking-wider">Studio Location</h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-200 block text-xs">Hyderabad, Telangana, India</strong>
                  Cyber Towers, HITECH City, Madhapur, Hyderabad 500081
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
                <a href="tel:+917416683770" className="hover:text-indigo-400 transition-colors">+91 74166 83770</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-indigo-400 shrink-0" />
                <a href="tel:+919505632090" className="hover:text-indigo-400 transition-colors">+91 95056 32090</a>
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
