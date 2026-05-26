'use client'

import { useState } from 'react'

export function ShareButton({ ideaId }: { ideaId: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    await navigator.clipboard.writeText(`${window.location.origin}/idea/${ideaId}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  return (
    <button
      onClick={copy}
      className="flex items-center justify-center gap-2 text-[13px] font-medium px-5 py-2.5 rounded-[4px] transition-all duration-150"
      style={{
        background: copied ? 'rgba(74,222,128,0.15)' : '#6366f1',
        border: copied ? '1px solid rgba(74,222,128,0.25)' : '1px solid transparent',
        color: copied ? 'rgba(74,222,128,0.9)' : '#fff',
      }}
    >
      {copied ? (
        <>
          <CheckIcon />
          Link copied!
        </>
      ) : (
        'Copy shareable link'
      )}
    </button>
  )
}

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 6.5L5 9.5L11 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
