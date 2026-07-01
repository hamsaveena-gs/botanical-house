'use client'

import { useState } from 'react'
import { AnalyticsEvents } from '@/lib/analytics'
import Button from './Button'
import Text from './Text'

interface Props {
  plantTitle: string
  plantSlug: string
}

export default function NotifyMe({ plantTitle, plantSlug }: Props) {
  const [showForm, setShowForm] = useState(false)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch('/api/notify-me', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, plantTitle, plantSlug }),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
      AnalyticsEvents.notifyMe({ name: plantTitle })
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <Text variant='caption' className='block text-center text-emerald-700'>
        We&apos;ll let you know when it&apos;s back!
      </Text>
    )
  }

  if (!showForm) {
    return (
      <Button
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setShowForm(true) }}
        variant='outline'
        size='md'
        className='w-full'
      >
        Notify Me
      </Button>
    )
  }

  return (
    <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()} onMouseDown={(e) => e.stopPropagation()} noValidate>
      <div className='flex gap-2'>
        <input
          type='email'
          placeholder='Enter your email'
          aria-label='Email address for restock notification'
          value={email}
          onChange={(e) => { setEmail(e.target.value); setStatus('idle') }}
          onClick={(e) => { e.preventDefault(); e.stopPropagation() }}
          onMouseDown={(e) => e.stopPropagation()}
          className='min-w-0 flex-1 rounded-full border border-neutral-300 px-4 py-2 text-sm outline-none transition-all focus:border-emerald-700'
          autoFocus
          required
        />
        <Button type='submit' size='md' disabled={status === 'loading'}>
          {status === 'loading' ? 'Sending...' : 'Notify'}
        </Button>
      </div>
      {status === 'error' && (
        <Text variant='caption' className='mt-1 block text-rose-500' role='alert'>
          Something went wrong. Try again.
        </Text>
      )}
    </form>
  )
}
