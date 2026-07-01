'use client'

import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'
import Input from '@/components/ui/Input'
import type { ShippingData } from '@/lib/schemas'
import type { FormContent } from '@/types'

interface ShippingFormProps {
  form: ShippingData
  errors?: Partial<Record<keyof ShippingData, string>>
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  formContent?: FormContent | null
}

const LABEL_MAP: Record<keyof ShippingData, keyof FormContent['fields']> = {
  name: 'firstNameLabel',
  email: 'emailLabel',
  phone: 'phoneLabel',
  pincode: 'pincodeLabel',
  address: 'addressLabel',
  city: 'cityLabel',
}

const DEFAULTS: Record<keyof ShippingData, string> = {
  name: 'Full Name',
  email: 'Email',
  phone: 'Phone',
  pincode: 'Pincode',
  address: 'Address',
  city: 'City',
}

const FIELDS: { name: keyof ShippingData; type: string; full: boolean }[] = [
  { name: 'name', type: 'text', full: false },
  { name: 'email', type: 'email', full: false },
  { name: 'phone', type: 'tel', full: false },
  { name: 'pincode', type: 'text', full: false },
  { name: 'address', type: 'text', full: true },
  { name: 'city', type: 'text', full: true },
]

export default function ShippingForm({ form, errors = {}, onChange, formContent }: ShippingFormProps) {
  const l = formContent?.fields ?? {}

  function label(name: keyof ShippingData): string {
    return (l as Record<string, string | undefined>)[LABEL_MAP[name]] ?? DEFAULTS[name]
  }

  return (
    <div className='flex flex-col gap-6'>
      <Heading as='h2' variant='subsection'>Shipping Details</Heading>
      <div className='grid grid-cols-2 gap-4'>
        {FIELDS.map(({ name, type, full }) => (
          <div key={name} className={full ? 'col-span-2 flex flex-col gap-1.5' : 'flex flex-col gap-1.5'}>
            <Input id={name} name={name} label={label(name)} type={type} value={form[name]} onChange={onChange} error={errors[name]} className={full ? 'col-span-2' : ''} />
            {errors[name] && <Text variant='caption' className='text-rose-500' id={`${name}-error`} role='alert'>{errors[name]}</Text>}
          </div>
        ))}
      </div>
    </div>
  )
}
