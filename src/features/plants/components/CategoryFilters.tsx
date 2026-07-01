import Link from 'next/link'
import type { Category } from '@/types'

interface CategoryFiltersProps {
  categories: Category[]
  activeSlugs: string[]
}

export default function CategoryFilters({ categories, activeSlugs }: CategoryFiltersProps) {
  const href = (selectedSlugs: string[]) => {
    if (selectedSlugs.length === 0) return '/plants'
    return `/plants?category=${selectedSlugs.join(',')}`
  }

  return (
    <div className='mb-10 flex flex-wrap justify-center gap-3' role='group' aria-label='Filter by category'>
      <Link
        href='/plants'
        className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
          activeSlugs.length === 0
            ? 'bg-emerald-700 text-white border-emerald-700'
            : 'border border-neutral-200 text-neutral-600 hover:border-emerald-700 hover:text-emerald-700'
        }`}
        aria-current={activeSlugs.length === 0 ? 'page' : undefined}
      >
        All
      </Link>
      {categories.map((cat) => {
        const slug = cat.fields.slug
        const isActive = activeSlugs.includes(slug)
        const next = isActive
          ? activeSlugs.filter((s) => s !== slug)
          : [...activeSlugs, slug]
        return (
          <Link
            key={cat.sys.id}
            href={href(next)}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
              isActive
                ? 'bg-emerald-700 text-white border-emerald-700'
                : 'border border-neutral-200 text-neutral-600 hover:border-emerald-700 hover:text-emerald-700'
            }`}
            aria-current={isActive ? 'page' : undefined}
          >
            {cat.fields.title}
          </Link>
        )
      })}
    </div>
  )
}
