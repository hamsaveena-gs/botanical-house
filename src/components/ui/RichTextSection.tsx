import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'
import type { RichTextSectionFields } from '@/types'

const BG_MAP: Record<string, string> = {
  blue: 'bg-blue-600',
  'royal-blue': 'bg-blue-600',
  dark: 'bg-neutral-800',
  charcoal: 'bg-neutral-800',
  indigo: 'bg-indigo-600',
  'deep-indigo': 'bg-indigo-600',
  emerald: 'bg-emerald-700',
  'emerald-green': 'bg-emerald-700',
  light: 'bg-neutral-100',
  'light-gray': 'bg-neutral-100',
  'light-grey': 'bg-neutral-100',
  white: 'bg-white',
}

const DARK_BG = new Set(['blue', 'dark', 'indigo', 'emerald', 'royal-blue', 'charcoal', 'deep-indigo', 'emerald-green'])

function normalize(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, '-')
}

export default function RichTextSection({ fields }: { fields: RichTextSectionFields }) {
  const bg = normalize(fields.backgroundColor ?? '')
  const bgClass = BG_MAP[bg] ?? ''
  const isDark = DARK_BG.has(bg)

  return (
    <section className={`${bgClass} px-4 py-16 sm:py-24`}>
      <div className='mx-auto max-w-2xl'>
        {fields.heading && (
          <Heading as='h2' variant='section' className={`mb-8 ${isDark ? 'text-white' : ''}`}>
            {fields.heading}
          </Heading>
        )}
        {fields.body ? (
          <Text as='div' variant='body' className={`whitespace-pre-line ${isDark ? 'text-white' : ''}`}>
            {documentToReactComponents(fields.body as Parameters<typeof documentToReactComponents>[0]) as React.ReactNode}
          </Text>
        ) : null}
      </div>
    </section>
  )
}
