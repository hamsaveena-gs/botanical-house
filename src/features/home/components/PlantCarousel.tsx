'use client'

import { useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import PlantCard from '@/components/ui/PlantCard'
import Heading from '@/components/ui/Heading'
import type { PlantGridSectionFields } from '@/types'

const GAP = 24
const CARD_WIDTH = 300

export default function PlantCarousel({ fields }: { fields: PlantGridSectionFields }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const itemCount = fields.plants?.length ?? 0

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    requestAnimationFrame(() => {
      setCanScrollLeft(el.scrollLeft > 8)
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8)
    })
  }, [])

  const scrollBy = useCallback((direction: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: (CARD_WIDTH + GAP) * (direction === 'left' ? -1 : 1), behavior: 'smooth' })
  }, [])

  if (itemCount === 0) return null

  return (
    <section className='bg-neutral-50 px-4 py-20 sm:py-28'>
      <div className='mx-auto max-w-7xl'>
        {fields.heading && (
          <div className='mb-14 text-center'>
            <span className='mb-3 inline-block text-xs font-semibold uppercase tracking-widest text-emerald-700'>Plants</span>
            <Heading as='h2' variant='page' className='sm:text-5xl'>{fields.heading}</Heading>
            <div className='mx-auto mt-4 h-1 w-16 rounded-full bg-emerald-700' />
          </div>
        )}

        <div className='relative'>
          {canScrollLeft && (
            <button
              onClick={() => scrollBy('left')}
              className='absolute left-1 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg transition-all hover:bg-white hover:shadow-xl flex items-center justify-center sm:-left-4 sm:p-3'
              aria-label='Scroll left'
            >
              <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='sm:w-5 sm:h-5'><path d='m15 18-6-6 6-6'/></svg>
            </button>
          )}

          <div
            ref={scrollRef}
            onScroll={updateScrollState}
            className='flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4'
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {fields.plants.map((plant) => (
              <div key={plant.sys.id} className='min-w-[260px] flex-none snap-start sm:min-w-[300px] lg:min-w-[320px] xl:min-w-[340px]'>
                <PlantCard plant={plant} />
              </div>
            ))}
            <style>{`div::-webkit-scrollbar { display: none; }`}</style>
          </div>

          {canScrollRight && (
            <button
              onClick={() => scrollBy('right')}
              className='absolute right-1 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/90 p-2 shadow-lg transition-all hover:bg-white hover:shadow-xl flex items-center justify-center sm:-right-4 sm:p-3'
              aria-label='Scroll right'
            >
              <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' className='sm:w-5 sm:h-5'><path d='m9 18 6-6-6-6'/></svg>
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
