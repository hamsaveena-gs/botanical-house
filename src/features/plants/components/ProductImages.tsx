import Image from 'next/image'
import type { ContentfulAsset } from '@/types'

interface ProductImagesProps {
  images: (ContentfulAsset | undefined)[]
  title: string
}

export default function ProductImages({ images, title }: ProductImagesProps) {
  return (
    <div className='grid gap-4'>
      {images.map((img, i) => {
        const url = img?.fields?.file?.url ? `https:${img.fields.file.url}` : ''
        return url ? (
          <div key={i} className='relative aspect-[4/5] w-full overflow-hidden rounded-2xl'>
            <Image
              src={url}
              alt={`${title} ${i + 1}`}
              fill
              sizes='(max-width: 768px) 100vw, 50vw'
              className='object-cover'
              priority={i === 0}
            />
          </div>
        ) : null
      })}
    </div>
  )
}
