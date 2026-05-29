import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Your One — Who Are You, Really?',
  description: '10 questions. 42 archetypes. Discover your world, your animal, your planet, your celebrity — uniquely yours.',
  keywords: ['personality quiz', 'archetype', 'spirit animal', 'digital world', 'self discovery', 'your world'],
  authors: [{ name: 'Filmos', url: 'https://yourone.world' }],
  openGraph: {
    title: 'Your One — Who Are You, Really?',
    description: '10 questions reveal the world, animal, planet, or celebrity that mirrors your soul.',
    url: 'https://yourone.world',
    siteName: 'Your One',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your One — Who Are You, Really?',
    description: '10 questions. 42 archetypes. Discover yourself.',
    creator: '@yourone_world',
  },
  robots: { index: true, follow: true },
  metadataBase: new URL('https://yourone.world'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#05050f" />
        <meta name="color-scheme" content="dark" />
        <script src="https://gumroad.com/js/gumroad.js" async></script>
      </head>
      <body>{children}</body>
    </html>
  )
}
