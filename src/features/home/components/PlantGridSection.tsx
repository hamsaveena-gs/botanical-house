import Link from 'next/link'
import PlantCard from '@/components/ui/PlantCard'
import Heading from '@/components/ui/Heading'
import PlantCarousel from './PlantCarousel'
import type { PlantGridSectionFields } from '@/types'

const GRID_CLASSES: Record<string, string> = {
  'grid-2': 'sm:grid-cols-2',
  'grid-3': 'sm:grid-cols-2 lg:grid-cols-3',
  'grid-4': 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
}

export default function PlantGridSection({ fields }: { fields: PlantGridSectionFields }) {
  if (fields.layout === 'carousel') {
    return <PlantCarousel fields={fields} />
  }

  const gridClass = GRID_CLASSES[fields.layout ?? 'grid-3'] ?? 'sm:grid-cols-2 lg:grid-cols-3'

  return (
    <section className='bg-neutral-50 px-4 py-20 sm:py-28'>
      <div className='mx-auto max-w-7xl'>
        {fields.heading && (
          <div className='mb-14 text-center'>
            <span className='mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-emerald-600'>Plants</span>
            <Heading as='h2' variant='page' className='sm:text-5xl'>{fields.heading}</Heading>
            <div className='mx-auto mt-4 h-1 w-16 rounded-full bg-emerald-600' />
          </div>
        )}
        <div className={`grid gap-8 ${gridClass}`}>
          {fields.plants?.map((plant) => (
            <PlantCard key={plant.sys.id} plant={plant} />
          ))}
        </div>
        <div className='mt-14 text-center'>
          <Link href='/plants' className='inline-block rounded-full border-2 border-neutral-900 px-10 py-3 text-sm font-semibold text-neutral-900 transition-all hover:bg-neutral-900 hover:text-white'>
            View All Plants
          </Link>
        </div>
      </div>
    </section>
  )
}
