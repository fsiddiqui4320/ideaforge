import { promises as fs } from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'
import type { Idea, GeneratedIdea } from '@/lib/types'

// Vercel serverless: only /tmp is writable
const DATA_DIR = process.env.VERCEL ? '/tmp/data' : path.join(process.cwd(), 'data')
const IDEAS_FILE = path.join(DATA_DIR, 'ideas.json')

async function readIdeas(): Promise<Record<string, Idea>> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true })
    const raw = await fs.readFile(IDEAS_FILE, 'utf-8')
    return JSON.parse(raw)
  } catch {
    return {}
  }
}

async function writeIdeas(ideas: Record<string, Idea>): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true })
  await fs.writeFile(IDEAS_FILE, JSON.stringify(ideas, null, 2))
}

export async function saveIdea(data: GeneratedIdea): Promise<Idea> {
  const idea: Idea = {
    ...data,
    id: randomUUID().slice(0, 8),
    createdAt: new Date().toISOString(),
  }

  try {
    const ideas = await readIdeas()
    ideas[idea.id] = idea
    await writeIdeas(ideas)
  } catch {
    // Storage is best-effort on serverless; don't fail the request
    console.warn('Failed to persist idea to disk')
  }

  return idea
}

export async function getIdea(id: string): Promise<Idea | null> {
  try {
    const ideas = await readIdeas()
    return ideas[id] ?? null
  } catch {
    return null
  }
}
