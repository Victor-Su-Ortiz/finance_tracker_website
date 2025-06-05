'use client'

import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import Problem from '@/components/Problem'
import Solution from '@/components/Solution'
import Features from '@/components/Features'
import Demo from '@/components/Demo'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      <Navigation />
      <Hero />
      <Problem />
      <Solution />
      <Features />
      <Demo />
      <CTA />
      <Footer />
    </main>
  )
}