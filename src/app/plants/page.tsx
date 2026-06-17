import { getPageBySlug } from '@/lib/contentful'
import type { Metadata } from 'next'
import PlantsPage from '@/features/plants/PlantsPage'

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('/plants')
  if (!page) {
    return { title: 'All Plants', description: 'Browse our full collection of plants' }
  }
  return {
    title: page.fields.seoTitle || page.fields.title,
    description: page.fields.seoDescription,
    openGraph: page.fields.ogImage?.fields?.file?.url
      ? { images: [`https:${page.fields.ogImage.fields.file.url}`] }
      : undefined,
  }
}

export default async function Plants(props: {
  searchParams: Promise<{ category?: string; page?: string }>
}) {
  const cmsPage = await getPageBySlug('/plants')
  return <PlantsPage {...props} cmsPage={cmsPage ?? undefined} />
}
