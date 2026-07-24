'use client'

import { useState, useRef, useEffect } from 'react'
import { 
  Sparkles, MessageSquare, X, Send, Bot, User, ArrowRight, 
  Phone, Mail, MapPin, ShieldCheck, Clock, Layers, Smartphone, 
  Globe, TrendingUp, RefreshCw, CheckCircle2, ChevronRight 
} from 'lucide-react'

interface Message {
  id: string
  sender: 'ai' | 'user'
  text: string
  timestamp: string
  actions?: { label: string; href?: string; actionType?: string }[]
}

// ── KNOWLEDGE BASE & INTENT ENGINE (Zero-Subscription Open Engine) ──────────
interface KnowledgeEntry {
  keywords: string[]
  response: string
  actions?: { label: string; href?: string; actionType?: string }[]
}

const STUDIO_KNOWLEDGE_BASE: KnowledgeEntry[] = [
  {
    keywords: ['app', 'mobile', 'ios', 'android', 'react native', 'flutter', 'application'],
    response: "We engineer native and cross-platform mobile apps for iOS & Android using React Native and Flutter. Our app builds include offline sync, real-time push notifications, biometrics, cloud APIs, and AI integrations.",
    actions: [
      { label: 'Estimate App Scope', href: '#estimator' },
      { label: 'View App Case Study', href: '#portfolio' }
    ]
  },
  {
    keywords: ['website', 'web', 'next.js', 'nextjs', 'webflow', '3d', 'webgl', 'site', 'frontend'],
    response: "Our website engineering team builds ultra-fast Next.js 15 platforms, 60fps WebGL 3D interactive experiences, and custom Webflow sites optimized for 100/100 Core Web Vitals and high conversion.",
    actions: [
      { label: 'Calculate Web Scope', href: '#estimator' },
      { label: 'Explore Web Work', href: '#portfolio' }
    ]
  },
  {
    keywords: ['marketing', 'seo', 'growth', 'ads', 'meta', 'google', 'traffic', 'cro', 'neuromarketing'],
    response: "Our growth team specializes in Neuromarketing visual audits, data-driven Meta & Google ad campaigns, technical SEO ranking, and landing page conversion rate optimization (CRO).",
    actions: [
      { label: 'Neuromarketing Audit', href: '#methodology' },
      { label: 'Get Growth Strategy', href: '#contact' }
    ]
  },
  {
    keywords: ['time', 'timeline', 'fast', 'duration', 'weeks', 'how long', 'sprint', 'schedule'],
    response: "We offer two delivery pacing options: Standard Sprint (4-8 weeks) and Express Fast-Track (2-4 weeks). We deliver production-ready code in rapid weekly demo sprints.",
    actions: [
      { label: 'Select Sprint Pacing', href: '#estimator' }
    ]
  },
  {
    keywords: ['price', 'cost', 'budget', 'rate', 'quote', 'fee', 'charge', 'pricing', 'estimate'],
    response: "We calculate project scope transparently based on exact engineering deliverables and sprint timelines—without hidden fees or lock-ins! You can select your required modules directly in our interactive scope estimator.",
    actions: [
      { label: 'Open Scope Estimator', href: '#estimator' },
      { label: 'Book Consultation', href: '#contact' }
    ]
  },
  {
    keywords: ['location', 'address', 'office', 'where', 'hyderabad', 'city', 'hitech'],
    response: "Our main engineering studio is located at Cyber Towers, HITECH City, Madhapur, Hyderabad, Telangana 500081, India.",
    actions: [
      { label: 'View Contact Info', href: '#contact' }
    ]
  },
  {
    keywords: ['phone', 'call', 'mobile', 'contact', 'number', 'reach', 'email', 'talk', 'connect'],
    response: "You can reach our lead strategist directly by phone at +91 74166 83770 or +91 95056 32090, or email us at hello@yourone.world.",
    actions: [
      { label: 'Call +91 74166 83770', href: 'tel:+917416683770' },
      { label: 'Call +91 95056 32090', href: 'tel:+919505632090' }
    ]
  },
  {
    keywords: ['nda', 'ip', 'code', 'ownership', 'source', 'guarantee', 'security', 'privacy'],
    response: "100% of source code & intellectual property (IP) is transferred to you upon delivery. We sign a strict NDA upfront before initial discovery calls.",
    actions: [
      { label: 'Request NDA & Call', href: '#contact' }
    ]
  },
  {
    keywords: ['bowl republic', 'case study', 'portfolio', 'work', 'example', 'client'],
    response: "Recent featured projects include Apex Capital (Fintech Trading App, +310% conversion), Veloce Luxury (3D WebGL Storefront, $14M+ sales), CognitiveScale (AI SaaS Copilot), and Bowl Republic (Subscription Meal App).",
    actions: [
      { label: 'View Case Studies', href: '#portfolio' }
    ]
  },
  {
    keywords: ['technology', 'tech stack', 'react', 'tailwind', 'supabase', 'node', 'python', 'ai'],
    response: "Our core enterprise stack includes Next.js 15, React Native, Flutter, Supabase, Node.js, Three.js / WebGL, Tailwind CSS, and custom OpenAI / LLM agent integrations.",
    actions: [
      { label: 'Explore Services', href: '#services' }
    ]
  }
]

export default function StudioAICopilot() {
  const [isOpen, setIsOpen] = useState(false)
  const [unread, setUnread] = useState(true)
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'ai',
      text: "Hello! I am One World Studio's AI Assistant. How can I help you today? Ask me about App Building, Next.js Websites, Timelines, or Project Scoping!",
      timestamp: 'Just now',
      actions: [
        { label: 'Estimate Project Scope', href: '#estimator' },
        { label: 'View Mobile App Tech', href: '#services' },
        { label: 'Call Studio', href: 'tel:+917416683770' }
      ]
    }
  ])

  const chatEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen) {
      setUnread(false)
      scrollToBottom()
    }
  }, [isOpen, messages])

  // NLP Semantic Score Engine (Runs 100% locally with 0 external API calls)
  const generateResponse = (userText: string): { response: string; actions?: Message['actions'] } => {
    const textLower = userText.toLowerCase().trim()

    let bestMatch: KnowledgeEntry | null = null
    let maxScore = 0

    for (const entry of STUDIO_KNOWLEDGE_BASE) {
      let score = 0
      for (const kw of entry.keywords) {
        if (textLower.includes(kw)) {
          score += kw.length > 4 ? 3 : 2
        }
      }
      if (score > maxScore) {
        maxScore = score
        bestMatch = entry
      }
    }

    if (bestMatch && maxScore > 0) {
      return {
        response: bestMatch.response,
        actions: bestMatch.actions
      }
    }

    // Friendly default contextual fallbacks
    if (textLower.includes('hello') || textLower.includes('hi') || textLower.includes('hey')) {
      return {
        response: "Welcome to One World Studio! We build high-converting mobile apps, bespoke Next.js websites, and growth marketing systems. What kind of project are you planning?",
        actions: [
          { label: 'Mobile App', href: '#services' },
          { label: 'Next.js Website', href: '#services' },
          { label: 'Project Estimator', href: '#estimator' }
        ]
      }
    }

    return {
      response: "Thank you for asking! We specialize in Mobile App Engineering, Bespoke Website Building, Neuromarketing, and Performance Marketing out of our Hyderabad studio. Would you like to estimate your project scope or speak directly with our tech lead?",
      actions: [
        { label: 'Calculate Scope', href: '#estimator' },
        { label: 'Contact Us', href: '#contact' },
        { label: 'Call +91 74166 83770', href: 'tel:+917416683770' }
      ]
    }
  }

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim()
    if (!query) return

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    setMessages(prev => [...prev, userMsg])
    if (!textToSend) setInput('')
    setIsTyping(true)

    // Simulate natural AI response delay
    setTimeout(() => {
      const aiReply = generateResponse(query)
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiReply.response,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: aiReply.actions
      }
      setMessages(prev => [...prev, aiMsg])
      setIsTyping(false)
    }, 600)
  }

  return (
    <>
      {/* ── FLOATING LAUNCHER BUTTON ───────────────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {!isOpen && unread && (
          <div className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-full bg-white border border-amber-300 text-stone-900 text-xs font-semibold shadow-lg animate-bounce">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Ask Studio AI Copilot ✦</span>
          </div>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 rounded-full bg-gradient-to-r from-amber-600 via-orange-600 to-indigo-600 text-white shadow-xl shadow-amber-600/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center group"
          aria-label="Toggle AI Assistant Chat"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <div className="relative">
              <Sparkles className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
              {unread && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white"></span>
              )}
            </div>
          )}
        </button>
      </div>

      {/* ── AI CHAT DRAWER PANEL ────────────────────────────────────────── */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[92vw] sm:w-[420px] max-h-[600px] h-[80vh] rounded-3xl bg-[#fcf9f2] border border-amber-300/80 shadow-2xl backdrop-blur-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-6">
          
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-stone-900 via-amber-950 to-stone-900 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-indigo-600 p-[1px]">
                <div className="w-full h-full bg-stone-900 rounded-[11px] flex items-center justify-center">
                  <Bot className="w-5 h-5 text-amber-400" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-stone-900"></span>
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-white flex items-center gap-1.5">
                  Studio AI Copilot <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/40 font-mono">100% Local AI</span>
                </h4>
                <p className="text-[11px] text-stone-300 font-sans">Instant Project & Tech Guidance</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Category Chips */}
          <div className="px-4 py-2 bg-[#faf5ea] border-b border-amber-200/70 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <button
              onClick={() => handleSend('Tell me about Mobile App Building')}
              className="px-3 py-1 rounded-full bg-white border border-amber-200 text-stone-800 text-[11px] font-semibold hover:bg-amber-100/70 transition-colors shrink-0 flex items-center gap-1"
            >
              <Smartphone className="w-3 h-3 text-amber-700" /> Mobile Apps
            </button>
            <button
              onClick={() => handleSend('Tell me about Website Building')}
              className="px-3 py-1 rounded-full bg-white border border-amber-200 text-stone-800 text-[11px] font-semibold hover:bg-amber-100/70 transition-colors shrink-0 flex items-center gap-1"
            >
              <Globe className="w-3 h-3 text-amber-700" /> Web Systems
            </button>
            <button
              onClick={() => handleSend('How fast can you deliver?')}
              className="px-3 py-1 rounded-full bg-white border border-amber-200 text-stone-800 text-[11px] font-semibold hover:bg-amber-100/70 transition-colors shrink-0 flex items-center gap-1"
            >
              <Clock className="w-3 h-3 text-amber-700" /> Timelines
            </button>
            <button
              onClick={() => handleSend('What is your contact and office location?')}
              className="px-3 py-1 rounded-full bg-white border border-amber-200 text-stone-800 text-[11px] font-semibold hover:bg-amber-100/70 transition-colors shrink-0 flex items-center gap-1"
            >
              <MapPin className="w-3 h-3 text-amber-700" /> Contact
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div className={`max-w-[82%] space-y-2 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-br-none'
                        : 'bg-white border border-amber-200/80 text-stone-900 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Interactive Action Buttons */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.actions.map((act, i) => (
                        <a
                          key={i}
                          href={act.href}
                          onClick={() => {
                            if (act.href?.startsWith('#')) setIsOpen(false)
                          }}
                          className="px-3 py-1.5 rounded-xl bg-amber-100/80 hover:bg-amber-200/80 border border-amber-300/70 text-amber-950 font-semibold text-xs transition-colors inline-flex items-center gap-1"
                        >
                          {act.label} <ChevronRight className="w-3 h-3 text-amber-700" />
                        </a>
                      ))}
                    </div>
                  )}

                  <span className="text-[10px] text-stone-400 block px-1">
                    {msg.timestamp}
                  </span>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-stone-900 text-white flex items-center justify-center shrink-0 text-xs font-bold mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 justify-start items-center">
                <div className="w-8 h-8 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-amber-800 shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="p-3 rounded-2xl bg-white border border-amber-200 text-stone-500 text-xs flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse delay-150"></span>
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse delay-300"></span>
                  <span className="ml-1 text-[11px] font-mono">Analyzing request...</span>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input Bar */}
          <form
            onSubmit={e => {
              e.preventDefault()
              handleSend()
            }}
            className="p-3 bg-white border-t border-amber-200/80 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask AI Copilot about Apps, Web, Scoping..."
              value={input}
              onChange={e => setInput(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#faf5ea]/70 border border-amber-200 text-stone-900 placeholder-stone-400 text-xs sm:text-sm focus:outline-none focus:border-amber-500 focus:bg-white transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2.5 rounded-xl bg-gradient-to-r from-amber-600 to-indigo-600 text-white disabled:opacity-40 hover:opacity-95 transition-opacity shadow-md shadow-amber-600/20"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </>
  )
}
