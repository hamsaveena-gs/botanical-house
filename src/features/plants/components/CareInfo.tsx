import Text from '@/components/ui/Text'

interface CareInfoProps {
  careLevel?: string
  light?: string
  water?: string
  petFriendly?: boolean
}

export default function CareInfo({ careLevel, light, water, petFriendly }: CareInfoProps) {
  return (
    <div className='mt-8 grid grid-cols-2 gap-4 rounded-2xl bg-neutral-50 p-6'>
      {careLevel && (
        <div>
          <Text variant='label' className='text-neutral-400'>Care</Text>
          <Text variant='body' className='mt-1 font-medium text-neutral-900'>{careLevel}</Text>
        </div>
      )}
      {light && (
        <div>
          <Text variant='label' className='text-neutral-400'>Light</Text>
          <Text variant='body' className='mt-1 font-medium text-neutral-900'>{light}</Text>
        </div>
      )}
      {water && (
        <div>
          <Text variant='label' className='text-neutral-400'>Water</Text>
          <Text variant='body' className='mt-1 font-medium text-neutral-900'>{water}</Text>
        </div>
      )}
      {petFriendly !== undefined && (
        <div>
          <Text variant='label' className='text-neutral-400'>Pet Friendly</Text>
          <Text variant='body' className='mt-1 font-medium text-neutral-900'>{petFriendly ? 'Yes' : 'No'}</Text>
        </div>
      )}
    </div>
  )
}
