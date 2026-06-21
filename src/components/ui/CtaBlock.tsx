import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'
import Button from '@/components/ui/Button'
import type { CtaBlockFields } from '@/types'

const BG_MAP: Record<string, string> = {
  blue: 'bg-blue-600',
  'royal-blue': 'bg-blue-600',
  dark: 'bg-neutral-800',
  charcoal: 'bg-neutral-800',
  indigo: 'bg-indigo-600',
  'deep-indigo': 'bg-indigo-600',
  emerald: 'bg-emerald-600',
  'emerald-green': 'bg-emerald-600',
  light: 'bg-neutral-100',
  'light-gray': 'bg-neutral-100',
  'light-grey': 'bg-neutral-100',
  white: 'bg-white',
}

const DARK_BG = new Set(['blue', 'dark', 'indigo', 'emerald', 'royal-blue', 'charcoal', 'deep-indigo', 'emerald-green'])

function normalize(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, '-')
}

export default function CtaBlock({ fields }: { fields: CtaBlockFields }) {
  const bg = normalize(fields.backgroundColor ?? '')
  const bgClass = BG_MAP[bg] ?? 'bg-neutral-800'
  const isDark = DARK_BG.has(bg) || bgClass === 'bg-neutral-800'

  return (
    <section className={`${bgClass} px-4 py-16 text-center sm:py-24 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
      <div className='mx-auto max-w-2xl'>
        <Heading as='h2' variant='section' className={`mb-4 ${isDark ? 'text-white' : 'text-neutral-900'}`}>{fields.heading}</Heading>
        {fields.description && (
          <Text as='p' className={`mb-8 text-lg whitespace-pre-line ${isDark ? 'text-neutral-200' : 'text-neutral-600'}`}>{fields.description}</Text>
        )}
        <Button href={fields.buttonUrl} variant={isDark ? 'white' : 'primary'} size='md'>{fields.buttonText}</Button>
      </div>
    </section>
  )
}
