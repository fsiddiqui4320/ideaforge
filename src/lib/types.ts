export interface Idea {
  id: string
  name: string
  oneLiner: string
  targetUser: string
  monetization: string
  prompt: string
  createdAt: string
}

export type GeneratedIdea = Omit<Idea, 'id' | 'createdAt'>

export interface SavedIdea {
  id: string
  name: string
  oneLiner: string
  targetUser: string
  monetization: string
  prompt: string
  savedAt: string
}
