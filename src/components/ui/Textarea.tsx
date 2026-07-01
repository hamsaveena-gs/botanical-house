'use client'

import Text from '@/components/ui/Text'

interface TextareaProps {
  label?: string
  required?: boolean
  id: string
  name: string
  rows?: number
  value: string
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  className?: string
  error?: string
}

const cls = 'w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 resize-y'

export default function Textarea({
  label,
  required,
  id,
  name,
  rows = 5,
  value,
  onChange,
  className = '',
  error,
}: TextareaProps) {
  const errorId = `${id}-error`
  return (
    <div className={className}>
      {label && (
        <Text as='label' htmlFor={id} variant='label' className='mb-1.5 block'>
          {label}
        </Text>
      )}
      <textarea
        id={id}
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        className={`${cls} ${error ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20' : ''}`}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        aria-required={required || undefined}
      />
      {error && (
        <Text as='span' variant='caption' id={errorId} role='alert' className='mt-1 block text-rose-500'>
          {error}
        </Text>
      )}
    </div>
  )
}
