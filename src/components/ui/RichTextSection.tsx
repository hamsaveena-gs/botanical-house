import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Heading from '@/components/ui/Heading'
import type { RichTextSectionFields } from '@/types'

export default function RichTextSection({ fields }: { fields: RichTextSectionFields }) {
  return (
    <section className='mx-auto max-w-2xl px-4 py-16 sm:py-24'>
      {fields.heading && <Heading as='h2' variant='section' className='mb-8'>{fields.heading}</Heading>}
      {fields.body ? (
        <div className='whitespace-pre-line'>
          {documentToReactComponents(fields.body as Parameters<typeof documentToReactComponents>[0]) as React.ReactNode}
        </div>
      ) : null}
    </section>
  )
}
