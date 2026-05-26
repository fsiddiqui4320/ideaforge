import { NextRequest } from 'next/server'
import OpenAI from 'openai'
import { saveIdea } from '@/lib/store'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const SURPRISE_PROMPTS = [
  'invoicing and payments for freelancers',
  'AI tools for solo founders with no team',
  'health tracking for people with chronic conditions',
  'e-commerce analytics for Shopify sellers under $1M revenue',
  'async team communication for distributed engineering teams',
  'legal document automation for small law firms',
  'customer support for B2B SaaS with small support teams',
  'interview prep for senior engineers switching companies',
]

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}))
  const prompt = typeof body.prompt === 'string' ? body.prompt.trim() : ''

  const finalPrompt =
    prompt || SURPRISE_PROMPTS[Math.floor(Math.random() * SURPRISE_PROMPTS.length)]

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: `You are a sharp SaaS product strategist. Given a niche or pain point, generate one focused, credible SaaS idea.

Return ONLY valid JSON with exactly this structure:
{
  "name": "2-3 word product name",
  "oneLiner": "One clear sentence — what it does and for whom",
  "targetUser": "Specific user persona with context (e.g. 'Solo consultants billing 10+ clients/month who lose hours to manual invoicing')",
  "monetization": "Specific model with pricing signals (e.g. '$49/mo per seat, freemium up to 3 projects, enterprise on request')"
}

Be specific. Avoid buzzwords. Sound like a real startup, not a pitch template.`,
      },
      {
        role: 'user',
        content: `Niche or pain point: ${finalPrompt}`,
      },
    ],
    response_format: { type: 'json_object' },
  })

  const data = JSON.parse(completion.choices[0].message.content ?? '{}')

  if (!data.name || !data.oneLiner) {
    return Response.json({ error: 'Invalid response from AI' }, { status: 500 })
  }

  const idea = await saveIdea({
    name: data.name,
    oneLiner: data.oneLiner,
    targetUser: data.targetUser ?? '',
    monetization: data.monetization ?? '',
    prompt: finalPrompt,
  })

  return Response.json(idea)
}
