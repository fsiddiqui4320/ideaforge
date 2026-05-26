'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'

interface Idea {
  id: string
  name: string
  oneLiner: string
  targetUser: string
  monetization: string
  prompt: string
}

function SparkleIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6.5 0.5L7.9 5.1L12.5 6.5L7.9 7.9L6.5 12.5L5.1 7.9L0.5 6.5L5.1 5.1L6.5 0.5Z"
        fill="currentColor"
      />
    </svg>
  )
}

function CopyIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="8.5" height="8.5" rx="1" stroke="currentColor" strokeWidth="1.2" />
      <path d="M2.5 9H2a1 1 0 01-1-1V2a1 1 0 011-1h6a1 1 0 011 1v.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 6.5L5 9.5L11 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.5 6H9.5M9.5 6L6.5 3M9.5 6L6.5 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function LoadingSkeleton() {
  return (
    <div
      className="rounded-[4px] p-8"
      style={{ border: '1px solid rgba(255,255,255,0.07)', background: 'rgba(255,255,255,0.02)' }}
    >
      <div className="mb-6">
        <div className="h-6 rounded-[3px] w-2/5 mb-3 animate-shimmer" style={{ background: 'rgba(255,255,255,0.07)' }} />
        <div className="h-4 rounded-[2px] w-full mb-1.5 animate-shimmer" style={{ background: 'rgba(255,255,255,0.04)', animationDelay: '0.1s' }} />
        <div className="h-4 rounded-[2px] w-3/4 animate-shimmer" style={{ background: 'rgba(255,255,255,0.04)', animationDelay: '0.2s' }} />
      </div>
      <div className="h-px w-full mb-6" style={{ background: 'rgba(255,255,255,0.06)' }} />
      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="h-2.5 rounded-[2px] w-1/2 mb-3 animate-shimmer" style={{ background: 'rgba(255,255,255,0.05)' }} />
          <div className="h-4 rounded-[2px] w-full mb-1.5 animate-shimmer" style={{ background: 'rgba(255,255,255,0.04)', animationDelay: '0.15s' }} />
          <div className="h-4 rounded-[2px] w-4/5 animate-shimmer" style={{ background: 'rgba(255,255,255,0.04)', animationDelay: '0.25s' }} />
        </div>
        <div>
          <div className="h-2.5 rounded-[2px] w-1/2 mb-3 animate-shimmer" style={{ background: 'rgba(255,255,255,0.05)', animationDelay: '0.1s' }} />
          <div className="h-4 rounded-[2px] w-full mb-1.5 animate-shimmer" style={{ background: 'rgba(255,255,255,0.04)', animationDelay: '0.2s' }} />
          <div className="h-4 rounded-[2px] w-3/5 animate-shimmer" style={{ background: 'rgba(255,255,255,0.04)', animationDelay: '0.3s' }} />
        </div>
      </div>
    </div>
  )
}

function IdeaCard({ idea }: { idea: Idea }) {
  const [copied, setCopied] = useState(false)

  async function copyLink() {
    await navigator.clipboard.writeText(`${window.location.origin}/idea/${idea.id}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  return (
    <div
      className="rounded-[4px] p-8 animate-fade-slide-up"
      style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.025)' }}
    >
      <div className="mb-6">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h2 className="text-[22px] font-semibold tracking-tight leading-tight" style={{ color: '#fff' }}>
            {idea.name}
          </h2>
          <span
            className="mt-1 flex-shrink-0 text-[10px] font-semibold uppercase tracking-widest px-2 py-1 rounded-[3px]"
            style={{ background: 'rgba(99,102,241,0.15)', color: 'rgba(165,168,255,0.85)' }}
          >
            New
          </span>
        </div>
        <p className="text-[15px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.58)' }}>
          {idea.oneLiner}
        </p>
      </div>

      <div className="h-px w-full mb-6" style={{ background: 'rgba(255,255,255,0.06)' }} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.12em] mb-2" style={{ color: 'rgba(255,255,255,0.28)' }}>
            Target User
          </div>
          <p className="text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.62)' }}>
            {idea.targetUser}
          </p>
        </div>
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.12em] mb-2" style={{ color: 'rgba(255,255,255,0.28)' }}>
            Monetization
          </div>
          <p className="text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.62)' }}>
            {idea.monetization}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={copyLink}
          className="flex items-center gap-2 text-[13px] px-4 py-2 rounded-[4px] transition-all duration-150"
          style={{
            background: copied ? 'rgba(74,222,128,0.1)' : 'rgba(255,255,255,0.05)',
            border: copied ? '1px solid rgba(74,222,128,0.2)' : '1px solid rgba(255,255,255,0.08)',
            color: copied ? 'rgba(74,222,128,0.9)' : 'rgba(255,255,255,0.48)',
          }}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied ? 'Copied!' : 'Copy link'}
        </button>
        <Link
          href={`/idea/${idea.id}`}
          className="flex items-center gap-1.5 text-[13px] px-4 py-2 rounded-[4px] transition-colors duration-150"
          style={{ color: 'rgba(255,255,255,0.32)' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.6)' }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.32)' }}
        >
          View page
          <ArrowIcon />
        </Link>
      </div>
    </div>
  )
}

export default function HomePage() {
  const [prompt, setPrompt] = useState('')
  const [idea, setIdea] = useState<Idea | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  async function generate(overridePrompt?: string) {
    setLoading(true)
    setIdea(null)
    setError(null)
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: overridePrompt ?? prompt }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error ?? 'Generation failed')
      }
      const data = await res.json()
      setIdea(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Make sure OPENAI_API_KEY is set.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen" style={{ background: '#090909', color: '#fff' }}>
      {/* Grid background */}
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)
          `,
          backgroundSize: '72px 72px',
        }}
      />
      {/* Radial glow */}
      <div
        aria-hidden
        className="fixed top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: '700px',
          height: '500px',
          background: 'radial-gradient(ellipse at center top, rgba(99,102,241,0.1) 0%, transparent 65%)',
          filter: 'blur(30px)',
        }}
      />

      {/* Nav */}
      <nav
        className="relative z-10 flex items-center justify-between px-6 sm:px-10 py-5"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-6 h-6 flex items-center justify-center rounded-[3px]"
            style={{ background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.3)' }}
          >
            <SparkleIcon />
          </div>
          <span className="text-[13px] font-semibold tracking-tight" style={{ color: 'rgba(255,255,255,0.85)' }}>
            IdeaForge
          </span>
        </div>
        <span className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.22)' }}>
          GPT-4o mini
        </span>
      </nav>

      {/* Main */}
      <main className="relative z-10 max-w-[620px] mx-auto px-6 sm:px-8 pt-20 pb-32">
        {/* Hero */}
        <div className="mb-14">
          <h1
            className="font-bold tracking-[-0.034em] leading-[1.05] mb-5"
            style={{
              fontSize: 'clamp(42px, 7vw, 70px)',
              background: 'linear-gradient(155deg, #ffffff 35%, rgba(255,255,255,0.48) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Your next SaaS<br />idea, generated.
          </h1>
          <p className="text-[15px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)', maxWidth: '400px' }}>
            Describe a niche or pain point. Get a focused, monetizable SaaS concept in under 3 seconds.
          </p>
        </div>

        {/* Input */}
        <div className="mb-4">
          <input
            ref={inputRef}
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && !loading) generate() }}
            placeholder='e.g. "invoicing pain for freelancers"'
            className="w-full text-[14px] outline-none"
            style={{
              background: 'rgba(255,255,255,0.038)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '4px',
              padding: '13px 17px',
              color: '#fff',
              transition: 'border-color 0.15s ease',
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)' }}
          />
          <style>{`
            input[type="text"]::placeholder { color: rgba(255,255,255,0.2); }
          `}</style>
        </div>

        {/* Buttons */}
        <div className="flex gap-2.5 mb-14">
          <button
            onClick={() => generate()}
            disabled={loading}
            className="flex items-center gap-2 text-[13px] font-medium px-5 py-2.5 rounded-[4px] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: '#6366f1', color: '#fff' }}
            onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = '#818cf8' }}
            onMouseLeave={(e) => { if (!loading) e.currentTarget.style.background = '#6366f1' }}
          >
            {loading ? (
              <>
                <svg className="animate-spin" width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="6.5" cy="6.5" r="5.5" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                  <path d="M6.5 1A5.5 5.5 0 0112 6.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                Generating...
              </>
            ) : (
              <>
                <SparkleIcon />
                Generate Idea
              </>
            )}
          </button>
          <button
            onClick={() => generate('')}
            disabled={loading}
            className="text-[13px] font-medium px-5 py-2.5 rounded-[4px] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.48)',
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
                e.currentTarget.style.color = 'rgba(255,255,255,0.72)'
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                e.currentTarget.style.color = 'rgba(255,255,255,0.48)'
              }
            }}
          >
            Surprise Me
          </button>
        </div>

        {/* Error */}
        {error && (
          <div
            className="mb-6 px-5 py-4 rounded-[4px] text-[13px] leading-relaxed"
            style={{
              background: 'rgba(239,68,68,0.08)',
              border: '1px solid rgba(239,68,68,0.16)',
              color: 'rgba(252,165,165,0.85)',
            }}
          >
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && <LoadingSkeleton />}

        {/* Result */}
        {idea && !loading && <IdeaCard idea={idea} />}

        {/* Empty hint */}
        {!idea && !loading && !error && (
          <p className="text-center text-[12px]" style={{ color: 'rgba(255,255,255,0.14)' }}>
            Results will appear here
          </p>
        )}
      </main>
    </div>
  )
}
