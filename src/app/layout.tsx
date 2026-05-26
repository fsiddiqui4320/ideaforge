import type { Metadata } from 'next'
import { Inter, Inter as InterMono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'IdeaForge — SaaS Idea Generator',
  description: 'Generate focused, monetizable SaaS ideas from a niche or pain point.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}
