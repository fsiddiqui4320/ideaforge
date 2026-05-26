import { promises as fs } from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'

const DATA_DIR = path.join(process.cwd(), 'data')
const IDEAS_FILE = path.join(DATA_DIR, 'ideas.json')

export interface Idea {
  id: string
  name: string
  oneLiner: string
  targetUser: string
  monetization: string
  prompt: string
  createdAt: string
}

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

export async function saveIdea(data: Omit<Idea, 'id' | 'createdAt'>): Promise<Idea> {
  const ideas = await readIdeas()
  const idea: Idea = {
    ...data,
    id: randomUUID().slice(0, 8),
    createdAt: new Date().toISOString(),
  }
  ideas[idea.id] = idea
  await writeIdeas(ideas)
  return idea
}

export async function getIdea(id: string): Promise<Idea | null> {
  const ideas = await readIdeas()
  return ideas[id] ?? null
}
