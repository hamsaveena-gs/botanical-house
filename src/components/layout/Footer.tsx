import Text from '@/components/ui/Text'
import type { SiteSettings } from '@/types'

export default function Footer({ settings }: { settings?: SiteSettings }) {
  const footerText = settings?.fields?.footerText ?? 'Botanical House. All rights reserved.'
  return (
    <footer className='border-t border-neutral-200 bg-neutral-50'>
      <div className='mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row'>
        <Text variant='muted' className='text-neutral-500'>
          &copy; {new Date().getFullYear()} {footerText}
        </Text>
      </div>
    </footer>
  )
}
