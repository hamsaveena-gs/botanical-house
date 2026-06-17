'use client'

import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'
import Input from '@/components/ui/Input'
import type { ShippingData } from '@/lib/schemas'

interface ShippingFormProps {
  form: ShippingData
  errors?: Partial<Record<keyof ShippingData, string>>
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const FIELDS: { name: keyof ShippingData; label: string; type: string; full: boolean }[] = [
  { name: 'name', label: 'Full Name', type: 'text', full: false },
  { name: 'email', label: 'Email', type: 'email', full: false },
  { name: 'phone', label: 'Phone', type: 'tel', full: false },
  { name: 'pincode', label: 'Pincode', type: 'text', full: false },
  { name: 'address', label: 'Address', type: 'text', full: true },
  { name: 'city', label: 'City', type: 'text', full: true },
]

export default function ShippingForm({ form, errors = {}, onChange }: ShippingFormProps) {
  return (
    <div className='flex flex-col gap-6'>
      <Heading as='h2' variant='subsection'>Shipping Details</Heading>
      <div className='grid grid-cols-2 gap-4'>
        {FIELDS.map(({ name, label, type, full }) => (
          <div key={name} className={full ? 'col-span-2 flex flex-col gap-1.5' : 'flex flex-col gap-1.5'}>
            <Input id={name} name={name} label={label} type={type} required value={form[name]} onChange={onChange} className={full ? 'col-span-2' : ''} />
            {errors[name] && <Text variant='caption' className='text-rose-500'>{errors[name]}</Text>}
          </div>
        ))}
      </div>
    </div>
  )
}
