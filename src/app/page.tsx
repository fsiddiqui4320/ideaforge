'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { saveIdea, unsaveIdea, isIdeaSaved } from '@/lib/saved'
import type { Idea } from '@/lib/types'
import { SparkleIcon, CopyIcon, CheckIcon, ArrowIcon, SaveIcon, SavedIcon, SpinnerIcon } from '@/components/icons'

const CACHE_KEY = 'ideaforge_cache'

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

function IdeaCard({ idea, saved, onToggleSave }: { idea: Idea; saved: boolean; onToggleSave: () => void }) {
  const [copied, setCopied] = useState(false)

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/idea/${idea.id}`)
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      // Clipboard API may fail silently in some contexts
    }
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
        <div className="flex items-start justify-between gap-3 mb-1.5">
          <h2 className="text-[20px] font-normal tracking-tight leading-tight text-white line-clamp-2">
            {idea.name}
          </h2>
          <button
            onClick={onToggleSave}
            className="flex-shrink-0 p-2 rounded-lg transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/50"
            onMouseEnter={(e) => { if (!saved) e.currentTarget.style.color = 'rgba(255,255,255,0.45)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = saved ? 'rgba(99,102,241,0.85)' : 'rgba(255,255,255,0.2)' }}
            aria-label={saved ? 'Unsave idea' : 'Save idea'}
            style={{
              ...(saved ? { color: 'rgba(99,102,241,0.85)' } : { color: 'rgba(255,255,255,0.2)' }),
              minWidth: 44,
              minHeight: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {saved ? <SavedIcon /> : <SaveIcon />}
          </button>
        </div>
        <p className="text-[14px] leading-relaxed line-clamp-3" style={{ color: 'rgba(255,255,255,0.6)' }}>
          {idea.oneLiner}
        </p>
      </div>

      <div className="h-px w-full mb-5" style={{ background: 'rgba(255,255,255,0.08)' }} />

      <div className="space-y-4 mb-6">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.12em] mb-1.5" style={{ color: 'rgba(255,255,255,0.32)' }}>
            Target User
          </div>
          <p className="text-[13px] leading-relaxed line-clamp-3" style={{ color: 'rgba(255,255,255,0.65)' }}>
            {idea.targetUser}
          </p>
        </div>
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.12em] mb-1.5" style={{ color: 'rgba(255,255,255,0.32)' }}>
            Monetization
          </div>
          <p className="text-[13px] leading-relaxed line-clamp-3" style={{ color: 'rgba(255,255,255,0.65)' }}>
            {idea.monetization}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={copyLink}
          aria-label="Copy link to this idea"
          className="flex items-center gap-1.5 text-[12px] px-3.5 py-2.5 rounded-lg transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/50"
          style={{
            background: copied ? 'rgba(74,222,128,0.15)' : 'rgba(255,255,255,0.05)',
            border: copied ? '1px solid rgba(74,222,128,0.25)' : '1px solid rgba(255,255,255,0.1)',
            color: copied ? 'rgba(74,222,128,0.9)' : 'rgba(255,255,255,0.5)',
            minHeight: 44,
          }}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          {copied ? 'Copied!' : 'Copy link'}
        </button>
        <Link
          href={`/idea/${idea.id}`}
          className="flex items-center gap-1 text-[12px] px-3.5 py-2.5 rounded-lg transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/50"
          style={{ color: 'rgba(255,255,255,0.35)', minHeight: 44 }}
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
  const [saved, setSaved] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (idea) setSaved(isIdeaSaved(idea.id))
  }, [idea])

  function toggleSave() {
    if (!idea) return
    if (saved) {
      unsaveIdea(idea.id)
      setSaved(false)
    } else {
      saveIdea({
        id: idea.id,
        name: idea.name,
        oneLiner: idea.oneLiner,
        targetUser: idea.targetUser,
        monetization: idea.monetization,
        prompt: idea.prompt,
      })
      setSaved(true)
    }
  }

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
        throw new Error((body as { error?: string }).error ?? 'Generation failed')
      }
      const data: Idea = await res.json()
      setIdea(data)
      // Cache in localStorage so /idea/[id] page can find it across serverless instances
      if (typeof window !== 'undefined') {
        try {
          const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}')
          cached[data.id] = data
          localStorage.setItem(CACHE_KEY, JSON.stringify(cached))
        } catch { /* ignore */ }
      }
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
        className="fixed inset-0 pointer-events-none"
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
      <div className="fixed top-4 left-4 sm:top-6 sm:left-8 z-20 flex items-center gap-2">
        <div className="w-5 h-5 flex items-center justify-center rounded-[3px]" style={{ color: 'rgba(255,255,255,0.85)' }}>
          <SparkleIcon />
        </div>
        <span className="text-[12px] font-semibold tracking-tight" style={{ color: 'rgba(255,255,255,0.85)' }}>
          IdeaForge
        </span>
        <span className="text-[10px] font-medium ml-1" style={{ color: 'rgba(255,255,255,0.35)' }}>
          GPT-4o mini
        </span>
        <Link
          href="/saved"
          className="text-[11px] font-medium ml-3 transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/50 rounded cursor-pointer inline-block"
          style={{ color: 'rgba(255,255,255,0.4)' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.75)' }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)' }}
        >
          Saved
        </Link>
      </div>

      {/* Layout — stacks on mobile, two columns on desktop */}
      <div className="relative z-10 min-h-screen flex items-center px-4 sm:px-8 lg:px-16 pt-16 pb-24 sm:py-20">
        <div className="w-full flex flex-col md:flex-row items-start justify-center gap-8 md:gap-10 lg:gap-16">
          {/* Left column — hero + input */}
          <div className="w-full md:flex-1 md:max-w-[440px] lg:max-w-[520px]">
            <div className="mb-6 sm:mb-8">
              <h1
                className="font-normal tracking-[-0.034em] leading-[1.05] mb-3 sm:mb-4 text-[28px] sm:text-[56px] lg:text-[72px] text-white"
              >
                Your next SaaS<span className="hidden sm:inline"> </span>idea, generated.
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
                aria-label="Describe a niche or pain point to generate a SaaS idea"
                className="w-full text-[14px] sm:text-[15px] outline-none rounded-xl focus-visible:ring-2 focus-visible:ring-indigo-400/30"
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
            </div>

            <div className="flex flex-wrap gap-2 sm:gap-2.5">
              <button
                onClick={() => generate()}
                disabled={loading}
                className="flex items-center justify-center gap-2 text-[13px] sm:text-[14px] font-medium px-5 py-3 rounded-lg transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                style={{ background: '#6366f1', color: '#fff', minHeight: 44 }}
                onMouseEnter={(e) => { if (!loading) e.currentTarget.style.background = '#818cf8' }}
                onMouseLeave={(e) => { if (!loading) e.currentTarget.style.background = '#6366f1' }}
              >
                {loading ? (
                  <>
                    <SpinnerIcon />
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
                className="text-[13px] sm:text-[14px] font-medium px-5 py-3 rounded-lg transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  color: 'rgba(255,255,255,0.55)',
                  minHeight: 44,
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
            {idea && !loading && <IdeaCard idea={idea} saved={saved} onToggleSave={toggleSave} />}
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
                role="alert"
              >
                {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
