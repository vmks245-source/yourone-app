import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'One World Studio | Top UI/UX Design, App Building & Digital Marketing Agency',
  description: 'One World Studio is a premier digital agency specializing in Mobile App Development, High-Converting Web Systems, UI/UX Design, Neuromarketing, and Performance Growth.',
  keywords: [
    'UI UX design agency',
    'app development agency',
    'website building',
    'digital marketing agency',
    'neuromarketing',
    'React Native apps',
    'Next.js development',
    'performance growth'
  ],
  authors: [{ name: 'One World Studio', url: 'https://yourone.world' }],
  openGraph: {
    title: 'One World Studio | Engineering Award-Winning Apps, Websites & Digital Marketing',
    description: 'We build world-class mobile apps, high-performance web systems, and data-driven marketing campaigns powered by behavioral science.',
    url: 'https://yourone.world',
    siteName: 'One World Studio',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'One World Studio | Digital Product & Growth Studio',
    description: 'Award-winning App Building, Website Development, and Digital Marketing.',
    creator: '@oneworldstudio',
  },
  robots: { index: true, follow: true },
  metadataBase: new URL('https://yourone.world'),
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400;1,600&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#030712" />
        <meta name="color-scheme" content="dark" />
      </head>
      <body className="bg-[#030712] text-slate-100 font-sans antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
        {children}
      </body>
    </html>
  )
}

