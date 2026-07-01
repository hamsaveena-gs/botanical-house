import type { Category } from '@/types'
import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'

interface ProductInfoProps {
  title: string
  category?: Category[]
  tags?: string[]
  price: number
  originalPrice: number | null
  salePrice: number
  isOnSale: boolean
  inStock?: boolean
}

export default function ProductInfo({ title, category, tags, originalPrice, salePrice, isOnSale, inStock }: ProductInfoProps) {
  return (
    <>
      {category && category.length > 0 && (
        <div className='mb-2 flex flex-wrap gap-2'>
          {category.map((cat) => (
            <Text key={cat.sys.id} as='span' className='rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700'>
              {cat.fields.title}
            </Text>
          ))}
        </div>
      )}

      <div className='flex items-center gap-3'>
        <Heading as='h1' variant='section'>{title}</Heading>
        {isOnSale && <Text as='span' className='rounded-full bg-rose-500 px-3 py-0.5 text-xs font-semibold text-white'>Sale</Text>}
      </div>

      <div className='mt-4'>
        <Text variant='label' className='text-neutral-500'>Price</Text>
        <div className='mt-1 flex items-baseline gap-3'>
          {isOnSale && <Text as='span' className='text-lg text-neutral-300 line-through'>₹{originalPrice!.toLocaleString()}</Text>}
          <Text as='span' className='text-3xl font-bold text-neutral-900'>₹{salePrice.toLocaleString()}</Text>
        </div>
        {isOnSale && (
          <Text as='p' className='mt-1 text-sm font-medium text-emerald-700'>
            Save ₹{(originalPrice! - salePrice).toLocaleString()} ({Math.round((originalPrice! - salePrice) / originalPrice! * 100)}% off)
          </Text>
        )}
      </div>

      {tags && tags.length > 0 && (
        <div className='mt-4 flex flex-wrap gap-2'>
          {tags.map((tag) => (
            <Text key={tag} as='span' className='rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600'>{tag}</Text>
          ))}
        </div>
      )}

      {!inStock && (
        <Text as='span' className='mt-3 inline-block rounded-full bg-rose-50 px-4 py-1.5 text-sm font-semibold text-rose-600'>
          Out of Stock
        </Text>
      )}
    </>
  )
}
