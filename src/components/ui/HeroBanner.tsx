import Image from 'next/image'
import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'
import Button from '@/components/ui/Button'
import type { HeroBannerFields } from '@/types'

function normalize(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, '-')
}

export default function HeroBanner({ fields }: { fields: HeroBannerFields }) {
  const bg = normalize(fields.ctaBackgroundColor ?? '')
  const isEmerald = bg === 'emerald' || bg === 'emerald-green'

  const bgUrl = fields.backgroundImage?.fields?.file?.url
    ? `https:${fields.backgroundImage.fields.file.url}`
    : ''

  return (
    <section className='relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-neutral-900'>
      {bgUrl && <Image src={bgUrl} alt='' fill sizes='100vw' priority className='object-cover opacity-50' />}
      <div className='relative z-10 mx-auto max-w-4xl px-4 text-center text-white'>
        <Heading as='h1' variant='hero' className='mb-4'>{fields.heading}</Heading>
        {fields.subHeading && (
          <Text as='p' className='mx-auto mb-8 max-w-2xl text-lg text-neutral-200 whitespace-pre-line sm:text-xl'>
            {fields.subHeading}
          </Text>
        )}
        {fields.ctaText && fields.ctaLink && (
          <Button href={fields.ctaLink} variant={isEmerald ? 'primary' : 'white'} size='md'>{fields.ctaText}</Button>
        )}
      </div>
    </section>
  )
}
