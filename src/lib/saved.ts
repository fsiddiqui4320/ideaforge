'use client'

import type { SavedIdea } from '@/lib/types'

const STORAGE_KEY = 'ideaforge_saved'

function getAll(): SavedIdea[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export function getSavedIdeas(): SavedIdea[] {
  return getAll().sort((a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime())
}

export function isIdeaSaved(id: string): boolean {
  return getAll().some((i) => i.id === id)
}

export function saveIdea(idea: Omit<SavedIdea, 'savedAt'>): void {
  const ideas = getAll()
  if (ideas.some((i) => i.id === idea.id)) return // already saved
  ideas.push({ ...idea, savedAt: new Date().toISOString() })
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ideas))
}

export function unsaveIdea(id: string): void {
  const ideas = getAll().filter((i) => i.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ideas))
}
