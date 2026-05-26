# SaaS Idea Generator — v1 Spec

## Core Concept
A web app that generates validated SaaS ideas using AI. Clean, fast, shareable.

## v1 Requirements

### Input
- User can enter: niche, pain point, or click "surprise me"
- Simple, clean input — one text field + a button

### Output
Each generated idea shows:
- **Name** — catchy SaaS product name
- **One-liner** — elevator pitch (1 sentence)
- **Target user** — who this is for
- **Monetization angle** — how it makes money
- **Shareable link** — each idea gets a unique URL

### Pages
- `/` — Landing page with the generator (input + results)
- `/idea/[id]` — Individual idea page (shareable)

### Tech
- Next.js 14 App Router (already scaffolded)
- Tailwind CSS (already configured)
- AI generation via OpenAI API (use gpt-4o-mini for cost efficiency)
- Store ideas in memory or simple JSON file (no DB needed for v1)

### Design
- Dark theme, modern, clean
- Fast — results should appear in <3 seconds
- Mobile-first responsive
- Share button copies link to clipboard

### AI Prompt for Idea Generation
Given a niche/pain point (or "surprise me"), generate a SaaS idea with:
1. A catchy name
2. A one-line elevator pitch
3. Target user persona
4. Monetization model
Return as structured JSON.

## Non-requirements (save for v2+)
- No upvotes
- No leaderboard
- No user accounts
- No "I Built This" claiming
- No database — keep it simple
