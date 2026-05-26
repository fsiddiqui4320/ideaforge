'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getSavedIdeas, unsaveIdea, SavedIdea } from '@/lib/saved'

function SparkleIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.5 0.5L7.9 5.1L12.5 6.5L7.9 7.9L6.5 12.5L5.1 7.9L0.5 6.5L5.1 5.1L6.5 0.5Z" fill="currentColor" />
    </svg>
  )
}

export default function SavedPage() {
  const [ideas, setIdeas] = useState<SavedIdea[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setIdeas(getSavedIdeas())
    setMounted(true)
  }, [])

  function removeIdea(id: string) {
    unsaveIdea(id)
    setIdeas((prev) => prev.filter((i) => i.id !== id))
  }

  if (!mounted) return null

  return (
    <div className="relative min-h-screen" style={{ background: '#0a0f14' }}>
      <div
        aria-hidden
        className="fixed inset-0"
        style={{
          backgroundImage: 'url(/bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(180deg, rgba(10,15,20,0.15) 0%, rgba(10,15,20,0.02) 35%, rgba(10,15,20,0.02) 60%, rgba(10,15,20,0.4) 100%)`,
        }}
      />

      {/* Header */}
      <div className="relative z-10 px-4 sm:px-8 lg:px-16 pt-6 pb-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 flex items-center justify-center rounded-[3px]">
              <SparkleIcon />
            </div>
            <Link
              href="/"
              className="text-[12px] font-semibold tracking-tight transition-colors duration-150"
              style={{ color: 'rgba(255,255,255,0.85)' }}
            >
              IdeaForge
            </Link>
            <span className="text-[10px] font-medium ml-1" style={{ color: 'rgba(255,255,255,0.35)' }}>
              saved ideas
            </span>
          </div>
          <Link
            href="/"
            className="text-[12px] font-medium transition-colors duration-150"
            style={{ color: 'rgba(255,255,255,0.35)' }}
            onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.65)' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.35)' }}
          >
            ← Back
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 px-4 sm:px-8 lg:px-16 pb-24">
        <div className="max-w-4xl mx-auto">
          {ideas.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-32 text-center">
              <p className="text-[15px] mb-2" style={{ color: 'rgba(255,255,255,0.45)' }}>
                No saved ideas yet
              </p>
              <p className="text-[13px] mb-8" style={{ color: 'rgba(255,255,255,0.2)' }}>
                Save ideas from the home page and they&apos;ll appear here
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 text-[13px] font-medium px-5 py-2.5 rounded-lg transition-all duration-150"
                style={{ background: '#6366f1', color: '#fff' }}
              >
                Generate ideas
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ideas.map((idea) => (
                <div
                  key={idea.id}
                  className="rounded-xl p-6"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h2 className="text-[17px] font-semibold tracking-tight leading-tight text-white">
                      {idea.name}
                    </h2>
                    <button
                      onClick={() => removeIdea(idea.id)}
                      className="flex-shrink-0 text-[11px] font-medium px-2.5 py-1 rounded-md transition-all duration-150"
                      style={{
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        color: 'rgba(255,255,255,0.35)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(239,68,68,0.1)'
                        e.currentTarget.style.borderColor = 'rgba(239,68,68,0.2)'
                        e.currentTarget.style.color = 'rgba(252,165,165,0.85)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                        e.currentTarget.style.color = 'rgba(255,255,255,0.35)'
                      }}
                    >
                      Remove
                    </button>
                  </div>
                  <p className="text-[13px] leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.55)' }}>
                    {idea.oneLiner}
                  </p>
                  <div className="h-px w-full mb-4" style={{ background: 'rgba(255,255,255,0.06)' }} />
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-[9px] font-semibold uppercase tracking-[0.12em] mb-1" style={{ color: 'rgba(255,255,255,0.28)' }}>
                        Target
                      </div>
                      <p className="text-[12px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                        {idea.targetUser}
                      </p>
                    </div>
                    <div>
                      <div className="text-[9px] font-semibold uppercase tracking-[0.12em] mb-1" style={{ color: 'rgba(255,255,255,0.28)' }}>
                        Monetization
                      </div>
                      <p className="text-[12px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
                        {idea.monetization}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-[11px]" style={{ color: 'rgba(255,255,255,0.2)' }}>
                    <span>Saved {formatDate(idea.savedAt)}</span>
                    <span>·</span>
                    <Link
                      href={`/idea/${idea.id}`}
                      className="transition-colors duration-150 hover:underline"
                      style={{ color: 'rgba(255,255,255,0.25)' }}
                    >
                      View page
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function formatDate(iso: string): string {
  const d = new Date(iso)
  const now = new Date()
  const diff = now.getTime() - d.getTime()
  const mins = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins}m ago`
  if (hours < 24) return `${hours}h ago`
  if (days < 7) return `${days}d ago`
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}
