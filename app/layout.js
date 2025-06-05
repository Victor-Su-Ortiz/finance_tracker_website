import { Inter } from 'next/font/google'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL || 'https://socialfin.app'),
  title: 'SocialFin - Redefining Personal Finance Management',
  description: 'The first personal finance platform that understands your money is social. Track shared expenses, manage debts, and get accurate insights.',
  keywords: 'personal finance, expense splitting, debt tracking, shared expenses, budgeting app, financial management',
  authors: [{ name: 'SocialFin Team' }],
  openGraph: {
    title: 'SocialFin - Redefining Personal Finance Management',
    description: 'Track shared expenses and manage social financial interactions seamlessly.',
    type: 'website',
    locale: 'en_US',
    url: '/',
    siteName: 'SocialFin',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SocialFin - Your Money is Social',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SocialFin - Redefining Personal Finance Management',
    description: 'The first personal finance platform that understands your money is social.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}