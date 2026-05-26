import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { getIdea } from '@/lib/store'
import { ShareButton } from './ShareButton'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const idea = await getIdea(id)
  if (!idea) return { title: 'Idea not found — IdeaForge' }
  return {
    title: `${idea.name} — IdeaForge`,
    description: idea.oneLiner,
  }
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

export default async function IdeaPage({ params }: Props) {
  const { id } = await params
  const idea = await getIdea(id)

  if (!idea) notFound()

  const formattedDate = new Date(idea.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <div className="relative min-h-screen" style={{ background: '#0a0f14' }}>
      {/* Background image */}
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: 'url(/bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Subtle dark gradient overlay */}
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(180deg, rgba(10,15,20,0.15) 0%, rgba(10,15,20,0.02) 35%, rgba(10,15,20,0.02) 60%, rgba(10,15,20,0.4) 100%)
          `,
        }}
      />

      {/* Brand tag */}
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

      {/* Content */}
      <main className="relative z-10 max-w-[620px] mx-auto px-4 sm:px-8 pt-24 pb-32">
        {/* Meta */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-[10px] font-semibold uppercase tracking-[0.12em]" style={{ color: 'rgba(255,255,255,0.28)' }}>
              Generated {formattedDate}
            </span>
          </div>

          <h1
            className="font-normal tracking-[-0.03em] leading-[1.08] mb-4 text-white"
            style={{ fontSize: 'clamp(30px, 5vw, 48px)' }}
          >
            {idea.name}
          </h1>

          <p className="text-[16px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)', maxWidth: '500px' }}>
            {idea.oneLiner}
          </p>
        </div>

        {/* Detail card */}
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

        {/* Actions */}
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
