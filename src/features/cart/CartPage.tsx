'use client'

import { useCartItems, useTotalPrice, useCartActions } from './hooks/useCart'
import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'
import EmptyCart from './components/EmptyCart'
import CartItem from './components/CartItem'
import OrderSummary from './components/OrderSummary'
import type { Page } from '@/types'

export default function CartPage({ cmsPage }: { cmsPage?: Page }) {
  const items = useCartItems()
  const totalPrice = useTotalPrice()
  const { removeItem, updateQuantity } = useCartActions()

  if (items.length === 0) return <EmptyCart />

  return (
    <div className='mx-auto max-w-4xl px-4 pt-24 pb-12 sm:pt-28 sm:pb-20'>
      <Heading as='h1' variant='page' className='text-3xl font-bold sm:text-3xl'>
        {cmsPage?.fields.title ?? 'Shopping Cart'}
      </Heading>
      <Text variant='muted' className='mt-1 text-neutral-500'>
        {items.reduce((s, i) => s + i.quantity, 0)} items
      </Text>

      <div className='mt-8 grid gap-8 lg:grid-cols-[1fr_320px]'>
        <div>
          {items.map((item) => (
            <CartItem key={item.id} item={item} onUpdateQuantity={updateQuantity} onRemove={removeItem} />
          ))}
        </div>
        <OrderSummary totalPrice={totalPrice} />
      </div>
    </div>
  )
}
