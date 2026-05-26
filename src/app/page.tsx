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
      className="rounded-xl p-6 animate-fade-slide-up"
      style={{
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}
    >
      <div className="mb-5">
        <div className="h-5 rounded-[3px] w-2/5 mb-3 animate-shimmer" style={{ background: 'rgba(255,255,255,0.1)' }} />
        <div className="h-3.5 rounded-[2px] w-full mb-1.5 animate-shimmer" style={{ background: 'rgba(255,255,255,0.06)', animationDelay: '0.1s' }} />
        <div className="h-3.5 rounded-[2px] w-3/4 animate-shimmer" style={{ background: 'rgba(255,255,255,0.06)', animationDelay: '0.2s' }} />
      </div>
      <div className="h-px w-full mb-5" style={{ background: 'rgba(255,255,255,0.08)' }} />
      <div className="space-y-4">
        <div>
          <div className="h-2 rounded-[2px] w-1/3 mb-2 animate-shimmer" style={{ background: 'rgba(255,255,255,0.08)' }} />
          <div className="h-3.5 rounded-[2px] w-full mb-1 animate-shimmer" style={{ background: 'rgba(255,255,255,0.05)', animationDelay: '0.15s' }} />
          <div className="h-3.5 rounded-[2px] w-4/5 animate-shimmer" style={{ background: 'rgba(255,255,255,0.05)', animationDelay: '0.25s' }} />
        </div>
        <div>
          <div className="h-2 rounded-[2px] w-1/3 mb-2 animate-shimmer" style={{ background: 'rgba(255,255,255,0.08)', animationDelay: '0.1s' }} />
          <div className="h-3.5 rounded-[2px] w-full mb-1 animate-shimmer" style={{ background: 'rgba(255,255,255,0.05)', animationDelay: '0.2s' }} />
          <div className="h-3.5 rounded-[2px] w-3/5 animate-shimmer" style={{ background: 'rgba(255,255,255,0.05)', animationDelay: '0.3s' }} />
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
      className="rounded-xl p-6 animate-fade-slide-up"
      style={{
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <div className="mb-5">
        <div className="mb-1.5">
          <h2 className="text-[20px] font-normal tracking-tight leading-tight text-white">
            {idea.name}
          </h2>

        </div>
        <p className="text-[14px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.6)' }}>
          {idea.oneLiner}
        </p>
      </div>

      <div className="h-px w-full mb-5" style={{ background: 'rgba(255,255,255,0.08)' }} />

      <div className="space-y-4 mb-6">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.12em] mb-1.5" style={{ color: 'rgba(255,255,255,0.32)' }}>
            Target User
          </div>
          <p className="text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
            {idea.targetUser}
          </p>
        </div>
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.12em] mb-1.5" style={{ color: 'rgba(255,255,255,0.32)' }}>
            Monetization
          </div>
          <p className="text-[13px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.65)' }}>
            {idea.monetization}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={copyLink}
          className="flex items-center gap-1.5 text-[12px] px-3.5 py-2 rounded-lg transition-all duration-150"
          style={{
            background: copied ? 'rgba(74,222,128,0.15)' : 'rgba(255,255,255,0.05)',
            border: copied ? '1px solid rgba(74,222,128,0.25)' : '1px solid rgba(255,255,255,0.1)',
            color: copied ? 'rgba(74,222,128,0.9)' : 'rgba(255,255,255,0.5)',
          }}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied ? 'Copied!' : 'Copy link'}
        </button>
        <Link
          href={`/idea/${idea.id}`}
          className="flex items-center gap-1 text-[12px] px-3.5 py-2 rounded-lg transition-colors duration-150"
          style={{ color: 'rgba(255,255,255,0.35)' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.65)' }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.35)' }}
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
    <div className="relative min-h-screen" style={{ background: '#0a0f14' }}>
      {/* Full-screen background image */}
      <div
        aria-hidden
        className="fixed inset-0"
        style={{
          backgroundImage: 'url(/bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Subtle dark gradient overlay */}
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(180deg, rgba(10,15,20,0.15) 0%, rgba(10,15,20,0.02) 35%, rgba(10,15,20,0.02) 60%, rgba(10,15,20,0.4) 100%),
            radial-gradient(ellipse at 50% 50%, transparent 0%, rgba(10,15,20,0.15) 100%)
          `,
        }}
      />

      {/* Brand tag */}
      <div className="fixed top-4 left-4 sm:top-6 sm:left-8 z-10 flex items-center gap-2">
        <div
          className="w-5 h-5 flex items-center justify-center rounded-[3px]"

        >
          <SparkleIcon />
        </div>
        <span className="text-[12px] font-semibold tracking-tight" style={{ color: 'rgba(255,255,255,0.85)' }}>
          IdeaForge
        </span>
        <span className="text-[10px] font-medium ml-1" style={{ color: 'rgba(255,255,255,0.35)' }}>
          GPT-4o mini
        </span>
      </div>

      {/* Layout — stacks on mobile, two columns on desktop */}
      <div className="relative z-10 min-h-screen flex items-center px-4 sm:px-8 lg:px-16 pt-16 pb-24 sm:py-20">
        <div className="w-full flex flex-col md:flex-row items-start gap-8 md:gap-10 lg:gap-16">
          {/* Left column — hero + input */}
          <div className="w-full md:flex-1 md:max-w-[440px] lg:max-w-[520px]">
            <div className="mb-6 sm:mb-8">
              <h1
                className="font-normal tracking-[-0.034em] leading-[1.05] mb-3 sm:mb-4"
                style={{
                  fontSize: 'clamp(28px, 7vw, 56px)',
                  color: '#fff',
                }}
              >
                Your next SaaS<br className="hidden sm:inline" /> idea, generated.
              </h1>
              <p
                className="text-[14px] sm:text-[15px] leading-relaxed"
                style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '380px' }}
              >
                Describe a niche or pain point. Get a focused, monetizable SaaS concept in under 3 seconds.
              </p>
            </div>

            <div className="mb-3">
              <input
                ref={inputRef}
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter' && !loading) generate() }}
                placeholder='e.g. "invoicing pain for freelancers"'
                className="w-full text-[14px] sm:text-[15px] outline-none rounded-xl"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  padding: '14px 18px',
                  color: '#fff',
                  transition: 'border-color 0.15s ease, background 0.15s ease',
                  minHeight: '48px',
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                }}
              />
              <style>{`
                input[type="text"]::placeholder { color: rgba(255,255,255,0.25); }
              `}</style>
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-2.5">
              <button
                onClick={() => generate()}
                disabled={loading}
                className="flex items-center gap-2 text-[13px] sm:text-[14px] font-medium px-5 py-2.5 sm:py-3 rounded-lg transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
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
                className="text-[13px] sm:text-[14px] font-medium px-5 py-2.5 sm:py-3 rounded-lg transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: 'rgba(255,255,255,0.55)',
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
                    e.currentTarget.style.color = 'rgba(255,255,255,0.8)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.06)'
                    e.currentTarget.style.color = 'rgba(255,255,255,0.55)'
                  }
                }}
              >
                Surprise Me
              </button>
            </div>
          </div>

          {/* Right column — result (bottom on mobile) */}
          <div className="w-full md:flex-1 md:max-w-[480px]">
            {idea && !loading && <IdeaCard idea={idea} />}
            {loading && <LoadingSkeleton />}
            {error && (
              <div
                className="rounded-xl px-5 py-4 text-[13px] leading-relaxed animate-fade-slide-up"
                style={{
                  background: 'rgba(239,68,68,0.1)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(239,68,68,0.2)',
                  color: 'rgba(252,165,165,0.9)',
                }}
              >
                {error}
              </div>
            )}
            {!idea && !loading && !error && (
              <p className="hidden md:block text-[12px]" style={{ color: 'rgba(255,255,255,0.14)' }}>
                Results will appear here
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
