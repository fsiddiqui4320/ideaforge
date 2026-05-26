'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ShareButton } from './ShareButton'

interface Idea {
  id: string
  name: string
  oneLiner: string
  targetUser: string
  monetization: string
  prompt: string
  createdAt: string
}

function SparkleIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.5 0.5L7.9 5.1L12.5 6.5L7.9 7.9L6.5 12.5L5.1 7.9L0.5 6.5L5.1 5.1L6.5 0.5Z" fill="currentColor" />
    </svg>
  )
}

function BackIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.5 6H2.5M2.5 6L5.5 3M2.5 6L5.5 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

async function fetchIdea(id: string): Promise<Idea | null> {
  try {
    const res = await fetch(`/api/idea/${id}`)
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

function getLocalIdea(id: string): Idea | null {
  if (typeof window === 'undefined') return null
  try {
    const cached = JSON.parse(localStorage.getItem('***') || '{}')
    return cached[id] || null
  } catch {
    return null
  }
}

export default function IdeaPage({ params }: { params: Promise<{ id: string }> }) {
  const [idea, setIdea] = useState<Idea | null>(null)
  const [loading, setLoading] = useState(true)
  const [id, setId] = useState<string | null>(null)

  useEffect(() => {
    params.then((p) => setId(p.id))
  }, [params])

  useEffect(() => {
    if (!id) return
    fetchIdea(id).then((serverIdea) => {
      if (serverIdea) {
        setIdea(serverIdea)
      } else {
        // Fall back to localStorage cache
        const local = getLocalIdea(id)
        setIdea(local)
      }
      setLoading(false)
    })
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0a0f14' }}>
        <p style={{ color: 'rgba(255,255,255,0.25)' }}>Loading...</p>
      </div>
    )
  }

  if (!idea) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ background: '#0a0f14' }}>
        <p style={{ color: 'rgba(255,255,255,0.45)' }}>Idea not found</p>
        <Link
          href="/"
          className="text-[13px] font-medium px-5 py-2.5 rounded-lg transition-all duration-150"
          style={{ background: '#6366f1', color: '#fff' }}
        >
          Back to generator
        </Link>
      </div>
    )
  }

  const formattedDate = new Date(idea.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="relative min-h-screen" style={{ background: '#0a0f14' }}>
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none"
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
          background: 'linear-gradient(180deg, rgba(10,15,20,0.15) 0%, rgba(10,15,20,0.02) 35%, rgba(10,15,20,0.02) 60%, rgba(10,15,20,0.4) 100%)',
        }}
      />

      <div className="fixed top-4 left-4 sm:top-6 sm:left-8 z-10 flex items-center gap-2">
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
        <span className="text-[10px] font-medium" style={{ color: 'rgba(255,255,255,0.3)' }}>
          GPT-4o mini
        </span>
      </div>

      <main className="relative z-10 max-w-[620px] mx-auto px-4 sm:px-8 pt-24 pb-32">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em]" style={{ color: 'rgba(255,255,255,0.28)' }}>
              Generated {formattedDate}
            </span>
          </div>
          <h1 className="font-normal tracking-[-0.03em] leading-[1.08] mb-4 text-white text-[26px] sm:text-[36px] lg:text-[48px]">
            {idea.name}
          </h1>
          <p className="text-[16px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '500px' }}>
            {idea.oneLiner}
          </p>
        </div>

        <div
          className="rounded-xl p-6 sm:p-8 mb-8"
          style={{
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          {idea.prompt && (
            <div className="mb-6 pb-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="text-[10px] font-semibold uppercase tracking-[0.12em] mb-2" style={{ color: 'rgba(255,255,255,0.32)' }}>
                Prompt
              </div>
              <p className="text-[13px]" style={{ color: 'rgba(255,255,255,0.4)' }}>
                &ldquo;{idea.prompt}&rdquo;
              </p>
            </div>
          )}
          <div className="space-y-5">
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
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5">
          <ShareButton ideaId={idea.id} />
          <Link
            href="/"
            className="flex items-center justify-center gap-1.5 text-[13px] font-medium px-5 py-2.5 rounded-lg transition-all duration-150"
            style={{
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: 'rgba(255,255,255,0.5)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
              e.currentTarget.style.color = 'rgba(255,255,255,0.8)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
              e.currentTarget.style.color = 'rgba(255,255,255,0.5)'
            }}
          >
            <BackIcon />
            Generate another
          </Link>
        </div>
      </main>
    </div>
  )
}
