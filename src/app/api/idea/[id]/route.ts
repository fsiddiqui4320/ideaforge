import { NextRequest } from 'next/server'
import { getIdea } from '@/lib/store'

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const idea = await getIdea(id)
  if (!idea) return Response.json({ error: 'Not found' }, { status: 404 })
  return Response.json(idea)
}
