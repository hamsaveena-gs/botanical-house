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
}: TextareaProps) {
  return (
    <div className={className}>
      {label && (
        <Text as='label' htmlFor={id} variant='label' className='mb-1.5 block'>
          {label} {required && '*'}
        </Text>
      )}
      <textarea id={id} name={name} rows={rows} value={value} onChange={onChange} className={cls} />
    </div>
  )
}
