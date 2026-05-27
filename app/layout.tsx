import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Your One — Find Your Digital World',
  description: 'Answer 10 questions. Discover your personal digital place. A world that is uniquely, entirely yours.',
  openGraph: {
    title: 'Your One — Find Your Digital World',
    description: 'Answer 10 questions. Discover your personal digital place.',
    url: 'https://yourone.world',
    siteName: 'Your One',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'Your One', description: 'Discover your digital world.' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}
