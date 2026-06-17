import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'
import Button from '@/components/ui/Button'
import type { CtaBlockFields } from '@/types'

const BG_MAP: Record<string, string> = {
  blue: 'bg-blue-600',
  dark: 'bg-neutral-800',
  indigo: 'bg-indigo-600',
  emerald: 'bg-emerald-600',
}

export default function CtaBlock({ fields }: { fields: CtaBlockFields }) {
  const bgClass = BG_MAP[fields.backgroundColor ?? ''] ?? 'bg-neutral-800'

  return (
    <section className={`${bgClass} px-4 py-16 text-center text-white sm:py-24`}>
      <div className='mx-auto max-w-2xl'>
        <Heading as='h2' variant='section' className='mb-4 text-white'>{fields.heading}</Heading>
        {fields.description && (
          <Text as='p' className='mb-8 text-lg text-neutral-200 whitespace-pre-line'>{fields.description}</Text>
        )}
        <Button href={fields.buttonUrl} variant='white' size='md'>{fields.buttonText}</Button>
      </div>
    </section>
  )
}
