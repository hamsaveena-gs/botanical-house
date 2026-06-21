'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useCartItems, useTotalPrice } from '@/features/cart/hooks/useCart'
import { shippingSchema } from '@/lib/schemas'
import Heading from '@/components/ui/Heading'
import ShippingForm from './components/ShippingForm'
import CheckoutOrderSummary from './components/CheckoutOrderSummary'
import type { ShippingData } from '@/lib/schemas'
import type { Page, FormContent } from '@/types'

export default function CheckoutPage({ cmsPage, formContent }: { cmsPage?: Page; formContent?: FormContent | null }) {
  const router = useRouter()
  const items = useCartItems()
  const totalPrice = useTotalPrice()
  const [form, setForm] = useState<ShippingData>({
    name: '', email: '', phone: '', address: '', city: '', pincode: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof ShippingData, string>>>({})

  useEffect(() => {
    if (items.length === 0) router.replace('/cart')
  }, [items.length, router])

  if (items.length === 0) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = shippingSchema.safeParse(form)
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors
      setErrors({
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        phone: fieldErrors.phone?.[0],
        address: fieldErrors.address?.[0],
        city: fieldErrors.city?.[0],
        pincode: fieldErrors.pincode?.[0],
      })
      return
    }
    const shipping = totalPrice >= 500 ? 0 : 49
    const order = {
      id: Date.now().toString(),
      items: [...items],
      shipping,
      total: totalPrice + shipping,
      customer: result.data,
      date: new Date().toISOString(),
    }

    fetch('/api/send-confirmation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: result.data.email,
        name: result.data.name,
        orderId: order.id,
        items: order.items,
        total: order.total,
      }),
    })

    localStorage.setItem('bh-last-order', JSON.stringify(order))
    window.location.href = '/order-confirmation'
  }

  return (
    <div className='mx-auto max-w-4xl px-4 pt-24 pb-12 sm:pt-28 sm:pb-20'>
      <Heading as='h1' variant='page'>{cmsPage?.fields.title ?? 'Checkout'}</Heading>
      <form onSubmit={handleSubmit} className='mt-8 grid gap-8 lg:grid-cols-[1fr_380px]' noValidate>
        <ShippingForm form={form} errors={errors} onChange={handleChange} formContent={formContent} />
        <CheckoutOrderSummary items={items} totalPrice={totalPrice} allFilled={!Object.values(errors).some(Boolean)} />
      </form>
    </div>
  )
}
