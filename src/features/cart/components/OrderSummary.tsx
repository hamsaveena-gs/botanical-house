'use client'

import { memo } from 'react'
import Link from 'next/link'
import Text from '@/components/ui/Text'
import Heading from '@/components/ui/Heading'
import Button from '@/components/ui/Button'

interface OrderSummaryProps {
  totalPrice: number
}

export default memo(OrderSummary)

function OrderSummary({ totalPrice }: OrderSummaryProps) {
  const shipping = totalPrice >= 500 ? 0 : 49
  const grandTotal = totalPrice + shipping

  return (
    <div className='h-fit rounded-2xl border border-neutral-200 bg-neutral-50 p-6'>
      <Heading as='h2' variant='subsection'>Order Summary</Heading>
      <div className='mt-4 flex flex-col gap-3'>
        <div className='flex justify-between'>
          <Text as='span' variant='body'>Subtotal</Text>
          <Text as='span' variant='body'>₹{totalPrice.toLocaleString()}</Text>
        </div>
        <div className='flex justify-between'>
          <Text as='span' variant='body'>Shipping</Text>
          <Text as='span' variant='body' className={shipping === 0 ? 'text-emerald-600' : ''}>
            {shipping === 0 ? 'Free' : `₹${shipping}`}
          </Text>
        </div>
        {shipping > 0 && (
          <Text variant='caption' className='text-neutral-400'>
            Free shipping on orders above ₹500
          </Text>
        )}
        <div className='border-t border-neutral-200 pt-3'>
          <div className='flex justify-between font-semibold'>
            <Text as='span' variant='body'>Total</Text>
            <Text as='span' variant='body'>₹{grandTotal.toLocaleString()}</Text>
          </div>
        </div>
      </div>
      <Link href='/checkout'>
        <Button size='lg' className='mt-6 w-full'>
          Checkout
        </Button>
      </Link>
      <Link href='/plants' className='mt-3 block text-center text-sm text-neutral-500 underline underline-offset-2 transition-colors hover:text-neutral-900'>
        Continue Shopping
      </Link>
    </div>
  )
}
