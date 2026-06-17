import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Heading from '@/components/ui/Heading'

interface ProductDescriptionProps {
  description: unknown
}

export default function ProductDescription({ description }: ProductDescriptionProps) {
  return (
    <div className='mt-10'>
      <Heading as='h2' variant='subsection'>About</Heading>
      <div className='mt-3 whitespace-pre-line text-neutral-600'>
        {description ? documentToReactComponents(description as Parameters<typeof documentToReactComponents>[0]) as React.ReactNode : null}
      </div>
    </div>
  )
}
