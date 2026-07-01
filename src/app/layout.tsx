import type { Metadata } from 'next'
import { getSiteSettings } from '@/lib/contentful'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AnalyticsProvider from '@/components/AnalyticsProvider'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Botanical House — Bring Nature Home',
    template: '%s | Botanical House',
  },
  description: 'Premium plants delivered to your doorstep',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings()

  return (
      <html lang='en' data-scroll-behavior='smooth'>
      <body className='flex min-h-screen flex-col antialiased' suppressHydrationWarning>
        <Header settings={settings ?? undefined} />
        <main className='flex-1'>{children}</main>
        <Footer settings={settings ?? undefined} />
        <AnalyticsProvider />
      </body>
    </html>
  )
}
