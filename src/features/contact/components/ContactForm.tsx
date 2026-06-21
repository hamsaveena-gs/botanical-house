'use client'

import { useState } from 'react'
import { contactSchema } from '@/lib/schemas'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Button from '@/components/ui/Button'
import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'
import type { FormContent } from '@/types'

interface ContactFormProps {
  formContent?: FormContent | null
}

const DEFAULTS = {
  firstNameLabel: 'Name',
  emailLabel: 'Email',
  phoneLabel: 'Phone',
  messageLabel: 'Message',
  submitBtnText: 'Send Message',
}

export default function ContactForm({ formContent }: ContactFormProps) {
  const l = formContent?.fields ?? DEFAULTS

  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setErrors(prev => ({ ...prev, [e.target.name]: undefined }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = contactSchema.safeParse(form)
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors
      setErrors({
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        phone: fieldErrors.phone?.[0],
        message: fieldErrors.message?.[0],
      })
      return
    }
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('sent')
      setForm({ name: '', email: '', phone: '', message: '' })
      setErrors({})
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className='rounded-xl border border-emerald-200 bg-emerald-50 p-8 text-center'>
        <Text as='span' variant='body' className='text-4xl'>🌿</Text>
        <Heading as='h2' variant='subsection' className='mt-4'>Message Sent!</Heading>
        <Text variant='muted' className='mt-2'>We&apos;ll get back to you soon.</Text>
        <Button className='mt-6' onClick={() => setStatus('idle')}>Send Another</Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-6' noValidate>
      <div>
        <Input label={l.firstNameLabel} id='name' name='name' value={form.name} onChange={handleChange} />
        {errors.name && <Text variant='caption' className='mt-1 text-rose-500'>{errors.name}</Text>}
      </div>
      <div>
        <Input label={l.emailLabel} id='email' name='email' type='email' value={form.email} onChange={handleChange} />
        {errors.email && <Text variant='caption' className='mt-1 text-rose-500'>{errors.email}</Text>}
      </div>
      <div>
        <Input label={l.phoneLabel} id='phone' name='phone' type='tel' value={form.phone} onChange={handleChange} />
        {errors.phone && <Text variant='caption' className='mt-1 text-rose-500'>{errors.phone}</Text>}
      </div>
      <div>
        <Textarea label={l.messageLabel} id='message' name='message' rows={5} value={form.message} onChange={handleChange} />
        {errors.message && <Text variant='caption' className='mt-1 text-rose-500'>{errors.message}</Text>}
      </div>
      <Button type='submit' disabled={status === 'sending'} className='w-full'>
        {status === 'sending' ? 'Sending...' : l.submitBtnText}
      </Button>
      {status === 'error' && (
        <Text variant='muted' className='text-center text-red-500'>
          Something went wrong. Please try again.
        </Text>
      )}
    </form>
  )
}
