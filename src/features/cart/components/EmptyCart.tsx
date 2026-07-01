'use client'

import Link from 'next/link'
import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'

export default function EmptyCart() {
  return (
    <div className='flex flex-1 flex-col items-center justify-center px-4 pt-24 text-center'>
      <div className='mb-6 text-7xl'>🪴</div>
      <Heading as='h1' variant='section' className='text-2xl font-bold sm:text-2xl'>
        Your cart is empty
      </Heading>
      <Text variant='muted' className='mt-2 text-neutral-500'>
        Looks like you haven&apos;t added any plants yet.
      </Text>
      <Link href='/plants' className='mt-8 rounded-full bg-emerald-700 px-10 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700'>
        Browse Plants
      </Link>
    </div>
  )
}
