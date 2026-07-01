'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useCartActions } from '@/features/cart/hooks/useCart'
import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'
import Button from '@/components/ui/Button'

export default function OrderConfirmationPage() {
  const [loaded, setLoaded] = useState(false)
  const [order, setOrder] = useState<{ id: string; name: string; email: string; total: number; date: string } | null>(null)
  const { clearCart } = useCartActions()

  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect */
    const saved = localStorage.getItem('bh-last-order')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setOrder({
          id: parsed.id,
          name: parsed.customer.name,
          email: parsed.customer.email,
          total: parsed.total,
          date: parsed.date,
        })
        clearCart()
      } catch {
        // ignore parse errors
      }
    }
    setLoaded(true)
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [clearCart])

  if (!loaded) return null

  if (!order) {
    return (
      <div className='flex flex-1 items-center justify-center px-4 pt-24 pb-12 sm:pt-28 sm:pb-20'>
        <div className='flex max-w-md flex-col items-center text-center'>
          <Heading as='h1' variant='section'>No order found</Heading>
          <Text variant='muted'>Start shopping to place your first order.</Text>
          <Link href='/plants'><Button className='mt-6'>Browse Plants</Button></Link>
        </div>
      </div>
    )
  }

  const details: [string, string][] = [
    ['Order ID', order.id],
    ['Name', order.name],
    ['Email', order.email],
    ['Total', `₹${order.total.toLocaleString()}`],
    ['Date', new Date(order.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })],
  ]

  return (
    <div className='flex flex-1 items-center justify-center px-4 pt-24 pb-12 sm:pt-28 sm:pb-20'>
      <div className='flex max-w-md flex-col items-center text-center'>
        <div className='mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-700 text-2xl text-white'>✓</div>
        <Heading as='h1' variant='section'>Order Confirmed!</Heading>
        <Text variant='muted'>Thank you, {order.name}. Your order has been placed.</Text>
        <div className='mt-6 w-full rounded-xl border border-neutral-200 p-5 flex flex-col gap-3'>
          {details.map(([label, value]) => (
            <div key={label} className='flex items-center justify-between'>
              <Text variant='label'>{label}</Text>
              <Text variant='body'>{value}</Text>
            </div>
          ))}
        </div>
        <Text variant='caption' className='mt-4 text-emerald-700'>
          A confirmation email has been sent to {order.email}.
        </Text>
        <div className='mt-6 flex gap-3'>
          <Link href='/plants'><Button>Continue Shopping</Button></Link>
          <Link href='/'><Button variant='outline'>Go Home</Button></Link>
        </div>
      </div>
    </div>
  )
}
