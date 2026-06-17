'use client'

import { useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import PlantCard from '@/components/ui/PlantCard'
import Heading from '@/components/ui/Heading'
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

function PlantCarousel({ fields }: { fields: PlantGridSectionFields }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const itemCount = fields.plants?.length ?? 0

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 8)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8)
  }, [])

  const scrollBy = useCallback((direction: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = el.querySelector('a')?.clientWidth ?? 300
    const gap = 24
    el.scrollBy({ left: (cardWidth + gap) * (direction === 'left' ? -1 : 1), behavior: 'smooth' })
  }, [])

  if (itemCount === 0) return null

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

        <div className='relative'>
          {canScrollLeft && (
            <button
              onClick={() => scrollBy('left')}
              className='absolute -left-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white p-3 shadow-lg transition-all hover:bg-neutral-50 hover:shadow-xl md:flex items-center justify-center'
              aria-label='Scroll left'
            >
              <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='m15 18-6-6 6-6'/></svg>
            </button>
          )}

          <div
            ref={scrollRef}
            onScroll={updateScrollState}
            className='flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4'
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {fields.plants.map((plant) => (
              <div key={plant.sys.id} className='min-w-[280px] flex-none snap-start sm:min-w-[300px] lg:min-w-[320px] xl:min-w-[340px]'>
                <PlantCard plant={plant} />
              </div>
            ))}
            <style>{`div::-webkit-scrollbar { display: none; }`}</style>
          </div>

          {canScrollRight && (
            <button
              onClick={() => scrollBy('right')}
              className='absolute -right-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white p-3 shadow-lg transition-all hover:bg-neutral-50 hover:shadow-xl md:flex items-center justify-center'
              aria-label='Scroll right'
            >
              <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='m9 18 6-6-6-6'/></svg>
            </button>
          )}
        </div>

        <div className='mt-10 text-center'>
          <Link href='/plants' className='inline-block rounded-full border-2 border-neutral-900 px-10 py-3 text-sm font-semibold text-neutral-900 transition-all hover:bg-neutral-900 hover:text-white'>
            View All Plants
          </Link>
        </div>
      </div>
    </section>
  )
}
