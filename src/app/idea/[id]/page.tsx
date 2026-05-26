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
    <div className="min-h-screen" style={{ background: '#090909', color: '#fff' }}>
      {/* Grid */}
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
      {/* Glow */}
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
        <Link
          href="/"
          className="flex items-center gap-1.5 text-[13px] font-medium transition-colors duration-150"
          style={{ color: 'rgba(255,255,255,0.35)' }}
        >
          <BackIcon />
          Generate another
        </Link>
      </nav>

      {/* Main */}
      <main className="relative z-10 max-w-[620px] mx-auto px-6 sm:px-8 pt-16 pb-32">
        {/* Meta */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-8">
            <span
              className="text-[10px] font-semibold uppercase tracking-[0.12em]"
              style={{ color: 'rgba(255,255,255,0.28)' }}
            >
              Generated idea
            </span>
            <span style={{ color: 'rgba(255,255,255,0.15)' }}>·</span>
            <span
              className="text-[10px] font-semibold uppercase tracking-[0.12em]"
              style={{ color: 'rgba(255,255,255,0.28)' }}
            >
              {formattedDate}
            </span>
          </div>

          <h1
            className="font-bold tracking-[-0.03em] leading-[1.08] mb-4"
            style={{
              fontSize: 'clamp(36px, 6vw, 58px)',
              background: 'linear-gradient(155deg, #ffffff 35%, rgba(255,255,255,0.5) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {idea.name}
          </h1>

          <p className="text-[17px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.52)' }}>
            {idea.oneLiner}
          </p>
        </div>

        {/* Detail card */}
        <div
          className="rounded-[4px] p-8 mb-8"
          style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.025)' }}
        >
          {idea.prompt && (
            <div className="mb-8 pb-6" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="text-[10px] font-semibold uppercase tracking-[0.12em] mb-2" style={{ color: 'rgba(255,255,255,0.28)' }}>
                From the prompt
              </div>
              <p className="text-[13px] italic" style={{ color: 'rgba(255,255,255,0.38)' }}>
                &ldquo;{idea.prompt}&rdquo;
              </p>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.12em] mb-2.5" style={{ color: 'rgba(255,255,255,0.28)' }}>
                Target User
              </div>
              <p className="text-[14px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.68)' }}>
                {idea.targetUser}
              </p>
            </div>
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.12em] mb-2.5" style={{ color: 'rgba(255,255,255,0.28)' }}>
                Monetization
              </div>
              <p className="text-[14px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.68)' }}>
                {idea.monetization}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <ShareButton ideaId={idea.id} />
          <Link
            href="/"
            className="flex items-center justify-center gap-2 text-[13px] font-medium px-5 py-2.5 rounded-[4px] transition-all duration-150"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.45)',
            }}
          >
            Generate another idea
          </Link>
        </div>
      </main>
    </div>
  )
}
