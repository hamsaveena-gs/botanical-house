'use client'

import { useState, useCallback } from 'react'
import { useCartItem, useCartActions } from '@/features/cart/hooks/useCart'
import { AnalyticsEvents } from '@/lib/analytics'
import Button from './Button'
import Text from './Text'
import NotifyMe from './NotifyMe'

interface Props {
  id: string
  title: string
  price: number
  image: string
  slug: string
  inStock?: boolean
}

export default function AddToCart({ id, title, price, image, slug, inStock }: Props) {
  const item = useCartItem(id)
  const { addItem, updateQuantity } = useCartActions()
  const [showMax, setShowMax] = useState(false)
  const qty = item?.quantity ?? 0

  const handleIncrease = useCallback(() => {
    if (qty >= 2) {
      setShowMax(true)
      setTimeout(() => setShowMax(false), 2000)
      return
    }
    updateQuantity(id, qty + 1)
    AnalyticsEvents.addToCart({ id, name: title, price })
  }, [qty, id, title, price, updateQuantity])

  if (!inStock) {
    return <div className='mt-10'><NotifyMe plantTitle={title} plantSlug={slug} /></div>
  }

  if (qty === 0) {
    return (
      <Button
        onClick={() => {
          addItem({ id, title, price, image, slug })
          AnalyticsEvents.addToCart({ id, name: title, price })
        }}
        size='lg'
        className='mt-10 w-full'
        aria-label={`Add ${title} to cart`}
      >
        Add to Cart
      </Button>
    )
  }

  return (
    <div className='mt-10'>
      <div className='flex w-full items-center justify-center gap-4 rounded-full border border-neutral-200 py-3'>
        <Button variant='ghost' size='sm' onClick={() => updateQuantity(id, qty - 1)} className='h-8 w-8 p-0 text-lg' aria-label={`Decrease quantity of ${title}`}>−</Button>
        <Text as='span' className='w-8 text-center text-lg font-semibold text-neutral-900'>{qty}</Text>
        <Button variant='ghost' size='sm' onClick={handleIncrease} disabled={qty >= 2} className='h-8 w-8 p-0 text-lg' aria-label={`Increase quantity of ${title}`}>+</Button>
      </div>
      {showMax && <Text variant='caption' className='mt-2 block text-center text-rose-500'>Max 2 per plant</Text>}
    </div>
  )
}
