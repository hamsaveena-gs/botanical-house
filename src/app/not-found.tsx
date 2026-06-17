import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'
import Button from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className='flex flex-1 flex-col items-center justify-center px-4 pt-24 text-center'>
      <span className='mb-4 text-7xl'>🌱</span>
      <Heading as='h1' variant='giant'>404</Heading>
      <Text variant='muted' className='mt-4 text-lg text-neutral-500'>
        This page seems to have wandered off.
      </Text>
      <Button href='/' variant='primary' size='lg' className='mt-8 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700'>
        ← Back to Home
      </Button>
    </div>
  )
}
