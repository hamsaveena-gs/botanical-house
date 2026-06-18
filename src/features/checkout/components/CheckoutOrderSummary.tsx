'use client'

import { memo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Text from '@/components/ui/Text'
import Heading from '@/components/ui/Heading'
import Button from '@/components/ui/Button'

interface CartItem {
  id: string
  title: string
  price: number
  image: string
  quantity: number
}

interface CheckoutOrderSummaryProps {
  items: CartItem[]
  totalPrice: number
  allFilled: boolean
}

export default memo(CheckoutOrderSummary)

function CheckoutOrderSummary({ items, totalPrice, allFilled }: CheckoutOrderSummaryProps) {
  const shipping = totalPrice >= 500 ? 0 : 49
  const grandTotal = totalPrice + shipping

  return (
    <div className='h-fit rounded-2xl border border-neutral-200 bg-neutral-50 p-6'>
      <Heading as='h2' variant='subsection'>Order Summary</Heading>
      <div className='mt-4 flex flex-col gap-3'>
        {items.map((item) => (
          <div key={item.id} className='flex items-center gap-3'>
            <div className='h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-neutral-100'>
              {item.image && <Image src={item.image} alt={item.title} width={48} height={48} className='h-full w-full object-cover' />}
            </div>
            <div className='min-w-0 flex-1'>
              <Text variant='small' className='block truncate font-semibold text-neutral-900'>{item.title}</Text>
              <Text variant='caption' className='text-neutral-300'>Qty: {item.quantity}</Text>
            </div>
            <Text variant='small' className='font-semibold text-neutral-900'>₹{(item.price * item.quantity).toLocaleString()}</Text>
          </div>
        ))}
      </div>
      <div className='mt-4 flex flex-col gap-3'>
        <div className='flex justify-between'>
          <Text as='span' variant='small'>Subtotal</Text>
          <Text as='span' variant='small'>₹{totalPrice.toLocaleString()}</Text>
        </div>
        <div className='flex justify-between'>
          <Text as='span' variant='small'>Shipping</Text>
          <Text as='span' variant='small' className={shipping === 0 ? 'text-emerald-600' : ''}>{shipping === 0 ? 'Free' : `₹${shipping}`}</Text>
        </div>
        <div className='flex justify-between border-t border-neutral-200 pt-3'>
          <Text as='span' variant='body' className='font-semibold text-neutral-900'>Total</Text>
          <Text as='span' variant='body' className='font-semibold text-neutral-900'>₹{grandTotal.toLocaleString()}</Text>
        </div>
      </div>
      <Button type='submit' size='lg' disabled={!allFilled} className='mt-6 w-full'>
        Place Order
      </Button>
      <Link href='/cart' className='mt-3 block text-center text-sm text-neutral-500 underline underline-offset-2 transition-colors hover:text-neutral-900'>
        Back to Cart
      </Link>
    </div>
  )
}
