'use client'

import Link from 'next/link'
import Image from 'next/image'
import Text from '@/components/ui/Text'
import { memo, useState } from 'react'

interface CartItemData {
  id: string
  title: string
  price: number
  image: string
  slug: string
  quantity: number
}

interface CartItemProps {
  item: CartItemData
  onUpdateQuantity: (id: string, qty: number) => void
  onRemove: (id: string) => void
}

export default memo(CartItem, (prev, next) => prev.item.id === next.item.id && prev.item.quantity === next.item.quantity)

function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const [showMax, setShowMax] = useState(false)

  const handleIncrease = () => {
    if (item.quantity >= 2) {
      setShowMax(true)
      setTimeout(() => setShowMax(false), 2000)
      return
    }
    setShowMax(false)
    onUpdateQuantity(item.id, item.quantity + 1)
  }

  const handleDecrease = () => {
    setShowMax(false)
    onUpdateQuantity(item.id, item.quantity - 1)
  }

  return (
    <div className='flex gap-4 border-b border-neutral-100 py-5'>
      <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-neutral-100'>
        {item.image && <Image src={item.image} alt={item.title} width={96} height={96} className='h-full w-full object-cover' />}
      </div>
      <div className='flex flex-1 flex-col justify-between'>
        <div>
          <Link href={`/plants/${item.slug}`} className='font-semibold text-neutral-900 transition-colors hover:text-emerald-600'>
            {item.title}
          </Link>
          <Text variant='small' className='mt-0.5 text-sm text-neutral-300'>
            ₹{item.price.toLocaleString()} each
          </Text>
        </div>
        <div className='flex flex-col gap-1'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3 rounded-full border border-neutral-200 px-3 py-1'>
              <button onClick={handleDecrease} className='flex h-6 w-6 items-center justify-center rounded-full text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100'>−</button>
              <Text as='span' className='w-6 text-center text-sm font-semibold text-neutral-900'>{item.quantity}</Text>
              <button onClick={handleIncrease} disabled={item.quantity >= 2} className='flex h-6 w-6 items-center justify-center rounded-full text-sm font-medium text-neutral-600 transition-colors hover:bg-neutral-100'>+</button>
            </div>
            <div className='flex items-center gap-4'>
              <Text as='span' className='font-semibold text-neutral-900'>₹{(item.price * item.quantity).toLocaleString()}</Text>
              <button onClick={() => onRemove(item.id)} className='text-sm text-neutral-300 transition-colors hover:text-rose-500'>✕</button>
            </div>
          </div>
          {showMax && <Text variant='caption' className='text-rose-500'>Max 2 per plant</Text>}
        </div>
      </div>
    </div>
  )
}
