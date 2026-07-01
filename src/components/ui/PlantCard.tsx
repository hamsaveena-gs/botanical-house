'use client'

import { memo, useMemo } from 'react'

import Link from 'next/link'
import Image from 'next/image'
import { useCartItem, useCartActions } from '@/features/cart/hooks/useCart'
import type { Plant } from '@/types'
import Button from './Button'
import Heading from './Heading'
import Text from './Text'
import NotifyMe from './NotifyMe'

export default memo(PlantCard)

function PlantCard({ plant }: { plant: Plant }) {
  const cartItem = useCartItem(plant.sys.id)
  const { addItem, updateQuantity } = useCartActions()
  const { title, slug, image, price, compareAtPrice, category, featured, inStock } = plant.fields
  const qty = cartItem?.quantity ?? 0
  const imgUrl = useMemo(
    () => (image?.fields?.file?.url ? `https:${image.fields.file.url}` : ''),
    [image],
  )
  const { isOnSale, displayPrice, originalPrice } = useMemo(() => {
    const onSale = compareAtPrice != null && compareAtPrice !== price
    return {
      isOnSale: onSale,
      displayPrice: onSale ? Math.min(price, compareAtPrice!) : price,
      originalPrice: onSale ? Math.max(price, compareAtPrice!) : null,
    }
  }, [price, compareAtPrice])

  return (
    <Link href={`/plants/${slug?.trim()}`} className='group flex flex-col'>
      <div className='relative mb-3 aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-100 shadow-md transition-shadow duration-300 group-hover:shadow-xl'>
          {imgUrl && (
            <Image src={imgUrl} alt={title} fill sizes='(max-width: 640px) 50vw, 25vw' className='object-cover transition-transform duration-500 group-hover:scale-105' />
          )}
        {isOnSale && (
          <Text as='span' role='status' className='absolute right-3 top-3 rounded-full bg-rose-600 px-3 py-1 text-xs font-semibold text-white shadow-sm'>
            Sale
          </Text>
        )}
        {featured && (
          <Text as='span' role='status' className='absolute left-3 top-3 rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white shadow-sm'>
            Best Seller
          </Text>
        )}
        {!inStock && (
          <div className='absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-[2px]'>
            <Text as='span' role='status' className='rounded-full bg-neutral-800 px-4 py-1.5 text-sm font-semibold text-white'>
              Out of Stock
            </Text>
          </div>
        )}
      </div>
      <div className='flex flex-1 flex-col px-1 pb-3'>
        {category && category.length > 0 && (
          <div className='mb-1 flex flex-wrap gap-1.5'>
            {category.map((cat) => (
              <Text key={cat.sys.id} as='span' className='rounded-full bg-neutral-100 px-2 py-0.5 text-xs font-medium text-neutral-600'>
                {cat.fields.title}
              </Text>
            ))}
          </div>
        )}
        <Heading as='h3' variant='subsection' className='text-base font-semibold text-neutral-900'>{title}</Heading>
        <div className='mt-1 flex items-center gap-2'>
          <Text as='span' className='text-lg font-bold text-neutral-900'>₹{displayPrice.toLocaleString()}</Text>
          {originalPrice && (
            <Text as='span' className='text-sm text-neutral-400 line-through'>₹{originalPrice.toLocaleString()}</Text>
          )}
        </div>
        <div className='mt-auto pt-3'>
          {!inStock ? (
            <div onClick={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()}>
              <NotifyMe plantTitle={title} plantSlug={slug?.trim() ?? ''} />
            </div>
          ) : qty === 0 ? (
            <Button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); addItem({ id: plant.sys.id, title, price, image: imgUrl, slug: slug?.trim() ?? '' }) }}
              size='md'
              className='w-full'
              aria-label={`Add ${title} to cart`}
            >
              Add to Cart
            </Button>
          ) : (
            <div className='flex w-full items-center justify-center gap-3 rounded-full border border-neutral-200 py-1.5'>
              <Button
                variant='ghost'
                size='sm'
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); updateQuantity(plant.sys.id, qty - 1) }}
                className='h-7 w-7 p-0'
                aria-label={`Decrease quantity of ${title}`}
              >
                −
              </Button>
              <Text as='span' className='w-6 text-center text-sm font-semibold text-neutral-900'>{qty}</Text>
              <Button
                variant='ghost'
                size='sm'
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); updateQuantity(plant.sys.id, qty + 1) }}
                disabled={qty >= 2}
                className='h-7 w-7 p-0'
                aria-label={`Increase quantity of ${title}`}
              >
                +
              </Button>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
