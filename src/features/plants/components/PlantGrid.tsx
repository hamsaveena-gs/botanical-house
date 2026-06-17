import type { Plant } from '@/types'
import PlantCard from '@/components/ui/PlantCard'
import Text from '@/components/ui/Text'

interface PlantGridProps {
  plants: Plant[]
}

export default function PlantGrid({ plants }: PlantGridProps) {
  return (
    <>
      <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-4'>
        {plants.map((plant) => (
          <PlantCard key={plant.sys.id} plant={plant} />
        ))}
      </div>
      {plants.length === 0 && (
        <Text variant='muted' className='py-20 text-center text-neutral-300'>
          No plants found.
        </Text>
      )}
    </>
  )
}
