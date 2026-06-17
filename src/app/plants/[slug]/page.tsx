import { getPlantBySlug, getAllPlantSlugs } from '@/lib/contentful'
import PlantDetailPage from '@/features/plants/PlantDetailPage'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getAllPlantSlugs()
  return slugs.map((slug) => ({ slug }))
}

export const revalidate = 60

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const plant = await getPlantBySlug(slug)
  if (!plant) return {}
  return {
    title: plant.fields.title,
    description: `Buy ${plant.fields.title} — ₹${plant.fields.price}`,
  }
}

export default async function PlantPage({ params }: Props) {
  const { slug } = await params
  return <PlantDetailPage slug={slug} />
}
