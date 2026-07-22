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
    <html lang="en" className="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300..800;1,9..40,300..800&family=Outfit:wght@300;400;500;600;700;800&family=Fraunces:ital,opsz,wght@0,9..144,400..700;1,9..144,400..700&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#fcf9f2" />
        <meta name="color-scheme" content="light" />
      </head>
      <body className="bg-[#fcf9f2] text-stone-800 font-sans antialiased selection:bg-amber-500/20 selection:text-amber-900">
        {children}
      </body>
    </html>
  )
}



