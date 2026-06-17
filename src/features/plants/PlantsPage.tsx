import { getAllPlants, getAllCategories } from '@/lib/contentful'
import Heading from '@/components/ui/Heading'
import Text from '@/components/ui/Text'
import CategoryFilters from './components/CategoryFilters'
import PlantGrid from './components/PlantGrid'
import Pagination from './components/Pagination'
import type { Page } from '@/types'

const PER_PAGE = 8

export default async function PlantsPage(props: {
  searchParams: Promise<{ category?: string; page?: string }>
  cmsPage?: Page
}) {
  const { category, page } = await props.searchParams
  const { cmsPage } = props
  const [plants, categories] = await Promise.all([
    getAllPlants(),
    getAllCategories(),
  ])

  const activeSlugs = category ? category.split(',').filter(Boolean) : []
  const filtered = activeSlugs.length > 0
    ? plants.filter((p) => p.fields.category?.some((c) => activeSlugs.includes(c.fields.slug)))
    : plants

  const currentPage = Math.max(1, Number(page) || 1)
  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const start = (currentPage - 1) * PER_PAGE
  const paged = filtered.slice(start, start + PER_PAGE)

  const selectedNames = activeSlugs
    .map((s) => categories.find((c) => c.fields.slug === s)?.fields.title)
    .filter(Boolean)

  const heading = selectedNames.length > 0 ? selectedNames.join(', ') : (cmsPage?.fields.title ?? 'All Plants')
  const subHeading = cmsPage?.fields.subHeading

  return (
    <div className='px-4 py-12 sm:py-20'>
      <div className='mx-auto max-w-7xl'>
        <div className='mb-12 text-center'>
          <Heading as='h1' variant='page'>{heading}</Heading>
          {subHeading && (
            <Text variant='muted' className='mt-3 text-neutral-500'>
              {subHeading}
            </Text>
          )}
        </div>
        <CategoryFilters categories={categories} activeSlugs={activeSlugs} />
        <PlantGrid plants={paged} />
        <Pagination currentPage={currentPage} totalPages={totalPages} category={category ?? ''} />
      </div>
    </div>
  )
}
