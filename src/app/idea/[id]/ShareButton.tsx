'use client'

import { useState } from 'react'
import { CheckIcon } from '@/components/icons'

export function ShareButton({ ideaId }: { ideaId: string }) {
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/idea/${ideaId}`)
      setCopied(true)
      setError(false)
      setTimeout(() => setCopied(false), 2200)
    } catch {
      setError(true)
      setTimeout(() => setError(false), 3000)
    }
  }

  return (
    <button
      onClick={copy}
      aria-label="Copy shareable link for this idea"
      className="flex items-center justify-center gap-2 text-[13px] font-medium px-5 py-2.5 rounded-lg transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
      style={{
        background: copyStateStyle(copied, error),
        border: copyBorderStyle(copied, error),
        color: copyTextColor(copied, error),
        minHeight: 44,
      }}
    >
      {copied ? (
        <>
          <CheckIcon />
          Link copied!
        </>
      ) : error ? (
        'Could not copy — tap to retry'
      ) : (
        'Copy shareable link'
      )}
    </button>
  )
}

function copyStateStyle(copied: boolean, error: boolean): string {
  if (copied) return 'rgba(74,222,128,0.15)'
  if (error) return 'rgba(239,68,68,0.1)'
  return '#6366f1'
}

function copyBorderStyle(copied: boolean, error: boolean): string {
  if (copied) return '1px solid rgba(74,222,128,0.25)'
  if (error) return '1px solid rgba(239,68,68,0.25)'
  return '1px solid transparent'
}

function copyTextColor(copied: boolean, error: boolean): string {
  if (copied) return 'rgba(74,222,128,0.9)'
  if (error) return 'rgba(252,165,165,0.9)'
  return '#fff'
}
