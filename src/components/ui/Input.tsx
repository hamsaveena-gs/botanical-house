'use client'

import Text from '@/components/ui/Text'

interface InputProps {
  label?: string
  required?: boolean
  id: string
  name: string
  type?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
}

const cls = 'w-full rounded-lg border border-neutral-300 px-4 py-2.5 text-sm outline-none transition-colors focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20'

export default function Input({
  label,
  required,
  id,
  name,
  type = 'text',
  value,
  onChange,
  className = '',
}: InputProps) {
  return (
    <div className={className}>
      {label && (
        <Text as='label' htmlFor={id} variant='label' className='mb-1.5 block'>
          {label} {required && '*'}
        </Text>
      )}
      <input id={id} name={name} type={type} value={value} onChange={onChange} className={cls} />
    </div>
  )
}


