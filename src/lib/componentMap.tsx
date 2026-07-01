import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import HeroBanner from '@/components/ui/HeroBanner'
import CtaBlock from '@/components/ui/CtaBlock'
import type { Section } from '@/types'

const RichTextSection = dynamic(() => import('@/components/ui/RichTextSection'))
const PlantGridSection = dynamic(() => import('@/features/home/components/PlantGridSection'))

function Fallback() {
  return <div className='h-64 animate-pulse bg-neutral-100' />
}

const WRAP: Record<string, React.FC<{ children: React.ReactNode }>> = {
  richTextSection: ({ children }) => <Suspense fallback={<Fallback />}>{children}</Suspense>,
  gallerySection: ({ children }) => <Suspense fallback={<Fallback />}>{children}</Suspense>,
}

type Cmp = React.FC<Record<string, unknown>>

const COMPONENT_MAP: Record<string, Cmp> = {
  heroBanner: HeroBanner as unknown as Cmp,
  richTextSection: RichTextSection as unknown as Cmp,
  ctaBlock: CtaBlock as unknown as Cmp,
  gallerySection: PlantGridSection as unknown as Cmp,
}

export function renderSection(section: Section, index: number) {
  const type = section.sys?.contentType?.sys?.id
  if (!type) return null
  const Component = COMPONENT_MAP[type]
  if (!Component) return null
  const el = <Component key={index} fields={section.fields} />
  const Wrapper = WRAP[type]
  return Wrapper ? <Wrapper key={index}>{el}</Wrapper> : el
}
